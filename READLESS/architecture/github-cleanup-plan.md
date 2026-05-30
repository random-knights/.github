# GitHub Cleanup Plan

## Status

This plan turns the GitHub repository audit into a safe implementation sequence.
It does not rename repositories, push branches, delete folders, change remotes,
modify app source, touch Firebase, or read secrets.

## Ownership Model

| Area | Local path | Owner identity | Intended purpose |
| --- | --- | --- | --- |
| dev workspace root | `C:\Projects\dev-kitt` | `deve10per` | Root package/docs/tooling workspace for the app ecosystem. |
| app repos | `C:\Projects\dev-kitt\apps\*` | `deve10per` | Independent app repos nested under the workspace. |
| shared packages | `C:\Projects\dev-kitt\packages\rk_*` | `deve10per` | Standalone nested package repositories ignored by the root repo. |
| org profile | `C:\Projects\qa-kitt\.github` | `eng1neer` | Managed Random Knights org profile repo. |
| learning support | `C:\Projects\qa-kitt\c1assr00m` | `eng1neer` | Learn-from-the-ecosystem support repo. |
| practice support | `C:\Projects\qa-kitt\e1even` | `eng1neer` | Do/practice support repo with 11x11 challenge structure. |
| QA profile/support | `C:\Projects\qa-kitt\qa-kitt` | `eng1neer` | Personal/profile support repo for the QA identity. |

`eng1neer` remains an agent identity inside the Random Knights ecosystem. It
should not remain the repo-facing name for the Random Knights practice repo.

## Current Repository State

| Repo | Current branch | Status | Current remote |
| --- | --- | --- | --- |
| `C:\Projects\dev-kitt` | `master` | clean | none configured |
| `apps/knight1y` | `phase4/workflow-acceleration` | ahead 91 | `https://github.com/random-knights/kn1ghts.git` |
| `apps/rand0m` | `main` | ahead 20 | `https://github.com/random-knights/rand0m.git` |
| `apps/out1ine` | `main` | ahead 18 | `https://github.com/random-knights/orac1es.git` |
| `apps/up10ad` | `main` | ahead 25 | `https://github.com/random-knights/uti1ity.git` |
| `C:\Projects\qa-kitt\.github` | `main` | ahead 2 | `https://github.com/random-knights/.github.git` |
| `C:\Projects\qa-kitt\c1assr00m` | `main` | ahead 1 | `https://github.com/random-knights/c1assr00m.git` |
| `C:\Projects\qa-kitt\e1even` | `main` | ahead 2 | `https://github.com/random-knights/e1even.git` |
| `C:\Projects\qa-kitt\eng1neer` | `main` | ahead 4 | `git@github-qakitt:random-knights/e1even.git` |
| `C:\Projects\qa-kitt\qa-kitt` | `main` | many deleted `eng1neer/` files | `git@github-qakitt:qa-kitt/qa-kitt.git` |

Important distinction:

- `C:\Projects\qa-kitt\e1even` is the intended practice repo clone.
- `C:\Projects\qa-kitt\eng1neer` is a duplicate local clone of
  `random-knights/e1even` and should be retired after its ahead commits are
  reviewed or ported.
- `C:\Projects\qa-kitt\qa-kitt` is a different repo. Its deleted
  `eng1neer/` tree is local cleanup state and should be handled separately.

## Desired Repository State

| Repo | Desired branch | Desired remote |
| --- | --- | --- |
| `C:\Projects\dev-kitt` | `main` if the root repo becomes remote-backed, otherwise keep local `master` until decided | decided later |
| `apps/knight1y` | `main` or a merged release branch after current work lands | `git@github-devkitt:random-knights/knight1y.git` or equivalent HTTPS URL |
| `apps/rand0m` | `main` | `git@github-devkitt:random-knights/rand0m.git` or equivalent HTTPS URL |
| `apps/out1ine` | `main` | `git@github-devkitt:random-knights/out1ine.git` or equivalent HTTPS URL |
| `apps/up10ad` | `main` | `git@github-devkitt:random-knights/up10ad.git` or equivalent HTTPS URL |
| `C:\Projects\qa-kitt\.github` | `main` | `git@github-qakitt:random-knights/.github.git` or current HTTPS remote |
| `C:\Projects\qa-kitt\c1assr00m` | `main` | `git@github-qakitt:random-knights/c1assr00m.git` or current HTTPS remote |
| `C:\Projects\qa-kitt\e1even` | `main` | `git@github-qakitt:random-knights/e1even.git` or current HTTPS remote |
| `C:\Projects\qa-kitt\qa-kitt` | `main` | `git@github-qakitt:qa-kitt/qa-kitt.git` |

