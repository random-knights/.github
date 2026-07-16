# Agent rules (.github)

**Read `../CODEX.md` in this repo root and follow it. It is the authority for
this repo.** Canonical org rules live in `C:\rand0m\CODEX.md`.

This is the ORG-LEVEL .github repo: the public org profile, the READMORE docs
set, and shared assets. No application code. The app is `xyz`.

The smallest repo with the widest blast radius. Four things:

1. **`profile/README.md` IS the org's public front page**, rendered at
   github.com/random-knights for the whole internet. A careless edit is not a
   broken file, it is the org's face.
2. **`assets/` is referenced by OTHER repos via raw URLs** (xyz-earth,
   xyz-tools, abc's `_c1assr00m` set). Moving or renaming an asset SILENTLY
   breaks images in other repos' READMEs - nothing errors, the image just
   vanishes. Grep the org before moving one.
3. **Everything here is public.** Nothing private, internal, or secret, ever.
4. **ONE write-lane per repo.** Parallelize across repos, never within one.

There IS a CI gate now: `.github/workflows/ci.yml`, reporting as the check
**`CI Gate`**. It validates that every workflow YAML parses, that the 21 assets
other repos load by raw URL still exist, that `profile/README.md` resolves, and
that any doc the PR touches has working references. Run it locally with
`node .github/scripts/check-repo.mjs --base origin/main`.

Unpushed local-only work for this repo exists as bundles in
`C:\rand0m\_rescued\` (two branches + an assets/core-solutions.svg stash) -
check `_rescued\INVENTORY.md` before significant work in READMORE/ or assets/.

Never fake a green run. Credentials are owner-only.
