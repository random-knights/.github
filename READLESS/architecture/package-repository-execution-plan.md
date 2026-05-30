# Package Repository Extraction Execution Plan

## Status

This is the execution plan for turning the shared packages under
`C:\Projects\dev-kitt\packages` into standalone GitHub repositories under the
`random-knights` organization.

This phase is documentation only:

- no GitHub repositories were created
- no package code was moved
- no app dependencies were changed
- no remotes were changed
- no package versions were changed in the workspace

Source strategy:

- `docs/architecture/package-repository-strategy.md`

## Target Repositories

| Order | Repository | Description | Package type | Depends on |
| --- | --- | --- | --- | --- |
| 1 | `random-knights/rk_core` | Pure Dart ecosystem identity, navigation, shell, and environment contracts. | Dart | none |
| 2 | `random-knights/rk_data` | Pure Dart data, persistence, audit, response interaction, and favorite contracts. | Dart | none |
| 3 | `random-knights/rk_media` | Pure Dart media asset, source, type, and playback contracts. | Dart | none |
| 4 | `random-knights/rk_agents` | Pure Dart agent definitions, availability policies, actions, and execution contracts. | Dart | none |
| 5 | `random-knights/rk_ai` | Pure Dart AI provider, model, response, pricing, and provider configuration contracts. | Dart | `rk_core` |
| 6 | `random-knights/rk_branding` | Flutter branding primitives for Random Knights apps. | Flutter | `google_fonts` |
| 7 | `random-knights/rk_ui` | Flutter shell, navigation, drawer, dashboard, about, progress, weather, oracle, response, and favorites UI primitives. | Flutter | `rk_branding`, `rk_core`, `rk_data` |

`rk_branding` is included because `rk_ui` and apps depend on it directly. Do
not extract `rk_ui` as a standalone repo unless `rk_branding` is also extracted
or intentionally folded into `rk_ui`.

## Repo Creation Order

Create repositories in dependency order:

1. `rk_core`
2. `rk_data`
3. `rk_media`
4. `rk_agents`
5. `rk_ai`
6. `rk_branding`
7. `rk_ui`

This order allows dependent packages to move from local path dependencies to
Git tag dependencies only after their upstream repos exist and are tagged.

## GitHub Repo Settings

Create each repo in the GitHub UI under `random-knights`.

Recommended initial settings:

```text
Owner: random-knights
Repository name: rk_core
Visibility: private or internal during extraction; public later if desired
Initialize with README: no
Add .gitignore: no
Choose a license: no, unless the org has already finalized package licensing
Default branch: main
```

Use these descriptions:

```text
rk_core: Pure Dart ecosystem identity, navigation, shell, and environment contracts for Random Knights apps.
rk_data: Pure Dart data, persistence, audit, response interaction, and favorite contracts for Random Knights apps.
rk_media: Pure Dart media asset, source, type, and playback contracts for Random Knights apps.
rk_agents: Pure Dart agent definitions, availability policies, actions, and execution contracts for Random Knights apps.
rk_ai: Pure Dart AI provider, model, response, pricing, and provider configuration contracts for Random Knights apps.
rk_branding: Flutter branding primitives for Random Knights apps.
rk_ui: Flutter shell, navigation, drawer, dashboard, about, progress, weather, oracle, response, and favorites UI primitives for Random Knights apps.
```

## Local Clone Strategy

Keep `C:\Projects\dev-kitt` as the integration workspace during extraction.
Use a sibling folder for standalone package repos:

```text
C:\Projects\dev-kitt-packages\
  rk_core
  rk_data
  rk_media
  rk_agents
  rk_ai
  rk_branding
  rk_ui
```

Preferred SSH remotes:

```text
git@github-devkitt:random-knights/rk_core.git
git@github-devkitt:random-knights/rk_data.git
git@github-devkitt:random-knights/rk_media.git
git@github-devkitt:random-knights/rk_agents.git
git@github-devkitt:random-knights/rk_ai.git
git@github-devkitt:random-knights/rk_branding.git
git@github-devkitt:random-knights/rk_ui.git
```

HTTPS fallback remotes:

```text
https://github.com/random-knights/rk_core.git
https://github.com/random-knights/rk_data.git
https://github.com/random-knights/rk_media.git
https://github.com/random-knights/rk_agents.git
https://github.com/random-knights/rk_ai.git
https://github.com/random-knights/rk_branding.git
https://github.com/random-knights/rk_ui.git
```

Clone after the GitHub repos exist:

