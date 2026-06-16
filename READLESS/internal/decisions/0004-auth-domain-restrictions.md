# ADR 0004 — Auth Domain Restrictions

**Date:** 2026-06-16 (session 40)
**Status:** Superseded — see below
**Deciders:** Owner + Fable

---

## Context

Originally `rand0m.ai` was restricted to `@rand0m.ai` domain accounts only (private-while-in-development). The `external_access_allowlist` Remote Config gate was added in C15 to allow non-domain beta testers without changing the domain-only default.

## Decision — PUBLIC = SIGN-IN REQUIRED (any Google account)

For public launch, authentication is relaxed from **domain-only** to **sign-in required (any verified Google account)**. The `@rand0m.ai`-only restriction is lifted at the point of public site-flip.

**What changes at public-flip:**
- Firebase Auth: Google sign-in enabled for any account (not just `@rand0m.ai`).
- `external_access_allowlist` RC gate: no longer the gating mechanism for public users; remains in place for privileged beta/tester flows (e.g. early callable access, Pro tier seat assignment).
- Callables: must honour the new entitlement model (free vs Pro/org) rather than domain-only guard. The callable domain-only guard is **removed** at public-flip and replaced by entitlement tier checks.
- `Access ≠ Owner` constraint remains permanently: domain accounts are not automatically owners.

**What does NOT change:**
- Owner-gated operations (deploy, RC writes, function deploy) remain owner-only.
- `githubProxy` callable remains `external_access_allowlist`-only (no anonymous submit to `/123`).
- The P0 callable gate mismatch fix (callables must honour allowlist check) is prerequisite — must land before site-flip.

## Superseded stance

Prior stance: `@rand0m.ai`-only = private. This was correct for the development phase and is superseded by the public-launch ruling above. The `external_access_allowlist` beta gate remains useful post-launch for privileged access tiers; it is not retired.

## Consequences

- Security: broader attack surface at sign-in layer. Mitigated by: App Check (monitoring → enforce-flip post-P3), cost/abuse backstop (durable Firestore counters + RC kill-switch), BYOK entitlement tier, reCAPTCHA build wiring.
- Entitlement: free-tier users get full read access + limited AI quota; Pro/org users get submit + higher limits. See `test-public-monetization-spec.md`.
- P0 gate mismatch must be fixed before callable features are accessible to public users. Until fixed: public users hit 403 on callable-backed features (same as allowlisted non-domain beta testers today).
