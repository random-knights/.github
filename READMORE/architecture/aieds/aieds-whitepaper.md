# AI Environmental Disclosure Standard (AIEDS) — Whitepaper

**Version:** AIEDS v1
**Status:** Open Standard — Published
**Date:** 2026-06-15
**License:** CC BY 4.0 (specification text)

---

## Abstract

The AI Environmental Disclosure Standard (AIEDS) is a provider-agnostic open standard for disclosing the environmental impact of an AI interaction in a consistent, educational, and honest way. It defines a metric hierarchy, a fixed methodology, a disclosure schema, and required display copy so that any product, agent, or platform can attach a comparable "nutrition label" to an AI response, report, agent output, test result, or automation summary.

AIEDS does not claim to measure verified emissions, certify providers, or account for offset quality. It provides a principled, honest, and versioned estimate that clearly states its confidence tier and assumptions.

---

## 1. Purpose and Principles

### Why a Standard?

AI systems consume energy and emit carbon at every inference. Without a shared standard, disclosures vary in methodology, confidence, and framing — making comparison impossible and greenwashing easy. AIEDS establishes a common floor:

- **Same methodology** across providers and products.
- **Same confidence labeling** so users can calibrate their trust.
- **Same required copy** so no surface can imply more certainty than the data supports.

### Design Principles

| Principle | Description |
| --- | --- |
| **Honest over precise** | Every value is a clearly-labeled estimate unless an approved evidence tier upgrades its confidence. |
| **Carbon-primary** | Carbon (g CO2e) is the primary scientific metric. Energy (Wh) is the co-primary input. Everything else is operational or educational. |
| **Provider-agnostic** | No vendor lock-in. Works with estimated, modeled, or provider-derived data. |
| **Comparable** | A fixed methodology and version make disclosures comparable across providers and over time. |
| **No greenwashing** | Equivalencies are educational only. They must not be presented as offsets, certification, restoration claims, or verified environmental outcomes. |

---

## 2. Metric Hierarchy

AIEDS defines four levels of metrics:

### Level 1 — Scientific (required)

| Field | Unit | Notes |
| --- | --- | --- |
| `carbon_g_co2e` | g CO2e | **Primary metric.** Carbon equivalent. |
| `energy_wh` | Wh | Co-primary input. Required alongside carbon. |

### Level 2 — Operational (required where available)

| Field | Notes |
| --- | --- |
| `model` | Model identifier (e.g. `claude-sonnet-4-6`). |
| `provider` | Provider name (e.g. `anthropic`). |
| `cost_usd` | Monetary cost in USD. |
| `latency_ms` | Wall-clock latency in milliseconds. |
| `input_tokens` | Prompt token count. |
| `output_tokens` | Completion token count. |

### Level 3 — Human Equivalencies (optional, educational only)

These are illustrative comparisons derived from the Level 1 metrics. They MUST be labeled as educational and MUST NOT be presented as offsets or verified impact.

| Field | Formula / Reference |
| --- | --- |
| `tree_time_minutes` | See §3.2 — MRT methodology. |
| `phone_charges` | `energy_wh / 12` (≈ 12 Wh per full smartphone charge). |
| `led_bulb_hours` | `energy_wh / 10` (≈ 10 W LED bulb). |
| `laptop_minutes` | `(energy_wh / 50) * 60` (≈ 50 W laptop). |
| `driving_meters` | `(carbon_g_co2e / 170) * 1000` (≈ 170 g CO2e/km, typical ICE passenger car). |

### Level 4 — Earth Context (future, optional)

Regional grid intensity, renewable mix, carbon intensity context, restoration linkage. Not required in AIEDS v1.

---

## 3. Methodology

### 3.1 Energy ↔ Carbon

Implementations SHOULD use provider-reported energy where available (confidence: `Provider-derived`). When unavailable, energy MAY be modeled from a declared carbon estimate using a declared grid carbon intensity:

```
energy_wh = (carbon_g_co2e / grid_intensity_g_per_kwh) * 1000
```

Alternatively, carbon may be derived from modeled energy:

```
carbon_g_co2e = (energy_wh / 1000) * grid_intensity_g_per_kwh
```

The **reference grid intensity** for AIEDS v1 modeled disclosures is `429 g CO2e/kWh` (global average; IEA reference; modeled, not regional). Implementations using a different intensity MUST declare the value and source.

### 3.2 Mature Reference Tree (MRT) — Tree-Time Methodology

AIEDS defines a **Mature Reference Tree (MRT)** as the educational anchor for Tree-Time equivalency:

```
1 MRT = 22 kg CO2e / year
```

