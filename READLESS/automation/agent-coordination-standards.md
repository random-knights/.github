# Agent Coordination Standards

Date: 2026-06-12 (amended sessions 18, 23)
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
| Fixes | main clone (CI paths only) | CI workflows (`*.yml`), branch hygiene, stale test repair | all app paths (read for diagnosis) | earth/systems/connect/design feature files during an active feature phase |
| Design | `worktrees\rand0m-design` | Workstation-shell + tab presentation slices D1–D6: `lib/pages/earth/earth_workstation*.dart`, `lib/widgets/earth/earth_tab_rail*.dart`, and equivalent container/layout files | Earth paths (read for context) | `earth_source_*_catalog.dart`, `earth_source_registry.dart`, data models, Cesium bridge, CI workflows |
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

## 9. State-Row Git-Verification Rule (Binding)

Roadmap rows that assert `merged` or `deployed` state require a git-verified SHA.
**Unverified state is a documentation error**, not a minor omission — it causes
downstream agents to act on false ground truth.

Rules:

- Before writing `merged to main` in any roadmap row, either:
  (a) run `git fetch && git log -1 origin/main` and confirm the SHA matches, or
  (b) copy the state verbatim from a Fable gate confirmation that itself carried
  a git-verified SHA.
- Before writing `deployed`, confirm the Production Release workflow run ID and
  that `rand0m.ai` reflects the change.
- If neither (a) nor (b) is available, write `pushed — merge unconfirmed` and
  include the tip SHA of the feature branch only.
- **Absence of git evidence means not done.** Do not infer merge from a prior
  session's prose or a session-memory recap.

---

## 10. HANDOFF BLOCKED Line

Every HANDOFF block (§5) must open with a `BLOCKED:` line if **any commanded
step did not land** — whether due to clone contention, a failed push, a test
gate that stopped a merge, or any other blocker.

```
DOCS: HANDOFF
  BLOCKED: <one-line description of what did not land and why>
  branch:  <branch> @ <sha>
  state:   pushed | committed (NOT merged — merge did not happen)
  ...
```

If every commanded step landed cleanly, the `BLOCKED:` line is omitted.
Absence of a `BLOCKED:` line is an explicit assertion that nothing is stuck.

---

## 11. Main Clone Earth-Exclusive Rule (Permanent)

The main `apps/rand0m` clone at `C:\Projects\dev-kitt\apps\rand0m` is
**permanently reserved for Earth agent only.**

- Earth agent is the only agent that may run `git checkout`, `git switch`,
  `git merge`, or `git rebase` in the main clone.
- All other agents with write access to `apps/rand0m` use dedicated worktrees
  (see §7). No exceptions without explicit owner directive.
- Fixes agent uses the main clone for CI/workflow paths (`*.yml`) only, and
  must not checkout feature branches in the main clone.
- Reason: shared-clone contention caused a merge block in session 11 when two
  agents held the same clone on different branches concurrently.

---

## 12. `validate-earth-fast.ps1` Worktree Gap

`validate-earth-fast.ps1` was written for the main clone path. It does not
automatically resolve the correct working directory when invoked from a
worktree at `worktrees\rand0m-systems` or `worktrees\rand0m-connect`.

**Fixes agent parameterization fix (session 11):** Fixes agent has parameterized
the script to accept a `-WorktreePath` argument so Systems and Connect agents
can invoke Earth Fast Cycle validation from their own worktrees.

Rules:
- Systems and Connect agents must pass `-WorktreePath` when invoking
  `validate-earth-fast.ps1` from a non-main-clone worktree.
- Earth agent continues to invoke the script without the flag (defaults to main
  clone path).
- Do not modify `validate-earth-fast.ps1` scope/logic during feature work;
  tooling changes require a dedicated chore branch.

---

## 14. Worktree Bootstrap Sequence (Mandatory — All dev-kitt Worktree Agents)

Every agent that works in a dedicated dev-kitt worktree (`worktrees\rand0m-systems`,
`worktrees\rand0m-connect`, or any future worktree) must run the following
bootstrap sequence before any `flutter analyze`, `flutter test`, or
`flutter build` call. Skipping it causes silent failures and environment drift
from the main clone.

**Root cause:** Connect agent stalled for two cycles because a fresh worktree did
not have the vendored Flutter on PATH, `env.g.dart` was not generated, and
generated registrants were accidentally committed. Mandatory bootstrap prevents
recurrence.

