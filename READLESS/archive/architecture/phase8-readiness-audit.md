# Phase 8 Readiness Audit

Phase 8C verifies that knight1y is ready for a root-level
`C:\Projects\dev-kitt` workspace and monorepo survey. This audit does not move
files, rename folders, change Hive contracts, alter runtime behavior, change UI,
create packages, or touch Firebase configuration.

## Current App State

- Phase 6 extracted `packages/rk_agents` as a definitions-only Dart package.
- Phase 7 established `AgentVisibilityRuntime` as the authoritative runtime
  visibility facade.
- Phase 8A removed the dead legacy KITT unlock path.
- Phase 8B documented the responsibilities still combined inside
  `SettingVisibility`.
- knight1y remains the source app and extraction lab.

## Scan Results

### Import Cycles

A lightweight static import graph scan over `lib` found:

- Dart files scanned: 85.
- Import cycles found: none.

The scan followed `package:kn1ghts/...` and relative Dart imports inside `lib`.

### Legacy Agent Service

Code scan results:

- No active `AgentService` references in `lib` or `packages`.
- No active `AgentService.agentPrompts` references in `lib` or `packages`.
- No active imports of the old `lib/models/agents/definition.dart` path.

Remaining mentions are historical notes in architecture docs that describe
earlier migration phases.

### Barrel Imports

No active imports of:

- `_pages.dart`
- `_widgets.dart`
- `_services.dart`
- `_models.dart`

The old barrel files still exist in `lib`, but they are not used by app code.
They should not be deleted during the root survey unless a separate cleanup
phase confirms they are safe to remove.

### SettingVisibility Usage

Direct code usage is limited to:

- `lib/main.dart`: startup initialization via `SettingVisibility.init()`.
- `lib/services/agents/settings.dart`: implementation.
- `lib/services/agents/visibility_runtime.dart`: facade delegation.
- One comment in `lib/pages/agents/agents.dart` referencing default-hidden
  behavior.

Runtime UI reads and writes go through `AgentVisibilityRuntime`.

### History Writes

`history_events` appears only in:

- `lib/services/agents/history.dart`

Direct history event writes outside `HistoryService` were not found. Other
services use `HistoryService.logEvent()`.

### Package Boundary

`packages/rk_agents` remains definitions-only:

- No Flutter imports.
- No Hive imports.
- No `kn1ghts` imports.
- No widgets, pages, routes, app assets, or runtime services.
- `rk_agents` is consumed through `package:rk_agents/rk_agents.dart`.

The only broad text hit for the word `assets` in `rk_agents` is immutable
prompt copy, not an asset path or dependency.

## Remaining App-Local Runtime Components

These remain in knight1y and should not move during the root-level survey:

- `AgentConfigService`: Hive-backed provider/model/prompt/compat hidden config.
- `AgentPromptRuntime`: runtime prompt cache and fallback bridge.
- `AgentVisibilityRuntime`: app-local visibility/order facade.
- `SettingVisibility`: Hive-backed visibility/order persistence, notifier, and
  history side effects.
- `HistoryService`: `history_events` writer and reader.
- `HistoryMetrics`: app-local formatted history metric parser/calculator.
- `TransmitService`: app-local agent request/reply/failure runtime flow.
- `AgentBooks`: app-branded book asset metadata.

## Clean For Survey

The root-level survey can safely inspect and map:

- Current app/package layout.
- Existing local package dependencies.
- Existing app-local runtime service boundaries.
- Candidate package names and dependency direction.
- Workspace conventions for future `apps/*` and `packages/*` organization.

The survey may document target paths such as:

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

## Unsafe To Move Yet

Do not move or extract yet:

- Hive models, adapters, boxes, keys, or type IDs.
- `AgentConfigService`.
- `AgentPromptRuntime`.
- `AgentVisibilityRuntime`.
- `SettingVisibility`.
- `HistoryService`.
- `HistoryMetrics`.
- `TransmitService`.
- `AgentBooks`.
- Widgets, pages, routes, Firebase config, or app assets.
- Any visibility/settings/history runtime behavior.

## Prerequisites Before Physical Restructure

Before moving folders into a root-level monorepo layout:

1. Record the current `pubspec.yaml` workspace members and path dependencies.
2. Inventory sibling projects under `C:\Projects\dev-kitt`.
3. Identify which apps are active Flutter apps and which are packages/tools.
4. Decide whether root workspace management will use Dart workspaces, Melos, or
   another convention.
5. Confirm package names and dependency direction before moving files.
6. Freeze Firebase config and generated credentials during the survey.
7. Run app-level `flutter pub get` and `flutter analyze` before and after any
   future physical move.

## Remaining Risks

- `SettingVisibility` still combines Hive persistence, notifier mutation,
  order persistence, defaults, and history logging.
- `AgentConfig.hidden` remains compatibility data and may diverge from runtime
  visibility.
- Special/system agent filtering still uses hard-coded app-local lists.
- Root-level projects may have their own package names, Firebase config, or
  dependency constraints that need surveying before any consolidation.

## Readiness Verdict

knight1y is ready for a root-level `C:\Projects\dev-kitt` survey.

It is not yet ready for physical folder restructuring. The next step should be
read-only discovery of the root workspace, sibling apps, existing packages, and
dependency direction.

## Recommended First Root-Level Codex Command

From `C:\Projects\dev-kitt`, run a read-only inventory:

```powershell
Get-ChildItem -Force | Select-Object Name,Mode,Length,LastWriteTime
```

Then inspect candidate app/package manifests without moving files.
