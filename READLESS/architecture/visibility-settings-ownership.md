# Visibility Settings Ownership

Phase 6K documents current visibility and order ownership before any cleanup.
This is an audit and migration plan only. It does not change Hive schemas,
type ids, box names, keys, UI behavior, or runtime filtering.

## Current Persisted Contracts

### `agent_settings`

Persistence owner: `SettingVisibility`.

Runtime facade: `AgentVisibilityRuntime`.

Keys:

- `visible_<agentName>`: `bool`.
- `agent_order`: `List<String>`.

Runtime behavior:

- `AgentVisibilityRuntime.isAgentVisible(name)` delegates to
  `SettingVisibility.isAgentVisible(name)`, which reads `visible_<agentName>`.
- Missing visibility falls back to `_defaultVisibility(name)`.
- `_defaultVisibility('aut0mate')` is `false`.
- All other missing visibility values default to `true`.
- `AgentVisibilityRuntime.setAgentVisibility(name, visible)` delegates to
  `SettingVisibility.setAgentVisibility(name, visible)`, which writes the key,
  increments `changes`, and logs a `HistoryService` event.
- `AgentVisibilityRuntime.agentOrder` delegates to
  `SettingVisibility.agentOrder`, which reads `agent_settings.agent_order`.
- Setting `AgentVisibilityRuntime.agentOrder` delegates to
  `SettingVisibility.agentOrder`, which writes `agent_settings.agent_order`,
  increments `changes`, and logs a `HistoryService` event.

### `agent_configs`

Owner today: `AgentConfigService`.

Relevant field:

- `hidden`: `bool` in the per-agent config map.

Runtime behavior:

- `AgentConfig.hidden` defaults to `true` for `aut0mate`.
- `AgentConfig.hidden` defaults to `false` for all other agents.
- `AgentSettingsDialog` initializes its hidden toggle from
  `AgentVisibilityRuntime`, then writes `hidden` for compatibility on
  save/reset.
- Phase 8A removed the unused `AgentConfigService.isKittUnlocked()` helper.
- `AgentConfig.hidden` does not currently drive the main agent list,
  history shelf, or terminal visible-agent filter.

### `agent_order`

Owner today: `AgentOrderService`.

Keys:

- box: `agent_order`
- key: `order`

Runtime behavior:

- `AgentOrderService` can load and save a `List<String>`.
- No current app call site reads or writes `AgentOrderService`.
- This box overlaps conceptually with `agent_settings.agent_order` and must
  remain frozen until a migration plan chooses a compatibility strategy.

## Immutable Definition Defaults

Owner today: `rk_agents`.

Relevant fields/helpers:

- `AgentMetadata.systemAgent`.
- `AgentMetadata.visibleByDefault`.
- `AgentDefinitionsRegistry.visibleCandidates`.
- `AgentDefinitionsRegistry.names`.

Runtime behavior:

- `visibleByDefault` documents definition-level default visibility.
- `aut0mate` is marked `visibleByDefault: false`.
- Current runtime filtering still uses `SettingVisibility._defaultVisibility()`
  for missing persisted visibility keys.
- `visibleCandidates` is not the runtime source of truth for the current UI.

## Visibility Read Map

| Reader | Reads | Purpose |
| --- | --- | --- |
| `AgentsPage._buildAgentTile()` | `AgentVisibilityRuntime.isAgentVisible(name)` | Dims and disables invisible agent tiles. |
| `AgentsSettingsPage._buildTile()` | `AgentVisibilityRuntime.isAgentVisible(name)` | Chooses visibility icon state for each settings row. |
| `HistoryPage` | `AgentVisibilityRuntime.isAgentVisible(agent)` | Dims and disables history books for invisible agents. |
| `TerminalBox._statusPhase()` | `AgentVisibilityRuntime.isAgentVisible(cfg.agentName)` | Filters the active-agent runtime journal list. |
| `TerminalBox._configureForContext()` | `AgentVisibilityRuntime.isAgentVisible(cfg.agentName)` | Counts visible agents in device/runtime lines. |
| `AgentSettingsDialog._loadConfig()` | `!AgentVisibilityRuntime.isAgentVisible(agentName)` | Initializes the hidden toggle from the runtime source of truth. |
| `AgentSettingsDialog._isNonDefault` | local `_hidden` against default | Determines whether reset should be enabled. |
| `AgentsPage._refreshAgentLists()` | `AgentVisibilityRuntime.agentOrder` | Applies persisted list order before splitting normal/system agents. |
| `AgentsSettingsPage._sync()` | `AgentVisibilityRuntime.agentOrder` | Seeds the reorderable settings list. |

