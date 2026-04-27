---
author: Aseem Baranwal
pubDatetime: 2026-04-18T15:22:00Z
title: High-dimensional Gaussians live on a sphere
slug: high-dimensional-gaussians-on-a-sphere
featured: false
draft: false
tags:
  - mathematics
description:
  "The bell-curve picture says Gaussian samples live near the mean. In high dimensions that picture is catastrophically wrong: almost all the mass lies in a thin spherical shell at radius √d. Density and mass are not the same thing."
---

The bell curve is one of the first things we learn in probability. [Gaussian](https://en.wikipedia.org/wiki/Normal_distribution) samples concentrate near the mean, density peaks at zero, tails fall off fast. In one dimension this picture is correct. In a hundred dimensions, it is catastrophically wrong.

If you sample from a standard Gaussian in $d = 100$ dimensions, almost none of your samples will be near the origin. Almost all of them will sit on a thin spherical shell of radius about $\sqrt{d} = 10$.

## Density vs. mass

The standard $d$-dimensional Gaussian has density

$$
f(x) \;=\; (2\pi)^{-d/2} \exp\!\left(-\tfrac{1}{2}\|x\|^2\right),
$$

which peaks at $x = 0$. So far, so 1D.

But probability *mass* is density times *volume*. And in high dimensions, the volume sitting at large radii dwarfs the volume near the origin. To see why, consider a thin spherical shell at radius $r$ with thickness $dr$. Its volume is **surface area $\times$ thickness**. In 3D, the surface area of a sphere of radius $r$ scales as $r^2$; in $d$ dimensions it scales as $r^{d-1}$ (one fewer power than the dimension, because the sphere is one dimension lower than the ambient space). So the shell volume scales like $r^{d-1}\, dr$.

The factor $r^{d-1}$ is what dominates. Doubling the radius multiplies the shell's volume by $2^{d-1}$, which is about $6 \times 10^{29}$ for $d = 100$. Concretely: the fraction of a unit ball lying inside radius $0.99$ is $0.99^d$, which is around $37\%$ at $d = 100$ and effectively $0\%$ at $d = 1000$. Almost all of a high-dim region's volume is in its outermost sliver.

To find where mass concentrates, multiply density by shell volume. The result is the *radial density*: the density of the random variable $\|X\|$, i.e., the probability mass that lands in the thin shell at radius $r$.

$$
p(r) \;\propto\; r^{d-1} \exp\!\left(-\tfrac{1}{2} r^2\right).
$$

This is the [chi distribution](https://en.wikipedia.org/wiki/Chi_distribution) with $d$ degrees of freedom (just a name for the law of $\|X\|$ when $X$ is a standard $d$-dim Gaussian). The Gaussian factor $\exp(-r^2/2)$ wants $r$ small; the volume factor $r^{d-1}$ wants $r$ large. They balance at $r = \sqrt{d-1} \approx \sqrt{d}$, which is the mode of the radial distribution.

Slide $d$ and watch where Gaussian samples actually land:

<div class="gs-widget" style="margin: 1.5rem 0; padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">dimension <em>d</em><input type="range" id="gs-slider" min="1" max="200" value="3" style="flex: 1;"></label><span><em>d</em> = <strong id="gs-d">3</strong></span><span>√<em>d</em> = <strong id="gs-sqrtd">1.73</strong></span><span>mean ‖<em>X</em>‖ = <strong id="gs-mean">1.60</strong></span><span>std ‖<em>X</em>‖ = <strong id="gs-std">0.67</strong></span></div><svg id="gs-svg" viewBox="0 0 720 280" style="width: 100%; height: auto;" aria-label="Histogram of the norm of X for X drawn from a d-dimensional standard Gaussian, with a red line at sqrt(d)."></svg></div>
<script>
(function () {
  var slider = document.getElementById('gs-slider');
  if (!slider) return;
  var dDisp = document.getElementById('gs-d');
  var sqrtDisp = document.getElementById('gs-sqrtd');
  var meanDisp = document.getElementById('gs-mean');
  var stdDisp = document.getElementById('gs-std');
  var svg = document.getElementById('gs-svg');
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function update() {
    var d = parseInt(slider.value, 10);
    var N = 800;
    var norms = new Array(N);
    for (var i = 0; i < N; i++) {
      var s = 0;
      for (var j = 0; j < d; j++) { var x = gauss(); s += x * x; }
      norms[i] = Math.sqrt(s);
    }
    var mean = 0;
    for (var i = 0; i < N; i++) mean += norms[i];
    mean /= N;
    var v = 0;
    for (var i = 0; i < N; i++) { var t = norms[i] - mean; v += t * t; }
    v /= N;
    var std = Math.sqrt(v);
    var sqrtD = Math.sqrt(d);
    dDisp.textContent = d;
    sqrtDisp.textContent = sqrtD.toFixed(2);
    meanDisp.textContent = mean.toFixed(2);
    stdDisp.textContent = std.toFixed(2);
    var w = 720, h = 280;
    var padL = 50, padR = 20, padT = 20, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var xMin = 0;
    var xMax = Math.max(sqrtD * 1.45 + 1, 5);
    var nBins = 60;
    var binW = (xMax - xMin) / nBins;
    var bins = new Array(nBins);
    for (var i = 0; i < nBins; i++) bins[i] = 0;
    for (var i = 0; i < N; i++) {
      var b = Math.floor((norms[i] - xMin) / binW);
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
    var sx = xPx(sqrtD);
    s += '<line x1="' + sx.toFixed(1) + '" y1="' + padT + '" x2="' + sx.toFixed(1) + '" y2="' + (h - padB) + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 3"/>';
    s += '<text x="' + (sx + 6).toFixed(1) + '" y="' + (padT + 14) + '" font-size="11" font-style="italic" fill="#dc2626">√d</text>';
    var step = xMax > 12 ? 2 : 1;
    for (var t = 0; t <= xMax; t += step) {
      var tx = xPx(t);
      s += '<line x1="' + tx + '" y1="' + (h - padB) + '" x2="' + tx + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + tx + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.7">' + t + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75">‖X‖</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" fill-opacity="0.75" transform="rotate(-90 14 ' + (h / 2) + ')">count</text>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

## The numbers

If $X \sim \mathcal{N}(0, I_d)$, then $\|X\|^2 = X_1^2 + X_2^2 + \cdots + X_d^2$ is a sum of $d$ independent squared standard normals, which is by definition a [chi-squared distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution) with $d$ degrees of freedom. Its mean and variance are

$$
\mathbb{E}[\|X\|^2] = d, \qquad \mathrm{Var}(\|X\|^2) = 2d.
$$

To go from $\|X\|^2$ to $\|X\|$, take a square root. The [delta method](https://en.wikipedia.org/wiki/Delta_method) (a Taylor-expansion shortcut: for a smooth function $g$, $\mathrm{Var}(g(Z)) \approx g'(\mathbb{E}[Z])^2 \cdot \mathrm{Var}(Z)$) applied to $g(z) = \sqrt{z}$ gives

$$
\mathrm{Var}(\|X\|) \;\approx\; \frac{\mathrm{Var}(\|X\|^2)}{4\,\mathbb{E}[\|X\|^2]} \;=\; \frac{2d}{4d} \;=\; \frac{1}{2},
$$

and so

$$
\mathbb{E}[\|X\|] \approx \sqrt{d}, \qquad \mathrm{std}(\|X\|) \approx \frac{1}{\sqrt{2}} \approx 0.707
$$

for any $d$. The standard deviation is *constant* in $d$. The mean grows as $\sqrt{d}$. So the relative spread

$$
\frac{\mathrm{std}(\|X\|)}{\mathbb{E}[\|X\|]} \;\approx\; \frac{1}{\sqrt{2d}}
$$

tends to zero. The shell width stays around $0.7$ as $d$ grows; the shell radius marches outward. In $d = 100$, the shell is at radius $\sim 10$ with thickness $\sim 0.7$. In $d = 10{,}000$, radius $\sim 100$ with thickness still $\sim 0.7$.

For sufficiently large $d$, a Gaussian sample is essentially uniformly distributed on the sphere of radius $\sqrt{d}$.

## What does this mean?

The mode of the joint density is the origin. The mode of the radial density is $\sqrt{d}$. Both facts are correct simultaneously. The lesson:

> In high dimensions, density is not the right intuition. Mass is.

A point at the origin has the maximum density, but the volume of a small ball around it is tiny. A point on the $\sqrt{d}$ shell has exponentially smaller density, but the surface area at that radius is exponentially huge. The product wins for the shell.

## Implications

A few non-trivial consequences:

1. **Generative models.** Models that map noise $\mathcal{N}(0, I_d)$ to data (GANs, VAEs, diffusion models) learn how to take samples on the input shell at $\sqrt{d}$ and place them somewhere meaningful. Decoding from a sample near the origin is asking the network to handle a region it almost never saw during training.
2. **Sampling and MCMC.** A lot of inference algorithms have to **find the typical set** of the target distribution, which lives on a thin shell. Algorithms that wander far from the shell waste samples on regions with negligible mass.
3. **Random projections.** A uniformly random unit vector in $\mathbb{R}^d$ projected onto a single axis gives a value with std $\sim 1/\sqrt{d}$. High-dim spheres **look Gaussian** in low-dim projections, which connects this story back to the [central limit theorem](/blog/why-sums-become-gaussian).
4. **[Concentration of measure](https://en.wikipedia.org/wiki/Concentration_of_measure).** The Gaussian shell is one face of a much more general fact: in high dimensions, Lipschitz functions of independent variables concentrate sharply around their median. Lévy's lemma on the sphere is the same idea in spherical clothing.

## Why this gets missed

The 1D bell curve is so canonical that it overwrites our intuition for higher dimensions. Even researchers in high-dimensional probability slip into **mass near the mean** thinking when working informally. The right picture: in $d$ dimensions, a typical Gaussian sample is at distance $\sqrt{d}$ from the mean. The mean itself is essentially never sampled.

## References

- Roman Vershynin. *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. Chapter 3.
- Avrim Blum, John Hopcroft, Ravi Kannan. *Foundations of Data Science*. Cambridge University Press, 2020. Chapter 2.
- Michel Talagrand. *Concentration of Measure and Isoperimetric Inequalities in Product Spaces*. Publications mathématiques de l'IHÉS, 1995.
