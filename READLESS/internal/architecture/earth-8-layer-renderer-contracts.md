# Earth 8-Layer Program — Renderer Contracts

**Date:** 2026-06-16 (session 43 — updated)
**Status:** RATIFIED + COMPLETE — all 8 layers live (`fe44868` tip)
**Owner:** Earth agent (implementation); Docs (this record)

---

## Background

Wind Phase 1a/1b established a renderer (`earth_flow_field.js` + `EarthWindGrid` + `syncFlowField`) for flow-field animation. The 8-Layer Program extends that foundation across two renderer types and a disjoint-lane model so multiple layers can run in parallel without merge conflicts.

All 8 layers reuse one of the two ratified renderer contracts below. **No forks, no custom renderers outside these contracts.**

**8-Layer Program complete (git-verified):** slices 1–7 merged; all 8 layers live at `fe44868`. Flow-field and point/scalar renderers both shipping in production.

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

**Entry points:** `earth_point_field.js` (note: shipping name is `earth_point_field.js`, not `earth_point_renderer.js`), `EarthPointGrid` (Dart), `syncPointLayer` (Dart→JS bridge)

**Used by:** Wildfires (FIRMS), Air quality (point/heatmap), Biodiversity, SST scalar — all live

> ✅ **LIVE** — point/scalar renderer implemented and shipping (`451f7c2` slice 2 + `d91da59` slice 6 + `299e9e6` slice 7). File shipping as `earth_point_field.js`.

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

### Current lane assignments (all 8 LIVE — git-verified at `fe44868`)

| Lane | Layer | SHAs | Status | Renderer |
| --- | --- | --- | --- | --- |
| L1 | **Wind (GFS live)** | `b7f9849` + Phase 1b | ✅ Live | Flow-field |
| L2 | **Ocean currents (OSCAR)** | `1ed1b6b` | ✅ Live | Flow-field |
| L3 | **Air quality (Open-Meteo)** | `fe87c3c` (rep), `fbb4dd6` (live) | ✅ Live — selectable rep/live | Point / scalar |
| L4 | **Forest cover (Hansen/GLAD)** | `5ce9513` | ✅ Live | Scalar |
| L5 | **Human density** | `5ce9513` | ✅ Live (representative) | Scalar |
| L6 | **Wildfires (FIRMS)** | `d91da59` | ✅ Live | Point / discrete |
| L7 | **Biodiversity (GBIF)** | `d91da59` | ✅ Live | Point / heatmap |
| L8 | **SST (Sea Surface Temp anomaly)** | `299e9e6`, `353a478` | ✅ Live — anomaly vs 1991–2020 | Scalar |

**8-Layer Program: COMPLETE.** All 8 layers merged and on `origin/main` (`fe44868`). Infrastructure slices: `90eb743` (contracts + heatmap renderer), `451f7c2` (point renderer `earth_point_field.js`), `d182d7a` (LayerLegend + palette contract).

Future Earth Pro layers (flights/ships/satellites aggregate density) require separate Fable governance specs before any branch opens. See `human-activity-governance-amendment.md` Tier 2 and `monorepo-cleanup-audit.md` Rescission 2.
