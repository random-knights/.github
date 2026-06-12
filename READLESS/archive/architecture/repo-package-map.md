# Random Knights Repo and Package Map

## Current State

- Current repo: `random-knights/kn1ghts`
- Current app: `knight1y`
- Existing packages:
  - `packages/rk_ai`
  - `packages/rk_ui`

## Target Apps

The target app layout uses an `apps/*` structure:

- `apps/rand0m`
- `apps/up10ad`
- `apps/out1ine`
- `apps/knight1y`

## Planned Packages

Shared packages should remain app-neutral and use the `rk_` prefix:

- `packages/rk_agents`
- `packages/rk_auth`
- `packages/rk_connections`
- `packages/rk_core`
- `packages/rk_data`
- `packages/rk_media`

## Repo Strategy Options

### Option 1: One Monorepo With apps/*

Keep all apps and shared packages in one repository:

- `apps/rand0m`
- `apps/up10ad`
- `apps/out1ine`
- `apps/knight1y`
- `packages/*`

This keeps shared package extraction, cross-app refactors, and dependency alignment simple while the ecosystem is still taking shape.

### Option 2: Separate Repos Per App Plus Shared Packages

Split each app into its own repository while keeping shared packages in one or more shared package repos.

This may make sense once app boundaries, release ownership, and deployment workflows are stable, but it adds coordination overhead for shared package changes.

## Recommendation

Keep one monorepo until the apps stabilize, then split only if needed.

The current migration work is still extracting shared boundaries from the original app. A monorepo keeps those moves incremental and reversible while avoiding premature repository fragmentation.

## Naming Rules

- Public app names use `rand0m`, `up10ad`, `out1ine`, and `knight1y`.
- Package names use the `rk_` prefix.
- Firebase IDs use the `ai.rand0m.*` scheme.
- Domains use `*.rand0m.ai`.
