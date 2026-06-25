# Cleanup command — local workstation + worktrees (Random Knights `dev-kitt`)

Hand this to a single cleanup agent. **Run from `C:\Projects\dev-kitt` (the MAIN checkout). Never run from inside a `worktrees/*` folder.**

**Goal:** remove merged/stale git worktrees and the untracked `earth2d-handoff/` scratch — WITHOUT losing any unmerged/unpushed work and WITHOUT disturbing an agent that may be working right now.

## Guardrails (read first — these override convenience)
- An Earth "finishing-polish" agent may be **actively using a worktree right now**. Do **not** remove any worktree that is dirty (uncommitted changes) or has commits not reachable from a remote. Report those and leave them.
- Destructive steps run **only after** the Phase 1 audit table is printed and every directory is classified.
- Use `git worktree remove` (not `rm`) for *registered* worktrees; only `rm` directories git no longer tracks, then `git worktree prune`.
- Never use `git worktree remove --force`, `git branch -D`, or `rm` on anything dirty or unpushed. When in doubt → KEEP and report.
- Do not `git push` anything. Leave pushes to the owner.

## Phase 1 — Audit (read-only). Print the table, then stop.
```powershell
cd C:\Projects\dev-kitt
git fetch origin --prune
git worktree list --porcelain          # the worktrees git actually tracks
foreach ($d in Get-ChildItem worktrees -Directory) {
  Push-Location $d.FullName
  $branch = git rev-parse --abbrev-ref HEAD 2>$null
  $dirty  = (git status --porcelain 2>$null | Measure-Object).Count
  $head   = git rev-parse HEAD 2>$null
  git merge-base --is-ancestor $head origin/main 2>$null; $merged = ($LASTEXITCODE -eq 0)
  $pushed = [bool](git branch -r --contains $head 2>$null | Select-String "origin/")
  $ahead  = git rev-list --count "origin/main..$head" 2>$null
  "{0,-26} branch={1,-24} dirty={2} merged={3} pushed={4} ahead={5}" -f $d.Name,$branch,$dirty,$merged,$pushed,$ahead
  Pop-Location
}
```
Classify each directory:
- **SAFE**  = `dirty=0` AND (`merged=True` OR `pushed=True`)
- **KEEP**  = `dirty>0` OR (`merged=False` AND `pushed=False`)  ← report, do **not** touch
- **ORPHAN** = on disk but absent from `git worktree list` ← treat as SAFE only if its HEAD is merged/pushed, or it has no resolvable git state

> Local hint (from an earlier inspection, may be stale): there are ~17 dirs under `worktrees/` but `git worktree list` registered only the main checkout — so expect several ORPHANs and plan to run `git worktree prune`. Most are landed Earth lanes (`rand0m-earth*`, `rand0m-score*`), but **re-verify live** — do not assume.

## Phase 2 — Remove only SAFE worktrees
```powershell
# Registered + SAFE:
git worktree remove "worktrees\<name>"          # refuses if dirty (good)
git branch -d <branch> 2>$null                  # -d refuses if unmerged (good)
# ORPHAN dir (not in `git worktree list`) that is clean & merged/pushed:
Remove-Item -Recurse -Force "worktrees\<name>"
# Finally, clear stale worktree metadata:
git worktree prune -v
```

## Phase 3 — `earth2d-handoff/` (untracked scratch — local-only delete)
It is **not in git**, so this only frees local disk. **Rescue the one doc that lives nowhere else first.**
```powershell
# 1) The methodology discussion exists ONLY in earth2d-handoff — save it to the tracked docs repo:
New-Item -ItemType Directory -Force C:\Projects\qa-kitt\.github\READMORE\discussions | Out-Null
Copy-Item earth2d-handoff\discussions\01-earth-health-score-methodology.md `
          C:\Projects\qa-kitt\.github\READMORE\discussions\earth-health-score-methodology.md

# 2) The AIEDS whitepaper already has a tracked twin — confirm it matches; copy only if it differs:
fc earth2d-handoff\discussions\02-aieds-whitepaper.md `
   C:\Projects\qa-kitt\.github\READMORE\architecture\aieds\aieds-whitepaper.md
#    if `fc` reports differences, also: Copy-Item earth2d-handoff\discussions\02-aieds-whitepaper.md `
#                                                 C:\Projects\qa-kitt\.github\READMORE\discussions\aieds-whitepaper.md

# 3) Everything else in earth2d-handoff is SUPERSEDED by what landed on main and is safe to drop:
#      - lib/ + web/  -> seeds; apps/rand0m/lib/{widgets,services}/earth2d/** and web/earth2d_*.js
#                        are far ahead (e.g. mount 668 vs 213 lines, globe_view 527 vs 117) + have
#                        newer files (bridge_factory/stub/web, region_geometry) the seeds lack.
#      - INTEGRATION.md, REMAINING-WORK-COMMAND-PACKS.md  -> work already landed/ran.
#      - earth-health-score-methodology-review.md  -> superseded by discussion 01 (rescued above).
Remove-Item -Recurse -Force earth2d-handoff
```
Then commit the rescued doc(s) in `qa-kitt` (do not push):
```powershell
cd C:\Projects\qa-kitt
git add .github\READMORE\discussions
git commit -m "docs: preserve Earth Health Score methodology discussion (rescued from earth2d-handoff scratch)"
cd C:\Projects\dev-kitt
```

## Phase 4 — Report back
List: worktrees removed; worktrees **KEPT** with the reason (dirty / unpushed); orphan dirs removed; branches deleted; where the rescued doc(s) landed; and confirm `earth2d-handoff/` is gone. Flag anything ambiguous for owner review rather than deleting it.
