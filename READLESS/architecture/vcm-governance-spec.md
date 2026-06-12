# VCM / Carbon-Offset Data Vertical — Governance Spec

Date: 2026-06-12
Author: Fable agent (spec); Docs agent (persisted per §15)
Ratified by: Fable (session 17); owner-approved (session 16)
Assigned to: Systems agent
Status: approved — implementation queued after Environmental biodiversity slice deployed

---

## Context

VCM (Voluntary Carbon Market) / Carbon-offset is an approved data vertical for
the Earth-Systems domain. It surfaces carbon credit project data as Earth layers,
enabling users to understand carbon offset activity at a regional level.

This spec governs the structural constraints, source selection, and governance
rules that apply to any VCM implementation. These constraints exist to prevent
the vertical from being mistaken for financial advice or investment framing.

---

## Source

**Berkeley Carbon Trading Project (BCTP)** — primary source.

- Publicly available research data; academic origin, non-commercial access.
- Provides project-level carbon credit metadata: project name, region, type
  (REDD+, IFM, ARR, etc.), registry, vintage year range, issued/retired volumes.
- Does NOT provide pricing data, portfolio data, or investment performance data.
- Does NOT provide inferred entity ownership chains.

Acceptable data fields for catalog entry: project ID, region (coarse), project
type, registry name, vintage year range, volume (issued/retired, aggregate at
region level). No per-project financial fields.

---

## Structural No-Investment-Framing Rule (Non-Negotiable)

This is the governing constraint for the entire VCM vertical. It applies at
every layer: data models, catalog entries, display widgets, @scient1st context.

**Banned from all models and display:**

- Price per tonne (current or historical)
- Market value, market cap, or valuation of any credit batch
- Portfolio allocation or weighting
- Return on investment, yield, or performance
- Any field that implies the user can or should purchase credits through the app

**Banned terms** (must not appear in any user-visible string, `@scient1st`
response context, or Earth layer description):

> "invest", "investment", "buy", "purchase", "portfolio", "return", "yield",
> "profit", "financial performance", "market value", "price"

Implementation note: apply banned-term enforcement at the governance layer
(a named, independently testable function, not inlined in a widget) before any
VCM data reaches the display layer or @scient1st context assembly. This mirrors
the biodiversity suppression guard pattern — it is a structural precondition,
not a follow-up.

---

## Coarse Regions Only

VCM catalog entries aggregate at coarse region level (country or multi-country
area). No project-level geographic coordinates or precise boundaries.

Rationale: project-level coordinates can identify specific land parcels and
implicitly expose ownership information. Coarse aggregation (e.g., "South
America — Brazil / Peru corridor") is sufficient for Earth layer context and
avoids inadvertent entity exposure.

---

## No Inferred Entity Links

VCM data must not infer or surface any link between a carbon project and a
specific company, fund, or owner entity.

- Do not join VCM project records to any entity registry (including future
  Entities domain entries) at the data layer without an explicit governance phase.
- @scient1st context may reference project types and regional volumes; it must
  not attribute volumes to named entities.
- Extension point: if a future governance phase explicitly approves
  source-backed entity linking (e.g., a registry entry that is itself a
  public-domain entity record), that phase requires a new Fable spec.

---

## Extension Point — Source-Backed Entities Only

The VCM vertical may eventually connect to the Entities domain (owner-approved,
session 16) for named registry bodies (e.g., Verra, Gold Standard). This is
permitted only if:

1. The entity is a public-domain registry body, not a fund, company, or
   private entity.
2. The link is sourced from the public registry's own data (not inferred).
3. An explicit governance phase has been approved for the link.

Do not implement entity linking without all three conditions met and a Fable
spec on record.

---

## Implementation Order

| Step | Description | Gate |
| --- | --- | --- |
| 1 | Systems agent data vertical: BCTP source adapter, coarse-region aggregation, asset-backed refresh | Banned-term guard implemented as named testable function before merge |
| 2 | Earth agent catalog registration: `earth_source_vcm_catalog.dart` entry via `EARTH:` delta | Registration applied after Systems slice merges |
| 3 | Earth agent layer wire-up: Data View card for VCM layer | No financial fields; no entity links; governance tests added |

---

## Sequencing Constraint

Do not begin VCM implementation until the Environmental biodiversity slice
(`e9f9e47`) is deployed. Reason: both biodiversity and VCM run on the Systems
worktree. Avoid parallel vertical work in the same worktree.
