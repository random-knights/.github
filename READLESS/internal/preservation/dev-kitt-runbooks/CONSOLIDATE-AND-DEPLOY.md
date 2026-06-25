# Consolidate lanes → main → staging (Random Knights Earth)

**State (from `git log`/`branch -a`):** `origin/main` = `main` = `fa3d16c`. Ready to merge, all file-disjoint:
`earth/r1-scalar`, `earth/r2-points`, `earth/s-snapshot`, `earth/p-perf`.

**Not present:** `earth/t-state` — **Lane T did not run.** So this ship does NOT include the top-bar merge (the one UI change you approved), URL breadcrumbs, score-history panel wiring, the active-chips redesign, or the mode→overlay decouple. Those land in a later pass (see bottom). Lane S's "Browse in Data View" will therefore be a plain Data-View tab-switch, not yet a URL deep-link — that's expected and fine.

---

## Phase 1 — consolidate the 4 lanes (hand to ONE agent; it's git-heavy + order-sensitive)

```
TASK (EARTH — consolidate r1/r2/s/p into main, then STOP; do not deploy). Run in C:\Projects\dev-kitt\apps\rand0m (git root).
0. git fetch origin --prune. For each of earth/r1-scalar, earth/r2-points, earth/s-snapshot, earth/p-perf: report `git log --oneline origin/main..<branch>` (the commits it adds) + the files it touches (git diff --name-only origin/main...<branch>). Confirm NO two lanes touch the same file (they shouldn't: R1=web/earth_scalar_field.js+earth2d_scalar.js+palettes, R2=web/earth_point_field.js+earth2d_points.js+build_earth_pointsets.py, S=widgets/earth/earth_layer_snapshot_card_view.dart, P=web/index.html+widgets/earth/earth_visualization_stage.dart+widgets/earth2d/earth2d_renderer_toggle.dart). Flag any overlap and STOP if found.
1. Merge in any order (disjoint). For EACH lane <b> in r1-scalar, r2-points, s-snapshot, p-perf:
   - in its worktree (C:\Projects\dev-kitt\worktrees\rand0m-<b-suffix>): `git rebase origin/main`
   - validate: `flutter analyze` + `flutter test` (plus the JS/golden-LUT parity test for r1/r2 if present)
   - if green, from the main checkout: `git checkout main && git pull --ff-only && git merge --ff-only earth/<b>`
2. After all four: run the full suite once more on main (`flutter analyze`, `flutter test`), and `dart run` any earth golden tests.
3. Sanity-check Lane S compiles standalone: the snapshot's onBrowseInDataView callback must DEFAULT to a plain Data-View tab switch (Lane T isn't here to wire a URL deep-link). If S made it a required param with no default, add the default so earth_tab still builds.
4. `git push origin main`. Report the new main SHA + one line per lane (commits merged, files changed). DO NOT deploy or trigger any workflow.
```

Manual equivalent (if you'd rather not use an agent), per lane:
```powershell
cd C:\Projects\dev-kitt\worktrees\rand0m-r1-scalar ; git fetch origin ; git rebase origin/main
# (validate: flutter analyze ; flutter test)
cd C:\Projects\dev-kitt\apps\rand0m ; git checkout main ; git pull --ff-only ; git merge --ff-only earth/r1-scalar
# repeat for earth/r2-points, earth/s-snapshot, earth/p-perf, then:
git push origin main
```

---

## Phase 2 — deploy the web app to staging (after main is pushed)

wf80 is manual-dispatch and deploys `main` to `randomknights-xyz.web.app`:
```powershell
gh workflow run "Staging Deploy + Smoke" --ref main
# or: GitHub → Actions → "Staging Deploy + Smoke" → Run workflow → branch main
```
The workflow builds `flutter build web` and runs its own HTTP smoke; watch it green in the Actions tab.

---

## Phase 3 — deploy the functions (independent of the web app; run anytime)

```powershell
cd C:\Projects\dev-kitt\apps\rand0m\functions ; npm run build
cd C:\Projects\dev-kitt
firebase deploy --only "functions:earthHealthScoreRefresh,functions:earthAragoniteRefresh" --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthHealthScoreRefresh-us-central1 --location us-central1 --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthAragoniteRefresh-us-central1   --location us-central1 --project randomknights-xyz
gcloud run jobs deploy earth-worker --source C:\Projects\dev-kitt\apps\rand0m\worker --region us-central1 --project randomknights-xyz
gcloud run jobs execute earth-worker --region us-central1 --project randomknights-xyz
```

---

## Phase 4 — verify (then device-pass)

```powershell
$b="https://storage.googleapis.com/randomknights-xyz.firebasestorage.app"
$s = Invoke-RestMethod "$b/earth/score/health-score.json?cb=$(Get-Random)"
"methodology $($s.meta.methodologyVersion) | global $($s.global.score) | ocean $((($s.global.subScores | ? {$_.layerId -eq 'ocean'}).normalized))"
# expect: methodology 0.4, ocean > 0
(Invoke-WebRequest https://randomknights-xyz.web.app -UseBasicParsing).StatusCode   # 200
```
On the live site, confirm: clustered dots (R2), borders over the overlay + BAA no longer a blanket (R1), and the slimmed snapshot returning the clicked dot/cluster (S). Then your device pass.

---

## Later pass — Lane T (the approved top-bar merge + the rest)
`earth/t-state` was never created. When you're ready, run Agent 5 from `EARTH-AGENT-COMMANDS.md` (T5 is already scoped to the top-bar merge only; `earth+` stays put). It also delivers the score-history panel wiring and the URL breadcrumbs that turn Lane S's "Browse in Data View" into a real deep-link. It needs the T2 default confirmed (mode re-lenses the score, doesn't auto-select overlays). Consolidate + wf80 it the same way afterward.
