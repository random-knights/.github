# Firebase Ecosystem Alignment

Date: 2026-05-29

This audit maps local Firebase configuration against the final Random Knights
ecosystem architecture. It began as a repository-file audit and was updated
after the active Firebase project reset to `randomknights-xyz`. It does not
deploy, delete, rename, or read secret values.

Active Firebase project for new planning:

- project ID: `randomknights-xyz`
- public/Auth-facing name: `Random Knights, XYZ`
- support email: `knight@rand0m.ai`
- default URLs:
  - `https://randomknights-xyz.web.app`
  - `https://randomknights-xyz.firebaseapp.com`

## Desired Ecosystem Mapping

| App repo | Desired domain | Purpose |
| --- | --- | --- |
| `xyz_rand0m` | `rand0m.ai` | Public root experience, launcher, ecosystem entry point |
| `xyz_up10ad` | `up10ad.rand0m.ai` | Uploads, media workflows, rendering/upload pipeline |
| `xyz_out1ine` | `out1ine.rand0m.ai` | Outlines, planning, structured thinking, experiments |
| `xyz_knight1y` | `knight1y.rand0m.ai` | Agents, premium/power-user experience, command center |

System agents are separate runtime concepts:

- `rand0m`
- `dai1y`
- `knight1y`
- `aut0mate`

Do not rename application repositories based on system agent names.

## Files Audited

Tracked Firebase files were found only under `apps/knight1y`:

- `apps/knight1y/.firebaserc`
- `apps/knight1y/firebase.json`
- `apps/knight1y/firestore.rules`
- `apps/knight1y/firestore.indexes.json`
- `apps/knight1y/functions/package.json`
- `apps/knight1y/functions/src/index.ts`
- `apps/knight1y/engine/package.json`
- `apps/knight1y/engine/index.js`
- generated client config references in `apps/knight1y/lib/firebase_options.dart`
- Android Firebase client config in `apps/knight1y/android/app/google-services.json`

No local `firebase.json`, `.firebaserc`, `firestore.rules`,
`firestore.indexes.json`, or `storage.rules` files were found for:

- `apps/rand0m`
- `apps/out1ine`
- `apps/up10ad`

## Firebase Projects Discovered

| Project ID | Evidence | Notes |
| --- | --- | --- |
| `randomknights-xyz` | Firebase CLI inventory, manual project reset context | Active Firebase project for new R.U.O.K. architecture planning. |
| `kn1ghts` | `apps/knight1y/.firebaserc`, `firebase.json`, `firebase_options.dart`, `google-services.json` | Current locally configured Firebase project for Knight1y. |

No local config references Firebase projects for `rand0m`, `out1ine`, or
`up10ad`.

## Domain And Hosting Alignment

Local files do not declare Firebase Hosting targets or explicit Hosting site
IDs. `apps/knight1y/firebase.json` declares a single hosting config with:

- public directory: `build/web`
- rewrite: `**` to `/index.html`
- no `target`
- no `site`
- no custom domain mapping in local config

| App repo | Desired domain | Current Firebase project | Current hosting target | Current hosting site | Current custom domain | Status | Cleanup needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `xyz_rand0m` | `rand0m.ai` | `randomknights-xyz` | `rand0m` | `ai-rand0m` | none connected | Target ready | Build/config/domain wiring still pending. |
| `xyz_up10ad` | `up10ad.rand0m.ai` | `randomknights-xyz` | `up10ad` | `ai-up10ad` | none connected | Target ready | Build/config/domain wiring still pending. |
| `xyz_out1ine` | `out1ine.rand0m.ai` | `randomknights-xyz` | `out1ine` | `ai-out1ine` | none connected | Target ready | Build/config/domain wiring still pending. |
| `xyz_knight1y` | `knight1y.rand0m.ai` | `kn1ghts` locally; `randomknights-xyz` for migration | `knight1y` | `ai-knight1y` | README/docs only | Migration target ready | Keep old project live until app config/domain migration is validated. |