## Phase CB Local Checkpoints

Created on 2026-05-29. These are local-only checkpoints and have not been
pushed.

| Repo | Current branch preserved | Local tags created | Parking branch created |
| --- | --- | --- | --- |
| `C:\Projects\dev-kitt` | `master` | `root-pre-rename-2026-05-29` | none |
| `apps/knight1y` | `phase4/workflow-acceleration` | `knight1y-pre-rename-2026-05-29`, `knight1y-ahead-91-pre-rename-2026-05-29` | `knight1y-ahead-91` |
| `apps/rand0m` | `main` | `rand0m-pre-rename-2026-05-29` | none |
| `apps/out1ine` | `main` | `out1ine-pre-rename-2026-05-29`, `out1ine-ahead-18-pre-rename-2026-05-29` | `out1ine-ahead-18` |
| `apps/up10ad` | `main` | `up10ad-pre-rename-2026-05-29`, `up10ad-ahead-25-pre-rename-2026-05-29` | `up10ad-ahead-25` |
| `C:\Projects\qa-kitt\.github` | `main` | `github-pre-rename-2026-05-29`, `github-ahead-2-pre-rename-2026-05-29` | `github-ahead-2` |
| `C:\Projects\qa-kitt\e1even` | `main` | `e1even-pre-rename-2026-05-29`, `e1even-ahead-2-pre-rename-2026-05-29` | `e1even-ahead-2` |

Branch conversion notes:

- App repos were not converted from `master` to `main` because `rand0m`,
  `out1ine`, and `up10ad` are already on `main`, while `knight1y` is currently
  on `phase4/workflow-acceleration`.
- `C:\Projects\dev-kitt` remains on `master` because it has no remote. The
  root `master` to `main` conversion should wait until the root remote strategy
  is explicitly chosen.
- Parking branches were created from the current checked-out commit in each
  repo. No checkouts, pushes, remote edits, or repo renames were performed.

## Rename Candidates

These should be renamed in the GitHub UI first. Local remotes should be updated
only after GitHub confirms each rename.

| Current repo | Target repo | Notes |
| --- | --- | --- |
| `random-knights/kn1ghts` | `random-knights/knight1y` | Preserve Firebase project naming until a separate Firebase phase. |
| `random-knights/orac1es` | `random-knights/out1ine` | App folder and product name already use `out1ine`. |
| `random-knights/uti1ity` | `random-knights/up10ad` | App folder and product name already use `up10ad`. |
| `random-knights/rand0m` | keep as-is | No rename needed. |

QA-managed org repos:

- `random-knights/.github`
- `random-knights/c1assr00m`
- `random-knights/e1even`

Personal/profile repos:

- `qa-kitt/eng1neer`, if retained as the personal QA profile or archived
- `qa-kitt/qa-kitt`

## Phase CC Rename Execution Prep

This section is documentation only. Do not run these commands until a separate
execution phase explicitly approves GitHub UI changes and local remote updates.

Prerequisites:

- Random Knights organization admin approval.
- Confirm no one else is pushing to the legacy repo names during the rename
  window.
- Confirm local checkpoint tags and parking branches from Phase CB still exist.
- Confirm GitHub redirects from the old repo names are acceptable for a short
  transition window.
- Confirm whether the execution machine will use SSH aliases
  (`github-devkitt`) or HTTPS remotes.

### GitHub UI Rename Steps

Repeat this sequence for each repo:

1. Open GitHub in a browser.
2. Switch to an account with admin rights for the `random-knights`
   organization.
3. Open the current repository.
4. Go to `Settings`.
5. In `General`, find `Repository name`.
6. Enter the target name.
7. Confirm the rename prompt.
8. Wait for GitHub to show the new repository URL.
9. Verify the old URL redirects to the new URL.
10. Do not delete or archive the old project name anywhere else during this
    phase.

