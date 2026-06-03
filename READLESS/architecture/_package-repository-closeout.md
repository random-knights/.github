# Package Repository Closeout

Date: 2026-05-29

Phase CG extracted the Random Knights shared packages into standalone GitHub repositories while keeping the app repositories as independent application repos.

## Final Package Repositories

All package repositories use the `github-devkitt` SSH alias and live under the `random-knights` GitHub organization.

| Package | Type | Remote | Main commit | Tag |
| --- | --- | --- | --- | --- |
| `rk_core` | Dart | `git@github-devkitt:random-knights/rk_core.git` | `9262da5d28bf366b3b1fdabee5790bfab6540339` | `v0.1.0` |
| `rk_data` | Dart | `git@github-devkitt:random-knights/rk_data.git` | `4b9f43f1bb6a0c06582503d595d36d4dd41e3a7d` | `v0.1.0` |
| `rk_media` | Dart | `git@github-devkitt:random-knights/rk_media.git` | `37d956aa63b043d5dcb3c2fb35daca84f5c7f31f` | `v0.1.0` |
| `rk_agents` | Dart | `git@github-devkitt:random-knights/rk_agents.git` | `52f01a68d12624e4727d09f3b020603c98462c5b` | `v0.1.0` |
| `rk_ai` | Dart | `git@github-devkitt:random-knights/rk_ai.git` | `f4d67f4a9635ded4bccdbf2dda2bfa05ab15a723` | `v0.1.0` |
| `rk_branding` | Flutter | `git@github-devkitt:random-knights/rk_branding.git` | `6f92b774750b0d84f0bc75cb0d018abd0a3184a4` | `v0.1.0` |
| `rk_ui` | Flutter | `git@github-devkitt:random-knights/rk_ui.git` | `d9ca4faaf61c825a7ddc69a437ea8ee96d463ef6` | `v0.1.0` |

All seven standalone package working trees were audited clean after generated validation artifacts were removed.

## Dependency Resolution

Committed app and package dependencies now use Git-tag references for extracted `rk_*` packages. No committed dependency uses a personal sibling-machine path such as `C:\Projects\dev-kitt-packages\...`.

Expected Git dependency form:

```yaml
rk_ui:
  git:
    url: git@github-devkitt:random-knights/rk_ui.git
    ref: v0.1.0
```

Current direct consumers:

| Consumer | Extracted packages consumed directly |
| --- | --- |
| `apps/knight1y` | `rk_agents`, `rk_ai`, `rk_branding`, `rk_core`, `rk_data`, `rk_ui` |
| `apps/rand0m` | `rk_branding`, `rk_core`, `rk_ui` |
| `apps/out1ine` | `rk_branding`, `rk_core`, `rk_ui` |
| `apps/up10ad` | `rk_branding`, `rk_core`, `rk_ui` |
| `packages/rk_ai` | `rk_core` |
| `packages/rk_ui` | `rk_branding`, `rk_core`, `rk_data` |

Current transitive package resolution through app lockfiles confirms:

| Package | Resolved commit |
| --- | --- |
| `rk_core` | `9262da5d28bf366b3b1fdabee5790bfab6540339` |
| `rk_data` | `4b9f43f1bb6a0c06582503d595d36d4dd41e3a7d` |
| `rk_agents` | `52f01a68d12624e4727d09f3b020603c98462c5b` |
| `rk_ai` | `f4d67f4a9635ded4bccdbf2dda2bfa05ab15a723` |
| `rk_branding` | `6f92b774750b0d84f0bc75cb0d018abd0a3184a4` |
| `rk_ui` | `d9ca4faaf61c825a7ddc69a437ea8ee96d463ef6` |

`rk_media` has no current app/package consumers.

## Local Path Audit

The final audit checked root package pubspecs and app pubspecs for:

- `../../packages/`
- `../packages/`
- `../../../dev-kitt-packages/`
- `../rk_`
- `dependency_overrides:`

No committed local package dependency paths or dependency overrides remain. Remaining `path:` occurrences are normal third-party package names or Flutter launcher icon asset paths, not package dependency paths.

## Root Package Mirror Decision

Phase CH-1 promotes `C:\Projects\dev-kitt\packages\rk_*` from root-tracked mirror snapshots to the intended local workspace for the standalone package repositories.

Each `packages/rk_*` folder should be a nested Git checkout with:

- `origin` set to `git@github-devkitt:random-knights/<repo>.git`
- local branch `main`
- local and remote tag `v0.1.0`
- a clean working tree

The root repository ignores `/packages/*` and no longer tracks package contents. Package source commits now belong to the individual nested package repositories.

`C:\Projects\dev-kitt-packages` was temporary extraction staging only and was deleted after the nested `packages/rk_*` repositories were verified and workspace validation passed.

Apps continue to consume package releases through Git-tag dependencies, not local paths. The local `packages/rk_*` workspace exists for package development, inspection, and future release work.

## Validation

Final validation command:

```powershell
C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1
```

The closeout validation should pass after any generated Flutter plugin registrant churn is restored.

## Next Phase Recommendation

The recommended next phase is normal package release hygiene: make package changes inside the nested package repo, validate that package, commit/tag/push the package repo, then update app Git-tag dependencies only when a new package release is intended.
