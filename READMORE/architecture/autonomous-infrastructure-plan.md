# Autonomous Infrastructure Plan (Z1.0)

> **Status:** Planning only. This document evaluates and recommends the
> infrastructure for an autonomous, multi-agent build/test/release loop for the
> Random Knights single app (`apps/rand0m`, rand0m.ai). It introduces **no**
> code, workflows, package bumps, secrets, or provider calls. Every capability
> described here is **gated behind the existing governed-command model** and the
> **manual-only production release** rule. Nothing in this plan authorizes an
> autonomous production deploy.
>
> **Companion:** [autonomous-ecosystem-architecture.md](autonomous-ecosystem-architecture.md)
> (Z1.1) models the six agents and the submission→deploy flow that runs on top of
> this infrastructure.

## Doc-path drift callout

`CODEX.md` and `RUNBOOK.md` refer to the canonical docs tree as **`READLESS`**.
The real, on-disk location is **`.github/READMORE/architecture/`** (this file).
`READLESS` no longer exists in the `.github` repo — it was deleted during the
public-docs reorg and superseded by `READMORE`. Treat `READLESS` in CODEX as a
historical alias for `READMORE`. This drift is called out again in the PR body so
the canonical CODEX can be corrected in a later, separately scoped pass (CODEX
lives in the `dev-kitt` / `readless` world and is out of scope for this docs-only
change).

---

## 1. Scope and non-goals

**Goal.** Define the infrastructure that lets the six system-tier agents
(`deve10per`, `eng1neer`, `scient1st`, `aut0mate`, `temp1ate`, `va1idat0r`) take
a submitted request from intake to a **release candidate on `main`**, with a
human in the loop at the plan-approval and deploy gates.

**Non-goals (hard boundaries).**

- No autonomous production deploy. Production is reached **only** through the
  manual `90-production-release.yml` (`workflow_dispatch`), exactly as today.
- No bypass of the governed-command lifecycle (preview → confirm → execute) or
  of the Pro-tier execution gate.
- No provider API keys, GitHub tokens, or service-account secrets in any client,
  agent prompt, log, or repo. Secrets stay server-side.
- No new deploy targets, Firebase Hosting sites, or workflows are *created* by
  this plan; it only describes how an autonomous control plane would call the
  **existing** ones under human approval.

The platform principles this plan must honor are already written down in
[ecosystem.md](ecosystem/ecosystem.md): keep privileged calls on the backend,
prefer Firebase Functions as the provider boundary, separate dev/test/prod, never
commit `.env`, make emulators the default for contributors, and treat agent
prompts/tools/logs as inspectable platform objects.

---

## 2. Component evaluation

Each subsection states the decision, the reasoning, and the cheapest safe option.

### 2.1 Local LLM (Ollama) vs cloud

| Dimension | Local (Ollama) | Cloud (existing provider boundary) |
| --- | --- | --- |
| Quality on planning/code | Lower (7B–14B class) | Highest (the app already allowlists GoogleAI, OpenAI, ClaudeAI, GrokAI) |
| Ops cost | GPU/host management | None (managed) |
| Marginal $/token | ~0 after hardware | Metered, but accounted via AIEDS |
| Privacy of input | Stays on host | Leaves to provider |
| Determinism for tests | Good (pinned local model) | Provider-version dependent |

**Decision: cloud-first for production, Ollama for local-dev and cheap
pre-classification.** The app already has a disciplined provider boundary —
`AgentRuntimePolicy` defaults to `GoogleAI / gemini-2.5-flash` and allowlists
`GoogleAI, OpenAI, ClaudeAI, GrokAI`, and all privileged provider calls go
through Firebase callables (the `_sendConsoleAgentPrompt` → `TransmitService`
path resolves provider/BYOK, throttling, and AIEDS accounting server-side). The
autonomous runtime should reuse that exact boundary rather than open a second
one. Ollama earns its place for:

- **Local-dev**: contributors run the loop with no production keys (an
  ecosystem principle).
