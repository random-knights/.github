# Rand0m Agent Functions

Date: 2026-05-30

This note records the active Firebase Functions surface for agent-adjacent
work in the simplified Rand0m ecosystem.

## Current Project

- Firebase project: `randomknights-xyz`
- Primary app: `apps/rand0m`
- Production domain: `rand0m.ai`
- Functions source: `apps/rand0m/functions`
- Auth policy: Firebase Auth required, verified email required, and email must
  end with `@rand0m.ai`

## Active Infrastructure Functions

| Function | Purpose | Notes |
| --- | --- | --- |
| `generateAIResponse` | Provider proxy for Gemini, OpenAI, Claude, and Grok/xAI. | Uses the `RANDOM_*` provider key family. |
| `runPageSpeedAudit` | Google PageSpeed audit proxy. | Uses the `RANDOM_*` PageSpeed key family. |
| `scanContentUrl` | URL/content signal scanner for AI content audit surfaces. | Fetches caller-provided URLs and returns metadata/signals. |

## Restored Agent Foundation

| Function | Purpose | Status |
| --- | --- | --- |
| `runAgentActionPreview` | Secure callable preview surface for `eng1neer`, `temp1ate`, and `va1idat0r` actions. | Restored as a non-destructive foundation. |

`runAgentActionPreview` accepts an agent ID, action ID, optional input text, and
optional context list. It returns a structured preview document. It does not:

- write Firestore records
- write files
- execute tools
- call AI providers
- assume the old four-app ecosystem

Supported preview agents:

- `eng1neer`: QA automation, test strategy, regression, coverage, CI quality
- `temp1ate`: templates, scaffolds, boilerplates, reusable artifacts
- `va1idat0r`: validation, review, consistency, quality gates

## Deprecated Historical Function

The old `eng1neer` Firestore trigger on `tasks/{taskId}` is intentionally not
restored. It depended on a task document schema, wrote back to Firestore, and
represented an earlier live-agent experiment. The replacement direction is an
explicit callable boundary with authenticated requests and no implicit task
execution.

If live agent execution returns later, it should be implemented as a separate
phase with:

- explicit action allowlists
- Secret Manager-backed provider access
- rate limiting and abuse controls
- audit logging
- clear preview versus live execution modes
- no broad Firestore triggers without schema ownership

## Verification

Expected checks before deploying function changes:

```powershell
npm --prefix apps/rand0m/functions run build
C:\Projects\dev-kitt\flutter\bin\flutter.bat analyze
C:\Projects\dev-kitt\flutter\bin\flutter.bat test
C:\Projects\dev-kitt\flutter\bin\flutter.bat build web
C:\Projects\dev-kitt\tooling\scripts\validate-all.ps1
```

Deploy only the Rand0m Functions codebase:

```powershell
firebase deploy --only functions --project randomknights-xyz
```