```powershell
# 1. Add vendored Flutter to PATH for this session
$env:PATH = "C:\Projects\dev-kitt\flutter\bin;$env:PATH"

# 2. Verify Flutter resolves correctly
flutter --version

# 3. Get pub dependencies
flutter pub get

# 4. Generate env.g.dart and other build_runner outputs
dart run build_runner build --delete-conflicting-outputs

# 5. Confirm analyze is clean before writing any code
flutter analyze
```

**Pre-commit rule:** generated files (`env.g.dart`, generated registrants,
`*.g.dart`, `*.freezed.dart`) must be **reverted before committing** unless the
phase explicitly produces a new generated file as its output. Check with
`git diff --name-only` before staging.

**Applies to:** all worktree agents. Earth agent (main clone) is exempt — the
main clone already has Flutter on PATH via the workspace profile.

---

## 15. Audit-Only DOCS Callout Requirement (Binding)

Audit-only work (no code changes) must deliver full findings via a `DOCS:`
callout in the same cycle so Docs agent can persist them as a READLESS
architecture note immediately.

Rules:

- Findings must be delivered in the `DOCS:` callout body, not in prose relayed
  through the owner or summarized in a handoff. Fable ratifies from the qa-kitt
  READLESS note, never from relayed prose.
- The `DOCS:` callout must be emitted before the HANDOFF block.
- Docs agent persists the findings as a READLESS architecture note in the same
  session the callout arrives.
- If findings are too large for a single callout line, emit multiple `DOCS:`
  lines or reference a branch+file where the findings were committed.

---

## 16. Owner Command = Approval (Binding)

