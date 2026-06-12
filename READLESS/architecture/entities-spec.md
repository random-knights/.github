# Entities Domain — Spec (E1)

Date: 2026-06-12
Author: Fable agent (spec); Docs agent (persisted per §15)
Ratified by: Fable (session 17); owner-approved (session 16)
Assigned to: Connect agent
Status: E1 in progress — slice 1 at 081c4f5 (gate-passed)

---

## Context

Entities is an owner-approved domain (session 16) assigned to Connect agent.
It enables named entities (species, organizations, projects, registry bodies)
to be associated with Earth layers, regions, and Connect sources — providing
structured context beyond raw data feeds.

Prerequisite: Connect source intake pipeline (`c2-0`) at `3ab6786` — deployed
in Production Release `27393039706`. Entity intake depends on the same
registry infrastructure.

---

## Governing Rule — Unsourced Mappings Unrepresentable

**The core invariant of E1:** every entity-to-source or entity-to-region
mapping must be traceable to an explicit, named, public-domain source record.

- Unsourced mappings may not be stored, displayed, or passed to @scient1st.
- "Inferred" or "derived" entity links (e.g., inferring that a carbon project
  is owned by an entity based on proximity or name matching) are prohibited
  without an explicit governance phase.
- An entity record with no source citation is unrepresentable in the catalog —
  it must not be created, even as a stub.

This rule applies at the data model layer. The `EntityDefinition` (or
equivalent) must carry a required `sourceRef` field pointing to the named
public-domain record. Absence of a `sourceRef` must be a hard model error,
not a nullable field.

---

## E1 Scope

E1 covers the foundational intake and registry layer for Entities. It does not
cover full UI surfacing or @scient1st entity context (those are E2+ phases).

| Slice | Description | Status |
| --- | --- | --- |
| 1 | Entity model (`EntityDefinition`) with mandatory `sourceRef`; unsourced mapping guard; Connect intake pipeline integration | gate-passed @ `081c4f5` |
| 2+ | Entity-to-region mapping; entity-to-source association; catalog registration via `EARTH:` delta | queued |

---

## Entity Types (Approved for E1–E2)

| Type | Examples | Source constraint |
| --- | --- | --- |
| Registry body | Verra, Gold Standard, IUCN | Public registry's own data |
| Species | IUCN Red List entries | IUCN Red List API (keyless) or GBIF |
| Protected area entity | WDPA site record | WDPA metadata (already deployed) |

Entity types not in this list require a separate Fable spec before
implementation.

---

## Relationship to Other Domains

- **VCM:** VCM may reference registry body entities (Verra, Gold Standard)
  if source-backed and a governance phase is approved (see
  [`architecture/vcm-governance-spec.md`](vcm-governance-spec.md)).
- **Connect:** entity intake uses the Connect source intake pipeline as
  infrastructure (`c2-0` at `3ab6786`).
- **Earth catalog:** entity registration follows the catalog non-touch rule
  (§8) — Connect emits `EARTH:` delta; Earth applies.
- **@scient1st:** entity context may be passed to @scient1st only in E2+ and
  only for source-backed, non-sensitive entity records. No entity context in E1.

---

## Governance Constraints

- No entity linking to VCM projects without explicit governance phase (see
  VCM spec).
- No precise geographic coordinates for entity records — coarse region only.
- Endangered species entity records must inherit the biodiversity suppression
  guard (see [`architecture/environmental-data-vertical-audit.md`](environmental-data-vertical-audit.md) §Biodiversity)
  before any location-adjacent field is exposed.
- Catalog registration: no `EntityDefinition` reaches the Earth catalog without
  a Fable governance spec on record for that entity type.
