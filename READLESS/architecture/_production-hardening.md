# Production Hardening

## Status

This blueprint defines the path from local development keys toward a
backend-managed production architecture. It does not change runtime behavior,
provider routing, Firebase configuration, hosting, or environment files.

The current foundation is:

- root `.env` for local development secrets, ignored by git
- app-prefixed key naming documented through `.env.example`
- `rk_core` environment key metadata
- `rk_ai` provider and model contracts
- `rk_ai.ProviderRuntimeConfig` for value-free key-name planning
- Knight1y Firebase Functions proxy for AI provider calls

Shared packages may describe provider and environment metadata. They must not
read, store, log, or transport secret values.

## Current Secret Usage Patterns

| Area | Current pattern | Hardening concern |
| --- | --- | --- |
| `rand0m` app | Direct provider calls from app code for AI providers | Public clients should not hold privileged provider keys in production. |
| `knight1y` app | AI calls route through Firebase Functions; Weather and PageSpeed still use app-side key access | Backend proxy direction is stronger, but non-AI service keys still need a production boundary. |
| `knight1y/functions` | Firebase Functions read provider keys from server environment | This is the preferred production shape, but should move toward managed secrets and stricter abuse controls. |
| `out1ine` app | Generated Google AI/OpenAI env accessors exist; no live provider routing found in the latest audit | Keep dormant provider slots from becoming accidental public client key paths. |
| `up10ad` app | Generated Google AI/OpenAI env accessors exist; startup loads local `.env`; no live provider routing found in the latest audit | Keep local development convenience separate from production key delivery. |
| shared packages | `rk_core`/`rk_ai` derive names and metadata only | This is safe and should remain value-free. |

## Provider Hardening Targets

| Provider / API | Local development | Staging | Production |
| --- | --- | --- | --- |
| OpenAI | Current local key loading may remain for local-only apps and tools. | Calls should prefer Firebase Functions or a backend proxy using staging secrets. | Privileged keys live in Secret Manager and are consumed only by backend functions or a backend service. |
| Google AI | Same as OpenAI. | Backend proxy should use staging secret values and model allowlists. | Backend-only privileged key access with model allowlists, request validation, and budget controls. |
| Claude | Current mixed local patterns should be normalized later through app-local adapters. | Backend proxy should validate provider/model and use staging secrets. | Backend-only privileged key access through Secret Manager. |
| Grok | Current mixed local patterns should be normalized later through app-local adapters. | Backend proxy should validate provider/model and use staging secrets. | Backend-only privileged key access through Secret Manager. |
| Weather / OpenWeather | Local client key may remain while the feature is local/dev-only. | Prefer a lightweight backend weather proxy if the key is not safely public. | Use backend proxy, domain restrictions where available, rate limits, and caching. |
| Google PageSpeed | Local developer/test usage may continue with legacy and prefixed lookup. | Keep behind developer/test access or backend proxy. | Backend-only if exposed broadly; otherwise keep restricted to authenticated/admin test surfaces. |

## Environment Models

### Local Development

Local development keeps the current compatibility model:

- developers use ignored local `.env` files
- key names may be legacy unprefixed or app-prefixed
- app adapters should use `ProviderRuntimeKeyPlan.backwardCompatibleLookupNames`
  during migration
- `.env.example` documents safe placeholder names only
- no real values are committed

Local apps may continue to use existing loading mechanisms until each provider
path is migrated deliberately. The first rule is consistency without surprise:
derive key names from shared contracts, but leave value resolution app-owned.

### Staging

Staging should be the first backend-managed environment:

- provider keys stored as managed secrets
- staging Firebase project or backend service has its own secret namespace
- Functions read secrets through platform-supported secret bindings where
  possible
- staging apps call backend proxies for privileged provider requests
- staging uses lower quotas, stricter logging redaction, and explicit model
  allowlists

Staging should prove migration behavior before production clients are changed.

### Production

Production should keep privileged provider keys out of public app bundles:

- AI provider calls go through Firebase Functions or a backend service
- Weather and PageSpeed either use backend proxies or provider-supported public
  key restrictions
- production secrets are stored in Secret Manager, not `.env`
- clients send provider intent, model ID, prompt/input, and feature context, not
  provider secrets
- backend validates app ID, user/auth context, provider, model, payload size,
  feature entitlement, and rate limits before calling providers

## Secret Manager Strategy

The target secret namespace should mirror the shared metadata without exposing
values to shared packages:

```text
<environment>/<app-prefix>/<provider-key-type>
```

Examples of logical names:

- `production/RANDOM/OPENAI_API_KEY`
- `production/KNIGHTLY/GOOGLEAI_API_KEY`
- `staging/KNIGHTLY/GOOGLE_PAGESPEED_API_KEY`

Implementation notes:

- `rk_core` continues to own logical app prefixes and key suffixes.
- `rk_ai` continues to own provider key requirements.
- backend code maps shared metadata to Secret Manager secret names.
- apps never receive raw privileged provider secrets in production.
- logs may include provider IDs, model IDs, and logical key names, but never
  values.

## Firebase Functions Provider Proxy Strategy

Knight1y already has the strongest provider boundary for AI requests because
app code calls a Firebase callable function and the function calls providers.
The production version should harden that proxy:

- bind provider secrets through Firebase/Google Cloud Secret Manager
- validate provider IDs against `rk_ai` metadata
- validate models against shared model allowlists
- enforce request size limits before provider calls
- enforce per-user and per-app rate limits
- redact provider errors before returning to clients
- log request metadata only: app ID, user ID hash or UID, provider, model,
  token estimates, cost estimates, status, and correlation ID
- centralize cost and carbon estimate logic, eventually using shared metadata
  rather than duplicated backend constants

The public apps should migrate AI calls toward the same proxy pattern before
production usage of privileged keys.

## BYOK Strategy

Future bring-your-own-key support should be distinct from first-party provider
secrets.

BYOK principles:

- user-supplied keys are never committed or stored in shared packages
- BYOK values are encrypted at rest and scoped to the owning user/workspace
- users can revoke or rotate their own keys
- backend decides whether a request uses a first-party key or a BYOK key
- UI displays provider availability and key status, not the raw key
- logs identify the key source as `firstParty`, `userProvided`, or `missing`

BYOK should not be added until provider proxying, audit logging, and redaction
are already in place.

## Key Rotation Process

Recommended rotation flow:

1. Create the new provider key in the provider console.
2. Add the new value to Secret Manager under a staged version.
3. Deploy or update backend configuration to use the new secret version.
4. Run staging smoke tests for every affected provider.
5. Promote the new secret version in production.
6. Monitor provider errors, quotas, and cost signals.
7. Revoke the old provider key after the rollback window.
8. Update any documentation that references the logical secret version or
   rotation date.

Emergency rotation should skip directly to revoking the compromised key, then
restore service with a new Secret Manager version.

## Rate Limiting and Abuse Protection

Production provider proxies should enforce defense in layers:

- Firebase Auth or equivalent identity before privileged provider calls
- per-user, per-device, per-IP, and per-app request ceilings
- provider/model allowlists per app and per feature
- prompt/input size limits
- output token limits
- daily spend budgets by provider and app
- caching for weather/PageSpeed where freshness allows it
- abuse detection for repeated failures, high-cost models, and scripted traffic
- redacted structured logs with correlation IDs
- user-visible fallback errors that do not expose provider payloads or keys

High-risk or high-cost providers should default to lower quotas until usage is
understood.

## Migration Path

### Phase 1: Keep Contracts Value-Free

Continue using:

- `rk_core.EcosystemEnvironment`
- `rk_ai.ProviderConfigurations`
- `rk_ai.ProviderRuntimeConfig`

Do not move value resolution into shared packages.

### Phase 2: Normalize App-Local Adapters

Each app should resolve logical key plans through app-owned adapters while
preserving current behavior. During this phase, use legacy-first fallback where
existing local `.env` files still depend on unprefixed names.

### Phase 3: Backend Secret Bindings

Update Firebase Functions or a backend service to read provider keys from
Secret Manager rather than ad hoc environment values. Keep callable request and
response shapes backward-compatible.

### Phase 4: Public App Proxy Migration

Move public app AI calls from direct provider clients to backend proxy calls.
Keep provider and model selection behavior unchanged from the user's
perspective.

### Phase 5: Weather and PageSpeed Boundary

Decide per service:

- backend proxy for privileged keys
- provider-supported public restrictions for safe public keys
- developer/admin-only local access for test tools

### Phase 6: Remove Legacy Fallbacks

After all apps and backend environments use app-prefixed or managed logical
names, remove legacy unprefixed fallbacks in a dedicated cleanup phase.

## Risks

| Risk | Mitigation |
| --- | --- |
| Secret exposure in logs | Redact values, never stringify full environment maps, and log logical key names only. |
| Public client key leakage | Move privileged calls behind backend proxies before production release. |
| Provider behavior drift | Keep request/response contracts backward-compatible during proxy migration. |
| Cost spikes | Add provider/model allowlists, token caps, quotas, and budget alerts. |
| Broken local development | Preserve legacy fallback until local docs and `.env.example` are updated. |
| BYOK confusion | Keep BYOK separate from first-party secret management until proxying is hardened. |
| Over-centralized shared packages | Keep shared packages metadata-only; apps/backends own value resolution and calls. |

## Non-Goals For This Phase

This phase does not:

- read or print real `.env` values
- change `.env`, `.env.example`, Firebase config, or hosting config
- deploy Firebase Functions
- change provider routing
- change app runtime behavior
- move direct app calls to backend proxies
- implement Secret Manager bindings
- implement BYOK
