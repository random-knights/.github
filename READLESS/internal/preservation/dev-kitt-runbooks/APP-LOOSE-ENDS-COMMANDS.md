# App loose-ends — parallel agent commands (test page + agents)

Three file-disjoint lanes → three fresh agents in parallel. **Global guardrails (all lanes):** output/formatting + gating only. Do NOT touch prod-deploy automation, governance catalogs, or secrets. Branch off `origin/main`, `flutter analyze` + tests green, rebase-before-merge, push your branch, do NOT deploy.

```powershell
cd C:\Projects\dev-kitt\apps\rand0m
git fetch origin
git worktree add -b app/u-testpage    ../../worktrees/rand0m-u-testpage    origin/main
git worktree add -b app/v-agents       ../../worktrees/rand0m-v-agents       origin/main
git worktree add -b app/x-core-polish  ../../worktrees/rand0m-x-corepolish   origin/main
```

---

## Agent U — Test page (`/uti1ity`) UX + palette + un-gate + overflow
```
Work ONLY in worktrees/rand0m-u-testpage (branch app/u-testpage, off origin/main). Output/formatting + gating only; do not touch deploy automation, governance catalogs, or secrets.
Files you own: lib/pages/agents/secret.dart, lib/pages/agents/secret/secret_recording_panels.dart, lib/pages/agents/secret/secret_result_panels.dart, lib/pages/agents/secret/secret_public_panels.dart, lib/widgets/agents/test_console.dart, lib/services/account/entitlement.dart (the TestFeature gate only).

1. REGROUP — Record/Playback + Bookmarklet feed the Live Test Console via the shared `_recorderSession` (secret.dart:89 → TestConsoleView.session at ~:271). Move the "Record & Playback / Bookmarklet" HeightMatchedSplit (currently ~secret.dart:298) to sit IMMEDIATELY adjacent to the console (console is the hub at ~:270): console + its two producers in one visual group, before the unrelated analyzer-output/validator sections. Keep the HeightMatchedSplit responsive pattern.

2. PALETTE — unify everything hooked into the console on AppColors.purp (match Test Creator). Today: console controls = AppColors.neon + gold (test_console.dart ~:356,:765), Record/Playback + Bookmarklet = AppColors.peach (secret_recording_panels.dart :70-192,:425-443), Recording-Export = AppColors.blueLight (:248-296). Repoint all of those PRIMARY action buttons + section accents to AppColors.purp. KEEP genuine semantic colors (destructive Stop/Clear = red, success/live = green) — only the brand/primary accents become purple. If the Web Analyzer still uses AppColors.kitt (secret_result_panels.dart:148), align it to purp too for one cohesive page.

3. UN-GATE SUBMIT — let ALL users submit a bug/feature; keep "save to your own repo" Pro. In secret_public_panels.dart the form is gated by `_entitlement.can(TestFeature.submitIssue)` (:146) → flip so submitIssue is allowed for every authenticated user (the page is already access-allowlisted), rendering the full form (not the upsell). LEAVE TestFeature.saveToOwnRepo gated (:20) — that stays the future Pro feature. Adjust entitlement.dart so TestFeature.submitIssue resolves true on the free tier; confirm the submit path actually posts for a free user (no Pro-only backend block).

4. OVERFLOW — convert these Row()s (no wrap) to Wrap/responsive so buttons never overflow on narrow: Analyzer "Analyze Webpage/Website" (secret_result_panels.dart:145), Test Creator "Upload File/Clear" (:295), and the console agent-picker + Send row (test_console.dart:351). The other button groups already use Wrap — match their pattern (SizedBox widths + Wrap spacing).

flutter analyze + the secret/test_console widget tests green. Commit per concern; report; rebase before merge. Do NOT deploy.
```

---

