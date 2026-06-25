import 'package:flutter/widgets.dart';

import 'package:rand0m/models/earth/earth_flow_field.dart';
import 'package:rand0m/models/earth/earth_scalar_grid.dart';
import 'package:rand0m/services/earth2d/earth2d_bridge.dart';
import 'package:rand0m/services/earth2d/earth2d_bridge_factory.dart';
// Read-only use of the Earth agent's PUBLISHED scale notifier (not an edit): the
// filter-panel scale bar listens to it, so republishing from the 2D view gives
// chrome parity with zero chrome changes. The toggle keeps the renderers
// mutually exclusive, so only one ever drives this notifier.
import 'package:rand0m/widgets/earth/earth_cesium_globe_view.dart'
    show EarthCesiumGlobeView;

/// 2D-canvas globe view (web).
///
/// Hosts an [HtmlElementView] whose div the `window.__earth2d` shim fills with a
/// `<canvas>` + d3-geo renderer, then drives it from the SAME resolved frames the
/// Cesium view consumes (the Earth page resolves these once and feeds both
/// renderers). Default-OFF behind the flag — mounted only by
/// [EarthRendererToggle]. Never edits Agent-A files; consumes models read-only.
class Earth2dGlobeView extends StatefulWidget {
  const Earth2dGlobeView({
    super.key,
    this.scalarFrame = EarthScalarFrame.empty,
    this.flowFrame = EarthFlowFieldFrame.empty,
    this.pointFrame = EarthPointFrame.empty,
    this.projectionId = 'orthographic',
    this.stageVisible = true,
  });

  final EarthScalarFrame scalarFrame;
  final EarthFlowFieldFrame flowFrame;
  final EarthPointFrame pointFrame;
  final String projectionId;
  final bool stageVisible;

  @override
  State<Earth2dGlobeView> createState() => _Earth2dGlobeViewState();
}

class _Earth2dGlobeViewState extends State<Earth2dGlobeView> {
  static int _seq = 0;
  late final String _viewType = 'earth2d-view-${_seq++}';
  late final Earth2dBridge _bridge = createEarth2dBridge(viewType: _viewType);
  bool _attached = false;

  @override
  void initState() {
    super.initState();
    // Publish the scale-bar value scale immediately (chrome is independent of
    // the canvas attaching).
    _publishOverlayScale();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      _attached = await _bridge.attach(_viewType);
      if (!mounted || !_attached) return;
      _bridge.setProjection(widget.projectionId);
      _pushAllFrames();
      if (!widget.stageVisible) _bridge.suspend();
    });
  }

  void _pushAllFrames() {
    _bridge
      ..syncScalarField(widget.scalarFrame)
      ..syncFlowField(widget.flowFrame)
      ..syncPointField(widget.pointFrame);
  }

  /// Filter-chrome parity: republish the active scalar overlay's value scale to
  /// the SAME notifier the scale-bar chrome listens to — mirrors the Cesium
  /// view's slice-5a publish, with the canonical per-layer palette the frame
  /// already carries. Null when no scalar overlay is active.
  void _publishOverlayScale() {
    final f = widget.scalarFrame;
    EarthCesiumGlobeView.activeOverlayScale.value = (f.active && f.grid != null)
        ? EarthOverlayScale.fromGrid(f.grid!, paletteOverride: f.paletteOverride)
        : null;
  }

  @override
  void didUpdateWidget(covariant Earth2dGlobeView old) {
    super.didUpdateWidget(old);
    if (!identical(old.scalarFrame, widget.scalarFrame)) _publishOverlayScale();
    if (!_attached) return;
    if (old.projectionId != widget.projectionId) {
      _bridge.setProjection(widget.projectionId);
    }
    if (!identical(old.scalarFrame, widget.scalarFrame)) {
      _bridge.syncScalarField(widget.scalarFrame);
    }
    if (!identical(old.flowFrame, widget.flowFrame)) {
      _bridge.syncFlowField(widget.flowFrame);
    }
    if (!identical(old.pointFrame, widget.pointFrame)) {
      _bridge.syncPointField(widget.pointFrame);
    }
    if (old.stageVisible != widget.stageVisible) {
      widget.stageVisible ? _bridge.resume() : _bridge.suspend();
    }
  }

  @override
  void dispose() {
    // Clear our published scale (the Cesium view republishes on remount).
    EarthCesiumGlobeView.activeOverlayScale.value = null;
    _bridge.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return HtmlElementView(
      key: Key('earth2d-stage-$_viewType'),
      viewType: _viewType,
    );
  }
}
