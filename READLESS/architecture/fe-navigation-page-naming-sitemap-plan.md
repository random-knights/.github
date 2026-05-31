# FE Navigation/Page Naming Sitemap Plan

Date: 2026-05-31

Scope: audit and planning only for FE navigation/page naming hardening. This file does not authorize runtime behavior changes, command execution work, package extraction, backend work, Firebase Function work, or data migration.

Hard rule for future phases: do not rename files, classes, methods, functions, services, models, packages, Firebase Functions, or Hive boxes. Future phases may change user-visible labels and route paths only.

Final naming corrections locked in:

- More is a popup/menu affordance only. Do not create `/more` and do not treat More as a page.
- XYZ is the default landing/home/dashboard experience. Root route `/` maps to XYZ. Do not create `/xyz`.
- Organization names: Random Knights, XYZ.
- Logo/brand names: Rand0m Kn1ghts, XYZ.
- Product landing: XYZ.
- AI chat destination: `random1y` / `Random1y`.
- AI agents destination: `knight1y` / `Knight1y`.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\dev-kitt\RUNBOOK.md`

Runbook update suggestion: none required for Phase 1. The runbook already says architecture notes belong directly in `C:\Projects\qa-kitt\.github\READLESS\architecture` and that audit/planning docs must not be created in `dev-kitt`.

## Current Navigation Inventory

### Current App Shell

Primary implementation:

- `C:\Projects\dev-kitt\apps\rand0m\lib\pages\home\home.dart`

Older or apparently unused drawer implementation:

- `C:\Projects\dev-kitt\apps\rand0m\lib\pages\home\drawer.dart`

The live `HomePage` builds its own private `_Rand0mDrawer` in `home.dart`. `drawer.dart` still defines a `NavDrawer`, but no current import/reference was found from `home.dart`. Treat it as legacy unless a later audit proves otherwise.

### Current Page Index Model

`HomePage` stores the active main content in `_currentIndex` and renders from `_pages`.

Current `_pages` order:

1. `_HomeCardPage` at index `0`
2. `AboutPage` at index `1`
3. `ChatPage` at index `2`
4. `Globe` at index `3`
5. `SecretValidatorPage` at index `4`
6. `AgentsPage` at index `5`
7. `HistoryPage` at index `6`
8. `OraclePage` at index `7`
9. `WeatherPage` at index `8`

Additional pushed pages:

- `DrawPage`, pushed by `MaterialPageRoute`
- `RelaxPage`, pushed by `MaterialPageRoute`
- `SpotifyPlayerPage`, pushed by `MaterialPageRoute`
- `FavoritesPage`, pushed by `MaterialPageRoute`
- `AgentChatPage`, pushed from the agents page
- `AgentsSettingsPage`, pushed from the agents page

### Current Bottom Navigation

Implementation:

- `_Rand0mBottomNav` in `home.dart`

Current order, labels, icons, and destinations:

| Order | Label | Icon | Selected icon | Destination |
| --- | --- | --- | --- | --- |
| 1 | Dashboard | `Icons.castle_sharp` | `Icons.castle_sharp` | `_HomeCardPage`, index `0` |
| 2 | About | `Icons.meeting_room_sharp` | `Icons.meeting_room_sharp` | `AboutPage`, index `1` |
| 3 | Chat | `CupertinoIcons.chat_bubble_2_fill` | same | `ChatPage`, index `2` |
| 4 | Connections | `Icons.language` | same | `Globe`, index `3` |
| 5 | More | `CupertinoIcons.wand_stars` | same | opens More bottom sheet |

Current slot mapping:

- `_idxHome` maps to `EcosystemNavSlot.dashboard`
- `_idxAbout` maps to `EcosystemNavSlot.about`
- `_idxChat` maps to `EcosystemNavSlot.primary`
- `_idxConnect` maps to `EcosystemNavSlot.connections`
- `_idxAgents`, `_idxHistory`, `_idxTest`, `_idxOracles`, `_idxWeather` map to `EcosystemNavSlot.more`

Notes:

- Current bottom nav order does not match the target future order.
- Current default landing is index `0`, currently labeled Dashboard.
- The future default landing should remain this page but be user-visible as `XYZ`.
- The future More icon should be an ellipsis/`...` icon, not a wand icon.

### Current More Menu

Implementation:

- `EcosystemMoreSheet` in `packages\rk_ui\lib\src\shell\ecosystem_more_sheet.dart`
- Additional Rand0m-specific list items are appended in `home.dart`.

Current `EcosystemMoreSheet` entries:

| Order | Label | Icon | Destination |
| --- | --- | --- | --- |
| 1 | Chat | `Icons.chat_bubble_outline` | `ChatPage`, index `2`, if chat is supported |
| 2 | Agents | `Icons.groups_outlined` | `AgentsPage`, index `5`, if agents are supported |
| 3 | Oracle/Test | `Icons.auto_awesome_outlined` | `OraclePage`, index `7` |
| 4 | Render | `Icons.movie_creation_outlined` | unavailable snackbar |
| 5 | Draw | `Icons.draw_outlined` | `DrawPage`, pushed route |
| 6 | Weather | `Icons.cloud_outlined` | `WeatherPage`, index `8` |

Current additional Rand0m-specific More entries:

| Order | Label | Icon | Destination |
| --- | --- | --- | --- |
| 7 | Test | `Icons.pest_control_rodent` | `SecretValidatorPage`, index `4` |
| 8 | History | `Icons.cruelty_free_outlined` | `HistoryPage`, index `6` |
| 9 | Favorites | `Icons.star_border_rounded` | `FavoritesPage`, pushed route |

Notes:

- Render is visible but currently unavailable.
- Test exists as a standalone More item and should move under `uti1ity`.
- History is visible in More and should be removed from visible navigation.
- Favorites is currently in More and should remain visible after the separator.

### Current App Drawer

Implementation:

- `_Rand0mDrawer` in `home.dart`

Current drawer order, labels, icons, and destinations:

| Order | Label | Icon | Destination |
| --- | --- | --- | --- |
| 1 | Home | `Icons.castle_sharp` | `_HomeCardPage`, index `0` |
| 2 | About | `Icons.meeting_room_sharp` | `AboutPage`, index `1` |
| 3 | AI vs AI | `CupertinoIcons.chat_bubble_2_fill` | `ChatPage`, index `2` via `onOpenChat` |
| 4 | Agents | `Icons.cruelty_free` | `AgentsPage`, index `5` |
| 5 | Connect | `Icons.language` | `Globe`, index `3` |
| 6 | History | `Icons.comment_bank` | `HistoryPage`, index `6` |
| 7 | Weather | `Icons.sunny_snowing` | `WeatherPage`, index `8` |
| 8 | Oracles | `CupertinoIcons.wand_stars` | `OraclePage`, index `7` |
| 9 | Test | `Icons.pest_control_rodent` | `SecretValidatorPage`, index `4` |
| 10 | Relax | `Icons.spa_outlined` | `RelaxPage`, pushed route |
| 11 | Spotify | `Icons.library_music_outlined` | `SpotifyPlayerPage`, pushed route |
| Footer 1 | Chat | `Icons.chat_bubble_outline` | `ChatPage`, index `2` |
| Footer 2 | Favorites | `Icons.star_border_rounded` | `FavoritesPage`, pushed route |
| Footer text | rand0m.ai | none | no route |

Notes:

- Drawer has duplicate chat access: `AI vs AI` in main list and `Chat` in footer.
- Drawer labels diverge from bottom nav and target naming.
- Drawer `Home` points to the Dashboard/XYZ landing page.
- History is visible and should be removed from visible navigation.
- Spotify should become `vibe`.
- Test should move into `uti1ity`.

### Current Route/Path Model

`MaterialApp` uses:

- `home: const _RootBackGuard(child: SignInGate(authenticatedBuilder: buildHomeStartupFlow))`

No named `routes`, `initialRoute`, `onGenerateRoute`, `Router`, or `go_router` model was found.

Current route behavior:

- The authenticated default landing is `HomePage(startIndex: 0)` through startup/splash flow.
- Main shell pages are index-swapped inside one `Scaffold` body, so they do not have independent URL paths.
- `DrawPage`, `RelaxPage`, `SpotifyPlayerPage`, `FavoritesPage`, `AgentChatPage`, and `AgentsSettingsPage` are pushed with anonymous `MaterialPageRoute`s, so they also do not have stable URL paths.
- Web deep links to `/about`, `/random1y`, `/uti1ity`, `/oracles`, `/knight1y`, `/c0nnect`, `/e1evate`, `/draw`, `/relax`, `/vibe`, `/weather`, or `/favorites` are not currently modeled in Flutter routing.
- Firebase Hosting rewrites all paths to `/index.html`, so server-side path support is likely compatible with future Flutter web routing, but the app must add client-side route parsing to avoid all paths landing on the default index.

Deep-link/web URL concerns:

- Browser refresh on a future subpath will load the app shell due to hosting rewrite, but without client-side route handling it will not select the intended destination.
- Index-swapped pages need a URL-to-index mapping or route shell abstraction before subdirectory URLs are reliable.
- Pushed pages need route names/paths if they are to be addressable and back/refresh-safe.
- Sign-in gate/startup flow must preserve the intended path across auth/startup before selecting the target page.

## Current Visible Page Inventory

| Current visible name | Widget/page | Current access | Current URL path |
| --- | --- | --- | --- |
| Dashboard/Home | `_HomeCardPage` inside `HomePage` | Bottom nav, drawer | none |
| About | `AboutPage` | Bottom nav, drawer | none |
| Chat / AI vs AI | `ChatPage` | Bottom nav, drawer, More, drawer footer | none |
| Connections / Connect | `Globe` inside `HomePage` | Bottom nav, drawer | none |
| Test | `SecretValidatorPage` | Drawer, More | none |
| Agents | `AgentsPage` | Drawer, More; also embedded in wide home layout | none |
| History | `HistoryPage` | Drawer, More | none |
| Oracles / Oracle/Test | `OraclePage` | Drawer, More | none |
| Weather | `WeatherPage` | Drawer, More, flipcard action | none |
| Draw | `DrawPage` | More, drawer legacy, flipcard action, app info icon | none |
| Relax | `RelaxPage` | Drawer | none |
| Spotify | `SpotifyPlayerPage` | Drawer | none |
| Favorites | `FavoritesPage` | Drawer footer, More, history widget | none |

Pages without dedicated subdirectory/route:

- All visible pages listed above.

Default landing behavior:

- `HomePage(startIndex: 0)` is the default after sign-in/startup.
- This should remain the default landing, but its user-facing name should become `XYZ`.

## Target Navigation Inventory

### Target Bottom Navigation

1. About
2. Random1y
3. XYZ, formerly Dashboard, keep as default landing
4. Knight1y
5. More, use `...`/ellipsis icon

Target bottom nav labels and destinations:

| Order | Target label | Destination | Recommended path |
| --- | --- | --- | --- |
| 1 | About | `AboutPage` | `/about` |
| 2 | Random1y | `ChatPage` | `/random1y` |
| 3 | XYZ | current `_HomeCardPage` | `/` |
| 4 | Knight1y | `AgentsPage` | `/knight1y` |
| 5 | More | More menu/sheet | popup only, no route |

### Target More Menu

Primary group:

- `random1y` with sublabel `ai chat`
- `uti1ity` with sublabel `render + test`
- `oracles` with sublabel `ai oracles`
- `knight1y` with sublabel `ai agents`
- `c0nnect` with sublabel `enhance`
- `e1evate` with sublabel `customize`

Secondary group:

- `draw`
- `relax`
- `vibe`, formerly Spotify
- `weather`

Footer/group:

- `Favorites`

Target More changes:

- Render becomes part of `uti1ity`.
- Test moves into `uti1ity`.
- History is removed from visible navigation.
- Spotify becomes `vibe`.

### Target App Drawer

Top:

- `Home` with sublabel/meaning `XYZ`; formerly Dashboard by name only
- `About`

Primary AI group:

- `random1y` with sublabel `ai chat`
- `uti1ity` with sublabel `render + test`
- `oracles` with sublabel `ai oracles`
- `knight1y` with sublabel `ai agents`
- `c0nnect` with sublabel `enhance`
- `e1evate` with sublabel `customize`

Utility group:

- `draw`
- `relax`
- `vibe`
- `weather`

Footer:

- `Favorites`
- Drawer footer text/content

## Naming Rule

Only AI-relevant app pages use lowercase/stylized naming in the Drawer and More menu:

- `random1y`
- `uti1ity`
- `oracles`
- `knight1y`
- `c0nnect`
- `e1evate`

Non-AI utility pages use plain names:

- `about`
- `draw`
- `relax`
- `vibe`
- `weather`
- `favorites`

Bottom navigation may use capitalization: About, Random1y, XYZ, Knight1y, More. Drawer and More menu entries should use the lowercase/stylized destination names except `Home`, `About`, and `Favorites`.

## Proposed Sitemap and Recommended URL Paths

Canonical paths:

| Path | Target visible name | Current implementation |
| --- | --- | --- |
| `/` | XYZ | `_HomeCardPage` within `HomePage`; default landing/home/dashboard experience |
| `/about` | about | `AboutPage` |
| `/random1y` | random1y | `ChatPage` |
| `/uti1ity` | uti1ity | future utility surface combining render + test |
| `/oracles` | oracles | `OraclePage` |
| `/knight1y` | knight1y | `AgentsPage` |
| `/c0nnect` | c0nnect | current `Globe`/Connect surface |
| `/e1evate` | e1evate | future customization/elevation surface |
| `/draw` | draw | `DrawPage` |
| `/relax` | relax | `RelaxPage` |
| `/vibe` | vibe | `SpotifyPlayerPage`, label/path only |
| `/weather` | weather | `WeatherPage` |
| `/favorites` | favorites | `FavoritesPage` |

No canonical route should be created for More. More remains a popup/menu affordance only.

Final route list:

- `/`
- `/about`
- `/random1y`
- `/uti1ity`
- `/oracles`
- `/knight1y`
- `/c0nnect`
- `/e1evate`
- `/draw`
- `/relax`
- `/vibe`
- `/weather`
- `/favorites`

No compatibility aliases are part of the final route list. If analytics, shared links, or previous public usage justify aliases in a later phase, evaluate them as an explicit scope change. Do not add `/xyz` or `/more` aliases.

## Recommended Phase Breakdown for Phases 2-5

### Phase 2: Label and Icon Hardening Only

Goal: change user-visible labels/icons only, without route/path changes.

Recommended work:

- Bottom nav order/labels/icons:
  - About
  - Random1y
  - XYZ
  - Knight1y
  - More with ellipsis icon
- Drawer labels and ordering to target shape.
- More menu labels and ordering to target shape.
- Rename user-visible Spotify label to `vibe`.
- Remove History from visible drawer and More navigation.
- Keep all class/file/function/model names unchanged.
- Keep `_currentIndex` model unchanged for this phase.

Likely files:

- `apps/rand0m/lib/pages/home/home.dart`
- Possibly `packages/rk_ui/lib/src/shell/ecosystem_more_sheet.dart` if the app continues using shared `EcosystemMoreSheet`; however package repos should not be modified unless a later phase explicitly authorizes package work. Prefer app-local More sheet override first.

Risk:

- Shared `rk_ui` labels currently encode `Chat`, `Agents`, `Oracle/Test`, and `Render`. If changed in the package, other apps could be affected. Prefer app-local label composition for Rand0m hardening.

### Phase 3: URL Path Model, No Visual Redesign

Goal: introduce client-side URL path selection for visible destinations without redesigning navigation.

Recommended work:

- Add app-local path-to-destination mapping.
- Ensure `/` selects the default landing.
- Do not introduce `/xyz`.
- Ensure browser refresh/deep links select the right page after auth/startup.
- Add named routes or a small Router/RouteInformationParser only if it can stay app-local and low-risk.
- Keep labels from Phase 2.
- Do not rename page classes/files.

Likely files:

- `apps/rand0m/lib/main.dart`
- `apps/rand0m/lib/pages/home/home.dart`
- Potentially a new app-local route helper under `apps/rand0m/lib/services/navigation/` or `apps/rand0m/lib/pages/home/`.

Risk:

- Startup/sign-in gate may swallow route intent unless the selected path is carried into `HomePage`.
- Pushed routes such as Favorites/Draw/Relax/Vibe need consistent back behavior on web.

### Phase 4: Utility Surface Consolidation

Goal: make `uti1ity` the visible destination for render + test without enabling new backend or command behavior.

Recommended work:

- Create or expose an app-local utility page/surface.
- Move current `SecretValidatorPage` access under `uti1ity`.
- Keep Render preview-only/unavailable unless already implemented safely.
- Keep command architecture paused.
- Keep History hidden from visible navigation.

Likely files:

- `apps/rand0m/lib/pages/home/home.dart`
- `apps/rand0m/lib/pages/agents/secret.dart`
- Potential new app-local page file if needed, but do not rename existing files/classes.

Risk:

- `SecretValidatorPage` is currently named as test/validator internally. Do not rename the class/file; wrap or route to it under the user-visible `uti1ity` label.

### Phase 5: Sitemap Polish and Compatibility Cleanup

Goal: polish URL consistency, labels, selected states, and web navigation edge cases.

Recommended work:

- Verify every target path has a selected nav/drawer/more state.
- Decide whether to add compatibility aliases.
- Ensure More remains a popup/menu affordance only, with no `/more` route.
- Ensure Favorites, Draw, Relax, Vibe, Weather paths are refresh-safe.
- Update QA architecture note with final closeout if needed.

Likely files:

- `apps/rand0m/lib/main.dart`
- `apps/rand0m/lib/pages/home/home.dart`
- Any app-local navigation helper introduced in Phase 3

Risk:

- More has no route by design. Future phases should not add a lightweight More page unless the naming/routing scope is explicitly changed.

## Files Likely to Change in Later Phases

App-local files likely to change:

- `apps/rand0m/lib/main.dart`
- `apps/rand0m/lib/pages/home/home.dart`
- `apps/rand0m/lib/pages/home/drawer.dart` only if confirmed still used or intentionally retired later
- `apps/rand0m/lib/pages/agents/secret.dart` if utility wrapping needs visible text adjustments
- Potential new app-local navigation helper, such as `apps/rand0m/lib/services/navigation/page_paths.dart`
- Potential new app-local utility wrapper page, if Phase 4 needs a composed `uti1ity` surface

Package files to avoid unless explicitly authorized later:

- `packages/rk_core/lib/src/navigation.dart`
- `packages/rk_core/lib/src/ecosystem_app.dart`
- `packages/rk_ui/lib/src/shell/ecosystem_more_sheet.dart`
- `packages/rk_ui/lib/src/shell/ecosystem_bottom_nav.dart`
- `packages/rk_ui/lib/src/shell/ecosystem_drawer.dart`

Reason: current phase instructions say not to modify package repos, and label/path hardening can likely be done app-locally first.

## Risk Notes

- Current bottom nav and drawer are private widgets in `home.dart`, but the More sheet is from `rk_ui`; changing shared package labels could leak into other ecosystem apps.
- The app currently uses `EcosystemApps.knight1y` capabilities inside Rand0m Home, which is why Agents/History/Test/Relax/Spotify are visible. Later phases should be careful to change visible navigation without accidentally changing app capability semantics.
- No named route model exists today. Adding URL paths is more than label work and should be isolated to Phase 3.
- All current visible pages lack dedicated URL subdirectories.
- History should be hidden from visible navigation, but existing history storage/widgets should remain intact.
- `SpotifyPlayerPage` can become visible `vibe` by label/path only. Do not rename class/file.
- `SecretValidatorPage` can become part of visible `uti1ity` by label/path only. Do not rename class/file.
- `Globe` currently stands in for Connect/Connections and can become visible `c0nnect` by label/path only.
- `e1evate` appears to be a target future page/surface rather than an existing dedicated page; future phases need to decide whether it maps to existing customization/settings behavior or a new app-local wrapper.

## Explicit Future-Phase Reminder

Future phases must not rename files, classes, methods, functions, services, models, packages, Firebase Functions, or Hive boxes. Only user-visible labels, icons, ordering, grouping, and route paths are in scope unless a later phase explicitly changes scope.
