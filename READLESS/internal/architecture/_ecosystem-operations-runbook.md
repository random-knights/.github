# Ecosystem Operations Runbook

Date: 2026-05-29

This runbook is the owner manual for building, validating, releasing,
deploying, maintaining, and troubleshooting the Random Knights ecosystem after
the architecture migration and standalone package extraction.

CM simplification note: `xyz` is now the only primary app repo, checked out
locally at `apps/rand0m`. Firebase single-app config planning is tracked in
`docs/architecture/firebase-single-app-config-plan.md`. Older four-app
references in this runbook should be treated as historical until the dedicated
docs simplification pass.

## Operating Model

Random Knights is a workspace of independent Git repositories coordinated from
`C:\Projects\dev-kitt`.

```text
C:\Projects\dev-kitt
|-- apps\
|   |-- knight1y\
|   |-- rand0m\
|   |-- out1ine\
|   `-- up10ad\
|-- packages\
|   |-- rk_core\
|   |-- rk_data\
|   |-- rk_media\
|   |-- rk_agents\
|   |-- rk_ai\
|   |-- rk_branding\
|   `-- rk_ui\
|-- docs\
`-- tooling\
```

The root repo owns architecture docs and workspace tooling. It ignores
`apps/*` and `packages/*`; those folders are nested repositories with their own
commits, remotes, tags, and release flow.

## Local Development

### Identities

| Area | GitHub account | `user.name` | `user.email` | SSH alias |
| --- | --- | --- | --- | --- |
| dev apps/packages/root | `dev-kitt` | `deve10per` | `deve10per@rand0m.ai` | `github-devkitt` |
| QA/support repos | `qa-kitt` | `eng1neer` | `random.knightly@gmail.com` | `github-qakitt` |

Set identity per repo, not globally, when working across both account families.

```powershell
git -C C:\Projects\dev-kitt\packages\rk_core config user.name deve10per
git -C C:\Projects\dev-kitt\packages\rk_core config user.email deve10per@rand0m.ai
```

### Repositories

Application repos:

- `xyz_rand0m`: public root/chat app for `rand0m.ai`.
- `xyz_up10ad`: ingest/upload/media workflow app for `up10ad.rand0m.ai`.
- `xyz_out1ine`: organize/plan/structured thinking app for `out1ine.rand0m.ai`.
- `xyz`: primary premium/power-user agent execution app. The local checkout
  remains `apps/rand0m` for now.

Package repos:

- `rk_core`: app IDs, shell contracts, navigation, environment key metadata.
- `rk_data`: data, audit, query, favorite, and persistence contracts.
- `rk_media`: media asset/source/type/playback contracts.
- `rk_agents`: agent definitions, metadata, availability, and action contracts.
- `rk_ai`: provider/model/runtime configuration contracts.
- `rk_branding`: colors, fonts, and brand primitives.
- `rk_ui`: shared Flutter UI widgets and presentation components.

Supporting repos:

- `abc_c1assr00m`: learn-from-the-ecosystem support repo.
- `abc_e1even`: do/practice repo with 11 examples and 11 challenges each.

### Package Workflow

Package source changes happen inside the nested package repo under
`C:\Projects\dev-kitt\packages\rk_*`.

1. Edit the package.
2. Run package validation.
3. Commit in the package repo.
4. Tag a release such as `v0.1.1`.
5. Push package branch and tag.
6. Update app/package Git dependencies only when the release is intended for
   consumers.

Apps consume package releases through Git-tag dependencies, not local paths.

```yaml
rk_ui:
  git:
    url: git@github-devkitt:random-knights/rk_ui.git
    ref: v0.1.0
```

Do not commit `dependency_overrides` or personal paths such as
`C:\Projects\dev-kitt-packages`.

### App Workflow

App changes happen inside the nested app repos under `apps/*`.

1. Confirm app repo branch and status.
2. Make the app change.
3. Run focused app validation.
4. Run root `validate-all.ps1` before cross-repo closeout.
5. Commit inside the app repo.

Root docs/tooling changes are committed in the root repo only.

## Testing

### Workspace Validation

Run from `C:\Projects\dev-kitt`:

```powershell
C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1
```

This runs:

1. `flutter pub get` for all four apps and all seven packages.
2. `flutter analyze` for all four apps and all seven packages.
3. nested app repo status checks.

The scripts use explicit paths. They do not require app/package source files to
be tracked by the root repo.

### Package Checklist

For Dart packages:

```powershell
C:\Projects\dev-kitt\flutter\bin\dart.bat pub get
C:\Projects\dev-kitt\flutter\bin\dart.bat analyze
C:\Projects\dev-kitt\flutter\bin\dart.bat test
```

For Flutter packages:

```powershell
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test
```

Package validation should leave the package repo clean. Remove generated
`.dart_tool`, `build`, `pubspec.lock`, and `.flutter-plugins-dependencies`
artifacts unless a package intentionally tracks them.

### App Checklist

From each app repo:

```powershell
C:\Projects\dev-kitt\flutter\bin\flutter.bat pub get
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test
```

If Flutter regenerates desktop plugin registrants during validation, review the
diff. Restore generated churn unless the dependency change intentionally
requires it.

## Package Management

Package repos currently use `v0.1.0` as the first extraction tag. Future
versions should use semantic tags:

- patch: compatible fixes/docs/tests
- minor: new compatible contracts/widgets
- major: breaking API changes

Release flow:

1. Update package source and README.
2. Update `version:` in `pubspec.yaml`.
3. Run package validation and tests.
4. Commit: `chore: release rk_ui v0.1.1`.
5. Tag: `git tag -a v0.1.1 -m "rk_ui v0.1.1"`.
6. Push branch and tag.
7. Update consumers from old tag to new tag.
8. Run `validate-all.ps1`.

Dependency update flow:

1. Change the consumer `pubspec.yaml` Git `ref`.
2. Run `flutter pub get` or `dart pub get`.
3. Confirm `pubspec.lock` resolves the expected commit.
4. Run focused validation.
5. Commit the consumer dependency update.

## GitHub Operations

Create package repos in the `random-knights` organization using the `rk_*`
names. Use `github-devkitt` remotes for dev-owned repos:

```powershell
git clone git@github-devkitt:random-knights/rk_core.git C:\Projects\dev-kitt\packages\rk_core
```

Expected package repo state:

- branch: `main`
- remote: `git@github-devkitt:random-knights/<repo>.git`
- release tags: `vX.Y.Z`
- clean working tree before and after release

Branch expectations:

- Package repos: `main` plus short-lived feature branches.
- App repos: `main` for stable apps; Knight1y may use active feature branches
  until merged.
- Root repo: docs/tooling branch policy is still local-first until root remote
  strategy is finalized.

Do not confuse app repositories with system agents. System agents such as
`rand0m`, `dai1y`, `knight1y`, and `aut0mate` are runtime concepts, not GitHub
application repository names.

## Asset Management

App-owned assets remain in app repos unless deliberately extracted.

| Asset type | Owner |
| --- | --- |
| agent images and flipped images | app assets today; metadata lives in `rk_agents` |
| books/history UI assets | Knight1y until a shared media/data contract needs them |
| videos/render inputs | Up10ad/app-owned unless promoted into `rk_media` contracts |
| audio cues | app-owned today; future metadata may use `rk_media` |
| icons and launcher images | app-owned |
| colors/fonts | `rk_branding` |
| shared widget visuals | `rk_ui` |

Rules:

- Do not move binary assets into shared packages without confirming package
  asset loading and consumer size impact.
- Keep generated build outputs out of commits.
- Agent metadata may reference asset paths, but app packaging owns the actual
  files until a dedicated asset package exists.

## Agent Operations

System agents are available ecosystem-wide:

- `rand0m`
- `dai1y`
- `knight1y`
- `aut0mate`

Knight1y-exclusive agents remain premium/app-specific unless explicitly
promoted. Future/productivity agents include:

- `temp1ate`: templates, boilerplates, scaffolding, reusable artifacts.
- `va1idat0r`: validation, review, consistency checks, quality gates.
- `eng1neer`: QA automation, test strategy, regression, coverage, CI quality.

Agent source of truth:

- metadata, availability, categories, capabilities, and preview actions:
  `rk_agents`
- prompts and runtime/provider behavior: app-owned unless intentionally
  migrated
- provider/model contracts: `rk_ai`
- live execution: disabled unless a dedicated execution phase enables it

Registration process:

1. Add or update `AgentDefinition` metadata in `rk_agents`.
2. Add capabilities and preview actions in `AgentActionRegistry`.
3. Add tests for availability and action metadata.
4. Release/tag `rk_agents`.
5. Update Knight1y dependency to the new tag.
6. Wire UI only after preserving existing chat behavior.

Do not activate live tools, provider routing, Hive writes, or Firebase function
calls from agent metadata alone.

## Firebase Operations

Current local Firebase configuration is centered on Rand0m:

- project ID: `randomknights-xyz`
- `.firebaserc`: default project `randomknights-xyz`
- `firebase.json`: Firestore rules/indexes, Rand0m Hosting, and Rand0m
  Functions source
- Hosting public directory: `apps/rand0m/build/web`
- Hosting rewrite: `**` to `/index.html`
- Firestore rules: `firestore.rules`
- Firestore indexes: `firestore.indexes.json`
- Functions source: `apps/rand0m/functions`, TypeScript, Node `24`

Known function surfaces:

- `generateAIResponse`: callable AI provider proxy direction.
- `runPageSpeedAudit`: callable Google PageSpeed audit proxy.
- `scanContentUrl`: callable URL/content signal scanner.
- `runAgentActionPreview`: callable non-destructive preview foundation for
  `eng1neer`, `temp1ate`, and `va1idat0r`.

The historical `eng1neer` Firestore trigger on `tasks/{taskId}` is deprecated
and should not be restored without a dedicated live-execution design.

Domains documented in app READMEs:

- `rand0m.ai`
- `knight1y.rand0m.ai`
- `out1ine.rand0m.ai`
- `up10ad.rand0m.ai`

Environment rules:

- Do not commit `.env` values.
- `.env.example` is the safe template.
- Local app-prefixed keys use `RANDOM_*`, `UPLOAD_*`, `OUTLINE_*`, and
  `KNIGHTLY_*`.
- Shared packages may derive key names; they must not read or store values.

Deployment commands must be run only from the relevant app repo and only after
explicit approval:

```powershell
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules,firestore:indexes
```

Function package scripts:

```powershell
npm --prefix C:\Projects\dev-kitt\apps\\rand0m\functions run build
npm --prefix C:\Projects\dev-kitt\apps\\rand0m\functions run deploy
npm --prefix C:\Projects\dev-kitt\apps\\rand0m\functions run logs
```

Rollback procedures:

- Hosting: redeploy the previous known-good build or use Firebase Hosting
  release rollback from the Firebase console.
- Functions: redeploy the previous known-good commit or disable the changed
  function if needed.
- Firestore rules/indexes: redeploy previous known-good rules/index files.
- Secrets: rotate provider keys and move backend functions to the prior secret
  version where supported.

Firebase cleanup needed:

- Confirm live Firebase projects, sites, targets, custom domains, and preview
  channels from the Firebase console.
- Decide whether `kn1ghts` project naming remains or gets a future cleanup
  layer; do not rename casually.
- Review the two Functions codebases and retire/merge dormant `engine` only
  after a function-specific audit.
- Move provider secrets toward Secret Manager and backend proxy boundaries.
- Confirm Firestore/Storage usage and rules before public release.

## Release Operations

### Package Release

1. Validate the package.
2. Commit in the package repo.
3. Tag `vX.Y.Z`.
4. Push `main` and tag.
5. Update consumers to the tag.
6. Run `validate-all.ps1`.
7. Commit consumer lockfile/pubspec updates.

### App Release

1. Confirm package dependency tags are intentional.
2. Run app `flutter pub get`, `flutter analyze`, and tests.
3. Run root `validate-all.ps1`.
4. Build the target app.
5. For Firebase-hosted web apps, deploy hosting only after approval.
6. Smoke test the public domain and Firebase fallback URL.
7. Watch logs and provider quotas.

### Deployment Sequence

Preferred order:

1. Package releases.
2. App dependency updates.
3. App validation.
4. Backend/Firebase Functions deployment, if needed.
5. Firestore rules/indexes, if needed.
6. Hosting deployment.
7. Smoke tests and log review.

### Rollback Sequence

1. Stop further deploys.
2. Identify failing layer: package, app, hosting, functions, Firestore, secrets.
3. Revert app dependency tag or app commit if package/app regression.
4. Redeploy previous hosting/functions/rules as needed.
5. Rotate or disable provider keys if there is any secret exposure concern.
6. Document the incident and add a regression check.

## Troubleshooting

### Package Dependency Issues

- Run `flutter pub get` in the consumer.
- Inspect `pubspec.lock` for Git URL, ref, and resolved commit.
- Confirm the package tag exists remotely:

```powershell
git -C C:\Projects\dev-kitt\packages\rk_ui ls-remote --tags origin v0.1.0
```

- Remove accidental `dependency_overrides`.
- Do not replace committed Git dependencies with local sibling paths.

### Git Issues

- Confirm which repo you are in:

```powershell
git rev-parse --show-toplevel
git status -sb
git remote -v
```

- Root status should not show package source changes.
- Package source changes belong in the nested package repo.
- App source changes belong in the nested app repo.

### Flutter Issues

- Run `flutter clean` only inside the affected app/package if generated state is
  suspect.
- Re-run `flutter pub get`.
- Restore generated plugin registrant churn unless intentionally changed.
- Keep the local Flutter SDK folder ignored by root.

### Firebase Issues

- Do not print secrets while debugging.
- Check root `.firebaserc` and `firebase.json`.
- Current active Firebase project: `randomknights-xyz`.
- Current active Hosting target/site: `rand0m -> ai-rand0m`.
- Current production domain target: `rand0m.ai`.
- Firebase Hosting currently reports `rand0m.ai` as `OWNERSHIP_ACTIVE` with an
  active certificate on `ai-rand0m`. If the domain ever serves stale content,
  check the Firebase Hosting custom-domain resource for `ai-rand0m` and verify
  the apex TXT record is `hosting-site=ai-rand0m`.
- Visible product branding is `Rand0m`; technical identifiers remain lowercase
  where required by package names, Firebase targets, app IDs, and the
  `rand0m.ai` domain.
- Build functions before deploy.
- Use logs after deploy:

```powershell
npm --prefix C:\Projects\dev-kitt\apps\\rand0m\functions run logs
```

- If a function fails after deploy, redeploy the previous known-good commit or
  disable the failing trigger while preserving data.

### Deployment Failures

- Confirm account/identity.
- Confirm Firebase project.
- Confirm build output exists.
- Confirm no stale generated files are committed.
- Roll back hosting or functions first, then investigate locally.

## Ecosystem Diagram

```text
GitHub random-knights
|-- apps
|   `-- xyz           -> primary rand0m app, target rand0m.ai
|-- packages
|   |-- rk_core       -> app IDs, navigation, environment metadata
|   |-- rk_data       -> data/favorite/audit contracts
|   |-- rk_media      -> media contracts
|   |-- rk_agents     -> agent definitions/actions/availability
|   |-- rk_ai         -> provider/model/runtime contracts
|   |-- rk_branding   -> colors/fonts
|   `-- rk_ui         -> shared Flutter widgets
`-- support
    `-- abc           -> learning and practice

Firebase
|-- Active project: randomknights-xyz
|-- Legacy live project: kn1ghts
|-- Hosting
|   |-- active: ai-rand0m
|   `-- parked legacy/custom-domain rollback state under review
|-- Functions
|   |-- generateAIResponse
|   |-- runPageSpeedAudit
|   |-- scanContentUrl
|   `-- runAgentActionPreview
|-- Firestore
|-- Storage
`-- Secret Manager target state

Agent ecosystem
|-- system: rand0m, dai1y, knight1y, aut0mate
|-- productivity: temp1ate
|-- quality: va1idat0r, eng1neer
`-- app-owned runtime/provider execution until explicitly migrated
```

## Known Gaps

- Legacy Firebase Hosting sites and the old `kn1ghts` project remain live until
  a dedicated cleanup phase retires or parks them safely.
- Root repo remote strategy remains undecided.
- Secret Manager migration is designed but not implemented.
- BYOK is future-only.
