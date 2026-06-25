# AIEDS — the AI Environmental Disclosure Standard (whitepaper)

*Opening post for the AIEDS discussion · random-knights/xyz-earth · AIEDS v1 (June 2026)*

Every AI response has an environmental cost — a little electricity, a little carbon — and almost no AI product tells you what it is. **AIEDS (AI Environmental Disclosure Standard)** is rand0m's attempt to fix that honestly: a consistent, provider-agnostic, *educational* way to attach an energy + carbon estimate to an AI response, with the humility the science demands. This post is the whitepaper; we're opening it for researchers, providers, and the community to challenge and improve.

It pairs with our Earth Health Score (companion discussion). Together they're our two most distinctive features — one looks *outward* at the planet, the other looks *inward* at the footprint of using AI itself. Crucially, **the two never mix**: your AI footprint is personal accountability, not a planetary measurement.

---

## 1. Why a standard is needed

The honest state of AI-carbon accounting is **wide disagreement**, not consensus:

- Google's 2025 assessment puts a **median text query at ~0.24 Wh and ~0.03 g CO₂e** (inference only); a short GPT-4o query around 0.42 Wh.
- Epoch AI (2025) estimates ChatGPT at **~0.3 Wh/query — roughly 10× lower** than figures widely circulated a year earlier, after correcting GPU-utilization and efficiency assumptions.
- Across published methods, per-query estimates span **~0.38 g to ~68 g CO₂e — about a 200× spread**, depending on whether you count training amortization, embodied GPU manufacturing, cooling (PUE), and network transmission.

Two conclusions follow, and they *are* the design of AIEDS: (1) a single honest, **provider-agnostic** method that states its assumptions beats a precise-looking number with hidden ones; and (2) any disclosure must be **labelled as estimated/modeled**, never as a verified or certified measurement.

---

## 2. What AIEDS v1 is

A provider-agnostic schema for one disclosure attached to a response, report, or summary. Its metric hierarchy:

- **Level 1 — Scientific (required):** Energy (Wh) and Carbon (g CO₂e). *Carbon is the primary metric.*
- **Level 2 — Operational (required):** model, provider, cost, latency.
- **Level 3 — Human equivalencies (optional):** Tree-Time, phone-charge, LED-bulb, driving-distance — illustrative comparisons, never offset/restoration claims.
- **Level 4 — Earth context (future):** regional grid mix, carbon intensity, restoration context — *readiness only; not live.*

**Confidence model:** every disclosure carries one of `Estimated · Modeled · Provider-derived · Verified`. Today's disclosures use **Estimated/Modeled** — we do not assert provider-derived or verified numbers until a provider supplies real energy data.

### The Mature Reference Tree (MRT)

Tree-Time is our flagship equivalency — it turns abstract grams into "how long would a tree need to absorb this":

```
1 MRT = 22 kg CO₂e / year
tree_time_minutes = (carbon_g_co2e / 22000) × 525600
```

MRT is a **stable educational reference**, explicitly *not* a claim about any specific tree, forest, offset, or restoration outcome.

### Sample disclosure

```
Model: Claude   Provider: Anthropic   Latency: 4.2s   Cost: $0.0012
Energy: 0.42 Wh   Carbon: 0.18 g CO₂e   Tree-Time: 3.2 min   Confidence: Estimated
Methodology: AIEDS v1
```

Note that 0.42 Wh / 0.18 g sits squarely within the Google (0.24 Wh / 0.03 g) and Epoch (~0.3 Wh) range — and the 200× spread in the literature is exactly *why* we label it Estimated and avoid false precision.

---

## 3. The boundary — what AIEDS deliberately does NOT do

- It does **not** imply exact emissions, provider certification, offset quality, or verified environmental impact.
- Human equivalencies are illustrative, not offsets.
- The AI footprint is **never blended into the Earth Health Score** — it's a separate, device-scoped field (`blendedIntoScore: false`). Conflating "my chatbot use" with "planetary health" would be both scientifically wrong and a greenwashing risk; we keep them firmly apart.
- It avoids unsupported precision and any environmental-outcome language.

---

## 4. Where it's going — toward an open standard

AIEDS is most useful as a **shared, open standard** rather than one app's widget. The directions we want help on:

- **Provider-derived energy.** The biggest accuracy unlock is providers publishing per-request (or per-token) energy at a given carbon intensity. AIEDS already has the `Provider-derived`/`Verified` confidence rungs waiting for it.
- **Regional grid + carbon intensity.** The future Earth-context chain is `AI response → carbon → Tree-Time → regional grid mix → carbon intensity → restoration context`. The same Earth pipeline that powers the globe can contextualize a footprint by *where and when* the compute ran (a kWh in a coal-heavy grid ≠ a kWh in a hydro grid).
- **Token/modality scaling.** Per-response is coarse; energy scales with tokens, model size, and modality (text vs image vs video). A transparent scaling function is an open design question.
- **Embodied vs operational.** Whether (and how) to amortize training + GPU manufacturing per query is the single biggest source of the 200× spread — AIEDS should take an explicit, documented stance.

---

## 5. Open questions for the community

1. What's the most defensible **default assumption set** (PUE, grid intensity, embodied amortization) for an *Estimated* disclosure?
2. Is **per-response** the right unit, or per-token / per-modality?
3. Should Tree-Time stay the headline equivalency, or is there a less anthropomorphic, more rigorous one?
4. How should AIEDS represent **uncertainty** — a range, a confidence label, or both?
5. What would it take for a provider to publish `Provider-derived` energy, and what schema would they need?

If you work on ML energy measurement, grid carbon intensity, or environmental disclosure standards, we'd love your input — AIEDS is meant to be co-developed and versioned in the open.

---

## Notable sources

- Google Cloud — *Measuring the environmental impact of AI inference* (2025): https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference
- Epoch AI — ChatGPT per-query energy analysis (2025)
- H. Ritchie — *What's the carbon footprint of using ChatGPT or Gemini?* (Aug 2025): https://hannahritchie.substack.com/p/ai-footprint-august-2025
- *How Hungry is AI? Benchmarking Energy, Water, and Carbon of LLM Inference* (arXiv 2505.09598): https://arxiv.org/html/2505.09598v1
- AIEDS v1 Foundation (Random Knights internal standard, this repo's basis)

*Disclosure: AIEDS v1 produces estimated/modeled figures for education and transparency. It is not a certified measurement, an offset, or an environmental claim. Corrections and contributions welcome.*
