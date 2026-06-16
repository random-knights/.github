# Public Launch Readiness — Security + Cost Audit & Go/No-Go Checklist

**Date:** 2026-06-16 (session 43 — updated)
**Status:** P3+8-layer+capstone merged; `origin/main` = `fe44868`; wf90 deploy + device-pass PENDING owner confirm
**Owner:** Fable (go/no-go gate); Owner (device-pass + site-flip); Docs (this record)

---

## P3 Bundle — Security & Cost Items

All items below were delivered in the P3 public-launch sprint. SHA `8022265` is the main tip after merge; `1650a82` (release `27580329138`) is the last confirmed deployed hosting SHA (pre-P3). P3 hosting deployment = PENDING owner wf90 confirmation.

| Item | SHA | Description | Security/Cost relevance |
| --- | --- | --- | --- |
| Allowlist gate | `203c768` | `external_access_allowlist` RC gating hardened for public-launch transition | Access control |
| Cost/abuse backstop | `047cca8` | Durable Firestore counters per-user; RC kill-switch; SSRF 169.254.x.x block; App Check MONITORING mode | Cost exposure; SSRF; DDoS |
| BYOK | `5baba7b` | Bring-your-own-key proxy routing; Hive storage (unencrypted, local); keySource telemetry | Cost attribution; key hygiene |
| Geo-validity Phase 0+1 | (in `8022265`) | Mask asset bundled; ocean-only enforcement for ocean layer | Data integrity |
| Disclosure Safeguards | (in `8022265`) | AIEDS labels + representative-data + modeled-estimate indicators | Legal/compliance |
| Test entitlement TP-1..TP-4 | (in `8022265`) | Submit = Pro/org gate; TP-1..TP-3 free | Monetisation; access control |
| AIEDS whitepaper | (READMORE) | Open standard published | Legal/attribution |
| reCAPTCHA build wiring | (in `8022265`) | reCAPTCHA v3 site key wired into build; `RECAPTCHA_V3_SITE_KEY` Actions var required | Bot/abuse |

⚠ **Generated-registrant nit in `047cca8`:** a generated plugin-registrant file was committed in the backstop PR. This is a hygiene nit (does not affect behaviour or security) but should be cleaned up by Fixes post-deploy. Tracked in Open Branches cleanup.

---

## Post-P3 Merged Items (on `origin/main`; deploy PENDING owner wf90)

Items merged after P3 bundle (`8022265`) that will ride the next wf90 hosting deploy:

| Item | SHA | Description |
| --- | --- | --- |
| 8-layer slices 1–7 | `90eb743`→`299e9e6` | All 8 Earth layers live (wind, ocean, air quality, forest, density, wildfire, biodiversity, SST) |
| Health Score function | `58feb9f` | `earthHealthScoreRefresh` — live server aggregation (earth.healthscore.v1) |
| Health Score UI capstone | `855e6e0` | Reactive recompute on filter; replaces static 78; AIEDS as separate chip |
| SST anomaly update | `353a478` | `earthSstRefresh` now emits anomaly vs 1991–2020 baseline |
| Mini-player | `4333563` + `731b47a` | Persistent mini-player (Relax+Vibe) + single-instance handoff (full↔mini↔PiP) |
| Filter panel fix | `4c4cd80` | earth+ filter panel fits without scroll; no globe-zoom hijack |
| LayerLegend widget | `d182d7a` | Reusable color-key widget + palette contract |
| Version banner | `8df7ba2` | In-app version-update banner (polls version.json + SW skip-waiting refresh) |
| Inspect security fix | `86ae546` | Redact secrets + gate Inspect to owner/org only (pre-public safety gate) |
| Monorepo cleanup P1 | `fe44868` | Drop 7 unused textures + de-four-app README; **⚠ two rescissions pending** (see `monorepo-cleanup-audit.md`) |

⚠ **Rescissions pending (non-blocking for deploy, but Earth agent must reverse before launch):**
- `technologia.mp3` was deleted — must be restored + wired (launch/alert sound)
- `futureLayerIds` flights/ships were removed from test — must be re-added as Pro layers

---

## DEFERRED / Fast-follow Gates (NOT in P3)

| Item | Gate event | Who owns |
| --- | --- | --- |
| **App Check enforce-flip** | SECOND functions deploy (after monitoring period; post-P3) | Owner (RC flip + functions redeploy) |
| **Pro/managed server tier-read** | SECOND functions deploy (same event as enforce-flip) | Earth agent + owner |
| **Public site-flip** | FINAL gate — after device-pass + Fable legal sign-off | Owner (DNS/Firebase Hosting config) |
| **Durable burst-limit** | Post-launch (RC-configurable; separate Earth slice) | Earth agent |
| **Inspect → DB persistence** | Post-launch | New spec required |
| **Save-to-own-repo (T8)** | Post-launch | New spec required |
| **Jira integration** | Post-launch (CUT from P3) | New spec required |

