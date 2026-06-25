# EARTH FIX-2 (on-device) — active layers don't paint on entry / nav / 2D↔3D

Queued **after** CONSOLIDATE-ALL lands — branch off the **new consolidated `main`** (it has Earth FIX-1/3/4/5; FIX-2 touches `earth_tab.dart` + the stage, which those changed). This is the one fix that was deferred because it's a **runtime race that cannot be verified headlessly** — so this agent must RUN the app and prove the fix with before/after screenshots. No blind commits to the renderer mount lifecycle.

## The bug (I reproduced it live on staging)
- **Hard reload** → bare sphere; the Overlay row shows OFF (⊘) yet the bottom-right chip still claims "Carbon Offset Projects" — and no dots paint. State says a layer is active; the renderer shows nothing (state↔render mismatch).
- **About → XYZ** → base globe with borders only; the active layer never paints (7s+).
- **2D → 3D** → Cesium boots fine but the active overlay does not carry into the 3D globe.

## Diagnosis carried over from the fix-pass agent (start here, re-verify — don't trust blindly)
Ruled out: Cesium lazy-load fires on every 3D build (`viewers:[]` is just the correct 2D default); the 2D mask path self-heals via per-frame retry; the 2D view does push frames at post-frame attach. Remaining cause = **state-restoration timing between `EarthFilterPrefs` and the renderer-toggle default** — the overlay resets to OFF on (re)load before/instead of the restored selection reaching the renderer, and active annotation/animation frames aren't re-pushed on mount/nav. Files to look at: `lib/widgets/earth/earth_visualization_stage.dart`, `lib/widgets/earth2d/earth2d_globe_view.dart`, `lib/pages/earth/earth_tab.dart` (`_overlayUserSet` / the prefs-restoration path).

## The fix (output/render lifecycle only)
On Earth **mount, resume, AND 2D↔3D switch**: after the renderer attaches, re-apply the CURRENT active overlay + animation + annotation frames from the restored `EarthFilterState` to the renderer. Eliminate the chip↔render mismatch — the rule is **the renderer always reflects the active filter state**: if the chip shows a layer, that layer is painted; if the intended default is "no overlay," then the chip must also show none (don't claim a layer you're not drawing). Pick the intended entry default explicitly (restore-last-layer-and-paint is the better UX given the "no globe" complaint) and make state + render agree.

Do NOT touch deploy automation, governance catalogs, secrets, or the scoring. Keep FIX-1/3/4/5 intact.

## MANDATORY device verification (the reason this was deferred)
Run `flutter run -d chrome`. For EACH of: (1) hard reload, (2) About→XYZ, (3) 2D→3D — capture a **before (broken)** and **after (fixed)** screenshot showing the active layer painting within ~2s and the chip matching the render. Commit only with the before/after pairs attached. `flutter analyze` + the earth widget tests green. Rebase before merge; do NOT deploy.

## Launch (on your machine — must run the app)
```powershell
cd C:\Projects\dev-kitt\apps\rand0m
git fetch origin
git worktree add -b earth/fix-2 ../../worktrees/rand0m-fix2 origin/main   # AFTER consolidate-all is pushed
```
Paste to one fresh agent:
```
Work ONLY in worktrees/rand0m-fix2 (branch earth/fix-2, off the consolidated origin/main). Full spec: tooling/scripts/EARTH-FIX2-ONDEVICE.md. Render/lifecycle only — do not touch deploy automation, governance, secrets, or scoring; keep Earth FIX-1/3/4/5 intact.
Fix the active-layer reattach race: on Earth mount, resume, and 2D↔3D switch, re-apply the active overlay/animation/annotation frames from the restored EarthFilterState so the renderer always matches the active-filter chips. Reconcile the reload default so state and render agree (recommend restore-last-layer-and-paint). Files: earth_visualization_stage.dart, earth2d_globe_view.dart, earth_tab (_overlayUserSet/restoration).
MANDATORY: `flutter run -d chrome`; for hard reload, About→XYZ, and 2D→3D capture before/after screenshots proving the layer paints within ~2s and the chip matches. Commit only with those pairs. flutter analyze + earth tests green. Rebase before merge. Do NOT deploy.
```
