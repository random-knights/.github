# Layer Geo-Validity Standard

**Date:** 2026-06-16 (session 40)
**Status:** Active — Phase 0 + Phase 1 shipped in P3 bundle (`8022265`)
**Owner:** Earth agent (enforcement logic); Docs agent (standard)

---

## Purpose

Earth layers display data points and regions on a Cesium globe. Some data points carry lat/long coordinates that are geographically invalid or meaningless (e.g. ocean coordinates for a terrestrial dataset, zero-zero coordinates, out-of-bounds values). Rendering these without validation produces misleading visualisations.

This standard defines how geo-validity is enforced per layer.

---

## Phase 0 — Mask Asset

**Shipped:** P3 bundle (`8022265`)

A static mask asset (raster or vector) defines "valid surface" per layer type. The mask is bundled as a build asset and loaded at runtime — it does not require a network call.

- **Ocean mask:** defines ocean pixels vs land pixels at the resolution required for Phase 1 enforcement.
- Asset path: bundled in `assets/geo/`; referenced in `pubspec.yaml`.
- No dynamic update; mask is pinned at build time and updated with the app version.

---

## Phase 1 — Enforcement: OCEAN-ONLY for ocean layer

**Shipped:** P3 bundle (`8022265`)

The first enforcement rule: the **ocean layer** (ocean currents, OSCAR data) must only render data points that fall within the ocean mask. Terrestrial coordinates within the ocean dataset are suppressed.

**Rule:** `point.isOcean == true` (mask lookup) → render. `point.isOcean == false` → suppress silently.

**Implementation:**
- Mask lookup is synchronous (in-memory raster; no async cost at render time).
- Suppression is silent — no error surface, no partial render, no fallback marker.
- Zero-coordinate points (`lat == 0.0 && lon == 0.0`) are always suppressed regardless of mask result (known bad-coordinate sentinel).

---

## Future phases

| Phase | Scope | Status |
| --- | --- | --- |
| Phase 0 | Mask asset bundled | ✅ Shipped (`8022265`) |
| Phase 1 | Ocean layer: OCEAN-ONLY enforcement | ✅ Shipped (`8022265`) |
| Phase 2 | Terrestrial layers: LAND-ONLY enforcement (wildfires, forest, protected-areas) | ⏳ Post-launch |
| Phase 3 | Per-layer custom validity rules (e.g. VCM lat/long bounds audit) | ⏳ Future spec |

---

## Standards

- Every new layer added to the catalog must declare its `geoValidity` policy in its catalog entry: `oceanOnly`, `landOnly`, `global`, or `custom`.
- The Earth agent must not merge a new layer without a declared policy.
- Suppression counts may be surfaced in dev/debug builds but must not appear in production UI.
