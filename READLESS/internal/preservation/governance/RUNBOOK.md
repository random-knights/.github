# Rand0m Operations Runbook

This is the day-to-day workspace guide for `C:\Projects\dev-kitt`.

Current focus: **Earth** is the primary target; all other pages are on
**lockdown** (don't modify unless explicitly named or required to unblock the
current Earth phase). Feature work follows
spec -> plan -> build -> test -> review -> code-simplify -> ship. Claude and
Codex work in parallel — one owner per surface at a time, rebase before push,
and hand off with the next recommended command. See CODEX.md sections
"Current Focus: Earth-Only Lockdown" and "Parallel Work With Codex".

## Current Shape

- Primary app: `apps/rand0m`
- Canonical app repo:
  - human/manual: `git@github-devkitt:random-knights/xyz.git`
  - Codex/DevBot: `git@github-devbot:random-knights/xyz.git`
- Firebase project: `randomknights-xyz`
- Hosting target/site: `rand0m -> ai-rand0m`
- Production domain: `rand0m.ai`
- Package repos: `packages/rk_core`, `packages/rk_data`, `packages/rk_media`,
  `packages/rk_agents`, `packages/rk_ai`, `packages/rk_branding`,
  `packages/rk_ui`
- Automation testing repo: `random-knights/123`
  - future local clone path: `C:\Projects\qa-kitt\123`
  - generated Playwright/Cypress suites eventually flow here
  - qa-bot writes use `github-qabot` and `eng1neer <eng1neer@rand0m.ai>`
  - dev-bot/dev-kitt should not write to this repo
- `random-knights/abc` remains for classroom/test experiments.
- READLESS architecture source:
  `C:\Projects\qa-kitt\.github\READLESS\architecture`

The root repo owns workspace tooling and lightweight coordination only. App and
package folders are standalone nested Git repos.

The root `C:\Projects\dev-kitt` repo is intentionally local-only unless the
owner explicitly configures a remote. Commit root `CODEX.md`, `RUNBOOK.md`,
tooling, and coordination changes locally, but do not treat the missing root
remote as a failed full-cycle push. Push nested repos only: `apps/rand0m`,
`packages/rk_*`, and qa-kitt repos.

The old four-app ecosystem is retired. Treat `random1y`, `knight1y`,
`uti1ity`, `oracles`, `c0nnect`, `e1evate`, `draw`, `relax`, `vibe`,
`weather`, and `favorites` as pages/routes/features inside `apps/rand0m`.
Package-level app IDs, shell labels, and env prefixes for `knight1y`,
`out1ine`, and `up10ad` are legacy compatibility metadata unless a phase
explicitly authorizes package API changes.

## Git Identity

GitHub organization owner/admin:

- account: `xyz-admin`
- email: `knight@rand0m.ai`
- use: billing, teams, repo settings, branch protection, security policy, and
  emergency recovery
- routine commits should use the dev-kitt or qa-kitt workspace identities, not
  `xyz-admin`

Human/manual dev-kitt work uses the `dev-kitt` GitHub account with the
`github-devkitt` SSH alias. Manual commits may use `developer@rand0m.ai`.

DevBot is not a separate GitHub account. It is the dedicated SSH identity Codex
uses for dev-kitt work on the `dev-kitt` account.

For Codex/agent commits in dev-kitt repos, use repo-local Git identity:

```powershell
git config user.name deve10per
git config user.email deve10per@rand0m.ai
```

Human/manual dev-kitt remotes should use the `github-devkitt` SSH alias:

```text
git@github-devkitt:random-knights/<repo>.git
```

Codex-managed dev-kitt remotes should use the `github-devbot` SSH alias:

```text
git@github-devbot:random-knights/<repo>.git
```

For Codex/agent commits in QA/support repos under `C:\Projects\qa-kitt`, use
the `eng1neer` identity with `eng1neer@rand0m.ai`. For human/manual qa-kitt
commits, `engineer@rand0m.ai` is also a valid account email alias.

Qa-kitt remotes should use the `github-qakitt` SSH alias:

```text
git@github-qakitt:random-knights/<repo>.git
```

Generated automation tests for `random-knights/123` are qa-kitt owned. Future
repo 123 write spikes should use the `github-qabot` SSH alias and repo-local
identity `eng1neer <eng1neer@rand0m.ai>`. Human QA remains on
`github-qakitt` with `engineer <engineer@rand0m.ai>`.

The `github-actions-rk-package-read` key is CI-only. Keep it in the
`RK_PACKAGE_READ_SSH_KEY` Actions secret for `random-knights/xyz` and for any
`rk_*` package repo that needs to read private sibling packages during
validation. Do not use it for local workspace commits, clones, pulls, or
pushes.