Rename order:

| Step | Current GitHub repo | New GitHub repo |
| --- | --- | --- |
| 1 | `random-knights/kn1ghts` | `random-knights/knight1y` |
| 2 | `random-knights/orac1es` | `random-knights/out1ine` |
| 3 | `random-knights/uti1ity` | `random-knights/up10ad` |

Do not rename `random-knights/rand0m`.

### Local Remote Update Sequence

Use the SSH form if the local GitHub identity alias is configured:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y remote set-url origin git@github-devkitt:random-knights/knight1y.git
git -C C:\Projects\dev-kitt\apps\knight1y fetch origin
git -C C:\Projects\dev-kitt\apps\knight1y branch -u origin/phase4/workflow-acceleration phase4/workflow-acceleration
git -C C:\Projects\dev-kitt\apps\knight1y branch --unset-upstream knight1y-ahead-91
git -C C:\Projects\dev-kitt\apps\knight1y remote -v

git -C C:\Projects\dev-kitt\apps\out1ine remote set-url origin git@github-devkitt:random-knights/out1ine.git
git -C C:\Projects\dev-kitt\apps\out1ine fetch origin
git -C C:\Projects\dev-kitt\apps\out1ine branch -u origin/main main
git -C C:\Projects\dev-kitt\apps\out1ine branch --unset-upstream out1ine-ahead-18
git -C C:\Projects\dev-kitt\apps\out1ine remote -v

git -C C:\Projects\dev-kitt\apps\up10ad remote set-url origin git@github-devkitt:random-knights/up10ad.git
git -C C:\Projects\dev-kitt\apps\up10ad fetch origin
git -C C:\Projects\dev-kitt\apps\up10ad branch -u origin/main main
git -C C:\Projects\dev-kitt\apps\up10ad branch --unset-upstream up10ad-ahead-25
git -C C:\Projects\dev-kitt\apps\up10ad remote -v
```

Use this HTTPS form if SSH aliases are not configured:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y remote set-url origin https://github.com/random-knights/knight1y.git
git -C C:\Projects\dev-kitt\apps\knight1y fetch origin
git -C C:\Projects\dev-kitt\apps\knight1y branch -u origin/phase4/workflow-acceleration phase4/workflow-acceleration
git -C C:\Projects\dev-kitt\apps\knight1y branch --unset-upstream knight1y-ahead-91
git -C C:\Projects\dev-kitt\apps\knight1y remote -v

git -C C:\Projects\dev-kitt\apps\out1ine remote set-url origin https://github.com/random-knights/out1ine.git
git -C C:\Projects\dev-kitt\apps\out1ine fetch origin
git -C C:\Projects\dev-kitt\apps\out1ine branch -u origin/main main
git -C C:\Projects\dev-kitt\apps\out1ine branch --unset-upstream out1ine-ahead-18
git -C C:\Projects\dev-kitt\apps\out1ine remote -v

git -C C:\Projects\dev-kitt\apps\up10ad remote set-url origin https://github.com/random-knights/up10ad.git
git -C C:\Projects\dev-kitt\apps\up10ad fetch origin
git -C C:\Projects\dev-kitt\apps\up10ad branch -u origin/main main
git -C C:\Projects\dev-kitt\apps\up10ad branch --unset-upstream up10ad-ahead-25
git -C C:\Projects\dev-kitt\apps\up10ad remote -v
```

If `branch --unset-upstream` reports that a parking branch has no upstream,
that is acceptable. The parking branches are intentionally local until
explicitly pushed.

### Safe Push Sequence After Renames

Push the primary branches first:

```powershell
git -C C:\Projects\dev-kitt\apps\rand0m push origin main
git -C C:\Projects\dev-kitt\apps\out1ine push origin main
git -C C:\Projects\dev-kitt\apps\up10ad push origin main
git -C C:\Projects\dev-kitt\apps\knight1y push origin phase4/workflow-acceleration
```

Push repo rename checkpoint tags:

