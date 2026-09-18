# random-knights/.github

The org-level `.github` repo. It carries no application code; it is the org's
public face and shared assets.

| Path | What it is |
|---|---|
| `profile/README.md` | **The public org profile page** rendered at [github.com/random-knights](https://github.com/random-knights) |
| `profile/TIMELINE.md` | Public timeline |
| `READMORE/` | The public-facing docs set (start at `READMORE/README.md`) |
| `assets/` | Shared images, **referenced by other repos via raw URLs** |

## Careful: small repo, wide blast radius

- `profile/README.md` is the org's front page for the whole internet. Preview
  before pushing.
- `assets/` is consumed by OTHER repos by raw URL, for example
  `https://github.com/random-knights/.github/raw/main/assets/ruok-earth.png`
  (xyz-earth, xyz-tools) and the `_c1assr00m` assets used by
  [abc](https://github.com/random-knights/abc). **Moving or renaming an asset
  silently breaks images in other repos' READMEs** - nothing errors, the image
  just disappears.
- Everything here is public. Nothing private, internal, or secret.

## Operating this repo

- [AGENTS.md](AGENTS.md) - agents: the rules that apply in this repo.

There is no build, no toolchain, and no CI in this repo.

## The rest of the ecosystem

- The app: [ruok](https://github.com/random-knights/ruok) (rand0m.ai)
- Docs, ADRs, runbooks: [xyz-docs](https://github.com/random-knights/xyz-docs)
- Requests, bugs, testing: [123](https://github.com/random-knights/123/issues)
- Learning: [abc / c1assr00m](https://github.com/random-knights/abc)

## The AiEDs disclosure blocks

`aieds/blocks/*.md` and `aieds/aieds-readme.json` are GENERATED. Do not hand
edit either one.

They are written by the AiEDs README generator in the working root, which reads
the `SessionEnd` ledgers on the developers' machines, attributes each session to
a repository by the working directory it ran in, and computes under AiEDs
methodology section 2.4.1. The ledgers are local and are not published; what is
published here is the aggregate the generator produced, plus the row counts and
ledger file names it consumed, so a reader can see what the figures rest on.

`scripts/sync-aieds.mjs` places a block between the `AIEDS:BEGIN` and
`AIEDS:END` markers in a consumer README. It renders nothing: there is exactly
one renderer, and a second one would be a second copy of the same fact.

`organisation` is the whole organisation's block. It is deliberately not called
`org`, because `org` is a repository here (randomknights.org) and the collision
once put one repository's figures on the public front page as the company's.

The `CI Gate` fails a profile page whose block has drifted from
`aieds/blocks/organisation.md`. Consumer repositories get the same guarantee by
calling the reusable `AiEDs block` workflow.