## Agent V — Agent Core/System tiers + Pro-gated custom commands
```
Work ONLY in worktrees/rand0m-v-agents (branch app/v-agents, off origin/main). Gating + categorization only; do NOT touch prod-deploy automation, governance catalogs, or secrets. Build commands behind the EXISTING command_policy gates per the ECOSYSTEM-AUTOMATION spec — no new execution surface beyond preview→confirm→execute, allowlisted.
Files: packages/rk_agents/lib/src/definition.dart, apps/rand0m/lib/services/agents/roster_order.dart, apps/rand0m/lib/pages/agents/agents.dart, apps/rand0m/lib/services/agents/visibility_filters.dart, apps/rand0m/lib/services/agents/command_policy.dart, command_execution.dart, packages/rk_agents/lib/src/action_registry.dart, apps/rand0m/lib/services/account/entitlement.dart.

1. TIERS — add `AgentTierKind { core, system, standard }` to AgentMetadata (definition.dart ~:145) and assign: CORE = dai1y, knight1y, rand0m; SYSTEM = aut0mate, deve10per, eng1neer, temp1ate, va1idat0r, scient1st; STANDARD = all others. Add coreAgentNames / systemAgentNames getters (analog to the existing systemAgentNames ~:590). Update roster_order.dart to group into 3 (core/system/normal), agents.dart to render 3 sections, and visibility_filters.dart so Core always shows and System follows the existing system rules.

2. PRO-GATED CUSTOM COMMANDS — "Agents Pro = custom action commands only." The actionable agents' actions (temp1ate/va1idat0r/eng1neer in action_registry.dart, plus deve10per/scient1st/aut0mate as System) are PREVIEW-ONLY today (command_policy.dart:193-196 "No executable policy is registered"; executable set at :132-136). Wire executionAllowed so a SYSTEM-tier agent's custom action becomes execute-capable (preview→confirm→execute, allowlisted) ONLY when the user holds Agents Pro. Add an entitlement feature (e.g. AgentFeature.customActionCommands) in entitlement.dart mapped to the Pro tier; non-Pro users keep preview (no execution). Do not change WHAT the actions do — only the gate.

flutter analyze + agent/command_policy tests green; add tests for tier assignment + the Pro/non-Pro execution gate. Commit per concern; report; rebase before merge. Do NOT deploy.
```

---

## Agent X — Core response beautification (daily/knight1y briefing cards)
```
Work ONLY in worktrees/rand0m-x-corepolish (branch app/x-core-polish, off origin/main). OUTPUT/FORMATTING ONLY — render the agent's existing response richly; do NOT add live data pipelines, deploy automation, governance, or secrets.
Files: lib/widgets/agents/response.dart (today a single uniform markdown sheet, :15-210), + a new model lib/models/agents/core_briefing_card.dart (+ its test).

Deliver a highly-formatted briefing CARD SCHEMA for CORE agents (dai1y, knight1y, rand0m — key off the agent name now so this is independent of Agent V's tier field; switch to the tier once V lands). Card sections: facts · jokes · reminders · priorities · news (with thumbnail slots) · stocks · products · planning prompts. Define CoreBriefingCard to parse those sections from the Core agent's response (structured block if present, else section headings in its markdown). In response.dart, when the responder is a Core agent AND a briefing parses, render the polished card; otherwise FALL BACK to the existing markdown renderer (never blank, never fabricate — thumbnails/stocks/products render only from data the agent actually returned). Keep the AIEDS disclosure card behavior unchanged.

flutter analyze + a response.dart widget test (Core agent → card; non-Core or unstructured → markdown fallback). Commit; report; rebase before merge. Do NOT deploy.
```

---

## Parallel-safety notes
- U / V / X are file-disjoint (test-page panels · agent package+services · response.dart+new model) → run all three at once.
- `scient1st` appears in BOTH Agent V (global registry → System tier + Pro commands) and Earth Lane T6 (the globe's `earth_query_engine`/`earth_agent_context` grounding). Different files, no conflict — but if both run, merge V before re-validating T so the System-tier expectation is consistent.
- None of these touch Earth's `earth_tab`/shell/JS renderers, so they're also safe to run alongside Earth Lane T.
