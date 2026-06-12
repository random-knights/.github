# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-12 (session 18)

---

## Agent Roster

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | main clone (exclusive) | Countries-mapping spec audit (registry-level only; `earth_region_registry` expansion) | Earth features, layers, governance; sole catalog owner |
| Systems | `deve10per` / dev-kitt | `worktrees\rand0m-systems` | VCM slice 2 — amending to session-18 scope (creditsIssued/Retired filter + lat/long storage) | VCM data vertical |
| Connect | `deve10per` / dev-kitt | `worktrees\rand0m-connect` | E1 slice 3 — resolver contract (Connect owns resolver; Earth owns consumption); `chore/connect-sheet-test-stall` under Fixes | Entities domain + Connect |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | `chore/connect-sheet-test-stall` diagnosing; `validate-earth-fast` `-TestPaths` param (§18) | Bug fixes, CI, harness hygiene |
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
| Forest pipeline + 19th layer (`glad-hansen-forest-summary`) | merged to main | green | **✓ live** |
| `chore/test-deterministic-cursor` | merged to main | green | **✓ live** |
| Connect slice 4 | merged to main | green | **✓ live** |
| `connect-card-overflow-fix` (RenderFlex 0.118px — connect_source_card.dart:88) | merged to main | green | **✓ live** |
| Protected-areas + WDPA registration (`wdpa-protected-area-summary`) | merged to main | green | **✓ live** |
| Connect slice 5 | merged to main | green | **✓ live** |
| `validate-earth-fast` root tooling fix (`53a456e` — `--no-wasm-dry-run`) | merged to main | green | **✓ live** |
| Biodiversity layer (`e9f9e47` — GBIF, fail-closed suppression guard, zero coordinate fields) | merged to main | green | **✓ live** ⚠ owner visual pending |
| F1.0 favicon | merged to main | green | **✓ live** ⚠ owner visual pending |
| Entities E1 slices 1–2 | merged to main | green | **✓ live** ⚠ owner visual pending |
| VCM slice 2 (scope amendment — creditsIssued/Retired filter + lat/long) | in progress | — | **pending** |
| Entities E1 slice 3 (resolver contract) | in progress | — | **pending** |
| Countries-mapping spec audit | in progress (Earth) | — | **pending** |

`origin/main` (xyz) is at `4148495` (Production Release `27394511208`; Fable-verified).

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory. Deployed rows updated only when Earth confirms Production Release run ID.

⚠ **Owner visual checklist PENDING** (Production Release `27394511208`): biodiversity Data View card, favicon display, Entities E1 UI — not marked visually verified until owner confirms (§17).

Next checkpoint: VCM slice 2 + Entities E1 slice 3 + Countries-mapping spec → full validation + Production Release.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** Countries-mapping spec audit underway — registry-level only; `earth_region_registry` country-granularity expansion; DATA/REGISTRY only, no globe boundary rendering (Cesium V2.16 freeze unchanged).
- **Systems agent:** VCM slice 2 in progress — amending to session-18 scope (scope filter: creditsIssued>0 OR creditsRetired>0 AND lat/long present; lat/long stored for map readiness, not rendered). Spec: [`architecture/vcm-governance-spec.md`](architecture/vcm-governance-spec.md).
- **Connect agent:** E1 slice 3 — resolver contract in progress (Connect owns resolver; Earth owns consumption; see [`architecture/entities-spec.md`](architecture/entities-spec.md)). `chore/connect-sheet-test-stall` under Fixes diagnosis; two tests remain skip-marked per CODEX.
- **Fixes agent:** `chore/connect-sheet-test-stall` diagnosing. `validate-earth-fast` `-TestPaths` parameter in progress (§18 scoped validation). Known flaky-harness issue (non-deterministic mid-suite crash, cursor-timer family) tracked as separate chore.
- **Docs agent:** session-18 update ✓ — PR 27394511208 deployed rows confirmed; VCM spec amended; Entities spec updated (slices 1–2 deployed, slice 3 resolver contract, Earth/Connect boundary); §18 scoped validation standard added; EARTH-ROADMAP updated.

