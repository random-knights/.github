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

- [CODEX.md](CODEX.md) - agents: the rules that apply in this repo.

There is no build, no toolchain, and no CI in this repo.

## The rest of the ecosystem

- The app: [xyz](https://github.com/random-knights/xyz) (rand0m.ai)
- Docs, ADRs, runbooks: [xyz-docs](https://github.com/random-knights/xyz-docs)
- Requests, bugs, testing: [123](https://github.com/random-knights/123/issues)
- Learning: [abc / c1assr00m](https://github.com/random-knights/abc)