Tree-Time formula:

```
tree_time_minutes = (carbon_g_co2e / 22000) * 525600
```

Where `525600` = minutes in one year (365 × 24 × 60).

**MRT assumptions:**
- 22 kg CO2e/year represents a temperate-zone mature tree absorbing carbon through photosynthesis (mid-range of published estimates).
- MRT is a stable educational reference. It is NOT a claim about any specific tree, species, forest, restoration project, offset, or conservation outcome.
- Implementations MUST label Tree-Time as educational.

### 3.3 Equivalency Reference Constants

Implementations MAY substitute documented alternatives for the following reference constants. Any substitution MUST be disclosed in the methodology field.

| Equivalency | Reference constant |
| --- | --- |
| Phone charge | 12 Wh per full smartphone charge |
| LED bulb | 10 W continuous |
| Laptop | 50 W continuous |
| Driving | 170 g CO2e/km (typical ICE passenger car) |

---

## 4. Confidence Model

Every AIEDS disclosure MUST declare a confidence tier. Implementations MUST NOT claim a tier they cannot support.

| Tier | Meaning |
| --- | --- |
| `Estimated` | Derived from published heuristics or order-of-magnitude estimates. No model or provider data used. |
| `Modeled` | Derived from a declared model (e.g. token-count × coefficient). No live provider measurement. |
| `Provider-derived` | Sourced directly from provider-reported measurement at inference time. |
| `Verified` | Independently audited; evidence on record. |

**Default for most implementations:** `Estimated` or `Modeled`.

Disclosures MUST avoid certification, offset, or environmental-outcome language that exceeds their confidence tier.

---

## 5. Disclosure Schema (v1)

A conforming AIEDS v1 disclosure is a structured object with at minimum the Level 1 fields and a `version` declaration.

### 5.1 JSON Schema (reference)

```json
{
  "version": "AIEDS v1",
  "confidence": "Modeled",
  "energy_wh": 0.42,
  "carbon_g_co2e": 0.18,
  "provider": "anthropic",
  "model": "claude-sonnet-4-6",
  "latency_ms": 4200,
  "input_tokens": 120,
  "output_tokens": 80,
  "cost_usd": 0.0012,
  "methodology": "AIEDS v1; MRT=22kg CO2e/yr; grid=429 g/kWh (IEA global average, modeled)",
  "equivalencies": {
    "tree_time_minutes": 4.30,
    "phone_charges": 0.035,
    "led_bulb_hours": 0.042,
    "laptop_minutes": 0.50,
    "driving_meters": 1.06
  }
}
```

### 5.2 Required Display Copy

Any surface rendering an AIEDS disclosure MUST include:

> **AIEDS v1 estimated disclosure**
> Energy and carbon are modeled estimates.
> Tree-Time and equivalents are educational comparisons.

### 5.3 Compact and Expanded Display

Implementations MAY abbreviate the disclosure in constrained UI surfaces:

**Compact (minimum viable display):**
- Carbon (g CO2e)
- Energy (Wh)
- Tree-Time (minutes)
- Confidence tier

**Expanded / details view:**
- All Level 2 operational fields
- All equivalencies
- Full methodology string

---

## 6. Versioning and Governance

- The standard is versioned: `AIEDS v1`, `AIEDS v2`, etc.
- **Methodology changes that alter output values require a version bump.** Adding optional fields or clarifying text does not.
- Mixed methodologies MUST NOT be combined without explicit labeling. A surface that still uses a legacy assumption (e.g. a different MRT value) must be labeled until migrated.
- Contribution process: issues and pull requests welcome via the repository hosting this document.
- License: CC BY 4.0 for the specification text. Implementations may use any license.

---

## 7. Non-Goals (AIEDS v1)

AIEDS v1 explicitly does not:

- Measure or verify provider emissions.
- Certify providers, models, or products.
- Account for offset markets, carbon credits, or restoration outcomes.
- Provide live regional grid or carbon-intensity data (Level 4 — future).
- Make claims about aggregate fleet or infrastructure energy.

---

## 8. Adoption

See [`aieds-adoption-guide.md`](aieds-adoption-guide.md) for implementation patterns, display guidance, and a conformance checklist.

---

## 9. Open Questions (v2 roadmap)

- Canonical content-type and JSON Schema ID for machine-readable disclosures (`application/vnd.aieds+json`).
- Per-provider default energy/carbon coefficients registry and sourcing methodology.
- AIEDS envelope for non-chat surfaces (batch reports, agent runs, Earth Intelligence, test results, automation summaries).
- A lightweight conformance test suite.
- Level 4 regional grid integration specification.
