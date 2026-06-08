---
author: Aseem Baranwal
pubDatetime: 2026-06-07T18:30:00Z
title: The Hanson–Wright inequality
slug: hanson-wright-inequality
featured: false
draft: false
tags:
  - mathematics
  - machine learning
description:
  "A quadratic form in independent random variables concentrates around its mean, the trace of the matrix. Hanson–Wright pins down the two-sided tail: a Gaussian regime near the mean set by the Frobenius norm, crossing over to a heavier exponential tail set by the operator norm. For Gaussian inputs it all follows from rotating to the eigenbasis and applying Bernstein."
---

A **quadratic form** is the expression $X^\top A X = \sum_{i,j} A_{ij} X_i X_j$ for a fixed $n \times n$ matrix $A$ and a random vector $X = (X_1, \dots, X_n)$ with independent, mean-zero entries. The squared length $\|X\|^2$ is the case $A = I$, a sample variance is a quadratic form, and so is the energy $\|M x\|^2 = x^\top (M^\top M) x$ that a fixed linear map $M$ measures. The question is how tightly $X^\top A X$ concentrates around its mean. The **Hanson–Wright inequality** is the standard answer, and the answer is not a single Gaussian tail but two regimes.

## The mean is the trace

Take the entries to be independent with mean zero and variance $1$. Then $\mathbb{E}[X_i X_j] = \delta_{ij}$, equal to $1$ when $i = j$ and $0$ otherwise, so only the diagonal of $A$ survives the expectation:

$$
\mathbb{E}[X^\top A X] = \sum_{i,j} A_{ij}\,\mathbb{E}[X_i X_j] = \sum_i A_{ii} = \operatorname{tr}(A).
$$

So $X^\top A X$ fluctuates around $\operatorname{tr}(A)$.

## The Gaussian case, by rotating to the eigenbasis

Take $X \sim \mathcal{N}(0, I_n)$ and $A$ symmetric. (Any quadratic form sees only the symmetric part $\tfrac{1}{2}(A + A^\top)$, since $x^\top A x = x^\top A^\top x$, so assuming symmetry loses nothing.) Diagonalize $A = Q \Lambda Q^\top$ with orthonormal $Q$ and eigenvalues $\lambda_1, \dots, \lambda_n$. The rotated vector $g = Q^\top X$ is again standard Gaussian, since the standard Gaussian is rotation invariant, and in these coordinates the quadratic form is a plain weighted sum of squares:

$$
X^\top A X = g^\top \Lambda g = \sum_{i=1}^{n} \lambda_i\, g_i^2, \qquad g_i \overset{\text{iid}}{\sim} \mathcal{N}(0,1).
$$

Subtracting the mean $\operatorname{tr}(A) = \sum_i \lambda_i$,

$$
X^\top A X - \operatorname{tr}(A) = \sum_{i=1}^{n} \lambda_i\,(g_i^2 - 1),
$$

a sum of independent terms, one per eigenvalue.

Each term $g_i^2 - 1$ is a centered chi-square with one degree of freedom. It is **sub-exponential**, meaning its tail decays like $e^{-t/2}$ rather than a Gaussian's $e^{-t^2/2}$, because squaring a Gaussian fattens the tail. Its moment generating function is

$$
\mathbb{E}\,e^{s(g_i^2 - 1)} = \frac{e^{-s}}{\sqrt{1 - 2s}} \;\le\; e^{2 s^2} \qquad \text{for } |s| \le \tfrac{1}{4}.
$$

Scaling the $i$-th term by $\lambda_i$ and using independence, the cumulant generating function of the whole sum is at most

$$
\ln \mathbb{E}\, e^{\,s \sum_i \lambda_i (g_i^2 - 1)} = \sum_i \ln \mathbb{E}\, e^{\,s \lambda_i (g_i^2 - 1)} \;\le\; 2 s^2 \sum_i \lambda_i^2 = 2 s^2\, \|A\|_F^2,
\qquad |s| \le \frac{1}{4\|A\|},
$$