```powershell
git -C C:\Projects\dev-kitt\apps\rand0m push origin rand0m-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-ahead-18-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-ahead-25-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-ahead-91-pre-rename-2026-05-29
```

Push parking branches only if remote backup branches are desired:

```powershell
git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-ahead-18
git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-ahead-25
git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-ahead-91
```

QA/support branches and tags are not blocked by the app repo renames, but can
be pushed in the same cleanup window:

```powershell
git -C C:\Projects\qa-kitt\.github push origin main
git -C C:\Projects\qa-kitt\.github push origin github-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\.github push origin github-ahead-2-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\.github push origin github-ahead-2

git -C C:\Projects\qa-kitt\e1even push origin main
git -C C:\Projects\qa-kitt\e1even push origin e1even-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\e1even push origin e1even-ahead-2-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\e1even push origin e1even-ahead-2
```

### Post-Rename Verification

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y status -sb
git -C C:\Projects\dev-kitt\apps\knight1y remote -v
git -C C:\Projects\dev-kitt\apps\knight1y branch -vv

git -C C:\Projects\dev-kitt\apps\out1ine status -sb
git -C C:\Projects\dev-kitt\apps\out1ine remote -v
git -C C:\Projects\dev-kitt\apps\out1ine branch -vv

git -C C:\Projects\dev-kitt\apps\up10ad status -sb
git -C C:\Projects\dev-kitt\apps\up10ad remote -v
git -C C:\Projects\dev-kitt\apps\up10ad branch -vv
```

Expected result:

- remotes point at `knight1y`, `out1ine`, and `up10ad`
- primary local branches still contain the same commits as before rename
- parking branches still exist
- checkpoint tags still resolve locally

### Rollback Plan

If a rename or remote update causes trouble, preserve local state first:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y status -sb
git -C C:\Projects\dev-kitt\apps\out1ine status -sb
git -C C:\Projects\dev-kitt\apps\up10ad status -sb
```

Restore original remote URLs if needed:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y remote set-url origin https://github.com/random-knights/kn1ghts.git
git -C C:\Projects\dev-kitt\apps\out1ine remote set-url origin https://github.com/random-knights/orac1es.git
git -C C:\Projects\dev-kitt\apps\up10ad remote set-url origin https://github.com/random-knights/uti1ity.git
```

Return a local branch to its checkpoint tag only if the branch itself was moved
by mistake:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y switch phase4/workflow-acceleration
git -C C:\Projects\dev-kitt\apps\knight1y reset --hard knight1y-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\out1ine switch main
git -C C:\Projects\dev-kitt\apps\out1ine reset --hard out1ine-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\up10ad switch main
git -C C:\Projects\dev-kitt\apps\up10ad reset --hard up10ad-pre-rename-2026-05-29
```

Use `reset --hard` only after confirming there are no uncommitted changes to
preserve. The parking branches remain an additional local backup path:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y switch knight1y-ahead-91
git -C C:\Projects\dev-kitt\apps\out1ine switch out1ine-ahead-18
git -C C:\Projects\dev-kitt\apps\up10ad switch up10ad-ahead-25
```

If the GitHub UI rename itself must be rolled back, reverse the repo names in
GitHub Settings, then restore original local remote URLs.

### Dev-Kitt Root Strategy Decision

The root repo currently has no `origin` and remains on `master`. There is no
required remote action for the app repo renames.

Recommended default:

- keep root local-only through the app repo rename window
- do not push `root-pre-rename-2026-05-29` until a root remote exists
- defer `master` to `main` conversion until after app repo remotes are stable

If a root remote is desired later, choose the owner first:

| Option | Remote shape | When to use |
| --- | --- | --- |
| Random Knights workspace repo | `git@github-devkitt:random-knights/dev-kitt.git` | Root packages/docs/tooling should be shared under the org. |
| Deve10per profile repo | `git@github-devkitt:deve10per/dev-kitt.git` | Root workspace should remain personal/private to the dev identity. |

Then use the existing root conversion command block in this document.

## Future Commands

Run these only in a write-enabled cleanup phase after the corresponding GitHub
UI actions are complete.

### Set Local Git Identity Per Repo

For dev-owned repos:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y config user.name "deve10per"
git -C C:\Projects\dev-kitt\apps\knight1y config user.email "deve10per@users.noreply.github.com"
```

