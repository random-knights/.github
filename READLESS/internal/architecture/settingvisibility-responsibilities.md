# SettingVisibility Responsibilities

Phase 8B separates the responsibilities currently combined inside
`SettingVisibility` without changing code behavior. This is an ownership map
and extraction plan only. Hive boxes, keys, notifier semantics, history logging
side effects, runtime visibility results, and order behavior remain unchanged.

## Current Class Role

`SettingVisibility` is the app-local low-level owner for the `agent_settings`
Hive box. It currently combines five responsibilities:

| Responsibility | Current implementation | Persistence | Side effects |
| --- | --- | --- | --- |
| Persistence | Opens and reads/writes `agent_settings`. | Box `agent_settings`; keys `visible_<name>` and `agent_order`. | Hive access must remain app-local. |
| Runtime visibility | `isAgentVisible(name)` and `setAgentVisibility(name, visible)`. | Reads/writes `visible_<name>`. | Write increments `changes` and logs history. |
| Runtime order | `agentOrder` getter/setter. | Reads/writes `agent_order`. | Write increments `changes` and logs history. |
| Notifier/events | `changes: ValueNotifier<int>`. | Not persisted. | Terminal and other runtime surfaces can refresh after visibility/order changes. |
| History side effects | Calls `HistoryService.logEvent()`. | Writes indirectly to `history_events`. | Visibility writes log `visibility_on`/`visibility_off`; order writes log `agent_reorder`. |
| Defaults/bootstrap | `init()` opens the Hive box; `_defaultVisibility()` handles missing keys. | Missing visibility defaults are not stored until a write occurs. | `aut0mate` defaults hidden; all other agents default visible. |

## Already Isolated

`AgentVisibilityRuntime` already isolates the runtime-facing API:

- `isAgentVisible(name)`
- `setAgentVisibility(name, visible)`
- `setAgentHiddenMirror(name, hidden)`
- `agentOrder`
- `changes`

Current UI/runtime consumers use `AgentVisibilityRuntime` rather than
directly calling `SettingVisibility`:

- `AgentsPage`
- `AgentsSettingsPage`
- `AgentSettingsDialog`
- `HistoryPage`
- `TerminalBox`
- `AgentConfigService` for config-hidden mirroring only

Allowed direct `SettingVisibility` usage remains:

- `main.dart` calls `SettingVisibility.init()` for startup bootstrap.
- `visibility_runtime.dart` delegates to `SettingVisibility`.
- `settings.dart` implements `SettingVisibility`.

## Still Tightly Coupled

These responsibilities remain intentionally coupled inside `SettingVisibility`
for now:

- Hive key construction and data reads/writes.
- Runtime default visibility fallback.
- `ValueNotifier<int>` mutation.
- History event logging.
- Ordering persistence.
- Singleton lifetime and bootstrap assumptions.

Splitting these today would risk changing order persistence, notification
timing, or history side effects. Phase 8B therefore makes no code split.

## Future Extraction Targets

Safe future app-local extraction candidates:

- `AgentVisibilityStore`: app-local Hive adapter for `visible_<name>` and
  `agent_order`.
- `AgentVisibilityDefaults`: app-local default policy for missing visibility
  keys.
- `AgentVisibilityNotifier`: app-local change notification boundary.
- `AgentVisibilityEventLogger`: app-local adapter that logs the current
  `setting_change` events through `HistoryService`.
- `AgentVisibilityRuntime`: can remain the public app-local facade over those
  pieces.

These should be introduced behind `AgentVisibilityRuntime` and only after
tests or manual verification confirm unchanged:

- missing-key defaults
- `aut0mate` default-hidden behavior
- visibility history messages
- order history messages
- notifier increments
- stored order results

## Package Boundary

Must remain app-local to knight1y:

- Hive access for `agent_settings`.
- `SettingVisibility`.
- `AgentVisibilityRuntime`.
- `HistoryService` logging side effects.
- Visibility/order notifier state.
- Any compatibility bridge to `AgentConfig.hidden`.

Should never move into `rk_agents`:

- Hive boxes, keys, schemas, adapters, or type ids.
- Runtime visibility services.
- History logging.
- Flutter `ValueNotifier`.
- App-specific defaults that depend on persisted runtime state.

Possible future package ownership:

- `rk_agents`: immutable definition metadata only, such as
  `visibleByDefault`, `systemAgent`, and capability policy declarations.
- Future `rk_runtime` or `rk_settings`: pure interfaces for visibility or
  settings ownership, if they contain no Hive dependency and no app-specific
  history logging.
- Future `rk_ui`: reusable visibility controls only after runtime ownership is
  fully injected by the app.

## Recommended Sequence

1. Keep `AgentVisibilityRuntime` as the only runtime-facing facade.
2. Add characterization tests or manual verification notes for visibility,
   order, notifier, and history side effects.
3. Extract private app-local helpers inside knight1y, one responsibility at a
   time.
4. Keep the public facade unchanged while internal helpers are introduced.
5. Only after behavior is verified, consider pure interface extraction into a
   future runtime/settings package.

## Phase 8B Verdict

No code split is needed in Phase 8B. The responsibility boundary is now
documented, and the safe migration path is to keep `SettingVisibility` as the
low-level app-local owner until persistence, notifier, and history side effects
can be characterized separately.