---

## Security Audit Summary

### SSRF mitigation (`047cca8`)
Cloud Function outbound requests to RFC-1918 / link-local addresses (`169.254.x.x`, `10.x.x.x`, `172.16-31.x.x`, `192.168.x.x`) are blocked. This prevents a class of SSRF attacks where a user-supplied URL or key could cause a function to hit the GCP metadata server.

### App Check (monitoring → enforce)
App Check is in MONITORING mode post-P3. This captures attestation failures without blocking traffic — allowing the monitoring period to baseline legitimate traffic before the enforce-flip. Enforce-flip is the SECOND functions deploy (post-monitoring; deferred).

### reCAPTCHA v3 build wiring
`RECAPTCHA_V3_SITE_KEY` is wired into the Flutter build via GitHub Actions secret. The key must be set in the `random-knights/xyz` repo Actions secrets before the P3 wf90 run. Owner owns this Actions var.

### Cost/abuse backstop
Durable Firestore counters record per-user call volume. The RC kill-switch (`ai_killswitch` or equivalent key) can zero-out AI traffic without a deploy. Together these are the runtime cost backstop. Burst-limit (hard per-user cap with exponential backoff) is post-launch.

### BYOK key hygiene
Key never in bundle; never in Firestore; never in function logs. Callable forwards key to AI provider in-memory only. Local Hive storage is unencrypted (v1 accepted risk; encrypted Hive fast-follow). See `0006-byok.md`.

---

## Go / No-Go Checklist (public site-flip gate)

### Must be ✅ before site-flip

- [ ] wf90 hosting deploy confirmed at `fe44868` tip (byte-hash delivery ✓) — includes all P3 + 8-layer + capstone items
- [ ] Functions deploy confirmed (owner manual `firebase deploy --only functions:...` after `git pull`) — includes `earthHealthScoreRefresh`, `earthSstRefresh` anomaly update, scheduled refreshers
- [ ] `RECAPTCHA_V3_SITE_KEY` Actions var set (owner)
- [ ] `public-access-flip` (`05d00d2`) — deploy at public-flip gate (currently HELD as branch)
- [ ] Inspect security fix (`86ae546`) confirmed live — secrets redacted, owner/org gate active
- [ ] Owner device-pass: sign-in works for non-domain Google account ✓
- [ ] Owner device-pass: Disclosure Safeguards visible (AIEDS label, representative-data label, modeled-estimate indicator) ✓
- [ ] Owner device-pass: Health Score live (not static 78), AIEDS chip separate ✓
- [ ] Owner device-pass: free user cannot access TP-4 submit ✓
- [ ] Owner device-pass: Pro user can access TP-4 submit ✓
- [ ] App Check MONITORING mode confirmed active (not blocking yet — monitoring only) ✓
- [ ] SSRF block confirmed via function log review (no 169.254 requests hitting metadata) ✓
- [ ] Fable legal sign-off (Disclosure Safeguards device-pass reviewed + legal gate cleared) ✓
- [ ] `0004-auth-domain-restrictions.md` ruling applied: public auth = any Google sign-in ✓
- [ ] callable gate mismatch P0 fixed (callables honour entitlement, not domain-only) ✓
- [ ] `technologia.mp3` restored + wired (launch/alert sound) before site-flip ✓
- [ ] `futureLayerIds` flights/ships re-added as Pro layers (Earth agent, `monorepo-cleanup-audit.md` Rescission 2) ✓

### Should be ✅ before site-flip (non-blocking but flag if missing)

- [ ] Generated-registrant nit in `047cca8` cleaned up (Fixes hygiene)
- [ ] Merged P3 branches deleted (geo-mask-asset, geo-enforce, disclosure-safeguards, public-ui-polish, aieds-whitepaper, test-public-entitlement, byok, backstop)
- [ ] `rand0m-dvmerge` + `rand0m-mainmerge` orphan dirs removed (owner manual rm)
- [ ] `earth/anim-bugfix` landed (ocean animation + view-switch trails)

### Deferred (explicitly NOT blocking site-flip)

- App Check enforce-flip — post-monitoring (second deploy)
- Durable burst-limit — post-launch
- Encrypted BYOK Hive storage — fast-follow
- Run-in-app (T8), Jira, Save-to-own-repo — post-launch

---

## Post-P3 sequence

```
P3 wf90 confirmed ✓
  → owner functions deploy (MONITORING mode; RECAPTCHA key set)
    → monitoring period (App Check baseline; cost backstop active)
      → enforce-flip + Pro/managed tier-read (SECOND functions deploy)
        → device-pass + Fable sign-off
          → PUBLIC SITE-FLIP
```
