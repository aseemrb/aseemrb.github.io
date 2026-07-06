---
author: Aseem Raj Baranwal
pubDatetime: 2026-04-12T15:22:00Z
title: Central Limit Theorem - why sums become Gaussian
slug: why-sums-become-gaussian
featured: false
draft: false
tags:
  - mathematics
  - statistics
description:
  A geometric look at the central limit theorem. Adding random variables is convolving their densities. Convolution smooths. Watch a Bernoulli, a die roll, or a bimodal distribution become Gaussian as you slide the number of summands.
---

Most things in nature, when you measure them carefully, look roughly [Gaussian](https://en.wikipedia.org/wiki/Normal_distribution). Heights, exam scores, voltage noise, sample averages of pretty much any quantity. This is, famously, the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) (CLT). The textbook statement uses [characteristic functions](https://en.wikipedia.org/wiki/Characteristic_function_%28probability_theory%29) (the Fourier transform of a distribution) and analytic limits, but here I try to present the underlying picture in a purely geometric way.

## The setup

Take an [i.i.d.](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) sequence $X_1, X_2, \ldots$ with mean $\mu$ and variance $\sigma^2 < \infty$. The CLT says that the standardized sum

$$
Z_n \;=\; \frac{X_1 + X_2 + \cdots + X_n - n\mu}{\sigma\sqrt{n}}
$$

[converges in distribution](https://en.wikipedia.org/wiki/Convergence_of_random_variables#Convergence_in_distribution) to $\mathcal{N}(0, 1)$ as $n \to \infty$ (its histogram settles onto the bell curve).<br/>
I've written more on this mode of convergence [here](https://notes.aseemrb.me/probability-theory/convergence/weak-convergence/).

A more visual restatement: **summing independent random variables is [convolving](https://en.wikipedia.org/wiki/Convolution) their densities.** Why? For the sum $X + Y$ to land at a particular value $z$, the two summands have to take values that add up to $z$: if $X$ takes value $x$, then $Y$ must take the complementary value $z - x$. By independence, the joint density at any pair $(x, y)$ is the product $f(x)\,g(y)$. The density of $X + Y$ at $z$ is therefore what you get by summing (integrating) the joint density over every valid split $(x, z-x)$ that produces this $z$:

$$
f_{X+Y}(z) \;=\; \int f(x)\, g(z - x)\, dx \;=:\; (f \star g)(z).
$$

That integral is, by definition, the convolution of $f$ and $g$. So summing $n$ i.i.d. copies of $X$ corresponds to convolving its density with itself $n$ times. The CLT becomes a statement about repeated self-convolution: under the right rescaling, it converges to a Gaussian.

## The n-fold convolution

Pick a base distribution and slide $n$. The blue bars are the exact distribution of the sum after $n$ convolutions; the red curve is the Gaussian with mean $n\mu$ and variance $n\sigma^2$.

<div class="clt-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.5rem;"><select id="clt-dist" style="padding: 0.2rem 0.4rem; background: var(--background); color: currentColor; border: 1px solid currentColor;"><option value="bernoulli">Bernoulli(0.3)</option><option value="die" selected>uniform die {1..6}</option><option value="triangular">triangular</option><option value="bimodal">bimodal</option></select></label><label style="display: flex; align-items: center; gap: 0.5rem; flex: 1 1 200px;"><em>n</em><input type="range" id="clt-n" min="1" max="40" value="1" style="flex: 1;"></label><span><em>n</em> = <strong id="clt-n-disp">1</strong></span><span><em>μ<sub>n</sub></em> = <strong id="clt-mean">3.50</strong></span><span><em>σ<sub>n</sub></em> = <strong id="clt-std">1.71</strong></span></div><svg id="clt-svg" viewBox="0 0 720 300" style="width: 100%; height: auto;" aria-label="Histogram of the n-fold sum's distribution with a Gaussian overlay."></svg></div>
<script>
(function () {
  var slider = document.getElementById('clt-n');
  if (!slider) return;
  var sel = document.getElementById('clt-dist');
  var nDisp = document.getElementById('clt-n-disp');
  var meanDisp = document.getElementById('clt-mean');
  var stdDisp = document.getElementById('clt-std');
  var svg = document.getElementById('clt-svg');
  var distributions = {
    bernoulli: { p: [0.7, 0.3], offset: 0 },
    die: { p: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6], offset: 1 },
    triangular: { p: [1/9, 2/9, 3/9, 2/9, 1/9], offset: 0 },
    bimodal: { p: [0.45, 0.1, 0.45], offset: 0 }
  };
  function convolve(p, q) {
    var n = p.length, m = q.length;
    var out = new Array(n + m - 1);
    for (var i = 0; i < out.length; i++) out[i] = 0;
    for (var i = 0; i < n; i++) {
      if (p[i] === 0) continue;
      for (var j = 0; j < m; j++) out[i + j] += p[i] * q[j];
    }
    return out;
  }
  function nfold(p, n) {
    var r = [1];
    for (var i = 0; i < n; i++) r = convolve(r, p);
    return r;
  }
  function moments(p, offset) {
    var mean = 0;
    for (var i = 0; i < p.length; i++) mean += (i + offset) * p[i];
    var v = 0;
    for (var i = 0; i < p.length; i++) v += (i + offset - mean) * (i + offset - mean) * p[i];
    return { mean: mean, var: v, std: Math.sqrt(v) };
  }
  function render(p, offset, m, n) {
    var w = 720, h = 300;
    var padL = 50, padR = 20, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var supportMin = offset, supportMax = offset + p.length - 1;
    var xMin = Math.floor(m.mean - 4 * m.std);
    var xMax = Math.ceil(m.mean + 4 * m.std);
    if (xMin < supportMin) xMin = supportMin;
    if (xMax > supportMax) xMax = supportMax;
    if (xMax - xMin < 4) { xMin = supportMin; xMax = supportMax; }
    var maxP = 0;
    for (var x = xMin; x <= xMax; x++) {
      var i = x - offset;
      if (i >= 0 && i < p.length && p[i] > maxP) maxP = p[i];
    }
    var gaussPeak = m.std > 0 ? 1 / (m.std * Math.sqrt(2 * Math.PI)) : 0;
    var yMax = Math.max(maxP, gaussPeak) * 1.08;
    if (yMax === 0) yMax = 1;
    function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPx(y) { return (h - padB) - y / yMax * plotH; }
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    var nBars = xMax - xMin + 1;
    var barW = Math.min(plotW / nBars * 0.9, 28);
    for (var x = xMin; x <= xMax; x++) {
      var i = x - offset;
      if (i < 0 || i >= p.length) continue;
      var py = p[i];
      if (py < 1e-12) continue;
      var bx = xPx(x) - barW / 2;
      var by = yPx(py);
      var bh = (h - padB) - by;
      s += '<rect x="' + bx.toFixed(2) + '" y="' + by.toFixed(2) + '" width="' + barW.toFixed(2) + '" height="' + bh.toFixed(2) + '" fill="#2563eb" fill-opacity="0.7"/>';
    }
    if (m.std > 0) {
      var gpath = '';
      var steps = 240;
      for (var k = 0; k <= steps; k++) {
        var xx = xMin + (k / steps) * (xMax - xMin);
        var g = Math.exp(-((xx - m.mean) * (xx - m.mean)) / (2 * m.var)) / (m.std * Math.sqrt(2 * Math.PI));
        gpath += (k === 0 ? 'M' : 'L') + xPx(xx).toFixed(1) + ',' + yPx(g).toFixed(1) + ' ';
      }
      s += '<path d="' + gpath + '" stroke="#dc2626" stroke-width="2" fill="none" stroke-dasharray="5 3" stroke-opacity="0.85"/>';
    }
    for (var k = -3; k <= 3; k++) {
      var x = m.mean + k * m.std;
      if (x < xMin || x > xMax) continue;
      var px = xPx(x);
      s += '<line x1="' + px + '" y1="' + (h - padB) + '" x2="' + px + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + px + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">' + x.toFixed(1) + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">sum value</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 14 ' + (h / 2) + ')">probability</text>';
    s += '<g transform="translate(' + (w - padR - 130) + ',' + (padT + 4) + ')" font-size="11" fill="currentColor"><rect x="0" y="0" width="130" height="38" fill="var(--background)" stroke="currentColor" stroke-opacity="0.25" rx="3"/><rect x="8" y="10" width="14" height="8" fill="#2563eb" fill-opacity="0.7"/><text x="28" y="17">exact sum</text><line x1="8" y1="30" x2="22" y2="30" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 3"/><text x="28" y="33">Gaussian fit</text></g>';
    svg.innerHTML = s;
  }
  function update() {
    var name = sel.value;
    var dist = distributions[name];
    var n = parseInt(slider.value, 10);
    var sumP = nfold(dist.p, n);
    var sumOffset = n * dist.offset;
    var baseM = moments(dist.p, dist.offset);
    var sumM = { mean: n * baseM.mean, var: n * baseM.var, std: Math.sqrt(n * baseM.var) };
    nDisp.textContent = n;
    meanDisp.textContent = sumM.mean.toFixed(2);
    stdDisp.textContent = sumM.std.toFixed(2);
    render(sumP, sumOffset, sumM, n);
  }
  sel.addEventListener('change', update);
  slider.addEventListener('input', update);
  update();
})();
</script>

A few things to notice as you slide:

- The shape becomes bell-curve-like *fast*. By $n \approx 5$ even an asymmetric or bimodal base looks visibly Gaussian. By $n \approx 20$ the histogram and the red curve are nearly indistinguishable.
- The mean shifts at rate $\mu$ per step; the spread grows like $\sigma\sqrt{n}$, sub-linearly in $n$.
- Standardization is essential. Without it, the unstandardized sum's distribution drifts to infinity and spreads forever; you'd never converge to anything. The CLT is about the *shape* of the centered, scaled distribution, not its location.

The uniform die at $n = 2$ is the distribution of two-dice rolls, and you've probably internalized this triangle if you've played [Settlers of Catan](https://boardgamegeek.com/boardgame/13/catan). The peak at $7$ is why rolling it summons the **robber**; $6$ and $8$ sit just below the peak and are the most coveted hex numbers because resources tied to them get produced most often; $2$ and $12$ live in the tails and barely pay out. The game's economy is, quite literally, a single convolution of a uniform die with itself.

## Three reasons the limit is Gaussian

Three complementary intuitions, each capturing a different aspect of why this happens.

**(1) Convolution is smoothing.** Each convolution averages out sharp features of the densities being combined. Spikes get blurred, gaps get filled, rough edges get rounded. After enough convolutions, only the smoothest distribution with the right mean and variance survives. That happens to be the Gaussian.

**(2) Entropy maximization.** Among all densities on $\mathbb{R}$ with a given mean and variance, the one with maximum [differential entropy](https://en.wikipedia.org/wiki/Differential_entropy) (a measure of how spread out a density is) is the Gaussian. Convolution drives the entropy of the standardized sum up toward that maximum, so repeated convolution pushes the distribution toward the entropy maximizer with the matching moments. This is the *entropic CLT* ([Barron, 1986](https://projecteuclid.org/journals/annals-of-probability/volume-14/issue-1/Entropy-and-the-Central-Limit-Theorem/10.1214/aop/1176992632.full)); the entropy is in fact monotone in $n$ (Artstein, Ball, Barthe, and Naor, 2004). It gives a thermodynamic flavor to convergence: the Gaussian is the thermal equilibrium of independent additive noise.

**(3) Self-similarity.** The Gaussian is the unique distribution with finite variance that is preserved under the operation **add an independent copy and rescale by $1/\sqrt{2}$**:

$$
X + Y \;\stackrel{d}{=}\; \sqrt{2} \cdot X \quad\text{when } X, Y \stackrel{\text{iid}}{\sim} \mathcal{N}(0, 1).
$$

For any other finite-variance distribution, this operation moves the shape *closer* to Gaussian. The **add and rescale** map is a contraction toward the Gaussian fixed point, and the CLT is its convergence.

(Without finite variance, the same fixed-point logic gives non-Gaussian limits called *[stable distributions](https://en.wikipedia.org/wiki/Stable_distribution)*: [Cauchy](https://en.wikipedia.org/wiki/Cauchy_distribution), [Lévy](https://en.wikipedia.org/wiki/L%C3%A9vy_distribution), and others. The Gaussian is just the most familiar member of an infinite family of self-similar limit laws.)

## The rate of convergence

The [Berry–Esseen theorem](https://en.wikipedia.org/wiki/Berry%E2%80%93Esseen_theorem) makes the convergence quantitative:

$$
\sup_{z \in \mathbb{R}} \big| F_n(z) - \Phi(z) \big| \;\le\; \frac{C \cdot \rho}{\sigma^3 \sqrt{n}},
$$

where $F_n$ is the CDF of $Z_n$, $\Phi$ is the standard normal CDF, and $\rho = \mathbb{E}|X - \mu|^3$ is the third absolute central moment. The best known universal constant is $C \le 0.4748$ (Shevtsova, 2011).

Three things to read off the bound:

- The convergence rate is $1/\sqrt{n}$.
- The factor $\rho/\sigma^3$ measures how skewed/heavy-tailed the base is. Heavy tails slow it down; thin tails speed it up.
- The bound is uniform over $z$. Sharper *local* statements ([Edgeworth expansions](https://en.wikipedia.org/wiki/Edgeworth_series)) give higher-order corrections in $1/n$ that depend on higher [cumulants](https://en.wikipedia.org/wiki/Cumulant) of $X$ (skewness, then kurtosis, and so on).

In the widget, the rate-of-convergence comparison is easy to feel: the symmetric uniform die approaches Gaussian faster than the asymmetric Bernoulli(0.3). The two have nearly the same $\rho/\sigma^3$, so what separates them is symmetry: the die has zero skewness, which removes the leading $1/\sqrt{n}$ Edgeworth correction, while the skewed Bernoulli still carries that term.

## What can go wrong?

The standard CLT has two requirements: i.i.d. (or close to it) and finite variance. Drop either and the limit can change shape.

- **Drop independence.** There are CLTs for [martingales](https://en.wikipedia.org/wiki/Martingale_%28probability_theory%29), for mixing/weakly-dependent sequences, for [U-statistics](https://en.wikipedia.org/wiki/U-statistic), and so on. The variance in the limit gets corrected to a **long-run variance** that accounts for autocorrelation (nearby terms move together, so the sum's spread is not just the sum of individual variances).
- **Drop identical distribution.** The [Lindeberg](https://en.wikipedia.org/wiki/Lindeberg%27s_condition) / [Lyapunov](https://en.wikipedia.org/wiki/Lyapunov%27s_central_limit_theorem) conditions ensure no single $X_i$'s variance dominates the sum. As long as everyone contributes, the limit is still Gaussian.
- **Drop finite variance.** The limit is no longer Gaussian. For variables in the domain of attraction of a non-Gaussian stable law (e.g., when $\mathbb{E}|X|^\alpha = \infty$ for some $\alpha < 2$), the limit is a stable distribution with index $\alpha$, with infinite variance and (for $\alpha < 1$) infinite mean. The rescaling itself changes from $\sqrt{n}$ to $n^{1/\alpha}$.

## Higher dimensions

In $\mathbb{R}^d$, the multivariate CLT replaces the variance with a [covariance matrix](https://en.wikipedia.org/wiki/Covariance_matrix) $\Sigma$:

$$
\frac{1}{\sqrt{n}}\sum_{i=1}^{n} (X_i - \mu) \;\xrightarrow{\,d\,}\; \mathcal{N}(0, \Sigma).
$$

A lot of high-dimensional statistics is what happens to this picture when the dimension $d$ grows along with $n$. The covariance matrix becomes a random object itself; [concentration of measure](https://en.wikipedia.org/wiki/Concentration_of_measure) phenomena take over; the eigenvalues of the empirical covariance follow the [Marchenko–Pastur](https://en.wikipedia.org/wiki/Marchenko%E2%80%93Pastur_distribution) law instead of staying at the deterministic $\Sigma$. The relevant geometry stops being about a single Gaussian limit and becomes about *many* Gaussian-ish marginals interacting through [random matrix theory](https://en.wikipedia.org/wiki/Random_matrix). A topic for a separate post.

## References

- Roman Vershynin, *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. Chapter 2 has a clean treatment of CLT and Berry–Esseen.
- Andrew R. Barron. *Entropy and the central limit theorem*. The Annals of Probability, 14(1):336–342, 1986.
- Shiri Artstein, Keith M. Ball, Franck Barthe, Assaf Naor. *Solution of Shannon's problem on the monotonicity of entropy*. Journal of the American Mathematical Society, 17(4):975–982, 2004.
- Irina Shevtsova. *On the absolute constants in the Berry–Esseen type inequalities for identically distributed summands*. arXiv:1111.6554, 2011.
- Stéphane Boucheron, Gábor Lugosi, Pascal Massart. *Concentration Inequalities: A Nonasymptotic Theory of Independence*. Oxford University Press, 2013.
