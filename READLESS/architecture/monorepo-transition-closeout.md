# Monorepo Transition Closeout

## Status

The physical workspace transition is complete.

The active root workspace is `C:\Projects\dev-kitt`.

Final top-level structure:

```text
C:\Projects\dev-kitt
  .git
  .github
  apps
    knight1y
    rand0m
    out1ine
    up10ad
  dev-kitt
  flutter
  packages
    rk_agents
    rk_ai
    rk_branding
    rk_ui
```

The old root-level app folders were removed after the app repositories were
relocated under `apps/*`.

## App Repositories

The apps remain independent nested git repositories. The root repository ignores
`apps/*` and does not currently track app contents, app gitlinks, or submodule
metadata.

Current app locations and roles:

| App | Location | Role | Domain |
| --- | --- | --- | --- |
| Knight1y | `apps/knight1y` | Agent command center and workflow app | `knight1y.rand0m.ai` |
| Rand0m | `apps/rand0m` | Public root/chat landing app | `rand0m.ai` |
| Out1ine | `apps/out1ine` | Oracle/lightweight future test app | `out1ine.rand0m.ai` |
| Up10ad | `apps/up10ad` | Creative render/upload tool | `up10ad.rand0m.ai` |

Each app owns its own application source, app-local assets, platform folders,
Firebase configuration, `.env` usage, generated app files, and app git history.

## Root Repository Ownership

The root repository owns shared packages and workspace-level planning.

Tracked package ownership:

| Package | Ownership |
| --- | --- |
| `packages/rk_agents` | Agent definitions, metadata, prompts, tags, and definition-only policy structs |
| `packages/rk_ai` | Provider/model/value objects and AI pricing or usage primitives |
| `packages/rk_branding` | Shared brand colors and font primitives |
| `packages/rk_ui` | Shared UI primitives, progress components, motion, painters, and display widgets |

The root `.gitignore` intentionally ignores:

- `apps/*`
- `flutter/`
- `dev-kitt/`
- `.github/`
- generated Dart and Flutter artifacts
- package `pubspec.lock` files created during validation

`flutter/` is a local Flutter SDK checkout. `dev-kitt/` and `.github/` are
separate local repositories and should not be absorbed by the root repository
without a separate decision.

## Validation

The closeout validation target is:

```powershell
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
```

Run from each package:

- `packages/rk_branding`
- `packages/rk_ui`
- `packages/rk_agents`
- `packages/rk_ai`

Run from each app:

- `apps/knight1y`
- `apps/rand0m`
- `apps/out1ine`
- `apps/up10ad`

All listed packages and apps analyzed cleanly at closeout.

## Remaining Risks

- App repositories are ahead of their remotes. Push or otherwise back them up
  before any further history or repository-shape changes.
- The root repository ignores `apps/*`; root commits will not include app
  changes unless a future phase intentionally changes that strategy.
- `.github/` is a nested repository with assets and profile content. It is not
  root-owned workspace metadata yet.
- Firebase, `.env`, app IDs, deployment targets, and generated credentials were
  intentionally left untouched.
- The current package set is intentionally small. Do not move runtime services
  into shared packages until app-specific persistence, Firebase, Hive, route,
  and asset ownership are isolated.

## Commit And Push Guidance

Root repository:

```powershell
git add .gitignore docs/architecture/monorepo-transition-closeout.md
git commit -m "Close out monorepo transition"
```

Nested app repositories:

Commit and push each app independently if its `pubspec.yaml` and
`pubspec.lock` path updates are not already pushed.

Do not add `apps/*`, `flutter/`, `dev-kitt/`, or `.github/` from the root
repository.

## Next Extraction Roadmap

### Shared About Assets And Components

Inventory About pages across `rand0m`, `out1ine`, `up10ad`, and `knight1y`.
Extract only app-neutral visual primitives first:

- dot matrices and background painters
- orbit/wheel primitives
- theme cards and static display widgets
- asset naming conventions

Avoid moving app-specific copy, routes, social links, Firebase data, or branded
page composition in the first pass.

Candidate package: `rk_ui` for components, `rk_branding` for brand constants,
and future `rk_media` for reusable media assets.

### Shared Weather Shell And Service Contracts

Extract the weather feature in two layers:

1. shared shell widgets and result display contracts
2. service interfaces and DTOs

Keep API keys, environment loading, permission behavior, location policy, and
network implementation app-local until a stable `rk_data` or `rk_connections`
contract exists.

Candidate package: future `rk_data` for DTOs and interfaces, `rk_ui` for shell
widgets.

### Shared Out1ine Shell And Assets

Separate Out1ine into reusable presentation and app-owned runtime:

- shared oracle card/list/details surfaces
- shared static assets where licensing and naming are clear
- app-local draw/history/storage/runtime logic

Candidate package: future `rk_media` for assets and `rk_ui` for display
components.

### Shared Splash And Progress Components

Extract splash/progress components before page-level flows:

- progress bars, waves, circular progress, and loading surfaces
- splash-safe brand primitives
- animation helpers with no route or auth dependency

Candidate package: `rk_ui`.

### Future `rk_core`

Create `rk_core` only when there are stable, app-neutral primitives shared by at
least two apps:

- typed IDs and value objects
- feature flags or capability descriptors
- lightweight result/error types
- platform-neutral utilities

Do not place Firebase, Hive, Flutter widgets, asset loading, or app navigation
in `rk_core`.

### Future `rk_data`

Create `rk_data` after service contracts stabilize:

- DTOs
- repository interfaces
- serialization boundaries
- cache contracts

Keep credentials, Firebase clients, local persistence, and concrete HTTP clients
outside until app behavior is well understood.

### Future `rk_media`

Create `rk_media` after asset ownership and licensing are documented:

- reusable static assets
- media manifests
- asset lookup helpers

Do not move large or app-specific media without a bundle-size and deployment
plan.

## Recommended Next Phase

Begin with a read-only feature inventory:

```text
Phase L: Shared About And Progress Inventory
```

Goals:

- compare About, splash, and progress implementations across all four apps
- identify duplicate widgets and assets
- classify each candidate as `rk_ui`, `rk_branding`, future `rk_media`, or
  app-local
- produce a no-source-change extraction plan before moving code
