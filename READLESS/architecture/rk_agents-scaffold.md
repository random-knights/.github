# rk_agents Scaffold

Phase 6I created the first `rk_agents` package shape. The goal remains to
separate portable agent definitions from knight1y runtime, branding, navigation,
and Hive persistence.

## Proposed Structures

```dart
class AgentDefinition {
  final String id;
  final String defaultPrompt;
  final AgentMetadata metadata;
  final AgentRuntimePolicy runtimePolicy;
  final AgentCapabilityPolicy capabilityPolicy;
}

class AgentMetadata {
  final String displayName;
  final String description;
  final String tagline;
  final String category;
  final bool systemAgent;
  final bool visibleByDefault;
  final int? sortOrder;
}

class AgentRuntimePolicy {
  final String defaultProviderLabel;
  final String defaultModelId;
  final List<String> allowedProviderLabels;
  final List<String> allowedModelIds;
  final bool allowPromptOverride;
  final bool memoryEnabledByDefault;
}

class AgentCapabilityPolicy {
  final List<String> toolIds;
  final bool networkAllowed;
  final bool fileAccessAllowed;
  final bool mediaAccessAllowed;
  final bool disabledByDefault;
}
```

Provider labels and model ids should remain strings at the persistence boundary
until `agent_configs` has a migration plan. Runtime adapters can map them to
`rk_ai` types inside the app.

## App-Neutral

Moved first into `rk_agents`:

- Agent ids.
- Default prompts from `AgentDefinitionsRegistry`.
- Non-branded descriptions from `AgentDefinitionsRegistry`.
- Non-branded taglines from `AgentDefinitionsRegistry`.
- System-agent flags such as `rand0m`, `dai1y`, `knight1y`, and `aut0mate`.
- Default visibility policy as metadata only, not persisted state.
- Provider/model default policy that preserves current `rk_ai` labels and ids.
- Conservative empty capability policies.

Notes:

- `aut0mate` can be marked `visibleByDefault: false` in metadata, but the
  persisted hidden/unlocked state remains app-local.
- Prompt text should be versioned before package extraction if future prompt
  migration or reset behavior needs to be audited.

## App-Branded

Must remain in knight1y for now:

- Book cover and spine asset paths in `AgentBooks`.
- App-specific display art, avatars, icons, and animation choices.
- Drawer copy, route labels, page entry points, and feature placement.
- Any brand-specific references that only make sense in knight1y.

These may later become an app-local `AgentBrandingRegistry` that maps
`AgentDefinition.id` to assets and navigation.

## Persistence-Coupled

Must remain in knight1y until a migration plan exists:

- `AgentConfig` persisted values in `agent_configs`.
- `SettingVisibility` values in `agent_settings`.
- `AgentOrderService` values in `agent_order`.
- `HistoryEvent` and `history_events`.
- Hive adapter registration for `HistoryEventAdapter`.

Reason:

- These classes own box names, key formats, type ids, field numbers, singleton
  notification, and history side effects. They are runtime contracts, not pure
  definitions.

## Runtime-Coupled

Must remain in knight1y during scaffolding:

- `AgentConfigService.saveConfig()` and `resetConfig()` because they mutate
  `AgentPromptRuntime`.
- `TransmitService` because it calls AI generation and writes history events.
- `HistoryService` because it writes local Hive events with timestamps and UUIDs.
- `SettingVisibility` because it writes Hive, updates a notifier, and logs
  history changes.
- UI pages and widgets that instantiate services directly.

## Runtime Global State Audit

Safe temporary globals:

- `AgentDefinitionsRegistry`: immutable default prompt and metadata source.
- `AgentConfigService.sources`: immutable provider label list.
- `AgentConfigService` provider/model normalization helpers.

Dangerous globals:

- `AgentPromptRuntime`: mutable prompt cache read by runtime prompt building
  and modified by config saves/resets.
- `SettingVisibility._instance`: singleton lifetime with a shared
  `ValueNotifier<int>`.
- `HistoryService._box`: static Hive box accessor with write side effects.
- `AgentConfigService.saveConfig()`: persists config and mutates
  `AgentPromptRuntime`.
- `AgentConfigService.resetConfig()`: deletes persisted config and mutates
  `AgentPromptRuntime`.
- `SettingVisibility.setAgentVisibility()`: writes Hive, increments notifier,
  and logs history.
- `SettingVisibility.agentOrder` setter: writes Hive, increments notifier, and
  logs history.
- `TransmitService.getAgentAIResponse()`: sends provider requests and logs
  request/reply/failure history events.

Hidden side effects:

- Saving an `AgentConfig` changes future prompt behavior globally.
- Resetting an agent config changes future prompt behavior globally.
- Changing visibility also writes history.
- Reordering agents through `SettingVisibility` also writes history.
- AI responses record model, duration, token, cost, and impact metadata into
  history.

Runtime mutation risks:

- Prompt overrides can outlive the widget that saved them because the mutable map
  is static.
- Two visibility/order persistence paths exist: `agent_settings.agent_order`
  and `agent_order.order`.
- History writes are fire-and-forget in several call sites, so failures may be
  silent.
- `SettingVisibility` assumes its box is open before instance methods run.

## Recommended Extraction Order

1. Introduce local `AgentDefinition`, `AgentMetadata`, `AgentRuntimePolicy`, and
   `AgentCapabilityPolicy` types in knight1y without changing persistence.
2. Build definitions from current immutable prompt/description/tagline maps.
3. Update runtime code to read defaults from definitions while preserving
   `agent_configs` overrides and provider/model string persistence.
4. Move only pure definitions and policy structs into `rk_agents`.
5. Keep `AgentConfigService`, `SettingVisibility`, `HistoryService`, Hive
   adapters, and all app assets in knight1y.
6. Design a separate persistence migration for history, settings, config, and
   order before moving storage ownership.

## First Move

The first package slice is:

- `AgentDefinition`.
- `AgentMetadata`.
- `AgentRuntimePolicy`.
- `AgentCapabilityPolicy`.
- A registry of app-neutral definitions derived from default prompts,
  descriptions, taglines, system flags, and conservative policy defaults.

The first slice must not include:

- Hive boxes or adapters.
- Mutable prompt overrides.
- Book/cover/spine assets.
- Pages, widgets, drawer entries, or routes.
- API keys or provider secrets.
- History logging.
