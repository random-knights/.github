# CODEX.md

## Purpose

This file defines execution rules, architecture constraints, validation requirements, repository conventions, and reporting expectations for AI coding agents working within the Random Knights ecosystem.

These rules apply unless explicitly overridden by the repository owner.

---

# Session Bootstrap (Start Here)

Every coding agent (Claude or Codex) runs this at session start, before editing:

1. Read this file's: Reference Tooling, Development Cycle, Current Focus
   (Earth-Only Lockdown), Parallel Work With Codex, and Validation/Deployment
   Rules. You do not need to re-read CODEX before every command — read it per
   phase, and update it when a standard actually changes.
2. Determine the current Earth branch and its state (committed / pushed /
   deployed). Claude keeps this in its session memory; Codex asks the owner.
3. State back, before changing code: the only active surface is Earth; the
   active Earth branch + state; and the next recommended command.
4. Work the cycle: spec -> plan -> build -> test (focused, real evidence) ->
   review -> code-simplify -> ship. Earth work lives on `earth/**` branches that
   CI validates but does NOT deploy; production ships only via a manual
   Production Release at a checkpoint.
5. End every session with a handoff: what changed, what is committed/pushed/
   deployed, and the exact next recommended command(s).

6. Read and update READLESS/EARTH-ROADMAP.md each session.

Owner starter command for any agent: "Follow CODEX.md -> Session Bootstrap
(Start Here); tell me the current Earth branch state and your next recommended
command before editing."

---

# Reference Tooling

Local tool paths (Windows):

