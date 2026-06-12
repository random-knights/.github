# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-12 (session 30)

---

## Agent Roster

_Post-R7 roster active. Systems and Connect retired (wind-down complete, scopes absorbed by Earth)._

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | main clone (exclusive) | **R7 deployed** `c150405`; C8 in flight — BE chart-series + Cesium data groundwork; D7 merge gate | Earth features, layers, governance; catalog owner; integrator/deploy; absorbs Systems+Connect scopes |
| Design | `deve10per` / dev-kitt | `worktrees\rand0m-design` | D7 in flight (nullschool mode; no-scroll viewport-fit; globe hero; time-scrubber histogram) | IA v2 D7+D8; Cesium FE globe shell (C8+); presentation/layout only |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | `-TestPaths` in progress; post-R7 harness | CI, harness, QA; token-economy triage (§21d) |
| Docs | `eng1neer` / qa-kitt | qa-kitt clone | `main` | READLESS, CODEX, EARTH-ROADMAP |
| Fable | — | read-only | — | PM/gates; spec ratification; checkpoint bundles (§19); Cesium Ion token ruling pending |
| **CODEX Grunt Pool** | OpenAI (per CODEX.md) | isolated task scope | task-by-task (Codex T3 fixtures banked) | Low-risk mechanical tasks only: named files + acceptance command + do-not-touch list. **Never:** guards, gates, catalog files, governance logic. |

~~Systems~~ — **RETIRED** (R7). Timer-leak + data-vertical scope absorbed by Earth. `worktrees\rand0m-systems` torn down.
~~Connect~~ — **RETIRED** (R7). S5 + Entities/Connect source scope absorbed by Earth. `worktrees\rand0m-connect` torn down. Architectural Earth/Connect code boundary unchanged.

Agents share `origin/main` on xyz (`random-knights/xyz`). Pull before push. One owner per surface at a time.

**Coordination standards:** [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) — callout format, verify-from-git, worktree isolation, catalog non-touch, path-ownership matrix, HANDOFF protocol, token-economy (§21).

---

## Earth Roadmap Plan (C7–C12)

_**End goal: animated planetary flow globe (nullschool-class) + governed AI assistant.**_

_Position: **R9 bundle FINAL** — cesium slice 3 `b826abb`, D6 `8c6857d`, and attribution corrections `79d9295` all gate-passed (C10); density slipped to R10 (Earth session died mid-slice, WIP never pushed). Risks: **⛔ HARD BLOCKER — RANDOM_CESIUM_ION_TOKEN needed in root `.env` AND as a GitHub Actions secret** (third ask; production CI builds do not read local `.env`; release build falls back to CustomPainter until both are set)._

| Cycle | Release | Work | Gate |
| --- | --- | --- | --- |
| **C7** | **R7** ✓ **DEPLOYED** (`c150405`, release `27423312204`) | D2–D5 + scientist RESOLVE-OR-EXPLAIN + call-site + S5/S3 + uniformity + timer-leak + ISO table (Codex T1); Systems+Connect RETIRED | CI green; HTTP smoke ✓; owner visual review #1 ✓ |
| **C8** | **R8** ✓ **DEPLOYED** (`e1e49c7`, release `27432166050`) | D7 nullschool shell + D8 chart vocabulary + BE chart-series + scroll-helper + CustomPainter globe in new shell → **UI consolidation release**. Owner review #2 verdict PENDING (post-deploy). | D7/D8/chart-series gate-passed; CI green; HTTP smoke ✓ |
| **C9** | — | Cesium slice 1 `760c51a` ✓ (governance core); Cesium slice 2 ✓ (browser bridge; vendored CesiumJS; env-injected token; `KNIGHTS_CESIUM_ION_API_KEY` fallback) | R8 deployed ✓ |
| **C10** | — | Cesium slice 3 `b826abb` ✓ (wind+ocean flow fields); D6 `8c6857d` ✓ (schematic deleted; preview pair quarantined — T5 evidence; motion suite RETAINED); attribution corrections `79d9295` ✓; density vertical NEVER PUSHED — Earth session died mid-slice; WIP salvage → R10 (slip=1) | C9 complete ✓ |
| **C10/R9** | **R9** *(FINAL — density slipped to R10)* | D6 → attribution corrections → cesium-runtime-base (slices 1–3) + Production Release workflow token injection → **nullschool release**. Owner visual review #3 (globe-specific, nullschool). | D6/attribution/slice 3 gate-passed ✓; Ion token (root `.env` + Actions secret) required; Fable gate; owner approval |
| **C11** | — | Tier 2 density vertical restart/salvage (WIP from dead session); Tier 1 symbolic motion cues (RETAINED GLOBE INVENTORY); @scient1st globe-context wiring; region-tap → Detail workspace | R9 deployed |
| **C11/R10** | **R10 FINAL** | Tier 2 density (restart/salvage) + Tier 1 motion cues + @scient1st globe-context + hardening → **R10 FINAL release**. Owner final review. | C11 complete; Fable final gate; owner sign-off |

**Visual smoke suspension:** R5+R6 checklist items suspended until R7 consolidated visual review. Post-R7: ≤5 items per release window, only when UI changed (§21b).

---

## Deploy Checkpoint Status

