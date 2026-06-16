# Earth 8-Layer Program — Renderer Contracts

**Date:** 2026-06-16 (session 41)
**Status:** DRAFT — awaiting Fable ratification
**Owner:** Earth agent (implementation); Fable (ratification)

> FABLE CALLOUT: This doc is ready for ratification. Review renderer contracts §1 and §2, the data contracts §3, and the disjoint-lane model §4. Confirm or amend before Earth agent begins any 8-layer implementation slice.

---

## Background

Wind Phase 1a/1b established a renderer (`earth_flow_field.js` + `EarthWindGrid` + `syncFlowField`) for flow-field animation. The 8-Layer Program extends that foundation across two renderer types and a disjoint-lane model so multiple layers can run in parallel without merge conflicts.

All 8 layers reuse one of the two ratified renderer contracts below. **No forks, no custom renderers outside these contracts.**

---

## §1 — Flow-Field Renderer Contract (vector / directional data)

**Entry points:** `earth_flow_field.js`, `EarthWindGrid` (Dart), `syncFlowField` (Dart→JS bridge)

**Used by:** Wind (live), Ocean currents (OSCAR), Ocean swell (future)

### Data shape (per-frame input)

```
EarthWindGrid {
  width:  int          // grid columns
  height: int          // grid columns
  data:   Float32Array // interleaved [u, v, u, v, ...] in m/s
  bounds: LatLngBounds
  date:   DateTime     // validity timestamp
}
```

`u` = eastward component, `v` = northward component (meteorological convention).

### Bridge contract

```dart
// Dart side
syncFlowField(EarthWindGrid grid) → void
  // Serialises grid to JS message; flow field renderer picks up on next animation frame.
  // Thread: must call from main isolate.
  // Timing: safe to call on data-refresh (≤ once per minute in live mode).
```

### Renderer guarantees
- Particles are stateless between grid swaps — no carry-over artifacts.
- Speed-to-opacity and speed-to-length are configurable per layer via `FlowFieldConfig`.
- Renderer does not own the data fetch — Earth layer owns the callable + refresh cycle.
- `syncFlowField(null)` clears the field (used on layer hide/switch).

### Extension point for new flow-field layers
Add a `FlowFieldConfig` entry in the layer catalog. Do not modify `earth_flow_field.js` core — extend via config only. If the core must change, Earth agent emits a `DOCS:` callout and Docs records the amendment here.

---

## §2 — Point / Scalar Renderer Contract (discrete points or heatmap)

**Entry points:** `earth_point_renderer.js`, `EarthPointGrid` (Dart), `syncPointLayer` (Dart→JS bridge)

**Used by:** Wildfires (FIRMS), Air quality (point mode), future point-source layers

> ⚠ This renderer is **ratified-in-contract but not yet implemented.** Earth agent implements when the first point-based layer is approved. Do not implement speculatively.

### Data shape (per-frame input)

```
EarthPointGrid {
  points: List<EarthPoint>
  mode:   PointRenderMode   // .discrete | .heatmap
  date:   DateTime
}

EarthPoint {
  lat:       double
  lon:       double
  value:     double   // normalised 0–1 for colour mapping
  radius_km: double   // display radius (discrete mode)
}
```

### Bridge contract

```dart
syncPointLayer(EarthPointGrid? grid, String layerId) → void
  // layerId scopes the renderer slot — multiple point layers can coexist.
  // null clears the layer slot.
  // Thread: main isolate only.
```

### Renderer guarantees
- Each `layerId` is an independent slot — layers do not bleed into each other.
- `.heatmap` mode uses a Gaussian kernel; kernel radius is configurable via `PointLayerConfig`.
- `.discrete` mode renders circles; radius in km converted to screen pixels at current zoom.
- Geo-validity enforcement (see `layer-geo-validity-standard.md`) is applied **before** `syncPointLayer` — the renderer receives only valid points.

---

## §3 — Data Contracts (per renderer type)

### Flow-field data contract
- **Source:** Firebase callable returns a signed URL or inline JSON for the grid.
- **Refresh cycle:** callable → Dart → `EarthWindGrid` → `syncFlowField`. Max once per minute.
- **Static-rep pattern:** first frame uses a bundled representative asset; live data overlays after callable resolves. Ensures instant visual on cold load.
- **Staleness:** grid carries a `date` field. UI must surface `dataFreshness` from the catalog entry — do not invent a freshness label.

### Point-layer data contract
- **Source:** Firebase callable returns `List<EarthPoint>` (server-side filtered).
- **Geo-validity:** server-side OCEAN-ONLY / LAND-ONLY filter applied before returning to client (double-enforced with client-side mask).
- **Volume cap:** callable caps at 10,000 points per response. Earth agent must not raise this cap without a Fable ruling.
- **Suppression:** zero-coordinate points (`lat == 0 && lon == 0`) stripped server-side.

---

## §4 — Disjoint-Lane Model

Each of the 8 layers is assigned a **lane** — a branch + file-ownership scope. Lanes are disjoint: no two lanes touch the same Dart files simultaneously. This enforces the one-owner-per-Earth-surface standard without needing to serialize all 8 layers onto a single branch.

### Lane rules
1. One lane = one branch on `origin/xyz`. Branch name: `earth/layer-<id>`.
2. Each lane owns its **layer-specific files only**: `<layer>_data_source.dart`, `<layer>_layer_config.dart`, and its catalog entry.
3. **Shared files** (`earth_tab.dart`, `earth_flow_field.js`, `earth_point_renderer.js`, catalog index) are **touch-once-then-lock**: the first lane to need a shared-file change owns it; subsequent lanes must rebase after that change merges.
4. REBASE-BEFORE-MERGE applies to all lanes that diverge from a shared-file change. Earth agent runs rebase + hand-resolve before opening a PR.
5. Lanes that are file-disjoint from the current open lane **may** run in parallel. Earth agent declares disjointness via `DOCS:` callout before opening a second lane.

### Current lane assignments

| Lane | Layer | Branch | Status |
| --- | --- | --- | --- |
| L1 | Wind (GFS live) | — (merged, `b7f9849`) | ✅ Complete |
| L2 | Ocean currents (OSCAR) | `earth/layer-ocean` | ⏳ Not started |
| L3 | Wildfires (FIRMS point) | `earth/layer-wildfires` | ⏳ Not started |
| L4 | Air quality (point/heatmap) | `earth/layer-airquality-point` | ⏳ Not started |
| L5 | Ocean swell (future) | TBD | 🔮 Post-launch |
| L6 | Forest fire risk (future) | TBD | 🔮 Post-launch |
| L7 | Dust / aerosol (future) | TBD | 🔮 Post-launch |
| L8 | TBD (owner directive) | TBD | 🔮 Future spec |

Lane assignments for L5–L8 require a Fable spec before any branch opens.
