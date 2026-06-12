# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-11 (session 15)

---

## Agent Roster

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | main clone (exclusive) | `earth/forest-layer` @ `d3a8885` — gate passed, merging with registration; 19th layer | Earth features, layers, governance; sole catalog owner |
| Systems | `deve10per` / dev-kitt | `worktrees\rand0m-systems` | Environmental: forest ✓ → protected-areas in flight (WDPA monthly, metadata/integrity only) | Environmental vertical (forest → protected-areas → biodiversity) |
| Connect | `deve10per` / dev-kitt | `worktrees\rand0m-connect` | `feature/c2-0-source-onboarding-pipeline` @ `bc0e0a2` slice 4 — merging | Connect domain: source registry, onboarding pipeline |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | `chore/test-deterministic-cursor` @ `9b987a5` — merging; `feature/f1-0-*` @ `da79ec6` favicon owner-gated | Bug fixes, test repair, CI, branch hygiene |
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
| scientist-session-continuity (`6d2c6cb`) | merged to main | green | **✓ live** |
| scientist-scenario-explain (`1792660`) | merged to main | green | **✓ live** |
| Earth-Systems ocean live + registration | merged to main | green | **✓ live** |
| Glaciers integration + registration (`36d2901`, `57869fc`) | merged to main | green | **✓ live** |
| Glaciers data-view wiring (`6316893`) | merged to main | green | **✓ live** |
| Connect slices 1–3 (`ed7f3f4`) | merged to main | green | **✓ live** |
| Forest layer (`d3a8885`) | gate passed — merging | — | **pending** — RC accumulation, no release this cycle |
| `chore/test-deterministic-cursor` (`9b987a5`) | gate passed — merging | — | **pending** — RC accumulation |
| Connect slice 4 (`bc0e0a2`) | gate passed — merging | — | **pending** — RC accumulation |
| F1.0 favicon (`da79ec6`) | owner-gated | — | **pending** — awaiting owner approval |

`origin/main` (xyz) is at `9298e84` (Production Release `27390760970`; Fable-verified). In-flight: `d3a8885`, `9b987a5`, `bc0e0a2` accumulating for next RC — no release this cycle.

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory. Deployed rows updated only when Earth confirms Production Release run ID.

Next checkpoint: forest + cursor-timer + Connect slice 4 land → full validation + Production Release.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** `earth/forest-layer` @ `d3a8885` — gate passed, merging with registration. 19th layer (dedicated `forest` id; Fable-ratified ruling — human-encroachment block unchanged, distinct concepts). No release this cycle (RC accumulation).
- **Systems agent:** Environmental Phase 1 (forest) ✓ → Phase 2: protected-areas in flight (WDPA monthly, metadata/integrity only, structural no-geometry constraint).
- **Connect agent:** `feature/c2-0-source-onboarding-pipeline` @ `bc0e0a2` slice 4 — gate passed, merging. Slices 1–3 deployed ✓ (`9298e84`); render tests skip-marked per CODEX pending harness chore.
- **Fixes agent:** `chore/test-deterministic-cursor` @ `9b987a5` — merging. Favicon `da79ec6` re-rebase pending owner approval.
- **Docs agent:** session-15 update ✓ — deployed rows confirmed, RC accumulation state recorded, Environmental progress updated.

---

## Next

_Queued — approved scope, not yet started._

