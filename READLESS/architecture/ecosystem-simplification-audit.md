# Ecosystem Simplification Audit

Date: 2026-05-30

## Direction Change

The Random Knights ecosystem is simplifying from the previous four-app model to
one primary production app plus shared packages and one support repo:

- `xyz` is the primary application repo.
- `abc` is the consolidated support and learning repo.
- `rk_*` repositories remain standalone shared package repos.
- Firebase should eventually serve only the primary app unless another app
  becomes real later.

CM-5 decision update: the primary product/app name is now `rand0m`, the
production domain target is `rand0m.ai`, and the canonical repo remains
`random-knights/xyz`. The safe rename plan from `apps/knight1y` to
`apps/rand0m` is documented in
`docs/architecture/single-app-naming-consolidation-plan.md`.

CM-7 update: the local app folder is now `apps/rand0m`.

This audit is read-only except for this document. It does not delete files,
deploy Firebase, rename repositories, change package versions, or migrate
Functions.

## Observed Workspace State

Root workspace:

- `C:\Projects\dev-kitt`
- `apps`
- `packages`
- `docs`
- `tooling`
- root Firebase files: `.firebaserc`, `firebase.json`, `firestore.rules`,
  `firestore.indexes.json`

Current app folders found:

| Path | Status |
| --- | --- |
| `apps/rand0m` | Present; current primary app folder |
| `apps/knight1y` | Not present; historical path |
| `apps/up10ad` | Not present |
| `apps/out1ine` | Not present |

Current package folders found:

- `packages/rk_agents`
- `packages/rk_ai`
- `packages/rk_branding`
- `packages/rk_core`
- `packages/rk_data`
- `packages/rk_media`
- `packages/rk_ui`

The app folder was normalized to `apps/rand0m` in CM-7. The canonical GitHub
repo remains `random-knights/xyz`.

## App Repository Status

`apps/rand0m` remains a nested Git repository. CM-3 aligned its `origin`
remote to the new primary application repo:

```text
git@github-devkitt:random-knights/xyz.git
```

The previous stale remote was:

```text
https://github.com/random-knights/kn1ghts.git
```

The canonical GitHub repo is:

```text
https://github.com/random-knights/xyz
```

The current branch is `phase4/workflow-acceleration` and is ahead of its
tracked upstream.

## Firebase Config Findings

Root `.firebaserc` still maps four Hosting targets:

| Target | Site |
| --- | --- |
| `rand0m` | `ai-rand0m` |
| `up10ad` | `ai-up10ad` |
| `out1ine` | `ai-out1ine` |
| `knight1y` | `ai-knight1y` |

Root `firebase.json` still defines four Hosting entries:

| Target | Public path | Current status |
| --- | --- | --- |
| `rand0m` | `apps/rand0m/build/web` | valid path, candidate target for final product identity |
| `up10ad` | `apps/up10ad/build/web` | stale, app folder deleted |
| `out1ine` | `apps/out1ine/build/web` | stale, app folder deleted |
| `knight1y` | `apps/rand0m/build/web` | still valid for the primary app |

`firestore.rules` is still broadly app-neutral and allows read/write only for
verified `@rand0m.ai` users. This remains reasonable as a temporary restrictive
rule, but future production rules should be scoped to the primary app's actual
collections.

`firestore.indexes.json` is present and minimal.

Recommended simplified Firebase future state:

- Keep project `randomknights-xyz` unless a later decision replaces it.
- Keep one Hosting target for the primary app.
- Rename or remap the surviving Hosting target to `xyz` only if the Firebase
  target rename is worth the operational churn.
- Decide whether the public custom domain should be `rand0m.ai` or
  `knight1y.rand0m.ai`.
- Treat four-app Hosting sites and temporary `ai-*` sites as historical cleanup
  candidates after the primary domain is chosen.

## Stale Four-App References

The following stale model references are still present across docs, config, and
tooling:

- `xyz_rand0m`
- `xyz_up10ad`
- `xyz_out1ine`
- `xyz_knight1y` as the old repo name for the primary app
- `abc_c1assr00m`
- `abc_e1even`
- `apps/rand0m`
- `apps/up10ad`
- `apps/out1ine`
- `rand0m.ai` as a separate root app
- `up10ad.rand0m.ai`
- `out1ine.rand0m.ai`
- four-app Hosting targets
- R.U.O.K. ordering
- temporary Hosting URLs:
  - `https://ai-rand0m.web.app`
  - `https://ai-up10ad.web.app`
  - `https://ai-out1ine.web.app`
  - `https://ai-knight1y.web.app`

Docs with known stale or historical four-app references include:

- `docs/architecture/app-shell-contract.md`
- `docs/architecture/ecosystem-foundation.md`
- `docs/architecture/ecosystem-operations-runbook.md`
- `docs/architecture/ecosystem-shell-closeout.md`
- `docs/architecture/ecosystem-shell-contract.md`
- `docs/architecture/firebase-console-inventory.md`
- `docs/architecture/firebase-deployment-rehearsal-auth-gate.md`
- `docs/architecture/firebase-ecosystem-alignment.md`
- `docs/architecture/firebase-production-readiness.md`
- `docs/architecture/firebase-randomknights-xyz-local-wiring.md`
- `docs/architecture/github-cleanup-plan.md`
- `docs/architecture/monorepo-transition-closeout.md`
- `docs/architecture/naming-and-domain-map.md`
- `docs/architecture/package-repository-closeout.md`
- `docs/architecture/package-repository-execution-plan.md`
- `docs/architecture/phase8-closeout.md`
- `docs/architecture/phase8-readiness-audit.md`
- `docs/architecture/repo-package-map.md`
- `docs/architecture/rk_core-scaffold.md`
- `docs/architecture/workspace-tooling.md`

