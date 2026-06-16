# Test / Inspect / Automate — Public Monetization Spec

**Date:** 2026-06-16 (session 40)
**Status:** Ratified — entitlement model shipped in P3 bundle (`8022265`) as TP-1..TP-4
**Owner:** Test agent (implementation); Fable (ratification); Docs (spec)

---

## Entitlement Model

### Tiers

| Tier | Definition | AI quota |
| --- | --- | --- |
| **Free** | Any signed-in user | Limited (platform key; RC-configurable cap) |
| **Pro** | Paid subscription OR owner-granted Pro seat | Higher cap; BYOK allowed |
| **Org** | Org licence (multi-seat) | Higher cap; BYOK allowed; shared org quota |

### Test / Inspect / Automate entitlement map (TP-1..TP-4)

| Entitlement | Free | Pro | Org | Notes |
| --- | --- | --- | --- | --- |
| **TP-1 — Record test (client-side)** | ✅ | ✅ | ✅ | No server required; T5 scope |
| **TP-2 — Create test (manual authoring)** | ✅ | ✅ | ✅ | Client-only; T6 scope |
| **TP-3 — View / browse / export plan** | ✅ | ✅ | ✅ | Client-only; read path |
| **TP-4 — Submit to `/123` (push to GitHub)** | ❌ | ✅ | ✅ | **Pro/org only**; requires T7 (githubProxy callable) |
| **Run-in-app (CI trigger + live results)** | ❌ | STRETCH | STRETCH | T8; post-launch; not in P3 |
| **Jira ticket creation** | ❌ | CUT | CUT | Cut from P3 scope; post-launch |
| **Save to own repo (T8)** | ❌ | post-launch | post-launch | Separate T8 spec required |

### githubProxy allowlist constraint (unchanged)

`githubProxy` callable remains `external_access_allowlist`-gated **in addition to** the Pro/org entitlement check. A Pro user not on the allowlist cannot submit. The allowlist is the current gate for beta; at public launch, the allowlist gate is replaced by the Pro/org entitlement check alone.

**Transition:** at public-flip, remove the `external_access_allowlist` guard from `githubProxy` and replace with `entitlement == pro || entitlement == org` check. The allowlist key is retired for this callable at public launch (but retained for other privileged flows).

---

## Free/Paid Map

```
Record  Create  View/Export  Submit   Run-in-app   Jira
  ✅      ✅       ✅          FREE|PRO   PRO(stretch) CUT
                              ↑
                        Pro/org gate (TP-4)
```

---

## BYOK interaction

- Free users with BYOK: quota cap removed for AI calls; TP-4 still requires Pro/org.
- Pro/org users with BYOK: highest quota; self-funded.
- `keySource` in callable telemetry enables per-call cost attribution.

---

## Deferred / post-launch

| Feature | Status | Blocker |
| --- | --- | --- |
| Run-in-app (CI trigger + results sync) | STRETCH (Pro post-launch) | T8 spec required; Firebase real-time or polling callable |
| Jira ticket creation | CUT | OAuth proxy + Jira App spec required; not in P3 bundle |
| Save to own repo | Post-launch | T8; separate spec; no ETA |
| Inspect → DB persistence | Post-launch | Firestore schema + governance spec required |
| Org licence management UI | Post-launch | Admin surface; separate spec |

---

## P0 prerequisite (blocking TP-4 for public)

The callable gate mismatch (Finding 2 in `test-page-beta-readiness.md`) must be resolved before TP-4 is accessible to public non-domain users. The fix: callables check `entitlement == pro || entitlement == org` (post-public-flip) or `external_access_allowlist` (beta gate). Until the fix lands, all callable-backed features (including TP-4) fail with 403 for non-domain users.