- GitHub CLI: `C:\Program Files\GitHub CLI\gh.exe`
- PowerShell: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`
- JAVA_HOME: `C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot`

---

# Development Cycle

All feature work follows: spec -> plan -> build -> test -> review ->
code-simplify -> ship.

- spec: define what to build before writing code.
- plan: break it into small atomic tasks.
- build: implement one slice at a time.
- test: prove it works with real evidence. No flaky tests, no large test runs,
  no wasted tokens debugging tests. Do not force tests to pass; update them as
  the product intentionally changes.
- review: five-axis review before merge.
- code-simplify: clarity over cleverness.
- ship: deploy with confidence.

---

# Current Focus: Earth-Only Lockdown

Earth is the primary target. All other pages/surfaces are on **lockdown**: do
not modify them unless the owner explicitly names them, a change is required to
fix a blocking build/test failure caused by the current Earth phase, or a shared
dependency change forces it. This hardens the Main Mission Scope Guardrail into
the default posture. Report any necessary out-of-scope touch clearly.

---

# Parallel Work With Codex

Claude and Codex work this repo in parallel. Stay in sync; never step on each
other:

- One owner per surface at a time. Confirm scope before starting an Earth phase;
  do not both edit the same files concurrently.
- Pull/rebase before pushing. Keep branch deltas small and feature-scoped.
- Both agents use the same git identities/SSH aliases (`deve10per`/`github-devbot`
  for dev-kitt app/packages, `eng1neer`/`github-qakitt` for qa-kitt) and the same
  deployment standards (main = release candidate; production = manual Production
  Release only).
- Handoff: when an agent's limits run low, end with a clear handoff — current
  state, what is committed/pushed/deployed, and the exact next recommended
  command(s) — so the other can continue seamlessly.

---

# Repository Structure

## GitHub Organization Access Model

Organization:

- GitHub organization: `random-knights`
- Owner/admin account: `xyz-admin`
- Owner/admin email: `knight@rand0m.ai`

Owner/admin scope:

- billing
- teams
- repository settings
- branch protection
- security policy
- emergency recovery

Rules:

- Never use `xyz-admin` for routine Codex/agent commits.
- The `xyz-admin` SSH key is optional and should exist only if that account
  performs clone, pull, or push operations directly.
- Daily source work belongs to the `dev-kitt` GitHub account.
- QA, READLESS, architecture, and support documentation work belongs to the
  `qa-kitt` GitHub account.

Team access:

- `dev` team has admin access on app/package repos: `xyz`, `rk_core`,
  `rk_data`, `rk_media`, `rk_agents`, `rk_ai`, `rk_branding`, and `rk_ui`.
- `dev` team has read access on QA/docs and automation repos: `.github`,
  `abc`, and `123`.
- `qa` team has admin access on QA/docs/support/automation repos: `.github`,
  `abc`, and `123`.
- `qa` team has read access on app/package repos: `xyz`, `rk_core`,
  `rk_data`, `rk_media`, `rk_agents`, `rk_ai`, `rk_branding`, and `rk_ui`.

CI package-read key rule:

- `github-actions-rk-package-read` is not a local workspace identity.
- It is only for GitHub Actions to read private `rk_*` package repositories
  during app and package validation.
- It must remain stored as the `RK_PACKAGE_READ_SSH_KEY` Actions secret in
  repos that need private package dependency reads, including
  `random-knights/xyz` and any `rk_*` package repo with private sibling git
  dependencies.
- Never use the CI package-read key for local workspace commits, clones, pulls,
  or pushes.

---

## dev-kitt

Purpose:

- source code
- applications
- packages
- tooling
- deployment assets

Repository policy:

- `C:\Projects\dev-kitt` is a local orchestration workspace.
- GitHub username: `dev-kitt` for both human dev-kitt work and Codex work.
- DevBot is a dedicated SSH identity for Codex on the `dev-kitt` account; it is
  not a separate GitHub account.
- Local SSH remotes for human/manual dev-kitt work use the `github-devkitt`
  SSH alias. Human dev-kitt remotes should look like:
  `git@github-devkitt:random-knights/<repo>.git`.
- Local SSH remotes for Codex-managed dev-kitt repos must use the
  `github-devbot` SSH alias. Codex dev-kitt remotes should look like:
  `git@github-devbot:random-knights/<repo>.git`.
- Codex/agent commits in dev-kitt repos must use repo-local Git identity
  `user.name=deve10per` and `user.email=deve10per@rand0m.ai`.
- Human/manual dev-kitt commits may use `developer@rand0m.ai`.
- `deve10per@rand0m.ai` and `developer@rand0m.ai` are both valid dev-kitt
  GitHub account email aliases, but Codex must use the `deve10per` identity.
- Before committing in any dev-kitt root, app, or package repo, Codex must
  verify `git config user.name`, `git config user.email`, and, for repos with a
  remote, that the remote URL uses the expected `github-devbot` SSH alias.
  Codex must set the local repo identity if it is missing or wrong, report a
  wrong remote alias before push, and never modify global Git identity.
- The root repo is local-only unless the owner explicitly configures a remote.
- Full-cycle mode must not fail just because the root repo has no remote.
- Commit root `CODEX.md`, `RUNBOOK.md`, tooling, and coordination changes
  locally in the root repo.
- Push nested repos only: `apps/rand0m`, `packages/rk_*`, and qa-kitt repos.

Allowed documentation:

- README.md files
- root RUNBOOK.md
- root CODEX.md

Not allowed:

- docs folders
- architecture documents
- planning documents
- audit documents
- migration documents
- roadmap documents
- decision records

---

## qa-kitt

Purpose:

- architecture documentation
- decision records
- audits
- planning
- migrations
- historical records

Repository policy:

- GitHub username: `qa-kitt`.
- Local SSH remotes for qa-kitt repos must use the `github-qakitt` SSH alias.
- Qa-kitt remotes should look like:
  `git@github-qakitt:random-knights/<repo>.git`.
- Codex/agent commits in qa-kitt repos must use repo-local Git identity
  `user.name=eng1neer` and `user.email=eng1neer@rand0m.ai`.
- Human/manual qa-kitt commits may use `engineer@rand0m.ai`.
- `eng1neer@rand0m.ai` and `engineer@rand0m.ai` are both valid qa-kitt GitHub
  account email aliases, but Codex must use the `eng1neer` identity.
- Before committing in any qa-kitt repo, Codex must verify
  `git config user.name`, `git config user.email`, and that the remote URL uses
  the expected `github-qakitt` SSH alias. Codex must set the local repo identity
  if it is missing or wrong, report a wrong remote alias before push, and never
  modify global Git identity.
- READLESS documentation belongs in qa-kitt only.
- Runtime, app, package, tooling, and deployment work belongs in dev-kitt only.

Locations:

Architecture:

C:\Projects\qa-kitt\.github\READLESS\architecture

Decisions:

C:\Projects\qa-kitt\.github\READLESS\decisions

Automation:

C:\Projects\qa-kitt\.github\READLESS\automation

Do not create:

READLESS\architecture\rand0m

READLESS\architecture\knight1y

READLESS\architecture<project>

Architecture notes belong directly inside:

READLESS\architecture

Decision records belong directly inside:

READLESS\decisions

---

## Automation Test Repo 123

- `random-knights/123` is the dedicated automation testing repo.
- Its future local clone path should be `C:\Projects\qa-kitt\123`.
- Generated Playwright/Cypress suites from `apps/rand0m` should eventually flow
  to `123`, not to the production app repo.
- Codex/dev-kitt/DevBot must not write generated tests to `123`.
- Future generated-test writes to `123` require qa-kitt ownership through the
  `github-qabot` SSH alias and repo-local identity
  `eng1neer <eng1neer@rand0m.ai>`.
- Human QA work in qa-kitt continues to use `github-qakitt` with
  `engineer <engineer@rand0m.ai>`.
- `abc` remains for classroom/test experiments. `xyz` remains the production
  app repo.

Validation scope:

- If a task changes only `qa-kitt/123`, qa-kitt READLESS/docs, or root
  docs/config that do not affect app runtime, do not run the full Flutter test
  suite, `flutter build web`, or `validate-all.ps1` unless explicitly
  requested.
- Repo 123-only work should validate with repo status, workflow/static review,
  and secret-safety checks. Do not run generated tests unless the phase
  explicitly requests execution.
- For mixed app plus repo 123 work, run app validation only when app/runtime
  files changed. Prefer focused tests first; reserve full validation for
  runtime changes, release checkpoints, or explicit owner requests.

---

# Read First Optimization

For each phase, read only the minimum current guidance needed to act safely:

1. `C:\Projects\dev-kitt\CODEX.md`
2. The most relevant recent READLESS architecture, decision, or audit document
   for the requested phase

Avoid broad READLESS scans unless the phase explicitly asks for a wider audit or
the narrow document set is insufficient. Prefer targeted reads over historical
context sweeps so source work stays focused and current.

## READLESS Maintenance Rule

When a phase references the "Most relevant READLESS document only", treat the
selected document as the current source of architectural truth for that feature
area.

Before implementation:

1. Verify the selected READLESS document still reflects the current
   implementation.
2. If materially stale, update that existing document before or with the
   implementation.
3. Prefer targeted updates to existing READLESS documents over new documents.
4. Avoid duplicate architecture documents covering the same feature area.

---

# Ecosystem Overview

Primary App:

apps/rand0m

Primary Repository:

https://github.com/random-knights/xyz

Primary Domain:

https://rand0m.ai

Firebase Project:

randomknights-xyz

Hosting Target:

ai-rand0m

---

# Package Structure

Current package repositories:

- rk_core
- rk_data
- rk_media
- rk_agents
- rk_ai
- rk_branding
- rk_ui

Do not modify package repositories unless explicitly required by the phase.

App-local implementation is preferred until patterns are proven stable.

Single-app architecture:

- `apps/rand0m` is the only active Flutter app.
- The retired four-app model must not be reintroduced in package guidance,
  navigation work, deployment work, or documentation.
- Package contracts may still expose legacy IDs, capabilities, labels, and env
  key metadata for `rand0m`, `knight1y`, `out1ine`, and `up10ad`. Treat those as
  compatibility metadata unless a phase explicitly scopes package API changes.
- Current destinations such as `random1y`, `knight1y`, `uti1ity`, `oracles`,
  `c0nnect`, `e1evate`, `draw`, `relax`, `vibe`, `weather`, and `favorites`
  are pages/routes/features inside `apps/rand0m`, not separate active apps.

Package usage expectations:

- Use `rk_ui` shared shell/components only when the active app render path already owns that surface, or when a phase explicitly authorizes package work.
- Use `rk_media` abstractions for future media architecture work, but do not extract app-local media behavior into `rk_media` without an approved package phase.
- Use `rk_agents` and `rk_ai` through existing app service boundaries; do not add provider calls, agent orchestration, or command execution unless explicitly scoped.
- If a bug can be fixed app-locally without changing package APIs, prefer the app-local fix.

---

# Code Organization Standards

Pages are orchestration and composition layers. They should primarily select
state, wire callbacks, and compose widgets, services, controllers/view-models,
and models. Avoid allowing page files to become long-lived accumulation points
for unrelated feature implementations.

When a feature becomes a subsystem, extract it into domain-owned files:

- widgets
- models
- services
- controllers or view-models
- utilities

Do not continue growing one page file indefinitely just because it already owns
the route.

Widget extraction threshold:

- If a page contains multiple panels, independent sections, custom renderers,
  visualization systems, or separate workflow surfaces, extract those pieces
  into dedicated widgets.
- Keep models outside page files. Page-local classes are acceptable only for
  tiny view-state helpers that do not represent reusable domain concepts.

File size guidance:

- 500 lines: soft warning; look for extractable sections.
- 1000+ lines: extraction is expected unless the file is generated or narrowly
  mechanical.
- 2000+ lines: architecture review is required.
- 10000+ lines: unacceptable for hand-authored runtime code; split actively
  before adding more feature work.
- 20000-line files are architecture failures and must be segmented before more
  features are layered on top.
- New features must not grow existing giant files. If a feature requires a large
  UI, create or extract the widgets, controllers/view-models, models, and
  services first.

Earth and Connect are separate domains even when they share the `c0nnect`
entry point.

Connect owns:

- source registry
- provider/source management
- source onboarding
- source status and ownership
- the connection globe of source icons

Earth owns:

- Earth workstation globe
- visualization and overlays
- motion layers
- entities and region mapping
- monitoring and verification
- Earth Intelligence

The Connect source-icon globe is not the Earth workstation globe. Do not combine
these domains into a single feature file. When Earth and Connect cooperate, keep
the boundary explicit through widgets, services, and models with clear domain
ownership.

The Random Knights workspace is intentionally organized as a production
monorepo. Prefer separation of concerns, domain ownership, reusable widgets,
reusable models, and reusable services over the convenience of placing new code
inside an existing large file.

Naming conventions:

- Use domain-owned directories such as `lib/pages/connect`,
  `lib/pages/earth`, `lib/widgets/connect`, `lib/widgets/earth`,
  `lib/models/connect`, `lib/models/earth`, `lib/services/connect`, and
  `lib/services/earth` as features mature.
- Prefer domain prefixes for new files: `connect_*`, `earth_*`, `agent_*`,
  `test_inspect_*`, `app_*`, and `source_*`.
- Avoid vague catch-all files such as `utils.dart`, `helpers.dart`,
  `models.dart`, or `widgets.dart` unless they are tiny barrels with no feature
  implementation.

Runtime and validation speed guardrails:

- Keep branch deltas small and feature-scoped so Codex can inspect, format,
  analyze, and test the affected surface without repeatedly loading giant
  files.
- Prefer small focused tests over giant all-surface widget tests. Split tests
  when a file becomes slow, broad, or hard to update safely.
- Use path-filtered workflows and scoped validation for normal feature work.
  Reserve full Flutter validation, full builds, and full release gates for
  release checkpoints, shared-core changes, or explicit owner requests.
- Docs-only changes must not trigger Flutter validation unless app/runtime files
  changed or the owner explicitly requests it.
- During active feature iteration, prioritize useful product progress and
  focused confidence over repeatedly repairing stale broad tests. If a test
  failure does not indicate a real user-facing bug, classify it quickly and
  repair, narrow, skip, or quarantine it with a clear replacement path.

---

# Agent System

System agents:

- rand0m
- dai1y
- knight1y
- aut0mate

Future agents:

- temp1ate
- va1idat0r

Do not integrate future agents without explicit instruction.

---

# Favorites Rules

## Active Agent

Singleton behavior is required.

Rules:

- only one active favorite agent
- favoriting a new agent replaces the previous active agent

Resolution:

1. active favorite agent
2. random enabled system agent
3. rand0m

Home flipcard must reflect active agent state.

---

## Other Favorites

Multiple favorites allowed:

- chat responses
- agent responses
- oracle entries
- provider/model bookmarks
- prompt bookmarks

Bookmarks do not activate selections.

Bookmarks only improve discoverability.

---

# Home Terminal Rules

Current status:

Seed implementation only.

Current format:

> \_ active agent: @agent

Rules:

- terminal animation runs once per app load
- active agent updates live
- no refresh required
- no re-flip required

Do not implement command execution without an approved command architecture phase.

---

# Provider Rules

Chat is multi-provider-first.

Default AI Provider does not disable multi-provider chat.

Default AI Provider controls:

- agent fallback provider
- focused pane selection
- new single-provider interactions

Do not redesign provider architecture without approval.

User/provider ownership is account-scoped. Connection ownership records and
provider controls may show status, owner, availability, health, and future
OAuth/subscription readiness, but must not exchange credentials, add billing,
sync raw secrets, or share global provider keys unless explicitly scoped.

---

# Earth Architecture Rules

Earth's current source-of-truth flow is:

Earth Dashboard -> Regional Health Dashboard -> Narratives -> Recommendations
-> Correlations -> Scenario Engine -> Planet Health Schematic -> Globe Preview
-> Overlay Governance -> Provider Matrix.

The dashboard remains the source of truth. Globe Preview is secondary and
experimental. Overlay governance and provider matrix rules must remain in force:
no unrestricted maps, no unrestricted tracking, no live satellite/flight/ship
overlays, no precise endangered-species exposure, and no investment framing for
carbon-offset data.

Earth Vision readiness is tooling/research-only. Do not add Flutter web image
processing, raw imagery downloads, or raw imagery payloads to app runtime unless
a future phase explicitly approves the worker/storage architecture.

---

# Firebase Rules

Current active functions:

- generateAIResponse
- runPageSpeedAudit
- scanContentUrl
- runAgentActionPreview

Required callable semantics:

- unauthenticated
- permission-denied
- invalid-argument
- internal
- unavailable

Do not expose:

- API keys
- secrets
- raw provider responses
- provider error payloads

App Check:

- App Check hardening is a future infrastructure phase.
- Do not enable enforcement, rotate App Check configuration, or require App Check tokens casually during product or FE hardening work.

---

# Secret Management

Secret Manager migration is a future infrastructure phase.

Do not:

- rotate keys
- rename secrets
- migrate to Secret Manager

unless explicitly instructed.

---

# Env Contract

The canonical ecosystem env file is `C:\Projects\dev-kitt\.env`.

The root `.env` must preserve both namespaces:

- `RANDOM_*` keys are active for rand0m.
- `KNIGHTS_*` keys are reserved for future use.

Do not remove, rename, duplicate, or relocate reserved `KNIGHTS_*` keys.

Weather uses `RANDOM_WEATHER_API_KEY`. `KNIGHTS_WEATHER_API_KEY` may be used
only as a reserved fallback when the RANDOM key is missing or placeholder-like.

Do not introduce `WEATHER_API_KEY` or app-specific weather key names.

Do not create app-local `.env` files as a second source of truth. If a tool absolutely requires an adapter, it must stay thin and point back to the root contract.

Do not print or commit secret values.

GitHub-provided tokens, including GitHub App installation tokens, are opaque
secret strings. Do not assume fixed token lengths, parse JWT claims from `ghs_`
tokens, or reject tokens because they contain dots, dashes, or underscores. If
future validation or redaction logic is added, it must support at least 520
characters and should use a permissive shape such as
`ghs_[A-Za-z0-9\.\-_]{36,}`.

Do not add new provider API keys directly to Flutter web unless explicitly
approved. Prefer Firebase callable proxies or another server-side boundary for
new provider secrets.

---

# Web Routing And Navigation

Rand0m web uses path URL strategy. Do not reintroduce hash-only routing as the canonical model.

Route rules:

- `/` maps to the XYZ default landing/home/dashboard experience.
- Do not create `/xyz`.
- Do not create `/more`.
- More is a popup/menu affordance only, never a page.
- Knight1y must never become the default route.
- Root landing must not persist or restore stale hash state such as `#/knight1y`.

