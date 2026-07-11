---
author: Aseem Raj Baranwal
pubDatetime: 2026-06-30T15:22:00Z
title: Euler's identity
slug: eulers-identity
featured: false
draft: false
tags:
  - mathematics
  - physics
description:
  "e^{iπ} + 1 = 0 is the θ = π case of Euler's formula e^{iθ} = cos θ + i sin θ, the point on the unit circle at angle θ. Three derivations: geometric, as a limit, and by power series."
---

Euler's identity is one of my favorite equations.

$$
e^{i\pi} + 1 = 0.
$$

It contains five constants, each exactly once: the additive identity $0$, the multiplicative identity $1$, the circle constant $\pi$, the base of the natural exponential $e$, and the imaginary unit $i = \sqrt{-1}$. They are joined by one addition and one exponentiation, with no other symbols.

The identity is the $\theta = \pi$ case of **Euler's formula**

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

For a real exponent, $e^{x}$ is a positive real number. For a purely imaginary exponent, $e^{i\theta}$ has modulus $1$ and argument $\theta$, so it is the point on the unit circle at angle $\theta$. At $\theta = \pi$ that point is $-1$, which is the identity. This post derives Euler's formula three ways, geometrically, as a limit, and from the power series, then reads off what each constant contributes.

## Multiplying by i is a quarter turn

Put a complex number $a + bi$ at the point $(a, b)$ in the plane. Addition is then ordinary vector addition. Multiplication has a geometric description too.

Write each number in terms of its **modulus** $r$ (its distance from the origin) and its **argument** $\phi$ (its angle from the positive real axis), so $z = r(\cos\phi + i\sin\phi)$. Multiplying two such numbers and using the angle-addition formulas for sine and cosine gives

$$
r_1(\cos\alpha + i\sin\alpha)\cdot r_2(\cos\beta + i\sin\beta) = r_1 r_2\bigl(\cos(\alpha + \beta) + i\sin(\alpha + \beta)\bigr).
$$

So multiplying two complex numbers multiplies their lengths and adds their angles.

Now take the special case of multiplying by $i$. Its modulus is $1$ and its argument is a quarter turn, $90^\circ$. So multiplying any point by $i$ leaves its length unchanged and rotates it a quarter turn counterclockwise. Check it on the powers of $i$: starting from $1$ at $(1, 0)$, one multiplication gives $i$ at $(0, 1)$, the next gives $i^2 = -1$ at $(-1, 0)$, then $i^3 = -i$ at $(0, -1)$, then $i^4 = 1$, home again after four quarter turns. The imaginary unit is the $90^\circ$ rotation of the plane, written as a number.

## The complex exponential traces the unit circle

Define $z(\theta) = e^{i\theta}$ and follow the point as $\theta$ increases.

The exponential is the function that is its own derivative. With the constant $i$ sitting in the exponent, the chain rule gives

$$
\frac{d}{d\theta}\, e^{i\theta} = i\, e^{i\theta}.
$$

Read that as a statement about motion: the velocity $z'(\theta)$ is the position $z(\theta)$ multiplied by $i$, that is, the position turned a quarter turn. Two things follow.

- **The velocity is always perpendicular to the position.** A point whose velocity stays perpendicular to its own radius never moves closer to or farther from the origin; only its angle changes. It travels on a circle.
- **The speed equals the radius.** Since $|i| = 1$, we have $|z'| = |z|$. Starting from $z(0) = e^0 = 1$, the radius is $1$ and stays $1$, and the speed is $1$.

So $e^{i\theta}$ travels around the unit circle at unit speed. After parameter $\theta$ it has covered arc length $\theta$, which on the unit circle is an angle of $\theta$ **radians** (angle measured so that a full turn is $2\pi$). Its coordinates are therefore $(\cos\theta, \sin\theta)$, which is Euler's formula read straight off the motion:

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

Drag $\theta$ below and watch $e^{i\theta}$ move around the circle, its projections on the two axes tracing cosine and sine. The red velocity arrow stays exactly a quarter turn ahead of the radius. At $\theta = \pi$ the point sits at $-1$:

<div class="eu-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 260px;">angle <em>θ</em> (radians)<input type="range" id="eu-theta" min="0" max="6.2832" step="0.0025" value="1.0472" style="flex: 1;"></label><span><em>θ</em> = <strong id="eu-th" style="display: inline-block; min-width: 3.4em;">1.05</strong></span><button id="eu-pi" type="button" style="padding: 0.2rem 0.55rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">jump to π</button></div><div style="display: flex; gap: 0.5rem 1.5rem; flex-wrap: wrap; font-size: 0.95em; margin-bottom: 0.75rem;"><span>cos <em>θ</em> = <strong id="eu-cos" style="display: inline-block; min-width: 3.6em;">0.50</strong></span><span>sin <em>θ</em> = <strong id="eu-sin" style="display: inline-block; min-width: 3.6em;">0.87</strong></span><span><em>e</em><sup><em>iθ</em></sup> = <strong id="eu-z" style="display: inline-block; min-width: 9em;">0.50 + 0.87<em>i</em></strong></span></div><svg id="eu-svg" viewBox="0 0 460 460" style="width: 100%; height: auto; max-width: 460px; display: block; margin: 0 auto; overflow: hidden;" aria-label="The point e^{iθ} on the unit circle at angle θ, with dashed projections onto the axes tracing cosine and sine, and a velocity arrow a quarter turn ahead of the radius."></svg></div>
<script>
(function () {
  var slider = document.getElementById('eu-theta');
  if (!slider) return;
  var thDisp = document.getElementById('eu-th');
  var cosDisp = document.getElementById('eu-cos');
  var sinDisp = document.getElementById('eu-sin');
  var zDisp = document.getElementById('eu-z');
  var svg = document.getElementById('eu-svg');
  var piBtn = document.getElementById('eu-pi');
  var cx = 230, cy = 230, R = 150;
  var POINT = '#2563eb', COS = '#16a34a', SIN = '#d97706', VEL = '#dc2626';
  function update() {
    var th = parseFloat(slider.value);
    var c = Math.cos(th), s = Math.sin(th);
    thDisp.textContent = th.toFixed(2);
    cosDisp.textContent = c.toFixed(2);
    sinDisp.textContent = s.toFixed(2);
    zDisp.innerHTML = c.toFixed(2) + (s >= 0 ? ' + ' : ' − ') + Math.abs(s).toFixed(2) + '<em>i</em>';
    var px = cx + R * c, py = cy - R * s;
    var out = '<defs><marker id="eu-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + VEL + '"/></marker></defs>';
    out += '<line x1="20" y1="' + cy + '" x2="440" y2="' + cy + '" stroke="currentColor" stroke-opacity="0.2"/>';
    out += '<line x1="' + cx + '" y1="20" x2="' + cx + '" y2="440" stroke="currentColor" stroke-opacity="0.2"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>';
    out += '<circle cx="' + (cx - R) + '" cy="' + cy + '" r="3" fill="currentColor" fill-opacity="0.6"/>';
    out += '<text x="' + (cx - R) + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="12" fill="currentColor">−1</text>';
    out += '<text x="' + (cx + R + 5) + '" y="' + (cy + 16) + '" font-size="12" fill="currentColor">1</text>';
    var arcR = 34, large = th > Math.PI ? 1 : 0;
    var bx = cx + arcR * c, by = cy - arcR * s;
    out += '<path d="M ' + (cx + arcR) + ' ' + cy + ' A ' + arcR + ' ' + arcR + ' 0 ' + large + ' 0 ' + bx.toFixed(1) + ' ' + by.toFixed(1) + '" fill="none" stroke="' + POINT + '" stroke-width="1.4"/>';
    out += '<text x="' + (cx + 46) + '" y="' + (cy - 9) + '" font-size="12" font-style="italic" fill="' + POINT + '">θ</text>';
    out += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1) + '" x2="' + px.toFixed(1) + '" y2="' + cy + '" stroke="' + SIN + '" stroke-width="1.3" stroke-dasharray="4 3"/>';
    out += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1) + '" x2="' + cx + '" y2="' + py.toFixed(1) + '" stroke="' + COS + '" stroke-width="1.3" stroke-dasharray="4 3"/>';
    out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + px.toFixed(1) + '" y2="' + cy + '" stroke="' + COS + '" stroke-width="3"/>';
    out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + py.toFixed(1) + '" stroke="' + SIN + '" stroke-width="3"/>';
    out += '<text x="' + ((cx + px) / 2).toFixed(1) + '" y="' + (cy + (s >= 0 ? 16 : -8)) + '" text-anchor="middle" font-size="11" fill="' + COS + '">cos θ</text>';
    out += '<text x="' + (cx + (c >= 0 ? -8 : 8)) + '" y="' + ((cy + py) / 2).toFixed(1) + '" text-anchor="' + (c >= 0 ? 'end' : 'start') + '" font-size="11" fill="' + SIN + '">sin θ</text>';
    out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + px.toFixed(1) + '" y2="' + py.toFixed(1) + '" stroke="' + POINT + '" stroke-width="2"/>';
    var vlen = 46, vx = px - vlen * s, vy = py - vlen * c;
    out += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1) + '" x2="' + vx.toFixed(1) + '" y2="' + vy.toFixed(1) + '" stroke="' + VEL + '" stroke-width="2" marker-end="url(#eu-arrow)"/>';
    out += '<text x="' + (vx + 4).toFixed(1) + '" y="' + (vy - 4).toFixed(1) + '" font-size="11" fill="' + VEL + '">i · (position)</text>';
    out += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="5" fill="' + POINT + '"/>';
    svg.innerHTML = out;
  }
  slider.addEventListener('input', update);
  piBtn.addEventListener('click', function () { slider.value = Math.PI.toFixed(4); update(); });
  update();
})();
</script>

