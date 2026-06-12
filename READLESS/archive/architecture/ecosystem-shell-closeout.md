# Ecosystem Shell Closeout

Status: Phase Y closeout audit, May 28, 2026.

This document closes the first shared ecosystem shell milestone. The four apps now share the same navigation and drawer contracts through `rk_core` and `rk_ui`, while keeping app-owned runtime behavior local.

## Final App Roles

| App | Role | Primary destination | Domain |
| --- | --- | --- | --- |
| `rand0m` | Public/root chat landing app | Chat | `rand0m.ai` |
| `knight1y` | Premium/power-user app | Agents | `knight1y.rand0m.ai` |
| `out1ine` | Oracle/lightweight future test app | Orac1es | `out1ine.rand0m.ai` |
| `up10ad` | Creative render/upload tool | Render | `up10ad.rand0m.ai` |

## Bottom Navigation Contract

Final shared order:

`Dashboard | About | Primary | Connections | More`

| App | Primary label | Primary contract | Shared shell config | Shared bottom nav | Startup destination |
| --- | --- | --- | --- | --- | --- |
| `rand0m` | Chat | `EcosystemPrimaryDestination.chat` | Yes | Yes | Splash opens `HomePage(startIndex: 2)` |
| `knight1y` | Agents | `EcosystemPrimaryDestination.agents` | Yes | Yes | Existing auth/splash/progress flow opens the home/dashboard shell |
| `out1ine` | Orac1es | `EcosystemPrimaryDestination.testOracle` | Yes | Yes | Splash opens `HomePage(startIndex: 2)` |
| `up10ad` | Render | `EcosystemPrimaryDestination.render` | Yes | Yes | Splash opens `HomePage(startIndex: 2)` |

## Drawer Contract

Shared top section:

`Dashboard | About | Primary | Connections | More`

Shared ecosystem tools:

`Draw | Weather | Orac1es`

| App | Shared drawer | App definition | App-specific section | Preserved destinations |
| --- | --- | --- | --- | --- |
| `rand0m` | `EcosystemDrawer` | `EcosystemApps.rand0m` | None | Draw, Weather, Orac1es, existing footer links |
| `knight1y` | `EcosystemDrawer` | `EcosystemApps.knight1y` | History, Test, Relax, Spotify | Chat, Draw, Weather, Orac1es, secret/test behavior, existing auth controls and footer links |
| `out1ine` | `EcosystemDrawer` | `EcosystemApps.out1ine` | Reserved future Test Lab | Draw, Weather, Orac1es, existing footer links |
| `up10ad` | `EcosystemDrawer` | `EcosystemApps.up10ad` | Reserved future Media Studio | Draw, Weather, Orac1es, render/upload workflow, existing footer links |

Drawer routing remains callback-based inside each app. `rk_ui` does not import app pages or call app routes directly.

## Package Ownership

| Package | Ownership |
| --- | --- |
| `rk_core` | Pure Dart ecosystem contracts: app identity, app roles, primary destinations, navigation slots, drawer destinations, app capability metadata. No Flutter, Firebase, Hive, assets, generated code, or app imports. |
| `rk_branding` | Branding primitives: colors, fonts, logos/metadata where appropriate. |
| `rk_ui` | Flutter shared UI: shell widgets, bottom nav, drawer, dashboard scaffold, more sheet, splash/progress primitives, and visual components. No app-specific imports or runtime services. |
| `rk_agents` | Agent definitions and metadata contracts only. |
| `rk_ai` | AI provider/model/pricing/usage contracts only. |

## Remaining Intentional Drift

- Splash wrappers are still app-local, but they consume shared `rk_ui` progress primitives.
- Dashboard bodies remain app-local. `EcosystemDashboard` is available as a shared scaffold, not yet the common runtime dashboard.
- App-specific drawer headers, footers, external links, and auth controls are passed into the shared drawer from each app.
- `Chat`, `Agents`, and `Render` are modeled as primary destinations and capability flags, not as drawer-specific destinations.
- More-sheet unavailable/external destinations are still configured inside each app.
- Legacy app-local drawer files may remain until a cleanup phase verifies they are no longer exported or referenced.

## Validation

`tooling/scripts/validate-all.ps1` completed successfully.

Validated:

- `flutter pub get` for all four apps and all root packages.
- `flutter analyze` for `apps/knight1y`, `apps/rand0m`, `apps/out1ine`, and `apps/up10ad`.
- `flutter analyze` for `packages/rk_branding`, `packages/rk_ui`, `packages/rk_agents`, `packages/rk_ai`, and `packages/rk_core`.

Flutter generated plugin registrant churn from validation was restored in the nested app repos.

## Readiness Verdict

The ecosystem shell is ready for the next extraction wave. Bottom navigation and drawer surfaces are consistently wired across all four apps through `rk_core` contracts and `rk_ui` widgets, with app-specific runtime behavior preserved.

## Next Extraction Targets

1. Shared splash/progress wrappers.
2. Shared dashboard modules: Flipcard, Status, Weather summary, Connections, and cross-app launcher.
3. Shared About assets and content block components.
4. Shared Weather shell and service contracts.
5. Shared Orac1es shell/assets.
6. Future `rk_core` route metadata for typed cross-app destinations.
7. Future `rk_data` and `rk_media` packages for data/media boundaries.

## Recommended Phase Z

```text
Begin Ecosystem Shell Phase Z: Shared Splash/Progress Extraction.

Working directory:
C:\Projects\dev-kitt

Goal:
Extract the app-local splash/progress wrapper patterns into shared rk_ui splash/progress shell primitives while preserving current startup destinations and auth behavior.

Write targets:
- packages/rk_ui
- apps/rand0m
- apps/out1ine
- apps/up10ad
- apps/knight1y only after the simple apps are validated
- docs/architecture/ecosystem-shell-closeout.md

DO NOT:
- touch Firebase/.env
- change startup destinations
- change auth behavior
- change package IDs
- change app runtime features

Tasks:
1. Compare current app-local DoorSplashScreen and HomeProgressBar implementations.
2. Extract shared rk_ui splash/progress primitives with callback-based next-page builders.
3. Wire rand0m first, then out1ine/up10ad, then knight1y.
4. Run tooling/scripts/validate-all.ps1.
```
