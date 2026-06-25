# TASK (EARTH — active chips, snapshot strip-down, UI space). One fresh agent, serial.

Earth-page files are rebase-before-merge; do not run in parallel with the polish agent. `flutter analyze` + earth widget tests must pass (update the test keys noted below). Keep the OPAQUE overlay rule (no base-bleed) and the intentional Cesium terrain/imagery (free Ion tier) — don't "fix" either.

---

## Part A — Active-state chips (bottom-right) show what's TRULY active. 3 rows max.

**Now:** `_EarthActiveFilterIndicators` in `widgets/earth/earth_nullschool_chrome.dart` renders 3 rows = region · time · layer. Time **duplicates** the timeline dot-line right below it; mode / animation / annotation / globe-type aren't shown.

**Fit 6 dimensions into 3 rows** by pairing, and show each only when active (kill duplication):
- **Row 1 — place + view:** region label + a small `2D`/`3D` pill (`render2d ? '2D' : '3D'`).
- **Row 2 — mode (the scoring lens):** mode icon + label (e.g. "Human Footprint").
- **Row 3 — active visuals:** compact `icon + short-label` for each of **overlay / animation / annotation** that is ON, joined by " · " (e.g. `🌡 SST · 🌬 Wind · 🐾 Species`). If none on → "No layers".
- **Drop the time row** — the timeline dot-line directly below already shows the selected window. Removing it kills the duplicate you flagged.

**Wiring:**
- Call site: `widgets/earth/earth_workstation_shell.dart` (~line 426). It already has `overlayLayerId`, `animateLayerId`, `annotationLayerId`, `render2d`, `selectedRegion`.
- It does **not** carry the selected mode. Add a `selectedMode` (`EarthNullschoolMode`) field to `EarthWorkstationShell` and thread it from the host page (`pages/earth/earth_tab.dart`, where the mode state lives). Mode enum + labels: `models/earth/earth_nullschool_taxonomy.dart`; icons via the existing `_iconForNullschoolMode` in the chrome file.
- Rewrite `_EarthActiveFilterIndicators` params: drop `selectedTimeWindow` + `selectedLayerDetail`; add `selectedMode`, `overlayLayerId`, `animateLayerId`, `annotationLayerId`, `render2d` (keep `selectedRegion`, `compact`). Resolve each layer id → label + icon via the catalog (`EarthSourceRegistry.layers` + `_iconForEarthLayer`, already in this file). Use SHORT labels + ellipsize so row 3 fits ~180px.
- Keep flat-glass decoration + `compact`. Keep test key `earth-active-filter-region`; replace `-time`/`-layer` with `-mode`/`-visuals`/`-globe` and update the widget tests asserting them.

**Single source of truth:** these chips must read the SAME selected-state the filter panel writes — no parallel copy. A chip disagreeing with the panel IS the duplicate/inconsistent-data bug to eliminate.

---

## Part B — Snapshot popup returns ONLY the clicked dot. Search stays in Data View.

**File:** `widgets/earth/earth_layer_snapshot_card_view.dart`.

Remove the in-popup browse entirely:
- Delete `_EarthClusterRecordsBrowse`, `_EarthClusterRecordsBrowseState`, `_ClusterRecordRow`, `_ClusterRecord`, `_recordsAssetByLayer`, `_clusterCountry` — all the search + member-list machinery.
- In `EarthLayerSnapshotCardView.build`: drop the `canBrowse`/`asset`/`country` branch. For a **cluster** (count>1) → count headline (`N <noun>`) + caption + `_browseHintRow(wording)` (the Data View pointer). For a **single dot** → its own governed fields only (valueText + label + caption) — everything about THAT dot, nothing more.
- Keep `_browseHintRow` and the `earth-layer-snapshot-browse` key. Remove tests asserting `earth-cluster-browse-search` / `-list` / `-clear`.

**Result:** clicking a dot returns that dot's data; a cluster summarizes and points to Data View for the full searchable list (already there). No "all data" dump in the popup.

**Cheap polish:** with the `ingest_species_locations` common-name change, a single-species snapshot should headline the common name with the scientific name as subtitle (same precedence as the records browser).

---

## Part C — Tighten the UI so the globe gets more space (all formats)

Highest-impact first; 1–3 are the big wins:
1. **Collapse `earth+` to an icon rail by default** — the left panel is the single biggest space cost (~300px). Show slot icons only; expand to the full labeled panel on tap/hover. (The `earth+` pill + filter sheet already exist — make *collapsed* the default.)
2. **Fold Scale + Source + Projection into one collapsible "ⓘ data" disclosure** at the panel foot — reference, not primary controls. Saves ~3 rows.
3. **Merge the two top bars** — Globe/Data segmented toggle + the "Ask @scient1st" field on ONE row (toggle left, field flexes). Reclaims a full row of height.
4. **Auto-dim chrome on globe interaction** (nullschool-style): while dragging/zooming, fade score + chips + panel to low opacity; restore on release.
5. **On narrow/mobile, float panels OVER the globe (don't inset/push)** and collapse them to pills; globe fills the viewport. Use the existing `narrow`/`compact` flag.
6. **Shrink the score ring on narrow to a tappable pill** that expands to the dual ring on tap.

---

## Sequencing
Parts A & B are independent files → do first. Part C touches shell/panel layout → do last. Commit A, B, C as separate commits so each can be validated/reverted independently.