Repeat for:

- `C:\Projects\dev-kitt\apps\rand0m`
- `C:\Projects\dev-kitt\apps\out1ine`
- `C:\Projects\dev-kitt\apps\up10ad`
- `C:\Projects\dev-kitt`

For QA/support repos:

```powershell
git -C C:\Projects\qa-kitt\.github config user.name "eng1neer"
git -C C:\Projects\qa-kitt\.github config user.email "eng1neer@users.noreply.github.com"
```

Repeat for:

- `C:\Projects\qa-kitt\c1assr00m`
- `C:\Projects\qa-kitt\e1even`
- `C:\Projects\qa-kitt\qa-kitt`

### Update Remotes After GitHub Repo Renames

After `random-knights/kn1ghts` is renamed to `random-knights/knight1y`:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y remote set-url origin git@github-devkitt:random-knights/knight1y.git
git -C C:\Projects\dev-kitt\apps\knight1y remote -v
```

After `random-knights/orac1es` is renamed to `random-knights/out1ine`:

```powershell
git -C C:\Projects\dev-kitt\apps\out1ine remote set-url origin git@github-devkitt:random-knights/out1ine.git
git -C C:\Projects\dev-kitt\apps\out1ine remote -v
```

After `random-knights/uti1ity` is renamed to `random-knights/up10ad`:

```powershell
git -C C:\Projects\dev-kitt\apps\up10ad remote set-url origin git@github-devkitt:random-knights/up10ad.git
git -C C:\Projects\dev-kitt\apps\up10ad remote -v
```

If keeping HTTPS instead of SSH aliases, use:

```powershell
git -C C:\Projects\dev-kitt\apps\knight1y remote set-url origin https://github.com/random-knights/knight1y.git
git -C C:\Projects\dev-kitt\apps\out1ine remote set-url origin https://github.com/random-knights/out1ine.git
git -C C:\Projects\dev-kitt\apps\up10ad remote set-url origin https://github.com/random-knights/up10ad.git
```

### Retire Duplicate `dev-kitt\.github`

Only after `C:\Projects\qa-kitt\.github` is confirmed current and pushed:

```powershell
git -C C:\Projects\qa-kitt\.github status -sb
git -C C:\Projects\qa-kitt\.github remote -v
git -C C:\Projects\dev-kitt\.github status -sb
git -C C:\Projects\dev-kitt\.github remote -v
```

Then choose one:

- archive the duplicate folder outside the workspace
- remove the duplicate clone
- keep it ignored as a temporary read-only reference

Do not delete `C:\Projects\dev-kitt\.github` until the QA-managed org profile
repo has the desired content committed and pushed.

### Push Ahead Branches Safely

Review each ahead branch before pushing:

```powershell
git -C C:\Projects\qa-kitt\.github status -sb
git -C C:\Projects\qa-kitt\.github log --oneline origin/main..main
git -C C:\Projects\qa-kitt\.github push origin main

git -C C:\Projects\qa-kitt\c1assr00m status -sb
git -C C:\Projects\qa-kitt\c1assr00m log --oneline origin/main..main
git -C C:\Projects\qa-kitt\c1assr00m push origin main

git -C C:\Projects\qa-kitt\e1even status -sb
git -C C:\Projects\qa-kitt\e1even log --oneline origin/main..main
git -C C:\Projects\qa-kitt\e1even push origin main

git -C C:\Projects\dev-kitt\apps\rand0m status -sb
git -C C:\Projects\dev-kitt\apps\rand0m log --oneline origin/main..main
git -C C:\Projects\dev-kitt\apps\rand0m push origin main

git -C C:\Projects\dev-kitt\apps\out1ine status -sb
git -C C:\Projects\dev-kitt\apps\out1ine log --oneline origin/main..main
git -C C:\Projects\dev-kitt\apps\out1ine push origin main

git -C C:\Projects\dev-kitt\apps\up10ad status -sb
git -C C:\Projects\dev-kitt\apps\up10ad log --oneline origin/main..main
git -C C:\Projects\dev-kitt\apps\up10ad push origin main

