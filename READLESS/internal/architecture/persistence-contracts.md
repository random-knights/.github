# Persistence Contracts

This document starts the persistence freeze for the agent migration. Until a
separate migration plan exists, these Hive box names, adapter type ids, field
numbers, and persisted keys are runtime contracts for knight1y.

## Freeze Rules

- Do not rename Hive boxes during package extraction.
- Do not change Hive type ids or Hive field numbers without a migration.
- Do not move Hive adapters into packages until ownership and registration order
  are explicit.
- Do not change persisted provider/model string values while extracting agent
  definitions.
- Do not hide AI usage, model, cost, or impact metadata while migrating history.

## Hive Boxes

### history_events

- Runtime owner: `HistoryService`.
- Storage type: `Box<HistoryEvent>`.
- Opened by: `HistoryService.init()`.
- Additional direct readers/writers: `services/chat/chat.dart`.
- Key shape: generated UUID event id.
- Value shape: `HistoryEvent`.
- Status: REQUIRES MIGRATION PLAN.

Migration-sensitive fields:

- `HistoryEvent.id`: event key and persisted field.
- `HistoryEvent.agent`: agent id, user, provider, or model-facing label.
- `HistoryEvent.timestamp`: local event time used for day filtering.
- `HistoryEvent.type`: request, reply, failure, setting_change, and chat event
  classifications.
- `HistoryEvent.message`: free-form payload and telemetry summary.
- `HistoryEvent.durationMs`: response timing.
- `HistoryEvent.metadata`: optional flexible payload.
- `HistoryEvent.model`: model id used for transparency.

Extraction constraints:

- Keep app-local until history ownership is split from UI and chat side effects.
- A future package may define an app-neutral event interface, but the Hive box
  and adapter should stay in knight1y until a storage migration is tested.

### agent_settings

- Runtime owner: `SettingVisibility`.
- Storage type: untyped Hive box.
- Opened by: `SettingVisibility.init()`.
- Persisted keys:
  - `visible_<agentName>` stores `bool`.
  - `agent_order` stores `List<String>`.
- Status: REQUIRES MIGRATION PLAN.

Migration-sensitive fields:

- `visible_<agentName>` key naming ties visibility to current agent ids.
- `agent_order` overlaps conceptually with `AgentOrderService` and must not be
  renamed casually.
- The default hidden behavior for `aut0mate` is part of runtime behavior.

Extraction constraints:

- Keep app-local until visibility defaults are separated from persisted user
  settings.
- `SettingVisibility` is a singleton with a `ValueNotifier<int>` and history
  side effects, so it is not a pure agent-definition concern.

### agent_configs

- Runtime owner: `AgentConfigService`.
- Storage type: untyped Hive box.
- Persisted key: agent name/id.
- Persisted value shape:
  - `prompt`: `String`.
  - `source`: provider label string such as `GoogleAI`.
  - `model`: model id string.
  - `hidden`: `bool`.
- Status: REQUIRES MIGRATION PLAN.

Migration-sensitive fields:

- `prompt` currently overrides `AgentPromptRuntime` at runtime.
- `source` is stored as a provider label string and normalized through `rk_ai`.
- `model` is validated against the selected provider's model list.
- `hidden` overlaps with `SettingVisibility` visibility behavior.

Extraction constraints:

- Agent definition defaults can move before this storage moves.
- Persisted `AgentConfig` must remain app-local until prompt override behavior
  no longer mutates global `AgentPromptRuntime`.

### kn1ghts_hive

- Runtime owner: `ApiKeys` and the About page key editor.
- Storage type: untyped Hive box.
- Persisted keys:
  - `api_key_open_ai`.
  - `api_key_google_gemini`.
  - `api_key_open_weather_map`.
- Status: KEEP APP-LOCAL.

Migration-sensitive fields:

- These keys are local development/provider settings, not agent definitions.
- They must not be printed, committed, or moved into shared packages.

Extraction constraints:

- Keep in knight1y or a future connections package with an explicit secret
  handling plan.

### agent_order

- Runtime owner: `AgentOrderService`.
- Storage type: untyped Hive box.
- Persisted key: `order`.
- Persisted value shape: `List<String>`.
- Status: REQUIRES MIGRATION PLAN.

Migration-sensitive fields:

- The `order` key stores agent ids.
- This overlaps with `SettingVisibility.agentOrder`, which stores an
  `agent_order` key inside the `agent_settings` box.

Extraction constraints:

- Do not extract until there is one canonical ordering contract.

## Adapters And Type IDs

### HistoryEventAdapter

- Source model: `models/agents/history_event.dart`.
- Generated adapter: `models/agents/history_event.g.dart`.
- Registered in: `main.dart`.
- Type id: `7`.
- Status: REQUIRES MIGRATION PLAN.

Hive fields:

- `0`: `id`.
- `1`: `agent`.
- `2`: `timestamp`.
- `3`: `type`.
- `4`: `message`.
- `5`: `durationMs`.
- `6`: `metadata`.
- `7`: `model`.

Freeze requirement:

- Type id `7` and all field numbers are frozen until a versioned migration is
  designed and tested against existing local data.

## Extraction Classification

SAFE TO EXTRACT:

- Immutable default agent prompt text after it is represented as app-neutral
  definitions.
- App-neutral descriptions and taglines that do not reference assets, routes, or
  Hive.
- Provider/model policy structs that preserve existing string compatibility at
  the app boundary.

KEEP APP-LOCAL:

- `kn1ghts_hive` and API key persistence.
- Asset paths for agent books, covers, spines, avatars, and branded copy.
- Hive adapter registration in `main.dart` for this phase.
- Pages, navigation, drawers, and route-driven startup flow.

REQUIRES MIGRATION PLAN:

- `history_events`.
- `agent_settings`.
- `agent_configs`.
- `agent_order`.
- `HistoryEvent` type id and fields.
- `AgentConfig` persistence.
- `SettingVisibility` persistence and singleton behavior.