Navigation naming:

- Bottom Nav order and labels: About | Random1y | XYZ | Knight1y | More.
- Drawer and More menu AI destinations use lowercase/stylized names: `random1y`, `uti1ity`, `oracles`, `knight1y`, `c0nnect`, `e1evate`.
- Non-AI utility destinations use plain names: `about`, `draw`, `relax`, `vibe`, `weather`, `favorites`.
- Bottom Nav active icon/text color may use `AppColors.kitt` when that matches existing selected-state behavior; inactive icons must use the same inactive color rules as the other Bottom Nav items.

---

# Validation And Test Strategy

Codex Speed Mode is the default during active iteration. The goal is to ship
impactful, scoped work with enough validation to protect the changed behavior
without turning every UI phase into a full-suite repair loop.

Use the smallest validation tier that gives meaningful confidence for the
change, unless the owner explicitly requests broader validation.

## Validation Tiers

Tier 0: format, analyze, and diff hygiene.

- Use for docs/config-only work, small code edits, and pre-commit checks.
- Typical checks: `dart format`, `flutter analyze`, `git diff --check`, static
  workflow/docs checks, and secret-pattern review where relevant.
- Do not run Flutter tests for docs-only changes unless runtime files changed.

Tier 1: focused changed-area tests.

- Default for normal runtime feature work.
- Run tests for the touched model, service, widget, page, or workflow only.
- Prefer a bounded command that exercises all known affected areas once and
  captures all failures before editing again.
