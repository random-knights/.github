# Earth — paste-ready commands (deploys + agent lanes)

## A. Deploys — run in a NORMAL PowerShell (not admin, don't double-click the .bat)

Why the .bat "failed": double-clicking opens a window that **closes the instant anything errors**, so you never see why — and **Run-as-admin** starts an Administrator shell that is **not logged into your `firebase`/`gcloud` accounts** (auth is per-user), so deploys fail. Open a regular PowerShell and run commands there.

**1. Confirm the tools exist + you're logged in:**
```powershell
firebase --version      # not recognized? -> npm install -g firebase-tools
gcloud --version        # not recognized? -> install Google Cloud SDK
firebase login:list     # must list your account
gcloud auth list        # must show an ACTIVE account
```

**2. Deploy the score + aragonite functions and force a refresh:**
```powershell
cd C:\Projects\dev-kitt\apps\rand0m\functions
npm run build
cd C:\Projects\dev-kitt
firebase deploy --only "functions:earthHealthScoreRefresh,functions:earthAragoniteRefresh" --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthHealthScoreRefresh-us-central1 --location us-central1 --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthAragoniteRefresh-us-central1   --location us-central1 --project randomknights-xyz
```

**3. Worker (finer air-quality/forest grids + GBIF biodiversity):**
```powershell
gcloud run jobs deploy earth-worker --source C:\Projects\dev-kitt\apps\rand0m\worker --region us-central1 --project randomknights-xyz
gcloud run jobs execute earth-worker --region us-central1 --project randomknights-xyz
```

**4. Verify it landed (ocean should no longer be 0):**
```powershell
$b="https://storage.googleapis.com/randomknights-xyz.firebasestorage.app"
(Invoke-RestMethod "$b/earth/score/health-score.json?cb=$(Get-Random)").global
```

> Shortcut once the tools check out: `cd C:\Projects\dev-kitt ; .\tooling\scripts\earth-ops.bat score` (from an open terminal). The raw commands above are what it runs.

---

## B. Agent lanes — create the worktrees, then paste one prompt per fresh agent

**Create all five worktrees (run once):**
```powershell
cd C:\Projects\dev-kitt
git fetch origin
git worktree add -b earth/r1-scalar  worktrees/rand0m-r1-scalar  origin/main
git worktree add -b earth/r2-points  worktrees/rand0m-r2-points  origin/main
git worktree add -b earth/s-snapshot worktrees/rand0m-s-snapshot origin/main
git worktree add -b earth/p-perf     worktrees/rand0m-p-perf     origin/main
git worktree add -b earth/t-state    worktrees/rand0m-t-state    origin/main
```

### Agent 1 — Lane R1 (scalar overlay) — PARALLEL
```
Work ONLY in worktrees/rand0m-r1-scalar (branch earth/r1-scalar, off origin/main). Full spec: tooling/scripts/EARTH-NEXT-COMMANDS.md, Lane R1.
Edit ONLY web/earth_scalar_field.js, web/earth2d_scalar.js, and palette tables — no Dart, no earth_tab/shell, no other web/earth*.js.
Deliver: per-layer alpha policy (continuous layers SST/air/forest stay OPAQUE; sparse/alert layers BAA + waves become value-gated so highs highlight and empty cells go transparent — kill the BAA blanket wash); render coastline + admin-0 country borders ON TOP of the overlay; review palette + min/max per layer. Keep the two renderers byte-faithful (golden-LUT parity test must pass).
Do NOT deploy. Run JS/golden-LUT tests + `flutter analyze`. Commit to your branch and report a diff + 2D/3D screenshots of BAA and SST. Rebase on origin/main before any merge.
```

### Agent 2 — Lane R2 (point clustering + LOD) — PARALLEL
```
Work ONLY in worktrees/rand0m-r2-points (branch earth/r2-points, off origin/main). Full spec: tooling/scripts/EARTH-NEXT-COMMANDS.md, Lane R2.
Edit ONLY web/earth_point_field.js, web/earth2d_points.js, and tooling/scripts/build_earth_pointsets.py — no Dart/shell files.
Deliver: annotation clustering + zoom LOD (super-dots that expand into members as you zoom) for protected-areas, threatened-species, wildfires — fix the over-dense "continents buried in dots". Fix biodiversity (10 reps is broken: densify or refold into another layer) and state which. This is the real stippling fix.
Do NOT deploy. Provide screenshots at 3 zoom levels as proof. Commit + report. Rebase before merge.
```

