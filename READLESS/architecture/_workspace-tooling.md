# Workspace Tooling And Validation Scope

This note is the current architecture reference for Random Knights workspace
tooling, validation scope, and segmented workflow recommendations.

The root workspace is `C:\Projects\dev-kitt`. It owns lightweight coordination
scripts only. The production app, shared packages, QA documentation, classroom
repo, and automation repo are independent nested or sibling git repositories.

## Current Workspace Shape

| Area | Local path | Repo / role | Current audit finding |
| --- | --- | --- | --- |
| Root workspace | `C:\Projects\dev-kitt` | local-only coordination | Clean; no remote expected. |
| App | `C:\Projects\dev-kitt\apps\rand0m` | `random-knights/xyz` | Clean; many completed short-lived branches remain available. |
| QA docs | `C:\Projects\qa-kitt\.github` | org docs / READLESS | Clean; `.github\README.md` is absent, so READLESS is the source of truth. |
| Automation | `C:\Projects\qa-kitt\123` | generated test automation | Clean; manual runner and PR-comment workflows are manual-first. |
| Classroom | `C:\Projects\qa-kitt\abc` | classroom / experiments | `assets/` is untracked and needs an explicit commit-or-ignore decision. |
| Packages | `C:\Projects\dev-kitt\packages\rk_*` | shared package repos | Package validation workflows exist; private sibling dependency access requires CI SSH setup. |

## Root Scripts

Run commands from `C:\Projects\dev-kitt`.

```powershell
.\tooling\scripts\pub-get-all.ps1
```

Runs `flutter pub get` in:

- `apps/rand0m`
- `packages/rk_branding`
- `packages/rk_ui`
- `packages/rk_agents`
- `packages/rk_ai`
- `packages/rk_core`
- `packages/rk_media`
- `packages/rk_data`

```powershell
.\tooling\scripts\analyze-all.ps1
```

Runs `flutter analyze` in the same app and package folders.

```powershell
.\tooling\scripts\status-app-repos.ps1
```

Runs `git status --short --branch` for nested app repositories:

- `apps/rand0m`

```powershell
.\tooling\scripts\validate-earth-fast.ps1
```

Runs the local Earth Fast Cycle:

1. `flutter analyze` in `apps/rand0m`
2. `flutter test test\connect`
3. `flutter build web`

Use it only for Earth, Connect/Earth source registry, Globe Preview, Earth
Vision, Earth tests, and Earth READLESS docs.

```powershell
.\tooling\scripts\validate-all.ps1
```

Runs the workspace validation sequence:

1. `pub-get-all.ps1`
2. `analyze-all.ps1`
3. normalize generated package artifacts
4. verify package `.dart_tool\package_config.json` remains available
5. run `flutter analyze --no-pub` in each package after cleanup
6. run nested app git status checks
7. print package git status

`validate-all.ps1` does not currently run the full app test suite or app web
build; release checkpoint instructions may still require those commands
separately before or alongside `validate-all.ps1`.

## Package Audit

All seven package repos are clean on `main`, have `README.md`, `pubspec.yaml`,
tests, and a `v0.1.0` tag.

| Package | Version | Tests | Workflow | Notes |
| --- | --- | ---: | --- | --- |
| `rk_core` | `0.1.0` | 3 | package validation | README reflects single-app compatibility. |
| `rk_data` | `0.1.0` | 1 | package validation | README reflects data taxonomy boundaries. |
| `rk_media` | `0.1.0` | 1 | package validation | README keeps render/media as package metadata, not app navigation. |
| `rk_agents` | `0.1.0` | 1 | package validation | README reflects agent compatibility contracts. |
| `rk_ai` | `0.1.0` | 2 | package validation | Depends on private `rk_core`; CI requires package-read SSH secret. |
| `rk_branding` | `0.1.0` | 1 | package validation | README reflects single-app branding scope. |
| `rk_ui` | `0.1.0` | 1 | package validation | Depends on private `rk_branding`, `rk_core`, and `rk_data`; CI requires package-read SSH secret. |

