# Firebase Deployment Rehearsal And Auth Gate Audit

Date: 2026-05-29

Phase CJ-4 identified auth/config blockers for the first `randomknights-xyz`
deployment path. Phase CJ-5 resolved the Flutter web auth-gate and Firebase
options blockers without connecting custom domains, deleting old Firebase
resources, exposing secrets, or deploying.

## Required Access Policy

All four apps must enforce:

- Google Auth only.
- `user.email_verified == true`.
- `user.email` ends with `@rand0m.ai`.
- Flutter app gate before sensitive UI.
- Firestore rules gate before data access.
- Functions gate before sensitive operations.

Do not rely on UI gating alone.

## App Auth Gate Status

| App | Flutter Firebase init | Flutter Auth gate | Verified `@rand0m.ai` gate | Status |
| --- | --- | --- | --- | --- |
| `xyz_rand0m` | Present | Present via app-local `SignInGate` | Present via `AuthService.isAllowedUser` | Ready for temporary deploy verification |
| `xyz_up10ad` | Present | Present via app-local `SignInGate` | Present via `AuthService.isAllowedUser` | Ready for temporary deploy verification |
| `xyz_out1ine` | Present | Present via app-local `SignInGate` | Present via `AuthService.isAllowedUser` | Ready for temporary deploy verification |
| `xyz` | Present | Present via existing `SignInGate` | Present via `AuthService.isAllowedUser` | Ready for temporary deploy verification |

Auth-gate strategy:

- Knight1y kept its existing `AuthService` and `SignInGate`.
- Rand0m, Up10ad, and Out1ine received a minimal app-local copy of the same
  gate pattern instead of adding Firebase Auth dependencies to a shared package
  during the deployment rehearsal.
- Every app initializes Firebase before showing the startup splash/home flow.
- Every app blocks unauthenticated, unverified, and non-`@rand0m.ai` users in
  the Flutter app shell.
- Every app now uses a web-only generated `DefaultFirebaseOptions` file for its
  matching `randomknights-xyz` web app.

Native/mobile Firebase options were not regenerated in this phase. The
generated options intentionally support the web deployment rehearsal only.

## Firestore Rule Status

Root Firebase config now includes local Firestore rules for `randomknights-xyz`:

```text
allow read, write: if request.auth != null
  && request.auth.token.email_verified == true
  && request.auth.token.email.matches('.*@rand0m\\.ai$');
```

These rules were deployed to `randomknights-xyz` in Phase CJ-6.

The same rule shape already existed in `apps/rand0m/firestore.rules` for the
legacy `kn1ghts` project. The root rule should be deployed before any
`randomknights-xyz` feature depends on Firestore.

## Function Gate Status

No Functions were migrated or deployed in this phase.

Known legacy function gap:

- `apps/rand0m/functions/src/index.ts` contains callable/function code under
  the old `kn1ghts` project.
- Functions must enforce verified `@rand0m.ai` server-side before any sensitive
  provider operation is migrated to `randomknights-xyz`.

## Build Rehearsal Results

All four Flutter web builds completed:

| App | Command | Result |
| --- | --- | --- |
| `xyz_rand0m` | `flutter build web` in `apps/rand0m` | Pass |
| `xyz_up10ad` | `flutter build web` in `apps/up10ad` | Pass |
| `xyz_out1ine` | `flutter build web` in `apps/out1ine` | Pass |
| `xyz` | `flutter build web` in `apps/rand0m` | Pass |

Build warnings:

- Flutter reported deprecated `web/index.html` initialization template usage in
  at least `rand0m`.
- Flutter reported WebAssembly dry-run incompatibilities for plugins that use
  `dart:html` / `dart:js_util`.
- These warnings did not block classic JavaScript web builds.

## Deploy Decision

Hosting deploys were intentionally not run.

Reason:

- CJ-5 was the auth/config wiring phase, not the deploy phase.
- All four apps now pass the Flutter auth-gate and Firebase web-options
  readiness checks for a Hosting rehearsal.
- The next phase should deploy the four Hosting targets and verify the temporary
  URLs block unauthenticated, unverified, and non-`@rand0m.ai` users.
