---
author: Aseem Raj Baranwal
pubDatetime: 2026-04-26T15:22:00Z
title: Voronoi tessellations and Lloyd's algorithm
slug: voronoi-and-lloyds-algorithm
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  A set of generators in the plane partitions it into regions, each closer to one generator than to any other. Lloyd's algorithm iterates "move each generator to the centroid of its region" and converges to a centroidal Voronoi tessellation (k-means).
---

Place $k$ points $p_1, \ldots, p_k$ in the plane (called **generators**). The [Voronoi cell](https://en.wikipedia.org/wiki/Voronoi_diagram) of $p_i$ is

$$
V_i \;=\; \{x \in \mathbb{R}^2 : \|x - p_i\| \le \|x - p_j\| \text{ for all } j \ne i\}.
$$

Each cell is a convex polygon, and the cells together partition the plane. Random generators give cells of varied sizes and shapes. Carefully placed generators give cells that are all similar to each other, like a tiling of identical hexagons. There is a procedure that takes any starting configuration and pulls it toward this kind of uniform tiling.

## Lloyd's algorithm

At each step:

1. Compute the Voronoi cells $V_1, \ldots, V_k$ for the current generators.
2. Replace each generator $p_i$ with the **centroid** of its cell:
   $$
   p_i' \;=\; \frac{1}{|V_i|} \int_{V_i} x \, dx.
   $$
3. Repeat.

This is **Lloyd's algorithm** (Lloyd, 1957/1982). It decreases the total squared distance from each point in the plane to its nearest generator at every step (an **energy function**, also called a [**Lyapunov function**](https://en.wikipedia.org/wiki/Lyapunov_function): a quantity that only ever goes down, so the configuration cannot cycle and must settle), so it converges to a local minimum.

The fixed points are configurations where every generator is *already* at the centroid of its own cell. These are called **centroidal Voronoi tessellations** (CVTs). On flat domains, the cells of a CVT are nearly hexagonal: among polygons that tile the plane, hexagons minimize the second moment of area per unit area, so the algorithm seeks them out (see [The bees](#the-bees) for more details on this minimization).

Click on the canvas to add generators. Drag a generator to move it. Each cell carries a small cross at its centroid, joined to the generator by a dashed line: that line is exactly the move the next Lloyd step will make. Press **step** to run one iteration, or **run** to iterate until convergence, and watch every generator chase its cross until the two coincide and the cells round out.

<div class="vo-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.92em;"><button id="vo-step" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">step</button><button id="vo-run" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">run</button><button id="vo-rand" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">random 24 generators</button><button id="vo-clear" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">clear</button><span>generators: <strong id="vo-k">0</strong></span><span>iteration: <strong id="vo-iter">0</strong></span><span>mean squared distance: <strong id="vo-energy">&mdash;</strong> px&sup2;</span><span id="vo-conv" style="color: #16a34a; font-weight: 600;"></span><span style="font-style: italic;">click to add · drag to move</span></div><canvas id="vo-canvas" width="640" height="400" style="width: 100%; max-width: 640px; height: auto; display: block; margin: 0 auto; cursor: crosshair;" aria-label="Voronoi tessellation; click to add generators, drag to move them, press step or run to iterate Lloyd's algorithm."></canvas><div style="margin-top: 0.7rem; font-size: 0.85em; line-height: 1.7; display: flex; flex-wrap: wrap; column-gap: 1.6rem; row-gap: 0.2rem;"><span style="white-space: nowrap;"><svg width="13" height="13" viewBox="0 0 13 13" style="display: inline-block; vertical-align: -2px;"><circle cx="6.5" cy="6.5" r="4.5" fill="#000000"/><circle cx="6.5" cy="6.5" r="3" fill="#ffffff"/></svg> generator</span><span><svg width="13" height="13" viewBox="0 0 13 13" style="display: inline-block; vertical-align: -2px;"><path d="M1.5 6.5 H11.5 M6.5 1.5 V11.5" stroke="#ffffff" stroke-width="3"/><path d="M1.5 6.5 H11.5 M6.5 1.5 V11.5" stroke="#000000" stroke-width="1.5"/></svg> centroid of its cell; the dashed line is the move the next step will make</span></div></div>
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
  var energyDisp = document.getElementById('vo-energy');
  var convDisp = document.getElementById('vo-conv');
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
      energyDisp.textContent = '—';
      return;
    }
    var k = gens.length;
    var bestIdx = new Int32Array(W * H);
    var sumX = new Float64Array(k), sumY = new Float64Array(k), count = new Float64Array(k);
    var energy = 0;
    for (var py = 0; py < H; py++) {
      for (var px = 0; px < W; px++) {
        var bI = 0, bD = Infinity;
        for (var i = 0; i < gens.length; i++) {
          var dx = px - gens[i].x, dy = py - gens[i].y;
          var d = dx * dx + dy * dy;
          if (d < bD) { bD = d; bI = i; }
        }
        bestIdx[py * W + px] = bI;
        sumX[bI] += px; sumY[bI] += py; count[bI]++;
        energy += bD;
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
    for (var i = 0; i < k; i++) {
      if (count[i] === 0) continue;
      var cx = sumX[i] / count[i], cy = sumY[i] / count[i];
      ctx.strokeStyle = 'rgba(0,0,0,0.55)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(gens[i].x, gens[i].y);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
      ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
      ctx.stroke();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
      ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
      ctx.stroke();
    }
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
    energyDisp.textContent = (energy / (W * H)).toFixed(0);
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
    var maxMove = 0;
    for (var i = 0; i < k; i++) {
      if (count[i] > 0) {
        var nx = sumX[i] / count[i], ny = sumY[i] / count[i];
        var mv = Math.sqrt((nx - gens[i].x) * (nx - gens[i].x) + (ny - gens[i].y) * (ny - gens[i].y));
        if (mv > maxMove) maxMove = mv;
        gens[i].x = nx; gens[i].y = ny;
      }
    }
    iter++;
    return maxMove;
  }
  function setConv(maxMove) {
    convDisp.textContent = (gens.length > 0 && maxMove < 0.3) ? 'converged' : '';
  }
  canvas.addEventListener('mousedown', function (ev) {
    var rect = canvas.getBoundingClientRect();
    var px = (ev.clientX - rect.left) * (W / rect.width);
    var py = (ev.clientY - rect.top) * (H / rect.height);
    var idx = findNearestGen(px, py);
    if (idx >= 0) { dragIdx = idx; convDisp.textContent = ''; }
    else { gens.push({ x: px, y: py }); convDisp.textContent = ''; render(); }
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
  stepBtn.addEventListener('click', function () { var mv = lloydStep(); render(); setConv(mv); });
  var running = false;
  runBtn.addEventListener('click', function () {
    if (running) return;
    running = true;
    var i = 0;
    function next() {
      if (i >= 150 || gens.length === 0) { running = false; return; }
      var mv = lloydStep(); render(); i++;
      setConv(mv);
      if (mv < 0.3) { running = false; return; }
      setTimeout(next, 60);
    }
    next();
  });
  randBtn.addEventListener('click', function () {
    gens = []; iter = 0; convDisp.textContent = '';
    for (var i = 0; i < 24; i++) gens.push({ x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 60) });
    render();
  });
  clearBtn.addEventListener('click', function () { gens = []; iter = 0; convDisp.textContent = ''; render(); });
  // initial state
  for (var i = 0; i < 18; i++) gens.push({ x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 60) });
  render();
})();
</script>

Press **random 24 generators** for a fresh starting configuration, then **run** to watch Lloyd converge. Press **step** if you want to see the iteration in single-step mode; **converged** appears once a step no longer moves any generator by a visible amount.

After enough iterations on a rectangular domain, the cells become approximately hexagonal in the interior and adapt to the boundary near the edges. The convergence is monotone in the energy

$$
F(p_1, \ldots, p_k) \;=\; \sum_{i=1}^{k} \int_{V_i} \|x - p_i\|^2 \, dx,
$$

the total squared distance to the nearest generator. Each step strictly decreases $F$ unless the configuration is already a CVT. The **mean squared distance** readout in the widget is exactly $F$ divided by the area of the canvas, so the monotone decrease is visible directly: press **step** repeatedly and the number never goes up.

## Connections

- **k-means clustering.** Lloyd's algorithm is the algorithm typically called "k-means". Given a finite point cloud and $k$ cluster centers, [k-means](https://en.wikipedia.org/wiki/K-means_clustering) alternates "assign each point to the nearest center" (the discrete analog of computing Voronoi cells) and "move each center to the centroid of its cluster" (the discrete analog of step 2). Continuous Lloyd's is the limiting case where the finite point cloud is replaced by a **uniform measure** on a domain: instead of summing over discrete points, you integrate uniformly over the whole region. k-means inherits its convergence properties from the same energy-decrease argument.
- **Vector quantization.** Designing optimal **codebooks** (a small fixed set of representative values used to approximate a signal) for compressing continuous signals. The optimal $k$-point codebook for squared error is exactly a CVT of the source distribution.
- **Mesh generation.** CVT meshes are popular for finite-element methods because they have well-conditioned cells (no slivers, near-uniform sizes).
- **Stippling and natural patterns.** Lloyd's algorithm produces visually pleasing **blue noise** point distributions (points spread out evenly with no clumps or regular grid pattern) used in computer graphics; biological tissues and bee compound eyes settle into similar hexagonal arrangements through different mechanisms but for similar reasons.

## The bees

Bees build approximately hexagonal honeycombs, and they are often described as running Lloyd's algorithm in nature. Not quite: there are two distinct mathematical optimality statements that both have the hexagonal tiling as their answer in 2D, and bees and Lloyd's algorithm solve different ones.

[**Hales's Honeycomb Theorem**](https://en.wikipedia.org/wiki/Honeycomb_conjecture) (Hales, 2001). Among all tilings of the plane into regions of equal area, the regular hexagonal tiling minimizes the total perimeter. This is the optimization that minimizes wax usage for a given total storage volume. The conjecture goes back at least to Pappus of Alexandria in the fourth century AD; the proof is modern.

**Lloyd's CVT** in the flat-domain, uniform-density limit minimizes a different functional, the second moment of area per unit area:

$$
\frac{1}{|V|} \int_V \|x - p\|^2 \, dx,
$$

where $p$ is the centroid of $V$.

The integrand $\|x - p\|^2$ is the squared distance from a point of the cell to its centroid. Its integral $\int_V \|x - p\|^2 \, dx$ is the [second moment of area](https://en.wikipedia.org/wiki/Second_moment_of_area) of $V$ about its centroid: a measure of how spread out the cell is, small for compact round cells and large for elongated or branching ones. Dividing by $|V|$ gives the average value of $\|x - p\|^2$ over a uniformly random point of $V$.

For shapes of fixed area, this average depends only on the shape of $V$, not its size. The minimum over *all* shapes of a given area is achieved by the disk (round cells have the lowest spread), but disks do not tile the plane. The relevant question for Lloyd's algorithm is therefore: among shapes that *do* tile the plane, which one is closest to a disk in this sense? With cells of unit area, the comparison among the three regular polygons that tile, plus the disk for reference, is

- disk: $\dfrac{1}{2\pi} \approx 0.1592$ (the absolute minimum over all shapes),
- regular hexagon: $\dfrac{5}{18\sqrt{3}} \approx 0.1604$,
- square: $\dfrac{1}{6} \approx 0.1667$,
- equilateral triangle: $\dfrac{\sqrt{3}}{9} \approx 0.1925$.

The hexagon comes within $0.7\%$ of the disk lower bound; the square is about $5\%$ over, the triangle about $21\%$ over. Among convex polygons that tile the plane (not only the regular ones), the regular hexagon minimizes this functional (L. Fejes Tóth, 1959). The analogous statement in $d \ge 3$, that the optimal tiling for this same second-moment functional (the moment of inertia of a uniform cell) is by [**truncated octahedra**](https://en.wikipedia.org/wiki/Truncated_octahedron) (the 14-faced space-filling solid), is **Gersho's conjecture**, still open in general dimensions.

So the perimeter minimum and the moment-of-inertia minimum are mathematically distinct objectives, but they happen to be solved by the same shape in 2D. That is the reason bees and k-means converge on hexagons through completely unrelated processes.

The bee mechanism is not direct geometry. Bees do not measure angles. The accepted picture, going back to D'Arcy Thompson (1917) and experimentally confirmed by Karihaloo, Zhang, and Wang (2013), is that bees first build approximately *circular* cells out of soft wax, and the wax then relaxes under the heat of the bees' bodies and the equal mutual pressure of neighboring cells. Surface tension drives the boundaries to a configuration that minimizes wax for fixed cell area, which by the Honeycomb Theorem is the hexagonal tiling.

In this sense, *bees do calculus* the same way *soap films do calculus*: the physical system minimizes the same variational integral that the mathematical statement names. Lloyd's algorithm solves a different but adjacent variational problem by direct iteration, and arrives at the same answer because the answer is hexagons either way.

## References

- Stuart P. Lloyd. *Least squares quantization in PCM*. Bell Laboratories Technical Note, 1957; published in IEEE Transactions on Information Theory, 28(2):129-137, 1982.
- Qiang Du, Vance Faber, Max Gunzburger. *Centroidal Voronoi tessellations: Applications and algorithms*. SIAM Review, 41(4):637-676, 1999.
- Atsuyuki Okabe, Barry Boots, Kokichi Sugihara, Sung Nok Chiu. *Spatial Tessellations: Concepts and Applications of Voronoi Diagrams*. Wiley, 2000.
- Thomas C. Hales. *The honeycomb conjecture*. Discrete and Computational Geometry, 25(1):1-22, 2001.
- László Fejes Tóth. *Sur la représentation d'une population infinie par un nombre fini d'éléments*. Acta Mathematica Academiae Scientiarum Hungaricae, 10:299-304, 1959. The hexagon moment theorem cited in the text.
- L. Fejes Tóth. *What the bees know and what they do not know*. Bulletin of the American Mathematical Society, 70(4):468-481, 1964.
- B. L. Karihaloo, K. Zhang, J. Wang. *Honeybee combs: how the circular cells transform into rounded hexagons*. Journal of the Royal Society Interface, 10(86):20130299, 2013.
- D'Arcy Wentworth Thompson. *On Growth and Form*. Cambridge University Press, 1917.
- Allen Gersho. *Asymptotically optimal block quantization*. IEEE Transactions on Information Theory, 25(4):373-380, 1979.
