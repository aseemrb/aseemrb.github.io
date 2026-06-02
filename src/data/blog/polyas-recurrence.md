---
author: Aseem Baranwal
pubDatetime: 2026-04-25T15:22:00Z
title: Pólya's recurrence theorem
slug: polyas-recurrence
featured: false
draft: false
tags:
  - mathematics
description:
  Simple random walk on the integer lattice returns to the origin with probability one in 1D and 2D. In 3D and higher, there is a positive probability of never returning. The transition is exact, dimension-dependent, and reduces to convergence of a single harmonic-style series.
---

The drunkard wandering along a sidewalk almost surely returns home. The drunkard wandering across a city almost surely returns home. The bird flying through three-dimensional space, taking unit-length steps in random directions, may never return: there is a positive probability of escaping to infinity, never to come back.

This is **Pólya's recurrence theorem** (Pólya, 1921): on the integer lattice $\mathbb{Z}^d$, a [simple random walk](https://en.wikipedia.org/wiki/Random_walk) (each step picks one of the $2d$ unit-vector directions uniformly) returns to the origin with probability $1$ if and only if $d \le 2$.

The phase transition is precisely at $d = 2$. In $d = 3$ the walk returns with probability about $0.3405$, known as **Pólya's constant**. The probability shrinks further in higher dimensions.

Three independent walks running in 1D, 2D, and 3D below. The current walk in each panel restarts when it hits the origin (a return) or after $3000$ steps (give up). The counter shows the empirical fraction of walks that have returned.

