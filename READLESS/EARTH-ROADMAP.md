# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-12 (session 22)

---

## Agent Roster

| Agent | Identity | Worktree | Active branch | Focus |
| --- | --- | --- | --- | --- |
| Earth | `deve10per` / dev-kitt | main clone (exclusive) | **R6 deployed** `ca91443`; scientist-entity-resolution in flight (gate flips: resolve-or-explain + Intelligence regional summary); D-slice merge gate active | Earth features, layers, governance; sole catalog owner + D-slice merge gate |
| Systems | `deve10per` / dev-kitt | `worktrees\rand0m-systems` | **CONNECTION-HARDENING COMPLETE** — idle; timer-leak **escalated** (slip=2) → three-outcome closure pending | VCM deployed ✓ — timer-leak chore owner; three-outcome closure |
| Connect | `deve10per` / dev-kitt | `worktrees\rand0m-connect` | S5 `4ec0d24` **provisional pass** — write-path validation wired; E1 integrity gap closed at runtime; R7 merge pending | Entities domain + Connect |
| Design | `deve10per` / dev-kitt | `worktrees\rand0m-design` | D2 `0381603` **PASS** (6→3 workspaces, relocation-only; planetary-intelligence deferred to D4); D3 in flight | IA consolidation D1–D6; presentation/layout only; no data/catalog files |
| Fixes | `deve10per` / dev-kitt | main clone (CI paths only) | timer-leak **escalated** (slip=2, single-item run); uniformity **escalated** (slip=2); `validate-earth-fast` `-TestPaths` (§18) in progress | Bug fixes, CI, harness hygiene |
| Docs | `eng1neer` / qa-kitt | qa-kitt clone | `main` | READLESS, CODEX, EARTH-ROADMAP |
| Fable | — | read-only | — | Audit, spec, PM rulings; declares checkpoint bundles one cycle ahead (§19) |

Agents share `origin/main` on xyz (`random-knights/xyz`). Pull before push. One owner per surface at a time. Writer cap: 5 simultaneous `apps/rand0m` writers — see coordination standards.

**Coordination standards:** [`automation/agent-coordination-standards.md`](automation/agent-coordination-standards.md) — callout format, verify-from-git, worktree isolation, catalog non-touch, path-ownership matrix, HANDOFF protocol.

---

## 14-Day Earth-Ready Plan (target ~2026-06-26)

_Velocity target: ~4 releases / 2 days. Risks: Cesium V2.16 sizing, timer leak (flaky harness). Position: **C5** — on schedule. Watch item: timer-leak + uniformity slip escalation (2 slips each)._

| Cycle | Work | Gate |
| --- | --- | --- |
| **R5** ✓ **DEPLOYED** (`1702eaa`, release `27413467093`) | VCM slice 2 + `berkeley-vcm-registry-summary` + E1 S3 resolver + ripples | CI green; HTTP smoke ✓ |
| **Pre-R6 gates** ✓ **PASSED** | Countries S2 `58361b4` ✓; Design D1 `3cd4255` ✓; Connect `af62d6f` ✓ (zero skips) | All gates passed |
| **R6** ✓ **DEPLOYED** (`ca91443`, release `27415455211`) | Countries S1+S2 + Design D1 + Connect flips + E1 S4 — uniformity + timer-leak SLIPPED to R7 | CI green; HTTP smoke ✓ |
| **Pre-R7 gates** | D2 `0381603` ✓; Connect S5 `4ec0d24` provisional ✓; timer-leak slip=2 (escalated); uniformity slip=2 (escalated) | In progress |
| **R7** _(integration order declared)_ | **Order:** timer-leak → uniformity → Countries S3 → c2-0 tip → D2–D5 stack → release | D1 deployed ✓; D2 gate-passed ✓ |
| **R7 close** | Consolidated UI live; owner visual checklist re-enabled | Owner consolidated visual review: VCM card, biodiversity card, favicon, E1 UI, Countries cards |
| **Cesium V2.16 runtime** | Runtime implementation (separate approved phase) | New Fable spec required |
| **Final checkpoint** | Full validation; production release | — |

