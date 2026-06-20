# Earth 2D-Canvas Renderer — Interface Contract (north-star track)

**Date:** 2026-06-20 (session 49)
**Status:** DRAFT — for Fable ratification (north-star track, Agent B parallel lane)
**Owner:** Agent B (implementation, `deve10per`/dev-kitt); Fable (ratification + gate); Docs (`eng1neer`/qa-kitt, this spec)
**Mandate:** ROADMAP north-star (session 48) — "RETIRE CESIUM → full 2D-canvas renderer (nullschool/cambecc arch)", target **6/26/2026**.
**Reference impl:** cambecc's open-source `earth` (nullschool's ancestor) — d3-geo + 2D `<canvas>`, distortion-grid + web worker.

This is deliverable #1: the **read-only data API** the 2D renderer consumes. It changes **no** contract, model, or live renderer; it records what the new lane imports and the boundary that keeps the lane parallel-safe.

---

## 1. Scope & non-goals

In scope: a new, **file-disjoint** 2D-canvas renderer module + a feature-flagged-OFF 3D↔2D toggle in Globe View, consuming the existing governed Earth data exactly as the Cesium renderer does. Build order: interface spec → thin proof (orthographic SST) → 8 projections → particle flow → points + hit-test → filter-chrome parity.

Not in scope (this contract): retiring/removing the Cesium path (it stays until the 2D path is owner-validated at parity), any change to `lib/models/earth/**`, any change to the live `web/earth_*.js` or `lib/**/earth/**` renderers, new providers, Functions, or deploy.

---

## 2. Hard boundary (what makes the lane parallel-safe)

Per ROADMAP **§22** (worktree-lane isolation), **§23** (contracts defined once by Earth, imported never copied), and one-owner-per-Earth-surface:

| I ADD (new files only) | I CONSUME read-only (import) | I NEVER EDIT |
| --- | --- | --- |
| `lib/widgets/earth2d/**`, `lib/services/earth2d/**` | `lib/models/earth/earth_scalar_grid.dart` (+ flow/point models) | `lib/widgets/earth/**`, `lib/services/earth/**` (Cesium runtime/bridge) |
| `web/earth2d_*.js` (d3-geo + Canvas2D), `web/earth2d/vendor/**` (vendored d3-geo) | `EarthScalarFrame` / `EarthPointFrame` / flow frame; `EarthOverlayScale` | `web/earth_*.js` (live scalar/flow/point renderers) |
| `assets`-read only (no new assets needed for the proof) | bundled grids + land/sea mask assets | `lib/models/earth/**` (contracts — import per §23) |

**Single integration point** = the 3D↔2D toggle, which lives where the globe is mounted (the Earth page / Globe View host). That host is an **Earth-page file owned by the Earth agent**. Per the binding **rebase-before-merge** rule (a clean textual merge of `earth_tab.dart` is a *false positive*), this one edit is **serialized** with the Earth agent, not done in parallel. Design minimizes it to a near-zero, additive, flag-gated swap (see §6).

I work only in my own worktree (e.g. `worktrees/rand0m-earth2d`), branched off `origin/main` (`5ecc71e`); never branch-swap in `apps/rand0m` or another lane's worktree.

---

## 3. Consumed data contract — `earth.scalarfield.v1`

Source of truth: `apps/rand0m/lib/models/earth/earth_scalar_grid.dart` (imported, not copied).

JSON shape (verified against `assets/earth/scalar/sst-representative-72x37-v1.json`):

```jsonc
{
  "meta": {
    "schema": "earth.scalarfield.v1",
    "layer": "sst", "units": "degC",
    "palette": "thermal",              // ∈ {aqi, thermal, fire, veg, mag, violet, teal, ember}
    "domain": "ocean",                 // ∈ {global, ocean, land, land-coastal}
    "valueMin": -2, "valueMax": 32,
    "label": "...", "attribution": "...", "license": "...",
    "isLive": false, "liveReady": false, "referenceTime": null
  },
  "grid": { "nx": 72, "ny": 37, "lon0": -180, "lat0": 90, "dlon": 5, "dlat": -5,
            "values": [ /* nx*ny row-major, NaN/0 allowed; ocean-masked */ ] }
}
```

