# EARTH — corrective fix pass (from a live audit of staging `171f1dd`)

I tested `randomknights-xyz.web.app` first-hand (Globe View, reload, About→XYZ nav, earth+ overlay switching). The four lanes merged, but **they did not achieve the visual intent** — and there's a new regression. Honest root cause: the lanes were validated with `flutter analyze` + unit tests, **not by looking at the rendered globe**. That's why "tests passed" while the globe looks broken. This pass fixes the actual rendered behavior and **mandates visual verification**.

## North star (re-anchor): nullschool parity
You should ALWAYS see land / ocean / country borders. Overlays are gated or semi-transparent so geography shows through — color only where there's real signal. Point markers are clean, not blobs. The snapshot shows the clicked thing's data.

## Verified issues (first-hand)

**P0 — Data-less globe on entry.** Reload OR About→XYZ comes up as a bare sphere (borders only); the active overlay/annotation in the bottom-right chips ("Carbon Offset Projects") does **not** paint. After 7s the layers never appear; `__earthCesium.viewers` is `[]`. Layers only render after I manually toggle one in earth+. → a layer re-attach/sync race on mount, likely worsened by Lane P's lazy-load / visibility-suspend.

**P0 — BAA (and sparse/alert overlays) blanket the globe.** Selecting Bleaching Alert Area paints the ENTIRE sphere opaque green (value-0 / no-stress areas included), burying land, ocean, and borders. R1's "value-gate" did not work. nullschool's exact opposite.

**P1 — Clustering looks worse.** R2's point clustering renders as large opaque overlapping circles ("blobs") over whole regions instead of clean markers. Worse than before.

**P1 — Snapshot still count-only.** Clicking a cluster shows "83 projects" + a Data-View hint, not the cluster's members. (S removed the search but kept the count-only path for carbon-offset/VCM.)

