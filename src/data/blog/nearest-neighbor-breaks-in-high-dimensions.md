---
author: Aseem Baranwal
pubDatetime: 2026-04-19T10:00:00Z
title: Nearest neighbor breaks in high dimensions
slug: nearest-neighbor-breaks-in-high-dimensions
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  In high dimensions, all pairwise distances become essentially equal. Nearest and farthest neighbor are no longer meaningfully different. A short geometric tour of the curse of dimensionality.
---

[k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) is one of the most basic ML algorithms: classify a query by looking at its closest few training points. It works beautifully on low-dimensional data. On high-dimensional data, it just stops working.

The reason has a name (the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality)) and a sharp geometric statement: in high dimensions, all pairwise distances become essentially the same. Nearest and farthest neighbor are no longer meaningfully different.

## The phenomenon

Take $n$ points uniformly at random in the unit cube $[0, 1]^d$. Pick any pair $X, Y$ and look at their squared distance:

$$
\|X - Y\|^2 \;=\; \sum_{i=1}^d (X_i - Y_i)^2.
$$

Each term $(X_i - Y_i)^2$ is independent across coordinates with mean $\tfrac{1}{6}$ (a one-line computation: for $U, V \stackrel{\text{iid}}{\sim} \mathrm{Unif}[0,1]$, $\mathbb{E}[(U-V)^2] = \tfrac{1}{6}$) and finite variance $\tfrac{7}{180}$.

By the [law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers),

$$
\frac{1}{d}\|X - Y\|^2 \;\longrightarrow\; \frac{1}{6} \quad \text{a.s. as } d \to \infty.
$$

So $\|X - Y\| \approx \sqrt{d/6}$, with this radius being the *same for every pair*. The fluctuations around it are of order $1/\sqrt{d}$ by the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). The histogram of pairwise distances among 50 random points pinches around $\sqrt{d/6}$ as $d$ grows; by $d = 100$, all pairs sit within a few percent of the same distance.

Slide $d$:

