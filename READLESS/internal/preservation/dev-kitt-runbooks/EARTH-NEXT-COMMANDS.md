# EARTH — next commands (parallel-safe lanes)

Supersedes `EARTH-UI-COMMAND.md` (snapshot revised per the cluster note; chips + tightening folded into Lane T). Built on the `fa3d16c` handoff.

---

## 0. Owner runbook — do this FIRST (~15 min, then device-pass)

1. **Sync the working checkout** — it's behind `origin/main`; the Batch-4 history model/source (`EarthHealthScoreHistory`, `LiveStorageHealthScoreHistorySource`) aren't in it yet:
   ```powershell
   cd C:\Projects\dev-kitt\apps\rand0m ; git checkout main ; git pull --ff-only origin main   # -> fa3d16c
   ```
   (Lane agents branch off `origin/main`, so they get it automatically — this is for your local builds.)
2. **Deploy** (via `earth-ops`, now aware of `earthAragoniteRefresh`):
   - `earth-ops score` — redeploy + run `earthHealthScoreRefresh`. This one function now carries the v0.4 score **and** the daily-snapshot history → fixes the live `ocean=0` and starts accruing the timeline.
   - `earth-ops deploy earthAragoniteRefresh` then `earth-ops run earthAragoniteRefresh` — the v0.4 ocean-acidification refresher.
   - `earth-ops worker` — earth-worker for finer air-quality/forest grids + live GBIF biodiversity (feeds Lane R1/R2 data).
   - Then **wf80** + the device-pass.
3. **Expect "building history"** on past time windows until snapshots accrue (one per UTC-day post-deploy). That's correct, not a bug.

What's inherently yours (can't be done headless): the **device-pass** for the graphics/platform lanes (R1, R2, P), and the **T2 confirm** below.

---

## Parallel-safety (recap §22/§23)
Each lane = its own worktree off `origin/main` (`fa3d16c`); file-disjoint; contracts imported never copied; **rebase-before-merge** for any earth-page Dart file. **Lanes R1, R2, S, P are file-disjoint → run all four in parallel.** **Lane T is one serial agent** (its steps all mutate `earth_tab.dart` + the shell; splitting them is exactly what corrupts merges) — but it runs concurrently with R1/R2/S/P since those touch different files.

---

## ▶ Lane R1 — Scalar overlay polish (Batch 1) — PARALLEL
**Files:** `web/earth_scalar_field.js`, `web/earth2d_scalar.js`, palette tables. Keep both renderers lock-step (golden-LUT parity test).
- **Per-layer alpha policy** (the key nuance): continuous layers (SST, air, forest) stay **OPAQUE** (the standing no-base-bleed rule); **sparse/alert layers (BAA, waves) become value-gated** — high values highlight, low/empty cells go transparent — so BAA stops being a blanket wash you can't see Earth under. Drive it off a per-layer flag, not a global alpha.
- **Coastline + admin-0 borders rendered ON TOP** of the overlay, so land/ocean + country borders read through any overlay.
- **Palette + min/max review** per layer.
- Owner runs earth-worker for the finer CAMS/forest grids (data, not this lane).
- **Verify:** golden-LUT parity passes; screenshot BAA + SST in both 2D and 3D.

