---
author: Aseem Baranwal
pubDatetime: 2025-10-12T21:22:00Z
title: The 100 prisoners problem
slug: 100-prisoners-problem
featured: false
draft: false
tags:
  - mathematics
description:
  100 prisoners must each find their own number among 100 randomly filled boxes, opening at most 50 each. Random guessing succeeds with probability one in a nonillion. A particular cycle-following strategy succeeds about 31% of the time. The reason is the cycle structure of a random permutation.
---

A puzzle that sounds impossible at first reading: 100 prisoners are numbered $1$ through $100$. There are $100$ sealed boxes in a room, each containing one of the numbers $1$ through $100$, randomly assigned (each used exactly once). Each prisoner enters the room one at a time, opens at most $50$ boxes, and must find the box containing their own number. If even one prisoner fails, all $100$ are executed. The prisoners may agree on a strategy beforehand but may not communicate once the procession starts.

Random guessing gives each prisoner a $50/100 = 1/2$ chance of finding their number, so the probability of *all* succeeding is $(1/2)^{100} \approx 8 \times 10^{-31}$. Effectively zero.

A specific strategy succeeds with probability $\approx 31.18\%$.

## The strategy

Number the boxes $1$ through $100$. Prisoner $i$ first opens box $i$. They read the number inside, say $j_1$. Next they open box $j_1$, read $j_2$, then box $j_2$, and so on, until they either find their own number $i$ or have opened $50$ boxes.

That is the entire strategy.

## Where the success rate comes from

