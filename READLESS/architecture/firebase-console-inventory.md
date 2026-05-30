# Firebase Console Inventory

Date: 2026-05-29

Phase CJ-1 inventoried the legacy live Firebase state before cleanup, target
alignment, domain changes, deployments, or config edits. Phase CJ-2F resets the
active planning project to `randomknights-xyz`. No Firebase resources were
deployed, deleted, renamed, or modified in this documentation update.

## CLI Context

| Item | Result |
| --- | --- |
| Firebase CLI path | `C:\Users\kit\AppData\Roaming\npm\firebase.cmd` |
| Firebase CLI version | `15.15.0` |
| Logged-in account | `kn1ghts@rand0m.ai` |
| Local Firebase aliases | `apps/knight1y/.firebaserc` maps `default` to `kn1ghts` |
| Local Firebase configs | Only `apps/knight1y` has tracked Firebase config files |
| Active planning project | `randomknights-xyz` |

The CLI warned that the Flutter-generated `firebase.json` top-level `flutter`
property is unknown to the Firebase CLI. This warning did not block read-only
inventory commands.

## Commands Run

```powershell
where.exe firebase
firebase --version
firebase login:list
firebase projects:list --json
firebase use --project kn1ghts
firebase apps:list --project kn1ghts --json
firebase hosting:sites:list --project kn1ghts --json
firebase hosting:sites:get kn1ghts --project kn1ghts --json
firebase hosting:channel:list --site kn1ghts --project kn1ghts --json
firebase target --project kn1ghts
firebase functions:list --project kn1ghts --json
firebase firestore:databases:list --project kn1ghts --json
firebase firestore:indexes --project kn1ghts --json
firebase auth:export --project kn1ghts --format=json NUL
firebase apphosting:backends:list --project kn1ghts --json
firebase functions:secrets:get OPENAI_API_KEY --project kn1ghts --json
firebase functions:secrets:get GOOGLEAI_API_KEY --project kn1ghts --json
```

Commands that were attempted but unavailable in Firebase CLI `15.15.0`:

```powershell
firebase hosting:domains:list --project kn1ghts --json
firebase functions:secrets:list --project kn1ghts --json
firebase storage:buckets:list --project kn1ghts --json
```

`gcloud` was not found on PATH, so Storage bucket and Secret Manager listing
could not be completed with Google Cloud CLI.

## Projects Discovered

| Project ID | Project number | Display name | State | Default Hosting site |
| --- | --- | --- | --- | --- |
| `kn1ghts` | `221097774436` | `randomknights` | `ACTIVE` | `kn1ghts` |

Phase CJ-2F re-ran project inventory after the Firebase naming reset. The
logged-in CLI account saw:

| Project ID | Project number | Display name | State | Default Hosting site |
| --- | --- | --- | --- | --- |
| `randomknights-xyz` | `319266123648` | `randomknights-xyz` | `ACTIVE` | `randomknights-xyz` |

See `firebase-randomknights-xyz-local-wiring.md` for the active project wiring
plan.

## Firebase Apps Discovered

| Platform | Display name | App ID | Namespace |
| --- | --- | --- | --- |
| Android | `knight1y (android)` | `1:221097774436:android:07b5333e3fc0f70053be71` | `ai.rand0m.knight1y` |
| iOS | `knight1y (ios)` | `1:221097774436:ios:aa886eedc19fc68053be71` | `ai.rand0m.knight1y` |
| Web | `knight1y (web)` | `1:221097774436:web:19ef273a20811a3853be71` | generated web namespace |
| Web | `kn1ghts (windows)` | `1:221097774436:web:c91b1b963eb76ba753be71` | generated web namespace |

Only Knight1y apps are registered in the visible Firebase project.

## Hosting Sites And Channels

### Classic Firebase Hosting

| Site | Type | Default URL | Channels |
| --- | --- | --- | --- |
| `kn1ghts` | `DEFAULT_SITE` | `https://kn1ghts.web.app` | `live` |

Live channel details:

- URL: `https://kn1ghts.web.app`
- latest release time: `2026-05-27T13:04:23.546Z`
- release user: `knights@rand0m.ai`
- file count: `269`
- version bytes: `630518417`
- rewrite: `**` to `/index.html`
- deployment tool label: `cli-firebase`

No preview channels other than `live` were returned.

### Firebase App Hosting

`firebase apphosting:backends:list` returned one backend:

| Backend | Location | URI | App ID | Repo link |
| --- | --- | --- | --- | --- |
| `randomknights-platform` | `us-east4` | `randomknights-platform--kn1ghts.us-east4.hosted.app` | `1:221097774436:web:19ef273a20811a3853be71` | `random-knights-kn1ghts` |

This backend appears tied to the old `kn1ghts` repository link naming. It is a
live alignment item for the GitHub/Firebase cleanup plan.

### Custom Domains

The Firebase CLI version available in this environment does not expose a
`hosting:domains:list` command. Custom domain mappings require Firebase Console
manual verification.

## Domain Alignment

| Desired app repo | Desired domain | Live Firebase evidence | Status |
| --- | --- | --- | --- |
| `xyz_rand0m` | `rand0m.ai` | web app `rand0m-web` in `randomknights-xyz`; default site only | planned, target/domain pending |
| `xyz_up10ad` | `up10ad.rand0m.ai` | web app `up10ad-web` in `randomknights-xyz`; no per-app site yet | planned, target/domain pending |
| `xyz_out1ine` | `out1ine.rand0m.ai` | web app `out1ine-web` in `randomknights-xyz`; no per-app site yet | planned, target/domain pending |
| `xyz_knight1y` | `knight1y.rand0m.ai` | web app `knight1y-web` in `randomknights-xyz`; legacy project `kn1ghts` still live | migration pending, custom domain unverified |

The active Firebase project now has all four web apps, but per-app Hosting
sites, local targets, and custom domains are not wired yet.

## Functions Inventory

Three active Gen 2 functions were discovered.

| Function | Codebase | Runtime | Region | Trigger | State |
| --- | --- | --- | --- | --- | --- |
| `eng1neer` | `default` | `nodejs24` | `us-central1` | Firestore create event on `tasks/{taskId}` in `(default)` database, location `nam5` | `ACTIVE` |
| `generateAIResponse` | `default` | `nodejs24` | `us-central1` | callable HTTPS | `ACTIVE` |
| `hello` | `engine` | `nodejs22` | `us-central1` | HTTPS request | `ACTIVE` |

Runtime/config observations:

- `eng1neer` and `generateAIResponse` share codebase `default`.
- `hello` belongs to codebase `engine`.
- All functions allow ingress `ALLOW_ALL`.
- `eng1neer` and `generateAIResponse` use the same provider-related
  environment variable names:
  - `CLAUDEAI_API_KEY`
  - `GOOGLE_PAGESPEED_API_KEY`
  - `GOOGLEAI_API_KEY`
  - `GROKAI_API_KEY`
  - `OPENAI_API_KEY`
  - `WEATHER_API_KEY`
- The CLI returns environment variable values in raw function JSON. Values were
  intentionally not copied into this document.

Function alignment findings:

- `generateAIResponse` is live and matches the Knight1y AI proxy direction.
- `eng1neer` is live as a Firestore trigger and should be treated as a real
  function, not just placeholder code.
- `hello` is live from the legacy `engine` codebase and should be retired or
  formally owned in a cleanup phase.
- Provider keys appear to be deployed as function environment variables rather
  than Firebase/Google Cloud Secret Manager bindings.

## Firestore Inventory

| Item | Result |
| --- | --- |
| Database | `(default)` |
| Location | `nam5` |
| Type | `FIRESTORE_NATIVE` |
| Edition | `STANDARD` |
| Free tier | `true` |
| Realtime updates | enabled |
| Delete protection | disabled |
| Point-in-time recovery | disabled |
| Indexes | none |

Local rules require:

- signed-in user
- verified email
- email ending in `@rand0m.ai`

Rules are broad after that gate:

