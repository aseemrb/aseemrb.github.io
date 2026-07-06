---
author: Aseem Raj Baranwal
pubDatetime: 2026-03-15T00:22:00Z
title: Heisenberg uncertainty as Fourier duality
slug: heisenberg-uncertainty-as-fourier-duality
featured: false
draft: false
tags:
  - physics
  - mathematics
description:
  "The textbook framing makes the uncertainty principle sound like a measurement artifact. It isn't. It is a property of any wave: a packet narrow in x has a Fourier decomposition spread in p, with the bound σx · σp ≥ ℏ/2 saturated by a Gaussian. This post derives that statement from photoelectric-effect-level physics."
---

The textbook story for the uncertainty principle is that quantum measurements come with a built-in disturbance: pin down a particle's position with a photon, and the photon kicks the particle's momentum. This is Heisenberg's [gamma-ray microscope](https://en.wikipedia.org/wiki/Heisenberg%27s_microscope). The picture isn't *wrong*, but it puts the principle on the wrong footing. It makes uncertainty sound like a constraint imposed by clumsy detectors, when in fact it is a property of the wave function itself.

The goal of this post is to derive the uncertainty relation from scratch, assuming only what an attentive student would already know after meeting the photoelectric effect and de Broglie's matter waves. We'll build up the wave function, define what its **spread** is, see why position and momentum give two views of the same wave, and finally prove

$$
\sigma_x \, \sigma_p \;\ge\; \tfrac{\hbar}{2}.
$$