```powershell
New-Item -ItemType Directory -Force C:\Projects\dev-kitt-packages

git clone git@github-devkitt:random-knights/rk_core.git C:\Projects\dev-kitt-packages\rk_core
git clone git@github-devkitt:random-knights/rk_data.git C:\Projects\dev-kitt-packages\rk_data
git clone git@github-devkitt:random-knights/rk_media.git C:\Projects\dev-kitt-packages\rk_media
git clone git@github-devkitt:random-knights/rk_agents.git C:\Projects\dev-kitt-packages\rk_agents
git clone git@github-devkitt:random-knights/rk_ai.git C:\Projects\dev-kitt-packages\rk_ai
git clone git@github-devkitt:random-knights/rk_branding.git C:\Projects\dev-kitt-packages\rk_branding
git clone git@github-devkitt:random-knights/rk_ui.git C:\Projects\dev-kitt-packages\rk_ui
```

## First Commit Contents

Use copy-first extraction for the first wave. The root workspace remains the
source of truth until all extracted package repos validate and app consumption
is proven.

Copy only package-owned files:

- `pubspec.yaml`
- `README.md`
- `lib/**`
- `test/**`
- `analysis_options.yaml`, if present later
- `LICENSE`, only after the org package license is chosen

Do not copy:

- `.dart_tool/**`
- `build/**`
- `.git/**`
- app files
- workspace tooling files
- `.env` files
- Firebase files
- generated app plugin registrants
- `pubspec.lock`, unless the package repo policy later decides to track locks

Future copy commands:

```powershell
robocopy C:\Projects\dev-kitt\packages\rk_core C:\Projects\dev-kitt-packages\rk_core /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_data C:\Projects\dev-kitt-packages\rk_data /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_media C:\Projects\dev-kitt-packages\rk_media /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_agents C:\Projects\dev-kitt-packages\rk_agents /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_ai C:\Projects\dev-kitt-packages\rk_ai /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_branding C:\Projects\dev-kitt-packages\rk_branding /E /XD .dart_tool build .git /XF pubspec.lock
robocopy C:\Projects\dev-kitt\packages\rk_ui C:\Projects\dev-kitt-packages\rk_ui /E /XD .dart_tool build .git /XF pubspec.lock
```

After copying, set each extracted package version to `0.1.0` in its standalone
repo, keep `publish_to: none`, validate, commit, and tag.

Initial commit messages:

```text
chore: extract rk_core package
chore: extract rk_data package
chore: extract rk_media package
chore: extract rk_agents package
chore: extract rk_ai package
chore: extract rk_branding package
chore: extract rk_ui package
```

## Dependency Migration Plan

### Stage 1: Keep Local Path Dependencies

Before any app migration, keep all current local path dependencies in
`C:\Projects\dev-kitt`.

Workspace package dependencies remain:

```yaml
rk_ai:
  rk_core:
    path: ../rk_core

rk_ui:
  rk_branding:
    path: ../rk_branding
  rk_core:
    path: ../rk_core
  rk_data:
    path: ../rk_data
```

Apps also keep existing `../../packages/*` paths during repository creation.

For local validation before the Git repo/tag is available, do not replace
committed dependencies with personal sibling-machine paths. Use a temporary,
uncommitted override only:

```yaml
dependency_overrides:
  rk_core:
    path: ../../../dev-kitt-packages/rk_core
```

Once `random-knights/rk_core` and `v0.1.0` are available, the committed
migration path is the Git dependency form documented below.

### Stage 2: Convert Standalone Package Interdependencies

After upstream repos are tagged, update only the standalone package repos to
use Git tag dependencies.

In `random-knights/rk_ai`:

```yaml
dependencies:
  rk_core:
    git:
      url: git@github-devkitt:random-knights/rk_core.git
      ref: v0.1.0
```

In `random-knights/rk_ui`:

```yaml
dependencies:
  rk_branding:
    git:
      url: git@github-devkitt:random-knights/rk_branding.git
      ref: v0.1.0
  rk_core:
    git:
      url: git@github-devkitt:random-knights/rk_core.git
      ref: v0.1.0
  rk_data:
    git:
      url: git@github-devkitt:random-knights/rk_data.git
      ref: v0.1.0
```

Do not change app `pubspec.yaml` files in this stage.

### Stage 3: Convert App Dependencies One App At A Time

After all package repos are tagged and validated, migrate apps from local paths
to Git tags one app at a time.

Recommended app order:

1. `apps/rand0m`
2. `apps/out1ine`
3. `apps/up10ad`
4. `apps/knight1y`

Knight1y moves last because it consumes the most packages.

Use exact tags, not floating branches:

```yaml
rk_core:
  git:
    url: git@github-devkitt:random-knights/rk_core.git
    ref: v0.1.0
```

Keep pub.dev out of scope for this wave. Every package should keep
`publish_to: none` until the ecosystem intentionally starts a publishing phase.

## Version and Tag Plan

Initial standalone version:

```text
0.1.0
```

Initial Git tags:

