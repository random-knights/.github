import 'package:rand0m/models/earth/earth_flow_field.dart';
import 'package:rand0m/models/earth/earth_scalar_grid.dart';

/// READ-ONLY consumer bridge for the 2D-canvas renderer.
///
/// Mirrors the Cesium bridge's sync surface but targets the DISJOINT
/// `window.__earth2d` JS shim + `web/earth2d_*.js` renderers. It consumes the
/// SAME resolved frames the Cesium view consumes (selection + motion budget
/// already applied Dart-side) and never imports or edits an Agent-A file.
abstract interface class Earth2dBridge {
  /// Register the platform-view factory + ask the JS shim to attach a canvas to
  /// the host div. Returns true once the renderer is live.
  Future<bool> attach(String hostId);

  /// Switch projection (one of Earth2dProjections.ids).
  void setProjection(String projectionId);

  void syncScalarField(EarthScalarFrame frame);
  void syncFlowField(EarthFlowFieldFrame frame);
  void syncPointField(EarthPointFrame frame);

  /// Motion budget: stop/start the render loop when hidden.
  void suspend();
  void resume();

  void dispose();
}
