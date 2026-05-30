# Ecosystem Foundation

## Status

The ecosystem foundation is ready for the next app wiring wave. The shared
packages now define app identity, shell contracts, UI primitives, agent and AI
contracts, media contracts, and data contracts without taking ownership of app
runtime behavior.

This document summarizes the state after extraction phases Z through AG.

## Apps

| App | Role | Domain | Primary Destination |
| --- | --- | --- | --- |
| `rand0m` | Public root/chat landing app | `rand0m.ai` | Chat |
| `knight1y` | Full premium/power-user app | `knight1y.rand0m.ai` | Agents |
| `out1ine` | Oracle/lightweight future test app | `out1ine.rand0m.ai` | Orac1es |
| `up10ad` | Creative render/upload tool | `up10ad.rand0m.ai` | Render |

## Shared Shell

The bottom navigation contract is:

```text
Dashboard | About | Primary | Connections | More
```

Primary is app-specific:

| App | Primary |
| --- | --- |
| `rand0m` | Chat |
| `knight1y` | Agents |
| `out1ine` | Orac1es |
| `up10ad` | Render |

The drawer contract is generated from the same shared model:

| Section | Destinations |
| --- | --- |
| Shared top section | Dashboard, About, Primary, Connections, More |
| Shared ecosystem tools | Draw, Weather, Orac1es |
| Knight1y-specific | History, Test, Relax, Spotify |
| Rand0m-specific | none currently |
| Out1ine-specific | reserved future Test Lab |
| Up10ad-specific | reserved future Media Studio |

Apps still own route callbacks, auth rules, secret/test visibility, disabled
states, and any pushed-route behavior.

## Package Foundation

| Package | Foundation Responsibility |
| --- | --- |
| `rk_core` | App IDs, roles, metadata, navigation contracts, drawer contracts, capability flags, app registry |
| `rk_branding` | Shared color and font primitives |
| `rk_ui` | Shared shell, drawer, dashboard, about, splash/progress, weather, and oracle presentation widgets |
| `rk_agents` | Agent definition contracts |
| `rk_ai` | AI provider, model, response, usage, pricing, and impact contracts |
| `rk_media` | Pure Dart media asset, source, type, and playback configuration contracts |
| `rk_data` | Pure Dart data source, record, provider, query, and audit contracts |

## Extraction Phase Summary

| Phase | Result |
| --- | --- |
| Z | Shared splash/progress implementation moved into `rk_ui` and app startup behavior was preserved. |
| AA | Shared dashboard scaffolding added to `rk_ui`; app dashboard modules remain app-owned. |
| AB | Shared About-page infrastructure added to `rk_ui`; app content remains caller-owned. |
| AC | Shared weather presentation infrastructure added to `rk_ui`; providers, API, location, and refresh logic remain app-owned. |
| AD | Shared Orac1es presentation infrastructure added to `rk_ui`; oracle generation and persistence remain app-owned. |
| AE | `rk_media` scaffolded for future media/render/audio/GIF contracts with no implementations. |
| AF | `rk_data` scaffolded for future persistence, audit, query, and synchronization contracts with no engines. |
| AG | App metadata, navigation, shell config, and capabilities consolidated in `rk_core`. |

## Shared vs App-Owned

Shared now includes:

- app identity and shell contracts
- bottom navigation and drawer primitives
- reusable splash/progress surfaces
- reusable dashboard/about/weather/oracle presentation infrastructure
- pure Dart contracts for AI, agents, media, and data

App-owned remains:

- primary feature workflows
- Firebase and environment configuration
- auth and secret/test access rules
- Hive boxes, adapters, migrations, and runtime persistence
- provider clients, API calls, location logic, file picking, media playback,
  rendering, and platform-specific integrations
- route tables, page indices, and navigation callbacks

## Not Wired Yet

The new dashboard, about, weather, oracle, media, and data contracts are not
fully wired into app feature implementations yet. App source should keep its
runtime behavior until a focused wiring phase explicitly moves one surface at a
time.

## Recommended Wiring Order

1. Close out and commit the shared foundation packages.
2. Wire `rk_core` consolidated app definitions into `rk_ui` shell config usage
   where the app already uses shared shell primitives.
3. Wire shared dashboard shell usage one app at a time, starting with the
   lowest-risk app surface.
4. Wire shared About shell usage one app at a time.
5. Wire weather and oracle presentation widgets only after each app's current
   runtime inputs are mapped.
6. Introduce `rk_media` and `rk_data` to app code only after stable DTO and
   provider boundaries are agreed.
