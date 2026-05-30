# Random Knights Ecosystem Blueprint

Random Knights, XYZ is a Flutter and Firebase ecosystem for creative tools,
AI-assisted workflows, privacy-aware connections, and playful agent-driven
experiences. The platform should feel imaginative on the surface and disciplined
underneath: shared packages, secure local development, transparent AI behavior,
and clean boundaries between apps, support modules, backend services, and media.

## Platform Mission

Build a family of connected apps that help people capture ideas, shape them into
structured work, publish or share them safely, and collaborate with specialized
AI agents without hiding cost, privacy, source, or environmental tradeoffs.

The platform should prioritize:

- Human agency over opaque automation.
- Reusable product foundations across multiple apps.
- Transparent AI provider, model, cost, token, and impact reporting.
- Secure defaults for local development and production environments.
- Contribution paths that future open-source collaborators can understand.
- A plugin and agent architecture that can grow without rewriting each app.

## Ecosystem Apps

| App | Role | Primary User Need | Core Product Shape |
| --- | --- | --- | --- |
| `rand0m` | Creative launcher and discovery surface | Explore ideas, tools, agents, media, and experiments | Home base, playful discovery, cross-app identity, creative prompts |
| `up10ad` | Upload, ingest, and media workflow app | Bring files, images, documents, and media into the ecosystem | File intake, validation, metadata, media processing, privacy checks |
| `out1ine` | Structured thinking and planning app | Turn messy ideas into outlines, plans, drafts, and reusable structures | Notes, outlines, writing flows, project plans, AI-assisted organization |
| `knight1y` | Agent command center, currently `kn1ghts` | Chat with agents, inspect history, coordinate tools, and manage workflows | Agent roster, chat, history, settings, dashboards, local tools |

`kn1ghts` is the current app implementation. `knight1y` is the product identity
for the agent command center as the ecosystem matures.

## Support Modules

| Module | Role | Responsibilities |
| --- | --- | --- |
| `c1assr00m` | Learning, onboarding, and guided practice module | Tutorials, curriculum, examples, contributor learning paths, classroom-like agent scenarios |
| `e1even` | Operations, evaluation, and orchestration module | QA workflows, evaluation harnesses, agent benchmarks, release checks, internal automation |

Support modules may have packages, Firebase Functions, Firestore collections,
and docs, but they should not become hidden dependencies of every app. Apps
should opt into their capabilities through shared contracts.

## App Purpose Matrix

| Capability | rand0m | up10ad | out1ine | knight1y | c1assr00m | e1even |
| --- | --- | --- | --- | --- | --- | --- |
| Identity and app shell | Primary | Shared | Shared | Shared | Shared | Shared |
| Agent chat | Light | Assisted | Assisted | Primary | Guided | Evaluation |
| File/media ingest | Light | Primary | Optional | Optional | Examples | Test fixtures |
| Structured planning | Discovery | Metadata | Primary | Agent-assisted | Lessons | Runbooks |
| AI usage reporting | Shared | Shared | Shared | Primary | Teaching | Auditing |
| Connection graph | Discovery | Source links | Outline links | Agent/tool links | Learning paths | System links |
| Local tools | Optional | Validation tools | Draft tools | Primary | Sandboxes | Automation |
| Contributor workflows | Docs | Docs | Docs | Docs | Primary | Primary |

## Shared Feature Strategy

Shared features should move into packages when at least two apps need them or
when the feature represents a platform contract.

Shared foundations:

- Authentication, app boot, environment selection, and Firebase initialization.
- Theme tokens, reusable widgets, progress indicators, error states, and layout
  primitives.
- AI provider contracts, model metadata, token/cost/impact estimates, and
  prompt/response types.
- Agent manifests, agent registry, tool contracts, settings, history, and usage
  records.
- Asset catalogs for avatars, books, icons, audio, video, and brand media.
- Firestore, Functions, Storage, weather, location, and web integration clients.
- Security helpers for URL scanning, file validation, permission checks, and
  secret handling.

App-specific code should stay local when it controls routing, product tone,
page composition, app-specific Firebase project selection, or brand-specific
media.

## AI Transparency, Privacy, and Environment Principles

AI features should expose enough information for users and maintainers to
understand what happened.

Principles:

- Show provider and model whenever an AI response is displayed or logged.
- Track input tokens, output tokens, estimated cost, and estimated CO2e where
  supported or reasonably estimated.
- Keep provider API keys and privileged calls on the backend, not in Flutter
  clients.
- Prefer Firebase Functions as the provider boundary for production AI calls.
- Separate dev, test, and prod environments for data, keys, and deploy targets.
- Never commit `.env` files or private service credentials.
- Make local emulator workflows the default for contributor setup.
- Give users clear boundaries around uploads, file metadata, retained history,
  and agent memory.
- Treat agent prompts, tools, and output logs as inspectable platform objects,
  not hidden magic.

