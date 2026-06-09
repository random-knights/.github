# Earth Visualization Architecture

Date: 2026-06-02

Scope: architecture/design only. This document covers the current Earth
Visualization and Earth Intelligence architecture across phases. It does not
authorize Flutter runtime changes, maps, WebGL, new providers, Firebase
Functions, command architecture changes, validation, or deploy.

Documentation boundary: `C:\Projects\dev-kitt` remains source-only. Architecture notes belong directly in `C:\Projects\qa-kitt\.github\READLESS\architecture`.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p9-connect-earth-architecture-audit.md`

## Current Earth Architecture Status

Date: 2026-06-04

This document began as the historical P10 visualization architecture, but the
runtime Earth implementation has advanced through later Earth Intelligence,
Earth Vision, agent, preview, and HD globe phases. Treat the current
architecture below as the active Earth guidance when using this document.

### Active Architecture

Current Earth is an app-local, dashboard-first experience inside Rand0m. The
authoritative information flow is:

```text
Planetary Intelligence
-> Intelligence Summary
-> Evidence Alignment
-> Claim Traceability
-> Regional Health Dashboard
-> Signals & Drivers
-> Narratives & Recommendations
-> Correlations
-> Scenario Explorer
-> Conservation & Restoration
-> Earth Vision Readiness
-> Earth Vision Data Pipeline
-> Earth Vision Evidence Artifacts
-> Evidence-Backed Verification Views
-> Earth Verification Readiness
-> Earth Evidence Traceability
-> Earth Verification Candidates
-> Restoration Monitoring Readiness
-> Protected Area Integrity Framework
-> Protected Area Verification Pilot
-> Biodiversity & Habitat Integrity Framework
-> Soil Health Integrity Framework
-> Human Encroachment Pressure Framework
-> Forest Growth & Loss Verification Framework
-> Forest Verification Pilot
-> Restoration Outcome Verification Framework
-> Restoration Verification Pilot
-> Earth Vision Monitoring Pipeline
-> Planet Health Schematic
-> Globe Preview
-> Evidence Replay
-> Earth Agent Context Bridge
-> Earth Agent Command Surface
-> Earth Scientist Preview Response
-> Earth Query Engine
-> Earth Preview Engine
-> Earth Agent Activation Preview
-> HD Globe Transition
-> Overlay Readiness
```

Dashboard, layer cards, regional summaries, and layer detail drilldowns remain
the source of truth. The Planet Health Schematic and Globe Preview visualize
that metadata; they do not replace it.

### AIEDS Alignment Note

A1.0 introduces the AI Environmental Disclosure Standard (AIEDS) v1 as the
future ecosystem-wide standard for AI environmental reporting. Earth should
align future Carbon and Tree-Time disclosures to AIEDS without changing the
dashboard source-of-truth hierarchy.

AIEDS keeps Carbon as the primary scientific metric and treats Tree-Time as an
educational equivalency only. AIEDS v1 defines a Mature Reference Tree (MRT) as
22 kg CO2e/year for future standard disclosures. Existing runtime/history
surfaces may still show the earlier 21 kg/year Tree-Time assumption until a
future adoption phase migrates and labels the methodology. Do not mix these
methodologies without explicit disclosure.

Future Earth alignment should remain:

```text
AI Response
-> Carbon
-> Tree-Time
-> Earth Context
-> Regional Context
-> Restoration Context
```

A1.0 does not enable live regional grid context, restoration context, provider
measurement, or Earth runtime linkage.

Planetary Intelligence is the current top-level synthesis layer. It may
summarize health, risk, recovery, restoration, verification, monitoring,
research, scenarios, Earth Vision, and visualization readiness, but it must stay
app-local and evidence-gated. It must not add providers, enable runtime imagery
processing, enable new overlays, expose raw imagery, or turn relationships into
causation, forecasts, verified outcome claims, investment advice, emergency
guidance, surveillance framing, or enforcement framing.

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
- Planetary Intelligence consolidation, educational correlations, and
  scenario-driven research paths that describe relationships without implying
  causation, forecasts, or scientific certainty.
- Earth Vision readiness for tooling-first satellite/image comparison,
  protected-area monitoring, forest growth/loss verification, and
  encroachment research.
- Earth Vision Data Pipeline for staging the first tooling-to-evidence path:
  source selection, imagery acquisition, preprocessing, comparison, summary
  extraction, evidence artifact generation, and app asset/publication review.
  It defines a compact `earth-vision-evidence.v1` JSON artifact shape and a
  fixture sample path. P16.0 adds the first real source-backed compact Global
  Forest Watch dashboard summary artifact, P16.1 adds the first compact
  Protected Planet / WDPA protected-area profile artifact for a Yellowstone
  pilot, P16.2 uses the Global Forest Watch artifact for the first broad
  forest verification pilot, and P16.3 uses existing compact evidence artifact
  support for the first restoration verification pilot while still requiring
  future imagery and restoration records before outcome claims. These preserve
  the same boundary: no live providers, raw imagery, large raster files,
  sensitive coordinates, runtime Flutter web processing, boundary geometry,
  private-property monitoring, species exposure, or ecological outcome claims.
- Earth Vision Evidence Artifact Integration for parsing, validating, and
  displaying compact `earth-vision-evidence.v1` artifacts inside Earth
  Intelligence and dashboard readiness sections. Artifacts may support
  evidence alignment when available. Sample artifacts remain preview-only; real
  source-backed artifacts remain educational, source-attributed, limitation-
  bound, and not live verification.
- Evidence-Backed Verification Views for surfacing compact real source-backed
  and sample/preview artifacts inside Verification Candidates, Forest Growth &
  Loss Verification, Protected Area Integrity, Restoration Outcome
  Verification, and Planetary Intelligence evidence summaries. Artifact
  availability may change readiness copy, but it must not create real-world
  verification, restoration, protected-area, forest, or outcome claims.
- Claim Traceability for labeling Planetary Intelligence, narratives,
  recommendations, correlations, scenarios, and verification views as
  evidence-backed, model-derived, source-metadata, educational, readiness-only,
  or sample/preview. Claim support should cite artifact ids, provider/source
  metadata, model inputs, limitations, confidence, and safe fallback labels
  where available.
- Earth Verification readiness for future forest growth, tree loss, habitat
  change, protected-area integrity, conservation activity, and restoration
  activity checks, plus Carbon Project Verification Readiness.
- Earth Evidence traceability metadata for provider data, imagery comparison,
  historical trends, conservation records, protected-area status, and
  restoration indicators. Future narratives, recommendations, correlations,
  scenarios, and verification claims must cite evidence, attribution,
  comparison interval, confidence, and limitations.
- Earth Verification Candidates for concrete future workflows such as forest
  growth verification, tree loss detection, protected-area integrity checks,
  habitat change research, conservation/restoration activity checks, and
  carbon project verification readiness. Candidates remain metadata-only and
  use future provider/source candidates without live integration.
- Restoration Monitoring Readiness for turning verification candidates into
  future workflows around reforestation, forest growth, tree loss reduction,
  protected-area integrity, habitat recovery, conservation programs, and
  restoration projects. Monitoring remains readiness metadata only.
- Protected Area Integrity Framework for staging the first concrete Earth
  Vision monitoring target around protected-area status, future pressure
  categories, evidence requirements, provider candidates, attribution, and
  safety constraints. No real integrity conclusion is generated yet.
- Protected Area Verification Pilot for demonstrating a source-backed,
  profile-only protected-area workflow using a compact Protected Planet / WDPA
  artifact. The pilot may show a public protected-area name, broad region,
  source, site id, reported area, confidence, limitations, attribution, and a
  future monitoring path. It must not expose boundary geometry, raw imagery,
  precise species locations, sensitive coordinates, enforcement framing,
  surveillance framing, or real conservation/integrity outcome claims.
- Biodiversity & Habitat Integrity Framework for extending Earth Vision into
  generalized region-only biodiversity and habitat readiness, including
  sensitivity states, future threat categories, evidence requirements, provider
  candidates, attribution, and safety constraints. No real biodiversity or
  habitat conclusion is generated yet.
- Soil Health Integrity Framework for extending Earth Vision into evidence-
  required soil health readiness, including soil dimensions, future threat
  categories, evidence requirements, data requirements, provider candidates,
  attribution, and safety constraints. No real soil, agricultural, restoration,
  carbon storage, or habitat recovery conclusion is generated yet.
- Human Encroachment Pressure Framework for completing the first Earth Vision
  ecological triad around protected-area pressure, biodiversity/habitat
  pressure, soil pressure, and restoration pressure. It defines pressure states,
  future pressure categories, evidence requirements, relationship metadata,
  provider candidates, attribution, and safety constraints. No real
  encroachment conclusion is generated yet.
- Forest Growth & Loss Verification Framework for staging future verification
  of forest growth, forest loss, reforestation, restoration success,
  vegetation recovery, and protected forest integrity. It defines forest change
  categories, evidence requirements, Earth Vision tooling alignment, provider
  candidates, attribution, relationship metadata, and safety constraints. No
  real forest growth, loss, reforestation, or restoration conclusion is
  generated yet.
- Forest Verification Pilot for demonstrating a source-backed, broad forest
  verification workflow using the compact Global Forest Watch artifact. The
  pilot may show the selected source, broad Global region, evidence artifact,
  confidence, limitations, attribution, readiness, and future monitoring path.
  It must not expose raw imagery, sensitive coordinates, private land analysis,
  individual property monitoring, enforcement framing, surveillance framing, or
  real forest growth, loss, recovery, restoration, or ecological outcome
  claims.
- Restoration Outcome Verification Framework for connecting verification,
  monitoring, forest, habitat, biodiversity, soil, protected-area, Carbon, and
  Tree-Time evidence into future restoration outcome categories such as forest
  recovery, habitat recovery, biodiversity recovery, soil improvement,
  protected-area stability, and Carbon/Tree-Time support. It defines evidence
  requirements, provider candidates, intelligence alignment, relationship
  metadata, and safety constraints. No real restoration outcome conclusion is
  generated yet.
- Restoration Verification Pilot for demonstrating how restoration outcome
  readiness can reference compact evidence artifact support while still
  requiring future imagery, forest/vegetation signals, protected-area context,
  restoration records/source metadata, comparison windows, attribution, and
  limitations before any outcome claim. The pilot may show target readiness,
  evidence status, confidence, artifact id, required future inputs, provider
  fit, and Planetary Intelligence alignment. It must remain educational and
  must not claim restoration success, ecological outcomes, offset quality,
  investment value, enforcement value, or surveillance use.
- Earth Vision Monitoring Pipeline for turning protected-area, forest,
  restoration, habitat, soil, and encroachment pilots into planned repeatable
  monitoring runs. It defines target selection, evidence/source selection,
  comparison window, repeat interval, artifact output, review state,
  publication gate, attribution, limitations, and safety boundaries. Monitoring
  pipelines are planned and require reviewed evidence artifacts; no automated
  live monitoring, cloud artifact upload, live provider integration, runtime
  imagery processing, or Earth Intelligence claim publication workflow is
  enabled.
- P15 Earth Intelligence Layer for consolidating Health, Risk, Recovery,
  Restoration, Verification, Monitoring, and Research insights into the
  dashboard-first Planetary Intelligence section. It links insights to evidence
  metadata, summarizes Earth Vision readiness, shows the active dashboard
  hierarchy, and preserves the runtime boundary: no live imagery processing, no
  new providers, no map/globe expansion, no Cesium expansion, no Firebase
  Functions, no OAuth, and no runtime provider calls.
- Globe Preview, globe layer controls, overlay bridge, overlay safety gate,
  broad regional overlay, overlay readiness drawer, dashboard/globe selection
  synchronization, multiple safe broad-region overlays, active motion cues, and
  globe time playback controls. Motion and playback are summary animation
  metadata only; they must never imply live tracking, precise movement,
  unsupported history, or unsupported forecasts.
- Globe Playback Readiness for classifying each Earth layer before any
  timeline animation path. Current readiness labels distinguish playable-now,
  summary-animation-only, evidence-artifact-required, provider-required,
  restricted, and unavailable layers. Restricted layers remain blocked; evidence
  and provider requirements are metadata only until a future phase approves the
  source, attribution, artifact, and safety boundary.
- Regional Health Timeline Animation for the first playable Globe Preview
  animation path. It uses broad-region dashboard metadata only and may animate
  educational preview frames derived from current health, trend, attention, and
  driver metadata. Non-current frames must be labeled as preview/synthetic
  summary frames and must not be described as historical proof unless future
  evidence-backed regional history is explicitly added.
- Earth Evidence Replay Layer for replaying compact evidence artifact frames
  inside Globe Preview and Planetary Intelligence. Replay may use reviewed real
  source-backed artifacts and clearly labeled sample/preview artifacts, but it
  remains artifact-driven playback only. It must not show raw imagery, precise
  coordinates, live tracking, new overlays, provider calls, or real-world
  outcome claims.
- Earth Agent Context Bridge for preparing app-local Earth context packets for
  future `@scient1st` questions and Earth Preview requests. The packet may
  include selected region, time window, health score, trends, top drivers,
  attention states, evidence labels, limitations, and available layers. It must
  exclude secrets, raw imagery payloads, unsupported provider claims, precise
  sensitive coordinates, and live chat activation. Company/entity operating
  region questions remain future-supported and source-required; Earth must not
  guess operating regions or enable company/entity lookup without approved
  source data.
- Earth Agent Command Surface for visible Earth-local `@scient1st` question
  preparation. The command surface may accept user text, show selected
  region/time context, list supported and unsupported question examples, and
  generate app-local `EarthAgentRequest`, `EarthAgentContextPacket`, and
  `EarthPreviewRequest` metadata. It must remain preview-only: no live chat,
  provider calls, entity/company lookup, live web lookup, new overlays, secret
  exposure, raw imagery, precise species locations, or investment/purchase
  advice.
- Earth Scientist Preview Response for turning a preview-only command into a
  compact local response. The response may summarize interpreted intent,
  selected region/time context, available Earth Intelligence context, the
  preview that would be activated, evidence/claim support level, limitations,
  and suggested next step. It must use existing app-local query, preview,
  evidence, and dashboard metadata only, and must not activate live chat,
  provider calls, entity/company lookup, VCM/project filtering, web lookup,
  new overlays, or unsupported outcome claims.
- Earth Query Engine for turning Earth Intelligence and regional dashboard
  metadata into structured, app-local query results. Supported query types may
  include health score, region comparison, trend analysis, evidence summary,
  verification status, monitoring status, recommendation summary, and scenario
  summary. Results may include an answer, explanation, confidence, evidence
  references, limitations, supported regions/time windows, future
  `EarthPreviewRequest` linkage, and suitability flags for future agent
  explanation. Query results remain educational/model-derived unless compact
  evidence references support them, and they must not perform company/entity
  lookup, live chat, provider calls, web search, overlay creation, or
  unsupported claim expansion.
- Earth Preview Engine for converting supported `EarthQueryResult` metadata
  into app-local preview descriptions. Supported preview types may include
  Region Highlight, Region Comparison, Health Breakdown, Trend Preview,
  Evidence Preview, Verification Preview, and Monitoring Preview. Preview
  metadata may identify selected regions, layer emphasis, evidence support,
  confidence, limitations, schematic readiness, globe readiness, and future
  `@scient1st` compatibility. It may influence Planet Health Schematic and
  Globe Preview emphasis through existing safe overlays only; it must not
  create overlays, call providers, enable live chat, resolve
  companies/entities, expose precise coordinates, or make visualization the
  source of truth.
- Earth Agent Activation Preview for turning safe app-local Earth query results
  into temporary, reversible preview state. Supported preview activation may
  highlight broad regions, focus existing dashboard/schematic/globe sections,
  and show source question, preview type, confidence, selected regions, and
  limitations. Closing the preview must restore the previous Earth selection
  and globe emphasis. It must not activate live chat, resolve entities,
  perform company lookup, add overlays, call providers, expose precise
  coordinates, or permanently mutate Earth state.
- HD Globe Transition for defining the first path from Globe Preview toward a
  true HD Earth visualization platform. It stages globe capability modes,
  readiness labels, architecture constraints, safe/future/blocked overlay
  classifications, HD region/overlay requirements, attribution requirements,
  evidence integration requirements, monitoring integration requirements, and
  the current Cesium recommendation while preserving Earth Intelligence as the
  source of truth. It does not enable live tracking, new providers, new imagery
  processing, Cesium expansion, map/globe expansion, Firebase Functions, OAuth,
  or unrestricted HD overlays.

### Current Guardrails

#### Earth Rendering Principle

- Earth must be represented as a sphere/globe with country and broad-region
  boundaries plus data-driven visual layers. The long-term direction is an
  interactive Earth visualization workstation, not a scrolling dashboard or a
  flat map disguised as a globe.
- Drag interaction should rotate the sphere/globe. Wheel and trackpad zoom must
  preserve spherical/circular aspect ratio and must not stretch the Earth into
  an ellipse, panel, or translated texture.
- Do not simulate Earth by sliding, panning, or superimposing a flat map texture
  across a circular globe. A temporary texture may be acceptable only as a
  first-pass visual asset when it is clipped, rotated, and treated as a renderer
  placeholder rather than the renderer architecture.
- Future Earth color, motion, and emphasis should be driven by Earth data layers
  such as wind, ocean currents, particles, chemical filters, weather, wildfire,
  ecological overlays, project overlays, entity overlays, monitoring overlays,
  and verification overlays.
- The desired direction is similar in spirit to earth.nullschool: layer-driven
  Earth systems visualization with clear filters, attribution, and motion. The
  Random Knights implementation must use its own governed data contracts and
  must not import nullschool-class fields or behavior without an approved
  source and license review.
- If Flutter CustomPainter becomes the wrong long-term renderer for spherical
  boundaries, particle fields, or layer compositing, introduce a renderer
  adapter path instead of forcing flat-map behavior into the app.

- Globe Preview is secondary, experimental, and broad-region only.
- Globe motion and playback are summary controls only. Playback windows must
  come from the existing Earth time-window model, unsupported layers stay
  summary-only/readiness-only/provider-unsupported, reduced-motion settings
  remain respected, and the dashboard remains source of truth.
- Playback readiness classifications must be shown before a layer participates
  in globe playback. Regional Health is the first safe playable candidate;
  Carbon/Tree-Time and Glaciers are summary-animation-only; Earth Vision layers
  require reviewed compact evidence artifacts; live tracking, raw wildfire
  markers, species locations, and carbon project point/purchase overlays remain
  restricted.
- Regional Health playback may update labels, marker emphasis, and preview
  frame copy for supported windows, but it remains an educational summary
  animation. When reduced motion or motion-off states are active, playback
  should update labels only. It must never imply live tracking, precise
  movement, real historical playback, or verified regional history without
  evidence-backed frames.
- Evidence Replay may update artifact frame labels, confidence, limitations,
  attribution, and generated dates from compact evidence artifacts. It is not
  raw imagery, live tracking, precise coordinate playback, or an outcome claim.
  Sample artifacts must stay sample/preview, and future restoration,
  biodiversity, soil, and encroachment replay remains future-imagery-required
  until reviewed compact artifacts exist.
- Earth Agent Context Bridge is readiness/context metadata only. `@scient1st`
  affordances may show what Earth context would be shared and prepare future
  Earth Preview request shapes, but they must not activate live chat, perform
  provider calls, run live web search, expose raw imagery, expose secrets,
  expose precise sensitive coordinates, or guess company/entity operating
  regions. Entity/company region lookup requires approved source data or
  user-supplied regions before preview generation.
- Earth Agent Command Surface is the first visible Earth-native command
  surface. Submitting a question must generate only preview-ready request
  metadata from current Earth state. Supported questions may map to health,
  comparison, trend, evidence, verification, or monitoring summaries. Unsupported
  company/entity, live lookup, precise sensitive location, and investment
  questions must show source-required/future-supported copy and must not guess.
- Earth Scientist Preview Response is local explanatory UI only. It may show
  interpreted question, context used, preview intent, evidence/readiness support,
  limitations, next step, and Activate Preview when previewable. Unsupported
  company/entity or VCM questions must explain that approved source data or
  manually selected regions are required; Earth must not guess operating
  regions or project-region filters.
- Earth Query Engine is the structured question layer between Earth
  Intelligence and future Earth agents. It may produce evidence-aware answers
  and future preview request metadata from current app state, but it must not
  become a resolver for companies/entities, activate `@scient1st` chat, call
  providers, create globe/map overlays, fetch web data, or strengthen claims
  beyond the attached evidence and limitations.
- Earth Preview Engine is visualization request metadata only. Query-derived
  previews may mark region focus, comparison focus, layer emphasis,
  schematic/globe readiness, evidence support, and agent-compatible flags, but
  they must consume existing dashboard and query state only. They must not add
  providers, create new map/globe overlays, enable live tracking, expose
  precise coordinates, guess company/entity regions, activate live chat, or
  override the dashboard as source of truth.
- Earth Agent Activation Preview is a temporary app-local state layer. It may
  activate safe region/comparison/health/evidence/verification/monitoring
  previews from existing query results, but close/reset must restore prior
  selected region, time window, layer detail, and globe emphasis. Future
  company/entity/VCM questions remain source-required and entity-resolution-
  required; Earth must not guess operating regions.
- HD Globe Transition is readiness metadata only. HD Globe and Future Live
  Globe modes remain disabled until token, WebGL, fallback, performance,
  attribution, evidence, monitoring, provider, and safety gates pass.
- Overlays remain safety-gated; no unrestricted map mode, unrestricted globe
  mode, live tracking, raw coordinate feeds, or sensitive species locations are
  approved.
- No new provider integration is implied unless a phase explicitly scopes it.
- Signal correlations are educational relationships, not causation or proof.
- Scenarios are educational models, not forecasts, predictions, scientific
  certainty, financial guidance, or investment advice.
- Carbon Offset Projects remain educational metadata, not investment advice,
  purchase guidance, quality ranking, endorsement, or proof of impact,
  quality, or legitimacy.
- Satellites, flights, ships, and species layers remain non-tracking and
  non-surveillance surfaces.
- Earth Vision remains tooling/research-first. No runtime Flutter web image
  processing, raw imagery payloads, imagery downloads, surveillance framing,
  enforcement/policing framing, or sensitive coordinate exposure are approved.
- Earth Vision should produce compact generated summaries before any future
  overlay work; raw large imagery belongs outside the app runtime unless a
  future phase explicitly approves a safe worker/storage contract.
- Earth Fast GitHub Actions may validate `earth/**` branches and publish
  guarded Firebase Hosting preview channels for the `randomknights-xyz.web.app`
  Hosting site only when configured credentials are present. Earth branches
  must not deploy to the production `rand0m.ai` live channel.
- Earth Vision Data Pipeline is tooling/readiness plus compact artifact proof.
  Fixture/sample artifacts may document the JSON contract. Real source-backed
  artifacts must stay tiny, educational, source-attributed, limitation-bound,
  and free of raw imagery, sensitive coordinates, surveillance/enforcement
  framing, investment framing, and unsupported ecological claims. The
  recommended first source order remains Global Forest Watch for summary-first
  forest context, Landsat/Sentinel for later imagery comparison, Protected
  Planet/WDPA for protected-area context, and NASA Earthdata for deeper future
  Earth observation workflows.
- Earth Vision Evidence Artifacts must stay compact and schema-gated. Runtime
  parsing must reject missing required fields, malformed values, unsupported
  schema versions, raw imagery payload references, large raster payloads, and
  sensitive coordinate references. Display copy must identify fixture artifacts
  as sample/preview only, and real artifacts as source-backed educational
  evidence. Neither artifact type is live verification, and no raw imagery is
  included.
- Evidence-Backed Verification Views are display/readiness surfaces only. They
  may show artifact id/title, target, region, confidence, comparison window,
  signal summary, limitations, attribution, and generated date, but they must
  label fixture artifacts as sample evidence and real artifacts as source-
  backed educational evidence. They must not expose raw imagery, sensitive
  coordinates, or use artifact availability to imply confirmed, proven, or
  real-world verification outcomes.
- Claim Traceability guardrails must distinguish evidence-backed statements,
  model-derived summaries, educational relationships, source metadata,
  readiness-only notes, and sample/preview information. Use compact labels such
  as Preview, Educational model, Evidence available, Sample evidence, Readiness
  only, and Relationship, not causation. Do not use verified or confirmed
  language unless a future phase provides sufficient non-sample evidence with
  confidence and limitations; never use proven language, investment
  recommendations, emergency guidance, surveillance/enforcement framing, or
  causation claims from correlations.
- Earth Verification is readiness/metadata only. No runtime imagery processing,
  live imagery download, new provider integration, verified ecological outcome
  claim, enforcement/policing use case, surveillance framing, or globe overlay
  expansion is approved.
- Earth Evidence is traceability metadata only. No verification claim should be
  presented without an attached evidence source, attribution, comparison
  interval, confidence, and limitations.
- Earth Verification Candidates are workflow metadata only. They may name
  source candidates and required evidence, but must not process imagery in
  Flutter web, expose raw imagery, add overlays, integrate live providers, or
  imply verified ecological outcomes.
- Restoration Monitoring is workflow readiness only. It may connect Earth
  Vision, verification candidates, conservation records, and future provider
  candidates, but it must not enable live monitoring, new provider calls,
  runtime imagery processing, overlays, Cesium expansion, enforcement framing,
  surveillance framing, or verified outcome claims.
- Protected Area Integrity is an evidence/readiness framework only. It may
  define future pressure categories such as tree loss, habitat fragmentation,
  human encroachment, land-use change, fire impact, and data unavailable, but it
  must not enable live imagery processing, new providers, overlays, boundary
  enforcement, surveillance framing, emergency guidance, precise species
  locations, or real integrity conclusions.
- Protected Area Verification Pilots may use compact real source metadata as
  educational evidence. They may improve readiness copy and show a future
  monitoring path, but they are not live verification, do not prove protected-
  area integrity or conservation outcomes, and must not expose boundary
  geometry, raw imagery, precise species locations, sensitive coordinates,
  enforcement language, or surveillance framing.
- Biodiversity & Habitat Integrity is an evidence/readiness framework only. It
  may define future pressure categories such as habitat loss, habitat
  fragmentation, human encroachment, climate pressure, fire impact, water
  stress, and data unavailable, but it must not enable live provider
  integration, precise species locations, maps/globe overlay expansion, Cesium
  expansion, surveillance framing, enforcement/policing framing, unsupported
  ecological claims, or real biodiversity conclusions.
- Soil Health Integrity is an evidence/readiness framework only. It may define
  soil dimensions such as organic carbon, moisture, erosion risk, fertility,
  texture, salinity, compaction risk, and vegetation support, plus future
  pressure categories such as erosion, drought/moisture stress, nutrient
  depletion, salinity, land-use change, fire impact, human encroachment, and
  data unavailable. It must not enable live provider integration, maps/globe
  overlay expansion, Cesium expansion, unsupported agricultural or conservation
  claims, land-use enforcement framing, surveillance framing, precision claims
  without data support, or real soil conclusions.
- Human Encroachment Pressure is an evidence/readiness framework only. It may
  define future pressure categories such as urban expansion, land-use change,
  infrastructure expansion, forest conversion, agricultural expansion, habitat
  fragmentation, resource extraction, fire recovery pressure, and data
  unavailable. It must not enable live provider integration, maps/globe overlay
  expansion, Cesium expansion, enforcement language, surveillance framing,
  individual/person tracking, property-level analysis, or real encroachment
  conclusions. Encroachment relationships with habitat integrity,
  protected-area integrity, and restoration outcomes remain educational
  correlations, not causation.
- Forest Growth & Loss Verification is an evidence/readiness framework only.
  It may define future verification targets such as forest growth, forest loss,
  reforestation, restoration success, vegetation recovery, and protected forest
  integrity, plus future change categories such as tree gain, tree loss,
  regrowth, vegetation recovery, forest fragmentation, burn recovery, and data
  unavailable. It must not enable live imagery processing, runtime imagery
  processing, new providers, maps/globe overlay expansion, Cesium expansion,
  Firebase Functions, OAuth, raw imagery payloads, raw sensitive coordinates,
  enforcement language, surveillance framing, unsupported ecological claims, or
  real forest conclusions. Forest relationships with restoration indicators,
  biodiversity indicators, protected-area integrity, and carbon/tree-time
  signals remain educational relationships, not causation.
- Forest Verification Pilots may use compact real source metadata as
  educational evidence. They may improve readiness copy and show a future
  monitoring path, but they are not live verification, do not prove forest
  growth, forest loss, forest recovery, reforestation, restoration success, or
  ecological outcomes, and must not expose raw imagery, sensitive coordinates,
  private land analysis, individual property monitoring, enforcement language,
  or surveillance framing.
- Restoration Outcome Verification is an evidence/readiness framework only. It
  may define future outcome categories such as forest recovery, habitat
  recovery, biodiversity recovery, soil improvement, protected-area stability,
  and Carbon/Tree-Time support, plus future evidence requirements such as
  forest verification, habitat indicators, biodiversity indicators, soil
  indicators, protected-area indicators, restoration records, and source
  attribution. It must not enable live imagery processing, runtime imagery
  processing, runtime provider calls, new providers, map/globe expansion,
  Cesium expansion, Firebase Functions, OAuth, surveillance framing,
  enforcement language, precise species locations, investment recommendations,
  unsupported ecological claims, guaranteed impact language, or real
  restoration outcome conclusions. Restoration relationships with forest
  verification, biodiversity, soil health, and protected-area integrity remain
  educational relationships, not causation.
- Restoration Verification Pilots may use compact evidence artifact support to
  improve readiness copy, but they are not live verification and do not prove
  forest recovery, habitat recovery, biodiversity recovery, soil improvement,
  protected-area stability, Carbon/Tree-Time impact, restoration success, or
  ecological outcomes. They must not expose raw imagery, sensitive coordinates,
  precise species locations, enforcement language, surveillance framing,
  investment language, or unsupported outcome claims.
- Earth Vision Monitoring Pipeline is planned workflow metadata only. It may
  describe monitoring targets, schedules, statuses, review states, required
  evidence, provider candidates, and future compact artifact outputs, but it
  must not enable automated live monitoring, runtime provider calls, cloud
  artifact upload, runtime imagery processing, unreviewed publication,
  unrestricted claims, maps/globe expansion, surveillance framing, enforcement
  framing, or outcome conclusions. Artifacts must be reviewed before
  influencing Earth Intelligence claims; unsafe artifacts cannot be published,
  and sample artifacts remain sample/preview.
- Dashboard/cards/detail panels remain the app-local source of truth for
  attribution, freshness, limitations, and safety copy.

### Superseded P10 Assumptions

The sections below remain useful for provenance and early-stage rationale, but
some "future" items are now implemented. In particular, Earth is no longer only
card-based; the schematic, regions, health score, timeline, narratives,
recommendations, Scenario Explorer, Earth Vision readiness, overlay governance,
Cesium readiness, Globe Preview, Earth Query/Preview engines, and HD Globe
Transition readiness now exist.
Any remaining future map/globe or Earth Vision or Earth Verification
recommendations must be read through the current safety gate and provider
matrix.

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

## Part I - Earth Renderer Strategy

Purpose: keep Earth visualization moving toward a true spherical, data-layered
workstation while the current Flutter implementation remains a first-pass,
preview-safe renderer.

### UI/UX Renderer Strategy

Spherical globe:

- The primary Earth surface should be circular/spherical at every zoom level.
- Drag rotates the globe state, not a page, card, or unconstrained flat texture.
- Zoom changes camera/scale while preserving the globe's aspect ratio.
- Region focus, overlays, motion layers, and future provider-backed layers must
  stay attached to the globe coordinate model as it rotates and zooms.

Country and region boundaries:

- Boundaries should come from approved boundary geometry, simplified topology,
  or reviewed broad-region fixtures.
- Broad regions remain the safe default until country/region boundary sources,
  licensing, precision, attribution, and performance are approved.
- Sensitive coordinates, private property interpretation, species locations,
  unrestricted flight/ship tracks, and provider-backed claims require separate
  approval before display.

Data-driven coloring:

- Earth colors should eventually be derived from normalized
  `EarthLayerSnapshot.visualization_payload` data, not hard-coded decoration.
- Each layer must define its color ramp, confidence state, source attribution,
  freshness, precision scope, and geometry policy.
- Carbon, Tree-Time, weather, wind, ocean, wildfire, glacier, project, company,
  monitoring, and verification layers should share the same layer-composition
  contract instead of each inventing a renderer path.

Animated currents, wind, and particles:

- Motion should be generated from normalized vector/field snapshots, route
  summaries, or approved synthetic preview fixtures.
- Wind, ocean currents, particles, and chemical/filter layers should animate as
  layer data attached to globe coordinates, not as independent screen-space
  decoration.
- Reduced-motion settings must remain respected. When reduced motion is active,
  renderer output should preserve labels/state while disabling unnecessary
  animation.

Layer filters:

- Filters belong to the Earth workstation layer controls and should drive the
  renderer through view models, not direct provider calls.
- The renderer should support a small number of active layers first, then grow
  through grouped categories: Earth Systems, Environmental, Human Activity,
  Projects, Entities, Intelligence, Monitoring, and Verification.
- Disabled, unlicensed, source-required, not-provider-verified, and
  preview-only states must stay visible in controls and summaries.

Future renderer adapter path:

```text
Earth workstation state
-> EarthLayerSnapshot / EarthRendererLayer view models
-> EarthRendererAdapter
-> current Flutter CustomPainter renderer
-> future WebGL / Three.js / Globe.GL / Cesium-style renderer when approved
```

The adapter should expose renderer capabilities such as:

- spherical projection
- boundary rendering
- broad-region focus
- field/vector rendering
- particle rendering
- color-ramp compositing
- hit testing
- timeline playback
- reduced-motion fallback
- attribution display
- screenshot/test hooks

Current CustomPainter work may remain the first-pass renderer for schematic,
preview, and bounded globe interactions. It must not become an excuse to rely
on flat-map-over-globe behavior. If the next visual phase needs real spherical
projection, boundary topology, or high-density vector fields, create an adapter
spike rather than stretching the current painter beyond its fit.

### V1.5 Boundary

V1.5 documents this renderer strategy and may make trivial guardrail polish only.
It does not authorize a new renderer, WebGL engine, Cesium expansion, provider
calls, Firebase Functions, OAuth, deploy, or verified environmental claims.
Future Earth renderer work must preserve the principle that Earth is a
spherical, layer-driven visualization surface.

## V2.1 Secure Renderer Token Bridge Design

Purpose: define how the future Cesium renderer can receive only the minimum
safe renderer session configuration without exposing Cesium Ion credentials in
committed Flutter web code, logs, tests, screenshots, generated files, or public
client configuration.

V2.1 is architecture/design only. It does not enable runtime Cesium rendering,
perform a token fetch, add a Firebase Function, deploy Hosting, add OAuth,
change provider configuration, or authorize provider-backed Earth layers.

### Existing Secret And Config Pattern

Current app configuration uses the root ecosystem `.env` as the canonical local
source. CI writes a generated root `.env` from GitHub secrets for validation and
release workflows, and generated Flutter env artifacts must remain uncommitted.
Existing app code already uses Firebase callable Functions for AI proxy and
wildfire-style service boundaries, with safe error labels and no raw provider
secret exposure in UI.

That pattern is acceptable for server-side provider calls, but it is not
sufficient for a live Cesium renderer if a token is embedded in the Flutter web
bundle. Envied obfuscation is not a security boundary for web clients. A Cesium
Ion token compiled into client code, written into generated env output, printed
in logs, or visible in screenshots must be treated as exposed.

V2.0 adds the renderer adapter/token-policy contract:

- `EarthRendererAdapter`
- `EarthRendererType`
- `EarthRendererCapabilities`
- `EarthRendererTokenPolicy`

The Cesium adapter remains blocked until a secure token bridge is available.
The client may know whether a renderer path is configured, unavailable, or
blocked, but it must not receive broad secret access.

### Token Bridge Options

Option 1: Firebase callable returns short-lived renderer session config.

- Security risk: low when App Check/auth/rate limits are added and the callable
  returns only a scoped session config.
- Complexity: medium. Requires a Functions implementation, server-side secret
  storage, budget controls, logging hygiene, and client fallback handling.
- Open-source friendliness: good. OSS users can self-host their own bridge or
  disable Cesium.
- Rate/cost controls: strong. Callable can enforce per-user, per-IP/session,
  and per-environment limits before minting or returning session config.
- Domain restrictions: compatible with domain-restricted Cesium tokens and
  server-side environment checks.
- Flutter web compatibility: good.
- Future mobile/desktop compatibility: good if the callable contract remains
  platform-neutral.

Option 2: Firebase Hosting rewrite to protected token/config endpoint.

- Security risk: medium. It can hide the origin endpoint, but it still needs a
  backend service, App Check/auth, and rate limiting. A public rewrite alone is
  not protection.
- Complexity: medium-high. Requires Hosting rewrite plus backend service.
- Open-source friendliness: moderate. Self-hosters must reproduce both Hosting
  and backend config.
- Rate/cost controls: good if backed by a Function/service.
- Domain restrictions: good for hosted web.
- Flutter web compatibility: good.
- Future mobile/desktop compatibility: weaker because mobile/desktop do not
  naturally use Hosting rewrites.

Option 3: user-provided Cesium Ion token for open-source deployments.

- Security risk: owned by the self-hosting user. Public browser exposure may be
  acceptable only if the user intentionally creates a restricted public token.
- Complexity: low for OSS users, but documentation must be very clear.
- Open-source friendliness: high.
- Rate/cost controls: controlled by the self-hosting user's Cesium account.
- Domain restrictions: depends on user configuration.
- Flutter web compatibility: good.
- Future mobile/desktop compatibility: moderate; platform-specific storage and
  threat models still need review.

Option 4: public restricted Cesium token with domain restrictions.

- Security risk: medium. Domain restrictions help but do not remove scraping,
  abuse, quota, or misconfiguration risk.
- Complexity: low.
- Open-source friendliness: poor if the org token ships with OSS client code.
- Rate/cost controls: limited to Cesium-side restrictions and monitoring.
- Domain restrictions: supported in spirit, but must be verified with the
  selected Cesium account policy before use.
- Flutter web compatibility: good.
- Future mobile/desktop compatibility: weak unless platform restrictions are
  separately configured.

Option 5: no org token in OSS client; org-hosted deployment only gets org
bridge.

- Security risk: lowest for the Random Knights org.
- Complexity: medium because hosted production still needs Option 1 or a
  similarly protected bridge.
- Open-source friendliness: high if OSS users can provide their own bridge or
  token policy.
- Rate/cost controls: strong for hosted deployment; delegated for self-host.
- Domain restrictions: strong for hosted deployment.
- Flutter web compatibility: good.
- Future mobile/desktop compatibility: good if the bridge contract stays
  platform-neutral.

### Recommended Phased Architecture

Use a hybrid of Option 1, Option 3, and Option 5:

1. Open-source/self-hosted deployments do not receive a Random Knights Cesium
   token. They may provide their own Cesium token or renderer bridge at their
   own risk and cost.
2. Random Knights hosted environments use an org-managed secure bridge that
   returns renderer session configuration, not broad secret access.
3. The Flutter client keeps Cesium disabled unless the bridge reports a
   configured, allowed, budget-safe, attribution-ready renderer session.
4. The client must never commit, log, render, screenshot, or test against real
   token values.
5. The renderer falls back to the current CustomPainter/metadata prototype when
   the bridge is unavailable, rate-limited, unauthorized, or over budget.

Recommended future flow:

```text
Earth workstation
-> EarthRendererAdapter selects candidate renderer
-> client requests renderer session config
-> secure bridge verifies environment, auth/App Check, domain, rate, budget
-> bridge returns redacted renderer config and scoped token/session metadata
-> Cesium renderer initializes with allowed base globe only
-> Earth layer overlays attach only after separate governance gates
```

The bridge should return only a bounded `EarthRendererSessionConfig` shape:

- renderer type: `cesium`
- session id
- token value or token reference, depending on implementation
- expiration timestamp / TTL
- allowed domain/environment
- base globe enabled
- country/boundary capability status
- allowed layer ids
- attribution labels
- safety labels
- error/fallback state

The bridge must not return provider API keys, broad account credentials, raw
Earth provider payloads, private coordinates, unrestricted imagery, or
unreviewed layer data.

### Runtime Contract Sketch

Future inert contract names:

- `EarthRendererSessionConfig`
- `EarthRendererCredentialSource`
- `EarthRendererSecurityMode`
- `EarthRendererSessionStatus`

Suggested credential sources:

- `none`: renderer unavailable; use CustomPainter fallback.
- `userProvided`: OSS/self-host user supplied their own restricted token or
  bridge.
- `hostedBridge`: Random Knights hosted bridge supplied a scoped session.
- `publicRestricted`: intentionally public restricted token, only if approved.

Suggested security modes:

- `disabled`
- `localDevelopment`
- `selfHostedUserManaged`
- `hostedTest`
- `hostedProduction`

Suggested session statuses:

- `unavailable`
- `missingConfiguration`
- `unauthorized`
- `rateLimited`
- `budgetExceeded`
- `ready`
- `expired`
- `fallback`

No runtime fetch is implemented in V2.1. These names are reserved for V2.2+
implementation planning and should map cleanly onto the V2.0
`EarthRendererAdapter` token policy.

### Environment Boundaries

Local development:

- Local `.env` may contain a Cesium value for developer-owned experiments, but
  the Flutter web bundle must not expose the Random Knights org token.
- Local dev should default to CustomPainter fallback unless an explicit
  developer-owned bridge/token path is active.
- Do not log or print token values.

Open-source self-host:

- No Random Knights org token is shipped.
- Self-hosters may configure their own Cesium account, restricted token, or
  compatible bridge.
- Docs must tell self-hosters that browser-exposed public tokens carry their
  own cost/quota risk.

Random Knights hosted test:

- Use a test-scoped bridge configuration.
- Prefer short TTLs, strict rate limits, and reduced quotas.
- Test deploy channels must not touch the protected reference environment.

Random Knights hosted production:

- Use a protected production bridge with explicit budget caps, domain allowlist,
  App Check/auth policy when approved, and audit-safe logs.
- Production activation requires release validation plus renderer smoke checks.

Protected preview/reference:

- Do not wire org Cesium credentials or live renderer sessions unless a future
  phase explicitly authorizes preview/reference renderer behavior.
- Preview/reference should remain a safe comparison environment.

CI:

- CI may include secret names and configured/missing status checks.
- CI must not print token values, snapshot token-bearing HTML, commit generated
  env output, or require real Cesium activation for domain validation.

### Cost And Abuse Controls

Before production renderer activation, the bridge must define:

- domain allowlist for hosted web origins
- App Check and/or auth requirement when feasible
- per-user/session/IP rate limits
- budget cap and circuit breaker
- short session TTL and explicit expiration handling
- cache policy for renderer config that does not cache raw secrets in git or
  screenshots
- audit logs that record status and environment without token values
- fallback to CustomPainter when the bridge fails
- disabled state for missing, unauthorized, rate-limited, or over-budget
  sessions
- attribution and Cesium terms display separate from Earth data attribution

### V2.2 Implementation Plan

V2.2 should implement only an inert/stub bridge contract unless the owner
explicitly authorizes live runtime token delivery. Recommended next steps:

1. Add app-side `EarthRendererSessionConfig` and security-mode models with
   fixture data only.
2. Add UI/readiness copy that shows bridge state without fetching tokens.
3. Add tests proving no token values render and fallback remains active.
4. Design a Firebase callable `getEarthRendererSessionConfig` separately.
5. Only after approval, implement the callable using server-side secret storage,
   redacted logging, rate limits, TTL, and environment checks.
6. Only after the callable is reviewed, allow a Cesium renderer runtime spike to
   request the session config.

V2.2 must not turn Cesium into a live provider-backed Earth layer. Cesium is a
renderer surface; Earth Intelligence, dashboard models, layer snapshots,
evidence, and guardrails remain the source of truth.

## V2.5 Renderer Bridge Callable Boundary

Purpose: define the future server boundary for creating short-lived Earth
renderer sessions without enabling live Cesium token delivery, runtime Cesium
activation, provider-backed layer fetches, or Firebase Functions deployment in
this phase.

V2.5 aligns the app-side `EarthRendererBridgeRequest`,
`EarthRendererBridgeResult`, `EarthRendererBridgeAuditEvent`, and
`EarthRendererSessionConfig` contracts with a future callable boundary. The
callable design is intentionally inert until a later implementation phase
reviews secret storage, App Check/auth, rate limits, budget caps, audit storage,
and deployment controls.

### Callable Name And Responsibility

Recommended callable name:

- `requestEarthRendererSession`

Acceptable aliases if implementation constraints require them:

- `getEarthRendererSession`
- `createEarthRendererSession`

The callable is responsible for:

- authenticating or classifying the requester when the phase enables auth
- validating requested renderer and requested capabilities
- validating environment, deployment target, host/domain, platform, and session
  purpose
- enforcing hosted domain allowlists
- enforcing future App Check/auth, rate-limit, and budget policies
- creating a redacted audit event before returning a decision
- returning a safe renderer session config when approved
- returning a CustomPainter fallback config when denied, limited, disabled, or
  unavailable
- returning an audit reference id and redacted policy labels
- never returning broad account secrets

The callable is not responsible for:

- Earth provider data fetching
- weather, wind, wildfire, satellite, flight, ship, company, project, or
  verification layer fetching
- Earth score calculation
- verification scoring
- long-lived token exposure
- raw Cesium token logging
- raw auth payload, cookies, headers, or user PII handling

### Request Validation Contract

The future server must validate:

- renderer is known: `customPainter` or `cesium`
- requested capabilities are allowlisted Earth renderer capabilities
- host/domain is allowed for hosted production and hosted test paths
- app environment matches deployment target and host
- requested TTL is short and bounded
- session purpose is known and non-sensitive
- fallback renderer is known
- client metadata contains labels only, not raw auth payloads
- payload does not include cookies, private headers, broad secrets, or PII

The callable should reject with one of these normalized reasons:

- `unsupportedRenderer`
- `unsupportedCapability`
- `invalidEnvironment`
- `invalidHost`
- `unauthenticated`
- `rateLimited`
- `budgetLimited`
- `bridgeDisabled`
- `policyViolation`

Client and server names should remain close enough that the Flutter
`EarthRendererBridgeError` and `EarthRendererBridgeAuditOutcome` labels can map
without translation-heavy glue.

### Response Contract

Server response states:

- `approved`
- `fallback`
- `denied`
- `rateLimited`
- `budgetLimited`
- `unavailable`
- `disabled`

Every response must include:

- renderer session config
- fallback renderer
- status label
- TTL label or no-session label
- caveats
- audit reference id
- redacted token policy
- fallback reason labels when fallback is used

The response must not include:

- raw secrets
- broad Cesium credentials
- private provider tokens unless a future phase intentionally scopes and
  approves them
- cookies
- auth headers
- PII
- raw server environment values
- raw provider payloads

The default denial/unavailable response should keep CustomPainter active and
mark Cesium as disabled or bridge-required. CI and local fallback paths should
not require a real token.

### Redacted Audit Log Contract

Audit event shape:

- event id
- timestamp
- requester classification, not PII
- renderer requested
- capabilities requested
- decision
- fallback used
- environment
- host/domain label
- rate-limit state
- budget state
- policy reason
- redaction status

Required redaction flags:

- token redacted
- auth redacted
- cookies redacted
- headers redacted
- PII omitted

Early development may use console logs only when the log payload is already
redacted and contains no token values. Later phases may add:

- Firestore audit collection for reviewed operational history
- BigQuery/export for usage analysis if needed
- dashboard summaries for rate, budget, and renderer health

Audit storage must not become a secret sink.

### Rate And Budget Control Phases

The bridge should progress in controlled phases:

| Phase | Control | Behavior |
|---|---|---|
| V2.6 | disabled/stub | Validate schemas and fallback paths only. |
| V2.7 | domain allowlist | Deny unknown hosted domains and keep fallback active. |
| V2.8 | auth/App Check | Require approved app/requester classification where feasible. |
| V2.9 | rate limit | Enforce low-volume session issuance per user/session/IP bucket. |
| V2.10 | budget/cost guard | Add budget cap, circuit breaker, and fallback-on-limit behavior. |
| Later | usage dashboard | Show usage, denial, fallback, and budget trends. |

No enforcement is enabled by V2.5. Only the contract shape and inert
server-boundary schema are defined.

### Environment Behavior

Open-source self-host:

- Random Knights org credentials are never shipped.
- Self-hosters may provide their own restricted token or compatible bridge.
- Public browser tokens remain the self-hoster's quota and cost risk.

Local dev:

- Defaults to CustomPainter fallback.
- Developer-owned experiments must not commit, print, log, screenshot, or test
  real token values.
- Local dev does not imply production bridge readiness.

Random Knights test:

- Uses test-scoped bridge settings only after a later approved implementation.
- Keeps short TTLs, low issuance limits, and fallback-on-limit behavior.

Random Knights production:

- Uses org-managed bridge after release approval.
- Requires allowed production host/domain labels, redacted audit logs, budget
  guardrails, and explicit production release validation.

Protected preview/reference:

- Remains untouched by ordinary test and production release paths.
- Does not receive live renderer sessions unless a future phase explicitly
  authorizes it.

CI:

- Never requires a real Cesium token.
- May validate schema and redaction behavior.
- Must not print token values, generated env output, auth payloads, cookies,
  headers, or PII.

### V2.6 Disabled Callable Stub

V2.6 may export `requestEarthRendererSession` only as a deliberately disabled
callable stub. Exporting the callable does not authorize token delivery,
runtime Cesium activation, provider fetching, Functions deploy, OAuth, App
Check enforcement, or production renderer sessions.

The disabled callable must:

1. Accept the future renderer session request shape.
2. Validate renderer, capability, environment, host, purpose, fallback, and TTL
   fields.
3. Build a redacted deterministic audit event.
4. Return a disabled or denied response.
5. Force `customPainter` as the fallback renderer.
6. Include safe labels:
   - `Bridge Disabled`
   - `Secure Bridge Not Implemented`
   - `CustomPainter Fallback Active`
   - `No Token Exposed`
   - `No Network Call`
   - `No Runtime Cesium Activation`
7. Return `tokenValue: null`.
8. Avoid reading local `.env`, Firebase secrets, Cesium credentials, provider
   keys, cookies, private headers, or raw auth payloads.
9. Log, if at all, only redacted audit labels and never raw payloads.

V2.6 contract tests should cover:

- valid Cesium request returns disabled CustomPainter fallback
- invalid renderer returns denied unsupported response
- redacted audit event omits token/auth/cookie/header/PII payloads
- response contains no secret-like values
- environment token reads are not required
- CustomPainter remains available

Production Cesium activation remains blocked until the callable, secret storage,
App Check/auth, rate/budget controls, audit behavior, attribution, deployment
policy, and renderer smoke strategy are all reviewed together.

### V2.7 Domain Allowlist Enforcement

V2.7 may enforce sanitized domain/host labels while keeping
`requestEarthRendererSession` disabled/fallback-only. Domain allowlisting does
not authorize token delivery, runtime Cesium activation, provider fetching,
Functions deploy, OAuth, App Check enforcement, or production renderer
sessions.

Allowed host labels:

- production: `rand0m.ai`, `ai-rand0m.web.app`
- test: `ai-rand0m.web.app`
- local development: `localhost`, `127.0.0.1`
- CI: `ci`, `github-actions`
- self-hosted: user-managed sanitized host labels, excluding protected preview

Protected preview/reference:

- `randomknights-xyz.web.app` is blocked by default.
- `protected-preview` environment requests are blocked by default.
- Preview/reference must not receive renderer sessions unless a future phase
  explicitly authorizes that environment.

V2.7 disabled callable behavior:

1. Validate the sanitized `domainLabel`.
2. Return `disabled` plus CustomPainter fallback for allowlisted production,
   test, local, CI, or self-hosted labels.
3. Return `denied` plus CustomPainter fallback for unknown, invalid, or
   protected-preview labels.
4. Include `allowlistOutcome` in the redacted audit event.
5. Log only sanitized host labels and allowlist outcomes.
6. Never log raw host/origin headers, cookies, private headers, raw auth
   payloads, PII, or secrets.
7. Return `tokenValue: null`.
8. Keep CI independent from real Cesium tokens.

V2.7 contract tests should cover:

- allowed production host returns bridge-disabled fallback
- allowed test host returns bridge-disabled fallback
- localhost returns bridge-disabled fallback
- unknown hosted domain returns denied/fallback
- protected preview host returns denied/fallback by default
- malicious host input is sanitized before response or logging
- audit event records allowlist outcome safely
- self-host and CI labels do not require token delivery

### V2.8 Implementation Gate

V2.8 may add authentication, App Check, and deployment classification metadata
while keeping the callable disabled/fallback-only. Classification does not
authorize live token delivery, runtime Cesium activation, provider fetching,
Functions deploy, OAuth, production renderer sessions, or preview/reference
activation.

Auth classification labels:

- `authenticatedRand0mOrg`
- `authenticatedNonOrg`
- `unauthenticated`
- `selfHostedUserProvided`
- `ciContractTest`
- `unknown`

App Check classification labels:

- `verified`
- `missing`
- `unavailableLocalDev`
- `emulator`
- `unknown`

Deployment classification labels:

- `localDev`
- `test`
- `production`
- `protectedPreview`
- `selfHosted`
- `ci`
- `unknown`

V2.8 audit labels:

- `authClassification`
- `appCheckClassification`
- `deploymentClassification`
- `authPolicyOutcome`
- `appCheckPolicyOutcome`

These labels must never include raw auth token values, email addresses, UIDs,
claims payloads, cookies, headers, App Check tokens, provider secrets, PII, or
raw host/origin headers. Logs may include only sanitized host labels,
allowlist outcomes, classification labels, policy outcomes, and redaction
state.

Policy matrix for future activation:

| Deployment | Auth policy outcome | App Check policy outcome | Future activation rule |
| --- | --- | --- | --- |
| local dev | disabled fallback allowed | not required for local dev | self-host/user-provided token path only; no org token |
| test | future rand0m org auth required unless classified as org | future App Check required unless verified | org bridge possible later with preferred App Check |
| production | future rand0m org auth required unless classified as org | future App Check required unless verified | org bridge later; public bounded access still requires product decision |
| protected preview | blocked by environment | blocked by environment | denied by default |
| self-hosted | self-hosted user managed | self-hosted user managed | user-provided token or compatible self-owned bridge |
| CI | contract only | contract only | schema/redaction tests only; no token |

V2.8 disabled callable behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Continue using V2.7 domain allowlist and protected-preview denial.
3. Return `disabled` plus CustomPainter fallback for otherwise valid
   allowlisted requests.
4. Return `denied` plus CustomPainter fallback for invalid, unknown, or
   protected-preview requests.
5. Add auth/App Check/deployment classifications to the redacted audit event.
6. Add policy outcome labels for future activation requirements.
7. Return `tokenValue: null`.
8. Keep CI independent from real Cesium tokens.

V2.8 contract tests should cover:

- authenticated org classification label
- unauthenticated classification label
- missing App Check classification label
- local dev deployment/App Check classification
- production deployment classification
- protected preview remains denied
- CI contract-test classification
- audit event omits raw auth/App Check payloads
- bridge remains disabled/fallback regardless of classification
- no token values in response or audit

### V2.9 Implementation Gate

V2.9 may add disabled-safe rate-limit planning metadata while keeping the
callable disabled/fallback-only. Rate-limit planning does not authorize
persistent counters, raw IP capture, raw user identifiers, live token delivery,
runtime Cesium activation, provider fetching, Functions deploy, OAuth,
production renderer sessions, or preview/reference activation.

Rate-limit policy metadata:

- `policyId`
- `windowLabel`
- `requestScope`
- `limitLabel`
- `remainingLabel`
- `resetLabel`
- `enforcementMode`
- `fallbackOnLimit`
- `auditRequired`

Allowed request scopes:

- `perHost`
- `perDeployment`
- `perAuthClassification`
- `perRenderer`
- `perCapability`
- `global`

Allowed enforcement modes:

- `disabled`
- `planned`
- `observeOnly`
- `enforceLater`

Disabled-safe rate-limit outcomes:

- `notEvaluatedBridgeDisabled`
- `allowedPlanned`
- `observeOnlyAllowed`
- `wouldRateLimit`
- `rateLimitedFallback`
- `unavailable`

V2.9 audit labels:

- rate-limit policy id
- scope
- outcome
- enforcement mode
- fallback used
- audit required
- window/limit/remaining/reset labels

These labels must never include raw user identifiers, IP addresses, auth
payloads, App Check tokens, cookies, headers, PII, provider secrets, or raw
host/origin headers.

Current disabled behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Continue using V2.7 domain allowlist and V2.8 auth/App Check/deployment
   classification.
3. Return `disabled` plus CustomPainter fallback for otherwise valid
   allowlisted requests.
4. Include `notEvaluatedBridgeDisabled` as the default current rate-limit
   outcome.
5. Include planned low-volume policy metadata for future issuance review.
6. Return `denied` plus CustomPainter fallback for invalid, unknown, or
   protected-preview requests.
7. Return `tokenValue: null`.
8. Keep CI independent from real Cesium tokens.

Future enforcement behavior:

- `observeOnlyAllowed` may record safe labels while still allowing fallback.
- `wouldRateLimit` may show that a future policy would have limited issuance
  without blocking during observe-only phases.
- `rateLimitedFallback` must return fallback, not a token.
- Persistent counters require a later reviewed server-side storage design.
- Buckets must be derived from privacy-safe labels or hashed/salted server
  values only after approval; no raw IP or raw user id storage is allowed.

V2.9 contract tests should cover:

- rate-limit policy metadata exists
- bridge-disabled requests include `notEvaluatedBridgeDisabled`
- simulated future `rateLimitedFallback` returns CustomPainter fallback
- observe-only/allowed outcomes remain disabled-safe
- audit event includes redacted rate-limit labels
- audit/response omit raw identifiers, IPs, headers, cookies, PII, and token
  values
- CustomPainter fallback remains active

### V2.10 Implementation Gate

V2.10 may add disabled-safe budget/cost guard planning metadata while keeping
the callable disabled/fallback-only. Budget planning does not authorize
persistent spend tracking, payment metadata collection, billing account
storage, live token delivery, runtime Cesium activation, provider fetching,
Functions deploy, OAuth, production renderer sessions, or preview/reference
activation.

Budget guard metadata:

- `budgetPolicyId`
- `budgetScope`
- `periodLabel`
- `budgetLimitLabel`
- `spendStateLabel`
- `remainingBudgetLabel`
- `resetLabel`
- `enforcementMode`
- `fallbackOnBudgetLimit`
- `auditRequired`

Allowed budget scopes:

- `perDeployment`
- `perHost`
- `perRenderer`
- `perEnvironment`
- `orgGlobal`
- `selfHostedUserManaged`

Allowed enforcement modes:

- `disabled`
- `planned`
- `observeOnly`
- `enforceLater`

Disabled-safe budget outcomes:

- `notEvaluatedBridgeDisabled`
- `allowedPlanned`
- `observeOnlyAllowed`
- `wouldBudgetLimit`
- `budgetLimitedFallback`
- `unavailable`
- `selfHostedUserManaged`

V2.10 audit labels:

- budget policy id
- budget scope
- period label
- budget limit label
- spend state label
- remaining budget label
- reset label
- outcome
- enforcement mode
- fallback used
- audit required

These labels must never include payment details, billing ids, raw account
identifiers, raw user identifiers, IP addresses, auth payloads, App Check
tokens, cookies, headers, PII, provider secrets, or raw host/origin headers.

Current disabled behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Continue using V2.7 domain allowlist, V2.8 classification, and V2.9
   rate-limit planning.
3. Return `disabled` plus CustomPainter fallback for otherwise valid
   allowlisted requests.
4. Include `notEvaluatedBridgeDisabled` as the default current budget outcome
   for Random Knights managed environments.
5. Include `selfHostedUserManaged` for self-hosted budget responsibility.
6. Include planned org-global budget metadata for future spend review.
7. Return `denied` plus CustomPainter fallback for invalid, unknown, or
   protected-preview requests.
8. Return `tokenValue: null`.
9. Keep CI independent from real Cesium tokens.

Future enforcement behavior:

- `observeOnlyAllowed` may record safe labels while still allowing fallback.
- `wouldBudgetLimit` may show that a future policy would have limited issuance
  without blocking during observe-only phases.
- `budgetLimitedFallback` must return fallback, not a token.
- Persistent spend tracking requires a later reviewed server-side storage and
  cost attribution design.
- Circuit breakers must use safe budget state labels and never log payment,
  billing, account, raw user, or raw IP material.

V2.10 contract tests should cover:

- budget guard metadata exists
- bridge-disabled requests include `notEvaluatedBridgeDisabled`
- simulated future `budgetLimitedFallback` returns CustomPainter fallback
- self-hosted user-managed budget state is represented
- observe-only/allowed outcomes remain disabled-safe
- audit event includes redacted budget labels
- audit/response omit billing ids, payment details, raw account identifiers,
  raw user identifiers, IPs, headers, cookies, PII, and token values
- CustomPainter fallback remains active

### V2.11 Implementation Gate

V2.11 may add usage dashboard readiness metadata while keeping the callable
disabled/fallback-only. Usage dashboard readiness does not authorize persistent
dashboard storage, raw event streams, live token delivery, runtime Cesium
activation, provider fetching, Functions deploy, OAuth, production renderer
sessions, or preview/reference activation.

Usage summary metadata:

- `summaryWindowLabel`
- `rendererRequestsLabel`
- `approvedSessionsLabel`
- `fallbackSessionsLabel`
- `deniedSessionsLabel`
- `rateLimitEventsLabel`
- `budgetGuardEventsLabel`
- `protectedPreviewDenialsLabel`
- `unknownHostDenialsLabel`
- `tokenExposureEventsLabel`
- `auditRedactionStateLabel`

Dashboard categories:

- Renderer Usage
- Fallbacks
- Denials
- Rate Limits
- Budget Guards
- Domain Policy
- Auth/App Check Policy
- Audit Redaction
- Token Safety

Each dashboard category must include:

- label
- status
- caveat
- future source
- safe display flag

Allowed category status labels:

- `planned`
- `readyForSafeAggregates`
- `blockedUntilStorageApproved`
- `notImplemented`

Safe aggregate rules:

- no user identifiers
- no raw IP addresses
- no emails
- no UIDs
- no raw auth claims
- no App Check tokens
- no cookies
- no headers
- no billing, payment, or account identifiers
- no token values
- sanitized host labels only

Token safety:

- `tokenExposureEventsLabel` must remain `0` or not applicable while the
  bridge is disabled.
- Token exposure metrics must never be derived from token values.
- Token values must never appear in response, audit event, usage dashboard
  metadata, logs, tests, or screenshots.

Audit summary metadata:

- `totalEventsLabel`
- `redactedEventsLabel`
- `rejectedEventsLabel`
- `fallbackEventsLabel`
- `latestDecisionLabel`
- `latestPolicyReasonLabel`
- `redactionPolicyLabel`

Current disabled behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Continue using V2.7 domain allowlist, V2.8 classification, V2.9
   rate-limit planning, and V2.10 budget guard planning.
3. Return `disabled`, `denied`, `rateLimited`, or `budgetLimited` plus
   CustomPainter fallback according to the disabled contract path.
4. Include usage dashboard readiness metadata in the audit event only.
5. Use label-only summaries for latest decision/fallback/denial state.
6. Use `not implemented` for storage state.
7. Return `tokenValue: null`.
8. Keep CI independent from real Cesium tokens.

Future dashboard phases:

- A later storage design may write redacted aggregate summaries only after
  privacy and retention review.
- Firestore, BigQuery, or log-derived summaries must use approved aggregate
  schemas, not raw callable payloads.
- Dashboard UI must consume aggregate labels and counts only.
- Raw auth, App Check, cookie, header, IP, billing, account, PII, and token
  material must remain unavailable to dashboard surfaces.

V2.11 contract tests should cover:

- usage summary metadata exists
- all required dashboard categories are represented
- every category has a safe display flag
- safe aggregate rules are explicit
- token exposure label remains zero or not applicable while disabled
- audit summary labels exist
- future rate-limit and budget-limited outcomes remain dashboard-safe
- audit/usage metadata omit billing ids, payment details, raw account
  identifiers, raw user identifiers, IPs, headers, cookies, PII, auth payloads,
  App Check tokens, and token values
- CustomPainter fallback remains active

The next safe implementation step after V2.11 is storage and telemetry design
for redacted usage aggregates, not live Cesium token delivery.

### V2.12 Implementation Gate

V2.12 may add storage and telemetry design contracts while keeping the
callable disabled/fallback-only. Storage/telemetry design does not authorize
persistent counters, Firestore writes, BigQuery export, raw event storage, live
token delivery, runtime Cesium activation, provider fetching, Functions deploy,
OAuth, production renderer sessions, or preview/reference activation.

Future telemetry needs:

- safe aggregate windows
- audit summary labels
- fallback counts
- denial counts
- rate-limit outcome counts
- budget guard outcome counts
- protected-preview denial counts
- unknown-host denial counts
- token-safety indicators
- redaction compliance indicators

Telemetry contract names:

- `EarthRendererTelemetryAggregate`
- `EarthRendererTelemetryWindow`
- `EarthRendererTelemetryCategory`
- `EarthRendererTelemetryRetentionPolicy`
- `EarthRendererTelemetryRedactionPolicy`
- `EarthRendererTelemetryStoragePlan`

Safe aggregate labels/counts may include:

- total requests
- fallbacks
- denials
- rate-limit outcomes
- budget outcomes
- protected-preview denials
- unknown-host denials
- token exposure event count
- redaction compliance count

Telemetry must never store:

- raw IP addresses
- emails
- UIDs
- auth payloads
- App Check tokens
- cookies
- headers
- billing or account identifiers
- payment details
- token values
- raw host strings beyond sanitized labels
- PII
- secrets

Storage options comparison:

| Option | Privacy risk | Cost risk | Complexity | Dashboard fit | Retention control | Redaction enforceability |
| --- | --- | --- | --- | --- | --- | --- |
| No storage / logs only during early phases | lowest | lowest | lowest | planning only; no history | no stored telemetry | contract labels only |
| Cloud Logging structured redacted logs | low | low | low | good for early smoke and incident summaries | short log retention / sinks | redacted before logging |
| Firestore aggregate documents | low | medium | medium | best for dashboard counters/windows | delete or roll up aggregate docs | counters and labels only |
| BigQuery aggregate export | medium | medium | deferred | research aggregates only | dataset retention / expiration | aggregate rows after privacy review |

Recommended phased path:

1. Phase 1: redacted Cloud Logging labels only, with short retention and no
   raw event payloads.
2. Phase 2: Firestore aggregate counter documents, no raw events, no raw host
   strings, no user/account identifiers, no billing identifiers, and no token
   values.
3. Phase 3: optional BigQuery/export for research aggregates only after
   privacy, retention, and cost review.

Current disabled behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Continue using V2.7 domain allowlist, V2.8 classification, V2.9
   rate-limit planning, V2.10 budget guard planning, and V2.11 usage
   dashboard readiness metadata.
3. Return CustomPainter fallback.
4. Include telemetry storage plan metadata in the audit event only.
5. Set `storageWriteEnabled` to `false`.
6. Use latest-event labels only; do not persist aggregate windows.
7. Return `tokenValue: null`.
8. Keep CI independent from real Cesium tokens.

Retention policy:

- Redacted audit events, if later approved, use short retention.
- Aggregate counters may retain longer after rollup approval.
- Fine-grained aggregate windows should roll up to coarse aggregate labels.
- Aggregate documents should be deleted or rolled up on an approved schedule.
- Raw secrets, PII, auth payloads, App Check tokens, cookies, headers, IP
  addresses, billing/account identifiers, raw host strings, and token values
  have no retention because they must never be accepted into telemetry.

Redaction policy:

- Redaction happens before log or storage.
- Telemetry models accept safe labels and counts only.
- Raw sensitive values are not valid telemetry input.
- Sanitized host labels are allowed; raw host/origin headers are not.
- Token exposure indicators are explicit safety counts and must never be
  derived from token values.

Dashboard readiness:

- Future dashboard reads aggregate windows only.
- Dashboard categories mirror V2.11 readiness categories.
- Dashboard may show latest redacted policy summary labels.
- Dashboard may show cost/rate guard summaries after aggregate storage review.
- Dashboard must not read raw callable payloads or live provider payloads.
- No live dashboard storage reads are implemented in V2.12.

V2.12 contract tests should cover:

- telemetry aggregate metadata exists
- storage options are represented
- storage writes remain disabled
- retention policy labels exist
- redaction policy labels exist
- safe aggregate labels omit raw sensitive values
- token exposure remains zero/not stored while bridge is disabled
- protected-preview and unknown-host denial labels are represented
- disabled bridge still returns CustomPainter fallback

The next safe implementation step after V2.12 is a reviewed redacted-log
telemetry spike or aggregate storage schema review, not live Cesium activation.

### V2.13 Implementation Gate

V2.13 may add a redacted Cloud Logging telemetry helper while keeping the
callable disabled/fallback-only. The helper is a Phase 1 logging spike only and
does not authorize persistent counters, Firestore writes, BigQuery export, raw
event storage, live token delivery, runtime Cesium activation, provider
fetching, Functions deploy, OAuth, production renderer sessions, or
preview/reference activation.

Redacted telemetry log labels may include:

- renderer
- decision
- fallback used
- deployment classification
- allowlist outcome
- auth classification
- App Check classification
- rate-limit outcome
- budget outcome
- telemetry storage phase
- storage write enabled flag
- token exposure status
- redaction status

The helper must exclude:

- token values
- user identifiers
- email
- UID
- raw IP addresses
- cookies
- headers
- raw auth payloads
- App Check tokens
- billing or account identifiers
- raw host strings
- secrets
- policy text that could accidentally include request details
- full audit event objects
- full usage dashboard readiness objects
- full telemetry storage plan objects

Current disabled behavior:

1. Keep `requestEarthRendererSession` disabled.
2. Return CustomPainter fallback.
3. Build compact redacted logging labels from the existing audit event.
4. Log safe labels only.
5. Keep `storageWriteEnabled` as `false`.
6. Return `tokenValue: null`.
7. Do not persist counters or aggregate windows.
8. Keep CI independent from real Cesium tokens.

V2.13 contract tests should cover:

- telemetry helper output includes expected safe labels
- telemetry helper excludes raw sensitive fields
- callable logging payload shape remains compact and redacted
- disabled bridge response remains unchanged
- no token values appear
- no storage write is enabled

The next safe implementation step after V2.13 is either a reviewed aggregate
schema for Firestore counters or a narrow log-query/dashboard read model. It is
still not live Cesium activation.

### V2.14 Implementation Gate

V2.14 may define the future Firestore aggregate schema for the renderer bridge
without enabling storage writes, persistent counters, token delivery, runtime
Cesium activation, provider fetching, Functions deploy, OAuth, production
renderer sessions, or protected-preview activation.

Contract review finding:

- V2.9 rate-limit metadata, V2.10 budget metadata, V2.11 usage dashboard
  readiness, V2.12 telemetry storage planning, and V2.13 redacted log labels
  intentionally overlap as planning layers.
- The future Firestore schema should be the canonical storage shape and must be
  smaller than the full audit event.
- Firestore should store aggregate counters and low-cardinality dimensions only.
- Raw audit events, exact hostnames, request ids, session ids, trace ids,
  policy text, full readiness objects, and full storage plans are not valid
  aggregate dimensions.

The planned aggregate schema is:

```text
earthRendererBridgeAggregates/{windowId}
```

Current storage state:

- schema status: planned, no storage
- storage writes: disabled
- raw event storage: forbidden
- aggregate window writes: disabled
- CustomPainter fallback: active
- bridge token delivery: disabled

Allowed aggregate dimensions:

- renderer
- deployment classification
- allowlist outcome
- auth classification
- App Check classification
- decision
- fallback used
- rate-limit outcome
- budget outcome
- token exposure status
- redaction status

Planned aggregate counters:

- total requests
- approved sessions
- fallback sessions
- denied sessions
- rate-limit events
- budget-limit events
- protected-preview denials
- unknown-host denials
- token exposure events
- redacted audit events

The aggregate schema must exclude:

- token values
- user identifiers
- email
- UID
- raw IP addresses
- cookies
- headers
- raw auth payloads
- App Check tokens
- billing identifiers
- payment details
- account identifiers
- raw host strings
- exact hostnames
- request identifiers
- session identifiers
- trace identifiers
- free-form policy text
- raw audit event objects
- full usage dashboard readiness objects
- full telemetry storage plan objects

V2.14 contract tests should cover:

- aggregate schema metadata exists
- storage writes remain disabled
- raw event storage remains forbidden
- dimensions are low-cardinality and align with redacted log labels
- planned counters are aggregate-only
- sensitive and high-cardinality fields are excluded
- disabled bridge responses still return CustomPainter fallback
- no token values appear

The next safe implementation step after V2.14 is either a Firestore aggregate
storage design review or a usage dashboard read-model spike. It is still not
live Cesium activation.

### V2.15 Implementation Gate

V2.15 may design the future Firestore aggregate storage model for renderer
bridge telemetry while keeping all storage disabled. This phase does not
authorize Firestore writes, persistent counters, token delivery, runtime Cesium
activation, provider fetching, Functions deploy, OAuth, production renderer
sessions, or protected-preview activation.

Recommended future Firestore aggregate shape:

```text
earth_renderer_telemetry/{windowId}
earth_renderer_telemetry/{windowId}/dimensions/{dimensionKey}
```

Path rules:

- `windowId` must be server-selected and match an approved aggregate window
  pattern such as `hourly-{yyyymmdd}t{hh}`, `daily-{yyyymmdd}`, or
  `monthly-{yyyymm}`.
- `dimensionKey` must be derived from redacted log labels only.
- Paths must never include exact hostnames, user ids, email addresses, IP
  addresses, request ids, session ids, trace ids, raw auth data, App Check
  tokens, billing/account identifiers, token-derived ids, cookies, headers,
  secrets, or free-form policy text.

Allowed aggregate fields:

- `totalRequests`
- `approvedSessions`
- `fallbackSessions`
- `deniedSessions`
- `rateLimitEvents`
- `budgetLimitEvents`
- `protectedPreviewDenials`
- `unknownHostDenials`
- `tokenExposureEvents`
- `redactedAuditEvents`
- `schemaId`
- `windowId`
- `dimensionKey`
- `rollupLevel`
- `createdAt`
- `updatedAt`

Counter fields must be increment-only. Metadata fields must use safe labels or
server timestamps. No raw event payload should be stored.

Future write strategy:

1. Callable evaluates the request and produces redacted telemetry log labels.
2. Server derives `windowId` from the current aggregate window.
3. Server derives `dimensionKey` from approved low-cardinality labels.
4. Server writes with atomic increments and merge semantics only.
5. Failed aggregate writes must not block CustomPainter fallback.
6. Storage remains disabled by default until an explicit enablement phase.

Future read strategy:

- dashboard reads aggregate-only window summaries
- latest window summary for near-real-time usage
- daily window summary for trends
- category counters for fallback, denial, rate-limit, budget, token exposure,
  and redaction compliance
- no public client writes
- reads limited to admin/dev or future authorized dashboard roles

Retention and rollup:

- short retention for active hourly windows
- roll hourly windows into daily summaries
- roll daily summaries into monthly summaries where useful
- delete fine-grained windows after approved rollup schedule
- retain no raw events

Security expectations:

- writes only from a trusted server callable
- public clients cannot write telemetry
- reads restricted to admin/dev or future authorized dashboard access
- self-hosted deployments own their telemetry project, rules, and retention
- Firestore rules are design-only until storage writes are explicitly enabled

V2.15 contract tests should cover:

- storage model metadata exists
- collection and document path templates are safe
- unsafe window/path inputs are rejected
- dimension keys use redacted log labels only
- allowed fields are aggregate counters or safe metadata
- write/read/retention/security plans remain disabled-safe
- disabled bridge responses still return CustomPainter fallback
- no token values or raw identifiers appear

The next safe implementation step after V2.15 is an inert Firestore write stub
or a dashboard read-model spike. It is still not live Cesium activation.

### V2.16 Implementation Gate

V2.16 may add an inert Firestore aggregate write stub for renderer bridge
telemetry. The stub may build a write plan for tests and future review, but it
must not import a Firestore Admin SDK, execute a Firestore write, enable
persistent counters, deliver a token, activate Cesium, deploy Functions, or
change runtime renderer behavior.

Current disabled write-stub behavior:

- `storageWriteEnabled: false`
- `writeExecuted: false`
- `noFirestoreAdminCall: true`
- `noPersistentCounterWrite: true`
- CustomPainter fallback remains active
- failed or disabled telemetry writes never block fallback
- no raw event payload is stored

The write plan may include only:

- plan id
- plan status
- storage enabled flag
- write executed flag
- window path
- dimension path
- dimension key
- allowed counter increment names
- merge strategy label
- fallback behavior label
- disabled reason
- redaction status
- rejected input labels

The write plan must be built from redacted telemetry log labels and approved
aggregate window identifiers only. It must exclude raw hostnames, request ids,
session ids, trace ids, user ids, emails, IPs, raw auth payloads, App Check
tokens, headers, cookies, billing/account identifiers, token values, secrets,
and exact hostnames.

Callable integration may attach the inert write plan to the redacted audit
event for contract tests, but callable responses do not need to expose the full
plan. Logs should continue to use compact redacted labels only and should not
include the full write plan.

V2.16 contract tests should cover:

- write plan is built
- write execution remains false
- storage write enabled remains false
- no Firestore Admin/write call is represented
- unsafe window/path identifiers collapse to safe labels
- dimension path uses sanitized aggregate key
- compact log labels do not include full write plan
- disabled bridge responses still return CustomPainter fallback
- no token values or raw identifiers appear

The next safe implementation step after V2.16 is an observe-only storage
enablement design or a usage dashboard read-model spike. It is still not live
Cesium activation.

### V2.17 Implementation Gate

V2.17 may define observe-only storage enablement policy for future renderer
bridge telemetry writes. It may add policy fields to the inert write plan, but
it must not execute Firestore writes, import or call Firestore Admin write APIs,
enable persistent counters, deliver a token, activate Cesium, deploy Functions,
or change runtime renderer behavior.

Observe-only policy fields:

- `observeOnlyStorageEligible`
- `observeOnlyStorageEnvironment`
- `storageActivationMode`
- `storageActivationStatus`
- `writeDryRun`
- `writeEligible`
- `writeBlockedReason`
- `productionWriteAllowed`
- `previewWriteAllowed`
- `testWriteAllowed`
- `localWriteAllowed`
- `ciWriteAllowed`

Activation modes:

- `disabled`
- `dryRun`
- `observeOnly`
- `enforceLater`

Current default:

- storage remains disabled
- write plans remain dry-run/not executed
- production writes are not allowed
- protected-preview writes are not allowed
- test writes are eligible later but disabled now
- local and CI remain dry-run only

Environment rules:

- Local dev: dry run only unless a future emulator-specific phase explicitly
  configures local aggregate storage.
- Test: eligible for first observe-only aggregate writes later, after approval.
- Production: disabled until explicit approval after test burn-in.
- Protected preview: always disabled unless explicitly overridden by a future
  protected-reference workflow.
- Self-hosted: user-owned telemetry policy and rules.
- CI: dry run only.

Safety preconditions before observe-only writes can be enabled:

- Firestore rules reviewed
- aggregate-only schema frozen
- no raw events
- no high-cardinality dimensions
- retention policy approved
- cost budget guard approved
- test environment burn-in plan approved
- rollback/disable switch documented

V2.17 contract tests should cover:

- observe-only fields exist
- current default remains disabled
- production writes are not allowed
- protected-preview writes are not allowed
- test environment is eligible later but not enabled now
- CI and local dev remain dry-run only
- no Firestore Admin/write call is represented
- disabled bridge responses still return CustomPainter fallback
- no token values or raw identifiers appear

The next safe implementation step after V2.17 is either an observe-only storage
stub behind an explicit test-environment flag, or a usage dashboard read-model
spike. It is still not live Cesium activation.

### V2.18 Implementation Gate

V2.18 may add an observe-only Firestore aggregate storage stub behind an
explicit test-environment flag. The flag is a non-secret contract label, not a
provider key, and it must remain disabled by default. V2.18 may simulate that
an aggregate-only write would be accepted by the stub in the test environment,
but it must not connect to Firestore, import or call Firestore Admin write APIs,
enable persistent counters, deliver a token, activate Cesium, deploy Functions,
or change runtime renderer behavior.

Test flag contract:

- `EARTH_RENDERER_TELEMETRY_OBSERVE_ONLY_ENABLED`
- non-secret
- default disabled
- test-environment scope only
- no production effect
- no protected-preview effect
- no runtime Cesium activation effect

Observe-only stub outcomes:

- `dryRun`
- `observeOnlyEligible`
- `observeOnlyWouldWrite`
- `observeOnlyBlocked`

Current behavior remains:

- storage remains disabled
- `storageWriteEnabled: false`
- `writeExecuted: false`
- `writeEligible: false`
- no Firestore Admin SDK is imported or called
- no persistent counter write occurs
- CustomPainter fallback remains active
- disabled bridge response remains unchanged

Environment rules:

- Test: the explicit flag may produce an `observeOnlyWouldWrite` stub outcome
  in contract tests only. The plan still does not execute a write.
- Production: blocked even if the flag is requested.
- Protected preview: blocked even if the flag is requested.
- Local/CI: dry-run only.
- Self-hosted: user-managed and not enabled by hosted policy.

V2.18 contract tests should cover:

- flag disabled by default
- test environment eligible but dry-run by default
- test flag enables observe-only simulated plan only
- production remains blocked even if the flag is set
- protected preview remains blocked even if the flag is set
- no Firestore Admin/write call is represented
- no token values or raw identifiers appear
- disabled bridge responses still return CustomPainter fallback

The next safe implementation step after V2.18 is either a reviewed usage
dashboard read-model spike or a narrow observe-only emulator/test harness. It
is still not production storage, protected-preview storage, or live Cesium
activation.

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

## P21.0 Live Earth Layer Research And Provider Strategy

Date: 2026-06-06

Status: architecture/research only. This section does not authorize provider
integration, API keys, Firebase Functions, OAuth, maps SDKs, WebGL, package
changes, app runtime changes, validation workflow changes, or deployment.

Current Earth state entering P21:

- P19 established entity resolution and manual entity-to-region preview
  metadata.
- P20 established the globe-first Earth workstation foundation, including
  entity-aware overlays, marker pulse, focus halo, synthetic flow, region-aware
  motion routing, layer visibility, and visualization mode controls.
- No real-time Earth provider integration exists yet.

### Workstation Alignment

The canonical Earth UX target remains the Earth workstation mockup. Future
provider-backed layers must integrate into the existing workstation regions:

```text
Top center: @scient1st request anchor
Top left:   selection, response context, active routing, entity/region focus
Center:     dominant globe / Earth motion field
Bottom left: layer controls, filters, visibility, mode controls
Right:      Earth score, intelligence summary, drivers, evidence readiness
```

Reject architectures that turn Earth into a disconnected dashboard of provider
cards. Provider data should enter through a shared Earth layer registry and
render through the center globe, with supporting text in the left/right panels.

Provider-backed layers must preserve the existing guardrail language:

- Preview Only until a provider contract is approved and implemented.
- No Live Provider Lookup unless data is fetched through an approved
  server-side boundary.
- Not Provider Verified unless verification evidence, attribution, interval,
  and confidence are present.
- No Verified Environmental Claims unless a future evidence standard explicitly
  authorizes that claim type.

### Layer Taxonomy

Layer groups for the next architecture wave:

| Group | Candidate layers | Primary interactions |
| --- | --- | --- |
| Earth Systems | Weather, wind, ocean currents, temperature, ice/glaciers | Show current/broad state, animate flow, compare region conditions, scrub history. |
| Environmental | Wildfires, forests, biodiversity, protected areas, encroachment | Focus affected regions, show readiness/evidence, compare protected/project areas. |
| Human Activity | Flights, ships, satellites | Show aggregated corridors or counts, never unrestricted tracking by default. |
| Projects | Carbon projects, restoration projects, water projects | Map project metadata to broad regions, evidence artifacts, monitoring status. |
| Entities | Companies, regions, operations, project groups | Resolve entity to known regions/projects, activate comparison and focus routing. |
| Intelligence | Monitoring, verification, evidence, Earth Score | Summarize source freshness, confidence, limitations, and claim support. |

Expected user interactions:

- "Show Microsoft" should resolve a known entity, surface mapped regions in the
  context panel, and activate entity/region layers without provider lookup.
- "Compare Microsoft and Salesforce" should activate dual entity routing and
  comparison visual mode.
- "Show Indonesia" should focus the broad region, available Earth context, and
  source readiness.
- "Show VCM projects" should filter project layers and list evidence readiness
  without implying verification.
- "Show restoration projects" should show project metadata, monitoring
  readiness, and evidence gaps.

### Provider Evaluation Dimensions

Every provider candidate remains unapproved until a source contract records the
following dimensions:

| Dimension | Requirement |
| --- | --- |
| License and attribution | Confirm allowed use, redistribution limits, attribution text, citation rules, and commercial restrictions. |
| Pricing and quotas | Record free tier, paid plan, rate limits, quota ownership, and failure behavior before runtime use. |
| API quality | Prefer documented, stable APIs with examples, schema clarity, versioning, and supportable authentication. |
| Update frequency | Store source cadence, observed-at, fetched-at, expires-at, and stale-state rules per snapshot. |
| Visualization suitability | Prefer data that can become broad-region summaries, coarse grids, vectors, markers, or evidence artifacts. |
| Firebase compatibility | Do not expose secrets in Flutter web; future provider access should use an approved server-side/cache boundary. |
| Browser compatibility | Avoid raw GeoTIFF, NetCDF, GRIB, dense vector tiles, and heavy provider SDKs in the client. |
| Caching strategy | Define TTL, cache key, derived-payload shape, and stale-safe fallback before implementation. |
| Safety and privacy | Default to broad regions/aggregates; restrict sensitive species, precise assets, flights, ships, and private land analysis. |

The first approved provider path should favor a low-volume, server-cached
weather/wind or wildfire/forest evidence snapshot. Do not begin with live
tracking, bulk imagery, commercial-only registry data, or precise sensitive
geometry.

### Provider Candidate Matrix

The following research is current as of 2026-06-06 and must be rechecked before
implementation, contracting, or production use.

| Layer need | Recommended first candidate | Secondary candidates | Current evaluation |
| --- | --- | --- | --- |
| Weather and temperature | Open-Meteo | NOAA/NWS for US alerts/forecasts, ECMWF Open Data for advanced model products, Copernicus Climate Data Store for climate history | Open-Meteo is simple and browser-friendly for prototyping, but free use is non-commercial and commercial use requires subscription/API key. NWS is free/open for US-only data with rate limits. ECMWF became fully open-data in 2025 under CC BY 4.0 for open products, but model products are heavier and should be backend-cached. CDS is open/free for climate data but is not a low-latency product feed. |
| Wind flow | Open-Meteo weather/wind fields | ECMWF Open Data, NWS for US | Use Open-Meteo for first provider-backed flow prototype if commercial terms are accepted. Use ECMWF only after a gridded-data worker/cache exists. |
| Ocean currents and waves | Open-Meteo Marine API | Copernicus Marine, NOAA CO-OPS for US stations | Open-Meteo Marine is the easiest point/route prototype and includes ocean current fields. Copernicus Marine provides authoritative OGC/CMDS APIs and free/full/open Copernicus access, but data volume requires backend tiling/caching. NOAA CO-OPS is strong for US tide/current stations, not global flow. |
| Wildfires | NASA FIRMS | Global Forest Watch fire layers | NASA FIRMS remains the primary active-fire candidate. Keep as summary/region markers until coordinate precision, attribution, update interval, and safety copy are approved. |
| Glaciers and ice | WGMS plus GLIMS | NSIDC/NASA Earthdata | WGMS data policy is open access with citation/CC BY 4.0 alignment. GLIMS provides downloads plus WMS/WFS access. Prefer broad glacier metadata and trend summaries before any boundary rendering. |
| Flights | No default live provider | OpenSky for research/license-gated use, ADS-B Exchange for commercial data | OpenSky requires written license for operational REST API use and for commercial entities. ADS-B Exchange offers production subscription products and live data, but any integration must be opt-in, aggregated, safety-reviewed, and never unrestricted tracking. |
| Ships | No default live provider | NOAA MarineCadastre historical US AIS, MarineTraffic/Kpler for commercial AIS | NOAA MarineCadastre is useful for historical US AIS and planning; live/global AIS usually requires commercial licensing. Ship layers should begin as aggregated corridors/counts, not individual vessel tracking. |
| Satellites and Earth observation | Copernicus Data Space Ecosystem | NASA Earthdata CMR/STAC, Sentinel Hub, Google Earth Engine | Copernicus Sentinel data is free/full/open and CDSE exposes catalog/SDA/openEO/S3/Traceability APIs. NASA CMR/STAC is strong for discovery. Sentinel Hub is paid/OAuth and useful for processing/tiles. Earth Engine is powerful but pricing/terms require careful backend governance. |
| Protected areas | Protected Planet API v4 for non-commercial/research | IBAT for commercial use | Protected Planet v4 is current after the WDPA/WD-OECM merge; commercial use is not allowed through the free API. Any commercial app path likely needs IBAT or another licensed source. Do not render sensitive boundaries by default. |
| Biodiversity | GBIF | iNaturalist, IUCN/IBAT where licensed | GBIF provides REST APIs and open-access occurrence data with standardized licenses (CC0, CC BY, CC BY-NC). Use broad richness/observation summaries only; never expose sensitive species coordinates in the workstation. |
| Forest monitoring | Global Forest Watch Data API | NASA/UMD/Hansen datasets through Earthdata/STAC where needed | GFW Data API has OpenAPI documentation, account/API-key authentication, and many datasets with CC BY 4.0 metadata. Good candidate for forest loss/gain, alerts, and source-backed evidence artifacts. |
| Carbon projects | Climate Action Data Trust metadata | Verra Registry, Gold Standard exports, ACR registry/terms, paid aggregators | CAD Trust is the strongest open metadata direction for carbon market transparency. Verra is authoritative but registry/API access and terms require review. Gold Standard states there is no current Impact Registry API and uses manual export. Start with public metadata/evidence links only. |
| Restoration projects | Restor as research/reference candidate | Partner exports, project owner-provided records, future registries | Restor is a free restoration/conservation platform with site mapping and scientific monitoring context, but no approved app API contract is documented here. Treat restoration integration as partner/export-first until terms and API access are confirmed. |

### Provider Source Notes

Primary source references used for this pass:

- Open-Meteo pricing and terms: https://open-meteo.com/en/pricing and
  https://open-meteo.com/en/terms
- NWS API: https://www.weather.gov/documentation/services-web-api
- Open-Meteo Marine API:
  https://open-meteo.com/en/docs/marine-weather-api
- Copernicus access: https://www.copernicus.eu/en/terms-use/how-access-data
- Copernicus Data Space APIs:
  https://documentation.dataspace.copernicus.eu/APIs.html
- Copernicus Data Space terms:
  https://dataspace.copernicus.eu/terms-and-conditions
- Copernicus Marine APIs:
  https://help.marine.copernicus.eu/en/articles/4794731-which-apis-are-provided
- Copernicus Climate Data Store:
  https://climate.copernicus.eu/climate-data-store
- ECMWF open data:
  https://www.ecmwf.int/node/29013
- NOAA CO-OPS:
  https://www.co-ops.nos.noaa.gov/web_services_info.html
- NASA FIRMS:
  https://firms.modaps.eosdis.nasa.gov/active_fire/
- WGMS data policy:
  https://wgms.ch/data_policy/
- GLIMS glacier data:
  https://www.glims.org/glacierdata/index.php
- NASA Earthdata CMR/STAC:
  https://www.earthdata.nasa.gov/about/esdis/eosdis/cmr and
  https://cmr.earthdata.nasa.gov/stac/docs/index.html
- Sentinel Hub billing/authentication:
  https://docs.sentinel-hub.com/api/latest/api/overview/billing/ and
  https://docs.sentinel-hub.com/api/latest/api/overview/authentication/
- Google Earth Engine pricing:
  https://cloud.google.com/earth-engine/pricing
- OpenSky terms:
  https://opensky-network.org/about/terms-of-use
- ADS-B Exchange:
  https://www.adsbexchange.com/
- MarineTraffic API docs:
  https://servicedocs.marinetraffic.com/
- NOAA MarineCadastre AIS:
  https://marinecadastre.gov/accessais/ and
  https://www.coast.noaa.gov/digitalcoast/data/marine-cadastre.html
- Protected Planet API:
  https://api.protectedplanet.net/ and
  https://api.protectedplanet.net/documentation
- GBIF terms and API:
  https://www.gbif.org/terms and
  https://techdocs.gbif.org/en/openapi/v1/occurrence
- Global Forest Watch Data API:
  https://data-api.globalforestwatch.org/
- Climate Action Data Trust:
  https://climateactiondata.org/ and
  https://climateactiondata.org/frequently-asked-questions/
- Verra Registry:
  https://verra.org/registry/overview/
- Gold Standard Impact Registry FAQ:
  https://goldstandardhelp.freshdesk.com/support/solutions/articles/44002763127-gold-standard-impact-registry
- Restor platform:
  https://intercom.help/restor/en/articles/6903700-what-is-restor

### Architecture Recommendation

Do not connect providers directly to Flutter web. Use a staged provider
boundary:

```text
Provider source
-> source contract
-> server-side fetch / scheduled ingest / manual evidence artifact
-> normalized EarthLayerSnapshot
-> cache
-> workstation view model
-> globe renderer + context/control/right-side summaries
```

Recommended normalized shape:

```text
EarthLayerSnapshot
- layer_id
- layer_group
- provider_id
- provider_name
- source_url
- license_label
- attribution
- fetched_at
- observed_at
- expires_at
- region_scope
- precision_scope
- freshness_state
- confidence_state
- data_kind
- geometry_policy
- summary_metrics
- visualization_payload
- evidence_links
- guardrails
```

Geometry policy is mandatory. Each layer must declare whether it can show:

- no geometry
- broad region only
- point markers
- aggregated grid/cell
- approximate corridor
- approved polygon

Default to broad region or aggregate. Precise positions, sensitive species
locations, private land analysis, unrestricted flight/ship tracking, and
provider-backed environmental claims require separate approval.

### Motion Architecture Strategy

Migration path:

```text
Synthetic Flow
-> Provider-backed Flow
-> Multi-layer Earth Motion
```

Stage 1: keep the current synthetic flow painter and route state. Add no
providers.

Stage 2: introduce provider-backed flow snapshots for weather/wind or ocean in
one broad region. Render as low-resolution vectors or route arcs in the existing
center globe. Cache snapshots server-side. Labels must include source,
observed-at, freshness, and "not verified environmental claims".

Stage 3: add multiple provider-backed layers with a compositor:

```text
base globe
+ earth systems vectors
+ environmental alerts
+ entity/project markers
+ focus halo
+ comparison halo
+ timeline highlight
+ evidence badges
```

Stage 4: consider map/globe engine upgrades only after source contracts,
caching, attribution, and performance budgets are proven. Do not introduce
WebGL/Three.js/OpenLayers/Mapbox/ArcGIS as the next step.

### Entity Intelligence Integration

Entity relationships should resolve before provider lookup:

```text
Company
-> known/manual regions
-> known/manual projects
-> approved Earth context layers
-> monitoring/evidence readiness
-> verification eligibility
```

```text
VCM or restoration project
-> project registry/public profile
-> broad region
-> Earth context
-> evidence artifact
-> monitoring path
-> verification readiness
```

Entity layers should never infer operating regions from provider data without a
source. Company/project/region mapping remains manual/source-backed until a
future entity-source contract exists.

### Layer Controls Strategy

Controls should remain bottom-left and scale through hierarchy, not more cards:

```text
Layers
- Earth Systems
  - Weather
  - Wind
  - Ocean
  - Temperature
  - Ice / Glaciers
- Environmental
  - Wildfires
  - Forests
  - Biodiversity
  - Protected Areas
  - Encroachment
- Human Activity
  - Flights
  - Ships
  - Satellites
- Projects
  - Carbon
  - Restoration
  - Water
- Entities
  - Companies
  - Regions
  - Operations
  - Project Groups
- Intelligence
  - Monitoring
  - Verification
  - Evidence
  - Earth Score
```

Recommended control patterns:

- Group accordions for categories.
- Switches for layer visibility.
- Segmented control for visualization mode.
- Sliders only for intensity or timeline playback.
- Source/freshness chips in the right panel, not repeated under every layer.
- Disabled states for planned or unlicensed layers.
- Search/filter for large layer lists before adding more permanent panels.

### Timeline Strategy

Timeline remains part of the globe experience, not a separate product.

Timeline event types:

- provider observation
- provider refresh
- monitoring event
- evidence artifact
- project milestone
- entity mapping update
- verification candidate change
- Earth Score snapshot

Timeline interactions:

- scrub or step changes the active globe snapshot
- focused event updates context panel
- evidence event updates right-side evidence summary
- layer availability follows source/freshness windows
- unavailable historical data is shown as disabled, not inferred

Do not implement playback until at least one provider-backed snapshot source and
cache contract exists.

### Caching And Firebase Strategy

Preferred caching layers:

1. Manual/static evidence artifacts for current preview phases.
2. Scheduled server-side fetch into compact JSON snapshots.
3. Edge/CDN cache for public, non-sensitive, attribution-safe layer snapshots.
4. Client memory cache for active workstation session only.

Firebase compatibility notes:

- Do not expose provider secrets in Flutter web.
- Public no-key sources may still need server-side caching to control cost,
  rate limits, attribution, and shape normalization.
- Use callable/HTTPS functions or scheduled jobs only in a future approved
  provider phase.
- Store compact derived snapshots, not raw raster or bulk geospatial products.
- Keep large raster/vector processing outside Flutter web runtime.

Browser compatibility notes:

- First provider-backed layers should render with existing Flutter widgets and
  CustomPainter.
- Avoid raw GeoTIFF, NetCDF, GRIB, heavy STAC asset reads, and large vector
  tiles in-browser.
- Normalize to compact JSON, bins, vectors, markers, and summaries before the
  app sees the data.

### Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Provider lock-in | Normalize all sources into `EarthLayerSnapshot`; keep provider-specific fields in source contracts only. |
| Cost spikes | Server-side cache, quota budgets, stale-safe fallbacks, no client fan-out, paid-provider approval gates. |
| Licensing drift | Recheck terms before implementation; store license label and attribution per snapshot. |
| Data freshness confusion | Always show observed-at/fetched-at/expires-at and freshness state. |
| Browser performance | No raw raster/bulk geospatial data in Flutter web; compact snapshots only. |
| Mobile performance | Low-resolution default layers, progressive disclosure, reduced animation, no dense live streams. |
| Sensitive locations | Broad regions/aggregates by default; protected-area boundaries, species, flights, ships require safety review. |
| Verification overclaiming | Evidence and monitoring can support readiness; verified claims require explicit evidence standard and review. |
| Entity inference | No automatic company/project region inference without a source-backed relationship. |
| Timeline complexity | Timeline consumes snapshots/events; it does not own provider fetching. |

### Recommended Next Phases

1. P21.1 Source Contract Design:
   define `EarthProviderContract`, `EarthLayerSnapshot`, attribution, freshness,
   geometry policy, caching policy, and guardrails without integrating a real
   provider.
2. P21.2 Weather/Wind Prototype Plan:
   select Open-Meteo or NWS/ECMWF for a server-side cached, low-resolution
   broad-region prototype; no direct Flutter web key.
3. P21.3 Wildfire/Forest Evidence Plan:
   align NASA FIRMS and Global Forest Watch with existing Earth Vision evidence
   artifacts and region-safe markers.
4. P21.4 Entity/Project Source Mapping Plan:
   define how company, VCM, restoration, water, and regional sources are
   accepted, cited, and mapped before any provider lookup.

P21.0 recommendation: start with source contracts and snapshot normalization,
not a live provider implementation.

## P21.1 Provider Source Contract And Snapshot Schema

Date: 2026-06-06

Status: app-local schema implementation only. P21.1 defines provider-agnostic
models and deterministic fixtures in `apps/rand0m`; it does not authorize live
provider calls, provider credentials, Firebase Functions, OAuth, persistence,
deployment, workflow changes, or verified environmental claims.

### Implemented App Model

Concrete app model path:

```text
apps/rand0m/lib/models/connect/earth_layer_snapshot.dart
```

The schema introduces:

- `EarthProviderSource`
- `EarthLayerSourceDefinition`
- `EarthLayerSnapshot`
- `EarthLayerSnapshotRecord`
- `EarthLayerSnapshotMetadata`
- `EarthLayerFreshness`
- `EarthLayerAttribution`
- `EarthLayerLicense`
- `EarthLayerVisualizationHint`

Layer group taxonomy is encoded as:

- Earth Systems
- Environmental
- Human Activity
- Projects
- Entities
- Intelligence

### Snapshot Shape

`EarthLayerSnapshot` normalizes future provider or evidence inputs into:

- layer id
- layer group
- source id
- region/entity/project scope
- captured-at timestamp
- optional valid-from/valid-to window
- freshness state
- confidence label
- attribution
- license summary
- records
- visualization hints
- caveats and guardrails

`EarthLayerSnapshotRecord` intentionally supports only preview-safe generalized
shapes:

- point
- region label
- path
- grid summary
- event marker
- metric summary

No provider-specific payload, raw provider response, precise sensitive
coordinate feed, raster, vector tile, GeoTIFF, NetCDF, GRIB, or bulk geospatial
blob is part of P21.1.

### Freshness And Cache Metadata

Freshness states are:

- fresh
- stale
- expired
- unavailable
- preview fixture

The model records cache key, TTL, source update cadence, last refresh label,
and provider caveats, but does not implement caching or persistence. Future
provider phases must still define server-side cache ownership, source cadence,
expiration behavior, stale fallback, attribution, and quota controls before
runtime use.

### Visualization Readiness Mapping

Snapshot records can advertise readiness for existing Earth workstation
concepts without changing UI behavior:

- overlay marker
- motion layer
- focus region
- timeline event
- right-side summary
- context panel detail

This preserves the P21.0 workstation strategy: provider data flows through
normalized snapshots into the dominant globe, top-left context, bottom-left
controls, and right-side intelligence instead of creating new dashboard regions.

### Fixture Snapshots

P21.1 includes deterministic fixture snapshots for:

- weather/wind preview
- wildfire/forest evidence preview

Fixture snapshots are labeled:

- Preview Fixture
- Preview Only
- Not Live Data
- No Live Provider Lookup
- Not Provider Verified
- No Verified Environmental Claims

These fixtures are schema/validation aids only. They are not provider data,
not cached data, not evidence of environmental state, and not a live lookup
path.

### Next Architecture Step

P21.2 should design the first weather/wind provider prototype plan against this
schema, including the source contract, server-side cache boundary, attribution,
quota/rate limits, fixture-to-provider migration path, and workstation mapping.
The preferred implementation target remains a low-volume, server-cached
broad-region weather/wind snapshot. Do not begin with live tracking, raw
imagery, bulk gridded data, commercial-only registries, or sensitive geometry.

## P21.2 Weather/Wind Provider Prototype Plan

Date: 2026-06-06

Status: provider prototype plan and app-local source-definition mapping only.
P21.2 does not authorize live provider calls, client-side provider keys,
Firebase Functions, scheduled jobs, persistence, deployment, workflow changes,
or verified environmental claims.

### Provider Candidate Review

The first provider-backed Earth Systems prototype should use the smallest
possible weather/wind surface: broad-region weather summary plus low-resolution
wind flow metadata, normalized into `EarthLayerSnapshot`.

| Candidate | Data fit | Access and terms | Prototype suitability |
| --- | --- | --- | --- |
| Open-Meteo | Point forecast, temperature, precipitation, wind speed, wind direction, hourly time series, multiple model APIs. | Free API is non-commercial and rate limited; commercial app use requires subscription/API key. Data terms reference CC BY 4.0 attribution. | Recommended first prototype because JSON shape is simple and maps cleanly to point, metric, grid summary, and motion hint records. Must be server-cached for production/commercial use. |
| National Weather Service | US forecasts, alerts, observations, JSON-LD API, cache-friendly lifecycle. | Public US government service, free/open for any purpose, with reasonable non-public rate limits. | Good US-only fallback and alerts candidate. Not global enough for first Earth workstation weather/wind prototype. |
| ECMWF Open Data | Global forecast model products, 10m/100m wind components, temperature, precipitation, wave fields. | Open products use CC BY 4.0 and can be redistributed commercially with attribution; access has simultaneous connection limits and rolling archive behavior. | Excellent future authoritative source, but GRIB/model products are too heavy for the first Flutter-facing prototype. Requires backend worker/cache and derived compact JSON. |
| Copernicus Climate Data Store | Climate/reanalysis and dataset retrieval through API/batch access. | Terms vary by dataset and prohibit implying ECMWF/EU endorsement; CDS content is supplied as-is. | Better for climate context and historical/evidence workflows than low-latency weather/wind preview. Use later for climate summaries, not the first flow prototype. |

Recommendation: start with Open-Meteo as a server-cached prototype candidate
only. The free tier is suitable for evaluation, but commercial Rand0m use must
not rely on client-side free API calls. Production use requires subscription,
API-key governance, cache-before-provider, attribution, and stale-safe fallback.

Primary source references checked for P21.2:

- Open-Meteo pricing: https://open-meteo.com/en/pricing
- Open-Meteo terms: https://open-meteo.com/en/terms
- Open-Meteo forecast docs: https://open-meteo.com/en/docs
- NWS API docs: https://www.weather.gov/documentation/services-web-api
- ECMWF open data: https://www.ecmwf.int/en/forecasts/datasets/open-data
- Copernicus Climate Data Store: https://climate.copernicus.eu/climate-data-store
- CDS terms: https://cds.climate.copernicus.eu/licences/terms-of-use-cds

### P21.1 Contract Mapping

App-local model path:

```text
apps/rand0m/lib/models/connect/earth_layer_snapshot.dart
```

P21.2 adds inert prototype source definitions for:

- `weather-provider-prototype`
- `wind-provider-prototype`

The selected planned provider source maps as:

```text
EarthProviderSource
- id: open-meteo-weather-wind-prototype
- access: serverCached
- requiresServerBoundary: true
- liveLookupEnabled: false
- sourceUrl: https://open-meteo.com/en/docs
- attribution: Open-Meteo / Weather Forecast API
- license: CC BY 4.0 data with commercial subscription gated
- caveats: Provider Prototype Plan, Preview Only, No Live Provider Lookup,
  Server Boundary Required, Cache Before Provider, Not Provider Verified,
  No Verified Environmental Claims, Commercial Terms Review Required
```

Weather source definition:

```text
EarthLayerSourceDefinition
- layerId: weather-provider-prototype
- group: Earth Systems
- supported records: region label, point, grid summary, metric summary,
  event marker
- visualization hints: overlay marker, right-side summary, context panel
  detail, timeline event
- freshness policy: unavailable, planned 30m TTL, server cache required
```

Wind source definition:

```text
EarthLayerSourceDefinition
- layerId: wind-provider-prototype
- group: Earth Systems
- supported records: region label, path, grid summary, metric summary
- visualization hints: motion layer, focus region, right-side summary,
  timeline event
- freshness policy: unavailable, planned 30m TTL, server cache required
```

The existing P21.1 `weather-wind-preview` fixture remains the fixture parity
target. It already demonstrates region label, generalized marker, symbolic
path, grid summary, metric summary, motion-layer hint, focus-region hint, and
right-side summary hint without provider data.

### Snapshot Record Mapping

Future normalized weather/wind snapshots should avoid raw provider payloads and
produce compact records:

| Record shape | Weather mapping | Wind mapping | Notes |
| --- | --- | --- | --- |
| point forecast | generalized selected-region point summary | optional generalized flow anchor | No precise sensitive or user-specific coordinate display. |
| region summary | region label plus conditions summary | selected broad region wind context | Drives top-left context and right-side summary. |
| grid summary | coarse cell count and range labels | low-resolution vector/grid summary | Derived server-side; no raw GRIB/NetCDF/tiles in Flutter web. |
| metric summary | temperature, precipitation, condition confidence | wind speed/direction/intensity summary | Units, confidence, validity window, and source must be explicit. |
| motion layer hint | usually disabled or marker-only | low-resolution flow vector hint | Feeds current globe flow layer without live movement claims. |
| timeline event | captured/valid window label | captured/valid window label | Timeline labels source validity; it does not imply history or forecast proof. |

Required metadata for every provider-backed snapshot:

- `capturedAt`
- `validFrom`
- `validTo`
- freshness state and TTL
- confidence label
- attribution and source URL
- license summary
- caveats and guardrails
- source update cadence
- cache key
- geometry policy
- precision scope

### Cache And Firebase Plan

The safest first cache path remains future-only:

```text
Open-Meteo
-> approved server fetch
-> normalized weather/wind EarthLayerSnapshot
-> compact cache document/blob
-> app reads normalized snapshot
-> workstation view model
```

Rules:

- No direct Flutter web calls to Open-Meteo in production.
- No client-side provider keys.
- No raw provider payload storage unless a future phase approves it.
- Cache before provider, with low-volume prototype quotas.
- Store compact normalized snapshots, not raw weather archives.
- Show stale-safe fallback when refresh is unavailable.
- Recheck terms, rate limits, and attribution before implementation.

### Visualization Integration Plan

Provider-backed weather/wind snapshots should map into the existing
workstation without disrupting the synthetic flow preview:

- center globe: current synthetic flow remains default; future wind snapshot
  can supply low-resolution motion hints
- overlay marker: generalized weather marker only, no precise live points
- right-side summary: source, last updated, confidence, caveats, selected
  region, metric summaries
- top-left context panel: selected broad region, validity window, source
  status, provider boundary
- bottom-left layer controls: weather/wind source state, provider-backed label,
  disabled/stale states
- timeline label: captured/valid window only

Future UI labels must include:

- Provider-backed
- Last updated
- Source
- Confidence
- Caveats
- Not verified by Random Knights unless separately verified

### Implementation Guardrails

P21.2 preserves these boundaries:

- no live provider calls
- no external API integration
- no Firebase Functions or scheduled jobs
- no OAuth
- no provider keys
- no deployment
- no workflow changes
- no verified environmental claims
- no raw provider payloads in app runtime
- no direct client fan-out to providers

P21.3 implements this next step as an app-local cache fixture adapter without
connecting to Open-Meteo.

## P21.3 Weather/Wind Cache Fixture Adapter

Date: 2026-06-06

Status: app-local fixture adapter and snapshot-normalization implementation
only. P21.3 does not authorize live provider calls, external API integration,
provider keys, Firebase Functions, scheduled jobs, persistence, deployment,
workflow changes, or verified environmental claims.

### Implemented App Model

Concrete app model path:

```text
apps/rand0m/lib/models/connect/earth_layer_snapshot.dart
```

P21.3 adds:

- `EarthWeatherWindProviderFixture`
- `EarthWeatherWindCacheFixture`
- `EarthWeatherWindSnapshotAdapter`

The adapter accepts an Open-Meteo-shaped deterministic fixture payload and
normalizes it into an `EarthLayerSnapshot`. The fixture includes generalized
latitude/longitude, capture and validity windows, temperature, wind speed, wind
direction, humidity, pressure, region label, source label, and caveats. It is
not a real provider response and must not be treated as live weather data.

### Cache Fixture Contract

The cache fixture simulates the future server-cache boundary:

```text
cache key: fixture:earth-systems:open-meteo-shaped:weather-wind:indonesia
freshness: Preview Fixture
ttl: 30 minutes
last refresh: P21.3 cache fixture; no provider refresh
source cadence: simulated 30m cache cadence
```

This lets Earth test freshness, TTL, source cadence, stale-safe labels, and
cache-key handling before any Firebase, server worker, scheduled job, or
provider implementation exists.

### Normalized Snapshot Records

The adapter produces compact records for:

- broad region label
- generalized weather marker
- temperature summary
- humidity summary
- pressure summary
- symbolic wind flow hint
- coarse weather/wind grid summary
- captured/valid timeline label

The records map to the current workstation targets:

- globe flow layer
- generalized overlay marker
- right-side summary
- top-left context panel
- bottom-left layer controls
- timeline label

### Guardrails

Every generated snapshot and record remains labeled:

- Preview Fixture
- Preview Only
- Not Live Data
- No Live Provider Lookup
- Not Provider Verified
- No Verified Environmental Claims

P21.3 is the fixture-to-cache adapter bridge only. The next visualization phase
can safely consume these normalized records for globe highlighting, overlay
summary, layer controls, and timeline labels while still avoiding real provider
fetching.
