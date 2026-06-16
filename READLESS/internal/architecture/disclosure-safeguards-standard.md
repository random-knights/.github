# Disclosure Safeguards Standard

**Date:** 2026-06-16 (session 40)
**Status:** Active — standard ratified; implementation shipped in P3 bundle (`8022265`)
**Owner:** Earth agent (implementation); Fable (ratification); Docs (standard)

---

## Purpose

`rand0m.ai` surfaces AI-generated content, modeled environmental data, and AI environmental disclosures (AIEDS). Without explicit safeguards, a user could mistake modeled estimates for verified measurements, or mistake educational equivalencies for certified environmental claims. This standard defines the mandatory safeguards that must be in place before any disclosure surface is shown to a non-owner user.

This standard supersedes the deferred-disclosure-UI stance from session 35 (Fable ruling). The deferred stance was "do not surface disclosure UI until LEGAL-SAFEGUARDS AUDIT." This standard is the ratified output of that audit for the P3 public-launch scope.

---

## Required Safeguards (all must be present before public-flip)

### 1. AIEDS disclosure label on every AI response surface

Every surface that renders an AI-generated response (chat, @scient1st, agent run, Test result) must include the AIEDS required display copy:

> **AIEDS v1 estimated disclosure**
> Energy and carbon are modeled estimates.
> Tree-Time and equivalents are educational comparisons.

See [`READMORE/architecture/aieds/aieds-whitepaper.md`](../../READMORE/architecture/aieds/aieds-whitepaper.md) for the full schema and conformance checklist.

### 2. Representative-data labels on non-live layers

Any Earth layer that serves static or asset-backed data (not a live feed) must carry a visible "representative data" indicator in the Data View layer card. The label must appear in the default (non-expanded) view — not hidden behind an expand.

Accepted label text: **"Representative data"** or **"Not current conditions"** (layer-appropriate phrasing).

This applies to: Wind Phase 1a climatology, ocean currents (until OSCAR live), any layer with `dataFreshness != live`.

### 3. Modeled-estimate indicator on environmental metrics

Any numeric metric derived from a model (not a direct sensor measurement) must be labeled as **"Estimated"** or **"Modeled"** adjacent to the value. This includes:
- AIEDS carbon / energy figures.
- Earth Health Score (AI-modeled aggregate).
- Any per-layer metric not sourced from a primary measurement instrument.

### 4. No greenwashing language

All surfaces are prohibited from using the following terms in relation to AI or environmental estimates:
- "carbon neutral", "offset", "certified", "verified impact", "net zero" — unless sourced from a third-party verified certificate on record.
- "saves X trees" — use Tree-Time (educational framing) only, never "saves" or "plants."

### 5. Data source attribution in Data View

Every layer card in Data View must include a visible attribution line: source name + license. This is in addition to the full attribution block in the Data Sources section.

---

## Gate

The LEGAL-SAFEGUARDS AUDIT gate (previously a hard blocker on all disclosure UI) is **resolved** for the P3 public-launch scope when all five safeguards above are present and owner-verified in a device pass. Fable signs off; owner performs device pass.

Safeguards 1–5 are **shipped in P3 bundle (`8022265`)** except where noted below.

| Safeguard | Status |
| --- | --- |
| 1. AIEDS label on AI responses | ✅ Shipped (`8022265`) |
| 2. Representative-data labels | ✅ Shipped (`8022265`) |
| 3. Modeled-estimate indicator | ✅ Shipped (`8022265`) |
| 4. No greenwashing language | ✅ Reviewed and confirmed absent |
| 5. Data source attribution in Data View | ✅ Shipped (`8022265`) |

Owner device-pass to confirm all five: **PENDING** (part of public-flip go/no-go).

---

## Post-launch track

- Per-layer custom disclosure (e.g. GBIF CC-BY-NC notice in compact view) — post-launch v2.
- AIEDS `Provider-derived` tier (requires live provider energy data) — future spec.
