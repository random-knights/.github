# Ecosystem Preservation Audit (X1.0)

**Audit date:** 2026-06-25 · **Mode:** AUDIT ONLY (no runtime changes, no cleanup,
no deploy, no workflow/package/test changes, no secret reads).
**Scope:** `C:\Projects\dev-kitt` (app + packages + tooling + Earth) and
`C:\Projects\qa-kitt` (docs/QA/automation).
**Method:** Read CODEX.md / RUNBOOK.md / READLESS for context, then **verified
every claim against the live tree and `gh`** (branches, workflows, repo
visibility, recent runs). Docs were treated as possibly-stale; where the live
tree disagreed with a doc or session note, the live tree wins and the
discrepancy is flagged.

> Purpose: a single durable map of what this ecosystem *is* and what **must not
> be lost**, so a future agent (or owner) can recover context cold. This is a
> preservation snapshot, not a change plan.

---

## 0. Verification snapshot (ground truth, 2026-06-25)

| Fact | Source verified | Result |
| --- | --- | --- |
| `random-knights/xyz` (app) visibility | `gh repo list random-knights` | **private** |
| All `rk_*`, `abc`, `123`, `xyz-earth`, `.github` repos | `gh repo list` | **private** |
| `random-knights/r1-01` (Rabbit R1 / `apps/rabbit`) | `gh repo list` | **public** |
| `dev-kitt/dev-kitt` (profile/readme repo) | `gh repo list` | **public** |
| Domain validation workflows 01–07 | `gh workflow list -R random-knights/xyz` | active |
| Staging Deploy + Smoke / Production Release / Manual Deploy | `gh workflow list` | active |
| **Flights Relay** + **Boats Relay** | `gh workflow list` | **disabled_manually** |
| Production Release runs today (18:27, 19:20) | `gh run list` | **both FAILED** |
| Staging Deploy + Smoke today | `gh run list` | green |
| Score `METHODOLOGY_VERSION` | `earthHealthScore.ts:74` | **"0.6"**, 9 domains |
| app working tree | `git status` apps/rand0m | clean |
| qa-kitt `.github` working tree / branch | `git status` | clean / `readless-readmore-reorg` |

---

## 1. Repository map

### GitHub org: `random-knights` (owner/admin `xyz-admin`, knight@rand0m.ai)

| Repo | Visibility | Local path | Branch (live) | Role |
| --- | --- | --- | --- | --- |
| `random-knights/xyz` | private | `dev-kitt/apps/rand0m` | `main` | **Primary Flutter app** (rand0m.ai) |
| `random-knights/r1-01` | **public** | `dev-kitt/apps/rabbit` | — | "0RAC1ES – Rabbit R1 Creation" (new, public) |
| `random-knights/xyz-earth` | private | (worker/research) | — | "rand0m1y researching earth" – Earth worker/research |
| `random-knights/rk_core` | private | `dev-kitt/packages/rk_core` | `main` | shared core |
| `random-knights/rk_data` | private | `packages/rk_data` | `main` | data contracts |
| `random-knights/rk_media` | private | `packages/rk_media` | `main` | media abstractions |
| `random-knights/rk_agents` | private | `packages/rk_agents` | **`feature/agent-tier-kind`** | agent contracts |
| `random-knights/rk_ai` | private | `packages/rk_ai` | `main` | AI/provider contracts |
| `random-knights/rk_branding` | private | `packages/rk_branding` | `main` | branding/icons |
| `random-knights/rk_ui` | private | `packages/rk_ui` | `main` | shared shell/components |
| `random-knights/.github` | private | `qa-kitt/.github` | `readless-readmore-reorg` | **READLESS/READMORE docs** |
| `random-knights/abc` | private | `qa-kitt/abc` | `docs/public-readiness-cleanup` | classroom / experiments |
| `random-knights/123` | private | `qa-kitt/123` | `docs/public-requests-scaffold` | automation testing repo |
| `qa-kitt/qa-kitt` | — | `qa-kitt/qa-kitt` | `main` | QA profile/landing |