## Common Status Checks

```powershell
git status -sb
git -C apps\rand0m status -sb
git -C packages\rk_ui status -sb
git -C packages\rk_media status -sb
```

Root ignores `apps/*` and `packages/*`, so app/package changes must be committed
inside the nested repo that owns them.

## Validation

From `C:\Projects\dev-kitt`:

```powershell
tooling\scripts\validate-all.ps1
```

This validates:

- `apps/rand0m`
- all seven `rk_*` packages
- reusable package generated artifacts are cleaned or restored before the
  script prints final app/package status
- package `.dart_tool/package_config.json` files remain available after cleanup
  so VS Code and `flutter analyze --no-pub` stay healthy

Focused app validation:

```powershell
cd C:\Projects\dev-kitt\apps\rand0m
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test
C:\Projects\dev-kitt\flutter\bin\flutter.bat build web
```

Earth Fast Cycle, for Earth-only iteration:

```powershell
cd C:\Projects\dev-kitt
powershell -ExecutionPolicy Bypass -File C:\Projects\dev-kitt\tooling\scripts\validate-earth-fast.ps1
```

Use Earth Fast Cycle only for changes limited to Earth, Connect/Earth source
registry, Globe Preview, Earth Vision, Earth tests, or Earth READLESS docs. Do
not use it for auth, routing/navigation, Firebase Functions, provider
secrets/env contracts, ownership/security, package APIs, unrelated pages, or
deployment tooling, unless the phase explicitly scopes the Earth Fast workflow.

For ordinary Earth Fast Cycle phases, a green `validate-earth-fast.ps1` result
is enough to commit and push. Do not automatically run full validation or deploy
every Earth phase. Run full validation and deploy only when the owner explicitly
asks, when cross-system code is touched, or at an Earth release checkpoint. A
useful default checkpoint cadence is every 3-5 Earth phases.

Earth GitHub Actions validate `earth/**` branches only. Earth validation does
not deploy. Use the explicit Test Deploy + Smoke workflow when a temporary
deployed test URL is needed.

Code changes require applicable validation. Audit, planning, and doc-only
passes do not run Flutter builds, tests, workspace validation, or deploys.

Speed-mode validation tiers:

- Tier 0: format/analyze/diff hygiene for docs, config, and small edits.
- Tier 1: focused changed-area tests for ordinary feature iteration.
- Tier 2: curated release smoke suite for checkpoints, main merges, and
  pre-deploy confidence. Smoke proves deployability, not feature completeness:
  app boot/config, Home, Random1y/provider selector, Earth load and Earth/Data
  toggle, Connect load, App Info/settings, and critical routing. Domain
  validation owns deep feature correctness.
- Tier 3: full suite, web build, and workspace validation only for release,
  deploy, major refactors, shared-core/security/provider changes, or explicit
  owner requests.

For layout and visual work, prefer browser/manual QA and focused interaction
checks over broad brittle widget-test repair loops. If an obsolete monolithic
widget test fails because the UI intentionally changed, split, narrow, skip, or
quarantine it with a clear TODO and replacement coverage path. Do not weaken
critical tests for auth, provider routing, secrets, billing/cost, data loss,
deploy, or security.

Release smoke should not depend on live networks, provider calls,
timing-sensitive animations, large scroll paths, or domain-specific internals.
If a smoke test repeatedly breaks during unrelated UI changes, replace it with
a smaller boot/routing/load check and keep the deeper assertion in its domain
workflow.

Validation scope guard:

- If a task changes only `C:\Projects\qa-kitt\123`, qa-kitt docs, or root
  docs/config that do not affect app runtime, skip the full Flutter suite,
  `flutter build web`, and `validate-all.ps1` unless explicitly requested.
- For repo 123-only work, use repo status, workflow/static review, package JSON
  syntax checks where useful, and secret-pattern scans. Do not execute generated
  tests unless the phase explicitly asks for execution.
- For mixed app plus repo 123 work, run app validation only when app/runtime
  files changed. Prefer focused tests first; reserve full validation for
  runtime changes, release checkpoints, or explicit owner requests.

## Deployment

Deploy Rand0m hosting only from the workspace root after validation passes:

```powershell
cd C:\Projects\dev-kitt
firebase deploy --only hosting:rand0m --project randomknights-xyz
```

Smoke checks:

```powershell
Invoke-WebRequest -Uri https://ai-rand0m.web.app -UseBasicParsing
Invoke-WebRequest -Uri https://rand0m.ai -UseBasicParsing
```

