---
author: Aseem Raj Baranwal
pubDatetime: 2026-09-05T09:30:00Z
title: The Ehrenfest urn
slug: ehrenfest-urn
featured: false
draft: false
tags:
  - physics
  - mathematics
  - statistics
description:
  "N numbered balls in two urns, one moved at random per step, is the random walk on the corners of the N-cube. Its equilibrium is the binomial, the mean imbalance decays like (1 − 2/N)^t, and the expected time to return to the all-in-one-urn state is exactly 2^N."
---

Take $N$ balls numbered $1$ to $N$ and two urns, A and B. Every second, draw a number uniformly at random from $1$ to $N$ and move the ball with that number to the other urn. Start with all $N$ balls in A. The count in A drops, at first by nearly one ball per step, then more slowly, and settles into fluctuations around $N/2$ that never stop. Run the film backward and the same rule describes it: the process is reversible, and every configuration, the starting one included, is revisited eventually with probability one. This is the **Ehrenfest urn**, proposed by Paul and Tatiana Ehrenfest in 1907 as a model in which the approach to equilibrium and the recurrence of the initial state can both be computed, and in which the apparent conflict between them turns out to be a statement about time scales. Every quantity below is exact.

## A walk on the corners of the cube

The state of the system is the set of balls in A, a binary vector $x \in \{0,1\}^N$ with $x_i = 1$ when ball $i$ is in A. One step flips one uniformly chosen coordinate. So the urn process is the simple random walk on the corners of the $N$-dimensional cube, each corner joined to its $N$ neighbors at [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) $1$, and the number of balls in A is the Hamming weight of the current corner, the level $\ell$ of [the post on the spiky cube](/blog/why-hypercubes-look-spiky).

Every corner has the same number of neighbors, so the stationary distribution of the walk is uniform over the $2^N$ corners, and the stationary distribution of the count $X_t$ of balls in A is the number of corners at each level, normalized:

$$
\pi_k = \binom{N}{k} 2^{-N}, \qquad k = 0, 1, \ldots, N.
$$