**Visual smoke suspension:** owner visual checklists suspended until Design D5 merges (R7). Checkpoints verify via HTTP smoke + CI release smoke only. Reason: Data View surfaces are being redesigned — visual spot-checks against pre-consolidation layout would be misleading and are not meaningful gates until the consolidated view is live.

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
| VCM slice 2 + `berkeley-vcm-registry-summary` registration | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Entities E1 slice 3 (resolver contract) + ripples | merged to main | green | **✓ live** (R5 `1702eaa`) |
| Countries S1 (`f82c595` — additive-only, RegionIds guard) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Countries S2 (`58361b4` — EarthRegionResolver; stale schematic fix; E1 gap closed) | merged to main | green | **✓ live** (R6 `ca91443`) — resolver unwired until Countries S3/S5 |
| Design D1 (`3cd4255` — `earth/design-d1-globe-primary`; pill BOTTOM-LEFT; gauge TOP-RIGHT; dark-canvas) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Connect flips + E1 S4 (`af62d6f` — all render tests ENABLED; zero skips; E1 S4 minimal) | merged to main | green | **✓ live** (R6 `ca91443`) |
| Design D2 (`0381603` — 6→3 workspaces, relocation-only; planetary-intelligence deferred to D4) | **gate-passed** | — | **pending** — R7 bundle |
| Connect S5 (`4ec0d24` — write-path validation; E1 integrity gap closed at runtime) | **provisional pass** | — | **pending** — R7 merge |
| Uniformity fixes | **SLIPPED to R7** — slip=2 (escalated; Fixes single-item run) | — | R7 bundle |
| Timer-leak chore | **SLIPPED to R7** — slip=2 (escalated; Systems three-outcome closure) | — | R7 bundle (first in integration order) |
| scientist-entity-resolution | in progress (Earth) | — | R7 bundle |
| Countries S3 (VCM coord→country mapping; lat/long→ISO at ingest) | queued | — | R7 bundle |
| Design D3 | in progress (Design; gate: D2) | — | R7 bundle |

`origin/main` (xyz) is at `ca91443` (Production Release `27415455211`; Fable-verified).

⚠ **State rule:** rows may only show "merged" or "deployed" when a git-verified SHA from a Fable gate confirmation or `git log origin/main` check is recorded here. Do not assert merged/deployed from session memory.

⚠ **Owner visual checklist SUSPENDED** — R5+R6 checklist items fold into R7 post-design visual review. HTTP smoke + CI only until D5/R7. See 14-Day Plan.

Next checkpoint **R7** — integration order: timer-leak → uniformity → Countries S3 → c2-0 tip → D2–D5 stack → release → owner consolidated visual review.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** R6 deployed `ca91443`. scientist-entity-resolution in flight — gate flips (resolve-or-explain) + Intelligence regional summary. D-slice merge gate active for D3+.
- **Systems agent:** idle post-R5. Timer-leak chore owner — escalated (slip=2); three-outcome closure pending for R7.
- **Connect agent:** S5 `4ec0d24` provisional pass — write-path validation wired; E1 integrity gap closed at runtime. Awaiting R7 merge slot per integration order.
- **Design agent:** D2 `0381603` gate-passed (6→3 workspaces; relocation-only; planetary-intelligence deferred to D4 as specced). D3 in flight.
- **Fixes agent:** timer-leak escalated (slip=2, single-item run per escalation protocol). Uniformity escalated (slip=2). `validate-earth-fast` `-TestPaths` (§18) in progress.
- **Docs agent:** session-22 update ✓ — R6 deployed `ca91443`; pre-R7 gates recorded; R7 integration order declared; slip tracking added; IA spec D2 updated.

---

## Next

_Queued — approved scope, not yet started._

1. **R7 integration order (declared):**
   1. timer-leak chore (Systems three-outcome closure; Fixes single-item run) — escalated, must close first
   2. uniformity fixes (Fixes; escalated slip=2)
   3. Countries S3 (Earth; VCM coord→country mapping, lat/long→ISO at ingest)
   4. c2-0 tip (Connect S5 `4ec0d24` merge)
   5. D2–D5 stack (Design; Earth merge-gates each — D3 in flight → D4 → D5)
   6. Release → owner consolidated visual review
