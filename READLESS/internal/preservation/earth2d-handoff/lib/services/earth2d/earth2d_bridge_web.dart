import 'dart:convert';
import 'dart:js_interop';
import 'dart:ui_web' as ui_web;

import 'package:rand0m/models/earth/earth_flow_field.dart';
import 'package:rand0m/models/earth/earth_scalar_grid.dart';
import 'package:web/web.dart' as web;

import 'earth2d_bridge.dart';

/// Browser bridge for the 2D-canvas renderer. Mirrors earth_cesium_bridge_web:
/// registers the platform-view factory once (the registry is GLOBAL and
/// re-registering a viewType throws), then drives the disjoint `window.__earth2d`
/// JS shim which attaches a `<canvas>` over the host div and runs the d3-geo +
/// Canvas2D renderers (web/earth2d_*.js). Every interop call is fail-closed.
Earth2dBridge createEarth2dBridge({required String viewType}) =>
    _Earth2dWebBridge(viewType);

@JS('window')
external JSObject get _window;

final class _Earth2dWebBridge implements Earth2dBridge {
  _Earth2dWebBridge(this._viewType);

  final String _viewType;

  // Per-viewType (NOT per-instance): a new bridge is built on every Earth
  // re-mount, and registerViewFactory throws on a duplicate viewType.
  static final Set<String> _registeredViewTypes = <String>{};

  String get _hostId => 'earth2d-host-$_viewType';

  JSObject? get _shim => _window.getProperty('__earth2d'.toJS) as JSObject?;

  @override
  Future<bool> attach(String hostId) async {
    if (!_registeredViewTypes.contains(_viewType)) {
      ui_web.platformViewRegistry.registerViewFactory(_viewType, (int _) {
        final host = web.HTMLDivElement()
          ..id = _hostId
          ..setAttribute('data-earth-renderer', 'earth2d');
        host.style
          ..width = '100%'
          ..height = '100%'
          ..backgroundColor = '#05070c';
        return host as JSObject;
      });
      _registeredViewTypes.add(_viewType);
    }
    final shim = _shim;
    if (shim == null) return false;
    try {
      final result =
          (shim.callMethod<JSString>('attach'.toJS, _hostId.toJS)).toDart;
      return result == 'attached';
    } catch (_) {
      return false;
    }
  }

  void _sync(String renderer, String payload) {
    try {
      _shim?.callMethod<JSAny?>(
        'sync'.toJS,
        _hostId.toJS,
        renderer.toJS,
        payload.toJS,
      );
    } catch (_) {}
  }

  @override
  void setProjection(String projectionId) {
    try {
      _shim?.callMethod<JSAny?>(
        'setProjection'.toJS,
        _hostId.toJS,
        projectionId.toJS,
      );
    } catch (_) {}
  }

  @override
  void syncScalarField(EarthScalarFrame frame) =>
      _sync('scalar', jsonEncode(frame.toBridgeJson()));

  @override
  void syncFlowField(EarthFlowFieldFrame frame) {
    final grid = frame.flowGrid;
    _sync(
      'flow',
      jsonEncode({
        'animate': frame.animate,
        'kind': frame.flowKind ?? 'wind',
        'hd': frame.hd,
        if (grid != null) 'label': grid.label,
        if (grid != null) 'grid': grid.toBridgeJson(),
      }),
    );
  }

  @override
  void syncPointField(EarthPointFrame frame) =>
      _sync('point', jsonEncode(frame.toBridgeJson()));

  @override
  void suspend() {
    try {
      _shim?.callMethod<JSAny?>('suspend'.toJS, _hostId.toJS);
    } catch (_) {}
  }

  @override
  void resume() {
    try {
      _shim?.callMethod<JSAny?>('resume'.toJS, _hostId.toJS);
    } catch (_) {}
  }

  @override
  void dispose() {
    try {
      _shim?.callMethod<JSAny?>('detach'.toJS, _hostId.toJS);
    } catch (_) {}
  }
}
