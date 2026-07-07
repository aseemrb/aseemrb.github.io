---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-03T09:20:00Z
title: The curve of fastest descent
slug: curve-of-fastest-descent
featured: false
draft: false
tags:
  - mathematics
  - physics
description:
  "A bead slides down a frictionless wire between two fixed points. The wire shape that minimizes travel time is not the straight line but an arc of a cycloid. Treating the bead as a light ray gives Snell's law from Fermat's principle, the Euler–Lagrange equation turns the Snell invariant into a conservation law that forces the cycloid, and a convexity argument certifies the cycloid as the unique global minimizer. The same curve is also the tautochrone, on which beads released from any height reach the bottom simultaneously. Two animated races with exact closed-form motion."
---

Fix a point $A$ and a lower point $B$, off to the side. Thread a frictionless wire from $A$ to $B$, place a bead on it at $A$, and release it from rest under gravity. The travel time depends on the wire's shape. The straight line has the shortest length, but length is not what is being minimized; time is, and speed is not free: the bead moves fast only where it has already fallen far.

A steep initial drop buys speed early, and speed acquired early benefits the entire remaining trip. The optimal curve therefore dives more steeply than the straight line at the start and flattens out later. The classical name for the winner is the **brachistochrone** (Greek for shortest time), and it turns out to be an arc of a **cycloid**: the curve traced by a point on the rim of a circle rolling along a line.

With the circle of radius $R$ rolling under the horizontal line through $A$, and $y$ measured downward from $A$, the cycloid is

$$
x = R(\theta - \sin\theta), \qquad y = R(1 - \cos\theta),
$$

where $\theta$ is the angle the circle has rolled. Exactly one such arc starts at $A$ (which is a **cusp** of the curve, where the tangent is vertical) and passes through any given $B$; choosing $R$ and the endpoint angle fits the two conditions.

## The bead as a light ray