Current package remotes use the human `github-devkitt` SSH alias. That is safe
for manual package work, but Codex-managed package phases should either switch
the affected package remote to `github-devbot` before pushing or explicitly
report the alias mismatch before push.

Recommended package workflow path:

- add one reusable package validation workflow template later
- trigger on package repo pushes and PRs
- run `dart pub get` / `flutter pub get` as appropriate
- run package analyze
- run package tests
- avoid app web build unless the package is being consumed by an app release

Package workflow dependency access:

- Local package manifests may continue to use developer SSH aliases such as
  `git@github-devkitt:random-knights/rk_core.git`.
- GitHub-hosted runners do not know local aliases like `github-devkitt` and
  cannot use one package repo's default `GITHUB_TOKEN` to read private sibling
  repos.
- Package validation workflows should use the `RK_PACKAGE_READ_SSH_KEY`
  Actions secret when a package declares private `rk_*` git dependencies.
- The secret should belong to the CI-only `github-actions-rk-package-read`
  identity or an equivalent read-only key with access to required private
  `rk_*` repos. Do not commit keys or tokens.
- Workflows should rewrite local aliases to `git@github.com:random-knights/`
  only after SSH credentials are configured.
- Packages without private git dependencies may skip SSH setup.

No package version bumps, tags, or dependency changes were made for this audit.

## Current GitHub Actions Findings

### App / XYZ

`apps/rand0m` currently has:

- `app-core-validation.yml`: App Core scoped validation
- `agents-validation.yml`: Agents scoped validation
- `manual-firebase-deploy.yml`: protected manual production deploy
- `more-experience-validation.yml`: More/Experience scoped validation
- `test-inspect-validation.yml`: Utility/Test/Inspect scoped validation
- `earth-fast-validation.yml`: Earth branch validation plus guarded preview
  deploy for `randomknights-xyz.web.app`
- `full-release-gate.yml`: broad release validation for main, PRs to main, and
  manual dispatch

Findings:

- Segmented workflows run path-scoped checks and do not deploy.
- Full Release Gate is the only broad app validation workflow.
- Earth Fast is restricted to `earth/**` for push preview behavior and now
  includes broader Earth model, service, widget, test, and tooling paths.
- Production deploy remains manual/protected and should stay separate from
  Earth Fast preview deploys.

### Repo 123

`C:\Projects\qa-kitt\123` currently has:

- `manual-generated-tests.yml`
- `generated-test-execution-design.yml`
- `pr-comment-summary.yml`

Findings:

- Workflows are `workflow_dispatch` only.
- `dry_run` defaults protect execution/comment behavior.
- Manual runner and PR comment paths are repo-side only; the app remains a
  preview/control plane.
- This repo should keep validation separate from Flutter app validation.

### QA Docs / Org Profile

No `.github\README.md` file exists in the local qa docs repo. READLESS remains
the authoritative documentation home. No org-level workflow files were found in
the local `.github` repo during this audit.

### ABC Classroom

No `.github\workflows` folder was found in `abc`. Classroom work can stay
manual until lesson/lab generation needs a static docs or asset hygiene check.

## Recommended Segmented Validation Workflows

W1.1 implemented the first workflow files for the recommended segmentation.

