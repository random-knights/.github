import 'package:flutter/widgets.dart';

import 'package:rand0m/services/earth2d/earth2d_flags.dart';

/// Picks EXACTLY ONE renderer for Globe View — the existing Cesium view or the
/// new 2D-canvas view — never both (preserves the exactly-one-renderer rule).
///
/// Default-OFF: when [kEarth2dRendererEnabled] is false this returns [cesium]
/// UNCHANGED, so the Earth page behaves exactly as today. This widget is the
/// lane's SINGLE, additive Earth-page integration point: the page swaps its
/// direct `EarthCesiumGlobeView(...)` for
/// `EarthRendererToggle(cesium: EarthCesiumGlobeView(...), earth2d: (_) => Earth2dGlobeView(...))`.
/// That one-line call-site change is the serialized edit (rebase-before-merge
/// with the Earth agent); everything else in the lane is new files.
class EarthRendererToggle extends StatelessWidget {
  const EarthRendererToggle({
    super.key,
    required this.cesium,
    required this.earth2d,
    this.enabledOverride,
  });

  /// The existing Cesium globe view (rendered unchanged when the flag is off).
  final Widget cesium;

  /// Builds the 2D-canvas view; only invoked when the flag is on.
  final WidgetBuilder earth2d;

  /// Optional runtime override (e.g. a Remote Config value) — when null the
  /// compile-time flag decides.
  final bool? enabledOverride;

  @override
  Widget build(BuildContext context) {
    final on = enabledOverride ?? kEarth2dRendererEnabled;
    return on ? earth2d(context) : cesium;
  }
}
