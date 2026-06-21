# Community Contributions + Pro Test Submit — Architecture Note

**Date:** 2026-06-19 (session 49)
**Status:** ON BRANCH — not yet merged; owner GitHub App setup pending
**Owner:** Earth agent (implementation); Fable (gate); Docs (this record)

---

## Two-Channel Submit Model

The app exposes two distinct submission channels, both routed server-side with enforced target enforcement:

| Channel | Surface | Target | Moderation |
| --- | --- | --- | --- |
| **Community contributions** | GitHub Discussions (public) | `random-knights/xyz` Discussions board | Public visible; moderation Inbox for org members |
| **Pro Test submit** | In-app submit (Pro subscribers only) | Private `random-knights/xyz` issue or internal tracker | Owner / org moderation Inbox; not public |

---

## Architecture

### Server-side target enforcement (binding)

The submit callable (`submitCommunityPost` or equivalent) enforces the target repository and channel type **server-side** — the client cannot override the destination. This is a security requirement: a client-controlled target would allow users to submit to arbitrary GitHub resources.

- Channel type (Discussions vs issue) is determined by the caller's entitlement (Pro = private issue; non-Pro = Discussions).
- The GitHub App callable (`githubProxy` — T7, live at `b7f9849`) already provides the authenticated GitHub App channel. The two-channel submit builds on top of it, adding a routing layer for target enforcement.

### Moderation Inbox

- GitHub Discussions posts are visible immediately but the org moderation Inbox surfaces flagged/new items for triage.
- Pro Test submits (private issues) appear in the `random-knights/xyz` issue list; owner/org members moderate via standard GitHub issue workflow.
- No anonymous submissions — both channels require a signed-in user (domain or allowlisted).

### Owner GitHub App setup (blocking)

The two-channel submit requires the GitHub App to have **Discussions write permission** on `random-knights/xyz`. This is a manual GitHub App settings change by the owner:
1. Navigate to the GitHub App settings → Permissions → Discussions → Read & Write.
2. Accept the updated permissions on `random-knights/xyz`.
3. After owner setup: branch can merge + function deploy activates the Discussions channel.

Until this is done, the Discussions channel will 401. The Pro Test (private issue) channel uses the existing GitHub App issue-write permission already granted.

---

## Status (session 49)

- Branch: not merged (Earth agent)
- Owner setup: **PENDING** (Discussions write permission on GitHub App)
- No client-visible change until branch merges + owner sets up App permissions