<div class="po-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.92em;"><button id="po-pause" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">pause</button><button id="po-reset" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">reset stats</button></div><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;"><div style="text-align: center;"><div style="font-weight: 600; margin-bottom: 0.25rem;">1D</div><svg id="po-svg1" viewBox="0 0 240 240" style="width: 100%; max-width: 240px; height: auto; border: 1px solid currentColor; border-color: rgba(127,127,127,0.3);" aria-label="1D random walk position over time."></svg><div style="font-size: 0.85em; margin-top: 0.4rem;">walks: <strong id="po-w1">0</strong> · returns: <strong id="po-r1">0</strong> · rate: <strong id="po-pct1">—</strong></div></div><div style="text-align: center;"><div style="font-weight: 600; margin-bottom: 0.25rem;">2D</div><svg id="po-svg2" viewBox="0 0 240 240" style="width: 100%; max-width: 240px; height: auto; border: 1px solid currentColor; border-color: rgba(127,127,127,0.3);" aria-label="2D random walk path."></svg><div style="font-size: 0.85em; margin-top: 0.4rem;">walks: <strong id="po-w2">0</strong> · returns: <strong id="po-r2">0</strong> · rate: <strong id="po-pct2">—</strong></div></div><div style="text-align: center;"><div style="font-weight: 600; margin-bottom: 0.25rem;">3D</div><svg id="po-svg3" viewBox="0 0 240 240" style="width: 100%; max-width: 240px; height: auto; border: 1px solid currentColor; border-color: rgba(127,127,127,0.3);" aria-label="3D random walk projected to xy plane."></svg><div style="font-size: 0.85em; margin-top: 0.4rem;">walks: <strong id="po-w3">0</strong> · returns: <strong id="po-r3">0</strong> · rate: <strong id="po-pct3">—</strong></div></div></div></div>
<script>
(function () {
  var pauseBtn = document.getElementById('po-pause');
  if (!pauseBtn) return;
  var resetBtn = document.getElementById('po-reset');
  var svgs = [document.getElementById('po-svg1'), document.getElementById('po-svg2'), document.getElementById('po-svg3')];
  var disps = [
    { w: document.getElementById('po-w1'), r: document.getElementById('po-r1'), p: document.getElementById('po-pct1') },
    { w: document.getElementById('po-w2'), r: document.getElementById('po-r2'), p: document.getElementById('po-pct2') },
    { w: document.getElementById('po-w3'), r: document.getElementById('po-r3'), p: document.getElementById('po-pct3') }
  ];
  var maxSteps = 3000;
  var state = [];
  for (var d = 0; d < 3; d++) state.push(freshWalk(d));
  var stats = [{ w: 0, r: 0 }, { w: 0, r: 0 }, { w: 0, r: 0 }];
  var paused = false;
  function freshWalk(d) {
    var pos = new Array(d + 1);
    for (var i = 0; i <= d; i++) pos[i] = 0;
    return { pos: pos, steps: 0, path: [pos.slice()] };
  }
  function step(d) {
    var s = state[d];
    var dim = Math.floor(Math.random() * (d + 1));
    var sign = Math.random() < 0.5 ? -1 : 1;
    s.pos[dim] += sign;
    s.steps++;
    s.path.push(s.pos.slice());
  }
  function isOrigin(d) {
    var s = state[d];
    for (var i = 0; i < s.pos.length; i++) if (s.pos[i] !== 0) return false;
    return true;
  }
  function maybeReset(d) {
    var s = state[d];
    if (s.steps >= 2 && isOrigin(d)) {
      stats[d].w++; stats[d].r++;
      state[d] = freshWalk(d);
      return true;
    }
    if (s.steps >= maxSteps) {
      stats[d].w++;
      state[d] = freshWalk(d);
      return true;
    }
    return false;
  }
  function render(d) {
    var path = state[d].path;
    var size = 240;
    var pad = 18;
    var s = '';
    if (d === 0) {
      var maxT = Math.max(80, state[0].steps);
      var minP = 0, maxP = 0;
      for (var i = 0; i < path.length; i++) { if (path[i][0] < minP) minP = path[i][0]; if (path[i][0] > maxP) maxP = path[i][0]; }
      var rangeP = Math.max(20, Math.max(-minP, maxP) * 1.2);
      s += '<line x1="' + pad + '" y1="' + (size / 2) + '" x2="' + (size - pad) + '" y2="' + (size / 2) + '" stroke="currentColor" stroke-opacity="0.2" stroke-dasharray="3 3"/>';
      var pts = '';
      for (var i = 0; i < path.length; i++) {
        var px = pad + (i / maxT) * (size - 2 * pad);
        var py = size / 2 - (path[i][0] / rangeP) * (size / 2 - pad);
        pts += px.toFixed(1) + ',' + py.toFixed(1) + ' ';
      }
      s += '<polyline points="' + pts + '" stroke="#2563eb" stroke-width="1.2" fill="none"/>';
      s += '<text x="' + pad + '" y="' + (size - 4) + '" font-size="10" fill="currentColor">time →</text>';
    } else if (d === 1) {
      var minX = 0, maxX = 0, minY = 0, maxY = 0;
      for (var i = 0; i < path.length; i++) {
        if (path[i][0] < minX) minX = path[i][0]; if (path[i][0] > maxX) maxX = path[i][0];
        if (path[i][1] < minY) minY = path[i][1]; if (path[i][1] > maxY) maxY = path[i][1];
      }
      var range = Math.max(15, Math.max(-minX, maxX, -minY, maxY) * 1.2);
      var cx = size / 2, cy = size / 2;
      var sc = (size / 2 - pad) / range;
      s += '<line x1="' + pad + '" y1="' + cy + '" x2="' + (size - pad) + '" y2="' + cy + '" stroke="currentColor" stroke-opacity="0.15"/>';
      s += '<line x1="' + cx + '" y1="' + pad + '" x2="' + cx + '" y2="' + (size - pad) + '" stroke="currentColor" stroke-opacity="0.15"/>';
      var pts = '';
      for (var i = 0; i < path.length; i++) {
        var px = cx + path[i][0] * sc;
        var py = cy - path[i][1] * sc;
        pts += px.toFixed(1) + ',' + py.toFixed(1) + ' ';
      }
      s += '<polyline points="' + pts + '" stroke="#16a34a" stroke-width="1.1" fill="none" stroke-opacity="0.85"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#16a34a"/>';
    } else {
      var minX = 0, maxX = 0, minY = 0, maxY = 0, minZ = 0, maxZ = 0;
      for (var i = 0; i < path.length; i++) {
        if (path[i][0] < minX) minX = path[i][0]; if (path[i][0] > maxX) maxX = path[i][0];
        if (path[i][1] < minY) minY = path[i][1]; if (path[i][1] > maxY) maxY = path[i][1];
        if (path[i][2] < minZ) minZ = path[i][2]; if (path[i][2] > maxZ) maxZ = path[i][2];
      }
      var range = Math.max(15, Math.max(-minX, maxX, -minY, maxY) * 1.2);
      var cx = size / 2, cy = size / 2;
      var sc = (size / 2 - pad) / range;
      s += '<line x1="' + pad + '" y1="' + cy + '" x2="' + (size - pad) + '" y2="' + cy + '" stroke="currentColor" stroke-opacity="0.15"/>';
      s += '<line x1="' + cx + '" y1="' + pad + '" x2="' + cx + '" y2="' + (size - pad) + '" stroke="currentColor" stroke-opacity="0.15"/>';
      var maxAbsZ = Math.max(1, Math.max(-minZ, maxZ));
      for (var i = 1; i < path.length; i++) {
        var px1 = cx + path[i-1][0] * sc;
        var py1 = cy - path[i-1][1] * sc;
        var px2 = cx + path[i][0] * sc;
        var py2 = cy - path[i][1] * sc;
        var z = path[i][2];
        var hue = z >= 0 ? 25 : 220;
        var light = 55 - 25 * (Math.abs(z) / maxAbsZ);
        s += '<line x1="' + px1.toFixed(1) + '" y1="' + py1.toFixed(1) + '" x2="' + px2.toFixed(1) + '" y2="' + py2.toFixed(1) + '" stroke="hsl(' + hue + ',60%,' + light.toFixed(0) + '%)" stroke-width="1.1" stroke-opacity="0.85"/>';
      }
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#dc2626"/>';
      s += '<text x="' + pad + '" y="' + (size - 4) + '" font-size="10" fill="currentColor">color: blue z&lt;0, orange z&gt;0</text>';
    }
    svgs[d].innerHTML = s;
  }
  function frame() {
    if (paused) return;
    var stepsPerFrame = 4;
    for (var d = 0; d < 3; d++) {
      for (var k = 0; k < stepsPerFrame; k++) {
        step(d);
        if (maybeReset(d)) break;
      }
      render(d);
      var st = stats[d];
      disps[d].w.textContent = st.w;
      disps[d].r.textContent = st.r;
      disps[d].p.textContent = st.w === 0 ? '—' : (100 * st.r / st.w).toFixed(1) + '%';
    }
    requestAnimationFrame(frame);
  }
  pauseBtn.addEventListener('click', function () {
    paused = !paused;
    pauseBtn.textContent = paused ? 'resume' : 'pause';
    if (!paused) requestAnimationFrame(frame);
  });
  resetBtn.addEventListener('click', function () {
    for (var d = 0; d < 3; d++) { state[d] = freshWalk(d); stats[d] = { w: 0, r: 0 }; }
    for (var d = 0; d < 3; d++) {
      render(d);
      disps[d].w.textContent = 0;
      disps[d].r.textContent = 0;
      disps[d].p.textContent = '—';
    }
  });
  for (var d = 0; d < 3; d++) render(d);
  requestAnimationFrame(frame);
})();
</script>

