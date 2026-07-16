# CODEX - agent rules for the .github repo

Canonical rules live in `C:\rand0m\CODEX.md` (the working-root codex). This
file restates what an agent MUST follow here and adds the specifics. If the two
ever disagree, the working-root codex wins.

This is the ORG-LEVEL `.github` repo. It is not application code. It holds:

  profile/README.md   THE PUBLIC ORG PROFILE PAGE (github.com/random-knights)
  profile/TIMELINE.md
  READMORE/           the public-facing docs set
  assets/             shared images referenced BY OTHER REPOS via raw URLs

## EVERYTHING HERE IS PUBLIC AND HIGH-BLAST-RADIUS

This is the smallest repo with the widest reach. Three specific traps:

1. **`profile/README.md` IS the org's front page.** It renders at
   github.com/random-knights for everyone on the internet. A broken edit is not
   a broken file, it is the org's public face. Preview before you push.
2. **`assets/` is referenced by OTHER repos via raw URLs**, e.g.
   `https://github.com/random-knights/.github/raw/main/assets/ruok-earth.png`
   (used by xyz-earth, xyz-tools, and others) and the `_c1assr00m` assets used
   by `abc`. **Moving or renaming an asset here silently breaks images in other
   repos' READMEs.** Nothing will fail; the image just disappears. Grep the org
   before you move one.
3. **Nothing private, internal, or secret belongs here, ever.** No workflow here
   takes a secret and none should.

## Owner ethos

- The owner approves; agents execute end to end (implement, commit, push, PR).
  Never fake a green run.
- Credentials are owner-only. Never create, read into chat, print, or commit a
  secret.
- Reversible cleanup: park or quarantine, never hard-delete.
- ASCII, no em dashes, in committed text.
- Repo changes ship via PR. The default branch is protected by the org ruleset
  `default-branch-protection` (PR required, 0 required reviewers).

## Concurrency - IMPORTANT

At most ONE write-lane per repo at a time. Parallelize ACROSS repos, never
WITHIN one.

Why: every repo under `C:\rand0m` is a fresh clone sharing per-repo git
worktrees. Two write-lanes in one repo has repeatedly caused mid-edit on-disk
file changes, commits tangling onto another agent's branch, and .git metadata
corruption (NUL-padded config/packed-refs, stale index.lock).

- Read-only lanes (audits, discovery, gh status reads) may run alongside
  anything.
- If you hit a shared-worktree conflict mid-task: STOP. Verify `git status` and
  `git diff` contain only YOUR changes and HEAD is on YOUR branch before
  committing.
- `xyz-docs` is the highest-risk repo org-wide; serialize writes to it.

## Toolchain and CI

None. Markdown and images.

**There is no CI gate in this repo** - no `.github/workflows/` at all. A PR here
is gated by nothing but review, and the org ruleset requires 0 reviewers. If
auto-merge is ever enabled here before a gate exists, PRs will merge the instant
they open with nothing checked - on the repo that renders the org's public front
page. That is tracked follow-on work.

For org context: Flutter 3.38.3 lives at `C:\flutter`; never use `setx` to edit
the USER PATH (it is over the 1024-char setx cap and truncates silently).

## Note for the next lane: unpushed work exists

The 2026-07-16 pre-deletion audit of the parked tree found local-only work for
this repo that was never pushed, rescued as bundles in `C:\rand0m\_rescued\`:

- `github-unpushed-branches.bundle` - `docs/autonomous-architecture-z1`
  (4 commits: autonomous infrastructure plan + ecosystem model, ruok-earth.png)
  and `readless-readmore-reorg` (1 commit: TIMELINE.md)
- `github-stash-0-core-solutions-svg.patch` - an unmerged edit to
  `assets/core-solutions.svg`

None of it is on the remote. Before doing significant work in `READMORE/` or
`assets/`, check those bundles so you do not redo or clobber it. See
`_rescued\INVENTORY.md`.
