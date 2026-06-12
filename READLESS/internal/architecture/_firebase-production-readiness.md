# Firebase Production Readiness

Date: 2026-05-30

This document tracks readiness for moving the `randomknights-xyz` Firebase
deployment path from temporary Hosting URLs toward custom domains.

CM-8 simplification note: `xyz` is now the only primary app, exposed locally as
`apps/rand0m` and deployed through the single active Hosting target
`rand0m -> ai-rand0m`. Older four-app details in this document are retained as
deployment-rehearsal history only.

## Active Firebase Project

- Project ID: `randomknights-xyz`
- Public/Auth-facing name: `Random Knights, XYZ`
- Support email: `knight@rand0m.ai`
- Custom domains: not connected yet
- Legacy project: `kn1ghts` remains live and untouched

## Hosting Targets

| App repo | Target | Site | Temporary URL | Future domain |
| --- | --- | --- | --- | --- |
| `xyz` | `rand0m` | `ai-rand0m` | `https://ai-rand0m.web.app` | `rand0m.ai` |

Parked rollback/stale sites remain live until a later cleanup phase:
`ai-up10ad`, `ai-out1ine`, `ai-knight1y`, and the default
`randomknights-xyz` site.

## Access Policy

Every app must enforce the same policy before public custom domains are
connected:

- Google sign-in only.
- `emailVerified == true`.
- Email suffix must be `@rand0m.ai`.
- Firestore rules must enforce the same verified-domain gate.
- Functions must enforce the same verified-domain gate before any sensitive
  provider or data operation is migrated.

## CJ-7 Boot And Branding Readiness

Phase CJ-7/CJ-7B addressed deployment-readiness findings:

- `ai-up10ad` initially showed a deprecated Chromium
  `Intl.v8BreakIterator` boot path, then failed with a Firebase Auth platform
  channel error. The temporary text-segmentation shim was removed. The durable
  fix was to clean stale generated Flutter state after the app rename and make
  Firebase initialization mandatory before the auth gate subscribes to Auth
  state.
- Firebase Console OAuth authorized domains must include:
  `ai-rand0m.web.app`, `ai-up10ad.web.app`, `ai-out1ine.web.app`,
  `ai-knight1y.web.app`, `randomknights-xyz.web.app`,
  `randomknights-xyz.firebaseapp.com`, and `localhost`.
- App icon and visible pre-auth branding were audited against the current
  lowercase app names.

Current visible pre-auth title target:

| App | Expected title | Status |
| --- | --- | --- |
| `xyz_rand0m` | `rand0m` | Configured |
| `xyz_up10ad` | `up10ad` | Configured |
| `xyz_out1ine` | `out1ine` | Configured |
| `xyz` | `knight1y` | Configured |

Current app icon mapping:

| App | Expected source icon | Status |
| --- | --- | --- |
| `xyz_rand0m` | `assets/0r.png` | Configured |
| `xyz_up10ad` | `assets/0u.png` | Configured |
| `xyz_out1ine` | `assets/0o.png` | Added as the out1ine icon source |
| `xyz` | `assets/0k.png` | Configured |

`assets/0o.png` was added for out1ine from the existing out1ine-specific icon
image that had been stored under the older `0r.png` filename. Shared asset
cleanup remains a later package/branding task.

## Manual Auth Verification Checklist

Run this checklist against all four temporary URLs before connecting custom
domains:

- Unauthenticated visitor sees the sign-in gate.
- Verified `@rand0m.ai` Google user can enter the app.
- Non-`@rand0m.ai` Google user is rejected after sign-in.
- Unverified Google user is rejected if a safe test account is available.
- Firestore access is denied for unauthenticated and non-domain users.

## Remaining Production Blockers

- Interactive Google Auth verification still requires manual browser testing
  with valid test accounts.
- CJ-7 static verification confirms all temporary URLs return `200`, expose
  the expected lowercase browser metadata, include the auth-gate text in the
  deployed bundles, and keep the `@rand0m.ai` domain literal in the deployed
  bundles. CJ-7B also confirms up10ad no longer serves a custom
  `Intl.v8BreakIterator` shim from `index.html`; generated Flutter runtime
  capability detection still references that API internally.
