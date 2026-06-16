# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-16 (session 42 — Health Score ratified; Data Explorer v1 POST-LAUNCH; mini-player 4333563; §22 worktree-lane isolation binding)

---

## Agent Roster

_Post-R7 roster active. Systems and Connect retired (wind-down complete, scopes absorbed by Earth)._

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | `apps/rand0m` (integration only — §22) | main=`5ce9513`; hosting=`1650a82` (pre-P3) | Earth features, layers, governance; catalog owner; integrator/deploy; absorbs Systems+Connect scopes |
| Design | `deve10per` / dev-kitt | `worktrees\rand0m-design` | POST-LAUNCH; no active D-slice | IA v2 D7+D8; Cesium FE globe shell; presentation/layout only |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | CI/hygiene; no Earth-page edits | CI, harness, QA; token-economy triage (§21d) |
| Docs | `eng1neer` / qa-kitt | qa-kitt clone | `readless-readmore-reorg` | READLESS, CODEX, EARTH-ROADMAP |
| Fable | — | read-only | — | PM/gates; spec ratification; checkpoint bundles (§19) |
| **Test** | `deve10per` / dev-kitt | `worktrees\rand0m-test` | AUDIT-FIRST; no build until spec ratified | Test/Inspect/Automate page — `lib/pages/agents/secret*`, `services/utility/test_*`; file-disjoint from Earth |
| **CODEX Grunt Pool** | OpenAI (per CODEX.md) | isolated task scope | task-by-task (Codex T3 fixtures banked) | Low-risk mechanical tasks only: named files + acceptance command + do-not-touch list. **Never:** guards, gates, catalog files, governance logic. |

~~Systems~~ — **RETIRED** (R7). Timer-leak + data-vertical scope absorbed by Earth. `worktrees\rand0m-systems` torn down.
~~Connect~~ — **RETIRED** (R7). S5 + Entities/Connect source scope absorbed by Earth. `worktrees\rand0m-connect` torn down. Architectural Earth/Connect code boundary unchanged.

Agents share `origin/main` on xyz (`random-knights/xyz`). Pull before push. One owner per surface at a time. **§22 (binding):** `apps/rand0m` = Earth/main integration only; every other lane works in `worktrees/<lane>`; never branch-swap in `apps/rand0m` or another lane's worktree.

**Coordination standards:** [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) — callout format, verify-from-git, worktree isolation, catalog non-touch, path-ownership matrix, HANDOFF protocol, token-economy (§21).

---

## Earth Roadmap Plan (C7–C12)

_**End goal: animated planetary flow globe (nullschool-class) + governed AI assistant.**_

_Position: **8-layer program in flight; capstone approaching.** `origin/main` (xyz) = `5ce9513` (slice 5 — forest + human-density scalar, count 3→5); last confirmed hosting deploy = `1650a82` (release `27580329138`, pre-P3); hosting deploy PENDING owner wf90. 8-layer slices 1–5 merged; mini-player `4333563` merged. Health Score methodology ratified (earth.healthscore.v1). Data Explorer v1 POST-LAUNCH scope ratified. §22 worktree-lane isolation binding. Functions deploy bundle deploy-ready (SST/density/forest/OSCAR refreshers + enforce-flip `6fd5b60` STAGED for 2nd deploy) — owner deploys at 8-layer checkpoint. Public site-flip = FINAL gate (Fable + owner)._

| Cycle | Release | Work | Gate |
| --- | --- | --- | --- |
| **C7** | **R7** ✓ **DEPLOYED** (`c150405`, release `27423312204`) | D2–D5 + scientist RESOLVE-OR-EXPLAIN + call-site + S5/S3 + uniformity + timer-leak + ISO table (Codex T1); Systems+Connect RETIRED | CI green; HTTP smoke ✓; owner visual review #1 ✓ |
| **C8** | **R8** ✓ **DEPLOYED** (`e1e49c7`, release `27432166050`) | D7 nullschool shell + D8 chart vocabulary + BE chart-series + scroll-helper + CustomPainter globe in new shell → **UI consolidation release**. Owner review #2 verdict PENDING (post-deploy). | D7/D8/chart-series gate-passed; CI green; HTTP smoke ✓ |
| **C9** | — | Cesium slice 1 `760c51a` ✓ (governance core); Cesium slice 2 ✓ (browser bridge; token env-injection; `KNIGHTS_CESIUM_ION_API_KEY` fallback). Note: `web/cesium/` had VENDOR.md only through R9 — bundle shipped at R10 vendor step. | R8 deployed ✓ |
| **C10** | — | Cesium slice 3 `b826abb` ✓ (flow-field wiring); D6 `8c6857d` ✓; attribution corrections `79d9295` ✓; density slipped (salvage in C11) | C9 complete ✓ |
| **C10/R9** | **R9** ✓ **DEPLOYED** (`d5ba6c1`, release `27436691750`) | D6 + attribution + Cesium token infrastructure + flow-field wiring deployed. Note: CesiumJS bundle absent until R10; R9 rendered CustomPainter fallback. Attribution + D6 verdicts live. | All C10 gate-passes ✓; CI green ✓; owner deployed ✓ |
| **C11** | — | Density `c7c68b9` ✓; remediation `9abbc16` ✓ (3 source registrations + suppression-guard); motion cues `e38cb9e` ✓; globe-context `c3c6d81` ✓; CesiumJS vendor step + P1–P4 nullschool-mode chrome (black stage, rotate toggle, credits footer, minimal context) | R9 deployed ✓ |
| **C12/R10** | **R10** ✓ **DEPLOYED** (`bde2a28`) | CesiumJS vendored + activated; P1–P4 chrome; density + countries + all data verticals convergence. ★ **NULLSCHOOL MILESTONE — Cesium V2.16 live.** | Vendor step ✓; CI green ✓; byte-hash delivery ✓ |
| **C13** | — | Deploy-integrity fix `086226e` ✓; Outline Globe `37aea29` ✓ (Natural Earth coastline/admin-0; satellite terrain removed; wind dimming fixed); Wind Phase 1a `f56d1f2` ✓ (animated global wind; static CC0 representative climatology; gate-lift ratified) | Byte-hash delivery ✓ each; owner device pass ✓ (wind gate-lift) |
| **C14** | — | Wind Phase 1b ✓ (live NOAA-GFS wind + rotation-trail fix); Firebase functions deploy = owner one-time manual | Phase 1b live on device ✓ (owner-verified) |
| **C15** | **batched release** ✓ **DEPLOYED** (`f9697be`, release `27571417246` ✓ success) | External-access RC gate; taco icon `22d699d`; FIRMS wildfire snapshot + taco `769bc67`; donation-reconcile; data-refresh frontend `9f174a2`; all three refresh functions deployed (earthWindGfsRefresh + earthAirQualityRefresh + earthWildfireRefresh); owner device-pass ✓ | Byte-hash delivery ✓; allowlist live; device-pass ✓ |
| **C16** | ✓ **DEPLOYED** (`b7f9849`) | P0 beta-hardening (URL tools hidden + tester intro); Phase A (URL tools enabled); Phase B/T7 (githubProxy callable + GitHub App submit to `/123`); Data-View-v2 distillation (rebase-before-merge applied) | All LIVE; byte-hash delivery ✓ |
| **C17 / P3** | ⏳ **PENDING owner deploy** (main=`8022265`; hosting=`1650a82` pre-P3) | Public-launch sprint: allowlist hardening (`203c768`) + cost/abuse backstop (`047cca8`: Firestore counters, RC kill-switch, SSRF 169.254 fix, App Check MONITORING) + BYOK (`5baba7b`: key-via-proxy, Hive-local, keySource telemetry) + geo-validity Phase 0+1 (mask asset + ocean-only enforcement) + Disclosure Safeguards Standard + Test entitlement TP-1..TP-4 (submit=Pro/org) + AIEDS whitepaper + reCAPTCHA build wiring. `RECAPTCHA_V3_SITE_KEY` Actions var required (owner). | wf90 confirm PENDING; functions deploy PENDING; P3 SHA to be recorded after Fable-verified confirm |

**Visual smoke suspension:** R5+R6 checklist items suspended until R7 consolidated visual review. Post-R7: ≤5 items per release window, only when UI changed (§21b).

---

## Deploy Checkpoint Status

| Checkpoint | State | CI | Deployed |
| --- | --- | --- | --- |
| Earth UI Cleanup + Live Connections | merged to main | green | **✓ live** |
| Air-Quality (18th live layer) + Ocean loader | merged to main | green | **✓ live** |
| Earth Fast workflow test rewrite | merged to main | green | **✓ live** |
| @scient1st real Earth-context AI responses | merged to main | green (+374, 0 failures) | **✓ live** |
| scientist-session-continuity (`6d2c6cb`) | merged to main | green | **✓ live** |
| scientist-scenario-explain (`1792660`) | merged to main | green | **✓ live** |
| Earth-Systems ocean live + registration | merged to main | green | **✓ live** |
| Glaciers integration + registration (`36d2901`, `57869fc`) | merged to main | green | **✓ live** |
| Glaciers data-view wiring (`6316893`) | merged to main | green | **✓ live** |
| Connect slices 1–3 (`ed7f3f4`) | merged to main | green | **✓ live** |
| Forest pipeline + 19th layer (`glad-hansen-forest-summary`) | merged to main | green | **✓ live** |
| `chore/test-deterministic-cursor` | merged to main | green | **✓ live** |
| Connect slice 4 | merged to main | green | **✓ live** |
| `connect-card-overflow-fix` (RenderFlex 0.118px — connect_source_card.dart:88) | merged to main | green | **✓ live** |
| Protected-areas + WDPA registration (`wdpa-protected-area-summary`) | merged to main | green | **✓ live** |
| Connect slice 5 | merged to main | green | **✓ live** |
| `validate-earth-fast` root tooling fix (`53a456e` — `--no-wasm-dry-run`) | merged to main | green | **✓ live** |
| Biodiversity layer (`e9f9e47` — GBIF, fail-closed suppression guard, zero coordinate fields) | merged to main | green | **✓ live** ⚠ owner visual pending |
| F1.0 favicon | merged to main | green | **✓ live** ⚠ owner visual pending |
| Entities E1 slices 1–2 | merged to main | green | **✓ live** ⚠ owner visual pending |
| VCM slice 2 + `berkeley-vcm-registry-summary` registration | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Entities E1 slice 3 (resolver contract) + ripples | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Countries S1 (`f82c595` — additive-only, RegionIds guard) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Countries S2 (`58361b4` — EarthRegionResolver; stale schematic fix; E1 gap closed) | merged to main | green | **✓ live** (R6 `ca91443`) — resolver unwired until Countries S3/S5 |
| Design D1 (`3cd4255` — `earth/design-d1-globe-primary`; pill BOTTOM-LEFT; gauge TOP-RIGHT; dark-canvas) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Connect flips + E1 S4 (`af62d6f` — all render tests ENABLED; zero skips; E1 S4 minimal) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Design D2–D5 stack (D2 `0381603`, D3 `fdb5b7f`, D4, D5) | merged to main | green | **✓ live** (R7 `c150405`) |
| scientist-entity-resolution + call-site (`3d04b23` + CI fix) | merged to main | green | **✓ live** (R7 `c150405`) |
| Countries S3 (`5897b5d` — VCM coord→country; lat/long→ISO at ingest) | merged to main | green | **✓ live** (R7 `c150405`) |
| Connect S5 (`4ec0d24` — write-path validation; E1 integrity gap) | merged to main | green | **✓ live** (R7 `c150405`) |
| Timer-leak fix | merged to main | green | **✓ live** (R7 `c150405`) |
| Uniformity fixes | merged to main | green | **✓ live** (R7 `c150405`) |
| Full ISO country table (Codex T1 — 249 countries) | merged to main | green | **✓ live** (R7 `c150405`) |
| D7 Earth View nullschool mode | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| BE chart-series provisions (`earth/chart-series-provisioning`) | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| D8 Data View chart vocabulary (`earth/design-d8-chart-vocabulary`) | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| Scroll-helper + CustomPainter globe shell | merged to main | green | **✓ live** (R8 `e1e49c7`) |
| Cesium slice 2 — browser bridge; `VENDOR.md`; env-injected token; `KNIGHTS` fallback. ⚠ `web/cesium/` bundle absent — CustomPainter fallback active | gate-passed (C9); merged to main | green | **✓ live** (R8 or post-R8; SHA TBC) |
| Cesium token infrastructure + flow-field wiring (`b826abb`); `RANDOM_CESIUM_ION_API_KEY` env-injected. ⚠ Bundle absent — runtime = CustomPainter fallback at R9 | merged to main | green | **✓ live** (R9 `d5ba6c1`) |
| Attribution corrections — GBIF/Berkeley/WGMS/Hansen/WDPA/Open-Meteo/FIRMS (`79d9295`) | merged to main | green | **✓ live** (R9 `d5ba6c1`) |
| D6 verdicts pass — schematic deleted; preview pair quarantined (T5 evidence); motion suite RETAINED (`8c6857d`) | merged to main | green | **✓ live** (R9 `d5ba6c1`) |
| **Production Release `27436691750`** (`d5ba6c1`) — owner. Attribution + D6 verdicts + Cesium token infrastructure live. ~~★ NULLSCHOOL MILESTONE~~ — CORRECTED: CesiumJS bundle absent; builds = CustomPainter fallback. `origin/main` = `d5ba6c1` (Fable-verified). | — | — | **✓ live** |
| Tier 2 density vertical (`c7c68b9`) | merged to main | green | **✓ live** (R10 `bde2a28`) |
| Density remediation + 3 source registrations + suppression-guard governance entries (`9abbc16`) | merged to main | green | **✓ live** (R10 `bde2a28`) |
| Tier 1 motion cues (`e38cb9e`) | merged to main | green | **✓ live** (R10 `bde2a28`) |
| @scient1st globe-context (`c3c6d81`) | merged to main | green | **✓ live** (R10 `bde2a28`) |
| ~~VENDOR BLOCKER~~ **RESOLVED** — CesiumJS vendored + placed in `web/cesium/`; pinned in `VENDOR.md` | merged to main | green | **✓ live** (R10 `bde2a28`) |
| P1–P4 nullschool-mode chrome (black stage, rotate toggle, credits footer, minimal context) | merged to main | green | **✓ live** (R10 `bde2a28`) |
| **Production Release R10** (`bde2a28`) — P4 release dispatched; run ID pending. CesiumJS V2.16 vendored + activated; nullschool chrome; density + countries + all data verticals. ★ NULLSCHOOL MILESTONE — **first true Cesium boot live on `rand0m.ai`**. | — | — | **✓ live** (run ID TBD) |
| **Deploy-integrity fix** (`086226e`) — root cause: side-channel `release-sha.txt` check proved file-freshness, not recompile; `flutter build web` reused stale build state. Fix: `flutter clean` + per-run-unique artifact + live `main.dart.js` byte-hash assertion. ⚠ **CORRECTED (session 35):** session 34 stated "Last-Modified + markers" as the standard — WRONG. Standard is live-bundle **byte-hash** (workflow self-verifies). `Last-Modified` is unreliable; `Global Health Score` marker is empirically absent even in valid builds. | merged to main | green | **✓ live** |
| **Outline Globe** (`37aea29`) — Natural Earth public-domain coastline + admin-0 base geometry on Cesium globe; satellite terrain removed; wind-layer dimming fixed | merged to main | green | **✓ live** |
| **Wind Phase 1a** (`f56d1f2`) — animated global wind field on Cesium; renderer = `earth_flow_field.js` + `EarthWindGrid` contract + `syncFlowField`; static CC0 representative climatology; gate-lift ratified (owner device pass reviewed+live) | merged to main | green | **✓ live** |
| **Wind Phase 1b** — live NOAA-GFS wind data + rotation-trail fix; Firebase function deployed via owner one-time manual `firebase deploy --only functions:<name>` (workflow 90 stays HOSTING-ONLY — no CI functions deploy) | merged to main | green | **✓ live** |
| **`f9c1f33`** — filter-ux-v2 + subsequent passes; live prod tip | merged to main | green | **✓ live** |
| **Phase A — URL tools enabled** — domain-only URL tools surfaced for allowlisted testers; tester intro copy live | merged to main | green | **✓ live** (`b7f9849`) |
| **Phase B/T7 — githubProxy submit** — GitHub App callable (`GITHUB_APP_ID`/`INSTALLATION_ID`/`PRIVATE_KEY` Path B); submit to `/123` wired end-to-end | merged to main | green | **✓ live** (`b7f9849`) |
| **Data-View-v2 distillation** — rebase-before-merge applied (not auto-merge); Data View Scenario/Regional distillation live | merged to main | green | **✓ live** (`b7f9849`) |
| ⚠ **Open bug: ocean animation** — animation issue on ocean layer; tracked → `earth/anim-bugfix` | — | — | bug open |
| ⚠ **Open bug: view-switch trails** — ghost trails on Earth↔Data view switch; tracked → `earth/anim-bugfix` | — | — | bug open |
| **Hosting pre-P3** (`1650a82`, release `27580329138`) | deployed | green | **✓ live** (last confirmed hosting; pre-P3 bundle) |
| **P3 bundle — allowlist hardening** (`203c768`) | merged to main (`8022265`) | — | ⏳ deploy PENDING owner wf90 |
| **P3 bundle — cost/abuse backstop** (`047cca8`) | merged to main (`8022265`) | — | ⏳ deploy PENDING; ⚠ generated-registrant nit (Fixes hygiene post-deploy) |
| **P3 bundle — BYOK** (`5baba7b`) | merged to main (`8022265`) | — | ⏳ deploy PENDING |
| **P3 bundle — geo-validity Phase 0+1** (mask asset + ocean-only) | merged to main (`8022265`) | — | ⏳ deploy PENDING |
| **P3 bundle — Disclosure Safeguards Standard** | merged to main (`8022265`) | — | ⏳ deploy PENDING; owner device-pass required |
| **P3 bundle — Test entitlement TP-1..TP-4** (submit=Pro/org) | merged to main (`8022265`) | — | ⏳ deploy PENDING |
| **P3 bundle — reCAPTCHA build wiring** | merged to main (`8022265`) | — | ⏳ deploy PENDING; `RECAPTCHA_V3_SITE_KEY` Actions var required (owner) |
| **8-Layer slice 1** (`90eb743`) | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **8-Layer slice 2** (`451f7c2`) | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **8-Layer slice 3** (`fe87c3c`) | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **8-Layer slice 4** (`fbb4dd6`) — OSCAR refresher (`1ed1b6b`) + scalar refreshers (`e13c1e7`) merged; functions bundle deploy-ready | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **8-Layer slice 5** (`5ce9513`) — forest + human-density scalar; layer count 3→5 | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **App Check enforce-flip staged** (`6fd5b60`) — DEFERRED to 2nd functions deploy (post-monitoring) | merged to main | — | ⏳ STAGED — 2nd deploy only |
| **Mini-player** (`4333563`) — shell-above-Navigator + PiP/MediaSession + handoff follow-up | merged to main | green | ⏳ deploy PENDING owner wf90 |
| **Health Score capstone** — earth.healthscore.v1; hybrid server-fn + client-recompute; 5-signal roster; AIEDS separate | spec RATIFIED; implementation pending | — | ⏳ POST-LAUNCH or batched with 8-layer deploy |

