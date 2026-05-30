# Provider Runtime Consolidation

## Status

This blueprint closes the planning loop before provider runtime migration. It
does not change runtime code, provider routing, `.env` loading, Firebase/auth,
hosting, or app behavior.

The foundation now exists:

- `rk_core` owns app IDs and environment key-name metadata.
- `rk_ai` owns AI provider/model contracts and provider configuration metadata.
- `rk_ai` now exposes `ProviderRuntimeConfig`, a value-free runtime adapter for
  prefixed and legacy key-name plans.
- Apps still own runtime provider clients, route calls, env loading, Firebase
  Functions, and user/provider override persistence.

## Current State

### Shared Contracts

`rk_core` provides secret-free key metadata:

- app prefixes: `RANDOM`, `UPLOAD`, `OUTLINE`, `KNIGHTLY`
- key types: OpenAI, Google AI, Google PageSpeed, Weather/OpenWeather, Claude,
  Grok
- helpers that derive names such as `RANDOM_OPENAI_API_KEY`

`rk_ai` provides:

- `AiProvider`
- AI model IDs and default model helpers
- `ProviderConfiguration`
- `ProviderKeyRequirement`
- `ProviderRuntimeConfig`
- `ProviderRuntimeKeyPlan`
- provider/service metadata for OpenAI, Google AI, PageSpeed, Weather, Claude,
  and Grok

These contracts derive names and metadata only. They do not read values.
`ProviderRuntimeKeyPlan.backwardCompatibleLookupNames` keeps legacy app-local
`.env` names first, while `prefixedFirstLookupNames` documents the future
root/master `.env` migration order.

### Rand0m

`rand0m` owns direct app-side provider clients in `lib/services/api.dart`.

Current behavior:

- Google AI reads a generated `Env` accessor and uses `google_generative_ai`.
- OpenAI reads a generated `Env` accessor and calls the OpenAI chat endpoint.
- Claude reads a Dart compile-time environment value.
- Grok reads a Dart compile-time environment value.
- Local model constants duplicate `rk_ai` model IDs.
- Chat surfaces call provider-specific functions through app-local services.

Primary risks:

- mixed key loading styles
- duplicated provider/model constants
- client-side provider secrets for public app surfaces
- provider availability is implied by runtime code, not shared metadata

### Knight1y

`knight1y` AI chat and agent calls route through a Firebase callable proxy.

Current behavior:

- App API service uses `rk_ai.AiProvider` and `rk_ai` model constants.
- App sends provider wire ID, model ID, and prompt to Firebase Functions.
- Firebase Functions read server-side `process.env` keys.
- Agent provider/model overrides are persisted through `AgentConfigService`.
- Agent config stores provider labels and model IDs for compatibility.
- `AgentConfigService` normalizes provider labels through `rk_ai.AiProvider`.
- Weather reads a generated `Env` accessor.
- PageSpeed reads `dotenv.env` directly in the secret/test surface, but its key
  names now derive from `rk_ai.ProviderRuntimeConfig` with legacy-first fallback.

Primary risks:

- Firebase Functions duplicate provider routing, pricing, and model handling.
- app and backend key names are not yet derived from shared metadata
- PageSpeed still does not follow the generated accessor pattern, but its key
  name metadata is now shared-contract driven
- persisted agent override strings must remain backward-compatible

### Out1ine and Up10ad

`out1ine` and `up10ad` carry generated env accessors for Google AI and OpenAI,
but no live provider routing was found during the audit. Their Weather and
Orac1es surfaces are currently app-owned or deferred.

Primary risks:

- declared provider slots may not match future app capabilities
- stale env declarations can drift from shared provider contracts
- future wiring should avoid activating hidden provider behavior by accident

## Desired End State

The desired end state is contract-driven provider runtime configuration:

- all apps derive provider metadata from `rk_ai`
- all apps derive environment key names from `rk_core`
- provider/model selection remains app configurable
- Knight1y agent provider/model overrides remain supported
- persisted provider labels and model IDs remain compatible
- app-level and backend-level runtime clients remain swappable
- future BYOK support remains possible
- future backend/secret-manager migration remains possible

Shared packages should own metadata and contracts only:

- `rk_core`: app IDs, env prefixes, env key-name derivation
- `rk_ai`: provider metadata, model metadata, provider key requirements
- apps/backend: actual value resolution, secrets, clients, routing, persistence

## Target Runtime Shape

Each app should eventually have a local environment adapter with this shape:

```text
EcosystemAppId + ProviderConfiguration
  -> rk_core key name
  -> app-owned value resolver
  -> optional legacy fallback
  -> provider client or backend request
```

The adapter should return metadata and values separately:

- metadata: safe to log or display
- secret values: never logged, never stored in shared packages

Provider selection should flow through `rk_ai`:

```text
selected provider label / wire id
  -> AiProvider.fromValue(...)
  -> ProviderConfigurations.forAiProvider(...)
  -> available models from aiModelsForProvider(...)
```

Agent overrides should keep their current persistence shape:

