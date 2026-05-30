# Phase 8 Closeout

Phase 8 closes the app-local runtime cleanup checkpoint before any root-level
`C:\Projects\dev-kitt` workspace or monorepo restructuring begins. This
document freezes the boundary between work completed inside knight1y and the
future root-level survey.

No files or folders were moved. No packages were created. No Firebase
configuration, Hive box, Hive key, adapter typeId, runtime behavior, or UI
behavior changed as part of this closeout.

## Completed Cleanup Milestones

- Phase 6 established clean extraction boundaries and created
  `packages/rk_agents` as a definitions-only Dart package.
- Phase 7 established `AgentVisibilityRuntime` as the authoritative runtime
  visibility/order facade.
- Phase 8A removed the dead legacy KITT unlock path:
  `ChatPage._loadKittUnlocked()` and `AgentConfigService.isKittUnlocked()`.
- Phase 8B documented the responsibilities still combined inside
  `SettingVisibility`.
- Phase 8C completed the final app-cleanup readiness audit for root-level
  discovery.

## Extracted And Shared Boundaries

Currently extracted:

- `packages/rk_agents`

`rk_agents` owns:

- immutable agent definitions
- immutable metadata
- default prompts, descriptions, and taglines
- runtime/capability policy structs that are definition-only

`rk_agents` does not own:

- Flutter widgets
- Hive models, boxes, keys, adapters, or typeIds
- runtime services
- history logging
- metrics parsing
- route logic
- app assets or branding
- Firebase configuration

## Remaining App-Local Runtime Ownership

These components remain app-local in knight1y:

- `AgentConfigService`
- `AgentPromptRuntime`
- `AgentVisibilityRuntime`
- `SettingVisibility`
- `HistoryService`
- `HistoryMetrics`
- `TransmitService`
- `AgentBooks`

They remain local because they are tied to one or more of:

- Hive persistence
- runtime mutation
- notifier side effects
- history logging
- formatted runtime metrics
- app-branded assets
- request/reply/failure flow
- UI expectations

## Deprecated Compatibility Paths

Compatibility paths intentionally retained:

- `AgentConfig.hidden`
- `agent_configs.hidden`
- `AgentConfigService.isAgentHidden()`
- `AgentConfigService.setAgentHidden()`
- config-dialog save/reset writes of `AgentConfig.hidden`

These remain frozen until a formal Hive migration plan exists. Runtime
visibility is still owned by `AgentVisibilityRuntime`, backed by
`agent_settings.visible_<name>`.

Deprecated dead code removed in Phase 8A:

- `ChatPage._loadKittUnlocked()`
- `AgentConfigService.isKittUnlocked()`

## Intentional Technical Debt

Known debt accepted at this checkpoint:

- `SettingVisibility` still combines Hive persistence, defaults, notifier
  mutation, order persistence, and history logging.
- `AgentConfig.hidden` can diverge from runtime visibility after runtime
  visibility toggles.
- Special/system agent filtering still uses app-local hard-coded lists.
- Old barrel export files still exist but are not actively imported.
- Root-level sibling apps/packages have not been surveyed yet.

## Extraction Readiness

Safe for extraction or sharing now:

- immutable definitions and metadata already in `rk_agents`
- documentation of package boundaries
- future pure interfaces that contain no Hive, Flutter widgets, app assets,
  Firebase config, or history side effects

Unsafe for extraction now:

- Hive models/adapters/boxes/keys/typeIds
- `AgentConfigService`
- `AgentPromptRuntime`
- `AgentVisibilityRuntime`
- `SettingVisibility`
- `HistoryService`
- `HistoryMetrics`
- `TransmitService`
- `AgentBooks`
- pages, widgets, routes, Firebase config, and assets

## Workspace Readiness

Safe now:

- read-only root-level survey of `C:\Projects\dev-kitt`
- inventory of sibling app/package folders
- manifest inspection
- dependency direction mapping
- documentation of target workspace shape

Unsafe now:

- physical folder restructuring
- moving apps into `apps/*`
- moving packages across repositories
- changing path dependencies
- changing Firebase files
- changing app IDs or generated credentials
- merging repositories

## Knight1y Status

Knight1y remains the active source app and extraction lab.

Root-level restructuring has not started. The next phase should inspect the
root workspace without moving files.

## Future Target Workspace Shape

Target shape to survey and validate:

- `apps/knight1y`
- `apps/rand0m`
- `apps/up10ad`
- `apps/out1ine`
- `packages/rk_agents`
- `packages/rk_ai`
- `packages/rk_auth`
- `packages/rk_connections`
- `packages/rk_core`
- `packages/rk_data`
- `packages/rk_media`
- `packages/rk_ui`
- `packages/rk_branding`

This shape is a planning target, not an instruction to move files yet.

## Recommended Package Extraction Order

Recommended future extraction order after the root-level survey:

1. `rk_branding`
2. `rk_core`
3. `rk_ui`
4. `rk_auth`
5. `rk_ai`
6. `rk_connections`
7. `rk_data`
8. `rk_media`

Notes:

- `rk_agents` already exists as a first definitions-only package.
- Runtime services should not move until app-local side effects are isolated
  behind stable interfaces.
- Branding can move early only if it remains asset-safe and does not drag route,
  Firebase, Hive, or widget-runtime dependencies across boundaries.

## Root-Level Strategy

Recommended strategy:

- Keep apps as separate git repositories initially unless the root survey proves
  a monorepo move is low risk.
- Prefer Flutter/Dart workspace and path-package wiring before physical app
  relocation.
- Phase the monorepo gradually:
  1. inventory
  2. dependency graph
  3. package boundary confirmation
  4. path dependency cleanup
  5. optional shared workspace tooling
  6. only then physical movement
- Avoid merging histories or moving Firebase-backed apps until each app's
  config, secrets policy, and deployment path are documented.

## Recommended Migration Order

1. Root-level read-only inventory.
2. Root-level app/package manifest survey.
3. Dependency direction map across existing projects.
4. Confirm package naming and ownership.
5. Decide workspace tooling.
6. Add or adjust path packages without moving app folders.
7. Run app-level validation.
8. Plan physical restructuring as a separate migration with rollback notes.

## Recommended Next Command

From `C:\Projects\dev-kitt`, run:

```powershell
Get-ChildItem -Force | Select-Object Name,Mode,Length,LastWriteTime
```

Then inspect candidate manifests before making any changes:

- `pubspec.yaml`
- `melos.yaml`
- `package.json`
- Firebase config files
- app-specific README or architecture docs

## Verdict

Phase 8 is complete.

Knight1y is ready for a root-level workspace survey. It is not ready for
physical workspace restructuring until the root-level inventory and dependency
map are complete.
