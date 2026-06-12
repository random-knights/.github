# Phase 7 Closeout

Phase 7 isolated visibility runtime ownership after the Phase 6 agent
definition extraction. This closeout verifies the source of truth, remaining
compatibility fields, package boundaries, and the next migration step.

## Completed Milestones

- Phase 7A introduced `AgentVisibilityRuntime` as an app-local facade over
  `SettingVisibility`.
- Phase 7B documented the split between `agent_settings.visible_<name>` and
  `agent_configs.hidden`.
- Phase 7C added one-way mirroring from config-dialog hidden saves/resets into
  runtime visibility.
- Phase 7D decided against runtime-to-config write-back.
- Phase 7E changed `AgentSettingsDialog` so its hidden toggle initializes from
  `AgentVisibilityRuntime`, not `AgentConfig.hidden`.

## Final Source Of Truth

Runtime visibility source of truth:

- `AgentVisibilityRuntime`, backed by `agent_settings.visible_<name>`.

Runtime order source of truth:

- `AgentVisibilityRuntime.agentOrder`, backed by
  `agent_settings.agent_order`.

Persistence and side-effect owner:

- `SettingVisibility` still owns Hive access, notifier mutation, stored order,
  and history logging side effects.
- Phase 8B documents the conceptual split between persistence, runtime facade,
  notifier, history logging, defaults, and bootstrap logic in
  `settingvisibility-responsibilities.md`.

Package boundary:

- Visibility runtime remains app-local to knight1y.
- `rk_agents` remains definitions-only and does not own Hive visibility,
  notifier state, history logging, or Flutter UI behavior.

## Scan Results

### Direct `SettingVisibility` Usage

Allowed direct code usage:

- `lib/main.dart`: calls `SettingVisibility.init()` for app-local Hive box
  initialization.
- `lib/services/agents/settings.dart`: implementation of `SettingVisibility`.
- `lib/services/agents/visibility_runtime.dart`: facade delegation only.

Other code references:

- `lib/pages/agents/agents.dart` contains a comment mentioning the default
  hidden behavior.

No UI/runtime surface directly reads or writes `SettingVisibility` for
visibility or order. Agent list, settings, history, terminal, and the config
dialog use `AgentVisibilityRuntime`.

### `AgentConfig.hidden` Usage

Remaining code usage is limited to:

- `AgentConfig` serialization/deserialization in
  `lib/services/agents/config.dart`.
- `AgentConfigService.isAgentHidden()` compatibility read helper.
- `AgentConfigService.setAgentHidden()` compatibility write helper.
- Config-dialog save/reset paths that preserve `AgentConfig.hidden` and mirror
  to `AgentVisibilityRuntime`.

`AgentSettingsDialog` no longer initializes the hidden toggle from
`AgentConfig.hidden`; it initializes from
`!AgentVisibilityRuntime.isAgentVisible(agentName)`.

### Phase 8A Unlock Cleanup

Phase 8A confirmed `AgentConfigService.isKittUnlocked()` and
`ChatPage._loadKittUnlocked()` were safe dead code. The chat page awaited the
helper, discarded the result, checked `mounted`, and rendered nothing from it.

Both the unused chat-page loader and the unused service helper were removed.
`AgentConfig.hidden` itself remains intact as compatibility data.

## Package Boundary Verdict

`packages/rk_agents` remains definitions-only:

- No Flutter dependency.
- No Hive dependency.
- No `kn1ghts` imports.
- No widgets, pages, routes, assets, or runtime services.
- Public export remains `package:rk_agents/rk_agents.dart`.

The only broad text scan hit for `assets` inside `rk_agents` was the word
"assets" in immutable prompt copy, not an asset path or dependency.

## What Not To Remove Yet

- Do not remove `AgentConfig.hidden`.
- Do not remove `agent_configs.hidden`.
- Do not remove `AgentConfigService.isAgentHidden()`.
- Do not move `AgentVisibilityRuntime` or `SettingVisibility` into
  `rk_agents`.
- Do not merge `agent_settings.visible_<name>` and `agent_configs.hidden`
  without a Hive migration plan.

## Remaining Risks

- `AgentConfig.hidden` can become stale after runtime visibility toggles.
  This is accepted because Phase 7D chose one-way runtime ownership.
- Config-dialog save/reset can still update both `agent_configs.hidden` and
  `agent_settings.visible_<name>` when mirroring reconciles divergence.
- `SettingVisibility` still combines Hive writes, notifier mutation, and
  history logging side effects. Phase 8B documents the future split but keeps
  behavior unchanged.
- Special/system agent filtering still uses a hard-coded app-local list, even
  though `rk_agents` also has immutable metadata.

## Monorepo And Workspace Implications

- `rk_agents` should remain dependency-light and Dart-only while visibility,
  settings, history logging, and runtime metrics stay in knight1y.
- Future packages should not depend on knight1y app services.
- Any future visibility package extraction must happen after persistence and
  history side effects are split behind app-local interfaces.
- Workspace `pub get` should continue to validate the local package path and
  the app/package dependency graph together.

## Recommended Next Phase

Continue Phase 8 with runtime cleanup that does not touch Hive schemas:

1. Add characterization coverage or manual verification notes for
   `SettingVisibility` persistence, notifier, and history side effects before
   any code split.
2. Extract app-local internal helpers behind `AgentVisibilityRuntime` only
   after behavior is characterized.
3. Add read-only migration diagnostics for visibility divergence if needed, but
   do not auto-reconcile old data without a migration plan.
4. Consider replacing hard-coded system-agent lists with
   `AgentMetadata.systemAgent` only as a separate no-behavior migration with
   ordering verification.

## Verdict

Phase 7 is complete for visibility/runtime ownership cleanup. Runtime
visibility has a single app-local facade and a documented source of truth.
Remaining `AgentConfig.hidden` behavior is compatibility-only and should stay
frozen until a formal persistence migration is planned.
