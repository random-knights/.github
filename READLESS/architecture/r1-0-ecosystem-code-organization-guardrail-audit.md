# R1.0 Ecosystem Code Organization Guardrail Audit

Date: 2026-06-06

Scope: organization and guardrails only. This audit does not authorize deploys,
provider calls, Firebase Functions, OAuth, package version bumps, tags, or new
Earth runtime features.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\dev-kitt\RUNBOOK.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\earth-visualization-architecture.md`

## Current Status

The first R1.0 cleanup branch reduced `lib/pages/connect.dart` from 22,043
lines to 13,917 lines by extracting the Connect tab, Earth tab compatibility
surface, Connect source card, and several Earth workstation widgets. That
improved navigability, but `connect.dart` remains too large and still mixes
Connect and Earth responsibilities.

Current `connect.dart` line count: 13,917.

Current largest Dart files in `apps/rand0m`:

| Lines | File |
|---:|---|
| 13,917 | `lib/pages/connect.dart` |
| 3,074 | `lib/widgets/earth/earth_globe_preview.dart` |
| 3,058 | `lib/pages/agents/secret.dart` |
| 2,526 | `lib/pages/home/home.dart` |
| 2,061 | `lib/widgets/earth/earth_motion_layer.dart` |
| 1,976 | `lib/services/utility/test_creator_model.dart` |
| 1,914 | `lib/services/connect/earth_source_registry.dart` |
| 1,536 | `lib/models/connect/earth_entity_resolution.dart` |
| 1,535 | `lib/models/connect/earth_layer_snapshot.dart` |
| 1,455 | `lib/models/connect/earth_globe_preview.dart` |
| 1,452 | `lib/models/connect/earth_globe_overlay_bridge.dart` |
| 1,271 | `lib/models/connect/earth_vision_pipeline.dart` |
| 1,245 | `lib/models/connect/earth_verification.dart` |
| 1,131 | `lib/widgets/agents/hive.dart` |
| 1,115 | `lib/widgets/connect/earth_schematic.dart` |
| 1,077 | `lib/pages/chat.dart` |
| 1,074 | `lib/pages/agents/messages.dart` |
| 1,070 | `lib/services/utility/test_recorder_model.dart` |
| 1,055 | `lib/models/connect/earth_visualization.dart` |
| 1,004 | `lib/models/connect/earth_forest_verification.dart` |

Largest test files:

| Lines | File |
|---:|---|
| 4,533 | `test/connect/connect_page_test.dart` |
| 1,700 | `test/agent_command_preview_test.dart` |
| 1,534 | `test/utility_test_tab_test.dart` |
| 972 | `test/connect/earth_globe_overlay_bridge_test.dart` |
| 645 | `test/connect/earth_source_registry_test.dart` |

## Earth / Connect Boundary Findings

Connect owns:

- Source registry
- Provider/source management
- Source onboarding
- Source status and ownership
- Connection icon globe
- Source docs/add/remove/status flows

Earth owns:

- Earth workstation and globe visualization
- Overlays, motion layers, and preview layers
- Entity resolution and manual region mapping
- Earth snapshots and weather/wind/wildfire/ocean/flight/ship/satellite layers
- Monitoring, verification, evidence, Earth score, and @scient1st intelligence

Remaining boundary issues:

- `connect.dart` still owns major Earth dashboard, intelligence, verification,
  monitoring, and preview composition code.
- Earth compatibility code now exists in `lib/pages/connect/earth_tab.dart`,
  which is acceptable as a temporary migration wrapper but not as the long-term
  Earth page home.
- Earth models remain under `lib/models/connect` even when they are no longer
  conceptually Connect models.
- Earth service names remain under `lib/services/connect` for several registry
  and provider-readiness surfaces.
- `lib/widgets/connect/earth_schematic.dart` is Earth visualization code in a
  Connect widget directory.

## Naming Findings

The preferred future app structure is:

- `lib/pages/connect.dart`
- `lib/pages/earth.dart`
- `lib/pages/connect/...`
- `lib/pages/earth/...`
- `lib/widgets/connect/...`
- `lib/widgets/earth/...`
- `lib/models/connect/...`
- `lib/models/earth/...`
- `lib/services/connect/...`
- `lib/services/earth/...`

New files should use domain prefixes such as `connect_*`, `earth_*`,
`agent_*`, `test_inspect_*`, `app_*`, and `source_*`. Avoid catch-all files
named `utils.dart`, `helpers.dart`, `models.dart`, or `widgets.dart` unless
they are tiny barrels.

## Workflow Findings

Current app workflows are segmented and use `workflow_dispatch`, minimal
`contents: read` permissions, and concurrency cancellation:

- `app-core-validation.yml`: App Core Validation
- `earth-fast-validation.yml`: Earth Fast Validation + Preview Deploy
- `agents-validation.yml`: Agents Validation
- `test-inspect-validation.yml`: Test Inspect Validation
- `more-experience-validation.yml`: More Experience Validation
- `full-release-gate.yml`: Rand0m Full Release Gate
- `manual-firebase-deploy.yml`: Manual Firebase Deploy

Only `earth-fast-validation.yml` and `manual-firebase-deploy.yml` contain deploy
steps. Earth Fast preview deploy is restricted to the preview target. No
segmented validation workflow should deploy.

Recommended R1.4 naming cleanup:

- `01-app-core-validation.yml`
- `02-earth-validation.yml`
- `03-agents-validation.yml`
- `04-test-inspect-validation.yml`
- `05-more-experience-validation.yml`
- `90-full-release-gate.yml`

This was not implemented in R1.0 because workflow file renames can create noisy
CI churn and should be done as a focused workflow cleanup.

## Runtime-Speed Guardrails

Future Codex phases should keep runtime and review costs down by:

- Splitting page files before adding new features.
- Keeping PR/branch deltas small and feature-scoped.
- Preferring focused model/widget tests over giant multi-surface widget tests.
- Splitting broad tests such as `connect_page_test.dart` and
  `utility_test_tab_test.dart`.
- Avoiding Flutter validation for docs-only work.
- Reserving full suite/build validation for release checkpoints or shared
  runtime changes.
- Keeping path filters aligned to the domain that actually changed.

## Staged Refactor Plan

### R1.1 Connect Page Reduction

Goal: reduce `connect.dart` below 5,000 lines.

Move remaining Connect-only sections into `lib/pages/connect` and
`lib/widgets/connect`, leaving `connect.dart` as the route/composition shell.

### R1.2 Earth Page Extraction

Goal: create `lib/pages/earth.dart` or `lib/pages/earth/...` and move Earth
workstation composition out of `lib/pages/connect`.

Use compatibility wrappers only where needed to preserve current navigation.

### R1.3 Earth Widget/Model Domain Split

Goal: move Earth models/widgets/services out of Connect namespaces where they
represent Earth domain behavior.

Targets include `lib/models/connect/earth_*`,
`lib/services/connect/earth_*`, and `lib/widgets/connect/earth_schematic.dart`.

### R1.4 Workflow Naming/Scope Cleanup

Goal: adopt numbered workflow filenames and review path filters so Earth,
Agents, Test/Inspect, More/Experience, and Full Release Gate scopes remain
obvious and stable.

### R1.5 Test Scope Cleanup

Goal: split broad tests into focused tests for Connect source registry, Earth
workstation, Earth preview, entity resolution, and Test/Inspect automation.

## R1.0 Low-Risk Changes

- Tightened `CODEX.md` with stronger file-size guardrails.
- Added 10k-line unacceptable-file rule.
- Added runtime and validation-speed guardrails.
- Recorded this organization audit and staged refactor plan.

No runtime Earth features, provider calls, deploys, or workflow renames were
added in R1.0.
