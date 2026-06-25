/*
 * earth2d_points.js — 2D-canvas POINT-MARKER renderer + hit-test (build-out #7).
 *
 * Consumes the LIVE point contract READ-ONLY: an EarthPointSet bridge payload
 * { palette, domain, valueMin, valueMax, units, label, caption, isLive,
 *   points:[ {lat, lon, value, label?, count?} ] }.
 * Markers are sized/coloured by value, horizon-culled on globe projections, and
 * clusters (count>1) draw larger with a ring + a "browse in Data View" snapshot
 * path — mirroring the live point renderer + EarthScalarPoint.markerScale curve
 * (0.4 + 0.6*sqrt(normalize(value))).
 *
 * render() returns the on-screen marker geometry so the host can hit-test a
 * click and emit the governed snapshot (no new data, just the clicked record).
 * File-disjoint port: never imports/edits web/earth_point_field.js or Cesium.
 */
(function (global) {
  'use strict';

  var DEG = Math.PI / 180;

  // Fallback fire ramp if Earth2dScalar (shared palettes) is not loaded.
  var FIRE = [[0, [255, 245, 150]], [0.4, [255, 150, 40]], [0.7, [225, 50, 20]], [1, [140, 12, 8]]];
  function lerpRamp(stops, t) {
    if (t <= 0) return stops[0][1];
    for (var i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i], f = (t - a[0]) / ((b[0] - a[0]) || 1);
        return [Math.round(a[1][0] + (b[1][0] - a[1][0]) * f),
                Math.round(a[1][1] + (b[1][1] - a[1][1]) * f),
                Math.round(a[1][2] + (b[1][2] - a[1][2]) * f)];
      }
    }
    return stops[stops.length - 1][1];
  }
  function paletteColor(id, t) {
    if (global.Earth2dScalar && global.Earth2dScalar.paletteColor) return global.Earth2dScalar.paletteColor(id, t);
    return lerpRamp(FIRE, t);
  }

  function normalize(v, lo, hi) { var s = hi - lo; if (s <= 0) return 0; var t = (v - lo) / s; return t < 0 ? 0 : (t > 1 ? 1 : t); }
  function markerScale(t) { return 0.4 + 0.6 * Math.sqrt(t); }

  function onFront(projection, lon, lat) {
    var r = projection.rotate ? projection.rotate() : null;
    if (!r) return true;
    var clip = projection.clipAngle ? projection.clipAngle() : null;
    if (clip == null || clip >= 180) return true;
    var lon0 = -r[0], lat0 = -r[1];
    var cosc = Math.sin(lat0 * DEG) * Math.sin(lat * DEG) +
      Math.cos(lat0 * DEG) * Math.cos(lat * DEG) * Math.cos((lon - lon0) * DEG);
    return cosc >= Math.cos((clip || 90) * DEG);
  }

  // Draw the point set; return [{x,y,r,point}] for hit-testing (nearest-first by
  // larger markers last so clicks favour the visually-topmost).
  function render(ctx, projection, ps, opts) {
    opts = opts || {};
    var pal = opts.palette || ps.palette || 'fire';
    var lo = ps.valueMin != null ? ps.valueMin : 0;
    var hi = ps.valueMax != null ? ps.valueMax : 1;
    var baseR = opts.baseRadius || 5;
    var pts = ps.points || [];
    var hits = [];
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (!onFront(projection, p.lon, p.lat)) continue;
      var s = projection([p.lon, p.lat]);
      if (!s || !isFinite(s[0]) || !isFinite(s[1])) continue;
      var t = normalize(p.value, lo, hi);
      var cluster = (p.count || 1) > 1;
      var r = baseR * markerScale(t) * (cluster ? 1.7 : 1);
      var c = paletteColor(pal, t);
      ctx.beginPath(); ctx.arc(s[0], s[1], r, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.9)';
      ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(10,14,22,0.65)'; ctx.stroke();
      if (cluster) {
        ctx.beginPath(); ctx.arc(s[0], s[1], r + 2.5, 0, 6.2832);
        ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.55)'; ctx.stroke();
      }
      hits.push({ x: s[0], y: s[1], r: r + 3, point: p, cluster: cluster });
    }
    return hits;
  }

  // Nearest marker within its radius (topmost wins on ties).
  function hitTest(hits, x, y) {
    var best = null, bestD = Infinity;
    for (var i = 0; i < hits.length; i++) {
      var h = hits[i], dx = x - h.x, dy = y - h.y, d = dx * dx + dy * dy;
      if (d <= h.r * h.r && d <= bestD) { bestD = d; best = h; }
    }
    return best;
  }

  // The governed snapshot for a clicked marker: a single record's detail, or a
  // cluster's "browse in Data View" path (never invents data).
  function snapshot(hit, ps) {
    if (!hit) return null;
    var p = hit.point;
    if (hit.cluster) {
      return { kind: 'cluster', count: p.count, lat: p.lat, lon: p.lon,
        label: (p.count) + ' records', action: 'browse in Data View',
        caption: ps.caption || ps.label, isLive: !!ps.isLive };
    }
    return { kind: 'record', value: p.value, units: ps.units || '', lat: p.lat, lon: p.lon,
      label: p.label || ps.label, caption: ps.caption || ps.label, isLive: !!ps.isLive };
  }

  global.Earth2dPoints = {
    normalize: normalize, markerScale: markerScale, paletteColor: paletteColor,
    render: render, hitTest: hitTest, snapshot: snapshot, version: '0.1.0-points'
  };
})(typeof self !== 'undefined' ? self : this);