- Do not repeatedly run the full suite after fixing one failure at a time.

Tier 2: release smoke suite.

- Use for stable checkpoints, merges to `main`, broad UI changes, and pre-deploy
  confidence.
- Release smoke proves deployability, not feature completeness. It should cover
  a few critical representative flows: app boot/config, Home, Random1y provider
  selector, Earth load and Earth/Data toggle, Connect load, App Info/settings,
  and critical routing.
- Domain validation workflows own feature correctness. Release smoke must not
  verify deep Earth scenarios, renderer internals, provider integrations,
  Oracle content, automation details, long interaction flows, or other
  domain-specific logic already covered elsewhere.
- Smoke checks must avoid network dependencies, provider calls,
  timing-sensitive animations, giant scroll interactions, and flaky widget
  assumptions.
- Keep the smoke suite curated. Remove, split, or quarantine stale monolithic
  widget tests that slow down iteration without protecting critical behavior.

Tier 3: full suite and workspace validation.

- Use only for release/deploy checkpoints, major refactors, shared-core or
  package changes, auth/security/provider-routing changes, data migration, or
  explicit owner requests.
- Typical checks: full Flutter test suite, `flutter build web`,
  `validate-all.ps1`, package validation, and CI Production Release.
- Tier 3 is not the default for ordinary layout, copy, visual polish, or
  feature-iteration tasks.

