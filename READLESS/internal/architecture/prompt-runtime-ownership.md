# Prompt Runtime Ownership

Phase 6F isolates runtime prompt override ownership without changing Hive,
provider/model selection, prompt text, visibility, ordering, routing, or package
boundaries.

## Before

Prompt defaults and runtime overrides were both exposed through `AgentService`:

- `AgentService.defaultAgentPrompts` held immutable defaults.
- `AgentService.agentPrompts` was a mutable static map initialized from the
  defaults.
- `AgentConfigService.getConfig()` fell back to
  `AgentService.defaultAgentPrompts[agentName] ??
  AgentService.agentPrompts[agentName] ?? ''`.
- `AgentConfigService.saveConfig()` wrote directly to
  `AgentService.agentPrompts[cfg.agentName]`.
- `AgentConfigService.resetConfig()` wrote directly to
  `AgentService.agentPrompts[agentName]`.
- `AgentService.resetPrompt()` was a public write-shaped compatibility method.

## After

Prompt runtime ownership is app-local and explicit:

- `AgentDefinitionsRegistry` owns immutable default prompts.
- `AgentPromptRuntime` owns the mutable in-memory prompt cache.
- Phase 6G removed the `AgentService.agentPrompts` compatibility getter.
- Phase 6G removed the unused `AgentService.buildMessage()` runtime prompt
  helper.
- `AgentConfigService` is the only codebase call site that writes runtime prompt
  overrides.

## Compatibility API

Introduced:

- `AgentPromptRuntime.fallbackPromptFor(agentName)`
- `AgentPromptRuntime.runtimePromptFor(agentName)`
- `AgentPromptRuntime.saveRuntimePrompt(agentName, prompt)`
- `AgentPromptRuntime.resetRuntimePrompt(agentName)`

This API stays inside knight1y. It is not a candidate for `rk_agents`.

## Fallback Behavior

Fallback behavior is intentionally preserved:

1. If an `agent_configs` entry exists, `AgentConfig.fromJson()` still returns
   the saved prompt.
2. If no saved config exists, `AgentConfigService.getConfig()` now calls
   `AgentPromptRuntime.fallbackPromptFor(agentName)`.
3. `fallbackPromptFor()` preserves the old order:
   `AgentDefinitionsRegistry.defaultPrompts[agentName] ??
   runtimeCache[agentName] ?? ''`.
4. `saveConfig()` still persists the prompt and mirrors it into the runtime
   cache.
5. `resetConfig()` still deletes persisted config and resets the runtime cache
   to the immutable default prompt or empty string for unknown agents.

## Writer Ownership

Current runtime prompt writers:

- `AgentConfigService.saveConfig()`
- `AgentConfigService.resetConfig()`

No other codebase call sites write prompt overrides.

## What Did Not Change

- Hive box name `agent_configs`.
- persisted keys `prompt`, `source`, `model`, `hidden`.
- provider/model normalization and override behavior.
- prompt text.
- visibility/order behavior.
- agent identity registry behavior.
- routes, widgets, and app branding.

## Verification

Manual verification performed:

- searched for `AgentService.agentPrompts` reads/writes after the change.
- confirmed only `AgentConfigService` calls `AgentPromptRuntime` write methods.
- ran `flutter analyze`.

No new tests were added in this phase. The current test directory only contains
the default widget smoke test, which is unrelated to this service boundary.

## Blockers Before Removing AgentService

- Decide whether `AgentService` should remain as an app-branded metadata/details
  bridge or be split into definition, branding, and runtime adapters.
- Keep `AgentConfigService` in knight1y until `agent_configs` has a migration
  plan.
- Preserve support for persisted prompt overrides before changing the runtime
  cache API.
