# Scientist Session Continuity — Spec

Date: 2026-06-11
Branch: `earth/scientist-session-continuity`
Author: Fable agent (spec); Docs agent (persisted to READLESS)
Status: approved next Earth phase — implementation not yet started

---

## Context

`@scient1st` real Earth-context AI responses landed in `01a070a` on `main`
(`earth/scientist-live-ai-responses`). The feature wires a live AI response path
for scientist-context queries against Earth layer data. Before the next feature
layer is added, a set of continuity, safety, and cost-control concerns must be
addressed. This spec covers Phases 0–4.

---

## Invariants (apply to every phase)

- **Deterministic fallback** — every live-AI path must have a safe, non-AI
  fallback that is exercised in tests. No silent failure modes.
- **`excludesSensitiveData: true`** on every AI send — must be set and must
  never be removed without an explicit governance phase.
- **Default AI Provider proxy only** — all AI calls route through the existing
  `generateAIResponse` Firebase callable. No direct provider API calls from the
  Flutter client.
- **No persistence** — scientist responses and session state are in-memory only
  for this branch. No Firestore writes without a separate approved persistence
  phase.

---

## Phase 0 — `EarthScientistController` extraction

**Problem:** `earth_tab.dart` is at **2,387 lines** as of `01a070a`, exceeding
the CODEX 2,000-line architecture-review threshold. Scientist-response
orchestration, state management, and AI call logic are inlined in the page file.

**Work:**

1. Extract `EarthScientistController` (or `EarthScientistViewModel`) into
   `lib/pages/earth/earth_scientist_controller.dart`.
   - Owns: AI call lifecycle, request state, response text, error state,
     loading flag, and cancel/retry logic.
   - Does not own: layer selection, overlay governance, or Earth health scoring.
2. Extract `ScientistResponsePane` widget into
   `lib/widgets/earth/scientist_response_pane.dart`.
   - Renders response text, streaming state, dismiss/expand affordances.
   - Receives state from controller via callback or provider; no direct AI calls.
3. `earth_tab.dart` retains only orchestration and composition — it wires
   widgets and controller, does not implement response logic.

**Target:** `earth_tab.dart` below 1,500 lines after extraction.

---

## Phase 1 — In-flight state + request-token race safety

**Problem:** rapid layer switches or repeated taps can fire overlapping AI
requests, leading to stale responses being rendered over newer ones.

**Work:**

1. Add a request token (monotonic counter or UUID) to `EarthScientistController`.
2. On every new request, cancel any in-flight request and increment the token.
3. On response arrival, discard the response if its token does not match the
   current token.
4. Expose a `cancelRequest()` method for UI dismiss affordances.
5. Add focused tests: concurrent-request race, cancel-before-response, and
   response-arrival-after-cancel.

---

## Phase 2 — Bounded in-memory transcript (last 5 exchanges)

**Problem:** follow-up queries have no conversational context, making @scient1st
responses stateless across turns within a session.

**Work:**

1. Add a bounded transcript to `EarthScientistController`: last **5 exchanges**
   (user turn + scientist response), stored as an ordered list in memory.
2. Each exchange is **exclusion-gated** before being appended to the outgoing
   prompt — if `excludesSensitiveData` screening flags a turn, that turn is
   omitted from the digest sent to the AI (the local transcript still records
   it for display continuity, but it is not forwarded).
3. Transcript is cleared on tab close or app restart (no persistence).
4. Add focused tests: 5-exchange cap enforcement, exclusion-gate omission,
   transcript-clear on reset.

---

## Phase 3 — Cumulative AIEDS session ledger + soft budget guard

**Problem:** no visibility into per-session AI token spend; runaway loops or
repeated queries can accumulate untracked cost.

**Work:**

1. Add a cumulative AIEDS session ledger to `EarthScientistController`:
   tracks estimated token count per exchange (request + response) for the
   current app session in memory only.
2. Add a **soft per-session budget guard**: if cumulative estimated tokens
   exceed a configurable threshold (default: a reasonable AIEDS session cap,
   TBD by Earth agent based on current AIEDS contract), block further AI sends
   and surface a deterministic fallback response explaining the cap.
3. Fallback response must be non-AI, static, and clearly attributed
   ("Session context limit reached — restart the app to continue").
4. Guard threshold is a compile-time constant; it is not a user-facing setting
   and not stored in Firestore.
5. Add focused tests: under-budget send, at-budget block, fallback text
   assertion, ledger-reset on controller disposal.

---

## Phase 4 — Stale packet-line fix + prompt size cap

**Problem:** the string `"Live chat is not enabled from Earth yet"` appears as a
stale packet-line in scientist responses under some conditions, indicating a
code path that should be unreachable once `liveProviderEnabled` is `true`.

**Work:**

1. Audit all code paths that emit the stale packet-line and remove or gate them
   correctly behind `liveProviderEnabled`.
2. Add a focused test that asserts the stale string never appears in a response
   when `liveProviderEnabled` is `true`.
3. Add a **prompt size cap**: before sending any AI request, truncate or reject
   the assembled prompt if it exceeds a configurable maximum token estimate
   (default: conservative cap consistent with the AIEDS contract). Surface the
   deterministic fallback if the cap is hit.
4. Add focused tests: prompt-over-cap rejection, prompt-at-cap pass, stale
   string absence.

---

## Run Plan

| Run | Phases | Validation |
| --- | --- | --- |
| First run | 0, 1, 2 | Earth Fast Cycle (`validate-earth-fast.ps1`) |
| Second run | 3, 4 | Earth Fast Cycle; checkpoint after Phase 4 |
| Checkpoint | — | Full validation + Production Release if green |

Do not combine all phases in one run. Phase 0 must land and be green before
Phases 1–2 build on the extracted controller.

---

## Known Limitations / Pivots

- **`EarthScientistConfig.liveProviderEnabled` is compile-time.** Disabling the
  live-AI path requires a code change, rebuild, and Production Release. It is
  not a runtime toggle. Plan rollouts accordingly.
- **Live answers cost real tokens** via the Default AI Provider through the
  `generateAIResponse` Firebase callable. The Phase 3 budget guard is a soft
  guard only — it does not hard-cap Firebase Function invocations if the
  controller state is bypassed or the app is relaunched.
- **Ocean-currents catalog status intentionally remains `research`.** The live
  Data View card surfaces the layer; there is no live data feed behind it. This
  mirrors the air-quality health-neutral, card-only pattern. Do not promote
  ocean-currents to `live` in the catalog without an explicit governance phase.
- **No Cesium runtime work in this branch.** Cesium bridge is frozen at V2.16
  planning; implementation is a future phase.