The identification of the cycloid is due to [Johann Bernoulli](https://en.wikipedia.org/wiki/Johann_Bernoulli), and his argument is still the shortest path to it. By conservation of energy, a bead that has dropped a depth $y$ moves at speed

$$
v = \sqrt{2gy},
$$

regardless of the route it took to get there. So the problem reads: find the path of least time through a medium where speed depends on depth. That is a problem optics already solved. **[Fermat's principle](https://en.wikipedia.org/wiki/Fermat%27s_principle)** says light travels between two points along the path of least time, and **[Snell's law](https://en.wikipedia.org/wiki/Snell%27s_law)** follows from it at a single interface. Send a ray from a point at height $a$ above a flat interface, where the speed is $v_1$, to a point at depth $b$ below it, where the speed is $v_2$, with horizontal separation $d$ between the endpoints; the ray is straight within each medium, so the only unknown is the horizontal position $x$ of the crossing. The travel time and its derivative are

$$
T(x) = \frac{\sqrt{a^2 + x^2}}{v_1} + \frac{\sqrt{b^2 + (d - x)^2}}{v_2},
\qquad
T'(x) = \frac{\sin\alpha_1}{v_1} - \frac{\sin\alpha_2}{v_2},
$$

where $\alpha_1, \alpha_2$ are the angles the two segments make with the normal, since $\sin\alpha_1 = x/\sqrt{a^2 + x^2}$ and $\sin\alpha_2 = (d - x)/\sqrt{b^2 + (d - x)^2}$. Both terms of $T$ are strictly convex in $x$, so there is exactly one stationary crossing point and it is the global minimum: the least-time ray refracts so that $\sin\alpha / v$ is the same on both sides of the interface.

Now slice a medium whose speed varies continuously with depth into thin horizontal layers. The least-time path obeys Snell's law at every interface, so the quantity $\sin\alpha/v$ survives each crossing and is constant along the entire ray, with $\alpha$ measured from the vertical.

For the bead this is not an analogy but the same problem. The travel time along any curve is $\int ds / v$, and energy conservation fixes the bead's speed at $v = \sqrt{2gy}$ no matter which curve it rides, so the bead and the ray minimize the identical functional: the brachistochrone is the path light takes through a medium whose speed grows as $\sqrt{y}$. The optimal path must therefore satisfy $\sin\alpha = C\sqrt{y}$ for some constant $C$: the deeper the bead, the more horizontal its path, and at the start ($y = 0$) it must move straight down.

One gap remains. Slicing treats the continuous medium as a limit of discrete layers, which identifies the invariant but is not by itself a proof of minimality. The next two sections supply the proof: the invariant forces the cycloid, and a convexity argument then shows the cycloid beats every competitor.

## The invariant forces a cycloid

Parametrize the unknown curve by depth, $x = x(y)$, which describes any curve along which the bead keeps descending. The arc-length element is $ds = \sqrt{1 + x'(y)^2}\,dy$, so the quantity to minimize is

$$
T[x] = \int_0^{y_B} f\bigl(y, x'(y)\bigr)\, dy,
\qquad
f(y, p) = \frac{\sqrt{1 + p^2}}{\sqrt{2gy}}.
$$

The integrand depends on the slope $x'$ but not on $x$ itself: shifting the whole curve sideways does not change how depth is gained. For such functionals the [Euler–Lagrange equation](https://en.wikipedia.org/wiki/Euler%E2%80%93Lagrange_equation), the first-order optimality condition for integral functionals, collapses to a conservation law, $\frac{d}{dy}\frac{\partial f}{\partial p} = 0$:

$$
\frac{\partial f}{\partial p} = \frac{x'}{\sqrt{2gy}\,\sqrt{1 + x'^2}} = \frac{\sin\alpha}{\sqrt{2gy}} \equiv c,
$$

using $\sin\alpha = dx/ds = x'/\sqrt{1 + x'^2}$. The conserved quantity is exactly Snell's invariant: the Euler–Lagrange equation and the layered-medium argument are two derivations of the same statement.

Solving the invariant for the slope gives an ODE,

$$
x'(y) = \sqrt{\frac{y}{2R - y}},
\qquad
2R \equiv \frac{1}{2gc^2},
$$

and the substitution $y = R(1 - \cos\theta) = 2R\sin^2(\theta/2)$ resolves it: $x' = \tan(\theta/2)$ and $dy = R\sin\theta\,d\theta$, so $dx = 2R\sin^2(\theta/2)\,d\theta = R(1 - \cos\theta)\,d\theta$, hence

$$
x = R(\theta - \sin\theta), \qquad y = R(1 - \cos\theta),
$$

with the integration constant fixed by the start at the origin. This is the parametrization quoted in the opening, now derived rather than assumed. Passing through $B$ pins down the two remaining constants: the ratio $x/y = (\theta - \sin\theta)/(1 - \cos\theta)$ increases strictly from $0$ to $\pi/2$ as $\theta$ runs over $(0, \pi]$, so every target with $x_B \le \tfrac{\pi}{2}\, y_B$ is reached by exactly one descending arc, $\theta_B$ set by the ratio and $R$ by the scale. Two byproducts of the computation, $\sin\alpha = \sin(\theta/2)$ and $ds = 2R\sin(\theta/2)\,d\theta$, are used below.

## Global minimality by convexity

The Euler–Lagrange equation is a first-order condition; on its own it certifies the cycloid as a stationary point of $T$, not as its minimum. What upgrades it here is a structural feature of the integrand: for each fixed depth $y$, the map $p \mapsto f(y, p)$ is strictly convex, since

$$
\frac{\partial^2 f}{\partial p^2} = \frac{1}{\sqrt{2gy}\,(1 + p^2)^{3/2}} > 0.
$$

A strictly convex function lies above each of its tangent lines, touching only at the point of tangency:

$$
f(y, q) \;\ge\; f(y, p) + \frac{\partial f}{\partial p}(y, p)\,(q - p),
\qquad \text{with equality only at } q = p.
$$

Let $x_*$ be the cycloid and $\tilde{x}$ any competing descent through the same endpoints, regular enough for its travel time to be defined. Apply the tangent-line inequality at each depth, with $p = x_*'(y)$ and $q = \tilde{x}'(y)$, and integrate over $y$:

$$
T[\tilde{x}] - T[x_*]
\;\ge\;
\int_0^{y_B} \frac{\partial f}{\partial p}\bigl(y, x_*'(y)\bigr)\,\bigl(\tilde{x}'(y) - x_*'(y)\bigr)\, dy
\;=\;
c \int_0^{y_B} \bigl(\tilde{x}' - x_*'\bigr)\, dy
\;=\; 0.
$$

The middle equality is where the conservation law does its work: along the cycloid, $\partial f/\partial p = \sin\alpha/\sqrt{2gy} = c$ is constant, so it pulls out of the integral, and what remains is $\bigl(\tilde{x}(y_B) - x_*(y_B)\bigr) - \bigl(\tilde{x}(0) - x_*(0)\bigr) = 0$ because the curves share both endpoints. So $T[\tilde{x}] \ge T[x_*]$, and strict convexity turns equality into $\tilde{x}' = x_*'$ almost everywhere: the cycloid is the unique minimizer. Read through the optics, the constancy of Snell's invariant is not merely a property the best curve happens to have; it is the certificate that lets every rival be compared to the cycloid in one line. And since bead and ray minimize the same functional, the theorem settles both at once: no wire is faster than the cycloid, and a light ray in a medium with $v \propto \sqrt{y}$ bends along exactly this curve.

Two limitations of the argument, stated plainly. It compares the cycloid against descents, the curves expressible as $x(y)$; ruling out paths that dip below $y_B$ and climb back takes the heavier sufficiency machinery of the calculus of variations, and does not change the answer in this regime. And it assumes $B$ is within reach of a single descending arc, $x_B \le \tfrac{\pi}{2}\, y_B$; beyond that range the true optimum does dip below its endpoint, a case the remarks after the race below return to. The integrand blows up like $1/\sqrt{y}$ at the start, but harmlessly: along the cycloid $x' \to 0$ there, the integral converges, and any competitor whose time integral diverges loses by default.

## Time along the cycloid

The cycloid has a property that makes its motion easy to write down exactly. Dividing the arc-length element by the speed,

$$
dt = \frac{ds}{v} = \frac{2R\sin(\theta/2)\,d\theta}{2\sqrt{gR}\,\sin(\theta/2)} = \sqrt{\frac{R}{g}}\; d\theta.
$$

The sines cancel: the bead advances through equal rolling angles in equal times, $\theta = t\sqrt{g/R}$. The descent from the cusp to the lowest point ($\theta = \pi$) takes

$$
T_{\text{cycloid}} = \pi \sqrt{\frac{R}{g}}.
$$

For comparison, take $B$ at the bottom of the arc, so $B = (\pi R, 2R)$. The straight wire from $A$ to $B$ is a uniformly accelerated slide of length $L = R\sqrt{\pi^2 + 4}$; solving $\tfrac12 (g\, y_B/L)\, t^2 = L$ gives

$$
T_{\text{line}} = \sqrt{\pi^2 + 4}\;\sqrt{\frac{R}{g}} \approx 3.72\,\sqrt{\frac{R}{g}},
$$

about 19% slower than the cycloid's $\pi \approx 3.14$. A third strategy, dropping straight down $2R$ and then running flat to $B$ (with an idealized corner that preserves speed), takes $\left(2 + \tfrac{\pi}{2}\right)\sqrt{R/g} \approx 3.57\,\sqrt{R/g}$: better than the line, still beaten by the cycloid. All three positions below are computed from these closed forms, no numerical integration:

<div class="br1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><button id="br1-start" type="button" style="padding: 0.2rem 0.55rem; min-width: 4.5em; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">start</button><button id="br1-reset" type="button" style="padding: 0.2rem 0.55rem; min-width: 4.5em; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">reset</button><span>elapsed τ = <strong id="br1-tau" style="display: inline-block; min-width: 3.2em;">0.00</strong></span><span style="color: #2563eb;">cycloid: <strong id="br1-t1" style="display: inline-block; min-width: 4.6em;">–</strong></span><span style="color: #d97706;">drop and run: <strong id="br1-t2" style="display: inline-block; min-width: 4.6em;">–</strong></span><span style="color: #dc2626;">line: <strong id="br1-t3" style="display: inline-block; min-width: 4.6em;">–</strong></span></div><svg id="br1-svg" viewBox="0 0 640 420" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Three beads racing from A to B along a cycloid, a drop-then-run path, and a straight line; the cycloid bead arrives first."></svg></div>
<script>
(function () {
  var startBtn = document.getElementById('br1-start');
  if (!startBtn) return;
  var resetBtn = document.getElementById('br1-reset');
  var tauDisp = document.getElementById('br1-tau');
  var t1Disp = document.getElementById('br1-t1');
  var t2Disp = document.getElementById('br1-t2');
  var t3Disp = document.getElementById('br1-t3');
  var svg = document.getElementById('br1-svg');
  var S = 165, X0 = 60, Y0 = 45;
  var CYC = '#2563eb', DRP = '#d97706', LIN = '#dc2626';
  var PI = Math.PI;
  var T1 = PI, T2 = 2 + PI / 2, T3 = Math.sqrt(PI * PI + 4);
  function px(x) { return X0 + S * x; }
  function py(y) { return Y0 + S * y; }
  function cycloidPos(tau) {
    var th = Math.min(tau, PI);
    return [th - Math.sin(th), 1 - Math.cos(th)];
  }
  function dropRunPos(tau) {
    if (tau <= 2) return [0, Math.min(tau * tau / 2, 2)];
    return [Math.min(2 * (tau - 2), PI), 2];
  }
  function linePos(tau) {
    var L = Math.sqrt(PI * PI + 4);
    var s = Math.min(tau * tau / L, L);
    return [PI * s / L, 2 * s / L];
  }
  var tau = 0;
  function render() {
    var out = '';
    var cyc = '';
    for (var i = 0; i <= 120; i++) {
      var th = PI * i / 120;
      cyc += (i === 0 ? 'M' : 'L') + px(th - Math.sin(th)).toFixed(1) + ',' + py(1 - Math.cos(th)).toFixed(1) + ' ';
    }
    out += '<path d="' + cyc + '" fill="none" stroke="' + CYC + '" stroke-width="2"/>';
    out += '<path d="M' + px(0) + ',' + py(0) + ' L' + px(0) + ',' + py(2) + ' L' + px(PI) + ',' + py(2) + '" fill="none" stroke="' + DRP + '" stroke-width="2"/>';
    out += '<line x1="' + px(0) + '" y1="' + py(0) + '" x2="' + px(PI) + '" y2="' + py(2) + '" stroke="' + LIN + '" stroke-width="2"/>';
    out += '<text x="' + (px(0) - 14) + '" y="' + (py(0) + 4) + '" font-size="14" fill="currentColor">A</text>';
    out += '<text x="' + (px(PI) + 10) + '" y="' + (py(2) + 4) + '" font-size="14" fill="currentColor">B</text>';
    out += '<text x="' + px(1.9) + '" y="' + (py(2 - 0.02) - 10) + '" font-size="12" fill="' + CYC + '">cycloid</text>';
    out += '<text x="' + (px(0) + 8) + '" y="' + py(1.35) + '" font-size="12" fill="' + DRP + '">drop and run</text>';
    out += '<text x="' + px(1.35) + '" y="' + (py(0.75) - 8) + '" font-size="12" fill="' + LIN + '">straight line</text>';
    var p1 = cycloidPos(tau), p2 = dropRunPos(tau), p3 = linePos(tau);
    out += '<circle cx="' + px(p3[0]).toFixed(1) + '" cy="' + py(p3[1]).toFixed(1) + '" r="7" fill="' + LIN + '"/>';
    out += '<circle cx="' + px(p2[0]).toFixed(1) + '" cy="' + py(p2[1]).toFixed(1) + '" r="7" fill="' + DRP + '"/>';
    out += '<circle cx="' + px(p1[0]).toFixed(1) + '" cy="' + py(p1[1]).toFixed(1) + '" r="7" fill="' + CYC + '"/>';
    svg.innerHTML = out;
    tauDisp.textContent = tau.toFixed(2);
    t1Disp.textContent = tau >= T1 ? 'τ = ' + T1.toFixed(2) : '–';
    t2Disp.textContent = tau >= T2 ? 'τ = ' + T2.toFixed(2) : '–';
    t3Disp.textContent = tau >= T3 ? 'τ = ' + T3.toFixed(2) : '–';
  }
  var running = false, last = null;
  function frame(ts) {
    if (!running) return;
    if (last !== null) {
      tau += 0.0016 * (ts - last);
      if (tau >= T3 + 0.4) { tau = T3 + 0.4; running = false; startBtn.textContent = 'start'; }
      render();
    }
    last = ts;
    if (running) requestAnimationFrame(frame);
  }
  startBtn.addEventListener('click', function () {
    if (running) { running = false; startBtn.textContent = 'start'; return; }
    if (tau >= T3 + 0.4) tau = 0;
    running = true; last = null; startBtn.textContent = 'pause';
    requestAnimationFrame(frame);
  });
  resetBtn.addEventListener('click', function () {
    running = false; startBtn.textContent = 'start'; tau = 0; render();
  });
  render();
})();
</script>

Two remarks the picture suggests. First, the optimal start is a free fall: the cycloid leaves its cusp vertically, which is what $\sin\alpha = C\sqrt{y}$ demands at $y = 0$. Second, if $B$ is far away and shallow (specifically $x_B > \tfrac{\pi}{2} y_B$), the optimal arc passes below $B$ and comes back up: the bead overshoots the destination depth to carry more speed across the long horizontal stretch, then spends some of it climbing.

The race has also been run inside a video game. A [post on r/gaming](https://www.reddit.com/r/gaming/comments/bkfarl/roller_coaster_tycoon_had_physics_so_accurate/) restages it in *RollerCoaster Tycoon*, the 1999 amusement-park simulation: coaster trains released on differently shaped tracks between the same endpoints, with the cycloid-shaped drop finishing first. The game computes each train's motion from the shape of the track it rides rather than playing a fixed animation, so nothing in it knows about cycloids; as the post puts it, the game had "physics so accurate that it passed the brachistochrone test."

## The same curve is the tautochrone

The cycloid solves a second problem, one [Huygens](https://en.wikipedia.org/wiki/Christiaan_Huygens) had settled decades before Bernoulli posed his: it is also the **tautochrone** (equal time). Turn the arc into a bowl (cusps up, vertex down) and release a bead from rest anywhere on it: the time to reach the bottom does not depend on the starting point.

The reason is a hidden harmonic oscillator. Measure arc length $s$ from the bottom of the bowl and height $h$ above the bottom. For the cycloid, $s = 4R\cos(\theta/2)$ and $h = 2R\cos^2(\theta/2)$, so

$$
h = \frac{s^2}{8R}:
$$

as a function of arc length, the bowl is an exact parabolic potential well. Conservation of energy, $\tfrac12 \dot{s}^2 + g h = g h_0$, then describes [simple harmonic motion](https://en.wikipedia.org/wiki/Simple_harmonic_motion) in $s$ with angular frequency $\omega = \sqrt{g/4R}$, so

$$
s(t) = s_0 \cos(\omega t),
$$

whose period is independent of the amplitude $s_0$. Every bead reaches $s = 0$ after a quarter period, $\frac{\pi}{2\omega} = \pi\sqrt{R/g}$, the same number as the brachistochrone descent time. The four beads below follow this closed form (and keep oscillating past the bottom, like pendulums):

<div class="br2-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><button id="br2-start" type="button" style="padding: 0.2rem 0.55rem; min-width: 4.5em; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">start</button><button id="br2-reset" type="button" style="padding: 0.2rem 0.55rem; min-width: 4.5em; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">reset</button><span>elapsed τ = <strong id="br2-tau" style="display: inline-block; min-width: 3.2em;">0.00</strong></span><span>the beads meet the bottom together at τ = π, 3π, 5π, …</span></div><svg id="br2-svg" viewBox="0 0 640 380" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Four beads released from different heights on a cycloid bowl, oscillating in phase and crossing the bottom simultaneously."></svg></div>
<script>
(function () {
  var startBtn = document.getElementById('br2-start');
  if (!startBtn) return;
  var resetBtn = document.getElementById('br2-reset');
  var tauDisp = document.getElementById('br2-tau');
  var svg = document.getElementById('br2-svg');
  var S = 88, X0 = 40, Y0 = 40;
  var PI = Math.PI;
  var COLS = ['#2563eb', '#dc2626', '#d97706', '#16a34a'];
  var TH0 = [0.55, 1.35, 2.1, 5.35];
  var RADII = [10, 8.5, 7, 5.5];
  function px(x) { return X0 + S * x; }
  function py(y) { return Y0 + S * y; }
  function posOf(th) { return [th - Math.sin(th), 1 - Math.cos(th)]; }
  var tau = 0;
  function render() {
    var out = '';
    var bowl = '';
    for (var i = 0; i <= 200; i++) {
      var th = 2 * PI * i / 200;
      var p = posOf(th);
      bowl += (i === 0 ? 'M' : 'L') + px(p[0]).toFixed(1) + ',' + py(p[1]).toFixed(1) + ' ';
    }
    out += '<path d="' + bowl + '" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>';
    out += '<line x1="' + px(PI) + '" y1="' + (py(2) - 8) + '" x2="' + px(PI) + '" y2="' + (py(2) + 12) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>';
    out += '<text x="' + px(PI) + '" y="' + (py(2) + 28) + '" text-anchor="middle" font-size="12" fill="currentColor">bottom</text>';
    for (var b = 0; b < 4; b++) {
      var s0 = 4 * Math.cos(TH0[b] / 2);
      var s = s0 * Math.cos(tau / 2);
      var th = 2 * Math.acos(Math.max(-1, Math.min(1, s / 4)));
      var p = posOf(th);
      var start = posOf(TH0[b]);
      out += '<circle cx="' + px(start[0]).toFixed(1) + '" cy="' + py(start[1]).toFixed(1) + '" r="3" fill="none" stroke="' + COLS[b] + '" stroke-width="1.3"/>';
      out += '<circle cx="' + px(p[0]).toFixed(1) + '" cy="' + py(p[1]).toFixed(1) + '" r="' + RADII[b] + '" fill="' + COLS[b] + '" fill-opacity="0.85"/>';
    }
    svg.innerHTML = out;
    tauDisp.textContent = tau.toFixed(2);
  }
  var running = false, last = null;
  function frame(ts) {
    if (!running) return;
    if (last !== null) { tau += 0.0016 * (ts - last); render(); }
    last = ts;
    requestAnimationFrame(frame);
  }
  startBtn.addEventListener('click', function () {
    if (running) { running = false; startBtn.textContent = 'start'; return; }
    running = true; last = null; startBtn.textContent = 'pause';
    requestAnimationFrame(frame);
  });
  resetBtn.addEventListener('click', function () {
    running = false; startBtn.textContent = 'start'; tau = 0; render();
  });
  render();
})();
</script>

Huygens found this in the 1650s while hunting for a pendulum whose period does not change with amplitude (a circular pendulum's period does, slightly, which ruins a clock as the swing decays). His fix used another property of the cycloid: its **[evolute](https://en.wikipedia.org/wiki/Evolute)**, the curve traced by the centers of its osculating circles, is a congruent cycloid. Hanging the pendulum from a cusp between two cycloidal cheeks makes the bob wrap along them and swing on a cycloid, giving a truly amplitude-independent period. He published the theory in the [*Horologium Oscillatorium*](https://en.wikipedia.org/wiki/Horologium_Oscillatorium) (1673).

## A little history

Galileo had already noticed in the [*Discorsi*](https://en.wikipedia.org/wiki/Two_New_Sciences) (1638) that descent along a circular arc beats the straight chord between the same endpoints. The full problem was posed by Johann Bernoulli in the [*Acta Eruditorum*](https://en.wikipedia.org/wiki/Acta_Eruditorum) in June 1696 as a public challenge. Solutions appeared the following year from Johann himself, his brother [Jakob](https://en.wikipedia.org/wiki/Jacob_Bernoulli), Leibniz, [Tschirnhaus](https://en.wikipedia.org/wiki/Ehrenfried_Walther_von_Tschirnhaus), [l'Hôpital](https://en.wikipedia.org/wiki/Guillaume_de_l%27H%C3%B4pital), and Newton, whose solution was published anonymously; Bernoulli is reported to have recognized the author anyway, "as the lion by its claw."

The aftermath mattered more than the contest. Jakob Bernoulli's solution method, clumsier than Johann's optics trick but more general, treated the whole curve as the unknown and asked how the time integral responds to small deformations. That question, systematized by Euler and Lagrange in the following decades, became the **[calculus of variations](https://en.wikipedia.org/wiki/Calculus_of_variations)**: the framework behind least-action mechanics, geodesics, and optimal control. The cycloid was its first solved problem.

## References

- Herman H. Goldstine. *A History of the Calculus of Variations from the 17th through the 19th Century*. Springer, 1980. Chapter 1 covers the challenge, the 1697 solutions, and the original texts.
- Christiaan Huygens. *Horologium Oscillatorium*. Paris, 1673. The tautochrone property and the cycloidal pendulum clock.
- Galileo Galilei. *Discorsi e dimostrazioni matematiche intorno a due nuove scienze*. Leiden, 1638. Descent along arcs and chords, Third Day.
- Héctor J. Sussmann, Jan C. Willems. *300 years of optimal control: from the brachystochrone to the maximum principle*. IEEE Control Systems Magazine, 17(3):32-44, 1997. The brachistochrone as the seed of optimal control.
- John L. Troutman. *Variational Calculus and Optimal Control: Optimization with Elementary Convexity*. 2nd edition, Springer, 1996. The convexity route to global minimality used above, with the brachistochrone as a worked application.
- Gary Lawlor. *A new minimization proof for the brachistochrone*. The American Mathematical Monthly, 103(3):242-249, 1996. Another complete minimality proof, decomposing the global problem into local single-variable ones.
- Mark Levi. *The Mathematical Mechanic*. Princeton University Press, 2009. Physical derivations, including the Snell's-law solution.