## Visibility Write Map

| Writer | Writes | Side effects |
| --- | --- | --- |
| `AgentsSettingsPage` visibility button | `AgentVisibilityRuntime.setAgentVisibility(name, !visible)` | Delegates to `SettingVisibility`; writes `agent_settings.visible_<name>`, increments `SettingVisibility.changes`, logs `setting_change` with `visibility_on` or `visibility_off`. |
| `AgentSettingsDialog._handleSave()` | `AgentConfigService.saveConfig(AgentConfig.hidden, mirrorVisibility: true)` | Writes `agent_configs.<agentName>.hidden`; also saves prompt/provider/model config, updates prompt runtime cache, and conditionally mirrors to `agent_settings.visible_<name>`. |
| `AgentSettingsDialog._handleReset()` | `AgentConfigService.resetConfig()` then `setAgentHidden()` | Deletes config, resets runtime prompt, persists default hidden state in `agent_configs`, and conditionally mirrors to `agent_settings.visible_<name>`. |

## Order Read Map

| Reader | Reads | Purpose |
| --- | --- | --- |
| `AgentsPage._refreshAgentLists()` | `AgentVisibilityRuntime.agentOrder` | Determines agent list order; falls back to `AgentDefinitionsRegistry.names`. |
| `AgentsSettingsPage._sync()` | `AgentVisibilityRuntime.agentOrder` | Determines settings list order; falls back to `AgentDefinitionsRegistry.names`. |

## Order Write Map

| Writer | Writes | Side effects |
| --- | --- | --- |
| `AgentsSettingsPage._onReorder()` | `AgentVisibilityRuntime.agentOrder` | Delegates to `SettingVisibility`; writes `agent_settings.agent_order`, increments `changes`, logs `setting_change` with `agent_reorder`. |
| `AgentOrderService.saveOrder()` | `agent_order.order` | No current app call site found. |

## History Logging Side Effects

`SettingVisibility` still has hidden runtime side effects. Phase 7A keeps those
side effects intact by delegating through `AgentVisibilityRuntime`:

- Visibility writes log `HistoryService.logEvent(agent: name, type:
  'setting_change')`.
- Order writes log `HistoryService.logEvent(agent: 'system', type:
  'setting_change')`.

This means visibility/order persistence is also a history producer. A future
cleanup should preserve these log events until telemetry expectations are
explicitly changed.

## Source-Of-Truth Conflicts

### Visibility

There are two persisted visibility-like fields:

- `agent_settings.visible_<agentName>` from `SettingVisibility`.
- `agent_configs.<agentName>.hidden` from `AgentConfigService`.

Current UI behavior is split:

- Agent list, settings visibility icon, history shelf, and terminal use
  `AgentVisibilityRuntime`, which delegates to `SettingVisibility`.
- Agent config dialog initializes hidden state from `AgentVisibilityRuntime`,
  while still writing `AgentConfig.hidden` for compatibility on save/reset.
- Phase 8A removed the unused `ChatPage._loadKittUnlocked()` read path.

These two persisted concepts can disagree. If `visible_aut0mate` is `true` but
`agent_configs.aut0mate.hidden` is `true`, the main agent surfaces can show the
agent while config still considers it hidden. If the reverse is true, the config
dialog can say visible while the main agent surfaces stay disabled.

### Default Visibility

There are two sources of default visibility:

- `SettingVisibility._defaultVisibility()`.
- `AgentMetadata.visibleByDefault` in `rk_agents`.

They currently agree for `aut0mate`, but only `SettingVisibility` controls
runtime fallback behavior. `rk_agents` defaults should remain descriptive until
a compatibility adapter is introduced.

### Order

There are two persisted order locations:

- `agent_settings.agent_order`.
- `agent_order.order`.

Current UI reads and writes `agent_settings.agent_order`. `AgentOrderService`
exists but appears unused. The unused `agent_order.order` contract must not be
deleted or renamed without a migration decision because existing installs may
contain data there.

### Special/System/Secret Filtering

`AgentsPage` uses a hard-coded special list:

- `rand0m`
- `dai1y`
- `knight1y`
- `aut0mate`

`rk_agents` also marks these definitions with `metadata.systemAgent`.
The hard-coded list is the current runtime split between normal and system
agents. Replacing it with package metadata is likely safe later, but it should
be done as an explicit no-behavior migration with ordering screenshots or
manual verification.

