---
author: Aseem Baranwal
pubDatetime: 2026-06-06T15:22:00Z
title: Sudakov minoration, or how big a maximum must be
slug: sudakov-minoration
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  "Averages shrink, but maxima grow. Sudakov's minoration inequality is the clean tool for the harder direction: a guaranteed lower bound on the maximum of many Gaussians. Far-apart options behave like independent ones, so the best of them is at least ε times the square root of log N. This is the engine behind a lot of impossibility proofs."
---

We have a good instinct for averages (or equivalently, sums) of random variables. Add up many (say $N$) independent random numbers, divide by $N$, and the result is pretty stable (barely moves): that is the law of large numbers. The [central limit theorem](/blog/why-sums-become-gaussian) is a second-order extension to this result that tells us exactly how small/large that deviation is.

In this post, we look at not the sums, but the maximum of a bunch of random variables. The maximum has a very different story, because taking the largest of a bunch of random numbers we observe that it keeps drifting upward as we add more numbers to the bunch. This is unlike averages, that are pretty stable as we add more random numbers to the bunch. The questions I try to address in this post is:
1. By how much, does the maximum drift upward, as we add more numbers?
2. When is the maximum guaranteed to be **at least** some value?

> This is directly similar to how the [CLT](/blog/why-sums-become-gaussian) answers: by how much does the average deviate as we add more numbers?

The lower-bound direction (question 2) is the useful one and is also harder to answer. There is a mature toolkit for showing a maximum is not *too* big (upper bounds). Showing that a maximum is unavoidably big is needed for a variety of impossibility statements, for example:
- this estimator cannot beat that rate,
- these two clouds of points cannot be separated,
- this noise cannot be filtered out, etc.

For Gaussian variables, the simplest tool for that direction is **Sudakov's minoration inequality**. It is rarely explained outside of graduate textbooks, so I will try my best to explain it intuitively.

## The maximum of N Gaussians

Start with the simplest possible case. Let $X_1, \dots, X_N$ be independent standard Gaussians, each $\mathcal{N}(0,1)$. How large is $\max_i X_i$?

A single standard Gaussian is almost never far from $0$: the chance of exceeding a level $t$ falls off as (directly from the definition of Gaussian)

$$
\Pr[X > t] \;\approx\; e^{-t^2/2}
$$

for large $t$ (there is a slowly-varying $1/t$ factor I am dropping but it does not change the conclusion). Now ask, how far out the *largest* of $N$ of them reaches. The expected number of the $N$ variables that clear level $t$ is

$$
N \cdot \Pr[X > t] \;\approx\; N\, e^{-t^2/2}.
$$

This count is huge when $t$ is small, and essentially zero when $t$ is large, and it passes through $1$ precisely where $N e^{-t^2/2} = 1$, that is, where $\tfrac{t^2}{2} = \log N$. So the maximum of $N$ of these variables piles up around

$$
t^\star \;=\; \sqrt{2 \log N}.
$$

This means that below $t^\star$, there are many candidates poking above the line, while above it there are essentially none. The maximum of $N$ independent standard Gaussians sits at $\sqrt{2 \log N}$ to leading order. Notice the shape: the maximum *grows without bound* as $N \to \infty$, but only at the leisurely rate of $\sqrt{\log N}$. To double the maximum we need to increase the number of variables $N$ to $N^4$.

Slide $N$ below and watch the threshold $t^\star = \sqrt{2 \log N}$ march to the right while the tail it cuts off keeps exactly the mass $1/N$:

<div class="sm-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 260px;">number of Gaussians <em>N</em><input type="range" id="sm-slider" min="0.3" max="6" step="0.01" value="2" style="flex: 1;"></label><span><em>N</em> = <strong id="sm-n">100</strong></span><span><em>t</em><sup>★</sup> = √(2 ln <em>N</em>) = <strong id="sm-t">3.03</strong></span><span>tail mass ≈ 1/<em>N</em> = <strong id="sm-tail">0.010</strong></span></div><svg id="sm-svg" viewBox="0 0 720 300" style="width: 100%; height: auto;" aria-label="Standard normal bell curve with a vertical threshold at sqrt(2 ln N); the shaded right tail has mass 1/N, marking where the maximum of N Gaussians lands."></svg></div>
<script>
(function () {
  var slider = document.getElementById('sm-slider');
  if (!slider) return;
  var nDisp = document.getElementById('sm-n');
  var tDisp = document.getElementById('sm-t');
  var tailDisp = document.getElementById('sm-tail');
  var svg = document.getElementById('sm-svg');
  var w = 720, h = 300, padL = 40, padR = 20, padT = 20, padB = 40;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  var xMin = -4, xMax = 6.2, yMax = 0.45;
  function xPx(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
  function yPx(y) { return (h - padB) - y / yMax * plotH; }
  function phi(x) { return Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI); }
  function update() {
    var v = parseFloat(slider.value);
    var N = Math.round(Math.pow(10, v));
    var tstar = Math.sqrt(2 * Math.log(N));
    nDisp.textContent = N.toLocaleString('en-US');
    tDisp.textContent = tstar.toFixed(2);
    tailDisp.textContent = (1 / N).toExponential(2).replace('e', ' × 10^').replace('^-', '^−');
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var tx = -4; tx <= 6; tx++) {
      var px = xPx(tx);
      s += '<line x1="' + px + '" y1="' + (h - padB) + '" x2="' + px + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + px + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">' + tx + '</text>';
    }
    var steps = 240, curve = '', fill = '';
    for (var i = 0; i <= steps; i++) {
      var x = xMin + (xMax - xMin) * i / steps;
      curve += (i === 0 ? 'M' : 'L') + xPx(x).toFixed(1) + ',' + yPx(phi(x)).toFixed(1) + ' ';
    }
    fill += 'M' + xPx(tstar).toFixed(1) + ',' + yPx(0).toFixed(1) + ' ';
    for (var j = 0; j <= steps; j++) {
      var xx = tstar + (xMax - tstar) * j / steps;
      fill += 'L' + xPx(xx).toFixed(1) + ',' + yPx(phi(xx)).toFixed(1) + ' ';
    }
    fill += 'L' + xPx(xMax).toFixed(1) + ',' + yPx(0).toFixed(1) + ' Z';
    s += '<path d="' + fill + '" fill="#dc2626" fill-opacity="0.30"/>';
    s += '<path d="' + curve + '" stroke="#2563eb" stroke-width="2" fill="none"/>';
    s += '<line x1="' + xPx(tstar).toFixed(1) + '" y1="' + yPx(0) + '" x2="' + xPx(tstar).toFixed(1) + '" y2="' + (padT + 6) + '" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>';
    s += '<text x="' + (xPx(tstar) + 6).toFixed(1) + '" y="' + (padT + 16) + '" font-size="12" fill="#dc2626"><tspan font-style="italic">t</tspan><tspan baseline-shift="super" font-size="9">★</tspan> = √(2 ln ' + 'N)</text>';
    s += '<text x="' + Math.min(xPx(tstar) + 30, w - padR - 70).toFixed(1) + '" y="' + yPx(0.03) + '" font-size="11" fill="#dc2626">area ≈ 1/<tspan font-style="italic">N</tspan></text>';
    s += '<text x="' + (w / 2) + '" y="' + (h - 4) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">value</text>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

## From independent to merely far apart

Independence made that argument easy: $N$ separate tries, each with its own fresh chance at a large value. But the maxima that matter in practice are usually over things that are **correlated**. The projections of one noise vector onto many directions, the errors of one model across many test points, the value of one random surface at many locations: all correlated, none independent. Can we still promise the maximum is large?

The key is to measure how different two of the variables are. For jointly Gaussian $X_i$ (each mean zero), define the distance between index $i$ and index $j$ as the typical size of their gap:

$$
d(i, j) \;=\; \sqrt{\mathbb{E}\big[(X_i - X_j)^2\big]}.
$$

This is called the **canonical metric**, and for mean-zero Gaussians it pays to write it out. With unit variances,

$$
d(i,j)^2 \;=\; \mathbb{E}[X_i^2] - 2\,\mathbb{E}[X_i X_j] + \mathbb{E}[X_j^2] \;=\; 2\,(1 - \rho_{ij}),
$$

where $\rho_{ij}$ is the correlation between $X_i$ and $X_j$. Distance is just correlation in disguise, running the *opposite* way: identical variables ($\rho = 1$) sit at distance $0$, independent ones ($\rho = 0$) at distance $\sqrt{2}$, and mirror images ($\rho = -1$) at the largest distance of all, $2$. So two indices are *close* only when they are near-copies of each other, and they grow *farther apart* as their correlation falls from $+1$ down through $0$ to $-1$. What the maximum cares about is exactly this redundancy: two strongly correlated indices are essentially one variable counted twice, a wasted draw that adds no fresh chance at a large value, while far-apart indices are genuinely different shots. Independent points, at distance $\sqrt{2}$, are the clean case of two fresh tries; negatively correlated points are spread wider still, and the inequality below rewards that extra spread.

Sudakov's minoration turns pairwise separation directly into a lower bound on the maximum:

> **Sudakov minoration.** Let $X_1, \dots, X_N$ be jointly Gaussian with mean zero. If every pair is at least $\varepsilon$ apart in the canonical metric, $d(i,j) \ge \varepsilon$ for all $i \ne j$, then
> $$
> \mathbb{E}\Big[\max_{i \le N} X_i\Big] \;\ge\; c\, \varepsilon \, \sqrt{\log N},
> $$
> where $c > 0$ is a universal constant.

Read it as: a set of $N$ options, no two of which are too similar, is forced to contain one option of size at least $\varepsilon \sqrt{\log N}$. The only thing we have to check is a pairwise separation, which is usually easy. We do not need the variables to actually be independent, and we do not need to compute anything about the joint distribution beyond the pairwise gaps.

Let me sanity-check it on the case we already solved. For independent standard Gaussians, $\mathbb{E}[(X_i - X_j)^2] = \operatorname{Var}(X_i) + \operatorname{Var}(X_j) = 2$, so every pair is exactly $\varepsilon = \sqrt{2}$ apart. Sudakov then gives

$$
\mathbb{E}\Big[\max_i X_i\Big] \;\ge\; c\sqrt{2}\,\sqrt{\log N},
$$

and we know the true answer is $\sqrt{2\log N} = \sqrt{2}\,\sqrt{\log N}$. The inequality has exactly the right shape and recovers the true growth rate up to the constant $c$. Sudakov has thrown away the convenient independence and kept only a pairwise-distance bookkeeping, yet lost nothing but a constant.

A few remarks for the curious, none of which we need for the rest of the post:

- The general statement is phrased for a supremum over a possibly infinite index set $T$, using **covering numbers**: $\mathbb{E}[\sup_{t \in T} X_t] \ge c \sup_{\varepsilon > 0} \varepsilon \sqrt{\log N(T, d, \varepsilon)}$, where $N(T, d, \varepsilon)$ counts how many balls of radius $\varepsilon$ are needed to cover $T$. The finite, separated-points version above is the one we actually reach for.
- There is a twin inequality in the other direction. [Dudley's inequality](https://en.wikipedia.org/wiki/Dudley%27s_theorem) bounds the same expected supremum from *above* by an integral of $\sqrt{\log N(T, d, \varepsilon)}$ over all scales. Sudakov is a single scale of that integral, used as a lower bound. For many natural processes the two match up to constants, so Sudakov is not just a crude floor; it often pins down the right order.

Separation rules out near-duplicates, non-duplicate points are genuinely different tries, and enough genuinely different tries force the maximum to be large. Sudakov turns that chain into a quantitative exchange rate between how far apart the points are and how large the maximum must be.

## Why the lower-bound direction is the one we fight for

It is worth dwelling on why we would want a lower bound on a maximum at all. Upper bounds are reassuring: they say our worst case is not that bad, our estimator concentrates, our algorithm's error is controlled. Lower bounds are where the interesting impossibility lives. If we can show some noise quantity is *at least* this large no matter what, we have shown that no method can drive the corresponding error below it. Minimax lower bounds, hardness of detection, and non-separability results all run on this fuel.

And a supremum is exactly the right object for a worst case. "Can any direction separate these points?" is a statement about $\sup$ over directions. "Is there any test function that detects the signal?" is a $\sup$ over test functions. To prove such a worst case is unavoidably bad, we lower-bound a supremum, and Sudakov is built for that.

## A toy: when does a faint signal vanish into noise?

Here is the smallest self-contained problem where Sudakov does real work. No machine learning required; just a signal and some noise.

We take $N$ noisy readings $Y_1, \dots, Y_N$. We suspect that exactly one of them, we do not know which, carries a faint extra signal of size $s$: that reading is $Y_{i_0} = s + X_{i_0}$, while all the others are pure noise, $Y_i = X_i$. The noises $X_i$ are jointly Gaussian, and they need *not* be independent. Readings taken close together, or sharing a sensor, are correlated, and that is allowed. The obvious way to guess which reading is the special one is to point at the largest. When does that work?

It works only if the planted reading really does rise above all the noise, that is, if its signal clears the loudest of the pure-noise readings,

$$
s \;>\; \max_{i \ne i_0} X_i.
$$

So everything hinges on the size of the largest pure-noise reading, a maximum of a Gaussian process over the $N$ readings, and that is exactly what Sudakov lower-bounds. As long as the readings are genuinely different from one another, meaning their noises are pairwise at least $\varepsilon$ apart in the canonical metric, then

$$
\max_i \, X_i \;\ge\; c\,\varepsilon \sqrt{\log N}
$$

on average, and (because a Gaussian maximum concentrates tightly around its mean, by [Gaussian concentration](https://en.wikipedia.org/wiki/Concentration_of_measure)) with high probability too. There is an unavoidable **noise floor** of height about $\varepsilon\sqrt{\log N}$. A signal fainter than the floor is buried: the loudest pure-noise reading beats it, we point at the wrong one, and no cleverness in *how* we inspect the data can recover a signal the noise has already swallowed. This is a real **detection threshold**: below $\varepsilon\sqrt{\log N}$, the faint signal is invisible.

Play with the trade-off. The blue curve is the noise floor $\varepsilon\sqrt{2\log N}$; the red line is the signal $s$. Where the floor stays under the signal the planted reading is detectable; once the floor climbs past, it is lost:

<div class="sm2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.92em;"><label style="display: flex; align-items: center; gap: 0.5rem; flex: 1 1 200px;">signal <em>s</em><input type="range" id="sm2-s" min="0.5" max="7" step="0.05" value="4" style="flex: 1;"><span><strong id="sm2-s-disp">4.0</strong></span></label><label style="display: flex; align-items: center; gap: 0.5rem; flex: 1 1 200px;">noise scale <em>ε</em><input type="range" id="sm2-eps" min="0.2" max="3" step="0.05" value="1" style="flex: 1;"><span><strong id="sm2-eps-disp">1.0</strong></span></label><label style="display: flex; align-items: center; gap: 0.5rem; flex: 1 1 200px;">repeats <em>m</em><input type="range" id="sm2-m" min="1" max="50" step="1" value="1" style="flex: 1;"><span><strong id="sm2-m-disp">1</strong></span></label></div><div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-size: 0.92em; margin-bottom: 0.6rem;"><span>effective noise <em>ε</em>/√<em>m</em> = <strong id="sm2-eff">1.00</strong></span><span>detectable while <em>N</em> &lt; <strong id="sm2-nstar">—</strong></span></div><svg id="sm2-svg" viewBox="0 0 720 360" style="width: 100%; height: auto; max-width: 720px; display: block; margin: 0 auto;" aria-label="Noise floor epsilon times sqrt(2 ln N) rising with the number of readings N, compared against a flat signal level. Below the crossover the faint signal is detectable; above it, it is buried."></svg></div>
<script>
(function () {
  var sIn = document.getElementById('sm2-s');
  if (!sIn) return;
  var epsIn = document.getElementById('sm2-eps');
  var mIn = document.getElementById('sm2-m');
  var sDisp = document.getElementById('sm2-s-disp');
  var epsDisp = document.getElementById('sm2-eps-disp');
  var mDisp = document.getElementById('sm2-m-disp');
  var effDisp = document.getElementById('sm2-eff');
  var nstarDisp = document.getElementById('sm2-nstar');
  var svg = document.getElementById('sm2-svg');
  var w = 720, h = 360, padL = 54, padR = 18, padT = 24, padB = 48;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  var uMin = Math.log10(2), uMax = 6; // u = log10(N)
  var POS = '#2563eb', SIG = '#dc2626', OK = '#16a34a';
  function uPx(u) { return padL + (u - uMin) / (uMax - uMin) * plotW; }
  function floorAt(u, eff) { return eff * Math.sqrt(2 * Math.log(Math.pow(10, u))); }
  function update() {
    var s = parseFloat(sIn.value);
    var eps = parseFloat(epsIn.value);
    var m = parseInt(mIn.value, 10);
    var eff = eps / Math.sqrt(m);
    sDisp.textContent = s.toFixed(1);
    epsDisp.textContent = eps.toFixed(2);
    mDisp.textContent = m;
    effDisp.textContent = eff.toFixed(2);
    var yMax = Math.max(s, floorAt(uMax, eff)) * 1.18;
    if (yMax < 1) yMax = 1;
    function yPx(y) { return (h - padB) - y / yMax * plotH; }
    // crossover N* where eff*sqrt(2 ln N*) = s  =>  N* = exp(s^2/(2 eff^2))
    var lnNstar = (s * s) / (2 * eff * eff);
    var Nstar = Math.exp(lnNstar);
    var uStar = lnNstar / Math.LN10;
    nstarDisp.innerHTML = (uStar >= uMax) ? '&gt; 10<sup>6</sup>'
      : Math.max(1, Math.round(Nstar)).toLocaleString('en-US');
    var xStar = Math.max(uMin, Math.min(uMax, uStar));
    var s5 = '';
    // detectable / buried shaded bands
    s5 += '<rect x="' + uPx(uMin).toFixed(1) + '" y="' + padT + '" width="' + (uPx(xStar) - uPx(uMin)).toFixed(1) + '" height="' + plotH + '" fill="' + OK + '" fill-opacity="0.10"/>';
    s5 += '<rect x="' + uPx(xStar).toFixed(1) + '" y="' + padT + '" width="' + (uPx(uMax) - uPx(xStar)).toFixed(1) + '" height="' + plotH + '" fill="' + SIG + '" fill-opacity="0.10"/>';
    // axes
    s5 += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s5 += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var u = 1; u <= 6; u++) {
      var px = uPx(u);
      s5 += '<line x1="' + px + '" y1="' + (h - padB) + '" x2="' + px + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s5 += '<text x="' + px + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor">10<tspan baseline-shift="super" font-size="8">' + u + '</tspan></text>';
    }
    for (var yv = 0; yv <= yMax; yv += (yMax > 6 ? 2 : 1)) {
      var py = yPx(yv);
      s5 += '<line x1="' + (padL - 4) + '" y1="' + py + '" x2="' + padL + '" y2="' + py + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s5 += '<text x="' + (padL - 8) + '" y="' + (py + 4) + '" text-anchor="end" font-size="11" fill="currentColor">' + yv + '</text>';
    }
    // noise floor curve
    var curve = '';
    var steps = 200;
    for (var i = 0; i <= steps; i++) {
      var uu = uMin + (uMax - uMin) * i / steps;
      curve += (i === 0 ? 'M' : 'L') + uPx(uu).toFixed(1) + ',' + yPx(floorAt(uu, eff)).toFixed(1) + ' ';
    }
    s5 += '<path d="' + curve + '" stroke="' + POS + '" stroke-width="2.2" fill="none"/>';
    // signal line
    s5 += '<line x1="' + padL + '" y1="' + yPx(s).toFixed(1) + '" x2="' + (w - padR) + '" y2="' + yPx(s).toFixed(1) + '" stroke="' + SIG + '" stroke-width="2" stroke-dasharray="6 3"/>';
    // crossover marker
    if (uStar > uMin && uStar < uMax) {
      s5 += '<line x1="' + uPx(uStar).toFixed(1) + '" y1="' + padT + '" x2="' + uPx(uStar).toFixed(1) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="2 3"/>';
      s5 += '<circle cx="' + uPx(uStar).toFixed(1) + '" cy="' + yPx(s).toFixed(1) + '" r="4" fill="currentColor"/>';
      s5 += '<text x="' + uPx(uStar).toFixed(1) + '" y="' + (padT - 6) + '" text-anchor="middle" font-size="11" fill="currentColor"><tspan font-style="italic">N</tspan><tspan baseline-shift="super" font-size="8">★</tspan></text>';
    }
    // labels
    s5 += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">number of readings, N</text>';
    s5 += '<text x="16" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 16 ' + (h / 2) + ')">magnitude</text>';
    s5 += '<text x="' + (uPx(uMin) + 8).toFixed(1) + '" y="' + (yPx(s) - 6).toFixed(1) + '" font-size="11" fill="' + SIG + '">signal <tspan font-style="italic">s</tspan></text>';
    s5 += '<text x="' + (w - padR - 8) + '" y="' + (yPx(floorAt(uMax, eff)) - 8).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + POS + '">noise floor <tspan font-style="italic">ε</tspan>√(2 ln <tspan font-style="italic">N</tspan>)</text>';
    svg.innerHTML = s5;
  }
  sIn.addEventListener('input', update);
  epsIn.addEventListener('input', update);
  mIn.addEventListener('input', update);
  update();
})();
</script>

Two things to read off the picture.

- **More readings make detection harder.** The floor rises with $N$. Every extra reading is another chance for the noise to throw up a large value, and the planted signal has to clear all of them. A worst case over more options can only grow; this is the cost of multiple comparisons, in one clean formula.
- **Averaging lowers the floor.** If we can repeat each reading $m$ times and average, the noise scale shrinks from $\varepsilon$ to $\varepsilon/\sqrt{m}$, and the floor drops with it. Slide $m$ up and the detectable region stretches to the right. We buy the detection of fainter signals at the price of $m$ times as many measurements, and Sudakov is what certifies that the floor is really there, so the gain is a genuine threshold and not an artifact of a loose bound.

The shape of this argument, lower-bound a worst-case noise to show that *nothing* below some level can be detected, is why Sudakov is worth knowing. The same skeleton drives a non-separability threshold in [a paper of mine](https://arxiv.org/abs/2102.06966), where the readings are data points and a smoothing operation plays the role of the averaging above. Different dressing, identical engine.

## References

- Roman Vershynin. *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. Section 7.4 states and proves Sudakov minoration; Section 7.2 covers the Dudley upper bound.
- Martin J. Wainwright. *High-Dimensional Statistics: A Non-Asymptotic Viewpoint*. Cambridge University Press, 2019. Chapter 5 develops covering and packing numbers and the supremum bounds built on them.
- Michel Talagrand. *Upper and Lower Bounds for Stochastic Processes*. Springer, 2014. The definitive account of how far the lower and upper bounds for suprema can be pushed, via generic chaining.
- Aseem Baranwal, Kimon Fountoulakis, Aukosh Jagannath. *Graph Convolution for Semi-Supervised Classification: Improved Linear Separability and Out-of-Distribution Generalization*. International Conference on Machine Learning (ICML), 2021. [arXiv:2102.06966](https://arxiv.org/abs/2102.06966). The non-separability threshold (Theorem 1, part 3) is where the supremum lower bound above does its work.
