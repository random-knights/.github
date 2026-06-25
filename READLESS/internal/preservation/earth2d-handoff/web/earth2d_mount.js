/*
 * earth2d_mount.js — window.__earth2d shim: ties the standalone d3-geo + Canvas2D
 * renderers (earth2d_scalar/flow/points/projections.js) into a Flutter
 * HtmlElementView host. Mirrors window.__earthCesium's role for the Cesium path.
 *
 * The Dart bridge (earth2d_bridge_web.dart) registers a platform-view factory
 * whose <div id="earth2d-host-..."> this shim fills with a <canvas>, then drives
 * via attach / sync / setProjection / suspend / resume / detach. A marker click
 * emits a CustomEvent('earth2d-pick') carrying the governed snapshot — exactly
 * like the Cesium 'earth-layer-pick'.
 *
 * Requires (loaded by index.html BEFORE this file): d3-geo, topojson-client,
 * earth2d_projections.js, earth2d_scalar.js, earth2d_flow.js, earth2d_points.js.
 * Fail-closed throughout: any missing dep / error leaves the host blank, never
 * throws into Flutter.
 */
(function (global) {
  'use strict';

  var HOSTS = {};
  var LAND = null, LAND_TRIED = false;

  function loadLand() {
    if (LAND_TRIED) return; LAND_TRIED = true;
    var urls = [
      'assets/assets/earth/vector/land-110m.json',
      'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json'
    ];
    function attempt(i) {
      if (i >= urls.length || LAND) return;
      try {
        global.fetch(urls[i]).then(function (r) { return r && r.ok ? r.json() : null; })
          .then(function (w) {
            if (w && global.topojson && w.objects && w.objects.land) {
              try { LAND = global.topojson.feature(w, w.objects.land); } catch (e) { attempt(i + 1); }
            } else { attempt(i + 1); }
          }).catch(function () { attempt(i + 1); });
      } catch (e) { attempt(i + 1); }
    }
    attempt(0);
  }

  function sizeCanvas(h) {
    var el = h.el, dpr = Math.min(global.devicePixelRatio || 1, 2);
    var w = Math.max(1, el.clientWidth | 0), ht = Math.max(1, el.clientHeight | 0);
    var bw = (w * dpr) | 0, bh = (ht * dpr) | 0;
    if (h.canvas.width !== bw || h.canvas.height !== bh) {
      h.canvas.width = bw; h.canvas.height = bh;
      h.canvas.style.width = w + 'px'; h.canvas.style.height = ht + 'px';
      h.W = bw; h.H = bh; h.field.width = bw; h.field.height = bh;
      rebuildProjection(h); h.dirty = true;
      return true;
    }
    return false;
  }

  function rebuildProjection(h) {
    try {
      h.projection = global.Earth2dProjections
        ? global.Earth2dProjections.byId(global.d3, h.projId, h.W, h.H)
        : global.d3.geoOrthographic().scale(Math.min(h.W, h.H) / 2 - 6).translate([h.W / 2, h.H / 2]).clipAngle(90);
      if (h.projection.rotate) h.projection.rotate(h.rotate);
      h.path = global.d3.geoPath(h.projection, h.ctx);
      h.fieldCache = null;
      for (var i = 0; i < h.flow.engine.ps.length; i++) { h.flow.engine.ps[i].px = null; }
    } catch (e) {}
  }

  function drawStatic(h) {
    var ctx = h.ctx, W = h.W, H = h.H, path = h.path;
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = '#0a1018'; ctx.fill();
    ctx.save(); ctx.beginPath(); path({ type: 'Sphere' }); ctx.clip();
    if (h.scalar.active && h.scalar.grid && global.Earth2dScalar) {
      h.fieldCache = global.Earth2dScalar.renderField(h.fctx, W, H, h.projection, h.scalar.grid, {
        palette: h.scalar.palette, valueMin: h.scalar.grid.valueMin, valueMax: h.scalar.grid.valueMax,
        step: 4, cache: h.fieldCache
      });
      ctx.drawImage(h.field, 0, 0);
    }
    ctx.beginPath(); path(global.d3.geoGraticule10());
    ctx.strokeStyle = 'rgba(150,170,200,0.10)'; ctx.lineWidth = 0.6; ctx.stroke();
    if (LAND) {
      ctx.beginPath(); path(LAND);
      ctx.fillStyle = 'rgba(7,11,17,0.86)'; ctx.fill();
      ctx.strokeStyle = 'rgba(150,180,215,0.42)'; ctx.lineWidth = 0.7; ctx.stroke();
    }
    h.hits = [];
    if (h.point.active && h.point.ps && global.Earth2dPoints) {
      h.hits = global.Earth2dPoints.render(ctx, h.projection, h.point.ps, { baseRadius: 5 });
    }
    ctx.restore();
    ctx.beginPath(); path({ type: 'Sphere' });
    ctx.strokeStyle = 'rgba(120,150,190,0.5)'; ctx.lineWidth = 1; ctx.stroke();
  }

  function frame(h) {
    if (!h.running) { h.raf = 0; return; }
    sizeCanvas(h);
    var flowing = h.flow.active && h.flow.grid && global.Earth2dFlow;
    if (flowing) {
      h.flow.engine.setProjection(h.projection);
      h.flow.engine.step(h.ctx, h.W, h.H, { dragging: h.dragging });
      try {
        h.ctx.beginPath(); h.path(global.d3.geoGraticule10());
        h.ctx.strokeStyle = 'rgba(140,165,200,0.07)'; h.ctx.lineWidth = 0.5; h.ctx.stroke();
        if (LAND) { h.ctx.beginPath(); h.path(LAND); h.ctx.strokeStyle = 'rgba(150,180,215,0.34)'; h.ctx.lineWidth = 0.6; h.ctx.stroke(); }
        h.ctx.beginPath(); h.path({ type: 'Sphere' }); h.ctx.strokeStyle = 'rgba(120,150,190,0.4)'; h.ctx.lineWidth = 1; h.ctx.stroke();
      } catch (e) {}
    } else if (h.dirty) {
      drawStatic(h); h.dirty = false;
    }
    h.raf = global.requestAnimationFrame(function () { frame(h); });
  }

  function wireInput(h) {
    var down = null, moved = 0;
    h.canvas.addEventListener('pointerdown', function (e) {
      down = { x: e.clientX, y: e.clientY }; moved = 0; h.dragging = true;
      try { h.canvas.setPointerCapture(e.pointerId); } catch (x) {}
    });
    h.canvas.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - down.x, dy = e.clientY - down.y; moved += Math.abs(dx) + Math.abs(dy);
      h.rotate[0] += dx * 0.4;
      var lat = h.rotate[1] - dy * 0.4; h.rotate[1] = lat > 90 ? 90 : (lat < -90 ? -90 : lat);
      if (h.projection.rotate) h.projection.rotate(h.rotate);
      down.x = e.clientX; down.y = e.clientY; h.fieldCache = null; h.dirty = true;
    });
    function up(e) {
      if (down && moved < 5 && h.point.active && global.Earth2dPoints) {
        var rect = h.canvas.getBoundingClientRect();
        var sx = (e.clientX - rect.left) * (h.W / rect.width);
        var sy = (e.clientY - rect.top) * (h.H / rect.height);
        var hit = global.Earth2dPoints.hitTest(h.hits, sx, sy);
        var snap = global.Earth2dPoints.snapshot(hit, h.point.ps);
        try {
          global.dispatchEvent(new global.CustomEvent('earth2d-pick', { detail: snap ? JSON.stringify(snap) : '' }));
        } catch (x) {}
      }
      down = null; h.dragging = false;
    }
    h.canvas.addEventListener('pointerup', up);
    h.canvas.addEventListener('pointercancel', function () { down = null; h.dragging = false; });
  }

  global.__earth2d = {
    attach: function (hostId) {
      try {
        var el = global.document.getElementById(hostId);
        if (!el) return 'no-element';
        if (HOSTS[hostId]) return 'attached';
        if (!global.d3) return 'no-d3';
        var canvas = global.document.createElement('canvas');
        canvas.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;cursor:grab';
        el.appendChild(canvas);
        var h = {
          el: el, canvas: canvas, ctx: canvas.getContext('2d'),
          field: global.document.createElement('canvas'), fctx: null,
          projId: 'orthographic', rotate: [0, -10], projection: null, path: null,
          W: 1, H: 1, fieldCache: null, dirty: true, running: true, dragging: false, raf: 0,
          scalar: { active: false, grid: null, palette: 'mag' },
          flow: { active: false, grid: null, engine: global.Earth2dFlow ? global.Earth2dFlow.create({ count: 2600 }) : { ps: [], setProjection: function () {}, setGrid: function () {}, step: function () {} } },
          point: { active: false, ps: null },
          hits: []
        };
        h.fctx = h.field.getContext('2d');
        HOSTS[hostId] = h;
        loadLand();
        sizeCanvas(h);
        rebuildProjection(h);
        wireInput(h);
        frame(h);
        return 'attached';
      } catch (e) { return 'error'; }
    },
    sync: function (hostId, renderer, payloadJson) {
      try {
        var h = HOSTS[hostId]; if (!h) return;
        var p = typeof payloadJson === 'string' ? JSON.parse(payloadJson) : payloadJson;
        if (renderer === 'scalar') {
          h.scalar.active = !!(p && p.active && p.grid);
          h.scalar.grid = p && p.grid ? p.grid : null;
          h.scalar.palette = (p && p.palette) || (p && p.grid && p.grid.palette) || 'mag';
          h.fieldCache = null;
        } else if (renderer === 'flow') {
          var g = p && p.grid ? p.grid : null;
          h.flow.active = !!(p && p.animate && g);
          h.flow.grid = g;
          if (g && h.flow.engine.setGrid) h.flow.engine.setGrid(g, (p && p.kind) || 'wind');
        } else if (renderer === 'point') {
          h.point.active = !!(p && p.active && p.points && p.points.length);
          h.point.ps = p || null;
        }
        h.dirty = true;
      } catch (e) {}
    },
    setProjection: function (hostId, projId) {
      var h = HOSTS[hostId]; if (!h) return;
      h.projId = projId || 'orthographic'; rebuildProjection(h); h.dirty = true;
    },
    suspend: function (hostId) { var h = HOSTS[hostId]; if (h) { h.running = false; } },
    resume: function (hostId) {
      var h = HOSTS[hostId]; if (h && !h.running) { h.running = true; h.dirty = true; if (!h.raf) frame(h); }
    },
    detach: function (hostId) {
      var h = HOSTS[hostId]; if (!h) return;
      h.running = false; if (h.raf) { try { global.cancelAnimationFrame(h.raf); } catch (e) {} }
      try { if (h.canvas && h.canvas.parentNode) h.canvas.parentNode.removeChild(h.canvas); } catch (e) {}
      delete HOSTS[hostId];
    }
  };
})(typeof self !== 'undefined' ? self : this);