**Identity model (CODEX-governed):** dev-kitt app/package work → SSH alias
`github-devbot` (Codex) / `github-devkitt` (human), repo identity `deve10per` /
`developer`. qa-kitt docs → `github-qakitt`, identity `eng1neer` / `engineer`.
Generated-test writes to `123` → `github-qabot`. CI private-package reads →
`RK_PACKAGE_READ_SSH_KEY` Actions secret only (never a local identity). The
org-admin `xyz-admin` is reserved for billing/settings/branch-protection — never
routine commits.

### Local workspace shape (`C:\Projects\dev-kitt`, root repo is **local-only**, no remote)

```
dev-kitt/
  CODEX.md  RUNBOOK.md              # governance + ops runbook (the only docs allowed here)
  .env  .env.example               # canonical ecosystem env contract (RANDOM_* active, KNIGHTS_* reserved)
  firebase.json  .firebaserc       # tracked; manual hosting:rand0m deploy convenience (locally MODIFIED — see §10)
  apps/rand0m/                     # the app (repo random-knights/xyz)
  apps/rabbit/                     # Rabbit R1 app (repo r1-01, public)
  apps/worktrees/                  # app worktrees
  packages/rk_*/                   # 7 package repos
  tooling/scripts/                 # validate-*.ps1, analyze-all, pub-get-all, status-app-repos + earth/ pipeline (8 ps1)
  tooling/data/                    # (untracked) Earth ingest data
  staged-render/                   # REND3R.bat + ffmpeg/ffplay/ffprobe (video render staging)
  earth2d-handoff/                 # (untracked) INTEGRATION.md, methodology review, lib/web — see §9
  flutter/                         # vendored Flutter SDK checkout
  worktrees/                       # ~dozens of rand0m-* git worktrees (drives the 249 branches)
  dev-kitt/                        # profile content (README, assets)
```

---

## 2. Major systems

1. **Rand0m app (`apps/rand0m`)** — single Flutter web app at rand0m.ai. 442 Dart
   files under `lib/` (`config`, `env`, `models`, `pages`, `services`, `theme`,
   `widgets` + `main.dart`). The retired four-app model (rand0m/knight1y/out1ine/
   up10ad) is **gone**; those are now pages/routes inside the one app. Legacy IDs
   survive only as package compatibility metadata.
2. **Firebase Functions (`apps/rand0m/functions`)** — TypeScript callables +
   scheduled Earth data refreshers. Core callables: `generateAIResponse`,
   `runPageSpeedAudit`, `scanContentUrl`, `runAgentActionPreview`, plus
   `getWeather` (OpenWeatherMap proxy). Earth data pipeline:
   `earthHealthScore`, `earthGfsScalar` (CAPE/Misery-Index), `earthScalarGrid`,
   `earthSeaSurfaceTemp`, `earthOceanOscar`, `earthAirQuality`, `earthAragonite`,
   `earthCarbon`, `earthForest`, `earthWildfire`, `earthHumanDensity`,
   `earthProtectedAreas`, `earthVcm`, `earthTreeTime`, `earthPointSet`, and the
   large renderer/wildfire **session contracts**.
3. **Earth domain** — the only active development surface ("Earth-Only Lockdown").
   See §7.
4. **Connect domain** — source registry / provider-source management / the
   connection globe of source icons. Distinct from the Earth workstation globe;
   they share the `c0nnect` entry point but must stay separate domains.
5. **Agents** — system agents `rand0m`, `dai1y`, `knight1y`, `aut0mate`; future
   `temp1ate`, `va1idat0r` (not integrated). Singleton active-favorite agent.
6. **Provider/AI** — multi-provider-first chat; default provider controls only
   fallback/focused-pane/new single-provider interactions. BYOK direction
   (decision 0006). Account-scoped ownership; no credential exchange / shared
   global keys without explicit scope.
7. **Packages (`rk_*`)** — 7 shared package repos; app-local implementation is
   preferred until patterns prove stable.
8. **QA/docs ecosystem (`qa-kitt`)** — READLESS (internal) + READMORE (curated)
   doc trees, the `abc` classroom repo, and the `123` automation-test repo. See §11.
9. **Earth tooling/relays** — GitHub Actions mobility relays (Flights/Boats) and
   PowerShell Earth ingest scripts in `tooling/scripts/earth`.

---

## 3. Key files (highest-value / largest)

