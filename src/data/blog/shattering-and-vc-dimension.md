---
author: Aseem Raj Baranwal
pubDatetime: 2026-06-09T16:00:00Z
title: Shattering and the VC dimension
slug: shattering-and-vc-dimension
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  "How expressive is a family of yes/no rules? Shattering measures it on a fixed set of points: the class can cut them apart in every conceivable way. The VC dimension is the largest set it can shatter, a single integer. Past that size the number of labelings stops doubling and is trapped under a polynomial, the Sauer-Shelah jump, and that one integer is what makes an infinite class learnable."
---

A classifier is a yes/no rule: feed it a point, it answers $+$ or $-$. A **hypothesis class** $\mathcal{H}$ is a whole family of such rules, for instance all thresholds on the line, all half-planes in the plane, or all axis-aligned boxes. One question governs how well anything learned from such a class will generalize to unseen data: how expressive is $\mathcal{H}$? A class rich enough to reproduce any pattern of labels on the training points has explained nothing about the data, it has only memorized; a class too poor cannot fit the signal at all. The Vapnik–Chervonenkis (VC) dimension is the single integer that measures this richness, and it measures it combinatorially, by counting the labelings a class can produce, with no reference to probability or to the geometry of a particular dataset.

A single integer can carry that weight for the same reason the [ε-net argument](/blog/epsilon-nets-on-the-sphere) works: a union bound does not run over the (usually infinite) class $\mathcal{H}$, it runs over the finitely many distinct behaviors $\mathcal{H}$ exhibits on a fixed sample. The VC dimension is what controls that count.

## Shattering

Fix a finite set of points $x_1, \dots, x_n$. Each rule $h \in \mathcal{H}$ stamps them with a pattern of signs $(h(x_1), \dots, h(x_n)) \in \{+, -\}^n$. There are $2^n$ conceivable patterns. As $h$ ranges over the class, we collect some subset of those $2^n$ patterns, the ones the class can actually produce on these particular points.

> The set $\{x_1, \dots, x_n\}$ is **shattered** by $\mathcal{H}$ if all $2^n$ labelings are produced: for every assignment of $+/-$ to the points, some rule in the class realizes it.

Shattering is the strongest possible expressiveness on a fixed set, the class can split those points apart in every conceivable way, so the labels on them carry no constraint the class is forced to respect.

Take the simplest class, **thresholds on the line**: $h_a(x) = +$ exactly when $x \ge a$, one rule per cutoff $a$. A single point $x_1$ is shattered: a cutoff to its left labels it $+$, a cutoff to its right labels it $-$, and both patterns appear. Now take two points $x_1 < x_2$. A threshold labels everything to the right of its cutoff $+$, so if $x_1$ is labeled $+$ then $x_2$, being larger, is labeled $+$ as well. The pattern $(+, -)$ can never occur. Three of the four patterns appear, but not all four, so no pair of points is shattered by thresholds.

## The VC dimension

> The **VC dimension** of $\mathcal{H}$ is the size of the largest point set it can shatter:
> $$
> \mathrm{VC}(\mathcal{H}) = \max\{\, n : \text{some set of } n \text{ points is shattered by } \mathcal{H} \,\}.
> $$

The quantifiers matter: we need *some* set of $n$ points to be shatterable, not every one. Thresholds shatter one point and no pair, so $\mathrm{VC} = 1$. Walking up a few classes pins down the pattern.

- **Thresholds on $\mathbb{R}$**, $h_a = \mathbf{1}[x \ge a]$: one point shattered, no pair. $\mathrm{VC} = 1$.
- **Intervals on $\mathbb{R}$**, $h_{a,b} = \mathbf{1}[a \le x \le b]$: two points get all four patterns, since an empty interval gives $(-,-)$, a wide one gives $(+,+)$, and a one-sided interval gives each of $(+,-)$ and $(-,+)$. Three points $x_1 < x_2 < x_3$ cannot get $(+, -, +)$, because an interval covering the two ends must cover the middle. $\mathrm{VC} = 2$.
- **Half-planes in $\mathbb{R}^2$** (a straight line with one side labeled $+$): $\mathrm{VC} = 3$, worked out below.
- **Half-spaces in $\mathbb{R}^d$**: $\mathrm{VC} = d + 1$.
- **Axis-aligned rectangles in $\mathbb{R}^2$** (inside the box is $+$): $\mathrm{VC} = 4$.

