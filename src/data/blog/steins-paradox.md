---
author: Aseem Raj Baranwal
pubDatetime: 2024-04-19T15:22:00Z
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

The orthodoxy was clear: to estimate the mean of a [Gaussian](https://en.wikipedia.org/wiki/Normal_distribution), use the sample mean. Grading estimators by their [mean squared error](https://en.wikipedia.org/wiki/Mean_squared_error)

$$
\mathrm{MSE}(\hat\theta) \;=\; \mathbb{E}\bigl[\|\hat\theta - \theta\|^2\bigr],
$$

the sample mean is the [maximum-likelihood estimator](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation), the [minimum-variance unbiased estimator](https://en.wikipedia.org/wiki/Minimum-variance_unbiased_estimator), and, in one dimension, [admissible](https://en.wikipedia.org/wiki/Admissible_decision_rule): no other estimator beats it for every value of the parameter. For two centuries this read as the end of the story.

In 1961, Charles Stein and Willard James proved that in *three or more dimensions*, the sample mean is *not* admissible. There is a different estimator with strictly smaller MSE for every $\theta \in \mathbb{R}^d$, simultaneously. Even when the components correspond to completely unrelated quantities.

The estimator is famous and, when first encountered, jarring. It is also a precursor of [ridge regression](https://en.wikipedia.org/wiki/Ridge_regression), [empirical Bayes](https://en.wikipedia.org/wiki/Empirical_Bayes_method), and a great deal of modern machine learning.

## The case for the sample mean in one dimension

You observe $n$ i.i.d. samples $X_1, \ldots, X_n \sim \mathcal{N}(\theta, \sigma^2)$ with known $\sigma^2$ and unknown mean $\theta \in \mathbb{R}$. Several properties make the sample mean $\bar X = \tfrac{1}{n}\sum_i X_i$ the textbook answer.

**It maximizes the likelihood.** The joint density of the data, viewed as a function of $\theta$ with the data held fixed, is

$$
L(\theta) \;\propto\; \exp\!\left(-\frac{1}{2\sigma^2}\sum_{i=1}^{n} (X_i - \theta)^2\right).
$$

Maximizing $L$ over $\theta$ is the same as minimizing $\sum_i (X_i - \theta)^2$, a quadratic in $\theta$ minimized at $\bar X$. Of all values of $\theta$, the sample mean is the one that makes the observed data most plausible under the Gaussian model.

**It is unbiased.** $\mathbb{E}[\bar X] = \theta$ by linearity of expectation. On average, $\bar X$ hits the truth exactly.

**It has the smallest possible MSE among unbiased estimators.** The [Cramér–Rao lower bound](https://en.wikipedia.org/wiki/Cram%C3%A9r%E2%80%93Rao_bound) says any unbiased $\tilde\theta(X_1, \ldots, X_n)$ satisfies

$$
\mathrm{Var}(\tilde\theta) \;\ge\; \frac{1}{n\, I(\theta)},
$$

where $I(\theta)$ is the [Fisher information](https://en.wikipedia.org/wiki/Fisher_information) per observation, a measure of how sharply the likelihood peaks around the truth. For the Gaussian, $I(\theta) = 1/\sigma^2$, so the bound is $\sigma^2/n$, and $\bar X$ saturates it. So $\mathrm{MSE}(\bar X) = \mathrm{Var}(\bar X) = \sigma^2/n$, the lowest MSE achievable by any unbiased estimator.

**In one dimension, it is admissible.** No estimator (biased or not) has strictly smaller MSE than $\bar X$ at *every* $\theta$ simultaneously. You can find rivals that win at specific values (the constant $\hat\theta = 0$ has zero MSE at $\theta = 0$ but MSE $\theta^2$ everywhere else), but never one that wins everywhere. This is the substantive property among the four; the proof is below.

Maximum likelihood, minimum variance among unbiased estimators, and unbeatable-everywhere: these properties lining up convinced generations of statisticians that the sample mean was the only defensible default.

## Proving admissibility in one dimension

The first three properties were direct calculations. Admissibility is the substantive one. Take the canonical case $X \sim \mathcal{N}(\theta, 1)$ on $\mathbb{R}$ (one observation, unit variance, after rescaling). The sample mean is just $X$, and its MSE is $\mathbb{E}[(X - \theta)^2] = 1$ at every $\theta$. The claim is that no estimator strictly beats $1$ everywhere.

The standard proof, due to [Hodges and Lehmann](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-21/issue-2/Some-Problems-in-Minimax-Point-Estimation/10.1214/aoms/1177729838.full) (1950) and Blyth (1951), is by contradiction, using a wide Gaussian prior on $\theta$. The strategy in one line: suppose some estimator beats $X$ everywhere, then average the comparison against a very spread-out prior. When the prior is wide, the best possible estimator for it is almost exactly $X$, which leaves no room for a uniform improvement, and the arithmetic of that squeeze is the contradiction.

Suppose some $\tilde\theta$ dominated $X$: its **risk function** $R(\theta) := \mathbb{E}\bigl[(\tilde\theta - \theta)^2\bigr]$ satisfies $R(\theta) \le 1$ for every $\theta$, with strict inequality $R(\theta_0) < 1$ at some $\theta_0$. Assuming $R$ is continuous in $\theta$ (true for any reasonable $\tilde\theta$), there is a small interval $[\theta_0 - a, \theta_0 + a]$ on which $R(\theta) \le 1 - \delta$ for some $\delta > 0$.

**A wide Gaussian prior.** Place a prior $\theta \sim \pi_\tau := \mathcal{N}(0, \tau^2)$ for a large variance $\tau^2$. Standard Gaussian conjugacy (a Gaussian prior combined with Gaussian data produces a Gaussian posterior) gives the posterior

$$
\theta \mid X \;\sim\; \mathcal{N}\!\left(\frac{\tau^2}{1+\tau^2} X,\; \frac{\tau^2}{1+\tau^2}\right),
$$

so the [Bayes estimator](https://en.wikipedia.org/wiki/Bayes_estimator) under squared-error loss (the posterior mean) is $\hat\theta_{\pi_\tau} = \frac{\tau^2}{1+\tau^2} X$. Its **Bayes risk**, the prior-averaged MSE, is

$$
\int \mathbb{E}\bigl[(\hat\theta_{\pi_\tau} - \theta)^2 \mid \theta\bigr]\, \pi_\tau(\theta)\, d\theta \;=\; \frac{\tau^2}{1+\tau^2}.
$$

The defining property of the Bayes estimator is that it minimizes prior-averaged MSE. So *any* estimator, including our hypothetical $\tilde\theta$, has Bayes risk at least $\frac{\tau^2}{1+\tau^2}$:

$$
\int R(\theta)\, \pi_\tau(\theta)\, d\theta \;\ge\; \frac{\tau^2}{1+\tau^2}.
$$

**Squeezing to a contradiction.** The sample mean has $R(\theta, X) = 1$ everywhere, so its prior-averaged MSE is $\int 1 \cdot \pi_\tau(\theta)\, d\theta = 1$. The Bayes risk gap between $X$ and $\tilde\theta$ is therefore squeezed:

$$
\int \bigl[1 - R(\theta)\bigr]\, \pi_\tau(\theta)\, d\theta \;\le\; 1 - \frac{\tau^2}{1+\tau^2} \;=\; \frac{1}{1+\tau^2}.
$$

The integrand is non-negative everywhere (by domination) and at least $\delta$ on the interval where $\tilde\theta$ does strictly better, so

$$
\int \bigl[1 - R(\theta)\bigr]\, \pi_\tau(\theta)\, d\theta \;\ge\; \delta \cdot \pi_\tau\bigl([\theta_0 - a, \theta_0 + a]\bigr).
$$

For $\tau$ large, the prior density near $\theta_0$ is approximately $\frac{1}{\sqrt{2\pi\tau^2}}$, so the interval mass is $\approx \frac{2a}{\sqrt{2\pi\tau^2}}$. Putting the two bounds together,

$$
\frac{2a\delta}{\sqrt{2\pi\tau^2}} \;\le\; \frac{1}{1+\tau^2}.
$$

The left side decays like $\tau^{-1}$; the right side like $\tau^{-2}$. For $\tau$ large enough, $\tau^{-1} > \tau^{-2}$, contradicting the inequality. So no dominating $\tilde\theta$ exists, and $X$ is admissible.

**Where the proof breaks in higher dimensions.** Repeat the same argument in $\mathbb{R}^d$ with a $\mathcal{N}(0, \tau^2 I_d)$ prior. The prior spreads its mass over a $d$-dimensional region, so the density at any fixed $\theta_0$ scales like $\tau^{-d}$, and the ball-mass contribution decays at the same rate. The Bayes risk gap, computed coordinate-by-coordinate, is at most $\frac{d}{1+\tau^2} \sim \tau^{-2}$. The contradiction requires the ball-mass to decay *slower* than the Bayes gap, which only happens at $d = 1$. (Admissibility actually still holds at $d = 2$, via a more carefully chosen prior; at $d \ge 3$ admissibility genuinely fails, and Stein's estimator is what exploits the gap.)

## The Stein setup

By [sufficiency](https://en.wikipedia.org/wiki/Sufficient_statistic), all the information about $\theta$ in $X_1, \ldots, X_n$ is concentrated in $\bar X \sim \mathcal{N}(\theta, \sigma^2/n)$. The original problem reduces to: observe a single Gaussian sample with known variance and unknown mean. Rescaling sets the variance to one, and the multivariate version is the same story coordinate-by-coordinate. So without loss of generality, work with a single observation

$$
X \;\sim\; \mathcal{N}(\theta, I_d) \qquad \text{in } \mathbb{R}^d,
$$

and try to estimate $\theta \in \mathbb{R}^d$. The sample mean (here, just $X$) has

$$
\mathrm{MSE}_{\mathrm{MLE}} \;=\; \mathbb{E}[\|X - \theta\|^2] \;=\; d.
$$

Doesn't depend on $\theta$. Just $d$, no matter what.

## The James–Stein estimator

Define

$$
\hat\theta_{\mathrm{JS}} \;=\; \left(1 - \frac{d - 2}{\|X\|^2}\right) X.
$$

The shrinkage factor $\bigl(1 - (d-2)/\|X\|^2\bigr)$ pulls $X$ toward the origin, with the amount of shrinkage decided by the data: when $\|X\|^2$ is large, barely shrink; when it is small, shrink hard. (When $\|X\|^2$ is small enough that the factor goes negative, the *positive-part* version $\hat\theta_{\mathrm{JS}^+} = \max\{0, 1 - (d-2)/\|X\|^2\}\,X$ is a strict improvement, and is what people use in practice.)

**Where the formula comes from.** Try the simpler family $\hat\theta = c X$ for a fixed scalar $c \in [0, 1]$. The bias-variance decomposition gives

$$
\mathrm{MSE}(cX) \;=\; (c-1)^2 \|\theta\|^2 + c^2 d,
$$

minimized at $c^\star = \|\theta\|^2 / (\|\theta\|^2 + d)$. That is the optimal shrinkage if you knew $\|\theta\|$. You don't, but the data hands you an estimate: $\mathbb{E}[\|X\|^2] = \|\theta\|^2 + d$, so $\|X\|^2 - d$ is an unbiased estimator of $\|\theta\|^2$. Substituting and simplifying produces a shrinkage factor of $1 - d/\|X\|^2$. James and Stein replace $d$ with $d - 2$, a correction that drops out of an integration-by-parts identity called Stein's lemma, and that swap is exactly what makes the dominance proof go through.

**Theorem (James and Stein, 1961).** For every $\theta \in \mathbb{R}^d$ and every $d \ge 3$,

$$
\mathbb{E}\bigl[\|\hat\theta_{\mathrm{JS}} - \theta\|^2\bigr] \;<\; d \;=\; \mathbb{E}\bigl[\|X - \theta\|^2\bigr].
$$

The sample mean is dominated *uniformly*. For $d \le 2$ the estimator degenerates and the dominance disappears. The phase transition at $d = 3$ is sharp.

## The geometric reason

The mechanism behind shrinkage is a fact about the magnitude of $X$. If $X \sim \mathcal{N}(\theta, I_d)$, then $\|X\|^2$ has a non-central chi-squared distribution with non-centrality $\|\theta\|^2$ (the distribution of the squared length of a Gaussian vector whose mean sits a distance $\|\theta\|$ from the origin), so

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

<div class="sp-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">dimension <em>d</em><input type="range" id="sp-slider" min="1" max="50" value="3" style="flex: 1;"></label><span><em>d</em> = <strong id="sp-d">3</strong></span><span>MSE<sub>MLE</sub> = <strong id="sp-mle">3</strong></span><span>MSE<sub>JS</sub>(θ=0) = <strong id="sp-js0">2</strong></span><span>JS savings at θ=0: <strong id="sp-save">×1.5</strong></span></div><svg id="sp-svg" viewBox="0 0 720 320" style="width: 100%; height: auto;" aria-label="MSE of MLE and James-Stein estimators as a function of the true mean's norm."></svg></div>
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
      s += '<text x="' + (padL - 6) + '" y="' + (py + 4) + '" text-anchor="end" font-size="11" fill="currentColor">' + y + '</text>';
    }
    for (var x = 0; x <= xMax; x += 2) {
      var px = xPx(x);
      s += '<line x1="' + px + '" y1="' + (h - padB) + '" x2="' + px + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + px + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">' + x + '</text>';
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
    s += '<text x="' + (w / 2) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">‖θ‖</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 14 ' + (h / 2) + ')">MSE</text>';
    s += '<g transform="translate(' + (w - padR + 10) + ',' + (padT + 10) + ')" font-size="11" fill="currentColor"><rect x="-6" y="-12" width="86" height="60" fill="var(--background)" stroke="currentColor" stroke-opacity="0.25" rx="3"/><line x1="0" y1="0" x2="22" y2="0" stroke="#f97316" stroke-width="2.2"/><circle cx="11" cy="0" r="2.5" fill="#f97316"/><text x="28" y="4">MLE</text><line x1="0" y1="22" x2="22" y2="22" stroke="#2563eb" stroke-width="2.2"/><circle cx="11" cy="22" r="2.5" fill="#2563eb"/><text x="28" y="26">JS</text></g>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

The MLE curve sits flat at $d$. The James–Stein curve starts at $\approx 2$ for $\theta = 0$ and rises smoothly toward $d$ as $\|\theta\|$ grows: with the true mean far from the origin, the shrinkage benefit shrinks, but the MLE never wins at any $\theta$ in $d \ge 3$. At $d = 1$ the JS curve sits *above* the MLE (the formula inflates rather than shrinks); at $d = 2$ they coincide.

## The cost of independence

Stein's original example is the part that breaks people's intuition.

Suppose you want to estimate three independent things: the speed of light, the price of tea in China, and the average height of redwoods. For each, you have one Gaussian-noisy measurement. The natural recipe: estimate each one independently, by its own measurement. Stein says: shrink all three toward zero (or toward any common point) and your *total* MSE drops.

The three estimation problems have nothing to do with each other. The three measurements are independent. And yet, *coupling* the three estimators by shrinking together reduces the joint risk. This is profoundly counterintuitive: the cost of independence in MSE terms is real.

The reason this confounds intuition is that unbiasedness was the wrong objective. By the [bias-variance decomposition](/blog/bias-variance-pythagorean-decomposition), MSE = bias$^2$ + variance, and the sample mean trades zero bias for high variance. In $d \ge 3$, accepting a bit of bias (shrinkage) buys a much larger reduction in variance, every time.

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
