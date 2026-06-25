# Earth Health Score — methodology review (v0.2, as merged at 0046781)

Source read: `functions/src/earthHealthScore.ts`, `lib/models/earth/earth_live_health_score.dart`, and the live Score panel. This is advisory — no code changed.

## TL;DR

The engine is **more correct than the handoff feared** — it is a proper coverage-weighted average, not an un-normalized sum (my earlier "1.36 scaling artifact" worry was wrong; line 248-251 divides by `availWeight`). The real problems are different and fixable: (1) **double-counting** of air and forest from the "additive" v0.2, (2) the **on-screen breakdown doesn't reconcile to the headline number** (your exact complaint), (3) **normalizers aren't anchored to health science**, (4) **globally-relevant-only signals get applied to regions where they don't physically apply**, and (5) the global number is **population-weighted but not labelled as such**.

## What's already sound (keep it)

- Coverage-weighted average: `score = Σ(normᵢ·wᵢ) / Σ(wᵢ over present layers)` — robust to missing layers, scales to 0-100. (earthHealthScore.ts:246-251)
- `confidence = availWeight / totalWeight` is computed and surfaced ("Coverage 71%").
- Fail-soft: a missing layer lowers coverage, never zeros the score.
- AIEDS device footprint kept **out** of the planetary score (separate field). Correct and well-disclosed.
- Distance-capped point sampling (`pointSetValueNear`) avoids crediting a far-away anchor.
- Protected-areas normalized against the real **30×30** policy target (Kunming-Montreal GBF Target 3), not raw %.
- Honest "educational estimate — NOT a scientific index" disclosure.

## Findings (prioritized)

### P1 — Double-counting from the additive v0.2 (validity; biases the headline)

Weights (earthHealthScore.ts:31-43) stack overlapping signals instead of grouping them:

- **Air pollution counted three times:** `air-quality` (US AQI, 0.15) + `particulates` (PM2.5, 0.12) + `chemistry` (NO2, 0.08) = **0.35** combined (26% of total). US AQI is largely PM2.5+ozone, so air-quality and particulates measure nearly the same thing. The handoff's intent was PM2.5 **replaces** the coarse AQI — instead both were kept.
- **Forest counted twice:** `forest` (cover %, 0.25) + `tree-time` (vitality, 0.08) = **0.33**. The intent was to **fold** tree-time into forest as a small refinement — instead it's a separate equal sub-score.

Even with normalization, this over-weights air + forest relative to ocean, cryosphere, biodiversity, and conservation.

**Fix — domain-grouped scoring.** Group sub-signals into domains, combine *within* a domain to one domain health, then weight the *domains*:
`air = f(PM2.5, NO2[, ozone])` (drop the coarse US AQI, or use it only as PM2.5 fallback); `land-cover = f(forest cover, tree-time vitality, recent-loss)`; `ocean`, `cryosphere`, `biodiversity`, `conservation`. Domain weights are then interpretable and double-counting is gone. (Methodology change → version bump + owner sign-off.)

### P2 — The breakdown doesn't reconcile to the score (your complaint)

The panel shows `normalized × rawWeight = contribution` (`83×0.15=12.4`, `19×0.25=4.6`, …). Those sum to **58.8**, but North America shows **61** — because the score divides by `availWeight` (0.96 for the 8 present layers). A user adding the rows cannot reproduce the number.

**Fix (client only — no methodology change, no deploy):**
- Display **renormalized** weights `wᵢ / availWeight` as a percent, so the contributions sum exactly to the score.
- Show the coverage line explicitly: "8 of 10 signals · 71% of methodology weight."
- Add a one-line "how this is computed" explainer: "score = weighted average of the available signals; weights shown are renormalized over what's present."
- Give the four v0.2 layers real descriptions + units (they currently read the placeholder "Normalized 0-100 health signal"): PM2.5 µg/m³, NO2 µmol/m² column, tree-time vitality index, protected-area % vs the 30% target.
- Drop or clarify the "burden/benefit" tag — next to a 0-100 where higher is always healthier, "AIR QUALITY 83 · burden" reads as a contradiction.

### P3 — Normalizers aren't anchored to health science (accuracy)

- **PM2.5** (`PM25_FULL_SCALE_UGM3 = 75`, linear) → 37.5 µg/m³ reads 50/100, but that's already "unhealthy" by US EPA. Anchor to WHO 2021 AQG (annual 5 µg/m³) + EPA breakpoints, piecewise: ~5 → 100, 35.5 → ~50, 150+ → 0.
- **NO2 is a total column** (µmol/m²). Column ≠ surface exposure — a weak *health* proxy. Either convert toward surface NO2 or relabel it an "atmospheric NO2 burden" indicator, not a health signal.
- **US AQI is already a non-linear health index**; re-linearizing (`100 − aqi/200·100`) discards its breakpoint meaning. If kept, map by AQI categories.
- **SST** uses `Math.abs(anomaly)` so a warm and a cold anomaly score equally — but marine-heatwave/coral risk is asymmetric (warm is the danger). `SST_ANOMALY_FULL_SCALE_C = 3` is lenient vs marine-heatwave thresholds (~1-2 °C over the 90th-percentile climatology, Hobday et al. 2016). Use the per-cell 1991-2020 baseline (already a TODO at line 61) and penalize warm anomalies harder.
- **Forest cover% = health** is biome-blind: 30% cover is natural savanna, not 30% unhealthy. Score against biome-expected cover.
- **Biodiversity** metric is *richness* but the label says "habitat intactness" — construct mismatch. Prefer the Biodiversity Intactness Index (BII) or relabel honestly.

### P4 — Regional relevance not enforced (regional accuracy)