---

## Next

_Queued — approved scope, not yet started._

1. **Owner visual checklist:** confirm biodiversity Data View card, favicon, Entities E1 UI on `rand0m.ai` (Production Release `27394511208`). Mark checkpoint visually verified.
2. **Earth agent:** complete Countries-mapping spec audit → emit `DOCS:` callout with findings for Docs to persist. DATA/REGISTRY only; feeds Entities region groups + @scient1st regional answers.
3. **Systems agent:** complete VCM slice 2 (scope amendment + lat/long storage); emit `EARTH:` registration delta.
4. **Connect agent:** complete E1 slice 3 (resolver contract); advance E1 slice 4+ (catalog registration via `EARTH:` delta).
5. **Fixes agent:** resolve `chore/connect-sheet-test-stall`; land `validate-earth-fast` `-TestPaths` param (§18); address flaky-harness chore.
6. Checkpoint: VCM slice 2 + Entities E1 slice 3 + Countries-mapping spec → full validation + Production Release.
7. Delete stale branches: `data-forest-refresh`, `data-forest-registration`, `test-deterministic-cursor`, `data-protected-areas-refresh`, `data-protected-areas-registration`, `earth/biodiversity-layer`, `feature/f1-0-*` (post-deploy). `c2-0` kept open until Entities stacking confirmed. Delete abandoned: `earth/p17-7-scientist-context-bridge`, `earth/p18-0/1/2-*`.
8. **Future-infra queue (approved concept; requires dedicated implementation phase):** GFW near-real-time forest alerts via Firebase callable proxy (FIRMS pattern, new callable required); remote-config budget + runtime kill switch.

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
- **Forest pipeline + 19th layer** (`glad-hansen-forest-summary`) — Earth agent. GLAD/Hansen annual asset-backed refresh pipeline; dedicated `forest` layer id registered (region-ready 14→15). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`chore/test-deterministic-cursor`** — Fixes agent. Cursor-timer test harness fix — vendored-SDK non-deterministic hang resolved. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 4** — Connect agent. Source onboarding pipeline slice 4. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`connect-card-overflow-fix`** — Connect/Fixes agent. Resolved 0.118px RenderFlex overflow on `connect_source_card.dart:88` that broke `validate-earth-fast` green every run. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Protected-areas + WDPA registration** (`wdpa-protected-area-summary`) — Systems + Earth agents. WDPA monthly snapshot; metadata/integrity only (name, IUCN category, status, area km²); structural no-geometry constraint; non-commercial/no-redistribution license noted. Fable ruling: availability = metadata-source axis only; `earth_protected_area_integrity` stays `insufficientEvidence` (separate axes, not unified). **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Connect slice 5** — Connect agent. Source onboarding pipeline slice 5. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **`validate-earth-fast` root tooling fix** (`53a456e`) — Fixes agent. `--no-wasm-dry-run` flag; restores green baseline after overflow fix. **Deployed ✓** (Production Release `27393039706` @ `716c4d3`).
- **Production Release `27393039706`** (`716c4d3`) — owner. Overflow fix, WDPA + protected-areas, Connect slices 4–5, forest pipeline + 19th layer, cursor chore, validate-earth-fast tooling fix live on `rand0m.ai`. `origin/main` = `716c4d3` (Fable-verified). ✓
- **Biodiversity layer** (`e9f9e47`) — Earth + Systems agents. GBIF keyless API; coarse grid-cell aggregate counts; fail-closed endangered-location suppression guard (named testable function; `iucnRedListCategory` facet proved sufficient; zero coordinate fields). 20th layer. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **F1.0 Dynamic Web Favicon** — Fixes agent. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Entities E1 slices 1–2** — Connect agent. Slice 1: `EntityDefinition` with mandatory `sourceRef`; unsourced mapping guard; Connect intake integration. Slice 2: entity-to-region mapping, entity-to-source association. **Deployed ✓** (Production Release `27394511208` @ `4148495`). ⚠ Owner visual pending.
- **Production Release `27394511208`** (`4148495`) — owner. Biodiversity, favicon F1.0, Entities E1 slices 1–2 live on `rand0m.ai`. `origin/main` = `4148495` (Fable-verified). Owner visual checklist pending confirmation. ✓
- **Environmental Data Vertical — COMPLETE** — Systems + Earth + Docs agents. All three phases deployed: forest (`glad-hansen-forest-summary`) ✓, protected-areas (`wdpa-protected-area-summary`) ✓, biodiversity (`e9f9e47`) ✓. Spec: [`architecture/environmental-data-vertical-audit.md`](architecture/environmental-data-vertical-audit.md). ✓

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
- **Cursor-timer test hangs (resolved + deployed):** vendored-SDK cursor-timer test hangs fixed by `chore/test-deterministic-cursor` — deployed at `716c4d3`.
- **Glaciers catalog status:** glaciers layer intentionally stays `research` while source metadata is connected (`assetBacked`/`previewFixture` access). Deployed at `9298e84`. Systems agent to confirm or amend catalog promotion via `EARTH:` delta; Earth applies if change required. Do not promote to `assetBacked` without Systems sign-off.
- **Forest layer (19th) — Fable ruling (session 15):** dedicated `forest` layer id added to catalog (not a sub-group of an existing layer). Human-encroachment block remains unchanged — human encroachment is a distinct concept and is not blocked by the forest governance entry. Do not conflate the two.
- **Connect sheet render-test stall (known issue, session 17):** the two remaining skip-marked tests in Connect are NOT caused by the cursor-timer hang. Root cause is a separate Connect sheet render-test stall. Fixes agent diagnosing under `chore/connect-sheet-test-stall`. Do not un-skip these two tests until that fix lands — the cursor-timer fix (`716c4d3`) does not resolve them.
- **Countries mapping integration — new thread (session 17, owner directive):** country-granularity expansion of `earth_region_registry`; countries as first-class regions; sources/layers/entities mappable to country level; feeds Entities region groups + @scient1st regional answers. **DATA/REGISTRY LEVEL ONLY** — no globe boundary rendering; Cesium V2.16 freeze unchanged. Earth agent spec audit underway (session 18).
- **VCM spec amendment (session 18, Fable ruling):** scope filter added — include only projects with `creditsIssued>0 OR creditsRetired>0 AND lat/long present`. `creditsIssued`/`creditsRetired` are neutral registry-accountability fields (permitted). Lat/long stored for map readiness, not rendered (Cesium freeze). Slice 1 @ `70fafbf` built to pre-amendment spec; slice 2 applying amendment. Full ruling in [`architecture/vcm-governance-spec.md`](architecture/vcm-governance-spec.md).
- **Earth/Connect resolver boundary (session 18, binding):** Connect owns the entity resolver; Earth owns consumption. No cross-ownership. Interface contract changes require `DOCS:` callout before implementation. Codified in [`architecture/entities-spec.md`](architecture/entities-spec.md).
- **Scoped local validation (§18, binding):** named test files for touched surface only; no full-suite local runs; CI is the authoritative broad gate. `validate-earth-fast` gains `-TestPaths` (Fixes chore in progress). Known flaky-harness: non-deterministic mid-suite crash (cursor-timer family) — emit `FIXES:` callout and continue; do not block.
- **Owner visual checklist PENDING (session 18):** Production Release `27394511208` — biodiversity Data View card, favicon, Entities E1 UI not yet visually confirmed by owner. Rows marked ⚠ in Done and Deploy Checkpoint until owner confirms (§17).
- **Authenticated/visual smoke — owner-performed (§17, binding):** authenticated smoke and visual verification of `rand0m.ai` is performed by the **owner personally**. Agents perform HTTP-level smoke only. Checkpoint HANDOFFs close with an owner visual checklist (not agent-executed). Checkpoints are not marked visually verified until the owner confirms. No browser automation, no Claude-in-Chrome for smoke. Codified in coordination standards §17.
- **Protected-areas — Fable ruling (session 16):** `wdpa-protected-area-summary` catalog availability = metadata-source axis only. `earth_protected_area_integrity` stays `insufficientEvidence` — integrity is a separate axis and is not unified with availability. Do not conflate. License constraint: WDPA data is non-commercial/no-redistribution; enforce at the catalog layer.
- **`connect-card-overflow-fix` (session 16):** 0.118px RenderFlex on `connect_source_card.dart:88` broke `validate-earth-fast` green on every run. Fixed and merged at `3ab6786`. This was a known recurring CI noise issue — record as resolved.
- **VCM approved (session 16):** owner-approved VCM / Carbon-offset data vertical. Assigned to Systems agent. Queued after biodiversity Environmental slice lands. Do not start VCM implementation until biodiversity is deployed (sequencing constraint — same Systems worktree, avoid parallel vertical work).
- **Entities approved (session 16):** owner-approved Entities domain. Assigned to Connect agent. Started this cycle — prerequisite (Connect source intake pipeline `c2-0`) now at `3ab6786`. `c2-0` branch kept open per owner until Entities stacking decision is confirmed.
- **F1.0 favicon:** owner-APPROVED (session 17). Merging this cycle alongside biodiversity. Production Release pre-approved.
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
| `earth/countries-mapping-spec` | xyz (remote) | in progress — Earth spec audit (DATA/REGISTRY only) | audit complete → `DOCS:` callout |
| `earth/vcm-slice2` | xyz (remote) | in progress — Systems; scope amendment (creditsIssued/Retired filter + lat/long) | merge after passing |
| `earth/entities-e1-slice3` | xyz (remote) | in progress — Connect; resolver contract | merge after passing |
| `chore/connect-sheet-test-stall` | xyz (remote) | in progress (Fixes) — Connect sheet render-test hang | merge after fix confirmed |
| `earth/biodiversity-layer` | xyz (remote) | `e9f9e47` — merged to main, **deployed ✓** (`4148495`) | safe to delete |
| `feature/f1-0-*` (F1.0 favicon) | xyz (remote) | merged to main, **deployed ✓** (`4148495`) | safe to delete |
| `earth/entities-e1-slice1` | xyz (remote) | `081c4f5` — merged to main, **deployed ✓** (`4148495`) | safe to delete |
| `earth/entities-e1-slice2` | xyz (remote) | merged to main, **deployed ✓** (`4148495`) | safe to delete |
| `earth/data-forest-refresh` | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) | safe to delete |
| `earth/data-forest-registration` | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) | safe to delete |
| `chore/test-deterministic-cursor` | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) | safe to delete |
| `feature/c2-0-source-onboarding-pipeline` (slice 4+5 / base) | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) — kept per owner until Entities stacking confirmed | keep open |
| `earth/data-protected-areas-refresh` | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) | safe to delete |
| `earth/data-protected-areas-registration` | xyz (remote) | merged to main — **deployed ✓** (`716c4d3`) | safe to delete |
| `earth/data-glaciers-live` | xyz (remote) | **deleted** — merged ancestor | — |
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

**5. VCM / Carbon-offset** ✓ **— OWNER-APPROVED (session 16).** Assigned to Systems agent. Queued after biodiversity Environmental slice is deployed. Per sequencing constraint: do not start until biodiversity lands (same Systems worktree). Governance spec (Fable) to be delivered before catalog registration — no catalog entry without approved spec.

**6. Entities domain** ✓ **— OWNER-APPROVED (session 16).** Assigned to Connect agent. Started this cycle — prerequisite Connect intake pipeline (`c2-0`) at `3ab6786`. Per §16: owner command is the approval; no re-gate required. Fable governance spec to be delivered before catalog registration.

_All items resolved or approved. Items 5–6 approved by owner command (session 16) — Fable governance specs required before catalog registration in each case._

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