1. **Earth agent:** confirm forest merge to main (`d3a8885`) + begin Environmental Phase 2 (protected-areas, WDPA monthly) after forest lands — spec in [`architecture/environmental-data-vertical-audit.md`](architecture/environmental-data-vertical-audit.md).
2. **Systems agent:** complete protected-areas data vertical; emit `EARTH:` registration delta for Earth to apply.
3. **Connect agent:** complete remaining slices (5+) on `feature/c2-0-source-onboarding-pipeline`.
4. **Fixes agent:** owner approves favicon re-rebase (`da79ec6`) → merge to main.
5. Checkpoint after forest + cursor-timer + Connect slice 4 land: full validation + Production Release.
6. **Earth agent:** Environmental Phase 3 (biodiversity/habitat, keyless GBIF, coarse aggregates) — only after protected-areas is deployed and suppression guard precondition is implemented (non-negotiable, per audit spec).
7. **Future-infra queue (approved; requires dedicated implementation phase):** GFW near-real-time forest alerts via Firebase callable proxy (FIRMS pattern, new callable required); remote-config budget + runtime kill switch.
8. Delete stale branches after next deploy: `earth/glaciers-data-view-wiring`, `feature/c2-0-source-onboarding-pipeline` (slices 1–3 base). Delete abandoned: `earth/p17-7-scientist-context-bridge`, `earth/p18-0/1/2-*`.
9. **Pending owner approval** (see Pending Owner Approval): VCM/Entities governance specs (3rd presentation — Entities prerequisite now deployed).

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
- **`earth/scientist-session-continuity`** (`6d2c6cb`, 6 commits) — Earth agent. Phases 0–2: `EarthScientistController` + `ScientistResponsePane` extracted; request-token race safety; bounded in-memory transcript (5 exchanges, exclusion-gated). Slice 2.5: renderer readiness/usage panels + data-view sections extracted. Phases 3–4: AIEDS session ledger + soft budget guard (`sessionTokenBudget=50000`, `maxPromptTokens=12000`); stale packet-line fix; prompt size cap. `earth_tab.dart` 2,387→1,375 lines — stretch goal met. **Deployed ✓** (Production Release `27388323458` @ `14d422f`).
- **`earth/scientist-scenario-explain`** (`1792660`) — Earth agent. Phases 1–3: scenario-engine ↔ @scient1st explain flow, serialized registration slice. **Deployed ✓** (Production Release `27388323458`).
- **Earth-Systems: `earth/data-ocean-live`** (`076eefb`) — Systems agent. Ocean live feed data vertical; registration applied by Earth agent in catalog. Earth-Systems vertical **COMPLETE**. **Deployed ✓** (Production Release `27388323458`).
- **Production Release `27388323458`** (`14d422f`) — owner. All above + prior checkpoints live on `rand0m.ai`. `origin/main` = `14d422f` (Fable-verified). ✓
- **Glaciers verdict** (`6e0b130`) — Earth + Systems agents. WGMS FoG asset-backed refresh pipeline implemented; no governed live source (verdict: assets only). ✓
- **Glaciers integration + registration** (`36d2901`, `57869fc`) — Earth agent. Glaciers data integrated and registered on main. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Glaciers data-view wiring** (`6316893`) — Earth agent. Data View wiring for glaciers layer. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Connect slices 1–3** (`ed7f3f4`) — Connect agent. Source onboarding pipeline slices 1–3. Connect stall resolved (two-cycle bootstrap gap fixed via §14). Render tests skip-marked per CODEX pending harness chore. **Deployed ✓** (Production Release `27390760970` @ `9298e84`).
- **Production Release `27390760970`** (`9298e84`) — owner. Glaciers wiring + Connect slices 1–3 live on `rand0m.ai`. `origin/main` = `9298e84` (Fable-verified). ✓
- **Environmental Data Vertical audit** — Systems agent (Fable-ratified). Findings persisted to [`architecture/environmental-data-vertical-audit.md`](architecture/environmental-data-vertical-audit.md). Implementation order approved: forest → protected-areas → biodiversity.

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.
- **`earth/p17-7-scientist-context-bridge`, `earth/p18-0-earth-agent-activation`, `earth/p18-1-scientist-command-surface`, `earth/p18-2-scientist-preview-response`** — abandoned. Audited: ~74k-line divergent rewrites vs main; not a safe merge basis. @scient1st shipped fresh on `earth/scientist-live-ai-responses` from current `main` instead. Candidates for deletion.
- **`earth_tab.dart` extraction:** merge gate (<2,000 lines) and stretch goal (<1,500 lines) both met and deployed at `6d2c6cb` — file is at 1,375 lines. Gate closed.
- **Earth-Systems vertical:** COMPLETE and deployed (`14d422f`). Systems agent rolls over to Environmental vertical pending owner approval (audit-first).
- **Glaciers:** no governed live source. WGMS FoG pipeline is asset-backed refresh only (`6e0b130`). Integration + registration on main (`57869fc`); data-view wiring in progress. Do not promote glaciers to a live catalog entry without an explicit governance phase.
- **Checkpoint cadence:** Production Releases run approximately every 2 phases. Fable may defer a checkpoint if the phase delta is too small to warrant a release. Do not assume a release follows every merge.
- **Connect worktree bootstrap gap:** two-cycle stall on slice 3 traced to fresh-worktree environment not matching the main-clone environment (Flutter PATH, `env.g.dart`, generated registrants). Mandatory bootstrap sequence now in coordination standards §14. All worktree agents must run it before any `analyze`, `test`, or `build` call.
- **Cursor-timer test hangs (known issue):** vendored-SDK cursor-timer tests hang non-deterministically under the current test harness. Fixes agent `chore/test-deterministic-cursor` is the approved fix. Do not disable or skip these tests as a workaround — wait for the harness fix to land.
- **Glaciers catalog status:** glaciers layer intentionally stays `research` while source metadata is connected (`assetBacked`/`previewFixture` access). Deployed at `9298e84`. Systems agent to confirm or amend catalog promotion via `EARTH:` delta; Earth applies if change required. Do not promote to `assetBacked` without Systems sign-off.
- **Forest layer (19th) — Fable ruling (session 15):** dedicated `forest` layer id added to catalog (not a sub-group of an existing layer). Human-encroachment block remains unchanged — human encroachment is a distinct concept and is not blocked by the forest governance entry. Do not conflate the two.
- **Connect render tests skip-marked:** Connect slices 1–3 render tests are skip-marked per CODEX pending harness chore (`chore/test-deterministic-cursor`). Do not un-skip without the harness fix landing first.
- **Future-infra queue — GFW near-real-time forest alerts:** GFW live forest alerts are technically feasible via a Firebase callable proxy following the FIRMS pattern. A new callable is required. This is an approved concept placed in the infra queue — do not implement without an explicit approved infra slice directive from the owner.
- **Future-infra queue — remote-config budget + kill switch:** runtime kill switch and remote-config-backed budget for `sessionTokenBudget`/`maxPromptTokens` are approved in concept. Do not implement without explicit instruction (separate approved phase required).
- **Branch disjointness checks:** always use three-dot diff (`git diff main...branch`), never two-dot (`git diff main..branch`). Two-dot includes main drift in the diff and produces false-alarm conflicts. This occurred in session 12 and is now codified in coordination standards §13.
- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the live-AI path requires a code change, rebuild, and Production Release — not a runtime toggle. Live answers cost real tokens via the Default AI Provider through `generateAIResponse` Firebase callable.
- **`sessionTokenBudget=50000` / `maxPromptTokens=12000` are compile-time in-memory soft guards.** They reset on app relaunch and do not hard-cap Firebase Function invocations. Owner-accepted at this checkpoint. Future infra queue: remote-config budget + runtime kill switch (separate approved phase required — do not implement without explicit instruction).
- **F1.0 Dynamic Web Favicon containment (Fixes agent, owner-sanctioned exception):** `feature/f1-0-*` branch holds the favicon feature. It is an approved exception to the Earth-only lockdown. Merge order is enforced: `feature/f1-0-*` merges to main **only after** the `earth/scientist-session-continuity` checkpoint deploy is confirmed. Do not `git checkout` or `git switch` to `feature/f1-0-*` in the shared `apps/rand0m` clone while Earth's merge or deploy is pending.
- **Ocean-currents catalog status:** remains `research` despite live-loader card wiring. Card surfaces the layer; underlying data feed is not live. Intentional — matches air-quality health-neutral, card-only pattern.

