# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-11 (session 7)

---

## Agent Roster

| Agent | Identity | Focus |
| --- | --- | --- |
| Earth | `deve10per` / dev-kitt | Earth features, layers, governance |
| Fixes | `deve10per` / dev-kitt | Bug fixes, test repair, CI |
| Docs | `eng1neer` / qa-kitt | READLESS, CODEX, EARTH-ROADMAP |

Agents share `origin/main` on xyz (`random-knights/xyz`). Pull before push. One owner per surface at a time.

---

## Deploy Checkpoint Status

| Checkpoint | State | CI | Deployed |
| --- | --- | --- | --- |
| Earth UI Cleanup + Live Connections | merged to main | green | **✓ live** |
| Air-Quality (18th live layer) + Ocean loader | merged to main | green | **✓ live** |
| Earth Fast workflow test rewrite | merged to main | green | **✓ live** |
| @scient1st real Earth-context AI responses | merged to main | green (+374, 0 failures) | **✓ live** |

`origin/main` (xyz) is at `01a070a`. Production Release `27374833292` succeeded — @scient1st, air-quality, ocean live cards, and UI cleanup are live on `rand0m.ai`.

Next checkpoint: after `earth/scientist-session-continuity` Phases 3–4 merge → owner triggers `90-production-release.yml` from `main`.

---

## Now

_Active — in flight or ready for immediate action._

- **Earth agent:** `earth/scientist-session-continuity` Phases 0–2 complete (`338ee40`, not yet merged). Phase 0 extraction landed but `earth_tab.dart` is at 2,419 lines — <1,500 target unmet (see Pivots). Phases 3–4 are the next run.
- **Docs agent:** session-continuity spec fully expanded and persisted to READLESS (session 6). Roadmap current. ✓
- **Deploy:** Production Release `27374833292` succeeded — all prior checkpoints live on `rand0m.ai`. ✓

---

## Next

_Queued — approved scope, not yet started._

1. **[PINNED — active Earth phase] `earth/scientist-session-continuity`** — spec at [`architecture/scientist-session-continuity-spec.md`](architecture/scientist-session-continuity-spec.md).
   - ~~First run: Phases 0–2~~ ✓ done at `338ee40` (not yet merged).
   - **Second run:** Phases 3–4 — cumulative AIEDS session ledger + soft budget guard + stale packet-line fix + prompt size cap. Earth Fast Cycle validation.
   - **Follow-up extraction:** `earth_tab.dart` at 2,419 lines after Phase 0 — <1,500 target unmet; a focused follow-up extraction phase is required before Phases 3–4 merge to main (see Pivots).
   - **Checkpoint after Phase 4:** full validation + Production Release if green.
2. Delete stale/merged remote branches: `earth/earthview-ui-cleanup`, `earth/live-connections-batch`, `chore/earth-workflow-test-staleness`, `earth/scientist-live-ai-responses`. Delete abandoned branches: `earth/p17-7-scientist-context-bridge`, `earth/p18-0/1/2-*` (see Pivots).
3. Begin next Earth phase (post-continuity) on a fresh `earth/**` branch.

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
- **`earth/scientist-session-continuity` Phases 0–2** (`338ee40`) — Earth agent. `EarthScientistController` + `ScientistResponsePane` extracted; request-token race safety; bounded in-memory transcript (5 exchanges, exclusion-gated). Not yet merged. `earth_tab.dart` at 2,419 lines — <1,500 target unmet; follow-up extraction required.

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.
- **`earth/p17-7-scientist-context-bridge`, `earth/p18-0-earth-agent-activation`, `earth/p18-1-scientist-command-surface`, `earth/p18-2-scientist-preview-response`** — abandoned. Audited: ~74k-line divergent rewrites vs main; not a safe merge basis. @scient1st shipped fresh on `earth/scientist-live-ai-responses` from current `main` instead. Candidates for deletion.
- **`earth_tab.dart` architecture threshold:** 2,387 lines at `01a070a`; 2,419 lines after Phase 0 extraction at `338ee40` — CODEX 2,000-line threshold still exceeded and the spec's <1,500 target is unmet. Phase 0 extracted `EarthScientistController` + `ScientistResponsePane` but more widget/service surface remains in the page file. A follow-up extraction phase is required before Phases 3–4 can merge cleanly to main. Do not add further features to `earth_tab.dart` until this extraction is complete.
- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the live-AI path requires a code change, rebuild, and Production Release — it is not a runtime toggle. Live answers cost real tokens via the Default AI Provider through the `generateAIResponse` Firebase callable. The Phase 3 budget guard is soft and in-memory only; it does not hard-cap Firebase invocations across relaunches.
- **Ocean-currents catalog status:** remains `research` despite live-loader card wiring. Card surfaces the layer; underlying data feed is not live. Intentional — matches air-quality health-neutral, card-only pattern.

---

## Open Branches

| Branch | Repo | Status | Action |
| --- | --- | --- | --- |
| `earth/scientist-session-continuity` | xyz (remote) | Phases 0–2 at `338ee40` — in progress, not merged | Phases 3–4 next |
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
