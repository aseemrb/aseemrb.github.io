---
author: Aseem Baranwal
pubDatetime: 2026-04-26T15:22:00Z
title: Voronoi tessellations and Lloyd's algorithm
slug: voronoi-and-lloyds-algorithm
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  A set of generators in the plane partitions it into regions, each closer to one generator than to any other. Lloyd's algorithm iterates "move each generator to the centroid of its region" and converges to a centroidal Voronoi tessellation. The same algorithm is k-means.
---

Place $k$ points $p_1, \ldots, p_k$ in the plane (called **generators**). The [Voronoi cell](https://en.wikipedia.org/wiki/Voronoi_diagram) of $p_i$ is

$$
V_i \;=\; \{x \in \mathbb{R}^2 : \|x - p_i\| \le \|x - p_j\| \text{ for all } j \ne i\}.
$$

Each cell is a convex polygon, and the cells together partition the plane. Random generators give irregular cells of varying sizes and shapes. Carefully placed generators give regular tilings. There is a procedure that takes any starting configuration and pulls it toward a maximally regular one.

## Lloyd's algorithm

At each step:

1. Compute the Voronoi cells $V_1, \ldots, V_k$ for the current generators.
2. Replace each generator $p_i$ with the **centroid** of its cell:
   $$
   p_i' \;=\; \frac{1}{|V_i|} \int_{V_i} x \, dx.
   $$
3. Repeat.

This is **Lloyd's algorithm** (Lloyd, 1957/1982). It decreases the total squared distance from each point in the plane to its nearest generator at every step (a Lyapunov / energy function), so it converges to a local minimum.

The fixed points are configurations where every generator is *already* at the centroid of its own cell. These are called **centroidal Voronoi tessellations** (CVTs). On flat domains, the cells of a CVT are nearly hexagonal: hexagons are the polygon shape that minimizes the second moment of area per unit area, so the algorithm seeks them out.

Click on the canvas to add generators. Drag a generator to move it. Press **step** to run one Lloyd iteration, or **run** to step until convergence. Watch the cells round out and the configuration regularize.

<div class="vo-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.92em;"><button id="vo-step" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">step</button><button id="vo-run" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">run 30 steps</button><button id="vo-rand" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">random 24 generators</button><button id="vo-clear" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">clear</button><span>generators: <strong id="vo-k">0</strong></span><span>iteration: <strong id="vo-iter">0</strong></span><span style="font-style: italic;">click to add · drag to move</span></div><canvas id="vo-canvas" width="640" height="400" style="width: 100%; max-width: 640px; height: auto; display: block; margin: 0 auto; cursor: crosshair;" aria-label="Voronoi tessellation; click to add generators, drag to move them, press step or run to iterate Lloyd's algorithm."></canvas></div>
<script>
(function () {
  var canvas = document.getElementById('vo-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var stepBtn = document.getElementById('vo-step');
  var runBtn = document.getElementById('vo-run');
  var randBtn = document.getElementById('vo-rand');
  var clearBtn = document.getElementById('vo-clear');
  var kDisp = document.getElementById('vo-k');
  var iterDisp = document.getElementById('vo-iter');
  var W = canvas.width, H = canvas.height;
  var gens = [];
  var iter = 0;
  var dragIdx = -1;
  var hueOf = function (i) { return (i * 137) % 360; };
  function rgb(i) {
    var h = hueOf(i) / 360;
    var s = 0.5, l = 0.62;
    function f(t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return l + (l - (l < 0.5 ? l * (1 + s) : l + s - l * s)) * (1 - 6 * t);
      if (t < 1/2) return l < 0.5 ? l * (1 + s) : l + s - l * s;
      if (t < 2/3) return l + (l - (l < 0.5 ? l * (1 + s) : l + s - l * s)) * (1 - 6 * (2/3 - t));
      return l;
    }
    return [Math.round(f(h + 1/3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1/3) * 255)];
  }
  function colorFor(i) {
    var c = rgb(i);
    return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
  }
  function findNearestGen(px, py) {
    var best = -1, bd = 100;
    for (var i = 0; i < gens.length; i++) {
      var dx = px - gens[i].x, dy = py - gens[i].y;
      var d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }
  function render() {
    if (gens.length === 0) {
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#888'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('click to add generators', W / 2, H / 2);
      return;
    }
    var bestIdx = new Int32Array(W * H);
    for (var py = 0; py < H; py++) {
      for (var px = 0; px < W; px++) {
        var bI = 0, bD = Infinity;
        for (var i = 0; i < gens.length; i++) {
          var dx = px - gens[i].x, dy = py - gens[i].y;
          var d = dx * dx + dy * dy;
          if (d < bD) { bD = d; bI = i; }
        }
        bestIdx[py * W + px] = bI;
      }
    }
    var imgData = ctx.createImageData(W, H);
    var data = imgData.data;
    var palette = [];
    for (var i = 0; i < gens.length; i++) palette.push(rgb(i));
    for (var py = 0; py < H; py++) {
      for (var px = 0; px < W; px++) {
        var pos = py * W + px;
        var bi = bestIdx[pos];
        var border = false;
        if (px + 1 < W && bestIdx[pos + 1] !== bi) border = true;
        else if (py + 1 < H && bestIdx[pos + W] !== bi) border = true;
        else if (px > 0 && bestIdx[pos - 1] !== bi) border = true;
        else if (py > 0 && bestIdx[pos - W] !== bi) border = true;
        var di = pos * 4;
        if (border) {
          data[di] = 0; data[di + 1] = 0; data[di + 2] = 0; data[di + 3] = 255;
        } else {
          var c = palette[bi];
          data[di] = c[0]; data[di + 1] = c[1]; data[di + 2] = c[2]; data[di + 3] = 220;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    for (var i = 0; i < gens.length; i++) {
      ctx.beginPath();
      ctx.arc(gens[i].x, gens[i].y, 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(gens[i].x, gens[i].y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
    kDisp.textContent = gens.length;
    iterDisp.textContent = iter;
  }
  function lloydStep() {
    if (gens.length === 0) return;
    var k = gens.length;
    var sumX = new Array(k); var sumY = new Array(k); var count = new Array(k);
    for (var i = 0; i < k; i++) { sumX[i] = 0; sumY[i] = 0; count[i] = 0; }
    for (var py = 0; py < H; py++) {
      for (var px = 0; px < W; px++) {
        var bestI = 0, bestD = Infinity;
        for (var i = 0; i < k; i++) {
          var dx = px - gens[i].x, dy = py - gens[i].y;
          var d = dx * dx + dy * dy;
          if (d < bestD) { bestD = d; bestI = i; }
        }
        sumX[bestI] += px; sumY[bestI] += py; count[bestI]++;
      }
    }
    for (var i = 0; i < k; i++) {
      if (count[i] > 0) { gens[i].x = sumX[i] / count[i]; gens[i].y = sumY[i] / count[i]; }
    }
    iter++;
  }
  canvas.addEventListener('mousedown', function (ev) {
    var rect = canvas.getBoundingClientRect();
    var px = (ev.clientX - rect.left) * (W / rect.width);
    var py = (ev.clientY - rect.top) * (H / rect.height);
    var idx = findNearestGen(px, py);
    if (idx >= 0) { dragIdx = idx; }
    else { gens.push({ x: px, y: py }); render(); }
  });
  canvas.addEventListener('mousemove', function (ev) {
    if (dragIdx < 0) return;
    var rect = canvas.getBoundingClientRect();
    var px = (ev.clientX - rect.left) * (W / rect.width);
    var py = (ev.clientY - rect.top) * (H / rect.height);
    gens[dragIdx].x = px; gens[dragIdx].y = py;
    render();
  });
  window.addEventListener('mouseup', function () { dragIdx = -1; });
  stepBtn.addEventListener('click', function () { lloydStep(); render(); });
  runBtn.addEventListener('click', function () {
    var i = 0;
    function next() {
      if (i >= 30) return;
      lloydStep(); render(); i++;
      setTimeout(next, 60);
    }
    next();
  });
  randBtn.addEventListener('click', function () {
    gens = []; iter = 0;
    for (var i = 0; i < 24; i++) gens.push({ x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 60) });
    render();
  });
  clearBtn.addEventListener('click', function () { gens = []; iter = 0; render(); });
  // initial state
  for (var i = 0; i < 18; i++) gens.push({ x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 60) });
  render();
})();
</script>

Press **random 24 generators** for a fresh starting configuration, then **run 30 steps** to watch Lloyd converge. Press **step** if you want to see the iteration in single-step mode.

After enough iterations on a rectangular domain, the cells become approximately hexagonal in the interior and adapt to the boundary near the edges. The convergence is monotone in the energy

$$
F(p_1, \ldots, p_k) \;=\; \sum_{i=1}^{k} \int_{V_i} \|x - p_i\|^2 \, dx,
$$

the total squared distance to the nearest generator. Each step strictly decreases $F$ unless the configuration is already a CVT.

## Where this connects

- **k-means clustering.** Lloyd's algorithm is the algorithm typically called "k-means". Given a finite point cloud and $k$ cluster centers, [k-means](https://en.wikipedia.org/wiki/K-means_clustering) alternates "assign each point to the nearest center" (the discrete analog of computing Voronoi cells) and "move each center to the centroid of its cluster" (the discrete analog of step 2). Continuous Lloyd's is the limiting case where the point cloud is replaced by a uniform measure on a domain. k-means inherits its convergence properties from the same energy-decrease argument.
- **Vector quantization.** Designing optimal codebooks for compressing continuous signals. The optimal $k$-point codebook for squared error is exactly a CVT of the source distribution.
- **Mesh generation.** CVT meshes are popular for finite-element methods because they have well-conditioned cells (no slivers, near-uniform sizes).
- **Stippling and natural patterns.** Lloyd's algorithm produces visually pleasing "blue noise" point distributions used in computer graphics; biological tissues and bee compound eyes settle into similar hexagonal arrangements through different mechanisms but for similar reasons.

## The bees

Bees build approximately hexagonal honeycombs, and they are often described as running Lloyd's algorithm in nature. Not quite: there are two distinct mathematical optimality statements that both have the hexagonal tiling as their answer in 2D, and bees and Lloyd's algorithm solve different ones.

**Hales's Honeycomb Theorem** (Hales, 2001). Among all tilings of the plane into regions of equal area, the regular hexagonal tiling minimizes the total perimeter. This is the optimization that minimizes wax usage for a given total storage volume. The conjecture goes back at least to Pappus of Alexandria in the fourth century AD; the proof is modern.

**Lloyd's CVT** in the flat-domain, uniform-density limit minimizes a different functional, the second moment of area per unit area:

$$
\frac{1}{|V|} \int_V \|x - p\|^2 \, dx,
$$

where $p$ is the centroid of $V$. Among polygons that tile the plane, the regular hexagon minimizes this too (L. Fejes Tóth, 1959). The analogous statement in $d \ge 3$, that the optimal tiling for moment of inertia is by truncated octahedra, is **Gersho's conjecture**, still open in general dimensions.

So the perimeter minimum and the moment-of-inertia minimum are mathematically distinct objectives, but they happen to be solved by the same shape in 2D. That is the reason bees and k-means converge on hexagons through completely unrelated processes.

The bee mechanism is not direct geometry. Bees do not measure angles. The accepted picture, going back to D'Arcy Thompson (1917) and experimentally confirmed by Karihaloo, Zhang, and Wang (2013), is that bees first build approximately *circular* cells out of soft wax, and the wax then relaxes under the heat of the bees' bodies and the equal mutual pressure of neighboring cells. Surface tension drives the boundaries to a configuration that minimizes wax for fixed cell area, which by the Honeycomb Theorem is the hexagonal tiling.

In this sense, *bees do calculus* the same way *soap films do calculus*: the physical system minimizes the same variational integral that the mathematical statement names. Lloyd's algorithm solves a different but adjacent variational problem by direct iteration, and arrives at the same answer because the answer is hexagons either way.

## References

- Stuart P. Lloyd. *Least squares quantization in PCM*. Bell Laboratories Technical Note, 1957; published in IEEE Transactions on Information Theory, 28(2):129-137, 1982.
- Qiang Du, Vance Faber, Max Gunzburger. *Centroidal Voronoi tessellations: Applications and algorithms*. SIAM Review, 41(4):637-676, 1999.
- Atsuyuki Okabe, Barry Boots, Kokichi Sugihara, Sung Nok Chiu. *Spatial Tessellations: Concepts and Applications of Voronoi Diagrams*. Wiley, 2000.
- Thomas C. Hales. *The honeycomb conjecture*. Discrete and Computational Geometry, 25(1):1-22, 2001.
- L. Fejes Tóth. *What the bees know and what they do not know*. Bulletin of the American Mathematical Society, 70(4):468-481, 1964.
- B. L. Karihaloo, K. Zhang, J. Wang. *Honeybee combs: how the circular cells transform into rounded hexagons*. Journal of the Royal Society Interface, 10(86):20130299, 2013.
- D'Arcy Wentworth Thompson. *On Growth and Form*. Cambridge University Press, 1917.
- Allen Gersho. *Asymptotically optimal block quantization*. IEEE Transactions on Information Theory, 25(4):373-380, 1979.