2. **R7 owner consolidated visual review (suspended checklist items):** VCM card, biodiversity card, F1.0 favicon, E1 UI, Countries cards, D1 shell/pill/gauge, D2–D5 consolidated Data View.
3. **Design agent:** D3 (card taxonomy + density rules) → D4 (detail workspace scaffold) → D5 (cleanup pass); Earth merge-gates each. D6 gated on owner review of consolidated view post-D5.
4. **scientist-entity-resolution (Earth):** gate flips (resolve-or-explain); Intelligence regional summary. Feeds R7 bundle.
5. **Fixes agent:** timer-leak single-item run (escalated); uniformity single-item run (escalated); land `validate-earth-fast` `-TestPaths` (§18).
6. **Systems agent:** timer-leak three-outcome closure (slip=2 escalation path).
7. **Cesium V2.16 runtime:** separate phase; requires new Fable spec + owner directive.
8. **Cleanup ledger:** `earth/countries-s1`, `earth/countries-s2`, `earth/design-d1-globe-primary` safe to delete (post-verify). Delete `earth/vcm-slice2`, `earth/entities-e1-slice3`. Delete stale: `data-forest-refresh`, `data-forest-registration`, `test-deterministic-cursor`, `data-protected-areas-refresh`, `data-protected-areas-registration`, `earth/biodiversity-layer`, `feature/f1-0-*`. `c2-0` kept open. Delete abandoned: `earth/p17-7-*`, `earth/p18-0/1/2-*`.
9. **Future-infra queue:** GFW near-real-time forest alerts (FIRMS pattern, new callable); remote-config budget + kill switch.

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
- **VCM slice 2 + `berkeley-vcm-registry-summary` registration** — Systems + Earth agents. Scope amendment applied (creditsIssued/Retired filter; lat/long stored; banned-term guard). Registry entry live. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Entities E1 slice 3 (resolver contract) + ripples** — Connect + Earth agents. Connect owns resolver; Earth owns consumption. Ripple fixes included. **Deployed ✓** (Production Release `27413467093` @ `1702eaa`).
- **Production Release `27413467093`** (`1702eaa`) — owner. VCM slice 2 + E1 S3 resolver + ripples live on `rand0m.ai`. `origin/main` = `1702eaa` (Fable-verified). HTTP smoke ✓; visual checklist items fold into R7 post-design review. ✓
- **CONNECTION-HARDENING DATA LAYER — COMPLETE** 🔒 — all planned Earth-Systems + Environmental + VCM data verticals shipped and live: ocean live feed, ice/glaciers, air-quality, forest (GLAD/Hansen), protected-areas (WDPA), biodiversity (GBIF), VCM (Berkeley BCTP). Data layer frozen; next major work is Countries registry + UI consolidation (Design) + Entities domain.
- **Countries S1 + S2** — Earth agent. S1: additive-only `earth_region_registry` expansion; `RegionIds` guard. S2: fail-explicit `EarthRegionResolver`; E1 referential gap closed; stale schematic copy fixed. Resolver on main — unwired until Countries S3/S5. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Design D1** (`3cd4255` — `earth/design-d1-globe-primary`) — Design agent. Earth+ workstation shell: tab rail restructure; pill BOTTOM-LEFT; filtered score gauge TOP-RIGHT; dark-canvas AppColors. §6 Design Language formally appended to spec. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Connect flips + E1 S4** (`af62d6f`) — Connect agent. Connect flips; E1 slice 4 minimal registration; all 3 render tests ENABLED — zero skips remain. `chore/connect-sheet-test-stall` closed. **Deployed ✓** (Production Release `27415455211` @ `ca91443`).
- **Production Release `27415455211`** (`ca91443`) — owner. Countries registry (S1+S2), Design D1 shell, Connect flips + E1 S4 live on `rand0m.ai`. `origin/main` = `ca91443` (Fable-verified). HTTP smoke ✓; visual items fold into R7 consolidated review. ✓

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
- **Owner visual checklists SUSPENDED (session 19, owner directive):** visual spot-checks against `rand0m.ai` deferred until Design D5 merges (R7). Checkpoints verified by HTTP smoke + CI release smoke only. Reason: Data View surfaces under active redesign (D1–D6); visual checks against pre-consolidation layout are not meaningful gates. Will be re-enabled after R7. Previous ⚠ rows for PR `27394511208` superseded by this suspension — reviewed in post-R7 visual pass.
- **Countries spec RATIFIED (session 19, Fable):** ISO tier; no `EarthRegionIds.all` expansion (breaks existing lookups); fail-explicit lookups (missing country = explicit error, not silent fallback); S2 closes E1 gap (resolver queryable by country); VCM coord→country mapping (lat/long → ISO at ingest, not display); 5-slice plan (S1 registry, S2 resolver, S3 VCM mapping, S4 @scient1st regional, S5 cleanup).
- **Design agent — IA consolidation (session 19, owner directive):** promoted from audit to implementation. Worktree `worktrees\rand0m-design`; owns D1–D6 presentation slices. Spec: [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md). Earth agent is merge gate for every D-slice. D1 in flight; pill ruling resolved.
- **Fable checkpoint bundle cadence (§19):** Fable declares checkpoint bundles one cycle ahead — agents know what the next release gate includes before the cycle starts.
- **CONNECTION-HARDENING DATA LAYER COMPLETE (session 20):** all planned data verticals shipped — ocean, ice, air, forest, protected-areas, biodiversity, VCM. Data layer enters maintenance mode; Systems agent idle post-R5. Next Systems work requires a new owner directive.
- **Owner visual checklists SUSPENSION CONFIRMED (session 20):** R5 checklist items (VCM card, biodiversity card, favicon, E1 UI) fold into the R7 post-design visual review. Agents do not need to track individual visual items until R7 triggers the consolidated review.
- **Owner rulings — visual direction (session 20, binding):** Earth+ pill = BOTTOM-LEFT always; filtered score gauge = TOP-RIGHT (filter-reactive); dark-canvas gauge/donut/chip density harmonized with `AppColors`. Reference images provided to Design agent. Full ruling in [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md).
- **R6 bundle declared (session 20, Fable):** Countries S1+S2, Design D1 (+D2 if ready), uniformity fixes, Connect flips + E1 S4. Release approval requested at integration; no automatic release on merge.
- **R6 final bundle (session 21):** uniformity fixes + timer-leak chore SLIPPED to R7 — Systems/Fixes branches never reached remote. R6 final = Countries S1+S2 + D1 + Connect flips+E1 S4 only. Slipped items added to R7 bundle.
- **Countries S1 gate-passed (session 20):** `f82c595` — additive-only registry expansion; `RegionIds` guard in place. No `EarthRegionIds.all` expansion.
- **Countries S2 gate-passed (session 21):** `58361b4` — fail-explicit `EarthRegionResolver` closes the E1 referential gap; stale schematic copy resolved. Stale schematic open callout dropped.
- **Design D1 gate-passed (session 21):** `3cd4255` (`earth/design-d1-globe-primary`) — presentation-only; pill BOTTOM-LEFT ✓; gauge TOP-RIGHT ✓; dark-canvas AppColors. Design's DOCS: callout resolved — §6 formally appended to [`architecture/earth-ia-consolidation-spec.md`](architecture/earth-ia-consolidation-spec.md).
- **Connect render tests ENABLED (session 21):** `af62d6f` — all 3 render tests enabled; zero skips remain in Connect. `chore/connect-sheet-test-stall` resolved by this gate-pass.
- **R7 bundle declared (session 21):** Design D2–D5 + resolver wiring + Intelligence summary + Countries S3 + uniformity fixes + timer-leak chore. R7 closes with owner consolidated visual review (suspended checklist items folded in: VCM card, biodiversity card, favicon, E1 UI).
- **R6 DEPLOYED (session 22):** `ca91443`, Production Release `27415455211` — Countries S1+S2, Design D1, Connect flips + E1 S4. `origin/main` = `ca91443`.
- **Countries S1+S2 deployed note (session 22):** `EarthRegionResolver` is on main but **unwired** — countries are in the registry; resolver is not yet called by Earth layers or @scient1st. Wire-up happens at Countries S3 (VCM coord→country) and S5 (cleanup). Do not assert country-level routing is active until S3/S5 land.
- **Connect render-test stall CLOSED (session 22):** `af62d6f` confirmed zero skips — all 3 render tests enabled. `chore/connect-sheet-test-stall` pivot closed. Skip-marked-tests constraint from CODEX lifted for Connect.
- **R7 integration order declared (session 22):** timer-leak → uniformity → Countries S3 → c2-0 tip → D2–D5 stack → release → owner consolidated visual review. Order is binding — do not resequence without owner directive.
- **SLIP TRACKING added (session 22):** timer-leak and uniformity each at slip=2 (two consecutive cycles missed remote). Escalation path: Fixes runs single-item isolation; Systems runs three-outcome closure (pass / root-cause / descope). Slip counter must be recorded on in-flight rows in Deploy Checkpoint. A third slip triggers owner escalation.
- **D2 planetary-intelligence split deferred (session 22):** planetary-intelligence surface will be implemented in D4 as originally specced — D2 is relocation-only (6→3 workspace consolidation). Do not attempt intelligence wiring in D2 or D3.
- **D2 gate-passed (session 22):** `0381603` — 6→3 workspace relocation; presentation-only; no catalog/Cesium files. Earth gate confirmed.
- **Connect S5 provisional pass (session 22):** `4ec0d24` — write-path validation wired; E1 integrity gap closed at runtime. Provisional pending full R7 integration — not a final gate.
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
| `earth/design-d2` (or equivalent) | xyz (remote) | `0381603` — **gate-passed** (6→3 workspaces, relocation-only; planetary-intelligence deferred D4) | R7 bundle (first in D-stack) |
| `connect/s5-write-path` (or equivalent) | xyz (remote) | `4ec0d24` — **provisional pass**; write-path validation; E1 integrity gap closed | R7 merge per integration order |
| `earth/scientist-entity-resolution` | xyz (remote) | in progress (Earth) — gate flips; Intelligence regional summary | R7 bundle |
| `chore/timer-leak` | xyz (remote) | **slip=2 escalated** — Fixes single-item; Systems three-outcome closure | R7 bundle (first in integration order) |
| `chore/uniformity` | xyz (remote) | **slip=2 escalated** — Fixes single-item run | R7 bundle |
| `earth/countries-s3` | xyz (remote) | queued — VCM coord→country mapping; lat/long→ISO at ingest | R7 bundle |
| `earth/countries-s1` | xyz (remote) | merged to main — **deployed ✓** (`ca91443`, R6) | safe to delete post-verify |
| `earth/countries-s2` | xyz (remote) | merged to main — **deployed ✓** (`ca91443`, R6) | safe to delete post-verify |
| `earth/design-d1-globe-primary` | xyz (remote) | merged to main — **deployed ✓** (`ca91443`, R6) | safe to delete post-verify |
| `earth/connect-flips-e1s4` | xyz (remote) | merged to main — **deployed ✓** (`ca91443`, R6) | safe to delete |
| `earth/vcm-slice2` | xyz (remote) | merged to main — **deployed ✓** (`1702eaa`) | safe to delete |
| `earth/entities-e1-slice3` | xyz (remote) | merged to main — **deployed ✓** (`1702eaa`) | safe to delete |
| `chore/connect-sheet-test-stall` | xyz (remote) | **CLOSED** — zero skips confirmed by `af62d6f` | safe to delete |
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

**7. Earth+ pill corner ruling** ✓ **— RESOLVED (session 20).** Owner ruled: BOTTOM-LEFT always. D1 unblocked. Design agent proceeding.

_All items resolved or approved._

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