Global-only signals are applied to every region. A glacier mass-balance burden and an SST anomaly are folded into **Atlanta's** score (the panel's coords are 34°N, no glaciers, inland). The distance cap saves point layers, but the **global glacier trend** and the **SST grid** aren't regionally masked.

**Fix:** a per-layer applicability mask — glaciers only where glaciers exist within X km; SST only for coastal/ocean-adjacent regions. Crucially, "not applicable here" must be **excluded from that region's weight denominator** (don't dilute coverage either) — distinct from "data missing."

### P5 — Global number is population-weighted but unlabeled

`buildGlobalScore` weights regions by `exposure` = population density (lines 257, 285-289). So "Global 58" is a **human-exposure-weighted** number, not an area-weighted planetary mean. Defensible (a human-health lens) but the disclosure doesn't say it. Label it, and consider showing both (area-weighted planetary + exposure-weighted human).

### P6 — "Trend" is just the glacier trend (mislabel)

`region.trend = glacierTrend ?? unknown` (line 256); the global trend is driven by any worsening region — effectively glaciers. It's presented as overall health trend. Compute per-layer trends from prior-snapshot deltas (the file's own TODO), or label it "cryosphere trend" until then.

### P7 — No uncertainty on the headline

`confidence` exists (0-1) but the score is shown as a bare point estimate at 71% coverage. Surface a confidence band or coverage-discount so a 71%-coverage 58 doesn't read as authoritative as a 100%-coverage 58.

## Missing pieces (completeness)

- **Ocean is SST-only** — no acidification/pH, no chlorophyll/productivity; the planned SSTA-surfacing + BAA (Pack 4) aren't in the score yet.
- No **freshwater**, **soil**, or **land-use-change-rate** beyond forest.
- No **atmospheric CO₂/GHG** planetary-boundary indicator (the synthetic carbon *scalar* was retired from the globe — correctly — but a global CO₂ concentration constant could still inform the score).
- **Weights are hand-picked with no documented rationale or sensitivity analysis.** Anchor to a recognized framework (Planetary Boundaries 2023; Yale EPI hierarchical weighting; Ocean Health Index goal-based) and publish a sensitivity table (how much the headline moves per ±0.05 weight).
- **Data vintage isn't in the score** — a "live" signal from a stale grid should lower confidence.

---

## Agent command packs

### Pack S1 — Score breakdown UX (client only, NO governance gate, NO function deploy) — do first

Answers the "it doesn't show how we arrive at the score" complaint; ships via wf80.

```
Work in worktrees/rand0m-earth (or the 2D lane if it owns the Score panel); branch off origin/main.
In lib/models/earth/earth_live_health_score.dart + the Earth Score / Summary widget:
1. Compute renormalized weight per sub-score = weight / Σ(present weights); display it as a % so the
   shown contributions sum to the headline score. Keep raw weight in the model for tooltips.
2. Add a coverage line ("N of M signals · XX% of methodology weight") + a one-line compute explainer.
3. Replace the placeholder "Normalized 0-100 health signal" for particulates/chemistry/tree-time/
   protected-areas with real descriptions + units (PM2.5 µg/m³; NO2 µmol/m² column; tree-time vitality
   index; protected-areas % vs 30% target).
4. Drop or clarify the burden/benefit chip next to the 0-100 health value.
5. Surface confidence (band or label) on the headline.
Validate: flutter analyze + flutter test test/connect + validate-earth-fast.ps1 -AppPath ...\worktrees\rand0m-earth
Ship: rebase -> ff-merge main -> push main -> wf80. (No function deploy — pure client.)
```

### Pack S2 — Methodology v0.3: de-double-count + anchor normalizers ⚠ OWNER SIGN-OFF (moves the number)

```
Work in worktrees/rand0m-earth; functions/src/earthHealthScore.ts.
1. DOMAIN grouping to kill double-counting: combine air-quality/particulates/chemistry into ONE air
   domain (drop coarse US AQI or demote it to a PM2.5 fallback); fold tree-time into the forest/land-cover
   domain. Weight domains, not raw layers.
2. Anchor normalizers to standards: PM2.5 piecewise to WHO AQG + EPA breakpoints; SST asymmetric (penalize
   warm) vs the per-cell 1991-2020 baseline; relabel NO2 as an atmospheric burden (or convert toward surface);
   biodiversity -> BII or relabel; forest vs biome-expected cover.
3. Bump METHODOLOGY_VERSION 0.2 -> 0.3; update earthHealthScore.test.ts + dart earth_health_score_test.dart;
   add a weight sensitivity table to the doc disclosure.
npm run build (functions) ; npm test ; flutter test test/connect ; validate-earth-fast.ps1
GATE: owner ratifies the new weights + the headline move BEFORE deploy. Then owner deploys
earthHealthScoreRefresh + force-runs the scheduler (App-Check armed -> name-scoped).
```

### Pack S3 — Regional applicability mask + honest trend + global-weighting label

```
functions/src/earthHealthScore.ts + index.ts per-region extraction:
1. Per-layer applicability: exclude glaciers where none within X km; exclude SST for inland regions.
   "Not applicable" is removed from that region's weight denominator (not counted as missing).
2. Trend: compute per-layer deltas vs the prior snapshot; aggregate to a real trend, or relabel the
   current one "cryosphere trend".
3. Disclosure: label the global rollup "population-exposure-weighted"; optionally publish both an
   area-weighted planetary mean and the exposure-weighted human number.
Same validate/sign-off/deploy path as S2 (methodology change).
```

### Owner pre-req (still true)

Confirm the Cloud Run worker is deployed with forest/particulates/chemistry/tree-time, or the score + overlays read REPRESENTATIVE, not real — which would make any normalization tuning premature.
