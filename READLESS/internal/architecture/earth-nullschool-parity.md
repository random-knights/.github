# Earth Nullschool-Parity Program

**Date:** 2026-06-17 (session 46 — slices 1a/2+5a/1b/4 MERGED); updated 2026-06-19 (session 49 — filter parity batch 1 SHIPPED; SSTA/BAA/CMEMS/Waves merged)
**Status:** Slices 1a/2+5a/1b/4 MERGED; filter parity batch 1 SHIPPED (`ccb72b9`+); SSTA (`4c22c06`) + BAA (`7e7cd00`) overlays MERGED; CMEMS currents worker MERGED (`ad16eec`); Waves flow MERGED (`93e7fb5`); slice 3 in flight; slices 6+5b pending
**Owner:** Earth agent (implementation); Fable (ratification + gate); Docs (this spec)

⚠ **Session 49 update:** The earth.nullschool filter parity program (ratified session 48) has shipped batch 1 (filter unlock) and batch 3 (SSTA/BAA overlays). Batch 2 is partially merged (CMEMS worker + Waves layer merged; CMEMS earth-worker job pending owner deploy). Batch 4 (projection toggle = 2D/3D) shipped as part of the 2D renderer (`0daaf35`). See EARTH-ROADMAP.md → earth.nullschool Filter Parity Program for current batch status.

---

## Goal

Bring the Earth globe rendering to feature parity with earth.nullschool.net: smooth scalar interpolation, sharp vector geographic context (rivers, lakes, coastlines), overlay scale bar, deep-link queryable URLs, and filter-taxonomy refinement.

---

## Governance Constraints (binding)

| Constraint | Rule |
| --- | --- |
| **Vector-only / no-imagery** | Geographic context layers are vector-only. No raster imagery tiles from external providers in this program. |
| **0.25° geographic resolution floor** | No sub-0.25° grids in this program. Post-launch track: 0.5° resolution upgrade for non-SST scalar layers (separate future slice). |
| **Global motion budget ≤2 simultaneous flow-field layers** | At most 2 animated flow-field layers may be active simultaneously. Enforced at the compositing layer (slice 3). Prevents visual overload and client performance degradation. |

---

## Slice Roster

| Slice | Description | SHA | Status | Notes |
| --- | --- | --- | --- | --- |
| **1a** | Bilinear scalar raster — smooth per-pixel interpolation for scalar layers; `web/earth_scalar_field.js` updated | `c8ff53f` | ✅ **MERGED** | ⚠ **SUPERSEDED** — slice-1a screen-space raster pixelates at zoom and clips at globe limb. Prod scalar rendering = per-cell geographic-quad tiles (Cesium polygons, polish-10 `04b4f0a`, session 47). Do NOT reintroduce the raster approach. |
| **2+5a** | Base-map rivers/lakes vector overlay + overlay scale-bar widget (single commit) | `01a27e7` | ✅ **MERGED** | Parallel-eligible; ∥ to 1a |
| **1b** | Finer 1° grid lines + gzip refresher writes (functions); SST stays coarse; 0.5° post-launch | `8a42ae4` (functions) | ✅ **MERGED** | Parallel-eligible; ∥ |
| **4** | Filter taxonomy redesign — animate/overlay/annotation slot architecture | `37cf8d3` | ✅ **MERGED** | Requires two-score (P3-5, `aecbd55`) complete ✓ |
| **3** | Compositing engine + global motion budget enforcement (≤2 flow-field layers) | — | 🔄 **IN FLIGHT** | Requires slice 4 complete ✓; do not merge before motion-budget test |
| **6** | Deep-link URL + query-on-/ | — | ⏳ **PENDING** | Requires slice 3 complete; spec ratified (see below) |
| **5b** | Provenance surface | — | ⛔ **GATED** | Fable gate required; do not open without explicit Fable directive |

---

## Dependency Chain (binding)

```
two-score (P3-5, aecbd55) → slice 4 → slice 3 → slice 6
slices 1a / 2+5a / 1b: parallel-eligible (all merged; no downstream blockers)
slice 5b: gated independently — does not unblock on 6
```

---

## Slice 4 — Filter Taxonomy Spec (ratified, session 45)

Filter slots: `animate` / `overlay` / `annotation`. Each Earth layer is assigned to one slot at catalog registration. The filter UI surfaces layers by slot, not by raw layer ID. Slot assignment is governed by Earth agent at catalog registration time.

- `animate`: live animated flow-field or scalar layers (Wind, Ocean, Air Quality, SST, etc.)
- `overlay`: static vector context overlays (Rivers/Lakes, Protected-Areas boundaries, etc.)
- `annotation`: informational overlays that do not animate (scale bar, geo-labels, etc.)

Slot boundaries are **compile-time constants** in the Earth catalog. Changing a layer's slot requires Earth catalog update + governance entry.

---

## Slice 6 — Deep-link URL Spec (ratified, session 45)

URL structure: `/?layer=<layerId>&region=<regionCode>&t=<epochMs>`

- `layer`: any governed `EarthLayerDefinition.layerId`
- `region`: ISO 3166-1 alpha-2 or alpha-3 region code
- `t`: Unix epoch milliseconds for timeline position; omit = Now

`query-on-/`: loading the app root with a `?` query string triggers immediate layer + region activation. App initializes with filter state pre-loaded from URL params; no extra user tap required.

Gate: slice 6 does not open until slice 3 compositing is complete and Earth agent confirms motion-budget compliance.

---

## 1b Grid Sizing (binding)

| Layer type | Grid resolution in program | Post-launch track |
| --- | --- | --- |
| Standard scalar (Air quality, Forest, Density, etc.) | 1° + gzip | 0.5° upgrade (future slice, after launch) |
| SST anomaly | Coarse (stays coarse — SST data characteristics warrant coarser resolution) | No upgrade planned in this program |
| Wind/Ocean flow-field | Unchanged (governed by GFS/OSCAR data cadence) | Governed separately |

0.5° upgrade for non-SST scalar layers is a post-launch track — not in this program's scope. No sub-0.25° grids in any slice.

---

## Preview / Staging

Preview builds run on wf80 (`randomknights-xyz`). Cesium Ion token injected at build time (`dbe6096`, merged `f2fd20d` tip). Preview SHA tracks `origin/main` tip and is the pre-deploy verification surface.

---

## Not in scope (this program)

- Sub-0.25° grid resolution
- Third-party raster imagery tiles
- More than 2 simultaneous animated flow-field layers
- Provenance surface (5b — gated; separate Fable spec required)
- SST resolution upgrade (post-launch; separate future slice)
