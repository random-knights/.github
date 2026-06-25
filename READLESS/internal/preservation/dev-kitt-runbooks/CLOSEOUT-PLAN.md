# Close-out & cleanup plan (execute at LOCKDOWN — keep until done)

Run only after all feature lanes have merged + shipped (score, data, visual, appinfo, + the API/About-already-folded-into-appinfo). Until then, do not touch app code/docs — it collides with the running lanes. Score+data specifics live in `EARTH-DATA-SCORE-RUNBOOK.md`.

## Repo public/private (org: random-knights)
PUBLIC (community): **xyz-earth** (discussions — Earth Score / AIEDS), **abc** (community learning — lessons & exercises), **123** (bug/feature requests — the Test-page submit + earth+ bug icon target `github.com/random-knights/123/issues`). Optional: **.github** (org profile).
PRIVATE: **xyz** (app), **rk_agents / rk_ui / rk_core / rk_ai / rk_media / rk_data / rk_branding**.

Owner runs the flips AFTER the code-cleanup secret scan clears each soon-public repo:
```powershell
gh repo edit random-knights/xyz-earth --description "Open research & community discussions for the rand0m Earth Health Score & AIEDS" --visibility public --accept-visibility-change-consequences
gh repo edit random-knights/abc --description "rand0m community learning — practical lessons & exercises" --visibility public --accept-visibility-change-consequences
gh repo edit random-knights/123 --description "Bug reports & feature requests for rand0m (submitted from the Test page)" --visibility public --accept-visibility-change-consequences
gh repo archive ... # NONE — abc/123 are primary public repos, do NOT archive
```

## ① Docs / close-out agent (gh + git; docs/READMEs/repo-metadata only; no app code, no visibility flips)
1. TIMELINE.md (root of xyz): 26-day achievement narrative from `git log --oneline --all` + the planning docs in tooling/scripts (read BEFORE pruning) — Cesium→2D, nullschool parity, score v0.2→v0.5, the live-data + rk_ ecosystem, with key SHAs/dates.
2. Prune planning docs: after TIMELINE captures them, delete the throwaway command packs in tooling/scripts; KEEP EARTH-DATA-SCORE-RUNBOOK.md, this file (until executed), earth-ops.ps1/.bat, the freshness skill, and anything imperative for app/dev/ops/community.
3. README sweep: add/refresh README + description for xyz, the rk_ packages (purpose/version/API), rk_branding, PLUS the 3 public repos — xyz-earth (contribute/links), abc (lessons & exercises index), 123 (Bug + Feature issue templates + a "how to submit" README). Confirm Test-page submit + earth+ bug icon → github.com/random-knights/123/issues.
4. Ref + agent docs: refresh methodology / source-catalog / AIEDS + agent/onboarding docs to shipped Earth (v0.5 score, new layers/sources, free-now/Pro-later). Ensure Discussion #1 = Earth Health Score and the AIEDS whitepaper are posted/current in xyz-earth.
5. Licenses/credits: one consolidated attribution doc (OpenSky ODbL/non-commercial, CelesTrak, aisstream, all CC-BY sources).
6. CHANGELOG.md + prod release notes.

## ② Code-cleanup agent (git root apps/rand0m; clean WITHOUT behavior or version/dependency changes — app must render identically)
Branch: `chore/lockdown-cleanup` off origin/main.
1. Dead code/files: unused imports, dead functions, orphaned files, scratch (earth2d-handoff/, retired-layer code, unused assets incl. the broken About video if unfixed). Find via flutter analyze + `dart fix --dry-run`; remove only genuinely-unreferenced.
2. Dependency + asset prune: `flutter pub outdated` REPORT only; remove only zero-reference pubspec assets.
3. Workflows: consolidate/simplify .github workflows (80/90/01) only where redundant — behavior unchanged.
4. Tests: fix or quarantine the version_check_test network flake; drop dup/obsolete tests; do NOT reduce real coverage; full suite green.
5. Secrets/.env audit: confirm NO keys/credentials.json/.env committed anywhere — scan xyz-earth, abc, AND 123 before they go public; .gitignore covers secrets; flag any secret in history (no history rewrite without owner).
6. Freshness monitor: fold new live cadences (flights ~10min, boats ~few min, satellites daily TLE) into the 8:08 monitor.
7. Worktree prune: remove merged feature-lane worktrees.
GATE: flutter analyze clean, full suite green, on-device smoke = identical rendering. Deploy staging smoke, owner review, prod only on go.

## Sequencing
All 5 feature lanes land → run ① + ② together (disjoint: docs/repo vs app-code) → owner flips xyz-earth/abc/123 public once ②'s secret scan clears → final prod.