```text
match /{document=**} {
  allow read, write: if verifiedRand0mUser();
}
```

Collections implied by live/local code:

- `tasks`: used by the `eng1neer` Firestore trigger.

App-local data not currently represented as Firestore collections:

- Knight1y history: Hive box `history_events`
- Knight1y favorites: Hive box `favorite_response_records`
- agent config/settings/order: Hive-local services
- Up10ad upload/render workflow: no live Firebase Storage evidence found

## Storage Inventory

Local generated config references bucket:

- `kn1ghts.firebasestorage.app`

CLI limitations:

- `firebase storage:buckets:list` is not available in Firebase CLI `15.15.0`.
- `gcloud` is not installed on PATH.
- No `storage.rules` file exists locally.
- No direct `firebase_storage` package usage was found in app source during the
  local audit.

Storage status remains partially unknown until Firebase Console or `gcloud`
inventory is available.

## Authentication Inventory

`firebase auth:export --project kn1ghts --format=json NUL` succeeded and
reported:

- exported account count: `1`

No user record was written into the repository or copied into this document.

Local app/rules evidence:

- Knight1y uses Firebase Auth with Google sign-in.
- Knight1y app code restricts access to verified `@rand0m.ai` users.
- Firestore rules independently enforce verified `@rand0m.ai` access.

CLI limitations:

- Provider enablement, authorized domains, tenant settings, and OAuth details
  need Firebase Console manual verification.

## Secrets And Config Inventory

Firebase CLI `functions:secrets:get` returned `404` for:

- `OPENAI_API_KEY`
- `GOOGLEAI_API_KEY`

This indicates those Secret Manager entries are not present under those names,
or they have no versions available to the CLI account.

Live Functions metadata shows provider key names are present as function
environment variables for `eng1neer` and `generateAIResponse`. Values were not
documented.

Secret/config gaps:

- Provider keys should move from function environment variables to Secret
  Manager bindings.
- Existing keys should be rotated after migration because they have been
  handled as deploy-time environment variables and may have appeared in CLI
  metadata output.
- Future secret naming should follow app-prefixed/shared metadata conventions.

## Gaps Against Desired Ecosystem

Must resolve before Firebase cleanup:

1. Only `kn1ghts` is visible as a Firebase project.
2. Only Knight1y has registered Firebase apps.
3. Only default Hosting site `kn1ghts` exists in live CLI output.
4. App Hosting backend still references old repo-link naming
   `random-knights-kn1ghts`.
5. Desired domains are not verifiable from CLI:
   - `rand0m.ai`
   - `knight1y.rand0m.ai`
   - `out1ine.rand0m.ai`
   - `up10ad.rand0m.ai`
6. Classic Hosting has no explicit local target/site mapping.
7. `engine` codebase has an active `hello` function and needs an ownership
   decision.
8. Firestore rules are broad after verified-domain auth.
9. Storage rules and usage are undefined locally.
10. Provider secrets are not confirmed in Secret Manager.

## Manual Console Verification Questions

Use Firebase Console or approved `gcloud` inventory to answer:

1. Are custom domains attached to Hosting or App Hosting?
2. Which backend currently serves `knight1y.rand0m.ai`?
3. Are `rand0m.ai`, `out1ine.rand0m.ai`, and `up10ad.rand0m.ai` hosted outside
   Firebase?
4. Are there additional Firebase projects owned by another account?
5. Which Auth providers are enabled?
6. Which authorized domains are configured for Auth?
7. Does Storage have rules configured in the console?
8. Are there Secret Manager entries with app-prefixed names?
9. Is App Hosting still connected to the old `kn1ghts` GitHub repo name?
10. Should the `engine` App/Functions codebase be retired?

## Historical CJ-1 Next Phase Note

At the end of CJ-1, the recommended next phase was to design the Firebase
target architecture before any changes:

- choose project-per-app or shared-project/site-per-app
- decide whether classic Hosting or App Hosting is the target for each app
- define desired Hosting site IDs and targets
- define custom domain mapping
- define Functions codebase ownership
- define Firestore collection/rules model
- define Storage bucket/rules model
- define Secret Manager names and rotation plan

