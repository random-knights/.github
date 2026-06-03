# Extraction Boundaries Phase 1

Phase 1 extraction created a definitions-only `rk_agents` package. Runtime
services stay in knight1y until persistence, metrics, and singleton ownership are
decoupled.

## Package Goal

`rk_agents` should answer:

- What agents exist?
- What are their app-neutral prompts?
- What app-neutral metadata describes them?
- What provider/model policy should be used as a default?
- What capability policy is declared by default?

`rk_agents` should not answer:

- What is persisted for this user?
- Which Hive boxes are open?
- Which widgets are visible?
- Which routes are available?
- Which local assets represent an agent?
- Which requests were made?
- What did a request cost at runtime?

## Phase 1 Safe Boundary

Extracted to `packages/rk_agents`:

- `AgentDefinition`
- `AgentMetadata`
- `AgentRuntimePolicy`
- `AgentCapabilityPolicy`
- immutable prompt/persona defaults
- app-neutral descriptions
- app-neutral tags/categories/system-agent flags
- provider/model default policy declarations using stable string ids

Keep app-local:

- `AgentPromptRuntime`
- `AgentBooks`
- `AgentConfigService`
- `SettingVisibility`
- `HistoryService`
- `TransmitService`
- `ChatService`
- `ChatMessage`
- `HistoryEvent`
- `DailyStats`
- all widgets/pages/routes
- all assets and app-branded copy
- all Hive box names, keys, adapters, and type ids

## Phase 1 Data Shape

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
}

class AgentRuntimePolicy {
  final String defaultProviderLabel;
  final String defaultModelId;
  final List<String> allowedProviderLabels;
  final List<String> allowedModelIds;
  final bool allowPromptOverride;
}

class AgentCapabilityPolicy {
  final List<String> toolIds;
  final bool networkAllowedByDefault;
  final bool fileAccessAllowedByDefault;
  final bool mediaAccessAllowedByDefault;
}
```

These are immutable definition structs. They must not import Hive, Flutter
widgets, app routes, app assets, or knight1y services.

## Runtime Adapter Boundary

Knight1y owns app-local runtime adapters that combine:

- immutable `AgentDefinition`
- persisted `AgentConfig`
- visibility/order state from `SettingVisibility`
- provider/model availability from `rk_ai`
- history/runtime stats from `HistoryService`

Example responsibility split:

| Concern | Phase 1 Owner | Future Package Candidate |
| --- | --- | --- |
| Agent id | `rk_agents` | `rk_agents` |
| Default prompt | `rk_agents` | `rk_agents` |
| App-neutral metadata | `rk_agents` | `rk_agents` |
| Book/agent images | knight1y | possible `rk_ui` or app branding package |
| Provider/model catalog | `rk_ai` | `rk_ai` |
| Provider/model persisted override | knight1y | maybe runtime package after migration |
| Prompt persisted override | knight1y | maybe runtime package after migration |
| Visibility/order persisted state | knight1y | maybe runtime package after migration |
| History events | knight1y | maybe runtime package after migration |
| Request metrics display | knight1y | maybe shared UI later |

## Provider And Model Boundary

Phase 1:

- `rk_agents` may declare provider/model defaults and allowlists as strings.
- `rk_ai` remains the typed source for providers, model catalog, pricing, usage,
  and environmental estimates.
- `AgentConfigService` remains the persistence and normalization owner.

Do not:

- Store `rk_ai.AiProvider` directly in Hive.
- Rename persisted provider labels.
- Rename persisted model ids.
- Move provider/model settings UI into `rk_agents`.

## Visibility Boundary

Phase 1:

- `AgentMetadata.visibleByDefault` may describe default visibility.
- `SettingVisibility` remains the runtime visibility/order owner.
- `AgentConfig.hidden` remains frozen until a migration plan decides whether it
  should merge with `SettingVisibility`.

Do not:

- Move visibility persistence into `rk_agents`.
- Rename `visible_<agentName>`.
- Rename `agent_settings.agent_order`.
- Rename `agent_order.order`.

## History And Metrics Boundary

Phase 1:

- `HistoryService`, `HistoryEvent`, and `ChatService` logging stay app-local.
- Runtime stats stay app-local and derived from `history_events`.
- Typed AI usage can flow from `rk_ai` responses into knight1y UI and history.

Do not:

- Move `HistoryEvent` type id `7`.
- Move `history_events`.
- Change `HistoryEvent` field numbers.
- Hide provider, model, token, cost, or environmental impact display.

## Proposed Extraction Order

1. Add local immutable definition structs in knight1y.
2. Build definitions from current immutable prompt/description/tagline maps.
3. Map definitions plus `AgentConfigService.getConfig()` into a runtime view
   model without changing Hive.
4. Replace direct reads of legacy `AgentService` metadata/default bridges with
   the local definition registry after behavior is verified.
5. Move only definition structs and app-neutral registry into `rk_agents`.
6. Keep services, Hive adapters, runtime stats, logging, widgets, routes, and
   assets in knight1y.
7. Later, introduce local runtime interfaces for config, visibility, history,
   and stats, then migrate call sites mechanically.

## Phase 1 Blockers

- `AgentPromptRuntime` owns the mutable runtime prompt cache.
- `AgentBooks` owns app-branded book asset paths and must remain app-local.
- Visibility is split between `AgentConfig.hidden` and `SettingVisibility`.
- History writes are split between `HistoryService` and direct Hive writes in
  `ChatService`.
- Runtime stats parse metrics from formatted history message strings.
- Several widgets instantiate runtime services directly.

## Verdict

`rk_agents` has been scaffolded only as a definitions package. It is still not
safe to extract runtime services, persistence, logging, metrics, widgets, routes,
or app branding in Phase 1.
