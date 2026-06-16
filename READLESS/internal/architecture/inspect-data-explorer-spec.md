# Inspect — DataSource Explorer Spec

**Date:** 2026-06-16 (session 43)
**Status:** RATIFIED — POST-LAUNCH scope
**Supersedes:** `data-explorer-v1-spec.md` (session 42 draft; this file is authoritative)
**Owner:** Test agent (implementation); Fable (ratification); Docs (spec)

---

## Purpose

The DataSource Explorer is a read-only Inspect surface that lets owner/org-tier users browse entity records across the four governed entity types (E1–E4). Scoped to **POST-LAUNCH** — not in the P3/public bundle.

Key security principle: the Inspect security fix (`86ae546`) already gates the Inspect page to owner/org before public launch. The DataSource Explorer is an additive surface within that gate.

---

## Scope — E1–E4 Entity Types

| ID | Entity type | Adapter | Notes |
| --- | --- | --- | --- |
| E1 | Earth data sources | Read-only adapter | Governed catalog entries; lat/long where present |
| E2 | Test records | Read-only adapter | Test plan + record metadata; no result payloads |
| E3 | Agent runs | Read-only adapter | Run metadata + AIEDS disclosure; no prompt/completion content |
| E4 | Connections (Connect sources) | Read-only adapter | Source onboarding metadata; intake status |

**Secrets excluded (binding):** no API keys, Firebase secrets, environment variables, BYOK keys, or any credential-bearing field may appear in any adapter or query result. Adapters must exclude secret fields at the **query layer** — not at the display layer.

---

## Access Gate: Owner / Org only

- **Owner:** always has access. (Also covered by `86ae546` Inspect gate.)
- **Org tier:** access granted; records scoped to org context.
- **Pro tier:** no DataSource Explorer access in v1.
- **Free tier:** no access.

Access enforced at the callable layer (entitlement check before any query). Client must not render the DataSource Explorer entry point for non-owner/non-org users.

---

## Recycler — Owner-only (not org)

`Recycler` (soft-delete / restore for governed entity records) is **owner-only** — not available to org tier in v1.

Rationale: Recycler operates on the canonical governed catalog. Org-tier deletions touching catalog entries risk shared state corruption. Owner-only is the conservative v1 choice.

---

## Read-only Adapter Interface

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

Adapters must be **read-only** — no write, update, delete, or side-effect (no triggers, no function invocations as a side-effect of a read).

---

## Off-Hive Storage — Binding (three collision risks)

DataSource Explorer entity records are **NOT stored in Hive**:

1. **Frozen typeId 7 conflict:** Hive typeId 7 is reserved and frozen by an existing governed adapter. Adding E1–E4 records risks collision if a future adapter is registered without checking the freeze list.
2. **`agent_order` field collision:** the `agent_order` Hive field name is used by at least two existing adapters with incompatible semantics. Entity records with an `agent_order` concept would collide.
3. **`kn1ghts_hive` is app-local:** the `kn1ghts_hive` Hive box is scoped to the app process — not accessible cross-process or for server-side reads. DataSource Explorer requires server-readable entity state for org-tier sharing.

**Storage: Firestore.** Entity records stored in Firestore under a governed collection path (Earth agent defines with `DOCS:` callout at implementation slice). No Hive involvement.

---

## Post-launch delivery sequence

1. Fable ratification (this doc = ratification record for scope/gates).
2. Earth agent: Firestore collection schema + governance entry.
3. Test agent: adapter implementations (E1–E4) + entitlement gate.
4. Test agent: DataSource Explorer UI (read-only browse; owner/org only).
5. Test agent: Recycler UI (owner-only; soft-delete + restore).
6. Gate: owner device-pass; org device-pass; secret-exclusion audit.

---

## Not in scope (v1)

- Write/edit/delete via DataSource Explorer (beyond Recycler soft-delete for owner).
- Pro-tier access.
- Cross-org entity sharing.
- Export to CSV / JSON from the UI.
- Full-text search across entity payloads.