Some of these should be marked historical rather than rewritten. The operational
docs should be updated first because they are most likely to be followed.

## GitHub And Repo Naming Findings

Old naming model still appears in docs:

- `xyz_rand0m`
- `xyz_up10ad`
- `xyz_out1ine`
- `xyz_knight1y` as the old repo name for the primary app
- `abc_c1assr00m`
- `abc_e1even`

New intended model:

- `xyz`
- `abc`
- `rk_core`
- `rk_data`
- `rk_media`
- `rk_agents`
- `rk_ai`
- `rk_branding`
- `rk_ui`

The root `.github/profile/README.md` also still describes the broader Rand0m
AI ecosystem and older repo purpose language. It should be reviewed after the
primary code/docs cleanup so the org profile matches the new shape.

## Package Usage Findings

The surviving primary app currently consumes these shared packages directly via
Git-tag dependencies:

| Package | Used by `apps/rand0m` |
| --- | --- |
| `rk_agents` | Yes |
| `rk_ai` | Yes |
| `rk_branding` | Yes |
| `rk_core` | Yes |
| `rk_data` | Yes |
| `rk_media` | No direct dependency found |
| `rk_ui` | Yes |

Do not delete or retire `rk_media` yet. It remains part of the planned media
contract layer and may support future Oracle GIFs, splash/progress audio, and
render metadata even though the deleted app folders no longer consume it.

Package docs still describe the four-app world in places. Package APIs may also
still include app metadata for `rand0m`, `up10ad`, and `out1ine`; those should
be audited later, but not removed until compatibility and historical migration
needs are clear.

## Tooling Impact

At the time of the CM-1 audit, the root validation tooling still assumed four
app folders:

- `tooling/scripts/pub-get-all.ps1`
- `tooling/scripts/analyze-all.ps1`
- `tooling/scripts/status-app-repos.ps1`
- `tooling/scripts/validate-all.ps1` calls the three scripts above.

Because `apps/rand0m`, `apps/up10ad`, and `apps/out1ine` are gone, the old
validation script shape would fail until those scripts were simplified to one
app plus the package repos.

CM-2 updated active tooling to use this validation shape:

- `apps/rand0m`
- `packages/rk_branding`
- `packages/rk_ui`
- `packages/rk_agents`
- `packages/rk_ai`
- `packages/rk_core`
- `packages/rk_media`
- `packages/rk_data`

The active tooling doc now reflects the single-primary-app workspace.

## Monorepo Usefulness

The monorepo remains useful short-term as an operations workspace because it
collects:

- the primary app checkout,
- nested standalone package checkouts,
- architecture docs,
- Firebase root config,
- validation tooling.

Long-term, the root workspace should either become:

1. an operations/meta repo with docs and tooling only, while `apps/xyz` and
   `packages/rk_*` remain nested standalone repos; or
2. a temporary local workspace that is not treated as a source repository.

Avoid turning the root back into a source-of-truth monorepo for package or app
code unless that architecture decision is made explicitly.

## Recommended Cleanup Sequence

1. Commit or park the current CJ auth/favicon/navigation/Oracle changes in the
   primary app and root docs.
2. Simplify root `firebase.json` and `.firebaserc` to one active Hosting target
   after choosing the desired target/site name.
3. Update operational docs:
   - `ecosystem-operations-runbook.md`
   - `firebase-randomknights-xyz-local-wiring.md`
   - `firebase-production-readiness.md`
   - `firebase-deployment-rehearsal-auth-gate.md`
4. Mark older four-app architecture docs as historical or move them under a
   history/archive docs section.
5. Update GitHub cleanup docs to reflect `xyz` and `abc`.
6. Audit `rk_core` app metadata and shell contracts for deleted app definitions.
7. Decide whether `rk_media` remains future-facing or should be archived later.
8. Plan Firebase live cleanup only after the primary custom domain decision.

## Risks

- Tooling currently fails if run against deleted app paths.
- Root Firebase Hosting config points at missing build directories for deleted
  apps.
- Docs still give conflicting instructions for four-app deployment and repo
  naming.
- The primary app remote has been aligned to `random-knights/xyz`, and the
  local folder is now `apps/rand0m`.
- Removing deleted app metadata from packages too early could break docs,
  package examples, or historical compatibility assumptions.
- Firebase cleanup is stateful and should remain a separate phase with explicit
  rollback notes.

## Open Decisions

- Should the primary public domain be `rand0m.ai` or `knight1y.rand0m.ai`?
- Should the local app folder remain `apps/rand0m` long-term even though the
  canonical repo is `xyz`?
- Should the Firebase Hosting target/site be renamed to `xyz`, reused from
  `knight1y`, or left as-is until a domain is connected?
- Should deleted app docs be archived or rewritten in place?
- Should package contracts keep old app definitions as historical/future
  reserved concepts, or should they be removed in a future breaking version?
- What should happen to old temporary Hosting sites once the primary app domain
  is live?

## Recommended Next Phases

1. **CM-2: Tooling Simplification**
   Update validation scripts to target only the primary app plus `rk_*`
   packages.
2. **CM-4: Firebase Single-App Config Plan**
   Convert the root Firebase config from four Hosting targets to one planned
   primary target, without deploying.
3. **CM-5: Docs Simplification Pass**
   Update operational docs and mark historical four-app docs clearly.
4. **CM-6: Package Contract Simplification Audit**
   Review `rk_core` and `rk_ui` for obsolete multi-app metadata before any
   breaking package release.