- **Cheap pre-classification / embeddings**: intake triage and vector
  embeddings can run on a local/cheap model before a high-value cloud model is
  spent on planning.

Local models must obey the same per-agent `AgentRuntimePolicy` allowlist concept;
"Ollama" is added as an allowed provider label **only in local/dev profiles**,
never silently in production.

### 2.2 Docker / container strategy

**Decision: Docker Compose for local-dev, Cloud Run for the production worker.**

- **Local-dev (`docker compose`)**: one file brings up `orchestrator` +
  `qdrant` + `ollama` + the Firebase Emulator Suite (Auth, Firestore, Functions,
  Storage). This matches the contributor-default-emulator principle and gives a
  fully offline loop.
- **Production**: the agent worker/orchestrator runs as a **Cloud Run** service
  in the same GCP/Firebase project that backs the app. Cloud Run scales to zero
  (cost control), integrates with IAM and Secret Manager, and keeps the long-
  running agent loop off the client. Firebase Functions remain the *callable
  boundary*; Cloud Run hosts the *durable agent loop* that the callables and the
  task queue feed.

Rationale for splitting Functions vs Cloud Run: callables are request-scoped and
ill-suited to multi-minute agent reasoning loops; Cloud Run gives a long-lived,
horizontally-scalable, scale-to-zero worker without leaving the project's IAM
perimeter.

### 2.3 Vector store (Qdrant)

**Decision: Qdrant, with strict public/private collection separation.**

- Container locally; managed Qdrant (or Cloud Run + persistent disk) in prod.
- Collections are split along the **public/private data boundary** (see §8):
  `public_docs` (READMORE, ADRs, public ecosystem docs) vs `private_context`
  (internal plans, audit history, test fixtures, repo-123 issue context). An
  agent's retrieval scope is bounded by its permissions — a public-surface agent
  never reads `private_context`.
- Use it for: retrieval over the architecture docs and ADRs, prior plans and
  their outcomes (so the loop learns from accepted/rejected plans), and test
  fixtures. It is **memory + RAG**, not a system of record.

### 2.4 Task queue

**Decision: Cloud Tasks in production, Firestore as the durable lifecycle store,
Redis/BullMQ (or in-memory) locally.**

- The **source of truth** for each unit of work is a Firestore task document
  carrying the governed lifecycle state (`requested → parsed → previewed →
  confirmed → executed → succeeded | failed | cancelled`, mirrored from
  `AgentCommandLifecycleState`). This reuses the app's existing Firestore-backed,
  inspectable-object pattern.
- **Cloud Tasks** handles dispatch, retries with backoff, and rate limiting
  between stages. Its per-queue dispatch rate is also a cost/abuse control (§11).
- Locally, a lightweight queue (BullMQ on Redis, or an in-process queue) stands
  in so the loop runs without GCP.

### 2.5 Agent runtime

**Decision: a TypeScript/Node orchestrator (matching the Functions stack) running
the four-role agent pattern, with the Dart `command_policy` model as the
authority on what may execute.**

The runtime is a thin reasoning/dispatch layer. It does **not** redefine
governance — it consults the same Category/Risk/Lifecycle model (§7) that the
Flutter app already enforces, so a command that is preview-only in the app is
preview-only in the autonomous loop. Each agent is modeled as
listener → reasoner → actor → validator (detailed in Z1.1).

### 2.6 GitHub + Firebase integration

**Decision: reuse the existing `githubProxy` GitHub-App pattern; never hand a
token to the runtime or the client.**

- The app already brokers all GitHub writes through the `githubProxy` Firebase
  callable: GitHub App auth (JWT → installation token) and every write happen
  **server-side**, and the client only ever receives the resulting URL and
  status (`GithubSubmitService` / `github_submit_service.dart`). The autonomous
  loop submits issues and PRs through that same broker.
- **GitHub is the intake and the output surface**: requests arrive as issues
  (via the existing Test/Inspect "submit a bug / feature request → /123 issue"
  path, or webhooks), and agent output lands as a PR on `main`.