Post-deploy cleanup:

```powershell
Remove-Item C:\Projects\dev-kitt\firebase-debug.log -ErrorAction SilentlyContinue
Remove-Item C:\Projects\dev-kitt\.firebase -Recurse -Force -ErrorAction SilentlyContinue
```

Hosting cache policy: `index.html`, `flutter_service_worker.js`,
`flutter_bootstrap.js`, and `version.json` are served `no-cache` (see the
`headers` block in `firebase.json` and the Production Release generated config)
so deploys propagate immediately; hashed assets keep long cache. If a browser
shows a stale/broken app right after a deploy (missing nav/shell), the old
Flutter service worker is cached: open in incognito, or DevTools ->
Application -> Service Workers -> Unregister (or Clear site data), then reload.
That is a one-time clear per client after the no-cache fix; future deploys
update automatically.

Firebase Functions deploy is separate from hosting and is not part of Production
Release. The `getWeather` callable (server-side OpenWeatherMap proxy) and the
other callables read keys from `apps/rand0m/functions/.env` (which already holds
the full `RANDOM_*` provider, PageSpeed, FIRMS, and weather key set). Deploy from
the root:

```powershell
cd C:\Projects\dev-kitt
firebase deploy --only functions --project randomknights-xyz
```

The predeploy hook builds the TypeScript. A functions redeploy is safe only when
`functions/.env` holds the full key set (it does); an incomplete `.env` can wipe
production function env. Until functions are deployed, the weather client falls
back to no-key Open-Meteo, so nothing breaks.

Do not expose `.env` values, migrate Functions, delete legacy Firebase projects,
or connect new domains without an explicit phase.

## Routing And Navigation Guardrails

Rand0m web uses path URL strategy. Root `/` maps to the XYZ default landing
experience.

Do not add `/xyz` or `/more`. More is popup-only and must not become a page.
Knight1y must never become the default route, and root landing should not
persist stale hash state such as `#/knight1y`.

Bottom Nav:

```text
About | Random1y | XYZ | Knight1y | More
```

Drawer and More menu AI destinations use lowercase/stylized names:
`random1y`, `uti1ity`, `oracles`, `knight1y`, `c0nnect`, `e1evate`.

## Environment And Firebase Guardrails

The canonical env file is `C:\Projects\dev-kitt\.env`.

- `RANDOM_*` keys are active for rand0m.
- `KNIGHTS_*` keys are reserved and must not be removed, renamed, duplicated,
  or relocated.
- Weather uses `RANDOM_WEATHER_API_KEY` first and may fall back to
  `KNIGHTS_WEATHER_API_KEY` only when the RANDOM key is missing or
  placeholder-like.
- Do not print or commit secret values.

Do not add new provider API keys directly to Flutter web unless explicitly
approved. Prefer Firebase callable proxies or another server-side boundary for
new provider secrets.

Current callable Functions are governed by CODEX.md. Preserve callable error
semantics: `unauthenticated`, `permission-denied`, `invalid-argument`,
`internal`, and `unavailable`.

App Check hardening is future work. Do not enable enforcement casually.

## GitHub Actions

Rand0m CI/CD policy:

- Domain validation workflows:
  - `01-earth-validation.yml` - Earth Validation
  - `02-agents-validation.yml` - Agents Validation
  - `03-ai-validation.yml` - AI Validation
  - `04-automate-validation.yml` - Automate/Test Inspect Validation
  - `05-oracle-validation.yml` - Oracle Validation
  - `06-core-validation.yml` - Core Validation
  - `07-more-validation.yml` - More Validation
- Domain validation workflows use path filters, support `workflow_dispatch`,
  run scoped validation commands, and do not deploy. They run for relevant pull
  requests, active feature/chore branch pushes, and `main` pushes when their
  domain paths match so `main` validates release-candidate state.
- `80-test-deploy-smoke.yml` deploys a temporary Firebase Hosting test channel
  on the `ai-rand0m` Hosting site and runs HTTP smoke against that test URL.
  It does not update the live `ai-rand0m.web.app` channel and does not touch the
  protected `randomknights-xyz.web.app` reference site.
- `90-production-release.yml` is the manual production release path for
  `main`. It is `workflow_dispatch` only; merging or pushing to `main` must not
  deploy production automatically. It runs release smoke only, builds web,
  deploys `hosting:rand0m`, then smokes `https://ai-rand0m.web.app` and
  `https://rand0m.ai`.
- `99-manual-deploy.yml` is emergency/manual only. It is `workflow_dispatch`
  only, confirmation-gated, restricted to `main`, and protected by the
  `production` environment.
