---
author: Aseem Raj Baranwal
pubDatetime: 2026-09-06T09:30:00Z
title: Gaps between random points
slug: gaps-between-random-points
featured: false
draft: false
tags:
  - mathematics
  - statistics
  - computer science
description:
  "Drop n points uniformly on a circle. The gaps are exchangeable, the expected largest gap is exactly Hₙ/n, about ln n times the average, and its exact distribution is an alternating sum due to Fisher. The same formula is the ln n load imbalance of consistent hashing."
---

Drop $n$ points independently and uniformly on a circle of circumference $1$. They cut the circle into $n$ arcs, the **gaps**, whose average length is exactly $1/n$. The longest gap is much longer than that. Its expected length is

$$
\mathbb{E}[G_{\max}] = \frac{H_n}{n}, \qquad H_n = 1 + \frac12 + \cdots + \frac1n \approx \ln n + 0.5772,
$$

so with a thousand points the longest gap is, on average, $7.5$ times the average gap, while the shortest gap has expectation exactly $1/n^2$, a thousand times shorter than average. The derivation is one change of variables. The exact distribution of the longest gap is a finite alternating sum that Fisher wrote down in 1929 for a problem in time-series analysis. One application is [consistent hashing](https://en.wikipedia.org/wiki/Consistent_hashing): $n$ servers hashed to a ring each own the arc up to their next neighbor, so the busiest server carries about $\ln n$ times its fair share of the keys.

## The gaps are exchangeable

Rotate the circle so that the first point sits at $0$. The other $n - 1$ points are then i.i.d. uniform on $[0, 1)$, and sorted into $U_{(1)} < U_{(2)} < \cdots < U_{(n-1)}$ they have joint density $(n-1)!$ on the region $0 < u_1 < \cdots < u_{n-1} < 1$. The gaps are

$$
G_1 = U_{(1)}, \quad G_2 = U_{(2)} - U_{(1)}, \quad \ldots, \quad G_n = 1 - U_{(n-1)},
$$

and the map from $(U_{(1)}, \ldots, U_{(n-1)})$ to $(G_1, \ldots, G_{n-1})$ is linear with determinant $1$. So the gap vector is uniformly distributed on the simplex $\{g_i \ge 0,\; g_1 + \cdots + g_n = 1\}$, the [Dirichlet distribution](https://en.wikipedia.org/wiki/Dirichlet_distribution) with all parameters equal to $1$. Uniformity on the simplex is symmetric in the coordinates, so the gaps are **exchangeable**: every permutation of $(G_1, \ldots, G_n)$ has the same joint law. They are not independent, since they sum to $1$, but any statement about one gap is a statement about every gap. Each has the marginal

$$
\mathbb{P}(G_i > x) = (1 - x)^{n-1},
$$

the probability that the other $n - 1$ points all avoid an arc of length $x$, with mean $1/n$. This is the same symmetry that produces the [German tank estimator](/blog/german-tank-problem): there, $k$ observed serial numbers cut a range into $k+1$ exchangeable gaps, and the unobserved gap above the maximum is estimated by the average of the visible ones.

The gap that contains a fixed location on the circle, say the point diametrically opposite the origin, is not a typical gap: long gaps are more likely to contain any given location, in proportion to their length. Its mean is $\mathbb{E}[G^2]/\mathbb{E}[G] = 2/(n+1)$, about twice the average gap. This is the [inspection paradox](https://en.wikipedia.org/wiki/Renewal_theory#Inspection_paradox), and it is the reason that, when buses arrive at random times, the interval you land in is longer than the average interval between buses.

## Gaps are normalized exponentials

The uniform distribution on the simplex has a second description that makes order statistics easy. Let $E_1, \ldots, E_n$ be i.i.d. [exponential](https://en.wikipedia.org/wiki/Exponential_distribution) random variables with mean $1$ and let $S = E_1 + \cdots + E_n$. The joint density of the $E_i$ is $e^{-(e_1 + \cdots + e_n)}$, a function of the sum alone, so conditional on $S$ the vector $(E_1, \ldots, E_n)$ is uniform on the simplex of total $S$; equivalently, $(E_1/S, \ldots, E_n/S)$ is uniform on the unit simplex and independent of $S$. The gaps have the same law as $E_i/S$.

Order statistics of exponentials follow from memorylessness. The minimum of $n$ exponentials with mean $1$ is exponential with mean $1/n$; given the minimum, the excesses of the other $n-1$ variables over it are again i.i.d. exponential with mean $1$, so the second smallest exceeds the smallest by an exponential with mean $1/(n-1)$, and so on up the order. This is [Rényi's representation](https://doi.org/10.1007/BF02127580) (1953):

$$
E_{(k)} \;\stackrel{d}{=}\; \frac{Z_1}{n} + \frac{Z_2}{n-1} + \cdots + \frac{Z_k}{n-k+1}, \qquad Z_j \text{ i.i.d. exponential with mean } 1.
$$

Since $G_{(k)} = E_{(k)}/S$ is independent of $S$, taking expectations gives $\mathbb{E}[E_{(k)}] = \mathbb{E}[G_{(k)}]\,\mathbb{E}[S] = n\,\mathbb{E}[G_{(k)}]$, and therefore

$$
\mathbb{E}[G_{(k)}] = \frac{1}{n}\sum_{j=1}^{k} \frac{1}{n - j + 1}, \qquad
\mathbb{E}[G_{\min}] = \frac{1}{n^2}, \qquad
\mathbb{E}[G_{\max}] = \frac{H_n}{n}.
$$

In units of the average gap $1/n$: the smallest gap is $1/n$ of an average gap, the median gap ($k = n/2$) is $H_n - H_{n/2} \approx \ln 2 = 0.69$ average gaps, and the largest is $H_n$ average gaps. The largest gap grows like $\ln n$ average gaps and the smallest shrinks like $1/n$ of one. The expected largest gap, in units of the average gap:

| $n$ | 10 | 100 | 1,000 | $10^6$ |
| --- | --- | --- | --- | --- |
| $H_n$ | 2.93 | 5.19 | 7.49 | 14.39 |

## The exact distribution of the largest gap

All gaps are at most $x$ exactly when none exceeds $x$, and inclusion–exclusion over the events $\{G_i > x\}$ needs only one fact: for any $k$ specified gaps,

$$
\mathbb{P}(G_{i_1} > x, \ldots, G_{i_k} > x) = (1 - kx)_+^{\,n-1}.
$$

Subtracting $x$ from each of the $k$ gaps leaves a vector uniform on a simplex of total $1 - kx$, and the volume of that simplex relative to the full one is $(1 - kx)^{n-1}$ (the simplex has dimension $n - 1$). Hence

$$
\mathbb{P}(G_{\max} \le x) = \sum_{k=0}^{\lfloor 1/x \rfloor} (-1)^k \binom{n}{k} (1 - kx)^{n-1}.
$$

For $x \ge \tfrac12$ only the terms $k = 0, 1$ survive, and $\mathbb{P}(G_{\max} > \tfrac12) = n\,2^{1-n}$ is the probability that all $n$ points fit in some semicircle, a classical problem. At the other end, $\mathbb{P}(G_{\min} > x) = (1 - nx)^{n-1}$ is the single term $k = n$ (every gap exceeds $x$), so the probability that some two of the points lie within distance $x$ of each other is $1 - (1 - nx)^{n-1} \approx 1 - e^{-n^2 x}$, the continuous form of the [birthday problem](https://en.wikipedia.org/wiki/Birthday_problem); in units of $1/n^2$ the smallest gap is asymptotically exponential.

For the largest gap, put $x = (\ln n + y)/n$. Then $\binom{n}{k} \approx n^k/k!$ and $(1 - kx)^{n-1} \approx e^{-k(\ln n + y)} = n^{-k}e^{-ky}$, so term by term the sum tends to $\sum_k (-1)^k e^{-ky}/k!$:

$$
\mathbb{P}\bigl(n\,G_{\max} - \ln n \le y\bigr) \;\longrightarrow\; \exp\bigl(-e^{-y}\bigr),
$$

the [Gumbel distribution](https://en.wikipedia.org/wiki/Gumbel_distribution), whose mean is Euler's constant $\gamma = 0.5772$, in agreement with $H_n - \ln n \to \gamma$. The largest gap is $\ln n$ average gaps plus a Gumbel-distributed number of average gaps: its mean grows with $n$, but its fluctuations stay of the same order as a single average gap. The widget draws a sample on the left and, on the right, the exact density of $n\,G_{\max}$ from the alternating sum, with the Gumbel limit and an adjustable threshold:

<div class="lg1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>points n =&nbsp;<strong id="lg1-nval" style="display: inline-block; min-width: 3em;">100</strong></span><input id="lg1-n" type="range" min="2" max="1000" step="1" value="100" style="flex: 1; min-width: 150px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>threshold c =&nbsp;<strong id="lg1-cval" style="display: inline-block; min-width: 2.6em;">3.0</strong> × average gap</span><input id="lg1-c" type="range" min="1" max="15" step="0.1" value="3" style="flex: 1; min-width: 150px; accent-color: #d97706;"></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#2563eb" stroke-width="2.5"/></svg> exact density of n·G<sub>max</sub></span><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#d97706" stroke-width="2" stroke-dasharray="4 3"/></svg> Gumbel limit, shifted by ln n</span><span style="white-space: nowrap;"><svg width="22" height="12" viewBox="0 0 22 12" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="6" x2="21" y2="6" stroke="#dc2626" stroke-width="2.5"/></svg> largest gap in the sample</span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; align-items: start;"><div><svg id="lg1-ring" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="A circle with n random points; the largest gap between consecutive points is highlighted in red."></svg><div style="display: flex; gap: 0.5rem 1rem; align-items: center; flex-wrap: wrap; margin-top: 0.4rem; font-size: 0.9em;"><button id="lg1-resample" type="button" style="padding: 0.25rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">new sample</button><span>largest gap here: <strong id="lg1-samp" style="display: inline-block; min-width: 3.6em;">—</strong> × average</span></div></div><svg id="lg1-plot" viewBox="0 0 320 240" style="width: 100%; height: auto; display: block;" aria-label="The exact probability density of the largest gap measured in units of the average gap, with the Gumbel limit and a vertical line at the threshold c."></svg></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 0.75rem; font-size: 0.95em;"><span>expected largest gap = <strong id="lg1-mean" style="display: inline-block; min-width: 3.4em;">—</strong> × average</span><span>expected smallest gap = average / <strong id="lg1-min" style="display: inline-block; min-width: 3em;">—</strong></span><span>P(largest gap &gt; c × average) = <strong id="lg1-prob" style="display: inline-block; min-width: 3.6em;">—</strong></span></div></div>
<script>
(function () {
  var nSlider = document.getElementById('lg1-n');
  if (!nSlider) return;
  var cSlider = document.getElementById('lg1-c');
  var nDisp = document.getElementById('lg1-nval');
  var cDisp = document.getElementById('lg1-cval');
  var meanDisp = document.getElementById('lg1-mean');
  var minDisp = document.getElementById('lg1-min');
  var probDisp = document.getElementById('lg1-prob');
  var sampDisp = document.getElementById('lg1-samp');
  var ringSvg = document.getElementById('lg1-ring');
  var plotSvg = document.getElementById('lg1-plot');
  var btn = document.getElementById('lg1-resample');
  var BLUE = '#2563eb', RED = '#dc2626', AMB = '#d97706';
  var pts = null, ptsN = -1;
  function lnfact(n) { var a = [0]; for (var i = 1; i <= n; i++) a.push(a[i - 1] + Math.log(i)); return a; }
  function cdf(lnf, n, y) {
    if (y <= 1) return 0;
    if (y >= n) return 1;
    var x = y / n, s = 0, K = Math.floor(1 / x);
    for (var k = 0; k <= K; k++) {
      var b = 1 - k * x;
      if (b <= 0) break;
      var t = Math.exp(lnf[n] - lnf[k] - lnf[n - k] + (n - 1) * Math.log(b));
      if (t > 1e9) return 0;
      s += (k % 2 === 0) ? t : -t;
    }
    return Math.min(1, Math.max(0, s));
  }
  function pdf(lnf, n, y) {
    if (y <= 1 || y >= n) return 0;
    var x = y / n, s = 0, K = Math.floor(1 / x);
    for (var k = 1; k <= K; k++) {
      var b = 1 - k * x;
      if (b <= 0) break;
      var t = Math.exp(lnf[n] - lnf[k] - lnf[n - k] + Math.log(k) + Math.log(n - 1) + (n - 2) * Math.log(b));
      if (t > 1e9) return 0;
      s += (k % 2 === 1) ? t : -t;
    }
    return Math.max(0, s / n);
  }
  function sample(n) {
    var p = [];
    for (var i = 0; i < n; i++) p.push(Math.random());
    p.sort(function (a, b) { return a - b; });
    return p;
  }
  function drawRing(n) {
    var cx = 160, cy = 120, R = 96;
    var best = -1, bi = 0;
    for (var i = 0; i < n; i++) {
      var g = (i === n - 1) ? 1 - pts[i] + pts[0] : pts[i + 1] - pts[i];
      if (g > best) { best = g; bi = i; }
    }
    var out = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5"/>';
    var a0 = 2 * Math.PI * pts[bi], a1 = a0 + 2 * Math.PI * best;
    var x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    out += '<path d="M' + x0.toFixed(1) + ',' + y0.toFixed(1) + 'A' + R + ',' + R + ' 0 ' + (best > 0.5 ? 1 : 0) + ',1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) + '" fill="none" stroke="' + RED + '" stroke-width="4"/>';
    var r = n <= 60 ? 2.6 : (n <= 300 ? 1.7 : 1.1);
    for (var j = 0; j < n; j++) {
      var a = 2 * Math.PI * pts[j];
      out += '<circle cx="' + (cx + R * Math.cos(a)).toFixed(1) + '" cy="' + (cy + R * Math.sin(a)).toFixed(1) + '" r="' + r + '" fill="' + BLUE + '"/>';
    }
    ringSvg.innerHTML = out;
    sampDisp.textContent = (best * n).toFixed(2);
  }
  function drawPlot(lnf, n, c) {
    var X0 = 30, X1 = 310, Y0 = 16, Y1 = 206;
    var xmax = Math.max(Math.log(n) + 7, 5), M = 300;
    var ys = [], gs = [], ymax = 0.05;
    for (var i = 0; i <= M; i++) {
      var y = xmax * i / M;
      var f = pdf(lnf, n, y), z = y - Math.log(n), g = Math.exp(-z - Math.exp(-z));
      ys.push(f); gs.push(g);
      if (f > ymax) ymax = f;
      if (g > ymax) ymax = g;
    }
    ymax *= 1.1;
    function px(y) { return X0 + (X1 - X0) * y / xmax; }
    function py(v) { return Y1 - (Y1 - Y0) * v / ymax; }
    var out = '<line x1="' + X0 + '" y1="' + Y1 + '" x2="' + X1 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    var pg = '', pf = '';
    for (var i2 = 0; i2 <= M; i2++) {
      var yy = xmax * i2 / M;
      pg += (i2 === 0 ? 'M' : 'L') + px(yy).toFixed(1) + ',' + py(gs[i2]).toFixed(1);
      pf += (i2 === 0 ? 'M' : 'L') + px(yy).toFixed(1) + ',' + py(ys[i2]).toFixed(1);
    }
    out += '<path d="' + pg + '" fill="none" stroke="' + AMB + '" stroke-width="2" stroke-dasharray="4 3"/>';
    out += '<path d="' + pf + '" fill="none" stroke="' + BLUE + '" stroke-width="2.5"/>';
    if (c <= xmax) out += '<line x1="' + px(c).toFixed(1) + '" y1="' + Y0 + '" x2="' + px(c).toFixed(1) + '" y2="' + Y1 + '" stroke="' + AMB + '" stroke-width="1.5"/>';
    var step = xmax > 12 ? 4 : 2;
    for (var t = 0; t <= xmax; t += step) out += '<text x="' + px(t).toFixed(1) + '" y="' + (Y1 + 14) + '" text-anchor="middle" font-size="11" fill="currentColor">' + t + '</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y1 + 30) + '" text-anchor="middle" font-size="11" fill="currentColor">largest gap, in units of the average gap</text>';
    out += '<text x="' + X0 + '" y="' + (Y0 - 2) + '" font-size="11" fill="currentColor">density</text>';
    plotSvg.innerHTML = out;
  }
  function render(resample) {
    var n = parseInt(nSlider.value, 10), c = parseFloat(cSlider.value);
    var lnf = lnfact(n);
    if (resample || n !== ptsN) { pts = sample(n); ptsN = n; }
    var H = 0;
    for (var j = 1; j <= n; j++) H += 1 / j;
    nDisp.textContent = n;
    cDisp.textContent = c.toFixed(1);
    meanDisp.textContent = H.toFixed(3);
    minDisp.textContent = n;
    probDisp.textContent = (1 - cdf(lnf, n, c)).toFixed(4);
    drawRing(n);
    drawPlot(lnf, n, c);
  }
  nSlider.addEventListener('input', function () { render(false); });
  cSlider.addEventListener('input', function () { render(false); });
  btn.addEventListener('click', function () { render(true); });
  render(true);
})();
</script>

## Consistent hashing

[Karger and coauthors (1997)](https://doi.org/10.1145/258533.258660) proposed the following way to spread keys over servers so that adding or removing a server disturbs as little as possible. Hash each server to a point on a ring, hash each key to a point on the same ring, and assign each key to the first server clockwise from it. When a server joins or leaves, only the keys on one arc move. The share of keys a server receives is the length of the arc it owns, which is exactly one of the gaps above. So the busiest server's share is $G_{\max}$: on average $H_n$ times the fair share $1/n$, and the imbalance grows with $n$. With $100$ servers the busiest holds $5.2$ times its share on average, and the probability that some server holds more than three times its share is $0.9992$; with $1{,}000$ servers the busiest holds $7.5$ times its share.

The remedy in the same paper is to hash each server to $v$ points instead of one, the **virtual nodes** of later systems. A server's share is then the sum of $v$ of the $nv$ gaps, and by exchangeability that sum has the [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with parameters $v$ and $(n-1)v$: mean $1/n$ as before, and relative standard deviation $\sqrt{(n-1)/(nv+1)} \approx 1/\sqrt{v}$. A hundred virtual nodes per server bring the typical deviation from the fair share down to about 10%, and the largest of the $n$ shares to roughly $1 + \sqrt{2\ln n / v}$ times the average (a Gaussian approximation to the beta law, with a union bound over the servers), about $1.3$ for a hundred servers with a hundred virtual nodes each. Karger and coauthors prove that $O(\log n)$ points per server suffice to bring the largest share within a constant factor of $1/n$ with high probability, and production systems such as [Dynamo](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) assign each server many positions on the ring for this reason.

## Related problems

- **Fisher's test for a hidden periodicity.** For a time series of Gaussian white noise, the ordinates of the [periodogram](https://en.wikipedia.org/wiki/Periodogram) are i.i.d. exponentials, and normalized by their sum they are exactly uniform spacings. [Fisher's 1929 test](https://doi.org/10.1098/rspa.1929.0151) rejects white noise when the largest normalized ordinate is too large, and the alternating sum above is the null distribution he derived for it.
- **Covering the circle with arcs.** Place an arc of length $a$ clockwise from each of the $n$ points. The arcs cover the circle exactly when no gap exceeds $a$, so the coverage probability is $\mathbb{P}(G_{\max} \le a)$, the formula [Stevens (1939)](https://doi.org/10.1111/j.1469-1809.1939.tb02216.x) obtained for the covering problem.
- **Poisson arrivals.** Conditional on a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process) having $n$ arrivals in a window, the arrival times are i.i.d. uniform in the window, so the longest interval without an arrival is the largest gap, and the exponential representation is the Poisson process itself, before conditioning on the count.

The theory of spacings between order statistics is surveyed in [Pyke (1965)](https://doi.org/10.1111/j.2517-6161.1965.tb00602.x), the general distribution theory for functions of the gaps goes back to [Darling (1953)](https://doi.org/10.1214/aoms/1177729030), and [Holst (1980)](https://doi.org/10.2307/3212956) derives the limit laws for the $j$-th longest piece from the exponential representation alone.

## References

- Ronald A. Fisher. *Tests of significance in harmonic analysis*. Proceedings of the Royal Society A, 125(796):54–59, 1929. The exact distribution of the largest normalized periodogram ordinate, which is the largest-gap formula.
- W. L. Stevens. *Solution to a geometrical problem in probability*. Annals of Eugenics, 9(4):315–320, 1939. Covering the circle by $n$ random arcs of equal length.
- Alfréd Rényi. *On the theory of order statistics*. Acta Mathematica Academiae Scientiarum Hungaricae, 4:191–231, 1953. The representation of exponential order statistics as sums of independent exponentials.
- D. A. Darling. *On a class of problems related to the random division of an interval*. Annals of Mathematical Statistics, 24(2):239–253, 1953. The characteristic-function method for statistics built from the gaps.
- Ronald Pyke. *Spacings*. Journal of the Royal Statistical Society, Series B, 27(3):395–436, 1965. The survey of the subject.
- Lars Holst. *On the lengths of the pieces of a stick broken at random*. Journal of Applied Probability, 17(3):623–634, 1980. Limit laws for the ordered pieces from the exponential representation.
- David Karger, Eric Lehman, Tom Leighton, Rina Panigrahy, Matthew Levine, Daniel Lewin. *Consistent hashing and random trees: distributed caching protocols for relieving hot spots on the World Wide Web*. Proceedings of the 29th ACM Symposium on Theory of Computing, pages 654–663, 1997. Consistent hashing and the $O(\log n)$ virtual copies.
- Giuseppe DeCandia et al. *Dynamo: Amazon's highly available key-value store*. Proceedings of the 21st ACM Symposium on Operating Systems Principles, pages 205–220, 2007. Virtual nodes in a production system.
