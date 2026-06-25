# Consolidate all branches → main → staging (one runbook) — v2

What changed since v1: Earth landed **4 of 5** fixes (FIX-2 deferred); Lane V spans **two repos** and needs an `rk_agents` tag pushed first; and V shifts the meaning of `systemAgents`, which changes the test-console picker (one decision).

| Branch | Lands | Touches |
| --- | --- | --- |
| `earth/fix-pass` | Earth FIX-1 (`e02dae4`), FIX-3 (`ea2420a`), FIX-4 (`84bef71`), FIX-5 (`1e77901`). **FIX-2 deferred.** | `web/earth_*scalar*.js`, `web/earth_point_field.js`, `web/earth2d_*.js`, `earth_layer_snapshot_card_view.dart`, `pages/earth/earth_tab.dart` |
| `app/x-core-polish` | Core briefing cards (`7732a7d`) | `widgets/agents/response.dart`, `models/agents/core_briefing_card.dart` |
| `app/u-testpage` | test-page regroup/palette/un-gate/overflow | `pages/agents/secret*.dart`, `widgets/agents/test_console.dart`, **`services/account/entitlement.dart`** |
| `app/v-agents` (+ `rk_agents@feature/agent-tier-kind` `73939a5`) | Core/System tiers + Pro gate (`b3af48f`, `7847fb1`) | `rk_agents/definition.dart`; `services/agents/{roster_order,visibility_filters,settings}.dart`, `pages/agents/agents.dart`, `command_policy.dart`, `command_preview.dart`, **`services/account/entitlement.dart`**, `pubspec` pin v0.1.0→v0.1.1 |

## Coordination points (now four)
1. **`rk_agents` pin (NEW, hard prereq).** V bumps the xyz pin to `rk_agents v0.1.1`. The tag must exist/be pushed **before V merges** or `flutter pub get`/CI can't resolve it. → Phase 0.
2. **`entitlement.dart` + `test/entitlement_test.dart` (U + V).** U sets `submitIssue`→free (+ tests); V adds `AgentFeature.customActionCommands` Pro+ (+ tests). BOTH files overlap and BOTH resolve keep-both (source and its test). Merge **U before V**; after resolving, run `entitlement_test.dart` and confirm U's and V's cases all pass.
3. **Test-console picker semantics (U × V) — DECIDED: keep the new set.** V redefines `AgentRosterOrder.systemAgents` to the 6-agent *system tier*, so `secret.dart`'s @-agent picker now lists the actionable agents (`aut0mate/deve10per/eng1neer/temp1ate/va1idat0r/scient1st`) instead of `[rand0m, dai1y, knight1y, aut0mate]`. **Leave it — that's the right roster for a test console. No `secret.dart` change.**
4. **X→tier stitch (cleaner now).** After V lands, switch `core_briefing_card.dart`'s `isCoreAgent` from hardcoded names to `rk_agents` `isCoreAgent`/`tierForName`.

Everything else is file-disjoint → conflict-free.

## Phase 0 — publish `rk_agents v0.1.1` (do FIRST)
```powershell
cd C:\Projects\dev-kitt\packages\rk_agents
git checkout feature/agent-tier-kind        # 73939a5
# merge to rk_agents main if that's your release flow, then tag to match the xyz pin:
git tag v0.1.1
git push origin feature/agent-tier-kind --tags
```
Confirm the xyz branch's `pubspec.yaml` `rk_agents` ref is `v0.1.1`. (Local pre-tag verify only: a `pubspec_overrides.yaml` with `rk_agents: {path: ../../packages/rk_agents}` — remove before merge.)