Environmental reporting should be framed as an estimate. The platform should not
pretend token-based impact math is exact, but it should make tradeoffs visible.

## Connection System Concept

Connections are typed relationships between people, apps, agents, uploads,
outlines, media, tools, tasks, and external services.

Examples:

- A file uploaded in `up10ad` connects to an outline in `out1ine`.
- An outline connects to an agent conversation in `knight1y`.
- An agent response connects to provider/model/cost/impact metadata.
- A tutorial in `c1assr00m` connects to a reusable workflow template.
- An evaluation in `e1even` connects to agent versions and test fixtures.

The connection system should eventually provide:

- Stable IDs for connected objects.
- Typed edges such as `created_from`, `summarized_by`, `validated_by`,
  `published_to`, `reviewed_by`, and `generated_with`.
- Firestore-backed storage with security rules per object type.
- Local-first development through Firebase emulators.
- UI components for browsing provenance, related work, and agent/tool history.

This concept belongs partly in `rk_core` for types, `rk_connections` for
persistence, `rk_agents` for agent/tool edges, and `rk_pages`/`rk_ui` for
visualization.

## Package Extraction Strategy

Target package direction:

```text
apps/*
  -> rk_pages
  -> rk_agents
  -> rk_ui
  -> rk_ai
  -> rk_connections
  -> rk_media
  -> rk_security
  -> rk_platform
  -> rk_core

rk_pages -> rk_ui, rk_agents, rk_ai, rk_connections, rk_media, rk_platform, rk_core
rk_agents -> rk_ai, rk_security, rk_media, rk_core
rk_ai -> rk_security, rk_core
rk_connections -> rk_security, rk_platform, rk_core
rk_ui -> rk_media, rk_core
rk_media -> rk_core
rk_security -> rk_core
rk_platform -> rk_core
rk_core -> no Random Knights package dependencies
```

Package ownership:

- `rk_core`: Pure Dart models, IDs, result types, serialization contracts,
  shared constants, and connection primitives.
- `rk_ai`: Provider labels, model metadata, AI request/response contracts,
  usage and impact estimates, prompt/tool interfaces, and local agent contracts.
- `rk_ui`: Theme tokens, common widgets, layout primitives, motion components,
  progress indicators, and reusable visual language.
- `rk_connections`: Firebase clients, Firestore/Storage/Functions adapters,
  external service clients, location/weather/web integration wrappers.
- `rk_agents`: Agent registry, manifests, prompts, settings, history,
  tool routing, agent-specific domain services.
- `rk_pages`: Shared page compositions used by multiple apps, kept above domain
  packages and below app shells.
- `rk_media`: Asset catalogs, media loaders, avatar/book/icon/video references,
  generated asset accessors, shared media metadata.
- `rk_security`: Secret validation, permission checks, URL/file scanning,
  audit helpers, abuse-prevention primitives.
- `rk_platform`: App boot, environment loading, Firebase option selection,
  platform adapters, emulator/development mode wiring.

Extraction order:

1. Move pure models and constants into `rk_core`.
2. Move theme tokens and low-risk reusable widgets into `rk_ui`.
3. Move AI contracts and usage estimates into `rk_ai`; keep secrets in Functions.
4. Move Firebase and external service adapters into `rk_connections`.
5. Move agent manifests, settings, history, and tool contracts into `rk_agents`.
6. Move asset catalogs and generated media references into `rk_media`.
7. Move shared screens into `rk_pages` only after their dependencies are clean.
8. Add `rk_security` and `rk_platform` as cross-cutting packages where current
   app code proves the boundary.

## Firebase and Environment Strategy

Each app should support dev, test, and prod Firebase projects. Local development
should run against emulators by default, with explicit opt-in for remote dev.

Recommended layout:

```text
backend/
  firebase/
    firebase.json
    firestore.rules
    firestore.indexes.json
    storage.rules
  functions/
    src/
      ai/
      agents/
      connections/
      media/
      security/
      tasks/

apps/<app>/
  firebase/
    dev/
    test/
    prod/
```

Functions should own privileged AI provider calls, webhook verification, media
processing, security scans that require secrets, and scheduled automation.
Flutter clients should call typed Functions through `rk_connections` and
exchange AI-specific contracts from `rk_ai`.

## Contributor and Local Agent Strategy

Future contributors should be able to run a useful local version without access
to production secrets.

Recommended defaults:

- `.env.example` files instead of real `.env` files.
- Firebase Emulator Suite for Auth, Firestore, Functions, and Storage.
- Seed data for agents, sample uploads, outlines, and connection graphs.
- Local agent/tool manifests under `tooling/local_agents`.
- CI checks that run without private production credentials.
- Clear docs for adding an app, package, Firebase Function, agent, or tool.

Local AI agents and tools should be registered through manifests, declare their
permissions, and produce inspectable logs. The system should treat local tools as
powerful integrations with explicit boundaries, not invisible app internals.