**App (Dart):**
- `lib/main.dart` — app entry/config.
- `lib/pages/earth/earth_tab.dart` (~75 KB) and
  `lib/pages/earth/earth_data_workspaces.dart` (~88 KB) — **the two largest page
  files**; both well over CODEX's 2000-line architecture-review threshold and are
  page-as-accumulation-point risks (see §8).
- `lib/services/earth/earth_source_governance_catalog.dart` (~83 KB),
  `earth_source_layer_catalog.dart` (~77 KB),
  `earth_source_metadata_catalog.dart` (~53 KB),
  `earth_country_registry.dart` (~42 KB) — Earth source/governance registries
  (catalog-style; partly mechanical but very large).
- `lib/models/earth/earth_layer_snapshot.dart` (~53 KB),
  `earth_globe_preview.dart` (~52 KB), `earth_globe_overlay_bridge.dart` (~51 KB),
  `earth_vision_pipeline.dart` (~48 KB), `earth_verification.dart` (~46 KB),
  `earth_renderer_data_layer.dart` (~44 KB).
- `lib/widgets/earth/earth_sphere_filter_panel.dart`,
  `earth_workstation_shell.dart`, `earth_cesium_globe_view.dart` — the
  nullschool-style 2D shell + the (being-retired) Cesium globe view.

**Functions (TS):**
- `functions/src/earthHealthScore.ts` (~65 KB) — **Planet Health Score engine,
  methodology v0.6, 9 domains** (see §6.4).
- `functions/src/index.ts` — callable entrypoints + Cloud Storage writers (score
  doc, history, grids) with cache-control policy.
- `functions/src/earthRendererSessionContract.ts` (~94 KB) +
  `earthWildfireSnapshotContract*.ts` — renderer/data session contracts (large;
  heavily test-backed).

**Governance/contract docs:** `CODEX.md` (execution law), `RUNBOOK.md` (ops),
`READLESS/EARTH-ROADMAP.md` (Earth north-star, owner-maintained — read-only for
agents), and the READLESS/READMORE architecture set (§11).

---

## 4. Workflows & CI/CD (verified via `gh workflow list` + `gh run list`)

`apps/rand0m/.github/workflows/` (files): `01-earth-validation` …
`07-more-validation`, `80-test-deploy-smoke`, `90-production-release`,
`99-manual-deploy`, `boats-relay`, `flights-relay`. `gh` also registers an
**OpenSky Reachability Probe** (active).

| Workflow | State | Role |
| --- | --- | --- |
| 01–07 domain validation | active | Path-filtered, scoped tests per domain (Earth, Agents, AI, Automate/Test-Inspect, Oracle, Core, More). **Validate-only, never deploy.** Run on PRs, feature/chore pushes, and matching `main` pushes. |
| 80 Staging Deploy + Smoke | active, **green today** | Manual; builds web, deploys `hosting:staging` → **DEFAULT site `randomknights-xyz`, stable URL `https://randomknights-xyz.web.app`** (no per-run channel/hash), HTTP smoke. Must never touch prod. |
| 90 Production Release | active, **FAILED ×2 today** | `workflow_dispatch` only; release smoke → build → deploy `hosting:rand0m` → site `ai-rand0m` (`https://ai-rand0m.web.app` + `https://rand0m.ai`). Pushing to `main` must NOT auto-deploy. |
| 99 Manual Deploy | active | Emergency only; `workflow_dispatch`, `main`-restricted, confirmation-gated, `production` environment. |
| Flights Relay (OpenSky → bucket) | **disabled_manually** | Was `*/15` cron; failing on OpenSky outage (see §6.5). |
| Boats Relay (GFW → bucket) | **disabled_manually** | Global Fishing Watch aggregated effort; identity-stripped before write. |
| OpenSky Reachability Probe | active | Diagnostic probe (GH Azure runners reach OpenSky; GCP IPs were dropped). |

**Production Release is currently RED.** Two distinct failure modes today:
- Run `28191716897` (18:27): **release-smoke test failure** (1 test failed) —
  blocked before deploy.
- Run `28194777403` (19:20): **"Deploy Rand0m production hosting" step failed**
  (exit 1) — the SA-token / deploy-auth path (see §6.1). Staging deploy on the
  same day was green, so the break is specific to the production deploy path.