- Custom domains must remain disconnected until temporary URL verification
  succeeds.

## Temporary URLs Reserved For Later Verification

Use these for CJ-6 temporary Hosting verification:

- `https://ai-rand0m.web.app`
- `https://ai-up10ad.web.app`
- `https://ai-out1ine.web.app`
- `https://ai-knight1y.web.app`

## CJ-6 Deployment Rehearsal Checklist

1. Confirm all four apps still analyze and build for web.
2. Deploy Firestore rules before any feature uses Firestore in
   `randomknights-xyz`.
3. Deploy Hosting targets.
4. Verify unauthenticated and non-domain access is blocked at the temporary
   URLs before connecting custom domains.
5. Add server-side auth checks before any Functions migration.

## Future Deploy Commands

Run in CJ-6 after confirming the checked-in build outputs are current:

```powershell
firebase deploy --only hosting:rand0m --project randomknights-xyz
firebase deploy --only hosting:up10ad --project randomknights-xyz
firebase deploy --only hosting:out1ine --project randomknights-xyz
firebase deploy --only hosting:knight1y --project randomknights-xyz
```

## Phase CJ-6 Deployment Results

Date: 2026-05-30

Validation was rerun in R.U.O.K. order before deployment:

| App | `flutter pub get` | `flutter analyze` | `flutter build web` |
| --- | --- | --- | --- |
| `xyz_rand0m` | Pass | Pass | Pass |
| `xyz_up10ad` | Pass | Pass | Pass |
| `xyz_out1ine` | Pass | Pass | Pass |
| `xyz` | Pass | Pass | Pass |

Firestore deployment:

```powershell
firebase deploy --only firestore:rules,firestore:indexes --project randomknights-xyz
```

Result: pass. Rules compiled, indexes deployed, and the verified
`@rand0m.ai` Firestore rule was released to `cloud.firestore`.

Hosting deployments:

| Target | Site | Temporary URL | Result |
| --- | --- | --- | --- |
| `rand0m` | `ai-rand0m` | `https://ai-rand0m.web.app` | Deployed |
| `up10ad` | `ai-up10ad` | `https://ai-up10ad.web.app` | Deployed |
| `out1ine` | `ai-out1ine` | `https://ai-out1ine.web.app` | Deployed |
| `knight1y` | `ai-knight1y` | `https://ai-knight1y.web.app` | Deployed |

HTTP verification:

| URL | HTTP status | Flutter bootstrap served |
| --- | --- | --- |
| `https://ai-rand0m.web.app` | `200` | Yes |
| `https://ai-up10ad.web.app` | `200` | Yes |
| `https://ai-out1ine.web.app` | `200` | Yes |
| `https://ai-knight1y.web.app` | `200` | Yes |

Deployed bundle verification:

| Bundle | HTTP status | Contains auth gate text | Contains `rand0m.ai` domain literal |
| --- | --- | --- | --- |
| `https://ai-rand0m.web.app/main.dart.js` | `200` | Yes | Yes |
| `https://ai-up10ad.web.app/main.dart.js` | `200` | Yes | Yes |
| `https://ai-out1ine.web.app/main.dart.js` | `200` | Yes | Yes |
| `https://ai-knight1y.web.app/main.dart.js` | `200` | Yes | Yes |

Interactive auth verification:

- The app code enforces Google Auth, `emailVerified == true`, and
  `@rand0m.ai` email suffixes before rendering authenticated app content.
- The current automation session could not complete an interactive Google sign
  in because the in-app browser surface was unavailable and no test Google
  credentials were provided.
- Manual verification is still required for:
  - unauthenticated browser sessions seeing the sign-in gate,
  - verified `@rand0m.ai` users entering the apps,
  - non-`@rand0m.ai` Google users being rejected after sign-in.

Custom domains remained disconnected. The old `kn1ghts` project was not
deleted. Functions were not migrated or deployed.

## Phase CJ-7 Boot And Branding Follow-Up

Date: 2026-05-30

Manual review after CJ-6 found two readiness issues:

