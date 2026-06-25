/*
 * earth2d_flow.js — 2D-canvas PARTICLE-FLOW renderer (north-star build-out #6).
 *
 * Consumes the LIVE flow contract READ-ONLY: an EarthWindGrid u/v bridge payload
 * { nx, ny, lon0, lat0, dlon, dlat, u[nx*ny], v[nx*ny], maxSpeed, isLive, caption }.
 * ONE particle engine serves both wind and ocean-currents (exactly like the live
 * EarthFlowFieldFrame: palette chosen by `flowKind`). Projection is injected, so
 * particles advect in GEOGRAPHIC space (sample u/v -> step lon/lat -> reproject),
 * which is correct under all 8 projections — the nullschool/cambecc approach.
 *
 * Honors the motion budget (EarthFlowFieldMotionBudget): step() suspends advection
 * when dragging / reduced-motion / hidden, but still repaints so the field stays
 * put. Trails fade via a translucent wipe each frame.
 *
 * File-disjoint port: never imports/edits web/earth_flow_field.js or Cesium.
 */
(function (global) {
  'use strict';

  var DEG = Math.PI / 180;

  var PALETTES = {
    wind: [[0, [44, 92, 84]], [0.4, [96, 170, 120]], [0.72, [205, 222, 140]], [1, [245, 250, 234]]],
    ocean: [[0, [18, 58, 92]], [0.5, [40, 150, 172]], [1, [186, 240, 236]]]
  };
  function ramp(stops, t) {
    if (t <= 0) return stops[0][1];
    for (var i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i], f = (t - a[0]) / ((b[0] - a[0]) || 1);
        return [(a[1][0] + (b[1][0] - a[1][0]) * f) | 0,
                (a[1][1] + (b[1][1] - a[1][1]) * f) | 0,
                (a[1][2] + (b[1][2] - a[1][2]) * f) | 0];
      }
    }
    return stops[stops.length - 1][1];
  }

  // Bilinear (u,v) sample of an EarthWindGrid bridge payload. lon wraps, lat
  // clamps — mirrors EarthWindGrid.sample exactly.
  function sampleUV(g, lon, lat) {
    var nx = g.nx, ny = g.ny;
    var fx = ((lon - g.lon0) / g.dlon) % nx; if (fx < 0) fx += nx;
    var x0 = Math.floor(fx) % nx, x1 = (x0 + 1) % nx, tx = fx - Math.floor(fx);
    var fy = (lat - g.lat0) / g.dlat; if (fy < 0) fy = 0; else if (fy > ny - 1) fy = ny - 1;
    var y0 = Math.floor(fy), y1 = Math.min(y0 + 1, ny - 1), ty = fy - y0;
    var u = g.u, v = g.v;
    function bl(a) { var t = a[y0 * nx + x0] + (a[y0 * nx + x1] - a[y0 * nx + x0]) * tx;
      var b = a[y1 * nx + x0] + (a[y1 * nx + x1] - a[y1 * nx + x0]) * tx; return t + (b - t) * ty; }
    return [bl(u), bl(v)];
  }

  function Engine(opts) {
    opts = opts || {};
    this.count = opts.count || 2600;
    this.maxLife = opts.maxLife || 90;
    this.speedScale = opts.speedScale || 0.10;
    this.fade = opts.fade != null ? opts.fade : 0.10;
    this.flowKind = 'wind';
    this.grid = null;
    this.projection = null;
    this.ps = [];
  }
  Engine.prototype.setGrid = function (grid, flowKind) {
    this.grid = grid; this.flowKind = flowKind || 'wind';
    if (grid && !grid.maxSpeed) {
      var m = 0; for (var k = 0; k < grid.u.length; k++) { var s = grid.u[k] * grid.u[k] + grid.v[k] * grid.v[k]; if (s > m) m = s; }
      grid.maxSpeed = Math.sqrt(m) || 1;
    }
  };
  Engine.prototype.setProjection = function (p) { this.projection = p; };
  Engine.prototype._spawn = function (pt) {
    pt = pt || {};
    pt.lon = Math.random() * 360 - 180;
    pt.lat = Math.asin(Math.random() * 2 - 1) / DEG;
    pt.age = (Math.random() * this.maxLife) | 0;
    pt.px = null; pt.py = null;
    return pt;
  };
  Engine.prototype.reset = function () { this.ps = []; for (var i = 0; i < this.count; i++) this.ps.push(this._spawn({})); };

  // Advance + paint one frame. budget: {dragging, reducedMotion, hidden}.
  Engine.prototype.step = function (ctx, W, H, budget) {
    var g = this.grid, proj = this.projection;
    if (!proj) return;
    var animate = !(budget && (budget.dragging || budget.reducedMotion || budget.hidden));
    if (!this.ps.length) this.reset();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(6,10,16,' + this.fade + ')';
    ctx.fillRect(0, 0, W, H);
    if (!g) return;
    var stops = PALETTES[this.flowKind] || PALETTES.wind;
    var maxS = g.maxSpeed || 1;
    ctx.lineWidth = 1.1;
    for (var i = 0; i < this.ps.length; i++) {
      var p = this.ps[i];
      var scr = proj([p.lon, p.lat]);
      var vis = scr && isFinite(scr[0]) && isFinite(scr[1]) && this._onFront(p.lon, p.lat);
      if (animate) {
        var uv = sampleUV(g, p.lon, p.lat);
        var sp = Math.sqrt(uv[0] * uv[0] + uv[1] * uv[1]);
        if (vis && p.px != null && scr) {
          var dx = scr[0] - p.px, dy = scr[1] - p.py;
          if (dx * dx + dy * dy < 900) {
            var c = ramp(stops, Math.min(1, sp / maxS));
            ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.85)';
            ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(scr[0], scr[1]); ctx.stroke();
          }
        }
        var coslat = Math.cos(p.lat * DEG); if (coslat < 0.2) coslat = 0.2;
        p.lon += uv[0] * this.speedScale / coslat;
        p.lat += uv[1] * this.speedScale;
        if (p.lon > 180) p.lon -= 360; else if (p.lon < -180) p.lon += 360;
        if (p.lat > 89) p.lat = 89; else if (p.lat < -89) p.lat = -89;
        if (++p.age > this.maxLife) { this._spawn(p); continue; }
      }
      p.px = vis && scr ? scr[0] : null; p.py = vis && scr ? scr[1] : null;
    }
    ctx.globalCompositeOperation = 'source-over';
  };
  // Horizon cull for globe projections: a point is on the near face when its
  // angular distance from the projection centre < 90deg. For full-frame
  // projections the projection's own clip handles visibility, so default true.
  Engine.prototype._onFront = function (lon, lat) {
    var r = this.projection.rotate ? this.projection.rotate() : null;
    if (!r) return true;
    var clip = this.projection.clipAngle ? this.projection.clipAngle() : null;
    if (clip == null || clip >= 180) return true;
    var lon0 = -r[0], lat0 = -r[1];
    var cosc = Math.sin(lat0 * DEG) * Math.sin(lat * DEG) +
      Math.cos(lat0 * DEG) * Math.cos(lat * DEG) * Math.cos((lon - lon0) * DEG);
    return cosc >= Math.cos((clip || 90) * DEG);
  };

  global.Earth2dFlow = {
    PALETTES: PALETTES, ramp: ramp, sampleUV: sampleUV,
    create: function (opts) { return new Engine(opts); },
    version: '0.1.0-flow'
  };
})(typeof self !== 'undefined' ? self : this);
