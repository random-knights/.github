# Env Contract — key-NAME structure (placeholders only)

**Provenance:** key NAMES derived from the tracked, value-less
`C:\Projects\dev-kitt\.env.example` (the real `C:\Projects\dev-kitt\.env` is
gitignored and was **never read**). **No secret values appear here or anywhere in
this repo.** This file exists so the env *contract* (which keys must exist, in
which namespace) survives a disk loss of the local-only dev-kitt root.

Backed up: 2026-06-25.

## Contract rules (from CODEX.md / RUNBOOK.md)
- Canonical env file: `C:\Projects\dev-kitt\.env` (local-only, gitignored).
- `RANDOM_*` keys are **active** for rand0m.
- `KNIGHTS_*` keys are **reserved** — must never be removed, renamed, duplicated,
  or relocated.
- Weather uses `RANDOM_WEATHER_API_KEY` first; `KNIGHTS_WEATHER_API_KEY` is a
  reserved fallback only when the RANDOM key is missing/placeholder-like.
- Do not introduce `WEATHER_API_KEY` or app-specific weather key names.
- New provider keys do not go directly into Flutter web — use a Firebase callable
  proxy or server-side boundary.
- Firebase Functions read their own key set from `apps/rand0m/functions/.env`
  (also gitignored); same `RANDOM_*` provider/PageSpeed/FIRMS/weather names.

## RANDOM_* (active)
```
RANDOM_OPENAI_API_KEY=<placeholder>
RANDOM_GOOGLEAI_API_KEY=<placeholder>
RANDOM_GOOGLE_PAGESPEED_API_KEY=<placeholder>
RANDOM_WEATHER_API_KEY=<placeholder>
RANDOM_CLAUDEAI_API_KEY=<placeholder>
RANDOM_GROKAI_API_KEY=<placeholder>
RANDOM_CESIUM_ION_API_KEY=<placeholder>
RANDOM_VESSEL_FINDER_API_KEY=<placeholder>
RANDOM_NASA_FIRMS_API_KEY=<placeholder>
RANDOM_NASA_EDL_API_KEY=<placeholder>
RANDOM_CAMS_ADS_KEY=<placeholder>
RANDOM_CMEMS_USERNAME=<placeholder>
RANDOM_CMEMS_PASSWORD=<placeholder>
RANDOM_OPENSKY_API_KEY=<placeholder>
RANDOM_GFW_API_KEY=<placeholder>
```

## KNIGHTS_* (reserved — do not remove/rename/relocate)
```
KNIGHTS_OPENAI_API_KEY=<placeholder>
KNIGHTS_GOOGLEAI_API_KEY=<placeholder>
KNIGHTS_GOOGLE_PAGESPEED_API_KEY=<placeholder>
KNIGHTS_WEATHER_API_KEY=<placeholder>
KNIGHTS_CLAUDEAI_API_KEY=<placeholder>
KNIGHTS_GROKAI_API_KEY=<placeholder>
KNIGHTS_CESIUM_ION_API_KEY=<placeholder>
KNIGHTS_VESSEL_FINDER_API_KEY=<placeholder>
KNIGHTS_NASA_FIRMS_API_KEY=<placeholder>
KNIGHTS_NASA_EDL_API_KEY=<placeholder>
KNIGHTS_CAMS_ADS_KEY=<placeholder>
KNIGHTS_CMES_USERNAME=<placeholder>
KNIGHTS_CMEMS_PASSWORD=<placeholder>
KNIGHTS_OPENSKY_API_KEY=<placeholder>
KNIGHTS_GFW_API_KEY=<placeholder>
```

> Note (verbatim from source): the reserved namespace has a likely typo
> `KNIGHTS_CMES_USERNAME` (vs the active `RANDOM_CMEMS_USERNAME`). Preserved
> as-is — do not "fix" the reserved key name without owner approval, since the
> contract rule forbids renaming reserved keys.

## Relay / CI secrets (GitHub Actions secret NAMES, not env file)
`FIREBASE_SERVICE_ACCOUNT_RANDOMKNIGHTS_XYZ`, `RK_PACKAGE_READ_SSH_KEY`,
`OPENSKY_CLIENT_ID`, `OPENSKY_CLIENT_SECRET`, `RANDOM_GFW_API_KEY`
(+ `KNIGHTS_GFW_API_KEY` fallback). Stored as Actions secrets in
`random-knights/xyz`; never as local identities or committed values.
