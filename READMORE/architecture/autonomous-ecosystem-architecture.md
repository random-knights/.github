# Autonomous Ecosystem Architecture (Z1.1)

> **Status:** Planning only. This document models the six system-tier agents and
> the end-to-end submission→deploy flow that runs on the infrastructure defined
> in [autonomous-infrastructure-plan.md](autonomous-infrastructure-plan.md)
> (Z1.0). It introduces **no** code, workflows, package bumps, secrets, or
> provider calls.
>
> **Hard requirement, restated up front:** the autonomous ecosystem **reuses**
> the existing governed-command model
> (`apps/rand0m/lib/services/agents/command_policy.dart`) — its
> `Category` / `Risk` / `Lifecycle` enums and its `preview → confirm →
> elevated-approval` gates — as the one governance primitive. There is **no
> autonomous production deploy without human approval.**

## Doc-path drift

CODEX/RUNBOOK still say **`READLESS`**; the canonical tree is
**`.github/READMORE/architecture/`** (this file). See the matching callout in
Z1.0 and the PR body.

---

## 1. The four-role agent model

Every agent is modeled as four cooperating roles. This is a *pattern*, not four
processes — one agent plays all four roles across a task's lifecycle.

| Role | Responsibility | Bound to lifecycle state |
| --- | --- | --- |
| **Listener** | Subscribe to intake (GitHub issues/PRs, Test/Inspect submissions, queue events). Normalize into a task. | `requested → parsed` |
| **Reasoner** | Classify, research (Qdrant RAG over READMORE/ADRs/prior plans), and produce a **plan as an immutable, fingerprinted preview**. | `parsed → previewed` |
| **Actor** | After human confirm, perform the allowed action (generate files, open a PR via `githubProxy`, run a suite). Bounded by the capability allowlist. | `confirmed → executed` |
| **Validator** | Check the result against requirements/quality gates; emit findings; advance or fail the task. | `executed → succeeded \| failed` |

Each role consults — never re-implements — the governance authority
(`AgentCommandPreviewPolicyResolver.resolve(...)`). A Reasoner can only emit a
preview; only the Actor of a **Pro-gated, system-tier, allowlisted** action may
move past `confirmed`, and only after a human supplies the confirm/elevated
approval.

### 1.1 Memory

- **Working memory**: the Firestore task document (lifecycle state, preview id,
  fingerprint, classification, plan, findings, approver). Source of truth.
- **Long-term memory**: Qdrant collections — `public_docs` (READMORE/ADRs) and
  `private_context` (prior plans + outcomes, audit history, fixtures), split on
  the public/private boundary. An agent's retrieval scope is bounded by its
  permissions.
- **Definitional memory**: the agent's own `AgentDefinition`
  (`defaultPrompt`, `capabilityPolicy`, `runtimePolicy`) from
  `packages/rk_agents` — stable, versioned, inspectable.

### 1.2 Permissions