| Segment | Trigger paths | Commands | Skip | Artifacts | Secrets | Cost |
| --- | --- | --- | --- | --- | --- | --- |
| Packages | package repo PR/push/manual dispatch | SSH setup for private git deps, `flutter pub get`, `dart format --set-exit-if-changed lib test`, `flutter analyze`, `flutter test` | app tests, app web build, Firebase | package test logs | `RK_PACKAGE_READ_SSH_KEY` only when private sibling deps exist | Low |
| App Core | routing, shared services, home/core paths/manual dispatch | pub get, build runner, analyze, focused core tests | Firebase deploy, full suite/build | test logs | package-read key, app env secrets for generated env | Medium |
| Earth | `earth/**` branches, Earth paths/manual dispatch | Earth Fast Cycle | full suite except checkpoint | web build, preview URL if configured | Firebase preview service account, package-read key | Medium |
| Agents | agent config, provider/model UI, command lifecycle/manual dispatch | pub get, build runner, analyze, focused agent tests | Earth Fast, deploy, full suite/build | test logs | package-read key, app env secrets for generated env | Low-Medium |
| Test / Inspect | Utility/Test paths/manual dispatch | pub get, build runner, analyze, utility test tab test | app web build unless release checkpoint | model/UI test logs | package-read key, app env secrets for generated env | Low-Medium |
| More / Experience | About, Relax, Vibe, Favorites, media/weather paths/manual dispatch | pub get, build runner, analyze, focused experience tests | Earth Fast, repo 123 checks, full suite/build | page test logs | package-read key, app env secrets for generated env | Low-Medium |
| Repo 123 Automation | `C:\Projects\qa-kitt\123` only | git status, workflow/static review, JSON/package syntax checks, secret scan | Flutter tests, web build, validate-all | sample artifacts only | none by default | Low |
| ABC Classroom | `C:\Projects\qa-kitt\abc` only | markdown review, asset inventory, secret/binary scan | Flutter tests, app build | none | none | Low |
| Full Release Gate | explicit release checkpoint/main merge/deploy | app analyze, app tests, app build web, `validate-all.ps1` | nothing relevant | build output, validation logs | package-read key, approved env/deploy secrets | High |

## Change-To-Validation Matrix

| Change type | Minimum validation |
| --- | --- |
| Docs-only in qa-kitt READLESS | markdown/static review and git status; no Flutter. |
| Root docs/config only | static review and git status; no Flutter unless runtime config changed. |
| Repo 123 docs/fixtures/workflows | workflow/static review, JSON/package syntax where relevant, secret scan; no Flutter. |
| ABC classroom docs/assets | markdown review, asset inventory, binary/secret scan; no Flutter. |
| Package source | package pub get, package analyze, package tests; app validation only before consumer release. |
| App page/widget/service | focused app tests plus analyze; full app tests/build for broad or release scope. |
| Earth-only app work | Earth Fast Cycle. |
| Cross-system runtime work | full app validation and release-gate checks. |
| Firebase Functions/auth/provider secret work | function-specific validation plus app validation if app runtime changed. |
| Production deploy | full release gate and protected/manual deploy only. |

The guardrail is intentional: do not run hundreds of Flutter tests or a web
build when a task changes only repo 123, ABC, QA docs, or root docs/config that
do not affect app runtime.

## ABC Classroom Inventory

Current tracked classroom content:

- `README.md`
- `lessons\intro.md`
- `lessons\render-media-composition.md`
- `labs\sandbox.md`
- `labs\render-media-composition.md`

Current untracked `assets/` inventory:

- batch samples: `CALCULATOR.bat`, `GUESSING GAME.bat`,
  `MR.ROBOT PC-CLEAN.bat`, `PASSWORD GENERATOR.bat`, `POKEMON.bat`,
  `RAINBOW MATRIX.bat`, `REND3R.bat`, `TIC-TAC-TOE.bat`
- MP3 samples: `beach.mp3`, `breeze.mp3`, `cafe.mp3`, `city.mp3`,
  `crickets.mp3`, `fire.mp3`, `forest.mp3`, `rain.mp3`
- Python samples: `asteroid-tracking.py`, `earth-vision.py`,
  `iss-tracking.py`, `nasa-vision.py`

No `ffmpeg.exe`, `ffprobe.exe`, archive, or video binary appeared in the
classroom file list during this audit. That boundary should remain:

- do not commit FFmpeg binaries
- do not commit large generated media outputs
- ABC README now points students to official FFmpeg installation guidance;
  labs should continue to require FFmpeg on PATH
