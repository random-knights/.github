# P9 Glacier Provider Contract

Date: 2026-06-01

Scope: architecture contract only. This document does not authorize runtime provider integration, APIs, Firebase Functions, OAuth, maps, overlays, command execution changes, deploys, or package changes.

## Read First

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p9-connect-earth-architecture-audit.md`

## Current Runtime Audit

Current Glaciers implementation remains provider-free and read-only:

- Model: `C:\Projects\dev-kitt\apps\rand0m\lib\models\connect\earth_glaciers.dart`
- UI card: `C:\Projects\dev-kitt\apps\rand0m\lib\pages\connect.dart`
- Earth source metadata: `C:\Projects\dev-kitt\apps\rand0m\lib\services\connect\earth_source_registry.dart`
- Source catalog metadata: `C:\Projects\dev-kitt\apps\rand0m\lib\services\connect\source_catalog.dart`
- Tests: `C:\Projects\dev-kitt\apps\rand0m\test\connect\earth_glaciers_model_test.dart` and `earth_source_registry_test.dart`

Current layer state:

- Layer id: `glaciers`
- Status: `research`
- Source type: `Cryosphere / Ice Mass / Glacier Monitoring`
- Future phase shown in-app: `P9.20`
- Provider candidates: NASA Earthdata, NSIDC, USGS EarthExplorer, WGMS
- Current metric placeholders: Ice Extent, Glacier Mass Balance, Meltwater Signal, Source Freshness
- Current values: `Not Yet Connected`

The app currently contains no glacier API calls, no Firebase glacier callable, no map overlays, no coordinate display, and no provider authentication flow.

## Provider Evaluation

### NASA Earthdata

Role:

- Best broad source for future glacier-adjacent satellite and cryosphere datasets.
- Useful for long-term terrain, ice extent, imagery, and derived Earth observation context.

Access model:

- Likely OAuth or Earthdata Login backed by a server-side boundary.
- Client-side direct access is not recommended for the first implementation.

Strengths:

- Authoritative, broad dataset catalog.
- Strong fit with existing Earth source registry.
- Can support long-term Glacier, Terrain, Carbon, and Earthdata-backed roadmap work.

Risks:

- Dataset discovery and harmonization can be complex.
- Different products have different cadence, spatial resolution, and license/attribution expectations.
- Auth/token handling should not live in Flutter web.

Recommendation:

- Use as Phase 2 or long-term provider after a smaller metadata-first MVP proves the UX and cache model.

### NSIDC

Role:

- Strong candidate for glacier, snow, ice, and cryosphere datasets.
- Good fit for ice extent and glacier monitoring metadata.

Access model:

- Dataset-dependent. Some access paths may require Earthdata Login/OAuth, while catalog or metadata access may be public.
- Treat as server-proxied unless the exact endpoint is confirmed to be anonymous and browser-safe.

Strengths:

- Domain-specific cryosphere authority.
- Better semantic match for Glaciers than generic satellite catalogs.
- Good candidate for first provider-backed ice extent or glacier inventory summaries.

Risks:

- Dataset-specific interpretation required.
- Some products may be large, gridded, or unsuitable for direct web consumption.
- Attribution and product-version labels must be explicit.

Recommendation:

- Recommended MVP provider, but only for metadata/summary fields and not raw gridded data.

### USGS EarthExplorer

Role:

- Useful satellite and terrain search/discovery source that can support glacier-adjacent imagery and land-surface context.

Access model:

- Likely authenticated API or account-backed access for practical automation.
- Should use server-side proxy if implemented.

Strengths:

- Strong fit for terrain/glacier imagery discovery and historical comparison context.
- Complements Terrain readiness work.

Risks:

- More useful for dataset search than a simple glacier summary.
- Can pull the product toward imagery/map workflows before the Earth layer is ready.

Recommendation:

- Defer to Phase 2 after NSIDC/WGMS summary contracts are stable.

### WGMS

Role:

- Best candidate for glacier mass-balance and monitoring summaries.

Access model:

- Current catalog marks auth type as `none`; verify exact data access terms before implementation.
- Prefer cache-first ingestion even if no key is required.

Strengths:

- Directly aligned with glacier mass balance.
- Likely better for educational summary metrics than raw satellite data.
- Lower auth complexity if approved data endpoints remain public.

Risks:

- Update cadence may be slower than satellite products.
- May require careful attribution and explanation that values are observational/compiled, not live.

Recommendation:

- Recommended MVP companion source with NSIDC: WGMS for mass balance, NSIDC for ice/cryosphere metadata.

## Recommended MVP Provider

MVP should use a conservative metadata-summary approach:

1. Primary MVP source: WGMS for mass-balance-oriented metadata and educational summaries.
2. Secondary MVP source: NSIDC for cryosphere/ice extent metadata if a safe public or server-proxied endpoint is identified.
3. Defer NASA Earthdata and USGS EarthExplorer to Phase 2 unless their metadata endpoints prove simpler than NSIDC.

MVP should not retrieve raw gridded data, imagery, coordinates, or map-ready layers. It should return only bounded educational summaries:

- Ice extent status label
- Glacier mass balance status label
- Meltwater signal context label
- Dataset version or publication year
- Source freshness label
- Attribution text
- Safe provider health state

## Source Access Model

Preferred architecture:

- Firebase callable proxy for any authenticated, token-bearing, large, or policy-sensitive provider.
- Cache-first behavior before provider fetch.
- Client receives summary-only data.
- Client never receives provider tokens, raw provider responses, coordinates, or large dataset payloads.

Potential callable:

```text
getGlacierSummary
```

Inputs:

- approved region preset only
- optional dataset family id from an allowlist
- no raw bounding boxes in MVP
- no arbitrary provider URLs

Outputs:

- summary values only
- provider attribution
- dataset version/publication date
- freshness age
- provider health
- cache status
- safe user-facing message

## Auth And Key Requirements

MVP:

- WGMS: use no-auth metadata only if terms allow; otherwise proxy and cache.
- NSIDC: treat as OAuth/Earthdata-login capable until proven otherwise.

Phase 2:

- NASA Earthdata: server-side OAuth/Earthdata Login flow or approved service boundary.
- USGS EarthExplorer: server-side authenticated API only if required.

Rules:

- No provider secrets in Flutter web.
- No OAuth tokens in local logs.
- No raw provider errors exposed to users.
- No provider access added without explicit implementation phase approval.

## Cache And Freshness Rules

Glacier data is slow-moving compared with weather or fire data. Prefer long-lived cache windows.

MVP cache:

- Cache dataset metadata and summary responses for 24 hours minimum.
- Allow longer cache windows for annual/static products.
- Always display dataset version/publication date when available.
- Display freshness as `current dataset`, `cached`, `stale`, or `unavailable`.

Provider fetch:

- Cache-before-provider-call.
- On provider failure, return stale cached summary if available.
- If no cache is available, return a safe unavailable state.

Never imply real-time glacier monitoring unless the source explicitly supports it.

## Safe Error Handling

Callable/provider failures should map to safe user-facing states:

- Provider unavailable: "Glacier data is temporarily unavailable."
- Stale cached data: "Cached glacier dataset summary shown."
- Unsupported region: "This glacier region is not available yet."
- Malformed source data: "Glacier source data could not be read safely."
- Auth/key issue: "Glacier source is not configured yet."

Internal logs may include provider error category and request id, but must not include tokens, raw payloads, or secret values.

## Attribution

Every glacier summary must include attribution:

- Provider name
- Dataset/product name where available
- Dataset version or publication date where available
- Link to provider documentation or dataset landing page

Suggested attribution priorities:

- WGMS: cite WGMS and dataset/database version.
- NSIDC: cite NSIDC product and version.
- NASA Earthdata: cite dataset/product and DAAC if available.
- USGS: cite USGS EarthExplorer/product source.

## Privacy And Security Notes

- Glacier summaries are public/environmental data and should not require user personal data.
- Authenticated app access should still be required if exposed through app-only Firebase callables.
- Do not log user location for glacier summaries.
- Do not accept arbitrary provider URLs, bounding boxes, or raw query strings from the client.
- Do not expose exact coordinates in MVP.
- Do not mix glacier provider work with command execution or agent source access.

## Testing Strategy

MVP tests should cover:

- Glacier source registry mapping integrity.
- Approved region preset validation.
- Cache hit response.
- Cache miss/provider success response.
- Provider failure with stale cache.
- Provider failure without cache.
- Malformed source payload handling.
- Attribution presence.
- No coordinates/raw provider payload in client model.
- User-facing copy for unavailable/stale/malformed states.

Flutter/UI tests should verify:

- Glaciers card replaces placeholder metrics with summary values only when data exists.
- Readiness state remains clear when provider is unavailable.
- Source freshness and attribution render.
- Existing Weather, Wind, Wildfires, Carbon, Tree-Time, Ocean, Flights, Ships, and Terrain behavior is unchanged.

## Rollback Strategy

- Keep current readiness-only `EarthGlaciersModel.readiness` as fallback.
- Gate live glacier summary display behind successful summary load.
- If callable fails or provider contract changes, show readiness copy and `Not Yet Connected`/unavailable labels.
- Roll back by removing the callable wiring while preserving source registry metadata.
- Do not remove the Glaciers card or existing readiness tests during rollback.

## Recommended Roadmap

### MVP Glacier Implementation

- Add a summary-only glacier model.
- Add a provider observability model reuse path.
- Add `getGlacierSummary` callable only if provider access requires server boundary.
- Use WGMS and/or NSIDC metadata summaries.
- Display Ice Extent, Glacier Mass Balance, Meltwater Signal, Source Freshness, provider health, and attribution.
- No maps, overlays, coordinates, raw payloads, or arbitrary regions.

### Phase 2

- Add NASA Earthdata or USGS EarthExplorer metadata if needed for dataset discovery.
- Add approved region presets.
- Add dataset version comparison labels.
- Add stronger cache/freshness detail.
- Evaluate whether Terrain and Glaciers can share Earthdata/USGS source plumbing.

### Long-Term

- Support map/overlay planning only after Earth rendering architecture is approved.
- Add multi-provider comparison if attribution and methodology are clear.
- Add climate trend explanations with uncertainty and dataset version labels.
- Explore agent QUERY previews for glacier summaries only after source-access governance is approved.

## P9.23 Recommendation

Before implementing glacier runtime access, run:

```text
P9.23 Glacier Summary MVP Provider Spike
```

Recommended spike goals:

- Confirm WGMS and NSIDC endpoint/data access terms.
- Identify one safe metadata endpoint or downloadable summary product.
- Prototype parser off-app or in a branch-only sandbox.
- Compare payload shape to proposed summary model.
- Do not add runtime app integration until provider access and attribution are proven.