## Phase 7B Conflict Matrix

| Path | Read/Write | Box/key | History logging | Notifier update | Runtime UI responds |
| --- | --- | --- | --- | --- | --- |
| `AgentVisibilityRuntime.isAgentVisible(name)` | Read | `agent_settings.visible_<name>` via `SettingVisibility` | No | No | Yes. Agent list, history shelf, terminal status, and settings visibility icon use this path. |
| `AgentVisibilityRuntime.setAgentVisibility(name, visible)` | Write | `agent_settings.visible_<name>` via `SettingVisibility` | Yes, `setting_change` with `visibility_on` or `visibility_off` | Yes, `SettingVisibility.changes` increments | Yes. Terminal listens to `changes`; other pages reread on build/state refresh. |
| `AgentVisibilityRuntime.agentOrder` | Read | `agent_settings.agent_order` via `SettingVisibility` | No | No | Yes. Agent list/settings order use this path. |
| `AgentVisibilityRuntime.agentOrder = order` | Write | `agent_settings.agent_order` via `SettingVisibility` | Yes, `setting_change` with `agent_reorder` | Yes, `SettingVisibility.changes` increments | Yes. Stored list order is used by agent/settings pages. |
| `AgentSettingsDialog._loadConfig()` | Read | `agent_settings.visible_<name>` through `AgentVisibilityRuntime.isAgentVisible()`; also reads config prompt/provider/model through `AgentConfigService.getConfig()` | No | No | Yes. The dialog hidden toggle now reflects the runtime visibility source of truth. |
| `AgentSettingsDialog._handleSave()` | Write | `agent_configs.<agentName>.hidden` through `AgentConfigService.saveConfig(..., mirrorVisibility: true)`; conditionally `agent_settings.visible_<name>` through `AgentVisibilityRuntime.setAgentHiddenMirror()` | Conditional. Logs `visibility_on` or `visibility_off` only if runtime visibility differs from `!hidden`. | Conditional. Increments `SettingVisibility.changes` only if runtime visibility differs from `!hidden`. | Yes, only when mirroring reconciles a divergent runtime visibility value. |
| `AgentSettingsDialog._handleReset()` | Write/delete/write | Deletes `agent_configs.<agentName>`, then writes `agent_configs.<agentName>.hidden` through `setAgentHidden()`; conditionally `agent_settings.visible_<name>` through mirroring | Conditional. Logs only if runtime visibility differs from the reset hidden inverse. | Conditional. Increments only if runtime visibility differs from the reset hidden inverse. | Yes, only when mirroring reconciles a divergent runtime visibility value. |
| `AgentConfigService.isAgentHidden(name)` | Read | `agent_configs.<agentName>.hidden` | No | No | Only callers that explicitly ask for config hidden. |

## AgentConfig.hidden Read/Write Map

Phase 7D live dependency audit:

- Live runtime visibility surfaces do not depend on `AgentConfig.hidden`.
- `AgentSettingsDialog` no longer depends on `AgentConfig.hidden` to initialize
  its local hidden toggle.
- `AgentSettingsDialog` still writes `AgentConfig.hidden` on save/reset for
  compatibility.
- `AgentConfigService.isAgentHidden()` is a compatibility read helper.
- Phase 8A removed the unused `AgentConfigService.isKittUnlocked()` helper and
  `ChatPage._loadKittUnlocked()` caller.
- No agent list, history shelf, terminal journal, settings list, order, or
  secret/special filtering result is currently driven by `AgentConfig.hidden`.

Reads:

- `AgentConfig.fromJson()` reads persisted `hidden` from the config map and
  falls back to `true` for `aut0mate`, `false` for all other agents.
- `AgentConfigService.getConfig()` returns `AgentConfig.hidden` from persisted
  config or the default.
- `AgentConfigService.isAgentHidden()` reads `AgentConfig.hidden`.
- `AgentSettingsDialog._loadConfig()` reads runtime visibility through
  `AgentVisibilityRuntime.isAgentVisible()` and stores the inverse in local
  `_hidden`.
- `AgentSettingsDialog._isNonDefault` compares `_hidden` to the default hidden
  value.

Writes:

- `AgentSettingsDialog._handleSave()` writes `_hidden` through
  `AgentConfigService.saveConfig(..., mirrorVisibility: true)`.
- `AgentSettingsDialog._handleReset()` deletes the config through
  `resetConfig()`, resets local `_hidden`, then persists that default with
  `setAgentHidden()`.
