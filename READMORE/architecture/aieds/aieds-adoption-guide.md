# AIEDS Adoption Guide

**Version:** AIEDS v1
**Status:** Published
**Date:** 2026-06-15

See the [AIEDS Whitepaper](aieds-whitepaper.md) for the full specification.

---

## Quick Start

An AIEDS v1 disclosure requires three things:

1. **Level 1 metrics** — `carbon_g_co2e` and `energy_wh`.
2. **Confidence tier** — `Estimated`, `Modeled`, `Provider-derived`, or `Verified`.
3. **Required display copy** — three lines, always visible.

Everything else is optional enrichment.

---

## Step 1 — Compute Carbon and Energy

### Option A: Provider-reported data

If your AI provider returns energy or carbon at inference time, use it directly and set `confidence: Provider-derived`.

### Option B: Token-count model (most common)

Use a published or internally declared coefficient:

```
carbon_g_co2e = (input_tokens + output_tokens) * carbon_per_token_g
energy_wh     = (carbon_g_co2e / 429) * 1000
```

Declare your coefficient and its source in the `methodology` field. Set `confidence: Modeled`.

### Option C: Heuristic estimate

Use an order-of-magnitude estimate for your model class (e.g. "large language model, ~0.001 g CO2e per token"). Set `confidence: Estimated`.

---

## Step 2 — Compute Equivalencies (optional)

```
tree_time_minutes = (carbon_g_co2e / 22000) * 525600
phone_charges     = energy_wh / 12
led_bulb_hours    = energy_wh / 10
laptop_minutes    = (energy_wh / 50) * 60
driving_meters    = (carbon_g_co2e / 170) * 1000
```

Label all equivalencies as educational. Never present them as offsets.

---

## Step 3 — Construct the Disclosure Object

```json
{
  "version": "AIEDS v1",
  "confidence": "Modeled",
  "carbon_g_co2e": 0.18,
  "energy_wh": 0.42,
  "provider": "your-provider",
  "model": "your-model-id",
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

---

## Step 4 — Render the Disclosure

### Required copy (always visible, non-optional)

```
AIEDS v1 estimated disclosure
Energy and carbon are modeled estimates.
Tree-Time and equivalents are educational comparisons.
```

### Compact display (space-constrained surfaces)

Show at minimum:

| Field | Example |
| --- | --- |
| Carbon | 0.18 g CO2e |
| Energy | 0.42 Wh |
| Tree-Time | 4.3 min |
| Confidence | Modeled |

### Expanded display

Reveal all Level 2 and Level 3 fields behind an expand affordance (accordion, tooltip, detail panel). Show the full `methodology` string.

---

## Conformance Checklist

### Must (required for AIEDS v1 conformance)

- [ ] `version: "AIEDS v1"` present in every disclosure object.
- [ ] `carbon_g_co2e` and `energy_wh` present and non-zero.
- [ ] `confidence` present and set to one of the four defined tiers.
- [ ] `methodology` string present; declares grid intensity and MRT value if used.
- [ ] Required display copy appears on every rendered surface.
- [ ] No equivalency labeled as offset, credit, certification, or verified outcome.
- [ ] Mixed-methodology surfaces labeled until migrated to AIEDS v1.

### Should (best practice)

- [ ] Level 2 operational fields (`model`, `provider`, `cost_usd`, `latency_ms`, `input_tokens`, `output_tokens`) populated where available.
- [ ] Compact and expanded display modes both implemented.
- [ ] Methodology string includes carbon coefficient source (not just the value).

### Must not

- [ ] Never claim `Provider-derived` or `Verified` confidence without the corresponding evidence.
- [ ] Never present Tree-Time or other equivalencies as carbon offsets.
- [ ] Never omit the required display copy on a rendered surface.
- [ ] Never mix AIEDS v1 and legacy methodologies on the same surface without labeling.

---

## Surfaces and Attachment Points

AIEDS disclosures can attach to any AI-produced artifact:

| Surface | Notes |
| --- | --- |
| Chat / response card | Primary use case. Compact display default; expand for details. |
| Agent run summary | Aggregate disclosure for the full run (sum tokens/cost; average latency). |
| Report / export | Include disclosure block in report header or footer. |
| Test result | Attach to AI-generated test content. |
| Automation summary | Per-step and aggregate disclosures. |
| Podcast / daily summary | Aggregate disclosure for the generation session. |

---

## Frequently Asked Questions

**Can I use AIEDS with any AI provider?**
Yes. AIEDS is provider-agnostic. Use whichever confidence tier reflects your data source.

**What if my provider doesn't report energy or carbon?**
Use the `Modeled` tier with a declared per-token coefficient and grid intensity. Document both in `methodology`.

**Can I change the MRT value or equivalency constants?**
Yes, with two requirements: declare the value you used in `methodology`, and label the surface until migrated if you are changing from a previous value.

**Is Tree-Time a carbon offset?**
No. Tree-Time is an educational equivalency derived from a reference tree absorbing carbon at a steady state. It is not a claim about any specific tree, forest, project, or offset instrument. Always label it as educational.

**How do I handle a response that spans multiple model calls?**
Sum `input_tokens`, `output_tokens`, `cost_usd`, `carbon_g_co2e`, `energy_wh`; sum latencies or use wall-clock total. Set `confidence` to the lowest tier across all calls.

**What changes require a version bump to AIEDS v2?**
Any methodology change that would alter the numeric output of a disclosure — e.g. changing the MRT value, the reference grid intensity, or the core formula. Adding optional fields, clarifying text, or adding surface guidance does not require a version bump.

---

## Reference Implementation Notes

A conforming implementation typically consists of:

1. **A pure model / data class** — holds the disclosure fields; computes equivalencies from carbon and energy inputs.
2. **A presentation component** — renders compact and expanded views with required copy.
3. **A test suite** — asserts formula correctness for representative inputs (tree-time, equivalencies, confidence labeling).

No provider integration, live data feed, or backend service is required for AIEDS v1 conformance.

---

## Contributing

Issues, corrections, and proposals welcome. See the repository CONTRIBUTING guide.