Primary mismatch: the desired four-app domain model is documented and local
deploy targets now exist, but generated app Firebase config, custom domains,
and first deploys are not wired yet.

## Functions Audit

### `functions` Codebase

Evidence:

- source: `apps/knight1y/functions`
- codebase in `firebase.json`: `default`
- runtime in `package.json`: Node `24`
- build script: `tsc`
- deploy script: `npm run build && firebase deploy --only functions`
- predeploy: `npm --prefix "$RESOURCE_DIR" run build`
- dependencies include `axios`, `cors`, `dotenv`, `firebase-admin`, and
  `firebase-functions`

Exports in `functions/src/index.ts`:

| Function | Trigger | Purpose | Notes |
| --- | --- | --- | --- |
| `generateAIResponse` | callable HTTPS v2 | AI provider proxy for Gemini, OpenAI, Claude, and Grok | Uses `process.env` key names and provider HTTP APIs. Needs Secret Manager and auth/rate-limit hardening before production scale. |
| `eng1neer` | Firestore `onDocumentCreated("tasks/{taskId}")` | Updates `tasks/{taskId}` when `assignedTo == "eng1neer"` | Live-agent-adjacent/dormant path. Should stay isolated until agent execution strategy is hardened. |

Provider key names referenced by code:

- `GOOGLEAI_API_KEY`
- `OPENAI_API_KEY`
- `CLAUDEAI_API_KEY`
- `GROKAI_API_KEY`

No secret values were read or printed.

### `engine` Codebase

Evidence:

- source: `apps/knight1y/engine`
- codebase in `firebase.json`: `engine`
- runtime in `package.json`: Node `22`
- predeploy: `npm --prefix "$RESOURCE_DIR" run lint`
- export: `hello` HTTPS request returning a static response

Status: legacy or placeholder. It is safe to audit further, but it should not be
deployed, deleted, or merged without a dedicated Functions cleanup phase.

### Function Risks

- `generateAIResponse` currently accepts provider/model/prompt from the client.
  It should validate auth, provider allowlists, model allowlists, payload size,
  and rate limits before production use.
- Provider error details are returned in callable error metadata. Review
  redaction before production.
- `dotenv.config()` is convenient locally, but production should bind secrets
  through Firebase/Google Cloud Secret Manager.
- `eng1neer` writes to `tasks/{taskId}` and assumes task schema fields such as
  `assignedTo`, `payload.route`, `status`, and `result`.
- Two Functions codebases increase cleanup and deployment risk until ownership
  is clarified.

## Firestore Audit

Local Firestore config:

- database: `(default)`
- location in `firebase.json`: `nam5`
- rules file: `firestore.rules`
- indexes file: `firestore.indexes.json`
- indexes: none declared

Rules:

```text
allow read, write: if signed in, email verified, and email matches *@rand0m.ai
```

Collections implied by code:

| Collection/data area | Evidence | Storage layer |
| --- | --- | --- |
| `tasks` | `eng1neer` trigger on `tasks/{taskId}` | Firestore |
| agent history | `HistoryService` and `history_events` Hive box | local Hive, not Firestore |
| favorites | `favorite_response_records` Hive box | local Hive, not Firestore |
| agent config/settings/order | Hive services | local Hive, not Firestore |
| upload/render data | Up10ad services | app-local workflow, no Firebase Storage evidence locally |

Firestore mismatch:

- Rules are broad for all collections once a verified `@rand0m.ai` user is
  authenticated.
- `tasks` is the only Firestore collection implied by local Functions code.
- No app-specific collection model is documented in local rules or indexes.
- Favorites/history are currently Hive-local, not cloud-synced.

Cleanup direction:

1. Document intended Firestore collections and ownership before adding more
   cloud state.
2. Narrow rules per collection before public or multi-app Firestore usage.
3. Add required indexes only after query shapes are known.
4. Keep Hive-local favorites/history out of Firestore until sync semantics are
   designed.

## Storage Audit