## The compound-interest limit

A second derivation comes from continuous compounding.

Money at annual rate $r$, compounded $n$ times, multiplies by $(1 + r/n)^n$ over the year, and as the compounding gets finer this tends to $e^r$. Each of the $n$ steps multiplies by $1 + r/n$, a number just larger than $1$, so the balance grows.

Now make the rate imaginary, $r = i\theta$, so each step multiplies by $1 + i\theta/n$. That factor has modulus $\sqrt{1 + \theta^2/n^2}$, barely more than $1$, and argument $\arctan(\theta/n) \approx \theta/n$. Each step barely stretches, but it does turn, by about $\theta/n$. Over $n$ steps the turning accumulates to $\theta$ while the modulus tends to $1$, since $(1 + \theta^2/n^2)^{n/2} \to 1$. In the limit,

$$
e^{i\theta} = \lim_{n\to\infty}\left(1 + \frac{i\theta}{n}\right)^{\!n},
$$

a point on the unit circle at angle $\theta$.

The widget draws the partial products $1,\ (1 + i\theta/n),\ (1 + i\theta/n)^2,\ \dots$ as a chain of segments. Because each factor stretches a little, the chain bulges just outside the circle and spirals; as $n$ grows the stretch per step shrinks and the corners settle onto the red arc, the open blue endpoint closing in on the true $e^{i\theta}$ in red. Slide $n$ up and watch the polygon flatten onto the circle:

<div class="eu2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">steps <em>n</em><input type="range" id="eu2-n" min="1" max="60" step="1" value="12" style="flex: 1;"></label><label style="display: flex; align-items: center; gap: 0.6rem; flex: 1 1 220px;">angle <em>θ</em><input type="range" id="eu2-theta" min="0.2" max="6.2832" step="0.0025" value="3.1416" style="flex: 1;"></label></div><div style="display: flex; gap: 0.5rem 1.5rem; flex-wrap: wrap; font-size: 0.95em; margin-bottom: 0.75rem;"><span><em>n</em> = <strong id="eu2-n-val" style="display: inline-block; min-width: 2.2em;">12</strong></span><span><em>θ</em> = <strong id="eu2-th" style="display: inline-block; min-width: 3.4em;">3.14</strong></span><span>|(1 + <em>iθ</em>/<em>n</em>)<sup><em>n</em></sup>| = <strong id="eu2-mod" style="display: inline-block; min-width: 3.4em;">1.49</strong></span><span>total turn = <strong id="eu2-arg" style="display: inline-block; min-width: 3.4em;">3.07</strong></span></div><svg id="eu2-svg" viewBox="0 0 460 460" style="width: 100%; height: auto; max-width: 460px; display: block; margin: 0 auto; overflow: hidden;" aria-label="The polygon of partial products (1 + iθ/n)^k spiraling from 1 onto the unit-circle arc; as n grows the corners settle onto the true point e^{iθ}."></svg></div>
<script>
(function () {
  var nIn = document.getElementById('eu2-n');
  if (!nIn) return;
  var thIn = document.getElementById('eu2-theta');
  var nDisp = document.getElementById('eu2-n-val');
  var thDisp = document.getElementById('eu2-th');
  var modDisp = document.getElementById('eu2-mod');
  var argDisp = document.getElementById('eu2-arg');
  var svg = document.getElementById('eu2-svg');
  var cx = 230, cy = 230;
  var POLY = '#2563eb', TARGET = '#dc2626';
  function update() {
    var n = parseInt(nIn.value, 10);
    var th = parseFloat(thIn.value);
    var stepIm = th / n;
    var re = 1, im = 0;
    var pts = [[1, 0]];
    var maxMod = 1;
    for (var k = 1; k <= n; k++) {
      var nr = re - im * stepIm;
      var ni = re * stepIm + im;
      re = nr; im = ni;
      pts.push([re, im]);
      var m = Math.sqrt(re * re + im * im);
      if (m > maxMod) maxMod = m;
    }
    nDisp.textContent = n;
    thDisp.textContent = th.toFixed(2);
    modDisp.textContent = Math.pow(1 + th * th / (n * n), n / 2).toFixed(2);
    argDisp.textContent = (n * Math.atan(th / n)).toFixed(2);
    var R = 150 / maxMod;
    function sx(x) { return cx + R * x; }
    function sy(y) { return cy - R * y; }
    var out = '';
    out += '<line x1="20" y1="' + cy + '" x2="440" y2="' + cy + '" stroke="currentColor" stroke-opacity="0.2"/>';
    out += '<line x1="' + cx + '" y1="20" x2="' + cx + '" y2="440" stroke="currentColor" stroke-opacity="0.2"/>';
    out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R.toFixed(1) + '" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.3"/>';
    var steps = 80, arc = '';
    for (var a = 0; a <= steps; a++) {
      var ang = th * a / steps;
      arc += (a === 0 ? 'M' : 'L') + sx(Math.cos(ang)).toFixed(1) + ',' + sy(Math.sin(ang)).toFixed(1) + ' ';
    }
    out += '<path d="' + arc + '" fill="none" stroke="' + TARGET + '" stroke-width="3" stroke-opacity="0.35"/>';
    var poly = '';
    for (var k2 = 0; k2 < pts.length; k2++) {
      poly += (k2 === 0 ? 'M' : 'L') + sx(pts[k2][0]).toFixed(1) + ',' + sy(pts[k2][1]).toFixed(1) + ' ';
    }
    out += '<path d="' + poly + '" fill="none" stroke="' + POLY + '" stroke-width="1.6"/>';
    for (var k3 = 0; k3 < pts.length; k3++) {
      out += '<circle cx="' + sx(pts[k3][0]).toFixed(1) + '" cy="' + sy(pts[k3][1]).toFixed(1) + '" r="2.2" fill="' + POLY + '"/>';
    }
    out += '<text x="' + (sx(1) + 6).toFixed(1) + '" y="' + (cy + 16) + '" font-size="12" fill="currentColor">1</text>';
    out += '<circle cx="' + sx(Math.cos(th)).toFixed(1) + '" cy="' + sy(Math.sin(th)).toFixed(1) + '" r="4.5" fill="' + TARGET + '"/>';
    out += '<text x="' + (sx(Math.cos(th)) + 7).toFixed(1) + '" y="' + (sy(Math.sin(th)) - 6).toFixed(1) + '" font-size="12" fill="' + TARGET + '"><tspan font-style="italic">e</tspan><tspan baseline-shift="super" font-size="9" font-style="italic">iθ</tspan></text>';
    var end = pts[pts.length - 1];
    out += '<circle cx="' + sx(end[0]).toFixed(1) + '" cy="' + sy(end[1]).toFixed(1) + '" r="4" fill="none" stroke="' + POLY + '" stroke-width="2"/>';
    svg.innerHTML = out;
  }
  nIn.addEventListener('input', update);
  thIn.addEventListener('input', update);
  update();
})();
</script>

