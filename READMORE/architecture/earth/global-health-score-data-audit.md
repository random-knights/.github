# Global Health Score — Data Audit & Methodology

**Current version:** earth.healthscore.v0.3 (CLIENT merged `ab15e4c`; **`earthHealthScoreRefresh` FUNCTION-DEPLOY PENDING**)
**Live deployed version:** earth.healthscore.v0.2 (function `58feb9f` + real-layers upgrade `0046781`; still running; SST=0 symptom — see §Live gap)
**Date:** 2026-06-16 (v0.1); updated 2026-06-19 (v0.3 methodology)
**Owner:** Earth agent (implementation); Fable (ratification); Docs (this record)

⚠ **Live gap (session 49):** v0.3 methodology is MERGED on the client but the deployed `earthHealthScoreRefresh` function is v0.2. Until the owner runs `firebase deploy --only functions:earthHealthScoreRefresh`, the live score SST domain reads `0` (stale v0.2 function output does not yet map SST to the v0.3 domain contract). No user-visible regression on the overall score (score degrades gracefully without SST), but SST contribution is zeroed.

---

## Purpose

The Earth Health Score is an aggregate signal surfaced on the globe chrome. This document defines the ratified v0.1 methodology — which signals are blended, what weights are applied, and what governance constraints apply. Agents must not change the signal roster, directions, weights, or blending logic without an explicit Fable ruling recorded here.

---

## v0.1 Signal Roster

| Signal | Direction | Weight | Source | Notes |
| --- | --- | --- | --- | --- |
| Air quality (AQI) | Higher AQI → lower health | 0.30 | Open-Meteo (live; `earthAirQualityRefresh`) | **Count-based flip:** signal uses count of stations exceeding threshold, not raw mean AQI. Higher count = worse. |
| Sea Surface Temperature anomaly | Positive anomaly → lower health | 0.25 | Open-Meteo Marine (live; `earthSstRefresh`) | Anomaly computed vs **1991–2020 climatological baseline** (WMO standard 30-year reference period). Positive = warmer than reference = stress signal. |
| Wildfire activity | Higher FIRMS hotspot count → lower health | 0.20 | NASA FIRMS (asset-backed; `earthWildfireRefresh`) | Hotspot count in 24h window; normalised to 0–1 against rolling 30-day max. |
| Forest cover (Hansen/GLAD) | Higher loss → lower health | 0.15 | GLAD Hansen annual (asset-backed; `earthForestRefresh`) | Annual tree-cover loss rate; interpolated to per-day for blending. Lags by definition — asset-backed, not live. |
| Human density activity | Higher density → moderate-lower health | 0.10 | Representative (`earthHumanDensityRefresh`) | Weighted cautiously; representative data — not a live signal. Weight will be revisited when a live source replaces the representative grid. |

**Total weight:** 1.00

---

## Computation

```
raw_score = Σ (normalised_signal_i × weight_i)   // 0 = worst, 1 = best
health_score_0_100 = round((1 - raw_score) × 100)
```

Each signal is normalised to [0, 1] where 0 = best observed (or expected best) and 1 = worst observed (or expected worst). Normalisation bounds are defined per-signal in the catalog entry and may be updated by Earth agent with a `DOCS:` callout.

---

## Architecture: Hybrid Server-fn + Client-recompute (LIVE — `58feb9f` + `855e6e0`)

The health score uses a **hybrid model** — both sides are now shipping:

1. **Server function (`earthHealthScoreRefresh` — `58feb9f`):** scheduled aggregation; reads cached per-layer Storage grids/snapshots → per-region + global sub-scores → writes one public Storage object. Coverage-weighted per-region; exposure-weighted global. Fail-soft per signal.
2. **Client reactive recompute (`855e6e0` capstone):** the gauge recomputes REACTIVELY on every `earth+` filter change, using locally-cached signal values. Replaces the static `78 - viewer-AI-carbon` estimate. AIEDS digital footprint surfaces as a **separate chip** — never blended into the score.

**Architecture notes:**
- Server is authoritative; client recompute is the low-latency reflector between server ticks.
- `air-quality = burden (US AQI)`; `SST = burden on |anomaly| vs 1991–2020 climatology` — both server and client use these normalizations.
- `earthSstRefresh` (`353a478`) was updated to emit the SST ANOMALY signal (vs 1991–2020) to match the representative asset.
- Fail-soft: missing/stale server object → client-only recompute labeled `"estimated"`. Signal data absent → score suppressed (not shown).

