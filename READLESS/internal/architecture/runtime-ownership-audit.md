# Runtime Ownership Audit

Phase 6C audits mutable runtime ownership before package extraction. This is an
ownership map only; it does not change Hive schemas, persisted keys, route
behavior, widgets, or package boundaries.

## Scope

Audited targets:

- `AgentConfigService`
- `AgentService`
- `SettingVisibility`
- `HistoryService`
- agent/chat request logging
- provider/model selection
- runtime stats and request metrics

## Mutable Globals And Singletons

### AgentPromptRuntime And AgentDefinitionsRegistry

Mutable global:

- `AgentPromptRuntime`

Immutable globals:

- `AgentDefinitionsRegistry.defaultPrompts`
- `AgentDefinitionsRegistry.descriptions`
- `AgentDefinitionsRegistry.taglines`
- `AgentBooks.byAgent`

Mutation owners:

- `AgentConfigService.saveConfig()` writes `AgentPromptRuntime`.
- `AgentConfigService.resetConfig()` writes the default prompt back into
  `AgentPromptRuntime`.

Risk:

- Prompt overrides are both persisted in Hive and mirrored in
  `AgentPromptRuntime`. Any future definition package must avoid depending on
  this mutable cache.

### AgentConfigService

Mutable runtime ownership:

- Opens and writes the `agent_configs` Hive box.
- Normalizes provider labels and model ids.
- Persists agent prompt/source/model/hidden values.
- Mirrors prompt changes into `AgentPromptRuntime`.

Static provider/model globals:

- `sourceGoogle`
- `sourceOpenAi`
- `sourceClaude`
- `sourceGrok`
- `sources`

Mutation owners:

- `AgentSettingsDialog._handleSave()` creates `AgentConfig` and calls
  `saveConfig()`.
- `AgentSettingsDialog._handleReset()` calls `resetConfig()` and then
  `setAgentHidden()`.
- `AgentConfigService.setAgentHidden()` persists only the hidden flag through
  `saveConfig()`.

Risk:

- Provider/model policy, prompt overrides, hidden state, Hive persistence, and
  static prompt mutation are currently one service concern.

### SettingVisibility

Singleton:

- `SettingVisibility._instance`
- `factory SettingVisibility() => _instance`

Mutable runtime state:

- `changes: ValueNotifier<int>`
- `agent_settings.visible_<agentName>`
- `agent_settings.agent_order`

Mutation owners:

- `SettingVisibility.setAgentVisibility()` writes visibility, increments
  `changes`, and logs a history event.
- `SettingVisibility.agentOrder` setter writes order, increments `changes`, and
  logs a history event.
- `AgentsSettingsPage` calls both mutation paths.

Risk:

- Visibility changes are coupled to Hive, UI notifications, and history logging.
  This is runtime state, not an agent definition.

Phase 8B responsibility split:

- `AgentVisibilityRuntime` is the runtime-facing facade.
- `SettingVisibility` remains the low-level app-local owner for persistence,
  defaults, notifier mutation, order writes, and history side effects.
- `docs/architecture/settingvisibility-responsibilities.md` documents the
  future split without changing runtime behavior.

### HistoryService

Static runtime owner:

- `HistoryService.init()` opens `history_events`.
- `HistoryService._box` reads `Hive.box<HistoryEvent>('history_events')`.
- `HistoryService.logEvent()` writes a generated UUID event.
- `HistoryService.eventsForDay()` reads local event history.

Mutation owners:

- `TransmitService.getAgentAIResponse()` logs request, reply, and failure.
- `SettingVisibility` logs visibility and order changes.

Additional history writers:

- `ChatService` writes directly to `Hive.box<HistoryEvent>('history_events')`
  for generic chat request/reply events instead of using `HistoryService`.

Risk:

- History write ownership is split between `HistoryService` and direct Hive
  writes in `ChatService`.
- Request metrics are persisted as formatted strings inside
  `HistoryEvent.message`, so stats parsing depends on message text format.

### TerminalBox

Static widget-local runtime state:

- `TerminalBox._hasAnimatedThisSession`
- `TerminalBox._cachedCompletedText`

Runtime ownership:

- Caches generated terminal output for the current app session.
- Listens to `SettingVisibility.changes`.
- Reads `AgentConfigService`, `AgentDefinitionsRegistry`, `AgentBooks`, and
  `HistoryService`.

Risk:

- Widget-local cache is acceptable app runtime state but is not package-safe.

## Ownership Flow

### Provider Selection

1. `AgentSettingsDialog` shows `AgentConfigService.sources`.
2. User selects a provider label.
3. UI normalizes through `AgentConfigService.normalizeSource()`.
4. Save creates `AgentConfig(source: selectedSource)`.
5. `AgentConfigService.saveConfig()` stores the provider label in
   `agent_configs`.
6. `TransmitService` loads config and maps `cfg.source` to `rk_ai.AiProvider`
   with `AgentConfigService.providerForSource()`.
7. API call receives typed provider and persisted model id.

Owner:

- Runtime owner is `AgentConfigService`.
- Definition-safe future owner is an immutable provider policy struct only.

### Model Selection

1. `AgentSettingsDialog` computes options with
   `AgentConfigService.modelsForSource()`.
2. User selects model id.
3. Save stores `model` in `agent_configs`.
4. `AgentConfig.fromJson()` validates stored model against current provider
   models and falls back to `defaultModelForSource()`.
5. `TransmitService` passes `cfg.model` to AI generation.

Owner:

- Runtime owner is `AgentConfigService`.
- `rk_ai` owns the model catalog and defaults.
- `rk_agents` may only own immutable model policy declarations.

### Agent Visibility

There are two visibility paths:

- `AgentConfig.hidden` in `agent_configs`.
- `SettingVisibility.visible_<agentName>` in `agent_settings`.