That guidance has since been superseded by CJ-2F, which resets the active
Firebase planning project to `randomknights-xyz`.

## Phase CJ-2F Update: randomknights-xyz Reset

The temporary `rand0m-ai`, `ruok`, and `ruok-10086` naming attempts are
abandoned. The active Firebase project is now `randomknights-xyz`.

Historical note: the abandoned `rand0m-ai` project may still contain temporary
Hosting sites created during the reset window. They are not active targets and
should be audited separately before any cleanup.

Active project baseline:

| Item | Result |
| --- | --- |
| Project ID | `randomknights-xyz` |
| Project number | `319266123648` |
| Public/Auth-facing name | `Random Knights, XYZ` |
| Support email | `knight@rand0m.ai` |
| Default Hosting URL | `https://randomknights-xyz.web.app` |
| Default Firebase app URL | `https://randomknights-xyz.firebaseapp.com` |

Web apps discovered:

| R.U.O.K. order | Display name | Platform | App ID |
| --- | --- | --- | --- |
| 1 | `rand0m-web` | Web | `1:319266123648:web:7cadc8b335136692f59b65` |
| 2 | `up10ad-web` | Web | `1:319266123648:web:3149ecd4d3b6d99af59b65` |
| 3 | `out1ine-web` | Web | `1:319266123648:web:a9c283525b22eb14f59b65` |
| 4 | `knight1y-web` | Web | `1:319266123648:web:1818e24f4b328ba7f59b65` |

Hosting baseline:

| Site | Type | Default URL | Channels |
| --- | --- | --- | --- |
| `randomknights-xyz` | `DEFAULT_SITE` | `https://randomknights-xyz.web.app` | `live` |

Service baseline:

- Firestore `(default)` exists in `nam5`.
- Firestore indexes are empty.
- App Hosting backends list is empty.
- Functions list returned `Failed to list functions for randomknights-xyz`.
- Storage is enabled according to manual setup context, but bucket/rules need
  Firebase Console or `gcloud` verification.
- Google Auth is enabled according to manual setup context; provider settings
  and authorized domains need console verification.

No `.firebaserc`, `firebase.json`, app source, domains, or deploy state were
changed for `randomknights-xyz` in CJ-2F.

## Phase CJ-3 Update: Hosting Sites And Local Targets

Phase CJ-3 created per-app Hosting sites using the accepted `ai-*` site ID
pattern. No deploys, custom-domain changes, app source changes, Firebase
deletes, or secret changes were made.

Simple site IDs rejected by Firebase as globally reserved:

- `rand0m`
- `up10ad`
- `out1ine`
- `knight1y`
- `random-ai`
- `rand0m-ai`

Hosting sites after CJ-3:

| R.U.O.K. order | Site | Type | Default URL | Target |
| --- | --- | --- | --- | --- |
| 1 | `ai-rand0m` | `USER_SITE` | `https://ai-rand0m.web.app` | `rand0m` |
| 2 | `ai-up10ad` | `USER_SITE` | `https://ai-up10ad.web.app` | `up10ad` |
| 3 | `ai-out1ine` | `USER_SITE` | `https://ai-out1ine.web.app` | `out1ine` |
| 4 | `ai-knight1y` | `USER_SITE` | `https://ai-knight1y.web.app` | `knight1y` |
| parked | `randomknights-xyz` | `DEFAULT_SITE` | `https://randomknights-xyz.web.app` | unused |

Root `.firebaserc` now maps:

| Target | Hosting site | App repo | Future domain |
| --- | --- | --- | --- |
| `rand0m` | `ai-rand0m` | `xyz_rand0m` | `rand0m.ai` |
| `up10ad` | `ai-up10ad` | `xyz_up10ad` | `up10ad.rand0m.ai` |
| `out1ine` | `ai-out1ine` | `xyz_out1ine` | `out1ine.rand0m.ai` |
| `knight1y` | `ai-knight1y` | `xyz_knight1y` | `knight1y.rand0m.ai` |
