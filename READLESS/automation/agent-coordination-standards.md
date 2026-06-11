# Agent Coordination Standards

Date: 2026-06-11 (updated session 10)
Author: Docs agent (from Fable PM ruling + owner directives)
Scope: all agents operating in the Random Knights multi-agent ecosystem

These standards apply to every agent session. They resolve coordination failure
modes observed across Earth / Fixes / Docs / Fable / Systems / Connect parallel runs.

---

## 1. Single-Recipient Callout Rule

Each inter-agent callout targets exactly one recipient agent. Use fixed headings:

```
DOCS:     <one line>
FIXES:    <one line>
EARTH:    <one line>
FABLE:    <one line>
SYSTEMS:  <one line>
CONNECT:  <one line>
```

Rules:

- One heading per callout. Do not combine recipients in a single block.
- One line per callout. If more than one line is needed, it is two callouts.
- **SHAs not prose.** Reference work by commit SHA (`338ee40`) or branch name,
  not by description ("the extraction I just did"). Prose is ambiguous across
  context windows; SHAs are not.
- **Docs agent is the sole fan-out point.** Agents do not write to
  `EARTH-ROADMAP.md` or other READLESS docs directly. They emit `DOCS:` callouts
  and Docs agent applies them. This prevents concurrent write conflicts on shared
  planning documents.

---

## 2. Verify-from-Git Rule

Handoffs and callouts carry only verifiable git state. Never include transcript
excerpts, prose summaries of what was done, or self-reported outcomes.

Handoff must include:

- Branch name + tip SHA (e.g., `earth/scientist-session-continuity @ 338ee40`)
- State: one of `committed` / `pushed` / `merged` / `deployed`
- Phase position (e.g., `Phases 0–2 complete, Phases 3–4 next`)
- Exact next command (copy-paste ready; see HANDOFF Protocol below)

The receiving agent verifies the SHA with `git log` before acting. If the SHA
does not exist in the remote, the handoff is incomplete — stop and emit a
`DOCS:` callout flagging the discrepancy rather than proceeding on stale state.

---

## 3. Scoped Roadmap Reads

Agents read only the minimum roadmap sections needed for the current run.

| Run type | Sections to read |
| --- | --- |
| Routine bootstrap / feature run | Now, Next, Pivots |
| Merge or deploy run | Now, Next, Deploy Checkpoint Status |
| Coordination / standards question | Agent Coordination Standards (this doc) |
| Full audit | Entire roadmap |

Do not scan the full roadmap on every run. The Now/Next/Pivots triad is
sufficient for the vast majority of sessions.

---

## 4. Path-Ownership Parallelism Matrix

| Agent | Worktree | Owns (write) | Read-only | Never touches |
| --- | --- | --- | --- | --- |
| Earth | main clone (`apps/rand0m`) | `lib/pages/earth/**`, `lib/widgets/earth/**`, `lib/services/earth/**`, `lib/models/earth/**`, `test/connect/earth_*`; **sole owner of `earth_source_*_catalog.dart` + `earth_source_registry.dart`** | all other app paths | qa-kitt, CI workflows (unless phase explicitly scopes it) |
| Systems | `worktrees\rand0m-systems` | Earth-Systems data paths: ocean/ice providers, data-layer adapters; registration deltas handed to Earth via `EARTH:` callout | Earth paths (read for context) | `earth_source_*_catalog.dart`, `earth_source_registry.dart` (Earth-agent-only), Connect paths |
| Connect | `worktrees\rand0m-connect` | `lib/pages/connect/**`, `lib/widgets/connect/**`, `lib/services/connect/**`, `lib/models/connect/**` | Earth paths (read for context) | `earth_source_*_catalog.dart`, `earth_source_registry.dart`, Systems data paths |
| Fixes | main clone (CI paths only) | CI workflows (`*.yml`), branch hygiene, stale test repair | all app paths (read for diagnosis) | earth/systems/connect feature files during an active feature phase |
| Docs | qa-kitt clone | `qa-kitt/.github/READLESS/**`, `dev-kitt/CODEX.md` (local root) | all repos (read for context) | app runtime files, CI workflows, Flutter code |
| Fable | none — read-only | none | all repos (read for context) | any file write without explicit owner directive |

**Concurrent work is safe only when paths are disjoint.** If two agents need to
touch the same file in the same session, the later agent must pull and rebase
before editing.

**Writer cap: 5 simultaneous app writers maximum** (Earth, Systems, Connect, Fixes + 1 reserve). Do not add a sixth concurrent writer to `apps/rand0m` without owner approval and a dedicated worktree.