Current consumers:

- `AgentConfigService.isAgentHidden()` reads `AgentConfig.hidden`.
- `SettingVisibility.isAgentVisible()` reads `agent_settings`.
- `AgentsPage`, `AgentsSettingsPage`, `HistoryPage`, and `TerminalBox` use
  `AgentVisibilityRuntime` for UI visibility/order behavior.
- Phase 8A removed the unused `ChatPage` check of
  `AgentConfigService().isKittUnlocked()`.

Owner:

- Runtime visibility UI owner is currently `AgentVisibilityRuntime`.
- Low-level persistence and side-effect owner remains `SettingVisibility`.
- Unlock/hidden config owner is currently `AgentConfigService`.

Risk:

- Hidden state is duplicated conceptually. A future migration should define one
  persistence migration policy before extracting packages. The canonical runtime
  visibility facade now exists as `AgentVisibilityRuntime`.

### Runtime Stats

Stats sources:

- `HistoryService.eventsForDay()`.
- `HistoryEvent.durationMs`.
- `HistoryEvent.message` strings containing `estimatedCostUsd=` and
  `estimatedCo2eGrams=`.

Current calculators:

- `_AgentRuntimeStats` in `AgentsPage`.
- `_AgentHistoryStats` in `TerminalBox`.
- history widgets also parse cost/carbon metrics from history messages.

Owner:

- Runtime stats are derived app-local views over `history_events`.

Risk:

- Stats parsing is duplicated and depends on string formatting rather than a
  typed metrics payload.

### Request Metrics

Metric producers:

- `rk_ai.AiResponse.usage`
- `services/api/api.dart` fallback estimates

Metric carriers:

- `ChatMessage.inputTokens`
- `ChatMessage.outputTokens`
- `ChatMessage.estimatedCostUsd`
- `ChatMessage.estimatedCo2eGrams`
- `HistoryEvent.message` usage summary strings
- `HistoryEvent.durationMs`
- `HistoryEvent.model`

Owner:

- `rk_ai` owns typed response usage concepts.
- knight1y owns runtime display and persistence of metrics.
- `rk_agents` must not own metrics logging or persistence.

## Service Mutation Map

| Service or Widget | Mutates Shared Runtime State | Persistence Coupled | Logs History |
| --- | --- | --- | --- |
| `AgentConfigService.saveConfig()` | Yes, `AgentPromptRuntime` | Yes, `agent_configs` | No |
| `AgentConfigService.resetConfig()` | Yes, `AgentPromptRuntime` | Yes, `agent_configs` | No |
| `AgentConfigService.setAgentHidden()` | Indirect prompt rewrite via `saveConfig()` | Yes, `agent_configs` | No |
| `AgentVisibilityRuntime` | Delegates visibility/order/notifier access | Indirect through `SettingVisibility` | Indirect through `SettingVisibility` |
| `SettingVisibility.setAgentVisibility()` | Yes, `changes` notifier | Yes, `agent_settings` | Yes |
| `SettingVisibility.agentOrder` setter | Yes, `changes` notifier | Yes, `agent_settings` | Yes |
| `HistoryService.logEvent()` | Yes, history box | Yes, `history_events` | It is logging |
| `ChatService` logging helpers | Yes, history box | Yes, `history_events` | Yes |
| `TransmitService.getAgentAIResponse()` | No direct globals | Indirect through config/history | Yes |
| `TerminalBox` | Yes, widget static cache | No direct writes | No |

## Interface Candidates

No interfaces were introduced in code during Phase 6C. These are proposed
interfaces for a later mechanical pass:

```dart
abstract interface class AgentRuntimeConfigReader {
  Future<AgentConfig> getConfig(String agentName);
}

abstract interface class AgentRuntimeConfigWriter {
  Future<void> saveConfig(AgentConfig config);
  Future<void> resetConfig(String agentName);
}

abstract interface class AgentVisibilityStore {
  bool isAgentVisible(String agentName);
  void setAgentVisibility(String agentName, bool visible);
  List<String> get agentOrder;
  set agentOrder(List<String> order);
}

abstract interface class RuntimeHistoryLogger {
  Future<void> logEvent({
    required String agent,
    required String type,
    String? message,
    int? durationMs,
    String? metadata,
    String? model,
  });
}

abstract interface class RuntimeStatsReader {
  Future<AgentRuntimeStatsSnapshot> readAgentStats(String agentName);
}
```

Extraction-safe rule:

- Interfaces may be immutable contracts, but implementations stay in knight1y
  while they touch Hive, Flutter notifiers, widgets, routes, assets, or history
  logging.

## Classification

SAFE FOR `rk_agents`:

- `AgentDefinition`
- metadata
- prompts
- capability policies
- provider/model policy structs
- immutable runtime interface contracts if they contain no Hive, Flutter widget,
  route, or app asset dependency

NOT SAFE FOR `rk_agents`:

- Hive boxes, adapters, type ids, or keys
- `AgentConfigService`
- `SettingVisibility`
- `HistoryService`
- `ChatService` logging helpers
- runtime metrics aggregation
- singleton state
- Flutter widgets
- route logic
- app branding and assets

## Recommendations

1. Keep `rk_agents` definitions-only for the first package scaffold.
2. Introduce local immutable `AgentDefinition` types before changing runtime
   service ownership.
3. Build a knight1y-local adapter from definitions plus `AgentConfigService`
   persisted overrides.
4. Consolidate history writes behind one knight1y-local logger before any
   runtime package work.
5. Keep `AgentVisibilityRuntime` as the canonical visibility facade while
   splitting `SettingVisibility` internals behind it.
6. Move stats parsing into a knight1y-local runtime stats reader before trying
   to share it.