- `REND3R.bat` should remain classroom-only and should not become an app
  runtime dependency

Recommended classroom next steps:

- decide whether the untracked `assets/` folder is intended to be committed
  or ignored
- keep official FFmpeg download/install guidance visible in classroom docs
- fill the remaining planned lessons/labs as separate curriculum phases
- keep production Rand0m free of FFmpeg binaries, render tabs, local writers,
  and browser-side muxing

## Audit Recommendations

Priority 1:

- Keep validation-scope guardrails explicit in CODEX/RUNBOOK and completion
  reports.
- Do not run full app validation for repo 123, ABC, QA docs, or root docs-only
  work.
- Decide the classroom `assets/` commit/ignore policy before more classroom
  phases.

Priority 2:

- Review package-local validation workflows after their first CI runs and tune
  package-specific commands if needed.
- Review segmented app workflow path filters after their first CI runs and tune
  any missed/overlapping paths.
- Add a lightweight repo 123 workflow lint/check job only if manual workflow
  complexity grows.

Priority 3:

- Add an ABC markdown/asset hygiene workflow when classroom content becomes a
  regular publishing surface.
- Consider a future matrix-based app validation workflow that chooses focused
  test groups by changed path, while preserving the full release gate on main
  and release checkpoints.

## W1.0 Validation

W1.0 was an audit/docs phase. Heavy validation was intentionally skipped.

Performed checks:

- required guidance read for CODEX, RUNBOOK, repo 123 README, and ABC README
- local repo status, branch, identity, remote, and recent commit audit
- package README/pubspec/test/workflow/tag inventory
- app and repo 123 workflow inspection
- ABC lesson/lab/asset inventory
- FFmpeg/binary pattern check for ABC
- ABC README FFmpeg boundary alignment

Skipped by scope:

- `flutter test`
- `flutter build web`
- `validate-all.ps1`
- package tests
- workflow implementation
- deployment

## W1.1 Implementation Notes

W1.1 implemented segmented workflow files without changing runtime app,
package, automation, or classroom features.

Implemented:

- app scoped workflows for App Core, Agents, Test/Inspect, More/Experience,
  Earth, and Full Release Gate
- one package validation workflow in each `rk_*` package repo
- ABC classroom static validation workflow
- root CODEX/RUNBOOK workflow guidance updates

Not changed:

- repo 123 workflow behavior; W1.0 found its workflows already manual/dry-run
  guarded
- Firebase secrets or deploy behavior
- package versions or tags
- classroom lessons/labs/assets

## W1.2 CI Smoke Notes

W1.2 smoke testing found the package workflow failure mode that W1.1 did not
fully cover:

- `rk_ai` failed when `flutter pub get` tried to clone
  `git@github-devkitt:random-knights/rk_core.git`.
- `rk_ui` failed when `flutter pub get` tried to clone private sibling package
  repositories such as `rk_data` through the same local-only alias.
- Plain HTTPS or the repo-scoped `GITHUB_TOKEN` is not sufficient for private
  cross-repo package dependencies unless repository access has been explicitly
  granted.

The package workflow pattern is now:

1. Detect whether `pubspec.yaml` declares local-alias git dependencies.
2. If none exist, skip private SSH setup.
3. If private git dependencies exist, require `RK_PACKAGE_READ_SSH_KEY`.
4. Start `ssh-agent`, add the key, trust `github.com`, and rewrite
   `github-devkitt`, `github-devbot`, and `github-qakitt` aliases to
   `git@github.com:random-knights/`.
5. Run `flutter pub get` after the SSH agent variables are exported.

Segmented workflow smoke review also confirmed:

- app segmented workflows remain non-deploying except for guarded Earth preview
  behavior
- repo 123 workflows remain manual/dry-run oriented
- ABC classroom validation remains static and lightweight
- deploy commands are intentionally absent from package, ABC, and repo 123
  validation workflows
