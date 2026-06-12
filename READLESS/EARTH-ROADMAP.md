# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-11 (session 11 — correction pass)

---

## Agent Roster

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | main clone (exclusive) | `earth/scientist-session-continuity` @ `6d2c6cb` (merge blocked); `earth/scientist-scenario-explain` @ `1792660` stacked | Earth features, layers, governance; sole catalog owner |
| Systems | `deve10per` / dev-kitt | `worktrees\rand0m-systems` | `earth/data-ocean-live` @ `076eefb` — DONE, delta pending Earth catalog apply | Earth-Systems data vertical: ocean/ice live feeds |
| Connect | `deve10per` / dev-kitt | `worktrees\rand0m-connect` | `feature/c2-0-source-onboarding-pipeline` @ `185857a` (slices 1–2 done) | Connect domain: source registry, onboarding pipeline |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | `feature/f1-0-*` @ `00aa2ad` (ready-to-merge, pending owner) | Bug fixes, test repair, CI, branch hygiene |
| Docs | `eng1neer` / qa-kitt | qa-kitt clone | `main` | READLESS, CODEX, EARTH-ROADMAP |
| Fable | — | read-only | — | Audit, spec, PM rulings (no writes) |

Agents share `origin/main` on xyz (`random-knights/xyz`). Pull before push. One owner per surface at a time. Writer cap: 5 simultaneous `apps/rand0m` writers — see coordination standards.

**Coordination standards:** [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) — callout format, verify-from-git, worktree isolation, catalog non-touch, path-ownership matrix, HANDOFF protocol.

---

## Deploy Checkpoint Status

| Checkpoint | State | CI | Deployed |
| --- | --- | --- | --- |
| Earth UI Cleanup + Live Connections | merged to main | green | **✓ live** |
| Air-Quality (18th live layer) + Ocean loader | merged to main | green | **✓ live** |
| Earth Fast workflow test rewrite | merged to main | green | **✓ live** |
| @scient1st real Earth-context AI responses | merged to main | green (+374, 0 failures) | **✓ live** |
| scientist-session-continuity (`6d2c6cb`) | **pushed — merge blocked** (shared-clone contention) | — | **not deployed** |

`origin/main` (xyz) is at `01a070a` (git-verified). `6d2c6cb` is pushed on `earth/scientist-session-continuity` but NOT merged. Production Release `27374833292` covers all rows above it only.

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory.

Next checkpoint: Earth agent resolves clone contention, merges `earth/scientist-session-continuity` → `main`, then stacks `earth/scientist-scenario-explain`. Owner triggers `90-production-release.yml` after both land.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** `earth/scientist-session-continuity` @ `6d2c6cb` — pushed, merge BLOCKED (shared-clone contention). `earth/scientist-scenario-explain` @ `1792660` — Phases 1–3 done, stacked on `6d2c6cb`. Neither merged to main. Unblock merge first, then stack scenario-explain.
- **Systems agent:** `earth/data-ocean-live` @ `076eefb` — DONE. Registration delta emitted to Earth agent via `EARTH:` callout. Awaiting Earth to apply catalog entry in its own worktree.
- **Connect agent:** `feature/c2-0-source-onboarding-pipeline` @ `185857a` — Slices 1–2 done.
- **Fixes agent:** favicon `00aa2ad` — ready-to-merge, pending owner approval.
- **Docs agent:** correction pass complete. Coordination standards updated. ✓

---

## Next

_Queued — approved scope, not yet started._

1. **Earth agent:** resolve shared-clone contention; merge `earth/scientist-session-continuity` (`6d2c6cb`) → `main`; apply Systems registration delta from `EARTH:` callout; merge `earth/scientist-scenario-explain` (`1792660`) → `main`. HANDOFF must confirm each SHA with `git log origin/main`.
2. **Fixes agent:** once Earth merge confirmed, merge favicon `00aa2ad` → `main` (pending owner approval).
3. **Connect agent:** complete remaining slices on `feature/c2-0-source-onboarding-pipeline` (beyond `185857a`); merge to `main`.
4. Owner triggers Production Release (`90-production-release.yml`) from `main` after items 1–3 land.
5. Checkpoint: full validation + smoke on `rand0m.ai`.
6. Delete stale/merged remote branches after deploy: `earth/earthview-ui-cleanup`, `earth/live-connections-batch`, `chore/earth-workflow-test-staleness`, `earth/scientist-live-ai-responses`, `earth/scientist-session-continuity`, `earth/scientist-scenario-explain`. Delete abandoned: `earth/p17-7-scientist-context-bridge`, `earth/p18-0/1/2-*`.

