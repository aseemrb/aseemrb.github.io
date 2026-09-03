---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-08T09:00:00Z
title: The leading digit of a power of two
slug: leading-digit-of-powers-of-two
featured: false
draft: false
tags:
  - mathematics
description:
  "Thirty of the first hundred powers of two begin with 1. The limiting frequency of leading digit d is log10(1 + 1/d), by Weyl equidistribution; scale invariance extends the law to Benford."
---

Write out the powers of two and keep only the first digit:

$$
2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, \ldots \;\longrightarrow\; 2, 4, 8, 1, 3, 6, 1, 2, 5, 1, \ldots
$$

The digits are not equally common. Among the first hundred powers of two, exactly thirty begin with 1, while only five begin with 9. Push $N$ to a million and the shares settle near 30.1% for the digit 1 and 4.6% for the digit 9. The limiting frequency of leading digit $d$ is

$$
\log_{10}\!\left(1 + \frac{1}{d}\right),
$$

and this is a theorem, not an empirical tendency. The derivation needs one change of viewpoint and one classical result about rotations of the circle.

## The fractional part carries the digit

Since $2^n = 10^{\,n \log_{10} 2}$, split the exponent into its integer and fractional parts, $n \log_{10} 2 = m + f$ with $f = \{n \log_{10} 2\} \in [0, 1)$. Then

$$
2^n = 10^m \cdot 10^f, \qquad 10^f \in [1, 10),
$$

so $10^f$ is the **mantissa** of $2^n$: the number with the same digits but the decimal point after the first one. The leading digit is $d$ exactly when $d \le 10^f < d + 1$, that is, when

$$
f \in [\log_{10} d,\; \log_{10}(d+1)).
$$

The nine digits partition $[0,1)$ into nine intervals, and the interval for digit $d$ has length $\log_{10}(d+1) - \log_{10} d = \log_{10}(1 + 1/d)$. Digit 1 owns $[0, 0.30103)$, almost a third of the circle; digit 9 owns the sliver $[0.95424, 1)$ of length $0.04576$. The whole question is now: how do the fractional parts $f_n = \{n\alpha\}$, with $\alpha = \log_{10} 2$, distribute over $[0,1)$?

One structural fact first: $\alpha$ is irrational. If $\log_{10} 2 = p/q$ with positive integers $p, q$, then $2^q = 10^p = 2^p 5^p$, which forces a power of 5 to equal a power of 2; unique factorization says no. Consequently the points $f_n$ are all distinct (a repeat $f_n = f_{n'}$ would make $(n - n')\alpha$ an integer), and the sequence never becomes periodic.

## Equidistribution

The map $f \mapsto \{f + \alpha\}$ is a rotation of the circle by the irrational angle $\alpha$, and $f_n$ is the orbit of $0$ under that rotation. The **equidistribution theorem** says that such an orbit spreads uniformly: for every interval $[a, b) \subseteq [0,1)$,

