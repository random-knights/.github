# Test Page Beta-Readiness Audit

**Date:** 2026-06-15 (session 37)
**Author:** Docs agent (from Test agent audit + Fable rulings)
**Status:** Audit complete — beta MVP scope ratified; T7/T8 items queued
**Scope:** `lib/pages/agents/secret*`, `services/utility/test_*`

---

## Beta Readiness: What's Ready vs What Needs T7/T8

| Capability | Status | Gate |
| --- | --- | --- |
| Record test (client-side capture) | ✅ Beta-ready | T5 — no server required |
| Create test (manual authoring) | ✅ Beta-ready | T6 — client-only |
| View / browse tests | ✅ Beta-ready | client-only |
| Export test plan (local) | ✅ Beta-ready | client-only |
| Push test to GitHub `/123` | ❌ Needs T7 | GitHub App / owner token for write path |
| Jira ticket creation | ❌ Needs T7 | OAuth via Firebase callable proxy |
| Execute tests via CI trigger | ❌ Needs T7 | Trigger user's GitHub Actions; report in-app |
| Live test-result sync | ❌ Needs T8 | Firebase real-time or polling callable |

**Beta MVP = T5/T6 UX-feedback scope:** trusted allowlisted testers use Record + Create flows for UX feedback. No submit, no CI trigger, no GitHub/Jira write. This is client-only and safe for beta.

---

## P0 / P1 / P2 Punch-List

### P0 — Must fix before any tester access

- [ ] **Repo-123 handoff infra leak** (SECURITY — see below): internal `/123` repo path must not be exposed in client-side code, error messages, network requests, or UI strings visible to testers. Any reference to the repo slug, org structure, or internal path is a P0 security finding.
- [ ] **Gate mismatch — External-access gate allows allowlist but callables are domain-only** (SECURITY — see below): the Remote Config `external_access_allowlist` gate correctly allows allowlisted testers into the UI, but Firebase callable functions enforce domain-only auth. Allowlisted non-domain testers will hit callable 403s. Fix: callables must honour the allowlist check, not only domain. Until fixed, allowlisted testers cannot use any callable-backed features.
- [ ] Confirm no client secrets in any bundled JS (Token/API key audit — bundle scan).

### P1 — Fix before tester feedback is actionable

- [ ] Record flow: confirm same-origin overlay works on org `/123` dogfooding path (not just local).
- [ ] Create flow: empty-state UX is clear; no orphaned "submit" affordances that lead to 403.
- [ ] Error surfaces: all callable errors show a user-facing message, not a raw Firebase error code.
- [ ] Loading states on all async operations (record capture, create save).

### P2 — Polish; can ship after initial tester pass

- [ ] Bookmarklet MVP packaging (for external-site record; cross-origin same-origin policy constraint documented in-product).
- [ ] Export format documentation (what the exported plan contains; how to use it).
- [ ] Tester onboarding copy (see Onboarding section below).

---

## Security Findings

### Finding 1 — Repo-123 Handoff Infrastructure Leak (P0)

**Description:** The internal repository path used for generated-test write (`/123`) is referenced in client-visible surfaces. Any tester who inspects network requests, JS bundles, or error messages can infer the internal repo slug, org structure, and write-path topology.

**Risk:** Exposes internal infrastructure topology to external testers; violates CODEX 123 rules (internal write path is owner-gated).

**Remediation:**
- Audit all client-side code for `/123` references; replace with opaque callable proxy responses.
- Generated-test writes go through a Firebase callable that holds the repo reference server-side.
- Error messages from the write callable must not echo the repo path.
- Bundle scan: confirm `/123` slug is absent from compiled `main.dart.js`.

### Finding 2 — Gate Allows Allowlist But Callables Are Domain-Only (P0)

**Description:** `external_access_allowlist` Remote Config gate correctly allows allowlisted non-domain accounts into the app UI. However, Firebase callable functions independently enforce domain-only authentication. An allowlisted tester (non-domain account) passes the UI gate but receives HTTP 403 from any callable they invoke.

**Risk:** Broken tester experience — allowlisted testers see features but all async operations fail silently or with raw 403 errors. Creates confusion about whether the feature is broken or access is restricted.

**Remediation:**
- Callables must perform the same dual-check: domain OR `external_access_allowlist`.
- RC read in callable context: use Admin SDK to read RC at callable invocation time, or pass a signed token that the callable validates.
- Test: non-domain allowlisted account must complete a full Record → callable-backed save flow without 403.
- Until fixed: limit beta tester all-clear to domain accounts only, OR restrict beta to UI-only flows (T5/T6 client-side; no callable-backed features).

---

## Tester Onboarding

**Pre-T7 feedback loop:**

1. Owner adds tester email to `external_access_allowlist` in Remote Config.
2. Owner performs gate device-pass:
   - Allowlisted account: can access the app ✓
   - Non-allowlisted / non-domain account: blocked ✓
   - Domain account: can access ✓
3. Tester receives onboarding note (see below).
4. Tester uses Record + Create flows; submits feedback via agreed channel (not in-app submit — T7 required).
5. Owner reviews feedback; iterates.

**Onboarding note template (send to each tester):**

> You're accessing a private beta of the Test / Inspect / Automate page on rand0m.ai.
> At this stage you can **record** test steps and **create** test plans — submit and CI execution are not yet wired.
> This is a dev preview: data shown is representative, not real-time. Please share feedback directly with [owner contact].
> Do not share the URL or your access with others.

**BETA-DISCLAIMER route (Fable ruling, session 37):** the tester-intro note above + data-layer governance satisfies legal-safeguards for the T5/T6 beta scope. The FULL per-element disclosure audit (every on-screen label) remains the HARD GATE for public (non-allowlisted) launch.

---

## Pre-T7 Feedback Loop Summary

- **In scope now (T5/T6):** Record, Create, View, Export — client-only, no write path.
- **Blocked on T7:** Push to `/123`, Jira, CI trigger, test execution + result sync.
- **T7 requirement:** owner provisions GitHub App or personal access token scoped to `/123`; token stored as Firebase Function environment secret (never in client bundle); callable proxy handles write on behalf of tester identity.
- **T8 requirement:** live result sync (Firebase real-time or polling callable); separate phase after T7.

---

## References

- EARTH-ROADMAP.md — Beta path, Launch Checklist (T7 row), Test workstream
- [`READMORE/architecture/earth/`](../../READMORE/architecture/earth/) — Earth spec files
- CODEX.md → Provider Rules (Firebase callable proxy requirement for OAuth)
- CODEX.md → 123 Rules (`github-qabot` + `eng1neer` identity for generated-test writes)
