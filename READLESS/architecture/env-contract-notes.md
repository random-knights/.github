# Environment Variable Contract Notes

Date: 2026-06-12 (created session 28)
Author: Docs agent (from Earth agent exemplary Cesium slice 2 gate)
Scope: runtime environment variables consumed by rand0m apps/rand0m

---

## Pattern: Env-Injected Third-Party API Tokens

Third-party API tokens follow the **env-injection pattern** established by the
weather provider integration. All tokens are:

1. Stored in the root `.env` file (gitignored, owner-managed).
2. Named `RANDOM_<SERVICE>_<KIND>` for app-consumed tokens.
3. Injected at build time — not stored in source code or committed files.
4. Never hardcoded in any Dart file, Firebase config, or CI workflow.

---

## Registered Tokens

| Variable | Service | Kind | Status | Notes |
| --- | --- | --- | --- | --- |
| `RANDOM_CESIUM_ION_TOKEN` | Cesium Ion | Access token | **⚠ UNSET — owner action required** | Domain-restricted scoped token. R9 nullschool deliverable falls back to CustomPainter until this is set. Second request logged (sessions 27–28). |
| *(weather token)* | Weather provider | API key | Set | Established the env-injection pattern; Cesium mirrors this. |

---

## KNIGHTS_CESIUM_ION_API_KEY — Reserved Fallback

`KNIGHTS_CESIUM_ION_API_KEY` is a **reserved fallback identifier** introduced
in Cesium slice 2 (`earth/cesium-slice-2`). It mirrors the weather provider
pattern:

- If `RANDOM_CESIUM_ION_TOKEN` is set in `.env`, it is used.
- If not set (e.g., in CI, local dev without token, or before owner action),
  the runtime falls back to `KNIGHTS_CESIUM_ION_API_KEY` as a named placeholder
  that produces a graceful CustomPainter globe fallback — not a crash.
- This keeps CI green and the app functional without the live Cesium token.
- Do not substitute a real Ion token under `KNIGHTS_CESIUM_ION_API_KEY` — it
  is a fallback identifier, not a second token slot.

**Owner action:** set `RANDOM_CESIUM_ION_TOKEN` (domain-restricted, scoped
Ion token) in root `.env` to enable the live Cesium nullschool globe in R9.

---

## Adding New Tokens

1. Name the variable `RANDOM_<SERVICE>_<KIND>` (all caps, underscores).
2. Add a row to the Registered Tokens table above.
3. Implement a named fallback identifier (e.g., `KNIGHTS_<SERVICE>_<KIND>`)
   that produces a graceful degraded state — not a crash — when the token
   is absent.
4. Emit a `DOCS:` callout so this file is updated before the slice merges.
5. Never commit a real token value. Owner adds it to root `.env` manually.