`origin/main` (xyz) is at `5ce9513` (8-layer slice 5 — Fixes-verified). Hosting = `1650a82` (pre-P3; last confirmed deployed).

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory.

⚠ **Visual suspension LIFTED at R7.** Post-R7 reviews bounded to ≤5 items per window (§21b).

~~⛔ HARD BLOCKER~~ **RESOLVED (session 32):** `RANDOM_CESIUM_ION_API_KEY` set in root `.env` and as GitHub Actions secret.

~~⛔ VENDOR BLOCKER~~ **RESOLVED:** CesiumJS bundled in `web/cesium/`; pinned in `VENDOR.md`. Fable HOLD lifted.

⚠ **Gate lesson (session 33, binding):** "vendored" = **asset presence**, not docs. A `VENDOR.md` without the vendored assets is not a vendor step.

⚠ **FINAL visual review PENDING (8 items):** single combined review post-R10-deploy — R8 viewport/chart + R9 attribution/D6 + R10 nullschool/chrome. Owner to perform; verdict not yet recorded.

⚠ **Spec path (binding):** Earth spec files live at `READMORE/architecture/earth/` (not `READLESS/internal/architecture/`). Use `../READMORE/architecture/earth/<file>` in all roadmap links. Agent commands: `Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md` — do not read READMORE spec files unless the agent command lists them explicitly.

⚠ **Verify-delivery standard (session 34, CORRECTED session 35, binding):** after every production release, delivery is verified by the workflow's **live-bundle byte-hash assertion** — the workflow self-fails on a stale bundle. NEVER use `Last-Modified` (unreliable) or UI-string greps (`Global Health Score` is empirically absent even in valid builds). Root cause of the stale-deploy bug: side-channel `release-sha.txt` check + `flutter build web` reusing stale state; fixed at `086226e` (`flutter clean` + per-run artifact + byte-hash). A passing workflow 90 with byte-hash assertion is now a sufficient delivery gate.

⚠ **POST-LAUNCH serialization (session 34, binding):** PASS A → PASS B → PASS C are strictly serialized on a single lineage. **No parallel edits to Earth-page files.** Divergence = merge conflict + lost work. Each PASS must be gate-passed and merged before the next opens.

⚠ **Firebase functions deploy — manual owner action (binding):** workflow 90 is HOSTING-ONLY. Firebase callable + scheduled functions are deployed via manual `firebase deploy --only functions:<name>` by the owner (requires local git pull first — stale local checkout was root cause of prior missed deploy). Agents do NOT trigger function deploys via CI. Do not add functions to workflow 90.

✅ **Scheduled refresh functions — ALL DEPLOYED (session 37):**
- `earthWindGfsRefresh` — ✓ live NOAA-GFS wind refresh
- `earthAirQualityRefresh` — ✓ live (owner manual deploy confirmed)
- `earthWildfireRefresh` — ✓ live (owner manual deploy confirmed)
All three layers now serve live cached data.

⚠ **External-access gate (live):** `external_access_allowlist` RC key live + fail-closed. Domain OR allowlist; verified-only; Access ≠ Owner. Owner device-pass ✓ DONE (session 37). **Add-a-tester procedure:** (1) add email to `external_access_allowlist` in RC; (2) owner gate device-pass — allow allowlisted ✓ / block non-allowlisted ✓ / domain ✓; (3) tester all-clear. ⚠ **Security P0:** callables currently enforce domain-only — allowlisted non-domain testers will 403 on callable-backed features. Fix before any callable flows are included in beta scope. See [`READLESS/internal/architecture/test-page-beta-readiness.md`](internal/architecture/test-page-beta-readiness.md) Finding 2.

⚠ **Beta MVP = T5/T6 scope (Fable ruling, session 37):** trusted allowlisted testers; Record + Create flows only (client-side; no callable-backed features until callable gate mismatch is fixed). BETA-DISCLAIMER route (tester-intro note + data-layer governance) satisfies legal-safeguards for this allowlisted beta scope. **The FULL per-element disclosure audit remains the HARD GATE for public (non-allowlisted) launch.** Full beta-readiness checklist: [`READLESS/internal/architecture/test-page-beta-readiness.md`](internal/architecture/test-page-beta-readiness.md).

⚠ **CI economy — Actions metered (Team Org, binding):** batched-release standard now in effect. Deploy every few passes, not per-pass. Workflow 90 byte-hash is the delivery gate. Path-filters (01–07) and concurrency confirmed. Minimize unnecessary workflow triggers.

⚠ **Branch hygiene (binding, session 35–37):** delete branch + worktree post-merge. `git worktree remove --force` safe when only generated artifacts remain. Revert generated plugin-registrants before every commit. 87 merged branches bulk-deleted + worktrees pruned (session 37). Active worktrees: main + `rand0m-design-dv` only. 20 unmerged xyz branches kept (low-priority triage). `chore/idle-spin-test` is redundant/deletable. `rand0m-mainmerge` leftover directory needs manual `rm` (not a worktree). Standing rule: no merged branches linger.

⚠ **REBASE-BEFORE-MERGE — Earth-page branches (session 38, binding):** a clean textual `git merge` of two branches both editing `earth_tab.dart` (or any Earth-page file) is a **FALSE POSITIVE** — git sees no conflict but the logical result is wrong. **Standard:** any Earth-page branch whose merge-base predates a landed Earth-page change MUST be rebased onto the current tip, hand-resolved, and tested before merge. Never auto-merge Earth-page branches. Root cause: Data View distillation `c1f5844` was blocked by exactly this — textual merge would have silently regressed the filter-ux-v2 changes.

⚠ **One-owner-per-Earth-surface (session 35, binding):** serialize chrome / renderer / earth_tab edits — no parallel agents editing Earth-page files. Violating this = merge conflict + lost work. Codified alongside POST-LAUNCH serialization.

⚠ **Worktree cleanup (session 35, binding):** `git worktree remove --force` is safe post-merge when only generated artifacts remain on a merged branch. Revert generated plugin-registrants before every commit — the EPERM mkdir outage root cause was worktree sprawl + committed generated registrants causing path conflicts. ⚠ **Windows handle locks:** orphan dirs `rand0m-dvmerge` + `rand0m-mainmerge` cannot be removed with git commands due to Windows handle locks — requires manual `rm` after confirming no process holds them. `idle-spin` worktree also orphaned.

✅ **T7 GitHub App — LIVE (session 39):** `GITHUB_APP_ID`, `INSTALLATION_ID`, `PRIVATE_KEY` (Path B) wired into Firebase callable (`githubProxy`). Submit to `/123` end-to-end tested and deployed at `b7f9849`. Phase A (URL tools enabled) + Phase B (submit wired) both shipped.

✅ **URL-tools decision resolved (session 39):** owner chose Option 2 (do-it-all-first). Phase A (enable URL tools) + Phase B/T7 (githubProxy submit) shipped together at `b7f9849`.

⚠ **LEGAL-SAFEGUARDS AUDIT — pre-launch hard gate:** all on-screen disclosure labels (e.g. representative-wind "not current conditions") are DEFERRED to a pre-launch LEGAL-SAFEGUARDS AUDIT. This audit is a **HARD GATE** before any public/non-owner exposure. Governance-catalog obligations remain TRUE at the data layer; only UI disclosure surfacing is deferred (owner-gated dev site). No agent proceeds with disclosure UI implementation until this gate is opened by Fable + owner.

⚠ **P3 deploy PENDING (session 40):** P3 bundle merged to main (`8022265`). Hosting deploy (wf90) + functions deploy (owner manual) NOT YET CONFIRMED. Do not record P3 as "deployed" until owner confirms wf90 byte-hash success + manual functions deploy. `RECAPTCHA_V3_SITE_KEY` Actions var must be set before wf90 run (owner action).

⚠ **App Check MONITORING — enforce-flip DEFERRED:** App Check is in MONITORING mode after P3. Enforce-flip + Pro/managed server tier-read = the SECOND functions deploy event (post-monitoring period). No agent proceeds on enforce-flip without Fable + owner directive.

⚠ **Public site-flip = FINAL gate (Fable + owner):** site-flip requires: P3 deploy confirmed ✓ + P3 functions deployed ✓ + monitoring period ✓ + enforce-flip done ✓ + owner device-pass (all five Disclosure Safeguards + entitlement checks) ✓ + Fable legal sign-off ✓ + callable gate mismatch P0 fixed ✓. See [`internal/architecture/public-launch-readiness.md`](internal/architecture/public-launch-readiness.md) go/no-go checklist.

⚠ **BYOK (session 40, `5baba7b`):** key routed through callable proxy; client stores in Hive (unencrypted, local — v1 accepted risk). Encrypted Hive fast-follow post-launch. See [`internal/decisions/0006-byok.md`](../decisions/0006-byok.md).

⚠ **Test entitlement TP-1..TP-4 (session 40):** TP-1..TP-3 free; TP-4 submit = Pro/org gate. `githubProxy` allowlist guard replaced by entitlement check at public-flip. Jira = CUT; run-in-app = STRETCH post-launch. See [`internal/architecture/test-public-monetization-spec.md`](internal/architecture/test-public-monetization-spec.md).

⚠ **Geo-validity standard (session 40):** Phase 0 (mask asset bundled) + Phase 1 (ocean layer: OCEAN-ONLY enforcement) shipped in P3. Phase 2 (terrestrial layers) + Phase 3 (per-layer custom) = post-launch. See [`internal/architecture/layer-geo-validity-standard.md`](internal/architecture/layer-geo-validity-standard.md).

✅ **Disclosure Safeguards Standard (session 40):** LEGAL-SAFEGUARDS AUDIT gate resolved for P3 public-launch scope. All five safeguards shipped in P3 — AIEDS label + representative-data label + modeled-estimate indicator + no-greenwashing review + Data View attribution. Owner device-pass PENDING (part of public-flip go/no-go). See [`internal/architecture/disclosure-safeguards-standard.md`](internal/architecture/disclosure-safeguards-standard.md).

⚠ **Auth domain restrictions (session 40, ADR 0004):** public launch = SIGN-IN REQUIRED (any Google account); `@rand0m.ai`-only restriction lifted at site-flip. `githubProxy` stays allowlist-gated (beta) → entitlement-gated (public-flip). Callable domain-only guard removed at public-flip; replaced by entitlement checks. See [`internal/decisions/0004-auth-domain-restrictions.md`](../decisions/0004-auth-domain-restrictions.md).

Next track: **PUBLIC-LAUNCH SEQUENCE** (goal: 6/26) — P3 deploy confirm → monitoring → enforce-flip (second deploy) → device-pass → Fable sign-off → public site-flip. Parallel: **8-LAYER PROGRAM** — renderer contracts PENDING Fable ratification; L2 Ocean first after ratification + anim-bugfix.

⚠ **8-Layer Program (session 41):** two renderer contracts ratified-in-draft: (1) flow-field (`earth_flow_field.js` + `EarthWindGrid` + `syncFlowField`) for Wind/Ocean/Swell; (2) point/scalar (`earth_point_renderer.js` + `EarthPointGrid` + `syncPointLayer`) for Wildfires/AirQuality/future — contract-only, not yet implemented. Disjoint-lane model: each layer gets its own branch + file scope; shared-file changes lock the owner lane; REBASE-BEFORE-MERGE applies across lanes. L1 (Wind) complete. L2 (Ocean OSCAR) next. Fable ratification PENDING — **do not begin L2 implementation until Fable confirms.** See [`internal/architecture/earth-8-layer-renderer-contracts.md`](internal/architecture/earth-8-layer-renderer-contracts.md).