| Checkpoint | State | CI | Deployed |
| --- | --- | --- | --- |
| Earth UI Cleanup + Live Connections | merged to main | green | **✓ live** |
| Air-Quality (18th live layer) + Ocean loader | merged to main | green | **✓ live** |
| Earth Fast workflow test rewrite | merged to main | green | **✓ live** |
| @scient1st real Earth-context AI responses | merged to main | green (+374, 0 failures) | **✓ live** |
| scientist-session-continuity (`6d2c6cb`) | merged to main | green | **✓ live** |
| scientist-scenario-explain (`1792660`) | merged to main | green | **✓ live** |
| Earth-Systems ocean live + registration | merged to main | green | **✓ live** |
| Glaciers integration + registration (`36d2901`, `57869fc`) | merged to main | green | **✓ live** |
| Glaciers data-view wiring (`6316893`) | merged to main | green | **✓ live** |
| Connect slices 1–3 (`ed7f3f4`) | merged to main | green | **✓ live** |
| Forest pipeline + 19th layer (`glad-hansen-forest-summary`) | merged to main | green | **✓ live** |
| `chore/test-deterministic-cursor` | merged to main | green | **✓ live** |
| Connect slice 4 | merged to main | green | **✓ live** |
| `connect-card-overflow-fix` (RenderFlex 0.118px — connect_source_card.dart:88) | merged to main | green | **✓ live** |
| Protected-areas + WDPA registration (`wdpa-protected-area-summary`) | merged to main | green | **✓ live** |
| Connect slice 5 | merged to main | green | **✓ live** |
| `validate-earth-fast` root tooling fix (`53a456e` — `--no-wasm-dry-run`) | merged to main | green | **✓ live** |
| Biodiversity layer (`e9f9e47` — GBIF, fail-closed suppression guard, zero coordinate fields) | merged to main | green | **✓ live** ⚠ owner visual pending |
| F1.0 favicon | merged to main | green | **✓ live** ⚠ owner visual pending |
| Entities E1 slices 1–2 | merged to main | green | **✓ live** ⚠ owner visual pending |
| VCM slice 2 + `berkeley-vcm-registry-summary` registration | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Entities E1 slice 3 (resolver contract) + ripples | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Countries S1 (`f82c595` — additive-only, RegionIds guard) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Countries S2 (`58361b4` — EarthRegionResolver; stale schematic fix; E1 gap closed) | merged to main | green | **✓ live** (R6 `ca91443`) — resolver unwired until Countries S3/S5 |
| Design D1 (`3cd4255` — `earth/design-d1-globe-primary`; pill BOTTOM-LEFT; gauge TOP-RIGHT; dark-canvas) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Connect flips + E1 S4 (`af62d6f` — all render tests ENABLED; zero skips; E1 S4 minimal) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Design D2–D5 stack (D2 `0381603`, D3 `fdb5b7f`, D4, D5) | merged to main | green | **✓ live** (R7 `c150405`) |
| scientist-entity-resolution + call-site (`3d04b23` + CI fix) | merged to main | green | **✓ live** (R7 `c150405`) |
| Countries S3 (`5897b5d` — VCM coord→country; lat/long→ISO at ingest) | merged to main | green | **✓ live** (R7 `c150405`) |
| Connect S5 (`4ec0d24` — write-path validation; E1 integrity gap) | merged to main | green | **✓ live** (R7 `c150405`) |
| Timer-leak fix | merged to main | green | **✓ live** (R7 `c150405`) |
| Uniformity fixes | merged to main | green | **✓ live** (R7 `c150405`) |
| Full ISO country table (Codex T1 — 249 countries) | merged to main | green | **✓ live** (R7 `c150405`) |
| D7 Earth View nullschool mode | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| BE chart-series provisions (`earth/chart-series-provisioning`) | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| D8 Data View chart vocabulary (`earth/design-d8-chart-vocabulary`) | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| Scroll-helper + CustomPainter globe shell | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| Cesium slice 2 — browser bridge, vendored CesiumJS, env-injected token | gate-passed (C9); merged to main | green | **✓ live** (R8 or post-R8; Fable-verified SHA not yet recorded — verify before promoting) |
| Cesium slice 3 — wind+ocean flow fields (`b826abb`) | gate-passed (C10); pending R9 merge | — | **pending R9** |
| Attribution corrections — GBIF/Berkeley/WGMS/Hansen/WDPA/Open-Meteo/FIRMS (`79d9295`) | gate-passed (C10); pending R9 merge | — | **pending R9** |
| D6 verdicts pass — schematic deleted; preview pair quarantined (T5 evidence); motion suite RETAINED (`8c6857d`) | gate-passed (C10); pending R9 merge | — | **pending R9** |
| Tier 2 density vertical | **NEVER PUSHED** — Earth session died mid-slice; local WIP only; WIP salvage step required; **slipped to R10** (slip=1) | — | **R10** |

`origin/main` (xyz) is at `e1e49c7` (Production Release `27432166050`; Fable-verified).

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory.

⚠ **Visual suspension LIFTED at R7.** Owner consolidated visual review #1 complete (session 25). Post-R7 visual reviews bounded to ≤5 items per release window (§21b).

⛔ **HARD BLOCKER — owner action required (third ask):** Set `RANDOM_CESIUM_ION_TOKEN` in **both** (a) root `.env` AND (b) as a **GitHub Actions secret**. Production CI builds do not read the local `.env` — a release build without the Actions secret will always fall back to CustomPainter. First ask: session 27; second ask: session 28; escalated to HARD BLOCKER: session 30. See [`architecture/env-contract-notes.md`](architecture/env-contract-notes.md).

⚠ **Owner review #2 PENDING:** post-R8 deploy visual review (≤5 viewport/chart items; §21b). Verdict not yet recorded.

Next checkpoint **R9** — C10 work lands: slice 3 flow fields + density guard-gate + D6 verdicts → R9 nullschool release. Ion token must be set before release.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** C10 gates complete — cesium slice 3 `b826abb` ✓, attribution corrections `79d9295` ✓, D6 `8c6857d` ✓. R9 bundle FINAL; awaiting ⛔ HARD BLOCKER resolution (token in both places) + owner R9 approval before release.
- **Design agent:** D6 gate-passed `8c6857d` — schematic deleted; preview pair quarantined (T5 evidence pointer); motion suite RETAINED. R8 owner review #2 verdict still PENDING.
- **Fixes agent:** `validate-earth-fast` `-TestPaths` in progress. Harness hygiene.
- **Docs agent:** session-30 update — C10 gate passes recorded; density slip to R10; HARD BLOCKER escalated (third ask, GitHub Actions secret); R9 bundle FINAL; R10 scope defined; env-contract-notes updated.

---

## Next

_Queued — approved scope, not yet started._

1. **R9 release (ready to trigger — blocked on token + owner approval):**
   - ⛔ Owner: set `RANDOM_CESIUM_ION_TOKEN` in root `.env` **AND** as a GitHub Actions secret. Third ask. See [`architecture/env-contract-notes.md`](architecture/env-contract-notes.md).
   - Owner: approve R9 release. R9 bundle FINAL: D6 (`8c6857d`) → attribution corrections (`79d9295`) → cesium-runtime-base slices 1–3 (`760c51a`/slice2/`b826abb`) + Production Release workflow token injection.
   - Owner: perform review #2 post-R8-deploy (≤5 viewport/chart items; §21b) — verdict still pending.
   - Owner: after R9 deploy — owner visual review #3 (globe-specific, nullschool; ≤5 items; §21b).
2. **C11 (queued — starts after R9 deployed):**
   - Earth: Tier 2 density vertical restart/salvage. **Before implementation:** `git log origin/earth/data-human-activity-density` to assess salvageable WIP; if none, restart guard-first (suppression function as named testable function before catalog entry). Fable spec required per vertical. **Before test suite:** `git merge --no-edit origin/codex/density-fixtures` (T9 pre-staged fixtures; §20 explicit merge step).
   - Earth: Tier 1 symbolic motion cues (RETAINED GLOBE INVENTORY); @scient1st globe-context wiring; region-tap → Detail workspace.
3. **R10 FINAL (queued):** Tier 2 density + Tier 1 motion cues + @scient1st globe-context + hardening → final release.
7. **Cleanup ledger (post-R7):** all pre-R7 branches safe to delete. `c2-0` kept open per owner. Delete abandoned `earth/p17-7-*`, `earth/p18-0/1/2-*`.
8. **Future-infra queue:** GFW near-real-time forest alerts (FIRMS pattern, new callable); remote-config budget + kill switch.

---

## Done

_Completed and on `main`._