- **Firebase** provides Auth (identity + org/Pro entitlement), Firestore
  (lifecycle + audit), Functions (privileged boundary), Storage, and App Check
  (abuse prevention).

### 2.7 Tool-permission model

**Decision: extend the per-agent `AgentCapabilityPolicy`, do not invent a new
one.** Each `AgentDefinition` already declares `toolIds`, `actionIds`,
`capabilities`, and three default-deny network/file/media flags
(`networkAllowedByDefault`, `fileAccessAllowedByDefault`,
`mediaAccessAllowedByDefault` — all `false`). The autonomous runtime treats those
as the **allowlist**: an agent may only invoke a tool whose id is in its policy,
and only for actions it owns (`AgentActionRegistry.actionsForAgent` already
enforces "action is registered AND the agent's capability/actionId allows it").
New autonomous tools (e.g. "run Playwright suite", "open PR") are added as
`AgentTool`/`AgentAction` entries gated by the same registry — never as ambient
runtime powers.

### 2.8 Secrets management

**Decision: Google Secret Manager + `functions/.env`, exactly as today; zero
secrets in client, prompt, log, or repo.**

- Provider keys, the GitHub App private key, and the Firebase service-account
  credential live server-side (Secret Manager / function env), never in Flutter
  clients (an explicit ecosystem principle) and never in an agent's prompt or
  retrieval context.
- BYOK keys (free-tier users supplying their own provider key) stay in the
  client `ByokKeyStore` and are used only through the governed transmit path;
  the autonomous runtime uses managed (org/Pro) credentials server-side, not
  user BYOK keys.
- A standing rule from the runbook applies: an **incomplete** function `.env` can
  wipe production function env — so secret changes are out of scope here and
  remain a human, deliberate operation.

### 2.9 Logs / audit trails

**Decision: an immutable, fingerprint-keyed audit record per governed action,
plus Cloud Logging for runtime.**

Every governed action already produces a tamper-evident identity:
`command_integrity.dart` builds a canonical **FNV-1a-32 preview fingerprint** and
a `previewId` with a **5-minute TTL**, and `command_confirmation.dart` refuses to
confirm unless the `previewId` **and** fingerprint match the immutable preview
and it has not expired. The autonomous loop writes one Firestore audit document
per action capturing: `previewId`, `previewFingerprint`, `category`, `riskLevel`,
each lifecycle transition with timestamp, the acting agent, and (for elevated
actions) the human approver. Because confirmation is bound to the fingerprint of
the exact previewed payload, the audit trail proves *what* was approved, not just
*that* something was.

### 2.10 Local-vs-cloud execution

| Concern | Local-dev profile | Production profile |
| --- | --- | --- |
| LLM | Ollama + optional cloud | Cloud via callable boundary |
| Queue | Redis/in-proc | Cloud Tasks |
| Vector | Qdrant container | Managed Qdrant / Cloud Run |
| Firebase | Emulator Suite | Live project, App Check on |
| Secrets | `.env.example`, no prod keys | Secret Manager |
| Execution | `AUTONOMOUS_EXECUTION=disabled` (preview-only) by default | Execution allowed only for Pro-gated, system-tier, allowlisted actions |
| Deploy | Never | `90-production-release.yml`, human-triggered only |

### 2.11 Pro-tier boundaries

The execution gate is already implemented and the autonomous loop must reuse it
verbatim. In `command_policy.dart`, a custom action becomes execute-capable only
when **all** of the following hold:

1. `customActionCommandsEnabled` — the caller holds the **Agents Pro**
   custom-action entitlement, **and**
2. the action is **allowlisted** for the agent
   (`registry.actionsForAgent(resolvedAgent)` contains it), **and**
3. the agent is **system-tier** (`AgentDefinitionsRegistry.isSystemTierAgent`).

Everyone else stays preview-only. The comment in the source is the contract: this
gate "changes the executability decision only — never WHAT the action does, nor
the allowlist of actions." Entitlement tiers are `free / pro / org`; `org`
(`@rand0m.ai`, owner-grade) sees full tooling, allowlisted external testers see
the client-only beta surface, and free users get preview + BYOK assist.