⚠ **Health Score ratified (session 42, earth.healthscore.v1):** 5-signal roster (air quality 0.30 count-based, SST anomaly 0.25 vs 1991–2020, wildfire 0.20, forest 0.15, human density 0.10 provisional). Hybrid server-fn + client-recompute. AIEDS separate, unblended, device — never numerically combined with Health Score. Governance: signal roster locked at v0.1; schema versioned. See [`../READMORE/architecture/earth/global-health-score-data-audit.md`](../READMORE/architecture/earth/global-health-score-data-audit.md).

⚠ **Data Explorer v1 — POST-LAUNCH (session 42):** read-only adapters; E1–E4 entity types; owner/org-gated; Recycler owner-only; secrets excluded at query layer. Off-Hive (Firestore) — binding: frozen typeId 7 conflict + `agent_order` collision + `kn1ghts_hive` app-local. Not in P3 bundle. See [`internal/architecture/data-explorer-v1-spec.md`](internal/architecture/data-explorer-v1-spec.md).

⚠ **§22 worktree-lane isolation (session 42, binding):** `apps/rand0m` = Earth agent + main integration ONLY. Every other lane works in its own `worktrees/<lane>`. No lane may branch-swap inside `apps/rand0m`. No lane pushes directly to `origin/main` from its lane worktree. Push→Earth-integrates→others-pull. Codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §22.

---

## Earth 8-Layer Program

_Renderer contracts govern all animated Earth layers. Spec: [`internal/architecture/earth-8-layer-renderer-contracts.md`](internal/architecture/earth-8-layer-renderer-contracts.md)._

> **FABLE CALLOUT:** Renderer contracts (§1 flow-field, §2 point/scalar, §3 data contracts, §4 disjoint-lane model) are drafted and ready for ratification. No 8-layer implementation begins until Fable confirms. See spec above.

### Renderer Contracts (summary)

| Contract | Entry points | Used by | Status |
| --- | --- | --- | --- |
| **Flow-field** | `earth_flow_field.js` · `EarthWindGrid` · `syncFlowField` | Wind, Ocean (OSCAR), Ocean swell | ✅ Live (Wind L1); contract ratification PENDING Fable |
| **Point / scalar** | `earth_point_renderer.js` · `EarthPointGrid` · `syncPointLayer` | Wildfires, Air quality (point), future point layers | 📋 Contract-only; not yet implemented; ratification PENDING Fable |

**Core rules:**
- No forks. All layers use one of the two contracts above — never a bespoke renderer.
- `syncFlowField(null)` / `syncPointLayer(null, layerId)` clear a layer slot on hide/switch.
- Geo-validity enforcement (`layer-geo-validity-standard.md`) applied before renderer — renderer receives only valid points.
- Flow-field: static-rep bundle first; live data overlays after callable resolves (instant visual on cold load).
- Point: callable caps at 10,000 points; zero-coordinate points stripped server-side.

### Layer Roster & Status

_Per-layer status updated only when git-verified (SHA from `git log origin/main` or Fable gate). Do not assert merged/deployed from session memory._

| # | Layer | Renderer | Branch / SHA | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| L1 | **Wind (GFS live)** | Flow-field | merged `b7f9849` | ✅ **Live** | NOAA-GFS; earthWindGfsRefresh deployed; static-rep Phase 1a → live Phase 1b |
| L2 | **Ocean currents (OSCAR)** | Flow-field | `earth/layer-ocean` (not opened) | ⏳ Queued — after Fable ratification + anim-bugfix | Mirrors GFS pattern; separate data contract; owner deploys function manually |
| L3 | **Wildfires (FIRMS)** | Point / discrete | `earth/layer-wildfires` (not opened) | ⏳ Queued | FIRMS snapshot already in catalog; point renderer required |
| L4 | **Air quality (point/heatmap)** | Point / heatmap | `earth/layer-airquality-point` (not opened) | ⏳ Queued | Open-Meteo source; upgrades current card-only surface to point renderer |
| L5 | **Ocean swell** | Flow-field | TBD | 🔮 Post-launch | Fable spec required |
| L6 | **Forest fire risk** | Point (TBD) | TBD | 🔮 Post-launch | Fable spec required |
| L7 | **Dust / aerosol** | Point / heatmap (TBD) | TBD | 🔮 Post-launch | Fable spec required |
| L8 | **TBD** | TBD | TBD | 🔮 Future | Owner directive + Fable spec required |

### Disjoint-Lane Model (summary)

Each layer = one branch (`earth/layer-<id>`) + its own file scope. No two open lanes touch the same Dart/JS files. Shared-file changes (e.g. `earth_tab.dart`, catalog index, renderer JS) lock to the owning lane; all other open lanes rebase after merge. REBASE-BEFORE-MERGE binding. Earth agent declares disjointness via `DOCS:` callout before opening a second lane in parallel.

---

## Now

_Active — in flight or ready for immediate action._

- **Owner (blocking — deploy):** Trigger wf90 (`RECAPTCHA_V3_SITE_KEY` Actions var required). Byte-hash delivery confirms P3+8-layer+mini-player bundle. Then: `firebase deploy --only functions:...` (after `git pull`) for OSCAR/SST/density/forest refreshers. Report wf90 success + functions deploy to Fable for SHA record.
- **Owner (blocking — orphan dirs):** `rm -rf rand0m-dvmerge rand0m-mainmerge` after confirming no process holds them.
- **Earth agent:** `earth/anim-bugfix` — fix ocean animation regression + view-switch ghost trails. Gate: CI green + owner device pass. (L2 Ocean does not open until anim-bugfix merged + Fable ratification received.)
- **Test agent:** P0 callable gate mismatch fix — callables must honour entitlement check (not domain-only). Required before callable features reach public users.
- **Fixes agent:** delete merged branches (P3 bundle + C16 deletables); clean generated-registrant nit in `047cca8`; VCM test failures (3 pre-existing) still open. ⚠ Do NOT delete `design-dataview-scenario` or `chore/idle-spin-test` — these are NOT merged (see Open Branches corrections below).
- **Fable agent:** ratify renderer contracts in [`internal/architecture/earth-8-layer-renderer-contracts.md`](internal/architecture/earth-8-layer-renderer-contracts.md) — §1 flow-field, §2 point/scalar, §3 data contracts, §4 disjoint-lane model. L2 implementation blocked until confirmed.
- **Fable agent:** confirm whether `6fd5b60` (App Check enforce-flip) rides the initial functions batch deploy or holds for the 2nd post-monitoring deploy.

---

## Next

_Queued — approved scope, not yet started. **Serialize Earth-page edits — one owner, one lineage.**_

> **Channels note:** iteration deploys to prod (owner-locked); workflow 80 staging available; prod is the review surface. Workflow 90 = HOSTING-ONLY; Firebase functions via owner manual deploy.

### Public-launch sequence (BLOCKING — serialized)

1. **Owner:** `RECAPTCHA_V3_SITE_KEY` Actions var set → wf90 run → byte-hash delivery confirmed
2. **Owner:** `firebase deploy --only functions:...` (after `git pull`) → confirm functions live
3. **Fable:** record P3 deployed SHA (git-verified from owner confirm)
4. **Monitoring period:** App Check MONITORING baselines legitimate traffic
5. **Earth + Owner:** enforce-flip (App Check) + Pro/managed server tier-read → SECOND functions deploy
6. **Owner device-pass:** all five Disclosure Safeguards ✓ + entitlement checks ✓ + sign-in for non-domain Google account ✓
7. **Test agent:** callable gate mismatch P0 fixed (entitlement check replaces domain-only guard)
8. **Fable:** legal sign-off (device-pass review)
9. **Owner:** PUBLIC SITE-FLIP

### Earth — in flight (serialized, one lineage)
- `earth/anim-bugfix`: fix ocean animation regression + view-switch ghost trails. Gate: CI green + owner device pass. (Can run in parallel with P3 deploy sequence above — file-disjoint.)
- `earth/filter-ux-v2`: outside-click-close + remove All-Layers + random built-layer default one-at-a-time + disable inactive layers (in flight — record SHA when merged).
- Gate each before next opens.

### 8-Layer Program (Earth — after Fable ratification; L2 after anim-bugfix)

See **Earth 8-Layer Program** section above for roster, renderer contracts, and lane model.

**L2 — Ocean (OSCAR) — next after ratification + anim-bugfix merged:**
- Flow-field renderer (reuses `earth_flow_field.js`); separate data contract only.
- Static-rep bundle first; live OSCAR callable overlays after resolve.
- Owner deploys Firebase function manually (wf90 HOSTING-ONLY).
- Branch: `earth/layer-ocean` (not opened — blocked on Fable ratification).
- Gate: CI green + owner device pass.

**L3 / L4 (Wildfires / Air quality) — after L2 merged:**
- Point renderer (`earth_point_renderer.js`) — contract-only, not yet implemented.
- Implementation blocked on: Fable ratification + point renderer initial slice.
- Lanes are file-disjoint from L2 and from each other — may run in parallel after L2 merges.

**L5–L8 — post-launch; Fable spec required before any branch opens.**

### Globe-chrome + Data View (Design — after each Earth pass gates)

**PASS A — Globe-lifecycle (Earth):**
`IndexedStack` keep-alive + Cesium viewer reuse + Addendum C state persistence. CustomPainter = invisible failure-only fallback (NOT deleted; owner may revisit). Fixes globe-disappear + painter-flash.

**PASS B — Globe-chrome (Design, after PASS A):**
Context block → bottom-right; top-right = score + `<region> Health Score` + `estimation` only; remove breakdown/Stable chips/Live-Asset-Research counts; remove broken rotate toggle; keep drag-hint top-left.

**PASS C — Data View redesign (Design, after PASS B):**
3 sections (Overview / Layers / Data Sources); 4-question content contract (What / Where-from / What-it-means / How-to-act); remove ALL dev telemetry + staged data; real data only. Spec: [`../READMORE/architecture/earth/data-view-redesign-spec.md`](../READMORE/architecture/earth/data-view-redesign-spec.md).

### Donation button (Earth + Design — fold into Ocean pass)
- Earth View: top-left button (fold into Ocean/Phase 2 pass).
- Design non-Earth surfaces: separate Design pass.
- Public READMORE README/CONTRIBUTING: single-sourced from the About buymeacoffee link.

### Test / Inspect / Automate page (Test agent — AUDIT FIRST)
Current state: CUSTOM CODE (no AI agent); record/collect/create/export-PLAN built; GitHub/Jira OAuth + live push + test execution NOT wired.

Fable architecture rulings (binding):
- Record-playback = **bookmarklet MVP** for users' external sites (same-origin policy blocks web-app cross-origin recorder) + same-origin overlay for org `/123` dogfooding.
- GitHub/Jira OAuth **MUST** go through Firebase callable proxies (no client secrets; account-scoped; CODEX Provider Rules).
- Generated-test writes to `/123` use `github-qabot` + `eng1neer` identity (CODEX 123 rules).
- Test execution = trigger user's GitHub Actions CI + report results in-app (not in-browser).

**Test agent is AUDIT/SPEC-first — do not build until Fable + owner ratify the spec.** Agent owns `lib/pages/agents/secret*` + `services/utility/test_*`; worktree `rand0m-test`; file-disjoint from Earth.

### Fixes (parallel, CI/hygiene only — no Earth-page edits)
- VCM test failures: 3 pre-existing; triage recorded. Resolve or descope.
- `chore/idle-spin-test`: unmerged test fix — merge when green.
- Build-size report: generate + record.
- Branch deletions: `earth/cesium-runtime-base`, `earth/source-attribution-corrections`, `earth/design-d6-dead-surface`, `earth/data-human-activity-density`, `codex/density-fixtures`.
- Codex T15: legacy graveyard sweep.

### Beta path (steady-state sequence)
1. Release lands + byte-hash delivery confirmed.
2. Owner deploys refresh functions (`firebase deploy --only functions:...` after `git pull`).
3. Owner gate device-pass (allowlist allow + block + domain — all three).
4. Fix P0 security findings before adding callable flows to beta scope (callable gate mismatch + repo-123 infra leak — see [`READLESS/internal/architecture/test-page-beta-readiness.md`](../READLESS/internal/architecture/test-page-beta-readiness.md)).
5. Testers log in at **T5/T6 scope** (record / create — client-only; no callable-backed features until P0s fixed).
6. **FULL submit beta needs T7**: owner GitHub App / PAT for `/123` write path (Firebase Function env secret; never client-side). Do not promise submit to testers before T7 provisioned.
7. **T8**: live test-result sync (Firebase real-time or polling callable) — separate phase after T7.

### Pre-launch gate
- **LEGAL-SAFEGUARDS AUDIT** (HARD GATE — see state notes above): all disclosure UI labels before any public/non-owner exposure. Owner + Fable to open.
- abc READMORE public-launch seeding (history-review or fresh-seed required; CODEX.md line update queued).
- Codex T14 (held for launch).

### Future track (Fable spec + owner directive required)
- OSCAR live ocean (Phase 2 layered-animation; reuses renderer).
- Free-tier provider models (AI cost reduction; separate spec).
- Country-outline boundaries + per-layer geo-animations (vector geometry pipeline).
- GFW near-real-time forest alerts (FIRMS pattern, new callable).
- Remote-config budget + kill switch.
- Data View Scenario/Regional cleanup (parked → Design, post-PASS C).

---

## Done

_Completed and on `main`._