---

## Open Branches

| Branch | Repo | Status | Action |
| --- | --- | --- | --- |
| `earth/forest-layer` | xyz (remote) | `d3a8885` — gate passed, merging with registration; 19th layer | merge after passing |
| `chore/test-deterministic-cursor` | xyz (remote) | `9b987a5` — gate passed, merging (Fixes) | merge after passing |
| `feature/c2-0-source-onboarding-pipeline` (slice 4) | xyz (remote) | `bc0e0a2` — gate passed, merging | merge after passing |
| `feature/f1-0-*` (F1.0 favicon) | xyz (remote) | `da79ec6` — re-rebase pending owner approval | merge after owner approves |
| `earth/glaciers-data-view-wiring` | xyz (remote) | `6316893` — merged to main, deployed ✓ | safe to delete |
| `feature/c2-0-source-onboarding-pipeline` (slices 1–3 base) | xyz (remote) | `ed7f3f4` — merged to main, deployed ✓ | safe to delete |
| `earth/scientist-session-continuity` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
| `earth/scientist-scenario-explain` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
| `earth/data-ocean-live` | xyz (remote) | merged to main — deployed ✓ | safe to delete |
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

**2. Connect-agent staffing** ✓ **— approved and active.** Connect agent on `feature/c2-0-source-onboarding-pipeline` (`worktrees\rand0m-connect`). Slices 3–4 in progress.

**3. Earth-Systems vertical** ✓ **— COMPLETE and deployed.** Ocean live feed + registration live at `14d422f`. Systems agent ready for rollover.

**4. Systems-agent rollover to Environmental vertical** ✓ **— approved by owner command (session 13).** Audit underway; findings due this cycle via `DOCS:` callout. No implementation until audit findings are ratified. Per §15: owner issuing the command is the approval; no roadmap re-gate required.

**5. VCM / Carbon-offset governance spec** — pending Fable governance spec. No implementation without approved spec. Do not promote VCM or carbon-offset sources to the catalog without explicit governance phase.

**6. Entities governance spec** — pending Fable governance spec. No implementation without approved spec. Note: the Entities prerequisite (Connect source intake pipeline) is now deployed (`9298e84`) — Entities implementation is unblocked on the infra side pending only the governance spec.

_Items 1 (scenario-explain), 2 (Connect), 3 (Systems ocean) resolved/deployed. Item 4 approved + active. Items 5–6 require Fable governance specs before any agent proceeds. Item 6 prerequisite (Connect intake) now deployed — third owner presentation appropriate._

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