<div class="dc-widget" style="margin: 1.5rem 0; padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">dimension <em>d</em><input type="range" id="dc-slider" min="1" max="500" value="3" style="flex: 1;"></label><span><em>d</em> = <strong id="dc-d">3</strong></span><span>mean dist = <strong id="dc-mean">0.66</strong></span><span>std/mean = <strong id="dc-rel">0.40</strong></span><span>max/min = <strong id="dc-ratio">5.4</strong></span></div><svg id="dc-svg" viewBox="0 0 720 280" style="width: 100%; height: auto;" aria-label="Histogram of pairwise distances among 40 random points in the d-dim unit cube."></svg></div>
<script>
(function () {
  var slider = document.getElementById('dc-slider');
  if (!slider) return;
  var dDisp = document.getElementById('dc-d');
  var meanDisp = document.getElementById('dc-mean');
  var relDisp = document.getElementById('dc-rel');
  var ratioDisp = document.getElementById('dc-ratio');
  var svg = document.getElementById('dc-svg');
  function update() {
    var d = parseInt(slider.value, 10);
    var n = 40;
    var pts = new Array(n);
    for (var i = 0; i < n; i++) {
      var p = new Array(d);
      for (var j = 0; j < d; j++) p[j] = Math.random();
      pts[i] = p;
    }
    var nPairs = n * (n - 1) / 2;
    var dists = new Array(nPairs);
    var k = 0;
    var mn = Infinity, mx = -Infinity, mean = 0;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var s = 0;
        for (var t = 0; t < d; t++) { var v = pts[i][t] - pts[j][t]; s += v * v; }
        var dd = Math.sqrt(s);
        dists[k++] = dd;
        if (dd < mn) mn = dd;
        if (dd > mx) mx = dd;
        mean += dd;
      }
    }
    mean /= nPairs;
    var vv = 0;
    for (var i = 0; i < nPairs; i++) { var t = dists[i] - mean; vv += t * t; }
    vv /= nPairs;
    var std = Math.sqrt(vv);
    dDisp.textContent = d;
    meanDisp.textContent = mean.toFixed(2);
    relDisp.textContent = (std / mean).toFixed(3);
    ratioDisp.textContent = (mx / mn).toFixed(2);
    var w = 720, h = 280;
    var padL = 50, padR = 20, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var xMin = 0;
    var xMax = Math.max(mean * 1.4 + 1, 4);
    var nBins = 50;
    var binW = (xMax - xMin) / nBins;
    var bins = new Array(nBins);
    for (var i = 0; i < nBins; i++) bins[i] = 0;
    for (var i = 0; i < nPairs; i++) {
      var b = Math.floor((dists[i] - xMin) / binW);
      if (b >= 0 && b < nBins) bins[b]++;
    }
    var maxB = 0;
    for (var i = 0; i < nBins; i++) if (bins[i] > maxB) maxB = bins[i];
    if (maxB === 0) maxB = 1;
    function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPx(y) { return (h - padB) - y / maxB * plotH; }
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    var slot = plotW / nBins;
    var bw = slot * 0.92;
    for (var i = 0; i < nBins; i++) {
      if (bins[i] === 0) continue;
      var bx = padL + i * slot + (slot - bw) / 2;
      var by = yPx(bins[i]);
      var bh = (h - padB) - by;
      s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="#2563eb" fill-opacity="0.7"/>';
    }
    var theory = Math.sqrt(d / 6);
    var tx = xPx(theory);
    s += '<line x1="' + tx.toFixed(1) + '" y1="' + padT + '" x2="' + tx.toFixed(1) + '" y2="' + (h - padB) + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 3"/>';
    s += '<text x="' + (tx + 6).toFixed(1) + '" y="' + (padT + 14) + '" font-size="11" font-style="italic" fill="#dc2626">√(d/6)</text>';
    var step = xMax > 8 ? 2 : (xMax > 4 ? 1 : 0.5);
    for (var t = 0; t <= xMax + 1e-9; t += step) {
      var tpx = xPx(t);
      s += '<line x1="' + tpx + '" y1="' + (h - padB) + '" x2="' + tpx + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + tpx + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.7">' + (Number.isInteger(t) ? t : t.toFixed(1)) + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75">pairwise distance ‖X − Y‖</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75" transform="rotate(-90 14 ' + (h / 2) + ')">count</text>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

The headline numbers tell the same story. The mean distance grows as $\sqrt{d/6}$. The ratio std/mean shrinks like $1/\sqrt{d}$. By $d = 100$, the maximum and minimum pairwise distances differ by less than 30 %; by $d = 500$, less than 12 %. For comparison, in $d = 1$ the maximum distance is roughly five times the minimum.

## What this does to k-nearest neighbors

kNN works by ranking training points by distance to a query and using the closest few. If every training point is at essentially the same distance, the ranking is essentially random, driven by tiny fluctuations rather than signal. The nearest neighbor is no more informative than a random training point.

Beyer, Goldstein, Ramakrishnan, and Shaft made this precise in 1999 in a paper titled exactly *When is "nearest neighbor" meaningful?* The answer, roughly: not when the dimension is large compared to the number of points and the data has no low-dimensional structure. Their main result:

$$
\frac{\max_{i \ne j} \|X_i - X_j\| \;-\; \min_{i \ne j} \|X_i - X_j\|}{\min_{i \ne j} \|X_i - X_j\|} \;\xrightarrow{p}\; 0
$$

as $d \to \infty$ for fixed $n$, under mild moment conditions on the coordinate distribution. Maximum and minimum pairwise distances are within an arbitrarily small relative gap.

## Why the math works

Let $D_d := \|X - Y\|^2 / d$ be the average squared coordinate difference between $X, Y \stackrel{\text{iid}}{\sim} \mathrm{Unif}[0,1]^d$. By construction, $D_d$ is the average of $d$ i.i.d. random variables with mean $\tfrac{1}{6}$ and variance $\sigma^2 = \tfrac{7}{180}$.

LLN: $D_d \to \tfrac{1}{6}$ a.s. CLT: $\sqrt{d}\,(D_d - \tfrac{1}{6}) \to \mathcal{N}(0, \sigma^2)$. So $D_d \approx \tfrac{1}{6} \pm \sigma/\sqrt{d}$, and

$$
\frac{\mathrm{std}(\|X - Y\|)}{\mathbb{E}[\|X - Y\|]} \;=\; O\!\left(\frac{1}{\sqrt{d}}\right) \to 0.
$$

The story is the same for [Gaussian features](/blog/high-dimensional-gaussians-on-a-sphere) (Vershynin, Ch. 5) and for any product distribution with finite second moment. It is fundamentally a [concentration of measure](https://en.wikipedia.org/wiki/Concentration_of_measure) phenomenon.

## What to do instead

A few common tactics, none free:

1. **Reduce dimension first.** [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis), autoencoders, or random projection ([Johnson–Lindenstrauss](https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma)) before applying distance-based methods.
2. **Learn a metric.** A learned similarity function (e.g., from a deep network) typically beats raw Euclidean distance.
3. **Use [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).** Direction in high dimensions is more stable than magnitude. Word and image embeddings essentially always use cosine.
4. **Exploit low-dimensional structure.** Real high-dim data often lives near a low-dimensional manifold. Methods that adapt to that structure dodge the curse rather than fighting it.

The first principle: the raw Euclidean metric on a high-dimensional ambient space is rarely the metric you actually want.

## References

- Kevin Beyer, Jonathan Goldstein, Raghu Ramakrishnan, Uri Shaft. *When is "nearest neighbor" meaningful?* International Conference on Database Theory, 1999.
- Roman Vershynin. *High-Dimensional Probability*. Cambridge University Press, 2018. Chapter 5 (concentration), Section 6.6 (random projections).
- Avrim Blum, John Hopcroft, Ravi Kannan. *Foundations of Data Science*. Cambridge University Press, 2020. Chapter 2.
