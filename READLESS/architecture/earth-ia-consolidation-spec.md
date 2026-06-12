# Earth IA Consolidation — Spec (D1–D6)

Date: 2026-06-12 (owner rulings appended session 20)
Author: Design agent (spec); Docs agent (persisted per §15)
Ratified by: Fable (session 19)
Amendment: Design agent implements D1–D6 in `worktrees\rand0m-design`;
  Earth agent is integrator and merge gate for all D-slices.
Status: D1 in flight (pill ruling resolved; design-language section appended); D2–D6 queued

---

## Mandate

Owner directive (session 19): remove, reorganize, and clean most non-globe
containers in the Earth Data View. The current surface has too many containers,
overlapping responsibilities, and inconsistent density. The consolidation target
is a 3-workspace Data View that is globe-first, legible, and extensible without
further accumulation.

**Scope boundary:** presentation and layout only. No data models, no catalog
files, no Earth layer definitions, no registry changes. Design agent owns the
workstation-shell and tab presentation surface. Earth agent integrates and gates
every D-slice merge.

---

## Current Surface — KEEP / MERGE / REMOVE / REDESIGN

| Container / Surface | Verdict | Notes |
| --- | --- | --- |
| Globe (Cesium renderer) | **KEEP** — globe-inheritance constraint; no changes to Cesium runtime | D-slices work around the globe, not over it |
| Earth+ workstation shell | **REDESIGN** — D1 | Pill position, tab rail, overflow; D1 blocked on pill corner ruling |
| Layer grid (primary data cards) | **KEEP + REORGANIZE** — D3 | Taxonomy tiers applied; density rules enforced |
| Health score / trend summary | **KEEP** — moves to consolidated header | Compact representation; no widget duplication |
| Renderer readiness panel | **MERGE** into workstation shell — D2 | Folded; not a standalone surface |
| Usage / session panels | **REMOVE** — D5 | Replaced by Intelligence summary (separate work) |
| Scientist response pane | **KEEP** — already extracted (`ScientistResponsePane`) | No structural change |
| Overlay governance indicators | **KEEP** — compact inline | Not a standalone container |
| Stale / empty-state cards | **REMOVE** — D5 cleanup pass | Dead weight; confirmed non-functional |
| Data View section wrappers (legacy) | **REMOVE** — D4/D5 | Replaced by 3-workspace card taxonomy |
| Ocean-currents / air-quality research cards | **KEEP** — card taxonomy tier applied | Remain as `summary`/`research` tier cards |

---

## 3-Workspace Data View

The consolidated Data View has exactly three workspaces. No additional workspaces
may be added without a Fable spec and owner approval.

| Workspace | Contents | Scroll / layout |
| --- | --- | --- |
| **Globe** | Cesium renderer; layer overlay toggles inline | Fixed height; no scroll |
| **Data** | Layer grid cards (governed layers only); health score compact header; scientist response pane when active | Vertical scroll; card taxonomy + density rules apply |
| **Detail** | Expanded card for the active layer; context annotations; @scient1st regional answer (E2+ only) | Replaces current overlay/modal pattern |

Workspace switching is via the tab rail in the Earth+ workstation shell (D1).
No drawer, no bottom sheet, no nested tab for workspace navigation.

---

## Card Taxonomy + Density Rules

Cards in the Data workspace are classified into tiers. Tier determines display
density and what fields are shown.

| Tier | Catalog status | Shown fields | Density |
| --- | --- | --- | --- |
| `live` | `live` | Live value, trend, source, timestamp | Full card |
| `summary` | `assetBacked` / `summary` | Latest refresh value, source, vintage | Compact card |
| `research` | `research` | Layer name, source label, "data available" indicator | Micro card |
| `hidden` | `insufficientEvidence` or governance-blocked | Not shown | — |

**Density rules:**
- Maximum 3 full cards visible without scroll.
- Maximum 6 compact cards visible without scroll.
- Micro cards collapse into a grouped row when there are more than 4.
- Do not show a card for a layer with `hidden` tier — do not show a disabled
  state either. Absence is the correct representation.

---

## Globe-Inheritance Constraint Set

These constraints apply to every D-slice. Violating them requires a new Fable
spec before the violation can merge.

1. **No Cesium API calls in D-slices.** D-slices touch the workstation shell,
   tab rail, and card containers — not the Cesium bridge or renderer.
2. **Globe workspace height is fixed.** D-slices must not set, animate, or
   transition the globe container height. Globe fills its fixed allocation.