### 2.12 Cost controls

- **Provider/model allowlist** per agent (`AgentRuntimePolicy`) caps which
  (and how expensive a) model an agent may call.
- **Per-uid quotas** already exist on the privileged callables
  (`scanContentUrl`, `analyzeSiteFromSitemap`, `runPageSpeedAudit`); the
  autonomous runtime adds a per-task and per-day token budget enforced before
  dispatch, with AIEDS token accounting as the meter.
- **Scale-to-zero** Cloud Run + **bounded** Cloud Run max-instances.
- **Cheap-first routing**: local/cheap model for triage and embeddings; expensive
  cloud model only after a task passes classification and a budget check.

### 2.13 Rate limits

- App Check on all callables (abuse prevention at the edge).
- Per-uid quotas on the privileged callables (existing).
- Cloud Tasks per-queue dispatch rate between lifecycle stages.
- Provider rate-limit backoff handled in the runtime, surfaced as a `failed`
  lifecycle state with retry, never a silent stall.

### 2.14 Security model (summary)

Least privilege end to end: default-deny capability flags; preview → confirm →
elevated-approval for anything beyond `view`; system-tier + Pro gate for
execution; public/private retrieval boundary; secrets server-side only;
fingerprint-bound, immutable audit; and **no path** from an agent to production
that does not pass through a human-triggered `90-production-release.yml`.

---

## 3. Recommended architecture

```text
                        ┌──────────────────────────────────────────┐
   GitHub intake ──────▶│  Firebase callable boundary (Functions)  │
   (issue / webhook)    │  githubProxy · scanContentUrl ·          │
                        │  analyzeSiteFromSitemap · runPageSpeed…  │
                        └───────────────┬──────────────────────────┘
                                        │ (App Check, per-uid quota, Secret Mgr)
                                        ▼
   ┌───────────────┐   Cloud Tasks   ┌───────────────────────────────┐
   │  Firestore    │◀──────────────▶│  Agent orchestrator (Cloud Run)│
   │  task + audit │  lifecycle      │  listener→reasoner→actor→valid │
   │  (source of   │  states         │  6 system-tier agents          │
   │   truth)      │                 └───────┬───────────────┬────────┘
   └───────────────┘                         │               │
                                 retrieval ▼               ▼ provider calls
                                  ┌──────────────┐   (via callable boundary)
                                  │   Qdrant     │   GoogleAI/OpenAI/Claude/Grok
                                  │ public_docs  │   + Ollama (local/dev only)
                                  │ private_ctx  │
                                  └──────────────┘
   Output: PR on `main` (via githubProxy) ──▶ main = release candidate
                                            ──▶ HUMAN ──▶ 90-production-release.yml
```

The control plane never holds a long-lived production credential of its own that
isn't brokered: GitHub writes go through `githubProxy`, provider calls through the
callable boundary, and deploys through GitHub Actions environments with manual
approval.

---

## 4. MVP setup (smallest useful loop)

1. **Local stack, preview-only.** `docker compose` brings up `orchestrator` +
   `qdrant` + `ollama` + Firebase emulators with `AUTONOMOUS_EXECUTION=disabled`.
2. **Intake.** A GitHub issue (or the Test/Inspect "submit issue" path) creates a
   Firestore task in state `requested`.
3. **Plan, not act.** The orchestrator classifies, researches (Qdrant over
   READMORE/ADRs), and produces a **plan** rendered as a governed *preview*
   (immutable, fingerprinted). It posts the plan as a PR comment. No file is
   written; lifecycle stops at `previewed`.
4. **Human approval.** A maintainer approves the plan (the `confirm` step, bound
   to the preview fingerprint).
5. **Implementation as a PR.** `deve10per` / `aut0mate` generate the change and
   open a PR via `githubProxy`. `va1idat0r` runs the quality gate.
6. **Release candidate.** The PR merges to `main`. `main` is a release candidate;
   **nothing deploys**.