- **Mini-player merged** (`4333563`) — shell-above-Navigator + PiP/MediaSession + handoff follow-up. On main; deploy PENDING owner wf90. ✓
- **Health Score methodology RATIFIED (earth.healthscore.v1)** — 5-signal roster (air quality 0.30 count-based, SST anomaly 0.25 vs 1991–2020, wildfire 0.20, forest 0.15, human density 0.10 provisional); hybrid server-fn + client-recompute; AIEDS separate+unblended+device; governance constraints locked. Spec: [`../READMORE/architecture/earth/global-health-score-data-audit.md`](../READMORE/architecture/earth/global-health-score-data-audit.md). ✓
- **Data Explorer v1 spec RATIFIED — POST-LAUNCH** — read-only adapters, E1–E4, secrets-excluded, owner/org-gated, Recycler owner-only, off-Hive (Firestore). Spec: [`internal/architecture/data-explorer-v1-spec.md`](internal/architecture/data-explorer-v1-spec.md). ✓
- **§22 worktree-lane isolation BINDING** — `apps/rand0m` = Earth/main integration only; every other lane in `worktrees/<lane>`; no branch-swap in `apps/rand0m`; push→merge→pull. Codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §22. ✓
- **8-Layer slices 1–5 merged** (`90eb743` / `451f7c2` / `fe87c3c` / `fbb4dd6` / `5ce9513`). OSCAR refresher `1ed1b6b` + scalar refreshers `e13c1e7` + enforce-flip staged `6fd5b60`. Functions bundle deploy-ready. `origin/main` = `5ce9513`. ✓ (merged; deploy PENDING owner)
- **P3 public-launch bundle merged** (`8022265`) — allowlist hardening (`203c768`) + cost/abuse backstop (`047cca8`: Firestore counters, RC kill-switch, SSRF 169.254 fix, App Check MONITORING) + BYOK (`5baba7b`) + geo-validity Phase 0+1 + Disclosure Safeguards Standard + Test entitlement TP-1..TP-4 + AIEDS whitepaper + reCAPTCHA build wiring. Hosting deploy PENDING owner wf90. ✓ (merged)
- **Disclosure Safeguards Standard ratified** — LEGAL-SAFEGUARDS AUDIT gate resolved for public-launch scope; all five safeguards present in P3 bundle. Owner device-pass PENDING. ✓
- **Auth domain restrictions clarified (ADR 0004)** — public = any Google sign-in; `@rand0m.ai`-only lifted at site-flip; callable domain guard → entitlement check at public-flip. ✓
- **BYOK decision (ADR 0006)** — key-via-proxy; client Hive (unencrypted v1); keySource telemetry; encrypted Hive fast-follow. ✓
- **Geo-validity standard Phase 0+1** — mask asset bundled; ocean-only enforcement for ocean layer. ✓
- **Test entitlement TP-1..TP-4** — submit=Pro/org; TP-1..TP-3 free; Jira CUT; run-in-app STRETCH post-launch. ✓
- **Phase A — URL tools enabled** (`b7f9849`) — domain-only URL tools surfaced for allowlisted testers; tester intro copy live. ✓
- **Phase B/T7 — githubProxy submit** (`b7f9849`) — GitHub App callable (`GITHUB_APP_ID`/`INSTALLATION_ID`/`PRIVATE_KEY` Path B); submit to `/123` wired end-to-end. ✓
- **Data-View-v2 distillation** (`b7f9849`) — rebase-before-merge applied (REBASE-BEFORE-MERGE standard; not auto-merge); Data View Scenario/Regional distillation live. ✓
- **AIEDS whitepaper + adoption guide published** — open standard published to `READMORE/architecture/aieds/` (CC BY 4.0; sanitized; no internal infra/identities). Session 39. ✓
- **Dashboard + AIEDS + Docs** — shipped to production previously. ✓
- **Earth UI Cleanup** (`earthview-ui-cleanup`) — merged to main. Earth View score/summary to dashboard aesthetic; Earth+ squeeze fix; Oracles animated gif + custom font. ✓
- **Live Connections Batch** (`live-connections-batch`) — merged to main. Air-quality + ocean governed live Data View cards; live-connection data vertical. Ocean-currents catalog status remains **research** (card-only surface; "wired to live loader" refers to the card wiring, not a live data feed — intentional, consistent with air-quality health-neutral pivot). ✓
- **Air-Quality 18th Layer** (`1dea432`) — Earth agent. Governed `EarthLayerDefinition` for air-quality (Open-Meteo); live layer grid card; ocean-currents wired to live loader; registry/region-ready count updated 13→14; governance + registry tests added. ✓
- **Earth Fast Workflow Test Rewrite** (`75e46b6`) — Earth + Fixes agents (converged). `earth_fast_validation_test` rewritten to assert current numbered workflow scheme (01/80/90/99); retired stale workflow references. FF'd to main this session. ✓
- **CODEX.md — Session Bootstrap + EARTH-ROADMAP step** — Docs agent. Full Session Bootstrap, parallel-agent protocol, numbered workflow policy, and step 6 added. Merged to dev-kitt master. ✓
- **EARTH-ROADMAP.md created** — Docs agent. Living plan seeded and published to qa-kitt main. ✓
- **@scient1st real Earth-context AI responses** (`01a070a`) — Earth agent. `earth/scientist-live-ai-responses` merged to main. Earth Fast Cycle green (+374, 0 failures; one async widget-test break fixed inline). **Deployed ✓** (Production Release `27374833292`).
- **Production Release `27374833292`** — owner. @scient1st, air-quality, ocean live cards, UI cleanup live on `rand0m.ai`. ✓
- **`earth/scientist-session-continuity`** (`6d2c6cb`, 6 commits) — Earth agent. Phases 0–2: `EarthScientistController` + `ScientistResponsePane` extracted; request-token race safety; bounded in-memory transcript (5 exchanges, exclusion-gated). Slice 2.5: renderer readiness/usage panels + data-view sections extracted. Phases 3–4: AIEDS session ledger + soft budget guard (`sessionTokenBudget=50000`, `maxPromptTokens=12000`); stale packet-line fix; prompt size cap. `earth_tab.dart` 2,387→1,375 lines — stretch goal met. **Deployed ✓** (Production Release `27388323458` @ `14d422f`).
- **`earth/scientist-scenario-explain`** (`1792660`) — Earth agent. Phases 1–3: scenario-engine ↔ @scient1st explain flow, serialized registration slice. **Deployed ✓** (Production Release `27388323458`).
- **Earth-Systems: `earth/data-ocean-live`** (`076eefb`) — Systems agent. Ocean live feed data vertical; registration applied by Earth agent in catalog. Earth-Systems vertical **COMPLETE**. **Deployed ✓** (Production Release `27388323458`).
- **Production Release `27388323458`** (`14d422f`) — owner. All above + prior checkpoints live on `rand0m.ai`. `origin/main` = `14d422f` (Fable-verified). ✓
- **Glaciers verdict** (`6e0b130`) — Earth + Systems agents. WGMS FoG asset-backed refresh pipeline implemented; no governed live source (verdict: assets only). ✓
- **Glaciers integration + registration** (`36d2901`, `57869fc`) — Earth agent. Glaciers data integrated and registered on main. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Glaciers data-view wiring** (`6316893`) — Earth agent. Data View wiring for glaciers layer. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Connect slices 1–3** (`ed7f3f4`) — Connect agent. Source onboarding pipeline slices 1–3. Connect stall resolved (two-cycle bootstrap gap fixed via §14). Render tests skip-marked per CODEX pending harness chore. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Production Release `27390760970`** (`9298e84`) — owner. Glaciers wiring + Connect slices 1–3 live on `rand0m.ai`. `origin/main` = `9298e84` (Fable-verified). ✓
- **Environmental Data Vertical audit** — Systems agent (Fable-ratified). Findings persisted to [`READMORE/architecture/earth/environmental-data-vertical-audit.md`](../READMORE/architecture/earth/environmental-data-vertical-audit.md). Implementation order approved: forest → protected-areas → biodiversity.
- **Forest pipeline + 19th layer** (`glad-hansen-forest-summary`) — Earth agent. GLAD/Hansen annual asset-backed refresh pipeline; dedicated `forest` layer id registered (region-ready 14→15). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`chore/test-deterministic-cursor`** — Fixes agent. Cursor-timer test harness fix — vendored-SDK non-deterministic hang resolved. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 4** — Connect agent. Source onboarding pipeline slice 4. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`connect-card-overflow-fix`** — Connect/Fixes agent. Resolved 0.118px RenderFlex overflow on `connect_source_card.dart:88` that broke `validate-earth-fast` green every run. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Protected-areas + WDPA registration** (`wdpa-protected-area-summary`) — Systems + Earth agents. WDPA monthly snapshot; metadata/integrity only (name, IUCN category, status, area km²); structural no-geometry constraint; non-commercial/no-redistribution license noted. Fable ruling: availability = metadata-source axis only; `earth_protected_area_integrity` stays `insufficientEvidence` (separate axes, not unified). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 5** — Connect agent. Source onboarding pipeline slice 5. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`validate-earth-fast` root tooling fix** (`53a456e`) — Fixes agent. `--no-wasm-dry-run` flag; restores green baseline after overflow fix. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Production Release `27393039706`** (`716c4d3`) — owner. Overflow fix, WDPA + protected-areas, Connect slices 4–5, forest pipeline + 19th layer, cursor chore, validate-earth-fast tooling fix live on `rand0m.ai`. `origin/main` = `716c4d3` (Fable-verified). ✓
- **Biodiversity layer** (`e9f9e47`) — Earth + Systems agents. GBIF keyless API; coarse grid-cell aggregate counts; fail-closed endangered-location suppression guard (named testable function; `iucnRedListCategory` facet proved sufficient; zero coordinate fields). 20th layer. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **F1.0 Dynamic Web Favicon** — Fixes agent. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Entities E1 slices 1–2** — Connect agent. Slice 1: `EntityDefinition` with mandatory `sourceRef`; unsourced mapping guard; Connect intake integration. Slice 2: entity-to-region mapping, entity-to-source association. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Production Release `27394511208`** (`4148495`) — owner. Biodiversity, favicon F1.0, Entities E1 slices 1–2 live on `rand0m.ai`. `origin/main` = `4148495` (Fable-verified). Owner visual checklist pending confirmation. ✓
- **Environmental Data Vertical — COMPLETE** — Systems + Earth + Docs agents. All three phases deployed: forest (`glad-hansen-forest-summary`) ✓, protected-areas (`wdpa-protected-area-summary`) ✓, biodiversity (`e9f9e47`) ✓. Spec: [`READMORE/architecture/earth/environmental-data-vertical-audit.md`](../READMORE/architecture/earth/environmental-data-vertical-audit.md). ✓
- **VCM slice 2 + `berkeley-vcm-registry-summary` registration** — Systems + Earth agents. Scope amendment applied (creditsIssued/Retired filter; lat/long stored; banned-term guard). Registry entry live. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Entities E1 slice 3 (resolver contract) + ripples** — Connect + Earth agents. Connect owns resolver; Earth owns consumption. Ripple fixes included. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Production Release `27413467093`** (`1702eaa`) — owner. VCM slice 2 + E1 S3 resolver + ripples live on `rand0m.ai`. `origin/main` = `1702eaa` (Fable-verified). HTTP smoke ✓; visual checklist items fold into R7 post-design review. ✓
- **CONNECTION-HARDENING DATA LAYER — COMPLETE** 🔒 — all planned Earth-Systems + Environmental + VCM data verticals shipped and live: ocean live feed, ice/glaciers, air-quality, forest (GLAD/Hansen), protected-areas (WDPA), biodiversity (GBIF), VCM (Berkeley BCTP). Data layer frozen; next major work is Countries registry + UI consolidation (Design) + Entities domain.
- **Countries S1 + S2** — Earth agent. S1: additive-only `earth_region_registry` expansion; `RegionIds` guard. S2: fail-explicit `EarthRegionResolver`; E1 referential gap closed; stale schematic copy fixed. Resolver on main — unwired until Countries S3/S5. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Design D1** (`3cd4255` — `earth/design-d1-globe-primary`) — Design agent. Earth+ workstation shell: tab rail restructure; pill BOTTOM-LEFT; filtered score gauge TOP-RIGHT; dark-canvas AppColors. §6 Design Language formally appended to spec. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Connect flips + E1 S4** (`af62d6f`) — Connect agent. Connect flips; E1 slice 4 minimal registration; all 3 render tests ENABLED — zero skips remain. `chore/connect-sheet-test-stall` closed. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Production Release `27415455211`** (`ca91443`) — owner. Countries registry (S1+S2), Design D1 shell, Connect flips + E1 S4 live on `rand0m.ai`. `origin/main` = `ca91443` (Fable-verified). HTTP smoke ✓; visual items fold into R7 consolidated review. ✓
- **Design D2–D5 stack** — Design agent. D2 workspace consolidation (6→3); D3 card taxonomy + detail-surface substitution; D4 detail workspace scaffold + planetary-intelligence surface; D5 cleanup pass (usage/session panels removed, stale cards removed, globe-inheritance compliance confirmed). **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **scientist-entity-resolution + call-site** — Earth agent. RESOLVE-OR-EXPLAIN gate flips; multi-source summary; Connect S5 call-site wired. SourceLifecycleStatus CI fix applied. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Countries S3** (`5897b5d`) — Earth agent. VCM coord→country mapping; lat/long→ISO at ingest. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Connect S5** (`4ec0d24`) — Connect agent (final). Write-path validation; E1 integrity gap closed at runtime. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Timer-leak fix** — Fixes + Systems agents. READY verdict confirmed (3 clean combined runs). **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Uniformity fixes** — Fixes agent. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Full ISO country table (Codex T1 — 249 countries)** — Grunt Pool. **Deployed ✓** (Production Release `27423312204` @ `c150405`).
- **Production Release `27423312204`** (`c150405`) — owner. D2–D5 stack, scientist entity resolution, Countries S3, Connect S5, timer-leak fix, uniformity, ISO table live on `rand0m.ai`. `origin/main` = `c150405` (Fable-verified). HTTP smoke ✓. ✓
- **Systems agent — RETIRED** (session 25). Timer-leak branch merged; `worktrees\rand0m-systems` torn down. Data-vertical scope absorbed by Earth agent. ✓
- **Connect agent — RETIRED** (session 25). S5 merged; `worktrees\rand0m-connect` torn down. Entities + Connect source pipeline scope absorbed by Earth agent. Architectural code boundary unchanged. ✓
- **Owner visual review #1** (session 25). Post-R7 consolidated visual review complete. Verdict: approved direction; consolidate further → IA v2 (D7+D8). Visual suspension lifted. ✓
- **Design D7 Earth View nullschool mode** — Design agent. No-scroll viewport-fit; globe hero; score gauge TOP-RIGHT filter-reactive; stacked proportional row; interactive time-scrubber histogram; pill BOTTOM-LEFT persistent. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **BE chart-series provisions** (`earth/chart-series-provisioning`, `33db79b`) — Earth agent. EarthChartSeries/EarthChartRadar/EarthChartProvisioning gap-aware series objects for D8 chart types. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Design D8 Data View chart vocabulary** (`e35a31d`) — Design agent. Donut/funnel/radar bound to real EarthChartProvisioning series; streamgraph/treemap/scatter-bubble dropped (no real backing). **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Scroll-helper + CustomPainter globe shell** — Earth agent. Scroll-helper and CustomPainter globe in new shell. **Deployed ✓** (Production Release `27432166050` @ `e1e49c7`).
- **Production Release `27432166050`** (`e1e49c7`) — owner. D7 nullschool shell + D8 chart vocabulary + chart-series + scroll-helper live on `rand0m.ai`. `origin/main` = `e1e49c7` (Fable-verified). HTTP smoke ✓. Owner review #2 verdict pending. ✓
- **Cesium slice 2 — browser bridge** — Earth agent. JS bridge; `VENDOR.md` + env-injected token; `KNIGHTS_CESIUM_ION_API_KEY` reserved fallback. Slice 2 gate-passed (C9). ⚠ **CORRECTED (session 33):** `web/cesium/` contained `VENDOR.md` only — CesiumJS bundle was absent; runtime rendered CustomPainter fallback at all R9 and prior builds. True vendor step is a separate R10 gate. **On main** (merged). ✓
- **Batched release `f9697be`** (release `27571417246` ✓ success) — owner. External-access RC gate; taco icon (`22d699d`); FIRMS wildfire snapshot/taco (`769bc67`); donation-reconcile; data-refresh frontend (`9f174a2`). `origin/main` = `f9697be` (Fable-verified). **Deployed ✓**. ✓
- **All three refresh functions DEPLOYED (session 37)** — owner manual deploy. `earthWindGfsRefresh` + `earthAirQualityRefresh` + `earthWildfireRefresh` all live. Layers serve live cached data. ✓
- **Owner allowlist device-pass DONE (session 37)** — allowlisted ✓ / non-allowlisted blocked ✓ / domain ✓. Beta tester onboarding unblocked for T5/T6 client flows. ✓
- **87 merged branches + worktrees pruned (session 37)** — Fixes agent. Active worktrees: main + `rand0m-design-dv` only. `rand0m-mainmerge` dir leftover — needs manual `rm` (not a worktree). ✓
- **Test page beta-readiness audit (session 37)** — Test agent + Docs. Persisted at [`READLESS/internal/architecture/test-page-beta-readiness.md`](internal/architecture/test-page-beta-readiness.md). Beta MVP = T5/T6 client flows; two P0 security findings (callable gate mismatch + repo-123 infra leak) block callable features from beta. ✓
- **External-access Remote Config gate** (`2976856`) — Earth agent. `external_access_allowlist` fail-closed allowlist live; domain OR allowlist; verified-only; Access ≠ Owner. Owner gate device-pass PENDING. **On main** (`f9697be`). ✓
- **FIRMS wildfire snapshot + taco icon** (`769bc67`, `22d699d`) — Earth agent. FIRMS wildfire data snapshot integrated; taco icon shipped. **On main** (`f9697be`). ✓
- **Data-refresh frontend** (`9f174a2`) — Earth agent. Frontend data-refresh wiring. **On main** (`f9697be`). ✓
- **`earthWindGfsRefresh` scheduled function** — Earth agent. Live NOAA-GFS wind refresh. **DEPLOYED** (owner manual). ✓
- **86 merged branches deleted** — Fixes agent. Bulk cleanup of merged remote branches. Standing hygiene rule codified (session 35+36). ✓
- **Deploy-integrity fix** (`086226e`) — Earth/Fixes agents. `flutter clean` + per-run artifact + live `main.dart.js` byte-hash assertion in workflow 90. Every release self-fails on stale bundle. ⚠ Session 34 standard (Last-Modified/markers) **CORRECTED**: byte-hash is the source of truth. **Deployed ✓**. ✓
- **Outline Globe** (`37aea29`) — Earth agent. Natural Earth public-domain coastline + admin-0 base geometry on Cesium; satellite terrain removed; wind-layer dimming fixed. **Deployed ✓**. ✓
- **Wind Phase 1a** (`f56d1f2`) — Earth agent. Animated global wind field; renderer = `earth_flow_field.js` + `EarthWindGrid` + `syncFlowField`; static CC0 representative climatology. Gate-lift ratified (owner device pass, reviewed+live). **Deployed ✓**. ✓
- **Wind Phase 1b** — Earth agent. Live NOAA-GFS wind data + rotation-trail fix; Firebase function deployed via owner one-time manual `firebase deploy --only functions:<name>`; workflow 90 stays HOSTING-ONLY. `origin/main` tip SHA TBD (Fable-verify). **Deployed ✓**. ✓
- **CesiumJS vendor step** — Earth agent. Pin latest-stable CesiumJS at vendor time; bundle placed in `web/cesium/`; exact version + checksum recorded in `VENDOR.md`. Fable HOLD lifted. ★ Gate: first true Cesium renderer boot. **Deployed ✓** (R10 `bde2a28`). ✓
- **P1–P4 nullschool-mode chrome** — Earth + Design agents. Black stage; rotate toggle; credits footer; minimal @scient1st context. **Deployed ✓** (R10 `bde2a28`). ✓
- **R10 convergence: density + countries + all data verticals** — density `c7c68b9`, remediation `9abbc16`, motion cues `e38cb9e`, globe-context `c3c6d81` + P1–P4 chrome + CesiumJS vendor bundle → `bde2a28`. **Deployed ✓** (R10 `bde2a28`). ✓
- **Production Release R10** (`bde2a28`) — owner. CesiumJS V2.16 vendored + activated; nullschool chrome; density + countries + all data verticals live on `rand0m.ai`. ★ **NULLSCHOOL MILESTONE — first true Cesium boot**. P4 release dispatched (run ID pending). `origin/main` = `bde2a28` (Fable-verified). ✓

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.
- **`earth/p17-7-scientist-context-bridge`, `earth/p18-0-earth-agent-activation`, `earth/p18-1-scientist-command-surface`, `earth/p18-2-scientist-preview-response`** — abandoned. Audited: ~74k-line divergent rewrites vs main; not a safe merge basis. @scient1st shipped fresh on `earth/scientist-live-ai-responses` from current `main` instead. Candidates for deletion.
- **`earth_tab.dart` extraction:** merge gate (<2,000 lines) and stretch goal (<1,500 lines) both met and deployed at `6d2c6cb` — file is at 1,375 lines. Gate closed.
- **Earth-Systems vertical:** COMPLETE and deployed (`14d422f`). Systems agent rolls over to Environmental vertical pending owner approval (audit-first).
- **Glaciers:** no governed live source. WGMS FoG pipeline is asset-backed refresh only (`6e0b130`). Integration + registration on main (`57869fc`); data-view wiring in progress. Do not promote glaciers to a live catalog entry without an explicit governance phase.
- **Checkpoint cadence:** Production Releases run approximately every 2 phases. Fable may defer a checkpoint if the phase delta is too small to warrant a release. Do not assume a release follows every merge.
- **Connect worktree bootstrap gap:** two-cycle stall on slice 3 traced to fresh-worktree environment not matching the main-clone environment (Flutter PATH, `env.g.dart`, generated registrants). Mandatory bootstrap sequence now in coordination standards §14. All worktree agents must run it before any `analyze`, `test`, or `build` call.
- **Cursor-timer test hangs (resolved + deployed):** vendored-SDK cursor-timer test hangs fixed by `chore/test-deterministic-cursor` — deployed at `716c4d3`.
- **Glaciers catalog status:** glaciers layer intentionally stays `research` while source metadata is connected (`assetBacked`/`previewFixture` access). Deployed at `9298e84`. Systems agent to confirm or amend catalog promotion via `EARTH:` delta; Earth applies if change required. Do not promote to `assetBacked` without Systems sign-off.
- **Forest layer (19th) — Fable ruling (session 15):** dedicated `forest` layer id added to catalog (not a sub-group of an existing layer). Human-encroachment block remains unchanged — human encroachment is a distinct concept and is not blocked by the forest governance entry. Do not conflate the two.
- **Connect sheet render-test stall (known issue, session 17):** the two remaining skip-marked tests in Connect are NOT caused by the cursor-timer hang. Root cause is a separate Connect sheet render-test stall. Fixes agent diagnosing under `chore/connect-sheet-test-stall`. Do not un-skip these two tests until that fix lands — the cursor-timer fix (`716c4d3`) does not resolve them.
- **Countries mapping integration — new thread (session 17, owner directive):** country-granularity expansion of `earth_region_registry`; countries as first-class regions; sources/layers/entities mappable to country level; feeds Entities region groups + @scient1st regional answers. **DATA/REGISTRY LEVEL ONLY** — no globe boundary rendering; Cesium V2.16 freeze unchanged. Earth agent spec audit underway (session 18).
- **VCM spec amendment (session 18, Fable ruling):** scope filter added — include only projects with `creditsIssued>0 OR creditsRetired>0 AND lat/long present`. `creditsIssued`/`creditsRetired` are neutral registry-accountability fields (permitted). Lat/long stored for map readiness, not rendered (Cesium freeze). Slice 1 @ `70fafbf` built to pre-amendment spec; slice 2 applying amendment. Full ruling in [`READMORE/architecture/earth/vcm-governance-spec.md`](../READMORE/architecture/earth/vcm-governance-spec.md).
- **Earth/Connect resolver boundary (session 18, binding):** Connect owns the entity resolver; Earth owns consumption. No cross-ownership. Interface contract changes require `DOCS:` callout before implementation. Codified in [`READMORE/architecture/earth/entities-spec.md`](../READMORE/architecture/earth/entities-spec.md).
- **Scoped local validation (§18, binding):** named test files for touched surface only; no full-suite local runs; CI is the authoritative broad gate. `validate-earth-fast` gains `-TestPaths` (Fixes chore in progress). Known flaky-harness: non-deterministic mid-suite crash (cursor-timer family) — emit `FIXES:` callout and continue; do not block.
- **Owner visual checklists SUSPENDED (session 19, owner directive):** visual spot-checks against `rand0m.ai` deferred until Design D5 merges (R7). Checkpoints verified by HTTP smoke + CI release smoke only. Reason: Data View surfaces under active redesign (D1–D6); visual checks against pre-consolidation layout are not meaningful gates. Will be re-enabled after R7. Previous ⚠ rows for PR `27394511208` superseded by this suspension — reviewed in post-R7 visual pass.
- **Countries spec RATIFIED (session 19, Fable):** ISO tier; no `EarthRegionIds.all` expansion (breaks existing lookups); fail-explicit lookups (missing country = explicit error, not silent fallback); S2 closes E1 gap (resolver queryable by country); VCM coord→country mapping (lat/long → ISO at ingest, not display); 5-slice plan (S1 registry, S2 resolver, S3 VCM mapping, S4 @scient1st regional, S5 cleanup).
- **Design agent — IA consolidation (session 19, owner directive):** promoted from audit to implementation. Worktree `worktrees\rand0m-design`; owns D1–D6 presentation slices. Spec: [`READMORE/architecture/earth/earth-ia-consolidation-spec.md`](../READMORE/architecture/earth/earth-ia-consolidation-spec.md). Earth agent is merge gate for every D-slice. D1 in flight; pill ruling resolved.
- **Fable checkpoint bundle cadence (§19):** Fable declares checkpoint bundles one cycle ahead — agents know what the next release gate includes before the cycle starts.
- **CONNECTION-HARDENING DATA LAYER COMPLETE (session 20):** all planned data verticals shipped — ocean, ice, air, forest, protected-areas, biodiversity, VCM. Data layer enters maintenance mode; Systems agent idle post-R5. Next Systems work requires a new owner directive.
- **Owner visual checklists SUSPENSION CONFIRMED (session 20):** R5 checklist items (VCM card, biodiversity card, favicon, E1 UI) fold into the R7 post-design visual review. Agents do not need to track individual visual items until R7 triggers the consolidated review.
- **Owner rulings — visual direction (session 20, binding):** Earth+ pill = BOTTOM-LEFT always; filtered score gauge = TOP-RIGHT (filter-reactive); dark-canvas gauge/donut/chip density harmonized with `AppColors`. Reference images provided to Design agent. Full ruling in [`READMORE/architecture/earth/earth-ia-consolidation-spec.md`](../READMORE/architecture/earth/earth-ia-consolidation-spec.md).
- **R6 bundle declared (session 20, Fable):** Countries S1+S2, Design D1 (+D2 if ready), uniformity fixes, Connect flips + E1 S4. Release approval requested at integration; no automatic release on merge.
- **R6 final bundle (session 21):** uniformity fixes + timer-leak chore SLIPPED to R7 — Systems/Fixes branches never reached remote. R6 final = Countries S1+S2 + D1 + Connect flips+E1 S4 only. Slipped items added to R7 bundle.
- **Countries S1 gate-passed (session 20):** `f82c595` — additive-only registry expansion; `RegionIds` guard in place. No `EarthRegionIds.all` expansion.
- **Countries S2 gate-passed (session 21):** `58361b4` — fail-explicit `EarthRegionResolver` closes the E1 referential gap; stale schematic copy resolved. Stale schematic open callout dropped.
- **Design D1 gate-passed (session 21):** `3cd4255` (`earth/design-d1-globe-primary`) — presentation-only; pill BOTTOM-LEFT ✓; gauge TOP-RIGHT ✓; dark-canvas AppColors. Design's DOCS: callout resolved — §6 formally appended to [`READMORE/architecture/earth/earth-ia-consolidation-spec.md`](../READMORE/architecture/earth/earth-ia-consolidation-spec.md).
- **Connect render tests ENABLED (session 21):** `af62d6f` — all 3 render tests enabled; zero skips remain in Connect. `chore/connect-sheet-test-stall` resolved by this gate-pass.
- **R7 bundle declared (session 21):** Design D2–D5 + resolver wiring + Intelligence summary + Countries S3 + uniformity fixes + timer-leak chore. R7 closes with owner consolidated visual review (suspended checklist items folded in: VCM card, biodiversity card, favicon, E1 UI).
- **R6 DEPLOYED (session 22):** `ca91443`, Production Release `27415455211` — Countries S1+S2, Design D1, Connect flips + E1 S4. `origin/main` = `ca91443`.
- **Countries S1+S2 deployed note (session 22):** `EarthRegionResolver` is on main but **unwired** — countries are in the registry; resolver is not yet called by Earth layers or @scient1st. Wire-up happens at Countries S3 (VCM coord→country) and S5 (cleanup). Do not assert country-level routing is active until S3/S5 land.
- **Connect render-test stall CLOSED (session 22):** `af62d6f` confirmed zero skips — all 3 render tests enabled. `chore/connect-sheet-test-stall` pivot closed. Skip-marked-tests constraint from CODEX lifted for Connect.
- **R7 integration order declared (session 22):** timer-leak → uniformity → Countries S3 → c2-0 tip → D2–D5 stack → release → owner consolidated visual review. Order is binding — do not resequence without owner directive.
- **SLIP TRACKING added (session 22):** timer-leak and uniformity each at slip=2 (two consecutive cycles missed remote). Escalation path: Fixes runs single-item isolation; Systems runs three-outcome closure (pass / root-cause / descope). Slip counter must be recorded on in-flight rows in Deploy Checkpoint. A third slip triggers owner escalation.
- **D2 planetary-intelligence split deferred (session 22):** planetary-intelligence surface will be implemented in D4 as originally specced — D2 is relocation-only (6→3 workspace consolidation). Do not attempt intelligence wiring in D2 or D3.
- **D2 gate-passed (session 22):** `0381603` — 6→3 workspace relocation; presentation-only; no catalog/Cesium files. Earth gate confirmed.
- **Connect S5 provisional pass (session 22):** `4ec0d24` — write-path validation wired; E1 integrity gap closed at runtime. Provisional pending full R7 integration — not a final gate.
- **Design D3 gate-passed (session 23):** `fdb5b7f` — detail-surface substitution ratified (Fable); taxonomy classes deleted analyze-forced; caveat copy survives per-layer. Presentation-only; Earth gate confirmed.
- **scientist-entity-resolution gate-passed (session 23):** `3d04b23` — resolve-or-explain gate flips + multi-source summary. CI red: `undefined SourceLifecycleStatus` in `earth_entity_region_context_test.dart` (missing import of `models/connect/source_intake.dart`; enum not re-exported by `entity_record.dart`). Earth fix assigned; CI green required before R7. Connect S5 S2 callout CLOSED — standing gap resolved by Earth call-site micro-slice.
- **Countries S3 provisional pass (session 23):** `5897b5d` — VCM coord→country mapping; lat/long→ISO at ingest. Provisional; full gate at R7.
- **Timer-leak UNPROVEN (session 23):** fix is on remote (slip counters reset) but crash recurred during Earth validation after push. Timer-leak merges to R7 only on Fixes' explicit READY verdict after 3 clean combined runs. Do not treat "on remote" as "fixed."
- **New binding standard §20 (session 23):** needing code on main = `git merge origin/main`; never copy files across branches. Connect S5 copied 3 Countries files byte-identical to main — benign this time (dedupes at R7), but pattern prohibited. Standard added to coordination standards.
- **§18 analyze amendment (session 23):** `flutter analyze` is the mandatory final step of every slice, after the last edit. Scoped test runs do not substitute. Motivating case: `earth/scientist-entity-resolution` passed local scoped tests; CI went red on undefined symbol that analyze would have caught. Codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §18.
- **Fable ruling — sparklines dropped (session 23):** synthetic trend-shaped sparklines banned from D1–D6. Real sparklines require a real time-series source (future slice, new Fable spec required). Replacement: trend chips (`AppColors` tokens). Codified in [`READMORE/architecture/earth/earth-ia-consolidation-spec.md`](../READMORE/architecture/earth/earth-ia-consolidation-spec.md) §6.
- **Connect S2 callout CLOSED (session 23):** standing S2 callout resolved — Connect S5 `4ec0d24` already wired the validate path; Earth call-site micro-slice closes the remaining gap. No further S2 action needed.
- **STRATEGIC RESTRUCTURE (session 24, owner directive):** end-goal established; governance amended; agent roster restructured; token-economy standards bound. See pivots below.
- **End-goal established (session 24):** animated planetary flow globe (nullschool-class) + governed AI assistant. Roadmap plan updated to C7–C12 (R7→R8→R9 FINAL). Prior 14-day framing retired.
- **Human Activity freeze LIFTED at Tiers 1+2 (session 24, owner directive):** Tier 1 (symbolic motion cues — static corridors/lanes/orbital bands; no live data; RETAINED GLOBE INVENTORY; D6 must not quarantine motion-suite assets) and Tier 2 (aggregate density verticals — flights/ships/satellites; public datasets; identity-suppressed, ≥24h delay floor, fail-closed, health/trend-neutral; Fable spec per vertical) are unblocked. Tier 3 live per-vehicle tracking remains BANNED. Governance spec: [`READMORE/architecture/earth/human-activity-governance-amendment.md`](../READMORE/architecture/earth/human-activity-governance-amendment.md). Coordination standards §4 taxonomy updated.
- **Agent restructure — effective at R7 (session 24, owner directive):** roster post-R7 = Fable + Earth + Design + Fixes + Docs + CODEX Grunt Pool. Systems retires after timer-leak branch merges; Connect retires after S5 merges. Earth absorbs both scopes. Architectural Earth/Connect code boundary unchanged. CODEX Grunt Pool (OpenAI) handles low-risk mechanical tasks only — named files + acceptance command + do-not-touch list per task; never touches guards, gates, catalog files, or governance logic.
- **Token-economy standards (session 24, binding §21):** thread-sized slices (one coherent unit per run); one visual sign-off per release window (≤5 items, only when UI changed); tests only for governance-critical paths + one FE layout guard per D-slice; single bounded failure-triage pass (no repair loops). Codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §21.
- **R7 DEPLOYED (session 25):** `c150405`, Production Release `27423312204`. D2–D5 + scientist RESOLVE-OR-EXPLAIN + call-site + Countries S3 + Connect S5 + timer-leak + uniformity + Codex T1 ISO table all live. `origin/main` = `c150405`.
- **Systems + Connect RETIRED (session 25):** wind-down complete. Scopes absorbed by Earth. Worktrees torn down. Post-R7 roster = Fable + Earth + Design + Fixes + Docs + CODEX Grunt Pool.
- **Owner visual review #1 — approved direction, consolidate further (session 25):** post-R7 consolidated visual review complete. Verdict: approved direction; consolidate further → IA v2. Visual suspension lifted. IA v2 spec appended to [`READMORE/architecture/earth/earth-ia-consolidation-spec.md`](../READMORE/architecture/earth/earth-ia-consolidation-spec.md).
- **Open Branches table rewritten from reality (session 29, T10 audit):** entire prior table was stale — contained branches that had never existed on the remote, inferred names with "(or equivalent)" placeholders, and deployed rows that belonged in Deploy Checkpoints. Table rebuilt from confirmed remote branches only. Lesson recorded in coordination standards §2: Open Branches rows update on Fable gate confirmation only, same as Deploy Checkpoint rows.
- **T8 attribution audit — correction slice in R9 bundle (session 29):** Codex T8 ran an attribution audit across all deployed data verticals. Findings requiring correction: (a) GBIF — mixed-license records (some CC-BY-NC 4.0); license constraint must be explicit in governance drawer. (b) Berkeley VCM — non-commercial restriction (BCTP terms) must appear verbatim, not just implied. (c) WGMS, Hansen (GFW), WDPA — missing or incomplete formal citation strings. (d) Open-Meteo, FIRMS — attribution text absent from governance drawer. Correction slice: `earth/source-attribution-corrections` (R9 bundle). At R9, the governance-drawer text becomes legally exact for all seven sources.
- **T9 density fixtures — pre-staged T3 deliverables (session 29):** Codex T9 pre-staged density test fixtures as T3 deliverables in branch `codex/density-fixtures`. These are consumed by `earth/data-human-activity-density` (the in-flight C10 density vertical). The fixtures branch is an R9 dependency — not an orphan. Earth agent must `git merge --no-edit origin/codex/density-fixtures` into the density branch before its test suite runs.
- **CORRECTION — R9 "nullschool milestone" was premature (session 33):** `web/cesium/` never contained the CesiumJS bundle — only `VENDOR.md` was committed in slice 2. All production builds from R9 and earlier rendered the CustomPainter fallback; the fallback design masked this exactly as intended. Attribution corrections and D6 verdicts ARE live at R9 and are accurate. ★ NULLSCHOOL MILESTONE deferred to R10 vendor step. Gate lesson (binding, session 33): "vendored" claims are verified by **asset presence**, not docs. A `VENDOR.md` without the vendored assets is not a vendor step.
- **R10 integration complete `c3c6d81` — HELD on vendor blocker (session 33):** density `c7c68b9` ✓; density remediation `9abbc16` ✓ (3 source registrations + suppression-guard governance entries); motion cues `e38cb9e` ✓; @scient1st globe-context `c3c6d81` ✓. All C11 work gate-passed. Fable ruling: HOLD confirmed — no fallback-as-final; release blocked until CesiumJS vendor step complete.
- **CesiumJS vendor step required for R10 (session 33, Fable ruling):** pin = latest-stable-at-vendor-time; place bundle in `web/cesium/`; record exact version + checksum in `VENDOR.md`; never float. This is a hard gate — R10 does not deploy without it.
- **Task 13 reorg merged `6886c25` (session 33):** READLESS reorganized — active specs now under `READLESS/internal/architecture/`; archive under `READLESS/archive/architecture/`; coordination standards under `READLESS/internal/automation/`. All roadmap path references updated this session. Earth agent hit a phantom-empty-folder on the old `architecture/` path — root cause confirmed as stale links. Do not use bare `architecture/` paths in agent commands; always use `READLESS\internal\architecture\`.
- **Fixes triage (session 33):** 3 pre-existing VCM test failures confirmed as pre-existing (not introduced by C11 work). Build-size report queued. Fixes agent to resolve or descope VCM failures independently.
- **Review count updated to 8 (session 33):** combined R8+R9+R10 items = 8. Single FINAL review performed after R10 deploy. §21b exception: ≤8 items for combined multi-release review.
- **REBASE-BEFORE-MERGE — Earth-page branches (session 38, binding):** clean textual `git merge` of two Earth-page branches is a FALSE POSITIVE — no conflict reported but logical result is wrong (landed changes silently overwritten). Standard: any Earth-page branch whose merge-base predates a landed Earth-page change must be rebased onto tip, hand-resolved, and tested. Never auto-merge Earth-page branches. Triggered by: Data View distillation `c1f5844` blocked — textual merge would have silently regressed filter-ux-v2. Branch re-attempted as `earth/design-dataview-v2` with rebase.
- **Data View distillation BLOCKED → v2 (session 38):** `c1f5844` could not be auto-merged (Earth-page divergence — see rebase-before-merge pivot). Re-attempt as `earth/design-dataview-v2` with proper rebase onto `origin/main` tip + hand-resolution.
- **P0 beta-hardening `4b82e9b` UNDEPLOYED — owner decision pending (session 38):** hides domain-only URL tools + adds tester intro. Two options: (1) ship-hidden-beta-now; (2) do-it-all-first (Phase A T7 wire first). No agent deploys or advances Phase A/B without owner ruling.
- **T7 GitHub App secrets SET — Path B (session 38):** `GITHUB_APP_ID`, `INSTALLATION_ID`, `PRIVATE_KEY` provisioned. Firebase callable can now use GitHub App for `/123` writes. Phase A integration (callable wire + enable URL tools) and Phase B (ship) NOT yet run — secrets set, integration not yet wired.
- **Orphan worktree dirs — Windows handle locks (session 38):** `rand0m-dvmerge` + `rand0m-mainmerge` + `idle-spin` cannot be removed via git commands due to Windows file handle locks. Manual `rm` required after confirming no process holds them. Fixes carries tracking.
- **Beta MVP = T5/T6 UX-feedback scope (session 37, Fable ruling):** trusted allowlisted testers; Record + Create client flows only. BETA-DISCLAIMER route (tester-intro note + data-layer governance) satisfies legal-safeguards for this allowlisted-only beta. The FULL per-element disclosure audit remains the HARD GATE for public (non-allowlisted) launch. Two P0 security findings must be fixed before callable features enter beta scope: (1) repo-123 handoff infra leak — internal `/123` path must not be visible to testers; (2) callable gate mismatch — callables enforce domain-only but RC gate allows allowlist; non-domain allowlisted testers hit callable 403s. See [`READLESS/internal/architecture/test-page-beta-readiness.md`](internal/architecture/test-page-beta-readiness.md).
- **Refresh functions all DEPLOYED (session 37):** `earthAirQualityRefresh` + `earthWildfireRefresh` deployed by owner (after `git pull` — stale checkout was root cause of prior miss). All three layers now serve live cached data. Standing standard confirmed: `git pull` before every `firebase deploy --only functions:...`.
- **CI path-filters (01–07) + concurrency confirmed (session 37):** path-filter and concurrency configuration verified for Actions metered plan. Batched-release standard binding.
- **20 unmerged xyz branches kept (session 37):** low-priority triage; not blocking. `chore/idle-spin-test` is redundant/deletable. `rand0m-mainmerge` leftover directory needs manual `rm` (not a worktree — cannot be removed with git worktree commands).
- **Batched release f9697be (session 36):** external-access gate + taco icon + FIRMS wildfire + donation-reconcile + data-refresh frontend all batched into one release. CI now metered (Team Org) — batched-release standard binding: deploy every few passes, not per-pass. Workflow 90 byte-hash is delivery gate; path-filters (01–07) + concurrency confirmed.
- **filter-ux/random-default DID NOT LAND (session 36):** prior filter UX branch was re-run as `earth/filter-ux-v2` — outside-click-close, remove All-Layers, random built-layer default one-at-a-time, disable inactive layers. Record once merged; do not assert landed until gate-passed.
- **Data View Scenario/Regional distillation c1f5844 (session 36):** built-but-unmerged; Earth merging this cycle. Record SHA in Done when confirmed on main.
- **Functions deploy root cause (session 36):** owner's local checkout was stale — `earthAirQualityRefresh` + `earthWildfireRefresh` were missed because `firebase deploy` ran against stale code. Binding standard reinforced: `git pull` before every `firebase deploy --only functions:...`. Static fallback active until deployed.
- **External-access gate ratified (session 36):** fail-closed `external_access_allowlist` Remote Config live. Domain OR allowlist; verified accounts only; Access ≠ Owner. **Mandatory add-a-tester procedure:** add email to RC → owner gate device-pass (allow + block + domain all three) → tester all-clear. No tester onboarded without device-pass.
- **Beta path declared (session 36):** steady-state = release → owner function deploy → owner device-pass → Test beta-readiness hardening → testers at T5/T6 (record/create). Full submit beta requires T7 (owner GitHub App/token for `/123` write path) — do not promise submit before T7 wired. Test agent to persist beta-readiness checklist as READLESS note.
- **CI economy (session 36, binding):** GitHub Actions now metered on Team Org plan. Batched-release standard: deploy every few passes. Minimize workflow triggers. Workflow 90 byte-hash is the sole delivery gate — no supplementary checks.
- **Session 42 docs persisted:** Health Score ratified (earth.healthscore.v1) → `READMORE/architecture/earth/global-health-score-data-audit.md`. Data Explorer v1 POST-LAUNCH spec → `internal/architecture/data-explorer-v1-spec.md`. §22 worktree-lane isolation → `internal/automation/agent-coordination-standards.md` appended. Mini-player `4333563` merged. 8-layer slices 1–5 + OSCAR + scalar refreshers + enforce-flip staged all recorded. `origin/main` updated to `5ce9513`.
- **§22 root cause — FF-merge races (session 42):** multiple lanes working in `apps/rand0m` and pushing to `origin/main` caused fast-forward collisions (out-of-order commits). Fix: `apps/rand0m` = integration-only; all feature work in lane worktrees; push→Earth-integrates→others-pull. §22 supersedes any prior language allowing feature work in main clone. Complements §11 (Main Clone Earth-Exclusive).
- **Open Branches corrections (session 42, Fixes-verified):** `design-dataview-scenario` (`c1f5844`) is NOT merged into `origin/main` — was incorrectly listed as "merged (superseded)". Status: unmerged; superseded in intent; do not delete without owner confirm. `chore/idle-spin-test` (`9fc16ef`) is NOT merged into `origin/main` — was incorrectly listed as "redundant/deletable". Status: unmerged; owner decision required before deletion.
- **8-Layer Program opened (session 41):** two renderer contracts drafted — flow-field (`earth_flow_field.js`/`EarthWindGrid`/`syncFlowField`) for Wind/Ocean/Swell; point/scalar (`earth_point_renderer.js`/`EarthPointGrid`/`syncPointLayer`) for Wildfires/AirQuality/future. Disjoint-lane model: 8 lanes, each with its own branch + file scope; shared-file changes lock to owner lane; REBASE-BEFORE-MERGE binding. L1 (Wind) complete; L2–L4 queued; L5–L8 post-launch. Fable ratification PENDING before any implementation begins. LAYERED-ANIMATION PROGRAM (old prose) superseded by the 8-Layer Program section. Public-launch goal: 6/26 (prepare-then-flip).
- **P3 public-launch sprint (session 40):** P3 bundle merged to main (`8022265`). Key items: allowlist hardening, cost/abuse backstop (Firestore counters + RC kill-switch + SSRF block + App Check MONITORING), BYOK (key-via-proxy, Hive-local, keySource), geo-validity Phase 0+1 (ocean-only), Disclosure Safeguards (5 safeguards), Test entitlement TP-1..TP-4 (submit=Pro/org), reCAPTCHA build wiring. Hosting deploy PENDING owner. `RECAPTCHA_V3_SITE_KEY` Actions var required before wf90.
- **App Check monitoring → enforce split (session 40):** App Check ships in MONITORING mode (no traffic block). Enforce-flip is DEFERRED to the SECOND functions deploy (post-monitoring period). This is a deliberate two-step: baseline legitimate traffic before blocking.
- **Public site-flip decoupled from P3 deploy (session 40):** P3 deploy is NOT the site-flip. Public-flip requires: P3 confirmed ✓ + monitoring ✓ + enforce-flip ✓ + device-pass ✓ + Fable sign-off ✓ + callable P0 fix ✓. Fable owns the go/no-go; owner executes the flip.
- **LEGAL-SAFEGUARDS AUDIT gate resolved for P3 scope (session 40):** previously a blanket HARD GATE on all disclosure UI. Now resolved: Disclosure Safeguards Standard (5 safeguards) defines what must be present; all five are in P3 bundle; owner device-pass is the final verification. The gate is not removed — it is satisfied by the standard.
- **Jira CUT from Test scope (session 40):** Jira ticket creation is CUT from P3 and from the near-term test roadmap. Post-launch; separate spec + OAuth proxy required.
- **BYOK: unencrypted Hive accepted for v1 (session 40):** encrypted Hive storage deferred as a fast-follow. Key-at-rest risk is local-device-only (key never in Firestore/logs/bundle). ADR 0006.
- **Phase A/B/T7 shipped (session 39):** owner chose Option 2 (do-it-all-first). Phase A (URL tools enabled) + Phase B/T7 (githubProxy callable + GitHub App submit to `/123`) shipped together at `b7f9849`. T7 secrets (`GITHUB_APP_ID`/`INSTALLATION_ID`/`PRIVATE_KEY` Path B) wired into Firebase callable. URL-tools decision closed.
- **Data-View-v2 shipped via rebase (session 39):** REBASE-BEFORE-MERGE standard applied. Data View distillation re-attempted as `earth/design-dataview-v2` with proper rebase onto `origin/main` tip — not auto-merge. Live at `b7f9849`.
- **AIEDS open standard published (session 39):** AIEDS v1 whitepaper + adoption guide published to `READMORE/architecture/aieds/` (CC BY 4.0). Sanitized of internal infra/identities. First public-facing spec from qa-kitt.
- **Open animation bugs → earth/anim-bugfix (session 39):** C16 deploy revealed ocean animation regression + view-switch ghost trails. Tracked as open bugs → `earth/anim-bugfix` in flight.
- **4 merged branches deletable (session 39):** `test-external-tools`, `test-t7-submit`, `design-dataview-v2`, `design-dataview-scenario` — all merged; safe to delete. Fixes agent to execute.
- **86 merged branches bulk-deleted (session 36):** Fixes agent purged 86 merged remote branches. Sprawl was root cause of EPERM mkdir outage. Binding hygiene: delete branch + worktree immediately post-merge; `--force` safe when only generated artifacts remain; revert generated plugin-registrants pre-commit.
- **Deploy-integrity standard CORRECTED (session 35):** session 34 recorded "Last-Modified + markers" as the verify-delivery standard. **WRONG — corrected here.** Root cause of the stale-deploy bug: `release-sha.txt` side-channel check proved file-freshness not recompile; `flutter build web` reused stale state. Fix at `086226e`: `flutter clean` + per-run-unique artifact + live `main.dart.js` **byte-hash** assertion. The workflow now self-fails on a stale bundle. `Last-Modified` is unreliable; `Global Health Score` UI-string marker is empirically absent even in valid builds. **Binding standard: byte-hash is the source of truth.** A passing workflow 90 with byte-hash is sufficient.
- **Outline Globe shipped `37aea29`:** Natural Earth public-domain coastline + admin-0 base geometry on Cesium; satellite terrain removed; wind-layer dimming fixed. No license encumbrance (public domain).
- **Wind Phase 1a shipped `f56d1f2`:** animated global wind on Cesium; renderer = `earth_flow_field.js` + `EarthWindGrid` + `syncFlowField`; static CC0 representative climatology. Gate-lift ratified by owner device pass (reviewed+live). Renderer contract is the extension point for all future animation layers — do not fork.
- **Wind Phase 1b shipped (SHA TBD):** live NOAA-GFS wind + rotation-trail fix. Firebase function deployed via owner one-time manual `firebase deploy --only functions:<name>`. **Workflow 90 stays HOSTING-ONLY — no CI functions deploy.** This is a binding constraint: adding function deploys to workflow 90 requires explicit owner directive.
- **Layered-animation program declared (session 35):** Phase 1a wind ✓; Phase 1b live GFS ✓; Phase 2 Ocean in flight (OSCAR; reuses renderer; static-rep→live-OSCAR fast-follow); then point-based layers (wildfires etc.). All layers reuse `earth_flow_field.js` renderer.
- **DISCLOSURE UI DEFERRED (session 35, Fable ruling, binding):** all on-screen disclosure labels (e.g. representative-wind "not current conditions") are DEFERRED to a pre-launch LEGAL-SAFEGUARDS AUDIT. HARD GATE before any public/non-owner exposure. Governance-catalog obligations stay TRUE at the data layer; UI surfacing only is deferred. No agent implements disclosure UI without Fable + owner opening this gate.
- **One-owner-per-Earth-surface (session 35, binding):** serialize chrome/renderer/earth_tab edits — no parallel agents on Earth-page files. Divergence = merge conflict + lost work. Codified alongside POST-LAUNCH serialization.
- **Worktree cleanup + generated registrants (session 35, binding):** `git worktree remove --force` is safe post-merge when only generated artifacts remain. Revert generated plugin-registrants before every commit. Root cause of EPERM mkdir outage: worktree sprawl + committed generated registrants → path conflicts.
- **Test/Inspect/Automate workstream opened (session 35):** current state = CUSTOM CODE; record/collect/create/export-PLAN built; OAuth + live push + execution NOT wired. Fable architecture rulings: bookmarklet MVP (cross-origin) + same-origin overlay for `/123`; OAuth via Firebase callable proxies (CODEX Provider Rules); generated tests write via `github-qabot`; execution = trigger user CI + report in-app. Test agent = AUDIT/SPEC-first; worktree `rand0m-test`; file-disjoint from Earth. Build only after Fable + owner ratify.
- **Donation button scoped (session 35):** Earth View top-left (fold into Ocean pass) + Design non-Earth surfaces + public READMORE README/CONTRIBUTING; single-sourced from About buymeacoffee link.
- **Deploy-integrity bug FIXED (session 34):** workflow 90 "success" was returning while serving stale assets — `Last-Modified` did not advance and version markers were absent in the live response. Fix shipped. **Verify-delivery is now a required release step (binding):** after every production release, confirm `Last-Modified` advances + markers present. Agents emit `FIXES:` callout if delivery cannot be confirmed; checkpoint rows do not close without a delivery verification record.
- **POST-LAUNCH serialization (session 34, binding):** PASS A → PASS B → PASS C are strictly serialized on a single lineage. No parallel Earth-page edits — divergence = merge conflict + lost work. Each PASS must be gate-passed and merged before the next opens. Painter-removal decision: kept as invisible failure-only fallback per Fable rec; owner may revisit later.
- **PASS A/B/C scope ratified (session 34):** (A) Earth globe-lifecycle — IndexedStack keep-alive + Cesium viewer persistence + Addendum C state + painter = failure-only fallback; (B) Design globe-chrome — context block→bottom-right, top-right = score + label + estimation only, remove breakdown/chips/counts, remove broken rotate toggle, keep drag-hint; (C) Design Data View redesign — 3 sections (Overview/Layers/Data Sources), 4-question content contract, remove ALL dev telemetry + staged data, real data only. Data View redesign spec persisted at `READMORE/architecture/earth/data-view-redesign-spec.md`.
- **Major reconciliation (this session):** R10 shipped — `bde2a28` live on `rand0m.ai`; ★ NULLSCHOOL MILESTONE confirmed. Spec path corrected everywhere: `READMORE/architecture/earth/` (was `READLESS/internal/architecture/`). POST-LAUNCH track opened: (a) flow-field rendering, (b) globe-state persistence, (c) country-outline boundaries, (d) Chrome-extension polish. Channels noted: iteration deploys to prod (owner-locked); workflow 80 staging available. Agent Roster stale notes cleared.
- **R10 DEPLOYED (P4 release dispatched):** `bde2a28`. CesiumJS V2.16 vendored + activated; P1–P4 nullschool chrome; density + countries + all data verticals live. ★ NULLSCHOOL MILESTONE. `origin/main` = `bde2a28`.
- **R9 DEPLOYED (session 32):** `d5ba6c1`, Production Release `27436691750`. D6 verdicts + attribution corrections + Cesium token infrastructure + flow-field wiring live. Note: R9 deployed CustomPainter globe — Cesium bundle absent (corrected session 33). `origin/main` = `d5ba6c1`. Visual review carried forward to R10 FINAL (8 items).
- **Density WIP salvage SUCCEEDED (session 32):** `earth/data-human-activity-density` branch is on remote. Slip=1 erased — C11 completes the vertical. No restart required; Earth agent pulls and resumes from WIP.
- **HARD BLOCKER RESOLVED (session 32):** `RANDOM_CESIUM_ION_API_KEY` was set in root `.env` AND as a GitHub Actions secret. Note: deployed env var name is `RANDOM_CESIUM_ION_API_KEY` (API key naming convention), not `RANDOM_CESIUM_ION_TOKEN` as originally specified. env-contract-notes.md updated with actual deployed name.
- **R10 FINAL declared (session 32):** Tier 2 density completion + Tier 1 motion cues (IA §7) + @scient1st globe-context + perf hardening verdict → R10 FINAL release + final review. C12 on plan.
- **Launch checklist established (session 32):** (a) READMORE publishes via `abc` repo (purpose expanded; CODEX.md line update queued; history-review or fresh-seed required pre-flip). (b) `.github` private permanently. (c) All repos private (owner-confirmed). (d) Codex T13 reorg awaiting owner ratification. (e) T14 held for launch. See Launch Checklist section.
- **C10 gates all passed (session 30):** Cesium slice 3 `b826abb` (wind+ocean flow fields) ✓; attribution corrections `79d9295` ✓; D6 `8c6857d` ✓ (schematic deleted; preview pair quarantined — T5 evidence pointer confirms preview-only scope; motion suite RETAINED per human-activity governance amendment).
- **Density vertical slip=1 (session 30):** Earth session died mid-slice with local WIP never pushed to remote. `earth/data-human-activity-density` had no remote commits. Density moved to R10; WIP salvage step added to C11 command. Salvage succeeded in session 32 — branch on remote.
- **R9 bundle FINAL declared (session 30):** D6 → attribution corrections → cesium-runtime-base (slices 1–3) + Production Release workflow token injection. No density in R9. Gate: HARD BLOCKER (token both places) + Fable gate + owner approval — all resolved by session 32.
- **HARD BLOCKER escalation (session 30, third ask):** `RANDOM_CESIUM_ION_TOKEN` first flagged session 27 (root `.env` only). Session 28: second ask. Session 30 escalation: production CI builds run in GitHub Actions and do not read the local root `.env` file. Resolved session 32.
- **R10 FINAL scope defined (session 30):** Tier 2 density vertical (restart/salvage from dead session) + Tier 1 symbolic motion cues (RETAINED GLOBE INVENTORY) + @scient1st globe-context wiring + hardening → R10 FINAL release + owner final review.
- **Owner open items (session 30):** (a) Set token in root `.env` AND as GitHub Actions secret — RESOLVED session 32. (b) R8 owner review #2 verdict PENDING — folded into combined R8+R9 review (7 items). (c) Approve R9 release — DONE session 32.
- **R8 DEPLOYED (session 28):** `e1e49c7`, Production Release `27432166050`. D7 nullschool shell + D8 chart vocabulary + chart-series + scroll-helper live. `origin/main` = `e1e49c7`. Owner review #2 verdict PENDING (post-deploy, ≤5 viewport/chart items).
- **Cesium slice 2 gate-passed exemplary (session 28):** browser bridge, vendored CesiumJS (`web/cesium/` + `VENDOR.md`), env-injected token, `KNIGHTS_CESIUM_ION_API_KEY` reserved fallback mirroring the weather provider pattern. Merge discipline: main-merged-into-branch (§20 followed). Token pattern documented in [`internal/architecture/env-contract-notes.md`](internal/architecture/env-contract-notes.md). Full env-injection approach: `RANDOM_CESIUM_ION_TOKEN` in root `.env`; fallback produces graceful CustomPainter globe, not a crash.
- **BLOCKER — RANDOM_CESIUM_ION_TOKEN unset (sessions 27–28, second ask):** Ion token has not been set in root `.env`. R9 nullschool deliverable falls back to CustomPainter globe until owner sets it. Owner must provide a domain-restricted scoped Cesium Ion token. Do not mark R9 ready without confirming token is present.
- **Earth-agent session replaced (session 28):** session memory replaced; protocol held. Fresh Earth agent resumes from the agent command template + `git log origin/main` check. No state loss — all work is in git.
- **R9 bundle declared (session 28):** Cesium slices 2+3 + Tier 2 density (guard-gate pass required) + D6 verdicts pass (motion suite RETAINED) → R9 nullschool release. Owner visual review #3 post-deploy (globe-specific, nullschool). Gate: Ion token set + all C10 work complete + Fable gate.
- **D6 verdicts reinstated as C10 scoped cleanup (session 28):** D6 was SUPERSEDED by IA v2 (session 25). Reinstated as a scoped verdicts pass — not a wholesale deletion sprint. Motion suite RETAINED per human-activity governance amendment. Design agent runs deletion verdicts only; no globe geometry files removed without Earth agent confirmation.
- **C10 in flight (session 28):** Cesium slice 3 flow fields (Earth); Tier 2 density vertical guard-first (Earth — Fable spec required per vertical); D6 verdicts pass scoped (Design). All three land in R9 bundle.
- **Release split — R8/R9/R10 (sessions 26–27, owner directive):** prior R8 (globe review) split into three releases. R8 = UI consolidation (D7+D8+chart-series+scroll-helper+CustomPainter globe; owner review #2 ≤5 viewport/chart items post-deploy). R9 = Cesium boot + flow fields (nullschool release; own visual review). R10 FINAL = Tier 2 density + @scient1st globe-context + hardening. Same end goal; same end date. Cycle table updated.
- **Cesium-runtime-base slice 1 gate-passed `760c51a` (session 27):** governance core only — Cesium selection model, runtime abstraction, and fallback path. NO browser bridge in this slice; slice 2 (browser bridge) required before renderer swap. Ion token not yet set — owner action required (RANDOM_CESIUM_ION_TOKEN in root .env, domain-restricted scoped token).
- **D8 gate-passed `e35a31d` (sessions 26–27):** Data View chart vocabulary — donut/funnel/radar bound to real EarthChartProvisioning series; streamgraph/treemap/scatter-bubble dropped (no real backing data). SECOND copy-instead-of-merge incident (byte-identical, benign — D8 branch picked up chart-series files; dedupes at merge). §20 standard amended — see coordination-standards §20.
- **D7 gate-passed (C8):** Earth View nullschool mode — no-scroll viewport-fit; globe hero; score gauge TOP-RIGHT; stacked proportional row; time-scrubber histogram; pill BOTTOM-LEFT persistent. Pending R8 merge by Earth.
- **BE chart-series gate-passed `33db79b` (C8):** `earth/chart-series-provisioning` — gap-aware EarthChartSeries/EarthChartRadar/EarthChartProvisioning series objects for D8. Pending R8 merge by Earth.
- **§20 standard amended — explicit merge step in commands (sessions 26–27):** D8 = second copy-instead-of-merge incident (first: Connect S5, session 23). Amendment: any agent command or HANDOFF that has an unmerged-branch dependency must name the explicit merge step (`git merge origin/<branch>`) inline in the command. It is not sufficient to assume the receiving agent will discover the dependency. Codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §20.
- **Owner action items (session 27):** (a) Set `RANDOM_CESIUM_ION_TOKEN` (domain-restricted scoped Ion token) in root `.env` — required before Cesium renderer swap starts. (b) Approve R8 release. (c) Perform owner review #2 post-R8-deploy (≤5 viewport/chart items).
- **IA v2 — D7 + D8 (session 25, owner directive):** D6 deletion-pass superseded. D7 = Earth View nullschool mode (no-scroll viewport-fit; globe hero; gauge TOP-RIGHT filter-reactive; stacked proportional row; interactive time-scrubber histogram; pill BOTTOM-LEFT persistent while sheet open; reference mocks = inspiration only). D8 = Data View chart vocabulary (donut/rings, radar, streamgraph, treemap, scatter/bubble, funnel; binding rule: every chart binds to real model series — synthetic data prohibited; BE provisions gap-aware series).
- **Cycle table updated for IA v2 (session 25):** C8 = D7 + BE chart-series + Cesium data groundwork; C9 = Cesium renderer swap into D7 shell + D8 + Tier 2 density vertical; C10 = motion cues + region-tap + @scient1st globe-context → R8. Codex T3 fixtures banked in C8.
- **Fable ruling pending — Cesium Ion token handling (session 25):** required before C9 Cesium renderer swap. Do not implement Cesium Ion integration without ruling on record. Fable to deliver ruling before C9 opens.
- **Authenticated/visual smoke — owner-performed (§17, binding):** authenticated smoke and visual verification of `rand0m.ai` is performed by the **owner personally**. Agents perform HTTP-level smoke only. Checkpoint HANDOFFs close with an owner visual checklist (not agent-executed). Checkpoints are not marked visually verified until the owner confirms. No browser automation, no Claude-in-Chrome for smoke. Codified in coordination standards §17.
- **Protected-areas — Fable ruling (session 16):** `wdpa-protected-area-summary` catalog availability = metadata-source axis only. `earth_protected_area_integrity` stays `insufficientEvidence` — integrity is a separate axis and is not unified with availability. Do not conflate. License constraint: WDPA data is non-commercial/no-redistribution; enforce at the catalog layer.
- **`connect-card-overflow-fix` (session 16):** 0.118px RenderFlex on `connect_source_card.dart:88` broke `validate-earth-fast` green on every run. Fixed and merged at `3ab6786`. This was a known recurring CI noise issue — record as resolved.
- **VCM approved (session 16):** owner-approved VCM / Carbon-offset data vertical. Assigned to Systems agent. Queued after biodiversity Environmental slice lands. Do not start VCM implementation until biodiversity is deployed (sequencing constraint — same Systems worktree, avoid parallel vertical work).
- **Entities approved (session 16):** owner-approved Entities domain. Assigned to Connect agent. Started this cycle — prerequisite (Connect source intake pipeline `c2-0`) now at `3ab6786`. `c2-0` branch kept open per owner until Entities stacking decision is confirmed.
- **F1.0 favicon:** owner-APPROVED (session 17). Merging this cycle alongside biodiversity. Production Release pre-approved.
- **Future-infra queue — GFW near-real-time forest alerts:** GFW live forest alerts are technically feasible via a Firebase callable proxy following the FIRMS pattern. A new callable is required. This is an approved concept placed in the infra queue — do not implement without an explicit approved infra slice directive from the owner.
- **Future-infra queue — remote-config budget + kill switch:** runtime kill switch and remote-config-backed budget for `sessionTokenBudget`/`maxPromptTokens` are approved in concept. Do not implement without explicit instruction (separate approved phase required).
- **Branch disjointness checks:** always use three-dot diff (`git diff main...branch`), never two-dot (`git diff main..branch`). Two-dot includes main drift in the diff and produces false-alarm conflicts. This occurred in session 12 and is now codified in coordination standards §13.
- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the live-AI path requires a code change, rebuild, and Production Release — not a runtime toggle. Live answers cost real tokens via the Default AI Provider through `generateAIResponse` Firebase callable.
- **`sessionTokenBudget=50000` / `maxPromptTokens=12000` are compile-time in-memory soft guards.** They reset on app relaunch and do not hard-cap Firebase Function invocations. Owner-accepted at this checkpoint. Future infra queue: remote-config budget + runtime kill switch (separate approved phase required — do not implement without explicit instruction).
- **F1.0 Dynamic Web Favicon containment (Fixes agent, owner-sanctioned exception):** `feature/f1-0-*` branch holds the favicon feature. It is an approved exception to the Earth-only lockdown. Merge order is enforced: `feature/f1-0-*` merges to main **only after** the `earth/scientist-session-continuity` checkpoint deploy is confirmed. Do not `git checkout` or `git switch` to `feature/f1-0-*` in the shared `apps/rand0m` clone while Earth's merge or deploy is pending.
- **Ocean-currents catalog status:** remains `research` despite live-loader card wiring. Card surfaces the layer; underlying data feed is not live. Intentional — matches air-quality health-neutral, card-only pattern.

---

## Open Branches

_Rows reflect current remote branches confirmed by Fable gate or `git log origin/main`. All stale/never-existed rows removed (T10 audit, session 29). **Rule: Open Branches updates come from Fable gate confirmations only — same standard as Deploy Checkpoint rows.** Codified in coordination standards §2._

_Rebuilt session 42 from git + Fixes-verified state. qa-kitt/.github: 2 branches (main + readless-readmore-reorg). xyz: `origin/main` = `5ce9513`. 8-layer slices 1–5 + OSCAR + refreshers + enforce-flip staged + mini-player all on main. Open Branches corrections applied (session 42): design-dataview-scenario and chore/idle-spin-test are NOT merged._

| Branch | Repo | Status | Notes |
| --- | --- | --- | --- |
| `readless-readmore-reorg` | qa-kitt/.github | Active — Docs branch | All READLESS/READMORE updates; session 42 changes uncommitted until this session commits |
| `earth/anim-bugfix` | xyz | In flight | Ocean animation regression + view-switch ghost trails; open bugs |
| `earth/filter-ux-v2` | xyz | In flight | Outside-click-close + remove All-Layers + random default + disable inactive; record SHA when merged |
| mini-player worktree | xyz | In flight — active worktree | `4333563` merged; handoff follow-up ongoing; worktree active |
| `geo-mask-asset` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `geo-enforce` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `disclosure-safeguards` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `public-ui-polish` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `aieds-whitepaper` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `test-public-entitlement` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `byok` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `backstop` | xyz | ✅ Merged — deletable | Merged in P3 (`8022265`); Fixes agent to delete |
| `test-external-tools` | xyz | ✅ Merged — deletable | Merged at `b7f9849` (C16); Fixes agent to delete |
| `test-t7-submit` | xyz | ✅ Merged — deletable | Merged at `b7f9849` (C16); Fixes agent to delete |
| `design-dataview-v2` | xyz | ✅ Merged — deletable | Merged at `b7f9849` (C16); Fixes agent to delete |
| `design-dataview-scenario` | xyz | ⚠ **NOT merged** — unmerged; superseded in intent | `c1f5844` is NOT an ancestor of `origin/main` (Fixes-verified session 42). Do NOT delete without owner confirm. |
| `chore/idle-spin-test` | xyz | ⚠ **NOT merged** — owner decision required | `9fc16ef` is NOT merged into `origin/main` (Fixes-verified session 42). Do NOT delete without owner confirm. |

⚠ **Orphan worktree dirs (Windows handle locks):** `rand0m-dvmerge` + `rand0m-mainmerge` — cannot remove via git; manual `rm -rf` required by owner after confirming no process holds them.

_xyz remaining unmerged branches: low-priority; not blocking. Earth agent to enumerate with `git branch -r` on xyz and triage. Do not delete without owner review._

---

## Launch Checklist

_Updated session 40 for public-launch sprint. Go/no-go detail: [`internal/architecture/public-launch-readiness.md`](internal/architecture/public-launch-readiness.md)._

| Item | Status | Notes |
| --- | --- | --- |
| **P3 bundle wf90 deploy** | ⏳ **PENDING owner** | `RECAPTCHA_V3_SITE_KEY` Actions var required first. Owner triggers wf90; byte-hash delivery confirms. Report SHA to Fable. |
| **P3 functions deploy** | ⏳ **PENDING owner** | `firebase deploy --only functions:...` after `git pull`. Owner confirms. |
| **`RECAPTCHA_V3_SITE_KEY` Actions var** | ⏳ **PENDING owner** | Must be set in `random-knights/xyz` Actions secrets before wf90 run. |
| **App Check MONITORING mode** | ⏳ Confirm post-deploy | Confirm active after functions deploy. Monitoring period before enforce-flip. |
| **App Check enforce-flip** | ⏳ **DEFERRED — 2nd deploy** | Post-monitoring. RC flip + functions redeploy. Owner + Earth agent. |
| **Pro/managed server tier-read** | ⏳ **DEFERRED — 2nd deploy** | Same event as enforce-flip. Earth agent slice required. |
| **P0 — callable gate mismatch fix** | ⛔ **Fix before public callable access** | Callables must honour entitlement check (not domain-only) at public-flip. Test agent owns. Until fixed: callable features inaccessible to public non-domain users. |
| **P0 — repo-123 infra leak** | ⛔ **Fix before callable features** | `/123` must not appear in client bundles or error payloads. |
| **Owner device-pass (public-flip)** | ⏳ **PENDING** | Sign-in as non-domain Google account ✓; Disclosure Safeguards visible ✓; entitlement checks ✓. |
| **Fable legal sign-off** | ⏳ **PENDING** | Post device-pass. Fable owns go/no-go. |
| **PUBLIC SITE-FLIP** | ⛔ **FINAL gate** | All above must be ✅. Owner executes. |
| **LEGAL-SAFEGUARDS AUDIT** | ✅ **RESOLVED (session 40)** | Disclosure Safeguards Standard (5 safeguards) shipped in P3. Owner device-pass pending. See [`internal/architecture/disclosure-safeguards-standard.md`](internal/architecture/disclosure-safeguards-standard.md). |
| **T7 — GitHub App / token for /123** | ✅ **LIVE (`b7f9849`)** | `GITHUB_APP_ID`/`INSTALLATION_ID`/`PRIVATE_KEY` Path B wired into `githubProxy` callable. |
| **Auth domain restriction (ADR 0004)** | ✅ **Decided** | Public = any Google sign-in. `@rand0m.ai`-only lifted at site-flip. See [`internal/decisions/0004-auth-domain-restrictions.md`](internal/decisions/0004-auth-domain-restrictions.md). |
| READMORE publishes via `abc` repo | ⚠ **Pre-flip required** | Purpose expanded. CODEX.md line update queued. History-review or fresh-seed required. Owner to confirm readiness. |
| abc READMORE public-launch seeding | ⚠ **Pre-flip required** | History-review or fresh-seed required; CODEX.md line update queued. |
| `.github` repo visibility | ✓ **Private permanently** | Owner-confirmed. Not a launch blocker. |
| All repos private | ✓ **Owner-confirmed** | All `random-knights/*` repos private. |
| Codex T13 reorg | ✓ **Merged** (`6886c25`) | READLESS reorganized: active specs → `internal/architecture/`; archive → `archive/architecture/`; standards → `internal/automation/`. |
| Codex T14 | ⏳ **Held for launch** | Launch-gated. Do not execute before public launch. |
| Owner gate device-pass (beta external-access) | ✅ **DONE (session 37)** | Allowlisted ✓ / non-allowlisted blocked ✓ / domain ✓. (Beta device-pass. Public-flip device-pass is a separate item above.) |

---

## Archive (Historical Notes)

_Architecture notes in [`READLESS/archive/architecture/`](archive/architecture/) with no active inbound links are **retained history** — not orphans to delete. T10 audit (session 29) identified these files as informational/reference only; they document completed phases and decisions made before the current roadmap. Active spec files now live under [`READLESS/internal/architecture/`](internal/architecture/) (T13 reorg, `6886c25`). Do not delete archive files. If a file needs to be referenced again, link it from a Pivot entry._

---

## Pending Owner Approval

_Items that require an explicit owner decision before any agent proceeds._

**1. Scenario-engine ↔ @scient1st integration (pre-spec)**
A pre-spec is proposed for wiring the Earth scenario engine into @scient1st
response generation — scenarios inform context, @scient1st surfaces results.
No implementation scope, timeline, or agent assignment is approved yet.
Requires owner sign-off on: scope boundaries, whether scenario engine changes
are in-scope for the next Earth phase, and which agent owns the work.

**2. Connect-agent staffing** ✓ **— approved and active.** Connect agent on `feature/c2-0-source-onboarding-pipeline` (`worktrees\rand0m-connect`). Slices 3–4 in progress.

**3. Earth-Systems vertical** ✓ **— COMPLETE and deployed.** Ocean live feed + registration live at `14d422f`. Systems agent ready for rollover.

**4. Systems-agent rollover to Environmental vertical** ✓ **— approved by owner command (session 13).** Audit underway; findings due this cycle via `DOCS:` callout. No implementation until audit findings are ratified. Per §15: owner issuing the command is the approval; no roadmap re-gate required.

**5. VCM / Carbon-offset** ✓ **— OWNER-APPROVED (session 16).** Assigned to Systems agent. Queued after biodiversity Environmental slice is deployed. Per sequencing constraint: do not start until biodiversity lands (same Systems worktree). Governance spec (Fable) to be delivered before catalog registration — no catalog entry without approved spec.

**6. Entities domain** ✓ **— OWNER-APPROVED (session 16).** Assigned to Connect agent. Started this cycle — prerequisite Connect intake pipeline (`c2-0`) at `3ab6786`. Per §16: owner command is the approval; no re-gate required. Fable governance spec to be delivered before catalog registration.

**7. Earth+ pill corner ruling** ✓ **— RESOLVED (session 20).** Owner ruled: BOTTOM-LEFT always. D1 unblocked. Design agent proceeding.

_All items resolved or approved._

---

## Roadmap-vs-Git Ancestry Anomaly

**Status: closed** (session 3 correction; standards codified in [`internal/automation/agent-coordination-standards.md`](internal/automation/agent-coordination-standards.md) §6).

Root cause: roadmap seeded from session memory rather than `git log` / `git merge-base` verification. Standing rule: always verify `origin/main` SHA with `git log -1 origin/main` before recording it. Never copy a SHA from prior-session prose.

---

## Human Continuation Command Templates

Reusable starters for resuming any agent in a new session. Swap `<task>` for the
pinned Next item or a HANDOFF `next:` field.

**Docs agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md — update it and READLESS as needed (sole write owner).
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callout for Earth related development.
Suggest next agent command using same command format.
```

**Earth agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
```

**Fable agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Earth-agent callouts rather than implementing runtime code or merging branches (spec and plan only).
```

**Fixes agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callouts rather than modifying Earth feature files (CI/workflow/hygiene only).
```