- `ai-up10ad` could fail during Flutter boot with a browser-side
  `Intl.v8BreakIterator` deprecation path in `main.dart.js`.
- `rand0m` needed its deployed web icon refreshed so it uses the `0r.png`
  application icon instead of the Knight1y `0k.png` icon.

CJ-7/CJ-7B changes:

- Removed the temporary up10ad `Intl.v8BreakIterator` bootstrap shim after the
  follow-up error showed the real deployed boot blocker was Firebase Auth
  startup, not text segmentation.
- Cleaned up10ad generated Flutter build state after the app rename and made
  Firebase initialization mandatory before the auth gate subscribes to
  Firebase Auth state.
- Recorded the required Firebase Console OAuth authorized domains:
  `ai-rand0m.web.app`, `ai-up10ad.web.app`, `ai-out1ine.web.app`,
  `ai-knight1y.web.app`, `randomknights-xyz.web.app`,
  `randomknights-xyz.firebaseapp.com`, and `localhost`.
- Updated rand0m's web favicon reference to use `favicon.png`, matching the
  generated rand0m `0r.png` web icon.
- Standardized visible pre-auth/browser branding to lowercase application
  names: `rand0m`, `up10ad`, `out1ine`, and `knight1y`.
- Confirmed launcher icon configuration for `rand0m`, `up10ad`, and
  `knight1y`.
- Added the missing out1ine `assets/0o.png` source icon name and pointed
  out1ine launcher icon configuration at it.

Manual auth verification remains required:

- Unauthenticated visitors should see the sign-in gate.
- Verified `@rand0m.ai` Google users should enter.
- Non-`@rand0m.ai` Google users should be rejected.
- Unverified users should be rejected if testable.

Custom domains remained disconnected. The old `kn1ghts` project was not
deleted. Functions were not migrated.

### CJ-7 Validation And Redeploy Results

Validation was rerun in R.U.O.K. order:

| App | `flutter pub get` | `flutter analyze` | `flutter build web` |
| --- | --- | --- | --- |
| `xyz_rand0m` | Pass | Pass | Pass |
| `xyz_up10ad` | Pass | Pass | Pass |
| `xyz_out1ine` | Pass | Pass | Pass |
| `xyz` | Pass | Pass | Pass |

Hosting redeploys:

| Target | Temporary URL | Result |
| --- | --- | --- |
| `rand0m` | `https://ai-rand0m.web.app` | Deployed |
| `up10ad` | `https://ai-up10ad.web.app` | Deployed |
| `out1ine` | `https://ai-out1ine.web.app` | Deployed |
| `knight1y` | `https://ai-knight1y.web.app` | Deployed |

Post-deploy static verification:

| URL | HTTP status | Title | Manifest name | Bundle auth text | Bundle domain literal |
| --- | --- | --- | --- | --- | --- |
| `https://ai-rand0m.web.app` | `200` | `rand0m` | `rand0m` | Yes | Yes |
| `https://ai-up10ad.web.app` | `200` | `up10ad` | `up10ad` | Yes | Yes |
| `https://ai-out1ine.web.app` | `200` | `out1ine` | `out1ine` | Yes | Yes |
| `https://ai-knight1y.web.app` | `200` | `knight1y` | `knight1y` | Yes | Yes |

`https://ai-up10ad.web.app` no longer serves a custom
`Intl.v8BreakIterator` shim in `index.html`. The generated Flutter runtime
still contains its built-in break-iterator capability detection. All four
deployed pages return `200`, use lowercase browser titles, and include the
shared auth-gate text in the compiled bundle.

Interactive Google sign-in still requires manual browser verification with
valid test accounts.

## Phase CJ-7C Auth Platform And Favicon Follow-Up

Date: 2026-05-30

Manual review after CJ-7B found two remaining readiness issues:

- `rand0m` and `out1ine` could hit the fallback
  `signInWithPopup() is only supported on web based platforms` implementation
  in deployed web builds.
- The temporary Hosting sites needed the generated per-app favicon sets applied
  consistently.

Root cause:

- The app auth code already used `kIsWeb` and the same popup flow shape as the
  working `up10ad` and `knight1y` apps.
- The failing deployed bundles were produced from stale generated Flutter build
  state. Their generated web plugin registrants did not include the
  `FirebaseAuthWeb` and `GoogleSignInPlugin` registrations, so Firebase Auth
  calls fell through to the platform-interface fallback.

Fix:

- Ran `flutter clean` for `rand0m` and `out1ine`, then rebuilt all four apps.
- Confirmed the rebuilt `rand0m` and `out1ine` web plugin registrants include
  `FirebaseAuthWeb.registerWith(registrar)` and
  `GoogleSignInPlugin.registerWith(registrar)`.
- Confirmed the deployed `rand0m` and `out1ine` bundles contain the Firebase
  Auth web popup implementation marker, `firebase_auth.signInWithPopup`.
- Copied the generated favicon sets from `favicons/<app>` into each app's
  `web/` directory and updated each `manifest.json` to use
  `android-chrome-192x192.png` and `android-chrome-512x512.png`.

Favicon and manifest status:

| App | Manifest name | Manifest icons | Favicon status |
| --- | --- | --- | --- |
| `xyz_rand0m` | `rand0m` | `android-chrome-192x192.png`, `android-chrome-512x512.png` | `200` |
| `xyz_up10ad` | `up10ad` | `android-chrome-192x192.png`, `android-chrome-512x512.png` | `200` |
| `xyz_out1ine` | `out1ine` | `android-chrome-192x192.png`, `android-chrome-512x512.png` | `200` |
| `xyz` | `knight1y` | `android-chrome-192x192.png`, `android-chrome-512x512.png` | `200` |

Bottom navigation and drawer icon audit:

- No current uncommitted app-local bottom navigation or drawer icon diffs were
  found in the four app repos during CJ-7C.
- No navigation semantics were changed in this phase.
- Any remaining difference from pre-shared-shell icon choices appears to live
  in the shared `rk_ui` shell package and should be handled as a separate
  package release if exact legacy icon restoration is still desired.

Shared ecosystem asset consolidation remains deferred. The generated favicon
sets are applied app-locally for this deployment rehearsal only.

CJ-7C redeployed all four Hosting targets after successful builds. Static
verification confirmed all four temporary URLs return `200`, all four deployed
manifests expose the expected per-app names, and the favicon/icon assets are
served from each temporary site.

## Phase CJ-7D Oracle And Navigation Restore

Date: 2026-05-30

CJ-7D restored the Knight1y Oracle experience and icon language before custom
domain work.

Reference files compared from the primary app main branch:

- `lib/pages/oracles.dart`
- `lib/pages/home.dart`
- `lib/pages/drawer.dart`

Restore summary:

- Restored the Oracle page to the clean full-page crystal-ball collection
  experience.
- Bypassed the incorrect grey-box `EcosystemOracleCard` presentation in app
  Oracle routes.
- Restored the Knight1y bottom navigation and drawer icon assignments to the
  original visual language while preserving the current shared-shell route
  order and behavior.
- Kept favicon/auth changes from CJ-7C intact.
- Kept shared asset consolidation deferred; Oracle assets remain app-local for
  this deployment rehearsal.

Deployment result:

| Target | URL | Status |
| --- | --- | --- |
| `rand0m` | `https://ai-rand0m.web.app` | `200` |
| `up10ad` | `https://ai-up10ad.web.app` | `200` |
| `out1ine` | `https://ai-out1ine.web.app` | `200` |
| `knight1y` | `https://ai-knight1y.web.app` | `200` |

Oracle asset verification:

| App | `assets/oracles/0rac1e.png` |
| --- | --- |
| `rand0m` | `200` |
| `up10ad` | `200` |
| `out1ine` | `200` |
| `knight1y` | `200` |

Interactive manual checks still required:

- Confirm the sign-in gate appears before app access.
- Confirm verified `@rand0m.ai` users can enter.
- Confirm non-`@rand0m.ai` users are rejected.
- Visually confirm the restored crystal-ball Oracle collection on each app
  route that exposes Oracles.