- Functions have not been migrated to `randomknights-xyz` and must receive
  server-side verified-domain checks before sensitive operations are exposed.
- Custom domains are intentionally disconnected until temporary URL auth and
  boot checks pass.
- The old `kn1ghts` project remains live until a separate cleanup phase.

## CJ-7C Readiness Update

Phase CJ-7C completed another app-local branding and auth-platform pass:

- Generated favicon sets were applied from `favicons/<app>` into each app's
  `web/` directory.
- All four deployed manifests now use the generated
  `android-chrome-192x192.png` and `android-chrome-512x512.png` icons.
- `rand0m` and `out1ine` were cleaned and rebuilt so their web builds register
  the Firebase Auth and Google Sign-In web plugins correctly.
- The deployed `rand0m` and `out1ine` bundles now include the Firebase Auth web
  popup implementation marker.
- App-local bottom navigation and drawer sources were checked for current
  unintended diffs; none were found during CJ-7C.

Shared asset consolidation, including any future move of duplicated web icons
into a shared package, remains deferred.

## CM-12 Custom Domain Cutover Status

Date: 2026-05-30

Production domain target:

- `rand0m.ai`

Active Firebase target:

- project: `randomknights-xyz`
- Hosting target: `rand0m`
- Hosting site: `ai-rand0m`
- temporary URL: `https://ai-rand0m.web.app`

Current DNS records observed:

| Host | Type | Value | Status |
| --- | --- | --- | --- |
| `rand0m.ai` | `A` | `199.36.158.100` | Correct for Firebase Hosting |
| `rand0m.ai` | `TXT` | `hosting-site=ai-rand0m` | Correct for new active site |
| `rand0m.ai` | `TXT` | `google-site-verification=j-uIqfFla0YHMP82O61vVcvBlYlILc71SUJ2QSLzXY8` | Present |
| `rand0m.ai` | `TXT` | `v=spf1 include:dc-aa8e722993._spfm.rand0m.ai ~all` | Preserved |
| `www.rand0m.ai` | `CNAME` | `rand0m.ai` | Present |

Cutover actions completed:

- Confirmed `rand0m.ai` was still serving the legacy `kn1ghts` Hosting content.
- Confirmed `ai-rand0m` already has a Firebase Hosting custom-domain resource
  for `rand0m.ai`.
- Removed only the legacy custom-domain association from
  `projects/kn1ghts/sites/kn1ghts/customDomains/rand0m.ai`.
- Left the old `kn1ghts` project and Hosting site intact.

Current Firebase status:

- `ai-rand0m` host state: `HOST_ACTIVE`
- `ai-rand0m` ownership state: `OWNERSHIP_ACTIVE`
- certificate state: `CERT_ACTIVE`
- no required DNS updates are currently reported by Firebase Hosting.

Current URL verification:

| URL | Status | Result |
| --- | --- | --- |
| `https://ai-rand0m.web.app` | `200` | Serves current `Rand0m` app |
| `https://rand0m.ai` | `200` | Serves current `Rand0m` app |

CM-12 branding refresh:

- Visible product branding is `Rand0m`.
- Technical identifiers remain lowercase: `rand0m`, `rand0m-web`,
  `ai-rand0m`, and `rand0m.ai`.
- Cross-platform launcher icons now derive from
  `C:\Projects\dev-kitt\favicons\out1ine\0o.png`, copied into the app as
  `apps/rand0m/assets/0r.png`.

## Next Recommended Phase

Run a final manual auth pass on both `https://ai-rand0m.web.app` and
`https://rand0m.ai`, then decide when to remove or park legacy Firebase hosting
resources that are no longer part of the production path.

## CJ-7D Restore Update

Phase CJ-7D restored the Oracle and Knight1y navigation presentation before
custom domains:

- Oracle routes now use the original full-page crystal-ball collection
  experience again.
- The incorrect grey-card Oracle shell was bypassed in app Oracle pages.
- Knight1y local bottom navigation and drawer icons were restored to the
  original icon language from the primary app main branch.
- Current navigation order and routing behavior were not changed.
- All four temporary Hosting URLs returned `200` after redeploy.
- Oracle image assets were verified from all four deployed temporary sites.

Manual auth and visual verification remain required before custom domains are
connected.