---

## Done

_Completed and on `main`._

- **Dashboard + AIEDS + Docs** — shipped to production previously. ✓
- **Earth UI Cleanup** (`earthview-ui-cleanup`) — merged to main. Earth View score/summary to dashboard aesthetic; Earth+ squeeze fix; Oracles animated gif + custom font. ✓
- **Live Connections Batch** (`live-connections-batch`) — merged to main. Air-quality + ocean governed live Data View cards; live-connection data vertical. Ocean-currents catalog status remains **research** (card-only surface; "wired to live loader" refers to the card wiring, not a live data feed — intentional, consistent with air-quality health-neutral pivot). ✓
- **Air-Quality 18th Layer** (`1dea432`) — Earth agent. Governed `EarthLayerDefinition` for air-quality (Open-Meteo); live layer grid card; ocean-currents wired to live loader; registry/region-ready count updated 13→14; governance + registry tests added. ✓
- **Earth Fast Workflow Test Rewrite** (`75e46b6`) — Earth + Fixes agents (converged). `earth_fast_validation_test` rewritten to assert current numbered workflow scheme (01/80/90/99); retired stale workflow references. FF'd to main this session. ✓
- **CODEX.md — Session Bootstrap + EARTH-ROADMAP step** — Docs agent. Full Session Bootstrap, parallel-agent protocol, numbered workflow policy, and step 6 added. Merged to dev-kitt master. ✓
- **EARTH-ROADMAP.md created** — Docs agent. Living plan seeded and published to qa-kitt main. ✓
- **@scient1st real Earth-context AI responses** (`01a070a`) — Earth agent. `earth/scientist-live-ai-responses` merged to main. Earth Fast Cycle green (+374, 0 failures; one async widget-test break fixed inline). **Deployed ✓** (Production Release `27374833292`).
- **Production Release `27374833292`** — owner. @scient1st, air-quality, ocean live cards, UI cleanup live on `rand0m.ai`. ✓
- **`earth/scientist-session-continuity`** (`6d2c6cb`, 6 commits) — Earth agent. Phases 0–2: `EarthScientistController` + `ScientistResponsePane` extracted; request-token race safety; bounded in-memory transcript (5 exchanges, exclusion-gated). Slice 2.5: renderer readiness/usage panels + data-view sections extracted. Phases 3–4: AIEDS session ledger + soft budget guard (`sessionTokenBudget=50000`, `maxPromptTokens=12000`); stale packet-line fix; prompt size cap. `earth_tab.dart` 2,387→1,375 lines — stretch goal met. **Pushed, NOT merged** (merge blocked by shared-clone contention — `origin/main` still at `01a070a`). Merge pending Earth agent HANDOFF with git-verified SHA.
- **`earth/scientist-scenario-explain`** (`1792660`) — Earth agent. Phases 1–3 done, stacked on `6d2c6cb`. Not merged. Pending session-continuity merge first.

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.
- **`earth/p17-7-scientist-context-bridge`, `earth/p18-0-earth-agent-activation`, `earth/p18-1-scientist-command-surface`, `earth/p18-2-scientist-preview-response`** — abandoned. Audited: ~74k-line divergent rewrites vs main; not a safe merge basis. @scient1st shipped fresh on `earth/scientist-live-ai-responses` from current `main` instead. Candidates for deletion.
- **`earth_tab.dart` extraction:** merge gate (<2,000 lines, CODEX threshold) and stretch goal (<1,500 lines) both met at `6d2c6cb` — file is at 1,375 lines. Gate closed.
- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the live-AI path requires a code change, rebuild, and Production Release — not a runtime toggle. Live answers cost real tokens via the Default AI Provider through `generateAIResponse` Firebase callable.
- **`sessionTokenBudget=50000` / `maxPromptTokens=12000` are compile-time in-memory soft guards.** They reset on app relaunch and do not hard-cap Firebase Function invocations. Owner-accepted at this checkpoint. Future infra queue: remote-config budget + runtime kill switch (separate approved phase required — do not implement without explicit instruction).
- **F1.0 Dynamic Web Favicon containment (Fixes agent, owner-sanctioned exception):** `feature/f1-0-*` branch holds the favicon feature. It is an approved exception to the Earth-only lockdown. Merge order is enforced: `feature/f1-0-*` merges to main **only after** the `earth/scientist-session-continuity` checkpoint deploy is confirmed. Do not `git checkout` or `git switch` to `feature/f1-0-*` in the shared `apps/rand0m` clone while Earth's merge or deploy is pending.
- **Ocean-currents catalog status:** remains `research` despite live-loader card wiring. Card surfaces the layer; underlying data feed is not live. Intentional — matches air-quality health-neutral, card-only pattern.

