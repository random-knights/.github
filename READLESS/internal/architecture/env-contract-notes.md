# Environment Variable Contract Notes

Date: 2026-06-12 (created session 28; updated sessions 30, 32)
Author: Docs agent (from Earth agent exemplary Cesium slice 2 gate)
Scope: runtime environment variables consumed by rand0m apps/rand0m

---

## Pattern: Env-Injected Third-Party API Tokens

Third-party API tokens follow the **env-injection pattern** established by the
weather provider integration. All tokens are:

1. Stored in the root `.env` file (gitignored, owner-managed) **and** as a **GitHub Actions secret** for production CI builds.
2. Named `RANDOM_<SERVICE>_<KIND>` for app-consumed tokens.
3. Injected at build time — not stored in source code or committed files.
4. Never hardcoded in any Dart file, Firebase config, or CI workflow.

> **Note (session 30):** Production CI (GitHub Actions) does **not** read the local root `.env` file. A token set only in `.env` will work in local dev builds but will fall back to the graceful degradation path in every release build. Tokens required at production release time must be added as GitHub Actions secrets in addition to root `.env`.

---

## Registered Tokens

| Variable | Service | Kind | Status | Notes |
| --- | --- | --- | --- | --- |
| `RANDOM_CESIUM_ION_API_KEY` | Cesium Ion | API key | ✓ **SET** (session 32) | Domain-restricted scoped token. Set in root `.env` AND as GitHub Actions secret. Live at R9 (`d5ba6c1`). **Note:** originally specified as `RANDOM_CESIUM_ION_TOKEN` in sessions 27–30; deployed variable name is `RANDOM_CESIUM_ION_API_KEY` (API key naming convention). |
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

~~**Owner action (RESOLVED session 32):**~~ `RANDOM_CESIUM_ION_API_KEY` has been set in both root `.env`
and as a GitHub Actions secret. Cesium V2.16 live at R9 (`d5ba6c1`). No further action required.
Pattern confirmed: production release builds require the GitHub Actions secret in addition to root `.env`.

---

## Adding New Tokens

1. Name the variable `RANDOM_<SERVICE>_<KIND>` (all caps, underscores).
2. Add a row to the Registered Tokens table above.
3. Implement a named fallback identifier (e.g., `KNIGHTS_<SERVICE>_<KIND>`)
   that produces a graceful degraded state — not a crash — when the token
   is absent.
4. Emit a `DOCS:` callout so this file is updated before the slice merges.
5. Never commit a real token value. Owner adds it to root `.env` manually.
6. If the token is required for a production release build: add it as a
   **GitHub Actions secret** in addition to root `.env`. Document this
   requirement in the table row's Notes column.