The readout **total turn** is $n\arctan(\theta/n)$, the angle actually accumulated by the $n$ steps; it climbs to $\theta$ as $n$ grows, while the modulus $(1 + \theta^2/n^2)^{n/2}$ falls back to $1$.

## The series check

For a derivation with no picture at all, expand. The exponential series $e^{x} = \sum_{k \ge 0} x^k/k!$ converges for every complex $x$, and absolutely, so we may substitute $x = i\theta$ and regroup the terms:

$$
e^{i\theta} = \sum_{k=0}^{\infty} \frac{(i\theta)^k}{k!}.
$$

The powers of $i$ run through $1, i, -1, -i$ with period four. The even powers $k = 2m$ give $i^{2m} = (-1)^m$ and land on the real axis; the odd powers $k = 2m+1$ give $i^{2m+1} = (-1)^m i$ and land on the imaginary axis. Splitting the sum along that parity,

$$
e^{i\theta} = \underbrace{\sum_{m=0}^{\infty} \frac{(-1)^m \theta^{2m}}{(2m)!}}_{\cos\theta} \;+\; i\underbrace{\sum_{m=0}^{\infty} \frac{(-1)^m \theta^{2m+1}}{(2m+1)!}}_{\sin\theta}.
$$

The two halves are exactly the Taylor series of cosine and sine. Same conclusion as the geometry, now as an algebraic identity. (Absolute convergence is what licenses the regrouping.)

## The half-turn from 1 to −1

Set $\theta = \pi$. The point $e^{i\theta}$ has walked halfway around the unit circle, from $1$ to $-1$:

$$
e^{i\pi} = -1, \qquad\text{equivalently}\qquad e^{i\pi} + 1 = 0.
$$

Now each constant contributes something specific, and none can be changed:

- $e$ is the base of the exponentiation.
- $i$ sends the exponent to the imaginary axis, where $e^{i\theta}$ lies on the unit circle at angle $\theta$.
- $\pi$ is the length of a half-turn in radians, so $i\pi$ is precisely half a circle.
- $1$ is where the walk begins, and the quantity added back at the end.
- $0$ is where you land: start at $1$, rotate to $-1$, add $1$.

Change any one of them and the statement is false. The identity is a genuine relation among these five constants, not a coincidence of notation.

## Applications

Euler's formula is why complex numbers are the standard tool for periodic and rotational problems.