- `AgentConfigService.setAgentHidden()` preserves prompt/source/model from
  `getConfig()` and writes a new config through
  `saveConfig(..., mirrorVisibility: true)`.
- `AgentConfigService.saveConfig()` writes the full config map, including
  `hidden`, to `agent_configs.<agentName>`.

Side effects:

- `AgentConfigService.saveConfig()` also updates `AgentPromptRuntime`.
- Phase 7C config-dialog hidden writes pass `mirrorVisibility: true` and call
  `AgentVisibilityRuntime.setAgentHiddenMirror()`.
- Mirroring updates `SettingVisibility.changes` and logs history only when the
  current runtime visibility differs from `!hidden`.
- Runtime visibility surfaces still do not read `AgentConfig.hidden`.

## AgentVisibilityRuntime Read/Write Map

Reads:

- `AgentsPage._refreshAgentLists()` reads `agentOrder`.
- `AgentsPage._buildAgentTile()` reads `isAgentVisible(name)`.
- `AgentsSettingsPage._sync()` reads `agentOrder`.
- `AgentsSettingsPage._buildTile()` reads `isAgentVisible(name)`.
- `HistoryPage` reads `isAgentVisible(agent)`.
- `TerminalBox._statusPhase()` reads `isAgentVisible(cfg.agentName)`.
- `TerminalBox._configureForContext()` reads `isAgentVisible(cfg.agentName)`.
- `TerminalBox` listens to `changes`.

Writes:

- `AgentsSettingsPage` visibility button calls
  `setAgentVisibility(name, !visible)`.
- `AgentsSettingsPage._onReorder()` writes `agentOrder`.

Side effects:

- All visibility/order writes delegate to `SettingVisibility`.
- Visibility writes keep the existing `visible_<name>` key.
- Order writes keep the existing `agent_order` key inside `agent_settings`.
- Existing history events and notifier increments are preserved.

## Divergence Scenarios

### `agent_settings.visible_<name> = true`, `agent_configs.hidden = true`

Runtime result today:

- Agent list/history/terminal/settings visibility icon treat the agent as
  visible.
- Agent settings dialog toggle treats the agent as hidden.
- No notifier or history event is emitted unless the user changes
  `agent_settings` again.

User-facing risk:

- The dialog can say "hidden" while the runtime surfaces show the agent.

### `agent_settings.visible_<name> = false`, `agent_configs.hidden = false`

Runtime result today:

- Agent list/history/terminal/settings visibility icon treat the agent as
  hidden/disabled.
- Agent settings dialog toggle treats the agent as visible.

User-facing risk:

- The dialog can say "visible" while the runtime surfaces hide/disable the
  agent.

### Missing `agent_settings.visible_<name>`, existing `agent_configs.hidden`

Runtime result today:

- Runtime surfaces ignore `agent_configs.hidden`.
- `SettingVisibility` falls back to `_defaultVisibility(name)`.
- `aut0mate` defaults to hidden; all other agents default to visible.
- The dialog also reads the runtime visibility fallback.

User-facing risk:

- A saved config hidden value can exist but not affect runtime visibility.

### Existing `agent_settings.visible_<name>`, missing `agent_configs.hidden`

Runtime result today:

- Runtime surfaces use the saved `agent_settings.visible_<name>` value.
- The dialog reads the same saved runtime visibility value.

User-facing risk:

- Runtime visibility can differ from the dialog default.

### Missing keys in both boxes

Runtime result today:

- `AgentVisibilityRuntime` delegates to `SettingVisibility` defaults:
  `aut0mate` hidden, all other agents visible.
- `AgentConfig.hidden` defaults the same way:
  `aut0mate` hidden, all other agents visible.

User-facing risk:

- None for current defaults, but the defaults are implemented in two places.

### `aut0mate` and special/system agents

Runtime result today:

- `aut0mate` is default-hidden in both systems when keys are missing.
- `aut0mate` is also in the hard-coded system/special list in `AgentsPage`.
- `rand0m`, `dai1y`, and `knight1y` are system/special but default-visible.

User-facing risk:

- Saved divergent values for `aut0mate` are higher risk because it is both
  secret/default-hidden and system/special.
- Replacing runtime lists with `visibleCandidates` would change behavior and is
  still unsafe.

## Recommended Runtime Source Of Truth

Recommended authoritative runtime visibility source:

- `AgentVisibilityRuntime`, backed by `agent_settings.visible_<name>`.

