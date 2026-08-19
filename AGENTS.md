# AGENTS - agent rules for the .github repo

Canonical rules live in `C:\rand0m\AGENTS.md` (the working-root standard). This
file restates what an agent MUST follow here and adds the specifics. If the two
ever disagree, the working-root standard wins.

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

Follow the canonical root rule. Parallel write-lanes in one repository are
allowed only when each lane uses its own full clone, claimed file paths do not
overlap, and each lane rebases onto origin/main before pushing. Shared
worktrees still permit only one write-lane because they share one `.git`
directory. Read-only lanes may run alongside write work.

If you hit a shared-worktree conflict, stop and verify that `git status` and
`git diff` contain only your changes and HEAD is on your branch before
committing. `xyz-docs` remains the highest-risk repo org-wide, so serialize
writes there.

## Toolchain and CI

Markdown, images, and Node.js 20 for the repository checker.

Every PR and main push emits:

- `.github/workflows/ci.yml`: required `CI Gate`, which validates workflow YAML,
  the public profile, changed-document links, and cross-repository asset safety.
- `.github/workflows/secret-scan.yml`: gitleaks secret scanning.
- GitHub CodeQL default setup for Actions.

The organization ruleset `ci-gate-required` requires `CI Gate` on the default
branch. The separate default-branch protection ruleset still requires a PR with
0 required reviewers. Never bypass either ruleset, and verify the exact merged
SHA after merge.

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