where $\|A\|_F^2 = \sum_i \lambda_i^2$ is the squared **Frobenius norm** and the band $|s| \le \tfrac{1}{4\|A\|}$ comes from needing $|s\lambda_i| \le \tfrac{1}{4}$ for every $i$, with $\|A\| = \max_i |\lambda_i|$ the **operator norm** (the largest singular value).

This is the cumulant bound of a Bernstein-type variable: a Gaussian-like $s^2$ term, but valid only inside a band whose width is set by $\|A\|$. Optimizing the Chernoff bound $\Pr[S \ge t] \le \exp(-st + 2 s^2 \|A\|_F^2)$ over $s$ in that band gives the two regimes. For small $t$ the optimal $s$ stays inside the band and the bound is Gaussian; for large $t$ the optimum is pinned at the edge $s = \tfrac{1}{4\|A\|}$ and the bound is exponential. Together,

$$
\Pr\big[\,|X^\top A X - \operatorname{tr}(A)| \ge t\,\big] \;\le\; 2\exp\!\left(-\frac{1}{8}\min\!\left(\frac{t^2}{\|A\|_F^2},\; \frac{t}{\|A\|}\right)\right).
$$

That is the Hanson–Wright inequality for Gaussian inputs.

For $A = I$, $X^\top A X = \|X\|^2$, the mean is $\operatorname{tr}(I) = n$, and the norms are $\|I\|_F^2 = n$ and $\|I\| = 1$, so

$$
\Pr\big[\,\big|\,\|X\|^2 - n\,\big| \ge t\,\big] \;\le\; 2\exp\!\left(-\tfrac{1}{8}\min(t^2/n,\; t)\right).
$$

Fluctuations of size $t \lesssim n$ are Gaussian; past $t \approx n$ the tail turns exponential. This is the concentration of $\|X\|^2$ behind the thin shell in [high-dimensional Gaussians](/blog/high-dimensional-gaussians-on-a-sphere): the squared length sits at $n$ with fluctuations of order $\sqrt{n}$, so the length sits at $\sqrt{n}$ with fluctuations of order $1$.

## Two norms, two regimes

The **Frobenius norm** $\|A\|_F^2 = \sum_i \lambda_i^2$ is the total variance: $\operatorname{Var}(X^\top A X) = 2\sum_i \lambda_i^2 = 2\|A\|_F^2$ for Gaussian $X$. It sets the Gaussian regime near the mean, where the fluctuation is an average over all $n$ eigenvalue-terms and the central-limit effect applies.

The **operator norm** $\|A\| = \max_i |\lambda_i|$ is the single largest weight. The heaviest-tailed term in $\sum_i \lambda_i (g_i^2 - 1)$ is the one with the biggest $|\lambda_i|$, and it alone carries a sub-exponential tail $e^{-t/(\text{const} \cdot \|A\|)}$ that no averaging removes. It sets the far tail.

The crossover between the two sits at $t^\star = \|A\|_F^2 / \|A\|$. Below it the form looks Gaussian; above it a single dominant direction takes over and the tail is exponential. The curve below is the rate $\min(t^2/\|A\|_F^2,\; t/\|A\|)$ that sits in the exponent: the larger the rate, the smaller the tail. The parabola governs small deviations, the line governs large ones, and they switch at $t^\star$. Slide the two norms and watch the crossover move.

