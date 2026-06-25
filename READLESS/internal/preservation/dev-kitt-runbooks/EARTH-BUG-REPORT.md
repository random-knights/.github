# Earth — full bug report (first-hand test of staging `171f1dd`, randomknights-xyz.web.app)

Tested live via browser: load, About→XYZ nav, reload, overlays (BAA, Air Quality, SST), 2D↔3D, animation, annotation, the score ring, the active chips, console.

## P0 — blocking / breaks the core experience

1. **Active layers don't reliably attach → data-less globe.**
   - Hard reload: comes up as a bare sphere; overlay defaults OFF; the bottom-right chip claims "Carbon Offset Projects" but no dots paint.
   - About→XYZ: base sphere only; active layer never paints (7s+; `__earthCesium.viewers: []`).
   - 2D→3D switch: 3D boots fine, but the active overlay (Air Quality) does NOT carry into the 3D globe.
   - Pattern: the renderer doesn't (re)apply the active overlay/animation/annotation frames on mount / nav / renderer-switch. Layers only appear after a manual toggle. → fix-pass FIX-2 (broadened to cover nav + reload + 2D↔3D).

2. **Overlays blanket the globe — you can't see Earth underneath (the nullschool miss).**
   - BAA: entire sphere opaque green (value-0/no-stress included), land+ocean+borders buried.
   - Air Quality: entire sphere opaque yellow.
   - SST renders correctly (land-masked, geography visible) — so the fix is per-overlay alpha, not global.
   - The alert/sparse overlays must be transparent where there's no signal, and ALL overlays should let coastlines/borders read through (nullschool-style). → fix-pass FIX-1 (broadened beyond just BAA).

## P1 — high (visible quality / correctness)

3. **Overlay selection moves the Mode AND the score.** Selecting the Air Quality overlay flipped Mode→atmosphere and the regional ring R 66→87; deselecting returned it. Display choice should not change the score. → mode↔overlay decouple (Lane T2) + score independence; added as fix-pass FIX-5.

4. **Clustering renders as blobs.** R2's point clustering = large opaque overlapping circles over whole regions. → fix-pass FIX-3 (REVERT `39bdcf4`, owner-approved).

5. **Snapshot shows count only.** Clicking a carbon-offset cluster → "83 projects" + Data-View hint, not the members. → fix-pass FIX-4 (every cluster lists members).

## P2 — medium (pending the un-run Lane T, not regressions)

6. **Active chips show one layer, old format.** Bottom-right is region/time/ONE-layer (e.g. "Ocean Currents") — it drops other active layers and lacks mode + 2D/3D. → Lane T4 (chips redesign).
7. Tab/input not merged; no URL breadcrumbs; @scient1st still grounds "top emitters" on VCM offsets. → Lane T (T1/T5/T6).

## Works well (keep)
- **3D lazy-load is correct.** Cesium boots only on 3D select; console: token present → ion API HTTP 200 → viewer attached. (Lane P success.)
- SST overlay rendering (land-masked, geography visible) is the model the other overlays should follow.

## Console noise (low priority, separate from Earth)
- `App Check site key unset - skipping activation` (staging config).
- `volume_controller` MissingPluginException (benign web plugin gap).
- `ThemeCard video init failed … MEDIA_ERR_SRC_NOT_SUPPORTED` (an About-page video asset, not Earth).