**P2 — Not in this batch (they're the un-run Lane T):** the bottom-right chips are still region/time/layer (no mode/2D-3D/active-visuals), the tab/input isn't merged, no URL breadcrumbs, and @scient1st grounding (the "top emitters → VCM" bug) is unfixed.

**Noise (separate, low priority):** console shows a benign `volume_controller` MissingPluginException and a `ThemeCard` "video unavailable" (a media asset, not Earth).

## Corrective lane — ONE focused agent, screenshot-verify EACH fix
Branch off `origin/main` (`171f1dd`). Output/render only — do not touch deploy automation, governance catalogs, or secrets.

- **FIX-1 — overlay alpha so geography ALWAYS shows (redo R1; confirmed broken for BAA AND Air Quality).** nullschool rule: coastlines/country borders are visible through any overlay. (a) alert/sparse layers (BAA, waves) → alpha 0 below the alert threshold so most of the globe is clear, color only at alerts; (b) continuous layers (SST, Air Quality) → render coastlines + admin-0 borders ON TOP at full strength and hold fill alpha below ~0.85 so borders read. SST is the reference (land-masked, geography visible) — match it. Files: `web/earth_scalar_field.js`, `web/earth2d_scalar.js`. **VERIFY:** screenshot BAA *and* Air Quality — land/ocean/borders must show through both.

- **FIX-2 — active layers must (re)attach on mount, nav, reload, AND 2D↔3D switch.** Confirmed broken on all four (reload comes up bare; About→XYZ never paints; 2D→3D drops the overlay). On mount/resume/renderer-switch, re-apply the active overlay/animation/annotation frames. First audit Lane P's lazy-load + `visibilitychange`-suspend for dropping frames. Also fix overlay defaulting OFF on reload while the chip still claims a layer (state↔render mismatch). Files: `lib/widgets/earth/earth_visualization_stage.dart`, the renderer bridge/mount, `web/earth2d_mount.js`, `cesium_lazyload_*.dart`. **VERIFY:** About→XYZ, a hard reload, and a 2D→3D switch each keep the active layer painted within ~2s; 3D populates `__earthCesium.viewers`.

- **FIX-3 — clustering: REVERT (owner-approved).** `git revert 39bdcf4` to restore the prior clean dot-marker style (it read better before). Keep ONLY the biodiversity-densify change IF it's cleanly separable and reads well; otherwise revert the whole commit. Do NOT re-introduce the big opaque cluster circles. Files: `web/earth_point_field.js`, `web/earth2d_points.js`. **VERIFY:** screenshot — markers match the previous clean point style.

- **FIX-4 — snapshot shows members for EVERY cluster.** Drop the carbon-offset/VCM count-only exception: a clicked cluster lists its members (scrollable, no search), a single dot shows its own fields, and the persistent "Browse in Data View" link stays. File: `lib/widgets/earth/earth_layer_snapshot_card_view.dart`. **VERIFY:** click a carbon-offset cluster AND a species cluster — both list members.

- **FIX-5 — decouple overlay selection from Mode/score.** Confirmed live: selecting the Air Quality overlay flipped Mode→atmosphere and moved the regional ring R 66→87; deselecting reverted it. Choosing an overlay/animation/annotation to *view* must not change Mode or the score. (This is Lane T2's decouple, pulled forward — it's a visible correctness bug.) File: `lib/pages/earth/earth_tab.dart` (the selection→mode/score wiring). **VERIFY:** cycling overlays leaves the score ring unchanged.

## Merge gate (the missing step that caused the circles)
`flutter analyze` + tests must pass **and** the agent must attach screenshots of: BAA overlay, a hard reload, About→XYZ, and a cluster click. Unit tests passing is NOT sufficient evidence a render fix worked. Rebase-before-merge; do not deploy.

## Launch (run on your machine — it must build + screenshot to satisfy the gate)
```powershell
cd C:\Projects\dev-kitt\apps\rand0m
git fetch origin
git worktree add -b earth/fix-pass ../../worktrees/rand0m-fixpass origin/main
```
Then paste to one fresh agent:
```
Work ONLY in worktrees/rand0m-fixpass (branch earth/fix-pass, off origin/main = 171f1dd). Full spec: tooling/scripts/EARTH-FIX-PASS.md. Render/output only — do not touch deploy automation, governance catalogs, or secrets.
Do FIX-1..FIX-5 in that doc, committing each separately:
 FIX-1 overlay alpha — geography (coastlines/borders) must show through EVERY overlay; BAA/waves alpha→0 below alert threshold; continuous layers (SST, Air Quality) keep fill <0.85 + borders on top. Confirmed broken for BAA AND Air Quality. (web/earth_scalar_field.js, web/earth2d_scalar.js)
 FIX-2 active-layer reattach — on mount, About→XYZ nav, reload, AND 2D↔3D switch, re-apply the active overlay/animation/annotation frames; audit Lane P's lazy-load + visibilitychange-suspend. (earth_visualization_stage.dart, renderer bridge/mount, web/earth2d_mount.js, cesium_lazyload_*.dart)
 FIX-3 clustering — `git revert 39bdcf4` to the prior clean dot markers; keep biodiversity-densify only if cleanly separable. (web/earth_point_field.js, web/earth2d_points.js)
 FIX-4 snapshot — EVERY cluster lists its members (drop the carbon-offset/VCM count-only exception); single dot shows its own fields; keep the persistent Browse-in-Data-View link. (lib/widgets/earth/earth_layer_snapshot_card_view.dart)
 FIX-5 decouple overlay/animation/annotation selection from Mode + score — viewing a layer must NOT move the score ring (confirmed: Air Quality flipped Mode→atmosphere, R 66→87). (lib/pages/earth/earth_tab.dart)
MERGE GATE: flutter analyze + tests green AND attach screenshots proving each fix — BAA + Air Quality (geography shows through), a hard reload, About→XYZ, a 2D→3D switch (overlay persists), a cluster click (members listed), and the score ring unchanged while cycling overlays. Rebase before merge. Do NOT deploy.
```
