# earth2d — Flutter integration (toggle, flag OFF)

The togglable 2D renderer, wired to mirror the Cesium bridge pattern. **Flag is
OFF by default — zero runtime change until you flip it.** The Dart here is
authored to match the verified Cesium plumbing (`registerViewFactory` →
`window.__earth2d` sync) but was **not** `flutter analyze`d in this sandbox (no
Flutter) — run analyze/test on Windows. The 5 JS files are `node --check` clean.

## File map (drop into `worktrees/rand0m-earth2d/`)

```
lib/services/earth2d/earth2d_flags.dart            # const flag (default OFF)
lib/services/earth2d/earth2d_bridge.dart           # interface
lib/services/earth2d/earth2d_bridge_stub.dart      # VM no-op
lib/services/earth2d/earth2d_bridge_web.dart       # platform-view + window.__earth2d interop
lib/services/earth2d/earth2d_bridge_factory.dart   # conditional export
lib/widgets/earth2d/earth2d_globe_view.dart        # HtmlElementView host; drives frames
lib/widgets/earth2d/earth2d_renderer_toggle.dart   # picks Cesium OR 2D (never both)
web/earth2d_projections.js  web/earth2d_scalar.js  web/earth2d_flow.js
web/earth2d_points.js       web/earth2d_mount.js   # window.__earth2d shim
```

## 1. index.html — load the renderer stack (after d3/topojson, before mount)

Vendor d3-geo + topojson into `web/earth2d/vendor/` (like `web/cesium/`), then:

```html
<script defer src="earth2d/vendor/d3.min.js"></script>
<script defer src="earth2d/vendor/topojson-client.min.js"></script>
<script defer src="earth2d_projections.js"></script>
<script defer src="earth2d_scalar.js"></script>
<script defer src="earth2d_flow.js"></script>
<script defer src="earth2d_points.js"></script>
<script defer src="earth2d_mount.js"></script>
```

## 2. The one serialized Earth-page edit (call-site swap)

Where the page mounts the globe today:

```dart
EarthCesiumGlobeView(/* ...existing args... */)
```

wrap it (additive — OFF returns the Cesium view unchanged):

```dart
EarthRendererToggle(
  cesium: EarthCesiumGlobeView(/* ...existing args... */),
  earth2d: (_) => Earth2dGlobeView(
    scalarFrame: resolvedScalarFrame,   // the SAME frames the page already
    flowFrame: resolvedFlowFrame,       // resolves + feeds the Cesium bridge
    pointFrame: resolvedPointFrame,
    projectionId: 'orthographic',
    stageVisible: stageVisible,
  ),
)
```

This is the lane's only Earth-page change — coordinate it with the Earth agent
under rebase-before-merge (a textual merge of `earth_tab.dart` is a false
positive). Everything else is new files.

## 3. Click snapshots

The shim emits `window` `CustomEvent('earth2d-pick')` with the governed snapshot
JSON — the same shape the Cesium path delivers via `earth-layer-pick`. Reuse the
existing `EarthPickedSnapshot.notifier` plumbing (parse + assign), or listen in
`Earth2dGlobeView` and forward.

## 4. Filter-chrome parity (done in the widget)

The 2D path consumes the resolved frames, so the nullschool filter slots
(`animate` / `overlay` / `annotation`) drive it unchanged. `Earth2dGlobeView`
also republishes `EarthOverlayScale.fromGrid(scalarFrame.grid, paletteOverride:
scalarFrame.paletteOverride)` to `EarthCesiumGlobeView.activeOverlayScale` (the
same notifier the scale-bar chrome listens to) on every scalar-frame change, and
nulls it on dispose. So the value-key / scale-bar chrome is identical with **no
chrome edits**. The toggle keeps the two renderers mutually exclusive, so only
one ever drives that notifier.

## 5. Turn it on + ship

```
flutter run -d chrome --dart-define=EARTH2D_RENDERER=true   # device-pass
powershell -File C:\Projects\dev-kitt\tooling\scripts\validate-earth-fast.ps1
# green -> rebase onto origin/main, ff-merge, push earth/earth2d-thin-proof via github-devbot, trigger wf80
```

## Verified vs. not

- JS (5 files): `node --check` clean; renderers headlessly verified (scalar 6/6,
  flow 8/8, points 11/11); 8 projections exercised live.
- Dart (7 files): authored to mirror `earth_cesium_bridge_web.dart` idioms
  (`dart:js_interop`, `dart:ui_web` `registerViewFactory`, `package:web`,
  `jsonEncode(frame.toBridgeJson())`, conditional stub/web export). **Run
  `flutter analyze` on Windows before commit** — not analyzable here.

## Boundary

New files only. Never edit `lib/**/earth/**`, `web/earth_*.js`, or
`lib/models/earth/**` (import per §23). The toggle keeps exactly-one-renderer.
