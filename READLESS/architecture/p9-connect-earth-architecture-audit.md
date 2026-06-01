# P9.0 Connect + Earth Architecture Audit

Date: 2026-05-31

Scope: audit and architecture planning only. This document does not authorize runtime source integrations, OAuth, external APIs, Firebase Functions, command execution changes, Home Terminal input, package changes, validation, or deploy.

Documentation boundary: `C:\Projects\dev-kitt` remains source-only. Architecture notes belong directly in `C:\Projects\qa-kitt\.github\READLESS\architecture`; do not create nested READLESS folders.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\dev-kitt\RUNBOOK.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p8-controlled-execution-governance.md`

## Current Implementation Audit

### c0nnect Page

Current implementation:

- `C:\Projects\dev-kitt\apps\rand0m\lib\pages\connect.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\icons.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\home\tech_sheet.dart`
- c0nnect route/page index is wired through `HomePage` index `_idxConnect`.
- Web route `/c0nnect` maps to `HomePage(startIndex: _idxConnect)`.

Behavior:

- The page renders `Globe`, a custom animated 3D-ish icon sphere using a Fibonacci point distribution and manual projection.
- The globe auto-spins, pauses on drag/tap, supports inertial drag, and only front-facing icons are tappable.
- Tapping a front-facing icon opens `TechSheetService.showTechSheet`.
- `TechSheetService` displays a bottom sheet with uppercased slug title, selected icon, a description, and two buttons: `Learn More` and `Docs`.
- `Learn More` and `Docs` currently have empty `onPressed` callbacks.
- The current sheet descriptions are technology descriptions, not connection/source descriptions.

Assessment:

- c0nnect is currently a technology discovery/visual affordance, not a source registry.
- The globe interaction and brand feel are reusable for sources.
- Runtime connection state does not exist yet.
- The existing no-op buttons are the natural place to evolve `Learn More` into `Add Source` and wire Docs later.

### Globe Icon Definitions

Current implementation:

- `IconService.defaultSlugs` defines 30 slugs.
- `IconService._map` maps each slug to a Material icon.
- Every slug is used by `HomePage` to build `GlobeIcon(icon: IconService.getIcon(s), slug: s)`.
- `GlobeIcon` stores `icon`, `slug`, and runtime projection fields.

Current icon state behavior:

- Front-facing unselected icons: `Colors.white70`.
- Back-facing icons: `defaultIconColor.withValues(alpha: 0.25)` plus `Opacity(0.25)`.
- Selected icon: `AppColors.kitt`.
- Hit testing ignores back-facing icons.
- All front-facing icons are enabled for opening the tech sheet.
- No icon has connected/disconnected/error status yet.

### Popup/Menu Behavior

Current implementation:

- `Globe` opens a custom app bottom sheet through `FxBottomSheet.show`.
- `TechSheetService` wraps the content in `FxBottomSheetScaffold`.
- Sheet actions are no-op.
- The sheet does not navigate to external docs, persist state, or call services.

Assessment:

- The bottom sheet is a good near-term "source detail" surface.
- The button row should become source-aware before adding integrations.
- Docs should open safe documentation URLs only after a source catalog exists.

### More Menu Navigation

Current implementation:

- More menu is in `apps/rand0m/lib/pages/home/home.dart`.
- It is popup-only and includes `c0nnect` with label `c0nnect`, subtitle `enhance`, and icon `_navIconConnect = Icons.language`.
- Tapping c0nnect navigates to `_idxConnect`, route `/c0nnect`.

Assessment:

- More menu already treats c0nnect as a primary AI-adjacent destination.
- No route changes are needed for P9.
- More remains popup-only. Do not add `/more`.

### Agent Capability Architecture

Current implementation:

- `packages/rk_agents/lib/src/action_registry.dart` defines preview-only actions and tools.
- Relevant actions include `hive.inspect`, `weather.query`, `render.orchestrate`, `chat.assist`, report/template/validation actions.
- P8 command policy maps `hiveInspection` and `weatherQuery` to QUERY.
- P8.14 adds `/query ...` preview scaffolding only.

Assessment:

- Agent capability metadata exists but is not a source permission system.
- Future source access should connect Source Registry entries to agent capabilities, not bypass P8 command governance.

### Firebase Auth Boundaries

Current app boundary:

- `AuthService.isAllowedUser` requires a Firebase user with verified email ending in `@rand0m.ai`.
- Web sign-in uses Google popup with hosted-domain hint.

Current callable boundary:

- Functions call `assertRand0mUser`.
- Callable errors preserve safe semantics.

Assessment:

- Source access must require the same app auth boundary.
- OAuth grants should be scoped per user and per source.
- Source tokens must not be exposed to the client unless a source explicitly requires client-side SDK auth and has been approved.

### Command Governance Architecture

Current state:

- VIEW commands can execute only through local read-only handlers.
- QUERY commands have preview scaffolding but no execution.
- Non-VIEW handlers cannot register in the local VIEW registry.
- Confirmation and preview fingerprint validation exist.
- ADMIN remains blocked by default.

Assessment:

- Source connectivity must first feed QUERY preview metadata.
- Source-backed QUERY execution requires a future phase with source registry, permission model, confirmation rules, freshness rules, and bounded handler contracts.

### Weather Integration

Current implementation:

- `WeatherService` calls OpenWeatherMap directly from the app using `Env.weatherApiKey`.
- `LocationService` uses `geolocator` to request location permission and current position.
- Weather route `/weather` uses `WeatherPage`, `WeatherHero`, `WeatherHourlyStrip`, and local visual models.

Assessment:

- Weather is currently a direct app API-key integration, not a source registry entry.
- It should be represented as an existing Weather source candidate before future Earth overlays.
- WASM compatibility follow-up remains relevant because `geolocator_web` uses `dart:html`.

### PageSpeed Integration

Current implementation:

- Agent secret widget calls callable Function `runPageSpeedAudit`.
- Function validates authenticated user, URL, strategy, and categories.
- It calls Google PageSpeed Insights with server-side key.

Assessment:

- This is the best current example of a Firebase proxy source pattern.
- Future source registry should support `authType: firebase proxy` for bounded server-side keys.

### AI Provider Integrations

Current implementation:

- AI providers are routed through callable Function `generateAIResponse`.
- Supported provider labels in app code include GoogleAI/Gemini, OpenAI, ClaudeAI, and GrokAI.
- Default provider settings are app-local.
- The Home Terminal displays provider/model summary only.

Assessment:

- AI providers are already "connected" at an infrastructure level but not represented as c0nnect sources.
- AI source catalog entries should reference existing provider support and avoid duplicating provider settings.

## Current Globe Icon Inventory

All icons currently open the same tech sheet. Destinations are local bottom sheets, not routes. "Enabled" means front-facing icon taps open the sheet; back-facing icons are visible but not tappable until rotation brings them forward.

| Current name | Current behavior | Current destination | Current icon state | Enabled/disabled | Future source suitability |
| --- | --- | --- | --- | --- | --- |
| typescript | Opens tech sheet with generic/known description. | Local tech sheet `TYPESCRIPT`. | `Icons.code`; white/front, faded/back, kitt/selected. | Front enabled, back disabled by depth. | Development source metadata only; not a direct data source. |
| javascript | Opens tech sheet. | Local tech sheet `JAVASCRIPT`. | `Icons.javascript`. | Front enabled, back disabled by depth. | Development metadata only. |
| dart | Opens tech sheet. | Local tech sheet `DART`. | `Icons.flutter_dash`. | Front enabled, back disabled by depth. | Development metadata only. |
| java | Opens tech sheet. | Local tech sheet `JAVA`. | `Icons.coffee`. | Front enabled, back disabled by depth. | Low priority as source. |
| react | Opens tech sheet. | Local tech sheet `REACT`. | `Icons.web`. | Front enabled, back disabled by depth. | Development metadata only. |
| flutter | Opens tech sheet. | Local tech sheet `FLUTTER`. | `Icons.flutter_dash`. | Front enabled, back disabled by depth. | Development metadata only; relevant to app tooling docs. |
| android | Opens tech sheet. | Local tech sheet `ANDROID`. | `Icons.android`. | Front enabled, back disabled by depth. | Platform metadata only. |
| html5 | Opens tech sheet. | Local tech sheet `HTML5`. | `Icons.html`. | Front enabled, back disabled by depth. | Content/web metadata only. |
| css3 | Opens tech sheet. | Local tech sheet `CSS3`. | `Icons.css`. | Front enabled, back disabled by depth. | Content/web metadata only. |
| nodedotjs | Opens tech sheet. | Local tech sheet `NODEDOTJS`. | `Icons.memory`. | Front enabled, back disabled by depth. | Development metadata only. |
| express | Opens tech sheet. | Local tech sheet `EXPRESS`. | `Icons.developer_board`. | Front enabled, back disabled by depth. | Development metadata only. |
| nextdotjs | Opens tech sheet. | Local tech sheet `NEXTDOTJS`. | `Icons.next_plan`. | Front enabled, back disabled by depth. | Development metadata only. |
| prisma | Opens tech sheet. | Local tech sheet `PRISMA`. | `Icons.storage`. | Front enabled, back disabled by depth. | Data/dev metadata only. |
| amazonaws | Opens tech sheet. | Local tech sheet `AMAZONAWS`. | `Icons.cloud`. | Front enabled, back disabled by depth. | Future cloud source candidate, high governance risk. |
| postgresql | Opens tech sheet. | Local tech sheet `POSTGRESQL`. | `Icons.storage_outlined`. | Front enabled, back disabled by depth. | Future data source candidate if local/proxy boundary exists. |
| firebase | Opens tech sheet. | Local tech sheet `FIREBASE`. | `Icons.local_fire_department`. | Front enabled, back disabled by depth. | Existing infrastructure source; ADMIN-sensitive. |
| nginx | Opens tech sheet. | Local tech sheet `NGINX`. | `Icons.security`. | Front enabled, back disabled by depth. | Infrastructure metadata only. |
| vercel | Opens tech sheet. | Local tech sheet `VERCEL`. | `Icons.vertical_align_center`. | Front enabled, back disabled by depth. | Deployment source candidate but should remain ADMIN-blocked. |
| testinglibrary | Opens tech sheet. | Local tech sheet `TESTINGLIBRARY`. | `Icons.science`. | Front enabled, back disabled by depth. | Development metadata only. |
| jest | Opens tech sheet. | Local tech sheet `JEST`. | `Icons.extension`. | Front enabled, back disabled by depth. | Development metadata only. |
| cypress | Opens tech sheet. | Local tech sheet `CYPRESS`. | `Icons.bug_report`. | Front enabled, back disabled by depth. | Future validation metadata; no execution. |
| docker | Opens tech sheet. | Local tech sheet `DOCKER`. | `Icons.cloud`. | Front enabled, back disabled by depth. | Infrastructure source candidate but EXECUTE/ADMIN risk. |
| git | Opens tech sheet. | Local tech sheet `GIT`. | `Icons.merge_type`. | Front enabled, back disabled by depth. | Development metadata only; command execution must remain blocked. |
| jira | Opens tech sheet. | Local tech sheet `JIRA`. | `Icons.track_changes`. | Front enabled, back disabled by depth. | Productivity/dev source candidate via OAuth/API key. |
| github | Opens tech sheet. | Local tech sheet `GITHUB`. | `Icons.code_off`. | Front enabled, back disabled by depth. | Strong future source candidate via OAuth/GitHub App. |
| gitlab | Opens tech sheet. | Local tech sheet `GITLAB`. | `Icons.engineering`. | Front enabled, back disabled by depth. | Future source candidate via OAuth/token. |
| visualstudiocode | Opens tech sheet. | Local tech sheet `VISUALSTUDIOCODE`. | `Icons.code`. | Front enabled, back disabled by depth. | Local metadata only, not web source. |
| androidstudio | Opens tech sheet. | Local tech sheet `ANDROIDSTUDIO`. | `Icons.developer_board`. | Front enabled, back disabled by depth. | Local metadata only. |
| sonarqube | Opens tech sheet. | Local tech sheet `SONARQUBE`. | `Icons.analytics`. | Front enabled, back disabled by depth. | Future quality source candidate via API key/proxy. |
| figma | Opens tech sheet. | Local tech sheet `FIGMA`. | `Icons.design_services`. | Front enabled, back disabled by depth. | Future content/productivity source candidate via OAuth. |

## Source Registry Proposal

### Source Registry Model

Recommended app-local seed model:

```text
SourceDefinition
- id
- displayName
- category
- description
- docsUrl
- authType: none | oauth | apiKey | firebaseProxy
- statusCapabilities: canPreview, canConnect, canQuery, canGenerate, canModify
- agentCapabilities
- queryCapabilities
- freshnessPolicy
- cachePolicy
- privacyPolicy
- enabledByDefault
- implementationPhase
```

Keep runtime storage separate:

```text
SourceConnection
- sourceId
- userId
- status: disconnected | available | connected | error
- grantedScopes
- connectedAt
- lastCheckedAt
- expiresAt
- safeDisplayAccount
- errorCode
- errorMessageSafe
```

### Source Permission Model

Permission levels:

- `metadata`: source card, docs, non-sensitive capability preview.
- `readLocal`: local app/Hive read boundaries.
- `readRemote`: remote read-only source query.
- `generateRemote`: provider generation or summarization.
- `writeLocal`: local app state changes.
- `writeRemote`: external mutation.
- `admin`: secrets, deployment, IAM, App Check, packages, schema changes.

Rules:

- Default source permissions are `metadata` only.
- QUERY commands may preview source requirements without permissions.
- Read execution requires explicit source connection, scoped permission, P8 confirmation where applicable, and bounded handler.
- MODIFY, EXECUTE, and ADMIN remain blocked until separate phases.
- Agent access must be source-scoped; no global "agent can use all sources" shortcut.

### Source Status Model

- `disconnected`: source exists in registry but user has not connected it.
- `available`: source can be used without user OAuth, or app has infrastructure configured but user has not granted source-specific permission.
- `connected`: user/source grant exists and status check passes.
- `error`: grant exists or source is configured, but status check failed with safe error copy.

### Add Source Workflow

1. User opens c0nnect.
2. User selects a source icon/card.
3. Sheet shows source summary, auth type, permissions, agent use cases, docs.
4. `Add Source` begins only metadata/no-op in P9.1 unless source is `none` auth.
5. Future phases route OAuth/API-key/proxy setup through explicit source-specific flows.
6. Status updates only after a successful safe status check.

### Documentation Workflow

- Every registry source requires a `docsUrl`.
- Docs button opens external docs in browser only after URL is present in the catalog.
- Docs is always allowed for disconnected sources.
- Documentation links must never require secrets or print local env values.

### Agent Source Access Rules

- Agents may see source metadata for preview.
- Agents may not query connected sources unless:
  - source is connected or available,
  - source grants the needed permission,
  - command policy permits the category,
  - handler is explicitly registered,
  - preview identity and confirmation checks pass when required.
- Agent results must include source name and freshness.
- Provider calls must not receive raw source data unless a future GENERATE/source summarization phase explicitly approves it.

### Caching/Freshness Rules

- Registry metadata can be bundled app-local.
- Source status can be cached briefly, for example 5 to 15 minutes.
- Weather and Earth overlays need per-source freshness labels.
- Remote data cache TTL must be source-specific:
  - weather/current: minutes
  - PageSpeed: hours/days
  - docs/catalog: release-bound
  - wildfire/flight/ship overlays: minutes to hours, depending on provider license
- Stale data must be labeled, not silently treated as current.

### Redaction/Privacy Rules

- Never store raw secrets in source metadata or history.
- Never log OAuth tokens, API keys, refresh tokens, raw provider errors, or full external payloads.
- Store safe account display only, for example email/domain or source account label.
- Log source id, command id, category, risk, status, freshness, and safe error codes.
- History entries should reference summaries, not raw source data.

## Candidate Source Catalog

Difficulty scale: Low, Medium, High, Very High. Priority: P1 near, P2 next, P3 later, P4 research.

| Category | Source | Ecosystem value | Auth type | Agent use cases | Documentation URL | Difficulty | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AI | OpenAI | Existing provider and strong generation/reasoning source. | firebase proxy | Chat, agents, summarization, future source-aware generation. | https://platform.openai.com/docs | Medium | P1 |
| AI | Gemini | Existing default provider and Google ecosystem fit. | firebase proxy | Chat, agents, multimodal/future Earth summaries. | https://ai.google.dev/docs | Medium | P1 |
| AI | Claude | Existing provider option, strong writing/review use. | firebase proxy | Agent review, long-context analysis, safety-sensitive summaries. | https://docs.anthropic.com/ | Medium | P1 |
| AI | Grok | Existing provider option. | firebase proxy | Alternative model routing and exploratory agents. | https://docs.x.ai/ | Medium | P2 |
| AI | Perplexity | Search/answer hybrid for sourced QUERY/GENERATE later. | api key or firebase proxy | Fresh research previews, citations, market/news style queries. | https://docs.perplexity.ai/ | Medium | P2 |
| Search | Brave Search | Web search API with independent index. | api key or firebase proxy | QUERY web search, source discovery, citation candidates. | https://api.search.brave.com/app/documentation | Medium | P2 |
| Search | Tavily | AI-oriented search/retrieval API. | api key or firebase proxy | Agent research, URL/source discovery, answer context. | https://docs.tavily.com/ | Medium | P2 |
| Development | GitHub | High-value repo, issue, PR, release context. | oauth or GitHub App | Read repo metadata, summarize issues, future PR review. | https://docs.github.com/rest | High | P1 |
| Development | GitLab | Repo/issue/MR source for non-GitHub projects. | oauth or api key | Read project metadata and CI summaries. | https://docs.gitlab.com/api/ | High | P3 |
| Development | SonarQube | Code quality source already represented by globe icon. | api key or firebase proxy | Quality summaries, trends, validation reports. | https://docs.sonarsource.com/sonarqube-server/extension-guide/web-api/ | Medium | P3 |
| Development | PageSpeed Insights | Existing Firebase proxy integration. | firebase proxy | Website performance, accessibility, SEO, best practices. | https://developers.google.com/speed/docs/insights/v5/get-started | Medium | P1 |
| Productivity | Google Drive | User documents and files. | oauth | Source-aware summaries, document lookup, future export. | https://developers.google.com/drive/api/guides/about-sdk | High | P2 |
| Productivity | Gmail | Mail context, high privacy risk. | oauth | Inbox summaries, action item extraction, QUERY only at first. | https://developers.google.com/gmail/api/guides | Very High | P3 |
| Productivity | Calendar | Schedule and planning context. | oauth | Daily planning, event lookup, reminders preview. | https://developers.google.com/calendar/api/guides/overview | High | P2 |
| Productivity | Notion | Knowledge base and project docs. | oauth | Page/database lookup, project context, summaries. | https://developers.notion.com/ | High | P2 |
| Content | Figma | Design/product context. | oauth | File previews, design notes, component inventory. | https://www.figma.com/developers/api | High | P3 |
| Content | URL Content Scan | Existing Firebase proxy for public URLs. | firebase proxy | Metadata extraction, content safety signals, link preview. | Internal `scanContentUrl`; public URL parsing only. | Medium | P1 |
| Knowledge | Wikipedia | Public encyclopedia data. | none | QUERY factual context, entity summaries. | https://api.wikimedia.org/wiki/Core_REST_API | Low | P1 |
| Knowledge | Arxiv | Research paper search and metadata. | none | Research discovery, paper summaries, source lists. | https://info.arxiv.org/help/api/index.html | Low | P2 |
| Data | PostgreSQL | Structured app/customer/project data source. | api key or firebase proxy | QUERY tables/views with strict schema allowlist. | https://www.postgresql.org/docs/current/ | Very High | P4 |
| Data | Firebase | Existing backend platform. | firebase proxy | App-owned safe metadata/status, never ADMIN by default. | https://firebase.google.com/docs | High | P2 |
| Weather | OpenWeatherMap | Existing weather API source. | api key | Current conditions, forecast, future Earth weather overlay. | https://openweathermap.org/api | Medium | P1 |
| Weather | NOAA | Public US weather/climate data. | none | Forecasts, alerts, climate references. | https://www.weather.gov/documentation/services-web-api | Medium | P2 |
| Weather | Open-Meteo | No-key weather and climate APIs. | none | Forecasts, historical weather, Earth weather overlays. | https://open-meteo.com/en/docs | Low | P1 |
| Maps | OpenStreetMap | Map base/source data ecosystem. | none for public data, provider-specific for tiles | Geocoding, place context, future Earth/Map overlays. | https://wiki.openstreetmap.org/wiki/API | Medium | P2 |
| Maps | Mapbox | Tiles, maps, geocoding, visualization. | api key | Polished map/Earth layers if license permits. | https://docs.mapbox.com/api/ | High | P3 |
| Earth | NASA FIRMS | Wildfire and thermal anomaly data. | api key | Wildfire overlay, alerts, climate/impact views. | https://firms.modaps.eosdis.nasa.gov/api/ | Medium | P2 |
| Earth | NASA Earthdata | Broad satellite/climate datasets. | oauth or token | Research-grade Earth layers and downloads. | https://www.earthdata.nasa.gov/learn/use-data/api | Very High | P3 |
| Earth | Open-Meteo | Weather/climate layers without auth. | none | MVP Earth weather layer and historical climate. | https://open-meteo.com/en/docs | Low | P1 |
| Earth | OpenSky Network | Flight state vectors. | none or account | Flight overlay, air traffic view. | https://openskynetwork.github.io/opensky-api/ | Medium | P3 |
| Earth | Global Fishing Watch | Vessel/fishing activity datasets. | api key | Ship/fishing overlays and ocean activity. | https://globalfishingwatch.org/our-apis/ | High | P3 |
| Earth | Copernicus Marine | Ocean current and marine datasets. | account/api | Ocean current overlays, sea surface metrics. | https://marine.copernicus.eu/access-data | Very High | P4 |
| Earth | Global Wind Atlas | Wind resource/geospatial data. | none/download or source-specific | Wind overlays and renewable-energy context. | https://globalwindatlas.info/ | Medium | P3 |
| Earth | USGS EarthExplorer | Terrain, elevation, satellite data. | account | Terrain/glacier/source discovery. | https://earthexplorer.usgs.gov/ | Very High | P4 |
| Social | Reddit | Public/community signal, policy-sensitive. | oauth | Trend/context previews, community search. | https://www.reddit.com/dev/api/ | High | P4 |
| Social | X API | Social stream/search, policy/cost-sensitive. | oauth or api key | Trend lookup, source monitoring. | https://developer.x.com/en/docs | Very High | P4 |
| Media | YouTube | Video/search/channel metadata. | api key or oauth | Video discovery, transcript/source planning if allowed. | https://developers.google.com/youtube/v3 | Medium | P2 |
| Media | Spotify | Existing vibe page context. | oauth | Playlist/library metadata, music recommendations. | https://developer.spotify.com/documentation/web-api | High | P2 |

## Connect Architecture

### Recommended Shape

P9 should preserve the c0nnect visual identity but separate three concepts:

1. Source catalog: static definitions, docs, categories, icons, auth type.
2. Source connection state: user/source status and safe account display.
3. Source access: command/agent governed read/generate/mutate permissions.

### Source Registry Placement

Recommended P9.1 placement:

- app-local `apps/rand0m/lib/services/connect/source_registry.dart`
- app-local `apps/rand0m/lib/models/connect/source.dart`
- no package extraction in P9.1

Future package extraction:

- Consider `rk_data` or a new source-specific package only after registry and UI patterns stabilize.
- Do not move into package repos during P9.1.

### UI Data Model

Minimum source card fields:

- display name
- category
- icon
- status
- auth type
- short value proposition
- docs URL
- agent use cases
- enabled flag

### Status Indicators

Recommended visual treatment:

- disconnected: neutral outline or muted icon
- available: `AppColors.kitt` accent
- connected: kitt accent plus small check/status marker
- error: warning color plus safe error label
- disabled/future: lower opacity, no Add Source action

## Earth Architecture

### Feasibility

Connect tab and Earth tab are feasible inside `/c0nnect` without changing routes. Recommended approach:

- Keep `/c0nnect` as the route.
- Add a tab or segmented control inside the page:
  - Connect
  - Earth
- Earth is read-only.
- Earth starts with local/static layers or no-auth APIs only.
- Earth does not grant command execution by itself.

### Globe Visualization Approaches

Options:

1. Keep current custom icon globe for Connect.
   - Lowest risk.
   - Best brand continuity.
   - Not suitable for rich Earth overlays alone.

2. Add an Earth tab with a lightweight 2D map first.
   - Lower risk than WebGL.
   - Easier overlay rendering and mobile responsiveness.

3. Add a 3D globe later with a proven package or Three.js/WebGL bridge.
   - Higher visual payoff.
   - Higher web compatibility and performance risk.
   - Must be verified across desktop/mobile and web builds.

### Overlay Feasibility

| Overlay | Feasibility | Suggested source | Notes |
| --- | --- | --- | --- |
| Weather | High | Open-Meteo or existing OpenWeatherMap | Good MVP candidate. Needs freshness label. |
| Wind | Medium | Open-Meteo wind fields or Global Wind Atlas | Use simple vectors/tiles first. |
| Ocean currents | Low/Medium | Copernicus Marine | Data complexity and auth make this later. |
| Wildfire | Medium | NASA FIRMS | Strong visual value. Needs API key and careful refresh. |
| Flights | Medium | OpenSky | Cool but rate limits and coverage variability. |
| Ships | Medium/Low | Global Fishing Watch or vessel datasets | Licensing and data model need review. |
| Terrain | Medium | OSM/Mapbox/USGS | Map tile provider choice matters. |
| Glaciers | Low/Medium | NASA/USGS datasets | Better as curated layers later. |
| Carbon metrics | Medium | App AI usage estimates plus external climate data | Existing AI cost/carbon estimates can seed product-specific metrics. |
| Tree-time metrics | Medium | Internal derived metric | Define formula before UI. |

### MVP Earth

- Read-only Earth tab inside `/c0nnect`.
- No-auth data where possible.
- Start with:
  - current location weather context or global sample weather layer
  - source catalog cards for Earth sources
  - freshness labels
  - disabled overlays for future layers
- No command execution.
- No OAuth.
- No new Firebase Functions unless a later phase approves proxying.

### Phase 2 Earth

- Add one bounded remote overlay via source registry, preferably Open-Meteo.
- Add source status checks.
- Add cache TTLs and stale labels.
- Add QUERY previews that reference Earth sources but do not execute until explicitly approved.

### Long-Term Earth

- 3D globe or rich map scene.
- Layer toggles for weather, wind, wildfire, flights, ships, terrain, glaciers.
- Agent-assisted read-only analysis through QUERY after source governance is approved.
- Optional GENERATE summaries only after explicit provider/data disclosure phase.
- No MODIFY/EXECUTE/ADMIN behavior by default.

## UI Review And Recommendations

### Preserve

- Current globe/brand experience.
- AppColors.kitt selected state.
- Bottom sheet interaction model.
- `/c0nnect` route and More menu entry.

### Change Later, Not In P9.0

- Rename `Learn More` to `Add Source`.
- Keep `Docs`, but wire it to `SourceDefinition.docsUrl`.
- Add source status indicators.
- Add Connect/Earth tabs inside c0nnect.
- Replace slug uppercasing with source display names.
- Keep existing tech globe as either:
  - Connect source globe, after converting slugs to source definitions, or
  - "Development sources" category within the source catalog.

### Button Behavior Recommendation

- `Add Source`:
  - disabled for future/not implemented sources
  - starts metadata-only connect flow for `authType: none`
  - starts explicit setup flow for OAuth/API key/proxy sources only in future phases
- `Docs`:
  - opens external URL
  - available before connection
  - no state mutation

### Tabs Recommendation

Use compact tabs/segmented control:

- `Connect`: source catalog and source status.
- `Earth`: read-only visual layers and Earth source previews.

No new route is needed. Do not add `/earth` in P9.1 unless a later sitemap phase approves it.

## Risk Notes

- OAuth introduces token storage, revocation, consent, and privacy obligations.
- Firebase proxy sources require new Functions and callable error contracts.
- External data licenses vary, especially maps, flights, vessels, and satellite data.
- Earth overlays can become performance-heavy on web.
- Weather geolocation currently depends on `geolocator_web`, which is part of the known WASM compatibility follow-up.
- ADMIN-like sources such as Firebase, AWS, Vercel, Docker, and Git operations must remain non-executable from command surfaces.
- P8 command governance must remain the gate for any source-backed command behavior.

## Recommended P9.1 Implementation Sequence

1. App-local source catalog model.
   - Define `SourceCategory`, `SourceAuthType`, `SourceStatus`, `SourceDefinition`.
   - No persistence, no OAuth, no external calls.

2. Convert c0nnect globe to read source definitions.
   - Preserve current look.
   - Keep icons, selected color, and bottom sheet.
   - Replace slug-only sheet copy with source-aware copy.

3. Add source detail bottom sheet behavior.
   - Rename `Learn More` to `Add Source`.
   - Keep `Add Source` disabled/no-op except for metadata-only sources.
   - Wire `Docs` only to catalog URLs.

4. Add status indicator UI.
   - Use static statuses first: disconnected, available, disabled/future.
   - No connection persistence.

5. Add Connect/Earth segmented layout.
   - Earth tab read-only.
   - Show MVP layer catalog and disabled future overlays.
   - No remote Earth data yet.

6. Connect P8 QUERY preview metadata to source catalog.
   - `/query connected source` can reference catalog metadata.
   - Still no QUERY execution.

7. Prepare future architecture decision before first real source.
   - Choose first no-auth source candidate: Wikipedia, Open-Meteo, or Arxiv.
   - Define cache/freshness and redaction rules.
   - Add runtime only in a separate approved phase.

## Explicit Non-Goals For P9.0

- No source implementation.
- No OAuth.
- No API key setup.
- No Firebase Functions.
- No Firestore writes.
- No command execution changes.
- No Home Terminal changes.
- No package repo modifications.
- No deployment.
