/*
 * earth2d_scalar.js — 2D-canvas SCALAR/heatmap renderer (north-star track, thin proof).
 *
 * The ratified north-star: RETIRE CESIUM -> full 2D-canvas renderer (nullschool/
 * cambecc architecture). This module renders an `earth.scalarfield.v1` grid
 * per-pixel onto a 2D <canvas> under ANY injected d3-geo projection (orthographic
 * for the thin proof; the same code serves all 8 projections at build-out).
 *
 * It MIRRORS — byte-faithfully — the palette LUT + bilinear grid sample + alpha
 * curve of the LIVE web/earth_scalar_field.js (Agent A). It NEVER imports or edits
 * Cesium or any Agent-A file; it is a file-disjoint parallel port. A lock-step
 * golden test (build-out) guards palette drift.
 *
 * KEY DIFFERENCE FROM THE CESIUM PATH (and why this is NOT the "superseded raster"):
 * the Cesium renderer builds a projection-INDEPENDENT equirect texture and lets
 * the GPU project it onto the sphere. Here the CPU owns the projection: per output
 * pixel we projection.invert([x,y]) -> [lon,lat] -> sample. That is precisely the
 * ratified nullschool/cambecc design. The "do-not-reintroduce raster" lesson was
 * Cesium-limb-specific and does not apply to a CPU-projected 2D canvas.
 *
 * MAIN RISK = CPU per-pixel reprojection. Mitigation here: a DISTORTION-GRID cache
 * — invert is evaluated on a coarse lattice (every `step` px) and lon/lat are
 * bilerped between nodes; cells that touch the globe limb (a null corner) fall
 * back to exact per-pixel invert so the edge stays crisp. Pair with a Web Worker
 * (build-out) so rotate/zoom stays 60fps.
 */