Along the way the constant $\hbar$ will appear in exactly one place: as a unit conversion. Strip it out and the inequality reduces to a theorem about Fourier transforms that engineers, musicians, and microscopists already work with under different names. The [bandwidth-duration product](https://en.wikipedia.org/wiki/Bandwidth_(signal_processing)) that bounds how fast a radio channel can transmit, and the [Abbe diffraction limit](https://en.wikipedia.org/wiki/Diffraction-limited_system#The_Abbe_diffraction_limit_for_a_microscope) that bounds how small a feature an optical microscope can resolve, are both special cases.

## Quantum particles are waves

In 1905 Einstein explained the photoelectric effect by saying that light arrives in chunks of energy $E = hf$. A wave (the electromagnetic field) carries particle-like packets (photons). Twenty years later, [Louis de Broglie](https://en.wikipedia.org/wiki/Louis_de_Broglie) suggested the symmetric statement: matter, conventionally thought of as particles, also has a wave description, with wavelength

$$
\lambda \;=\; \frac{h}{p},
$$

where $p$ is the particle's momentum. This is confirmed in many experiments, from [electron diffraction through nickel crystals](https://en.wikipedia.org/wiki/Davisson%E2%80%93Germer_experiment) (Davisson and Germer, 1927) to [interference fringes for buckyballs](https://en.wikipedia.org/wiki/Matter_wave#Molecules) (Arndt et al., 1999) and, more recently, for molecules of more than $25{,}000$ atomic mass units (Fein et al., 2019).

> We don't read this as saying that an electron is sometimes a particle and sometimes a wave. We read it as: the **wave** is the fundamental object, and what we call the **particle** is just the localized point on a detector where a measurement of the wave is recorded.

In one dimensional space, the wave function is a complex-valued function $\psi(x)$ defined for every $x \in \mathbb R$. The [**Born rule**](https://en.wikipedia.org/wiki/Born_rule) assigns it a physical meaning:

$$
|\psi(x)|^2 \;=\; \text{probability density of finding the particle at } x.
$$

So $\int_a^b |\psi(x)|^2 \, dx$ is the probability that a position measurement returns a value between $a$ and $b$. We always assume $\psi$ is **normalized**, $\int |\psi(x)|^2 \, dx = 1$, so that the total probability is $1$.

The wave function $\psi$ is a complex number at every $x$. The probability density $|\psi|^2$ depends only on its modulus, not on its phase, but the phase still matters: it controls how different parts of $\psi$ interfere with each other when we evolve the wave or change basis.

## The spread of a distribution

To talk precisely about how localized a particle is, we use the **standard deviation** of its position distribution:

$$
\langle x\rangle \;=\; \int x \, |\psi(x)|^2 \, dx, \qquad \sigma_x^2 \;=\; \int (x - \langle x\rangle)^2 \, |\psi(x)|^2 \, dx.
$$

If you've seen mean and standard deviation in any statistics course, this is the same definition. $\langle x\rangle$ is the average position you'd see if you prepared this state many times and measured each time; $\sigma_x$ is the typical scatter around that average. A small $\sigma_x$ means a tightly localized particle; a large $\sigma_x$ means a spread-out one.

This $\sigma_x$ is the **uncertainty in $x$** that ends up on the left of Heisenberg's inequality. The **uncertainty in $p$** will be defined the same way, once we figure out what the momentum probability density is.

## The momentum picture is the same wave, looked at differently

Here is the central observation. Consider a state with one perfectly definite momentum $p$. By de Broglie this corresponds to a single wavelength $\lambda = h/p$, i.e., a single wavenumber $k = 2\pi/\lambda = p/\hbar$, where $\hbar = h/(2\pi)$ is the reduced Planck constant. The wave function is a pure complex exponential:

$$
\psi_p(x) \;=\; \frac{1}{\sqrt{2\pi\hbar}} \, e^{ipx/\hbar}.
$$

Notice that $|\psi_p(x)|^2 = 1/(2\pi\hbar)$ is constant in $x$. A state with definite momentum has uniform position probability over all of space, i.e., is completely delocalized. (This wave function is not strictly normalizable; it is an idealized limit.)

Most physical states are not pure plane waves. They are **superpositions** of plane waves with different momenta:

$$
\psi(x) \;=\; \frac{1}{\sqrt{2\pi\hbar}} \int_{-\infty}^{\infty} \tilde\psi(p) \, e^{ipx/\hbar} \, dp.
$$

Read this as: build $\psi$ by adding up plane waves of every momentum $p$, weighted by complex amplitudes $\tilde\psi(p)$. The function $\tilde\psi(p)$ tells you how much of each momentum is in the mix.

By the [**Fourier inversion theorem**](https://en.wikipedia.org/wiki/Fourier_inversion_theorem) (the same integral, run backwards to recover $\tilde\psi$ from $\psi$), this relation is invertible:

$$
\tilde\psi(p) \;=\; \frac{1}{\sqrt{2\pi\hbar}} \int_{-\infty}^{\infty} \psi(x) \, e^{-ipx/\hbar} \, dx.
$$

So $\psi(x)$ and $\tilde\psi(p)$ are determined by each other. They are the same physical state written in two different bases: position and momentum (the same way one vector can be written in two coordinate systems).

The Born rule applies in both bases. $|\tilde\psi(p)|^2$ is the probability density for a momentum measurement returning $p$. Its standard deviation,

$$
\langle p\rangle \;=\; \int p\, |\tilde\psi(p)|^2 \, dp, \qquad \sigma_p^2 \;=\; \int (p - \langle p\rangle)^2 \, |\tilde\psi(p)|^2 \, dp,
$$

is the **uncertainty in $p$**.

The relation between $\psi(x)$ and $\tilde\psi(p)$ above is the standard **Fourier transform** of mathematics, with one convention-dependent rescaling. Setting $k = p/\hbar$ removes $\hbar$ from the integral entirely:

$$
\tilde\psi(k) \;=\; \frac{1}{\sqrt{2\pi}} \int \psi(x) \, e^{-ikx} \, dx.
$$

Whatever inequality holds between $\sigma_x$ and $\sigma_k$ for arbitrary square-integrable $\psi$ is a fact of harmonic analysis, not a fact of quantum mechanics. We translate to the quantum statement at the end by writing $\sigma_p = \hbar \sigma_k$.

## Localized in space means spread in wavenumber

Two extreme examples make the qualitative tradeoff visible.

(a) **A pure plane wave**, $\psi(x) = e^{ik_0 x}$ extended over all $x$. Its Fourier transform is a Dirac delta at $k = k_0$ (an idealized infinitely narrow spike of unit area). Spread in $x$: infinite. Spread in $k$: zero.

(b) **A Dirac delta at $x_0$**, $\psi(x) = \delta(x - x_0)$. Its Fourier transform is the constant $e^{-ikx_0}/\sqrt{2\pi}$. Spread in $x$: zero. Spread in $k$: infinite.

Realistic wave functions sit between these two extremes. Squeezing the position support of $\psi$ requires combining many wavelengths, which is what spreads $\tilde\psi$ in $k$. Conversely, building a sharp peak at one wavenumber requires letting $\psi$ extend over many wavelengths in $x$.

This tradeoff is well known from contexts that have nothing to do with quantum mechanics:

- A radio engineer designing a transmitter knows that a pulse of duration $T$ contains frequencies spread over at least $\sim 1/T$. This is the constraint behind [channel bandwidth](https://en.wikipedia.org/wiki/Bandwidth_(signal_processing)) allocation: faster Morse keying or higher digital data rates need proportionally wider bands, which is why a Wi-Fi channel (tens of MHz) is thousands of times wider than an AM radio channel (about 10 kHz).
- A pianist knows that hitting a key for $50$ ms gives a percussive thud with no clean pitch, while a sustained tone has a well-defined pitch. The difference is visible on a [spectrogram](https://en.wikipedia.org/wiki/Spectrogram): vertical streaks at the attack ([transients](https://en.wikipedia.org/wiki/Transient_(acoustics)) are broad in frequency, narrow in time) and clean horizontal lines once the note settles (narrow in frequency, extended in time).
- An optical engineer knows that a small aperture diffracts a broad spot. Confining a beam in space spreads it in angle. This is the [Airy disk](https://en.wikipedia.org/wiki/Airy_disk) seen through a telescope and the diffraction-limited spot size of a laser focused through a lens.

Each of these is the same mathematical statement, applied to time and frequency, or to space and angle, instead of position and wavenumber.

The precise quantitative version, first proved with the constant $\tfrac{1}{2}$ by [Kennard](https://en.wikipedia.org/wiki/Earle_Hesse_Kennard) (1927), is

$$
\sigma_x \, \sigma_k \;\ge\; \tfrac{1}{2}.
$$

Substituting $\sigma_p = \hbar \sigma_k$ on the left:

$$
\sigma_x \, \sigma_p \;\ge\; \tfrac{\hbar}{2}.
$$

This is the **Heisenberg uncertainty relation**. The single factor of $\hbar$ that distinguishes it from a textbook signal-processing identity is just unit conversion.

## The Gaussian wave packet

The Gaussian wave packet has a particularly clean Fourier transform: another Gaussian. Take

$$
\psi(x) \;=\; \frac{1}{(2\pi\sigma_x^2)^{1/4}} \, e^{-x^2/(4\sigma_x^2)} \, e^{i p_0 x / \hbar}.
$$

This describes a localized blob centered at the origin with width $\sigma_x$, modulated by an oscillation of average momentum $p_0$. Its Fourier transform is

$$
\tilde\psi(p) \;\propto\; e^{-(p - p_0)^2 / (4 \sigma_p^2)}, \qquad \sigma_p \;=\; \frac{\hbar}{2 \sigma_x}.
$$

The product $\sigma_x \sigma_p$ is locked at exactly $\hbar/2$. Among all wave functions, the Gaussian saturates the Heisenberg inequality at equality. Any other shape has a strictly larger product.

In the widget below, $\hbar = 1$. Slide $\sigma_x$ and watch the position packet narrow while the momentum distribution widens, with the product fixed. The **carrier momentum** $p_0$, the packet's average momentum, shifts the momentum peak sideways without changing its width; in position space, increasing $p_0$ packs more oscillations into the same envelope. The result is the **wave packet** picture: a localized blob whose internal oscillations have de Broglie wavelength $h/p_0$.

<div class="hu-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1.5rem; flex-wrap: wrap; align-items: flex-end; margin-bottom: 1rem; font-size: 0.9em;"><label style="display: flex; flex-direction: column; gap: 0.25rem; flex: 1 1 240px;"><span>position width: σ<sub>x</sub> = <strong id="hu-sx-val">1.00</strong></span><input id="hu-sx" type="range" min="0.3" max="4" step="0.02" value="1"></label><label style="display: flex; flex-direction: column; gap: 0.25rem; flex: 1 1 240px;"><span>carrier momentum: p<sub>0</sub> = <strong id="hu-p0-val">2.0</strong></span><input id="hu-p0" type="range" min="-3" max="3" step="0.05" value="2"></label></div><svg id="hu-svg" viewBox="0 0 720 380" style="width: 100%; max-width: 720px; height: auto; display: block; margin: 0 auto;" aria-label="Top panel: position-space wave packet with oscillating real part inside a Gaussian envelope. Bottom panel: momentum-space probability density. As σ_x shrinks, σ_p grows; the product is locked at ℏ/2."></svg><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.4rem 1rem; margin-top: 0.9rem; font-size: 0.92em;"><div>σ<sub>x</sub> = <strong id="hu-sx-disp">1.00</strong></div><div>σ<sub>p</sub> = <strong id="hu-sp-disp">0.50</strong></div><div>σ<sub>x</sub> · σ<sub>p</sub> = <strong id="hu-prod">0.50</strong> = ℏ/2</div></div><div style="margin-top: 0.45rem; font-size: 0.88em; font-style: italic;">(units with ℏ = 1, so the bound ℏ/2 reads 0.50)</div></div>
<script>
(function () {
  var svg = document.getElementById('hu-svg');
  if (!svg) return;
  var sxIn = document.getElementById('hu-sx');
  var p0In = document.getElementById('hu-p0');
  var sxVal = document.getElementById('hu-sx-val');
  var p0Val = document.getElementById('hu-p0-val');
  var sxDisp = document.getElementById('hu-sx-disp');
  var spDisp = document.getElementById('hu-sp-disp');
  var prodDisp = document.getElementById('hu-prod');
  var W = 720;
  var pad = 50;
  var topY0 = 35, topY1 = 175;
  var botY0 = 215, botY1 = 355;
  var topMid = (topY0 + topY1) / 2;
  var topAmp = (topY1 - topY0) / 2 - 8;
  var botAmp = (botY1 - botY0) - 12;
  var xMin = -10, xMax = 10;
  var pMin = -5, pMax = 5;
  var POS = '#2563eb';
  var MOM = '#dc2626';
  var N = 400;
  function pxX(x) { return pad + (x - xMin) / (xMax - xMin) * (W - 2 * pad); }
  function pxP(p) { return pad + (p - pMin) / (pMax - pMin) * (W - 2 * pad); }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function axes(y0, y1, vMin, vMax, axisLabel, step) {
    var s = '';
    var xLeft = pad, xRight = W - pad;
    s += '<line x1="' + xLeft + '" y1="' + y1 + '" x2="' + xRight + '" y2="' + y1 + '" stroke="currentColor" stroke-opacity="0.4"/>';
    for (var v = Math.ceil(vMin); v <= Math.floor(vMax); v++) {
      var px = pad + (v - vMin) / (vMax - vMin) * (W - 2 * pad);
      s += '<line x1="' + px + '" y1="' + y1 + '" x2="' + px + '" y2="' + (y1 + 4) + '" stroke="currentColor" stroke-opacity="0.35"/>';
    }
    var first = Math.ceil(vMin / step) * step;
    for (var v = first; v <= Math.floor(vMax / step) * step + 0.001; v += step) {
      var px = pad + (v - vMin) / (vMax - vMin) * (W - 2 * pad);
      s += '<text x="' + px + '" y="' + (y1 + 16) + '" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.7">' + v + '</text>';
    }
    s += '<text x="' + (xRight + 6) + '" y="' + (y1 + 5) + '" font-size="12" font-style="italic" fill="currentColor">' + axisLabel + '</text>';
    return s;
  }
  function render() {
    var sx = parseFloat(sxIn.value);
    var p0 = parseFloat(p0In.value);
    var sp = 1 / (2 * sx);
    sxVal.textContent = sx.toFixed(2);
    p0Val.textContent = p0.toFixed(1);
    sxDisp.textContent = sx.toFixed(2);
    spDisp.textContent = sp.toFixed(2);
    prodDisp.textContent = (sx * sp).toFixed(2);
    var s = '';
    s += '<text x="' + pad + '" y="' + (topY0 - 12) + '" font-size="12" fill="currentColor">position space (where the particle is): Re <tspan font-style="italic">ψ</tspan>(<tspan font-style="italic">x</tspan>) inside its Gaussian envelope</text>';
    s += '<text x="' + pad + '" y="' + (botY0 - 12) + '" font-size="12" fill="currentColor">momentum space (how fast it moves): probability density |<tspan font-style="italic">ψ̃</tspan>(<tspan font-style="italic">p</tspan>)|²</text>';
    s += axes(topY0, topY1, xMin, xMax, 'x', 5);
    s += axes(botY0, botY1, pMin, pMax, 'p', 1);
    s += '<line x1="' + pad + '" y1="' + topMid + '" x2="' + (W - pad) + '" y2="' + topMid + '" stroke="currentColor" stroke-opacity="0.15"/>';
    var envPlusPts = [];
    var envMinusPts = [];
    var rePts = [];
    for (var i = 0; i <= N; i++) {
      var x = xMin + (xMax - xMin) * i / N;
      var px = pxX(x);
      var env = Math.exp(-x * x / (4 * sx * sx));
      var re = env * Math.cos(p0 * x);
      envPlusPts.push(px.toFixed(1) + ',' + (topMid - env * topAmp).toFixed(1));
      envMinusPts.push(px.toFixed(1) + ',' + (topMid + env * topAmp).toFixed(1));
      rePts.push(px.toFixed(1) + ',' + (topMid - re * topAmp).toFixed(1));
    }
    s += '<polyline points="' + envPlusPts.join(' ') + '" stroke="' + POS + '" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.55" fill="none"/>';
    s += '<polyline points="' + envMinusPts.join(' ') + '" stroke="' + POS + '" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.55" fill="none"/>';
    s += '<polyline points="' + rePts.join(' ') + '" stroke="' + POS + '" stroke-width="1.6" fill="none"/>';
    s += '<line x1="' + pxX(-sx).toFixed(1) + '" y1="' + topY0 + '" x2="' + pxX(-sx).toFixed(1) + '" y2="' + topY1 + '" stroke="' + POS + '" stroke-dasharray="2 4" stroke-opacity="0.55"/>';
    s += '<line x1="' + pxX(sx).toFixed(1) + '" y1="' + topY0 + '" x2="' + pxX(sx).toFixed(1) + '" y2="' + topY1 + '" stroke="' + POS + '" stroke-dasharray="2 4" stroke-opacity="0.55"/>';
    s += '<text x="' + (pxX(sx) + 5).toFixed(1) + '" y="' + (topY0 + 14) + '" font-size="11" fill="' + POS + '" font-style="italic">σ<tspan baseline-shift="-30%" font-size="8">x</tspan></text>';
    var ftPts = [];
    for (var i = 0; i <= N; i++) {
      var p = pMin + (pMax - pMin) * i / N;
      var px = pxP(p);
      var f = Math.exp(-(p - p0) * (p - p0) / (2 * sp * sp));
      ftPts.push(px.toFixed(1) + ',' + (botY1 - f * botAmp).toFixed(1));
    }
    var fillPts = ftPts.slice();
    fillPts.unshift(pxP(pMin).toFixed(1) + ',' + botY1);
    fillPts.push(pxP(pMax).toFixed(1) + ',' + botY1);
    s += '<polygon points="' + fillPts.join(' ') + '" fill="' + MOM + '" fill-opacity="0.18"/>';
    s += '<polyline points="' + ftPts.join(' ') + '" stroke="' + MOM + '" stroke-width="2" fill="none"/>';
    var spLeft = clamp(p0 - sp, pMin, pMax);
    var spRight = clamp(p0 + sp, pMin, pMax);
    s += '<line x1="' + pxP(spLeft).toFixed(1) + '" y1="' + botY0 + '" x2="' + pxP(spLeft).toFixed(1) + '" y2="' + botY1 + '" stroke="' + MOM + '" stroke-dasharray="2 4" stroke-opacity="0.55"/>';
    s += '<line x1="' + pxP(spRight).toFixed(1) + '" y1="' + botY0 + '" x2="' + pxP(spRight).toFixed(1) + '" y2="' + botY1 + '" stroke="' + MOM + '" stroke-dasharray="2 4" stroke-opacity="0.55"/>';
    s += '<text x="' + (pxP(spRight) + 5).toFixed(1) + '" y="' + (botY0 + 14) + '" font-size="11" fill="' + MOM + '" font-style="italic">σ<tspan baseline-shift="-30%" font-size="8">p</tspan></text>';
    svg.innerHTML = s;
  }
  sxIn.addEventListener('input', render);
  p0In.addEventListener('input', render);
  render();
})();
</script>

## A two-line proof, with the scaffolding spelled out

The proof of $\sigma_x \sigma_p \ge \hbar/2$ uses three ingredients from the wave-function picture.

**(i) Operators.** A measurement is represented by a linear map on wave functions. The **position operator** is **multiply by $x$**:

$$
(X \psi)(x) \;=\; x \, \psi(x).
$$

The **momentum operator** is determined by demanding that a plane wave $e^{ipx/\hbar}$ should be its eigenfunction with eigenvalue $p$. Differentiating $e^{ipx/\hbar}$ gives $(ip/\hbar) e^{ipx/\hbar}$, so the operator that produces $p$ as eigenvalue is $-i\hbar \, d/dx$:

$$
(P \psi)(x) \;=\; -i\hbar \, \frac{d\psi}{dx}.
$$

This is the same momentum that appears in $p = h/\lambda$.

**(ii) Expectation values.** For an operator $A$ and a normalized state $\psi$, the expected value of the corresponding measurement is

$$
\langle A\rangle \;=\; \int \psi^*(x) \, (A\psi)(x) \, dx,
$$

where $\psi^*$ is the complex conjugate of $\psi$. For $A = X$ this reduces to $\int x |\psi|^2 \, dx$, the average position we already defined. The **standard deviation** of the measurement satisfies $\sigma_A^2 = \langle A^2\rangle - \langle A\rangle^2$, the ordinary statistics formula.

For Hermitian operators (operators that produce real expectation values for any state, the operator analogue of a real number), the standard deviation has another useful form: $\sigma_A^2 = \langle (A - \langle A\rangle)^2\rangle$. Both $X$ and $P$ are Hermitian.

**(iii) Commutators.** Two operators $A$ and $B$ generally do not commute, in the sense that $AB$ and $BA$ act differently on a state. Their **commutator**

$$
[A, B] \;=\; A B - B A
$$

is itself an operator, measuring how much the order of application matters. For position and momentum, a one-line product-rule calculation gives

$$
[X, P]\psi(x) \;=\; x\bigl(-i\hbar \, \psi'(x)\bigr) \;-\; \bigl(-i\hbar \, (x\psi(x))'\bigr) \;=\; i\hbar \, \psi(x).
$$

So $[X, P] = i\hbar$ as an operator identity, holding on every state $\psi$. This is the fact that ultimately produces the $\hbar/2$ on the right-hand side of Heisenberg's inequality.

With these ingredients, the proof is two lines. Define the centered operators $A' = A - \langle A\rangle$ and $B' = B - \langle B\rangle$ (these are also Hermitian). Apply the [Cauchy-Schwarz inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality), which says that for any two square-integrable functions $\varphi$ and $\chi$,

$$
\biggl|\int \varphi^* \chi \, dx\biggr|^2 \;\le\; \biggl(\int |\varphi|^2 \, dx\biggr) \biggl(\int |\chi|^2 \, dx\biggr).
$$

Set $\varphi = A'\psi$ and $\chi = B'\psi$. The right side is $\langle A'^2\rangle \langle B'^2\rangle = \sigma_A^2 \sigma_B^2$. The left side is $|\langle A' B'\rangle|^2$ (moving the Hermitian $A'$ across the integral turns $\int (A'\psi)^* (B'\psi)\,dx$ into $\int \psi^* A'B'\psi\,dx$). So

$$
\sigma_A^2 \, \sigma_B^2 \;\ge\; |\langle A' B'\rangle|^2.
$$

Now decompose

$$
A' B' \;=\; \tfrac{1}{2}\bigl(A'B' + B'A'\bigr) \;+\; \tfrac{1}{2}\bigl(A'B' - B'A'\bigr) \;=\; \tfrac{1}{2}\{A',B'\} \;+\; \tfrac{1}{2}[A',B'].
$$

The first piece (the **anticommutator**, $\{A',B'\}$) is Hermitian, so its expectation is real. The second piece (the commutator) is anti-Hermitian, so its expectation is purely imaginary. So $|\langle A' B'\rangle|^2$ is a real part squared plus an imaginary part squared, and dropping the real (anticommutator) part can only lower it. Hence

$$
|\langle A' B'\rangle|^2 \;\ge\; \biggl|\tfrac{1}{2}\langle [A', B']\rangle\biggr|^2 \;=\; \tfrac{1}{4}|\langle [A, B]\rangle|^2,
$$

(using $[A', B'] = [A, B]$, since adding constants doesn't change the commutator). Putting it together:

$$
\sigma_A \, \sigma_B \;\ge\; \tfrac{1}{2} \, \big|\langle [A, B]\rangle\big|.
$$

This is the **Robertson inequality**. Plugging in $[X, P] = i\hbar$ gives $|\langle [X, P]\rangle| = \hbar$, hence

$$
\sigma_x \, \sigma_p \;\ge\; \tfrac{\hbar}{2}.
$$

The right-hand side is the constant $\hbar/2$ for *every* state $\psi$, because the commutator $[X, P]$ is itself a state-independent constant. No preparation of the particle brings the product below $\hbar/2$.

## Equality holds only for Gaussians

Cauchy-Schwarz becomes an equality precisely when one vector is a scalar multiple of the other. So the uncertainty bound is hit with equality only for states satisfying

$$
P'\psi \;=\; i\lambda \, X'\psi
$$

for some real $\lambda$. (The factor of $i$ comes from a second condition required for full saturation: the symmetric piece $\langle\{X', P'\}\rangle$, the real part dropped in the proof above, must also vanish, which is what forces the proportionality constant to be imaginary.) With $P = -i\hbar \, d/dx$, this is the first-order linear ODE

$$
-i\hbar \, \psi'(x) \;-\; \langle p\rangle \, \psi(x) \;=\; i\lambda \, (x - \langle x\rangle) \, \psi(x).
$$

Separating variables and integrating, $\psi(x)$ is a Gaussian envelope multiplied by a complex exponential. The **minimum-uncertainty wave packet** is exactly the Gaussian wave packet shown in the widget. That is why the readout never strays from $\sigma_x \sigma_p = 0.5$ no matter where you put the sliders.

The Gaussian's recurring role across probability theory and harmonic analysis is not a coincidence: its Fourier transform is again a Gaussian, and it is the limit law of the [central limit theorem](/blog/why-sums-become-gaussian).

A square pulse, a Lorentzian profile $1/(1+x^2)$, a triangular bump: all obey $\sigma_x \sigma_p > \hbar/2$ strictly. The Gaussian sits exactly on the boundary.

## Implications

Several physical facts are direct corollaries of the inequality, though they are not usually presented that way:

1. **Atomic stability.** Confining an electron to a region of size $r$ forces a momentum spread of order $\hbar/r$ by the inequality, hence a kinetic energy of order $\hbar^2/(2 m r^2)$. Coulomb attraction contributes potential energy $-e^2/r$. Minimizing the sum

   $$E(r) \;=\; \frac{\hbar^2}{2 m r^2} \;-\; \frac{e^2}{r}$$

   in $r$ gives the Bohr radius $a_0 = \hbar^2/(m e^2) \approx 0.53\,$ Å at energy $\approx -13.6\,$eV. The hydrogen atom's ground state is the size it is because tightly confining the electron costs more kinetic energy than the Coulomb attraction can pay for.

2. **Single-slit diffraction.** A photon passing through a slit of width $a$ has its transverse position localized to $\sigma_x \sim a$. Heisenberg then forces a transverse momentum spread $\sigma_p \sim \hbar/a$. The angular spread of the resulting beam is $\sigma_p / p \sim \hbar/(a p)$, which (using $p = h/\lambda$) is of order $\lambda/a$: the standard diffraction scale.

3. **Time-frequency duality.** The same inequality applied to time and angular frequency (a Fourier-conjugate pair, with $\hbar = 1$ since they are dimensionally inverse already) says a musical note of duration $T$ has its pitch defined to about $1/T$. Audio codecs like [MP3](https://en.wikipedia.org/wiki/MP3) and [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding) face this tradeoff in their FFT [window length](https://en.wikipedia.org/wiki/Short-time_Fourier_transform): short windows preserve drum attacks but blur frequency, long windows resolve frequencies cleanly but smear transients into pre-echo artifacts. The codec switches between window sizes in response to the signal for exactly this reason.

4. **Diffraction limit in microscopy.** Resolving features smaller than $\lambda/(2\,\mathrm{NA})$ requires light with a correspondingly large transverse momentum spread, which is what the **numerical aperture** $\mathrm{NA}$ (a measure of the range of angles over which the lens accepts light) controls. This is [Abbe's diffraction limit](https://en.wikipedia.org/wiki/Diffraction-limited_system#The_Abbe_diffraction_limit_for_a_microscope) of classical microscopy, and the obstacle that [super-resolution methods](https://en.wikipedia.org/wiki/Super-resolution_microscopy) like STED and PALM had to engineer around: work that won the 2014 Nobel Prize in Chemistry.

## A common pitfall

Heisenberg's gamma-ray microscope thought experiment is a *consistency check*: it shows that any plausible measurement scheme, taken seriously, bumps into the same bound. It is *not* the origin of the bound. The wave function is uncertain even when nobody is looking, because $\psi(x)$ and $\tilde\psi(p)$ are two views of the same vector, and a basis change cannot turn a function spread out in one variable into one localized in the other.

The disturbance interpretation is fine pedagogy as long as it is taken as illustration, not as derivation. The inequality lives in the structure of the wave function itself.

## References

- Werner Heisenberg. *Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik.* Zeitschrift für Physik, 43:172-198, 1927. The original (semi-rigorous) statement.
- Earle Hesse Kennard. *Zur Quantenmechanik einfacher Bewegungstypen.* Zeitschrift für Physik, 44:326-352, 1927. The first explicit $\sigma_x \sigma_p \ge \hbar/2$.
- H. P. Robertson. *The uncertainty principle.* Physical Review, 34(1):163-164, 1929. The general two-operator inequality used above.
- Clinton Davisson, Lester H. Germer. *Diffraction of electrons by a crystal of nickel.* Physical Review, 30(6):705-740, 1927. The experiment that confirmed electron diffraction.
- Markus Arndt, Olaf Nairz, Julian Vos-Andreae, Claudia Keller, Gerbrand van der Zouw, Anton Zeilinger. *Wave-particle duality of C60 molecules.* Nature, 401(6754):680-682, 1999.
- Yaakov Y. Fein, Philipp Geyer, Patrick Zwick, Filip Kiałka, Sebastian Pedalino, Marcel Mayor, Stefan Gerlich, Markus Arndt. *Quantum superposition of molecules beyond 25 kDa.* Nature Physics, 15(12):1242-1245, 2019.
- John Stewart Bell. *Speakable and Unspeakable in Quantum Mechanics.* Cambridge University Press, 1987. Conceptual critique of the disturbance interpretation.
- David J. Griffiths and Darrell F. Schroeter. *Introduction to Quantum Mechanics.* 3rd ed., Cambridge University Press, 2018. Sections 1.6 and 3.5 for the textbook proof.
- Leon Cohen. *Time-Frequency Analysis: Theory and Applications.* Prentice Hall, 1995. The signal-processing reading of the same inequality.
