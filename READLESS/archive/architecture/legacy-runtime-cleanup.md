# Legacy Runtime Cleanup

This document tracks small app-local runtime cleanup after Phase 7 visibility
ownership work. It does not change Hive schemas, box names, keys, adapter
typeIds, agent visibility behavior, or package boundaries.

## Phase 8A: `isKittUnlocked()` Cleanup

### Audit Scope

Scanned code for:

- `AgentConfigService.isKittUnlocked()`
- `ChatPage._loadKittUnlocked()`
- `_kittUnlocked`, `kittUnlocked`, and related unlock flags
- `aut0mate.hidden` unlock assumptions

### Usage Map Before Cleanup

| Path | Behavior | User-facing result |
| --- | --- | --- |
| `ChatPage.initState()` | Called `_loadKittUnlocked()`. | None. |
| `ChatPage._loadKittUnlocked()` | Awaited `AgentConfigService().isKittUnlocked()`, discarded the result, then checked `mounted`. | None. |
| `AgentConfigService.isKittUnlocked()` | Returned the inverse of `isAgentHidden('aut0mate')`. | None after the only caller discarded the value. |
| `_kittUnlocked` / `kittUnlocked` state | No live state field found. | None. |

Related comments in drawer/settings code referenced `kittUnlocked`, but no live
state or rendering path used it.

### Verdict

The unlock path was safe dead code:

- The only live call discarded the result.
- No state was updated.
- No widget rendered from the value.
- No navigation or secret/special filtering depended on it.
- Runtime visibility remains owned by `AgentVisibilityRuntime`.

### Cleanup Applied

- Removed `ChatPage._loadKittUnlocked()`.
- Removed the `ChatPage.initState()` call to `_loadKittUnlocked()`.
- Removed the now-unused `AgentConfigService.isKittUnlocked()` helper.
- Removed the now-unused `AgentConfigService` import from `ChatPage`.
- Updated stale `kittUnlocked` comments that implied live unlock behavior.

### Preserved Contracts

- `AgentConfig.hidden` remains serialized and deserialized.
- `agent_configs.hidden` remains untouched.
- `AgentConfigService.isAgentHidden()` remains available as a compatibility
  read helper.
- `AgentConfigService.setAgentHidden()` remains available as a compatibility
  write helper and still mirrors through `AgentVisibilityRuntime`.
- `aut0mate` remains default-hidden in current visibility defaults.
- No runtime visibility reads or writes changed.
- No secret/special agent filtering changed.

## Remaining Legacy Runtime Risks

- `AgentConfig.hidden` remains deprecated compatibility data and can still
  diverge from `agent_settings.visible_<name>` after runtime visibility
  toggles.
- `SettingVisibility` still combines Hive access, notifier updates, order
  persistence, and history logging side effects.
- Drawer and home navigation still contain legacy structure/comments around a
  formerly secret/unlock-oriented route set; any navigation cleanup should be a
  separate no-behavior phase.
- Hard-coded system-agent lists still exist alongside `rk_agents` metadata.

## Recommended Next Step

Continue Phase 8 by splitting `SettingVisibility` ownership conceptually before
code movement:

1. Define app-local interfaces for visibility persistence, change
   notification, and history logging side effects.
2. Keep `AgentVisibilityRuntime` as the only runtime facade.
3. Do not change persisted keys or defaults.
4. Defer any hard-coded system-agent list cleanup to a separate verification
   pass.