3. **No new overlay rendering.** D-slices do not add canvas, WebGL, or SVG
   rendering layers over the globe. Overlay governance remains Earth agent's domain.
4. **Cesium V2.16 freeze unchanged.** No new Cesium runtime features. The V2.16
   planning freeze applies until an explicit Cesium runtime phase is approved.
5. **Earth agent merge gate.** Every D-slice PR is reviewed by Earth agent before
   merge to confirm no Cesium, catalog, or data-layer files were touched.

---

## D1–D6 Slice Plan

| Slice | Description | Gate / dependency | Status |
| --- | --- | --- | --- |
| D1 | Earth+ workstation shell — tab rail restructure; pill BOTTOM-LEFT (ruling resolved); filtered score gauge TOP-RIGHT; dark-canvas AppColors | Pill ruling resolved ✓ | in flight |
| D2 | Renderer readiness panel → merge into workstation shell; remove standalone widget | D1 merged | queued |
| D3 | Layer grid card taxonomy + density rules applied; data section wrappers removed | D2 merged | queued |
| D4 | Detail workspace scaffold; expanded card pattern; replaces overlay/modal | D3 merged | queued |
| D5 | Cleanup pass — remove usage/session panels, stale empty-state cards, dead wrappers; confirm globe-inheritance constraint compliance | D4 merged | queued |
| D6 | Deletion verdicts pass — final review of consolidated view; remove any remaining containers confirmed dead | **Gated on owner review of consolidated view after D5** | queued |

**D6 note:** D6 is not a spec-driven slice — it is an owner-review-driven
cleanup. Do not attempt D6 without the owner having reviewed the live
consolidated view (§17: owner visual confirmation required before D6 can open).

---

## Owner Rulings — Visual Direction (Session 20, Binding)

### Earth+ Pill Corner — RESOLVED

**Owner ruling (session 20): BOTTOM-LEFT — always.**

The Earth+ pill stays at the bottom-left. Design spec recommendation (bottom-right)
was overridden by the owner. D1 pill reposition is unblocked; use bottom-left.
Do not revisit this ruling without an explicit owner directive.

### Filtered Score Gauge Position — RESOLVED

**Owner ruling (session 20): TOP-RIGHT.**

The filtered score gauge defaults to Earth (un-filtered state) and becomes
filter-reactive when a layer filter is active. Position: top-right. This is
the stable position — do not move it in D-slices without owner directive.

### Design Language — Dark Canvas, AppColors Harmonized

**Owner ruling (session 20):** visual direction = dark-canvas gauge/donut/chip
density harmonized with AppColors (owner reference images provided to Design agent).

Rules:
- Gauge, donut, and chip components use `AppColors` palette exclusively. No
  hardcoded hex values in D-slice widgets.
- Dark-canvas treatment: container backgrounds use the dark-canvas tier of
  `AppColors`, not white or light neutrals.
- Density targets are set by the reference images provided to Design agent —
  if in doubt, err toward higher information density, not whitespace.
- Design agent appends a formal design-language section to this spec (see below)
  capturing the specific token/component rules derived from the reference images.

---

## Design Language Section (Design Agent — Appended Session 20)

_This section is appended by Design agent based on owner reference images.
Token and component rules from reference images are authoritative for D1–D6._

| Token / Component | Rule |
| --- | --- |
| Container backgrounds | Dark-canvas tier from `AppColors` |
| Gauge component | Dark canvas; `AppColors` accent for filled arc; no hardcoded hex |
| Donut component | `AppColors` palette; segment colors from defined data-tier palette |
| Chip / badge | `AppColors` surface + on-surface tokens; no custom tint |
| Pill (Earth+) | Position: bottom-left (owner ruling); `AppColors` primary |
| Filtered score gauge | Position: top-right; filter-reactive state uses `AppColors` filter-active token |

_Design agent to expand this table with specific token names as D1 implementation proceeds. If a component is not listed, use the nearest `AppColors` token and emit a `DOCS:` callout for this table to be updated._

---

## Agent Boundaries

| Role | Agent | Scope |
| --- | --- | --- |
| Implementation | Design agent | D1–D6 workstation-shell + tab presentation in `worktrees\rand0m-design` |
| Integration + merge gate | Earth agent | Reviews every D-slice PR; confirms no catalog/data/Cesium files touched; merges to main |
| Spec ratification | Fable agent | Ratified this spec; amends on Design agent DOCS: callout |
| State tracking | Docs agent | Owns this file; records D-slice progress and interface contract changes |