## Test Failure Workflow

When tests fail during active iteration:

1. Run one bounded relevant test command and collect all failures.
2. Classify each failure as:
   - real user-facing bug
   - stale expectation from intentional UI/UX change
   - brittle layout assertion
   - flaky/slow infrastructure problem
   - unrelated pre-existing failure
3. Fix real bugs and critical regressions first.
4. Update stale focused tests to match the new behavior.
5. Do not spend long loops preserving obsolete test shape when the product UI
   intentionally changed.

For layout and visual work:

- Prefer manual QA, screenshots, browser inspection, and focused interaction
  checks over broad widget-test churn.
- Widget tests should protect state changes, guardrails, critical labels,
  accessibility affordances, and important user flows.
- Avoid brittle assertions that depend on unique repeated copy, exact scroll
  depth, incidental card ordering, or every panel being visible at once.

## Stale Or Monolithic Test Quarantine

It is acceptable to skip or quarantine obsolete monolithic widget tests when all
of the following are true:

- The failure is caused by an intentional UI/UX restructure.
- Focused replacement coverage already exists or is added in the same change.
- The skipped test has a clear comment or TODO explaining why it is stale and
  what focused coverage replaces it.
- The skip does not remove coverage for critical safety, security, provider,
  deploy, or data-loss behavior.