- Workflow env generation is explicit and secret-backed; generated `.env`,
  `.dart_tool/`, `build/`, and `lib/env/env.g.dart` artifacts must remain
  uncommitted.

Recommended GitHub secrets:

- `FIREBASE_SERVICE_ACCOUNT_RANDOMKNIGHTS_XYZ`
- `RK_PACKAGE_READ_SSH_KEY` for private package dependency reads in app and
  package validation workflows

Test Deploy + Smoke and Production Release need
`FIREBASE_SERVICE_ACCOUNT_RANDOMKNIGHTS_XYZ`. Domain validation workflows do not
deploy and should not require Firebase deploy credentials.

Treat GitHub-provided tokens, including GitHub App installation tokens, as
opaque strings. Do not assume fixed token lengths, do not parse JWT claims from
`ghs_` tokens, and do not reject tokens because they contain dots, dashes, or
underscores. Any future token redaction or validation helper must support at
least 520 characters and should use a permissive shape such as
`ghs_[A-Za-z0-9\.\-_]{36,}`.

When CI regenerates Flutter web env output, it also needs the current approved
app env secrets:

- `RANDOM_GOOGLEAI_API_KEY`
- `RANDOM_OPENAI_API_KEY`
- `RANDOM_WEATHER_API_KEY`
- `KNIGHTS_WEATHER_API_KEY`
- `RANDOM_CLAUDEAI_API_KEY`
- `RANDOM_GROKAI_API_KEY`
- `RANDOM_CESIUM_ION_API_KEY`

Production deploys should use a protected GitHub Actions environment with
manual approval. Do not use old `kn1ghts` project IDs, old service-account
secret names, or workflows that deploy to the protected
`randomknights-xyz.web.app` reference site.

Release checklist:

1. Confirm app repo is on `main` and clean.
2. Confirm the relevant domain validation workflows are green or have been run
   for the changed areas.
3. Manually trigger Production Release from `main` when production deployment
   is explicitly approved.
4. Confirm ignored generated artifacts are not staged.
5. Confirm production smoke passes for `https://ai-rand0m.web.app` and
   `https://rand0m.ai`.
6. Run post-deploy cleanup if deployment was local.

Rollback notes:

- Prefer rollback by redeploying the previous validated commit.
- If `main` history must be repaired after an explicitly approved promotion,
  preserve a backup branch first and use `--force-with-lease` only with the
  exact expected old SHA.
- Do not delete release, backup, or hotfix branches until the deployed version
  has been verified and the owner approves cleanup.

## Packages

Generated Dart/Flutter artifacts should not be tracked in package repos:

- `.dart_tool/`
- `.flutter-plugins-dependencies`
- `pubspec.lock` for reusable packages

Package source changes are committed in the relevant nested package repo and
released by tag before consumers are updated.

Package READMEs and comments should describe the current single-app architecture
while acknowledging legacy package contracts where they still exist.

Prefer app-local fixes unless a phase explicitly authorizes package work.
Do not modify package repos just to resolve Rand0m FE routing, navigation,
media, command, or branding drift.

## Tooling Scripts

Workspace scripts live in `C:\Projects\dev-kitt\tooling\scripts`.

Current scripts:

- `pub-get-all.ps1`
- `analyze-all.ps1`
- `status-app-repos.ps1`
- `validate-earth-fast.ps1`
- `validate-all.ps1`

Inspect these before changing validation or deploy cleanup expectations.
No script change is needed unless a clear guardrail gap requires script support.

## Web Compatibility Follow-Ups

Flutter web builds may report known WASM dry-run incompatibilities from
`flutter_sound_web` and `geolocator_web`. Track those as future compatibility
work; do not mix them into navigation, naming, media, command, or ordinary
product phases unless directly required.

## Assets

The root `favicons/` staging folder is not part of the active workspace. If HD
icon sources are needed again, recover or stage them for the future
`rk_branding` icon catalog work before moving assets into package repos.

## READLESS Docs

Architecture plans, migrations, audits, and completed cleanup docs belong in
READLESS. Keep this root runbook short and operational.

Do not create `docs/` folders or architecture, planning, audit, migration, or
roadmap documents in `C:\Projects\dev-kitt`. This workspace may contain source
code, `README.md` files, and this root `RUNBOOK.md` only.

Archive new architecture notes directly in:

```text
C:\Projects\qa-kitt\.github\READLESS\architecture
```

Archive decision records directly in:

```text
C:\Projects\qa-kitt\.github\READLESS\decisions
```

Do not create project-specific nesting such as
`READLESS\architecture\rand0m`.