Watch the rates after a couple of minutes. The 1D walk returns almost every time: a classical identity says the probability of *not* having returned within the first $n$ steps is exactly $\binom{n}{n/2}/2^{n} \sim \sqrt{2/(\pi n)}$, which is only about $1.5\%$ at $n = 3000$, so the 1D rate sits well above $90\%$. The 2D walk also returns with probability $1$ eventually, but far more slowly: the no-return probability after $n$ steps decays only like $\pi/\ln n$, a logarithmic crawl, so even with the $3000$-step cap a real fraction of 2D walks have not yet come back and the rate settles clearly below the 1D one. The 3D walk is the qualitatively different case: it is transient, and its return probability converges to Pólya's constant $\approx 0.3405$, landing just below that value because the cutoff drops the rare walks that would have returned later. The split between the dimensions is the result.

## The argument

Let $S_n$ denote the position of the walk after $n$ steps. The walk is **recurrent** (returns to the origin infinitely often almost surely, i.e. with probability $1$) iff the expected number of returns is infinite:

$$
\mathbb{E}\bigl[\#\{n : S_n = 0\}\bigr] \;=\; \sum_{n=0}^\infty \Pr[S_n = 0].
$$

So the dichotomy reduces to convergence vs. divergence of $\sum_n \Pr[S_n = 0]$.

For the simple symmetric random walk on $\mathbb{Z}^d$, a **local** version of the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) (which estimates the chance of landing on one specific lattice point, not just the spread of the position) gives

