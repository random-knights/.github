# Earth — remaining work, command packs (Windows execution handoff)

Authored by the prep/author agent (no GBIF/CMEMS/Flutter/deploy in its sandbox).
Each pack is ready for a Windows agent with the toolchain + creds. **Verify from
git before trusting any prose, including this file.**

## Verified state (2026-06-20)

- `origin/main` (random-knights/xyz) = **b966f0b** — carbon-scalar retired,
  HD-default, crisper 1536² scalar texture. Prod (wf90) = `8194d46`.
  Re-check: `git -C C:\Projects\dev-kitt\apps\rand0m rev-parse --short origin/main`
- Species CR locating: **4,740 remaining / 6,314 processed / 3,367 located (53%)**.
  Cache intact + resumable.
- **2D earth globe is NOT merged.** It is the staged scaffold at
  `C:\Projects\dev-kitt\earth2d-handoff\` (7 Dart + 5 JS, node-checked, spec
  committed qa-kitt `1460b31`). Treat as "scaffold, needs integration," not "done."

## Standing rules (apply to EVERY app-code pack)

- **Identity:** dev-kitt code = `deve10per` / `github-devbot`; qa-kitt docs =
  `eng1neer` / `github-qakitt`. Verify `git config user.name/user.email` + the
  remote SSH alias before any commit.
- **Lane isolation:** Earth Cesium globe = ONE agent in
  `worktrees\rand0m-earth`; the 2D page is the disjoint Agent-B surface. Branch
  off `origin/main`. Never parallel-edit the same Earth files.
- **Validate:** `powershell -File C:\Projects\dev-kitt\tooling\scripts\validate-earth-fast.ps1 -AppPath C:\Projects\dev-kitt\worktrees\rand0m-earth`.
  For `web\*.js` use `node --check <file>` (not analyze).
- **Revert generated plugin-registrants** before every commit.
- **Land + ship cadence:** rebase before EVERY push → ff-merge to `main` →
  **push main immediately** → `gh workflow run 80-test-deploy-smoke.yml --ref main -R random-knights/xyz` (staging+smoke).
- **Owner-only (queue, do not run):** device-passes (use earth.nullschool.net as
  the public reference — MCP can't auth the globe); worker
  `gcloud run jobs deploy earth-worker`; ALL Firebase function deploys (App-Check
  is ARMED → the auto-classifier blocks `firebase deploy --only functions:*`, so
  the owner name-scopes each refresher deploy); the prod `90-production-release` wf90.
- **Governance gates (owner sign-off REQUIRED, do not build past them):** score
  weighting (moves the headline number); Cesium terrain (billed Ion asset vs the
  vector-only CODEX rule); registering the 5 impact pointsets as selectable layers.
- **Hard invariants:** overlay stays **OPAQUE** (`alpha = domain mask`; never
  revert to value-scaled alpha — that was the base-bleed bug just fixed); the
  synthetic carbon-ppm scalar is **retired** (carbon survives only as the
  Berkeley VCM point layer + analytics — do not reintroduce the scalar).

---

## Pack 0 — Pipe in the 2D earth2d scaffold (Agent-B surface)

Goal: land the staged 2D renderer behind a flag (OFF), file-disjoint from the
Cesium lane. Full steps in `earth2d-handoff\INTEGRATION.md`.

```
cd C:\Projects\dev-kitt\apps\rand0m
git fetch origin
git worktree add ..\..\worktrees\rand0m-earth2d -b earth/earth2d-thin-proof origin/main
# copy earth2d-handoff\lib\... and \web\*.js into the worktree; vendor d3-geo+topojson
#   into web\earth2d\vendor\ and add the 7 <script defer> tags (INTEGRATION.md §1)
# the ONE Earth-page edit (serialize w/ the Earth lane, rebase-before-merge):
#   wrap EarthCesiumGlobeView(...) in EarthRendererToggle(cesium:..., earth2d:(_) => Earth2dGlobeView(...))
flutter analyze                       # fix import paths / HtmlElementView nits
flutter test test\connect
powershell -File C:\Projects\dev-kitt\tooling\scripts\validate-earth-fast.ps1 -AppPath C:\Projects\dev-kitt\worktrees\rand0m-earth2d
# device-pass with flag on (owner):  flutter run -d chrome --dart-define=EARTH2D_RENDERER=true
# ship (flag OFF default): rebase -> ff-merge main -> push main -> wf80
```

JS is node-checked + headlessly verified (scalar 6/6, flow 8/8, points 11/11).
Dart mirrors `earth_cesium_bridge_web.dart`; analyze on Windows is the only gap.

---

## Pack 1 — Species CR locating + pointset (BLOCKING; the only serial work)

Lane 1 needs GBIF network + `requests/openpyxl/pycountry/geonamescache` — Windows
only. **Do not delete the cache. Do not widen to EN/VU. Do not exceed 16 workers.**

```
cd C:\Projects\dev-kitt
# LANE 1 — loop until CR remaining == 0 (resumes from the durable cache):
python tooling\scripts\ingest_species_locations.py --cr-only
python - <<'PY'
import json
c=json.load(open("tooling/data/earth-impact/_species_locations_cache.json",encoding="utf-8"))
t=json.load(open("tooling/data/earth-impact/_iucn_threatened_cache.json",encoding="utf-8"))
cr=[k for k,v in t.items() if v.get("category")=="Critically Endangered"]
done=sum(1 for k in cr if k in c); loc=sum(1 for k in cr if "lat" in c.get(k,{}))
print(f"CR remaining {len(cr)-done} | located {loc}")
PY
# re-run the two commands until "CR remaining 0". A COMPLETE run auto-rewrites
# species.xlsx (lat/long folded into the IUCN-threatened sheet; EN/VU stay unlocated).