<div class="hw-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 200px;">‖<em>A</em>‖<sub>F</sub><input type="range" id="hw-fro" min="3" max="10" step="0.1" value="5" style="flex: 1;"></label><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 200px;">‖<em>A</em>‖<input type="range" id="hw-op" min="1" max="4" step="0.05" value="2" style="flex: 1;"></label><span>‖<em>A</em>‖<sub>F</sub> = <strong id="hw-fro-val">5.0</strong></span><span>‖<em>A</em>‖ = <strong id="hw-op-val">2.00</strong></span><span>crossover <em>t</em><sup>★</sup> = <strong id="hw-tstar">12.5</strong></span></div><svg id="hw-svg" viewBox="0 0 720 320" style="width: 100%; height: auto;" aria-label="On fixed axes, the rate min of t squared over Frobenius norm squared and t over operator norm, as a function of the deviation t. A parabola governs small t (Gaussian regime), a line governs large t (exponential regime), and the crossover moves as the norms change."></svg></div>
<script>
(function () {
  var froIn = document.getElementById('hw-fro');
  if (!froIn) return;
  var opIn = document.getElementById('hw-op');
  var froDisp = document.getElementById('hw-fro-val');
  var opDisp = document.getElementById('hw-op-val');
  var tstarDisp = document.getElementById('hw-tstar');
  var svg = document.getElementById('hw-svg');
  var w = 720, h = 320, padL = 44, padR = 18, padT = 30, padB = 42;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  var POS = '#2563eb', SUBG = '#16a34a', EXP = '#dc2626';
  var tMax = 50, yMax = 12;
  function xPx(t) { return padL + t / tMax * plotW; }
  function yPx(y) { return (h - padB) - Math.min(y, yMax) / yMax * plotH; }
  function update() {
    var F = parseFloat(froIn.value);
    var op = Math.min(parseFloat(opIn.value), F);
    var F2 = F * F;
    var tStar = F2 / op;
    var hCross = F2 / (op * op);
    froDisp.textContent = F.toFixed(1);
    opDisp.textContent = op.toFixed(2);
    tstarDisp.textContent = tStar.toFixed(1);
    var xs = xPx(Math.max(0, Math.min(tStar, tMax)));
    var s = '';
    s += '<rect x="' + padL + '" y="' + padT + '" width="' + (xs - padL).toFixed(1) + '" height="' + plotH + '" fill="' + SUBG + '" fill-opacity="0.07"/>';
    s += '<rect x="' + xs.toFixed(1) + '" y="' + padT + '" width="' + (w - padR - xs).toFixed(1) + '" height="' + plotH + '" fill="' + EXP + '" fill-opacity="0.07"/>';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    for (var tv = 0; tv <= tMax; tv += 10) {
      var pxv = xPx(tv);
      s += '<line x1="' + pxv.toFixed(1) + '" y1="' + (h - padB) + '" x2="' + pxv.toFixed(1) + '" y2="' + (h - padB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + pxv.toFixed(1) + '" y="' + (h - padB + 17) + '" text-anchor="middle" font-size="11" fill="currentColor">' + tv + '</text>';
    }
    for (var yv = 0; yv <= yMax; yv += 4) {
      var pyv = yPx(yv);
      s += '<line x1="' + (padL - 4) + '" y1="' + pyv.toFixed(1) + '" x2="' + padL + '" y2="' + pyv.toFixed(1) + '" stroke="currentColor" stroke-opacity="0.4"/>';
      s += '<text x="' + (padL - 7) + '" y="' + (pyv + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="currentColor">' + yv + '</text>';
    }
    var steps = 240;
    function curve(fn, color, width, dash) {
      var p = '';
      for (var i = 0; i <= steps; i++) {
        var t = tMax * i / steps;
        p += (i === 0 ? 'M' : 'L') + xPx(t).toFixed(1) + ',' + yPx(fn(t)).toFixed(1) + ' ';
      }
      return '<path d="' + p + '" stroke="' + color + '" stroke-width="' + width + '" fill="none"' + (dash ? ' stroke-dasharray="' + dash + '" stroke-opacity="0.6"' : '') + '/>';
    }
    s += curve(function (t) { return t * t / F2; }, SUBG, 1.4, '4 3');
    s += curve(function (t) { return t / op; }, EXP, 1.4, '4 3');
    s += curve(function (t) { return Math.min(t * t / F2, t / op); }, POS, 2.4, null);
    if (tStar <= tMax && hCross <= yMax) {
      s += '<line x1="' + xs.toFixed(1) + '" y1="' + padT + '" x2="' + xs.toFixed(1) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="2 3"/>';
      s += '<circle cx="' + xs.toFixed(1) + '" cy="' + yPx(hCross).toFixed(1) + '" r="3.5" fill="currentColor"/>';
      s += '<text x="' + xs.toFixed(1) + '" y="' + (padT - 8) + '" text-anchor="middle" font-size="11" fill="currentColor"><tspan font-style="italic">t</tspan><tspan baseline-shift="super" font-size="8">★</tspan></text>';
    }
    s += '<text x="' + (padL + 8) + '" y="' + (padT + 14) + '" font-size="11" fill="' + SUBG + '">Gaussian: <tspan font-style="italic">t</tspan>²/‖A‖<tspan baseline-shift="sub" font-size="8">F</tspan><tspan baseline-shift="super" font-size="8">2</tspan></text>';
    s += '<text x="' + (w - padR - 8) + '" y="' + (padT + 14) + '" text-anchor="end" font-size="11" fill="' + EXP + '">exponential: <tspan font-style="italic">t</tspan>/‖A‖</text>';
    s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">deviation t</text>';
    s += '<text x="13" y="' + (h / 2) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" transform="rotate(-90 13 ' + (h / 2) + ')">rate in the exponent</text>';
    svg.innerHTML = s;
  }
  froIn.addEventListener('input', update);
  opIn.addEventListener('input', update);
  update();
})();
</script>

What decides which regime matters in practice is the shape of the spectrum. Below, the bars are the eigenvalues $\lambda_i$, normalized so the largest is $\|A\| = 1$. The slider tilts the spectrum from flat, where every direction counts equally, like $A = I$, to spiky, where one direction dominates. A flat spectrum pushes the crossover $t^\star$ far out, so the form is Gaussian over a wide range; a spiky spectrum pulls it in, so the exponential tail takes over early. The ratio $\|A\|_F^2 / \|A\|^2$ that sets the crossover (in units of $\|A\|$) is the **stable rank**, an effective count of active directions.

<div class="hw2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 240px;">spectrum<input type="range" id="hw2-rho" min="0.5" max="1" step="0.01" value="0.85" style="flex: 1;"></label><span>‖<em>A</em>‖<sub>F</sub><sup>2</sup> = <strong id="hw2-fro">3.58</strong></span><span>‖<em>A</em>‖ = <strong>1</strong></span><span>stable rank = <strong id="hw2-sr">3.6</strong></span><span><em>t</em><sup>★</sup> = <strong id="hw2-tstar">3.6</strong></span></div><svg id="hw2-svg" viewBox="0 0 720 240" style="width: 100%; height: auto;" aria-label="Bar chart of the eigenvalues of A, normalized so the largest is 1, from spiky to flat."></svg></div>
<script>
(function () {
  var slider = document.getElementById('hw2-rho');
  if (!slider) return;
  var froDisp = document.getElementById('hw2-fro');
  var srDisp = document.getElementById('hw2-sr');
  var tstarDisp = document.getElementById('hw2-tstar');
  var svg = document.getElementById('hw2-svg');
  var n = 16, w = 720, h = 240, padL = 44, padR = 18, padT = 18, padB = 40;
  var plotW = w - padL - padR, plotH = h - padT - padB;
  function update() {
    var rho = parseFloat(slider.value);
    var lam = [];
    for (var i = 0; i < n; i++) lam.push(Math.pow(rho, i));
    var F2 = 0;
    for (var j = 0; j < n; j++) F2 += lam[j] * lam[j];
    var op = 1;
    froDisp.textContent = F2.toFixed(2);
    srDisp.textContent = (F2 / (op * op)).toFixed(1);
    tstarDisp.textContent = (F2 / op).toFixed(1);
    var barStep = plotW / n, barW = barStep * 0.7;
    var s = '';
    s += '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>';
    s += '<text x="' + (padL - 6) + '" y="' + (padT + 6) + '" text-anchor="end" font-size="11" fill="currentColor">1</text>';
    s += '<text x="' + (padL - 6) + '" y="' + (h - padB) + '" text-anchor="end" font-size="11" fill="currentColor">0</text>';
    for (var k = 0; k < n; k++) {
      var bh = lam[k] * plotH;
      var bx = padL + k * barStep + (barStep - barW) / 2;
      var by = (h - padB) - bh;
      var isMax = (k === 0);
      s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="#2563eb" fill-opacity="' + (isMax ? '0.95' : '0.6') + '"/>';
    }
    var bx0 = padL + (barStep - barW) / 2 + barW / 2;
    s += '<text x="' + bx0.toFixed(1) + '" y="' + (padT - 4) + '" text-anchor="middle" font-size="11" fill="#2563eb">‖A‖</text>';
    s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">eigenvalues λ₁ ≥ λ₂ ≥ … (largest normalized to 1)</text>';
    svg.innerHTML = s;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

## The general theorem

For general independent entries the rotation that handled the Gaussian case is not available: only the Gaussian is rotation invariant, so for any other distribution the rotated coordinates $Q^\top X$, while still sub-Gaussian, are no longer independent, and the clean weighted sum of squares falls apart. The inequality holds anyway. For a random vector with independent, mean-zero, sub-Gaussian entries of sub-Gaussian norm at most $K$ (the scale on which the entries' own tails decay like $e^{-x^2/K^2}$),

$$
\Pr\big[\,|X^\top A X - \mathbb{E}\,X^\top A X| \ge t\,\big] \;\le\; 2\exp\!\left(-c\min\!\left(\frac{t^2}{K^4\|A\|_F^2},\; \frac{t}{K^2\|A\|}\right)\right),
$$

the same two-regime shape, with $K$ tracking how heavy the entries are.

The general proof splits the form along its diagonal,

$$
X^\top A X = \underbrace{\sum_i A_{ii} X_i^2}_{\text{diagonal}} + \underbrace{\sum_{i \ne j} A_{ij} X_i X_j}_{\text{off-diagonal}}.
$$

The diagonal part is a sum of independent variables $A_{ii} X_i^2$; it carries the mean $\operatorname{tr}(A)$ and concentrates by Bernstein's inequality (the same sub-exponential bound used above, now for a sum rather than after a rotation), no harder than the Gaussian case. The off-diagonal part has mean zero and is the real content of the theorem. Its terms $X_i X_j$ share variables, so they are not independent, and the standard handle is **decoupling**: replace one copy of $X$ by an independent copy $X'$, so that conditionally on $X'$ the off-diagonal sum $\sum_{i\ne j} A_{ij} X_i X_j'$ is a linear form in the independent variables $X_i$, which sub-Gaussian tools control directly. Carrying that through reproduces the same two norms.

## Where it gets used

The inequality is a standard tool wherever a squared length or an energy has to be pinned to its mean.

- **Length and distance concentration.** $\|X\|^2$ around $n$ is the case $A = I$. More generally $\|Mx\|^2 = x^\top(M^\top M)x$ concentrates around its mean for a fixed map $M$, which is how one shows random features or embeddings preserve magnitudes.
- **Random projections.** Projecting a fixed vector with a random matrix preserves its length up to a factor $1 \pm \varepsilon$. The fluctuation of $\|\Pi x\|^2$ is a quadratic form, and Hanson–Wright supplies the failure probability that feeds the [Johnson–Lindenstrauss](https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma) lemma.
- **Covariance estimation.** Controlling $x^\top(\hat\Sigma - \Sigma)x$, the error of a sample covariance in a fixed direction, is a quadratic form in the data.
- **As a lemma.** It is the usual way to show $x^\top A x$ is close to its mean for one $x$, then combined with the [ε-net argument](/blog/epsilon-nets-on-the-sphere) to make the statement hold uniformly over the whole sphere of directions.

## References

- David L. Hanson, Farroll T. Wright. *A bound on tail probabilities for quadratic forms in independent random variables*. The Annals of Mathematical Statistics, 42(3):1079–1083, 1971. The original.
- Mark Rudelson, Roman Vershynin. *Hanson-Wright inequality and sub-gaussian concentration*. Electronic Communications in Probability, 18, no. 82, 1–9, 2013. The modern statement with the two norms and a clean proof by decoupling.
- Roman Vershynin. *High-Dimensional Probability: An Introduction with Applications in Data Science*. Cambridge University Press, 2018. Chapter 6 states and proves the inequality; the sub-exponential and Bernstein bounds it rests on are developed in Chapter 2.
- Stéphane Boucheron, Gábor Lugosi, Pascal Massart. *Concentration Inequalities: A Nonasymptotic Theory of Independence*. Oxford University Press, 2013. Background on sub-gamma variables and the Bernstein bound behind the two regimes.
