# 0005 — Hosting cache-control headers for Flutter web

Date: 2026-06-11
Status: Accepted

## Context

rand0m.ai is a Flutter web app on Firebase Hosting. After a production deploy on
2026-06-11, the live site rendered a broken/old app for an authenticated user —
missing bottom nav, drawer, and the new Earth Data View — even though the build
was correct and current (verified by probing deployed static files: the new
`0rac1e.png` asset was served; the deleted `_base.png` correctly fell through to
the SPA rewrite).

Root cause: `index.html` and `flutter_service_worker.js` were served with
`Cache-Control: max-age=3600`. Browsers therefore held a stale Flutter service
worker for up to an hour after each deploy and ran an old/mismatched app. This is
a well-known Flutter-web-on-Firebase pitfall.

## Decision

Serve the bootstrap/entry files with no-cache so deploys take effect immediately:

- `index.html`, `flutter_service_worker.js`, `flutter_bootstrap.js`, and
  `version.json` → `Cache-Control: no-cache, no-store, must-revalidate`.
- Content-hashed assets (everything else) keep their long cache for performance.

Implemented as a `headers` block in:

- the Production Release (`90-production-release.yml`) generated `firebase.json`
  (the authoritative production deploy path), and
- the committed `firebase.json` files (root `dev-kitt` and `apps/rand0m`) for any
  local/manual deploy path.

This is now a required hosting standard (see CODEX.md → Deployment Rules →
"Hosting cache policy").

## Consequences

- New deploys propagate to clients on next load — no stale-shell window.
- A client that already cached the old worker (from before this change) must
  clear once: incognito, or DevTools → Application → Service Workers → Unregister
  / Clear site data, then reload. Future deploys are automatic.
- Slightly more revalidation traffic for the few no-cache entry files; negligible.

## Alternatives considered

- Rely on the service worker's own update cycle — rejected; the SW file itself
  was cached, so it could not update promptly.
- Roll back the release — rejected; the build was correct, so rollback would have
  lost real fixes without addressing the caching root cause.