git -C C:\Projects\dev-kitt\apps\knight1y status -sb
git -C C:\Projects\dev-kitt\apps\knight1y log --oneline origin/phase4/workflow-acceleration..phase4/workflow-acceleration
git -C C:\Projects\dev-kitt\apps\knight1y push origin phase4/workflow-acceleration
```

Optional parking-branch pushes, if you want durable remote backup branches
before GitHub repo renames:

```powershell
git -C C:\Projects\qa-kitt\.github push origin github-ahead-2
git -C C:\Projects\qa-kitt\e1even push origin e1even-ahead-2
git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-ahead-18
git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-ahead-25
git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-ahead-91
```

Tag push sequence after reviewing tags:

```powershell
git -C C:\Projects\dev-kitt push origin root-pre-rename-2026-05-29

git -C C:\Projects\qa-kitt\.github push origin github-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\.github push origin github-ahead-2-pre-rename-2026-05-29

git -C C:\Projects\qa-kitt\e1even push origin e1even-pre-rename-2026-05-29
git -C C:\Projects\qa-kitt\e1even push origin e1even-ahead-2-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\rand0m push origin rand0m-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\out1ine push origin out1ine-ahead-18-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\up10ad push origin up10ad-ahead-25-pre-rename-2026-05-29

git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-pre-rename-2026-05-29
git -C C:\Projects\dev-kitt\apps\knight1y push origin knight1y-ahead-91-pre-rename-2026-05-29
```

Do not run the root tag push until the root remote exists. The current root
repo has no `origin`.

Recommended order:

1. `C:\Projects\qa-kitt\.github`
2. `C:\Projects\qa-kitt\c1assr00m`
3. `C:\Projects\qa-kitt\e1even`
4. `C:\Projects\dev-kitt\apps\rand0m`
5. `C:\Projects\dev-kitt\apps\out1ine`
6. `C:\Projects\dev-kitt\apps\up10ad`
7. `C:\Projects\dev-kitt\apps\knight1y`

Push `knight1y` last because it has the largest ahead count and a non-main
working branch.

### Convert `dev-kitt` Root `master` to `main`

Only after deciding the root repo should have a remote:

```powershell
git -C C:\Projects\dev-kitt status -sb
git -C C:\Projects\dev-kitt branch -m master main
git -C C:\Projects\dev-kitt remote add origin git@github-devkitt:random-knights/dev-kitt.git
git -C C:\Projects\dev-kitt push -u origin main
```

If the target is a personal/root workspace repo instead of `random-knights`,
replace the remote URL before pushing.

## Cleanup Sequence

### Must Fix

1. Review and push/park ahead commits before GitHub renames.
2. Rename app repos in GitHub UI:
   - `kn1ghts` to `knight1y`
   - `orac1es` to `out1ine`
   - `uti1ity` to `up10ad`
3. Update local remotes after each GitHub rename.
4. Retire the duplicate `C:\Projects\qa-kitt\eng1neer` clone after confirming
   its ahead commits are represented in `C:\Projects\qa-kitt\e1even`.
5. Resolve `C:\Projects\qa-kitt\qa-kitt` deleted historical `eng1neer/` tree
   intentionally: commit if the cleanup is desired, or restore if not.

### Should Fix

1. Move org profile ownership fully to `C:\Projects\qa-kitt\.github`.
2. Remove or archive `C:\Projects\dev-kitt\.github` after content parity is
   confirmed.
3. Standardize branch names where practical.
4. Refresh stale profile/READMORE references to `kn1ghts`, `orac1es`, and
   `uti1ity`.
5. Standardize README headers and repository-purpose language.

### Nice To Have

1. Add repo topics/descriptions in GitHub.
2. Add branch protection for `main` repos.
3. Add a lightweight repo health checklist.
4. Add a periodic link check for org docs.

## Next Phase Recommendation

Begin with a narrow remote-prep phase:

```text
Begin Ecosystem Cleanup Phase CC: GitHub Rename Execution Prep.

Goal:
Review local checkpoint branches/tags, decide which branches and tags to push,
and prepare the exact GitHub UI rename order for knight1y, out1ine, and up10ad.

Do not push unless explicitly approved.
Do not rename repos yet.
Do not delete folders.
```