Take half-planes in $\mathbb{R}^2$. Three points in general position, meaning not collinear, form a triangle, and a line can carve off any subset of its corners: every one of the $2^3 = 8$ labelings has a separating line, so the triangle is shattered. Four points never are. There are two cases. If one point $D$ lies inside the triangle of the other three, then $D$ cannot be split off by itself: any line with $D$ alone on one side would have to leave $A, B, C$ on the other, impossible since $D$ sits in their convex hull (the triangle they span). If instead the four points are in convex position, forming a quadrilateral $ABCD$, then the diagonal labeling that marks $A, C$ as $+$ and $B, D$ as $-$ has its two $+$ points separated along the boundary by the two $-$ points, and no single line splits them. Either way, one labeling escapes every half-plane.

The counting is exact, and the widget below makes it concrete. Click a point to flip its sign; a green line appears whenever the current labeling is one a half-plane can realize. Switch between three and four points and tally how many of the $2^n$ labelings get a line.

<div class="vc-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.5rem 0.9rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.7rem; font-size: 0.95em;"><span>points:</span><button type="button" id="vc-n3" style="font: inherit; color: inherit; background: transparent; border: 1px solid currentColor; border-radius: 5px; padding: 0.15rem 0.6rem; cursor: pointer;">3</button><button type="button" id="vc-n4" style="font: inherit; color: inherit; background: transparent; border: 1px solid currentColor; border-radius: 5px; padding: 0.15rem 0.6rem; cursor: pointer;">4</button><button type="button" id="vc-fail" style="font: inherit; color: inherit; background: transparent; border: 1px solid currentColor; border-radius: 5px; padding: 0.15rem 0.6rem; cursor: pointer;">jump to a labeling with no line</button><button type="button" id="vc-reset" style="font: inherit; color: inherit; background: transparent; border: 1px solid currentColor; border-radius: 5px; padding: 0.15rem 0.6rem; cursor: pointer;">reset</button></div><div style="font-size: 0.9em; margin-bottom: 0.5rem;">Click a point to flip its sign. <strong id="vc-status"></strong></div><svg id="vc-svg" viewBox="0 0 460 360" style="width: 100%; height: auto; max-width: 460px; display: block; margin: 0 auto; overflow: hidden; cursor: pointer;" aria-label="Points in the plane labeled plus or minus, with a separating line drawn when the labeling can be realized by a half-plane."></svg><div style="font-size: 0.9em; margin-top: 0.5rem;">linearly separable labelings: <strong id="vc-count">8</strong> of <strong id="vc-tot">8</strong>. <strong id="vc-verdict"></strong></div></div>
<script>
(function () {
  var svg = document.getElementById('vc-svg');
  if (!svg) return;
  var statusEl = document.getElementById('vc-status');
  var countEl = document.getElementById('vc-count');
  var totEl = document.getElementById('vc-tot');
  var verdictEl = document.getElementById('vc-verdict');
  var POS = '#2563eb', NEG = '#dc2626', LINE = '#16a34a';
  var P3 = [[150, 255], [320, 255], [235, 110]];
  var P4 = [[150, 255], [320, 255], [320, 110], [150, 110]];
  var pts = P3.map(function (p) { return p.slice(); });
  var labels = pts.map(function () { return 1; });
  function findSep(P, lab) {
    var pos = [], neg = [];
    for (var i = 0; i < P.length; i++) { (lab[i] > 0 ? pos : neg).push(P[i]); }
    if (pos.length === 0 || neg.length === 0) return { trivial: true };
    var STEPS = 720, best = null, bestMargin = 1e-6;
    for (var k = 0; k < STEPS; k++) {
      var th = Math.PI * k / STEPS, wx = Math.cos(th), wy = Math.sin(th);
      var maxN = -1e18, minN = 1e18, maxP = -1e18, minP = 1e18;
      for (var a = 0; a < pos.length; a++) { var pp = wx * pos[a][0] + wy * pos[a][1]; if (pp > maxP) maxP = pp; if (pp < minP) minP = pp; }
      for (var b = 0; b < neg.length; b++) { var nn = wx * neg[b][0] + wy * neg[b][1]; if (nn > maxN) maxN = nn; if (nn < minN) minN = nn; }
      // Keep the widest-margin separating direction so the drawn line sits in the
      // middle of the gap rather than grazing a point (the first match can be degenerate).
      if (minP - maxN > bestMargin) { bestMargin = minP - maxN; best = { wx: wx, wy: wy, t: (maxN + minP) / 2 }; }
      if (minN - maxP > bestMargin) { bestMargin = minN - maxP; best = { wx: -wx, wy: -wy, t: -(maxP + minN) / 2 }; }
    }
    return best;
  }
  function countReal() {
    var n = pts.length, c = 0;
    for (var mask = 0; mask < (1 << n); mask++) {
      var lab = [];
      for (var i = 0; i < n; i++) lab.push((mask >> i & 1) ? 1 : -1);
      if (findSep(pts, lab)) c++;
    }
    return c;
  }
  function draw() {
    var res = findSep(pts, labels);
    var s = '';
    if (res && !res.trivial) {
      var x0 = res.t * res.wx, y0 = res.t * res.wy, dx = -res.wy, dy = res.wx, L = 1200;
      s += '<line x1="' + (x0 - L * dx).toFixed(1) + '" y1="' + (y0 - L * dy).toFixed(1) + '" x2="' + (x0 + L * dx).toFixed(1) + '" y2="' + (y0 + L * dy).toFixed(1) + '" stroke="' + LINE + '" stroke-width="2.4"/>';
    }
    for (var i = 0; i < pts.length; i++) {
      var col = labels[i] > 0 ? POS : NEG;
      s += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="14" fill="' + col + '" fill-opacity="0.18" stroke="' + col + '" stroke-width="2"/>';
      s += '<text x="' + pts[i][0] + '" y="' + (pts[i][1] + 6) + '" text-anchor="middle" font-size="18" font-weight="bold" fill="' + col + '">' + (labels[i] > 0 ? '+' : '−') + '</text>';
    }
    svg.innerHTML = s;
    var n = pts.length, tot = 1 << n, real = countReal();
    countEl.textContent = real;
    totEl.textContent = tot;
    if (res) {
      statusEl.textContent = res.trivial ? 'All points on one side, trivially a half-plane.' : 'A line realizes this labeling.';
      statusEl.style.color = '';
    } else {
      statusEl.textContent = 'No half-plane realizes this labeling.';
      statusEl.style.color = NEG;
    }
    if (real === tot) {
      verdictEl.innerHTML = 'All 2<sup>' + n + '</sup> labelings are realizable, so these ' + n + ' points are shattered.';
      verdictEl.style.color = '';
    } else {
      verdictEl.innerHTML = 'Only ' + real + ' of 2<sup>' + n + '</sup> are realizable, so no half-plane shatters ' + n + ' points.';
      verdictEl.style.color = NEG;
    }
  }
  function setN(n) {
    pts = (n === 3 ? P3 : P4).map(function (p) { return p.slice(); });
    labels = pts.map(function () { return 1; });
    draw();
  }
  svg.addEventListener('click', function (e) {
    var r = svg.getBoundingClientRect();
    var mx = (e.clientX - r.left) / r.width * 460;
    var my = (e.clientY - r.top) / r.height * 360;
    var best = -1, bd = 1e9;
    for (var i = 0; i < pts.length; i++) {
      var d = Math.hypot(mx - pts[i][0], my - pts[i][1]);
      if (d < bd) { bd = d; best = i; }
    }
    if (best >= 0 && bd < 26) { labels[best] *= -1; draw(); }
  });
  document.getElementById('vc-n3').addEventListener('click', function () { setN(3); });
  document.getElementById('vc-n4').addEventListener('click', function () { setN(4); });
  document.getElementById('vc-reset').addEventListener('click', function () { labels = pts.map(function () { return 1; }); draw(); });
  document.getElementById('vc-fail').addEventListener('click', function () {
    if (pts.length === 4) { labels = [1, -1, 1, -1]; draw(); }
    else { statusEl.textContent = 'Every labeling of 3 non-collinear points has a line; switch to 4 points.'; statusEl.style.color = ''; }
  });
  draw();
})();
</script>

