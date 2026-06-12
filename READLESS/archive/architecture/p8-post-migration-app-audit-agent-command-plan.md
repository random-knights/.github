# P8 Post-Migration App Audit And Agent Command Plan

Last audited: 2026-05-30

## Documentation Boundary

`C:\Projects\dev-kitt` is source-only. It may contain source code, `README.md`
files, and the root `RUNBOOK.md`. Architecture notes, planning notes, audit
notes, migration notes, and decision records do not belong in dev-kitt.

Architecture notes go directly in:

```text
C:\Projects\qa-kitt\.github\READLESS\architecture
```

Decision records go directly in:

```text
C:\Projects\qa-kitt\.github\READLESS\decisions
```

Do not create project-specific nesting such as
`READLESS\architecture\rand0m`.

## Audit Summary

Rand0m is post-migration and operational, but several settings and dashboard
surfaces still rely on one-off futures or local widget state. The strongest
live-sync pattern is the active-agent favorite terminal line, which listens to
favorite and visibility notifiers and stores the resolved display state locally.
That pattern should become the model for settings that affect multiple open
surfaces.

The command architecture should start as a preview-first app-local command
contract. Execution should remain blocked until parsing, validation,
authorization, logging, and callable Function boundaries are explicit.

No command execution was implemented during this audit.

## Prioritized Findings

1. **State sync needs a small app-local notification model.**
   Active favorite agent updates are live. Default provider, agent provider
   settings, and App Info icon choices are still more localized and can require
   reopening a surface to see the newest state elsewhere.

2. **Weather failure is likely a contract/runtime boundary issue, not a UI
   problem.**
   The Weather page shows `Unable to load weather` for API/request failures.
   The app currently reads `WEATHER_API_KEY`, while the root env example names
   `RANDOM_WEATHER_API_KEY`. Weather also calls OpenWeatherMap directly from
   the browser, which is fragile for production and exposes the key in web
   builds.

3. **About video is Git LFS-safe but not web-load-safe enough.**
   About loads bundled videos from `apps/rand0m/assets/videos`. The XL web
   assets are over 100 MB each and are selected for viewport widths above 900px.

4. **Agent action preview exists, but command architecture does not.**
   `runAgentActionPreview` returns safe preview text and performs auth/domain
   checks. It does not execute tools, write files, or mutate Firestore. This is
   a good seed for command preview, not execution.

5. **Agent chat settings reload locally after a dialog closes.**
   Agent chat provider/model display uses a future and refreshes after the
   settings dialog returns `changed == true`. Other open surfaces are not
   guaranteed to receive that change.

## Live State Sync Audit

### Active Favorite Agent

Current state:

- Singleton active-agent favorite behavior is implemented.
- Home back flipcard active-agent line listens to favorite and visibility
  changes.
- It updates without refresh or flip-away/flip-back.
- The line format remains:

```text
>_ active agent: @agent
```

Assessment: Good pattern. Use this as the reference for future live-sync work.

### Agent Provider And Model Settings

Current state:

- Agent config is Hive-backed through `AgentConfigService`.
- Agent chat header uses a future for provider/model display.
- Agent chat refreshes its provider/model future after the settings dialog
  closes with a changed result.
- Dashboard/Home agent list refreshes after settings changes in known paths,
  but there is no shared app-wide notifier for agent config changes.

Risk:

- Open surfaces can show stale provider/model data until they are refreshed,
  reopened, or explicitly told to reload.

Recommendation:

- Add a small app-local `AgentConfigRuntime` or `AgentSettingsBus` with a
  `ValueNotifier<int>` and notify after `saveConfig`, `resetConfig`, and
  visibility-affecting changes.
- Convert only the surfaces that need immediate updates.

### Default AI Provider

Current state:

- `DefaultAiProviderSettings` persists to the `settings` Hive box.
- It has safe fallback behavior to Gemini / Google.
- It does not currently expose a change notifier.
- The Settings/App Info row refreshes its own future after saving.
- New chat/default flows read the saved provider when they initialize or call a
  default provider path.

Risk:

- Existing open Chat and agent surfaces may not update if the default provider
  changes while they are already mounted.

Recommendation:

- Add a notifier to `DefaultAiProviderSettings` in P8.1.
- Keep Chat's multi-provider default behavior unchanged.
- Only use default provider changes where a selected/focused default pane or
  default agent flow needs one.

### Selected App Icon

Current state:

- `Rand0mAppIconSettings` already exposes `changes`.
- App icon displays reload from that notifier in selected Home/App Info
  surfaces.

Risk:

- This pattern is service-specific rather than a general settings pattern.

Recommendation:

- Keep as-is for now. If more settings adopt live-sync, align the naming and
  conventions with the future settings bus.

