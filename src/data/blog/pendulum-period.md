---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-11T09:10:00Z
title: Pendulum period
slug: pendulum-period
featured: false
draft: false
tags:
  - physics
  - mathematics
description:
  "The pendulum period grows with amplitude; 2π√(L/g) is only the zeroth term. The exact period is an elliptic integral, and Gauss's arithmetic–geometric mean evaluates it in five iterations."
---

A pendulum is a bob hanging from a fixed pivot by a rod of length $L$, free to swing in a vertical plane. Its position at any instant is the single angle $\theta$ between the rod and the vertical, and the **amplitude** $\theta_0$ is the largest angle the swing reaches: released from rest at $\theta_0$, the bob oscillates between $-\theta_0$ and $+\theta_0$.

<div style="margin: 1.5rem auto; max-width: 560px; color: var(--foreground);">
<svg viewBox="0 0 640 400" role="img" aria-label="A pendulum of length L hanging from a fixed pivot. The rod makes the angle theta with the vertical, the bob is released from rest at the amplitude theta-zero, the dashed arc is the swing, and g points downward." style="width: 100%; height: auto; display: block;">
<line x1="280" y1="48" x2="360" y2="48" stroke="currentColor" stroke-opacity="0.5" stroke-width="2"/>
<line x1="290" y1="48" x2="283" y2="38" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<line x1="310" y1="48" x2="303" y2="38" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<line x1="330" y1="48" x2="323" y2="38" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<line x1="350" y1="48" x2="343" y2="38" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<circle cx="320" cy="60" r="4" fill="currentColor"/>
<line x1="320" y1="60" x2="320" y2="355" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="5 5"/>
<path d="M 105.5 240 A 280 280 0 0 0 534.5 240" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="3 6"/>
<circle cx="105.5" cy="240" r="13" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="2"/>
<line x1="320" y1="60" x2="534.5" y2="240" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.8" stroke-dasharray="6 5"/>
<circle cx="534.5" cy="240" r="13" fill="none" stroke="currentColor" stroke-opacity="0.7" stroke-width="2"/>
<text x="536" y="272" text-anchor="middle" font-size="12.5" fill="currentColor">released from rest</text>
<text x="536" y="288" text-anchor="middle" font-size="12.5" fill="currentColor">at the amplitude θ₀</text>
<line x1="320" y1="60" x2="438.3" y2="313.8" stroke="currentColor" stroke-width="2.5"/>
<circle cx="438.3" cy="313.8" r="13" fill="currentColor"/>
<text x="403" y="276" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">L</text>
<path d="M 320 155 A 95 95 0 0 0 360.1 146.1" fill="none" stroke="#2563eb" stroke-width="2"/>
<text x="344" y="172" text-anchor="middle" font-size="17" font-style="italic" fill="#2563eb">θ</text>
<path d="M 320 210 A 150 150 0 0 0 434.9 156.4" fill="none" stroke="#d97706" stroke-width="2"/>
<text x="422" y="195" text-anchor="middle" font-size="17" font-style="italic" fill="#d97706">θ₀</text>
<line x1="140" y1="115" x2="140" y2="170" stroke="currentColor" stroke-width="2"/>
<path d="M 133 170 L 140 184 L 147 170 Z" fill="currentColor"/>
<text x="158" y="152" font-size="16" font-style="italic" fill="currentColor">g</text>
</svg>
</div>

Gravity pulls the bob back toward the vertical: the component of gravity along the bob's circular track is $-mg\sin\theta$, the position along the track is $s = L\theta$, and Newton's second law, with the mass canceling, gives the equation of motion

$$
\ddot\theta = -\frac{g}{L} \sin\theta,
$$

where $g$ is the gravitational acceleration. The way this is taught in secondary and high school, most of the time, is to assume the swing is small, replace $\sin\theta$ by $\theta$, and recognize a harmonic oscillator with angular frequency $\sqrt{g/L}$, hence with period

$$
T_0 = 2\pi \sqrt{\frac{L}{g}}.
$$

No amplitude appears in $T_0$, but that absence belongs to the approximation, not to pendulums. The full equation is nonlinear, and the true period grows with the swing: it exceeds $T_0$ by 0.19% at an amplitude of 10°, by 1.74% at 30°, and by 18% at 90°. Released almost inverted, at 179°, the pendulum takes nearly four $T_0$ to complete a cycle.

None of this requires numerics to pin down. The exact period is a **complete elliptic integral**, a classical special function, and an algorithm of Gauss evaluates it with astonishing efficiency: each iteration doubles the number of correct digits, so machine precision arrives in about five steps.

## The exact period

Conservation of energy between the angle $\theta$ and the turning point $\theta_0$ gives