Why:

- It is already the runtime UI path.
- It owns notifier behavior through `SettingVisibility.changes`.
- It owns history logging side effects through `SettingVisibility`.
- It already stores ordering in the same persistence owner.
- It does not mix prompt/provider/model config with runtime visibility state.

Tradeoffs:

- `AgentConfig.hidden` is already persisted and exposed by the settings dialog.
- Existing users may have meaningful `agent_configs.hidden` values that never
  reached `agent_settings.visible_<name>`.
- Directly ignoring or deleting `AgentConfig.hidden` would risk user surprise
  and data loss.
- Mirroring must preserve current history semantics intentionally; a config
  dialog save currently does not log visibility history.

Phase 7D write-back decision:

- Do not mirror `AgentVisibilityRuntime.setAgentVisibility()` writes back into
  `agent_configs.hidden`.
- Runtime visibility remains one-way authoritative:
  `agent_settings.visible_<name>` controls the visible/hidden result.
- `AgentConfig.hidden` becomes a deprecated compatibility/config-dialog field,
  not a second runtime source of truth.

Rationale:

- Runtime visibility writes already own the expected notifier and history
  logging side effects through `SettingVisibility`.
- Writing back into `agent_configs.hidden` would make every runtime visibility
  toggle also mutate prompt/provider/model config storage, even when the user is
  not editing agent configuration.
- Bidirectional mirroring would increase the risk of persistence loops, noisy
  writes, and ambiguous ownership without improving current runtime results.
- Phase 7C already covers the important no-data-loss path in the opposite
  direction: explicit config-dialog hidden saves now reconcile runtime
  visibility when needed.

## No-Data-Loss Reconciliation Plan

### Stage 1: Read-through facade only

Status:

- Completed in Phase 7A/7B.

Rules:

- Runtime UI reads/writes use `AgentVisibilityRuntime`.
- `AgentVisibilityRuntime` delegates only to `SettingVisibility`.
- `AgentSettingsDialog` continued using `AgentConfig.hidden` during this stage.
- No mirroring during Phase 7A/7B.
- No fallback merge.
- No behavior change.

Purpose:

- Centralize runtime visibility ownership without changing persisted results.

### Stage 2: Optional mirroring writes

Status:

- Partially implemented in Phase 7C for config hidden writes into runtime
  visibility.

Implemented rule:

- `AgentConfigService.saveConfig(cfg, mirrorVisibility: true)` writes
  `agent_configs.<agentName>.hidden`, then mirrors to
  `AgentVisibilityRuntime.setAgentHiddenMirror(cfg.agentName, cfg.hidden)`.
- `AgentConfigService.setAgentHidden()` uses `mirrorVisibility: true`.
- `AgentSettingsDialog._handleSave()` uses `mirrorVisibility: true`.
- `AgentSettingsDialog._handleReset()` still deletes config, restores defaults,
  and persists hidden through `setAgentHidden()`, which mirrors.

Phase 7E read-source cleanup:

- `AgentSettingsDialog._loadConfig()` now initializes its hidden toggle from
  `!AgentVisibilityRuntime.isAgentVisible(agentName)`.
- The dialog still reads `AgentConfigService.getConfig()` for prompt, provider,
  and model values.
- The dialog still writes `AgentConfig.hidden` on save/reset for compatibility,
  using the existing Phase 7C mirror path.

Side effects:

- If `agent_settings.visible_<name>` already equals `!hidden`, no runtime
  visibility write occurs.
- If it differs, mirroring delegates to
  `SettingVisibility.setAgentVisibility()`, preserving the existing notifier
  bump and `visibility_on` / `visibility_off` history logging behavior.

Not implemented:

- Runtime visibility writes do not mirror back into `agent_configs.hidden`.

Phase 7D final decision:

- Keep runtime-to-config write-back unimplemented by design.
- Do not add `AgentVisibilityRuntime` calls into `AgentConfigService` for
  runtime visibility toggles.
- Do not update `agent_configs.hidden` from `AgentsSettingsPage` visibility
  buttons or other runtime visibility surfaces.

Risk:

- Config-dialog saves can now emit visibility history and notifier updates when
  they reconcile a divergent runtime visibility value.
- `AgentConfig.hidden` can still become stale after runtime visibility toggles;
  this is accepted while the field remains compatibility metadata.

### Stage 3: Compatibility read fallback

Future option, not implemented:

- Keep `agent_settings.visible_<name>` authoritative when present.
- If `agent_settings.visible_<name>` is missing, optionally fall back to
  `!agent_configs.hidden`.
- If both are missing, use the current default:
  `aut0mate` hidden, all other agents visible.

Required safeguards:

- Need a way to distinguish missing `visible_<name>` from an explicit stored
  default.
- Must preserve existing installs that intentionally rely on missing
  `agent_settings` keys.
- Must document that fallback is compatibility behavior, not new source of
  truth.

Risk:

- This can change runtime visibility for users who have only
  `agent_configs.hidden` saved today.

Phase 7D recommendation:

- Do not add fallback reads until a migration window explicitly calls for it.
- Treat fallback as a compatibility migration tool, not normal runtime
  ownership.
- If implemented later, keep it read-only and avoid writing
  `agent_configs.hidden` from runtime visibility changes.

### Stage 4: Eventual deprecation of one field/key

Future option, not implemented:

- Deprecate `AgentConfig.hidden` as runtime visibility state.
- Keep reading it as a legacy fallback for at least one migration window.
- Do not delete the `hidden` key without a Hive migration plan.

Required safeguards:

- Preserve `agent_configs.hidden` in serialized maps until a formal schema
  migration exists.
- Avoid changing `AgentConfig` shape until persistence contracts are updated.
- Keep `rk_agents` free of runtime visibility persistence.

Recommended end state:

- `agent_settings.visible_<name>` remains authoritative for runtime visibility.
- `agent_configs.hidden` remains a deprecated compatibility/config-dialog field
  until a documented migration can either remove it or leave it as read-only
  legacy metadata.

## Recommended Cleanup Sequence

1. Keep all Hive boxes and keys frozen:
   `agent_settings.visible_<agentName>`, `agent_settings.agent_order`,
   `agent_configs.hidden`, and `agent_order.order`.
2. Keep the app-local `AgentVisibilityRuntime` facade in knight1y only.
   It reads/writes the same underlying services and exposes current behavior
   without changing results.
3. Route UI reads of `SettingVisibility.isAgentVisible()` through the facade,
   still delegating to `SettingVisibility`.
4. Route UI writes of `SettingVisibility.setAgentVisibility()` through the
   facade, preserving `changes` notifications and `HistoryService` logging.
5. Route order reads/writes through the same facade, still delegating to
   `SettingVisibility.agentOrder`.
6. Add a future compatibility read policy for `AgentConfig.hidden` that documents
   current disagreement but does not merge values yet.
7. Keep runtime visibility writes one-way: `AgentVisibilityRuntime` writes only
   `agent_settings.visible_<agentName>`, not `agent_configs.hidden`.
8. Deprecate `AgentConfig.hidden` as runtime state while preserving it in
   serialized config maps until a formal Hive migration plan exists.
9. Only after runtime behavior is verified, replace hard-coded system-agent
   lists with `AgentMetadata.systemAgent`.
10. Leave `rk_agents` definitions-only. Visibility services, Hive access,
    history logging, and mutation notifiers remain in knight1y.

## Secret/Special Agent Risks

- `aut0mate` is the only current secret/default-hidden agent.
- It is default-hidden in both `SettingVisibility` and `AgentConfig`.
- Existing saved values can still diverge across the two persistence paths.
- `AgentDefinitionsRegistry.visibleCandidates` excludes `aut0mate`, but current
  UI fallback uses `AgentDefinitionsRegistry.names` plus `SettingVisibility`.
- Replacing `names` with `visibleCandidates` in runtime lists would change
  behavior and must not happen in this cleanup phase.
- Replacing the hard-coded special-agent list with `systemAgent` metadata should
  preserve the current set exactly before it is allowed.

## Phase 7A Status

Phase 7A introduced `AgentVisibilityRuntime` as an app-local facade and migrated
low-risk UI call sites for agent list, settings visibility/order, history shelf,
and terminal visible-agent reads. `SettingVisibility` remains the persistence
and side-effect owner.

Direct `SettingVisibility` usage intentionally retained:

- `main.dart` still calls `SettingVisibility.init()` because box initialization
  belongs to the existing persistence service.
- `SettingVisibility` itself still owns Hive keys, notifier mutation, and
  `HistoryService` logging side effects.

## Phase 6K Verdict

Do not refactor visibility persistence yet. The next safe step is an app-local
facade that centralizes reads/writes while continuing to delegate to the current
Hive-backed owners. `rk_agents` should keep only immutable descriptive defaults
and must not own visibility/order runtime state.