- **Fourier analysis.** A periodic signal is a sum of terms $c_k\, e^{ik\omega t}$, each a vector of length $|c_k|$ spinning at frequency $k\omega$. Adding spinning vectors reconstructs any waveform, and pulling the coefficients back out is what a Fourier transform does. The plane waves $e^{ipx/\hbar}$ in the [uncertainty-principle post](/blog/heisenberg-uncertainty-as-fourier-duality) are the same objects carrying a particle's momentum.
- **Rotations in the plane.** Multiplying a point by $e^{i\alpha}$ rotates it by $\alpha$, so one complex multiplication replaces a $2\times 2$ rotation matrix. Graphics, robotics, and navigation use this, and its three-dimensional cousin is the [quaternion](https://en.wikipedia.org/wiki/Quaternion).
- **AC circuits.** An engineer writes an alternating voltage as $\mathrm{Re}\,(V e^{i\omega t})$ and tracks the complex amplitude $V$, called a **phasor**. The $90^\circ$ phase shifts of a capacitor and an inductor are just multiplications by $-i$ and $i$ (their impedances are $1/(i\omega C)$ and $i\omega L$), which replaces the calculus of sinusoids with algebra on complex numbers.
- **Quantum mechanics.** A state of definite energy $E$ evolves by the pure phase $e^{-iEt/\hbar}$: it rotates in the complex plane without changing magnitude, so total probability is conserved, and it is the relative phase between states that produces interference.

## Three corollaries

- **The roots of unity.** The solutions of $z^n = 1$ are $z_k = e^{2\pi i k / n}$ for $k = 0, 1, \dots, n-1$: $n$ equally spaced points on the unit circle, the vertices of a regular $n$-gon with one corner at $1$. Multiplying two of them adds their angles, so they form a group under multiplication.
- **de Moivre's formula.** Raising Euler's formula to the $n$-th power gives $(\cos\theta + i\sin\theta)^n = e^{in\theta} = \cos n\theta + i\sin n\theta$. Expanding the left side with the binomial theorem and matching real and imaginary parts hands you $\cos n\theta$ and $\sin n\theta$ as polynomials in $\cos\theta$ and $\sin\theta$, the multiple-angle identities at no extra cost.
- **$i$ to the $i$ is real.** Since $i = e^{i\pi/2}$, we get $i^i = \bigl(e^{i\pi/2}\bigr)^i = e^{i^2 \pi/2} = e^{-\pi/2} \approx 0.2079$. An imaginary number raised to an imaginary power lands on the real line.

## A little history

Euler's formula predates Euler's compact statement of it. [Roger Cotes](https://en.wikipedia.org/wiki/Roger_Cotes) published the equivalent logarithmic relation $i\theta = \ln(\cos\theta + i\sin\theta)$ in 1714, though he did not exponentiate it. [Abraham de Moivre](https://en.wikipedia.org/wiki/Abraham_de_Moivre) had the $n$-th power identity that carries his name, in equivalent form, by the 1720s. Leonhard Euler stated $e^{i\theta} = \cos\theta + i\sin\theta$ in his 1748 [*Introductio in analysin infinitorum*](https://en.wikipedia.org/wiki/Introductio_in_analysin_infinitorum) and put the exponential at the center of the subject. The compact $e^{i\pi} + 1 = 0$ is a later way of writing the $\theta = \pi$ case. When David Wells polled readers of *The Mathematical Intelligencer* in 1990 for the most beautiful theorem in mathematics, Euler's identity finished first.

## Common misconceptions

- **$e^{i\pi}$ is not $e$ multiplied by itself $i\pi$ times.** Doing something an imaginary number of times has no meaning. For complex $z$, the symbol $e^{z}$ is *defined* by the power series $\sum_k z^k/k!$, and equivalently by the limit and the differential equation used above; all three agree. Repeated multiplication is only the special case of a positive-integer exponent.
- **The complex logarithm is multivalued, and so are complex powers.** Because $e^{i\theta}$ returns to the same point every $2\pi$, the equation $e^{w} = z$ has infinitely many solutions differing by $2\pi i$. So $\log z$, and any power $z^a = e^{a\log z}$, come with a choice of branch; the **principal value** takes the angle in $(-\pi, \pi]$. This is the fine print behind $i^i$: the other branches give the further real values $e^{-(\pi/2 + 2\pi k)}$, and $e^{-\pi/2}$ is only the principal one.

## References

- Leonhard Euler. *Introductio in analysin infinitorum*. Lausanne, 1748. States $e^{i\theta} = \cos\theta + i\sin\theta$ and builds analysis around the exponential.
- Roger Cotes. *Logometria*. Philosophical Transactions of the Royal Society, 29(338):5-45, 1714. The logarithmic form of the formula, before Euler.
- David Wells. *Are these the most beautiful?* The Mathematical Intelligencer, 12(3):37-41, 1990. The reader poll in which Euler's identity finished first.
- Paul J. Nahin. *Dr. Euler's Fabulous Formula*. Princeton University Press, 2006. A book-length tour of the formula and its uses.
- Tristan Needham. *Visual Complex Analysis*. Oxford University Press, 1997. Chapter 1 develops the rotational, geometric reading of complex multiplication and $e^{i\theta}$.
