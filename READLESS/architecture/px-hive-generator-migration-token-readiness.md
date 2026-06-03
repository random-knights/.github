# PX.2 Hive Generator Migration Plan + GitHub Token Format Readiness Audit

Date: 2026-06-01

## Purpose

Plan a safe Hive generator migration without changing runtime behavior, and
verify Rand0m workflows and docs are ready for longer stateless GitHub App
installation tokens.

## Current Known-Good State

Known-good deployment anchor:

- `eb4be9f fix: upgrade google fonts lockfile`

Current CI recovery state:

- `history_event.g.dart` is checked in.
- `HistoryEventAdapter` is required at runtime.
- CI uses `dart run build_runner build --delete-conflicting-outputs`.
- The `hive_generator` analyzer language-version warning is known and
  non-blocking until a dedicated migration phase.
- The Wasm dry-run warnings from `flutter_sound_web` and `geolocator_web` are
  tracked separately and should not be mixed into Hive migration work.

Current generator/dependency stack:

| Package | Version |
| --- | --- |
| `hive` | `2.2.3` |
| `hive_flutter` | `1.1.0` |
| `hive_generator` | `2.0.1` |
| `build_runner` | `2.4.13` |
| `analyzer` | `6.4.1` |
| `source_gen` | `1.5.0` |
| `envied` | `1.2.1` |
| `envied_generator` | `1.1.1` |

## Hive Usage Audit

Generated Hive models:

- `lib/models/agents/history_event.dart`
- `lib/models/agents/history_event.g.dart`

Adapter registration:

- `lib/main.dart` registers `HistoryEventAdapter` after `Hive.initFlutter()`.
- Tests that use `HistoryEvent` also register `HistoryEventAdapter` in isolated
  Hive temp directories.

Typed box:

- `HistoryService` opens `history_events` as `Box<HistoryEvent>`.

Dynamic/manual Hive boxes:

- `ApiKeys.boxName`
- `favorite_response_records`
- agent settings, order, visibility, config, app icon, default AI provider,
  connect source settings, and audit/debug boxes

Manual serialization:

- Favorites are stored as maps through `FavoriteHiveService`.
- These are not currently dependent on generated Hive adapters.

Tests using Hive:

- `agent_command_preview_test.dart`
- `agent_settings_favorites_test.dart`
- `app_icon_settings_test.dart`
- `connect/connect_page_test.dart`
- `connect/earth_impact_service_test.dart`
- `connect/source_registry_test.dart`
- `favorites/favorite_response_records_test.dart`

Checked-in generated files:

- `lib/models/agents/history_event.g.dart`

Ignored generated files:

- `lib/env/env.g.dart`
- `.dart_tool/`
- `build/`

## Migration Options

### Option 1: Stay On Legacy Hive Generator Temporarily

Risk:

- Low runtime risk.
- Keeps the known analyzer warning.
- Leaves future SDK/generator compatibility work unresolved.

Required files:

- `pubspec.yaml`
- `pubspec.lock`
- `.github/workflows/*.yml`
- `lib/models/agents/history_event.dart`
- `lib/models/agents/history_event.g.dart`

Expected generated output changes:

- None.

Validation strategy:

- `dart run build_runner build --delete-conflicting-outputs`
- `flutter analyze`
- `flutter test`
- `flutter build web`
- `validate-all.ps1`
- Confirm `HistoryEventAdapter` remains byte-compatible enough to read existing
  `history_events` entries.

Rollback strategy:

- Revert dependency/workflow changes to the known-good CI recovery commit.

### Option 2: Migrate To `hive_ce_generator`

Risk:

- Medium to high until generated adapter equivalence is proven.
- May require annotation/import changes.
- May change generated adapter formatting or behavior.

Required files:

- `pubspec.yaml`
- `pubspec.lock`
- `history_event.dart`
- `history_event.g.dart`
- CI workflows if generator command changes
- Any tests that assert adapter behavior

Expected generated output changes:

- Likely changes to generator comments/imports and possibly adapter internals.
- Must preserve `typeId: 7` and field ids `0` through `7`.

Validation strategy:

- Branch-only spike.
- Generate adapter with old and new generator in separate worktrees.
- Diff generated adapters.
- Add Hive write/read compatibility tests using a fixture created by the legacy
  adapter.
- Run full app and workspace validation.

Rollback strategy:

- Abandon the spike branch if adapter equivalence is not proven.
- Do not merge partial generator changes.