The contents of the boxes define a [permutation](https://en.wikipedia.org/wiki/Permutation) $\pi$ of $\{1, \ldots, 100\}$, where $\pi(i)$ is the number in box $i$. Prisoner $i$, following the strategy, traverses the cycle of $\pi$ that contains $i$:

$$
i \;\to\; \pi(i) \;\to\; \pi^2(i) \;\to\; \cdots \;\to\; \pi^k(i) = i,
$$

where $k$ is the length of that cycle. Prisoner $i$ finds their own number at step $k$, which fits in the $50$-box budget iff $k \le 50$.

Because every prisoner uses the same strategy, *all* prisoners succeed iff *every* cycle of $\pi$ has length at most $50$. The fate of all $100$ prisoners is determined by a single property of one random permutation: whether its longest cycle exceeds $50$.

## The probability

For a uniformly random permutation of $\{1, \ldots, n\}$, the probability that there is at least one cycle of length exactly $\ell$ is $1/\ell$ when $\ell > n/2$. The counting argument: the number of permutations of $\{1, \ldots, n\}$ that contain a fixed $\ell$-element subset arranged as a single cycle is $(\ell - 1)! \cdot (n - \ell)!$. The number of such $\ell$-subsets is $\binom{n}{\ell}$. Multiplying and dividing by $n!$ gives $1/\ell$.

When $\ell > n/2$, at most one cycle of that length can exist (two would overflow the permutation). So the events "permutation has a cycle of length $\ell$" for distinct $\ell > n/2$ are disjoint, and

$$
\Pr[L > k] \;=\; \sum_{\ell = k+1}^{n} \frac{1}{\ell} \;=\; H_n - H_k, \qquad k > n/2,
$$

where $L$ is the length of the longest cycle and $H_m = 1 + 1/2 + \cdots + 1/m$ is the $m$-th [harmonic number](https://en.wikipedia.org/wiki/Harmonic_number). As $n \to \infty$ with $k = n/2$, this approaches $\ln 2 \approx 0.6931$, so

$$
\Pr[\text{success}] \;=\; 1 - \Pr[L > 50] \;\xrightarrow[n \to \infty]{}\; 1 - \ln 2 \;\approx\; 0.3069.
$$

For $n = 100$ specifically, the exact value is $1 - (H_{100} - H_{50}) \approx 0.3118$.

The strategy converts the prisoners' problem from $(1/2)^{100}$ chaos into a single $31\%$ check on the cycle structure of a random permutation.

Press **new trial** to draw a random permutation. The grid below shows what each prisoner would find inside each box. Boxes are colored by which cycle of the permutation they belong to. The cycle outlined in red is the longest one. The trial succeeds if and only if no cycle exceeds $50$. Press **+ 1000 trials** to accumulate statistics.

<div class="pp-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.92em;"><button id="pp-new" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">new trial</button><button id="pp-batch" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">+ 1000 trials</button><button id="pp-reset" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">reset</button><span>trials: <strong id="pp-trials">0</strong></span><span>successes: <strong id="pp-success">0</strong></span><span>empirical: <strong id="pp-rate">—</strong></span><span>theoretical: <strong>31.18%</strong></span><span>longest cycle this trial: <strong id="pp-maxc">—</strong></span><span id="pp-status" style="font-style: italic;"></span></div><svg id="pp-svg" viewBox="0 0 720 540" style="width: 100%; height: auto;" aria-label="100-box grid colored by cycle membership, plus a histogram of longest cycle lengths over trials."></svg></div>
<script>
(function () {
  var newBtn = document.getElementById('pp-new');
  if (!newBtn) return;
  var batchBtn = document.getElementById('pp-batch');
  var resetBtn = document.getElementById('pp-reset');
  var trialsDisp = document.getElementById('pp-trials');
  var successDisp = document.getElementById('pp-success');
  var rateDisp = document.getElementById('pp-rate');
  var maxCDisp = document.getElementById('pp-maxc');
  var statusDisp = document.getElementById('pp-status');
  var svg = document.getElementById('pp-svg');
  var n = 100;
  var totalTrials = 0;
  var totalSuccess = 0;
  var maxCycleHist = new Array(n + 1);
  for (var i = 0; i <= n; i++) maxCycleHist[i] = 0;
  function permutation() {
    var p = new Array(n);
    for (var i = 0; i < n; i++) p[i] = i;
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = p[i]; p[i] = p[j]; p[j] = t;
    }
    return p;
  }
  function cycleAnalysis(p) {
    var visited = new Array(n);
    for (var i = 0; i < n; i++) visited[i] = false;
    var cid = new Array(n);
    var lens = [];
    var idx = 0;
    for (var i = 0; i < n; i++) {
      if (visited[i]) continue;
      var j = i;
      var len = 0;
      while (!visited[j]) {
        visited[j] = true;
        cid[j] = idx;
        j = p[j];
        len++;
      }
      lens.push(len);
      idx++;
    }
    var maxLen = 0;
    var maxIdx = 0;
    for (var k = 0; k < lens.length; k++) {
      if (lens[k] > maxLen) { maxLen = lens[k]; maxIdx = k; }
    }
    return { cid: cid, lens: lens, maxLen: maxLen, maxIdx: maxIdx };
  }
  function render(p, a) {
    var w = 720, h = 540;
    var gridX = 32, gridY = 30, cellSize = 28, gap = 2;
    var hxPad = 32, hyOff = 380, hHeight = 110;
    var s = '';
    for (var i = 0; i < 100; i++) {
      var col = i % 10;
      var row = Math.floor(i / 10);
      var x = gridX + col * (cellSize + gap);
      var y = gridY + row * (cellSize + gap);
      var hue = (a.cid[i] * 137) % 360;
      var isMax = a.cid[i] === a.maxIdx;
      var fill = 'hsl(' + hue + ', 55%, 72%)';
      var stroke = isMax ? '#dc2626' : 'currentColor';
      var strokeW = isMax ? 2.2 : 0.5;
      s += '<rect x="' + x + '" y="' + y + '" width="' + cellSize + '" height="' + cellSize + '" fill="' + fill + '" fill-opacity="0.9" stroke="' + stroke + '" stroke-width="' + strokeW + '"/>';
      s += '<text x="' + (x + cellSize / 2) + '" y="' + (y + cellSize / 2 + 4) + '" text-anchor="middle" font-size="10" fill="#1a1a1a">' + (p[i] + 1) + '</text>';
    }
    s += '<text x="' + gridX + '" y="' + (gridY - 10) + '" font-size="11" fill="currentColor">box label = number found inside; color = cycle id; red border = longest cycle</text>';
    var histArea = w - 2 * hxPad;
    var bw = histArea / n;
    var maxCount = 1;
    for (var i = 1; i <= n; i++) if (maxCycleHist[i] > maxCount) maxCount = maxCycleHist[i];
    s += '<line x1="' + hxPad + '" y1="' + (hyOff + hHeight) + '" x2="' + (w - hxPad) + '" y2="' + (hyOff + hHeight) + '" stroke="currentColor" stroke-opacity="0.4"/>';
    for (var i = 1; i <= n; i++) {
      if (maxCycleHist[i] === 0) continue;
      var bx = hxPad + (i - 1) * bw;
      var bh = (maxCycleHist[i] / maxCount) * hHeight;
      var by = hyOff + hHeight - bh;
      var color = i > 50 ? '#dc2626' : '#16a34a';
      s += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + (bw * 0.9).toFixed(1) + '" height="' + bh.toFixed(1) + '" fill="' + color + '" fill-opacity="0.7"/>';
    }
    var lineX = hxPad + 50 * bw;
    s += '<line x1="' + lineX + '" y1="' + hyOff + '" x2="' + lineX + '" y2="' + (hyOff + hHeight) + '" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>';
    s += '<text x="' + lineX + '" y="' + (hyOff - 4) + '" text-anchor="middle" font-size="11" fill="currentColor">50 (success threshold)</text>';
    for (var t = 0; t <= 100; t += 25) {
      var tx = hxPad + t * bw;
      s += '<text x="' + tx + '" y="' + (hyOff + hHeight + 16) + '" text-anchor="middle" font-size="10" fill="currentColor">' + t + '</text>';
    }
    s += '<text x="' + (w / 2) + '" y="' + (hyOff + hHeight + 32) + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">distribution of longest cycle length over trials (red bars = trial failed)</text>';
    svg.innerHTML = s;
  }
  function runOne() {
    var p = permutation();
    var a = cycleAnalysis(p);
    totalTrials++;
    if (a.maxLen <= 50) totalSuccess++;
    maxCycleHist[a.maxLen]++;
    return { p: p, a: a };
  }
  function updateStats(a) {
    trialsDisp.textContent = totalTrials;
    successDisp.textContent = totalSuccess;
    rateDisp.textContent = totalTrials === 0 ? '—' : (100 * totalSuccess / totalTrials).toFixed(1) + '%';
    maxCDisp.textContent = a ? a.maxLen : '—';
    if (a) {
      var ok = a.maxLen <= 50;
      statusDisp.textContent = ok ? 'success: every cycle ≤ 50' : 'failure: a cycle exceeds 50';
      statusDisp.style.color = ok ? '#16a34a' : '#dc2626';
    } else {
      statusDisp.textContent = '';
    }
  }
  newBtn.addEventListener('click', function () {
    var r = runOne();
    render(r.p, r.a);
    updateStats(r.a);
  });
  batchBtn.addEventListener('click', function () {
    var lastR;
    for (var i = 0; i < 1000; i++) lastR = runOne();
    render(lastR.p, lastR.a);
    updateStats(lastR.a);
  });
  resetBtn.addEventListener('click', function () {
    totalTrials = 0;
    totalSuccess = 0;
    for (var i = 0; i <= n; i++) maxCycleHist[i] = 0;
    var p = permutation();
    var a = cycleAnalysis(p);
    render(p, a);
    updateStats(null);
  });
  var p0 = permutation();
  var a0 = cycleAnalysis(p0);
  render(p0, a0);
})();
</script>

A note on optimality: this is also (asymptotically) the *best* possible strategy. No strategy can succeed with probability much above $1 - \ln 2$ in the large-$n$ limit (Curtin and Warshauer, 2006). The cycle-following strategy is essentially as good as the prisoners can do.

## References

- Anna Gál, Peter Bro Miltersen. *The cell probe complexity of succinct data structures*. Theoretical Computer Science, 379(3):405-417, 2007. (Where the puzzle first appears in the literature.)
- Eugene Curtin, Max Warshauer. *The locker puzzle*. The Mathematical Intelligencer, 28(1):28-31, 2006.
- Philippe Flajolet, Robert Sedgewick. *Analytic Combinatorics*. Cambridge University Press, 2009. Chapter II covers the cycle structure of random permutations in detail.