### Favorites Page And Favorite Response Records

Current state:

- `FavoriteHiveService.changes` exists and is used by agent favorite flows.
- Some favorites surfaces still load snapshots through `FutureBuilder`.

Risk:

- Favorite list pages can become stale if favorite records change while the
  page is open and the page is not listening to the notifier.

Recommendation:

- In P8.1, audit `FavoritesPage` and agent favorites widgets for direct
  listening to `FavoriteHiveService.changes`.
- Avoid storage changes; this is a UI refresh concern.

### Terminal And Flipcard

Current state:

- Terminal type animation targets about 90 frames and finishes in under two
  seconds at normal web frame rates.
- Animation runs once per app load using the existing session cache.
- Later active-agent changes update the active-agent line without replaying the
  terminal animation.

Recommendation:

- Keep the terminal non-interactive until Agent Command Architecture reaches
  the command-entry phase.

## Weather Audit

Current state:

- `WeatherPage` calls `LocationService.getCurrentLocation`.
- If location is unavailable, it shows `Location unavailable`.
- If current or hourly weather requests fail, it shows `Unable to load weather`.
- `WeatherService` calls OpenWeatherMap directly from the app/browser.
- `Env.weatherApiKey` is generated from `WEATHER_API_KEY`.
- The root `.env.example` documents `RANDOM_WEATHER_API_KEY`.

Likely causes:

- Env name mismatch between app-local generated env code and root example.
- OpenWeatherMap request failure, quota, invalid key, browser/network/CORS
  behavior, or an unhandled response body.
- Weather key embedded in a web client is not the desired production boundary.

Smallest safe fix recommendation:

1. In P8.1, standardize the app env contract so generated env and example env
   use the same weather name.
2. Prefer `RANDOM_WEATHER_API_KEY` if the ecosystem key prefix remains the
   canonical convention.
3. Do not expose new key values in source or logs.
4. In P8.2 or later, move weather behind a callable Function if weather remains
   a supported production feature.

Do not implement a broad weather rewrite until the key contract is settled.

## About Video Audit

Current state:

- About page uses `ThemeCard`.
- `ThemeCard` loads video assets from:

```text
C:\Projects\dev-kitt\apps\rand0m\assets\videos
```

- On web/desktop widths over 900px, it selects:
  - `assets/videos/stranger_days_xl.mp4`
  - `assets/videos/stranger_nights_xl.mp4`
- On smaller widths, it selects:
  - `assets/videos/stranger_days_md.mp4`
  - `assets/videos/stranger_nights_md.mp4`

Observed asset sizes:

- `stranger_days_xl.mp4`: about 127 MB
- `stranger_nights_xl.mp4`: about 125 MB
- `stranger_days_md.mp4`: about 23 MB
- `stranger_nights_md.mp4`: about 26 MB
- `rand0m_kn1ghts.mp4`: about 204 MB

Repository safety:

- `.gitattributes` tracks `assets/videos/*.mp4` with Git LFS.
- This is GitHub-safe from a repository-size perspective.

Web-load safety:

- XL videos over 100 MB are risky for first-load and mid-page loading.
- The current width threshold can choose XL assets on common laptops/desktops.

Recommendation:

1. In P8.1, default web playback to MD videos unless the user explicitly opts
   into high-quality motion.
2. Consider lazy loading the video region only after About is visible.
3. Consider a CDN/hosting path if large motion assets remain central to the
   experience.
4. Do not replace assets without explicit visual approval.

## Agent Command Architecture Plan

### Current Agent Flow

- Agent chat uses `TransmitService.getAgentAIResponse`.
- Agent provider/model config is read from `AgentConfigService`.
- Agent settings update local Hive config.
- Agent responses are displayed as chat messages with favorite/copy support.
- `AgentRuntimeBridge` can produce preview metadata from `rk_agents`
  definitions and registered action/tool metadata.
- `runAgentActionPreview` exists as a Firebase callable preview path.

### Current Preview Function

`runAgentActionPreview`:

- Requires authenticated verified `@rand0m.ai` users.
- Requires `agentId` and `actionId`.
- Rejects unsupported agent/action combinations.
- Limits preview input size.
- Returns preview text.
- Does not write files.
- Does not update Firestore.
- Does not execute external tools.

This is the correct posture for command planning.

### Command Entry Points

1. **Home terminal**
   - Future primary command entry.
   - Currently display-only.
   - Should stay non-interactive until command parsing and safety are ready.

2. **Agent chat**
   - Natural entry for `@agent` and slash-style commands.
   - Can support preview-first behavior before execution.

3. **Agent-to-agent flow**
   - Future orchestration layer.
   - Must not be introduced until logging, permissions, and user confirmation
     are designed.