When an owner issues a command that includes a scope (e.g., "run the
Environmental audit"), that command is the approval for that scope. Agents
must not re-gate the work by checking roadmap approval rows or pending-approval
queue entries.

Rules:

- **Do not re-gate.** If an owner command names a task, proceed. The command
  supersedes any "pending owner approval" state in the roadmap.
- **Docs agent:** update the roadmap approval row to "approved by owner command
  (session N)" and move the item out of the pending queue.
- **Why this exists:** the Environmental audit was idled for a full cycle because
  the Systems agent re-checked the roadmap approval row and found "pending owner
  approval — audit-first." The owner had already approved it by issuing the
  audit command. This cost one cycle.
- **Exception:** items in the pending queue that are explicitly marked "requires
  Fable governance spec" or "requires owner decision on X" are not superseded
  by a general command. Those items name a specific decision the owner must make;
  a general "proceed" command is not sufficient.

---

## 13. Branch Disjointness Check — Three-Dot Diff (Binding)

All branch boundary and disjointness checks must use **three-dot diff**:

```powershell
git diff main...branch   # correct — shows only commits unique to branch
```

Never use two-dot diff for this purpose:

```powershell
git diff main..branch    # WRONG for disjointness — includes main drift
```

**Why:** two-dot diff (`main..branch`) shows every commit reachable from
`branch` but not from `main`, including commits that are on `main` but were
present before the branch diverged and have since drifted. This produces
false-alarm conflicts and phantom overlap between disjoint branches. Three-dot
diff (`main...branch`) computes the symmetric difference from the common
ancestor, showing only what is genuinely unique to the branch.

**When to use three-dot diff:**

- Verifying that a vertical agent's branch does not touch Earth catalog files.
- Confirming that two parallel branches do not overlap before running concurrent
  validation.
- Any disjointness check described in §4 path-ownership matrix.

This rule was codified after a false-alarm conflict in session 12 caused by a
two-dot diff picking up main drift on a Systems branch.

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

---

## 17. Authenticated / Visual Smoke — Owner-Performed (Binding)

Authenticated smoke and visual verification of `rand0m.ai` is performed by the
**owner personally**. Agents do not perform browser automation, authenticated
session testing, or visual spot-checks of the deployed app.

Rules:

- **Agents perform HTTP-level smoke only** (e.g., `Invoke-WebRequest` to public
  endpoints, CI health-check assertions). No authenticated requests, no
  browser-driven flows.
- **Checkpoint HANDOFFs include an owner visual checklist**, not agent-executed
  results. The HANDOFF `next:` field should list the specific screens or flows
  the owner should check, not assert that they have been verified.
- **Checkpoints are not marked visually verified** in the roadmap until the
  owner explicitly confirms. Do not write "visually verified ✓" or equivalent
  in any roadmap or READLESS doc without a direct owner confirmation.
- **No browser automation tools** (Claude-in-Chrome, Playwright, Puppeteer,
  Selenium, etc.) for smoke at checkpoint time. This is not a tooling gap to
  close — it is a deliberate boundary.

**Why this exists:** authenticated smoke was skipped for two consecutive
checkpoints because agents waited for browser tooling that was not available.
The owner visual check is faster, more reliable for auth flows, and does not
block the checkpoint gate.

---

## 18. Scoped Local Validation — Named Test Files Only (Binding)

Local slice validation runs **named test files for the touched surface area
only**. Full-suite local runs are prohibited during development.

Rules:

- **Named test files only.** When running `flutter test` locally, pass the
  specific test file(s) that cover the changed surface:
  ```powershell
  flutter test test/earth/earth_scientist_controller_test.dart
  flutter test test/connect/entity_resolver_test.dart
  ```
  Do not run `flutter test` without a path argument during slice work.
- **`validate-earth-fast.ps1` gains `-TestPaths` parameter** (Fixes agent
  chore — in progress). Until that parameter lands, agents run named test
  files directly and note which files were checked in the HANDOFF.
- **CI release smoke is the authoritative broad gate.** The 80-validation and
  90-release workflows run the full suite. Agents do not replicate this locally.
  A green local named-file run + green CI is the merge bar.
- **Known flaky-harness issue (non-deterministic mid-suite crash):** the
  cursor-timer family of tests causes non-deterministic crashes mid-suite
  under certain harness configurations. This is a known issue tracked under
  a Fixes chore branch. Agents who hit a mid-suite crash that is NOT in their
  touched files should emit a `FIXES:` callout and continue — do not block on it.
  Do not disable or skip cursor-timer tests as a workaround.

- **`flutter analyze` is the mandatory final step of every slice** (amended
  session 23). After the last edit of a slice — before committing — run:
  ```powershell
  flutter analyze
  ```
  A scoped `flutter test` run does not substitute for a closing analyze pass.
  Analyze catches undefined symbols, missing imports, and type errors that test
  files may not exercise. A slice is not shippable until analyze exits clean.

**Why this exists:** full-suite local runs are slow, frequently fail on
unrelated flaky tests, and give agents false confidence or false blocks.
Scoped runs are faster, more attributable, and the CI gate provides the
authoritative broad check.

**Motivating case for the analyze amendment:** `earth/scientist-entity-resolution`
passed local scoped tests but CI went red on `undefined SourceLifecycleStatus`
in `earth_entity_region_context_test.dart` — a missing import of
`models/connect/source_intake.dart` (enum not re-exported by `entity_record.dart`).
A closing `flutter analyze` would have caught the undefined symbol before push.
This was the first instance of local-scoped-green vs CI-red in this codebase.

---

## 19. Callout Completeness + Fable Checkpoint Bundle Cadence (Binding)

Two standards codified in session 19:

### 19a. Empty Callouts Read "None"

When an agent has no callout for a recipient, the HANDOFF must still include
the callout heading with the value `none`:

```
DOCS:    none
FIXES:   none
EARTH:   none
```

Do not omit the heading entirely. An absent heading is ambiguous — it may mean
"nothing to report" or it may mean the agent forgot to check. Explicit `none`
is unambiguous and required for HANDOFF completeness.

### 19b. Fable Declares Checkpoint Bundles One Cycle Ahead

Fable agent declares what the next Production Release checkpoint will include
at the **start** of the cycle before it, not at merge time. This declaration:

- Names the branches/slices expected in the bundle.
- Notes any gate conditions (e.g., "R6 includes Countries S1–S3 + E1 S4 only
  if E1 S4 passes gate before R6 opens").
- Is recorded in the roadmap Now section by Docs agent.

Agents use the pre-declared bundle to scope their slice work and avoid adding
scope to an already-declared bundle without a new Fable ruling.

If a slice misses the declared bundle, it rolls to the next cycle — it does
not automatically delay the checkpoint.

---

## 20. Merge Origin/Main — Never Copy Files Across Branches (Binding)

When a branch needs code that lives on `origin/main`, **merge `origin/main`
into the branch**. Never copy files from another branch or from main directly.

```powershell
git fetch origin
git merge origin/main   # correct
```

**Prohibited:**
```
# WRONG — copying files across branches
git checkout origin/main -- lib/models/earth/earth_region_registry.dart
cp ../main-clone/lib/models/connect/source_intake.dart .
```

**Why this exists (session 23):** Connect S5 needed three Countries files
that had just landed on main. Instead of merging, the agent copied the files
byte-for-byte — which was benign this time because the files were identical.
But the same pattern with any divergence (even a one-line change) would create
a ghost commit that looks like the agent authored the change. The copied files
will be deduped by Git at R7 merge time, but the pattern is structurally
unsafe and prohibited going forward.

**Rule:** needing code that lives on main = `git merge origin/main`. No
exceptions. If a merge produces conflicts, resolve them; do not copy files
to avoid the conflict.
