---
author: Aseem Raj Baranwal
pubDatetime: 2026-06-07T15:22:00Z
title: Covering the sphere with ε-nets
slug: epsilon-nets-on-the-sphere
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  "Many quantities in high dimensions are a supremum over all unit vectors, and a union bound cannot reach infinitely many of them. An ε-net replaces the sphere by a finite set of directions: control the quantity there, pay a constant factor to extend back, and the exponentially large net is still no match for a sub-Gaussian tail. The worked example is the operator norm of a random matrix."
---

A lot of quantities in high-dimensional probability are a supremum over the unit sphere, a worst case over all directions at once. The standard example is the **operator norm** of a matrix $A$,

$$
\|A\| \;=\; \sup_{\|x\| = 1} \|Ax\|,
$$

the largest factor by which $A$ can stretch a unit vector, equivalently its largest singular value. When $A$ is random, we frequently need to show $\|A\|$ is not too large.

For a single fixed direction $x$, this is routine: $\|Ax\|$ is the length of one random vector, and it concentrates. The difficulty is the word *every*. The sphere holds infinitely many directions, so we cannot union-bound over them one at a time. The **ε-net** is the standard device for exactly this situation, and it is one of the most reused arguments in the area.

Two facts do all the work. The sphere has a finite net that is not too large, and controlling a quantity on the net controls it everywhere. After that, the operator norm of a random matrix falls out in a few lines.

## What an ε-net is

Fix a target accuracy $\varepsilon > 0$. An **ε-net** of the unit sphere $S^{d-1}$ is a finite set of points $\mathcal{N} \subseteq S^{d-1}$ such that every point of the sphere is within distance $\varepsilon$ of some point of $\mathcal{N}$:

$$
\text{for every } x \in S^{d-1}, \qquad \min_{y \in \mathcal{N}} \|x - y\| \;\le\; \varepsilon.
$$

Said another way, the $\varepsilon$-balls centered at the net points cover the sphere. A smaller $\varepsilon$ is a finer net and takes more points.

The unit circle $S^1$ is the one case we can draw. Below, each dot is a net point and the shaded disk around it has radius $\varepsilon$. The disks together cover the circle, so every point on it is within $\varepsilon$ of a dot. Slide $\varepsilon$ to make the net finer or coarser.

