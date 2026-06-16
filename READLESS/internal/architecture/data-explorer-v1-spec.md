# Inspect — Data Explorer v1 Spec

**Date:** 2026-06-16 (session 42)
**Status:** RATIFIED — POST-LAUNCH scope
**Owner:** Test agent (implementation); Fable (ratification); Docs (this record)

---

## Purpose

Data Explorer is a read-only Inspect surface that lets owner/org-tier users browse entity records across the four governed entity types (E1–E4). It is scoped to POST-LAUNCH — not in the P3 public bundle.

---

## Scope — E1–E4 Entity Types

| ID | Entity type | Adapter | Notes |
| --- | --- | --- | --- |
| E1 | Earth data sources | Read-only adapter | Governed catalog entries; lat/long where present |
| E2 | Test records | Read-only adapter | Test plan + record metadata; no result payloads |
| E3 | Agent runs | Read-only adapter | Run metadata + AIEDS disclosure; no prompt/completion content |
| E4 | Connections (Connect sources) | Read-only adapter | Source onboarding metadata; intake status |

**Secrets excluded (binding):** no API keys, Firebase secrets, environment variables, BYOK keys, or any credential-bearing field may appear in any Data Explorer adapter or query result. Adapters must explicitly exclude secret fields at the query layer — not at the display layer.

---

## Access Gate: Owner / Org only

- **Owner:** always has access.
- **Org tier:** access granted. Org users see entity records scoped to their org context.
- **Pro tier:** no Data Explorer access in v1. May be added in v2 with a Fable ruling.
- **Free tier:** no access.

Access enforced at the callable layer (entitlement check before any query executes). Client must not render the Data Explorer entry point for non-owner/non-org users.

---

## Recycler — Owner-only (not org)

`Recycler` (soft-delete / restore flow for governed entity records) is **owner-only** — not available to org tier in v1.

Rationale: Recycler operates on the canonical governed catalog. Org-tier deletions touching catalog entries could corrupt shared state. Owner-only gate is a deliberate conservative choice for v1.

---

## Read-only Adapters

All Data Explorer queries use read-only adapters. No adapter may:
- Write, update, or delete any record.
- Expose credentials, keys, or secret-bearing fields.
- Execute a side-effect (no triggers, no function invocations as a side-effect of a read).

Adapter interface:
```dart
abstract class DataExplorerAdapter<T> {
  Future<List<T>> query({
    required String entityType,   // 'e1'|'e2'|'e3'|'e4'
    int limit = 50,
    String? cursor,               // pagination cursor
    Map<String, dynamic>? filter, // field-level filter (server-side)
  });

  // Must never expose: keys, secrets, credentials, BYOK fields
  // Must enforce: entitlement check before query
}
```

---

## Off-Hive Note (binding)

Data Explorer entity records are **NOT stored in Hive**. This is a binding constraint arising from three collision risks discovered during design:

1. **Frozen typeId 7 conflict:** Hive typeId 7 is already reserved and frozen by an existing governed adapter. Adding E1–E4 records to Hive risks typeId collision if a future adapter is registered without checking the freeze list.

2. **`agent_order` field collision:** The `agent_order` Hive field name is used by at least two existing adapters with incompatible semantics. Entity records with an `agent_order` concept would collide.

3. **`kn1ghts_hive` is app-local:** the `kn1ghts_hive` Hive box is scoped to the app process and is not accessible cross-process or for server-side reads. Data Explorer requires server-readable entity state (for org-tier sharing) — Hive cannot serve this.

**Storage: Firestore.** Entity records for Data Explorer are stored in Firestore under a governed collection path (to be defined by Earth agent in the implementation slice, with a `DOCS:` callout). No Hive involvement.

---

## Post-launch delivery sequence

1. Fable spec + ratification (this doc = ratification record for scope/gates).
2. Earth agent: Firestore collection schema + governance entry.
3. Test agent: adapter implementations (E1–E4) + entitlement gate.
4. Test agent: Data Explorer UI (read-only browse surface; owner/org only).
5. Test agent: Recycler UI (owner-only; soft-delete + restore).
6. Gate: owner device-pass; org-user device-pass; secret-exclusion audit.

---

## Not in scope (v1)

- Write/edit/delete via Data Explorer (beyond Recycler soft-delete for owner).
- Pro-tier access.
- Cross-org entity sharing.
- Export to CSV / JSON from the UI.
- Full-text search across entity payloads.