---

## Open Branches

| Branch | Repo | Status | Action |
| --- | --- | --- | --- |
| `earth/scientist-session-continuity` | xyz (remote) | pushed @ `6d2c6cb` — **merge blocked** (clone contention) | merge to main (Earth) |
| `earth/scientist-scenario-explain` | xyz (remote) | pushed @ `1792660` — stacked on `6d2c6cb`, not merged | merge after continuity lands |
| `earth/data-ocean-live` | xyz (remote) | done @ `076eefb` — delta pending Earth catalog apply | merge after Earth applies registration |
| `feature/c2-0-source-onboarding-pipeline` | xyz (remote) | slices 1–2 @ `185857a` — in progress | continue, then merge |
| `feature/f1-0-*` (F1.0 favicon) | xyz (remote) | ready @ `00aa2ad` — pending owner approval | merge after Earth checkpoint |
| `earth/earthview-ui-cleanup` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
| `earth/live-connections-batch` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
| `earth/scientist-live-ai-responses` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
| `earth/air-quality-layer-ocean-live` | xyz (remote) | deleted / pruned | — |
| `chore/earth-workflow-test-staleness` | xyz (remote) | merged to main | safe to delete |
| `chore/d1-4-release-candidate-smoke-policy-review-docs` | dev-kitt (local) | merged to master | safe to delete |
| `earth/p17-7-scientist-context-bridge` | xyz (remote) | **abandoned** — diverged, not mergeable | delete |
| `earth/p18-0-earth-agent-activation` | xyz (remote) | **abandoned** — diverged, not mergeable | delete |
| `earth/p18-1-scientist-command-surface` | xyz (remote) | **abandoned** — diverged, not mergeable | delete |
| `earth/p18-2-scientist-preview-response` | xyz (remote) | **abandoned** — diverged, not mergeable | delete |

---

## Pending Owner Approval

_Items that require an explicit owner decision before any agent proceeds._

**1. Scenario-engine ↔ @scient1st integration (pre-spec)**
A pre-spec is proposed for wiring the Earth scenario engine into @scient1st
response generation — scenarios inform context, @scient1st surfaces results.
No implementation scope, timeline, or agent assignment is approved yet.
Requires owner sign-off on: scope boundaries, whether scenario engine changes
are in-scope for the next Earth phase, and which agent owns the work.

**2. Connect-agent staffing** ✓ **— approved.** Connect agent active on `feature/c2-0-source-onboarding-pipeline` (`worktrees\rand0m-connect`). Connect domain unlocked. See Agent Roster.

**3. Earth-Systems vertical agent staffing** ✓ **— approved.** Systems agent active on `earth/data-ocean-live` (`worktrees\rand0m-systems`). Earth-Systems data vertical active; Environmental next-up; Human Activity frozen; Projects/VCM + Entities spec-first. See coordination standards taxonomy table.

_Items 2 and 3 are resolved. Item 1 (scenario-engine ↔ @scient1st) is in active development on `earth/scientist-scenario-explain`._

---

## Roadmap-vs-Git Ancestry Anomaly

**Status: closed** (session 3 correction; standards codified in [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) §6).

Root cause: roadmap seeded from session memory rather than `git log` / `git merge-base` verification. Standing rule: always verify `origin/main` SHA with `git log -1 origin/main` before recording it. Never copy a SHA from prior-session prose.

---

## Human Continuation Command Templates

Reusable starters for resuming any agent in a new session. Swap `<task>` for the
pinned Next item or a HANDOFF `next:` field.

**Docs agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md — update it and READLESS as needed (sole write owner).
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callout for Earth related development.
Suggest next agent command using same command format.
```

**Earth agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
```

**Fable agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fixes-agent callouts rather than debugging failed tests/deployments (ignore and continue).
Leave Earth-agent callouts rather than implementing runtime code or merging branches (spec and plan only).
```

**Fixes agent:**
```
Only read C:\Projects\qa-kitt\.github\READLESS\EARTH-ROADMAP.md
Follow CODEX.md → Session Bootstrap (Start Here). <task>.
Leave Docs-agent callouts rather than editing EARTH-ROADMAP.md.
Leave Fable-agent callouts rather than troubleshooting complex multi-step tasks (ignore non-breaking issue and continue).
Leave Earth-agent callouts rather than modifying Earth feature files (CI/workflow/hygiene only).
```