Parsed by `EarthScalarGrid.fromJson`; bridged to JS by `toBridgeJson()`. Renderer-relevant invariants I rely on:

- `values.length == nx*ny`, row-major, `lat0` at top with `dlat` negative (north→south rows).
- `normalize(v) = clamp01((v - valueMin)/(valueMax - valueMin))` → palette LUT index.
- Honesty: a layer is `isLive` only when bound to a real source grid; otherwise `caption` carries the representative/"not current conditions" label. The 2D view surfaces the **same** caption; it never upgrades a representative layer to "live".

Sibling contracts consumed the same way:
- **Frames:** `EarthScalarFrame` / `EarthPointFrame` / flow frame — `{active, palette|paletteOverride, domain, grid|points, prewarm}`; dispatch by `EarthAnimatedLayerIds.renderKindFor(layerId)` → `flow` (particles) · `scalar` (heatmap) · `point` (markers).
- **Points:** `EarthPointSet` / `EarthScalarPoint` — `{lat, lon, value, label?, count}` (`count>1` = cluster); marker radius curve `0.4 + 0.6·sqrt(normalize(value))`.
- **Score chrome:** `EarthOverlayScale{paletteId, valueMin, valueMax, units, label, isLive}` via `EarthOverlayScale.fromGrid(grid, paletteOverride?)`. **The 2D view publishes this identical object** so the existing scale-bar / value-key chrome works unchanged.

---

## 4. Palette, mask & alpha — mirrored from the live renderer (lock-step obligation)

The JS `PALETTES`, palette LUT, bilinear grid sample, land/sea domain mask, and alpha curve in `web/earth_scalar_field.js` are Agent A's. Because `web/earth_*.js` is off-limits, the 2D renderer keeps a **parallel port** in `web/earth2d_*.js` that **must stay byte-faithful in output**:

- 8 palette ramps (`aqi, thermal, fire, veg, mag, violet, teal, ember`) → 256-entry RGB LUT. Lock-step with `EarthRendererPalettes` (Dart) and the live JS `PALETTES`.
- Per-layer canonical palette override `EarthScalarLayerPalettes.of(layerId)` (e.g. `sst→thermal`).
- Bilinear data sample (`lon` wraps, `lat` clamps; NaN/null neighbours dropped).
- Domain mask via `assets/earth/mask/land-sea-mask-720x360-v1.json` (fallback `…-72x37-v1.json`), feathered `smoothstep(0.35,0.65,landFraction)`; `ocean = 1-land`, `land`/`land-coastal = land`, `global = 1`.
- Alpha encoding `a = (0.55 + 0.42·t)·maskFraction`.

⚠ **Lock-step is a maintenance cost.** A palette/alpha change by the Earth agent in `web/earth_scalar_field.js` must be reflected in `web/earth2d_scalar.js`. A parity test (golden LUT compare) guards this and is part of the build-out.

---

## 5. Data sources & filter state (read-only)

- **SST proof source:** live `earth/sst/sst-grid.json` (NOAA OISST absolute °C) → fail-safe to bundled `assets/earth/scalar/sst-representative-72x37-v1.json`. Both are `earth.scalarfield.v1`; identical parser. Other layers follow the same live→representative `LiveStorageScalarFieldSource(fallback: StaticAssetScalarFieldSource)` pattern the Cesium view already wires.
- **Filter taxonomy (parity slice 4, ratified):** slots `animate` / `overlay` / `annotation`, assigned at catalog registration. The 2D view consumes the **resolved active frame(s)** the existing controllers already produce; it does not re-implement the filter UI or re-derive slot assignment.
- **Deep-link (parity slice 6, ratified, pending):** `/?layer=<id>&region=<code>&t=<epochMs>`. When slice 6 lands, the 2D view honors the same activation; no separate URL scheme.

---

## 6. Toggle + feature flag