```text
rk_core     v0.1.0
rk_data     v0.1.0
rk_media    v0.1.0
rk_agents   v0.1.0
rk_ai       v0.1.0
rk_branding v0.1.0
rk_ui       v0.1.0
```

Tag after package-level validation passes:

```powershell
git -C C:\Projects\dev-kitt-packages\rk_core tag -a v0.1.0 -m "rk_core v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_data tag -a v0.1.0 -m "rk_data v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_media tag -a v0.1.0 -m "rk_media v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_agents tag -a v0.1.0 -m "rk_agents v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_ai tag -a v0.1.0 -m "rk_ai v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_branding tag -a v0.1.0 -m "rk_branding v0.1.0"
git -C C:\Projects\dev-kitt-packages\rk_ui tag -a v0.1.0 -m "rk_ui v0.1.0"
```

Push only after the package repo has a clean status and validation passes:

```powershell
git -C C:\Projects\dev-kitt-packages\rk_core push origin main
git -C C:\Projects\dev-kitt-packages\rk_core push origin v0.1.0
```

Repeat for each package in dependency order.

## Validation Commands

Run validation from the standalone package repo after copying files and before
tagging.

Pure Dart packages:

```powershell
cd C:\Projects\dev-kitt-packages\rk_core
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test

cd C:\Projects\dev-kitt-packages\rk_data
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test

cd C:\Projects\dev-kitt-packages\rk_media
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test

cd C:\Projects\dev-kitt-packages\rk_agents
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test

cd C:\Projects\dev-kitt-packages\rk_ai
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test
```

Flutter packages:

```powershell
cd C:\Projects\dev-kitt-packages\rk_branding
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test

cd C:\Projects\dev-kitt-packages\rk_ui
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test
```

After any future app dependency migration, run:

```powershell
C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1
```

If validation regenerates app plugin registrants, review those files before
committing and restore generated churn unless it is intentionally part of the
phase.

## First Commit Sequence

Run this pattern once per extracted package after copy and validation.

Example for `rk_core`:

```powershell
cd C:\Projects\dev-kitt-packages\rk_core
git branch -M main
git status --short
git add README.md pubspec.yaml lib test
git commit -m "chore: extract rk_core package"
git tag -a v0.1.0 -m "rk_core v0.1.0"
git status --short
git push origin main
git push origin v0.1.0
```

Use equivalent package names and commit messages for the remaining package
repos.

## Rollback Plan

### Repo Created With Wrong Settings

If no code has been pushed:

1. stop extraction for that package
2. correct settings in the GitHub UI or delete/recreate the empty repo
3. keep `C:\Projects\dev-kitt\packages` unchanged

### Package Copy Is Wrong Before Push

If the standalone repo has not been pushed:

```powershell
git -C C:\Projects\dev-kitt-packages\rk_core reset --hard HEAD
```

Then recopy the package and validate again.

### Package Copy Is Wrong After Push

Prefer a fix-forward commit. Only force-push if:

- the repo is still private/internal
- no app consumes it yet
- no tag has been published for app consumption
- the team explicitly approves rewriting the package repo

If the `v0.1.0` tag is wrong and already pushed, create `v0.1.1` instead of
rewriting history unless the repo is still private and unused.

### App Git Dependency Migration Fails

Revert the app dependency change to local paths:

```yaml
rk_core:
  path: ../../packages/rk_core
```

Then run:

```powershell
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
```

Keep the package repos as mirrors until the dependency issue is resolved.

### Standalone Package Dependency Migration Fails

Keep the extracted repo on local path dependencies during the first tag, or
create a follow-up tag after upstream Git dependencies are corrected.

Do not change app dependencies until standalone package dependencies are stable.

## Final Execution Checklist

1. Confirm `C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1` passes.
2. Confirm `rk_branding` is approved as a standalone package repo.
3. Create the seven GitHub repos under `random-knights`.
4. Clone repos into `C:\Projects\dev-kitt-packages`.
5. Copy package contents in dependency order.
6. Set standalone package versions to `0.1.0`.
7. Keep `publish_to: none`.
8. Validate each package.
9. Commit and tag each package.
10. Push `main` and `v0.1.0` for each package.
11. Convert standalone package interdependencies to Git tag refs.
12. Validate and tag follow-up releases if dependency changes require it.
13. Migrate app dependencies from local paths to Git tags one app at a time.
14. Run full workspace validation after every app migration.
15. Decide whether root `packages/*` remain integration mirrors or are retired in a later phase.

## Recommended Next Phase

```text
Begin Ecosystem Repository Phase CG: Package Repo Creation Dry Run.

Goal:
Verify GitHub org permissions, final repo names, descriptions, visibility, SSH
identity, and local extraction folder readiness before creating package repos.

Rules:
- do not move package code yet
- do not change app dependencies yet
- do not push until each repo is validated
```
