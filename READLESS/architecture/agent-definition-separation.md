# Agent Definition Separation

## Goal

Agent definitions should be separated into stable, reusable parts before moving agent code into `rk_agents`.

The app currently mixes prompts, descriptions, provider/model settings, persistence, history, and UI assets. Splitting these concerns makes agents portable across `rand0m`, `up10ad`, `out1ine`, and `knight1y` without forcing every app to share the same branding or storage implementation.

## Definition Layers

### Prompt / Persona

The prompt/persona layer defines how an agent behaves.

It should include:

- agent id
- system prompt
- reset/default prompt
- tone/personality guidance
- safety and scope notes
- optional prompt version

This layer belongs in `rk_agents` once prompts are app-neutral. App-specific agents can still be registered locally by the app.

### Metadata

The metadata layer describes the agent without controlling its UI.

It should include:

- display name
- short description
- tagline
- category
- visibility defaults
- ordering/grouping hints
- system-agent marker

Metadata can move to `rk_agents` if it does not reference app assets or page routes.

### Provider / Model Defaults

Provider and model defaults describe the preferred AI routing for an agent.

It should include:

- default provider as `rk_ai.AiProvider`
- default model id
- allowed provider list
- allowed model list or model policy
- fallback provider/model behavior

Persisted app config should continue storing provider labels/model ids as strings until Hive schemas are intentionally migrated. Runtime routing can use typed `rk_ai` values internally.

### Memory Config

Memory config defines what an agent can remember and how long it should persist.

It should include:

- memory enabled/disabled
- memory scope: session, local profile, account, shared project
- retention policy
- summarization policy
- privacy controls
- export/delete behavior

This should be designed before extraction because it touches user agency, privacy, Hive/local storage, and future cloud sync.

### Capabilities / Tools

Capabilities describe what an agent is allowed to do beyond text generation.

It should include:

- tool ids
- permission requirements
- network access policy
- file/media access policy
- tool-specific config
- disabled-by-default flags for risky tools

Capabilities should be declarative. Tool execution should live behind package boundaries such as `rk_connections`, `rk_media`, or app-local adapters.

### UI Branding / Assets

UI branding controls how an agent appears in a specific app.

It may include:

- avatar path
- book cover path
- book spine path
- color accents
- animation style
- page route or feature entry point
- app-specific badge/copy

This should remain app-local to `knight1y` until the same asset contract is needed by multiple apps. Shared packages should not depend on app asset paths.

## Proposed Boundary

`rk_agents` should own:

- agent ids
- prompt/persona definitions
- app-neutral metadata
- provider/model policy structs
- capability declarations
- memory policy structs

`knight1y` should own:

- Hive persistence adapters until schemas are stabilized
- app-specific agent visibility/order settings
- agent avatars and book assets
- pages and navigation
- branded copy
- feature-specific widgets

`rk_ai` should own:

- provider enum/contracts
- model catalog
- defaults
- pricing/usage/impact telemetry
- typed AI responses

`rk_connections` should own:

- external integrations used by tools
- authenticated provider connections
- network clients that are not AI proxy clients

## Migration Notes

1. Separate agent prompts and descriptions from asset paths in `AgentService`.
2. Introduce a typed `AgentDefinition` model without changing Hive storage.
3. Map existing persisted `AgentConfig` onto `AgentDefinition` at runtime.
4. Keep UI asset lookup app-local.
5. Move pure definitions into `rk_agents`.
6. Move persistence only after Hive keys, type ids, and migration behavior are documented.

## Risks

- Hive box names and type ids are persistence contracts.
- App asset paths are not package-safe.
- Provider/model strings must remain compatible with existing saved configs.
- Tool/capability declarations can imply permissions, so defaults should be conservative.
- Memory config has privacy implications and should not be silently enabled.
