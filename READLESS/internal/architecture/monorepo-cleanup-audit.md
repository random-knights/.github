# Monorepo Cleanup Audit

**Date:** 2026-06-16 (session 43)
**Status:** P1 DONE (`fe44868`); P2/P3 pending Fable spec
**Owner:** Fixes agent (execution); Fable (scope ratification); Docs (this record)

---

## Purpose

Baseline audit of unreferenced assets, stale docs, and architectural debt in the `random-knights/xyz` repo. Produces a phased cleanup plan. P1 = safe hygiene only; P2/P3 = structural; nothing beyond P1 without Fable sign-off.

---

## P1 — Safe Asset Hygiene (DONE — `fe44868`)

**Merged:** `fe44868` — `chore: monorepo cleanup P1 — drop unreferenced assets + de-four-app the README`

| Action | Detail |
| --- | --- |
| Deleted `assets/audio/technologia.mp3` | Zero verified refs at audit time; audio glob removed from `pubspec.yaml` |
| Deleted 7 unused Earth textures | `2k_{night,elevation,fire_4-24-24,glacial,kitt,stars,countries}.jpg` — only `2k_day.jpg` is referenced (literal path in `earth_visualization_stage.dart`). Bundle savings. |
| README de-four-app | Stripped retired "four-app / Knight1y = separate app" framing → single `rand0m.ai` app; Knight1y = agents page within it. |

**Validation:** `flutter analyze` clean; `flutter build web` succeeds (no missing-asset break). No `lib/models/earth/` files touched.

---

## ⚠ RESCISSIONS — Earth Agent Must Reverse (blocking)

Two items in P1 require Earth-agent reversal before they affect production. These are OPEN corrections — do NOT treat P1 as fully clean until both are reversed.

### RESCISSION 1: `technologia.mp3` — MUST BE RESTORED

- **What happened:** `fe44868` deleted `assets/audio/technologia.mp3` as "zero refs."
- **Why wrong:** `technologia.mp3` is the intended **launch sound + alert sound** for `rand0m.ai`. It has no current code refs because the wiring is pending (not because it is unwanted). Deleting it before wiring = lost asset.
- **Required action (Earth agent):**
  1. Restore `assets/audio/technologia.mp3` from git history (`git checkout fe44868^:assets/audio/technologia.mp3`).
  2. Re-add `assets/audio/` glob to `pubspec.yaml`.
  3. Wire playback at app launch + alert triggers (separate Earth slice; requires Fable scope confirmation before implementation).
- **Status:** OPEN. Earth agent owns. `DOCS:` callout when restored.

### RESCISSION 2: `futureLayerIds` flights/ships — MUST BE RE-ADDED as Pro layers

- **What happened:** `79ba5fa` removed `flights` and `ships` from `futureLayerIds` in `earth_region_model_test.dart`, citing governance prohibition on "live flight/ship/surveillance overlays."
- **Why wrong:** The commit conflated Tier 3 (live per-vehicle tracking — BANNED) with Tier 2 (aggregate density verticals — PERMITTED per governance amendment, session 24). Commercial flights and maritime vessel density (aggregate, identity-suppressed, ≥24h delay) are **explicitly permitted** as Pro-tier Earth layers.
- **Required action (Earth agent):**
  1. Re-add `'flights'` and `'ships'` to `futureLayerIds` in the Earth region model / test.
  2. Annotate as Pro-tier layers (not free-tier) — aggregate density, identity-suppressed, per `human-activity-governance-amendment.md`.
  3. Separate Fable governance spec required before actual layer implementation (same pattern as VCM/biodiversity).
- **Status:** OPEN. Earth agent owns. `DOCS:` callout when reversed.

---

## P2 — Structural Cleanup (pending Fable scope ratification)

_These are observations from the audit. Do not execute any P2 item without explicit Fable approval._

- `assets/sounds/` vs `assets/audio/` path fragmentation — consolidate or document the split.
- Stale commented-out code blocks in Earth page (scope TBD; Earth agent confirms).
- Archive or consolidate stale READLESS docs that have active replacements (see `READLESS/archive/`).
- `connect_page_test.dart` refactor: test structure reflects pre-retirement Connect agent architecture; needs refresh to current Connect-absorbed-by-Earth reality (post-launch; Test agent owns).

## P3 — Future cleanup (post-launch)

- `rk_media` package: `adopt-vs-sunset` decision required post-launch. If adopted: formalize as a governed package. If sunset: consolidate into `apps/rand0m` and remove package.
- What's-New release-notes source: decide authoritative source for in-app release notes (currently no single source). Post-launch.

---

## Findings — Architecture Corrections

| ID | Finding | Correction | Status |
| --- | --- | --- | --- |
| C1 | `technologia.mp3` deleted prematurely | Restore + wire (see Rescission 1) | ⚠ OPEN |
| C2 | `futureLayerIds` test dropped flights/ships | Re-add as Pro-tier (see Rescission 2) | ⚠ OPEN |
| C3 | README "four-app" framing retired | Fixed in `fe44868` | ✅ Done |
| C4 | 7 unused Earth textures consuming bundle | Deleted in `fe44868` | ✅ Done |