(function (global) {
  'use strict';

  // ---- Palette ramps — byte-faithful with web/earth_scalar_field.js PALETTES
  //      and EarthRendererPalettes (Dart). t in 0..1 -> [r,g,b]. -------------
  var PALETTES = {
    aqi: [
      [0.0, [0, 228, 0]], [0.25, [255, 255, 0]], [0.5, [255, 126, 0]],
      [0.75, [255, 0, 0]], [1.0, [143, 63, 151]]
    ],
    thermal: [
      [0.0, [27, 12, 64]], [0.12, [32, 48, 192]], [0.27, [0, 180, 210]],
      [0.42, [40, 180, 90]], [0.56, [235, 220, 60]], [0.70, [240, 140, 30]],
      [0.82, [220, 40, 30]], [0.92, [200, 60, 140]], [1.0, [250, 240, 245]]
    ],
    fire: [
      [0.0, [255, 245, 150]], [0.4, [255, 150, 40]], [0.7, [225, 50, 20]],
      [1.0, [140, 12, 8]]
    ],
    veg: [
      [0.0, [90, 60, 16]], [0.3, [156, 122, 40]], [0.55, [200, 200, 75]],
      [0.78, [90, 170, 50]], [1.0, [10, 110, 30]]
    ],
    mag: [
      [0.0, [10, 10, 40]], [0.35, [40, 60, 140]], [0.6, [40, 120, 200]],
      [0.8, [50, 200, 210]], [1.0, [230, 250, 255]]
    ],
    violet: [
      [0.0, [22, 6, 48]], [0.35, [90, 30, 140]], [0.65, [170, 70, 200]],
      [0.85, [220, 150, 240]], [1.0, [245, 225, 255]]
    ],
    teal: [
      [0.0, [4, 32, 36]], [0.4, [16, 110, 110]], [0.7, [30, 180, 165]],
      [1.0, [150, 250, 225]]
    ],
    ember: [
      [0.0, [40, 18, 4]], [0.4, [160, 80, 18]], [0.7, [220, 140, 30]],
      [1.0, [255, 224, 140]]
    ]
  };

  function paletteColor(id, t) {
    var stops = PALETTES[id] || PALETTES.mag;
    if (t <= stops[0][0]) return stops[0][1];
    for (var i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i];
        var f = (t - a[0]) / (b[0] - a[0] || 1);
        return [
          Math.round(a[1][0] + (b[1][0] - a[1][0]) * f),
          Math.round(a[1][1] + (b[1][1] - a[1][1]) * f),
          Math.round(a[1][2] + (b[1][2] - a[1][2]) * f)
        ];
      }
    }
    return stops[stops.length - 1][1];
  }

  // 256-entry RGB lookup so the per-pixel build stays cheap.
  var _luts = {};
  function paletteLut(id) {
    if (_luts[id]) return _luts[id];
    var lut = new Uint8Array(256 * 3);
    for (var k = 0; k < 256; k++) {
      var rgb = paletteColor(id, k / 255);
      lut[k * 3] = rgb[0]; lut[k * 3 + 1] = rgb[1]; lut[k * 3 + 2] = rgb[2];
    }
    _luts[id] = lut;
    return lut;
  }

  // ---- Bilinear sample of an earth.scalarfield.v1 grid at (lon,lat). ---------
  //      lon wraps; lat clamps; NaN/null neighbours are dropped from the blend;
  //      all-missing -> null. Mirrors the live renderer's _sampleData exactly.
  function sampleGrid(grid, lon, lat) {
    var nx = grid.nx, ny = grid.ny, vals = grid.values;
    var fx = (lon - grid.lon0) / grid.dlon;
    var fy = (lat - grid.lat0) / grid.dlat;
    var i0 = Math.floor(fx), j0 = Math.floor(fy);
    var tx = fx - i0, ty = fy - j0;
    var i1 = i0 + 1, j1 = j0 + 1;
    i0 = ((i0 % nx) + nx) % nx;
    i1 = ((i1 % nx) + nx) % nx;
    if (j0 < 0) j0 = 0; else if (j0 > ny - 1) j0 = ny - 1;
    if (j1 < 0) j1 = 0; else if (j1 > ny - 1) j1 = ny - 1;
    var va = vals[j0 * nx + i0], vb = vals[j0 * nx + i1];
    var vc = vals[j1 * nx + i0], vd = vals[j1 * nx + i1];
    var wa = (va == null || isNaN(va)) ? 0 : (1 - tx) * (1 - ty);
    var wb = (vb == null || isNaN(vb)) ? 0 : tx * (1 - ty);
    var wc = (vc == null || isNaN(vc)) ? 0 : (1 - tx) * ty;
    var wd = (vd == null || isNaN(vd)) ? 0 : tx * ty;
    var wsum = wa + wb + wc + wd;
    if (wsum <= 0) return null;
    return (wa * va + wb * vb + wc * vc + wd * vd) / wsum;
  }

  function unwrapLon(l, base) {
    while (l - base > 180) l -= 360;
    while (l - base < -180) l += 360;
    return l;
  }

  // Build the coarse inverse lattice for a projection over a w x h canvas.
  function buildInverseGrid(projection, w, h, step) {
    var cols = Math.ceil(w / step) + 1;
    var rows = Math.ceil(h / step) + 1;
    var lon = new Float64Array(cols * rows);
    var lat = new Float64Array(cols * rows);
    var ok = new Uint8Array(cols * rows);
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var idx = r * cols + c;
        var ll = projection.invert ? projection.invert([c * step, r * step]) : null;
        if (ll && isFinite(ll[0]) && isFinite(ll[1])) {
          lon[idx] = ll[0]; lat[idx] = ll[1]; ok[idx] = 1;
        } else { ok[idx] = 0; }
      }
    }
    return { cols: cols, rows: rows, step: step, lon: lon, lat: lat, ok: ok };
  }

  /**
   * Render `grid` into the 2D context `ctx` (w x h) under `projection`.
   * opts: { palette, valueMin, valueMax, step, alphaFloor, alphaGain, grid:cache }
   * Out-of-globe pixels are left transparent. Returns the inverse-grid cache so a
   * caller can reuse it across frames where the projection is unchanged.
   */
  function renderField(ctx, w, h, projection, grid, opts) {
    opts = opts || {};
    var palette = opts.palette || grid.palette || 'mag';
    var vmin = (opts.valueMin != null) ? opts.valueMin : grid.valueMin;
    var vmax = (opts.valueMax != null) ? opts.valueMax : grid.valueMax;
    var span = (vmax - vmin) || 1;
    var lut = paletteLut(palette);
    var step = opts.step || 4;
    var aFloor = (opts.alphaFloor != null) ? opts.alphaFloor : 0.55;
    var aGain = (opts.alphaGain != null) ? opts.alphaGain : 0.42;

    var cache = opts.cache && opts.cache.step === step &&
      opts.cache.cols === Math.ceil(w / step) + 1
      ? opts.cache : buildInverseGrid(projection, w, h, step);
    var cols = cache.cols, lon = cache.lon, lat = cache.lat, ok = cache.ok;

    var img = ctx.createImageData(w, h);
    var data = img.data;
    var p = 0;
    for (var y = 0; y < h; y++) {
      var r0 = (y / step) | 0; var fyc = (y - r0 * step) / step;
      for (var x = 0; x < w; x++, p += 4) {
        var c0 = (x / step) | 0; var fxc = (x - c0 * step) / step;
        var i00 = r0 * cols + c0, i10 = i00 + 1, i01 = i00 + cols, i11 = i01 + 1;
        var llo, lla;
        if (ok[i00] && ok[i10] && ok[i01] && ok[i11]) {
          var base = lon[i00];
          var l00 = lon[i00];
          var l10 = unwrapLon(lon[i10], base);
          var l01 = unwrapLon(lon[i01], base);
          var l11 = unwrapLon(lon[i11], base);
          var ltop = l00 + (l10 - l00) * fxc;
          var lbot = l01 + (l11 - l01) * fxc;
          llo = ltop + (lbot - ltop) * fyc;
          var atop = lat[i00] + (lat[i10] - lat[i00]) * fxc;
          var abot = lat[i01] + (lat[i11] - lat[i01]) * fxc;
          lla = atop + (abot - atop) * fyc;
        } else {
          var ll = projection.invert ? projection.invert([x, y]) : null;
          if (!ll || !isFinite(ll[0]) || !isFinite(ll[1])) { data[p + 3] = 0; continue; }
          llo = ll[0]; lla = ll[1];
        }
        var v = sampleGrid(grid, llo, lla);
        if (v == null) { data[p + 3] = 0; continue; }
        var t = (v - vmin) / span; if (t < 0) t = 0; else if (t > 1) t = 1;
        var li = ((t * 255) | 0) * 3;
        data[p] = lut[li]; data[p + 1] = lut[li + 1]; data[p + 2] = lut[li + 2];
        data[p + 3] = ((aFloor + aGain * t) * 255) | 0;
      }
    }
    ctx.putImageData(img, 0, 0);
    return cache;
  }

  global.Earth2dScalar = {
    PALETTES: PALETTES,
    paletteColor: paletteColor,
    paletteLut: paletteLut,
    sampleGrid: sampleGrid,
    buildInverseGrid: buildInverseGrid,
    renderField: renderField,
    version: '0.1.0-thin-proof'
  };
})(typeof self !== 'undefined' ? self : this);