### Earth Layer Taxonomy Status

| Taxonomy group | Status | Notes |
| --- | --- | --- |
| Earth Systems (ocean, ice, atmosphere) | **Active** | Systems agent owns data vertical |
| Environmental (air quality, biodiversity) | **Next-up** | Earth agent; not yet started |
| Human Activity (flights, shipping, cities) | **Frozen** | Overlay governance restriction; do not implement without explicit approval |
| Projects / VCM (carbon offsets, restoration) | **Spec-first** | Pending Fable governance specs; no implementation without approved spec |
| Entities (species, protected areas) | **Spec-first** | Pending Fable governance specs; no implementation without approved spec |

---

## 7. Worktree Isolation Rule

Every agent that writes to `apps/rand0m` in parallel **must use a dedicated git
worktree**. Only Earth agent uses the main clone.

| Agent | Worktree path |
| --- | --- |
| Earth | `C:\Projects\dev-kitt\apps\rand0m` (main clone) |
| Systems | `C:\Projects\dev-kitt\worktrees\rand0m-systems` |
| Connect | `C:\Projects\dev-kitt\worktrees\rand0m-connect` |
| Fixes | main clone — CI/workflow paths only; no feature file checkout |

Rules:

- **No `git checkout` or `git switch` outside your own worktree.** Checking out
  a branch in a worktree another agent holds corrupts that agent's working tree
  without warning.
- **Each worktree stays on its own branch** for the duration of a phase.
  Do not share a branch across worktrees.
- **Worktree setup (one-time, owner performs):**
  ```powershell
  git -C "C:\Projects\dev-kitt\apps\rand0m" worktree add ..\..\..\worktrees\rand0m-systems earth/data-ocean-live
  git -C "C:\Projects\dev-kitt\apps\rand0m" worktree add ..\..\..\worktrees\rand0m-connect feature/c2-0-source-onboarding-pipeline
  ```
- **Worktree teardown:** run `git worktree remove <path>` after the branch merges
  and the worktree is no longer needed.

---

## 8. Catalog Non-Touch Rule

`earth_source_*_catalog.dart` and `earth_source_registry.dart` are
**Earth-agent-only files**. No other agent edits them directly.

- Systems agent and Connect agent that need to register new sources or layers
  emit an `EARTH:` callout with the registration delta (source ID, metadata,
  catalog entry shape). Earth agent applies the registration in its own worktree.
- This prevents concurrent edit conflicts on the shared source-of-truth catalog
  and ensures overlay governance rules are applied by the agent that owns them.
- If a registration is urgent and Earth agent is unavailable, escalate via a
  `DOCS:` callout so the owner can unblock manually. Do not bypass this rule.

---

## 5. HANDOFF Protocol

Every agent run ends with a HANDOFF block — even if no code changed.

Format (emit as a `DOCS:` callout at end of run):

```
DOCS: HANDOFF
  branch:   <branch-name> @ <sha>  (or "main @ <sha>" if merged)
  state:    committed | pushed | merged | deployed
  phase:    <description, e.g. "Phases 0-2 complete">
  next:     <exact copy-paste command for the next agent>
```

Rules:

- **At ~80% context:** finish the current atomic slice (one coherent unit of
  work), commit and push it clean, emit the HANDOFF, and stop. Do not start a
  new slice when context is low.
- **Atomic slice:** the smallest unit that leaves the branch in a buildable,
  testable state. A partial extraction or a half-wired controller is not atomic.
- **Persisted by Docs agent:** Docs agent moves the HANDOFF `next:` field into
  the roadmap Now section so the next session starts from a written record, not
  a transcript.
- **No "I think I did X" language.** The SHA is the record. If it is not
  committed, it did not happen.

---

## 6. Roadmap-vs-Git Ancestry Anomaly (Closed)

**Anomaly (sessions 1–2):** EARTH-ROADMAP.md listed `earthview-ui-cleanup` and
`live-connections-batch` as "pushed & green, checkpoint pending" when
`git merge-base` showed both branch tips were already ancestors of `origin/main`
(i.e., already merged). The roadmap also reported `origin/main = 75e46b6` when
the actual tip at that moment was `1dea432`.

**Root cause:** roadmap was seeded from session memory rather than from
`git log` / `git merge-base` verification.

**Resolution (session 3):** owner callout corrected the SHA and branch states.
Roadmap has reflected verified git state since session 3.

**Standing rule:** always verify `origin/main` SHA with `git log -1 origin/main`
before recording it in the roadmap. Never copy a SHA from a prior session's
prose without re-running the git command.

**Status: closed.**
