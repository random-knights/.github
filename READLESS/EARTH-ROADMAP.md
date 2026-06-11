# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-11

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
| Earth UI Cleanup + Live Connections | **merged to main** | green | **pending** |
| Air-Quality (18th live layer) + Ocean loader | **merged to main** | green | **pending** |
| Earth Fast workflow test rewrite | **merged to main** | green | **pending** |

`origin/main` (xyz) is at `75e46b6`. All work is deployable. No Production Release has been triggered yet.

Next checkpoint action: owner triggers `90-production-release.yml` (workflow_dispatch) from `main` → deploys `hosting:rand0m` → `rand0m.ai`.

---

## Now

_Active — in flight or ready for immediate action._

- **Docs agent:** CODEX.md `chore/d1-4` branch merged to `master` (local dev-kitt root). EARTH-ROADMAP.md updated and pushed to qa-kitt main. ✓
- **Deploy checkpoint:** ready. All branches merged to main. Awaiting owner Production Release trigger.

---

## Next

_Queued — approved scope, not yet started._

1. Owner triggers Production Release (`90-production-release.yml`) from `main` on xyz.
2. Post-deploy smoke: Earth dashboard, air-quality card, ocean live loader, UI cleanup on `rand0m.ai`.
3. Confirm `earth/earthview-ui-cleanup` and `earth/live-connections-batch` stale branches can be deleted after deploy.
4. Begin next Earth phase (p19+ or next planned phase) on a fresh `earth/**` branch.

---

## Done

_Completed and on `main`._

- **Dashboard + AIEDS + Docs** — shipped to production previously. ✓
- **Earth UI Cleanup** (`earthview-ui-cleanup`) — merged to main. Earth View score/summary to dashboard aesthetic; Earth+ squeeze fix; Oracles animated gif + custom font. ✓
- **Live Connections Batch** (`live-connections-batch`) — merged to main. Air-quality + ocean governed live Data View cards; live-connection data vertical. ✓
- **Air-Quality 18th Layer** (`1dea432`) — Earth agent. Governed `EarthLayerDefinition` for air-quality (Open-Meteo); live layer grid card; ocean-currents wired to live loader; registry/region-ready count updated 13→14; governance + registry tests added. ✓
- **Earth Fast Workflow Test Rewrite** (`75e46b6`) — Fixes agent. `earth_fast_validation_test` rewritten to assert current numbered workflow scheme (01/80/90/99); retired stale workflow references. ✓
- **CODEX.md — Session Bootstrap + EARTH-ROADMAP step** — Docs agent. Full Session Bootstrap, parallel-agent protocol, numbered workflow policy, and step 6 added. Merged to dev-kitt master. ✓
- **EARTH-ROADMAP.md created** — Docs agent. Living plan seeded and published to qa-kitt main. ✓

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation only.
- Earth Vision (imagery/processing) is tooling/research-only until architecture is approved.
- Air-quality is health/trend-neutral (`influencesEarthHealthScore/Trend = false`): live card only, not folded into Earth health score.

---

## Open Branches

| Branch | Repo | Status | Action |
| --- | --- | --- | --- |
| `earth/earthview-ui-cleanup` | xyz (remote) | merged to main | delete after deploy |
| `earth/live-connections-batch` | xyz (remote) | merged to main | delete after deploy |
| `chore/d1-4-release-candidate-smoke-policy-review-docs` | dev-kitt (local) | merged to master | safe to delete |