**Required GitHub secrets:** `FIREBASE_SERVICE_ACCOUNT_RANDOMKNIGHTS_XYZ`,
`RK_PACKAGE_READ_SSH_KEY`, the approved app env keys (`RANDOM_GOOGLEAI_API_KEY`,
`RANDOM_OPENAI_API_KEY`, `RANDOM_CLAUDEAI_API_KEY`, `RANDOM_GROKAI_API_KEY`,
`RANDOM_WEATHER_API_KEY`, `KNIGHTS_WEATHER_API_KEY`, `RANDOM_CESIUM_ION_API_KEY`),
and relay secrets (`OPENSKY_CLIENT_ID/SECRET`, `RANDOM_GFW_API_KEY` +
`KNIGHTS_GFW_API_KEY` fallback). *(Names only — no values read or stored.)*

---

## 5. Deployment & Firebase model

- **Project:** `randomknights-xyz`. **Two hosting sites:**
  - `randomknights-xyz` (DEFAULT site) = **staging/preview**, stable URL
    `https://randomknights-xyz.web.app`, deployed by `hosting:staging` (wf 80).
  - `ai-rand0m` = **production**, `https://ai-rand0m.web.app` + custom domain
    `https://rand0m.ai`, deployed by `hosting:rand0m` (wf 90 / manual).
- **Manual deploy** (root): `firebase deploy --only hosting:rand0m --project
  randomknights-xyz`, then clean `.firebase/` + `firebase-debug.log`.
- **Hosting cache policy (critical):** `index.html`, `flutter_service_worker.js`,
  `flutter_bootstrap.js`, `version.json` served `no-cache, no-store,
  must-revalidate` (decision 0005); hashed assets keep long cache. Without it a
  stale Flutter service worker can serve a broken/old shell for up to an hour.
- **Functions deploy** is separate from hosting and NOT part of Production
  Release; safe only when `functions/.env` holds the full key set.
- **firebase-tools pinned `@15.22.1`** in wf 80/90/99 — `15.22.2` (2026-06-24)
  broke `GOOGLE_APPLICATION_CREDENTIALS`. This pin is load-bearing for deploy auth.

> ⚠️ **Doc inconsistency to reconcile:** CODEX.md's Earth Fast Cycle section
> (≈line 872) and RUNBOOK §"GitHub Actions" still call
> `randomknights-xyz.web.app` a *"protected do-not-touch reference site"*, while
> CODEX's Deployment Rules (≈lines 938–975) **redefine the same site as the
> staging target** that wf 80 deploys. The Deployment Rules / wf 80 behaviour is
> the current truth; the older "protected reference" language is stale and should
> be corrected in both docs.

---

## 6. CAPTURE-SPECIFICALLY findings (each verified)

Legend: ✅ confirmed · ⚠️ corrected / needs reconcile · ❎ now resolved/stale-note · ❓ unconfirmed.

### 6.1 Dead code
- **`_modeScoreLensLayerId`** — ❎ **Not present anywhere in `apps/rand0m`.**
  Already removed; no deletion needed. (The "mode never moves score" concern is
  moot — the identifier is gone.)
- **`EarthNullschool*` / `_Nullschool*` orphans** — ✅ **No orphan classes.** The
  type cleanly renamed to the `EarthSphere` enum and files to `earth_sphere_*`.
  **Residual identifiers remain by inertia/design**, not as orphans:
  - variable/param names `nullschoolMode` / `_nullschoolMode`
    (`earth_sphere_filter_panel.dart`, `earth_tab.dart` — typed `EarthSphere`);
  - **frozen widget keys** `earth-nullschool-filter-panel`,
    `earth-nullschool-slot-*`, `earth-nullschool-source` (test-stability keys —
    treat as frozen, do **not** rename casually);
  - many `nullschool-style/-class/-parity` **design-reference comments** (legit —
    earth.nullschool.net is the design north-star).
  → No cleanup required for correctness; the `*Mode` variable names are a
  cosmetic-only rename candidate, low priority, and keys should stay frozen.