```text
agent_configs.<agentName>.source = provider label
agent_configs.<agentName>.model = model id
```

The runtime view may be normalized through `rk_ai`, but stored string values
should not be rewritten during the first migration.

## Migration Phases

### Phase 1: App-Local Metadata Adapters

Add app-local read-only provider config adapters.

Scope:

- no provider calls change
- no `.env` loading changes
- no Firebase changes
- no persisted config rewrites

Each adapter should expose:

- app ID
- provider configuration list
- derived prefixed key names
- legacy fallback key names
- default model metadata
- availability metadata

### Phase 2: Rand0m Provider Metadata Adoption

Update `rand0m` services to use `rk_ai` metadata for:

- provider display names
- model constants/defaults
- key requirement names

Keep direct API calls intact. Keep the current generated env accessors and
compile-time env behavior until value resolution is migrated separately.

### Phase 3: Knight1y Agent Config Normalization

Update `AgentConfigService` to source provider lists and default model metadata
from `rk_ai.ProviderConfigurations`.

Keep:

- persisted provider labels
- persisted model IDs
- agent prompt behavior
- Hive box shape
- Firebase proxy routing

### Phase 4: Environment Key Resolver Adapters

Introduce app-local key resolvers that try:

1. app-prefixed key name from `rk_core`
2. legacy unprefixed key name from `ProviderKeyRequirement`

This phase still should not remove legacy keys.

### Phase 5: PageSpeed and Weather Alignment

Move PageSpeed and Weather key lookup to the same app-local adapter pattern.

Keep:

- PageSpeed secret/test visibility rules
- Weather provider/location/refresh behavior
- no Firebase/auth changes

### Phase 6: Backend Contract Alignment

Align Knight1y Firebase Functions with shared provider metadata by mirroring
the same provider IDs, model IDs, key suffixes, pricing, and impact assumptions.

This can be done in TypeScript without importing Dart packages. The backend
should remain the owner of server-side secrets until a secret-manager migration.

### Phase 7: Legacy Fallback Removal

After all apps and backend deployments are confirmed with prefixed keys, remove
legacy unprefixed fallback support in a dedicated cleanup phase.

## Fallback Strategy

During migration, every app-local resolver should support:

- prefixed key first
- legacy unprefixed key second
- explicit missing-key response third

Missing-key behavior should be provider-specific and nonfatal where the current
app already behaves that way. It should not expose values or print secrets.

For Knight1y:

- preserve Firebase proxy errors
- preserve agent provider/model fallback to Google AI defaults
- preserve stored overrides even if a selected provider key is unavailable

For rand0m:

- preserve current missing-key responses for Claude and Grok
- preserve Google AI and OpenAI behavior until the env adapter migration phase

## Testing Strategy

Contract tests:

- `rk_core` key prefix and key-name generation
- `rk_ai` provider-to-key requirement mapping
- `rk_ai` provider-to-default-model mapping

App-focused tests or checks:

- provider list order does not change unexpectedly
- default model per provider remains stable
- provider label normalization accepts existing stored labels
- model validation keeps existing persisted model IDs when valid
- missing key handling remains nonfatal where current behavior is nonfatal

Manual validation:

- run all provider panes in `rand0m` after runtime migration
- run Knight1y chat panes after runtime migration
- run Knight1y agent prompt with default provider/model
- run Knight1y agent prompt with each override provider/model
- run PageSpeed secret/test surface with key present and absent
- run Weather with key present and absent

Workspace validation:

- focused app analyze for touched apps
- focused package analyze/tests for touched packages
- `tooling/scripts/validate-all.ps1`

## Risks

| Risk | Mitigation |
| --- | --- |
| Secret exposure | Shared packages must never read or log values. App adapters must redact values. |
| Provider behavior drift | Adopt metadata first, value resolution second, routing last. |
| Persisted agent overrides break | Keep provider labels and model IDs compatible; do not rewrite Hive values early. |
| Backend/client mismatch | Treat Firebase Functions as a separate runtime target with mirrored contracts. |
| Public app client secrets | Prefer backend or BYOK design before expanding direct public client calls. |
| Missing prefixed keys | Keep legacy fallback until all deployment environments are updated. |
| Model catalog changes | Centralize defaults in `rk_ai` and add tests around known defaults. |

## BYOK and Future Secret-Manager Support

The contract should leave room for multiple value sources:

- app-bundled local development `.env`
- platform build-time define
- user-provided BYOK
- Firebase Functions
- cloud secret manager
- future organization/provider vault

The shared metadata should identify what key is required. The runtime adapter
should decide where the value comes from.

BYOK should not require a new provider catalog. It should be an alternate value
source for an existing `ProviderConfiguration`.

## Readiness Gate Before Runtime Migration

Before code migration begins:

- `rk_core` env key metadata remains stable
- `rk_ai` provider configuration tests pass
- `.env.example` contains safe prefixed key names only
- no `.env` values are committed
- app-specific migration target is selected
- rollback path is documented for that app

Recommended first runtime migration target: `rand0m` metadata adoption only,
because it has the clearest provider surface and no agent override persistence.
