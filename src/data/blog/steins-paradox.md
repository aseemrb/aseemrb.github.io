---
author: Aseem Baranwal
pubDatetime: 2026-04-19T15:22:00Z
title: Stein's paradox
slug: steins-paradox
featured: false
draft: false
tags:
  - mathematics
  - machine learning
  - computer science
description:
  "In three or more dimensions, the sample mean is dominated everywhere by a shrinkage estimator. The geometric reason is the Gaussian shell: noise pushes you outward, and pulling back is uniformly better. A precursor of ridge regression and most modern regularization."
---

In the 1950s, the statistical orthodoxy was clear: to estimate the mean of a Gaussian, use the sample mean. It is the [maximum-likelihood estimator](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation), the minimum-variance unbiased estimator, and (in one dimension) [admissible](https://en.wikipedia.org/wiki/Admissible_decision_rule): no other estimator beats it for every value of the parameter.

In 1961, Charles Stein and Willard James proved that in *three or more dimensions*, the sample mean is *not* admissible. There is a different estimator that beats it everywhere: for every choice of the true mean $\theta \in \mathbb{R}^d$, simultaneously, in [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error). Even when the components are completely unrelated.

The estimator is famous and, when first encountered, jarring. It is also a precursor of [ridge regression](https://en.wikipedia.org/wiki/Ridge_regression), [empirical Bayes](https://en.wikipedia.org/wiki/Empirical_Bayes_method), and a great deal of modern machine learning.

## The setup

You observe a single sample $X \sim \mathcal{N}(\theta, I_d)$ in $\mathbb{R}^d$ and want to estimate $\theta$. The sample mean (here, just $X$) has

$$
\mathrm{MSE}_{\mathrm{MLE}} \;=\; \mathbb{E}[\|X - \theta\|^2] \;=\; d.
$$

Doesn't depend on $\theta$. Just $d$, no matter what.

## The James–Stein estimator

Define

$$
\hat\theta_{\mathrm{JS}} \;=\; \left(1 - \frac{d - 2}{\|X\|^2}\right) X.
$$

The shrinkage factor $\bigl(1 - (d-2)/\|X\|^2\bigr)$ pulls $X$ toward the origin. (When $\|X\|^2$ is small, the factor can go negative; the *positive-part* version $\hat\theta_{\mathrm{JS}^+} = \max\{0, 1 - (d-2)/\|X\|^2\}\,X$ is a strict improvement, and is what people use in practice.)

**Theorem (James and Stein, 1961).** For every $\theta \in \mathbb{R}^d$ and every $d \ge 3$,

$$
\mathbb{E}\bigl[\|\hat\theta_{\mathrm{JS}} - \theta\|^2\bigr] \;<\; d \;=\; \mathbb{E}\bigl[\|X - \theta\|^2\bigr].
$$

The sample mean is dominated *uniformly*. For $d \le 2$ the estimator degenerates and the dominance disappears. The phase transition at $d = 3$ is sharp.

## The geometric reason

Why should shrinkage help?

If $X \sim \mathcal{N}(\theta, I_d)$, then $\|X\|^2$ has a non-central chi-squared distribution with non-centrality $\|\theta\|^2$, so

$$
\mathbb{E}[\|X\|^2] \;=\; \|\theta\|^2 + d.
$$

The sample $X$ is *on average further from the origin than* $\theta$ *is*, by an amount that grows with $d$. This is exactly the [Gaussian shell phenomenon](/blog/high-dimensional-gaussians-on-a-sphere): noise in $d$ dimensions has typical magnitude $\sqrt{d}$, and adding it to $\theta$ pushes outward.

Shrinking $X$ toward the origin partially undoes this outward push. In high dimensions, the bias introduced by shrinkage is a much smaller error than the variance you save. The dimension threshold $d = 3$ becomes natural in this picture: in $d = 1, 2$, the noise radius $\sqrt{d}$ isn't much, and shrinkage doesn't pay off; in $d \ge 3$, it does, uniformly.

## The exact value at $\theta = 0$

A clean computation. If $\theta = 0$ then $\|X\|^2 \sim \chi^2_d$, and for $d > 2$, $\mathbb{E}[1/\|X\|^2] = 1/(d - 2)$. Plugging in,

$$
\mathbb{E}\bigl[\|\hat\theta_{\mathrm{JS}}\|^2\bigr] \;=\; \mathbb{E}[\|X\|^2] - 2(d - 2) + (d - 2)^2\, \mathbb{E}[1/\|X\|^2] \;=\; d - 2(d - 2) + (d - 2) \;=\; 2.
$$

The James–Stein MSE at the origin is *exactly $2$, for every* $d \ge 3$.

The MLE has MSE $d$. So at $\theta = 0$, JS is a factor of $d/2$ better. For $d = 100$, MSE drops from $100$ to $2$. A factor of $50$.

Slide $d$ to see the full curve as $\|\theta\|$ varies:

<div class="sp-widget" style="margin: 1.5rem 0; padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">dimension <em>d</em><input type="range" id="sp-slider" min="1" max="50" value="3" style="flex: 1;"></label><span><em>d</em> = <strong id="sp-d">3</strong></span><span>MSE<sub>MLE</sub> = <strong id="sp-mle">3</strong></span><span>MSE<sub>JS</sub>(θ=0) = <strong id="sp-js0">2</strong></span><span>JS savings at θ=0: <strong id="sp-save">×1.5</strong></span></div><svg id="sp-svg" viewBox="0 0 720 320" style="width: 100%; height: auto;" aria-label="MSE of MLE and James-Stein estimators as a function of the true mean's norm."></svg></div>
<script>
(function () {
  var slider = document.getElementById('sp-slider');
  if (!slider) return;
  var dDisp = document.getElementById('sp-d');
  var mleDisp = document.getElementById('sp-mle');
  var js0Disp = document.getElementById('sp-js0');
  var saveDisp = document.getElementById('sp-save');
  var svg = document.getElementById('sp-svg');
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function simulate(d, normTheta, M) {
    var mleSum = 0, jsSum = 0;
    for (var m = 0; m < M; m++) {
      var normSq = 0;
      var mleErr = 0;
      var xs = new Array(d);
      for (var i = 0; i < d; i++) {
        var noise = gauss();
        var theta_i = (i === 0) ? normTheta : 0;
        var xi = theta_i + noise;
        xs[i] = xi;
        normSq += xi * xi;
        mleErr += noise * noise;
      }
      mleSum += mleErr;
      var factor;
      if (d >= 3) factor = Math.max(0, 1 - (d - 2) / normSq);
      else if (d === 2) factor = 1;
      else factor = 1 + 1 / normSq;
      var jsErr = 0;
      for (var i = 0; i < d; i++) {
        var theta_i = (i === 0) ? normTheta : 0;
        var diff = factor * xs[i] - theta_i;
        jsErr += diff * diff;
      }
      jsSum += jsErr;
    }
    return { mle: mleSum / M, js: jsSum / M };
  }
  function update() {
    var d = parseInt(slider.value, 10);
    var M = 200;
    var thetas = [];
    var nTheta = 21;
    var thetaMax = 8;
    for (var i = 0; i < nTheta; i++) thetas.push((i / (nTheta - 1)) * thetaMax);
    var mleVals = new Array(nTheta);
    var jsVals = new Array(nTheta);
    for (var i = 0; i < nTheta; i++) {
      var r = simulate(d, thetas[i], M);
      mleVals[i] = r.mle;
      jsVals[i] = r.js;
    }
    dDisp.textContent = d;
    mleDisp.textContent = d;
    js0Disp.textContent = jsVals[0].toFixed(2);
    saveDisp.textContent = '×' + (mleVals[0] / Math.max(jsVals[0], 0.01)).toFixed(2);
    var w = 720, h = 320;
    var padL = 50, padR = 100, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var xMin = 0, xMax = thetaMax;
    var yMin = 0;
    var yMax = d * 1.15 + 1;
    function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPx(y) { return (h - padB) - (y - yMin) / (yMax - yMin) * plotH; }
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    var yStep = yMax > 30 ? 10 : (yMax > 10 ? 5 : (yMax > 4 ? 2 : 1));
    for (var y = 0; y <= yMax; y += yStep) {
      var py = yPx(y);
      s += '<line x1="' + padL + '" y1="' + py + '" x2="' + (w - padR) + '" y2="' + py + '" stroke="currentColor" stroke-opacity="0.08"/>';
      s += '<text x="' + (padL - 6) + '" y="' + (py + 4) + '" text-anchor="end" font-size="11" fill="currentColor" fill-opacity="0.7">' + y + '</text>';
    }
    for (var x = 0; x <= xMax; x += 2) {
      var px = xPx(x);
      s += '<line x1="' + px + '" y1="' + (h - padB) + '" x2="' + px + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + px + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.7">' + x + '</text>';
    }
    function path(vals, color, dash) {
      var p = '';
      for (var i = 0; i < nTheta; i++) p += (i === 0 ? 'M' : 'L') + xPx(thetas[i]).toFixed(1) + ',' + yPx(vals[i]).toFixed(1) + ' ';
      var dashAttr = dash ? ' stroke-dasharray="' + dash + '"' : '';
      return '<path d="' + p + '" stroke="' + color + '" stroke-width="2.2" fill="none"' + dashAttr + '/>';
    }
    s += path(mleVals, '#f97316', '');
    s += path(jsVals, '#2563eb', '');
    for (var i = 0; i < nTheta; i++) {
      s += '<circle cx="' + xPx(thetas[i]).toFixed(1) + '" cy="' + yPx(mleVals[i]).toFixed(1) + '" r="2.5" fill="#f97316"/>';
      s += '<circle cx="' + xPx(thetas[i]).toFixed(1) + '" cy="' + yPx(jsVals[i]).toFixed(1) + '" r="2.5" fill="#2563eb"/>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75">‖θ‖</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75" transform="rotate(-90 14 ' + (h / 2) + ')">MSE</text>';
    s += '<g transform="translate(' + (w - padR + 10) + ',' + (padT + 10) + ')" font-size="11" fill="currentColor" fill-opacity="0.85"><rect x="-6" y="-12" width="86" height="60" fill="var(--background)" stroke="currentColor" stroke-opacity="0.25" rx="3"/><line x1="0" y1="0" x2="22" y2="0" stroke="#f97316" stroke-width="2.2"/><circle cx="11" cy="0" r="2.5" fill="#f97316"/><text x="28" y="4">MLE</text><line x1="0" y1="22" x2="22" y2="22" stroke="#2563eb" stroke-width="2.2"/><circle cx="11" cy="22" r="2.5" fill="#2563eb"/><text x="28" y="26">JS</text></g>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

The MLE curve sits flat at $d$. The James–Stein curve starts at $\approx 2$ for $\theta = 0$ and rises smoothly toward $d$ as $\|\theta\|$ grows: with the true mean far from the origin, the shrinkage benefit shrinks, but the MLE never wins at any $\theta$ in $d \ge 3$. At $d = 1$ the JS curve sits *above* the MLE (the formula inflates rather than shrinks); at $d = 2$ they coincide.

## What is genuinely weird

Stein's original example is the part that breaks people's intuition.

Suppose you want to estimate three independent things: the speed of light, the price of tea in China, and the average height of redwoods. For each, you have one Gaussian-noisy measurement. The natural recipe: estimate each one independently, by its own measurement. Stein says: shrink all three toward zero (or toward any common point) and your *total* MSE drops.

The three estimation problems have nothing to do with each other. The three measurements are independent. And yet, *coupling* the three estimators by shrinking together reduces the joint risk. This is profoundly counterintuitive: the cost of independence in MSE terms is real.

The reason this confounds intuition is that unbiasedness was the wrong objective. MSE = bias$^2$ + variance, and the sample mean trades zero bias for high variance. In $d \ge 3$, accepting a bit of bias (shrinkage) buys a much larger reduction in variance, every time.

## What this led to

Stein's paradox is the seed of a huge amount of modern statistics and ML:

- **Empirical Bayes.** Learn the prior from data; shrink toward what the data says is the typical $\theta$.
- **Ridge regression.** Penalize the squared norm of the regression coefficients; the regularization parameter is a shrinkage knob.
- **Hierarchical Bayesian models.** Multi-level shrinkage across groups.
- **L2 regularization in deep learning.** Weight decay is, at heart, a shrinkage estimator.

All of these are descendants of: *the sample mean is wrong in $\ge 3$ dimensions; do something biased instead*.

## References

- William James, Charles Stein. *Estimation with Quadratic Loss.* Berkeley Symposium on Mathematical Statistics and Probability, 1961.
- Bradley Efron, Carl Morris. *Stein's Paradox in Statistics.* Scientific American, 1977. A beautifully written exposition.
- Roman Vershynin. *High-Dimensional Probability*. Cambridge University Press, 2018. Chapter 8 has the geometric setup and a clean proof of the key inequality.
