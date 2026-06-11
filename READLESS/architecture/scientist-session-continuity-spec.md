# Scientist Session Continuity — Spec

Date: 2026-06-11
Author: Fable agent (audit); Docs agent (persisted to READLESS)
Branch: `earth/scientist-session-continuity` (next Earth phase — not yet started)

---

## Context

@scient1st real Earth-context AI responses landed in `01a070a` on `main`.
The feature wires a live AI response path for scientist-context queries against
Earth layer data. This spec captures the continuity work needed before the next
feature layer can be safely added.

---

## Phase 0 — `earth_tab.dart` Extraction (Required First)

`earth_tab.dart` is at **2,387 lines** as of `01a070a`. This exceeds the CODEX
2,000-line architecture-review threshold. The file has become an accumulation
point for Earth orchestration, widget composition, layer grid sections, and
scientist-response rendering.

**Do not add further features to `earth_tab.dart` before this extraction.**

Extraction targets (in order):

1. **`EarthTabHeader`** — title bar, view-mode toggle, and top controls.
2. **`EarthLayerGridView`** — layer grid section composition (currently inlined).
3. **`ScientistResponsePane`** — @scient1st response rendering, streaming state,
   and dismiss/expand affordances.
4. **`EarthDataViewCard`** — live-loader card wrapper (air-quality, ocean).

Each extract goes into a dedicated file under `lib/widgets/earth/`. Keep the
page file as orchestration and composition only.

---

## Session Continuity Constraints

### `liveProviderEnabled` — compile-time kill switch

`liveProviderEnabled` is a compile-time constant, not a runtime feature flag.
Toggling it requires a full redeploy. Consequences:

- Cannot be toggled per-session or per-user without a redeploy.
- Any live-provider rollout plan must account for this: staged deploys, not
  runtime flags.
- Do not add a runtime `SharedPreferences` or Firestore toggle for
  `liveProviderEnabled` without an approved feature-flag architecture phase.

### Ocean-currents — catalog status: `research`

Ocean-currents remains `research` in the source governance catalog despite the
live-loader card wiring in `live-connections-batch`. The card surfaces the layer
in the UI; it does not establish a live data feed. This is intentional and
consistent with the air-quality health-neutral, card-only pattern. Do not
promote ocean-currents to `live` in the catalog without an explicit governance
phase.

---

## Approved Scope for `earth/scientist-session-continuity`

1. Phase 0: `earth_tab.dart` widget extraction (above).
2. Scientist response persistence: allow @scient1st responses to survive tab
   navigation within a session (in-memory only; no Firestore write without an
   approved persistence phase).
3. Response attribution: surface which Earth layer(s) and source(s) informed
   the response (read from existing governance catalog — no new catalog writes).

Out of scope (require separate approved phases):

- Firestore persistence of scientist responses.
- Runtime feature flags for `liveProviderEnabled`.
- New live data feeds for ocean-currents or any catalog-`research` layer.
- Cesium runtime implementation.
