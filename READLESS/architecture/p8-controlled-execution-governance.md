# P8.6 Controlled Execution Governance

Date: 2026-05-31

Scope: audit and execution-governance specification only. This document does not authorize runtime command execution, Firebase Function creation, Firestore writes, package changes, Home Terminal input, or command-handler implementation.

Documentation boundary: `C:\Projects\dev-kitt` remains source-only. Architecture notes belong directly in `C:\Projects\qa-kitt\.github\READLESS\architecture`; do not create nested READLESS folders.

## Source Guidance Read

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\dev-kitt\RUNBOOK.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p8-post-migration-app-audit-agent-command-plan.md`

## Current State Audit

### Command Parser

Current implementation:

- `C:\Projects\dev-kitt\apps\rand0m\lib\services\agents\command_preview.dart`
- Tests: `C:\Projects\dev-kitt\apps\rand0m\test\agent_command_preview_test.dart`

Behavior:

- Ordinary chat input is not treated as a command.
- Slash commands are recognized, for example `/help` and `/preview`.
- Targeted command shapes are recognized, for example `@agent /preview` and `@agent command text`.
- Parsed fields include raw input, optional target agent, optional command name, optional arguments, and `isCommand`.
- Command names are normalized to lowercase.

Assessment: correct preview-first parser seed. It is intentionally shape-based and does not execute anything.

### Command Preview Model

Current implementation:

- `AgentCommandPreviewStatus`: `validPreview`, `unknownCommand`, `missingAgent`, `unsupportedAction`, `invalidInput`.
- `AgentCommandPreviewResult`: parsed command, status, title, message, optional agent name.
- `AgentCommandPreviewer`: supports `/help` and `/preview` only.

Behavior:

- `/help` returns local preview help.
- `/preview` resolves the active/current or targeted agent and displays local action/tool metadata.
- Unknown commands return a safe local unknown-command result.
- Action-specific preview arguments are explicitly unsupported in the current phase.
- Preview messages state that no provider, Firebase Function, Firestore write, terminal input, or command execution occurred.

Assessment: safe preview model exists. It is not an execution contract yet.

### Command Preview Logging

Current implementation:

- `AgentCommandPreviewLogService` in `command_preview.dart`.
- Uses `HistoryService.logEvent` and the local Hive `history_events` box.
- Event type: `command_preview`.
- Model marker: `local-command-preview`.

Logged metadata:

- redacted raw command text
- target agent
- command name
- redacted arguments
- preview status
- active agent
- preview agent
- mode: `preview-only`

Redaction:

- common `api_key`, `token`, `secret`, and `password` assignments
- OpenAI-style `sk-...` tokens
- Google-style `AIza...` tokens
- raw input is capped at 500 characters
- token-like metadata is normalized to safe characters

Assessment: local logging is aligned with preview-only behavior. It should remain local unless a future cloud logging phase defines consent, retention, and security rules.

### History And Hive Patterns

Current implementation:

- `HistoryService` writes `HistoryEvent` records into Hive box `history_events`.
- Chat and agent message services already log request/reply-style events locally.
- Favorites use `FavoriteHiveService` with Hive box `favorite_response_records` and a `ValueNotifier<int>` change signal.
- Active agent favorites are singleton by target type `agent`.

Assessment: local-first event storage and notifier patterns are established. Existing boxes must not be renamed as part of command execution work.

### Firebase Functions

Current active callable Functions:

- `generateAIResponse`
- `runPageSpeedAudit`
- `scanContentUrl`
- `runAgentActionPreview`

Common auth boundary:

- `assertRand0mUser` requires authenticated Firebase Auth.
- User email must be verified.
- Email must end with `@rand0m.ai`.

Callable error semantics currently in use:

- `unauthenticated`
- `permission-denied`
- `invalid-argument`
- `internal`
- `unavailable`
- `failed-precondition` for missing provider secrets

Function posture:

- `generateAIResponse` calls approved AI providers and returns response text plus cost/carbon estimates. Provider failures are mapped through safe callable errors.
- `runPageSpeedAudit` validates URL, strategy, and categories, then calls Google PageSpeed.
- `scanContentUrl` validates public HTTP(S) URLs, fetches bounded content, and derives safe signals.
- `runAgentActionPreview` requires `agentId` and `actionId`, validates input length, checks supported preview definitions, returns preview text, and does not execute tools or write data.

Assessment: Functions have an internal-domain auth boundary and safe error posture. None currently provides command execution.

### Agent List And Active Agent Behavior

System agents:

- `rand0m`
- `dai1y`
- `knight1y`
- `aut0mate`

Future/product agents to note separately:

- `temp1ate`
- `va1idat0r`

Current active-agent resolution:

1. active favorite agent if visible and known
2. random visible system agent
3. fallback `rand0m`

Current action metadata:

- `rk_agents` defines action/tool metadata and capability policies.
- `AgentAction.enabled` defaults to false.
- Tests assert preview-only action/tool metadata for active/future agents remains disabled.
- `AgentRuntimeBridge.previewFor` exposes metadata contexts with `mode: preview-only`.

Assessment: agent capability metadata exists, but execution is not enabled.

### Home Terminal

Current implementation:

- `TerminalBox` is display-only.
- It renders runtime/provider/history summary text.
- It listens to agent config and visibility changes.
- Flipcard active-agent line displays `>_ active agent: @agent` and updates live from favorite/visibility changes.

Assessment: terminal is not a command input. It must remain display-only until a future approved command-entry phase.

### Auth Boundaries

Current app auth:

- `SignInGate` only shows authenticated app content for allowed users.
- `AuthService.isAllowedUser` requires verified `@rand0m.ai` accounts.
- Google sign-in uses hosted domain hint and rejects unauthorized accounts after sign-in.

Assessment: app and callable boundaries are aligned for internal preview work. Future execution needs additional per-command authorization beyond app sign-in.

## Command Classification Model

| Category | Definition | Default risk | Default behavior |
| --- | --- | --- | --- |
| VIEW | Display existing local/app state without external calls or mutation. | safe | Preview allowed; execution may be allowed only after explicit read-only implementation. |
| QUERY | Fetch or calculate information from approved read-only local state or approved Functions. | caution | Preview allowed; execution requires explicit implementation and bounded inputs. |
| GENERATE | Produce new text, media, templates, reports, or suggestions without persisting or applying changes. | caution | Preview allowed; execution requires provider/Function boundary and cost disclosure. |
| MODIFY | Change local app state, Hive records, preferences, favorites, settings, or drafts. | restricted | Preview required; explicit confirmation required; narrow handlers only. |
| EXECUTE | Run tools, orchestrate workflows, trigger external side effects, call deploy/audit/build operations, or invoke long-running automation. | restricted | Preview and confirmation required; elevated approval required for operational actions. |
| ADMIN | Change secrets, Firebase config, package repos, deployment targets, security rules, App Check, billing, IAM, Firestore schemas, or tooling policy. | blocked | Blocked by default. Requires explicit phase approval and a separate implementation plan. |

Risk levels:

- `safe`: read-only and local; no secrets; no external cost; no mutation.
- `caution`: read-only or generative but may call providers/Functions, consume quota, or expose user-provided content to an approved service.
- `restricted`: can mutate state, trigger workflows, or affect external systems; requires confirmation and scoped authorization.
- `blocked`: must not execute through user command surfaces by default.

## Agent Capability Matrix

This matrix describes governance posture, not implemented execution abilities.

| Agent | Status | Current intent | Allowed command categories now | Future possible categories | Notes |
| --- | --- | --- | --- | --- | --- |
| rand0m | system/current | General creative/random AI chat and default fallback. | VIEW preview, local command help, command preview. | QUERY, GENERATE after provider/function boundaries. | No autonomous execution. Default fallback agent. |
| dai1y | system/current | Daily briefing, planning, facts, reminders, trends. | VIEW preview, local command help, command preview. | QUERY, GENERATE after source/cost boundaries. | News/stocks/products require fresh-data policy and citations if added. |
| knight1y | system/current | Organize, protect, advance system/product work. | VIEW preview, local command help, command preview. | QUERY, GENERATE, limited MODIFY after confirmation. | Must not become default route/command executor by accident. |
| aut0mate | system/current, hidden by default | QA, tests, bugs, automation planning. | VIEW preview, local command help, command preview. | QUERY and GENERATE for QA plans; EXECUTE only in a later explicit automation phase. | No test/build/shell execution through commands yet. |
| temp1ate | future/product | Templates, boilerplates, scaffolds, checklists, reusable artifacts. | Preview metadata only where visible in host app. | GENERATE copy-ready content; file generation only after confirmation in a later phase. | Do not write files by default. |
| va1idat0r | future/product | Review, validate requirements, consistency, quality gates. | Preview metadata only where visible in host app. | QUERY and GENERATE review findings; EXECUTE validations only after explicit phase approval. | Do not claim to run tests or modify files. |

Other active product agents in `rk_agents` can advertise preview-only action metadata through capability policies. This document does not grant them execution abilities. Every executable handler must be explicitly mapped by category, action id, agent id, auth requirement, confirmation requirement, and logging policy.

## Preview, Confirmation, And Permission Requirements

### Preview Only

Preview-only commands may:

- parse command shape
- resolve a known target agent
- display local action/tool metadata
- show what would happen
- log safe local preview metadata

Preview-only commands must not:

- call AI providers
- call Firebase Functions unless the specific preview-only behavior already requires it and preserves no-side-effect semantics
- write Firestore
- mutate Hive except for preview log events
- execute tools
- run shell/build/deploy commands
- expose secrets

Current examples:

- `/help`
- `/preview`
- `@agent /preview`

### Confirmation Required

Future commands require explicit user confirmation when they:

- mutate Hive or app settings
- create, update, or delete local records
- call AI providers or paid APIs
- send user content to a cloud Function/provider
- generate content intended to be saved or applied
- perform any external network action beyond a safe preview
- start a long-running operation

Confirmation must show:

- target agent
- command category
- risk level
- affected data/resources
- external services/functions/providers
- expected writes or side effects
- estimated cost/time when available
- exact user-visible action to confirm

### Elevated Approval Required

Elevated approval is required for:

- deploys
- build/test/tooling execution from a command surface
- package repository changes
- Firebase Function/config/security rule changes
- Firestore writes or migrations
- file writes outside approved app-local user-owned output areas
- operations requiring secrets or service accounts

Elevated approval must be separate from ordinary UI confirmation and should not be bundled into agent chat consent.

### Blocked

Blocked by default:

- arbitrary shell execution
- file deletion or recursive filesystem mutation
- git reset/restore/checkout/rebase/push from command surfaces
- package publishing/tagging
- Firebase deploy/config mutation/IAM/App Check/security rules
- secret reads, secret printing, key rotation, Secret Manager migration
- autonomous agent-to-agent loops
- ADMIN commands
- unconfirmed MODIFY or EXECUTE commands

## Execution Lifecycle States

Required lifecycle states for future execution records:

1. Requested
   - Raw user command was entered or selected.
   - No interpretation or side effect yet.

2. Parsed
   - Command parser produced command intent fields.
   - Unknown/invalid shapes stop here with safe feedback.

3. Previewed
   - User sees target agent, category, risk, planned action, affected data, and required permissions.
   - Preview may be local or backed by `runAgentActionPreview` if no side effects are preserved.

4. Confirmed
   - User explicitly approves a specific preview.
   - Confirmation must bind to an immutable preview id/hash to avoid time-of-check/time-of-use drift.

5. Executed
   - Approved handler runs within a scoped local or callable boundary.
   - Execution must not exceed the confirmed preview category/scope.

6. Succeeded
   - Handler completed and returned safe result metadata.
   - Result is shown and logged without secrets or raw provider errors.

7. Failed
   - Handler failed with safe error semantics.
   - Failure logs must contain safe details only.

8. Cancelled
   - User or system cancelled before execution completed.
   - No further side effects should occur after cancellation where cancellation is supported.

State transition rule: execution cannot move from Requested/Parsed directly to Executed. Preview is mandatory for all commands, and Confirmed is mandatory for any command beyond safe VIEW.

## Home Terminal Future Participation Model

Current state:

- Display-only.
- Shows runtime journal and active agent line.
- No input field.
- No command execution.

Future command-input model:

- Terminal input should use the same parser and preview model as Agent Chat.
- Active agent resolution should follow the existing order: active favorite agent, visible system agent, fallback `rand0m`.
- The first terminal command phase must be preview-first only.
- Terminal should never become a privileged shell.
- Terminal confirmation UI must make side effects obvious and should not execute on Enter alone for restricted categories.
- Terminal should surface lifecycle state text for preview/confirmed/executed/succeeded/failed/cancelled.

Boundary:

- Home Terminal may eventually initiate commands, but it must not bypass Agent Chat safety, auth, confirmation, or logging requirements.

## Safety Model

Mandatory safety rules:

- No raw secret exposure in UI, logs, provider prompts, Function errors, or debug output.
- No provider error payload leakage; map provider failures to safe user-facing messages.
- No unconfirmed destructive actions.
- No ADMIN execution by default.
- No arbitrary shell execution from app command surfaces.
- No package, tooling, Firebase, Firestore, App Check, IAM, env, or deployment mutations without explicit phase approval.
- No hidden provider calls from preview-only commands.
- No Firestore writes until security rules, retention, and audit logging are designed.
- No autonomous agent-to-agent orchestration until loop limits, cancellation, logging, and user control are defined.
- All command handlers must have bounded input sizes, schema validation, timeout/cancellation strategy, and safe failure semantics.
- All future cloud-backed command Functions must preserve `unauthenticated`, `permission-denied`, `invalid-argument`, `internal`, and `unavailable` semantics.

## Logging Model

### Local Logging

Log locally for preview and future execution lifecycle:

- timestamp
- lifecycle state
- raw command after redaction and length cap
- command id/name
- target agent
- active agent/context
- category
- risk level
- preview status
- confirmation status
- handler id if any
- safe result summary
- safe error code/message
- mode, for example `preview-only` or future `confirmed-execution`

Current local preview logging is acceptable as the seed.

### Do Not Log

Never log:

- API keys, OAuth tokens, Firebase tokens, service account material, session secrets
- raw provider responses unless a product decision explicitly treats them as user-owned history
- raw provider error bodies
- secret-bearing URLs or headers
- full file contents by default
- personally sensitive user content beyond the minimum command preview/history need
- unredacted command arguments

### Redaction Requirements

Minimum redaction must cover:

- `api_key`, `apikey`, `token`, `secret`, `password` assignment shapes
- common AI key prefixes such as `sk-...`
- Google key prefixes such as `AIza...`
- bearer tokens and auth headers if command surfaces ever accept headers
- long command text with a length cap

### Future Cloud Logging

Cloud logging is not part of P8.6. If added later, it must define:

- purpose and user value
- Firestore collection/schema
- security rules
- retention/deletion policy
- redaction at client and server boundaries
- whether logs are per-user, internal-team, or shared
- migration path from local-only logs

## P8.7 Recommended Implementation Sequence

P8.7 should remain small and should not jump directly to broad execution.

1. Command taxonomy model only
   - Add app-local enums/models for category, risk, lifecycle state, confirmation requirement, and permission requirement.
   - No execution handlers.

2. Preview policy resolver
   - Map parsed command plus agent/action metadata to category/risk/required confirmation.
   - Include blocked outcomes for unknown, admin, and unsupported actions.
   - No side effects.

3. Confirmation preview UI
   - Show category, risk, affected resources, and required permissions for previewed commands.
   - Confirmation button may be disabled/stubbed at first.
   - Home Terminal remains display-only.

4. Lifecycle logging expansion
   - Extend local logs to include category, risk, lifecycle state, and confirmation-required fields.
   - Keep redaction and no provider/Firebase side effects.

5. First safe executable candidate selection
   - Choose one VIEW command only, preferably local and read-only, such as showing active agent/runtime summary.
   - Implement behind an explicit phase approval.
   - No MODIFY, EXECUTE, or ADMIN commands.

6. Optional callable preview integration
   - Connect specific preview actions to `runAgentActionPreview` only if no backend change is required and preview-only behavior remains true.
   - Preserve auth and safe callable errors.

7. Later restricted execution phases
   - Add one handler at a time.
   - Each handler needs tests, confirmation, logging, auth, cancellation/failure behavior, and deploy plan if backend-backed.
   - ADMIN remains blocked unless a separate infrastructure phase approves a narrow operation.

P8.7 success gate: command governance models and preview policy are visible and testable, while real execution remains disabled unless explicitly approved in that phase.

## Files Audited

- `C:\Projects\dev-kitt\CODEX.md`
- `C:\Projects\dev-kitt\RUNBOOK.md`
- `C:\Projects\qa-kitt\.github\READLESS\architecture\p8-post-migration-app-audit-agent-command-plan.md`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\agents\command_preview.dart`
- `C:\Projects\dev-kitt\apps\rand0m\test\agent_command_preview_test.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\agents\execution_bridge.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\agents\history.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\favorites\favorite_hive_service.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\favorites\agent_favorite_service.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\widgets\home\terminal.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\widgets\home\flipcard.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\pages\agents\messages.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\pages\auth\sign_in.dart`
- `C:\Projects\dev-kitt\apps\rand0m\lib\services\auth\auth.dart`
- `C:\Projects\dev-kitt\apps\rand0m\functions\src\index.ts`
- `C:\Projects\dev-kitt\packages\rk_agents\lib\src\action.dart`
- `C:\Projects\dev-kitt\packages\rk_agents\lib\src\action_registry.dart`
- `C:\Projects\dev-kitt\packages\rk_agents\lib\src\definition.dart`

## Explicit Non-Changes

No runtime code was changed for P8.6. No Firebase Functions, command handlers, Home Terminal input, Firestore writes, package changes, validation runs, or deployment are part of this phase.
