# Preservation Archive — dev-kitt local-only knowledge

**Created:** 2026-06-25 · **By:** ecosystem preservation pass (X1.0 follow-up).
**Why:** the `C:\Projects\dev-kitt` **root repo is local-only (no remote)**, and
several high-value files there were **untracked** — so a disk loss would have
erased governance law, operational runbooks, the env contract, and the 2D-canvas
renderer handoff. This folder is a **disaster-recovery archive** on a private
remote (`random-knights/.github`), so disk loss ≠ knowledge loss.

> **This is a backup snapshot, not the canonical source.** The working copies
> live in `C:\Projects\dev-kitt`. If they diverge, dev-kitt wins. Do not edit
> these copies expecting them to flow back. Re-snapshot when the originals change
> materially.

**No secrets.** Every file here was secret-scanned before commit; only key
**names** and masked examples appear. The real `.env` / `functions/.env` were
never read (both gitignored at source).

## Contents

| Path | Source (local-only / untracked at dev-kitt) | What it is |
| --- | --- | --- |
| `governance/CODEX.md` | `dev-kitt/CODEX.md` (tracked, but local-only repo) | Execution law / agent governance |
| `governance/RUNBOOK.md` | `dev-kitt/RUNBOOK.md` (tracked, but local-only repo) | Day-to-day ops runbook |
| `governance/env-contract-structure.md` | derived from tracked `dev-kitt/.env.example` | Env key-NAME contract (placeholders only) |
| `dev-kitt-runbooks/*.md` (17) | `dev-kitt/tooling/scripts/*.md` (**untracked**) | Earth/app operational command-packs + runbooks |
| `earth2d-handoff/**` | `dev-kitt/earth2d-handoff/` (**untracked**) | 2D-canvas renderer handoff: methodology review, AIEDS whitepaper draft, INTEGRATION, command packs, + `lib/`/`web/` reference code |

### Highlights worth not losing
- `earth2d-handoff/earth-health-score-methodology-review.md` +
  `discussions/01-earth-health-score-methodology.md` — the Planet Health Score
  (v0.6) methodology rationale.
- `earth2d-handoff/lib/**` + `web/earth2d_*.js` — reference implementation for the
  **ratified north-star** (retire Cesium → full 2D-canvas renderer). Code is
  archived here verbatim; its eventual runtime home is `apps/rand0m` (or
  `xyz-earth`), not this docs repo.
- `dev-kitt-runbooks/EARTH-DATA-SCORE-RUNBOOK.md`,
  `API-KEY-PERSISTENCE-LANE.md` (BYOK persistence/masking spec),
  `CONSOLIDATE-AND-DEPLOY.md`, `EARTH-FINISH-AND-SHIP.md`, etc.

## Canonical homes (where these belong long-term)
- Governance (CODEX/RUNBOOK): stay canonical in `dev-kitt` root; **this is the
  off-machine backup**. Consider giving the dev-kitt root repo its own private
  remote so the backup is continuous rather than snapshot.
- Operational runbooks: keep working copies in `dev-kitt/tooling/scripts`;
  promote durable ones into `READLESS/internal/automation` over time.
- earth2d-handoff code: integrate into `apps/rand0m` / `xyz-earth` when the
  2D-renderer lane lands; this archive is the safety net until then.