- **Dashboard + AIEDS + Docs** — shipped to production previously. ✓
- **Earth UI Cleanup** (`earthview-ui-cleanup`) — merged to main. Earth View score/summary to dashboard aesthetic; Earth+ squeeze fix; Oracles animated gif + custom font. ✓
- **Live Connections Batch** (`live-connections-batch`) — merged to main. Air-quality + ocean governed live Data View cards; live-connection data vertical. Ocean-currents catalog status remains **research** (card-only surface; "wired to live loader" refers to the card wiring, not a live data feed — intentional, consistent with air-quality health-neutral pivot). ✓
- **Air-Quality 18th Layer** (`1dea432`) — Earth agent. Governed `EarthLayerDefinition` for air-quality (Open-Meteo); live layer grid card; ocean-currents wired to live loader; registry/region-ready count updated 13→14; governance + registry tests added. ✓
- **Earth Fast Workflow Test Rewrite** (`75e46b6`) — Earth + Fixes agents (converged). `earth_fast_validation_test` rewritten to assert current numbered workflow scheme (01/80/90/99); retired stale workflow references. FF'd to main this session. ✓
- **CODEX.md — Session Bootstrap + EARTH-ROADMAP step** — Docs agent. Full Session Bootstrap, parallel-agent protocol, numbered workflow policy, and step 6 added. Merged to dev-kitt master. ✓
- **EARTH-ROADMAP.md created** — Docs agent. Living plan seeded and published to qa-kitt main. ✓
- **@scient1st real Earth-context AI responses** (`01a070a`) — Earth agent. `earth/scientist-live-ai-responses` merged to main. Earth Fast Cycle green (+374, 0 failures; one async widget-test break fixed inline). **Deployed ✓** (Production Release `27374833292`).
- **Production Release `27374833292`** — owner. @scient1st, air-quality, ocean live cards, UI cleanup live on `rand0m.ai`. ✓
- **`earth/scientist-session-continuity`** (`6d2c6cb`, 6 commits) — Earth agent. Phases 0–2: `EarthScientistController` + `ScientistResponsePane` extracted; request-token race safety; bounded in-memory transcript (5 exchanges, exclusion-gated). Slice 2.5: renderer readiness/usage panels + data-view sections extracted. Phases 3–4: AIEDS session ledger + soft budget guard (`sessionTokenBudget=50000`, `maxPromptTokens=12000`); stale packet-line fix; prompt size cap. `earth_tab.dart` 2,387→1,375 lines — stretch goal met. **Deployed ✓** (Production Release `27388323458` @ `14d422f`).
- **`earth/scientist-scenario-explain`** (`1792660`) — Earth agent. Phases 1–3: scenario-engine ↔ @scient1st explain flow, serialized registration slice. **Deployed ✓** (Production Release `27388323458`).
- **Earth-Systems: `earth/data-ocean-live`** (`076eefb`) — Systems agent. Ocean live feed data vertical; registration applied by Earth agent in catalog. Earth-Systems vertical **COMPLETE**. **Deployed ✓** (Production Release `27388323458`).
- **Production Release `27388323458`** (`14d422f`) — owner. All above + prior checkpoints live on `rand0m.ai`. `origin/main` = `14d422f` (Fable-verified). ✓
- **Glaciers verdict** (`6e0b130`) — Earth + Systems agents. WGMS FoG asset-backed refresh pipeline implemented; no governed live source (verdict: assets only). ✓
- **Glaciers integration + registration** (`36d2901`, `57869fc`) — Earth agent. Glaciers data integrated and registered on main. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Glaciers data-view wiring** (`6316893`) — Earth agent. Data View wiring for glaciers layer. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Connect slices 1–3** (`ed7f3f4`) — Connect agent. Source onboarding pipeline slices 1–3. Connect stall resolved (two-cycle bootstrap gap fixed via §14). Render tests skip-marked per CODEX pending harness chore. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Production Release `27390760970`** (`9298e84`) — owner. Glaciers wiring + Connect slices 1–3 live on `rand0m.ai`. `origin/main` = `9298e84` (Fable-verified). ✓
- **Environmental Data Vertical audit** — Systems agent (Fable-ratified). Findings persisted to [`architecture/environmental-data-vertical-audit.md`](architecture/environmental-data-vertical-audit.md). Implementation order approved: forest → protected-areas → biodiversity.
- **Forest pipeline + 19th layer** (`glad-hansen-forest-summary`) — Earth agent. GLAD/Hansen annual asset-backed refresh pipeline; dedicated `forest` layer id registered (region-ready 14→15). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`chore/test-deterministic-cursor`** — Fixes agent. Cursor-timer test harness fix — vendored-SDK non-deterministic hang resolved. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 4** — Connect agent. Source onboarding pipeline slice 4. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`connect-card-overflow-fix`** — Connect/Fixes agent. Resolved 0.118px RenderFlex overflow on `connect_source_card.dart:88` that broke `validate-earth-fast` green every run. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Protected-areas + WDPA registration** (`wdpa-protected-area-summary`) — Systems + Earth agents. WDPA monthly snapshot; metadata/integrity only (name, IUCN category, status, area km²); structural no-geometry constraint; non-commercial/no-redistribution license noted. Fable ruling: availability = metadata-source axis only; `earth_protected_area_integrity` stays `insufficientEvidence` (separate axes, not unified). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 5** — Connect agent. Source onboarding pipeline slice 5. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`validate-earth-fast` root tooling fix** (`53a456e`) — Fixes agent. `--no-wasm-dry-run` flag; restores green baseline after overflow fix. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Production Release `27393039706`** (`716c4d3`) — owner. Overflow fix, WDPA + protected-areas, Connect slices 4–5, forest pipeline + 19th layer, cursor chore, validate-earth-fast tooling fix live on `rand0m.ai`. `origin/main` = `716c4d3` (Fable-verified). ✓
- **Biodiversity layer** (`e9f9e47`) — Earth + Systems agents. GBIF keyless API; coarse grid-cell aggregate counts; fail-closed endangered-location suppression guard (named testable function; `iucnRedListCategory` facet proved sufficient; zero coordinate fields). 20th layer. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **F1.0 Dynamic Web Favicon** — Fixes agent. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Entities E1 slices 1–2** — Connect agent. Slice 1: `EntityDefinition` with mandatory `sourceRef`; unsourced mapping guard; Connect intake integration. Slice 2: entity-to-region mapping, entity-to-source association. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Production Release `27394511208`** (`4148495`) — owner. Biodiversity, favicon F1.0, Entities E1 slices 1–2 live on `rand0m.ai`. `origin/main` = `4148495` (Fable-verified). Owner visual checklist pending confirmation. ✓
- **Environmental Data Vertical — COMPLETE** — Systems + Earth + Docs agents. All three phases deployed: forest (`glad-hansen-forest-summary`) ✓, protected-areas (`wdpa-protected-area-summary`) ✓, biodiversity (`e9f9e47`) ✓. Spec: [`architecture/environmental-data-vertical-audit.md`](architecture/environmental-data-vertical-audit.md). ✓
- **VCM slice 2 + `berkeley-vcm-registry-summary` registration** — Systems + Earth agents. Scope amendment applied (creditsIssued/Retired filter; lat/long stored; banned-term guard). Registry entry live. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Entities E1 slice 3 (resolver contract) + ripples** — Connect + Earth agents. Connect owns resolver; Earth owns consumption. Ripple fixes included. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Production Release `27413467093`** (`1702eaa`) — owner. VCM slice 2 + E1 S3 resolver + ripples live on `rand0m.ai`. `origin/main` = `1702eaa` (Fable-verified). HTTP smoke ✓; visual checklist items fold into R7 post-design review. ✓
- **CONNECTION-HARDENING DATA LAYER — COMPLETE** 🔒 — all planned Earth-Systems + Environmental + VCM data verticals shipped and live: ocean live feed, ice/glaciers, air-quality, forest (GLAD/Hansen), protected-areas (WDPA), biodiversity (GBIF), VCM (Berkeley BCTP). Data layer frozen; next major work is Countries registry + UI consolidation (Design) + Entities domain.
- **Countries S1 + S2** — Earth agent. S1: additive-only `earth_region_registry` expansion; `RegionIds` guard. S2: fail-explicit `EarthRegionResolver`; E1 referential gap closed; stale schematic copy fixed. Resolver on main — unwired until Countries S3/S5. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Design D1** (`3cd4255` — `earth/design-d1-globe-primary`) — Design agent. Earth+ workstation shell: tab rail restructure; pill BOTTOM-LEFT; filtered score gauge TOP-RIGHT; dark-canvas AppColors. §6 Design Language formally appended to spec. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Connect flips + E1 S4** (`af62d6f`) — Connect agent. Connect flips; E1 slice 4 minimal registration; all 3 render tests ENABLED — zero skips remain. `chore/connect-sheet-test-stall` closed. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Production Release `27415455211`** (`ca91443`) — owner. Countries registry (S1+S2), Design D1 shell, Connect flips + E1 S4 live on `rand0m.ai`. `origin/main` = `ca91443` (Fable-verified). HTTP smoke ✓; visual items fold into R7 consolidated review. ✓
- **Design D2–D5 stack** — Design agent. D2 workspace consolidation (6→3); D3 card taxonomy + detail-surface substitution; D4 detail workspace scaffold + planetary-intelligence surface; D5 cleanup pass (usage/session panels removed, stale cards removed, globe-inheritance compliance confirmed). **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **scientist-entity-resolution + call-site** — Earth agent. RESOLVE-OR-EXPLAIN gate flips; multi-source summary; Connect S5 call-site wired. SourceLifecycleStatus CI fix applied. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Countries S3** (`5897b5d`) — Earth agent. VCM coord→country mapping; lat/long→ISO at ingest. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Connect S5** (`4ec0d24`) — Connect agent (final). Write-path validation; E1 integrity gap closed at runtime. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Timer-leak fix** — Fixes + Systems agents. READY verdict confirmed (3 clean combined runs). **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Uniformity fixes** — Fixes agent. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Full ISO country table (Codex T1 — 249 countries)** — Grunt Pool. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Production Release `27423312204`** (`c150405`) — owner. D2–D5 stack, scientist entity resolution, Countries S3, Connect S5, timer-leak fix, uniformity, ISO table live on `rand0m.ai`. `origin/main` = `c150405` (Fable-verified). HTTP smoke ✓. ✓
- **Systems agent — RETIRED** (session 25). Timer-leak branch merged; `worktrees\rand0m-systems` torn down. Data-vertical scope absorbed by Earth agent. ✓
- **Connect agent — RETIRED** (session 25). S5 merged; `worktrees\rand0m-connect` torn down. Entities + Connect source pipeline scope absorbed by Earth agent. Architectural code boundary unchanged. ✓
- **Owner visual review #1** (session 25). Post-R7 consolidated visual review complete. Verdict: approved direction; consolidate further → IA v2 (D7+D8). Visual suspension lifted. ✓
- **Design D7 Earth View nullschool mode** — Design agent. No-scroll viewport-fit; globe hero; score gauge TOP-RIGHT filter-reactive; stacked proportional row; interactive time-scrubber histogram; pill BOTTOM-LEFT persistent. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **BE chart-series provisions** (`earth/chart-series-provisioning`, `33db79b`) — Earth agent. EarthChartSeries/EarthChartRadar/EarthChartProvisioning gap-aware series objects for D8 chart types. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Design D8 Data View chart vocabulary** (`e35a31d`) — Design agent. Donut/funnel/radar bound to real EarthChartProvisioning series; streamgraph/treemap/scatter-bubble dropped (no real backing). **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Scroll-helper + CustomPainter globe shell** — Earth agent. Scroll-helper and CustomPainter globe in new shell. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Production Release `27432166050`** (`e1e49c7`) — owner. D7 nullschool shell + D8 chart vocabulary + chart-series + scroll-helper live on `rand0m.ai`. `origin/main` = `e1e49c7` (Fable-verified). HTTP smoke ✓. Owner review #2 verdict pending. ✓
- **Cesium slice 2 — browser bridge** — Earth agent (exemplary: main-merged-into-branch, vendored CesiumJS in `web/cesium/` + `VENDOR.md`, env-injected token, `KNIGHTS_CESIUM_ION_API_KEY` reserved fallback). Slice 2 gate-passed (C9). **On main** (merged; Fable-verified SHA TBC — verify with `git log origin/main` before promoting checkpoint). ✓

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.
- **`earth/p17-7-scientist-context-bridge`, `earth/p18-0-earth-agent-activation`, `earth/p18-1-scientist-command-surface`, `earth/p18-2-scientist-preview-response`** — abandoned. Audited: ~74k-line divergent rewrites vs main; not a safe merge basis. @scient1st shipped fresh on `earth/scientist-live-ai-responses` from current `main` instead. Candidates for deletion.
- **`earth_tab.dart` extraction:** merge gate (<2,000 lines) and stretch goal (<1,500 lines) both met and deployed at `6d2c6cb` — file is at 1,375 lines. Gate closed.
- **Earth-Systems vertical:** COMPLETE and deployed (`14d422f`). Systems agent rolls over to Environmental vertical pending owner approval (audit-first).
- **Glaciers:** no governed live source. WGMS FoG pipeline is asset-backed refresh only (`6e0b130`). Integration + registration on main (`57869fc`); data-view wiring in progress. Do not promote glaciers to a live catalog entry without an explicit governance phase.
- **Checkpoint cadence:** Production Releases run approximately every 2 phases. Fable may defer a checkpoint if the phase delta is too small to warrant a release. Do not assume a release follows every merge.
- **Connect worktree bootstrap gap:** two-cycle stall on slice 3 traced to fresh-worktree environment not matching the main-clone environment (Flutter PATH, `env.g.dart`, generated registrants). Mandatory bootstrap sequence now in coordination standards §14. All worktree agents must run it before any `analyze`, `test`, or `build` call.
- **Cursor-timer test hangs (resolved + deployed):** vendored-SDK cursor-timer test hangs fixed by `chore/test-deterministic-cursor` — deployed at `716c4d3`.
- **Glaciers catalog status:** glaciers layer intentionally stays `research` while source metadata is connected (`assetBacked`/`previewFixture` access). Deployed at `9298e84`. Systems agent to confirm or amend catalog promotion via `EARTH:` delta; Earth applies if change required. Do not promote to `assetBacked` without Systems sign-off.
- **Forest layer (19th) — Fable ruling (session 15):** dedicated `forest` layer id added to catalog (not a sub-group of an existing layer). Human-encroachment block remains unchanged — human encroachment is a distinct concept and is not blocked by the forest governance entry. Do not conflate the two.
- **Connect sheet render-test stall (known issue, session 17):** the two remaining skip-marked tests in Connect are NOT caused by the cursor-timer hang. Root cause is a separate Connect sheet render-test stall. Fixes agent diagnosing under `chore/connect-sheet-test-stall`. Do not un-skip these two tests until that fix lands — the cursor-timer fix (`716c4d3`) does not resolve them.
- **Countries mapping integration — new thread (session 17, owner directive):** country-granularity expansion of `earth_region_registry`; countries as first-class regions; sources/layers/entities mappable to country level; feeds Entities region groups + @scient1st regional answers. **DATA/REGISTRY LEVEL ONLY** — no globe boundary rendering; Cesium V2.16 freeze unchanged. Earth agent spec audit underway (session 18).
- **VCM spec amendment (session 18, Fable ruling):** scope filter added — include only projects with `creditsIssued>0 OR creditsRetired>0 AND lat/long present`. `creditsIssued`/`creditsRetired` are neutral registry-accountability fields (permitted). Lat/long stored for map readiness, not rendered (Cesium freeze). Slice 1 @ `70fafbf` built to pre-amendment spec; slice 2 applying amendment. Full ruling in [`architecture/vcm-governance-spec.md`](architecture/vcm-governance-spec.md).
- **Earth/Connect resolver boundary (session 18, binding):** Connect owns the entity resolver; Earth owns consumption. No cross-ownership. Interface contract changes require `DOCS:` callout before implementation. Codified in [`architecture/entities-spec.md`](architecture/entities-spec.md).
- **Scoped local validation (§18, binding):** named test files for touched surface only; no full-suite local runs; CI is the authoritative broad gate. `validate-earth-fast` gains `-TestPaths` (Fixes chore in progress). Known flaky-harness: non-deterministic mid-suite crash (cursor-timer family) — emit `FIXES:` callout and continue; do not block.
- **Owner visual checklists SUSPENDED (session 19, owner directive):** visual spot-checks against `rand0m.ai` deferred until Design D5 merges (R7). Checkpoints verified by HTTP smoke + CI release smoke only. Reason: Data View surfaces under active redesign (D1–D6); visual checks against pre-consolidation layout are not meaningful gates. Will be re-enabled after R7. Previous ⚠ rows for PR `27394511208` superseded by this suspension — reviewed in post-R7 visual pass.
- **Countries spec RATIFIED (session 19, Fable):** ISO tier; no `EarthRegionIds.all` expansion (breaks existing lookups); fail-explicit lookups (missing country = explicit error, not silent fallback); S2 closes E1 gap (resolver queryable by country); VCM coord→country mapping (lat/long → ISO at ingest, not display); 5-slice plan (S1 registry, S2 resolver, S3 VCM mapping, S4 @scient1st regional, S5 cleanup).
- **Design agent — IA consolidation (session 19, owner directive):** promoted from audit to implementation. Worktree `worktrees\rand0m-design`; owns D1–D6 presentation slices. Spec: [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md). Earth agent is merge gate for every D-slice. D1 in flight; pill ruling resolved.
- **Fable checkpoint bundle cadence (§19):** Fable declares checkpoint bundles one cycle ahead — agents know what the next release gate includes before the cycle starts.
- **CONNECTION-HARDENING DATA LAYER COMPLETE (session 20):** all planned data verticals shipped — ocean, ice, air, forest, protected-areas, biodiversity, VCM. Data layer enters maintenance mode; Systems agent idle post-R5. Next Systems work requires a new owner directive.
- **Owner visual checklists SUSPENSION CONFIRMED (session 20):** R5 checklist items (VCM card, biodiversity card, favicon, E1 UI) fold into the R7 post-design visual review. Agents do not need to track individual visual items until R7 triggers the consolidated review.
- **Owner rulings — visual direction (session 20, binding):** Earth+ pill = BOTTOM-LEFT always; filtered score gauge = TOP-RIGHT (filter-reactive); dark-canvas gauge/donut/chip density harmonized with `AppColors`. Reference images provided to Design agent. Full ruling in [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md).
- **R6 bundle declared (session 20, Fable):** Countries S1+S2, Design D1 (+D2 if ready), uniformity fixes, Connect flips + E1 S4. Release approval requested at integration; no automatic release on merge.
- **R6 final bundle (session 21):** uniformity fixes + timer-leak chore SLIPPED to R7 — Systems/Fixes branches never reached remote. R6 final = Countries S1+S2 + D1 + Connect flips+E1 S4 only. Slipped items added to R7 bundle.
- **Countries S1 gate-passed (session 20):** `f82c595` — additive-only registry expansion; `RegionIds` guard in place. No `EarthRegionIds.all` expansion.
- **Countries S2 gate-passed (session 21):** `58361b4` — fail-explicit `EarthRegionResolver` closes the E1 referential gap; stale schematic copy resolved. Stale schematic open callout dropped.
- **Design D1 gate-passed (session 21):** `3cd4255` (`earth/design-d1-globe-primary`) — presentation-only; pill BOTTOM-LEFT ✓; gauge TOP-RIGHT ✓; dark-canvas AppColors. Design's DOCS: callout resolved — §6 formally appended to [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md).
- **Connect render tests ENABLED (session 21):** `af62d6f` — all 3 render tests enabled; zero skips remain in Connect. `chore/connect-sheet-test-stall` resolved by this gate-pass.
- **R7 bundle declared (session 21):** Design D2–D5 + resolver wiring + Intelligence summary + Countries S3 + uniformity fixes + timer-leak chore. R7 closes with owner consolidated visual review (suspended checklist items folded in: VCM card, biodiversity card, favicon, E1 UI).
- **R6 DEPLOYED (session 22):** `ca91443`, Production Release `27415455211` — Countries S1+S2, Design D1, Connect flips + E1 S4. `origin/main` = `ca91443`.
- **Countries S1+S2 deployed note (session 22):** `EarthRegionResolver` is on main but **unwired** — countries are in the registry; resolver is not yet called by Earth layers or @scient1st. Wire-up happens at Countries S3 (VCM coord→country) and S5 (cleanup). Do not assert country-level routing is active until S3/S5 land.
- **Connect render-test stall CLOSED (session 22):** `af62d6f` confirmed zero skips — all 3 render tests enabled. `chore/connect-sheet-test-stall` pivot closed. Skip-marked-tests constraint from CODEX lifted for Connect.
- **R7 integration order declared (session 22):** timer-leak → uniformity → Countries S3 → c2-0 tip → D2–D5 stack → release → owner consolidated visual review. Order is binding — do not resequence without owner directive.
- **SLIP TRACKING added (session 22):** timer-leak and uniformity each at slip=2 (two consecutive cycles missed remote). Escalation path: Fixes runs single-item isolation; Systems runs three-outcome closure (pass / root-cause / descope). Slip counter must be recorded on in-flight rows in Deploy Checkpoint. A third slip triggers owner escalation.
- **D2 planetary-intelligence split deferred (session 22):** planetary-intelligence surface will be implemented in D4 as originally specced — D2 is relocation-only (6→3 workspace consolidation). Do not attempt intelligence wiring in D2 or D3.
- **D2 gate-passed (session 22):** `0381603` — 6→3 workspace relocation; presentation-only; no catalog/Cesium files. Earth gate confirmed.
- **Connect S5 provisional pass (session 22):** `4ec0d24` — write-path validation wired; E1 integrity gap closed at runtime. Provisional pending full R7 integration — not a final gate.
- **Design D3 gate-passed (session 23):** `fdb5b7f` — detail-surface substitution ratified (Fable); taxonomy classes deleted analyze-forced; caveat copy survives per-layer. Presentation-only; Earth gate confirmed.
- **scientist-entity-resolution gate-passed (session 23):** `3d04b23` — resolve-or-explain gate flips + multi-source summary. CI red: `undefined SourceLifecycleStatus` in `earth_entity_region_context_test.dart` (missing import of `models/connect/source_intake.dart`; enum not re-exported by `entity_record.dart`). Earth fix assigned; CI green required before R7. Connect S5 S2 callout CLOSED — standing gap resolved by Earth call-site micro-slice.
- **Countries S3 provisional pass (session 23):** `5897b5d` — VCM coord→country mapping; lat/long→ISO at ingest. Provisional; full gate at R7.
- **Timer-leak UNPROVEN (session 23):** fix is on remote (slip counters reset) but crash recurred during Earth validation after push. Timer-leak merges to R7 only on Fixes' explicit READY verdict after 3 clean combined runs. Do not treat "on remote" as "fixed."
- **New binding standard §20 (session 23):** needing code on main = `git merge origin/main`; never copy files across branches. Connect S5 copied 3 Countries files byte-identical to main — benign this time (dedupes at R7), but pattern prohibited. Standard added to coordination standards.
- **§18 analyze amendment (session 23):** `flutter analyze` is the mandatory final step of every slice, after the last edit. Scoped test runs do not substitute. Motivating case: `earth/scientist-entity-resolution` passed local scoped tests; CI went red on undefined symbol that analyze would have caught. Codified in [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) §18.
- **Fable ruling — sparklines dropped (session 23):** synthetic trend-shaped sparklines banned from D1–D6. Real sparklines require a real time-series source (future slice, new Fable spec required). Replacement: trend chips (`AppColors` tokens). Codified in [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md) §6.
- **Connect S2 callout CLOSED (session 23):** standing S2 callout resolved — Connect S5 `4ec0d24` already wired the validate path; Earth call-site micro-slice closes the remaining gap. No further S2 action needed.
- **STRATEGIC RESTRUCTURE (session 24, owner directive):** end-goal established; governance amended; agent roster restructured; token-economy standards bound. See pivots below.
- **End-goal established (session 24):** animated planetary flow globe (nullschool-class) + governed AI assistant. Roadmap plan updated to C7–C12 (R7→R8→R9 FINAL). Prior 14-day framing retired.
- **Human Activity freeze LIFTED at Tiers 1+2 (session 24, owner directive):** Tier 1 (symbolic motion cues — static corridors/lanes/orbital bands; no live data; RETAINED GLOBE INVENTORY; D6 must not quarantine motion-suite assets) and Tier 2 (aggregate density verticals — flights/ships/satellites; public datasets; identity-suppressed, ≥24h delay floor, fail-closed, health/trend-neutral; Fable spec per vertical) are unblocked. Tier 3 live per-vehicle tracking remains BANNED. Governance spec: [`architecture/human-activity-governance-amendment.md`](architecture/human-activity-governance-amendment.md). Coordination standards §4 taxonomy updated.
- **Agent restructure — effective at R7 (session 24, owner directive):** roster post-R7 = Fable + Earth + Design + Fixes + Docs + CODEX Grunt Pool. Systems retires after timer-leak branch merges; Connect retires after S5 merges. Earth absorbs both scopes. Architectural Earth/Connect code boundary unchanged. CODEX Grunt Pool (OpenAI) handles low-risk mechanical tasks only — named files + acceptance command + do-not-touch list per task; never touches guards, gates, catalog files, or governance logic.
- **Token-economy standards (session 24, binding §21):** thread-sized slices (one coherent unit per run); one visual sign-off per release window (≤5 items, only when UI changed); tests only for governance-critical paths + one FE layout guard per D-slice; single bounded failure-triage pass (no repair loops). Codified in [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) §21.
- **R7 DEPLOYED (session 25):** `c150405`, Production Release `27423312204`. D2–D5 + scientist RESOLVE-OR-EXPLAIN + call-site + Countries S3 + Connect S5 + timer-leak + uniformity + Codex T1 ISO table all live. `origin/main` = `c150405`.
- **Systems + Connect RETIRED (session 25):** wind-down complete. Scopes absorbed by Earth. Worktrees torn down. Post-R7 roster = Fable + Earth + Design + Fixes + Docs + CODEX Grunt Pool.
- **Owner visual review #1 — approved direction, consolidate further (session 25):** post-R7 consolidated visual review complete. Verdict: approved direction; consolidate further → IA v2. Visual suspension lifted. IA v2 spec appended to [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md).
- **Open Branches table rewritten from reality (session 29, T10 audit):** entire prior table was stale — contained branches that had never existed on the remote, inferred names with "(or equivalent)" placeholders, and deployed rows that belonged in Deploy Checkpoints. Table rebuilt from confirmed remote branches only. Lesson recorded in coordination standards §2: Open Branches rows update on Fable gate confirmation only, same as Deploy Checkpoint rows.
- **T8 attribution audit — correction slice in R9 bundle (session 29):** Codex T8 ran an attribution audit across all deployed data verticals. Findings requiring correction: (a) GBIF — mixed-license records (some CC-BY-NC 4.0); license constraint must be explicit in governance drawer. (b) Berkeley VCM — non-commercial restriction (BCTP terms) must appear verbatim, not just implied. (c) WGMS, Hansen (GFW), WDPA — missing or incomplete formal citation strings. (d) Open-Meteo, FIRMS — attribution text absent from governance drawer. Correction slice: `earth/source-attribution-corrections` (R9 bundle). At R9, the governance-drawer text becomes legally exact for all seven sources.
- **T9 density fixtures — pre-staged T3 deliverables (session 29):** Codex T9 pre-staged density test fixtures as T3 deliverables in branch `codex/density-fixtures`. These are consumed by `earth/data-human-activity-density` (the in-flight C10 density vertical). The fixtures branch is an R9 dependency — not an orphan. Earth agent must `git merge --no-edit origin/codex/density-fixtures` into the density branch before its test suite runs.
- **C10 gates all passed (session 30):** Cesium slice 3 `b826abb` (wind+ocean flow fields) ✓; attribution corrections `79d9295` ✓; D6 `8c6857d` ✓ (schematic deleted; preview pair quarantined — T5 evidence pointer confirms preview-only scope; motion suite RETAINED per human-activity governance amendment).
- **Density vertical slip=1 (session 30):** Earth session died mid-slice with local WIP never pushed to remote. `earth/data-human-activity-density` has no remote commits. Density moves to R10; WIP salvage step added to C11 command. R9 bundle is FINAL without density.
- **R9 bundle FINAL declared (session 30):** D6 → attribution corrections → cesium-runtime-base (slices 1–3) + Production Release workflow token injection. No density in R9. Gate: ⛔ HARD BLOCKER (token both places) + Fable gate + owner approval.
- **HARD BLOCKER escalation (session 30, third ask):** `RANDOM_CESIUM_ION_TOKEN` first flagged session 27 (root `.env` only). Session 28: second ask. Session 30 escalation: production CI builds run in GitHub Actions and do not read the local root `.env` file. Token must be set as a **GitHub Actions secret** in addition to root `.env`, or every release build will fall back to CustomPainter. Updated in [`architecture/env-contract-notes.md`](architecture/env-contract-notes.md).
- **R10 FINAL scope defined (session 30):** Tier 2 density vertical (restart/salvage from dead session) + Tier 1 symbolic motion cues (RETAINED GLOBE INVENTORY) + @scient1st globe-context wiring + hardening → R10 FINAL release + owner final review.
- **Owner open items (session 30):** (a) Set `RANDOM_CESIUM_ION_TOKEN` in root `.env` AND as GitHub Actions secret (⛔ HARD BLOCKER, third ask). (b) R8 owner review #2 verdict PENDING (post-R8-deploy, ≤5 viewport/chart items). (c) Approve R9 release.
- **R8 DEPLOYED (session 28):** `e1e49c7`, Production Release `27432166050`. D7 nullschool shell + D8 chart vocabulary + chart-series + scroll-helper live. `origin/main` = `e1e49c7`. Owner review #2 verdict PENDING (post-deploy, ≤5 viewport/chart items).
- **Cesium slice 2 gate-passed exemplary (session 28):** browser bridge, vendored CesiumJS (`web/cesium/` + `VENDOR.md`), env-injected token, `KNIGHTS_CESIUM_ION_API_KEY` reserved fallback mirroring the weather provider pattern. Merge discipline: main-merged-into-branch (§20 followed). Token pattern documented in [`architecture/env-contract-notes.md`](architecture/env-contract-notes.md). Full env-injection approach: `RANDOM_CESIUM_ION_TOKEN` in root `.env`; fallback produces graceful CustomPainter globe, not a crash.
- **BLOCKER — RANDOM_CESIUM_ION_TOKEN unset (sessions 27–28, second ask):** Ion token has not been set in root `.env`. R9 nullschool deliverable falls back to CustomPainter globe until owner sets it. Owner must provide a domain-restricted scoped Cesium Ion token. Do not mark R9 ready without confirming token is present.
- **Earth-agent session replaced (session 28):** session memory replaced; protocol held. Fresh Earth agent resumes from the agent command template + `git log origin/main` check. No state loss — all work is in git.
- **R9 bundle declared (session 28):** Cesium slices 2+3 + Tier 2 density (guard-gate pass required) + D6 verdicts pass (motion suite RETAINED) → R9 nullschool release. Owner visual review #3 post-deploy (globe-specific, nullschool). Gate: Ion token set + all C10 work complete + Fable gate.
- **D6 verdicts reinstated as C10 scoped cleanup (session 28):** D6 was SUPERSEDED by IA v2 (session 25). Reinstated as a scoped verdicts pass — not a wholesale deletion sprint. Motion suite RETAINED per human-activity governance amendment. Design agent runs deletion verdicts only; no globe geometry files removed without Earth agent confirmation.
- **C10 in flight (session 28):** Cesium slice 3 flow fields (Earth); Tier 2 density vertical guard-first (Earth — Fable spec required per vertical); D6 verdicts pass scoped (Design). All three land in R9 bundle.
- **Release split — R8/R9/R10 (sessions 26–27, owner directive):** prior R8 (globe review) split into three releases. R8 = UI consolidation (D7+D8+chart-series+scroll-helper+CustomPainter globe; owner review #2 ≤5 viewport/chart items post-deploy). R9 = Cesium boot + flow fields (nullschool release; own visual review). R10 FINAL = Tier 2 density + @scient1st globe-context + hardening. Same end goal; same end date. Cycle table updated.
- **Cesium-runtime-base slice 1 gate-passed `760c51a` (session 27):** governance core only — Cesium selection model, runtime abstraction, and fallback path. NO browser bridge in this slice; slice 2 (browser bridge) required before renderer swap. Ion token not yet set — owner action required (RANDOM_CESIUM_ION_TOKEN in root .env, domain-restricted scoped token).
- **D8 gate-passed `e35a31d` (sessions 26–27):** Data View chart vocabulary — donut/funnel/radar bound to real EarthChartProvisioning series; streamgraph/treemap/scatter-bubble dropped (no real backing data). SECOND copy-instead-of-merge incident (byte-identical, benign — D8 branch picked up chart-series files; dedupes at merge). §20 standard amended — see coordination-standards §20.
- **D7 gate-passed (C8):** Earth View nullschool mode — no-scroll viewport-fit; globe hero; score gauge TOP-RIGHT; stacked proportional row; time-scrubber histogram; pill BOTTOM-LEFT persistent. Pending R8 merge by Earth.
- **BE chart-series gate-passed `33db79b` (C8):** `earth/chart-series-provisioning` — gap-aware EarthChartSeries/EarthChartRadar/EarthChartProvisioning series objects for D8. Pending R8 merge by Earth.
- **§20 standard amended — explicit merge step in commands (sessions 26–27):** D8 = second copy-instead-of-merge incident (first: Connect S5, session 23). Amendment: any agent command or HANDOFF that has an unmerged-branch dependency must name the explicit merge step (`git merge origin/<branch>`) inline in the command. It is not sufficient to assume the receiving agent will discover the dependency. Codified in [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) §20.
- **Owner action items (session 27):** (a) Set `RANDOM_CESIUM_ION_TOKEN` (domain-restricted scoped Ion token) in root `.env` — required before Cesium renderer swap starts. (b) Approve R8 release. (c) Perform owner review #2 post-R8-deploy (≤5 viewport/chart items).
- **IA v2 — D7 + D8 (session 25, owner directive):** D6 deletion-pass superseded. D7 = Earth View nullschool mode (no-scroll viewport-fit; globe hero; gauge TOP-RIGHT filter-reactive; stacked proportional row; interactive time-scrubber histogram; pill BOTTOM-LEFT persistent while sheet open; reference mocks = inspiration only). D8 = Data View chart vocabulary (donut/rings, radar, streamgraph, treemap, scatter/bubble, funnel; binding rule: every chart binds to real model series — synthetic data prohibited; BE provisions gap-aware series).
- **Cycle table updated for IA v2 (session 25):** C8 = D7 + BE chart-series + Cesium data groundwork; C9 = Cesium renderer swap into D7 shell + D8 + Tier 2 density vertical; C10 = motion cues + region-tap + @scient1st globe-context → R8. Codex T3 fixtures banked in C8.
- **Fable ruling pending — Cesium Ion token handling (session 25):** required before C9 Cesium renderer swap. Do not implement Cesium Ion integration without ruling on record. Fable to deliver ruling before C9 opens.
- **Authenticated/visual smoke — owner-performed (§17, binding):** authenticated smoke and visual verification of `rand0m.ai` is performed by the **owner personally**. Agents perform HTTP-level smoke only. Checkpoint HANDOFFs close with an owner visual checklist (not agent-executed). Checkpoints are not marked visually verified until the owner confirms. No browser automation, no Claude-in-Chrome for smoke. Codified in coordination standards §17.
- **Protected-areas — Fable ruling (session 16):** `wdpa-protected-area-summary` catalog availability = metadata-source axis only. `earth_protected_area_integrity` stays `insufficientEvidence` — integrity is a separate axis and is not unified with availability. Do not conflate. License constraint: WDPA data is non-commercial/no-redistribution; enforce at the catalog layer.
- **`connect-card-overflow-fix` (session 16):** 0.118px RenderFlex on `connect_source_card.dart:88` broke `validate-earth-fast` green on every run. Fixed and merged at `3ab6786`. This was a known recurring CI noise issue — record as resolved.
- **VCM approved (session 16):** owner-approved VCM / Carbon-offset data vertical. Assigned to Systems agent. Queued after biodiversity Environmental slice lands. Do not start VCM implementation until biodiversity is deployed (sequencing constraint — same Systems worktree, avoid parallel vertical work).
- **Entities approved (session 16):** owner-approved Entities domain. Assigned to Connect agent. Started this cycle — prerequisite (Connect source intake pipeline `c2-0`) now at `3ab6786`. `c2-0` branch kept open per owner until Entities stacking decision is confirmed.
- **F1.0 favicon:** owner-APPROVED (session 17). Merging this cycle alongside biodiversity. Production Release pre-approved.
- **Future-infra queue — GFW near-real-time forest alerts:** GFW live forest alerts are technically feasible via a Firebase callable proxy following the FIRMS pattern. A new callable is required. This is an approved concept placed in the infra queue — do not implement without an explicit approved infra slice directive from the owner.
- **Future-infra queue — remote-config budget + kill switch:** runtime kill switch and remote-config-backed budget for `sessionTokenBudget`/`maxPromptTokens` are approved in concept. Do not implement without explicit instruction (separate approved phase required).
- **Branch disjointness checks:** always use three-dot diff (`git diff main...branch`), never two-dot (`git diff main..branch`). Two-dot includes main drift in the diff and produces false-alarm conflicts. This occurred in session 12 and is now codified in coordination standards §13.
- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the live-AI path requires a code change, rebuild, and Production Release — not a runtime toggle. Live answers cost real tokens via the Default AI Provider through `generateAIResponse` Firebase callable.
- **`sessionTokenBudget=50000` / `maxPromptTokens=12000` are compile-time in-memory soft guards.** They reset on app relaunch and do not hard-cap Firebase Function invocations. Owner-accepted at this checkpoint. Future infra queue: remote-config budget + runtime kill switch (separate approved phase required — do not implement without explicit instruction).
- **F1.0 Dynamic Web Favicon containment (Fixes agent, owner-sanctioned exception):** `feature/f1-0-*` branch holds the favicon feature. It is an approved exception to the Earth-only lockdown. Merge order is enforced: `feature/f1-0-*` merges to main **only after** the `earth/scientist-session-continuity` checkpoint deploy is confirmed. Do not `git checkout` or `git switch` to `feature/f1-0-*` in the shared `apps/rand0m` clone while Earth's merge or deploy is pending.
- **Ocean-currents catalog status:** remains `research` despite live-loader card wiring. Card surfaces the layer; underlying data feed is not live. Intentional — matches air-quality health-neutral, card-only pattern.

---

## Open Branches

_Rows reflect current remote branches confirmed by Fable gate or `git log origin/main`. All stale/never-existed rows removed (T10 audit, session 29). **Rule: Open Branches updates come from Fable gate confirmations only — same standard as Deploy Checkpoint rows.** Codified in coordination standards §2._

| Branch | Repo | Status | R9 bundle |
| --- | --- | --- | --- |
| `earth/cesium-runtime-base` | xyz | Slices 1 (`760c51a`) + 2 gate-passed; slice 3 `b826abb` gate-passed (C10); **pending R9 merge** | R9 |
| `earth/source-attribution-corrections` | xyz | `79d9295` gate-passed (C10); **pending R9 merge** | R9 |
| `earth/design-d6-dead-surface` | xyz | `8c6857d` gate-passed (C10); schematic deleted; preview pair quarantined; motion suite RETAINED; **pending R9 merge** | R9 |
| `earth/data-human-activity-density` | xyz | **NEVER PUSHED** — Earth session died mid-slice; local WIP only; salvage/restart required; **slipped to R10** (slip=1) | R10 — depends on `codex/density-fixtures` |
| `codex/density-fixtures` | xyz | Pre-staged T3 deliverables — density test fixtures for density vertical | R10 dependency — consumed by `earth/data-human-activity-density`; not an orphan |

---

## Archive (Historical Notes)

_Architecture notes in [`READLESS/architecture/`](architecture/) with no active inbound links are **retained history** — not orphans to delete. T10 audit (session 29) identified these files as informational/reference only; they document completed phases and decisions made before the current roadmap. Do not delete. If a file needs to be referenced again, link it from a Pivot entry._

---

## Pending Owner Approval

_Items that require an explicit owner decision before any agent proceeds._

**1. Scenario-engine ↔ @scient1st integration (pre-spec)**
A pre-spec is proposed for wiring the Earth scenario engine into @scient1st
response generation — scenarios inform context, @scient1st surfaces results.
No implementation scope, timeline, or agent assignment is approved yet.
Requires owner sign-off on: scope boundaries, whether scenario engine changes
are in-scope for the next Earth phase, and which agent owns the work.

**2. Connect-agent staffing** ✓ **— approved and active.** Connect agent on `feature/c2-0-source-onboarding-pipeline` (`worktrees\rand0m-connect`). Slices 3–4 in progress.

**3. Earth-Systems vertical** ✓ **— COMPLETE and deployed.** Ocean live feed + registration live at `14d422f`. Systems agent ready for rollover.

**4. Systems-agent rollover to Environmental vertical** ✓ **— approved by owner command (session 13).** Audit underway; findings due this cycle via `DOCS:` callout. No implementation until audit findings are ratified. Per §15: owner issuing the command is the approval; no roadmap re-gate required.

**5. VCM / Carbon-offset** ✓ **— OWNER-APPROVED (session 16).** Assigned to Systems agent. Queued after biodiversity Environmental slice is deployed. Per sequencing constraint: do not start until biodiversity lands (same Systems worktree). Governance spec (Fable) to be delivered before catalog registration — no catalog entry without approved spec.

**6. Entities domain** ✓ **— OWNER-APPROVED (session 16).** Assigned to Connect agent. Started this cycle — prerequisite Connect intake pipeline (`c2-0`) at `3ab6786`. Per §16: owner command is the approval; no re-gate required. Fable governance spec to be delivered before catalog registration.

**7. Earth+ pill corner ruling** ✓ **— RESOLVED (session 20).** Owner ruled: BOTTOM-LEFT always. D1 unblocked. Design agent proceeding.

_All items resolved or approved._

---

## Roadmap-vs-Git Ancestry Anomaly

**Status: closed** (session 3 correction; standards codified in [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) §6).

Root cause: roadmap seeded from session memory rather than `git log` / `git merge-base` verification. Standing rule: always verify `origin/main` SHA with `git log -1 origin/main` before recording it. Never copy a SHA from prior-session prose.

---

## Human Continuation Command Templates

Reusable starters for resuming any agent in a new session. Swap `<task>` for the
pinned Next item or a HANDOFF `next:` field.

**Docs agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md — update it and READLESS as needed (sole write owner).
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callout for Earth related development.
Suggest next agent command using same command format.
```

**Earth agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
```

**Fable agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Earth-agent callouts rather than implementing runtime code or merging branches (spec and plan only).
```

**Fixes agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callouts rather than modifying Earth feature files (CI/workflow/hygiene only).
```