Permissions are the agent's `AgentCapabilityPolicy`: `toolIds`, `actionIds`,
`capabilities`, and the three default-deny flags (`networkAllowedByDefault`,
`fileAccessAllowedByDefault`, `mediaAccessAllowedByDefault`, all `false`). An
agent may invoke only tools/actions its policy lists, resolved through
`AgentActionRegistry.actionsForAgent` (action must be registered **and** allowed
by the agent's capability/actionId set).

### 1.3 Approval gates, audit logs, lifecycle states

- **Gates**: `previewRequired`, `confirmationRequired`, `elevatedApprovalRequired`
  from `AgentCommandPolicy`. `execute`/`admin` categories require elevated human
  approval; nothing executes from a `view`-only preview.
- **Audit**: one immutable Firestore record per governed action — `previewId`,
  `previewFingerprint` (FNV-1a-32, `command_integrity.dart`), category, risk,
  every lifecycle transition + timestamp, acting agent, human approver.
- **Lifecycle**: `requested → parsed → previewed → confirmed → executed →
  succeeded | failed | cancelled` (`AgentCommandLifecycleState`), with
  confirmation bound to the preview fingerprint and a 5-minute TTL.

### 1.4 Task queues

Cloud Tasks dispatches between roles/stages with retry+backoff and rate limits;
Firestore holds the durable lifecycle. A failed actor step returns the task to a
safe state (`failed`/`cancelled`), never a silent partial.

---

## 2. The six agents (responsibility map)

All six are **system-tier** (`AgentTierKind.system`) in
`packages/rk_agents/lib/src/definition.dart`, which is exactly what makes them
eligible for Pro-gated custom-action execution
(`AgentDefinitionsRegistry.isSystemTierAgent`). Core-tier agents (`rand0m`,
`dai1y`, `knight1y`) are **not** part of the autonomous actor set; they remain
the always-visible flagship roster.

| Agent | Primary role | Tier / visibility | Owns (governed surface) | Default execution |
| --- | --- | --- | --- | --- |
| **aut0mate** | **PRIMARY** — web scraper / QA automation (the Malabar squirrel) | system, `visibleByDefault: false` | Web/DOM scraping, site analysis, test automation, bug finding & reporting | preview-only until Pro-gated |
| **eng1neer** | Test runner / QA strategy | system, experimental | `engineer.test_strategy`, `engineer.test_plan`, `engineer.coverage_review`, `engineer.regression_suite`, `engineer.qa_checklist`, `engineer.test_gaps` (tools `chat.context`, `qa.automation`) | preview-only until Pro-gated |
| **deve10per** | Software development | system | Code, debug, refactor, docs, tests; generates the change set / PR | preview-only until Pro-gated |
| **va1idat0r** | Validator / quality gate | system, experimental | `validation.review/requirements/architecture/test_plan/audit_changes/quality_gate/consistency` (tool `validation.checks`) | preview-only until Pro-gated |
| **temp1ate** | Templates / scaffolds | system, experimental | `template.generate/readme/test_plan/adr/release_notes/flutter_widget` (tool `template.library`) | preview-only until Pro-gated |
| **scient1st** | Earth+ domain expert | system | Earth Intelligence reasoning, hypotheses, safe experiment design, science explainers | preview-only until Pro-gated |

**Responsibility flow in one line:** `aut0mate` scouts and reproduces →
`eng1neer` designs the test/regression coverage → `deve10per` implements →
`va1idat0r` gates quality → `temp1ate` supplies repeatable structure (ADRs,
release notes, scaffolds) → `scient1st` advises wherever the task touches the
Earth/science domain. None of them can deploy.

### 2.1 Why aut0mate is PRIMARY but hidden

`aut0mate` is `visibleByDefault: false` — it is the automation engine, not a
roster personality. In the autonomous loop it is the lead Listener/Actor for
scraping and reproduction, but its actions are still governed by the same
preview→confirm→execute gates and the Pro/system-tier execution check as every
other agent.

---

## 3. Core flow: submission → human-approved deploy

```text
 submission ─▶ intake ─▶ classification ─▶ research ─▶ plan ─▶ [HUMAN approve]
     │            │            │              │          │            │
  GitHub issue  Listener    Reasoner       Reasoner   Reasoner   confirm gate
  /Test-Inspect (parsed)   (category/risk) (Qdrant)  (preview,   (fingerprint-
  /webhook                                            fingerprint) bound)
                                                                   │
        ┌──────────────────────────────────────────────────────────┘
        ▼
 implementation ─▶ validation ─▶ release candidate ─▶ [HUMAN approve] ─▶ deploy
     │                │                │                     │              │
   Actor           Validator       merge to `main`     elevated approval  90-prod-
  (deve10per/     (va1idat0r       (main = RC,          + workflow_        release
   aut0mate via    quality gate)    nothing deploys)    dispatch)         .yml
   githubProxy)
```

Stage-by-stage:

1. **Submission.** A request enters as a GitHub issue, a Test/Inspect
   "submit a bug / feature request → /123 issue", or a webhook.
2. **Intake (Listener).** Normalized into a Firestore task, state `requested →
   parsed`. Identity/entitlement resolved (free/pro/org; `@rand0m.ai` = org).
3. **Classification (Reasoner).** Mapped to a `Category` and derived `Risk` via
   the policy resolver. This decides which gates apply downstream.
4. **Research (Reasoner).** Qdrant RAG over `public_docs` (+ `private_context`
   if permitted) — prior plans, ADRs, fixtures.
5. **Plan (Reasoner).** Rendered as an **immutable, fingerprinted preview**
   (`previewId` + FNV-1a-32 fingerprint, 5-min TTL). Posted as a PR comment.
   Lifecycle stops at `previewed`.
6. **Approval (human).** A maintainer confirms; the confirm validator checks the
   `previewId` + fingerprint match the immutable preview and is unexpired
   (`command_confirmation.dart`). State → `confirmed`.
7. **Implementation (Actor).** Only now, and only for a Pro-gated, system-tier,
   allowlisted action, does the agent act: `deve10per`/`aut0mate` generate the
   change and open a PR via `githubProxy`. State → `executed`.
8. **Validation (Validator).** `va1idat0r` runs the quality gate; findings
   posted. State → `succeeded | failed`.
9. **Release candidate.** PR merges to `main`. **`main` is a release candidate —
   nothing deploys.** Staging smoke runs via `80-test-deploy-smoke.yml` →
   `https://randomknights-xyz.web.app`.
10. **Human-approved deploy.** A maintainer triggers `90-production-release.yml`
    (`workflow_dispatch`, protected `production` environment, manual approval) →
    production Hosting → smoke `https://ai-rand0m.web.app` and
    `https://rand0m.ai`. No other path reaches production.

---

## 4. Governance primitive (reused verbatim)

The flow above is just lifecycle states + gates from `command_policy.dart`. The
ecosystem adds **no** new governance concepts; it instantiates the existing ones.

- **Category**: `view · query · generate · modify · execute · admin`.
- **Risk**: `safe · caution · restricted · blocked` (derived from category).
- **Lifecycle**: `requested → parsed → previewed → confirmed → executed →
  succeeded | failed | cancelled`.
- **Gates**: preview (always) → confirm (query+ ) → elevated approval
  (execute/admin).
- **Execution gate (Pro-tier):** execute-capable **iff**
  `customActionCommandsEnabled` (Agents Pro) **and** action allowlisted for the
  agent **and** agent is system-tier. This "changes the executability decision
  only — never WHAT the action does, nor the allowlist." Free/standard callers
  stay preview-only.

| Category | Example autonomous action | Confirm | Elevated approval |
| --- | --- | --- | --- |
| view | read agent metadata, read a plan | no | no |
| query | site analysis, DOM summary, coverage read | yes | no |
| generate | draft plan, template, test strategy | yes | no |
| modify | write change set, open PR | yes | no |
| execute | run suite, run scan/audit | yes | **yes** |
| admin | deploy, firebase, secret, iam, appcheck | yes | **yes** (and `blocked` risk by default) |

`admin` — which includes **deploy** — is `blocked` risk and never autonomous.

---

## 5. Intake surfaces

### 5.1 GitHub intake

GitHub is the canonical intake and output. Submissions arrive as issues
(including the Test/Inspect "submit issue" path) or webhooks; agent output is a
PR on `main`. **All** GitHub writes are brokered by the `githubProxy` Firebase
callable — GitHub App auth (JWT → installation token) and every write happen
server-side, and the client/runtime only ever sees the resulting **URL + status**
(`github_submit_service.dart`). No token ever reaches an agent or client.

### 5.2 The Test/Inspect command center

`apps/rand0m/lib/pages/agents/secret.dart` ("Rand0m Automated Tests") is the
current human command center and the model for the autonomous surface. It already
wires the tools the agents will drive under governance:

- **Web/DOM analysis** — `dom_collector` + `analyzeSiteFromSitemap`
  (`site_analysis_model.dart`): returns **safe summaries only** (status, title,
  meta counts — never headers, payloads, or secrets). `aut0mate`'s scouting tool.
- **Test creation & recording** — `test_creator`, `test_recorder` (T5 same-origin
  live capture + T6 cross-origin bookmarklet ingest), export bundles.
  `eng1neer`'s coverage surface.
- **Validators** — Lighthouse (`runPageSpeedAudit`) and the AI content validator
  (`scanContentUrl`): server-gated, per-uid quota. `va1idat0r`'s gates.
- **Issue/PR submission** — `githubProxy` via `GithubSubmitService`. The output
  channel.
- **Live agent console** — `_sendConsoleAgentPrompt` → `TransmitService`, scoped
  to **system agents** (`AgentRosterOrder.systemAgents`), with provider/BYOK
  resolution, throttling, and AIEDS accounting on the server. This is the human's
  governed entry point to the same agents the loop drives.

Entitlement gating is already enforced here: owner-grade `@rand0m.ai` accounts
see full tooling; allowlisted external testers see the client-only beta surface
(no permission-denied callables, no repo-123 infra); free users get preview +
BYOK assist. The autonomous loop inherits these exact tiers.

### 5.3 The Knight1y terminal path

`knight1y` is a **page/surface** inside the single app (the agent command space),
not a separate product (see [ecosystem.md](ecosystem/ecosystem.md): the four-app
model is retired). It is the human-facing terminal where an operator can converse
with the roster and issue governed commands. In the autonomous ecosystem it is a
**control/observation console**: a maintainer watches lifecycle states, inspects
fingerprinted previews, and supplies confirm/elevated approvals. It is never a
bypass — a command typed there still passes through
`AgentCommandPreviewPolicyResolver` and the same gates.

---

## 6. Pro-tier boundaries in the ecosystem

- **free**: preview-only everywhere; may use BYOK keys for AI assist via the
  governed transmit path. Sees the client-only beta surface where applicable.
- **pro**: holds the custom-action entitlement (`customActionCommandsEnabled`).
  System-tier agents' allowlisted actions become execute-capable **through**
  preview→confirm→execute — never outside it.
- **org** (`@rand0m.ai`, owner-grade): full tooling and the privileged callables.

The boundary is an **executability** decision only. No tier changes *what* an
action does or *which* actions exist; the allowlist is fixed in
`AgentActionRegistry`.

---

## 7. Public / private data boundary

- **Public**: READMORE/ADRs, public ecosystem docs, the public app surface,
  Qdrant `public_docs`. Any agent may read.
- **Private**: internal plans, audit history, repo-123 issue context, fixtures,
  Qdrant `private_context`. Server-side only; reachable only by agents whose
  permissions allow it.
- Tools already honor "summaries out, secrets stay in": site/DOM analysis return
  safe fields only; `githubProxy` returns only a URL. The loop must not widen
  these outputs.

---

## 8. Failure / fallback model

| Failure | Detection | Fallback (fail-closed) |
| --- | --- | --- |
| Misclassification / ambiguous request | Reasoner low confidence | downgrade to `view`/preview-only; ask a human |
| Preview expired (5-min TTL) before confirm | confirm validator | `cancelled`; re-preview; never execute stale |
| Fingerprint / previewId mismatch | confirm validator | reject as `failed`; never execute an altered plan |
| Provider rate-limit / outage | actor call error | `failed`; Cloud Tasks backoff + retry; escalate after N |
| Budget / quota exceeded | pre-dispatch + per-uid quota | hold at `previewed`; notify human |
| Quality gate fails | `va1idat0r` | block PR; `failed`; post findings |
| Agent invokes out-of-scope tool | capability allowlist / registry | deny; audit |
| Partial/incomplete `.env` at deploy | deploy preflight | abort; never push partial prod env |
| Agent attempts production deploy | — | **no autonomous path exists**; deploy is `workflow_dispatch` + manual approval only |

Every fallback resolves toward **less** capability and **more** human visibility.
An agent that proposed a plan can never be the approver of its own elevated
action.

---

## 9. Agent lifecycle states (runtime)

Beyond per-command lifecycle, each agent process has operational states:

- **idle** — subscribed, no active task.
- **listening** — consuming intake.
- **reasoning** — classifying/researching/planning (emits previews only).
- **awaiting-approval** — plan previewed; blocked on a human confirm/elevated
  approval.
- **acting** — executing a confirmed, Pro-gated, allowlisted action.
- **validating** — checking results / running gates.
- **halted** — `AUTONOMOUS_EXECUTION=disabled` or kill-switch engaged: intake and
  preview continue, all actor steps refuse.

`halted` is the safe default for new deployments and for the MVP (Z1.0 §4).

---

## 10. Summary

The autonomous ecosystem is six **system-tier** agents
(`aut0mate` primary, plus `eng1neer`, `deve10per`, `va1idat0r`, `temp1ate`,
`scient1st`) playing listener→reasoner→actor→validator roles over a
Firestore-backed, Cloud-Tasks-dispatched lifecycle, taking a submission from
GitHub/Test-Inspect intake through classification, research, a fingerprinted
plan preview, **human approval**, implementation (PR via `githubProxy`),
validation, and a release candidate on `main` — where it **stops** until a human
runs `90-production-release.yml`. Governance is not reinvented: the existing
`command_policy` Category/Risk/Lifecycle model and its preview→confirm→
elevated-approval gates, plus the Pro/system-tier execution check, are the single
authority. There is no autonomous production deploy.