### 6.2 Tests
- **`earth-renderer-readiness-card` "stale prod gate"** — ⚠️ **Reconcile.** The
  live assertion (`test/connect/connect_page_test.dart:2874`) is
  `findsOneWidget` for the readiness card, **paired with** `findsNothing` for
  `earth-data-sources-section` and `findsNothing` for the
  `secret-token-that-must-never-render` string. This reads as an **active
  production-governance / secret-redaction gate** (prod hides raw data sources +
  secrets, shows the readiness card instead) — **not obviously stale**. The
  session note's "= 0" most plausibly refers to the `earth-data-sources-section`
  `findsNothing`. *No change recommended; flag the session note as needing
  reconciliation.*
- **5 local-Windows flakes** (`earth_layer_icons`, `earth_ocean_field`,
  `earth_overview_model`, `earth_region_autorotate`, `version_check`) — ✅ all 5
  test files **exist** (4 under `test/connect/`, `version_check_test.dart` at
  `test/`). CI **Earth Validation runs are green** on recent `main` pushes, which
  supports "local-Windows flake, not a real/CI failure." (Not executed here —
  audit-only.)

### 6.3 Branch debris
- ✅ `ci/deploy-auth-resilience` (the "ci/deploy-aut…" item, in a worktree),
  `ci/deploy-hosting-action` (merged), `app/knight1y-settings` (merged) all
  present. **Dozens of `earth/*` lanes are merged into `main`.**
- ⚠️ **Bigger than noted: `apps/rand0m` has 249 local branches**, many merged
  (e.g. `chore/*`, `app/*`, `codex/*`, `earth/*`). The `worktrees/` dir (~dozens
  of `rand0m-*` checkouts) is the structural driver. Branch + worktree pruning is
  a sizeable, low-risk cleanup (post-verification, owner-approved).

### 6.4 Score reality
- ✅ **`METHODOLOGY_VERSION = "0.6"`** (`earthHealthScore.ts:74`). **9 domains** in
  `DOMAIN_WEIGHTS`: `land-cover` .25, `fire` .20, `air` .15, `ocean` .10,
  `ocean-acidification` .10, `cryosphere` .10, `biodiversity` .10, `conservation`
  .08, **`human` .10 (v0.6 Anthroposphere pressure)**. The `human` weight is
  explicitly **PROVISIONAL — flagged for owner ratification**; totals (1.18)
  renormalize by coverage. Any v0.5 / 8-domain doc is stale.

### 6.5 CI / infra debt
- ✅ **SA-token deploy-auth throttle** — live and biting: Production Release deploy
  step failed today (§4/§6.1). Durable fix = **WIF (deferred)**;
  `ci/deploy-auth-resilience` branch holds in-progress work.
- ✅ **firebase-tools pinned `@15.22.1`** in wf 80/90/99 (15.22.2 broke
  `GOOGLE_APPLICATION_CREDENTIALS`). Directly related to the deploy-auth pain.
- ❎ **Score-doc Cache-Control "item G → 300" is DONE.** The main score object is
  written `public, max-age=300` (`index.ts:3748`, comment "was 1h"). The rolling
  **history** doc intentionally keeps `max-age=3600` (`index.ts:3779`). Session
  note "still long" is now stale.
- ❓ **CAPE/MI GFS retry** — `earthGfsScalar.ts` provides the live CAPE +
  Misery-Index GFS overlays, but **no `retry`/`backoff`/`attempt` logic was found
  in that file.** Either retry lives elsewhere or was never added — **confirm with
  owner** whether retry is expected for the GFS scalar fetch.
- ✅ **Flights-relay PAUSED** — confirmed **disabled_manually**; failing on
  schedule today (OpenSky outage). ⚠️ **Boats Relay is ALSO disabled_manually** —
  both mobility relays are currently paused (note had only flagged flights).

### 6.6 Deferred — DO NOT TOUCH (recorded, not audited)
- Login allowList / `@rand0m.ai`-only gate (decision 0004 auth-domain-restrictions;
  product is private until launch).
- Knight1y Part B.
- Parked-satellites orbital code.

---

## 7. Earth model

- **Source-of-truth flow:** Earth Dashboard → Regional Health Dashboard →
  Narratives → Recommendations → Correlations → Scenario Engine → Planet Health
  Schematic → Globe Preview → Overlay Governance → Provider Matrix. The
  **dashboard is the source of truth**; Globe Preview is secondary/experimental.