Do not silently delete important tests. Prefer narrowing, splitting, or marking
with an explicit skip reason and follow-up path.

## Critical Test Preservation

Always preserve or replace coverage for critical areas:

- authentication and authorization
- provider routing and model/provider fallback behavior
- secrets, env contracts, and redaction
- billing, cost, token accounting, and quota-sensitive logic
- data loss, persistence, migrations, and destructive actions
- deploy, Firebase Functions, hosting, and workflow safety
- security boundaries, OAuth, permissions, and private repo access
- live provider call guardrails and no-unapproved-provider behavior

Skipping or weakening tests in these areas requires explicit owner approval and
a replacement validation path.

---

# Validation Rules

## Code Changes

If runtime code changes:

Run applicable validation.

Examples:

- flutter changes
- functions changes
- package changes
- asset/config changes affecting runtime

Possible validations:

- flutter analyze
- flutter test
- flutter build web
- validate-all.ps1
- build verification
- deployment verification

---

## Earth Fast Cycle

Earth Fast Cycle is a focused validation mode for Earth-only iteration. It may
be used only when changes are limited to Earth, Connect/Earth source registry,
Globe Preview, Earth Vision, Earth tests, or Earth READLESS docs.

Do not use Earth Fast Cycle when changes touch auth, routing/navigation
architecture, Firebase Functions, provider secrets/env contracts,
ownership/security models, package APIs, unrelated pages, or deployment
tooling, unless the phase explicitly scopes the Earth Fast GitHub workflow
itself.

Local Earth Fast Cycle runs:

- `flutter analyze`
- targeted Earth/connect tests
- `flutter build web`

For Earth Fast Cycle phases, run `validate-earth-fast.ps1` locally. If it
passes, commit and push the relevant repos to a short-lived `earth/**` branch.
Do not push ordinary Earth Fast Cycle phases directly to `main`.

GitHub main release validation and deploy are handled by the production release
workflow. Do not disable or weaken release safety to make Earth iteration
faster. To avoid broad validation every phase, use Earth branches such as
`earth/p14-20-protected-area-integrity`; the branch-scoped Earth Validation
workflow validates those pushes and must remain validation-only.

Earth/test deployments belong to the explicit Test Deploy + Smoke workflow.
That workflow must use a temporary Firebase Hosting channel and must not update
the live production channel. The `randomknights-xyz.web.app` Hosting site is a
protected preview/reference environment and must not be touched by ordinary
Earth validation, test deploy, or production release workflows.

Full validation and deploy are release checkpoints for Earth work. Run them
only when the owner explicitly asks, when the phase touches cross-system code,
provider/security/auth/package behavior, or at an explicit Earth release
checkpoint. A good default checkpoint cadence is every 3-5 Earth phases.

---

## Audit / Planning Passes

If no code changes:

Do not run:

- flutter analyze
- flutter test
- flutter build web
- validate-all.ps1
- deployments

Instead:

- audit
- analyze
- report findings
- recommend implementation order

---

# Reporting Requirements

Completion reports should include:

- implementation summary
- files changed
- validation results
- deploy results (if applicable)
- git status
- recommended commit command

Audit-only phases should include:

- findings
- recommendations
- proposed implementation phases

---

# Deployment Rules

GitHub Actions policy:

- Domain validation workflows are numbered `01` through `07` and own scoped
  validation for Earth, Agents, AI, Automate/Test Inspect, Oracle, Core, and
  More. They must run on pull requests to `main`, pushes to active
  `feature/**` / `chore/**` branches, and pushes to `main` when their path
  filters match, so `main` validates release-candidate state without deploying.
  They must use path filters, minimal permissions, concurrency cancellation,
  and focused tests for their domain.