$$
\tfrac{1}{2} L^2 \dot\theta^2 = g L (\cos\theta - \cos\theta_0),
$$

and separating variables over a quarter swing (bottom to turning point),

$$
T = 4 \sqrt{\frac{L}{2g}} \int_0^{\theta_0} \frac{d\theta}{\sqrt{\cos\theta - \cos\theta_0}}.
$$

The half-angle identity $\cos\theta = 1 - 2\sin^2(\theta/2)$ turns the radicand into $2\bigl(k^2 - \sin^2(\theta/2)\bigr)$ with

$$
k = \sin\frac{\theta_0}{2},
$$

and the substitution $\sin(\theta/2) = k \sin\varphi$, which maps $\theta \in [0, \theta_0]$ onto $\varphi \in [0, \pi/2]$, produces

$$
T = 4\sqrt{\frac{L}{g}}\; K(k),
\qquad
K(k) = \int_0^{\pi/2} \frac{d\varphi}{\sqrt{1 - k^2 \sin^2\varphi}}.
$$

$K$ is the [complete elliptic integral of the first kind](https://en.wikipedia.org/wiki/Elliptic_integral). At zero amplitude $K(0) = \pi/2$ and the formula collapses to $T_0$; everything beyond the textbook is the growth of $K(k)$ as $k$ runs from 0 toward 1.

## The size of the correction

Expanding the integrand of $K$ by the binomial series and integrating term by term gives

$$
\frac{T}{T_0} = \frac{2}{\pi} K(k) = 1 + \frac{k^2}{4} + \frac{9 k^4}{64} + \cdots
= \sum_{n=0}^{\infty} \left[ \binom{2n}{n} \frac{1}{4^n} \right]^2 k^{2n},
$$

and substituting $k = \sin(\theta_0/2)$ and re-expanding in the amplitude,

$$
\frac{T}{T_0} = 1 + \frac{\theta_0^2}{16} + \frac{11\,\theta_0^4}{3072} + \cdots
$$

The leading correction $\theta_0^2/16$ already tells the practical story: a pendulum clock's error is quadratic in the swing, so halving the amplitude quarters the error. The exact values, computed by the method of the next section:

| $\theta_0$ | 10° | 30° | 60° | 90° | 120° | 150° | 179° |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $T / T_0$ | 1.0019 | 1.0174 | 1.0732 | 1.1803 | 1.3729 | 1.7622 | 3.9010 |

The divergence at the far end has its own closed form: as $\theta_0 \to 180°$ the modulus $k \to 1$ and $K(k) \sim \ln\bigl(4/k'\bigr)$ with $k' = \sqrt{1 - k^2} = \cos(\theta_0/2)$, so

$$
\frac{T}{T_0} \;\approx\; \frac{2}{\pi} \ln \frac{4}{\cos(\theta_0/2)}.
$$

At 179° this gives 3.901, matching the table to every digit shown. The logarithm is the signature of the unstable equilibrium at the top: a pendulum released ever closer to inverted spends ever longer creeping away from the apex, and the period grows without bound while the release point is still a fraction of a degree from vertical.

## Gauss's iteration

Take two positive numbers $a_0 = x$, $b_0 = y$ and repeatedly replace them by their arithmetic and geometric means:

$$
a_{n+1} = \frac{a_n + b_n}{2}, \qquad b_{n+1} = \sqrt{a_n b_n}.
$$

Both sequences converge to a common limit, the **arithmetic–geometric mean** $\operatorname{agm}(x, y)$, and they converge violently fast: the gap obeys $a_{n+1} - b_{n+1} = (\sqrt{a_n} - \sqrt{b_n})^2 / 2$, which is quadratic in the previous gap, so the number of correct digits doubles at every step.

Gauss's discovery is that this iteration computes exactly the integral we need. For $a \ge b > 0$ define

$$
I(a, b) = \int_0^{\pi/2} \frac{d\varphi}{\sqrt{a^2 \cos^2\varphi + b^2 \sin^2\varphi}}.
$$

A substitution devised by Gauss (and equivalent to Landen's earlier transformation of elliptic integrals) shows the integral is invariant under one step of the iteration, $I(a, b) = I\bigl(\tfrac{a+b}{2}, \sqrt{ab}\bigr)$; Cox's survey works out the change of variables in full. Iterating to the common limit $M = \operatorname{agm}(a, b)$ freezes the integrand at $I(M, M) = \pi / (2M)$. Since $I(1, k') = K(k)$ (put $a = 1$, $b = k'$ and use $\cos^2 + k'^2 \sin^2 = 1 - k^2 \sin^2$),

$$
K(k) = \frac{\pi}{2 \operatorname{agm}(1, k')},
$$

and the pendulum result becomes a single tidy formula:

$$
\boxed{\;\frac{T}{T_0} = \frac{1}{\operatorname{agm}\bigl(1, \cos(\theta_0/2)\bigr)}.\;}
$$

For $\theta_0 = 90°$ the iteration starts from $1$ and $\cos 45° = 0.70711$ and proceeds

$$
(1,\; 0.70711) \to (0.85355,\; 0.84090) \to (0.84722,\; 0.84721) \to \cdots
$$

agreeing to 16 digits by the fifth step, with $T/T_0 = 1/0.8472130848 = 1.1803405990$. The widget runs exactly this iteration at any amplitude; the table below the plot shows the digits locking in, roughly twice as many per row:

<div class="pp1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span>θ₀ =&nbsp;<strong id="pp1-deg" style="display: inline-block; min-width: 2.8em;">90°</strong></span><input id="pp1-slider" type="range" min="0" max="179" step="1" value="90" style="flex: 1; min-width: 160px; accent-color: #2563eb;"><span>T/T₀ = <strong id="pp1-ratio" style="display: inline-block; min-width: 5.5em;">1.180341</strong></span><span>vs small angle: <strong id="pp1-err" style="display: inline-block; min-width: 4.8em;">+18.03%</strong></span></div><svg id="pp1-svg" viewBox="0 0 640 340" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="The exact pendulum period ratio as a function of amplitude, rising from 1 at zero amplitude and diverging near 180 degrees, with a marker at the selected amplitude."></svg><div style="overflow-x: auto; margin-top: 0.75rem;"><table id="pp1-table" style="border-collapse: collapse; font-family: monospace; font-size: 0.8em; white-space: nowrap;"></table></div></div>
<script>
(function () {
  var slider = document.getElementById('pp1-slider');
  if (!slider) return;
  var degDisp = document.getElementById('pp1-deg');
  var ratioDisp = document.getElementById('pp1-ratio');
  var errDisp = document.getElementById('pp1-err');
  var svg = document.getElementById('pp1-svg');
  var table = document.getElementById('pp1-table');
  var BLUE = '#2563eb', RED = '#dc2626';
  function agmRows(deg) {
    var b0 = Math.cos(deg * Math.PI / 360);
    var a = 1, b = b0, rows = [[a, b]];
    for (var i = 0; i < 6; i++) {
      var an = (a + b) / 2, bn = Math.sqrt(a * b);
      a = an; b = bn; rows.push([a, b]);
    }
    return rows;
  }
  function ratioOf(deg) {
    var rows = agmRows(deg);
    return 1 / rows[6][0];
  }
  var X0 = 50, X1 = 620, Y0 = 24, Y1 = 262;
  function px(deg) { return X0 + (X1 - X0) * deg / 180; }
  function py(r) { return Y1 - (Y1 - Y0) * (r - 0.95) / (4.05 - 0.95); }
  function render() {
    var deg = parseInt(slider.value, 10);
    var rows = agmRows(deg);
    var r = 1 / rows[6][0];
    var out = '';
    for (var t = 1; t <= 4; t++) {
      out += '<line x1="' + X0 + '" y1="' + py(t).toFixed(1) + '" x2="' + X1 + '" y2="' + py(t).toFixed(1) + '" stroke="currentColor" stroke-opacity="0.15" stroke-width="1"/>';
      out += '<text x="' + (X0 - 8) + '" y="' + (py(t) + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="currentColor">' + t + '</text>';
    }
    for (var d = 0; d <= 180; d += 30) {
      out += '<text x="' + px(d).toFixed(1) + '" y="' + (Y1 + 20) + '" text-anchor="middle" font-size="12" fill="currentColor">' + d + '°</text>';
      out += '<line x1="' + px(d).toFixed(1) + '" y1="' + Y1 + '" x2="' + px(d).toFixed(1) + '" y2="' + (Y1 + 5) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
    }
    out += '<line x1="' + X0 + '" y1="' + Y1 + '" x2="' + X1 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>';
    var path = '';
    for (var d2 = 0; d2 <= 179; d2++) {
      path += (d2 === 0 ? 'M' : 'L') + px(d2).toFixed(1) + ',' + py(ratioOf(d2)).toFixed(1) + ' ';
    }
    out += '<path d="' + path + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>';
    out += '<circle cx="' + px(deg).toFixed(1) + '" cy="' + py(r).toFixed(1) + '" r="6" fill="' + RED + '"/>';
    out += '<text x="' + (X0 + 10) + '" y="' + (Y0 + 6) + '" font-size="12" fill="currentColor">T/T₀</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="332" text-anchor="middle" font-size="12" fill="currentColor">amplitude θ₀</text>';
    svg.innerHTML = out;
    var rowsHtml = '<tr><th style="text-align: left; padding: 0.15rem 0.9rem 0.15rem 0;">n</th><th style="text-align: left; padding: 0.15rem 0.9rem 0.15rem 0;">a&#8345;</th><th style="text-align: left; padding: 0.15rem 0 0.15rem 0;">b&#8345;</th></tr>';
    for (var i = 0; i < 7; i++) {
      rowsHtml += '<tr><td style="padding: 0.15rem 0.9rem 0.15rem 0;">' + i + '</td><td style="padding: 0.15rem 0.9rem 0.15rem 0;">' + rows[i][0].toFixed(15) + '</td><td style="padding: 0.15rem 0;">' + rows[i][1].toFixed(15) + '</td></tr>';
    }
    table.innerHTML = rowsHtml;
    degDisp.textContent = deg + '°';
    ratioDisp.textContent = r.toFixed(6);
    errDisp.textContent = '+' + (100 * (r - 1)).toFixed(2) + '%';
  }
  slider.addEventListener('input', render);
  render();
})();
</script>

## A little history

[Galileo](https://en.wikipedia.org/wiki/Galileo_Galilei) took the circular pendulum to be isochronous, its period independent of amplitude; the table above measures how wrong that is, and the error mattered as soon as pendulums were asked to keep time. [Huygens](https://en.wikipedia.org/wiki/Christiaan_Huygens) understood the defect and, in the [*Horologium Oscillatorium*](https://en.wikipedia.org/wiki/Horologium_Oscillatorium) (1673), cured it outright: a bob constrained to swing along a cycloid rather than a circle has a period exactly independent of amplitude. That construction, and the reason the cycloid is the unique curve with this property, is the tautochrone story told in [the post on the curve of fastest descent](/blog/curve-of-fastest-descent); the present post is about living with the circle instead.

The integral itself waited a century for its theory. [Landen](https://en.wikipedia.org/wiki/John_Landen) (1775) found the transformation relating elliptic integrals of different moduli, and [Legendre](https://en.wikipedia.org/wiki/Adrien-Marie_Legendre) systematized the subject. The decisive step came from [Gauss](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss), who had been iterating arithmetic and geometric means since his teens: in a [diary entry](https://en.wikipedia.org/wiki/Gauss%27s_diary) dated 30 May 1799 he recorded that $\operatorname{agm}(1, \sqrt{2})$ agrees to eleven decimal places with $\pi/\varpi$, where $\varpi$ is the [lemniscate constant](https://en.wikipedia.org/wiki/Lemniscate_constant), and wrote that the observation would surely open a whole new field of analysis. It did: the identity $K(k) = \pi / (2\operatorname{agm}(1, k'))$ and its descendants sit at the root of the theory of [elliptic functions](https://en.wikipedia.org/wiki/Elliptic_function) and modular transformations. Cox's [1984 survey](https://doi.org/10.5169/seals-53831) reconstructs the whole episode from Gauss's notebooks.

The iteration's quadratic convergence also earned it a modern career: the [Salamin–Brent algorithm](https://en.wikipedia.org/wiki/Gauss%E2%80%93Legendre_algorithm) (1976) computes $\pi$ by essentially the same AGM identities, doubling the number of correct digits per iteration, and AGM-based formulas held the [$\pi$-computation records](https://en.wikipedia.org/wiki/Chronology_of_computation_of_%CF%80) for decades. A three-century-old pendulum integral and record-scale computation run on the same two lines of arithmetic.

## References

- David A. Cox. *The arithmetic-geometric mean of Gauss*. L'Enseignement Mathématique, 30:275–330, 1984. The history and the full proof of the AGM–elliptic integral identity.
- Jonathan M. Borwein, Peter B. Borwein. *Pi and the AGM: A Study in Analytic Number Theory and Computational Complexity*. Wiley, 1987. The AGM as an algorithmic object.
- E. T. Whittaker, G. N. Watson. *A Course of Modern Analysis*. Cambridge University Press, 4th edition, 1927. Elliptic integrals and Landen's transformation.
- Christiaan Huygens. *Horologium Oscillatorium*. Paris, 1673. The cycloidal pendulum as the fix for amplitude dependence.
- Eugene Salamin. *Computation of π using arithmetic-geometric mean*. Mathematics of Computation, 30:565–570, 1976. Quadratically convergent π from the AGM.
- Richard P. Brent. *Fast multiple-precision evaluation of elementary functions*. Journal of the ACM, 23(2):242–251, 1976. The companion result, same year, found independently.