Three points give $8$ of $8$, the full set, so they are shattered. Four points give at most $14$ of $16$: the two diagonal labelings have no line. So some triple is shattered and no quadruple is, which is exactly $\mathrm{VC}(\text{half-planes}) = 3$. Those counts are not specific to the configuration on screen. For $n$ points in general position, the number of labelings a half-plane in $\mathbb{R}^2$ can realize is exactly $2 \sum_{k=0}^{2} \binom{n-1}{k}$, a result of Cover, and that equals $2^n$ only up to $n = 3$.

## The growth function and the Sauer–Shelah jump

To track expressiveness across all sample sizes at once, define the **growth function**
$$
\Pi_{\mathcal{H}}(n) = \max_{x_1, \dots, x_n} \ \big| \{ (h(x_1), \dots, h(x_n)) : h \in \mathcal{H} \} \big|,
$$
the most labelings the class can produce on any $n$ points. By construction $\Pi_{\mathcal{H}}(n) \le 2^n$, with equality exactly when some $n$-set is shattered. So the VC dimension is the last $n$ at which $\Pi_{\mathcal{H}}(n) = 2^n$.

What happens after that is the structural fact at the center of the theory. Let $d = \mathrm{VC}(\mathcal{H})$. Then for every $n$,
$$
\Pi_{\mathcal{H}}(n) \ \le\ \sum_{i=0}^{d} \binom{n}{i} \ \le\ \Big( \frac{en}{d} \Big)^{d}.
$$
This is the **Sauer–Shelah lemma**. Up to $n = d$ the growth function is $2^n$, doubling with each new point. The moment $n$ passes $d$ it can no longer double, it is trapped under a polynomial of degree $d$. A quantity that grows exponentially up to a threshold and polynomially forever after, with the switch landing exactly at the VC dimension.

