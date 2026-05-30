# Firebase randomknights-xyz Local Wiring Plan

Date: 2026-05-29

Phase CJ-2F reset Firebase planning to the active project
`randomknights-xyz`. Phase CJ-3 created the per-app Hosting sites and root
local targets for the active project. Phase CJ-5 wired web Firebase options and
verified `@rand0m.ai` Google Auth gates into all four apps. The previous
`rand0m-ai` and `ruok` naming attempts are abandoned and should be treated as
historical only.

No deploys, custom-domain changes, Firebase deletes, or secret changes were
made in these phases.

CM-8 simplification note: the active product direction is now one primary app,
`xyz`, with local checkout path `apps/rand0m` and product name `rand0m`. Root
Firebase config now has one active Hosting target: `rand0m -> ai-rand0m`.
Four-app details below are retained only as historical CJ wiring context.

## Active Project

| Item | Value |
| --- | --- |
| Active Firebase project ID | `randomknights-xyz` |
| Project number | `319266123648` |
| Project/display name | `randomknights-xyz` |
| Public/Auth-facing name | `Random Knights, XYZ` |
| Support email | `knight@rand0m.ai` |
| Default Hosting URL | `https://randomknights-xyz.web.app` |
| Default Firebase app URL | `https://randomknights-xyz.firebaseapp.com` |

Manual setup already completed:

- Web apps added.
- Storage enabled.
- Google Auth enabled.
- Hosting enabled.
- No custom domains connected yet.

The old `kn1ghts` project remains live and must not be deleted until a
separate migration and rollback plan is approved.

Historical note: the abandoned `rand0m-ai` attempt may still contain temporary
Hosting sites from the reset window. They are not active targets and should be
audited separately before any cleanup.

## R.U.O.K. Application Order

Use this order in Firebase docs, diagrams, deployment planning, and target
creation:

| Order | App repo | Purpose | Desired domain |
| --- | --- | --- | --- |
| 1 | `xyz_rand0m` | Entry point | `rand0m.ai` |
| 2 | `xyz_up10ad` | Ingest content | `up10ad.rand0m.ai` |
| 3 | `xyz_out1ine` | Organize and plan content | `out1ine.rand0m.ai` |
| 4 | `xyz_knight1y` | Execute with agents | `knight1y.rand0m.ai` |

System agents remain runtime concepts and are not app repositories.

## CLI Visibility

Firebase CLI account:

- `kn1ghts@rand0m.ai`

Visible project:

| Project ID | Project number | Display name | State | Default Hosting site |
| --- | --- | --- | --- | --- |
| `randomknights-xyz` | `319266123648` | `randomknights-xyz` | `ACTIVE` | `randomknights-xyz` |

The CLI did not show `rand0m-ai` as an active accessible project during this
reset phase.

## Web Apps

| R.U.O.K. order | Display name | Platform | App ID |
| --- | --- | --- | --- |
| 1 | `kn1ghts-web` | Web | `1:319266123648:web:6ad3c36680bd1fdef59b65` |
| 2 | `rand0m-web` | Web | `1:319266123648:web:bd69a47b60b08957f59b65` |

No native Android, iOS, macOS, or Windows apps were inventoried in this phase.

## Hosting Baseline

| Site ID | Type | Default URL | Channels |
| --- | --- | --- | --- |
| `randomknights-xyz` | `DEFAULT_SITE` | `https://randomknights-xyz.web.app` | `live` |
| `ai-rand0m` | `USER_SITE` | `https://ai-rand0m.web.app` | not deployed |
| `ai-up10ad` | `USER_SITE` | `https://ai-up10ad.web.app` | not deployed |
| `ai-out1ine` | `USER_SITE` | `https://ai-out1ine.web.app` | not deployed |
| `ai-knight1y` | `USER_SITE` | `https://ai-knight1y.web.app` | not deployed |

Live channel:

- URL: `https://randomknights-xyz.web.app`
- created: `2026-05-30T01:37:35.099518962Z`
- retained release count: `2147483647`

The default `randomknights-xyz` site is intentionally parked/unused for app
deployments. App deployments should use the explicit targets below.

Simple site IDs were attempted and rejected as globally reserved:

- `rand0m`
- `up10ad`
- `out1ine`
- `knight1y`
- `random-ai`
- `rand0m-ai`