The equilibrium of the urn is the binomial distribution, the spiky cross-section of the earlier post: in the long run the process spends time at level $k$ in proportion to the width of that drawing at level $k$. The count itself is a Markov chain on $\{0, \ldots, N\}$, moving from $k$ to $k-1$ with probability $k/N$ (a ball in A was drawn) and to $k+1$ with probability $(N-k)/N$. That $\pi$ is stationary for it is the [detailed balance](https://en.wikipedia.org/wiki/Detailed_balance) identity $\binom{N}{k}(N-k) = \binom{N}{k+1}(k+1)$, whose two sides both count the edges of the cube between levels $k$ and $k+1$.

The binomial has mean $N/2$ and standard deviation $\sqrt{N}/2$. For $N = 100$ the equilibrium count is $50 \pm 5$; the stationary probability of finding $70$ or more balls in A is $3.9 \times 10^{-5}$, and of finding all $100$ there, $2^{-100} \approx 7.9 \times 10^{-31}$. In equilibrium, the state the process was started in is, together with its mirror image, the least probable state there is.

## The mean relaxes exponentially

From level $k$, the next count is $k - 1$ with probability $k/N$ and $k + 1$ otherwise, so

$$
\mathbb{E}[X_{t+1} \mid X_t = k] = k - \frac{k}{N} + \frac{N - k}{N} = \Big(1 - \frac{2}{N}\Big) k + 1.
$$

The same recursion holds for the imbalance $X_t - N/2$. Subtract $N/2$ from both sides and use $1 - \tfrac{N}{2} = -\big(1 - \tfrac{2}{N}\big)\tfrac{N}{2}$ to get

$$
\mathbb{E}\Big[X_{t+1} - \frac{N}{2} \,\Big|\, X_t\Big] = \Big(1 - \frac{2}{N}\Big)\Big(X_t - \frac{N}{2}\Big).
$$

Iterating, $\mathbb{E}[X_t] - N/2 = (1 - 2/N)^t\,(X_0 - N/2)$. The expected imbalance between the urns decays geometrically, with time constant $N/2$ steps. This is [Newton's law of cooling](https://en.wikipedia.org/wiki/Newton%27s_law_of_cooling) for two bodies exchanging heat, and it has been obtained from a reversible rule by taking an expectation; nothing irreversible was put in. Starting from all balls in A, the expected imbalance $N/2$ shrinks to the size of the equilibrium fluctuations, $\sqrt{N}/2$, after $t \approx \frac{N}{4}\ln N$ steps: about $115$ steps for $N = 100$. The same $\frac14 N \ln N$ is the [mixing time](https://en.wikipedia.org/wiki/Markov_chain_mixing_time) of the cube walk: [Diaconis, Graham and Morrison (1990)](https://doi.org/10.1002/rsa.3240010105) proved that the walk (in a version allowed to stay put) is far from uniform before $\frac14 N\ln N$ steps and close to uniform shortly after.

The factor $1 - 2/N$ is the second largest eigenvalue of the transition matrix, and the full spectrum is also explicit. On the cube, the walk is diagonalized by the parity functions $\chi_S(x) = (-1)^{\sum_{i \in S} x_i}$, one for each subset $S$ of coordinates: flipping a random coordinate changes the sign of $\chi_S$ exactly when the coordinate lies in $S$, which happens with probability $|S|/N$, so $\chi_S$ is an eigenvector with eigenvalue $1 - 2|S|/N$. The eigenvalues of the count chain are therefore

$$
\lambda_j = 1 - \frac{2j}{N}, \qquad j = 0, 1, \ldots, N,
$$

a result of [Kac (1947)](https://doi.org/10.1080/00029890.1947.11990189), and on the cube the eigenvalue $\lambda_j$ has multiplicity $\binom{N}{j}$: the binomial coefficient appears a third time, now as a spectral multiplicity. The second moment obeys a recursion of the same kind, $\mathbb{E}[X_{t+1}^2 \mid X_t = k] = (1 - 4/N)k^2 + 2k + 1$, with $\lambda_2 = 1 - 4/N$ as its factor, so the variance of the count at every time is also a closed computation, and the widget below uses both recursions.

Reversibility gives a statement about the past as well. In the stationary process, detailed balance means the film run backward has the same law as the film run forward, so $\mathbb{P}(X_{t-s} = j \mid X_t = k) = \mathbb{P}(X_{t+s} = j \mid X_t = k)$ for every $j$, $k$, and $s$, and in particular

$$
\begin{aligned}
\mathbb{E}[X_{t-s} \mid X_t = k] &= \frac{N}{2} + \Big(1 - \frac{2}{N}\Big)^{s}\Big(k - \frac{N}{2}\Big) \\
&= \mathbb{E}[X_{t+s} \mid X_t = k].
\end{aligned}
$$

Conditional on an unusual count now, the expected past is the mirror image of the expected future: the count rose to $k$ along the same exponential curve it is about to descend. An imbalance observed in equilibrium is, in expectation, the top of a symmetric peak, not the start of a decay. This is the picture Boltzmann gave in his [1896 reply](https://doi.org/10.1002/andp.18962930414) to Zermelo, and here it is a two-line consequence of detailed balance.

## Return times

The return times follow from a formula of Kac. For an irreducible Markov chain with stationary distribution $\pi$, the expected time to return to a state $k$, starting from $k$, is

$$
\mathbb{E}_k[\tau_k^+] = \frac{1}{\pi_k}.
$$

For the proof, run the chain in its stationary regime. For each $t \ge 1$, the event that the most recent visit to $k$ at or before time $0$ occurred exactly $t - 1$ steps ago has probability $\pi_k\,\mathbb{P}_k(\tau_k^+ \ge t)$ by stationarity. These events are disjoint and, since the chain visits $k$ infinitely often, their union is certain, so $\pi_k \sum_{t \ge 1}\mathbb{P}_k(\tau_k^+ \ge t) = 1$, and the sum is $\mathbb{E}_k[\tau_k^+]$. (Periodicity is no obstacle: the count chain alternates parity, and the formula holds regardless.)

For the urn, then,

$$
\mathbb{E}_k[\tau_k^+] = \frac{2^N}{\binom{N}{k}}.
$$

The all-in-A state returns, on average, after exactly $2^N$ steps. The balanced state returns after $2^N/\binom{N}{N/2} \approx \sqrt{\pi N / 2}$ steps. As a function of the level, the expected return time is the binomial turned upside down: on a logarithmic scale it is $N \log 2 - \log \binom{N}{k}$, a U with its floor at $\tfrac12 \log(\pi N/2)$ in the middle and its rims at $N \log 2$. The spiky cube, seen through return times, is a valley with two cliffs.

| $N$ | return to all-in-A | return to balanced | all-in-A to balanced |
| --- | --- | --- | --- |
| 10 | 1,024 | 4.1 | 8.9 |
| 20 | $1.05 \times 10^{6}$ | 5.7 | 21.3 |
| 50 | $1.13 \times 10^{15}$ | 8.9 | 64.8 |
| 100 | $1.27 \times 10^{30}$ | 12.6 | 146.9 |

The last column is the expected number of steps to go from the all-in-A state down to the balanced state for the first time, from the standard formula for hitting times of a [birth–death chain](https://en.wikipedia.org/wiki/Birth%E2%80%93death_process): the expected time to step from $j$ to $j+1$ is $\frac{1}{\pi_j p_j}\sum_{i \le j}\pi_i$ with $p_j = (N-j)/N$, and the reverse direction is the mirror image. Summing these over the levels between $N$ and $N/2$ gives $146.9$ for $N = 100$; summing the reverse formula from $N/2$ up to $N$ gives $1.28 \times 10^{30}$, a little more than $2^N$ itself. Going down takes a hundred-odd steps and going back up takes $10^{30}$, and both numbers come from the same reversible rule.

With $N = 20$ balls and one move per microsecond, the initial state recurs about once a second, and the recurrence is observable. With $N = 50$ and one move per nanosecond, the expected wait is $2^{50}$ nanoseconds, thirteen days. With $N = 100$ it is $4 \times 10^{13}$ years, three thousand times the age of the universe; a mole of molecules puts $N$ near $10^{23}$. Recurrence is a theorem, and for $N$ of macroscopic size it is unobservable. The widget computes the exact mean and variance of the count from the all-in-A start, and the exact return-time landscape, for any $N$:

<div class="eu1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>balls N =&nbsp;<strong id="eu1-nval" style="display: inline-block; min-width: 2.4em;">100</strong></span><input id="eu1-n" type="range" min="4" max="300" step="2" value="100" style="flex: 1; min-width: 160px; accent-color: #2563eb;"><span>time constant N/2 = <strong id="eu1-tau" style="display: inline-block; min-width: 2.4em;">50</strong> steps</span></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#2563eb" stroke-width="2.5"/></svg> exact mean of the count</span><span style="white-space: nowrap;"><svg width="14" height="12" viewBox="0 0 14 12" style="display: inline-block; vertical-align: -1px;"><rect x="1" y="1" width="12" height="10" fill="#2563eb" fill-opacity="0.25"/></svg> mean ± 2 standard deviations</span><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/></svg> N/2</span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; align-items: start;"><svg id="eu1-traj" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="The exact mean number of balls in urn A against time, starting from all balls in A, with a band of two standard deviations, relaxing to N over 2."></svg><svg id="eu1-land" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="Bar chart on a logarithmic scale of the expected return time to each level k, equal to 2 to the N divided by N choose k, which is a U shape."></svg></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 0.75rem; font-size: 0.95em;"><span>return to all-in-A: <strong id="eu1-retfull" style="display: inline-block; min-width: 7em;">—</strong> steps</span><span>return to balanced: <strong id="eu1-rethalf" style="display: inline-block; min-width: 3.6em;">—</strong> steps</span><span>all-in-A → balanced: <strong id="eu1-hitdown" style="display: inline-block; min-width: 4.2em;">—</strong> steps</span><span>balanced → all-in-A: <strong id="eu1-hitup" style="display: inline-block; min-width: 7em;">—</strong> steps</span></div></div>
<script>
(function () {
  var slider = document.getElementById('eu1-n');
  if (!slider) return;
  var nDisp = document.getElementById('eu1-nval');
  var tauDisp = document.getElementById('eu1-tau');
  var retFull = document.getElementById('eu1-retfull');
  var retHalf = document.getElementById('eu1-rethalf');
  var hitDown = document.getElementById('eu1-hitdown');
  var hitUp = document.getElementById('eu1-hitup');
  var trajSvg = document.getElementById('eu1-traj');
  var landSvg = document.getElementById('eu1-land');
  var BLUE = '#2563eb', RED = '#dc2626';
  var SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  function sup(e) { var s = String(e), o = ''; for (var i = 0; i < s.length; i++) o += SUP[parseInt(s.charAt(i), 10)]; return o; }
  function fmt(x) {
    if (x < 1e5) return x.toLocaleString('en-US', { maximumFractionDigits: x < 1000 ? 1 : 0 });
    var e = Math.floor(Math.log(x) / Math.LN10), m = x / Math.pow(10, e);
    if (m >= 9.995) { m /= 10; e += 1; }
    return m.toFixed(2) + ' × 10<sup>' + e + '</sup>';
  }
  function render() {
    var N = parseInt(slider.value, 10), half = N / 2;
    var lnf = [0];
    for (var i = 1; i <= N; i++) lnf.push(lnf[i - 1] + Math.log(i));
    var pi = [], lnpi = [];
    for (var k = 0; k <= N; k++) { var l = lnf[N] - lnf[k] - lnf[N - k] - N * Math.LN2; lnpi.push(l); pi.push(Math.exp(l)); }
    var cum = new Array(N + 1), tail = new Array(N + 1), c = 0;
    for (var k2 = 0; k2 <= N; k2++) { c += pi[k2]; cum[k2] = c; }
    c = 0;
    for (var k3 = N; k3 >= 0; k3--) { c += pi[k3]; tail[k3] = c; }
    var down = 0, up = 0;
    for (var j = half + 1; j <= N; j++) down += tail[j] / (pi[j] * j / N);
    for (var j2 = half; j2 < N; j2++) up += cum[j2] / (pi[j2] * (N - j2) / N);
    nDisp.textContent = N;
    tauDisp.textContent = half;
    retFull.innerHTML = fmt(Math.pow(2, N));
    retHalf.textContent = (1 / pi[half]).toFixed(1);
    hitDown.textContent = down.toFixed(1);
    hitUp.innerHTML = fmt(up);
    var T = 4 * N, m1 = N, m2 = N * N, means = [N], sds = [0];
    for (var t = 1; t <= T; t++) {
      var m1n = (1 - 2 / N) * m1 + 1, m2n = (1 - 4 / N) * m2 + 2 * m1 + 1;
      m1 = m1n; m2 = m2n;
      means.push(m1); sds.push(Math.sqrt(Math.max(0, m2 - m1 * m1)));
    }
    var X0 = 36, X1 = 312, Y0 = 16, Y1 = 206;
    function px(tt) { return X0 + (X1 - X0) * tt / T; }
    function py(v) { return Y1 - (Y1 - Y0) * v / N; }
    var out = '<line x1="' + X0 + '" y1="' + Y1 + '" x2="' + X1 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    out += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    var upper = '', lower = '', mean = '';
    for (var t2 = 0; t2 <= T; t2++) {
      var hi = Math.min(N, means[t2] + 2 * sds[t2]), lo = Math.max(0, means[t2] - 2 * sds[t2]);
      upper += (t2 === 0 ? 'M' : 'L') + px(t2).toFixed(1) + ',' + py(hi).toFixed(1);
      lower = 'L' + px(t2).toFixed(1) + ',' + py(lo).toFixed(1) + lower;
      mean += (t2 === 0 ? 'M' : 'L') + px(t2).toFixed(1) + ',' + py(means[t2]).toFixed(1);
    }
    out += '<path d="' + upper + lower + 'Z" fill="' + BLUE + '" fill-opacity="0.22" stroke="none"/>';
    out += '<line x1="' + X0 + '" y1="' + py(half).toFixed(1) + '" x2="' + X1 + '" y2="' + py(half).toFixed(1) + '" stroke="' + RED + '" stroke-width="1.5" stroke-dasharray="4 3"/>';
    out += '<path d="' + mean + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>';
    for (var q = 0; q <= 4; q++) out += '<text x="' + px(q * N).toFixed(1) + '" y="' + (Y1 + 14) + '" text-anchor="middle" font-size="11" fill="currentColor">' + (q === 0 ? '0' : q + 'N') + '</text>';
    out += '<text x="' + (X0 - 4) + '" y="' + (py(N) + 4) + '" text-anchor="end" font-size="11" fill="currentColor">N</text>';
    out += '<text x="' + (X0 - 4) + '" y="' + (py(half) + 4) + '" text-anchor="end" font-size="11" fill="currentColor">N/2</text>';
    out += '<text x="' + (X0 - 4) + '" y="' + (py(0) + 4) + '" text-anchor="end" font-size="11" fill="currentColor">0</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y1 + 30) + '" text-anchor="middle" font-size="11" fill="currentColor">step t (balls in urn A, from all in A)</text>';
    trajSvg.innerHTML = out;
    var ymax = N * Math.LN2 / Math.LN10;
    var LX0 = 44, LX1 = 312, LY0 = 16, LY1 = 206, slot = (LX1 - LX0) / (N + 1);
    function lpy(v) { return LY1 - (LY1 - LY0) * v / ymax; }
    var lo2 = '<line x1="' + LX0 + '" y1="' + LY1 + '" x2="' + LX1 + '" y2="' + LY1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    var bw = Math.max(slot * 0.85, 0.6);
    for (var k4 = 0; k4 <= N; k4++) {
      var v = -lnpi[k4] / Math.LN10;
      lo2 += '<rect x="' + (LX0 + slot * k4 + (slot - bw) / 2).toFixed(2) + '" y="' + lpy(v).toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + (LY1 - lpy(v)).toFixed(2) + '" fill="' + (k4 === half ? RED : BLUE) + '" fill-opacity="0.8"/>';
    }
    var seen = {};
    for (var q2 = 0; q2 <= 4; q2++) {
      var e = Math.round(q2 * ymax / 4);
      if (seen[e]) continue;
      seen[e] = true;
      lo2 += '<text x="' + (LX0 - 4) + '" y="' + (lpy(e) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="currentColor">10' + sup(e) + '</text>';
    }
    lo2 += '<text x="' + LX0 + '" y="' + (LY1 + 14) + '" font-size="11" fill="currentColor">0</text>';
    lo2 += '<text x="' + (LX0 + slot * (half + 0.5)).toFixed(1) + '" y="' + (LY1 + 14) + '" text-anchor="middle" font-size="11" fill="currentColor">N/2</text>';
    lo2 += '<text x="' + LX1 + '" y="' + (LY1 + 14) + '" text-anchor="end" font-size="11" fill="currentColor">N</text>';
    lo2 += '<text x="' + ((LX0 + LX1) / 2) + '" y="' + (LY1 + 30) + '" text-anchor="middle" font-size="11" fill="currentColor">expected return time to level k</text>';
    landSvg.innerHTML = lo2;
  }
  slider.addEventListener('input', render);
  render();
})();
</script>

## The two objections

Boltzmann's [H-theorem](https://en.wikipedia.org/wiki/H-theorem) of 1872 derived, from the kinetic equation for a dilute gas, a quantity $H$ that can only decrease in time. Two objections followed. Loschmidt's, in 1876, is the [**reversibility objection**](https://en.wikipedia.org/wiki/Loschmidt%27s_paradox): the equations of mechanics are symmetric under time reversal, so for every motion in which $H$ decreases there is a reversed motion in which it increases, and a monotone $H$ cannot follow from mechanics alone. Zermelo's, in 1896, is the **recurrence objection**: by [Poincaré's recurrence theorem](https://en.wikipedia.org/wiki/Poincar%C3%A9_recurrence_theorem) (1890), an isolated mechanical system with bounded energy returns arbitrarily close to its initial state, so $H$ cannot decrease forever. Boltzmann's replies of 1896 and 1897 made the statistical position explicit: the theorem is about overwhelmingly probable behavior, the recurrence times of macroscopic systems are far longer than any observation, and the $H$-curve of a system in equilibrium is a sequence of symmetric fluctuation peaks.

In the urn, each of these statements is a calculation. It is reversible (detailed balance holds), and its expected count nevertheless decays monotonically toward $N/2$ from any start, with the decay curve's mirror image as the expected past. It is recurrent, with the initial state returning after exactly $2^N$ steps on average, and $2^N$ steps exceed any feasible observation for $N$ in the hundreds, while the relaxation takes $\frac14 N \ln N$ steps. The 1907 paper of [Paul and Tatiana Ehrenfest](https://en.wikipedia.org/wiki/Ehrenfest_model) was written to exhibit this, and the mathematics was completed by Kac in 1947: the spectrum $1 - 2j/N$ in [one paper](https://doi.org/10.1080/00029890.1947.11990189) and the recurrence formula $1/\pi_k$ in [another](https://doi.org/10.1090/S0002-9904-1947-08927-8), both in 1947. [Siegert (1949)](https://doi.org/10.1103/PhysRev.76.1708) treated the approach to equilibrium in related gas models. The urn is now a standard textbook example, both of a reversible chain with a computable spectrum and of a chain obtained by projecting a larger one (the cube walk onto the count), in Levin, Peres and Wilmer.

## References

- Paul Ehrenfest, Tatiana Ehrenfest. *Über zwei bekannte Einwände gegen das Boltzmannsche H-Theorem*. Physikalische Zeitschrift, 8:311–314, 1907. The urn, introduced to answer the reversibility and recurrence objections.
- Mark Kac. *Random walk and the theory of Brownian motion*. The American Mathematical Monthly, 54(7):369–391, 1947. The eigenvalues $1 - 2j/N$ and the full solution of the urn.
- Mark Kac. *On the notion of recurrence in discrete stochastic processes*. Bulletin of the American Mathematical Society, 53(10):1002–1010, 1947. The return-time formula $\mathbb{E}_k[\tau_k^+] = 1/\pi_k$.
- Arnold J. F. Siegert. *On the approach to statistical equilibrium*. Physical Review, 76:1708–1714, 1949. The approach to equilibrium in related gas models.
- Persi Diaconis, Ronald L. Graham, John A. Morrison. *Asymptotic analysis of a random walk on a hypercube with many dimensions*. Random Structures & Algorithms, 1(1):51–72, 1990. The cutoff at $\frac14 N \ln N$.
- David A. Levin, Yuval Peres, Elizabeth L. Wilmer. *Markov Chains and Mixing Times*. 2nd edition, American Mathematical Society, 2017. Section 2.3, the hypercube and the Ehrenfest urn; Section 2.5, hitting times of birth–death chains; Chapter 21, the return-time lemma.
- Ludwig Boltzmann. *Entgegnung auf die wärmetheoretischen Betrachtungen des Hrn. E. Zermelo*. Annalen der Physik, 293(4):773–784, 1896. The reply to the recurrence objection.
- Ernst Zermelo. *Ueber einen Satz der Dynamik und die mechanische Wärmetheorie*. Annalen der Physik, 293(3):485–494, 1896. The recurrence objection.