# LANE 2 — only after remaining == 0:
python tooling\scripts\build_earth_pointsets.py --species
python tooling\scripts\build_earth_pointsets.py --check     # must print CHECK PASSED
```

Deliverable check: species.xlsx threatened sheet has lat/long for CR rows
(Sources & Method shows the located count); `species-threatened-clustered-v1.json`
exists, schema `earth.pointset.v1`, palette `veg`, `--check` passes. Report CR
located count, % located, dot/record counts. **~50–60% located is correct, not a
failure** (the rest stay `{"none": true}`).

Owner-gated (separate, queued): registering the 5 pointsets as selectable Earth
layers — see `tooling\data\earth-impact\README.md` "Globe pointsets".

---

## Pack 2 — Earth Score v0.2 (highest value; shared by 2D + 3D) ⚠ weight sign-off

Precondition (owner): confirm the Cloud Run worker is deployed with
forest/particulates/chemistry/tree-time — else the score + overlays read
REPRESENTATIVE, not real.

Files: `functions/src/earthHealthScore.ts` (`LAYER_WEIGHTS`), the `index.ts`
wrapper (~L3254), client `lib/models/earth/earth_live_health_score.dart`.

Implement (in `worktrees\rand0m-earth`):
- Add normalizers + `LAYER_WEIGHTS`/DIRECTION for: protected-areas (conservation
  BENEFIT, clean/distinct); real PM2.5 as the air-pollution burden (replaces the
  coarse US AQI); NO2 as a small distinct air burden; fold tree-time into the
  biosphere as a small forest-vitality refinement.
- **Avoid double-counting** PM2.5⟷air-quality and tree-time⟷forest.
- `index.ts` per-region extraction: `sampleScalarGrid` the new grids at
  `AIR_QUALITY_REGIONS` centroids. Extend client `earthHealthSignalForLayer`.
- Bump `methodologyVersion` 0.1 → 0.2. Update jest + dart tests.

```
cd C:\Projects\dev-kitt\worktrees\rand0m-earth\functions
npm run build
npm test                       # jest
cd ..
flutter test test\connect      # dart score tests
powershell -File C:\Projects\dev-kitt\tooling\scripts\validate-earth-fast.ps1 -AppPath C:\Projects\dev-kitt\worktrees\rand0m-earth
```

⚠ **Get owner sign-off on the weighting BEFORE deploy** (it moves the headline
number). Then owner deploys `earthHealthScoreRefresh` + force-runs the scheduler.
Optional UI follow-up: a real biosphere/category COMPOSITE score group (vs the
current single-layer isolation).

---

## Pack 3 — CMEMS currents + waves (Batch 2; enables animations-on-by-default)

De-risk LIVE first, **no app edits**, before building anything:

```
pip install copernicusmarine
# auth with RANDOM_CMEMS_USERNAME / RANDOM_CMEMS_PASSWORD (root .env)
# open Global Ocean Physics Analysis & Forecast currents (uo/vo) + Waves (VHM0);
# CONFIRM dataset IDs + a sample value BEFORE building.
```

Then: swap ocean currents OSCAR → CMEMS (drop-in to
`earth/ocean/oscar-live-grid.json`, finer res) + add a Waves animate layer.
Worker module mirroring `apps/rand0m/worker\cams.py` / `tree_time.py`, or a
functions refresher. Validate (worktree + `node --check` for any web JS).
**Owner deploys** the worker/function.

---

## Pack 4 — Ocean overlays (Batch 3)

- Surface **SSTA**: `earthSstRefresh` already computes the anomaly — wire a client
  scalar layer exactly like the particulates/chemistry batches (pure client wiring).
- **BAA** (NOAA Coral Reef Watch, no key) as a scalar layer.

Keep overlays OPAQUE (domain-mask alpha). Validate worktree; owner deploys any
new refresher. Land as a coherent batch → push main → wf80.

---

## Pack 5 — 2D/3D toggle + default-to-2D

Coordinate with the Agent-B surface (Pack 0). Make 2D the default; add a clean
3D/2D toggle. **Keep the shared data contracts (`earth.scalarfield.v1`, etc.)
stable** — the 2D side reads them read-only. The toggle wrapper already exists
(`EarthRendererToggle`); flip its default/RC once Pack 0 is merged and device-passed.

---

## Pack 6 — Cesium-terrain 3D experiment ⚠ GOVERNANCE-GATED — DO NOT BUILD YET

Cesium World Terrain is a **billed Ion asset** and CODEX mandates the globe stay
**vector-only** (no raw imagery, no unrestricted maps). Scope it as a governance
decision (Ion token + billing + the vector-only rule) and get **owner sign-off
first**. No code until then.

---

## Pack 7 — Mobile perf spot-check (1536² texture)

`web/earth_scalar_field.js` `TEX_W`/`TEX_H` were bumped to 1536². On low-end
phones, if first-overlay-show hitches, revert to **1024×512** (the opacity fix is
the real win and has zero perf cost). Verify with `node --check`; device-pass
(owner) on a low-end phone.

---

## Ship cadence

Land coherent batches. After each: rebase → ff-merge main → **push main now** →
`gh workflow run 80-test-deploy-smoke.yml --ref main -R random-knights/xyz` →
verify smoke green at `randomknights-xyz.web.app`. Prod wf90 is owner-only.
Tell the owner the current Earth state + your next command before editing.