Approved working site IDs use the `ai-*` pattern.

## Service Baseline

Firestore:

| Database | Location | Type | Edition | Indexes |
| --- | --- | --- | --- | --- |
| `(default)` | `nam5` | `FIRESTORE_NATIVE` | `STANDARD` | none |

Additional Firestore details:

- free tier: `true`
- realtime updates: enabled
- point-in-time recovery: disabled
- delete protection: disabled

App Hosting:

- `firebase apphosting:backends:list --project randomknights-xyz --json`
- result: empty list

Cloud Functions:

- `firebase functions:list --project randomknights-xyz --json`
- result: `Failed to list functions for randomknights-xyz`

Interpretation:

- No Functions are expected yet in the fresh active project.
- Do not deploy or migrate Functions until the Functions ownership and Secret
  Manager plan is approved.

Storage:

- Storage is enabled according to manual setup context.
- Firebase CLI `15.15.0` in this environment does not expose
  `storage:buckets:list`.
- Bucket and rules require Firebase Console or `gcloud` verification.

Auth:

- Google Auth is enabled according to manual setup context.
- Firebase CLI auth export was used only as a baseline check and no user data
  was retained in the repo.
- Authorized domains and provider details still require Firebase Console
  verification.

## Local Config Strategy

Root `.firebaserc` and `firebase.json` now point to `randomknights-xyz` for
single-site Hosting orchestration. App source now includes web-only
`randomknights-xyz` Firebase options for `rand0m-web` and a verified
`@rand0m.ai` Google Auth gate. Custom domains were not changed.

Current local rule:

- `randomknights-xyz` is the active planning project.
- `rand0m-ai`, `ruok`, and `ruok-10086` are abandoned historical names only.
- `apps/rand0m` may still contain old `kn1ghts` config in legacy/native or
  Functions paths until those areas receive dedicated migration phases.
- Do not deploy from the old `kn1ghts` config into the new project by accident.

## Web Auth And Firebase Options

| App repo | Web app ID | Auth gate | Firebase web project |
| --- | --- | --- | --- |
| `xyz` / `rand0m` | `1:319266123648:web:bd69a47b60b08957f59b65` | app-local `SignInGate` | `randomknights-xyz` |

Every app requires:

- Google Auth.
- a verified email address.
- an email address ending with `@rand0m.ai`.

The generated `DefaultFirebaseOptions` files are intentionally web-only for
this deployment rehearsal. Native Firebase config remains a later migration
task.

## Applied Hosting Targets

Root `.firebaserc` maps one active target:

| Target | Hosting site | App repo | Future domain |
| --- | --- | --- | --- |
| `rand0m` | `ai-rand0m` | `xyz` | `rand0m.ai` |

Root `firebase.json` defines the target with the app build output path:

| Target | Public build path |
| --- | --- |
| `rand0m` | `apps/rand0m/build/web` |

## Recommended Next Phase

Verify `https://ai-rand0m.web.app`, complete manual auth checks, then plan the
`rand0m.ai` custom-domain cutover.

Commands applied in CJ-3:

```powershell
firebase hosting:sites:create ai-rand0m --project randomknights-xyz
firebase hosting:sites:create ai-up10ad --project randomknights-xyz
firebase hosting:sites:create ai-out1ine --project randomknights-xyz
firebase hosting:sites:create ai-knight1y --project randomknights-xyz
```

```powershell
firebase target:apply hosting rand0m ai-rand0m --project randomknights-xyz
firebase target:apply hosting up10ad ai-up10ad --project randomknights-xyz
firebase target:apply hosting out1ine ai-out1ine --project randomknights-xyz
firebase target:apply hosting knight1y ai-knight1y --project randomknights-xyz
```

Active deploy command:

```powershell
firebase deploy --only hosting:rand0m --project randomknights-xyz
```

## Risks And Blockers

- Custom domains are not connected yet.
- Firebase CLI cannot list custom domains in this environment.
- Storage bucket and rules need manual or `gcloud` verification.
- Functions are not initialized or not listable for `randomknights-xyz`.
- Auth provider settings and authorized domains need manual console
  verification.
- Native/mobile Firebase config has not been regenerated for
  `randomknights-xyz`.
- Old `kn1ghts` project still hosts live Knight1y resources and must not be
  deleted until migration is complete.
