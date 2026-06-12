# Phase 6 Closeout

Phase 6 completed the first `rk_agents` extraction pass and the nearby runtime
ownership cleanup needed before larger package work. This document closes the
phase without moving more code, changing Hive contracts, or changing runtime/UI
behavior.

## Validation Summary

### Import Cycles

Phase 6O scanned Dart imports and exports across:

- `lib`
- `packages/rk_agents/lib`

Result:

- No cycles involving `rk_agents`.
- No page/barrel cycles involving `rk_agents`.
- One raw scanner hit pointed at `lib/firebase_options.dart`, but it came from
  the generated documentation example `import 'firebase_options.dart';` inside a
  comment, not a real import.

### `rk_agents` Purity

`packages/rk_agents` contains only:

- `pubspec.yaml`
- `lib/rk_agents.dart`
- `lib/src/definition.dart`

Boundary scan result:

- No Flutter imports.
- No Hive imports.
- No `kn1ghts` imports.
- No widgets.
- No pages.
- No routes.
- No assets.
- No services.

`rk_agents` remains definitions-only.

### Stale Reference Scan

Code scan result:

- No `AgentService` references in `lib`, `packages`, or `test`.
- No `AgentService.agentPrompts` references in `lib`, `packages`, or `test`.
- No imports of old `lib/models/agents/definition.dart`.
- No direct `package:rk_agents/src/...` imports.

Remaining `AgentService` mentions are historical references in architecture
docs that explain the migration.

## Completed Phase 6 Milestones

### Import And Cycle Cleanup

- Removed direct barrel import dependencies that hid ownership cycles.
- Broke the route-level import cycle between auth, splash, progress, home, and
  sign-in ownership.
- Confirmed `home.dart` no longer imports a barrel that exports itself.
- Confirmed `rk_agents` is imported from the app only through
  `package:rk_agents/rk_agents.dart`.

### Persistence Freeze

- Documented current Hive boxes, type ids, adapters, persisted keys, migration
  sensitive fields, runtime ownership, and extraction constraints.
- Froze these contracts for the current migration phase:
  - `history_events`
  - `agent_settings`
  - `agent_configs`
  - `kn1ghts_hive`
  - `agent_order`
  - `HistoryEvent typeId: 7`
  - `AgentConfig` persistence
  - `SettingVisibility` behavior

### Agent Definitions

- Created immutable agent definition/domain types.
- Created `AgentDefinitionsRegistry`.
- Moved only app-neutral definitions into `packages/rk_agents`.
- Confirmed `rk_agents` has no Flutter, Hive, widgets, assets, routes, or
  runtime services.

### Prompt Runtime Ownership

- Preserved mutable prompt overrides in knight1y.
- Isolated runtime prompt cache ownership in `AgentPromptRuntime`.
- Kept `AgentConfigService` as the prompt/provider/model override owner.
- Removed legacy `AgentService` prompt and metadata bridges from code.

### Metadata And Asset Separation

- Moved immutable prompt/description/tagline reads to `AgentDefinitionsRegistry`.
- Kept app-branded book assets app-local in `AgentBooks`.
- Removed `AgentService` from code.

### Visibility And Settings Audit

- Documented split visibility ownership between:
  - `SettingVisibility` / `agent_settings.visible_<agent>`
  - `AgentConfig.hidden` / `agent_configs`
  - `AgentDefinitionsRegistry.visibleByDefault`
  - `agent_settings.agent_order`
  - `agent_order.order`
- Left behavior unchanged.

### History And Metrics Ownership

- Routed `ChatService` direct `history_events` writes through
  `HistoryService.appendEvent()`.
- Kept event shape, type strings, messages, ids, timestamps, and add semantics.
- Centralized formatted metric parsing and tree-time label logic in
  `HistoryMetrics`.
- Left event schemas and display output unchanged.

## What Is Now Safe

Safe after Phase 6:

- Continue using `rk_agents` as a definitions-only package.
- Add tests around `AgentDefinitionsRegistry`, prompt fallback behavior, and
  `HistoryMetrics`.
- Create app-local facades for visibility/settings/runtime summaries while
  delegating to existing Hive-backed services.
