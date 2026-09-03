---
author: Aseem Raj Baranwal
pubDatetime: 2026-08-30T09:30:00Z
title: The arcsine law
slug: arcsine-law
featured: false
draft: false
tags:
  - statistics
  - mathematics
description:
  "In a fair coin-tossing game the fraction of time one player is ahead is not concentrated near one half. Its exact distribution is u₂ₖ u₂ₙ₋₂ₖ, the limit is the U-shaped arcsine density, and with probability 1/2 one player leads for more than 85% of the game."
---

Two players, A and B, toss a fair coin $2n$ times. Each head is a point for A and each tail a point for B, so A's lead after $k$ tosses, A's points minus B's, is

$$
S_k = X_1 + \cdots + X_k, \qquad X_i = \pm 1 \text{ with probability } \tfrac12 \text{ each,}
$$

a [simple random walk](https://en.wikipedia.org/wiki/Random_walk) started at $0$.

> For what fraction of the game is A ahead?

The players are interchangeable, so the answer is symmetric about one half, and the natural guess is that it also concentrates there: in a fair game the lead should change hands regularly, and each player should be ahead about half the time. The exact distribution does not concentrate there. The fraction of the game spent in the lead is most likely to be near $0$ or near $1$, and one half is its *least* likely value. In the limit of a long game:

- With probability $1/2$, one of the two players is ahead for more than 85.4% of the game.
- With probability $1/5$, one of the two players is ahead for more than 97.6% of the game.
- The probability that the lead is shared anywhere between 45% and 55% is 6.4%.

The limiting density of the fraction is $1/(\pi\sqrt{x(1-x)})$, a U shape with integrable singularities at both ends, and the corresponding distribution function is $\frac{2}{\pi}\arcsin\sqrt{x}$: this is the **arcsine law**. The derivation needs one identity about paths, a product formula that follows from it, and Stirling's approximation.

## Ties are rare

The score is tied at time $2m$ with probability

$$
u_{2m} = \mathbb{P}(S_{2m} = 0) = \binom{2m}{m} 2^{-2m} \;\sim\; \frac{1}{\sqrt{\pi m}},
$$

the asymptotic form coming from [Stirling's formula](https://en.wikipedia.org/wiki/Stirling%27s_approximation); ties at odd times are impossible. The decay is slow: after a million tosses the chance of an exact tie at that moment is still $0.08\%$. Summing over the even times gives the expected number of ties in $2n$ tosses,

$$
\sum_{m=1}^{n} u_{2m} = (2n+1)\,u_{2n} - 1 \;\approx\; 2\sqrt{\frac{n}{\pi}},
$$

where the closed form follows by induction from $u_{2m} = u_{2m+2}\cdot\frac{2m+2}{2m+1}$. A game of 10,000 tosses has about 79 ties on average. The lead can change hands only at a tie, so it changes at most a few dozen times in ten thousand tosses. The U shape also needs the stretches between ties to be heavy-tailed, which the next section quantifies.

## Reflection principle

**Lemma.** The probability that the score is never tied during $2n$ tosses equals the probability that it is tied at the end:

$$
\mathbb{P}(S_1 \neq 0,\, \ldots,\, S_{2n} \neq 0) \;=\; \mathbb{P}(S_{2n} = 0) \;=\; u_{2n}.
$$

The two signs are symmetric, so it suffices to show $\mathbb{P}(S_1 > 0, \ldots, S_{2n} > 0) = \tfrac12 u_{2n}$, which is a count of paths. Write $N_{m,y} = \binom{m}{(m+y)/2}$ for the number of paths of $m$ steps from $0$ to $y$. A path that stays positive begins with an up-step to $(1, 1)$ and then runs from $(1,1)$ to $(2n, y)$ for some even $y > 0$ without touching the axis. Among all $N_{2n-1,\,y-1}$ paths from $(1,1)$ to $(2n,y)$, the ones that do touch the axis are in bijection with the paths from $(1,-1)$ to $(2n,y)$: reflect the initial segment, up to the first visit to $0$, in the axis.

<div style="margin: 1.5rem auto; max-width: 640px; color: var(--foreground);">
<svg viewBox="0 0 640 320" role="img" aria-label="A lattice path from (1, 1) that touches the axis at time 4 and ends at (13, 3), drawn in blue. Its initial segment up to the first visit to zero is reflected in the axis, drawn in red and dashed, giving a path from (1, -1) to the same endpoint." style="width: 100%; height: auto; display: block;">
<line x1="40" y1="200" x2="600" y2="200" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<line x1="40" y1="60" x2="40" y2="290" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<g stroke="currentColor" stroke-opacity="0.25" stroke-width="1">
<line x1="80" y1="196" x2="80" y2="204"/><line x1="120" y1="196" x2="120" y2="204"/><line x1="160" y1="196" x2="160" y2="204"/><line x1="200" y1="196" x2="200" y2="204"/><line x1="240" y1="196" x2="240" y2="204"/><line x1="280" y1="196" x2="280" y2="204"/><line x1="320" y1="196" x2="320" y2="204"/><line x1="360" y1="196" x2="360" y2="204"/><line x1="400" y1="196" x2="400" y2="204"/><line x1="440" y1="196" x2="440" y2="204"/><line x1="480" y1="196" x2="480" y2="204"/><line x1="520" y1="196" x2="520" y2="204"/><line x1="560" y1="196" x2="560" y2="204"/>
</g>
<polyline points="40,200 80,230 120,260 160,230 200,200" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 5"/>
<polyline points="40,200 80,170 120,140 160,170 200,200 240,170 280,200 320,170 360,140 400,110 440,140 480,110 520,80 560,110" fill="none" stroke="#2563eb" stroke-width="2.5"/>
<circle cx="80" cy="170" r="4.5" fill="#2563eb"/>
<circle cx="80" cy="230" r="4.5" fill="#dc2626"/>
<circle cx="200" cy="200" r="5" fill="currentColor"/>
<circle cx="560" cy="110" r="4.5" fill="currentColor"/>
<text x="92" y="166" font-size="13" fill="currentColor">(1, 1)</text>
<text x="92" y="240" font-size="13" fill="currentColor">(1, −1)</text>
<text x="575" y="114" font-size="13" fill="currentColor">(2n, y)</text>
<text x="200" y="222" text-anchor="middle" font-size="12" fill="currentColor">first tie</text>
<text x="40" y="304" text-anchor="middle" font-size="12" fill="currentColor">0</text>
<text x="600" y="304" text-anchor="middle" font-size="12" fill="currentColor">time</text>
<text x="28" y="66" text-anchor="end" font-size="12" fill="currentColor">S</text>
<text x="330" y="60" text-anchor="middle" font-size="12" fill="#2563eb">path that touches the axis</text>
<text x="330" y="290" text-anchor="middle" font-size="12" fill="#dc2626">its reflection up to the first tie</text>
</svg>
</div>

So the number of paths from $(1,1)$ to $(2n,y)$ that avoid the axis is $N_{2n-1,\,y-1} - N_{2n-1,\,y+1}$. Summing over $y = 2, 4, \ldots, 2n$ telescopes to $N_{2n-1,\,1} = \binom{2n-1}{n} = \tfrac12\binom{2n}{n}$, and dividing by the $2^{2n}$ equally likely paths gives $\tfrac12 u_{2n}$.

The same count gives a second form that is needed below: $\mathbb{P}(S_1 \ge 0, \ldots, S_{2n} \ge 0) = u_{2n}$. Deleting the first step of a strictly positive path of $2n$ steps and shifting it down by one gives a non-negative path of $2n-1$ steps, and this is a bijection, so $\mathbb{P}(S_1 \ge 0, \ldots, S_{2n-1} \ge 0) = 2 \cdot \tfrac12 u_{2n}$; and since $S_{2n-1}$ is odd, $S_{2n-1} \ge 0$ forces $S_{2n-1} \ge 1$, hence $S_{2n} \ge 0$ automatically.

The lemma also describes the stretches between ties. The probability that the first tie occurs at time $2r$ is $f_{2r} = u_{2r-2} - u_{2r} = u_{2r}/(2r-1) \sim r^{-3/2}/(2\sqrt{\pi})$, and the probability that a stretch lasts longer than $2m$ tosses is $u_{2m}$ itself, of order $m^{-1/2}$. A tail this heavy has infinite mean, and in a game of $2n$ tosses the longest stretch occupies a positive fraction of the whole game. Whoever is ahead during that stretch is ahead for a large part of the game.

## The last tie

Let $L$ be the time of the last tie, with $L = 0$ if the score is never tied. For $L = 2k$ the walk must be at zero at time $2k$ and then avoid zero for the remaining $2n - 2k$ steps; the steps after time $2k$ form a fresh walk, so by the lemma

$$
\mathbb{P}(L = 2k) = u_{2k}\, u_{2n-2k}, \qquad k = 0, 1, \ldots, n.
$$

This is the **discrete arcsine law**. Two features follow directly. The formula is symmetric under $k \leftrightarrow n - k$: the last tie is as likely to fall at time $2k$ as at time $2n - 2k$, so a last tie inside the first tenth of the game and a last tie inside the final tenth are equally probable. And since $u_{2m}$ decreases in $m$, the two ends $k = 0$ and $k = n$ are the most probable values, each with probability $u_{2n}$, while the middle is the least probable: for even $n$, $\mathbb{P}(L = n) = u_n^2 \approx 2/(\pi n)$, below the endpoint value by a factor of $\sqrt{\pi n}/2$. The 20-toss game, to four decimals, with only the first half listed since the second half mirrors it:

| last tie at toss | 0 | 2 | 6 | 10 |
| --- | --- | --- | --- | --- |
| probability | .1762 | .0927 | .0655 | .0606 |

Inserting $u_{2m} \approx 1/\sqrt{\pi m}$ and writing $x = k/n$,

$$
\mathbb{P}(L = 2k) \;\approx\; \frac{1}{\pi\sqrt{k(n-k)}} \;=\; \frac{1}{n}\cdot\frac{1}{\pi\sqrt{x(1-x)}},
$$

so the fraction $L/2n$ of the game elapsed before the last tie has, in the limit, the density $1/(\pi\sqrt{x(1-x)})$. The substitution $x = \sin^2\theta$ integrates it:

$$
\mathbb{P}\!\left(\frac{L}{2n} \le x\right) \;\longrightarrow\; \int_0^x \frac{dt}{\pi\sqrt{t(1-t)}} \;=\; \frac{2}{\pi}\arcsin\sqrt{x}.
$$

The limiting density is the [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with both parameters equal to $\tfrac12$.

## Time in the lead has the same distribution

Call the interval between tosses $k-1$ and $k$ an interval where A is ahead if $S_{k-1} > 0$ or $S_k > 0$. A tie is credited to the player who was ahead just before or just after it, so all the intervals between two consecutive ties go to one player, and A's count is always even. **Theorem.** The number of intervals where A is ahead equals $2k$ with probability $u_{2k}\,u_{2n-2k}$, for $k = 0, \ldots, n$: exactly the distribution of the last tie.

The derivation conditions on the first tie. Write $p_{2k,2n}$ for the probability in question. The two boundary cases are the lemma in its second form: $p_{2n,2n} = \mathbb{P}(S_1 \ge 0, \ldots, S_{2n} \ge 0) = u_{2n}$, and $p_{0,2n} = u_{2n}$ by symmetry. For $1 \le k \le n-1$ the score must be tied at some time $2r \le 2n$. If the first tie comes at $2r$ and the stretch before it was A's (probability $\tfrac12 f_{2r}$), that stretch contributes $2r$ intervals to A and the remaining $2n - 2r$ tosses must contribute $2k - 2r$; if the stretch was B's, the remaining tosses must contribute all $2k$:

$$
p_{2k,2n} = \frac12\sum_{r=1}^{k} f_{2r}\, p_{2k-2r,\,2n-2r} + \frac12\sum_{r=1}^{n-k} f_{2r}\, p_{2k,\,2n-2r}.
$$

Induction on $n$ turns the probabilities on the right into $u_{2k-2r}\,u_{2n-2k}$ and $u_{2k}\,u_{2n-2k-2r}$, and the renewal identity $u_{2m} = \sum_{r=1}^{m} f_{2r}\,u_{2m-2r}$ (a tie at time $2m$ has a first tie at some time $2r \le 2m$) collapses both sums, leaving $\tfrac12 u_{2k}u_{2n-2k} + \tfrac12 u_{2k}u_{2n-2k}$.

Restrict attention to the games that end tied. [Chung and Feller](https://doi.org/10.1073/pnas.35.10.605) proved in 1949 that among the $\binom{2n}{n}$ paths with $S_{2n} = 0$, exactly $\frac{1}{n+1}\binom{2n}{n}$ of them, a [Catalan number](https://en.wikipedia.org/wiki/Catalan_number), have A ahead for $2k$ intervals, and this holds for every $k$ from $0$ to $n$. Conditioned on a tie at the end, the time in the lead is uniformly distributed. The U shape therefore comes from the games that end with someone ahead, and within those games the distribution of the time in the lead is more concentrated at the two ends than the unconditional one.

The widget draws a random game on the left, with A's intervals in blue and B's in red. On the right is the exact distribution $u_{2k}u_{2n-2k}$ of A's number of intervals, computed from the recursion $u_{2m} = u_{2m-2}\cdot\frac{2m-1}{2m}$ rather than sampled, with the arcsine density overlaid. Ticking the box conditions both panels on a tie at the end and replaces the U with the flat Chung–Feller law.

<div class="as1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>tosses 2n =&nbsp;<strong id="as1-nval" style="display: inline-block; min-width: 3.2em;">100</strong></span><input id="as1-n" type="range" min="5" max="500" step="1" value="50" style="flex: 1; min-width: 160px; accent-color: #2563eb;"><label style="display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;"><input id="as1-tie" type="checkbox" style="accent-color: #2563eb;">condition on a tie at the end</label></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span style="white-space: nowrap;"><svg width="14" height="12" viewBox="0 0 14 12" style="display: inline-block; vertical-align: -1px;"><rect x="1" y="1" width="12" height="10" fill="#2563eb" fill-opacity="0.8"/></svg> exact P(A ahead for 2k intervals)</span><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#d97706" stroke-width="2.5"/></svg> arcsine density, or the flat law when conditioned</span></div><div style="display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1rem; align-items: start;"><div><svg id="as1-path" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="A sample game: the running score against time, with intervals where A is ahead in blue and intervals where B is ahead in red."></svg><div style="display: flex; gap: 0.5rem 1rem; align-items: center; flex-wrap: wrap; margin-top: 0.4rem; font-size: 0.9em;"><button id="as1-resample" type="button" style="padding: 0.25rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">new game</button><span>A ahead for <strong id="as1-frac" style="display: inline-block; min-width: 3.6em;">—</strong> of this game</span></div></div><svg id="as1-bars" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="Bar chart of the exact distribution of the number of intervals during which A is ahead, with the arcsine density overlaid."></svg></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 0.75rem; font-size: 0.95em;"><span>P(one player ahead for ≥ 90% of the game) = <strong id="as1-p90" style="display: inline-block; min-width: 3.6em;">—</strong></span><span>limit <strong>0.410</strong></span><span>expected ties = <strong id="as1-ties" style="display: inline-block; min-width: 3.2em;">—</strong></span></div></div>
<script>
(function () {
  var slider = document.getElementById('as1-n');
  if (!slider) return;
  var tieBox = document.getElementById('as1-tie');
  var nDisp = document.getElementById('as1-nval');
  var fracDisp = document.getElementById('as1-frac');
  var p90Disp = document.getElementById('as1-p90');
  var tiesDisp = document.getElementById('as1-ties');
  var pathSvg = document.getElementById('as1-path');
  var barSvg = document.getElementById('as1-bars');
  var btn = document.getElementById('as1-resample');
  var BLUE = '#2563eb', RED = '#dc2626', AMB = '#d97706';
  var steps = null, stepsN = -1, stepsTie = false;
  function uArr(n) {
    var u = [1];
    for (var m = 1; m <= n; m++) u.push(u[m - 1] * (2 * m - 1) / (2 * m));
    return u;
  }
  function sample(n, tie) {
    var N = 2 * n, tries = 0;
    while (true) {
      var s = new Array(N), tot = 0;
      for (var i = 0; i < N; i++) { s[i] = Math.random() < 0.5 ? 1 : -1; tot += s[i]; }
      tries++;
      if (!tie || tot === 0 || tries > 20000) return s;
    }
  }
  function drawPath(n) {
    var N = 2 * n, S = [0], mx = 1;
    for (var i = 0; i < N; i++) { S.push(S[i] + steps[i]); if (Math.abs(S[i + 1]) > mx) mx = Math.abs(S[i + 1]); }
    var X0 = 30, X1 = 310, Y0 = 16, Y1 = 224, ymid = (Y0 + Y1) / 2;
    function px(t) { return X0 + (X1 - X0) * t / N; }
    function py(v) { return ymid - (ymid - Y0) * v / mx; }
    var out = '<line x1="' + X0 + '" y1="' + ymid + '" x2="' + X1 + '" y2="' + ymid + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    var pos = 0, blue = '', red = '';
    for (var k = 1; k <= N; k++) {
      var seg = 'M' + px(k - 1).toFixed(1) + ',' + py(S[k - 1]).toFixed(1) + 'L' + px(k).toFixed(1) + ',' + py(S[k]).toFixed(1);
      if (S[k - 1] > 0 || S[k] > 0) { blue += seg; pos++; } else { red += seg; }
    }
    out += '<path d="' + blue + '" fill="none" stroke="' + BLUE + '" stroke-width="1.5"/>';
    out += '<path d="' + red + '" fill="none" stroke="' + RED + '" stroke-width="1.5"/>';
    out += '<text x="' + X0 + '" y="' + (Y0 - 2) + '" font-size="11" fill="currentColor">A\'s lead S</text>';
    out += '<text x="' + X1 + '" y="' + (Y1 + 12) + '" text-anchor="end" font-size="11" fill="currentColor">toss ' + N + '</text>';
    out += '<text x="' + X0 + '" y="' + (Y1 + 12) + '" font-size="11" fill="currentColor">toss 0</text>';
    pathSvg.innerHTML = out;
    fracDisp.textContent = (100 * pos / N).toFixed(1) + '%';
  }
  function drawBars(n, tie) {
    var u = uArr(n), dist = [], ymax = 0;
    for (var k = 0; k <= n; k++) { dist.push(tie ? 1 / (n + 1) : u[k] * u[n - k]); if (dist[k] > ymax) ymax = dist[k]; }
    ymax *= 1.12;
    var X0 = 30, X1 = 310, Y0 = 16, Y1 = 208, slot = (X1 - X0) / (n + 1);
    function px(k) { return X0 + slot * (k + 0.5); }
    function py(p) { return Y1 - (Y1 - Y0) * Math.min(p, ymax) / ymax; }
    var out = '<line x1="' + X0 + '" y1="' + Y1 + '" x2="' + X1 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    var bw = Math.max(slot * 0.85, 0.6);
    for (var k2 = 0; k2 <= n; k2++) {
      out += '<rect x="' + (px(k2) - bw / 2).toFixed(2) + '" y="' + py(dist[k2]).toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + (Y1 - py(dist[k2])).toFixed(2) + '" fill="' + BLUE + '" fill-opacity="0.8"/>';
    }
    var path = '';
    if (tie) {
      path = 'M' + px(0).toFixed(1) + ',' + py(1 / (n + 1)).toFixed(1) + 'L' + px(n).toFixed(1) + ',' + py(1 / (n + 1)).toFixed(1);
    } else {
      var M = 240;
      for (var i = 0; i <= M; i++) {
        var x = 0.5 / n + (1 - 1 / n) * i / M;
        var dens = 1 / (n * Math.PI * Math.sqrt(x * (1 - x)));
        path += (i === 0 ? 'M' : 'L') + (X0 + slot * (x * n + 0.5)).toFixed(1) + ',' + py(dens).toFixed(1);
      }
    }
    out += '<path d="' + path + '" fill="none" stroke="' + AMB + '" stroke-width="2.5"/>';
    out += '<text x="' + X0 + '" y="' + (Y1 + 14) + '" font-size="11" fill="currentColor">0%</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y1 + 14) + '" text-anchor="middle" font-size="11" fill="currentColor">50%</text>';
    out += '<text x="' + X1 + '" y="' + (Y1 + 14) + '" text-anchor="end" font-size="11" fill="currentColor">100%</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y1 + 30) + '" text-anchor="middle" font-size="11" fill="currentColor">share of the game with A ahead</text>';
    out += '<text x="' + X0 + '" y="' + (Y0 - 2) + '" font-size="11" fill="currentColor">probability</text>';
    barSvg.innerHTML = out;
    var p90 = 0;
    for (var k3 = 0; k3 <= n; k3++) if (k3 >= 0.9 * n - 1e-9 || k3 <= 0.1 * n + 1e-9) p90 += dist[k3];
    p90Disp.textContent = p90.toFixed(3);
    tiesDisp.textContent = tie ? '–' : ((2 * n + 1) * u[n] - 1).toFixed(1);
  }
  function render(resample) {
    var n = parseInt(slider.value, 10), tie = tieBox.checked;
    if (resample || n !== stepsN || tie !== stepsTie) { steps = sample(n, tie); stepsN = n; stepsTie = tie; }
    nDisp.textContent = 2 * n;
    drawPath(n);
    drawBars(n, tie);
  }
  slider.addEventListener('input', function () { render(false); });
  tieBox.addEventListener('change', function () { render(false); });
  btn.addEventListener('click', function () { render(true); });
  render(true);
})();
</script>

## Quantiles of the limit

The event that the player who spends longer in the lead does so for at least a fraction $q > \tfrac12$ of the game has limiting probability $\frac{4}{\pi}\arcsin\sqrt{1-q}$:

| $q$ | 70% | 80% | 90% | 99% |
| --- | --- | --- | --- | --- |
| probability | .738 | .590 | .410 | .128 |

Setting the probability to $\tfrac12$ and to $\tfrac15$ and solving for $q$ gives $85.4\%$ and $97.6\%$, the two figures quoted at the start. A trading strategy that stays above its benchmark for 90% of a year, or a team that leads for 90% of a match, is showing an event that a fair coin produces one time in five ($\frac{2}{\pi}\arcsin\sqrt{0.1} = 0.205$ for a specified side). Time spent in the lead is weak evidence of an edge, and the margin at the end is the quantity that carries the information.

The law is not specific to coin tossing. [Lévy (1939)](http://www.numdam.org/item/CM_1940__7__283_0/) proved the arcsine law for Brownian motion, where it holds exactly at every time horizon; for Brownian motion the same law describes the fraction of time spent positive, the last zero, and the location of the maximum. [Erdős and Kac (1947)](https://doi.org/10.1090/S0002-9904-1947-08928-X) showed that the fraction of positive partial sums has the same arcsine limit for independent steps with mean zero and finite variance whenever the central limit theorem applies to them, in particular for all i.i.d. steps with finite variance, an early instance of the **invariance principle** (a limit law that depends on the step distribution only through its mean and variance, because the rescaled walk converges to Brownian motion). Sparre Andersen ([1953](https://doi.org/10.7146/math.scand.a-10385), [1954](https://doi.org/10.7146/math.scand.a-10407)) found the exact finite-$n$ version: for i.i.d. steps with any symmetric continuous distribution, the number of positive partial sums among $S_1, \ldots, S_n$ equals $k$ with probability $u_{2k}\,u_{2n-2k}$ for every $n$, the same numbers as in the coin-tossing case, and the argument is purely combinatorial. The U shape is a property of sums of independent symmetric steps, not of $\pm 1$ steps in particular.

## References

- William Feller. *An Introduction to Probability Theory and Its Applications*, Volume I. 3rd edition, Wiley, 1968. Chapter III: the reflection principle, the last tie, and the time-in-the-lead theorem, with the derivation followed above.
- Paul Lévy. *Sur certains processus stochastiques homogènes*. Compositio Mathematica, 7:283–339, 1939. The arcsine laws for Brownian motion.
- Paul Erdős, Mark Kac. *On the number of positive sums of independent random variables*. Bulletin of the American Mathematical Society, 53(10):1011–1020, 1947. The arcsine limit for general steps with finite variance.
- Kai Lai Chung, William Feller. *On fluctuations in coin-tossing*. Proceedings of the National Academy of Sciences, 35(10):605–608, 1949. The uniform distribution of the time in the lead among paths that end tied.
- Erik Sparre Andersen. *On the fluctuations of sums of random variables*. Mathematica Scandinavica, 1:263–285, 1953, and part II, 2:194–222, 1954. The distribution-free finite-$n$ law for symmetric continuous steps.
- William Feller. *An Introduction to Probability Theory and Its Applications*, Volume II. 2nd edition, Wiley, 1971. Chapter XII: the combinatorial lemma and the arcsine laws for general random walks, including Sparre Andersen's theorem.