- **North-star (ratified, qa-kitt session 48–49):** **retire Cesium → full
  2D-canvas renderer.** Contracts captured in
  `READMORE/architecture/earth/earth-2d-canvas-renderer-contract.md` and
  `earth-renderer-active-architecture.md`. The Cesium globe view
  (`earth_cesium_globe_view.dart`) is on a deprecation path.
- **Governance guardrails (must stay in force):** no unrestricted maps, no
  unrestricted tracking, no live satellite/flight/ship overlays beyond the
  governed aggregated relays, no precise endangered-species exposure, no
  investment framing for carbon-offset (VCM) data. Mobility relays (Flights/Boats)
  ship only identity-stripped, aggregated `earth.pointset.v1` objects.
- **Earth Vision** = tooling/research only; no Flutter-web image processing or raw
  imagery in app runtime without an approved worker/storage phase. The
  `random-knights/xyz-earth` repo is the research/worker lane.
- **Planet Health Score** = methodology v0.6, 9 domains (§6.4); score doc +
  ~400-day history written to the GFS grid bucket.

---

## 8. Code-organization / refactor candidates (per CODEX size guardrails)

CODEX: 500 lines = soft warning, 1000+ = extraction expected, 2000+ = architecture
review, 10000+ = unacceptable. Largest hand-authored runtime files:

- **`pages/earth/earth_data_workspaces.dart` (~88 KB)** and
  **`pages/earth/earth_tab.dart` (~75 KB)** — page files acting as accumulation
  points; the **clearest extraction candidates** (CODEX explicitly warns against
  growing one page file). Extract widgets/sections/view-models first.
- `services/earth/earth_source_governance_catalog.dart` (~83 KB),
  `earth_source_layer_catalog.dart` (~77 KB),
  `earth_source_metadata_catalog.dart` (~53 KB) — very large **catalogs**; mostly
  mechanical data registries (CODEX exempts "generated or narrowly mechanical"),
  so lower urgency, but worth confirming they stay data-only.
- Several `models/earth/*.dart` 44–53 KB — review for extractable sub-models.
- Functions: `earthRendererSessionContract.ts` (~94 KB) and
  `earthHealthScore.ts` (~65 KB) are large but contract-/engine-shaped and
  heavily test-backed; treat as review-on-change, not blind splits.

> Refactors here are **out of scope for this audit** and gated by Earth-Only
> Lockdown + the Code Organization guardrails; listed only as candidates.

---

## 9. Things that must not be lost

1. **`CODEX.md` + `RUNBOOK.md`** (dev-kitt root, **local-only repo, no remote**) —
   the entire execution law + ops runbook live only on this machine. A disk loss
   loses them. Strong candidate for a backup/remote.
2. **`earth2d-handoff/`** (dev-kitt root, **untracked**) — contains
   `INTEGRATION.md`, `REMAINING-WORK-COMMAND-PACKS.md`, and
   **`earth-health-score-methodology-review.md`** (valuable score methodology
   rationale), plus `lib/`/`web/` handoff code. Untracked = at risk.
3. **`tooling/scripts/*.md` operational runbooks** (untracked) — e.g.
   `EARTH-DATA-SCORE-RUNBOOK.md`, `API-KEY-PERSISTENCE-LANE.md`, `CLOSEOUT-PLAN.md`,
   `CONSOLIDATE-AND-DEPLOY.md`, `EARTH-FINISH-AND-SHIP.md`, etc. Real operational
   knowledge, untracked, and in a repo whose policy forbids doc accumulation (see
   §10) — decide keep-vs-migrate-to-READLESS.
4. **`.env` contract** — canonical at `dev-kitt/.env` with the `RANDOM_*` (active)
   / `KNIGHTS_*` (reserved) namespaces. Reserved `KNIGHTS_*` keys must never be
   removed/renamed/relocated. (Values not read.)
5. **READLESS / READMORE doc corpus** (qa-kitt `.github`) — the architecture,
   decision (ADR 0001–0006), and audit history. The only durable record of *why*.
