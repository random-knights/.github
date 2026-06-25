# Lane T patch — nullschool parity (URL + overlay quality) + earth+ links row

Fold into the running `EARTH-FINISH-AND-SHIP.md` Phase 2 (Lane T). I studied earth.nullschool.net live (particulates/SO₄ex view) — this captures what "match their quality" means, concretely.

## What nullschool does (observed)
- **Filter rows mirror ours:** Mode (Air/Ocean/Chem/Particulates/Space/Bio) · Animate (Wind/Currents/Waves) · Overlay (the scalar product, e.g. PM₂.₅, SO₄ex) · Projection (A/CE/E/O/P/S/WB/W3). Overlay options change per Mode.
- **Overlay quality:** the scalar field is **semi-transparent** — coastlines, country borders, AND the lat/lon **graticule** all read through it — and the active **animation (wind particles) composites on top** of the overlay. You always see the Earth. (Ours blankets; FIX-1a starts this — this finishes it.)
- **URL = shareable slash-tokens incl. camera:** `#current/particulates/surface/level/overlay=suexttau/orthographic=-60.00,0.00,546` → `date / mode / height / level / overlay=<product> / <projection>=<centerLon,centerLat,zoom>`. The projection token carries the camera, so a pasted link reproduces the exact view.
- **Footer:** about · docs · social icons · feedback · ⚙ settings, all in the menu foot.

## Patch 2c (URL breadcrumbs) — match the scheme
Adopt nullschool's human-readable slash-token hash, extended for our extra dimensions, e.g.:
`#<time>/<mode>/<overlay>/<animate>/<annotation>/<region>/<2d|3d>/<projection>=<lon,lat,zoom>`
- Tokens are readable words (mode/overlay/animate/annotation ids; region slug); parameterized ones use `key=value`; the projection token carries the camera like theirs.
- Read on load → deep-link restores the full view (this is also what FIX-2 needs: the restored state must paint). Write on change via `replaceState` (no history spam). Omit defaults to keep links short. Expose a builder the snapshot's "Browse in Data View" uses.

## Patch — overlay quality parity (extends FIX-1a)
For EVERY overlay, match nullschool: semi-transparent scalar fill (geography reads through), coastlines + admin-0 borders + a faint **graticule** rendered ON TOP, composited with the active animation. **VERIFY by opening ours and nullschool side-by-side per overlay** (SST, Particulates/PM2.5, BAA, Air Quality, forest, etc.) and screenshotting until ours reads as cleanly as theirs.

## NEW 2f — earth+ links / social row (in the panel footer)
Add a footer row to `earth+` (like nullschool's menu foot). Three GitHub destinations, differentiated by PURPOSE icon (we have only ONE github asset today — `assets/icons/github.png` → `github.com/random-knights`; don't use three identical logos):
- **GitHub Discussions** → `github.com/random-knights/xyz-earth/discussions` — use a forum/comment icon (e.g. `Icons.forum`).
- **Report bug / request feature** → the now-free test-page issue form (Lane U un-gated it) or `…/issues/new` — use a bug icon (`Icons.bug_report`).
- **Repo / org** → `github.com/random-knights` — the existing github.png.
Plus the rest of the About socials (Discord/Instagram/Reddit/X/YouTube/TikTok/Spotify/BuyMeTacos) — **reuse `AboutSocials`'s link list** (lib/widgets/about/socials.dart), don't re-hardcode URLs. Compact 22px icons, horizontal scroll, opens via url_launcher. Files: `earth_nullschool_chrome.dart` (or the filter panel) + import the socials data.

## Gate
On-device screenshots: a deep-linked URL restoring the exact view; each overlay matching nullschool; the earth+ links row opening each destination. Rebase before merge; agent deploys per the parent runbook's checkpoints.