Local findings:

- No `storage.rules` file was found.
- `firebase_options.dart` and `google-services.json` reference bucket
  `kn1ghts.firebasestorage.app`.
- No direct `firebase_storage` app usage was found in the local source audit.
- Up10ad has media/render/upload UI and services, but local evidence does not
  show Firebase Storage integration.

Storage mismatch:

- A bucket exists in generated Firebase client config, but local rules and usage
  are not defined.
- Upload/render storage ownership is unclear.

Cleanup direction:

1. Confirm Storage bucket state in Firebase console.
2. Add or document `storage.rules` before any production upload workflow uses
   Firebase Storage.
3. Decide whether Up10ad uploads use Firebase Storage, another backend, or local
   browser/client workflows.
4. Keep app assets separate from user-uploaded media.

## Auth Audit

Knight1y local auth:

- uses Firebase Auth
- uses Google sign-in
- restricts access to verified `@rand0m.ai` users in app code
- Firestore rules also require verified `@rand0m.ai`

Evidence:

- `AuthService.allowedDomain = 'rand0m.ai'`
- web Google provider passes `hd: rand0m.ai`
- native Google sign-in uses `hostedDomain: rand0m.ai`
- `isAllowedUser` requires `user.emailVerified` and email suffix

Auth mismatch:

- Knight1y is protected by domain logic locally.
- The public `rand0m` app has no local Firebase Auth config in this workspace.
- It is not yet clear whether `out1ine` and `up10ad` should be public,
  authenticated, admin-only, or staged.

Cleanup direction:

1. Confirm enabled Firebase Auth providers in the console.
2. Confirm authorized domains include the desired custom domains.
3. Decide auth model per app:
   - `rand0m`: public by default, gated features only if needed
   - `up10ad`: likely gated before upload/render workflows become production
   - `out1ine`: public experiment or gated test app, to decide
   - `knight1y`: verified `@rand0m.ai`
4. Move critical authorization checks server-side for privileged Functions.

## Comparison To Current Architecture Docs

| Source doc | Alignment | Gap |
| --- | --- | --- |
| `ecosystem-operations-runbook.md` | Correctly states Knight1y is the only locally configured Firebase project and flags console cleanup. | This audit adds detailed domain/hosting mapping and explicit mismatch table. |
| `package-repository-closeout.md` | Package extraction is independent of Firebase. | No Firebase package impact. |
| `github-cleanup-plan.md` | Correctly says preserve Firebase project naming until a separate Firebase phase. | App repo rename work should not imply Firebase project/site rename work. |
| `production-hardening.md` | Correctly recommends Secret Manager and backend proxies. | `generateAIResponse` needs concrete hardening and redaction work before production scale. |

## Desired Firebase State

Target state should be explicit, even if implemented in phases:

| App repo | Domain | Firebase project/site direction |
| --- | --- | --- |
| `xyz_rand0m` | `rand0m.ai` | Use `randomknights-xyz` with an explicit hosting site/target for the public entry point. |
| `xyz_up10ad` | `up10ad.rand0m.ai` | Use `randomknights-xyz` with explicit hosting/storage ownership before upload/render workflows become production. |
| `xyz_out1ine` | `out1ine.rand0m.ai` | Use `randomknights-xyz` with explicit hosting target. Do not infer from the old `orac1es` repo name. |
| `xyz_knight1y` | `knight1y.rand0m.ai` | Migrate from project `kn1ghts` deliberately. Use explicit hosting target/site. Keep auth-gated command center. |

Recommended hosting target pattern, if Firebase Hosting is used for all apps:

```text
rand0m-public
up10ad-app
out1ine-app
knight1y-app
```

The exact Firebase site IDs must come from the Firebase console or approved CLI
audit before config changes.

## Deployment Commands

Local commands, to be run only in an approved deploy phase:

```powershell
cd C:\Projects\dev-kitt\apps\knight1y
firebase use kn1ghts
flutter build web
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules,firestore:indexes
```