6. **EARTH-ROADMAP.md** — owner-maintained Earth north-star; read-only for agents.
7. **The two hosting-site mapping + cache-control policy** — easy to get wrong;
   decision 0005 + §5 are the canonical record.
8. **firebase-tools `@15.22.1` pin rationale** — losing the "why" risks an upgrade
   that re-breaks deploy auth.

---

## 10. Cleanup candidates (audit-only; nothing changed)

- **Branch + worktree debris:** 249 local app branches; many merged
  (`ci/deploy-hosting-action`, `app/knight1y-settings`, dozens of `earth/*`).
  Prune merged branches + stale `worktrees/rand0m-*` after verification/approval.
- **dev-kitt root dirty/uncommitted (local-only repo):** tracked files
  **modified, not committed** — `firebase.json`, `.firebaserc`, `.env.example`,
  `.vscode/settings.json`, `tooling/scripts/earth/build-wgms-glacier-summary.ps1`.
  ⚠️ **Correction to session note:** `firebase.json` + `.firebaserc` are
  **tracked-but-modified**, *not* "untracked." Genuinely untracked: `.claude/`,
  `.firebase/`, `earth2d-handoff/`, `tooling/data/`, and the `tooling/scripts/*.md`
  runbook pile.
- **Policy drift:** CODEX/RUNBOOK forbid docs/architecture/planning/audit files in
  `dev-kitt`, yet `tooling/scripts/*.md` runbooks accumulate there. Migrate the
  keepers to READLESS or accept them as transient ops scratch.
- **Legacy naming artifacts:** `apps/rand0m/kn1ghts.iml`, `melos_kn1ghts.iml`,
  stray `flutter_01.log` / `flutter_02.log` / `firestore-debug.log` in the app
  root (likely gitignored build noise — verify before removing).
- **Doc reconciliation:** the `randomknights-xyz.web.app` "protected vs staging"
  contradiction (§5); the `earth-renderer-readiness-card` "stale" note (§6.2); the
  score-cache "still long" note now resolved (§6.5).

---

## 11. QA / docs ecosystem (`qa-kitt`)