### Option 3: Remove Codegen For Simple Models

Risk:

- Medium.
- Manual adapter must be maintained forever.
- Easy to introduce field-order or type bugs.

Required files:

- `history_event.g.dart` replaced or converted to a manually maintained adapter.
- `history_event.dart` may no longer need `part`/Hive annotations if the manual
  adapter is moved into source.

Expected generated output changes:

- Generated file ownership changes.
- Adapter code must remain equivalent to the current generated adapter.

Validation strategy:

- Golden compare adapter read/write behavior.
- Test legacy stored `HistoryEvent` payloads.
- Run full validation.

Rollback strategy:

- Restore generated adapter and `hive_generator`.

### Option 4: Manually Maintain Adapters While Keeping Annotations

Risk:

- Medium-high.
- Mixed generated/manual ownership can confuse future agents and CI.

Required files:

- Same as Option 3 plus explicit comments documenting ownership.

Expected generated output changes:

- None if generation is disabled for Hive, but CI must no longer run a Hive
  builder that overwrites the adapter.

Validation strategy:

- Same as Option 3.

Rollback strategy:

- Restore generated adapter ownership and build_runner Hive builder.

### Option 5: Split Env Generation From Hive Generation

Risk:

- Medium.
- Reduces generator coupling but adds build complexity.

Required files:

- `build.yaml` or separate generator scripts if needed.
- CI workflows.
- Possibly env and Hive generator constraints.

Expected generated output changes:

- Ideally none for `history_event.g.dart`.
- `env.g.dart` remains ignored.

Validation strategy:

- Prove `envied_generator` can modernize independently of Hive.
- Run build_runner in a way that does not delete or orphan the Hive adapter.

Rollback strategy:

- Restore single `build_runner build --delete-conflicting-outputs` workflow.

## Recommended Hive Migration Path

1. Stay on the current legacy generator stack until a dedicated migration phase.
2. Create a branch-only spike for `hive_ce_generator` or manual adapter
   ownership.
3. In the spike, preserve `typeId: 7` and every `HiveField` id.
4. Generate old and new adapters in separate worktrees and compare output.
5. Add a fixture-based compatibility test:
   - write `HistoryEvent` with the legacy adapter
   - read it with the candidate adapter
   - write with the candidate adapter
   - read it with the legacy adapter if practical
6. Keep `envied_generator` modernization separate from Hive migration unless
   the branch proves both can move safely together.
7. Merge only when adapter equivalence and CI behavior are proven.

Do not repeat the failed partial migration pattern:

- Do not remove `hive_generator` while `history_event.g.dart` remains generated.
- Do not run build_runner without conflict cleanup when checked-in generated
  outputs already exist.
- Do not modernize analyzer/build_runner just to silence warnings.

## GitHub Token Format Readiness Audit

Surfaces audited:

- `.github/workflows/firebase-hosting-pull-request.yml`
- `.github/workflows/firebase-hosting-merge.yml`
- `.github/workflows/manual-firebase-deploy.yml`
- `apps/rand0m/SECURITY.md`
- root `CODEX.md`
- root `RUNBOOK.md`
- `tooling/scripts`

Findings:

- No workflow uses GitHub App installation tokens directly.
- Workflows rely on standard Actions context, Firebase service account JSON,
  and `RK_PACKAGE_READ_SSH_KEY`.
- No hardcoded `ghs_` token regex was found.
- No fixed GitHub token length assumption was found.
- No token truncation helper was found.
- No custom GitHub API/token code was found.
- No assumptions that tokens contain no dots were found.

Readiness updates:

- Security docs now state that GitHub-provided tokens are opaque.
- Docs now warn against fixed token lengths and JWT claim parsing for `ghs_`
  tokens.
- Future redaction/validation helpers should support at least 520 characters.
- Recommended permissive shape:
  `ghs_[A-Za-z0-9\.\-_]{36,}`

## Validation

No Flutter validation is required for this audit/planning phase because only
documentation changed.

If a future phase changes workflow scripts or token validation code, run the
smallest script/workflow validation available and avoid printing token values.

## Next Implementation Recommendations

1. Leave the current CI recovery in place.
2. Return to product work: `P9.15 Earth Overview Dashboard`.
3. Schedule a dedicated Hive migration spike after the next product checkpoint.
4. Keep Wasm dry-run cleanup as a separate compatibility phase.
