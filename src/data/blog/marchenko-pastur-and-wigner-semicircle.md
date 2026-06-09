---
author: Aseem Baranwal
pubDatetime: 2024-04-25T15:22:00Z
title: Marchenko-Pastur and the Wigner semicircle
slug: marchenko-pastur-and-wigner-semicircle
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  The eigenvalues of a large random matrix do not scatter around. They concentrate, as a histogram, on a deterministic shape. For sample covariance matrices the shape is Marchenko-Pastur; for symmetric matrices with i.i.d. entries it is the Wigner semicircle. Both shapes are computable, and they explain precisely why high-dimensional covariance estimation is biased.
---

The [central limit theorem](/blog/why-sums-become-gaussian) says that the *sum* of many independent random variables, properly standardized, converges to a deterministic shape (the Gaussian). [Random matrix theory](https://en.wikipedia.org/wiki/Random_matrix) gives the analogous statement for *spectra*: the eigenvalues of a large random matrix, taken together as a histogram, converge to a deterministic density. Two of the cleanest results are the **Marchenko-Pastur law** for sample covariance matrices and the **Wigner semicircle law** for symmetric matrices with i.i.d. entries.

The geometric content matters in machine learning: the bias of the sample covariance matrix, the failure of nearest-neighbor and PCA in high dimensions, and a chunk of modern shrinkage theory all live inside these two densities.

## Sample covariance matrices

Let $X$ be an $n \times d$ matrix with [i.i.d.](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) real entries of mean $0$ and variance $1$. The **sample covariance matrix** is

$$
S \;=\; \frac{1}{n}\, X^\top X \;\in\; \mathbb{R}^{d \times d}.
$$

Each entry $S_{ij} = (1/n) \sum_{k=1}^n X_{ki} X_{kj}$ is the empirical correlation between coordinates $i$ and $j$ across the $n$ rows of $X$. With true mean zero and unit variance, the *true* covariance is the identity $I_d$. By the [law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers), if $d$ is fixed and $n \to \infty$, then $S \to I_d$ entrywise, and every eigenvalue of $S$ approaches $1$.

This stops being true as soon as the dimension $d$ grows along with $n$. Consider the regime

$$
n, d \to \infty \quad\text{with}\quad d / n \to c \in (0, \infty).
$$

The dimension is now comparable to the sample size. The matrix $S$ no longer concentrates at $I_d$, and its eigenvalues do not pile up at $1$. Instead, they spread into a deterministic shape that depends only on the ratio $c$.

## The Marchenko-Pastur law

Marchenko and Pastur (1967) proved that, in the regime above, the empirical distribution of the eigenvalues of $S$ converges (in probability) to the **Marchenko-Pastur density**

$$
\rho_c(\lambda) \;=\; \frac{1}{2\pi c\, \lambda}\, \sqrt{(\lambda_+ - \lambda)(\lambda - \lambda_-)}, \qquad \lambda \in [\lambda_-, \lambda_+],
$$

where the endpoints are

$$
\lambda_\pm \;=\; (1 \pm \sqrt{c})^2.
$$

(For $c > 1$, the matrix $S$ has rank at most $n < d$, so $d - n$ of its eigenvalues are exactly $0$, contributing a point mass of weight $1 - 1/c$ at the origin. The remaining $n$ eigenvalues are spread on the same interval $[\lambda_-, \lambda_+]$.)

The endpoints depend only on $c$. The bulk straddles $1$ (the true eigenvalue of $I_d$) but is shifted and stretched by an amount determined entirely by the dimension-to-samples ratio. Three sanity checks:

- **$c \to 0$.** $\lambda_\pm \to 1$ from both sides, the density collapses to a point mass at $1$. This recovers the law of large numbers: with infinitely many samples per dimension, $S \to I_d$.
- **$c = 1$.** $\lambda_- = 0$, $\lambda_+ = 4$. The bulk spreads from $0$ to $4$, and a fraction of eigenvalues sit arbitrarily close to zero. The matrix is on the edge of singularity.
- **$c \to \infty$.** Most eigenvalues are zero, and the rest spread over an interval of width $4\sqrt{c}$ shifted to mean $1 + c$.

The takeaway is geometric and quantitative: at finite $c$, the empirical eigenvalues of $S$ are *systematically* biased away from those of the true covariance, by a deterministic and known amount. The smallest eigenvalues are pulled down to $\lambda_-$, the largest are pushed up to $\lambda_+$, and the bulk in between is a stretched, asymmetric arch (more mass near the lower edge for moderate $c$).

Slide $c$ on a log scale from $0.1$ to $10$. We fix the dimension $d = 50$ and let the sample size scale as $n = \lfloor d / c \rfloor$, so the slider directly controls how many samples we get per dimension. Each tick draws a fresh $n \times d$ Gaussian $X$. For $c \le 1$ the histogram shows all $d$ eigenvalues of $S = X^\top X / n$. For $c > 1$ we have $n < d$, so the matrix $S$ is rank $n$; we plot the $n$ nonzero eigenvalues (computed as the eigenvalues of the smaller $n \times n$ matrix $X X^\top / n$, which has the same nonzero spectrum) and report the count $d - n$ of exact zeros separately. The red dashed curve is $\rho_c$ for $c \le 1$ and $c \cdot \rho_c$ for $c > 1$ (the conditional density of the nonzero eigenvalues, which integrates to $1$).

<div class="mp-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.5rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">ratio <em>c</em> = <em>d</em>/<em>n</em><input type="range" id="mp-slider" min="-100" max="100" value="0" style="flex: 1; accent-color: #7ba3d6;"></label><span><em>c</em> = <strong id="mp-c">1.00</strong></span><span><em>d</em> = <strong id="mp-d">100</strong></span><span><em>n</em> = <strong id="mp-n">100</strong></span><span>bulk edges (1 &#8723; &radic;<em>c</em>)&sup2;: <em>λ</em><sub>−</sub> = <strong id="mp-lm">0.000</strong>, <em>λ</em><sub>+</sub> = <strong id="mp-lp">4.000</strong></span><span id="mp-zeros" style=""></span></div><div style="margin-bottom: 1rem;"><button id="mp-regen" type="button" style="padding: 0.2rem 0.55rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">↻ resample</button></div><svg id="mp-svg" viewBox="0 0 720 320" style="width: 100%; height: auto;" aria-label="Histogram of empirical eigenvalues of a sample covariance matrix with the Marchenko-Pastur theoretical density overlaid."></svg></div>
<script>
(function () {
  var slider = document.getElementById('mp-slider');
  if (!slider) return;
  var cDisp = document.getElementById('mp-c');
  var dDisp = document.getElementById('mp-d');
  var nDisp = document.getElementById('mp-n');
  var lmDisp = document.getElementById('mp-lm');
  var lpDisp = document.getElementById('mp-lp');
  var zerosDisp = document.getElementById('mp-zeros');
  var btn = document.getElementById('mp-regen');
  var svg = document.getElementById('mp-svg');
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function jacobi(M) {
    var n = M.length;
    for (var sweep = 0; sweep < 60; sweep++) {
      var off = 0;
      for (var p = 0; p < n - 1; p++) for (var q = p + 1; q < n; q++) off += M[p][q] * M[p][q];
      if (off < 1e-14) break;
      for (var p = 0; p < n - 1; p++) {
        for (var q = p + 1; q < n; q++) {
          var apq = M[p][q];
          if (Math.abs(apq) < 1e-12) continue;
          var theta = (M[q][q] - M[p][p]) / (2 * apq);
          var t = (Math.abs(theta) > 1e10) ? 0.5 / theta : (theta >= 0 ? 1 : -1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
          var cs = 1 / Math.sqrt(1 + t * t);
          var sn = t * cs;
          var app = M[p][p], aqq = M[q][q];
          M[p][p] = app - t * apq;
          M[q][q] = aqq + t * apq;
          M[p][q] = 0; M[q][p] = 0;
          for (var i = 0; i < n; i++) {
            if (i !== p && i !== q) {
              var aip = M[i][p], aiq = M[i][q];
              M[i][p] = M[p][i] = cs * aip - sn * aiq;
              M[i][q] = M[q][i] = sn * aip + cs * aiq;
            }
          }
        }
      }
    }
    var eigs = new Array(n);
    for (var i = 0; i < n; i++) eigs[i] = M[i][i];
    return eigs;
  }
  function compute(c) {
    var d = 50;
    var n = Math.max(2, Math.round(d / c));
    var X = new Array(n);
    for (var i = 0; i < n; i++) {
      var row = new Array(d);
      for (var j = 0; j < d; j++) row[j] = gauss();
      X[i] = row;
    }
    var sm = Math.min(d, n);
    var M = new Array(sm);
    for (var i = 0; i < sm; i++) M[i] = new Array(sm);
    if (d <= n) {
      for (var i = 0; i < d; i++) {
        for (var j = i; j < d; j++) {
          var s = 0;
          for (var k = 0; k < n; k++) s += X[k][i] * X[k][j];
          M[i][j] = M[j][i] = s / n;
        }
      }
    } else {
      for (var i = 0; i < n; i++) {
        for (var j = i; j < n; j++) {
          var s = 0;
          for (var k = 0; k < d; k++) s += X[i][k] * X[j][k];
          M[i][j] = M[j][i] = s / n;
        }
      }
    }
    return { eigs: jacobi(M), d: d, n: n };
  }
  function update() {
    var c = Math.pow(10, parseInt(slider.value, 10) / 100);
    var r = compute(c);
    var eigs = r.eigs;
    eigs.sort(function (a, b) { return a - b; });
    var lamM = Math.pow(1 - Math.sqrt(c), 2);
    var lamP = Math.pow(1 + Math.sqrt(c), 2);
    cDisp.textContent = c < 1 ? c.toFixed(3) : c.toFixed(2);
    dDisp.textContent = r.d;
    nDisp.textContent = r.n;
    lmDisp.textContent = lamM.toFixed(3);
    lpDisp.textContent = lamP.toFixed(3);
    if (r.d > r.n) {
      zerosDisp.textContent = '+ ' + (r.d - r.n) + ' zero eigenvalues (not plotted)';
    } else {
      zerosDisp.textContent = '';
    }
    var theoryFactor = (c > 1) ? c : 1;
    var w = 720, h = 320;
    var padL = 50, padR = 20, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var xMin = Math.max(0, lamM - 0.3);
    var xMax = lamP + 0.4;
    var nBins = 40;
    var binW = (xMax - xMin) / nBins;
    var bins = new Array(nBins);
    for (var i = 0; i < nBins; i++) bins[i] = 0;
    for (var i = 0; i < eigs.length; i++) {
      var b = Math.floor((eigs[i] - xMin) / binW);
      if (b >= 0 && b < nBins) bins[b]++;
    }
    var density = new Array(nBins);
    for (var i = 0; i < nBins; i++) density[i] = bins[i] / (eigs.length * binW);
    var theory = [];
    var nSteps = 240;
    for (var i = 0; i <= nSteps; i++) {
      var lam = xMin + (i / nSteps) * (xMax - xMin);
      var t = 0;
      if (lam > lamM && lam < lamP && lam > 1e-6) {
        t = theoryFactor * Math.sqrt((lamP - lam) * (lam - lamM)) / (2 * Math.PI * c * lam);
      }
      theory.push(t);
    }
    var maxD = 0;
    for (var i = 0; i < nBins; i++) if (density[i] > maxD) maxD = density[i];
    var maxT = 0;
    for (var i = 0; i <= nSteps; i++) if (theory[i] > maxT && theory[i] < 8) maxT = theory[i];
    var yMax = Math.max(maxD, maxT) * 1.15;
    if (yMax === 0) yMax = 1;
    function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPx(y) { return (h - padB) - Math.min(y, yMax) / yMax * plotH; }
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    var slot = plotW / nBins;
    var bw = slot * 0.92;
    for (var i = 0; i < nBins; i++) {
      if (density[i] === 0) continue;
      var bx = padL + i * slot + (slot - bw) / 2;
      var by = yPx(density[i]);
      var bh = (h - padB) - by;
      s += '<rect x="' + bx.toFixed(2) + '" y="' + by.toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + bh.toFixed(2) + '" fill="#7ba3d6" fill-opacity="0.7"/>';
    }
    var path = '';
    var started = false;
    for (var i = 0; i <= nSteps; i++) {
      var lam = xMin + (i / nSteps) * (xMax - xMin);
      if (theory[i] > 0) {
        var px = xPx(lam);
        var py = yPx(theory[i]);
        path += (started ? 'L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
        started = true;
      } else {
        started = false;
      }
    }
    s += '<path d="' + path + '" stroke="#e09595" stroke-width="2" fill="none" stroke-dasharray="5 3" stroke-opacity="0.9"/>';
    var range = xMax - xMin;
    var step = range > 12 ? 4 : (range > 6 ? 2 : (range > 3 ? 1 : 0.5));
    var firstTick = Math.ceil(xMin / step) * step;
    for (var t = firstTick; t <= xMax + 1e-9; t += step) {
      var tx = xPx(t);
      s += '<line x1="' + tx + '" y1="' + (h - padB) + '" x2="' + tx + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + tx + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">' + (Number.isInteger(t) ? t : t.toFixed(1)) + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">eigenvalue λ</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 14 ' + (h / 2) + ')">probability density (area 1)</text>';
    var curveLabel = c > 1 ? 'MP, nonzero eigs only' : 'Marchenko-Pastur';
    s += '<g transform="translate(' + (w - padR - 160) + ',' + (padT + 4) + ')" font-size="11" fill="currentColor"><rect x="0" y="0" width="160" height="38" fill="var(--background)" stroke="currentColor" stroke-opacity="0.25" rx="3"/><rect x="8" y="10" width="14" height="8" fill="#7ba3d6" fill-opacity="0.7"/><text x="28" y="17">empirical eigs</text><line x1="8" y1="30" x2="22" y2="30" stroke="#e09595" stroke-width="2" stroke-dasharray="5 3"/><text x="28" y="33">' + curveLabel + '</text></g>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  btn.addEventListener('click', update);
  update();
})();
</script>

The blue histogram is the empirical eigenvalue distribution of a fresh draw; the red dashed curve is the deterministic limit $\rho_c$. The fit is tight even at $d = 50$.

## The Wigner semicircle law

The Marchenko-Pastur law is for a structured random matrix: $X^\top X$, which is positive semidefinite by construction. The simpler sibling drops the structure and just takes a symmetric matrix whose entries are i.i.d. (above the diagonal).

Let $W$ be an $n \times n$ symmetric real matrix with $W_{ij} \sim \mathcal{N}(0, 1)$ for $i < j$, $W_{ji} = W_{ij}$, and $W_{ii} \sim \mathcal{N}(0, 2)$. (The diagonal variance choice gives the [Gaussian Orthogonal Ensemble](https://en.wikipedia.org/wiki/Random_matrix#Gaussian_ensembles) but the limit theorem holds for arbitrary i.i.d. entries with finite variance.)

Wigner (1955) proved: the empirical distribution of the eigenvalues of $W / \sqrt{n}$ converges to the **semicircle density**

$$
\rho_{\rm sc}(\lambda) \;=\; \frac{1}{2\pi}\, \sqrt{4 - \lambda^2}, \qquad \lambda \in [-2, 2].
$$

It is, up to normalization, the upper half of a circle of radius $2$. The $\sqrt{n}$ is the natural scale: a row of $W$ has $n$ independent unit-variance entries, so $\|Wx\| \sim \sqrt{n}$ for a typical unit vector $x$, and dividing by $\sqrt{n}$ keeps the spectrum in a fixed window as $n$ grows. After that rescaling the density is a fixed function of $\lambda$ alone: there is no analog of the ratio $c$ to tune, because the matrix size and the variance of the entries together fix the scale.

<div class="wg-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">matrix size <em>n</em><input type="range" id="wg-slider" min="20" max="200" value="120" style="flex: 1; accent-color: #7ba3d6;"></label><span><em>n</em> = <strong id="wg-n">80</strong></span><button id="wg-regen" type="button" style="padding: 0.2rem 0.55rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">↻ resample</button></div><svg id="wg-svg" viewBox="0 0 720 320" style="width: 100%; height: auto;" aria-label="Histogram of eigenvalues of a symmetric Gaussian matrix scaled by sqrt(n), with the Wigner semicircle density overlaid."></svg></div>
<script>
(function () {
  var slider = document.getElementById('wg-slider');
  if (!slider) return;
  var nDisp = document.getElementById('wg-n');
  var btn = document.getElementById('wg-regen');
  var svg = document.getElementById('wg-svg');
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function jacobi(M) {
    var n = M.length;
    for (var sweep = 0; sweep < 60; sweep++) {
      var off = 0;
      for (var p = 0; p < n - 1; p++) for (var q = p + 1; q < n; q++) off += M[p][q] * M[p][q];
      if (off < 1e-14) break;
      for (var p = 0; p < n - 1; p++) {
        for (var q = p + 1; q < n; q++) {
          var apq = M[p][q];
          if (Math.abs(apq) < 1e-12) continue;
          var theta = (M[q][q] - M[p][p]) / (2 * apq);
          var t = (Math.abs(theta) > 1e10) ? 0.5 / theta : (theta >= 0 ? 1 : -1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
          var cs = 1 / Math.sqrt(1 + t * t);
          var sn = t * cs;
          var app = M[p][p], aqq = M[q][q];
          M[p][p] = app - t * apq;
          M[q][q] = aqq + t * apq;
          M[p][q] = 0; M[q][p] = 0;
          for (var i = 0; i < n; i++) {
            if (i !== p && i !== q) {
              var aip = M[i][p], aiq = M[i][q];
              M[i][p] = M[p][i] = cs * aip - sn * aiq;
              M[i][q] = M[q][i] = sn * aip + cs * aiq;
            }
          }
        }
      }
    }
    var eigs = new Array(n);
    for (var i = 0; i < n; i++) eigs[i] = M[i][i];
    return eigs;
  }
  function update() {
    var n = parseInt(slider.value, 10);
    nDisp.textContent = n;
    var W = new Array(n);
    for (var i = 0; i < n; i++) W[i] = new Array(n);
    var sqn = Math.sqrt(n);
    for (var i = 0; i < n; i++) {
      W[i][i] = gauss() * Math.SQRT2 / sqn;
      for (var j = i + 1; j < n; j++) {
        var v = gauss() / sqn;
        W[i][j] = v;
        W[j][i] = v;
      }
    }
    var eigs = jacobi(W);
    eigs.sort(function (a, b) { return a - b; });
    var w = 720, h = 320;
    var padL = 50, padR = 20, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var xMin = -2.5, xMax = 2.5;
    var nBins = 40;
    var binW = (xMax - xMin) / nBins;
    var bins = new Array(nBins);
    for (var i = 0; i < nBins; i++) bins[i] = 0;
    for (var i = 0; i < eigs.length; i++) {
      var b = Math.floor((eigs[i] - xMin) / binW);
      if (b >= 0 && b < nBins) bins[b]++;
    }
    var density = new Array(nBins);
    for (var i = 0; i < nBins; i++) density[i] = bins[i] / (eigs.length * binW);
    var theory = [];
    var nSteps = 240;
    for (var i = 0; i <= nSteps; i++) {
      var lam = xMin + (i / nSteps) * (xMax - xMin);
      theory.push((Math.abs(lam) < 2) ? Math.sqrt(4 - lam * lam) / (2 * Math.PI) : 0);
    }
    var maxD = 0;
    for (var i = 0; i < nBins; i++) if (density[i] > maxD) maxD = density[i];
    var maxT = 1 / Math.PI;
    var yMax = Math.max(maxD, maxT) * 1.2;
    function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPx(y) { return (h - padB) - y / yMax * plotH; }
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    var slot = plotW / nBins;
    var bw = slot * 0.92;
    for (var i = 0; i < nBins; i++) {
      if (density[i] === 0) continue;
      var bx = padL + i * slot + (slot - bw) / 2;
      var by = yPx(density[i]);
      var bh = (h - padB) - by;
      s += '<rect x="' + bx.toFixed(2) + '" y="' + by.toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + bh.toFixed(2) + '" fill="#7ba3d6" fill-opacity="0.7"/>';
    }
    var path = '';
    var started = false;
    for (var i = 0; i <= nSteps; i++) {
      var lam = xMin + (i / nSteps) * (xMax - xMin);
      if (theory[i] > 0) {
        var px = xPx(lam);
        var py = yPx(theory[i]);
        path += (started ? 'L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
        started = true;
      } else {
        started = false;
      }
    }
    s += '<path d="' + path + '" stroke="#e09595" stroke-width="2" fill="none" stroke-dasharray="5 3" stroke-opacity="0.9"/>';
    for (var t = -2; t <= 2 + 1e-9; t += 1) {
      var tx = xPx(t);
      s += '<line x1="' + tx + '" y1="' + (h - padB) + '" x2="' + tx + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + tx + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">' + t + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">eigenvalue λ of W/√n</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 14 ' + (h / 2) + ')">probability density (area 1)</text>';
    s += '<g transform="translate(' + (w - padR - 196) + ',' + (padT + 4) + ')" font-size="11" fill="currentColor"><rect x="0" y="0" width="196" height="38" fill="var(--background)" stroke="currentColor" stroke-opacity="0.25" rx="3"/><rect x="8" y="10" width="14" height="8" fill="#7ba3d6" fill-opacity="0.7"/><text x="28" y="17">empirical eigs of W/√n</text><line x1="8" y1="30" x2="22" y2="30" stroke="#e09595" stroke-width="2" stroke-dasharray="5 3"/><text x="28" y="33">semicircle √(4−λ²)/2π</text></g>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  btn.addEventListener('click', update);
  update();
})();
</script>

The histogram approaches the semicircle smoothly as $n$ grows. At $n = 20$ the fit is rough; by $n = 80$ it is essentially indistinguishable from the curve.

## Where these limits come from

Both theorems are concentration phenomena for *linear spectral statistics*. For a fixed test function $f$, the random variable

$$
\frac{1}{d} \sum_{i=1}^d f(\lambda_i)
$$

(an average of $f$ over the eigenvalues of an $d \times d$ random matrix) has variance of order $1/d^2$ in good cases, and its expectation has a limit as $d \to \infty$. The expectations as $f$ ranges over polynomials are precisely the moments of the limiting density. The method-of-moments approach reduces the proof to combinatorics: counting non-crossing pair partitions for Wigner (which gives the [Catalan numbers](https://en.wikipedia.org/wiki/Catalan_number), the moments of the semicircle), and a related count for Marchenko-Pastur.

A more conceptual derivation comes from [free probability](https://en.wikipedia.org/wiki/Free_probability), in which the semicircle plays the role that the Gaussian plays in classical probability: it is the limit of *free* sums of independent self-adjoint variables. Marchenko-Pastur is the free analog of the Poisson distribution, arising from a free compound process.

## Implications for high-dimensional statistics

Three concrete consequences for machine learning:

1. **Sample covariance is biased even with $n \gg d$, as long as $c = d/n$ is not vanishingly small.** The eigenvalue at the lower edge is shifted to $(1 - \sqrt{c})^2$, the upper edge to $(1 + \sqrt{c})^2$. PCA on $S$ inflates the leading eigenvalue and suppresses the smaller ones, in a deterministic way that depends only on $c$.
2. **Shrinkage estimators** for the covariance matrix (Ledoit-Wolf, nonlinear shrinkage, etc.) explicitly use the Marchenko-Pastur picture to undo this bias. They pull each empirical eigenvalue back toward $1$ by an amount that depends on its distance from $\lambda_-$ and $\lambda_+$. The Marchenko-Pastur framework is what makes the correction tractable.
3. **The ratio $c$ is the only relevant dimensionless parameter** in the bulk. Doubling both $d$ and $n$ leaves the eigenvalue distribution unchanged. This is why "more data" alone does not save you in high-dimensional inference; you need more samples *per dimension*.

The Wigner side has analogous consequences for any setting that produces a symmetric random matrix, including Hessians of random loss landscapes, kernel matrices with random features, and the linearized dynamics of certain neural-network training schemes.

## References

- V. A. Marchenko, L. A. Pastur. *Distribution of eigenvalues for some sets of random matrices*. Mathematics of the USSR-Sbornik, 1(4):457-483, 1967.
- E. P. Wigner. *Characteristic vectors of bordered matrices with infinite dimensions*. Annals of Mathematics, 62(3):548-564, 1955.
- T. Tao. *Topics in Random Matrix Theory*. Graduate Studies in Mathematics, AMS, 2012.
- Z. Bai, J. W. Silverstein. *Spectral Analysis of Large Dimensional Random Matrices*. Springer, 2010.
- O. Ledoit, M. Wolf. *A well-conditioned estimator for large-dimensional covariance matrices*. Journal of Multivariate Analysis, 88(2):365-411, 2004. (Marchenko-Pastur in shrinkage estimation.)