- **`qa-kitt/.github` (the docs repo)** — on branch **`readless-readmore-reorg`**:
  an in-flight **public/private docs restructure**:
  - **`READLESS/`** = internal raw knowledge base —
    `internal/architecture/` (42 docs, incl. recent `monorepo-cleanup-audit.md`,
    `public-launch-readiness.md`, `earth-nullschool-parity.md`,
    `earth-8-layer-renderer-contracts.md`, `disclosure-safeguards-standard.md`),
    `internal/decisions/` (ADR 0002–0006), `archive/architecture/` (21 retired
    closeouts), `automation/`, the new `internal/preservation/` (off-machine
    backup of the local-only dev-kitt root — see that folder's README), and
    `EARTH-ROADMAP.md`. **This audit lives at
    `internal/architecture/ecosystem-preservation-audit.md`** (peer-audit
    convention).
  - **`READMORE/`** = curated/public-facing mirror —
    `architecture/{earth,ecosystem,packages,aieds}`, `automation/`, `branding/`,
    `decisions/`, and product folders (`rand0m`, `orac1es`, `kn1ghts`, `uti1ity`,
    `_c1assr00m`, `_eng1neer`). Note the **`aieds/`** track (open-standard draft +
    whitepaper) — an emerging "AI-Enabled Design System" standard.
- **`abc`** (classroom/experiments) — `apps/_c1assr00m`, `branding`, `labs`,
  `lessons/` (flutter-analyze, pub-get-and-deps, render-media-composition,
  validate-earth-fast, intro). Workflow `classroom-validation.yml`. Currently on
  `docs/public-readiness-cleanup`.
- **`123`** (automation testing) — `cases`, `cypress/e2e`, `playwright`,
  `features`, `issues`, `execution`, `manifests`, `results`, `artifacts/sample-run`.
  Workflows `generated-test-execution-design.yml`, `manual-generated-tests.yml`,
  `pr-comment-summary.yml`. Generated Playwright/Cypress suites from `apps/rand0m`
  are intended to flow here (via `github-qabot`), never to the app repo.
- **`qa-kitt/qa-kitt`** — QA profile/landing (README + assets), branch `main`.

**Validation scope rule (CODEX):** changes limited to `123`, qa-kitt docs, or
root docs/config that don't affect runtime must **not** run the full Flutter
suite / `flutter build web` / `validate-all.ps1`.

---

## 12. Provider model

- Multi-provider-first chat; Default AI Provider controls **only** fallback /
  focused-pane / new single-provider interactions — it does not disable
  multi-provider chat.
- Providers behind callable proxies / server-side boundaries; **no new provider
  keys directly in Flutter web** without explicit approval.
- Account-scoped ownership; connection records may show status/owner/health and
  future OAuth/subscription readiness, but **must not** exchange credentials, add
  billing, sync raw secrets, or share global keys without scope.
- BYOK direction is captured in decision **0006-byok**; provider contracts in
  `0003-ai-provider-contracts`; the Firebase proxy boundary in `0002-firebase-proxy-layer`.
- Callable error semantics are contractually preserved: `unauthenticated`,
  `permission-denied`, `invalid-argument`, `internal`, `unavailable`. Functions
  must never expose API keys, secrets, raw provider responses, or provider error
  payloads.

---

## 13. Agent model

- **System agents:** `rand0m`, `dai1y`, `knight1y`, `aut0mate`. **Future
  (not integrated):** `temp1ate`, `va1idat0r`.
- **Active favorite agent is a singleton**: favoriting a new agent replaces the
  previous; resolution = active favorite → random enabled system agent → `rand0m`.
  Home flipcard + terminal reflect active agent live.
- Other favorites (chat/agent/oracle/provider/prompt bookmarks) are multi-select
  and discoverability-only — they do not activate selections.
- Agent commands / Home Terminal command execution require an approved command
  architecture phase before implementation (currently seed-only).
- `packages/rk_agents` is on `feature/agent-tier-kind` (agent tier/kind work in
  flight) — the one package not on `main`.

---

## 14. Future docs needed (gaps this audit surfaced)

1. **WIF deploy-auth migration plan** — durable replacement for the SA-token
   throttle that is currently failing Production Release. (Highest-value.)
2. **firebase-tools upgrade-readiness note** — record the 15.22.2
   `GOOGLE_APPLICATION_CREDENTIALS` break + the un-pin criteria.
3. **Mobility relays operational runbook** — Flights/Boats enable/disable,
   OpenSky outage handling, OpenSky Reachability Probe, GFW token, governance
   invariants (identity-stripping). Both relays are currently paused with no
   single source of truth for re-enabling.
4. **Score v0.6 methodology ratification record** — promote the `human`/
   Anthroposphere weight from PROVISIONAL to ratified (or adjust), folding in
   `earth2d-handoff/earth-health-score-methodology-review.md`.
5. **Branch/worktree hygiene policy** — a documented prune cadence given 249
   branches + dozens of worktrees.
6. **dev-kitt root backup/continuity** — CODEX/RUNBOOK/.env live only locally;
   document a backup or local-mirror strategy.
7. **READLESS→READMORE reorg completion note** — the `readless-readmore-reorg`
   branch needs a closeout describing the final public/private taxonomy and what
   moved where.

---

## 15. Risks (ranked)

1. **Production deploy path is RED** (SA-token/deploy-auth; firebase-tools
   sensitivity). Releases are blocked until resolved or WIF lands. *(High)*
2. **Single-machine root repo** — CODEX/RUNBOOK/.env have no remote; disk loss =
   governance loss. *(High)*
3. **Untracked high-value knowledge** (`earth2d-handoff/`, `tooling/scripts/*.md`)
   at risk of loss. *(Medium-High)*
4. **Doc/code drift** — staging "protected vs staging" contradiction, stale
   session notes — risks an agent acting on wrong assumptions. *(Medium)*
5. **Both mobility relays paused** — Earth mobility layers are degraded until
   re-enabled; no runbook. *(Medium)*
6. **Branch/worktree sprawl** (249) — operational friction, accidental wrong-base
   work. *(Low-Medium)*

---

*End of audit. No runtime/code/workflow/package/test changes were made;
no secrets were read. Validation: `git diff --check` clean and secret-pattern
scan clean on this document (key names only, no values).*