7. **Human-triggered deploy.** A maintainer runs `90-production-release.yml`.

The MVP deliberately keeps execution **off** by default — it proves the
intake→plan→approval→PR loop before any action capability is enabled.

---

## 5. Production-safe setup

- Orchestrator on **Cloud Run** (scale-to-zero, bounded max-instances), in the
  app's GCP/Firebase project, behind IAM.
- **App Check** enforced on every callable; per-uid quotas live.
- **Secret Manager** for provider keys, GitHub App key, and the deploy
  service-account credential; nothing in client/prompt/log/repo.
- Execution enabled **only** for Pro-gated, system-tier, allowlisted actions
  (§2.11); everything else preview-only.
- **Staging** is `80-test-deploy-smoke.yml` → the stable staging Hosting target
  at `https://randomknights-xyz.web.app` (HTTP smoke after deploy). It must not
  touch production.
- **Production** is `90-production-release.yml` only — `workflow_dispatch`,
  protected `production` GitHub environment with **manual approval**, deploys the
  production Hosting site and smokes `https://ai-rand0m.web.app` and
  `https://rand0m.ai`. Merging/pushing to `main` must **never** deploy.
- `99-manual-deploy.yml` remains emergency-only: confirmation-gated, restricted
  to `main`, protected by the `production` environment.
- Respect the **Earth-Only Lockdown** current focus: the autonomous loop is
  scoped and must not expand surface area outside the sanctioned lockdown work
  without an explicit, separately approved phase.

---

## 6. Local-dev setup

- `.env.example` only; no production keys (ecosystem principle).
- Firebase Emulator Suite for Auth, Firestore, Functions, Storage.
- Ollama for LLM; Qdrant container for vectors; in-proc/Redis queue.
- `AUTONOMOUS_EXECUTION=disabled` is the default — the loop previews and plans
  but does not write, submit, or deploy.
- Seed data for agents, sample issues, and a tiny fixture repo so the full
  intake→plan→PR-preview path runs offline.

---

## 7. Security boundaries (the governance primitive)

The autonomous loop **reuses**, and may not weaken, the existing model in
`command_policy.dart`:

- **Category** (`AgentCommandCategory`): `view · query · generate · modify ·
  execute · admin`.
- **Risk** (`AgentCommandRiskLevel`): `safe · caution · restricted · blocked`,
  derived from category (`view→safe … execute→restricted … admin→blocked`).
- **Lifecycle** (`AgentCommandLifecycleState`): `requested → parsed → previewed →
  confirmed → executed → succeeded | failed | cancelled`.
- **Gates** (`AgentCommandPolicy`): `previewRequired`, `confirmationRequired`,
  `elevatedApprovalRequired`, `enabled`, `executionAllowed`.

Mapping enforced by the source today (and inherited by the loop):

| Category | Confirmation | Elevated approval |
| --- | --- | --- |
| view | no | no |
| query | yes | no |
| generate | yes | no |
| modify | yes | no |
| execute | yes | **yes** |
| admin | yes | **yes** |

`admin` (deploy, firebase, secret, iam, appcheck) is `blocked` risk by default.
Confirmation is bound to the immutable preview fingerprint with a 5-minute TTL.
This is the single source of authority — the runtime asks it, it does not
re-implement it.

---

## 8. Public / private data boundary

- **Public**: READMORE docs, ADRs, public ecosystem docs, the public app surface.
  Retrieval collection `public_docs`. Safe for any agent.
- **Private**: internal plans, audit history, repo-123 issue bodies, test
  fixtures, anything behind the org/owner entitlement. Retrieval collection
  `private_context`. Reachable only by agents whose permissions allow it, only
  server-side.
- Callables already enforce this in spirit: `analyzeSiteFromSitemap` and the DOM
  collector return **safe, summarized** fields only (status, title, meta counts —
  never headers, payloads, or secrets), and `githubProxy` returns only a URL.
  The autonomous loop preserves that "summaries out, secrets stay in" posture.

---

## 9. Human-approval gates

