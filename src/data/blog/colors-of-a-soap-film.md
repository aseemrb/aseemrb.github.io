---
author: Aseem Raj Baranwal
pubDatetime: 2026-10-20T09:30:00Z
title: The colors of a soap film
slug: colors-of-a-soap-film
featured: false
draft: false
tags:
  - physics
  - mathematics
description:
  "A soap film reflects a spectrum that is a single cosine in the reciprocal of the wavelength, so its color is a fixed white minus the cosine transform of the CIE color-matching functions, evaluated at twice the film's optical thickness. The computed sequence agrees with Newton's table of thin-film colors, and the fade to white in thick films is the decay of the transform."
---

A soap film is a sheet of water between two layers of soap molecules, often thinner than a micrometer. A vertical film drains under gravity and is thinner at the top, so in white light it shows bands of color ordered by thickness. Newton watched them on bubbles kept under a glass cover ([*Opticks*](https://www.gutenberg.org/ebooks/33504), Book II, Part I, Observation 17): colored rings formed at the top, widened and moved down as the water drained, and a [black spot](https://en.wikipedia.org/wiki/Soap_film#Black_spots) grew at the top before the bubble broke.

The color at thickness $d$ follows from two ingredients: the fraction of light the film reflects at each wavelength $\lambda$, and the three [color-matching functions](https://en.wikipedia.org/wiki/CIE_1931_color_space#Color_matching) that the [CIE](https://cie.co.at) (the International Commission on Illumination) uses to reduce a spectrum to a color. The first is a single cosine in $1/\lambda$, so the color is a fixed white minus the [cosine transform](https://en.wikipedia.org/wiki/Sine_and_cosine_transforms) of the color-matching functions, evaluated at $2nd$, the extra optical path traveled by light reflected from the film's back surface, where $n$ is the refractive index of water. The computed colors agree with the table of thicknesses that Newton compiled for them.

## The reflected spectrum is a cosine

Consider light of wavelength $\lambda$ that travels normal to the film, perpendicular to its two surfaces. Two beams return toward the eye. One is reflected by the front surface. The other crosses the film, is reflected by the back surface, and crosses the film again.

Light is an electromagnetic wave: an electric field and a magnetic field that oscillate together as the wave travels. The **amplitude** of a beam is the size of its electric field's oscillation, and the brightness of the beam is proportional to the square of its amplitude. In the figure, each beam is labeled with its amplitude as a multiple of the incoming beam's amplitude.

<div style="margin: 1.5rem auto; max-width: 690px; color: var(--foreground);">
<svg viewBox="0 0 690 330" role="img" aria-label="Left: a beam of amplitude 1 travels normal to a water film of thickness d. Part of it turns back at the front surface with amplitude r. The rest enters the film with amplitude t, turns back at the back surface with amplitude minus r t, and leaves through the front surface with amplitude minus r t t-prime, approximately minus r. Right: the two returning waves at one instant. The back-surface wave is the front-surface wave turned upside down and trailing it by the distance tau, and their sum is the reflected light." style="width: 100%; height: auto; display: block;">
<rect x="20" y="170" width="370" height="90" fill="#2563eb" fill-opacity="0.10"/>
<line x1="20" y1="170" x2="390" y2="170" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.2"/>
<line x1="20" y1="260" x2="390" y2="260" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.2"/>
<line x1="38" y1="174" x2="38" y2="256" stroke="currentColor" stroke-width="1.2"/>
<path d="M 34 180 L 38 172 L 42 180 Z" fill="currentColor"/>
<path d="M 34 250 L 38 258 L 42 250 Z" fill="currentColor"/>
<text x="48" y="220" text-anchor="start" font-size="15" fill="currentColor"><tspan font-style="italic">d</tspan></text>
<line x1="150" y1="40" x2="150" y2="170" stroke="currentColor" stroke-width="2"/>
<path d="M 150 104 L 146.4 96 L 153.6 96 Z" fill="currentColor"/>
<path d="M 162 170 L 162 158 L 150 158" fill="none" stroke="currentColor" stroke-width="1.2"/>
<text x="159" y="105" text-anchor="start" font-size="15" fill="currentColor">1</text>
<path d="M 150 145 A 25 25 0 0 1 100 145" fill="none" stroke="#2563eb" stroke-width="2"/>
<line x1="100" y1="145" x2="100" y2="40" stroke="#2563eb" stroke-width="2"/>
<path d="M 100 96 L 96.4 104 L 103.6 104 Z" fill="#2563eb"/>
<text x="91" y="105" text-anchor="end" font-size="15" fill="#2563eb"><tspan font-style="italic">r</tspan></text>
<line x1="150" y1="170" x2="150" y2="260" stroke="#dc2626" stroke-width="2"/>
<path d="M 150 195.5 L 146.8 188.5 L 153.2 188.5 Z" fill="#dc2626"/>
<text x="141" y="197" text-anchor="end" font-size="15" fill="#dc2626"><tspan font-style="italic">t</tspan></text>
<line x1="150" y1="260" x2="150" y2="318" stroke="currentColor" stroke-width="1.4" stroke-opacity="0.35" stroke-dasharray="4 4"/>
<path d="M 150 235 A 25 25 0 0 0 200 235" fill="none" stroke="#dc2626" stroke-width="2"/>
<line x1="200" y1="235" x2="200" y2="40" stroke="#dc2626" stroke-width="2"/>
<path d="M 200 196.5 L 196.8 203.5 L 203.2 203.5 Z" fill="#dc2626"/>
<path d="M 200 96 L 196.4 104 L 203.6 104 Z" fill="#dc2626"/>
<text x="209" y="205" text-anchor="start" font-size="15" fill="#dc2626">−<tspan font-style="italic">rt</tspan></text>
<text x="209" y="105" text-anchor="start" font-size="15" fill="#dc2626">−<tspan font-style="italic">rtt′</tspan> ≈ −<tspan font-style="italic">r</tspan></text>
<text x="385" y="140" text-anchor="end" font-size="13" fill="currentColor">air, index 1</text>
<text x="385" y="163" text-anchor="end" font-size="12" fill="currentColor">front surface</text>
<text x="385" y="220" text-anchor="end" font-size="13" fill="currentColor">water, index <tspan font-style="italic">n</tspan></text>
<text x="385" y="278" text-anchor="end" font-size="12" fill="currentColor">back surface</text>
<text x="385" y="312" text-anchor="end" font-size="13" fill="currentColor">air</text>
<line x1="430" y1="70" x2="670" y2="70" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
<polyline points="430,50 432,50.2 434,51 436,52.2 438,53.8 440,55.9 442,58.2 444,60.9 446,63.8 448,66.9 450,70 452,73.1 454,76.2 456,79.1 458,81.8 460,84.1 462,86.2 464,87.8 466,89 468,89.8 470,90 472,89.8 474,89 476,87.8 478,86.2 480,84.1 482,81.8 484,79.1 486,76.2 488,73.1 490,70 492,66.9 494,63.8 496,60.9 498,58.2 500,55.9 502,53.8 504,52.2 506,51 508,50.2 510,50 512,50.2 514,51 516,52.2 518,53.8 520,55.9 522,58.2 524,60.9 526,63.8 528,66.9 530,70 532,73.1 534,76.2 536,79.1 538,81.8 540,84.1 542,86.2 544,87.8 546,89 548,89.8 550,90 552,89.8 554,89 556,87.8 558,86.2 560,84.1 562,81.8 564,79.1 566,76.2 568,73.1 570,70 572,66.9 574,63.8 576,60.9 578,58.2 580,55.9 582,53.8 584,52.2 586,51 588,50.2 590,50 592,50.2 594,51 596,52.2 598,53.8 600,55.9 602,58.2 604,60.9 606,63.8 608,66.9 610,70 612,73.1 614,76.2 616,79.1 618,81.8 620,84.1 622,86.2 624,87.8 626,89 628,89.8 630,90 632,89.8 634,89 636,87.8 638,86.2 640,84.1 642,81.8 644,79.1 646,76.2 648,73.1 650,70 652,66.9 654,63.8 656,60.9 658,58.2 660,55.9 662,53.8 664,52.2 666,51 668,50.2 670,50" fill="none" stroke="#2563eb" stroke-width="2"/>
<line x1="430" y1="160" x2="670" y2="160" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
<polyline points="430,166.1 432,163.1 434,160 436,156.9 438,153.9 440,151.1 442,148.5 444,146.1 446,144.1 448,142.5 450,141.4 452,140.6 454,140.4 456,140.6 458,141.4 460,142.5 462,144.1 464,146.1 466,148.5 468,151.1 470,153.9 472,156.9 474,160 476,163.1 478,166.1 480,168.9 482,171.5 484,173.9 486,175.9 488,177.5 490,178.6 492,179.4 494,179.6 496,179.4 498,178.6 500,177.5 502,175.9 504,173.9 506,171.5 508,168.9 510,166.1 512,163.1 514,160 516,156.9 518,153.9 520,151.1 522,148.5 524,146.1 526,144.1 528,142.5 530,141.4 532,140.6 534,140.4 536,140.6 538,141.4 540,142.5 542,144.1 544,146.1 546,148.5 548,151.1 550,153.9 552,156.9 554,160 556,163.1 558,166.1 560,168.9 562,171.5 564,173.9 566,175.9 568,177.5 570,178.6 572,179.4 574,179.6 576,179.4 578,178.6 580,177.5 582,175.9 584,173.9 586,171.5 588,168.9 590,166.1 592,163.1 594,160 596,156.9 598,153.9 600,151.1 602,148.5 604,146.1 606,144.1 608,142.5 610,141.4 612,140.6 614,140.4 616,140.6 618,141.4 620,142.5 622,144.1 624,146.1 626,148.5 628,151.1 630,153.9 632,156.9 634,160 636,163.1 638,166.1 640,168.9 642,171.5 644,173.9 646,175.9 648,177.5 650,178.6 652,179.4 654,179.6 656,179.4 658,178.6 660,177.5 662,175.9 664,173.9 666,171.5 668,168.9 670,166.1" fill="none" stroke="#dc2626" stroke-width="2"/>
<line x1="430" y1="262" x2="670" y2="262" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
<polyline points="430,248.1 432,245.3 434,243 436,241.1 438,239.8 440,239 442,238.7 444,239.1 446,240 448,241.4 450,243.4 452,245.8 454,248.6 456,251.7 458,255.1 460,258.7 462,262.3 464,266 466,269.5 468,272.9 470,275.9 472,278.7 474,281 476,282.9 478,284.2 480,285 482,285.3 484,284.9 486,284 488,282.6 490,280.6 492,278.2 494,275.4 496,272.3 498,268.9 500,265.3 502,261.7 504,258 506,254.5 508,251.1 510,248.1 512,245.3 514,243 516,241.1 518,239.8 520,239 522,238.7 524,239.1 526,240 528,241.4 530,243.4 532,245.8 534,248.6 536,251.7 538,255.1 540,258.7 542,262.3 544,266 546,269.5 548,272.9 550,275.9 552,278.7 554,281 556,282.9 558,284.2 560,285 562,285.3 564,284.9 566,284 568,282.6 570,280.6 572,278.2 574,275.4 576,272.3 578,268.9 580,265.3 582,261.7 584,258 586,254.5 588,251.1 590,248.1 592,245.3 594,243 596,241.1 598,239.8 600,239 602,238.7 604,239.1 606,240 608,241.4 610,243.4 612,245.8 614,248.6 616,251.7 618,255.1 620,258.7 622,262.3 624,266 626,269.5 628,272.9 630,275.9 632,278.7 634,281 636,282.9 638,284.2 640,285 642,285.3 644,284.9 646,284 648,282.6 650,280.6 652,278.2 654,275.4 656,272.3 658,268.9 660,265.3 662,261.7 664,258 666,254.5 668,251.1 670,248.1" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="430" y="30" text-anchor="start" font-size="13" fill="#2563eb">front-surface wave</text>
<text x="430" y="120" text-anchor="start" font-size="13" fill="#dc2626">back-surface wave</text>
<text x="430" y="222" text-anchor="start" font-size="13" fill="currentColor">their sum, the reflected light</text>
<line x1="590" y1="46" x2="590" y2="194" stroke="currentColor" stroke-opacity="0.6" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="574" y1="182" x2="574" y2="194" stroke="currentColor" stroke-opacity="0.6" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="574" y1="190" x2="590" y2="190" stroke="currentColor" stroke-width="1.2"/>
<text x="582" y="208" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">τ</tspan></text>
<text x="670" y="318" text-anchor="end" font-size="12" fill="currentColor">direction of travel →</text>
</svg>
</div>

All the beams in the figure travel along the same line, normal to the film. They are drawn side by side so that each one can be labeled. The right half shows the two returning waves at one instant. The back-surface wave is the front-surface wave turned upside down, and it trails the front-surface wave by a distance $\tau$, derived below. The light that reaches the eye is the sum of the two waves.

**How much each surface reflects.** When light travels normal to a surface, its electric and magnetic fields both lie parallel to the surface. In a medium of refractive index $n$, the amplitude of the magnetic field is proportional to $n$ times the amplitude of the electric field. Suppose a beam of amplitude $1$ crosses a boundary from a medium of index $n_1$ into a medium of index $n_2$. It splits into a reflected beam of amplitude $r$ and a transmitted beam of amplitude $t$. [Maxwell's equations](https://en.wikipedia.org/wiki/Maxwell%27s_equations) require each field to take the same value on both sides of the boundary. For the electric field, this condition reads $1 + r = t$. The reflected beam travels in the opposite direction, so its magnetic field points the opposite way, and the condition for the magnetic field reads $n_1(1 - r) = n_2\,t$. Solving these two equations gives the [Fresnel coefficients](https://en.wikipedia.org/wiki/Fresnel_equations#Normal_incidence) for normal incidence,

$$
r = \frac{n_1 - n_2}{n_1 + n_2}, \qquad t = \frac{2n_1}{n_1 + n_2}.
$$

In the soap film, the index is $1$ for air and $n$ for water. At the front surface, light passes from air into water, so $r = (1-n)/(1+n)$ and $t = 2/(1+n)$. For $n = 1.33$, $r = -0.142$. At the back surface, light passes from water into air. The two indices trade places, and the reflection coefficient becomes $(n-1)/(n+1) = -r$. The two reflections therefore have opposite signs. On its way out, the back-surface beam passes through the front surface from water into air, with transmission coefficient $t' = 2n/(1+n)$. This beam is transmitted, reflected and transmitted again, so it returns with amplitude

$$
t\,(-r)\,t' \;=\; -r\cdot\frac{4n}{(1+n)^2} \;=\; -r\,(1 - r^2).
$$

The last step uses $(1+n)^2 - (1-n)^2 = 4n$. For water, $1 - r^2 = 0.98$. From here on I approximate $0.98 \approx 1$, which changes the back-surface beam's amplitude by $2\%$, so the two returning beams have amplitudes $r$ and $-r$.

**How far the second beam trails the first.** The back-surface beam travels an extra distance $2d$ inside the water, where the wavelength shortens to $\lambda/n$. It therefore falls behind the front-surface beam by $2d/(\lambda/n) = \tau/\lambda$ wavelengths, where

$$
\tau = 2nd
$$

is the [optical path difference](https://en.wikipedia.org/wiki/Optical_path_length#Optical_path_difference) between the two beams. In air, where the wavelength is $\lambda$, this is a distance $\tau$, as in the figure. Each wavelength of delay is one full cycle of the oscillation, so the back-surface wave is shifted in its cycle by the angle $\varphi = 2\pi\tau/\lambda$. This angle is called the **phase** difference.

Two waves with different phases are added by writing each one as a complex number whose magnitude is the amplitude and whose angle is the phase, as in the [Euler's identity post](/blog/eulers-identity). A shift by the angle $\varphi$ multiplies the complex number by $e^{i\varphi}$. The light reflected by the film therefore has amplitude

$$
r - r\,e^{i\varphi} \;=\; r\,\big(1 - e^{i\varphi}\big), \qquad \varphi = \frac{2\pi\tau}{\lambda}.
$$

The **reflectance** $R$ is the fraction of the incoming light that the film reflects. Brightness is proportional to the square of the amplitude, so $R$ is the squared magnitude of this complex number. Since $|1 - e^{i\varphi}|^2 = (1 - \cos\varphi)^2 + \sin^2\varphi = 2 - 2\cos\varphi$,

$$
R(\lambda) \;=\; 2r^2\Big(1 - \cos\frac{2\pi\tau}{\lambda}\Big) \;=\; 4r^2 \sin^2\!\Big(\frac{\pi\tau}{\lambda}\Big).
$$

Taking $n = 1.33$ constant across the visible band, $r^2 = 0.0201$, so $R$ lies between $0$ and $4r^2 = 8.0\%$. In the [**wavenumber**](https://en.wikipedia.org/wiki/Wavenumber) $\sigma = 1/\lambda$, $R = 2r^2(1 - \cos 2\pi\sigma\tau)$ is a single cosine with period $1/\tau$. Light can also bounce back and forth inside the film several times before it leaves. Summing all of these reflections gives the exact Airy formula (Born and Wolf, §7.6). Its higher harmonics $\cos(2\pi k\sigma\tau)$, for integers $k \ge 2$, shrink by a factor $r^2 \approx 0.02$ from each $k$ to the next, and the two-beam formula stays within about $4\%$ of it.

## Three numbers from a spectrum

For the [CIE 1931 **standard observer**](https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_standard_observer), light with spectral power $P(\lambda)$ is described by three [**tristimulus values**](https://en.wikipedia.org/wiki/CIE_1931_color_space#Computing_XYZ_from_spectral_data)

$$
X = \int P\,\bar x\,d\lambda, \qquad Y = \int P\,\bar y\,d\lambda, \qquad Z = \int P\,\bar z\,d\lambda,
$$

where $\bar x, \bar y, \bar z$ are the tabulated color-matching functions. Two lights with the same $(X, Y, Z)$ look identical to the standard observer, and since $\bar y$ is the eye's sensitivity to brightness, $Y$ is the [luminance](https://en.wikipedia.org/wiki/Luminance). Light reflected by the film has $P = SR$ for an illuminant with spectrum $S$. I use [D65](https://en.wikipedia.org/wiki/Illuminant_D65), the CIE's standard representation of average daylight (Newton viewed his bubbles "by Reflexion of the Skies when of a white Colour"), normalized so that a perfect reflector has the [**white point**](https://en.wikipedia.org/wiki/White_point) $W = (0.950,\ 1,\ 1.089)$. The [sRGB](https://en.wikipedia.org/wiki/SRGB) standard specifies the $3 \times 3$ matrix and the encoding curve that take $(X, Y, Z)$ to the color a screen displays.

## The color is a cosine transform

Substitute $R$ into the three integrals and change variables to $\sigma = 1/\lambda$. Define three weight curves on the wavenumber axis by

$$
w_x(\sigma)\,d\sigma \;=\; \frac{S(\lambda)\,\bar x(\lambda)\,d\lambda}{\int S\,\bar y\,d\lambda},
$$

and $w_y$, $w_z$ likewise, so that their integrals are the three components of $W$. With $w = (w_x, w_y, w_z)$, the tristimulus values of the film are

$$
\begin{pmatrix} X \\ Y \\ Z \end{pmatrix}\!(d) \;=\; 2r^2\big(W - \hat c(\tau)\big), \qquad \hat c(\tau) = \int w(\sigma)\cos(2\pi\sigma\tau)\,d\sigma, \qquad \tau = 2nd.
$$

The vector $\hat c(\tau)$ is the cosine transform (the real part of the Fourier transform) of the three weight curves, evaluated at the path difference.

**The black film.** At $d = 0$ the cosine equals $1$ at every wavelength, so $\hat c(0) = W$ and the film reflects nothing: the two reflections cancel exactly. For small $d$, $R(\lambda) \approx 4r^2(\pi\tau/\lambda)^2$ is proportional to $1/\lambda^2$, so the first light reflected by a thin film is weighted toward short wavelengths. Its [chromaticity](https://en.wikipedia.org/wiki/Chromaticity), in the CIE coordinates $(x, y) = (X, Y)/(X + Y + Z)$, is $(0.266, 0.281)$, bluer than the white point at $(0.313, 0.329)$. This bluish gray is the faint blue that Newton lists right after black. At $d = 10$ nm the film reflects $0.18\%$ of the light, less than a tenth of the $2\%$ reflected by a single water surface but not zero, and Newton could see "the Images of some things (as of a Candle or the Sun) very faintly reflected" from the black spot.

**The orders.** The luminance $Y = 2r^2\big(1 - \hat c_y(\tau)\big)$ is smallest when the wavelengths at the center of $w_y$ are extinguished, that is, when $\tau$ is a multiple of $\bar\lambda = 554$ nm, the reciprocal of the mean wavenumber of $w_y$. The computed minima are at $d = 207$, $416$, $626$ and $837$ nm, spaced by $\bar\lambda/2n = 208$ nm. With the middle of the spectrum removed, red and blue light remain, and these purple bands separate the **orders**: the second and third orders run through blue, green, yellow and red, and from the fourth order on, greens and pinks alternate and grow paler.

The widget evaluates the formula from the CIE tables at $5$ nm steps: the reflectance with the products $S\bar x$, $S\bar y$, $S\bar z$ dashed, the [chromaticity diagram](https://en.wikipedia.org/wiki/CIE_1931_color_space#Chromaticity_diagram) with the film's path up to the current $d$, and the color for every $d$ up to $2\ \mu$m.

<div class="sf-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.95em;"><label for="sf-slider" style="white-space: nowrap;">film thickness <em>d</em></label><input type="range" id="sf-slider" min="0" max="2000" step="1" value="250" style="flex: 1; min-width: 0;"></div><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 1.5rem; font-size: 0.95em; font-variant-numeric: tabular-nums;"><span><em>d</em> = <strong id="sf-d" style="display: inline-block; min-width: 2.4em; text-align: right;">250</strong> nm</span><span>2<em>nd</em> = <strong id="sf-tau" style="display: inline-block; min-width: 2.4em; text-align: right;">665</strong> nm</span><span style="display: inline-flex; align-items: center; gap: 0.5rem;">color <span id="sf-swatch" style="display: inline-block; width: 3.2em; height: 1.4em; border: 1px solid currentColor; border-radius: 3px; background: #000000;"></span></span></div><div style="margin: 0.4rem 0 1rem; font-size: 0.85em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Newton: <span id="sf-newton">2nd-order indigo, 244 nm</span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; align-items: start;"><svg id="sf-spec" viewBox="0 0 300 240" style="width: 100%; height: auto;" aria-label="Reflectance of the film against wavelength, with the three CIE weight curves dashed."></svg><svg id="sf-xy" viewBox="0 0 300 240" style="width: 100%; height: auto;" aria-label="CIE chromaticity diagram with the path of the film color as the thickness grows."></svg></div><svg id="sf-strip" viewBox="0 0 720 74" style="width: 100%; height: auto; margin-top: 0.75rem;" aria-label="Color of the film for every thickness from 0 to 2000 nanometers, with a marker at the current thickness and Newton's table entries below."></svg><div style="margin-top: 0.6rem; font-size: 0.85em; line-height: 1.7; display: flex; flex-wrap: wrap; column-gap: 1.4rem; row-gap: 0.2rem;"><span style="white-space: nowrap;"><svg width="22" height="10" viewBox="0 0 22 10" style="display: inline-block; vertical-align: 0;"><line x1="1" y1="5" x2="21" y2="5" stroke="currentColor" stroke-width="1.8"/></svg> reflectance <em>R</em>(λ)</span><span style="white-space: nowrap;"><svg width="22" height="10" viewBox="0 0 22 10" style="display: inline-block; vertical-align: 0;"><line x1="1" y1="2" x2="21" y2="2" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3 2"/><line x1="1" y1="5" x2="21" y2="5" stroke="#16a34a" stroke-width="1.2" stroke-dasharray="3 2"/><line x1="1" y1="8" x2="21" y2="8" stroke="#2563eb" stroke-width="1.2" stroke-dasharray="3 2"/></svg> weights <em>S</em>x̄, <em>S</em>ȳ, <em>S</em>z̄</span><span style="white-space: nowrap;"><svg width="12" height="10" viewBox="0 0 12 10" style="display: inline-block; vertical-align: 0;"><polygon points="6,1 1.5,9 10.5,9" fill="currentColor"/></svg> Newton's table (water)</span></div><div style="margin-top: 0.3rem; font-size: 0.85em; font-style: italic;">Colors are drawn at 1/(4<em>r</em>²) times the true reflectance, so the brightest film shows as full white. The most saturated blues and greens lie outside sRGB and are clipped.</div></div>
<script>
(function () {
  var slider = document.getElementById('sf-slider');
  if (!slider) return;
  var dOut = document.getElementById('sf-d');
  var tauOut = document.getElementById('sf-tau');
  var swatch = document.getElementById('sf-swatch');
  var newtonOut = document.getElementById('sf-newton');
  var spec = document.getElementById('sf-spec');
  var xyPlot = document.getElementById('sf-xy');
  var strip = document.getElementById('sf-strip');
  // CIE 1931 2-degree colour-matching functions and CIE illuminant D65, 380-780 nm in 5 nm steps.
  var xb = [.001368,.002236,.004243,.00765,.01431,.02319,.04351,.07763,.13438,.21477,.2839,.3285,.34828,.34806,.3362,.3187,.2908,.2511,.19536,.1421,.09564,.05795,.03201,.0147,.0049,.0024,.0093,.0291,.06327,.1096,.1655,.22575,.2904,.3597,.43345,.51205,.5945,.6784,.7621,.8425,.9163,.9786,1.0263,1.0567,1.0622,1.0456,1.0026,.9384,.85445,.7514,.6424,.5419,.4479,.3608,.2835,.2187,.1649,.1212,.0874,.0636,.04677,.0329,.0227,.01584,.0113592,.00811092,.00579035,.00410946,.00289933,.00204919,.00143997,.000999949,.000690079,.000476021,.000332301,.000234826,.000166151,.000117413,.0000831,.0000587,.0000415];
  var yb = [.000039,.000064,.00012,.000217,.000396,.00064,.00121,.00218,.004,.0073,.0116,.01684,.023,.0298,.038,.048,.06,.0739,.09098,.1126,.13902,.1693,.20802,.2586,.323,.4073,.503,.6082,.71,.7932,.862,.91485,.954,.9803,.99495,1,.995,.9786,.952,.9154,.87,.8163,.757,.6949,.631,.5668,.503,.4412,.381,.321,.265,.217,.175,.1382,.107,.0816,.061,.04458,.032,.0232,.017,.01192,.00821,.005723,.004102,.002929,.002091,.001484,.001047,.00074,.00052,.0003611,.0002492,.0001719,.00012,.0000848,.00006,.0000424,.00003,.0000212,.000015];
  var zb = [.00645,.01055,.02005,.03621,.06785,.1102,.2074,.3713,.6456,1.03905,1.3856,1.62296,1.74706,1.7826,1.77211,1.7441,1.6692,1.5281,1.28764,1.0419,.81295,.6162,.46518,.3533,.272,.2123,.1582,.1117,.07825,.05725,.04216,.02984,.0203,.0134,.00875,.00575,.0039,.00275,.0021,.0018,.00165,.0014,.0011,.001,.0008,.0006,.00034,.00024,.00019,.0001,.00005,.00003,.00002,.00001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var d65 = [49.9755,52.3118,54.6482,68.7015,82.7549,87.1204,91.486,92.4589,93.4318,90.057,86.6823,95.7736,104.865,110.936,117.008,117.41,117.812,116.336,114.861,115.392,115.923,112.367,108.811,109.082,109.354,108.578,107.802,106.296,104.79,106.239,107.689,106.047,104.405,104.225,104.046,102.023,100,98.1671,96.3342,96.0611,95.788,92.2368,88.6856,89.3459,90.0062,89.8026,89.5991,88.6489,87.6987,85.4936,83.2886,83.4939,83.6992,81.863,80.0268,80.1207,80.2146,81.2462,82.2778,80.281,78.2842,74.0027,69.7213,70.6652,71.6091,72.979,74.349,67.9765,61.604,65.7448,69.8856,72.4863,75.087,69.3398,63.5927,55.0054,46.4182,56.6118,66.8054,65.0941,63.3828];
  // Newton, Opticks, Book II, Part II: thickness of water films in millionths of an inch.
  var newton = [['1st', 'very black', 0.375], ['1st', 'black', 0.75], ['1st', 'start of black', 1.5], ['1st', 'blue', 1.8], ['1st', 'white', 3.875], ['1st', 'yellow', 16 / 3], ['1st', 'orange', 6], ['1st', 'red', 6.75], ['2nd', 'violet', 8.375], ['2nd', 'indigo', 9.625], ['2nd', 'blue', 10.5], ['2nd', 'green', 35 / 3], ['2nd', 'yellow', 12.2], ['2nd', 'orange', 13], ['2nd', 'bright red', 13.75], ['2nd', 'scarlet', 14.75], ['3rd', 'purple', 15.75], ['3rd', 'indigo', 116 / 7], ['3rd', 'blue', 17.55], ['3rd', 'green', 18.9], ['3rd', 'yellow', 61 / 3], ['3rd', 'red', 21.75], ['3rd', 'bluish red', 24], ['4th', 'bluish green', 25.5], ['4th', 'green', 26.5], ['4th', 'yellowish green', 27], ['4th', 'red', 30.25], ['5th', 'greenish blue', 34.5], ['5th', 'red', 39.375], ['6th', 'greenish blue', 44], ['6th', 'red', 48.75], ['7th', 'greenish blue', 53.25], ['7th', 'ruddy white', 57.75]];
  var L = xb.length, lam = [], i, k;
  for (i = 0; i < L; i++) lam.push(380 + 5 * i);
  var nIdx = 1.33, r = (1 - nIdx) / (1 + nIdx), R4 = 4 * r * r;
  var norm = 0;
  for (i = 0; i < L; i++) norm += d65[i] * yb[i];
  var wx = [], wy = [], wz = [], W = [0, 0, 0];
  for (i = 0; i < L; i++) {
    wx.push(d65[i] * xb[i] / norm); wy.push(d65[i] * yb[i] / norm); wz.push(d65[i] * zb[i] / norm);
    W[0] += wx[i]; W[1] += wy[i]; W[2] += wz[i];
  }
  var M = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
  // Tristimulus values of the film, scaled by 1/(4 r^2): (W - c(tau)) / 2.
  function filmXYZ(d) {
    var tau = 2 * nIdx * d, cx = 0, cy = 0, cz = 0;
    for (var j = 0; j < L; j++) {
      var c = Math.cos(2 * Math.PI * tau / lam[j]);
      cx += wx[j] * c; cy += wy[j] * c; cz += wz[j] * c;
    }
    return [(W[0] - cx) / 2, (W[1] - cy) / 2, (W[2] - cz) / 2];
  }
  function enc(v) {
    v = Math.min(1, Math.max(0, v));
    v = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    var h = Math.round(255 * v).toString(16);
    return h.length < 2 ? '0' + h : h;
  }
  function linRGB(X) {
    return [0, 1, 2].map(function (q) { return M[q][0] * X[0] + M[q][1] * X[1] + M[q][2] * X[2]; });
  }
  function hex(X) {
    var c = linRGB(X);
    return '#' + enc(c[0]) + enc(c[1]) + enc(c[2]);
  }
  function chrom(X) {
    var s = X[0] + X[1] + X[2];
    return [X[0] / s, X[1] / s];
  }
  // Spectrum panel geometry.
  var sx0 = 42, sx1 = 290, syT = 12, syB = 196, pMax = 9;
  function SX(l) { return sx0 + (l - 380) / 400 * (sx1 - sx0); }
  function SY(p) { return syB - p / pMax * (syB - syT); }
  var rainbow = '';
  for (i = 0; i < L; i += 2) {
    var cl = linRGB([xb[i], yb[i], zb[i]]).map(function (v) { return Math.max(0, v); });
    var mx = Math.max(cl[0], cl[1], cl[2]);
    var br = Math.min(1, (xb[i] + yb[i] + zb[i]) / 0.3);
    var col = mx > 0 ? '#' + enc(cl[0] / mx * br) + enc(cl[1] / mx * br) + enc(cl[2] / mx * br) : '#000000';
    rainbow += '<stop offset="' + ((lam[i] - 380) / 400).toFixed(4) + '" stop-color="' + col + '"/>';
  }
  var specStatic = '<defs><linearGradient id="sf-rainbow" gradientUnits="userSpaceOnUse" x1="' + SX(380) + '" y1="0" x2="' + SX(780) + '" y2="0">' + rainbow + '</linearGradient></defs>';
  specStatic += '<line x1="' + sx0 + '" y1="' + syB + '" x2="' + sx1 + '" y2="' + syB + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>';
  specStatic += '<line x1="' + sx0 + '" y1="' + syT + '" x2="' + sx0 + '" y2="' + syB + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>';
  [400, 500, 600, 700].forEach(function (l) {
    specStatic += '<line x1="' + SX(l) + '" y1="' + syB + '" x2="' + SX(l) + '" y2="' + (syB + 4) + '" stroke="currentColor" stroke-opacity="0.4"/>';
    specStatic += '<text x="' + SX(l) + '" y="' + (syB + 15) + '" text-anchor="middle" font-size="10" fill="currentColor">' + l + '</text>';
  });
  [0, 2, 4, 6, 8].forEach(function (p) {
    specStatic += '<line x1="' + sx0 + '" y1="' + SY(p) + '" x2="' + sx1 + '" y2="' + SY(p) + '" stroke="currentColor" stroke-opacity="' + (p === 0 ? 0 : 0.12) + '" stroke-width="0.6"/>';
    specStatic += '<text x="' + (sx0 - 5) + '" y="' + (SY(p) + 3.5) + '" text-anchor="end" font-size="10" fill="currentColor">' + p + '</text>';
  });
  specStatic += '<text x="' + ((sx0 + sx1) / 2) + '" y="' + 233 + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">wavelength λ (nm)</text>';
  specStatic += '<text x="12" y="' + ((syT + syB) / 2) + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor" transform="rotate(-90 12 ' + ((syT + syB) / 2) + ')">R (%)</text>';
  var wMax = 0;
  for (i = 0; i < L; i++) wMax = Math.max(wMax, wx[i], wy[i], wz[i]);
  [[wx, '#dc2626'], [wy, '#16a34a'], [wz, '#2563eb']].forEach(function (pair) {
    var pts = [];
    for (var j = 0; j < L; j++) pts.push(SX(lam[j]).toFixed(1) + ',' + (syB - pair[0][j] / wMax * 0.85 * (syB - syT)).toFixed(1));
    specStatic += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + pair[1] + '" stroke-opacity="0.75" stroke-width="1.1" stroke-dasharray="3 2"/>';
  });
  // Chromaticity panel geometry.
  var kx = 225, cx0 = 70, cy0 = 216;
  function CX(x) { return cx0 + kx * x; }
  function CY(y) { return cy0 - kx * y; }
  var white = chrom(W);
  var xyStatic = '';
  xyStatic += '<line x1="' + CX(0) + '" y1="' + CY(0) + '" x2="' + CX(0.8) + '" y2="' + CY(0) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>';
  xyStatic += '<line x1="' + CX(0) + '" y1="' + CY(0) + '" x2="' + CX(0) + '" y2="' + CY(0.9) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>';
  [0, 0.2, 0.4, 0.6, 0.8].forEach(function (v) {
    xyStatic += '<text x="' + CX(v) + '" y="' + (CY(0) + 14) + '" text-anchor="middle" font-size="10" fill="currentColor">' + v.toFixed(1) + '</text>';
    xyStatic += '<text x="' + (CX(0) - 5) + '" y="' + (CY(v) + 3.5) + '" text-anchor="end" font-size="10" fill="currentColor">' + v.toFixed(1) + '</text>';
  });
  xyStatic += '<text x="' + CX(0.4) + '" y="' + 236 + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">x</text>';
  xyStatic += '<text x="' + (CX(0) - 30) + '" y="' + CY(0.45) + '" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">y</text>';
  var locus = [];
  for (i = 0; lam[i] <= 700; i++) {
    var c0 = chrom([xb[i], yb[i], zb[i]]);
    locus.push(CX(c0[0]).toFixed(1) + ',' + CY(c0[1]).toFixed(1));
    if (lam[i] === 480 || lam[i] === 520 || lam[i] === 600) {
      var dx = c0[0] - white[0], dy = c0[1] - white[1], dn = Math.sqrt(dx * dx + dy * dy);
      xyStatic += '<text x="' + (CX(c0[0]) + 13 * dx / dn).toFixed(1) + '" y="' + (CY(c0[1]) - 13 * dy / dn + 3.5).toFixed(1) + '" text-anchor="middle" font-size="9.5" fill="currentColor">' + lam[i] + '</text>';
    }
  }
  xyStatic += '<polygon points="' + locus.join(' ') + '" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1"/>';
  var path = [];
  for (var dd = 1; dd <= 2000; dd += 2) {
    var cc = chrom(filmXYZ(dd));
    path.push(CX(cc[0]).toFixed(1) + ',' + CY(cc[1]).toFixed(1));
  }
  xyStatic += '<polyline points="' + path.join(' ') + '" fill="none" stroke="currentColor" stroke-opacity="0.18" stroke-width="0.8"/>';
  xyStatic += '<path d="M' + (CX(white[0]) - 4) + ',' + CY(white[1]) + 'h8M' + CX(white[0]) + ',' + (CY(white[1]) - 4) + 'v8" stroke="currentColor" stroke-width="1.2"/>';
  xyStatic += '<text x="' + (CX(white[0]) + 30) + '" y="' + (CY(white[1]) - 26) + '" text-anchor="middle" font-size="10" fill="currentColor">D65</text>';
  xyStatic += '<line x1="' + (CX(white[0]) + 4) + '" y1="' + (CY(white[1]) - 4) + '" x2="' + (CX(white[0]) + 24) + '" y2="' + (CY(white[1]) - 22) + '" stroke="currentColor" stroke-opacity="0.5" stroke-width="0.7"/>';
  // Strip geometry.
  var tx0 = 20, tx1 = 700, tyT = 10, tyB = 40;
  function TX(d) { return tx0 + d / 2000 * (tx1 - tx0); }
  var stops = '';
  for (dd = 0; dd <= 2000; dd += 5) stops += '<stop offset="' + (dd / 2000).toFixed(4) + '" stop-color="' + hex(filmXYZ(dd)) + '"/>';
  var stripStatic = '<defs><linearGradient id="sf-stripgrad" gradientUnits="userSpaceOnUse" x1="' + tx0 + '" y1="0" x2="' + tx1 + '" y2="0">' + stops + '</linearGradient></defs>';
  stripStatic += '<rect x="' + tx0 + '" y="' + tyT + '" width="' + (tx1 - tx0) + '" height="' + (tyB - tyT) + '" fill="url(#sf-stripgrad)" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>';
  newton.forEach(function (e) {
    var nm = e[2] * 25.4, x = TX(nm);
    stripStatic += '<g><title>Newton: ' + e[0] + '-order ' + e[1] + ', ' + Math.round(nm) + ' nm</title><polygon points="' + x.toFixed(1) + ',' + (tyB + 3) + ' ' + (x - 3.2).toFixed(1) + ',' + (tyB + 10) + ' ' + (x + 3.2).toFixed(1) + ',' + (tyB + 10) + '" fill="currentColor"/></g>';
  });
  [0, 500, 1000, 1500, 2000].forEach(function (d) {
    stripStatic += '<text x="' + TX(d) + '" y="66" text-anchor="' + (d === 2000 ? 'end' : d === 0 ? 'start' : 'middle') + '" font-size="11" fill="currentColor">' + (d === 2000 ? '2000 nm' : d) + '</text>';
  });
  function update() {
    var d = parseInt(slider.value, 10);
    var X = filmXYZ(d), col = hex(X);
    dOut.textContent = d;
    tauOut.textContent = Math.round(2 * nIdx * d);
    swatch.style.background = col;
    var best = 0, bestGap = Infinity;
    for (var j = 0; j < newton.length; j++) {
      var gap = Math.abs(newton[j][2] * 25.4 - d);
      if (gap < bestGap) { bestGap = gap; best = j; }
    }
    newtonOut.textContent = newton[best][0] + '-order ' + newton[best][1] + ', ' + Math.round(newton[best][2] * 25.4) + ' nm';
    var tau = 2 * nIdx * d, curve = [];
    for (var l = 380; l <= 780; l++) {
      var s = Math.sin(Math.PI * tau / l);
      curve.push(SX(l).toFixed(1) + ',' + SY(100 * R4 * s * s).toFixed(1));
    }
    var sv = specStatic;
    sv += '<path d="M' + SX(380) + ',' + syB + ' L' + curve.join(' L') + ' L' + SX(780) + ',' + syB + ' Z" fill="url(#sf-rainbow)" fill-opacity="0.85"/>';
    sv += '<polyline points="' + curve.join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.6"/>';
    spec.innerHTML = sv;
    var xv = xyStatic, upto = Math.floor((d - 1) / 2) + 1;
    if (upto > 1) xv += '<polyline points="' + path.slice(0, upto).join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
    var cNow = chrom(filmXYZ(Math.max(d, 1)));
    xv += '<circle cx="' + CX(cNow[0]).toFixed(1) + '" cy="' + CY(cNow[1]).toFixed(1) + '" r="5" fill="' + col + '" stroke="currentColor" stroke-width="1.5"/>';
    xyPlot.innerHTML = xv;
    var mxp = TX(d).toFixed(1);
    var st = stripStatic;
    st += '<line x1="' + mxp + '" y1="' + tyT + '" x2="' + mxp + '" y2="' + tyB + '" stroke="#000000" stroke-opacity="0.6" stroke-width="3"/>';
    st += '<line x1="' + mxp + '" y1="' + tyT + '" x2="' + mxp + '" y2="' + tyB + '" stroke="#ffffff" stroke-width="1.2"/>';
    st += '<polygon points="' + (TX(d) - 5).toFixed(1) + ',1 ' + (TX(d) + 5).toFixed(1) + ',1 ' + mxp + ',8" fill="currentColor"/>';
    strip.innerHTML = st;
  }
  slider.addEventListener('input', update);
  update();
})();
</script>

In the first order the peak of $R$, at $\lambda = 2\tau$, moves from the ultraviolet into the visible band. At $d = 104$ nm it sits at $553$ nm, $R$ stays above half its maximum across the band, and the film is white. The zero of $R$ at $\lambda = \tau$ enters the band at $d = 143$ nm, which turns the film yellow and then red, and reaches the green at $d = 208$ nm. The chromaticity path goes once around the white point in each of the first three orders. After that, it swings between the green and pink sides of the white point, at a distance that shrinks in every order after the second.

## The colors fade to white

As $d$ grows, $\hat c(\tau) \to 0$ by the [Riemann–Lebesgue lemma](https://en.wikipedia.org/wiki/Riemann%E2%80%93Lebesgue_lemma) (the Fourier transform of an integrable function tends to zero at infinity), so a thick film reflects the illuminant's own color at $2r^2 \approx 4\%$, the reflectance of two water surfaces whose reflections add without interfering. The cosine in $R$ has period $1/\tau$ in $\sigma$, and the visible band holds $\tau\,(1/380 - 1/780)\ \text{nm}^{-1}$ of its periods: $1.8$ at $d = 0.5\ \mu$m and $5.4$ at $d = 1.5\ \mu$m. A weight curve that spans several periods averages the cosine to nearly zero.

The widths of the weight curves set the rate of decay. Replacing $w_y$ by a Gaussian with the same mean $\bar\sigma = 1/\bar\lambda$ and standard deviation $s$ gives

$$
\hat c_y(\tau) \;\approx\; \cos(2\pi\bar\sigma\tau)\; e^{-2\pi^2 s^2 \tau^2},
$$

the oscillation that produces the orders, under a Gaussian envelope. For the tabulated D65 and $\bar y$, $s = 0.136\ \mu\text{m}^{-1}$, and the envelope falls to $1/e$ at $\tau = 1/(\sqrt{2}\,\pi s) = 1.65\ \mu$m, a thickness of $0.62\ \mu$m. The modulus of the exact transform of the tabulated curve stays within $0.032$ of this envelope up to $d = 1.2\ \mu$m. The transform of a narrower weight curve would decay more slowly. This is the width trade-off of the Fourier transform from the [Heisenberg post](/blog/heisenberg-uncertainty-as-fourier-duality). Computed from the formula, the chromaticity stays within $0.03$ of the white point for every $d \ge 1.25\ \mu$m and within $0.01$ for every $d \ge 1.61\ \mu$m.

## Newton's table

Newton measured the [rings of color](https://en.wikipedia.org/wiki/Newton%27s_rings) in the thin film of air between two lenses pressed together, and compiled a table of the thickness "at which each Colour is most intense and specifick", in millionths of an inch, for films of air, water and glass (Book II, Part II). Selected entries of his water column, converted at $25.4$ nm per millionth of an inch, next to the computed color at that thickness:

| order | Newton's color | Newton (10⁻⁶ in) | $d$ (nm) | computed |
| --- | --- | --- | --- | --- |
| 1st | white | 3⅞ | 98 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #f6fff7;"></span> |
| 1st | yellow | 5⅓ | 135 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #ffe399;"></span> |
| 1st | red | 6¾ | 171 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #d38300;"></span> |
| 2nd | violet | 8⅜ | 213 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #4b10c5;"></span> |
| 2nd | blue | 10½ | 267 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #2bdbf9;"></span> |
| 2nd | green | 11⅔ | 296 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #b5ffba;"></span> |
| 3rd | purple | 15¾ | 400 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #db10e7;"></span> |
| 3rd | green | 18⁹⁄₁₀ | 480 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #00ec9a;"></span> |
| 4th | green | 26½ | 673 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #00d585;"></span> |
| 7th | ruddy white | 57¾ | 1467 | <span style="display: inline-block; width: 2.4em; height: 1em; vertical-align: -0.15em; border: 1px solid currentColor; background: #cab8bf;"></span> |

The brightest computed film, at $104$ nm, is Newton's white of the first order at $98$ nm. His violet of the second order, at $213$ nm, sits next to the first luminance minimum at $207$ nm, and his last entry, the **ruddy white** of the seventh order at $1467$ nm, comes out as a pinkish white near the white point.

Newton also viewed the bubble obliquely (Observation 19). At angle $\theta$ to the normal inside the film the path difference is $2nd\cos\theta$, so a color seen at thickness $d$ at normal incidence appears where the film is $d/\cos\theta$ thick. [Snell's law](https://en.wikipedia.org/wiki/Snell%27s_law) gives $\sin\theta \le 1/n$, so the largest factor, at grazing incidence, is $n/\sqrt{n^2 - 1} = 1.52$ for water. Newton's ratio for his most oblique view: "By the best of my Observations it was between 15 and 15-1/2 to 10."

## The Michel-Lévy chart

A plate of a [birefringent](https://en.wikipedia.org/wiki/Birefringence) crystal between crossed [polarizers](https://en.wikipedia.org/wiki/Polarizer), at $45°$ to them, transmits the fraction $\sin^2(\pi\Gamma/\lambda)$ of the polarized light, where the **retardation** $\Gamma$ is the optical path difference between the plate's two polarizations. That is $R/4r^2$ with $\Gamma = \tau$, so the strip in the widget is also the [interference color chart](https://en.wikipedia.org/wiki/Interference_colour_chart) that mineralogists use to identify minerals in [thin section](https://en.wikipedia.org/wiki/Thin_section), with $2nd$ as the retardation (for the same illuminant, and with the birefringence taken constant across the band). [Sørensen (2013)](https://doi.org/10.1127/0935-1221/2013/0025-2252) recomputed that chart from first principles.

## References

- Isaac Newton. [*Opticks: or, a Treatise of the Reflections, Refractions, Inflections and Colours of Light*](https://www.gutenberg.org/ebooks/33504). London, 1704. Fourth edition, 1730. Book II, Part I, Observations 17–19 on soap bubbles, and Part II, the table of thicknesses of colored plates.
- Max Born and Emil Wolf. [*Principles of Optics*](https://doi.org/10.1017/CBO9781139644181), 7th edition. Cambridge University Press, 1999. Chapter 7: two-beam interference in a plane-parallel plate (§7.5) and multiple-beam interference (§7.6).
- CIE. [*Colour-matching functions of CIE 1931 standard colorimetric observer*](https://doi.org/10.25039/CIE.DS.xvudnb9b). Dataset, 2019, from ISO/CIE 11664-1:2019.
- CIE. [*CIE standard illuminant D65*](https://doi.org/10.25039/CIE.DS.hjfjmt59). Dataset, 2019, from ISO/CIE 11664-2:2022.
- IEC 61966-2-1:1999. *Multimedia systems and equipment – Colour measurement and management – Part 2-1: Colour management – Default RGB colour space – sRGB*.
- Bjørn Eske Sørensen. [*A revised Michel-Lévy interference colour chart based on first-principles calculations*](https://doi.org/10.1127/0935-1221/2013/0025-2252). European Journal of Mineralogy, 25(1):5–10, 2013.
