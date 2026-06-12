# Shared Packages

## Status

The root workspace owns shared packages under `packages/*`. Apps remain
independent nested repositories under `apps/*` and consume shared packages by
path dependency only when a wiring phase explicitly requires it.

## Package Responsibilities

### rk_core

Owns pure Dart ecosystem contracts:

- `EcosystemAppId`
- `EcosystemAppRole`
- `EcosystemAppMetadata`
- `EcosystemAppNavigation`
- `EcosystemAppShellConfig`
- `EcosystemAppCapabilities`
- `EcosystemAppDefinition`
- navigation, primary destination, and drawer destination enums
- the `EcosystemApps` registry

Must not own widgets, routes, Firebase, Hive, provider clients, app services,
assets, generated code, or platform behavior.

### rk_branding

Owns shared brand primitives:

- colors
- font helpers
- future static brand tokens

Must not own pages, routes, runtime services, Firebase, Hive, app-specific
themes, launcher configuration, or app-specific assets.

### rk_ui

Owns reusable Flutter UI infrastructure:

- shell widgets
- bottom navigation
- drawer widget
- More sheet
- dashboard shell, sections, and cards
- About shell, sections, and cards
- splash/progress screens and progress widgets
- weather presentation widgets
- oracle presentation widgets
- shared painters, motion helpers, and simple UI widgets

Must not own app route tables, Firebase/env loading, provider clients, Hive
boxes, media playback engines, render execution, or app-specific page logic.

### rk_agents

Owns agent definition contracts and metadata. It remains Dart-only and should
not import app source, Flutter UI, Hive, Firebase, or runtime agent services.

### rk_ai

Owns AI contracts:

- providers
- models
- responses
- usage
- pricing
- impact metadata

It does not own live provider clients, API keys, Firebase functions, chat UI,
message persistence, or app runtime orchestration.

### rk_media

Owns pure Dart media contracts:

- media asset metadata
- media type
- media source
- playback configuration

It does not own audio/video players, render engines, file pickers, platform
media APIs, upload pipelines, FFmpeg execution, or app assets.

### rk_data

Owns pure Dart data contracts:

- data source metadata
- data records
- provider interface
- query and sort contracts
- audit entries

It does not own Hive implementations, Firebase implementations, API clients,
storage engines, caches, migrations, synchronization engines, or app history
stores.

## Dependency Direction

Allowed:

- apps may depend on shared packages during approved wiring phases
- `rk_ui` may depend on `rk_core` and `rk_branding`
- future UI packages may consume pure Dart contracts from `rk_core`,
  `rk_media`, or `rk_data` if the dependency remains presentation-only

Avoid:

- pure Dart packages depending on Flutter packages
- `rk_core`, `rk_agents`, `rk_ai`, `rk_media`, or `rk_data` importing app code
- shared packages importing Firebase config, `.env` readers, generated app
  files, Hive adapters, route tables, or page classes

## Intentional Non-Goals

The shared packages do not consolidate the app repositories. They do not own
Firebase cleanup, credential migration, package IDs, bundle IDs, platform
registrants, app release configuration, or runtime behavior.
