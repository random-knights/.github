# Agent Definition Registry

Phase 6D introduced the first app-local immutable agent definition registry in
knight1y. Phase 6E began moving non-mutating identity/list reads to that
registry. Phase 6H moved remaining metadata reads to the registry and split
book assets into an app-local branding registry. Phase 6I moved the immutable
definition registry into `packages/rk_agents`.

## Files

- `packages/rk_agents/lib/src/definition.dart`
- `packages/rk_agents/lib/rk_agents.dart`
- `lib/services/agents/books.dart`

## Definition Structs

The registry defines:

- `AgentDefinition`
- `AgentMetadata`
- `AgentRuntimePolicy`
- `AgentCapabilityPolicy`
- `AgentDefinitionsRegistry`

These are immutable domain data structures in `rk_agents`. They must remain
free of Flutter, Hive, widgets, routes, assets, and knight1y runtime services.

## Registry Helpers

Phase 6E added read-path helpers:

- `AgentDefinitionsRegistry.names`
- `AgentDefinitionsRegistry.visibleCandidates`
- `AgentDefinitionsRegistry.byName(name)`
- `AgentDefinitionsRegistry.contains(name)`
- `AgentDefinitionsRegistry.defaultPromptFor(name)`
- `AgentDefinitionsRegistry.descriptionFor(name)`
- `AgentDefinitionsRegistry.taglineFor(name)`

`names` preserves the registry order that previously came from
`AgentService.agentPrompts.keys`.

## Registry Contents

`AgentDefinitionsRegistry.all` mirrors the previous canonical prompt and
metadata maps from `AgentService`:

- `act0r`
- `art1st`
- `ath1ete`
- `auth0r`
- `c0median`
- `c00k`
- `deve10per`
- `direct0r`
- `edit0r`
- `eng1neer`
- `exp10rer`
- `navigat0r`
- `pr0ducer`
- `pr0tect0r`
- `recyc1er`
- `rep0rter`
- `scient1st`
- `sh0pper`
- `rand0m`
- `dai1y`
- `knight1y`
- `aut0mate`

For each agent, the registry stores:

- id
- default prompt
- display name
- description
- tagline
- category
- system-agent flag
- default visibility marker
- default provider/model policy strings
- empty capability policy

## Compatibility Bridge

`AgentService` was removed in Phase 6H.

The remaining metadata/default prompt call sites now read
`AgentDefinitionsRegistry` through `package:rk_agents/rk_agents.dart`. Runtime
prompt overrides still read and write through app-local `AgentPromptRuntime` and
`AgentConfigService`.

## What Moved Into Immutable Definitions

Moved into `AgentDefinitionsRegistry` in `rk_agents`:

- canonical default prompts
- app-neutral short descriptions
- app-neutral taglines
- system-agent classification
- default visibility metadata
- provider/model policy shape
- capability policy shape

## What Remains Runtime-Owned

Still owned by knight1y runtime services:

- `AgentConfigService`
- provider/model persisted overrides
- prompt persisted overrides
- `AgentPromptRuntime`
- `SettingVisibility`
- Hive boxes, keys, adapters, and type ids
- `HistoryService`
- request logging and metrics
- route logic
- Flutter widgets
- app branding and assets

Still owned by app branding:

- `AgentBooks`
- asset paths
- page and drawer placement

## Package Boundary

`packages/rk_agents` contains only:

- `AgentDefinition`
- `AgentMetadata`
- `AgentRuntimePolicy`
- `AgentCapabilityPolicy`
- `AgentDefinitionsRegistry`
- immutable prompt, description, tagline, category, visibility-default, and
  provider/model policy metadata

It does not contain:

- Flutter dependencies
- Hive boxes, adapters, type ids, or persisted keys
- runtime services
- prompt override cache
- logging or metrics
- widgets, pages, routes, or navigation
- asset paths or app branding

## Behavior Guarantees

No Hive behavior changed:

- no box names changed
- no keys changed
- no adapters changed
- no type ids changed

No runtime override behavior changed:

- `AgentConfigService.saveConfig()` still persists overrides and mutates
  the runtime prompt cache through `AgentPromptRuntime`.
- `AgentConfigService.resetConfig()` still resets the mutable runtime prompt
  cache from immutable registry defaults through `AgentPromptRuntime`.
- provider/model selection still flows through `AgentConfigService`.
- visibility still flows through `SettingVisibility` and existing config hidden
  behavior.

No UI behavior changed:

- prompt and metadata call sites now read `AgentDefinitionsRegistry` helpers.
- agent ordering previously based on `AgentService.agentPrompts.keys` is
  preserved by the
  registry order.

## Phase 6E Read-Path Migration

Moved from `AgentService.agentPrompts.keys` to `AgentDefinitionsRegistry.names`:

- `AgentsPage._refreshAgentLists()`
- `AgentsPage._loadConfigs()`
- `AgentsSettingsPage._sync()`
- `TerminalBox._loadAgentConfigs()`

These are non-mutating identity/list reads. They do not read the mutable prompt
text, so moving them to the immutable registry preserves prompt override
behavior.

## Runtime-Owned Call Sites

Still intentionally runtime-owned:

- `AgentConfigService.getConfig()` reads `AgentPromptRuntime` to preserve
  fallback prompt behavior.
- `AgentConfigService.saveConfig()` writes `AgentPromptRuntime` after
  persisting config overrides.
- `AgentConfigService.resetConfig()` restores `AgentPromptRuntime` from
  immutable registry defaults.

`AgentConfigService` still owns prompt override writes because prompt overrides
are persisted in Hive and mirrored into the runtime prompt cache. That cache is
not definition data and must remain in knight1y.

## Remaining Dependencies On AgentService.agentPrompts

Direct `AgentService.agentPrompts` runtime writes were removed in Phase 6F.
The read-only compatibility getter was removed in Phase 6G.

Remaining runtime prompt ownership now lives in:

- `AgentPromptRuntime`
- `AgentConfigService`

The remaining prompt-cache dependency is mutation/fallback behavior, not
identity list ownership.

## AgentService Status

After Phase 6H, `AgentService` has been removed.

Metadata/default prompt reads now use `AgentDefinitionsRegistry`.
App-branded book assets now use `AgentBooks`.

## Phase 6H Metadata Migration

Moved from `AgentService` to `AgentDefinitionsRegistry`:

- `AgentSettingsDialog` default prompt comparisons and reset text.
- `AgentsSettingsPage` description summary.
- `AgentChatPage` header tagline and description.
- `ExpandedBook` tagline.

Moved from `AgentService.agentBooks` to `AgentBooks`:

- `HistoryPage` book agent list.
- `HistoryPage` cover lookup.
- `HistoryPage` spine lookup.

## Extraction Note

`rk_agents` is now scaffolded as a definitions-only package. Runtime services,
persistence, logging, metrics, widgets, routes, and branding remain in knight1y.