Slide $d$ below. The blue line is $2^n$, what shattering would demand; the green curve is the Sauer–Shelah cap. They sit on top of each other until $n = d$, then the cap peels away and falls far below the exponential. The vertical axis is logarithmic, so the straight blue line really is $2^n$ and the bending green curve really is polynomial.

<div class="vc2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 240px;">VC dimension <em>d</em><input type="range" id="vc2-d" min="1" max="8" step="1" value="3" style="flex: 1;"></label><span><em>d</em> = <strong id="vc2-d-val">3</strong></span><span>at <em>n</em> = <strong id="vc2-nmax">22</strong>: 2<sup><em>n</em></sup> = <strong id="vc2-pow">—</strong>, cap = <strong id="vc2-bnd">—</strong></span></div><svg id="vc2-svg" viewBox="0 0 720 360" style="width: 100%; height: auto;" aria-label="Two curves against the number of points n: the exponential 2 to the n that shattering would give, and the Sauer-Shelah polynomial cap. They agree until n equals the VC dimension d, then the cap peels away far below the exponential."></svg></div>
<script>
(function () {
  var slider = document.getElementById('vc2-d');
  if (!slider) return;
  var dVal = document.getElementById('vc2-d-val');
  var nmaxEl = document.getElementById('vc2-nmax');
  var powEl = document.getElementById('vc2-pow');
  var bndEl = document.getElementById('vc2-bnd');
  var svg = document.getElementById('vc2-svg');
  var w = 720, h = 360, padL = 56, padR = 18, padT = 22, padB = 46;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  var Nmax = 22;
  var EXP = '#2563eb', POLY = '#16a34a', MARK = '#dc2626';
  function comb(n, k) { if (k < 0 || k > n) return 0; k = Math.min(k, n - k); var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return r; }
  function bnd(n, d) { var s = 0; for (var i = 0; i <= d; i++) s += comb(n, i); return s; }
  function sup(k) { var map = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }; return String(k).split('').map(function (c) { return map[c]; }).join(''); }
  function fmt(x) { if (x < 1e4) return Math.round(x).toLocaleString('en-US'); var e = Math.floor(Math.log(x) / Math.LN10); var m = x / Math.pow(10, e); return m.toFixed(1) + ' × 10' + sup(e); }
  function xPx(n) { return padL + n / Nmax * plotW; }
  function yPx(v) { return (h - padB) - v / Nmax * plotH; }
  function update() {
    var d = parseInt(slider.value, 10);
    dVal.textContent = d;
    nmaxEl.textContent = Nmax;
    powEl.innerHTML = fmt(Math.pow(2, Nmax));
    bndEl.innerHTML = fmt(bnd(Nmax, d));
    var out = '';
    out += '<rect x="' + xPx(0).toFixed(1) + '" y="' + padT + '" width="' + (xPx(d) - xPx(0)).toFixed(1) + '" height="' + plotH + '" fill="' + POLY + '" fill-opacity="0.08"/>';
    out += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    out += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var nx = 0; nx <= Nmax; nx += 2) {
      var px = xPx(nx);
      out += '<line x1="' + px.toFixed(1) + '" y1="' + (h - padB) + '" x2="' + px.toFixed(1) + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      out += '<text x="' + px.toFixed(1) + '" y="' + (h - padB + 17) + '" text-anchor="middle" font-size="11" fill="currentColor">' + nx + '</text>';
    }
    for (var yv = 0; yv <= Nmax; yv += 4) {
      var py = yPx(yv);
      out += '<line x1="' + (padL - 4) + '" y1="' + py.toFixed(1) + '" x2="' + padL + '" y2="' + py.toFixed(1) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      out += '<text x="' + (padL - 8) + '" y="' + (py + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="currentColor">2' + sup(yv) + '</text>';
    }
    var expPath = '';
    for (var i = 0; i <= Nmax; i++) { expPath += (i === 0 ? 'M' : 'L') + xPx(i).toFixed(1) + ',' + yPx(i).toFixed(1) + ' '; }
    out += '<path d="' + expPath + '" stroke="' + EXP + '" stroke-width="2.2" fill="none"/>';
    var polyPath = '';
    for (var j = 0; j <= Nmax; j++) { var lv = Math.log(bnd(j, d)) / Math.LN2; polyPath += (j === 0 ? 'M' : 'L') + xPx(j).toFixed(1) + ',' + yPx(lv).toFixed(1) + ' '; }
    out += '<path d="' + polyPath + '" stroke="' + POLY + '" stroke-width="2.6" fill="none"/>';
    var xd = xPx(d);
    out += '<line x1="' + xd.toFixed(1) + '" y1="' + padT + '" x2="' + xd.toFixed(1) + '" y2="' + (h - padB) + '" stroke="' + MARK + '" stroke-width="1.3" stroke-dasharray="3 3"/>';
    out += '<circle cx="' + xd.toFixed(1) + '" cy="' + yPx(d).toFixed(1) + '" r="4" fill="' + MARK + '"/>';
    out += '<text x="' + (xd + 6).toFixed(1) + '" y="' + (padT + 14) + '" font-size="12" fill="' + MARK + '"><tspan font-style="italic">n</tspan> = <tspan font-style="italic">d</tspan> = ' + d + '</text>';
    out += '<text x="' + xPx(Nmax * 0.6).toFixed(1) + '" y="' + (yPx(Nmax * 0.6) - 9).toFixed(1) + '" font-size="12" fill="' + EXP + '">2<tspan baseline-shift="super" font-size="9" font-style="italic">n</tspan> (if shattered)</text>';
    var lj = Math.log(bnd(Nmax, d)) / Math.LN2;
    out += '<text x="' + (w - padR - 4) + '" y="' + (yPx(lj) + 17).toFixed(1) + '" text-anchor="end" font-size="12" fill="' + POLY + '">Sauer–Shelah cap</text>';
    out += '<text x="' + (w / 2) + '" y="' + (h - 4) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">number of points n</text>';
    out += '<text x="15" y="' + (h / 2) + '" text-anchor="middle" font-size="12" fill="currentColor" transform="rotate(-90 15 ' + (h / 2) + ')">number of labelings</text>';
    svg.innerHTML = out;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

## How a single integer controls generalization

Suppose we want every rule in $\mathcal{H}$ to have its error on the training sample close to its true error on the full distribution, all rules at once. For one fixed rule this is a law of large numbers statement, with a Hoeffding tail (an exponential bound on how far an average of bounded variables strays from its mean) bounding the gap. For all rules simultaneously we need a union bound, and when $\mathcal{H}$ is infinite, as it is for half-planes or any class with continuous parameters, a union bound over $|\mathcal{H}|$ is vacuous.

Vapnik and Chervonenkis observed that the count that belongs in the union bound is not the number of rules but the number of distinct labelings they produce on the $n$ samples, and that count is the growth function $\Pi_{\mathcal{H}}(n)$, which Sauer–Shelah caps at $(en/d)^d$. Two rules that label the sample identically are indistinguishable on the data, so they should count once. Carrying the polynomial growth function through the union bound gives the VC generalization bound: with probability at least $1 - \delta$, every $h \in \mathcal{H}$ satisfies
$$
\big| \text{true error} - \text{training error} \big| \ \lesssim\ \sqrt{ \frac{d \log(n/d) + \log(1/\delta)}{n} }.
$$
A finite VC dimension $d$ is exactly the condition for the right side to vanish as $n \to \infty$. A class is learnable in this uniform sense precisely when $d < \infty$, and the sample size needed for a target accuracy grows linearly in $d$. The full chain, from "can the class shatter this set?" to "how many samples until it generalizes?", is carried by that one integer.

This is the same move as the [ε-net bound on the operator norm](/blog/epsilon-nets-on-the-sphere): replace an unmanageable supremum over an infinite set by a maximum over a finite, controlled number of cases. There the finite object was a net of directions on the sphere; here it is the growth function of labelings. Infinitude is rarely the real obstacle in high-dimensional probability, the effective count is the thing to bound, and the VC dimension is that count for a class of classifiers.

## References

- V. N. Vapnik and A. Ya. Chervonenkis. *On the uniform convergence of relative frequencies of events to their probabilities*. Theory of Probability and Its Applications, 16(2):264–280, 1971. The origin of the growth function and the dimension that bounds it.
- Norbert Sauer. *On the density of families of sets*. Journal of Combinatorial Theory, Series A, 13(1):145–147, 1972. One of the independent proofs of the exponential-to-polynomial bound.
- Saharon Shelah. *A combinatorial problem; stability and order for models and theories in infinitary languages*. Pacific Journal of Mathematics, 41(1):247–261, 1972. The same combinatorial lemma, discovered independently in model theory.
- Thomas M. Cover. *Geometrical and statistical properties of systems of linear inequalities with applications in pattern recognition*. IEEE Transactions on Electronic Computers, EC-14(3):326–334, 1965. Source of the count $2\sum_{k=0}^{d}\binom{n-1}{k}$ for linearly realizable labelings.
- Shai Shalev-Shwartz and Shai Ben-David. *Understanding Machine Learning: From Theory to Algorithms*. Cambridge University Press, 2014. Chapter 6 develops shattering, VC dimension, and the fundamental theorem of statistical learning.
- Mehryar Mohri, Afshin Rostamizadeh, and Ameet Talwalkar. *Foundations of Machine Learning*, 2nd edition. MIT Press, 2018. Chapter 3 covers the growth function, Sauer's lemma, and VC generalization bounds.
