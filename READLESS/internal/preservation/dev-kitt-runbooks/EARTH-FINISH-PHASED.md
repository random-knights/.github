# EARTH — finish, phased (single fresh agent, on-device)

From a live staging review (consolidated build). One agent, branch off current `main`, **on-device** (`flutter run -d chrome` — render items need before/after screenshots, the lesson from last time). Commit per item; rebase before merge; do NOT deploy. Absorbs the leftover FIX-1 (Particulates/BAA), FIX-2 (`EARTH-FIX2-ONDEVICE.md`), and Lane T (`EARTH-NEXT-COMMANDS.md`).

## What the live review confirmed
- ✅ Fixed: clustering reverted to clean dots; cluster snapshot lists members; SST + Human-Encroachment overlays show geography; score responds to **region** (saw R 67→86 on Africa); ocean=80 / methodology 0.4 live; 3D lazy-loads.
- ❌ Left: Particulates (PM2.5) still blankets; BAA improved but not great; **Mode doesn't move the score** (held at R86 across a mode change) and Mode still auto-selects an overlay; test-page buttons wrap to 2 lines instead of fitting 1; data-less globe on load/nav/2D↔3D (FIX-2); and the whole Earth-UI refresh (Lane T) never ran.

---

## PHASE 1 — correctness + render fixes (do first; STOP for owner staging review before Phase 2)

- **1a — Particulates + BAA alpha.** Extend FIX-1's data-driven gating: Particulates (PM2.5) must show land/ocean/borders through it like SST/Human-Encroachment do (it currently blankets); tighten BAA so it reads cleanly (sparse-alert: transparent off-alert, crisp at alerts). Files: `web/earth_scalar_field.js`, `web/earth2d_scalar.js` + golden test. **VERIFY:** screenshot Particulates + BAA — geography visible.
- **1b — Score responsiveness (fix FIX-5's over-correction).** Restore **Mode → re-lens the score** (the user's intent); keep overlay/annotation *viewing* decoupled from the score (FIX-5's good part); and **remove Mode → auto-select-overlay** (mode must not paint an overlay — user picks overlays manually). Region already works — don't touch it. File: `lib/pages/earth/earth_tab.dart`. **VERIFY:** changing Mode moves the ring; cycling overlays does not; selecting a Mode does not auto-light an overlay.
- **1c — Test-page buttons fit ONE line.** Wrap made them wrap to a 2nd line; the ask is they *fit on one line*. Use Flexible/Expanded + ellipsis/shrink (or icon-only on narrow) so the Analyzer (Webpage/Website), Test-Creator (Upload/Clear), and console (picker+Send) rows stay single-line down to the panel's min width. Files: `secret_result_panels.dart`, `widgets/agents/test_console.dart`. **VERIFY:** screenshot at narrow width — one line.
- **1d — FIX-2 data-less globe.** Per `EARTH-FIX2-ONDEVICE.md`: on mount, About→XYZ nav, reload, AND 2D↔3D switch, re-apply the active overlay/animation/annotation frames so the renderer always matches the active-filter chips (today the chip says "Bleaching Alert Area" but nothing paints on load). Files: `earth_visualization_stage.dart`, `earth2d_globe_view.dart`, `earth_tab` restoration. **VERIFY (mandatory):** before/after screenshots for reload, About→XYZ, 2D→3D.

**CHECKPOINT:** push Phase 1; owner consolidates → wf80 → device-review; I re-sweep. Only then Phase 2 (keeps the verify loop tight).

---

## PHASE 2 — Earth UI refresh (Lane T; details in `EARTH-NEXT-COMMANDS.md`)

- **2a — Top-bar merge (owner-approved).** Globe/Data segmented toggle + the "Ask @scient1st" field on ONE row. `earth_workstation_shell.dart`. (Do NOT collapse `earth+` or move other panels — that's still held.)
- **2b — Active chips, 3 rows.** Row1 region + 2D/3D; Row2 mode; Row3 active overlay·animation·annotation (only the ones ON) — today it shows just one layer. Drop the duplicate time row. `earth_nullschool_chrome.dart` + shell + thread `selectedMode` from `earth_tab`.
- **2c — URL active-filter breadcrumbs.** Serialize region/mode/layers/projection/2D-3D/time to the hash (nullschool-style), read on load, `replaceState` on change; expose the deep-link the snapshot's "Browse in Data View" uses. `services/navigation/` + `earth_tab`.
- **2d — Score-history UI wiring.** Thread `LiveStorageHealthScoreHistorySource` + `EarthHealthScoreHistory` (already on main) into `earth_summary_panel` so past time windows show the historical number + "building history" label. (This is the time-window half of "make the score respond.")
- **2e — @scient1st grounding accuracy.** Dataset-intent routing: emitters→Climate-TRACE Top Emitters, offsets→VCM, species/datacenters/protected each to their own; ground from the matched dataset; name the source; never answer emissions from offset data. `earth_query_engine.dart`, `earth_agent_context.dart` + tests.

**MERGE GATE:** `flutter analyze` + tests green for every item; on-device before/after screenshots for all render/UI items (1a,1c,1d,2a,2b); the score-behavior screenshots for 1b; query-engine tests for 2e. Rebase before merge; do NOT deploy.

---

## Launch
```powershell
cd C:\Projects\dev-kitt\apps\rand0m
git fetch origin
git worktree add -b earth/finish ../../worktrees/rand0m-finish origin/main   # after consolidate-all is on main
```
Paste to one fresh agent: "Work ONLY in worktrees/rand0m-finish (off origin/main). Full spec: tooling/scripts/EARTH-FINISH-PHASED.md. Do PHASE 1 (1a–1d) first, commit each, `flutter run -d chrome` and attach before/after screenshots for 1a/1c/1d and the score-behavior proof for 1b, then STOP and report for owner staging review before Phase 2. Render/output/logic only — no deploy automation, governance, secrets. Rebase before merge; do NOT deploy."
