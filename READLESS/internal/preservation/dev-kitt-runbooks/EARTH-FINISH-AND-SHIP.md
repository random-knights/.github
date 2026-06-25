# EARTH — finish + ship to prod (one fresh agent runs EVERYTHING)

## Operating mode (important)
- **The agent runs ALL steps**: git, `flutter` build/run, validate, screenshot, commit, rebase, push, consolidate, and BOTH deploys (staging `wf80`, prod `wf90`). The owner runs **nothing** — they only review staging in the browser.
- **Hard gate — PROD only after the owner signs off on staging.** After each staging deploy, the agent reports with screenshots and waits; it triggers prod **only** when the owner says "go to prod" in chat. Never prod before that.
- **Verify on-device.** Render items must be proven with before/after screenshots from `flutter run -d chrome` (the lesson from the last round — unit tests alone hid broken renders).

Branch off current `main` (the consolidated build already on staging):
```powershell
cd C:\Projects\dev-kitt\apps\rand0m ; git fetch origin
git worktree add -b earth/finish ../../worktrees/rand0m-finish origin/main
```

---

## PHASE 1 — stability fixes (this is the PROD-TODAY target)
Commit each; on-device before/after screenshots for 1a/1c/1d and a score-behavior capture for 1b.
- **1a Particulates + BAA alpha.** Extend FIX-1's gating so Particulates (PM2.5) shows land/ocean/borders through it like SST/Human-Encroachment (it currently blankets); tighten BAA. `web/earth_scalar_field.js`, `web/earth2d_scalar.js` + golden test.
- **1b Score responsiveness.** Restore **Mode → re-lens the score**; keep overlay/annotation *viewing* decoupled (FIX-5's good part); **remove Mode → auto-select-overlay**. Region already works (verified R 67→86) — don't touch it. `lib/pages/earth/earth_tab.dart`.
- **1c Test-page buttons fit ONE line.** Use Flexible/Expanded + shrink/ellipsis (or icon-only when narrow) so Analyzer / Test-Creator / console rows stay single-line — not Wrap-to-two-lines. `secret_result_panels.dart`, `widgets/agents/test_console.dart`.
- **1d FIX-2 data-less globe.** On mount, About→XYZ, reload, AND 2D↔3D, re-apply the active overlay/animation/annotation frames so the renderer matches the chips. `earth_visualization_stage.dart`, `earth2d_globe_view.dart`, `earth_tab` restoration. (Full diagnosis: `EARTH-FIX2-ONDEVICE.md`.)

Then: `flutter analyze` + tests green → rebase onto `origin/main` → ff-merge → push → **deploy staging:** `gh workflow run "80-test-deploy-smoke.yml" --ref main`. Report to the owner with the Phase-1 screenshots.

### ▶ CHECKPOINT A — owner reviews staging
On the owner's "go to prod" → agent runs the prod release: `gh workflow run "90-production-release.yml" --ref main`. (If prod has an environment-approval gate, that one click is the owner's only prod action.) **Prod parity check first:** confirm the prod project's score doc is methodology 0.4 / ocean>0 (`https://<prod-host>/earth/score/health-score.json`); if it's behind, deploy the score/aragonite functions name-scoped to the prod project before/with the release, or flag the owner that prod score lags. **This Phase-1 release is the stable prod version for today.**

---

## PHASE 2 — Earth UI refresh (Lane T) — included per owner
Do after Phase 1 is pushed. Commit each; screenshots for UI items, tests for logic. (Details: `EARTH-NEXT-COMMANDS.md` Lane T.)
- **2a Top-bar merge (approved):** Globe/Data toggle + "Ask @scient1st" on ONE row. `earth_workstation_shell.dart`. (Do NOT move `earth+` or other panels — still held.)
- **2b Active chips, 3 rows:** region+2D/3D · mode · active overlay·animation·annotation; drop the duplicate time row. `earth_nullschool_chrome.dart` + shell + thread `selectedMode`.
- **2c URL active-filter breadcrumbs:** serialize region/mode/layers/projection/2D-3D/time to the hash; read on load, `replaceState` on change; expose the snapshot deep-link. `services/navigation/` + `earth_tab`.
- **2d Score-history UI:** thread `EarthHealthScoreHistory` + its source into `earth_summary_panel` — past time windows show the historical number + "building history".
- **2e @scient1st grounding:** dataset-intent routing (emitters→Climate-TRACE Top Emitters, offsets→VCM, species/datacenters/protected each their own); ground from the matched dataset; name the source; never answer emissions from offsets. `earth_query_engine.dart`, `earth_agent_context.dart` + tests.

Then: validate → rebase → ff-merge → push → **deploy staging** (`80-test-deploy-smoke.yml`). Report to the owner.

### ▶ CHECKPOINT B — owner reviews staging
On the owner's "go to prod" → `gh workflow run "90-production-release.yml" --ref main`. If Phase 2 isn't solid by end of day, it stays on staging and only Phase 1 is in prod — that's fine; Phase 1 is the stable target.

---

## Guardrails (every phase)
Render/output/logic only — no governance catalogs, no secrets, no scoring-formula changes beyond 1b's re-lens wiring. `flutter analyze` + tests green before every merge. Rebase-before-merge. **No prod deploy without the owner's staging sign-off.** Report blockers instead of guessing.
```
Paste to the fresh agent: "Run tooling/scripts/EARTH-FINISH-AND-SHIP.md end-to-end — you execute all git/build/validate/screenshot/commit/push/deploy steps; the owner only reviews staging. Do Phase 1, deploy to staging, and STOP at Checkpoint A for the owner's prod sign-off; then Phase 2 → staging → Checkpoint B. On-device before/after screenshots for every render/UI item. Never deploy prod without the owner's go."
```