4. **Agent action preview widgets**
   - Current safe place to expose available actions.
   - Can evolve into command preview launchers.

### Command Lifecycle

1. Parse
   - Convert raw user input into a command intent.
   - Recognize explicit command prefixes only.
   - Treat ordinary chat as chat, not command execution.

2. Validate
   - Validate agent ID, action ID, arguments, target resources, and size limits.
   - Reject unknown or ambiguous commands.

3. Authorize
   - Require Firebase Auth for cloud-backed commands.
   - Require verified `@rand0m.ai` users for sensitive commands.
   - Enforce local-only boundaries for local-only actions.

4. Preview
   - Show what the command would do.
   - Include affected data, write targets, external calls, and cost/risk where
     applicable.
   - Do not execute during preview.

5. Confirm
   - Required for destructive, external, write, or paid actions.
   - Optional for harmless read-only commands.

6. Execute
   - Execute only after validation and authorization.
   - Use Firebase Functions for server-side secrets or external APIs.
   - Keep local-only commands local.

7. Log
   - Log command request, preview, confirmation, result, and failure state.
   - Avoid logging secrets or raw provider error bodies.

8. Display Result
   - Render result in the initiating surface.
   - Allow copy/favorite where appropriate.
   - Make failures actionable and safe.

### Safety Constraints

Blocked until explicitly implemented:

- File writes.
- Folder deletion.
- Git operations.
- Firebase deploys or config mutation.
- Secret reads or secret printing.
- Arbitrary shell execution.
- Network calls outside approved Functions/providers.
- Agent-to-agent autonomous loops.
- Commands that mutate Hive without explicit confirmation.
- Commands that mutate Firestore without security rules and audit logging.

Default posture:

- Preview-only.
- Read-only.
- User-confirmed before side effects.

### Storage And Logging Requirements

Local-first:

- Command drafts.
- Command previews.
- Recent command history.
- Non-sensitive result summaries.

Future Firestore:

- Shared command history if multi-device sync becomes necessary.
- Team/audit logs for production operations.
- Long-running command status.

Never store:

- API keys.
- Raw provider secrets.
- Full raw error bodies from providers.
- Sensitive user content without explicit product decision.

### Future Firebase Requirements

Likely new or expanded callable Functions:

- `previewAgentCommand`
- `executeAgentCommand`
- `getAgentCommandStatus`

Function requirements:

- Authenticated user required.
- Verified email required.
- `@rand0m.ai` domain required for internal phase.
- Strict input schemas.
- Safe error semantics.
- Timeouts.
- Provider/secret isolation.
- No broad tool execution.

## Proposed Sync Model

Add a small app-local set of notifiers before broad refactors:

- `FavoriteHiveService.changes` already exists.
- `AgentVisibilityRuntime.changes` already exists.
- Add `AgentConfigService.changes` or `AgentConfigRuntime`.
- Add `DefaultAiProviderSettings.changes`.
- Keep `Rand0mAppIconSettings.changes`.

Then migrate only high-value surfaces:

- Home agent panels.
- Agent chat header.
- Favorites page.
- App Info default provider row.
- Any terminal/default-agent display.

Do not introduce a global state management framework in P8.1.

## Implementation Phases

### P8.1: Live-Sync Foundation

- Add app-local notifiers for agent config and default provider settings.
- Update Home/agent surfaces that currently show stale provider/model data.
- Update favorites page to refresh from the existing favorites notifier if
  needed.
- No command execution.

### P8.2: Weather Contract Fix

- Standardize weather env naming.
- Decide whether weather stays client-side temporarily or moves to Functions.
- Improve error messages without exposing secrets.
- No broad redesign.

### P8.3: About Video Web Safety

- Default web to MD videos or lazy-load video.
- Keep LFS.
- Do not replace visual assets without approval.

### P8.4: Command Parser And Preview Model

- Add app-local command intent types.
- Parse explicit commands only.
- Wire preview-only command output to existing `runAgentActionPreview`.
- No execution.

### P8.5: Command Logging

- Add local command preview/history records.
- Keep sensitive data out.
- Prepare future Firestore sync, but do not add it yet.

### P8.6: Controlled Execution Design

- Design execution contracts and confirmation UI.
- Identify first safe read-only executable command.
- Do not add arbitrary shell/tool execution.

## Recommended Execution Order

1. P8.1 live-sync foundation.
2. P8.2 weather contract fix.
3. P8.3 About video web safety.
4. P8.4 command parser and preview.
5. P8.5 command logging.
6. P8.6 execution design.

The command architecture should not advance to execution until live-sync,
weather contract, and video performance risks are under control.
