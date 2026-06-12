# Single-App Naming Consolidation Plan

Date: 2026-05-30

## Decision

The ecosystem is consolidating to one primary app.

Final target identity:

| Layer | Target |
| --- | --- |
| Brand | `Random Knights, XYZ` |
| Product/app name | `rand0m` |
| Production domain | `rand0m.ai` |
| Canonical GitHub repo | `git@github-devkitt:random-knights/xyz.git` |
| Former local folder | `apps/knight1y` |
| Current local folder | `apps/rand0m` |

CM-7 update: the local folder rename has been completed.

CM-8 update: the local Firebase config now uses the single active Hosting target
`rand0m -> ai-rand0m`, and the app uses the `rand0m-web` Firebase web app.

CM-9 update: the Dart package/import identity now uses `rand0m`. Remaining
`knight1y` references should be reviewed by meaning: system-agent concepts,
legacy Firebase/native IDs, historical docs, and parked rollback infrastructure
are intentionally not renamed by the Dart package identity phase.

## Reference Audit

Searched references:

- `knight1y`
- `Knight1y`
- `KNIGHT1Y`
- `kn1ghts`
- `apps/knight1y`
- `apps/rand0m`
- `ai-knight1y`
- `knight1y.rand0m.ai`

Important current findings:

- `apps/rand0m` is the only local app folder.
- `apps/rand0m` remote is already aligned to
  `git@github-devkitt:random-knights/xyz.git`.
- `apps/rand0m/pubspec.yaml` uses Dart package name `rand0m`.
- Active Dart imports use `package:rand0m/...`.
- `apps/rand0m/web/index.html` and `web/manifest.json` expose `rand0m`
  branding.
- Root `.firebaserc` maps `rand0m -> ai-rand0m`.
- Root `firebase.json` uses `apps/rand0m/build/web`.
- Active tooling still validates `apps/rand0m`.
- Many architecture docs use `knight1y` as both historical product identity and
  runtime system-agent identity.

## Rename Categories

### Visible Product Branding

Should become `rand0m` or `Random Knights, XYZ`:

- web page title
- PWA manifest `name` and `short_name`
- PWA description
- pre-auth landing/sign-in visible product label
- README product positioning
- production readiness docs
- release/deploy docs

Recommended public copy:

- Product/app name: `rand0m`
- Formal brand: `Random Knights, XYZ`
- Short web title: `rand0m`
- Web description: `Random Knights, XYZ command center.`

### Local Folder Paths

Now points to `apps/rand0m`:

- root tooling scripts
- root Firebase `public` build path
- active runbook commands
- docs that describe current workspace layout

The folder rename happened after current pending CJ app changes were committed.
Remaining implementation phases should not reintroduce `apps/knight1y` as an
active path.

### Dart Package And Import Identity

Status: completed in CM-9.

- package name: `rand0m`
- active imports use `package:rand0m/...`
- `flutter clean`, `flutter pub get`, `flutter analyze`, `flutter test`,
  `flutter build web`, and root `tooling/scripts/validate-all.ps1` passed
  after the rename.
- `https://ai-rand0m.web.app` was redeployed after validation.

The deployed `main.dart.js` no longer contains the stale `package:kn1ghts`
string. Remaining `kn1ghts` strings in native Firebase files, old app-local
Firebase config, old Function URLs, Hive box names, assets, and historical docs
are intentionally outside this phase unless a later migration explicitly owns
those runtime contracts.

### Platform App IDs

Do not change package IDs/bundle IDs in the first implementation phase unless
there is an explicit release requirement.

Potential future targets:

- Android/iOS/macOS bundle IDs may eventually align to `ai.rand0m.xyz` or a
  similar convention.
- Windows/Linux product names may eventually align to `rand0m`.

Platform IDs can affect signing, app installs, Firebase app registration, and
store identity. Treat them as a later release engineering phase.

### Firebase Config

Current:

- target: `rand0m`
- site: `ai-rand0m`
- build path: `apps/rand0m/build/web`
- desired production domain decision: now `rand0m.ai`

Recommended Firebase direction:

- Use the existing `ai-rand0m` Hosting site.
- Keep the single active Hosting target as `rand0m -> ai-rand0m`.
- Keep the build path as `apps/rand0m/build/web`.
- Keep `ai-knight1y` parked temporarily until the `rand0m.ai` cutover is proven.
- Keep the default `randomknights-xyz` site parked/unused.

Why prefer existing `ai-rand0m`:

- It matches the new product/app name.
- It already exists from the prior multi-site setup.
- It avoids creating another Firebase Hosting site.
- It provides a temporary URL consistent with the final domain identity:
  `https://ai-rand0m.web.app`.

Do not delete `ai-knight1y` until after `rand0m.ai` is live and rollback is no
longer needed.

### Docs And Runbooks

Active docs should move to the new canonical language:

- `xyz` = GitHub repo
- `apps/rand0m` = target local app folder
- `rand0m` = product/app name
- `rand0m.ai` = production domain
- `Random Knights, XYZ` = formal brand

Historical docs may retain old names if clearly marked historical:

- `kn1ghts`
- `knight1y`
- `xyz_knight1y`
- `ai-knight1y`
- `knight1y.rand0m.ai`

### System Agent Names

Do not blindly rename runtime system agents.

The system-agent concept `knight1y` can remain if it still describes a runtime
role inside the agent ecosystem. The app/product rename to `rand0m` does not
automatically require renaming:

- `rand0m` system agent
- `dai1y` system agent
- `knight1y` system agent
- `aut0mate` system agent

Recommended rule:

- Rename user-facing app/product references.
- Preserve `knight1y` where it means the runtime system agent, agent persona,
  legacy migration note, or historical source app.
- During implementation, review each match in `rk_agents`, `rk_core`, and app
  agent configuration before changing it.

## Final Naming Map

| Current | Target | Notes |
| --- | --- | --- |
| `apps/knight1y` | `apps/rand0m` | local folder rename completed in CM-7 |
| `kn1ghts` Dart package | `rand0m` | completed in CM-9 |
| `knight1y` visible app title | `rand0m` | product branding |
| `Knight1y` visible title | `rand0m` or `Random Knights, XYZ` | choose by context |
| `ai-knight1y` | `ai-rand0m` | preferred active Firebase site after remap |
| `knight1y.rand0m.ai` | `rand0m.ai` | final production domain |
| `random-knights/xyz` | `random-knights/xyz` | unchanged canonical repo |
| `knight1y` system agent | keep for now | runtime concept, not app repo name |

## Exact Implementation Phases

### CM-5B: Commit Or Park Pending App Work

Before renaming:

1. Commit or intentionally park current CJ auth/favicon/navigation/Oracle app
   changes.
2. Confirm the app repo is clean enough to rename safely.
3. Confirm root docs/tooling changes are committed or staged intentionally.

### CM-5C / CM-7: Local Folder And Tooling Rename

Status: completed in CM-7.

1. Renamed `apps/knight1y` to `apps/rand0m`.
2. Updated root tooling paths from `apps/knight1y` to `apps/rand0m`.
3. Updated root docs that describe current local workspace paths.
4. Did not change Dart package name.
5. Ran `tooling/scripts/validate-all.ps1`.

### CM-5D / CM-9: Dart Package And Import Rename

Status: completed in CM-9.

1. Change app `pubspec.yaml` package name from `kn1ghts` to `rand0m`.
2. Update `package:kn1ghts/...` imports to `package:rand0m/...`.
3. Update generated or platform metadata only if required by Flutter tooling.
4. Run:
   - `flutter pub get`
   - `flutter analyze`
   - `flutter test`
   - `flutter build web`

### CM-5E: Visible Product Branding

1. Update web title, manifest, description, and sign-in/landing text.
2. Use `rand0m` for the short app name.
3. Use `Random Knights, XYZ` for formal brand copy.
4. Keep icon assets unchanged unless a separate brand asset decision is made.

### CM-5F / CM-8: Firebase Local Config Remap

Status: completed in CM-8.

After the folder rename:

1. Reduce root `.firebaserc` to a single active target:
   `rand0m -> ai-rand0m`.
2. Reduce root `firebase.json` to one Hosting entry:
   `target: rand0m`, `public: apps/rand0m/build/web`.
3. Keep Firestore rules and indexes unchanged unless collection-specific rules
   are ready.
4. Do not delete `ai-knight1y`.
5. Deployed only `hosting:rand0m` after validation.

### CM-5G: Deployment Rehearsal To ai-rand0m

1. Build web.
2. Deploy only `hosting:rand0m` to `randomknights-xyz`.
3. Verify `https://ai-rand0m.web.app`.
4. Verify auth gate and visible app branding.
5. Keep `ai-knight1y` available as rollback until custom domain cutover.

### CM-5H: Custom Domain Cutover Plan

1. Connect `rand0m.ai` to the active `ai-rand0m` Hosting site.
2. Verify SSL provisioning.
3. Verify Google OAuth authorized domains include `rand0m.ai`.
4. Verify app auth and Firestore rules.
5. Only after successful cutover, plan deletion/parking cleanup for old sites.

## Risks

- Renaming the Dart package from `kn1ghts` to `rand0m` can break imports across
  app code, tests, functions-adjacent references, generated plugin files, or
  docs.
- Renaming the local folder while app changes are dirty can make status and
  rollback harder to reason about.
- Firebase target/site changes can accidentally deploy the app to the wrong
  temporary URL if `.firebaserc` and `firebase.json` are changed in different
  phases.
- `rand0m` is both the target product name and an existing system-agent name;
  implementation must not collapse product identity and runtime agent identity
  unless intentionally designed.
- `knight1y` may still be valid as a runtime agent/system concept even after it
  stops being the public product name.
- Platform package IDs should not be casually renamed before release, signing,
  and Firebase app registration implications are reviewed.

## Open Decisions

- Should the app Dart package name become exactly `rand0m`, or should it use a
  less leetspeak internal package name while public branding remains `rand0m`?
- Should `ai-knight1y` serve a redirect to `ai-rand0m` during transition, or
  stay parked as rollback only?
- Should `knight1y` remain as a visible agent/persona inside the app after the
  product rename?
- Should platform app IDs change before the first `rand0m.ai` production
  release, or after web production stabilizes?

## Success Criteria For Implementation

- Local app path is `apps/rand0m`.
- Canonical repo remains `random-knights/xyz`.
- Visible product branding is `rand0m` / `Random Knights, XYZ`.
- Production domain plan points to `rand0m.ai`.
- Firebase active Hosting target/site maps to `rand0m -> ai-rand0m`.
- System-agent concepts are reviewed and preserved where intentional.
- Validation passes before any deploy.
