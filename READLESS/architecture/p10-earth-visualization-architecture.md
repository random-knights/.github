# P10.0 Earth Visualization Architecture

Date: 2026-06-02

Scope: architecture/design only. This document does not authorize Flutter runtime changes, maps, WebGL, new providers, Firebase Functions, command architecture changes, validation, or deploy.

Documentation boundary: `C:\Projects\dev-kitt` remains source-only. Architecture notes belong directly in `C:\Projects\qa-kitt\.github\READLESS\architecture`.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p9-connect-earth-architecture-audit.md`

## Current Earth Architecture Status

Date: 2026-06-03

This document is still the historical P10 visualization architecture, but the
runtime Earth implementation has advanced through the P10.x, P12.x, P13.x, and
P14.x phases. Treat the current architecture below as the active guidance when
using this document.

### Active Architecture

Current Earth is an app-local, dashboard-first experience inside Rand0m. The
authoritative information flow is:

```text
Dashboard
-> Regional Health Dashboard
-> Narratives
-> Recommendations
-> Scenario Explorer
-> Earth Vision Readiness
-> Planet Health Schematic
-> Globe Preview
-> Overlay Readiness
```

Dashboard, layer cards, regional summaries, and layer detail drilldowns remain
the source of truth. The Planet Health Schematic and Globe Preview visualize
that metadata; they do not replace it.

### Implemented Since P10

Current implementation includes:

- Planet Health Schematic, layer maturity, data-kind labels, signal movement,
  signal interactions, and layer detail panels.
- Connection ownership foundation, provider ownership metadata, provider
  status, and user-owned connection architecture.
- Earth Health Score, regions, timeline, signal trends, Carbon Offset Projects,
  Satellites, Cesium readiness, overlay governance, and provider selection
  matrix.
- Regional Health Dashboard, impact drivers, attention states, Earth
  narratives, Earth recommendations, Earth Scenario Explorer,
  biodiversity/protected-area readiness, and layer detail drilldowns.
- Earth Vision readiness for tooling-first satellite/image comparison,
  protected-area monitoring, forest growth/loss verification, and
  encroachment research.
- Globe Preview, globe layer controls, overlay bridge, overlay safety gate,
  broad regional overlay, overlay readiness drawer, dashboard/globe selection
  synchronization, and multiple safe broad-region overlays.

### Current Guardrails

- Globe Preview is secondary, experimental, and broad-region only.
- Overlays remain safety-gated; no unrestricted map mode, unrestricted globe
  mode, live tracking, raw coordinate feeds, or sensitive species locations are
  approved.
- No new provider integration is implied unless a phase explicitly scopes it.
- Signal correlations are educational relationships, not causation or proof.
- Scenarios are educational models, not forecasts, predictions, scientific
  certainty, financial guidance, or investment advice.
- Carbon Offset Projects remain educational metadata, not investment advice,
  purchase guidance, quality ranking, or endorsement.
- Satellites, flights, ships, and species layers remain non-tracking and
  non-surveillance surfaces.
- Earth Vision remains tooling/research-first. No runtime Flutter web image
  processing, raw imagery payloads, imagery downloads, surveillance framing,
  enforcement/policing framing, or sensitive coordinate exposure are approved.
- Earth Vision should produce compact generated summaries before any future
  overlay work; raw large imagery belongs outside the app runtime unless a
  future phase explicitly approves a safe worker/storage contract.
- Dashboard/cards/detail panels remain the app-local source of truth for
  attribution, freshness, limitations, and safety copy.

### Superseded P10 Assumptions

The sections below remain useful for provenance and early-stage rationale, but
some "future" items are now implemented. In particular, Earth is no longer only
card-based; the schematic, regions, health score, timeline, narratives,
recommendations, Scenario Explorer, Earth Vision readiness, overlay governance,
Cesium readiness, and Globe Preview now exist. Any remaining future map/globe or
Earth Vision recommendations must be read through the current safety gate and
provider matrix.

## Current Earth Implementation Audit

### Earth Tab Baseline

Current Earth is a read-only tab inside `/c0nnect`. It is intentionally not a map, globe engine, or command surface. The current experience is built from:

- an overview dashboard
- layer cards
- source/provider metadata
- maturity and data-kind chips
- provider health and freshness labels
- readiness cards for future sources

Current layer maturity:

| Layer | Maturity | Data kind | Current behavior |
| --- | --- | --- | --- |
| Weather | Production | live provider | Uses existing weather infrastructure and freshness/status UI. |
| Wind | Production | live provider | Uses existing weather infrastructure for wind-focused summary. |
| Wildfires | Production | live provider | Uses FIRMS summary callable/proxy and provider observability. |
| Carbon | Preview | derived | Local educational estimate with methodology. |
| Tree-Time | Preview | derived | Local educational estimate with methodology. |
| Glaciers | Preview | asset-backed | WGMS-derived compact summary asset; not live. |
| Ocean Currents | Research | research | Provider/readiness education only. |
| Flights | Research | research | OpenSky readiness education only. |
| Ships | Research | research | AIS/marine readiness education only. |
| Terrain | Research | research | Terrain provider/readiness education only. |

### Overview Dashboard

The overview is the correct top-level surface for synthesis. It should remain the first Earth affordance and should keep Carbon and Tree-Time visually prominent because those are Rand0m-specific environmental identity metrics.

The dashboard should not become a second copy of every card. It should answer:

- what is live now
- what is estimated locally
- what is asset-backed
- what is still research
- how fresh and healthy the current providers are

### Layer Cards

Layer cards are the right place for source details, methodology, attribution, status, and future-phase notes. They should remain the authoritative per-layer detail surface.

### Source Registry

The source registry currently separates source definitions, source readiness, and UI status. Future visualization should read from that registry rather than inventing a separate visual-only source list.

### Provider Status/Freshness Model

Provider health and freshness should become first-class visual inputs. The future visual layer should never imply live/current data unless the backing layer can prove freshness.

### Maturity/Data-Kind System

The current maturity model is a strong guardrail:

- Production: live or operationally supported data.
- Preview: derived or asset-backed data that is useful but not fully live.
- Research: provider/readiness education without live integration.

The visual system must preserve this distinction with visible badges and subdued treatment for non-production signals.

## Visualization Maturity Stages

### Stage 0: Cards/Dashboard

Current state.

Capabilities:

- layer summaries
- provider health
- freshness
- methodology
- attribution
- readiness planning

Limitations:

- no spatial intuition
- no motion or geographic context
- no layer-to-region relationship

Decision: keep as the durable information backbone.

### Stage 1: Static Earth Schematic

A lightweight, non-map visual that gives Earth a spatial feel without adding map SDKs or WebGL.

Examples:

- stylized world silhouette
- simple globe/planet diagram
- region bands or arcs
- source/status pins positioned by broad region, not exact coordinates
- layer legend connected to the current cards

Best fit:

- Planet Health overview
- Carbon/Tree-Time prominence
- provider health and freshness cues
- research/readiness distinction

Decision: recommended next MVP visual step if the goal is polish with very low technical risk.

### Stage 2: 2D World Map/SVG/Canvas Layer

A lightweight 2D projection with static or app-owned shapes.

Examples:

- SVG world map asset
- Flutter `CustomPainter` world projection
- simple canvas-style region overlays
- non-interactive layer markers
- broad heat/status regions

Best fit:

- Weather/Wind status indicators
- FIRMS summary regions without exposing coordinates
- glacier monitored-region summary
- research layer placeholders

Decision: recommended first "real" visual layer after Stage 1, still without live new providers.

### Stage 3: Animated Layer Indicators

Adds subtle motion to Stage 1 or Stage 2.

Examples:

- wind flow dashes
- weather pulse rings
- wildfire status glows
- glacier freshness bands
- ocean current path hints

Best fit:

- earth.nullschool.net-inspired motion without using nullschool-class data fields.
- animated state from existing summaries only.

Decision: good follow-up after static visuals are stable.

### Stage 4: Interactive Map/Projection

Adds panning, zooming, tiles, vector layers, markers, and region selection.

Candidate tools:

- `flutter_map`
- OpenLayers via web interop/WebView for web-only experiments
- MapTiler/Mapbox/ArcGIS later if licensing and keys are approved

Decision: defer until source governance, attribution, tile licensing, and mobile performance constraints are settled.

### Stage 5: Globe/WebGL/nullschool-Class Experience

Rich animated globe or map with particle/vector fields, projections, layer toggles, and time states.

Candidate tools:

- Globe.GL
- Three.js
- custom WebGL
- advanced map engine

Decision: long-term only. This requires a dedicated visual engine phase, browser/mobile QA, performance budgets, and data-layer contracts.

## Visualization Entity Model

### EarthLayer

Represents a user-facing Earth topic.

Fields:

- `id`
- `title`
- `maturity`
- `dataKind`
- `status`
- `sourceIds`
- `metricIds`
- `visualMapping`
- `attribution`
- `freshness`
- `methodology`

### EarthSource

Represents a backing provider, asset, or candidate source.

Fields:

- `id`
- `name`
- `provider`
- `authType`
- `sourceType`
- `status`
- `health`
- `freshness`
- `attribution`
- `cachePolicy`
- `futurePhase`

### EarthMetric

Represents a numeric or textual signal shown in dashboard/cards/visual layers.

Fields:

- `id`
- `label`
- `value`
- `unit`
- `dataKind`
- `confidence`
- `freshness`
- `sourceId`
- `safeDisplay`

### EarthRegion

Represents broad spatial grouping without requiring exact maps.

Fields:

- `id`
- `name`
- `scope`
- `displayAnchor`
- `shapeHint`
- `sourceCoverage`

For early stages, `displayAnchor` should be approximate and UI-only. Avoid exact coordinates unless a later provider contract authorizes them.

### EarthSignal

Represents a visualizable state derived from metrics.

Fields:

- `id`
- `layerId`
- `regionId`
- `signalType`
- `intensity`
- `direction`
- `trend`
- `health`
- `freshness`

### EarthOverlay

Represents a visual treatment for one or more signals.

Fields:

- `id`
- `layerId`
- `overlayType`
- `style`
- `animation`
- `legend`
- `accessibilityLabel`
- `enabled`

### EarthTimeState

Represents the temporal posture of the visual.

Fields:

- `currentAt`
- `sourceObservedAt`
- `lastUpdatedAt`
- `freshnessLabel`
- `stale`
- `timeWindow`
- `animationTime`

## Layer-To-Visual Mapping

| Layer | Stage 1 schematic | Stage 2 2D map/SVG/canvas | Stage 3 animation | Future Stage 4/5 |
| --- | --- | --- | --- | --- |
| Weather | Status halo and current condition chip. | Broad weather badge near user/global region. | Soft cloud/condition pulse. | Forecast regions and temporal layers. |
| Wind | Direction arrow and speed chip. | Simple vector arrows or bands. | Flow dashes around broad regions. | Particle/vector field like nullschool-class wind. |
| Wildfires | Provider health and active detection summary. | Broad region highlights only; no coordinates. | Gentle alert pulse for active summary. | FIRMS region/marker map after contract approval. |
| Carbon | Prominent planet impact meter. | Global overlay tint or score ring. | Slow impact pulse. | Climate/pollution overlays after provider approval. |
| Tree-Time | Offset/repair visual paired with Carbon. | Tree-time bands or restorative counter. | Growth/progress animation. | Regional reforestation/offset layers if sourced. |
| Glaciers | Cryosphere badge and WGMS summary. | High-level polar/mountain region highlights. | Freshness/observation period shimmer. | Glacier region layers after provider validation. |
| Ocean | Research badge and marine readiness summary. | Ocean current path hints as static curves. | Deferred flow animation. | Live marine current overlays after provider phase. |
| Flights | Research badge and aviation source warning. | Optional broad air corridor hint, no aircraft. | Deferred activity pulse. | Flight density map after privacy/safety review. |
| Ships | Research badge and marine transport summary. | Optional shipping lane hint, no vessels. | Deferred lane pulse. | Vessel density map after source/licensing review. |
| Terrain | Research badge and landform/source summary. | Static relief bands or elevation tint. | Minimal or none. | Terrain tiles/projection after map provider phase. |

## Rendering Approach Evaluation

### Flutter CustomPainter

Web/mobile support:

- Strong Flutter support across web, mobile, and desktop.

Package/dependency risk:

- Low. No new dependency required.

Performance risk:

- Low to medium, depending on animation complexity.

Styling flexibility:

- High for Rand0m-specific schematic visuals.

Data-layer fit:

- Strong for Stage 1-3 summarized signals.

Accessibility:

- Must pair painted visuals with semantic labels/cards.

Deployment risk:

- Low.

Recommendation:

- Best first implementation path for Stage 1 or Stage 2.

### SVG / Vector Asset

Web/mobile support:

- Good if using existing Flutter SVG support or a baked asset path. Requires dependency audit if SVG rendering package is not already present.

Package/dependency risk:

- Low if an SVG package already exists; medium if adding one.

Performance risk:

- Low for static visuals.

Styling flexibility:

- Medium. Dynamic coloring and animation can become awkward.

Data-layer fit:

- Good for a static world map silhouette or regions.

Accessibility:

- Needs companion semantic text.

Deployment risk:

- Low if asset-only; medium if new package.

Recommendation:

- Good candidate for Stage 2 if the app already supports SVG cleanly. Otherwise prefer `CustomPainter`.

### `flutter_map`

Web/mobile support:

- Good Flutter ecosystem support.

Package/dependency risk:

- Medium. Adds map/tile concerns and plugin surface.

Performance risk:

- Medium.

Styling flexibility:

- Good for maps, less unique for Rand0m-specific schematic storytelling.

Data-layer fit:

- Good for Stage 4 once coordinates/tiles are approved.

Accessibility:

- Requires careful controls and non-map alternatives.

Deployment risk:

- Medium due tile licensing, network requests, and web/mobile behavior.

Recommendation:

- Defer until a true interactive map phase.

### OpenLayers Via WebView Or Web Interop

Web/mobile support:

- Strong on web, awkward in Flutter mobile unless WebView is used.

Package/dependency risk:

- High. Introduces JS interop/WebView complexity.

Performance risk:

- Medium to high.

Styling flexibility:

- High for web maps.

Data-layer fit:

- Strong for Stage 4 web-first map layers.

Accessibility:

- Requires duplicated controls/semantics.

Deployment risk:

- High for a cross-platform app.

Recommendation:

- Consider only for a web-only spike, not the next MVP.

### Globe.GL / Three.js

Web/mobile support:

- Web-first. Flutter integration needs JS interop or embedded web content.

Package/dependency risk:

- High.

Performance risk:

- High on mobile and lower-end devices.

Styling flexibility:

- Very high for a nullschool-class experience.

Data-layer fit:

- Excellent for Stage 5 if provider data and visual engine contracts exist.

Accessibility:

- Requires non-visual summaries and keyboard/touch alternatives.

Deployment risk:

- High.

Recommendation:

- Long-term visual engine option only.

### MapTiler / Mapbox / ArcGIS

Web/mobile support:

- Strong, provider-dependent.

Package/dependency risk:

- Medium to high.

Performance risk:

- Medium.

Styling flexibility:

- High for map products.

Data-layer fit:

- Strong for Stage 4 and beyond.

Accessibility:

- Requires careful implementation.

Deployment risk:

- High due keys, billing, licensing, attribution, and provider governance.

Recommendation:

- Defer until map provider selection is explicitly approved.

## Rand0m Planet Health Direction

The Rand0m Earth experience should not simply clone a weather map. Its product identity should be "Planet Health": a synthesis of live provider state, local derived impact, source freshness, and research readiness.

Core principles:

- Carbon and Tree-Time stay prominent because they are Rand0m-specific.
- Live provider data is clearly labeled and freshness-bound.
- Preview/asset-backed data is useful but never presented as live.
- Research layers build trust by explaining what is not connected yet.
- Provider health is part of the UX, not an operator-only detail.

Recommended top-level concepts:

- Earth Health Score: a future composite score that starts as qualitative until formulas are approved.
- Environmental Impact: Carbon and Tree-Time summaries.
- Provider Health: weather, wind, FIRMS, and future provider availability.
- Source Freshness: when each source was observed, generated, or refreshed.
- Maturity: Production, Preview, Research.
- Data kind: live provider, derived, asset-backed, research, planned.

Do not compute a numeric Earth Health Score until there is an approved formula. In the next visual MVP, use a descriptive status such as `mixed`, `available`, `stale`, or `researching`.

## Recommended MVP Visual Step

Recommended next implementation: Stage 1 static Earth schematic, with a Stage 2-compatible data model.

Why:

- No new dependencies.
- No maps SDK.
- No WebGL.
- No new providers.
- Works with existing summary data.
- Gives Earth a visual center without risking performance or provider scope.
- Lets Carbon/Tree-Time, provider health, freshness, and maturity become spatial/visual concepts.

Suggested MVP:

1. Add an Earth schematic component above or beside the overview dashboard.
2. Use existing Earth layer view models only.
3. Show a stylized planet with grouped signals:
   - Environmental Impact: Carbon and Tree-Time.
   - Live Sources: Weather, Wind, Wildfires.
   - Preview Data: Glaciers.
   - Research: Ocean, Flights, Ships, Terrain.
4. Add a legend for maturity/data kind.
5. Animate only if it can be done with lightweight Flutter animations and respects reduced-motion patterns.
6. Keep cards as the source of detailed truth.

## Provider And Data Implications

No provider changes are needed for Stage 1 or Stage 2.

Rules for future visual layers:

- Existing data can be visualized only at its approved precision.
- FIRMS summary should remain summary-only until a marker/coordinate contract is approved.
- Glacier WGMS asset should show source version/freshness and must remain `not live`.
- Weather/Wind can show current-condition summaries, but broad global map claims require a global provider phase.
- Research layers should never imply connected data.
- Any map tile, basemap, or live overlay provider requires a dedicated source contract.

## Accessibility Requirements

Early visual work must include:

- text equivalents for every visual signal
- keyboard/touch reachable layer controls if controls are added
- color-independent status labels
- reduced-motion support where the app already has a pattern
- no essential information conveyed only by animation

## Testing Strategy

For Stage 1/2 implementation later:

- unit tests for layer-to-visual mapping
- widget tests for maturity/data-kind legend
- widget tests for disabled/research visual states
- snapshot-style checks where practical for layout stability
- responsive tests for mobile/narrow web
- no network tests
- no provider fixture changes unless the visual consumes existing fixtures

## Rollback Strategy

Stage 1/2 should be app-local and reversible:

- Keep the visual component independent from layer card logic.
- Keep cards and overview functional without the visual.
- Gate visual data through pure view models.
- If performance or layout issues appear, remove/hide the visual without altering providers.

## Recommended P10.1 Implementation Sequence

1. Create app-local Earth visual view models that read existing Earth layer status only.
2. Create a `CustomPainter` or simple Flutter widget schematic with no new dependencies.
3. Add a maturity/data-kind legend to the schematic.
4. Add broad signal groups for Environmental Impact, Live Sources, Preview, and Research.
5. Add tests for mapping and responsive layout.
6. Run full app validation.
7. Do not introduce maps, WebGL, new providers, or new routes.

## Explicit Non-Goals For P10.0

- No Flutter app runtime changes.
- No maps SDK.
- No WebGL.
- No Globe.GL/Three.js integration.
- No OpenLayers integration.
- No new live providers.
- No Firebase Functions.
- No provider key changes.
- No command architecture changes.
- No deploy.