- Domain validation workflows must not deploy.
- Staging Deploy + Smoke (`80-test-deploy-smoke.yml`) is the only staging
  deployment workflow. It is explicit/manual, builds the web app, and deploys to
  the STABLE staging/preview target — the project DEFAULT Hosting site, live
  channel, at `https://randomknights-xyz.web.app` (target `hosting:staging`; no
  per-run preview channel, no hash, the URL never changes) — then runs HTTP smoke
  against that fixed URL. It must never touch the production site `ai-rand0m` /
  `rand0m.ai`.
- Production Release (`90-production-release.yml`) owns manual production
  release from `main`. It must be `workflow_dispatch` only; merging or pushing
  to `main` must never deploy production automatically. Main represents
  release-candidate / deployable state until a human explicitly starts
  Production Release.
- Production Release must run release smoke only, build web, verify generated
  artifacts, deploy `hosting:rand0m` to the `ai-rand0m` Hosting site in project
  `randomknights-xyz`, and smoke `https://ai-rand0m.web.app` and
  `https://rand0m.ai`.
- Production Release must not rerun the full Flutter suite or duplicate all
  domain validation workflows.
- Hosting cache policy (required): serve `index.html`,
  `flutter_service_worker.js`, `flutter_bootstrap.js`, and `version.json` with
  `Cache-Control: no-cache, no-store, must-revalidate` so new deploys take effect
  immediately; hashed assets keep their long cache. This lives in the Production
  Release generated `firebase.json` and the committed `firebase.json` files.
  Without it, a stale Flutter service worker can serve a broken/old app (missing
  shell/nav) for up to an hour after a deploy. After a deploy, a client holding
  the old worker must clear site data / unregister the service worker once.
- Manual Deploy (`99-manual-deploy.yml`) is an emergency/manual path only. It
  must be `workflow_dispatch` only, restricted to `main`, confirmation-gated,
  protected by the `production` environment, and secret-backed.

Environment mapping:

- Production: Firebase project `randomknights-xyz`, Hosting site `ai-rand0m`,
  custom domain `https://rand0m.ai`, and Firebase URL
  `https://ai-rand0m.web.app`. `https://ai-rand0m.web.app` is the PRODUCTION
  URL — it is NOT a test/staging URL. Only `90-production-release.yml` deploys
  here (`hosting:rand0m`).
- Staging/preview: the project DEFAULT Hosting site `randomknights-xyz`, live
  channel, at the stable URL `https://randomknights-xyz.web.app`. This is the
  repurposed staging target that `80-test-deploy-smoke.yml` deploys
  (`hosting:staging`) — a stable URL with no per-run channel/hash. It is no
  longer a "do-not-touch protected reference" site; it IS staging, and is
  distinct from production (`ai-rand0m`).

Deploy only when:

- phase requires deployment
- runtime behavior changed
- Earth Fast Cycle work has reached an explicit release checkpoint

Do not deploy:

- audit-only work
- planning-only work
- documentation-only work
- ordinary Earth Fast Cycle phases without an explicit checkpoint request

Deploy Rand0m hosting only from the workspace root:

```powershell
cd C:\Projects\dev-kitt
firebase deploy --only hosting:rand0m --project randomknights-xyz
```

After deploys, clean transient Firebase CLI artifacts:

```powershell
Remove-Item C:\Projects\dev-kitt\firebase-debug.log -ErrorAction SilentlyContinue
Remove-Item C:\Projects\dev-kitt\.firebase -Recurse -Force -ErrorAction SilentlyContinue
```

Do not change deployment scripts or cleanup policy unless a phase explicitly includes tooling maintenance.

---

# Tooling Scripts

Workspace validation scripts live in `C:\Projects\dev-kitt\tooling\scripts`.

Inspect these scripts before changing validation or deploy cleanup expectations.

Current scripts:

- `pub-get-all.ps1`
- `analyze-all.ps1`
- `status-app-repos.ps1`
- `validate-earth-fast.ps1`
- `validate-all.ps1`

Do not modify tooling scripts during app/product fixes unless a clear guardrail gap requires script support.

---

# Web Compatibility Follow-Ups

WASM compatibility warnings for `flutter_sound_web` and `geolocator_web` are tracked as a future compatibility audit.

Do not address WASM warnings during navigation, naming, command, media, or ordinary product work unless directly required by the phase.

---

# App State Rules

Changes to user settings should update live whenever practical.

Examples:

- active favorite agent
- provider/model settings
- branding icon selection
- favorites views

Avoid stale snapshot state that requires manual refresh.

---

# Branding Rules

Current icon identities:

- rand0m-primary
- rand0m-inverse
- knight1y
- up10ad

Current implementation:

- in-app branding only
- legacy icon IDs may remain in the app icon catalog, but they do not represent
  separate active apps

Do not implement:

- Android launcher icon switching
- iOS launcher icon switching
- Windows executable icon switching

without explicit approval.

