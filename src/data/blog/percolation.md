---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-04T09:40:00Z
title: Percolation
slug: percolation
featured: false
draft: false
tags:
  - mathematics
  - statistics
description:
  "Keep each edge of a grid with probability p and ask whether a path crosses the grid. The answer flips at a sharp threshold, exactly 1/2 on the square lattice by self-duality."
---

Take an enormous square grid of vertices, with edges joining horizontal and vertical neighbors. Keep each edge independently with probability $p$ and delete it otherwise. The kept edges carve the vertices into connected **clusters**. [Broadbent and Hammersley](https://doi.org/10.1017/S0305004100032680) introduced this model in 1957 to describe a fluid spreading through a random porous medium (the motivating example was gas diffusing through the carbon granules of a gas-mask filter): kept edges are open channels, and a cluster is the region a drop of fluid can reach. The model is called **bond percolation**, and its central question is whether an infinite cluster exists, that is, whether the fluid can seep arbitrarily far from where it entered.

For small $p$ the answer should clearly be no, and for $p$ close to $1$ clearly yes. What is not obvious is what happens in between. The clusters could grow gradually richer, with the chance of large-scale connection improving smoothly. That is not what happens. There is a sharp **critical probability** $p_c$ below which every cluster is finite and above which an infinite cluster exists, and for the square lattice the constant is exact:

$$
p_c = \tfrac{1}{2}.
$$

## The phase transition

Write $\theta(p)$ for the probability that a fixed vertex, say the origin, belongs to an infinite cluster. Two soft arguments pin down the shape of this function before any hard work.

First, $\theta$ is non-decreasing in $p$. Attach to each edge $e$ an independent uniform random number $U_e$ on $[0,1]$, once and for all, and declare $e$ open at level $p$ when $U_e < p$. Raising $p$ then only ever adds open edges, so any infinite cluster present at a lower $p$ survives to every higher $p$. This device (one source of randomness, a whole family of coupled configurations) is the **monotone coupling**, and the widget below runs on it: the slider re-thresholds fixed randomness rather than resampling.

Second, whether an infinite cluster exists *somewhere* does not depend on any finite set of edges, so [Kolmogorov's zero-one law](https://en.wikipedia.org/wiki/Kolmogorov%27s_zero%E2%80%93one_law) (an event unaffected by any finite portion of the randomness has probability $0$ or $1$) makes its probability exactly $0$ or exactly $1$ at each $p$, never something in between. Combined with monotonicity, there is a single threshold $p_c$: below it, no infinite cluster, almost surely; above it, an infinite cluster exists almost surely (and a separate theorem says it is unique). In one dimension $p_c = 1$, since any $p < 1$ leaves infinitely many deleted edges on each side of the origin. In two dimensions the transition is genuine: $0 < p_c < 1$.

## Crossing a finite grid

On a finite grid the question becomes: does a path of open edges cross from the left side to the right? Drag $p$ and watch the answer flip. The crossing cluster is highlighted in blue. When no crossing exists, check the box to see what blocks it: a red wall built from deleted edges, running from top to bottom.

<div class="pc-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">p<input type="range" id="pc-p" min="0" max="1" step="0.01" value="0.5" style="flex: 1;"></label><span>p = <strong id="pc-pval" style="display: inline-block; min-width: 2.8em;">0.50</strong></span><button id="pc-resample" type="button" style="padding: 0.2rem 0.55rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">resample</button><label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;"><input type="checkbox" id="pc-dual" checked>show blocking wall</label></div><div style="display: flex; gap: 0.5rem 1.5rem; flex-wrap: wrap; font-size: 0.95em; margin-bottom: 0.75rem;"><span>left-right crossing: <strong id="pc-cross" style="display: inline-block; min-width: 2.4em;">–</strong></span><span>largest cluster: <strong id="pc-big" style="display: inline-block; min-width: 3.4em;">–</strong> of vertices</span></div><svg id="pc-svg" viewBox="0 0 600 440" style="width: 100%; height: auto; max-width: 600px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Bond percolation on a grid: open edges drawn in grey, the left-right crossing cluster in blue, and when no crossing exists, a red top-to-bottom wall of deleted edges."></svg></div>
<script>
(function () {
  var slider = document.getElementById('pc-p');
  if (!slider) return;
  var pDisp = document.getElementById('pc-pval');
  var crossDisp = document.getElementById('pc-cross');
  var bigDisp = document.getElementById('pc-big');
  var resampleBtn = document.getElementById('pc-resample');
  var dualBox = document.getElementById('pc-dual');
  var svg = document.getElementById('pc-svg');
  var W = 25, H = 18, SP = 22, X0 = 36, Y0 = 28;
  var OPEN_W = 1.5, CLUSTER = '#2563eb', WALL = '#dc2626';
  function vx(i) { return X0 + i * SP; }
  function vy(j) { return Y0 + j * SP; }
  var edges = [];
  for (var j = 0; j < H; j++) for (var i = 0; i < W - 1; i++) edges.push({ a: j * W + i, b: j * W + i + 1, t: 'h', i: i, j: j, u: 0 });
  for (var j2 = 0; j2 < H - 1; j2++) for (var i2 = 0; i2 < W; i2++) edges.push({ a: j2 * W + i2, b: (j2 + 1) * W + i2, t: 'v', i: i2, j: j2, u: 0 });
  function resample() { for (var e = 0; e < edges.length; e++) edges[e].u = Math.random(); }
  resample();
  function UF(n) {
    var par = new Array(n);
    for (var k = 0; k < n; k++) par[k] = k;
    function find(x) { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; }
    return { find: find, union: function (x, y) { var rx = find(x), ry = find(y); if (rx !== ry) par[rx] = ry; } };
  }
  var NF = (W - 1) * (H - 1), TOP = NF, BOT = NF + 1;
  function fid(i, j) { return j * (W - 1) + i; }
  function update() {
    var p = parseFloat(slider.value);
    pDisp.textContent = p.toFixed(2);
    var uf = UF(W * H);
    var duf = UF(NF + 2);
    for (var e = 0; e < edges.length; e++) {
      var ed = edges[e];
      if (ed.u < p) {
        uf.union(ed.a, ed.b);
      } else if (ed.t === 'h') {
        duf.union(ed.j === 0 ? TOP : fid(ed.i, ed.j - 1), ed.j === H - 1 ? BOT : fid(ed.i, ed.j));
      } else if (ed.i > 0 && ed.i < W - 1) {
        duf.union(fid(ed.i - 1, ed.j), fid(ed.i, ed.j));
      }
    }
    var leftRoots = {}, crossRoot = -1;
    for (var r = 0; r < H; r++) leftRoots[uf.find(r * W)] = true;
    for (var r2 = 0; r2 < H; r2++) { var rt = uf.find(r2 * W + W - 1); if (leftRoots[rt]) { crossRoot = rt; break; } }
    var sizes = {}, bigSize = 0;
    for (var v = 0; v < W * H; v++) { var rv = uf.find(v); sizes[rv] = (sizes[rv] || 0) + 1; if (sizes[rv] > bigSize) bigSize = sizes[rv]; }
    var wallExists = duf.find(TOP) === duf.find(BOT);
    var wallRoot = duf.find(TOP);
    crossDisp.textContent = crossRoot >= 0 ? 'yes' : 'no';
    bigDisp.textContent = Math.round(100 * bigSize / (W * H)) + '%';
    var out = '';
    for (var jj = 0; jj < H; jj++) for (var ii = 0; ii < W; ii++) out += '<circle cx="' + vx(ii) + '" cy="' + vy(jj) + '" r="1.4" fill="currentColor" fill-opacity="0.25"/>';
    var grey = '', blue = '', red = '';
    for (var e2 = 0; e2 < edges.length; e2++) {
      var d = edges[e2];
      var x1 = vx(d.i), y1 = vy(d.j);
      var x2 = d.t === 'h' ? vx(d.i + 1) : x1;
      var y2 = d.t === 'h' ? y1 : vy(d.j + 1);
      if (d.u < p) {
        if (crossRoot >= 0 && uf.find(d.a) === crossRoot) blue += 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + ' ';
        else grey += 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + ' ';
      } else if (dualBox.checked && wallExists) {
        var d1 = -1, d2 = -1, px1, py1, px2, py2;
        if (d.t === 'h') {
          var mx = (x1 + x2) / 2;
          d1 = d.j === 0 ? TOP : fid(d.i, d.j - 1);
          d2 = d.j === H - 1 ? BOT : fid(d.i, d.j);
          px1 = mx; py1 = d.j === 0 ? Y0 - 11 : vy(d.j - 1) + SP / 2;
          px2 = mx; py2 = d.j === H - 1 ? vy(H - 1) + 11 : vy(d.j) + SP / 2;
        } else if (d.i > 0 && d.i < W - 1) {
          var my = (y1 + y2) / 2;
          d1 = fid(d.i - 1, d.j); d2 = fid(d.i, d.j);
          px1 = vx(d.i - 1) + SP / 2; py1 = my;
          px2 = vx(d.i) + SP / 2; py2 = my;
        }
        if (d1 >= 0 && duf.find(d1) === wallRoot && duf.find(d2) === wallRoot) {
          red += 'M' + px1 + ',' + py1 + 'L' + px2 + ',' + py2 + ' ';
        }
      }
    }
    out += '<path d="' + grey + '" stroke="currentColor" stroke-opacity="0.45" stroke-width="' + OPEN_W + '" fill="none"/>';
    if (red) out += '<path d="' + red + '" stroke="' + WALL + '" stroke-opacity="0.8" stroke-width="2" fill="none"/>';
    if (blue) out += '<path d="' + blue + '" stroke="' + CLUSTER + '" stroke-width="2.6" fill="none"/>';
    svg.innerHTML = out;
  }
  slider.addEventListener('input', update);
  dualBox.addEventListener('change', update);
  resampleBtn.addEventListener('click', function () { resample(); update(); });
  update();
})();
</script>

On a finite grid the transition is blurred: near $p = 0.5$, resampling flips the outcome back and forth, and the crossing probability climbs from near $0$ to near $1$ over a window of $p$ values. The window narrows polynomially as the grid grows, so on an infinite lattice the blur closes up into the sharp threshold.

## Self-duality pins the threshold at one half

The blocking wall in the widget is not a visual aid bolted on after the fact; it is the other half of an exact dichotomy, and it is the reason $p_c = \tfrac12$.

Place a new vertex in the center of each face of the grid, and join two of these new vertices when their faces share an edge. This **dual lattice** is again a square grid, shifted by half a step. Each original edge is crossed by exactly one dual edge; declare the dual edge open exactly when the original edge is deleted. Then a topological fact about the plane does the work: *either* an open path crosses the rectangle left to right, *or* a dual open path crosses it top to bottom, and never both. A path and a wall cannot avoid each other in the plane. (The widget computes both sides independently; they disagree on every sample, at every $p$, as they must.)

Now count parameters. Original edges are open with probability $p$; dual edges are open with probability $1 - p$; and the dual lattice is the same lattice. At $p = \tfrac12$ the model becomes its own dual: the path and the wall have identical statistics, and neither side of the dichotomy can be the overwhelmingly likely one. On an $(n+1) \times n$ rectangle the symmetry is exact, and the probability of a left-right crossing at $p = \tfrac12$ is exactly $\tfrac12$, for every $n$.

This symmetry argument makes $p_c = \tfrac12$ the only reasonable answer, but promoting it to a proof took thirty years. [Harris (1960)](https://doi.org/10.1017/S0305004100034241) proved that at $p = \tfrac12$ there is no infinite cluster, so $p_c \ge \tfrac12$. The matching bound resisted until [Kesten (1980)](https://doi.org/10.1007/BF01197577) proved $p_c = \tfrac12$ exactly. Below the threshold, more is true: the probability that the cluster of the origin reaches distance $n$ decays exponentially in $n$, so subcritical clusters are not just finite but small.

The exactness is fragile. Change the model slightly, to **site percolation** (keep or delete *vertices* instead of edges) on the same square lattice, and self-duality is lost. The threshold is now known only numerically, $p_c \approx 0.592746$ ([Newman and Ziff, 2000](https://doi.org/10.1103/PhysRevLett.85.4104)); no closed form for it is known, or expected. Site percolation on the [*triangular* lattice](https://en.wikipedia.org/wiki/Triangular_lattice) recovers a symmetry of its own and has $p_c = \tfrac12$ exactly again. Whether the constant is exact is a fact about the lattice's symmetries, not about percolation itself.

## The critical point

At $p = p_c$ the system is in neither phase, and its geometry becomes scale-free: clusters of every size, holes of every size, no characteristic length. Two theorems describe this critical state.

- **Conformal invariance.** [Smirnov (2001)](https://doi.org/10.1016/S0764-4442(01)01991-7) proved that for site percolation on the triangular lattice, crossing probabilities of regions converge, as the lattice spacing shrinks, to limits that are invariant under [conformal](https://en.wikipedia.org/wiki/Conformal_map) (angle-preserving) transformations of the region, and computed them (verifying a formula conjectured by [Cardy](https://en.wikipedia.org/wiki/John_Cardy)). The zoomed-out critical picture does not remember the lattice at all.
- **[Critical exponents](https://en.wikipedia.org/wiki/Percolation_critical_exponents).** Building on this, [Smirnov and Werner (2001)](https://arxiv.org/abs/math/0109120) proved that on that lattice $\theta(p) = (p - p_c)^{5/36 + o(1)}$ as $p \downarrow p_c$. The infinite cluster is born with zero density and grows with a universal exponent.

These results are proven for one lattice. The **universality conjecture**, that the same exponents govern bond percolation on the square lattice and every other planar lattice, matches simulations but remains unproven. So does the most basic question in three dimensions: whether $\theta(p_c) = 0$ for the cubic lattice, that is, whether an infinite cluster is absent exactly at the critical point, is open. (It is proven in the plane by Harris's theorem, and in high dimensions, $d \ge 11$, by [expansion methods](https://doi.org/10.1214/17-EJP56); the physically relevant case $d = 3$ has resisted every approach.)

## Applications

- **Porous media.** The original one: a rock is permeable when its pore network is above threshold. The transition explains the observed all-or-nothing character of permeability, and $\theta(p)$ is the fraction of pore space that actually conducts.
- **Epidemics.** In the simplest epidemic models, an infection crosses each contact-network edge independently with some transmission probability. An outbreak reaches a positive fraction of the population precisely when that probability exceeds the network's percolation threshold; vaccination works by deleting enough vertices to push the network below it.
- **Random graphs.** Percolation on the complete graph on $n$ vertices, with $p = c/n$, is the [Erdős–Rényi random graph](https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model): at $c = 1$ a [giant component](https://en.wikipedia.org/wiki/Giant_component) covering a positive fraction of all vertices appears. The sharp emergence of the giant component is the same phase transition in a geometry-free setting.

## References

- Simon R. Broadbent, John M. Hammersley. *Percolation processes. I. Crystals and mazes*. Proceedings of the Cambridge Philosophical Society, 53:629-641, 1957. The model's introduction.
- Theodore E. Harris. *A lower bound for the critical probability in a certain percolation process*. Proceedings of the Cambridge Philosophical Society, 56:13-20, 1960. No infinite cluster at $p = 1/2$.
- Harry Kesten. *The critical probability of bond percolation on the square lattice equals 1/2*. Communications in Mathematical Physics, 74(1):41-59, 1980. The matching upper bound.
- Stanislav Smirnov. *Critical percolation in the plane: conformal invariance, Cardy's formula, scaling limits*. Comptes Rendus de l'Académie des Sciences, Série I, 333(3):239-244, 2001. Conformal invariance for triangular-lattice site percolation.
- Stanislav Smirnov, Wendelin Werner. *Critical exponents for two-dimensional percolation*. Mathematical Research Letters, 8:729-744, 2001. The exponent $5/36$, among others.
- Mark E. J. Newman, Robert M. Ziff. *Efficient Monte Carlo algorithm and high-precision results for percolation*. Physical Review Letters, 85(19):4104-4107, 2000. The numerical value of the site-percolation threshold.
- Robert Fitzner, Remco van der Hofstad. *Mean-field behavior for nearest-neighbor percolation in d > 10*. Electronic Journal of Probability, 22, paper no. 43, 2017. Criticality in high dimensions.
