# Earth Roadmap

Living shared plan for Earth feature work across `dev-kitt` and `qa-kitt`.
Update this file at the start and end of every session.

**Repo:** `eng1neer/github-qakitt` (qa-kitt · random-knights/.github)
**Last updated:** 2026-06-11

---

## Deploy Checkpoint Status

| Checkpoint | Branches | CI | Deployed |
| --- | --- | --- | --- |
| Earth UI Cleanup + Live Connections | `earthview-ui-cleanup`, `live-connections-batch` | green | **pending** |

Next checkpoint action: owner-triggered Production Release (`90-production-release.yml`) from `main` after merge.

---

## Now

_Active branch(es) — in flight, not yet merged or deployed._

- Nothing in flight. Checkpoint merge + deploy is the immediate next action.

---

## Next

_Queued work — approved scope, not yet started._

1. Merge `earthview-ui-cleanup` → `main` (confirm CI still green, no conflicts).
2. Merge `live-connections-batch` → `main`.
3. Run Production Release checkpoint → deploy to `rand0m.ai`.
4. Post-deploy smoke: verify Earth dashboard, live air/ocean connections, UI cleanup on production.
5. Archive checkpoint in Done section below.

---

## Done

_Completed and shipped (or merged to main)._

- **Dashboard + AIEDS + Docs** — shipped. CI fixes resolved. ✓
- **Earth UI Cleanup** (`earthview-ui-cleanup`) — pushed, CI green, checkpoint pending.
- **Live Connections Batch** (`live-connections-batch`) — pushed, CI green, checkpoint pending.

---

## Pivots

_Scope changes, strategy shifts, or deferred decisions._

- Cesium bridge planning frozen at V2.16. Next Cesium work is runtime implementation, not additional planning. No new Cesium planning phases until runtime begins.
- Earth Vision (imagery/processing) is tooling/research-only. No Flutter web image processing until architecture is approved.

---

## Open Branches

| Branch | Repo | Status | Notes |
| --- | --- | --- | --- |
| `earthview-ui-cleanup` | dev-kitt/xyz | pushed, CI green | awaiting checkpoint merge |
| `live-connections-batch` | dev-kitt/xyz | pushed, CI green | awaiting checkpoint merge |