---

# Architecture Rules

Before major implementation phases:

- audit first
- summarize findings
- propose scope
- implement approved scope only

For large feature areas:

- Agent Commands
- Home Terminal
- Sync Architecture
- Firestore Synchronization
- Secret Manager Migration

planning and audit phases should occur before implementation.

---

# Main Mission Scope Guardrail

During Earth, Agent, and Connection phases, keep work focused on those surfaces.
Pages and features outside Earth, Agents, and Connections must remain untouched
unless the owner explicitly names them in the request.

Protected surfaces include About, Utility/Test/Inspect, Oracles, Relax, Vibe,
the standalone Weather page, Favorites, Draw, and App Info/branding settings.

Codex may touch protected surfaces only when explicitly requested by the owner,
required to fix a blocking build/test failure caused by the current phase, or
required by a shared dependency change. Report any such touch clearly. Do not
opportunistically polish unrelated UI during Earth, Agent, or Connection phases.

---

# Default Full-Cycle Mode

Unless the owner explicitly says `audit-only`, `docs-only`, `no-commit`,
`no-push`, or `no-deploy`, complete the full lifecycle for the requested work.

Default cycle:

1. Implement the requested change.
2. Run the required validation for the files touched.
3. Clean generated artifacts.
4. Verify root, app, package, and qa-kitt repository status.
5. Commit intended changes in each repo that changed.
6. Push the working branch for nested repos that have remotes.
7. If on `main`, validation passed, and the change is deployable runtime work,
   deploy Firebase hosting.
8. Run post-deploy cleanup.
9. Report final status, including any intentionally remaining work.

Do not leave routine cleanup, commit, push, or deploy chores for the owner when
the task is within the approved full-cycle scope.

Exception modes:

- `audit-only`: no code changes, no validation unless files were touched, and
  no deploy.
- `docs-only`: commit safe documentation changes, skip Flutter validation, and
  do not deploy unless explicitly requested.
- `no-deploy`: validate, commit, and push, but do not deploy.
- `no-push`: validate and commit, but leave committed work local.
- `no-commit`: validate only and leave changes unstaged.

---

# Workspace Cleanliness

Before completion:

- Clean generated artifacts created by validation or build steps.
- Do not leave `.dart_tool`, `build`, `pubspec.lock`, or
  `.flutter-plugins-dependencies` staged accidentally in reusable package repos.
- `validate-all.ps1` should finish by normalizing generated package artifacts
  and printing app/package git status so validation does not leave reusable
  package repos dirty.
- Package cleanup must preserve `.dart_tool/package_config.json` for IDE and
  `--no-pub` analyzer health. Git-clean is not sufficient if package imports no
  longer resolve locally.
- Do not leave Firebase CLI cache/debug artifacts behind after deploys.
- Verify and report status for the root repo, `apps/rand0m`, all `rk_*`
  package repos, and `C:\Projects\qa-kitt\.github` when qa-kitt was touched.
- If generated artifacts appear during validation, remove them before the final
  report unless they are intentionally tracked by project policy.

---

# Branch And Git Rules

- `main` is production-ready.
- Feature branches should be short-lived.
- Release branches are temporary and should be cleaned up after verification.
- Backup branches are temporary and should be deleted only after verification
  and owner approval.
- Do not force-push unless explicitly approved.
- Do not rewrite history unless explicitly approved.
- Do not merge unrelated histories unless explicitly approved.
- Commit from the repository that owns the changed files.
- If multiple nested repos changed, commit each repo separately.
- Use concise conventional commit messages where practical.
- Push after commit unless the owner says not to, except for the local-only
  root `dev-kitt` repo when no remote is configured.
- Never commit generated artifacts or secrets.

---

# Validation Matrix

Runtime/app changes require:

- `flutter analyze`
- `flutter test`
- `flutter build web`
- `validate-all.ps1`

Earth-only Fast Cycle phases require `validate-earth-fast.ps1`, then
commit/push if green. Full validation is reserved for explicit checkpoints,
cross-system changes, and deployment.

Firebase Functions changes require:

- `npm run build` in the functions workspace
- app validation too if app/runtime files were also touched

README, CODEX, RUNBOOK, and docs-only changes:

- skip Flutter validation
- do not deploy unless explicitly requested

---

# Completion Report Template

Full-cycle completion reports should include:

- summary
- files changed
- validation results
- commits created
- branches pushed
- deploy result, if applicable
- cleanup performed
- git status for root, app, package repos, and qa-kitt when touched
- next recommended command

---

# Owner Intent

Current ecosystem direction:

1. Product evolution
2. Agent capabilities
3. User personalization
4. Local visibility and tooling
5. Command architecture
6. Home terminal activation

Infrastructure work should be performed when necessary, but should not interrupt product progress without a compelling reason.
