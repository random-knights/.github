# Data View Redesign Spec

**Date:** 2026-06-14 (session 34)
**Author:** Docs agent (from owner-approved IA + content contract, session 34)
**Status:** Ratified — PASS C implementation target
**Agent:** Design (after PASS B gate-passed); Earth merge-gate

---

## Purpose

Restructure the Data View surface for progressive disclosure across layperson and researcher audiences. Remove all dev telemetry and staged data. Real data only.

---

## Structure (3 sections)

### 1. Overview
Planet-level summary accessible to any user. No jargon. Sets context for the layers below.

### 2. Layers
Per-layer cards. Each card satisfies the 4-question content contract (see below). Progressive disclosure: collapsed default (layperson view), expandable to researcher detail.

### 3. Data Sources
Provenance, attribution, and update cadence. One entry per active data source. Includes:
- Source name + institution
- License (verbatim where non-commercial or restricted)
- Update cadence (live / asset-backed / annual / etc.)
- Link to primary attribution (if public)

---

## 4-Question Content Contract (per layer card)

Every layer card must answer all four questions. Answers must use real data — no placeholder text.

| Question | Label | Audience |
| --- | --- | --- |
| What is this? | Plain-language description | Layperson (always visible) |
| Where does this come from? | Source name + license | Layperson (always visible) |
| What does it mean? | Interpretation | Layperson + researcher (expandable) |
| How can I act on it? | Actionable framing or "Informational only" | Layperson (always visible) |

---

## Removal List (hard — no exceptions)

- All dev telemetry: token counts, latency metrics, internal pipeline state, debug flags — none visible to users.
- All staged / placeholder data: every surface must show real data or be absent. No mock values, no "coming soon" stubs that expose internal state.
- Broken rotate toggle (removed in PASS B, confirmed absent before PASS C opens).
- Breakdown chips, Stable chips, Live-Asset-Research counts from the globe chrome (removed in PASS B).

---

## Painter-Removal Decision

CustomPainter is retained as an **invisible failure-only fallback** (not shown unless Cesium fails to initialize). This decision is recorded in PASS A. Design must not remove or modify the painter fallback path in PASS B or PASS C. Owner may revisit independently.

---

## Serialization Constraint

PASS C opens **only after PASS B is gate-passed and merged**. No parallel edits to Earth-page files. See POST-LAUNCH serialization note in EARTH-ROADMAP.md.

---

## Gate

- CI green
- Owner visual confirm: 3-section structure present; no dev telemetry visible; content contract satisfied for all layer cards; real data only
