---
author: Aseem Raj Baranwal
pubDatetime: 2026-04-11T15:22:00Z
title: Why hypercubes look spiky
slug: why-hypercubes-look-spiky
featured: false
draft: false
tags:
  - mathematics
description:
  "Counting the corners of an n-cube by Hamming weight gives a binomial distribution; plotted as a cross-section, it recovers the spiky cube of the textbooks."
---

If you've flipped through a textbook on high-dimensional probability or geometry, you've seen the obligatory drawing of an $n$-dimensional cube. It is usually rendered as a strange spiky object: a sea urchin, a thorny diamond, a star with way too many points. Why does the high-dimensional cube get drawn like that?

Some of it is [**concentration of measure**](https://en.wikipedia.org/wiki/Concentration_of_measure) (the phenomenon where, in high dimensions, almost all of a set's mass sits in a thin shell rather than being spread out), but there is a much simpler counting argument behind a particular family of these drawings. It is just the binomial coefficient in disguise.

## Counting corners

The unit cube in $n$ dimensions is the set $[0,1]^n$. Its **corners** are the points where every coordinate is either $0$ or $1$. There are exactly $2^n$ of them.

- $n = 1$: $2$ corners, namely $(0)$ and $(1)$.
- $n = 2$: $4$ corners, namely $(0,0), (0,1), (1,0), (1,1)$. The unit square.
- $n = 3$: $8$ corners. The familiar 3D cube.
- $n = 10$: $1{,}024$ corners.
- $n = 30$: just over a billion.

Now group the corners by **Hamming weight**, the number of coordinates equal to $1$. Define

$$
C_\ell \;=\; \#\{\text{corners with $\ell$ $1$s and $n - \ell$ $0$s}\}.
$$

How many such corners are there? You're picking which $\ell$ of the $n$ slots get the $1$, so

$$
C_\ell \;=\; \binom{n}{\ell}.
$$

That is the point: the level distribution of cube corners is exactly the binomial coefficient.

## What does $\binom{n}{\ell}$ look like?

A bell. Peaked at $\ell = n/2$, symmetric around it, with $C_0 = C_n = 1$ at the extremes and $C_{\lfloor n/2 \rfloor} \approx 2^n / \sqrt{\pi n / 2}$ in the middle.

For large $n$, the [de Moivre–Laplace theorem](https://en.wikipedia.org/wiki/De_Moivre%E2%80%93Laplace_theorem) (a classical, pre-CLT special case of the central limit theorem) gives

$$
\binom{n}{\ell} \;\approx\; \frac{2^n}{\sqrt{\pi n / 2}} \exp\!\left(-\frac{2(\ell - n/2)^2}{n}\right).
$$

In other words, the count of corners at level $\ell$, viewed as a function of $\ell$, converges to a Gaussian with mean $n/2$ and variance $n/4$, exactly the mean and variance of $n$ independent fair coin flips.

## Drawing the cube

Now suppose we draw the cube on a 2D page. One natural convention: stack the levels vertically and draw each level as a horizontal band whose **width** is proportional to $C_\ell$.

For small $n$ this is a chunky diamond. For large $n$ it is a vertical bell curve, narrow at the top and bottom (only one corner each, at $\ell = 0$ and $\ell = n$) and bulging in the middle. The ratio between the middle width and the tip width is $\binom{n}{\lfloor n/2 \rfloor}$, which is roughly $2^n / \sqrt{n}$, exponentially huge.

Slide $n$ and watch the chunky diamond at $n = 4$ sharpen into a needle-tipped spindle:

<div class="hc-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">dimension <em>n</em><input type="range" id="hc-slider" min="2" max="100" value="3" style="flex: 1;"></label><span><em>n</em> = <strong id="hc-n">3</strong></span><span>2<sup><em>n</em></sup> corners = <strong id="hc-total">8</strong></span><span>peak <em>C</em><sub>⌊<em>n</em>/2⌋</sub> = <strong id="hc-max">3</strong></span></div><div style="display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 1rem; align-items: center;"><svg id="hc-bars" viewBox="0 0 420 280" style="width: 100%; height: auto;" aria-label="Bar chart of binomial coefficients C(n, l) versus level l."></svg><svg id="hc-silhouette" viewBox="0 0 220 280" style="width: 100%; height: auto;" aria-label="Vertical silhouette of the n-cube cross-section. Width at level l is proportional to C(n, l)."></svg></div></div>
<script>
(function () {
  var slider = document.getElementById('hc-slider');
  if (!slider) return;
  var ndisp = document.getElementById('hc-n');
  var tdisp = document.getElementById('hc-total');
  var mdisp = document.getElementById('hc-max');
  var bars = document.getElementById('hc-bars');
  var sil = document.getElementById('hc-silhouette');
  function pascal(n) {
    var row = [1];
    for (var i = 1; i <= n; i++) row.push(row[i - 1] * (n - i + 1) / i);
    return row;
  }
  function fmt(x) {
    if (x < 1e5) return Math.round(x).toLocaleString('en-US');
    var parts = x.toExponential(2).split('e');
    return parts[0] + ' × 10<sup>' + parseInt(parts[1], 10) + '</sup>';
  }
  function update() {
    var n = parseInt(slider.value, 10);
    var row = pascal(n);
    var maxC = Math.max.apply(null, row);
    var total = Math.pow(2, n);
    ndisp.textContent = n;
    tdisp.innerHTML = fmt(total);
    mdisp.innerHTML = fmt(maxC);
    var w = 420, h = 280;
    var padL = 32, padR = 10, padT = 18, padB = 32;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var barStep = plotW / (n + 1);
    var barW = barStep * 0.86;
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var l = 0; l <= n; l++) {
      var bh = (row[l] / maxC) * plotH;
      var bx = padL + l * barStep + (barStep - barW) / 2;
      var by = (h - padB) - bh;
      var isPeak = row[l] === maxC;
      s += '<rect x="' + bx.toFixed(2) + '" y="' + by.toFixed(2) + '" width="' + barW.toFixed(2) + '" height="' + bh.toFixed(2) + '" fill="' + (isPeak ? '#dc2626' : '#2563eb') + '" fill-opacity="0.75"/>';
    }
    s += '<text x="' + (padL + (n / 2 + 0.5) * barStep).toFixed(1) + '" y="' + (padT - 5) + '" text-anchor="middle" font-size="10" fill="#dc2626">peak at ℓ = n/2</text>';
    s += '<text x="' + (w / 2) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">level ℓ (number of 1s)</text>';
    s += '<text x="14" y="' + (h / 2) + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor" transform="rotate(-90 14 ' + (h / 2) + ')">C(n,ℓ)</text>';
    bars.innerHTML = s;
    var sw = 220, sh = 280;
    var padTS = 14, padBS = 14;
    var cx = sw / 2;
    var halfMax = (sw - 24) / 2;
    var innerH = sh - padTS - padBS;
    var left = [];
    var right = [];
    for (var k = 0; k <= n; k++) {
      var yy = padTS + (k / n) * innerH;
      if (k === 0 || k === n) {
        left.push([cx.toFixed(2), yy.toFixed(2)]);
        right.push([cx.toFixed(2), yy.toFixed(2)]);
      } else {
        var halfW = (row[k] / maxC) * halfMax;
        left.push([(cx - halfW).toFixed(2), yy.toFixed(2)]);
        right.push([(cx + halfW).toFixed(2), yy.toFixed(2)]);
      }
    }
    var pts = left.concat(right.reverse()).map(function (p) { return p.join(','); }).join(' ');
    var ss = '';
    ss += '<polygon points="' + pts + '" fill="#2563eb" fill-opacity="0.22" stroke="#2563eb" stroke-width="1.5"/>';
    ss += '<text x="' + cx + '" y="9" text-anchor="middle" font-size="10" font-style="italic" fill="currentColor">ℓ = 0</text>';
    ss += '<text x="' + cx + '" y="' + (sh - 2) + '" text-anchor="middle" font-size="10" font-style="italic" fill="currentColor">ℓ = ' + n + '</text>';
    sil.innerHTML = ss;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

That's the spike. The drawing has sharp points at the top and bottom because there is exactly *one* corner at each end, and a dramatic bulge in the middle because the binomial is dramatic about its peak. As $n$ grows, the tips become invisibly thin while the middle balloons out.

The small-$n$ end of the slider gives something more familiar. At $n = 2$ the levels have widths $1, 2, 1$, so the silhouette is a diamond. At $n = 3$ the widths are $1, 3, 3, 1$, giving a hexagonal outline that looks like the way we usually sketch a 3D cube on paper. The spiky cross-section is built the same way; it only starts to *look* spiky once the binomial peak pulls far away from the tips.

A few observations follow immediately:

- **Almost all corners have roughly $n/2$ ones.** Since the standard deviation is $\sqrt{n}/2$, a deviation of $t\sqrt{n}$ is $2t$ standard deviations, so the fraction of corners with $|\ell - n/2| > t \sqrt{n}$ falls off Gaussian-fast in $t$.
- **The *tips* are vanishingly rare.** Out of $2^n$ corners, only two (the all-zero and the all-one) sit at the extreme levels. They are the spike points that give the drawing its name.
- **Two random corners are typically at Hamming distance $\approx n/2$**: they disagree in each coordinate independently with probability $1/2$, so the number of disagreements is again binomial.

## References

Versions of the spiky-cube drawing appear all over high-dimensional probability and data-science texts. A few good places to look:

- Roman Vershynin, *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. The first few chapters set up exactly this geometric picture before deploying it for concentration inequalities.
- Avrim Blum, John Hopcroft, Ravindran Kannan, *Foundations of Data Science*. Cambridge University Press, 2020. Chapter 2 is a friendly tour of the geometry of high dimensions; available freely on the authors' webpages.
- Stéphane Boucheron, Gábor Lugosi, Pascal Massart, *Concentration Inequalities: A Nonasymptotic Theory of Independence*. Oxford University Press, 2013.

The drawings vary author to author, but the underlying combinatorics is always the same: corners count as a binomial, and a binomial peaks sharply.