**Firestore / Storage path:** score written to one public Storage object (not Firestore document — server reads cached grids, no per-user cost). Client reads this object on refresh tick.

---

## AIEDS — Separate, Unblended, Device

The AI Environmental Disclosure Standard (AIEDS) disclosure is **not blended** into the Health Score:

- AIEDS tracks the environmental cost of *running the AI assistant on this device* — it is a per-session, per-device metric.
- The Health Score tracks *planetary environmental conditions* — it is a global aggregate.
- These must never be combined, averaged, or presented as contributing to each other.
- AIEDS is displayed on the AIEDS disclosure surface (per-response or session ledger). The Health Score is displayed on the globe chrome score gauge. They occupy separate UI surfaces with no numerical relationship.

---

## Governance Constraints

- **Signal roster locked at v0.1** — any addition, removal, or weight change requires a Fable ruling and a version bump (v0.2, etc.).
- **SST anomaly baseline fixed at 1991–2020** — do not silently update the reference period. A reference period change is a methodology change requiring a version bump.
- **Air-quality count-based flip is binding** — the signal uses station count exceeding threshold (not raw mean AQI). If the data contract changes (e.g. Open-Meteo returns a mean instead of station-level data), Earth agent must emit a `DOCS:` callout before adjusting.
- **Human density weight (0.10) is provisional** — flagged for re-weighting once a live source replaces the representative grid. Earth agent emits `DOCS:` callout when live source lands.
- **Schema versioned** — the Firestore health score document carries `"schema": "earth.healthscore.v1"`. A methodology change requires a schema version increment.

---

---

## v0.2 — Real layers consumed (`0046781`, session 49)

- **Retired:** synthetic carbon ppm scalar from globe overlay (`b966f0b`); score no longer consumes the synthetic carbon signal.
- **Added:** CAMS particulates, CAMS chemistry NO2, REAL tree-time (WorldClim × VCF5KYR), REAL forest (VCF5KYR) inputs fed into score computation via earth-worker rasterio pipeline.
- **Status:** merged on client; earth-worker redeploy required to activate real grid sources.

---

## v0.3 — De-double-count via domains, anchored normalizers, S3 regional mask (session 49)

**Owner-ratified. CLIENT MERGED (`ab15e4c`). Function redeploy PENDING.**

### v0.3 Methodology changes

**S1 — Score-panel reconciliation** (`d6b4823`): category labels camelCase; score-panel UI reconciled with underlying domain model.

**S2 — De-double-count via domains + anchored normalizers** (`1e2a1fb` `8560be9` `7cc8911`):
- Signals grouped into **domains** (e.g. `atmosphere`, `ocean`, `land`, `biodiversity`) — each domain contributes once to the global score; signals within a domain are averaged before weighting.
- **Anchored normalizers:** normalization bounds are locked per domain at ratification time rather than floating with observed data. Prevents headline score drift from data range changes.
- Globe layers mapped to v0.3 domain contract; Data View multi-select labels updated to domain groupings.

**S3 — Regional applicability mask + honest trend** (`89cd375`):
- Each domain has a **regional applicability mask** — a signal that has no coverage in a region does not contribute to that region's sub-score (fail-explicit, not fail-zero).
- **Honest trend:** trend arrow reflects the direction of the underlying domain signal, not a smoothed estimate. Label updated to "global-weighted" for clarity.

**S4 — Ratified headline guards + weight-sensitivity disclosure** (`ab15e4c`):
- Headline score capped/guarded to avoid misleading single-tick spikes.
- **Weight-sensitivity disclosure** surfaced in UI: "score is sensitive to SST and AQI weights — see methodology." Owner-ratified phrasing.

### Live gap

`earthHealthScoreRefresh` deployed function is v0.2. Until redeployed:
- SST domain contribution = 0 (old function does not output the v0.3 SST domain field).
- Score degrades gracefully (SST=0, no crash), but Earth Health Score underweights ocean stress.
- Fix: `firebase deploy --only functions:earthHealthScoreRefresh` after `git pull`.

---

## Open Items (post-v0.3)

- [ ] `earthHealthScoreRefresh` function redeploy to v0.3 domains (owner-manual — BLOCKING live parity)
- [ ] Weighted rolling-average smoothing to reduce day-to-day variance (currently point-in-time)
- [ ] Regional sub-scores (per continent / ocean basin) already partially wired via S3 mask
- [ ] Ocean acidification signal (pH trend) — data source TBD
- [ ] Biodiversity index signal — GBIF count is a proxy; more direct pressure signal preferred
- [ ] Live WorldPop / GPW source to replace human-density representative grid