Two mandatory human gates, both implemented as the existing `confirm` /
`elevated-approval` step:

1. **Plan approval** — before any `modify`/`execute` action runs, a human
   confirms the fingerprinted plan preview.
2. **Deploy approval** — production is reached only by a human running
   `90-production-release.yml` from the protected `production` environment.

No agent may self-approve either gate. An agent proposing the plan may not be the
approver of its own elevated action.

---

## 10. Failure modes

| Failure | Detection | Response |
| --- | --- | --- |
| Provider rate-limit / outage | call error in actor | task → `failed`, backoff + retry via Cloud Tasks; escalate after N retries |
| Preview expired before confirm | TTL check in `command_confirmation` | task → `cancelled`, re-preview required (no stale execution) |
| Fingerprint/preview mismatch | confirmation validator | reject as `failed`; never execute an altered payload |
| Budget exceeded | pre-dispatch budget check | task held in `previewed`, human notified |
| Validation gate fails | `va1idat0r` quality gate | PR blocked, task → `failed`, findings posted |
| Secret/env incomplete | deploy preflight | abort; never push a partial `.env` to production |
| Agent attempts out-of-scope tool | capability allowlist | denied at registry; audited |
| Production deploy attempted by agent | no autonomous path exists | structurally impossible — deploy is `workflow_dispatch` + manual approval |

Fallback posture is **fail-closed**: any ambiguity downgrades to preview-only and
surfaces to a human.

---

## 11. Operational runbook additions (proposed, for a later phase)

These are **proposed** additions for whoever owns the runbook; this docs-only PR
does not edit the runbook.

- **Autonomous loop bring-up (local):** the gated, no-deploy first command in
  §13.
- **Promotion checklist:** plan approved → PR green → `va1idat0r` gate passed →
  merged to `main` → staging smoke (`80-test-deploy-smoke.yml`) green →
  *human* runs `90-production-release.yml` → production smoke
  (`ai-rand0m.web.app`, `rand0m.ai`) green.
- **Kill switch:** set `AUTONOMOUS_EXECUTION=disabled` (or scale Cloud Run to 0)
  to halt all actor steps while preserving intake/preview.
- **Audit review:** weekly read of the Firestore audit collection — every
  executed action must have a matching human-confirmed, fingerprint-bound
  approval.
- **Identity check before any commit:** verify `user.name=eng1neer`,
  `user.email=eng1neer@rand0m.ai`, and the `github-qakitt` SSH alias on qa-kitt
  repos (this PR followed that rule).

---

## 12. Recommended stack (one-line summary)

**Cloud-first LLM via the existing Firebase-callable provider boundary
(GoogleAI/OpenAI/Claude/Grok), Ollama for local-dev; Docker Compose locally and
Cloud Run in prod; Qdrant for memory/RAG with public/private collection split;
Cloud Tasks for dispatch with Firestore as the durable lifecycle + audit store;
GitHub App brokered through `githubProxy`; Secret Manager for all secrets; and the
Dart `command_policy` Category/Risk/Lifecycle model as the one governance
authority — with production reachable only by a human-triggered
`90-production-release.yml`.**

---

## 13. Recommended FIRST implementation command (gated, no deploy)

Bring up the **local** autonomous control plane in **preview-only** mode. It
deploys nothing, calls no production provider, and exercises only local
containers + the Firebase emulators:

```bash
# Local autonomous stack — preview-only, execution + deploy disabled.
# Touches only local containers and the Firebase Emulator Suite. No prod, no secrets.
AUTONOMOUS_EXECUTION=disabled \
docker compose -f tooling/autonomous/docker-compose.yml up --build \
  orchestrator qdrant ollama emulators
```

This is the smallest safe step: it stands up the orchestrator, Qdrant, Ollama,
and emulators so the intake → classify → research → **plan/preview** path can be
validated end-to-end with execution and deploy held off. Enabling any actor
capability is a later, separately approved phase and still passes through the
preview → confirm → elevated-approval gates and the manual production-release
rule.