- **Flag:** `earth2dRenderer`, **default OFF**. For the thin proof, a **compile-time const** inside the earth2d module (`kEarth2dRendererEnabled = false`) — fully disjoint, no shared registry edit, flip locally for device-pass. Productionization path: promote to a Remote Config key (`earth2d_renderer_enabled`, default false) so the owner can flip it at runtime during device-pass, consistent with existing RC gating (`external_access_allowlist`, RC kill-switch).
- **Mount:** a new thin wrapper `Earth2dGlobeView` (in `lib/widgets/earth2d/`) exposes the **same props** the Cesium globe view takes and, when the flag is OFF, renders **exactly** the existing Cesium view unchanged. The Earth-page edit is therefore one additive, gated line. Exactly-one-renderer is preserved (never both mounted) — the toggle chooses one.
- **Ownership:** because that one line touches an Earth-page file, the Earth agent lands it (or I land it on a rebased-onto-tip branch, hand-resolved + tested) per rebase-before-merge. Flagged as the lane's only serialized merge.

---

## 7. Governance & the raster clarification (binding)

Inherited governance (parity spec + active-architecture, unchanged): **vector-only / no external raster imagery** (the field is a *scientific colour ramp* over a governed grid, never imagery); **0.25° resolution floor**; **≤2 simultaneous flow-field layers** (motion budget); honesty labels (representative vs live); no unrestricted maps/tracking; no live satellite/flight/ship overlays.

⚠ **Raster clarification (important):** the parity spec marks the *screen-space raster* approach "SUPERSEDED — do NOT reintroduce." That lesson is **Cesium-specific** — a screen-space raster draped on the Cesium sphere pixelates at zoom and clips at the globe limb, so Cesium scalar rendering moved to geographic-quad tiles / draped equirect texture (GPU does the projection). The 2D-canvas renderer is a **different architecture**: it owns the projection on the CPU (d3-geo `invert` per pixel), which is precisely the ratified nullschool/cambecc design. **The 2D per-pixel raster is the north-star, not the superseded Cesium path.** This contract records that distinction so the lane is not misread as reintroducing the retired approach.

---

## 8. Performance contract (the main risk)

Risk: CPU per-pixel reprojection (the GPU→CPU move). Mitigations (nullschool-class):

1. **Distortion-grid cache** — compute `projection.invert([x,y])` on a coarse lattice (~every 4–8 px) and bilerp `lon/lat` between nodes; rebuild the lattice only when the projection changes (rotate/zoom), throttled.
2. **Web worker** — build the RGBA field in a worker (`OffscreenCanvas` / transferable `ImageData`) so drag/rotate stays at 60fps; main thread only blits.
3. **Projection-independent data step** — optionally reuse the equirect data texture the Cesium path already builds (data raster once), then the worker only does invert→sample-texture→palette per pixel.

Acceptance target: smooth (~60fps) rotate at full canvas for the orthographic SST proof on a mid laptop.

---

## 9. Open items / coordination

- **Toggle mount-point** — confirm the Earth agent owns/serializes the one-line host edit; lane stays otherwise disjoint.
- **Flag mechanism** — const for the proof; confirm RC key naming with the Earth agent for productionization.
- **d3-geo vendoring** — vendor locally under `web/earth2d/vendor/` (mirrors how CesiumJS is vendored in `web/cesium/`), pinned in a `VENDOR.md`, rather than a CDN at runtime.
- **Lock-step parity test** — golden LUT/alpha compare against `web/earth_scalar_field.js` to catch palette drift.
- **ROADMAP roster** — add an "Agent B / earth2d" lane row + a north-star 2D-renderer track section (Docs/`eng1neer`).
- **`earth-renderer-active-architecture.md` is stale** (dated 2026-06-11; predates the north-star) — it should record the 2D-canvas direction and that Cesium is being retired (Docs update, per the READLESS maintenance rule).

---

## 10. Thin-proof acceptance (deliverable #2 preview)

Orthographic d3-geo globe rendering the **real** SST grid per-pixel on a 2D canvas: live `earth/sst/sst-grid.json` → representative fallback; correct `thermal` palette + ocean mask; smooth rotate via worker + distortion-grid cache; honest live/representative caption; graticule + sphere + coastline for context; flag OFF by default; `node --check` clean on the JS; **zero** touches to Agent-A files. Validation off `validate-earth-fast.ps1` (owner Windows) + owner device-pass; branch off `origin/main`, rebase before push, ff-merge, push via `github-devbot`, wf80 staging.