## Phase 1 — consolidation (ONE agent; do not deploy)
```
TASK (consolidate 4 branches into main, then STOP; no deploy). Run in C:\Projects\dev-kitt\apps\rand0m. PREREQ: rk_agents v0.1.1 tag is pushed (Phase 0).
0. git fetch origin --prune. For each branch report `git log --oneline origin/main..<branch>` + `git diff --name-only origin/main...<branch>`. EXPECT TWO multi-branch files, both U+V and both benign keep-both: services/account/entitlement.dart AND test/entitlement_test.dart. Flag anything OUTSIDE that pair and STOP.
1. Rebase-before-merge, in THIS order, validating each before ff-merge:
   a. earth/fix-pass   b. app/x-core-polish   c. app/u-testpage   d. app/v-agents (LAST)
   Per branch: in its worktree `git rebase origin/main`; `flutter analyze` + that lane's tests; then from main `git checkout main && git pull --ff-only && git merge --ff-only <branch>`.
2. At (d): V's pubspec moves the pin to rk_agents v0.1.1 (Phase 0 done) and replays entitlement.dart on top of U's. Resolve entitlement.dart by KEEPING BOTH (submitIssue→free AND AgentFeature.customActionCommands Pro+). Re-run entitlement + command_policy + visibility + tier tests.
3. STITCH: core_briefing_card.dart isCoreAgent → rk_agents isCoreAgent/tierForName (keep the name set only as a no-tier fallback). Run the briefing-card tests.
4. TEST-CONSOLE PICKER (LOCKED — keep new set): no secret.dart change. Verify the @-picker now lists aut0mate/deve10per/eng1neer/temp1ate/va1idat0r/scient1st.
5. Full suite on main: flutter analyze clean; flutter test all green (only the pre-existing version_check_test network flake may fail); node golden-LUT 8/8; build-health-score.mjs --check.
6. git push origin main. Report final SHA + one line per branch + the entitlement.dart resolution. DO NOT deploy.
```

## FIX-2 (Earth data-less-globe-on-entry) — NOT in this batch
The Earth agent deferred it deliberately: it's a runtime mount/state-restoration race (between `EarthFilterPrefs` and the renderer-toggle default) that can't be verified headlessly, and a blind change risks regressing a working renderer. **Expect the data-less globe on reload / About→XYZ / 2D↔3D to PERSIST after this deploy.** It's a separate on-device fix — files to look at: `earth_visualization_stage.dart`, `earth2d_globe_view.dart`, `earth_tab` `_overlayUserSet`/restoration. (I can write that on-device command next.)

## Phase 2 — Earth visual gate (device or `flutter run -d chrome`)
Confirm by screenshot: FIX-1 BAA **and** Air Quality show land/ocean/borders through them; FIX-3 clean dot markers (no blobs); FIX-4 a carbon-offset cluster lists members; FIX-5 the score ring is steady while cycling overlays. (FIX-2 still broken — don't gate on it.)

## Phase 3 — deploy to staging
```powershell
gh workflow run "Staging Deploy + Smoke" --ref main
# Functions (only if not already deployed since v0.4): fixes ocean=0 + lands aragonite
cd C:\Projects\dev-kitt\apps\rand0m\functions ; npm run build ; cd C:\Projects\dev-kitt
firebase deploy --only "functions:earthHealthScoreRefresh,functions:earthAragoniteRefresh" --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthHealthScoreRefresh-us-central1 --location us-central1 --project randomknights-xyz
gcloud scheduler jobs run firebase-schedule-earthAragoniteRefresh-us-central1   --location us-central1 --project randomknights-xyz
```

## Phase 4 — verify
```powershell
$b="https://storage.googleapis.com/randomknights-xyz.firebasestorage.app"
$s=Invoke-RestMethod "$b/earth/score/health-score.json?cb=$(Get-Random)"; "methodology $($s.meta.methodologyVersion) | ocean $((($s.global.subScores|?{$_.layerId -eq 'ocean'}).normalized))"
(Invoke-WebRequest https://randomknights-xyz.web.app -UseBasicParsing).StatusCode
```
Then ping me — I'll re-run the live sweep (overlays show geography, clusters clean, snapshot members, score steady, test page palette/regroup/submit, Core cards, 3-tier roster + Pro gate) and confirm what's fixed vs the still-open FIX-2, before your device pass.