$$
\Pr[S_{2n} = 0] \;\sim\; \frac{C_d}{n^{d/2}} \quad \text{as } n \to \infty,
$$

with an explicit constant $C_d > 0$. Plugging in,

$$
\sum_n \Pr[S_{2n} = 0] \;\sim\; C_d \sum_n \frac{1}{n^{d/2}}.
$$

The series $\sum 1/n^{d/2}$ converges iff $d/2 > 1$, i.e., $d \ge 3$.

So:

- **$d = 1, 2$**: the series diverges; the walk returns infinitely often (recurrent), and in particular returns at least once with probability $1$.
- **$d \ge 3$**: the series converges; the walk returns only finitely often (transient), and the probability of *never* returning is strictly positive.

The precise return probability in $d = 3$ has the closed form

$$
\Pr[\text{return}] \;=\; 1 - \frac{1}{u(0,0,0)},
$$

where $u(0,0,0)$ is the value of the lattice [Green's function](https://en.wikipedia.org/wiki/Green%27s_function) at the origin:

$$
u(0,0,0) \;=\; \frac{1}{(2\pi)^3} \int_{[-\pi,\pi]^3} \frac{dx\,dy\,dz}{1 - \tfrac{1}{3}(\cos x + \cos y + \cos z)}.
$$

Watson (1939) evaluated this triple integral in terms of elliptic integrals, getting $u(0,0,0) \approx 1.516$ and so the return probability $\approx 0.3405$.

## Where this matters

- **MCMC and random-walk Metropolis-Hastings** (algorithms that sample a distribution by taking random steps through a state space) in high-dimensional state spaces are inherently transient unless the chain has a centering force from the target distribution; you cannot rely on diffusive recurrence to revisit important states.
- **Resistor networks** on $\mathbb{Z}^d$ have effective resistance from the origin to infinity that is finite iff $d \ge 3$. Recurrence is exactly the statement that this resistance is infinite.
- **Polymer models** behave qualitatively differently in dimension $\le 2$ vs. $\ge 3$, because random-walk-like polymers have very different self-intersection statistics.

## References

- George Pólya. *Über eine Aufgabe der Wahrscheinlichkeitsrechnung betreffend die Irrfahrt im Straßennetz*. Mathematische Annalen, 84(1-2):149-160, 1921.
- G. N. Watson. *Three triple integrals*. Quarterly Journal of Mathematics, 10:266-276, 1939.
- Frank Spitzer. *Principles of Random Walk*. Springer, 1976.
- Steven R. Finch. *Mathematical Constants*. Cambridge University Press, 2003. Section 5.9 on Pólya's constant.