## ▶ Lane R2 — Point clustering + zoom LOD (Batch 2) — PARALLEL
**Files:** `web/earth_point_field.js`, `web/earth2d_points.js` (+ data: `tooling/scripts/build_earth_pointsets.py` for biodiversity).
- This is the **real "stippling" fix** (handoff key finding: it's the dense point layers, not the scalar overlay).
- **Clustering + zoom LOD:** super-dots that expand into members as you zoom, for protected-areas / threatened-species / wildfires — kills the "Europe & N. America entirely covered in dots" over-density.
- **Biodiversity:** 10 reps is broken — densify (more representative points) or refold into another layer; decide + implement.
- **Verify:** screenshot at 3 zoom levels; confirm clusters expand and biodiversity reads.

## ▶ Lane S — Snapshot card (revised) — PARALLEL
**File:** `widgets/earth/earth_layer_snapshot_card_view.dart`.
- **Remove the in-popup SEARCH box** (the `TextField` + query state) — search belongs in Data View.
- **Click a CLUSTER → return ALL the cluster's data** in the snapshot (its members), scrollable, **no search box**, and **always** a hyperlinked **"Browse in Data View"** footer.
- **Click a SINGLE dot → its own governed fields** (common-name-first headline, scientific name as subtitle — matches the records browser now that `ingest_species_locations` enriches vernaculars).
- Decouple from routing: take an injected callback `onBrowseInDataView(layerId, {clusterKey})`. Lane T wires it to the URL deep-link; until then it does a plain Data-View tab-switch. The footer link is **always visible**, even when members are listed.
- **Tests:** drop the `earth-cluster-browse-search/-clear` keys; keep the browse key; assert the member list + the persistent hyperlink.

## ▶ Lane P — Perf / mobile (Batch 5) — PARALLEL
**Files:** `web/index.html` (Cesium shim), `widgets/earth/earth_visualization_stage.dart`, `widgets/earth2d/earth2d_renderer_toggle.dart`.
- **Lazy-load Cesium (~6MB)** only when 3D is selected (default is 2D) — keep the App-Check-armed Ion token path intact.
- **Mobile renderer caps** (particle count, grid sample density) gated by device/width.
- **`visibilitychange` → suspend** the renderer when the tab is hidden; resume on show.
- **360px usability** pass.
- **Verify:** 2D-default loads with no Cesium bytes; 3D toggles in cleanly; throttled-CPU + 360px device-pass (yours).

## ▶ Lane T — Earth state + chrome — ONE SERIAL AGENT (concurrent with R1/R2/S/P)
Branch off `fa3d16c` (has the Batch-4 history model+source). Edits `pages/earth/earth_tab.dart` + `widgets/earth/earth_workstation_shell.dart` + chrome. Commit each step separately; do in order.

- **T1 — URL active-filter breadcrumbs (foundational).** Serialize the active state into the URL hash, nullschool-style (e.g. `#human-footprint/sst/orthographic/2d/now/na`): mode, the layer slots from `EarthFilterState` (`models/earth/earth_filter_state.dart` — `overlayLayerId`/`animateLayerId`/`annotationLayerId`/`selectedLayerIds`), projection, 2D/3D, time window, region. Read on load (deep-link), write on change via `replaceState` (no history spam). Add a url-sync service under `services/navigation/`. Expose (a) a state→hash builder for Lane S's "Browse in Data View" deep-link, and (b) a layer→Data-View-section deep-link.
- **T2 — Mode→overlay decouple.** Mode becomes a **display lens only** — it changes the scored lens but does **not** auto-select or re-weight overlays/animations. **[OWNER CONFIRM: display-only, not a re-weight — yes?]** Lives in `earth_tab` state.
- **T3 — Score-history UI wiring (Batch-4 leftover).** Thread `LiveStorageHealthScoreHistorySource` + `EarthHealthScoreHistory` through `earth_tab`/`home.dart` + `earth_summary_panel.dart`: on a PAST time window show the historical number (window→date lookup); show the "building history" label when older than the first accrued day. (Model + source already on main.)
- **T4 — Active chips (3 rows).** Row 1 = region + `2D/3D` pill; Row 2 = mode; Row 3 = active overlay·animation·annotation (only the ones ON). **Drop the duplicate time row** (the timeline below already shows it). Add `selectedMode` to the shell, thread from `earth_tab`. Chips must read the SAME state the filter panel writes (no parallel copy).
- **T5 — Top-bar merge ONLY (owner-approved).** Put the Globe/Data segmented toggle and the "Ask @scient1st" field on ONE row (toggle left, field flexes). **Do NOT** collapse `earth+` to a rail, fold Scale/Source/Projection, auto-dim chrome, re-float panels, or change the score ring — all of those are **HELD** for the owner's device-pass on staging (an `earth+` side-menu is explicitly not approved). The goal — Earth prime + center — stands; the *mechanism* is the owner's call after seeing it live. Deferred menu kept here for that pass: earth+ icon-rail, Scale/Source/Projection disclosure, drag/zoom auto-dim, mobile panel-float, score-ring pill.
- **T6 — @scient1st grounding accuracy (2nd pass).** Fix which dataset the prompt-bar answers ground on (the "how many top emitters in Africa → Uganda 170 VCM projects" bug — it answered an *emissions* question from *offset* data). In `earth_query_engine.dart` add dataset-intent routing: emitters/emissions/biggest-polluters → `businesses-footprint` (Top Emitters, Climate TRACE) + `industrial-sites`; offsets/credits/carbon-projects → `carbon-offset-projects` (Berkeley VCM); threatened/endangered species → `species`; datacenters → `datacenters`; protected areas/parks → `protected-areas-points`. In `earth_agent_context.dart` build the per-region summary from the MATCHED dataset (today it only assembles VCM + health), and label sources honestly — Climate TRACE = measured emissions; Berkeley VCM = offsets issued/retired, which are NOT emissions and don't guarantee impact (the existing disclosure). The answer must NAME the dataset it used and never conflate offsets with emissions. Reuse the existing dataset→section labels (`businesses-footprint`=Top Emitters, etc.). Add a query-engine test per dataset intent. Files: `models/earth/earth_query_engine.dart`, `models/earth/earth_agent_context.dart` (disjoint from R1/R2/S/P — Lane T stays parallel-safe).

Optional split: **T-state** (T1–T3: `earth_tab`/`home`/url-service/score-panel), **T-chrome** (T4–T5: shell/chrome/filter-panel, rebases after T-state), and **T6** (the scient1st `earth_query_engine`/`earth_agent_context` files — independent, can run as its own parallel sub-agent). Only if you want the extra parallelism; otherwise one agent does all six in order.

---

## Did the handoff change the recommendation?
Yes, three ways: (1) Batch-4 history backend is **done**, so it shrank to UI wiring (**T3**); (2) the snapshot is **revised** — cluster now shows *all* its data + a persistent hyperlink (your note), not just a count; (3) added the **URL-breadcrumbs lane (T1)**, which the snapshot deep-link depends on. Chips (T4) + tightening (T5) are unchanged.