- Replace more duplicated runtime stat aggregation with shared app-local view
  models, as long as output parity is preserved.
- Begin Phase 7 with ownership adapters rather than package extraction.

## What Remains Unsafe

Not safe yet:

- Moving `AgentConfigService` into a package.
- Moving `AgentPromptRuntime` into `rk_agents`.
- Moving `SettingVisibility` into `rk_agents`.
- Moving `HistoryService`, `HistoryEvent`, or `HistoryMetrics` into
  `rk_agents`.
- Moving `TransmitService` into `rk_agents`.
- Moving `AgentBooks` into `rk_agents`.
- Moving Flutter widgets/pages/routes/assets into `rk_agents`.
- Renaming Hive boxes, keys, adapters, or `HistoryEvent typeId: 7`.
- Replacing runtime lists with `AgentDefinitionsRegistry.visibleCandidates`.
- Merging `SettingVisibility` and `AgentConfig.hidden` without a migration plan.
- Normalizing history event taxonomy without preserving current stats output.

## Remaining App-Local Runtime Components

| Component | Current Owner | Why It Stays App-Local |
| --- | --- | --- |
| `AgentConfigService` | knight1y | Owns Hive-backed prompt/provider/model/hidden overrides in `agent_configs`. |
| `AgentPromptRuntime` | knight1y | Owns mutable runtime prompt cache and fallback bridge to defaults. |
| `SettingVisibility` | knight1y | Owns Hive-backed visibility/order, notifier state, and history side effects. |
| `HistoryService` | knight1y | Owns `history_events` reads/writes and `HistoryEvent typeId: 7`. |
| `HistoryMetrics` | knight1y | Parses legacy formatted event messages and preserves current UI metrics. |
| `TransmitService` | knight1y | Couples agent config, provider/model runtime, API requests, messages, and history logging. |
| `AgentBooks` | knight1y | Owns app-branded asset paths and book imagery. |

## Remaining Runtime Risks

- Visibility is still split between `SettingVisibility` and
  `AgentConfig.hidden`.
- Order is still split conceptually between `agent_settings.agent_order` and
  `agent_order.order`.
- `SettingVisibility` writes still have history logging side effects.
- Runtime stats still rely on event `type.contains(...)` semantics.
- Metrics still depend on formatted `HistoryEvent.message` strings.
- General chat errors can still be represented as replies depending on the API
  response shape.
- History summary aggregation remains duplicated at the view-model level even
  though parsing helpers are centralized.
- `TransmitService` still directly combines config, API runtime, chat messages,
  and history logging.

## Recommended Phase 7 Starting Point

Start Phase 7 with app-local runtime facades, not package movement.

Recommended first step:

1. Introduce an app-local `AgentVisibilityRuntime` facade.
2. Delegate to `SettingVisibility` without changing values, Hive keys, notifier
   behavior, or history logging.
3. Move visibility reads/writes behind the facade in low-risk call sites.
4. Document the exact compatibility policy for `AgentConfig.hidden` before
   attempting any merge or mirroring.

Then continue with:

5. Add a `HistorySummaryCalculator` or equivalent app-local view model that uses
   `HistoryMetrics` and preserves current display outputs.
6. Route summary consumers through that calculator incrementally.
7. Introduce a `TransmitRuntime` boundary only after history/config ownership is
   stable.

## Package Extraction Order After Phase 6

Conservative order:

1. `rk_agents`: keep definitions-only; add tests and small immutable policy
   structs only.
2. `rk_ai`: continue as provider/model/pricing/usage/impact owner.
3. `rk_ui`: later move shared visual primitives only after app screens stabilize.
4. Runtime facades stay app-local until Hive and side effects are isolated.
5. Consider future runtime packages only after visibility, config, history, and
   transmit ownership have compatibility adapters and tests.

Do not create another package in the immediate next phase.

## Phase 6 Verdict

Phase 6 is ready to close. `rk_agents` is clean, definitions-only, and safe to
keep as a package dependency. The next work should remain inside knight1y and
focus on app-local runtime ownership facades before any additional extraction.