### Agent 3 — Lane S (snapshot card) — PARALLEL
```
Work ONLY in worktrees/rand0m-s-snapshot (branch earth/s-snapshot, off origin/main). Full spec: tooling/scripts/EARTH-NEXT-COMMANDS.md, Lane S.
Edit ONLY widgets/earth/earth_layer_snapshot_card_view.dart and its test.
Deliver: remove the in-popup SEARCH box (TextField + query state). Click a CLUSTER -> show ALL the cluster's data (members, scrollable, NO search) + an ALWAYS-visible hyperlinked "Browse in Data View" footer. Click a SINGLE dot -> its own governed fields with a common-name-first headline and scientific name as subtitle. Decouple routing: accept an injected callback onBrowseInDataView(layerId, {clusterKey}); default it to a plain Data-View tab switch (Lane T wires the URL deep-link later). Update tests: drop the cluster-browse-search/-clear keys, keep the browse key, assert the member list + the persistent link.
Do NOT deploy. `flutter analyze` + widget tests green. Commit + report. Rebase before merge.
```

### Agent 4 — Lane P (perf / mobile) — PARALLEL
```
Work ONLY in worktrees/rand0m-p-perf (branch earth/p-perf, off origin/main). Full spec: tooling/scripts/EARTH-NEXT-COMMANDS.md, Lane P.
Edit ONLY web/index.html (Cesium shim), widgets/earth/earth_visualization_stage.dart, widgets/earth2d/earth2d_renderer_toggle.dart.
Deliver: lazy-load Cesium (~6MB) only when 3D is selected (default is 2D), keeping the App-Check-armed Ion token path intact; mobile renderer caps (particle count, grid sample density) by width; visibilitychange -> suspend the renderer when the tab is hidden, resume on show; 360px usability pass.
Do NOT deploy. `flutter analyze` + tests; confirm 2D-default loads with NO Cesium bytes. Commit + report. Rebase before merge.
```

### Agent 5 — Lane T (earth state + chrome) — SERIAL (runs concurrently with 1–4; do not split)
```
Work ONLY in worktrees/rand0m-t-state (branch earth/t-state, off origin/main = fa3d16c, which has the Batch-4 history model+source). Full spec: tooling/scripts/EARTH-NEXT-COMMANDS.md, Lane T. This is SERIAL: do T1..T6 IN ORDER, one commit each. You own pages/earth/earth_tab.dart + widgets/earth/earth_workstation_shell.dart + the chrome/filter-panel + models/earth/earth_query_engine.dart + models/earth/earth_agent_context.dart (scient1st grounding); no other lane touches these.
T1 URL active-filter breadcrumbs: serialize region, mode, the EarthFilterState slots (overlay/animate/annotation), projection, 2D/3D, and time window into the URL hash (nullschool-style, e.g. #human-footprint/sst/orthographic/2d/now/na); read on load, replaceState on change; add a services/navigation/ url-sync; expose deep-link builders (one for Lane S's "Browse in Data View", one for layer->Data-View-section).
T2 mode->overlay decouple: mode re-lenses the SCORE and does NOT auto-select overlays/animations. [Owner-confirmed: see chat.]
T3 score-history UI wiring: thread LiveStorageHealthScoreHistorySource + EarthHealthScoreHistory through earth_tab/home.dart + earth_summary_panel; on a PAST time window show the historical number, with a "building history" label when older than the first accrued day.
T4 active chips, 3 rows: Row1 region + 2D/3D pill, Row2 mode, Row3 active overlay·animation·annotation (only the ones ON); drop the duplicate time row; add selectedMode to the shell and thread it from earth_tab; chips must read the SAME state the filter panel writes.
T5 TOP-BAR MERGE ONLY (owner-approved): put the Globe/Data segmented toggle + the "Ask @scient1st" field on ONE row (toggle left, field flexes). Do NOT collapse earth+ to a rail, fold Scale/Source/Projection, auto-dim chrome, re-float panels, or change the score ring — those are HELD for the owner's device-pass (earth+ side-menu is NOT approved). Make this one change minimal and reversible.
T6 @scient1st grounding accuracy (2nd pass): fix which dataset the prompt-bar answers ground on. In earth_query_engine.dart add dataset-intent routing — emitters/emissions/polluters -> businesses-footprint (Top Emitters / Climate TRACE) + industrial-sites; offsets/credits/carbon projects -> carbon-offset-projects (Berkeley VCM); threatened/endangered species -> species; datacenters -> datacenters; protected areas/parks -> protected-areas-points. In earth_agent_context.dart build the per-region summary from the MATCHED dataset (today it only assembles VCM + health), label sources honestly (Climate TRACE = measured emissions; VCM = offsets issued/retired, NOT emissions), and make the answer NAME the dataset it used. Never answer an emissions question from offset data (the "how many top emitters in africa -> Uganda 170 VCM projects" bug). Add a query-engine test per dataset intent.
Do NOT deploy. `flutter analyze` + tests green after EACH step. Rebase on origin/main before merge.
```