<div class="en-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 260px;">accuracy <em>ε</em><input type="range" id="en-eps" min="0.12" max="1.2" step="0.01" value="0.5" style="flex: 1;"></label><span><em>ε</em> = <strong id="en-eps-val">0.50</strong></span><span>net points = <strong id="en-count">13</strong></span></div><svg id="en-svg" viewBox="0 0 400 400" style="width: 100%; height: auto; max-width: 400px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Unit circle with an epsilon-net: evenly spaced net points, each surrounded by a disk of radius epsilon; the disks cover the circle."></svg></div>
<script>
(function () {
  var slider = document.getElementById('en-eps');
  if (!slider) return;
  var epsDisp = document.getElementById('en-eps-val');
  var countDisp = document.getElementById('en-count');
  var svg = document.getElementById('en-svg');
  var cx = 200, cy = 200, R = 140;
  function update() {
    var eps = parseFloat(slider.value);
    var theta = 2 * Math.asin(Math.min(1, eps / 2));
    var M = Math.max(2, Math.ceil(2 * Math.PI / theta));
    epsDisp.textContent = eps.toFixed(2);
    countDisp.textContent = M;
    var s = '';
    var rPx = eps * R;
    for (var k = 0; k < M; k++) {
      var a = 2 * Math.PI * k / M;
      var px = cx + R * Math.cos(a);
      var py = cy - R * Math.sin(a);
      s += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + rPx.toFixed(1) + '" fill="#2563eb" fill-opacity="0.07"/>';
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="currentColor" stroke-width="1.6"/>';
    for (var k2 = 0; k2 < M; k2++) {
      var a2 = 2 * Math.PI * k2 / M;
      var px2 = cx + R * Math.cos(a2);
      var py2 = cy - R * Math.sin(a2);
      s += '<circle cx="' + px2.toFixed(1) + '" cy="' + py2.toFixed(1) + '" r="3.2" fill="#2563eb"/>';
    }
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

## How many points does the net need?

The net is finite, but its size is the question that decides everything. That size is the **covering number** $N(S^{d-1}, \varepsilon)$, and a short volume argument bounds it.

Take $\mathcal{N}$ to be a maximal $\varepsilon$-separated subset of the sphere: a set of points that are pairwise at least $\varepsilon$ apart, to which no further point can be added without breaking that separation. Maximality forces $\mathcal{N}$ to be an $\varepsilon$-net, because if some point of the sphere were farther than $\varepsilon$ from all of $\mathcal{N}$, we could add it. Now place a ball of radius $\varepsilon/2$ around each net point. These balls are disjoint, since their centers are at least $\varepsilon$ apart, and they all sit inside the ball of radius $1 + \varepsilon/2$ around the origin, since each center has norm $1$. A $d$-dimensional ball of radius $r$ has volume proportional to $r^d$, so comparing the total volume of the small balls to the big one,

$$
|\mathcal{N}| \cdot \left(\tfrac{\varepsilon}{2}\right)^{d} \;\le\; \left(1 + \tfrac{\varepsilon}{2}\right)^{d},
\qquad\text{hence}\qquad
|\mathcal{N}| \;\le\; \left(1 + \frac{2}{\varepsilon}\right)^{d} \;\le\; \left(\frac{3}{\varepsilon}\right)^{d}
$$

for $\varepsilon \le 1$.

So the sphere has an $\varepsilon$-net of size at most $(3/\varepsilon)^d$. It is finite, which is what we needed, but it grows exponentially in the dimension $d$. That exponential is the quantity to watch: whether the net is affordable comes down to whether the $e^{O(d)}$ point count can be beaten by the tail bound we have for a single point.

## From the net to the whole sphere

A net is only useful if controlling a quantity on it controls the quantity everywhere. For the operator norm, the extension is one short computation, and it costs only a constant factor.

> **Extension lemma.** Let $\mathcal{N}$ be an $\varepsilon$-net of $S^{n-1}$. Then
> $$
> \|A\| \;\le\; \frac{1}{1 - \varepsilon} \max_{x \in \mathcal{N}} \|Ax\|.
> $$

Take any unit vector $z$, and a net point $x$ with $\|z - x\| \le \varepsilon$. Writing $M = \max_{x \in \mathcal{N}} \|Ax\|$,

$$
\|Az\| \;\le\; \|Ax\| + \|A(z - x)\| \;\le\; M + \|A\|\,\|z - x\| \;\le\; M + \varepsilon \|A\|,
$$

using $\|A(z-x)\| \le \|A\|\,\|z-x\|$. Taking the supremum over unit $z$ on the left gives $\|A\| \le M + \varepsilon\|A\|$, and rearranging gives the lemma.

With $\varepsilon = \tfrac{1}{2}$ the factor is $2$ and the net has at most $5^n$ points:

$$
\|A\| \;\le\; 2 \max_{x \in \mathcal{N}} \|Ax\|, \qquad |\mathcal{N}| \le 5^{n}.
$$

The supremum over the whole sphere that defines $\|A\|$ is now a maximum over a finite set, paid for with a factor of $2$.

## The operator norm of a random matrix

Now the application. Let $A$ be an $m \times n$ matrix with independent standard Gaussian entries, $A_{ij} \sim \mathcal{N}(0,1)$. How large is $\|A\|$?

**One fixed direction.** Fix a unit vector $x \in \mathbb{R}^n$. Each coordinate of $Ax$ is the inner product of a row of $A$ with $x$, a Gaussian of variance $\|x\|^2 = 1$, and the rows are independent, so $Ax \sim \mathcal{N}(0, I_m)$. Then $\|Ax\|^2$ is a sum of $m$ squared standard Gaussians, a [chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) with mean $m$, so by Jensen's inequality ($\mathbb{E}\sqrt{Z} \le \sqrt{\mathbb{E}Z}$ for the concave square root) $\mathbb{E}\|Ax\| \le \sqrt{m}$. Moreover $\|Ax\|$ is a $1$-Lipschitz function of the entries of $A$ (changing $A$ by a small amount in Frobenius norm changes $\|Ax\|$ by at most as much), so [Gaussian concentration](https://en.wikipedia.org/wiki/Concentration_of_measure) gives a sub-Gaussian tail:

$$
\Pr\big[\|Ax\| \ge \sqrt{m} + s\big] \;\le\; e^{-s^2/2}.
$$

**Union over the net.** This was one fixed $x$. Take a $\tfrac{1}{2}$-net $\mathcal{N}$ of the sphere $S^{n-1}$, with $|\mathcal{N}| \le 5^{n}$, and union-bound the tail over its points:

$$
\Pr\Big[\max_{x \in \mathcal{N}} \|Ax\| \ge \sqrt{m} + s\Big] \;\le\; 5^{n}\, e^{-s^2/2}.
$$

**Extend.** The extension lemma turns the net maximum into the full operator norm, $\|A\| \le 2 \max_{x \in \mathcal{N}} \|Ax\|$, so

$$
\Pr\big[\|A\| \ge 2(\sqrt{m} + s)\big] \;\le\; 5^{n}\, e^{-s^2/2}.
$$

**Balance.** The net contributes $5^{n} = e^{n \ln 5}$, and the tail contributes $e^{-s^2/2}$. The tail overtakes the net once $s$ is a little past $\sqrt{2 \ln 5}\,\sqrt{n} \approx 1.8\sqrt{n}$: setting $s = \sqrt{2 \ln 5}\,\sqrt{n} + t$ makes $s^2 \ge 2n\ln 5 + t^2$, so

$$
5^{n}\, e^{-s^2/2} \;\le\; e^{-t^2/2}.
$$

Therefore, with probability at least $1 - e^{-t^2/2}$,

$$
\|A\| \;\le\; 2\sqrt{m} + 2\sqrt{2\ln 5}\,\sqrt{n} + 2t \;\lesssim\; \sqrt{m} + \sqrt{n} + t.
$$

A random $m \times n$ Gaussian matrix has $\|A\| \lesssim \sqrt{m} + \sqrt{n}$, with fluctuations of constant order. The $\varepsilon$-net did the real work: it converted the supremum over the sphere into a $5^{n}$-fold union bound, and the $5^{n}$ was harmless because the per-direction tail $e^{-s^2/2}$ is so much stronger. Spending a deviation of order $\sqrt{n}$ pays off the entire net.

The balance is the whole content of the method. Below, the curve is the exponent $n \ln 5 - s^2/2$ of the bound $5^{n} e^{-s^2/2}$. Where it is positive the bound exceeds $1$ and says nothing; once it crosses below zero the bound is exponentially small. Slide $n$ and watch the crossover $s^\star = \sqrt{2n\ln 5}$ move outward like $\sqrt{n}$.

<div class="en2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.5rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1;">dimension <em>n</em><input type="range" id="en2-n" min="2" max="400" step="1" value="100" style="flex: 1;"></label><span style="white-space: nowrap;"><em>n</em> = <strong id="en2-n-val" style="display: inline-block; min-width: 2.2em;">100</strong></span></div><div style="display: flex; gap: 0.5rem 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><span style="white-space: nowrap;">net size 5<sup><em>n</em></sup> = <strong id="en2-net" style="display: inline-block; min-width: 3.5em;">e<sup>161</sup></strong></span><span style="white-space: nowrap;">crossover <em>s</em><sup>★</sup> = √(2<em>n</em> ln5) = <strong id="en2-sstar" style="display: inline-block; min-width: 2.8em;">17.9</strong></span></div><svg id="en2-svg" viewBox="0 0 720 340" style="width: 100%; height: auto;" aria-label="The exponent n ln5 minus s squared over two as a function of the deviation s. It is positive (union bound useless) until the crossover s-star, then negative (bound exponentially small)."></svg></div>
<script>
(function () {
  var slider = document.getElementById('en2-n');
  if (!slider) return;
  var nDisp = document.getElementById('en2-n-val');
  var netDisp = document.getElementById('en2-net');
  var sDisp = document.getElementById('en2-sstar');
  var svg = document.getElementById('en2-svg');
  var w = 720, h = 340, padL = 58, padR = 18, padT = 22, padB = 46;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  var ln5 = Math.log(5);
  function update() {
    var n = parseInt(slider.value, 10);
    var sStar = Math.sqrt(2 * n * ln5);
    var sMax = 1.5 * sStar + 6;
    var g0 = n * ln5;
    var gMin = g0 - sMax * sMax / 2;
    var yTop = g0 * 1.08, yBot = gMin * 1.08;
    nDisp.textContent = n;
    netDisp.innerHTML = 'e<sup>' + Math.round(g0) + '</sup>';
    sDisp.textContent = sStar.toFixed(1);
    function xPx(s) { return padL + s / sMax * plotW; }
    function yPx(g) { return padT + (yTop - g) / (yTop - yBot) * plotH; }
    var out = '';
    var xs = xPx(sStar);
    out += '<rect x="' + padL + '" y="' + padT + '" width="' + (xs - padL).toFixed(1) + '" height="' + plotH + '" fill="#dc2626" fill-opacity="0.08"/>';
    out += '<rect x="' + xs.toFixed(1) + '" y="' + padT + '" width="' + (w - padR - xs).toFixed(1) + '" height="' + plotH + '" fill="#16a34a" fill-opacity="0.08"/>';
    // zero line
    var y0 = yPx(0);
    out += '<line x1="' + padL + '" y1="' + y0.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y0.toFixed(1) + '" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>';
    out += '<text x="' + (w - padR - 4) + '" y="' + (y0 - 5).toFixed(1) + '" text-anchor="end" font-size="11" fill="currentColor" fill-opacity="0.7">bound = 1</text>';
    out += '<text x="' + ((padL + xs) / 2).toFixed(1) + '" y="' + (y0 + 24).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#dc2626">bound &#8805; 1: says nothing</text>';
    out += '<text x="' + ((xs + w - padR) / 2).toFixed(1) + '" y="' + (y0 - 12).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#16a34a">bound &lt; 1: exponentially small</text>';
    // axes
    out += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    out += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var sv = 0; sv <= sMax; sv += (sMax > 30 ? 10 : 5)) {
      var px = xPx(sv);
      out += '<line x1="' + px.toFixed(1) + '" y1="' + (h - padB) + '" x2="' + px.toFixed(1) + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      out += '<text x="' + px.toFixed(1) + '" y="' + (h - padB + 17) + '" text-anchor="middle" font-size="11" fill="currentColor">' + sv + '</text>';
    }
    // curve g(s) = n ln5 - s^2/2
    var path = '', steps = 200;
    for (var i = 0; i <= steps; i++) {
      var s = sMax * i / steps;
      var g = g0 - s * s / 2;
      path += (i === 0 ? 'M' : 'L') + xPx(s).toFixed(1) + ',' + yPx(g).toFixed(1) + ' ';
    }
    out += '<path d="' + path + '" stroke="#2563eb" stroke-width="2.2" fill="none"/>';
    // crossover marker
    out += '<line x1="' + xs.toFixed(1) + '" y1="' + padT + '" x2="' + xs.toFixed(1) + '" y2="' + (h - padB) + '" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 3"/>';
    out += '<circle cx="' + xs.toFixed(1) + '" cy="' + y0.toFixed(1) + '" r="4" fill="#dc2626"/>';
    out += '<text x="' + (xs + 6).toFixed(1) + '" y="' + (padT + 14) + '" font-size="12" fill="#dc2626"><tspan font-style="italic">s</tspan><tspan baseline-shift="super" font-size="9">★</tspan> = √(2<tspan font-style="italic">n</tspan> ln5)</text>';
    out += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">deviation s of the net maximum above √m</text>';
    out += '<text x="15" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 15 ' + (h / 2) + ')">exponent of the bound, n ln5 − s²/2</text>';
    svg.innerHTML = out;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

The constants are loose. The factor $2$ is the price of the $\tfrac12$-net, and the $\sqrt{2\ln 5}$ is the price of the volume bound on the net size. Sharper arguments remove them: Gordon's Gaussian comparison inequality gives $\mathbb{E}\|A\| \le \sqrt{m} + \sqrt{n}$ with no stray constant, and the Bai–Yin law shows $\|A\|/(\sqrt{m} + \sqrt{n}) \to 1$ as the dimensions grow. The $\varepsilon$-net gets the rate $\sqrt{m} + \sqrt{n}$ right with almost no work, which is why it is usually the first thing to try.

## When the net trick works

The pattern reaches well beyond random matrices. Whenever a quantity is a supremum over the sphere, or over any set with a controlled covering number, and each fixed point obeys a sub-Gaussian tail $e^{-c s^2}$, the same three steps apply: net the set, union-bound over the net, extend back. The net costs $e^{O(d)}$, and a sub-Gaussian tail pays for it with a deviation of order $\sqrt{d}$. This is the argument behind operator-norm bounds for random matrices, the [restricted isometry property](https://en.wikipedia.org/wiki/Restricted_isometry_property) in compressed sensing, sample covariance estimation, and [Johnson–Lindenstrauss](https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma) sketching.

It also has clear limits. The $e^{O(d)}$ net size means the per-point tail must be at least sub-Gaussian for the method to break even; for heavier tails the net is too expensive and one needs finer tools like chaining. And the covering-number bound discards the geometry of the set, so it gives the right rate but not the sharp constant. When the constant is what matters, the net is the wrong instrument.

## References

- Roman Vershynin. *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. Chapter 4 builds nets and covering numbers and uses them to bound the operator norm of a random matrix.
- Martin J. Wainwright. *High-Dimensional Statistics: A Non-Asymptotic Viewpoint*. Cambridge University Press, 2019. Chapter 6 covers random matrices and covariance estimation, including the operator-norm bound; Chapter 5 develops the metric-entropy machinery behind it.
- Terence Tao. *Topics in Random Matrix Theory*. American Mathematical Society, 2012. The $\varepsilon$-net argument for the operator norm appears in the opening sections on the operator norm.
- Yehoram Gordon. *Some inequalities for Gaussian processes and applications*. Israel Journal of Mathematics, 50(4):265–289, 1985. The Gaussian comparison behind the sharp $\sqrt{m} + \sqrt{n}$ constant.
