(function () {
  'use strict';

  var TAU = Math.PI * 2;
  var LIME = '223,255,63';
  var PINK = '255,79,203';
  var SILVER = '214,220,224';
  var INK = '29,27,23';

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(current, target, ease) {
    return current + (target - current) * ease;
  }

  function rgba(rgb, alpha) {
    return 'rgba(' + rgb + ',' + alpha + ')';
  }

  function wrap01(value) {
    return ((value % 1) + 1) % 1;
  }

  function drawPath(ctx, points) {
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      var prev = points[i - 1];
      var point = points[i];
      var midX = (prev.x + point.x) * 0.5;
      var midY = (prev.y + point.y) * 0.5;
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  }

  function MoleculeNode(x, y, z, radius, energy) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.energy = energy || 0;
    this.phase = Math.random() * TAU;
  }

  MoleculeNode.prototype.draw = function (scene, time, index) {
    var ctx = scene.ctx;
    var point = scene.project(this);
    var hover = scene.hover;
    var pulse = scene.reduced ? 0.35 : (Math.sin(time * 0.0017 * scene.speed + this.phase) + 1) * 0.5;
    var glow = hover * this.energy * (0.45 + 0.55 * Math.sin(time * 0.0024 * scene.speed + this.phase));
    var isCenter = index === 0;
    var radius = this.radius * scene.unit * point.scale;

    radius *= isCenter ? (1 + hover * 0.12 + pulse * 0.018) : (1 + pulse * 0.045 + glow * 0.05);

    ctx.save();
    ctx.globalAlpha = clamp(0.72 + point.depth * 0.18, 0.52, 0.96);

    if (glow > 0.02 || (isCenter && hover > 0.02)) {
      ctx.shadowBlur = (isCenter ? 32 : 20) * (0.25 + hover);
      ctx.shadowColor = this.energy > 0.5 ? rgba(PINK, 0.45 + glow * 0.35) : rgba(LIME, 0.45 + glow * 0.35);
    }

    var glass = ctx.createRadialGradient(
      point.x - radius * 0.34,
      point.y - radius * 0.42,
      radius * 0.08,
      point.x,
      point.y,
      radius * 1.06
    );
    glass.addColorStop(0, 'rgba(255,255,255,.96)');
    glass.addColorStop(0.18, 'rgba(255,255,255,.58)');
    glass.addColorStop(0.56, 'rgba(225,231,235,.22)');
    glass.addColorStop(0.82, 'rgba(181,190,198,.20)');
    glass.addColorStop(1, 'rgba(255,255,255,.52)');

    ctx.fillStyle = glass;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, TAU);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineWidth = Math.max(1, radius * 0.035);
    ctx.strokeStyle = 'rgba(255,255,255,.82)';
    ctx.stroke();

    ctx.lineWidth = Math.max(0.8, radius * 0.018);
    ctx.strokeStyle = rgba(INK, 0.12);
    ctx.beginPath();
    ctx.arc(point.x + radius * 0.04, point.y + radius * 0.03, radius * 0.72, -0.2, Math.PI * 1.25);
    ctx.stroke();

    var highlight = ctx.createRadialGradient(
      point.x - radius * 0.34,
      point.y - radius * 0.38,
      0,
      point.x - radius * 0.34,
      point.y - radius * 0.38,
      radius * 0.42
    );
    highlight.addColorStop(0, 'rgba(255,255,255,.9)');
    highlight.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.ellipse(point.x - radius * 0.3, point.y - radius * 0.36, radius * 0.28, radius * 0.12, -0.55, 0, TAU);
    ctx.fill();

    if (isCenter) {
      ctx.globalAlpha = 0.2 + hover * 0.32;
      ctx.strokeStyle = rgba(LIME, 0.7);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 0.56, time * 0.0012, time * 0.0012 + Math.PI * 1.15);
      ctx.stroke();
      ctx.strokeStyle = rgba(PINK, 0.62);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 0.43, -time * 0.001, -time * 0.001 + Math.PI * 1.05);
      ctx.stroke();
    }

    ctx.restore();
  };

  function ParticleField(scene, count) {
    this.scene = scene;
    this.particles = [];
    this.reset(count);
  }

  ParticleField.prototype.reset = function (count) {
    this.particles.length = 0;
    for (var i = 0; i < count; i++) {
      this.particles.push({
        x: -1.35 + Math.random() * 2.7,
        y: -1.02 + Math.random() * 2.04,
        z: -0.6 + Math.random() * 1.2,
        r: 0.006 + Math.random() * 0.015,
        phase: Math.random() * TAU,
        speed: 0.45 + Math.random() * 0.9,
        tint: Math.random() > 0.78 ? (Math.random() > 0.5 ? LIME : PINK) : SILVER
      });
    }
  };

  ParticleField.prototype.draw = function (time) {
    var scene = this.scene;
    var ctx = scene.ctx;
    var cursor = scene.cursorCanvas;
    var hover = scene.hover;

    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i];
      var drift = time * 0.0002 * scene.speed * particle.speed;
      var projected = scene.project({
        x: particle.x + Math.sin(drift + particle.phase) * 0.045,
        y: particle.y + Math.cos(drift * 1.2 + particle.phase) * 0.035,
        z: particle.z
      });
      var x = projected.x + scene.pointer.x * scene.unit * 0.018 * (0.3 + projected.scale);
      var y = projected.y + scene.pointer.y * scene.unit * 0.014 * (0.3 + projected.scale);
      var radius = particle.r * scene.unit * projected.scale;

      if (hover > 0.03) {
        var dx = x - cursor.x;
        var dy = y - cursor.y;
        var dist = Math.max(1, Math.hypot(dx, dy));
        var range = scene.mobile ? 78 : 132;
        var repel = clamp(1 - dist / range, 0, 1) * hover;
        x += dx / dist * repel * 18;
        y += dy / dist * repel * 18;
      }

      ctx.save();
      ctx.globalAlpha = particle.tint === SILVER ? 0.34 : 0.22 + hover * 0.3;
      ctx.shadowBlur = particle.tint === SILVER ? 0 : 12 * hover;
      ctx.shadowColor = rgba(particle.tint, 0.55);

      var droplet = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.4, 0, x, y, radius * 1.25);
      droplet.addColorStop(0, 'rgba(255,255,255,.92)');
      droplet.addColorStop(0.58, particle.tint === SILVER ? 'rgba(221,228,232,.22)' : rgba(particle.tint, 0.28));
      droplet.addColorStop(1, 'rgba(255,255,255,.08)');
      ctx.fillStyle = droplet;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  };

  function NeonThreads(scene) {
    this.scene = scene;
  }

  NeonThreads.prototype.buildThread = function (time, phase, direction) {
    var scene = this.scene;
    var points = [];
    var samples = scene.mobile ? 54 : 82;
    var turns = scene.mobile ? 1.12 : 1.55;
    var spin = time * 0.00048 * scene.speed * direction;

    for (var i = 0; i < samples; i++) {
      var u = i / (samples - 1);
      var angle = phase + spin + direction * u * TAU * turns;
      var radius = 0.95 + Math.sin(u * TAU * 2 + phase) * 0.1;
      points.push(scene.project({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 0.86 + phase) * 0.43 + Math.sin(u * TAU * 2.1) * 0.08,
        z: Math.sin(angle) * 0.75
      }));
    }
    return points;
  };

  NeonThreads.prototype.drawSingle = function (time, rgb, phase, direction) {
    var scene = this.scene;
    var ctx = scene.ctx;
    var hover = scene.hover;
    var points = this.buildThread(time, phase, direction);
    var idleAlpha = scene.reduced ? 0.1 : 0.16;
    var alpha = idleAlpha + hover * 0.48;
    var line = scene.mobile ? 1.15 : 1.45;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawPath(ctx, points);
    ctx.shadowBlur = 18 + hover * 22;
    ctx.shadowColor = rgba(rgb, 0.42 + hover * 0.26);
    ctx.strokeStyle = rgba(rgb, alpha * 0.6);
    ctx.lineWidth = line * (4 + hover * 2.2);
    ctx.stroke();

    drawPath(ctx, points);
    ctx.shadowBlur = 8 + hover * 14;
    ctx.strokeStyle = rgba(rgb, alpha);
    ctx.lineWidth = line * (1.2 + hover * 1.1);
    ctx.stroke();

    if (!scene.mobile || hover > 0.15) {
      var sparks = scene.mobile ? 2 : 4;
      for (var i = 0; i < sparks; i++) {
        var offset = wrap01(time * 0.00018 * scene.speed * (i + 1) + i / sparks + phase);
        var spark = points[Math.floor(offset * (points.length - 1))];
        var radius = (2.2 + hover * 4.5) * spark.scale;
        ctx.globalAlpha = 0.28 + hover * 0.55;
        ctx.shadowBlur = 18;
        ctx.fillStyle = rgba(rgb, 0.86);
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, radius, 0, TAU);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  NeonThreads.prototype.draw = function (time) {
    this.drawSingle(time, LIME, -0.45, 1);
    this.drawSingle(time, PINK, 1.65, -1);
  };

  function MoleculeScene(root) {
    this.root = root;
    this.canvas = root.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.mobile = window.matchMedia('(max-width: 640px)').matches;
    this.tablet = window.matchMedia('(max-width: 1024px)').matches;
    this.speed = this.reduced ? 0.12 : (this.mobile ? 0.58 : 1);
    this.pointer = { x: 0, y: 0 };
    this.pointerTarget = { x: 0, y: 0 };
    this.cursorCanvas = { x: 0, y: 0 };
    this.hover = 0;
    this.hoverTarget = 0;
    this.raf = 0;
    this.unit = 1;
    this.width = 1;
    this.height = 1;
    this.nodes = this.createNodes();
    this.bonds = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 7], [2, 6], [3, 8], [4, 8], [6, 4]];
    this.particles = new ParticleField(this, this.getParticleCount());
    this.threads = new NeonThreads(this);

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
    this.onResize = this.onResize.bind(this);

    root.addEventListener('pointermove', this.onPointerMove, { passive: true });
    root.addEventListener('pointerenter', this.onPointerMove, { passive: true });
    root.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.onResize();
    this.observeVisibility();
  }

  MoleculeScene.prototype.createNodes = function () {
    return [
      new MoleculeNode(0, 0, 0, 0.22, 0.7),
      new MoleculeNode(-0.78, -0.32, 0.08, 0.095, 0.35),
      new MoleculeNode(0.7, -0.37, -0.14, 0.11, 0.8),
      new MoleculeNode(-0.52, 0.58, -0.22, 0.14, 0.42),
      new MoleculeNode(0.66, 0.56, 0.22, 0.13, 0.72),
      new MoleculeNode(0.06, -0.93, 0.24, 0.085, 0.3),
      new MoleculeNode(0.98, 0.04, -0.04, 0.074, 0.58),
      new MoleculeNode(-0.98, 0.08, 0.18, 0.078, 0.34),
      new MoleculeNode(0.24, 0.9, -0.17, 0.072, 0.64)
    ];
  };

  MoleculeScene.prototype.getParticleCount = function () {
    if (this.reduced) return 20;
    if (this.mobile) return 34;
    if (this.tablet) return 50;
    return 76;
  };

  MoleculeScene.prototype.onResize = function () {
    var rect = this.root.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.mobile = window.matchMedia('(max-width: 640px)').matches;
    this.tablet = window.matchMedia('(max-width: 1024px)').matches;
    this.speed = this.reduced ? 0.12 : (this.mobile ? 0.58 : 1);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.unit = Math.min(this.width, this.height) * (this.mobile ? 0.39 : 0.43);
    this.cursorCanvas.x = this.width * 0.5;
    this.cursorCanvas.y = this.height * 0.5;
    this.particles.reset(this.getParticleCount());
    this.draw(0);
  };

  MoleculeScene.prototype.observeVisibility = function () {
    var scene = this;
    if (!('IntersectionObserver' in window)) {
      scene.start();
      return;
    }
    this.observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) scene.start();
      else scene.stop();
    }, { rootMargin: '180px 0px' });
    this.observer.observe(this.root);
  };

  MoleculeScene.prototype.onPointerMove = function (event) {
    if (this.reduced && this.mobile) return;
    var rect = this.root.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    this.pointerTarget.x = clamp((x / rect.width - 0.5) * 2, -1, 1);
    this.pointerTarget.y = clamp((y / rect.height - 0.5) * 2, -1, 1);
    this.cursorCanvas.x = x;
    this.cursorCanvas.y = y;
    this.hoverTarget = event.pointerType === 'touch' ? 0.34 : 1;
  };

  MoleculeScene.prototype.onPointerLeave = function () {
    this.pointerTarget.x = 0;
    this.pointerTarget.y = 0;
    this.hoverTarget = 0;
  };

  MoleculeScene.prototype.start = function () {
    if (this.raf) return;
    var scene = this;
    function tick(time) {
      scene.draw(time || 0);
      scene.raf = window.requestAnimationFrame(tick);
    }
    this.raf = window.requestAnimationFrame(tick);
  };

  MoleculeScene.prototype.stop = function () {
    if (!this.raf) return;
    window.cancelAnimationFrame(this.raf);
    this.raf = 0;
  };

  MoleculeScene.prototype.rotate = function (point, time) {
    var idleY = time * 0.00016 * this.speed;
    var idleX = Math.sin(time * 0.0002 * this.speed) * 0.08;
    var rotY = idleY + this.pointer.x * 0.28 * this.hover;
    var rotX = -0.08 + idleX - this.pointer.y * 0.18 * this.hover;
    var rotZ = this.pointer.x * 0.045 * this.hover;

    var cosY = Math.cos(rotY);
    var sinY = Math.sin(rotY);
    var x1 = point.x * cosY - point.z * sinY;
    var z1 = point.x * sinY + point.z * cosY;

    var cosX = Math.cos(rotX);
    var sinX = Math.sin(rotX);
    var y2 = point.y * cosX - z1 * sinX;
    var z2 = point.y * sinX + z1 * cosX;

    var cosZ = Math.cos(rotZ);
    var sinZ = Math.sin(rotZ);
    return {
      x: x1 * cosZ - y2 * sinZ,
      y: x1 * sinZ + y2 * cosZ,
      z: z2
    };
  };

  MoleculeScene.prototype.project = function (point) {
    var rotated = this.rotate(point, this.time || 0);
    var scale = clamp(1 + rotated.z * 0.12, 0.82, 1.18);
    return {
      x: this.width * 0.5 + rotated.x * this.unit * scale + this.pointer.x * this.unit * 0.045 * this.hover,
      y: this.height * 0.5 + rotated.y * this.unit * scale + this.pointer.y * this.unit * 0.035 * this.hover,
      z: rotated.z,
      depth: rotated.z,
      scale: scale
    };
  };

  MoleculeScene.prototype.drawVeil = function (time) {
    var ctx = this.ctx;
    var alpha = this.reduced ? 0.08 : 0.12;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
    for (var i = 0; i < 4; i++) {
      var y = this.height * (0.58 + i * 0.04);
      var drift = Math.sin(time * 0.0002 * this.speed + i) * 18;
      ctx.beginPath();
      ctx.moveTo(this.width * -0.04, y + drift);
      ctx.bezierCurveTo(
        this.width * 0.28,
        y - 82 + drift,
        this.width * 0.58,
        y + 78 - drift,
        this.width * 1.04,
        y - 34 + drift
      );
      ctx.stroke();
    }
    ctx.restore();
  };

  MoleculeScene.prototype.drawOrbit = function (time, radius, tilt, alpha, phase) {
    var ctx = this.ctx;
    var points = [];
    var samples = this.mobile ? 80 : 116;

    for (var i = 0; i <= samples; i++) {
      var a = i / samples * TAU + phase + time * 0.00008 * this.speed;
      points.push(this.project({
        x: Math.cos(a) * radius,
        y: Math.sin(a) * Math.cos(tilt) * radius * 0.46,
        z: Math.sin(a) * Math.sin(tilt) * radius * 0.66
      }));
    }

    ctx.save();
    drawPath(ctx, points);
    ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = rgba(INK, alpha * 0.22);
    ctx.stroke();
    ctx.restore();
  };

  MoleculeScene.prototype.drawBonds = function () {
    var ctx = this.ctx;
    var hover = this.hover;

    ctx.save();
    ctx.lineCap = 'round';
    for (var i = 0; i < this.bonds.length; i++) {
      var a = this.project(this.nodes[this.bonds[i][0]]);
      var b = this.project(this.nodes[this.bonds[i][1]]);
      var depth = clamp((a.depth + b.depth) * 0.5, -1, 1);
      var width = (1.4 + depth * 0.45) * (1 + hover * 0.12);

      var gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      gradient.addColorStop(0, 'rgba(255,255,255,.52)');
      gradient.addColorStop(0.45, 'rgba(137,146,153,.58)');
      gradient.addColorStop(1, 'rgba(255,255,255,.62)');

      ctx.shadowBlur = 8 * hover;
      ctx.shadowColor = rgba(SILVER, 0.26);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,.38)';
      ctx.lineWidth = Math.max(0.55, width * 0.34);
      ctx.stroke();
    }
    ctx.restore();
  };

  MoleculeScene.prototype.draw = function (time) {
    this.time = time;
    this.pointer.x = lerp(this.pointer.x, this.pointerTarget.x, this.reduced ? 0.035 : 0.08);
    this.pointer.y = lerp(this.pointer.y, this.pointerTarget.y, this.reduced ? 0.035 : 0.08);
    this.hover = lerp(this.hover, this.hoverTarget, this.reduced ? 0.025 : 0.075);

    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawVeil(time);
    this.particles.draw(time);
    this.drawOrbit(time, 1.08, 0.56, 0.24, 0.2);
    this.drawOrbit(time, 0.9, -0.75, 0.18, 1.4);
    if (!this.mobile) this.drawOrbit(time, 1.18, 1.05, 0.13, 2.2);
    this.threads.draw(time);
    this.drawBonds();

    var ordered = this.nodes.slice().sort(function (a, b) {
      return a.z - b.z;
    });
    for (var i = 0; i < ordered.length; i++) {
      ordered[i].draw(this, time, ordered[i] === this.nodes[0] ? 0 : i + 1);
    }
  };

  function PhilosophyMoleculeAnimation(root) {
    if (!root || root.__philosophyMoleculeAnimation) return null;
    root.__philosophyMoleculeAnimation = new MoleculeScene(root);
    return root.__philosophyMoleculeAnimation;
  }

  function initPhilosophyMoleculeAnimation() {
    var root = document.getElementById('philosophyMolecule');
    if (root) PhilosophyMoleculeAnimation(root);
  }

  window.PhilosophyMoleculeAnimation = PhilosophyMoleculeAnimation;
  window.MoleculeScene = MoleculeScene;
  window.MoleculeNode = MoleculeNode;
  window.NeonThreads = NeonThreads;
  window.ParticleField = ParticleField;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhilosophyMoleculeAnimation);
  } else {
    initPhilosophyMoleculeAnimation();
  }
})();