Functions-specific:

```powershell
npm --prefix C:\Projects\dev-kitt\apps\knight1y\functions run build
npm --prefix C:\Projects\dev-kitt\apps\knight1y\functions run deploy
npm --prefix C:\Projects\dev-kitt\apps\knight1y\functions run logs
```

Do not deploy the legacy `engine` codebase until its purpose is confirmed.

## Rollback Commands

Rollback should target the layer that changed:

```powershell
# Rebuild/redeploy a known-good web commit.
cd C:\Projects\dev-kitt\apps\knight1y
flutter build web
firebase deploy --only hosting

# Redeploy known-good functions.
npm --prefix C:\Projects\dev-kitt\apps\knight1y\functions run build
firebase deploy --only functions:generateAIResponse

# Redeploy known-good Firestore rules/indexes.
firebase deploy --only firestore:rules,firestore:indexes
```

For Hosting, Firebase console rollback to a previous hosting release is also a
valid emergency path.

## Secrets And Secret Manager

Current local code uses environment variables for provider keys. The target
state is:

- local `.env` remains ignored and developer-only
- `.env.example` remains safe placeholders only
- Functions use Secret Manager bindings for provider keys
- logs contain provider/model metadata, never key values
- shared packages continue to derive key names only

Recommended logical secret names:

```text
production/KNIGHTLY/OPENAI_API_KEY
production/KNIGHTLY/GOOGLEAI_API_KEY
production/KNIGHTLY/CLAUDEAI_API_KEY
production/KNIGHTLY/GROKAI_API_KEY
staging/KNIGHTLY/OPENAI_API_KEY
```

Extend the same pattern only after each app has a confirmed Firebase/backend
deployment model.

## Major Mismatches

Must fix:

1. Desired four-domain structure is not represented by local Firebase Hosting
   targets/sites.
2. Only Knight1y has local Firebase config; the other app hosting/deployment
   reality is unknown.
3. `generateAIResponse` needs auth, allowlists, rate limits, redaction, and
   Secret Manager before production-scale use.
4. Firestore rules are broad once a verified `@rand0m.ai` user is signed in.
5. Storage bucket exists in generated config but has no local rules or clear
   app usage.

Should fix:

1. Decide whether project ID `kn1ghts` remains as an implementation detail.
2. Retire or document the `engine` Functions codebase.
3. Add explicit hosting targets after live Firebase console state is confirmed.
4. Document Auth model per app before public deployment.
5. Add collection-specific Firestore rules as cloud data models stabilize.

Nice to have:

1. Add Firebase emulator scripts for local Functions/Firestore testing.
2. Add smoke-test checklist per domain.
3. Add a deployment matrix for staging and production.
4. Add a periodic Firebase config drift audit.

## Recommended Cleanup Order

1. Console-backed inventory phase:
   - list Firebase projects
   - list hosting sites and custom domains
   - list functions and codebases
   - list Auth providers and authorized domains
   - list Firestore/Storage resources
2. Decide app hosting ownership:
   - Firebase Hosting for all apps, or mixed hosting
   - project-per-app vs shared project with site-per-app
3. Harden Knight1y Functions:
   - Secret Manager
   - auth validation
   - provider/model allowlists
   - rate limits
   - redacted errors
4. Clarify `engine`:
   - keep, rename, merge, or remove in a dedicated phase
5. Add explicit hosting targets/sites to config.
6. Add or confirm Storage rules before upload workflows use Firebase Storage.
7. Narrow Firestore rules per collection.
8. Deploy one app/domain at a time with rollback checkpoints.

## Next Phase Recommendation

Begin a read-only Firebase console inventory phase:

```text
Begin Firebase Cleanup Phase CK: Console Inventory.

Goal:
Use Firebase CLI or console exports to list projects, hosting sites, custom
domains, functions, Auth providers, Firestore databases, Storage buckets, and
preview channels.

Rules:
No deploys.
No deletes.
No renames.
No secret value reads.
No config changes.
```