$$
\frac{\#\{\, n \le N : \{n\alpha\} \in [a,b) \,\}}{N} \;\longrightarrow\; b - a
\qquad \text{as } N \to \infty.
$$

Applied to the digit intervals, this is the whole result: the frequency of leading digit $d$ among the powers of two converges to $\log_{10}(1 + 1/d)$.

The proof runs through [Weyl's criterion](https://en.wikipedia.org/wiki/Equidistribution_theorem): a sequence $(f_n)$ is equidistributed in $[0,1)$ if and only if, for every nonzero integer $h$, the exponential averages vanish in the limit,

$$
\frac{1}{N} \sum_{n=1}^{N} e^{2\pi i h f_n} \;\longrightarrow\; 0.
$$

The criterion converts a statement about counting into a statement about cancellation, and for the rotation orbit the cancellation is a finite geometric series:

$$
\left| \sum_{n=1}^{N} e^{2\pi i h n \alpha} \right|
= \left| e^{2\pi i h \alpha}\,\frac{e^{2\pi i h N \alpha} - 1}{e^{2\pi i h \alpha} - 1} \right|
\le \frac{2}{\left| e^{2\pi i h \alpha} - 1 \right|}
= \frac{1}{\left| \sin(\pi h \alpha) \right|}.
$$

Irrationality of $\alpha$ guarantees $h\alpha$ is never an integer, so the bound is finite, and crucially it does not grow with $N$: dividing by $N$ sends the average to zero. (The other half of the criterion, that killing all the exponentials forces uniform counting, follows by sandwiching the indicator function of an interval between trigonometric polynomials; Kuipers and Niederreiter give the two-page argument.)

The limiting frequencies for a few digits, to four places:

| $d$ | 1 | 2 | 5 | 9 |
| --- | --- | --- | --- | --- |
| $\log_{10}(1+1/d)$ | .3010 | .1761 | .0792 | .0458 |

## The drift, made visible

The convergence has a fine structure worth seeing. Ten doublings multiply by $2^{10} = 1024$, which is three orders of magnitude and a little more: $\{10\alpha\} = 0.0103$. So after every ten steps the mantissa returns almost to where it started, multiplied by $10^{0.0103} = 1.024$. The leading-digit sequence therefore repeats the block

$$
1, 2, 4, 8, 1, 3, 6, 1, 2, 5
$$

over and over, with each slot creeping upward by 2.4% per cycle. The pattern only changes when a slot's mantissa crosses a digit boundary, and the crossings are what equidistribution looks like at ground level. Follow the slot that starts at 64:

$$
2^6 = 64, \quad 2^{16} = 65536, \quad 2^{26} \approx 6.71 \cdot 10^7, \quad 2^{36} \approx 6.87 \cdot 10^{10}, \quad 2^{46} \approx 7.04 \cdot 10^{13}.
$$

Four cycles of 2.4% push 6.4 over 7, and $2^{46}$ is the first power of two whose decimal expansion starts with 7. The slot that starts at 8 takes even longer to cross:

$$
8, \quad 8192, \quad 8388608, \quad 8.59 \cdot 10^9, \quad 8.80 \cdot 10^{12}, \quad 9.01 \cdot 10^{15},
$$

so the first power of two starting with 9 is $2^{53} = 9007199254740992$. (The same number is where double-precision floating point stops representing consecutive integers exactly: JavaScript's `Number.MAX_SAFE_INTEGER` is $2^{53} - 1$. The two facts are unrelated, but it is a good number to recognize on sight.) After the ten-step near-period, the next much better rational approximation to $\alpha$ is $28/93$: ninety-three doublings land within a whisker of twenty-eight decades, $2^{93} \approx 9.90 \cdot 10^{27}$, so the residual drift of the ten-step pattern itself nearly repeats every 93 steps.

The widget counts the leading digits of $2^1, \ldots, 2^N$ exactly, by accumulating $\{n\alpha\}$; nothing is sampled. At small $N$ the shares visibly disagree with the limit (the digit-7 share is exactly zero until $N = 46$), and the disagreement fades as the boundary crossings accumulate:

<div class="ld1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>N =&nbsp;<strong id="ld1-nval" style="display: inline-block; min-width: 3.2em;">100</strong></span><input id="ld1-n" type="range" min="10" max="2000" step="1" value="100" style="flex: 1; min-width: 160px; accent-color: #2563eb;"><span>share of digit 1 = <strong id="ld1-share" style="display: inline-block; min-width: 4.2em;">30.0%</strong></span></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span style="color: #2563eb;">exact share among 2¹ … 2ᴺ</span><span style="color: #d97706;">limit log₁₀(1 + 1/d)</span></div><svg id="ld1-svg" viewBox="0 0 640 300" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Bar chart of exact leading-digit frequencies of the first N powers of two, compared with the Benford limit for each digit."></svg></div>
<script>
(function () {
  var slider = document.getElementById('ld1-n');
  if (!slider) return;
  var nDisp = document.getElementById('ld1-nval');
  var shareDisp = document.getElementById('ld1-share');
  var svg = document.getElementById('ld1-svg');
  var ALPHA = Math.log(2) / Math.log(10);
  var BAR = '#2563eb', LIM = '#d97706';
  var benford = [];
  for (var d = 1; d <= 9; d++) benford.push(Math.log(1 + 1 / d) / Math.log(10));
  function counts(N) {
    var c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var n = 1; n <= N; n++) {
      var f = (n * ALPHA) % 1;
      c[Math.floor(Math.pow(10, f)) - 1]++;
    }
    return c;
  }
  function render() {
    var N = parseInt(slider.value, 10);
    var c = counts(N);
    var ymax = 0;
    for (var i = 0; i < 9; i++) ymax = Math.max(ymax, c[i] / N, benford[i]);
    ymax *= 1.18;
    var out = '';
    var x0 = 40, slot = (620 - x0) / 9, base = 252, top = 24;
    out += '<line x1="' + x0 + '" y1="' + base + '" x2="620" y2="' + base + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>';
    for (var i = 0; i < 9; i++) {
      var cx = x0 + slot * (i + 0.5);
      var frac = c[i] / N;
      var h = (frac / ymax) * (base - top);
      var hb = (benford[i] / ymax) * (base - top);
      out += '<rect x="' + (cx - 20).toFixed(1) + '" y="' + (base - h).toFixed(1) + '" width="40" height="' + h.toFixed(1) + '" fill="' + BAR + '" fill-opacity="0.8"/>';
      out += '<line x1="' + (cx - 26).toFixed(1) + '" y1="' + (base - hb).toFixed(1) + '" x2="' + (cx + 26).toFixed(1) + '" y2="' + (base - hb).toFixed(1) + '" stroke="' + LIM + '" stroke-width="2.5"/>';
      out += '<text x="' + cx.toFixed(1) + '" y="' + (base - h - 6).toFixed(1) + '" text-anchor="middle" font-size="11" fill="currentColor">' + (100 * frac).toFixed(1) + '</text>';
      out += '<text x="' + cx.toFixed(1) + '" y="' + (base + 20) + '" text-anchor="middle" font-size="14" fill="currentColor">' + (i + 1) + '</text>';
    }
    out += '<text x="' + (x0 + (620 - x0) / 2) + '" y="292" text-anchor="middle" font-size="12" fill="currentColor">leading digit (bar labels in percent)</text>';
    svg.innerHTML = out;
    nDisp.textContent = N;
    shareDisp.textContent = (100 * c[0] / N).toFixed(1) + '%';
  }
  slider.addEventListener('input', render);
  render();
})();
</script>

## Scale invariance and Benford's law

The powers of two are the clean, provable case of a broader phenomenon. [Benford's law](https://en.wikipedia.org/wiki/Benford%27s_law) is the empirical observation that many datasets assembled from the world (populations, physical constants, accounting ledgers) show roughly these same leading-digit frequencies. For data there is no theorem forcing this, but there is a theorem explaining which data should show it: a **scale-invariance** argument.

Suppose the leading-digit distribution of a positive random quantity $X$ does not change when the units change, that is, $cX$ has the same leading-digit distribution as $X$ for every constant $c > 0$. The leading digit of $X$ depends only on $Y = \{\log_{10} X\}$, and multiplying by $c$ translates $Y$ by $\log_{10} c$ modulo 1. Unit-invariance for all $c$ therefore says the distribution of $Y$ on the circle is invariant under every rotation. Its Fourier coefficients then satisfy $\varphi(h) = e^{2\pi i h t}\,\varphi(h)$ for all shifts $t$, forcing $\varphi(h) = 0$ for every $h \ne 0$: $Y$ is uniform, and the digit frequencies are $\log_{10}(1 + 1/d)$, the same computation as before.

The honest reading runs in one direction only. Nothing obliges a dataset to be scale-invariant, and plenty are not (adult heights in metres have no Benford behavior at all). The law tends to appear in data with wide dynamic range or multiplicative growth, where no single scale is privileged, and its failure in data that should have it is what forensic accountants use as a screening flag, a heuristic rather than a proof. For $2^n$ none of these hedges are needed: multiplicative growth is the definition of the sequence, and equidistribution does the rest.

## A little history

The observation predates the name by decades. Simon Newcomb noticed in 1881 that the front pages of shared logarithm tables, the ones for numbers beginning with 1, were the most worn, and proposed the logarithmic law in [a two-page note](https://www.jstor.org/stable/2369148). Frank Benford, a physicist at General Electric, rediscovered it in [1938](https://www.jstor.org/stable/984802) and tested it against 20,229 numbers drawn from river areas, street addresses, molecular weights, and more; the law took his name. The equidistribution theorem for $\{n\alpha\}$ was proved independently around 1909–1910 by [Bohl](https://en.wikipedia.org/wiki/Piers_Bohl), [Sierpiński](https://en.wikipedia.org/wiki/Wac%C5%82aw_Sierpi%C5%84ski), and Weyl, and Weyl's [1916 paper](https://doi.org/10.1007/BF01475864) recast it as the exponential-sum criterion used above, a tool that went on to power large parts of [analytic number theory](https://en.wikipedia.org/wiki/Analytic_number_theory). The application to leading digits, along with much finer results, is laid out in Diaconis's [1977 paper](https://doi.org/10.1214/aop/1176995891).

## References

- Simon Newcomb. *Note on the frequency of use of the different digits in natural numbers*. American Journal of Mathematics, 4(1):39–40, 1881. The worn-pages observation and the first statement of the law.
- Frank Benford. *The law of anomalous numbers*. Proceedings of the American Philosophical Society, 78(4):551–572, 1938. The 20,229-number survey.
- Hermann Weyl. *Über die Gleichverteilung von Zahlen mod. Eins*. Mathematische Annalen, 77:313–352, 1916. The equidistribution criterion.
- Persi Diaconis. *The distribution of leading digits and uniform distribution mod 1*. Annals of Probability, 5(1):72–81, 1977. Leading digits of $2^n$ and beyond.
- L. Kuipers, H. Niederreiter. *Uniform Distribution of Sequences*. Wiley, 1974. The standard reference, including the full proof of Weyl's criterion.
