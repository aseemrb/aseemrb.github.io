---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-18T09:30:00Z
title: Kelly criterion
slug: kelly-criterion
featured: false
draft: false
tags:
  - statistics
  - mathematics
description:
  "How much of the bankroll to stake on a repeated favorable bet: maximizing the expected logarithm gives f* = p − q/b, with closed forms for the growth rate and the drawdowns."
---

A bet pays even money and wins with probability $p > 1/2$; the bet repeats indefinitely, and each round you may stake any fraction $f$ of your current bankroll. How much should you stake?

Expected value pulls toward recklessness. Each round multiplies the expected bankroll by $1 + f(2p - 1)$, increasing in $f$, so expectation is maximized at $f = 1$: stake everything, every round. But the all-in strategy loses the entire bankroll on the first lost bet, and with probability one some bet eventually loses. The strategy with the largest expected wealth is also the strategy that ends in ruin almost surely; the expectation is carried entirely by an exponentially unlikely streak of wins. Whatever "optimal" ought to mean for a repeated bet, this tension says the mean of the final wealth is the wrong summary to maximize.

The **Kelly criterion** is the resolution: maximize the expected logarithm of wealth, equivalently the long-run exponential growth rate. That choice is not arbitrary taste, it is the unique objective the law of large numbers itself picks out, and every quantity it produces has a closed form.

## The growth rate of repeated bets

Let each round's payoff odds be $b$ to 1 (stake 1, win $b$ or lose the stake; $b = 1$ is even money), with win probability $p$ and $q = 1 - p$. Staking a fixed fraction $f \in [0, 1)$ turns the bankroll into a product,

$$
W_n = W_0 \prod_{i=1}^{n} (1 + f X_i), \qquad X_i = \begin{cases} +b & \text{with probability } p, \\ -1 & \text{with probability } q, \end{cases}
$$

and products are sums in the log:

$$
\frac{1}{n} \ln \frac{W_n}{W_0} = \frac{1}{n} \sum_{i=1}^{n} \ln(1 + f X_i)
\;\xrightarrow[n \to \infty]{\text{a.s.}}\;
G(f) = p \ln(1 + bf) + q \ln(1 - f),
$$

by the [strong law of large numbers](https://notes.aseemrb.me/probability-theory/laws-of-large-numbers/strong-lln/). So $W_n \approx W_0\, e^{n G(f)}$ along almost every history: if $G(f) > 0$ the bankroll grows exponentially, if $G(f) < 0$ it decays exponentially, and this verdict is delivered by almost every sequence of outcomes, not by an average over them. The gap between the two summaries is **volatility drag**: the arithmetic mean of the factor $1 + fX$ can comfortably exceed 1 while its geometric mean, which is what compounds, sits below 1. The all-in strategy is the extreme case, $G(1) = -\infty$.

## The optimal fraction

$G$ is strictly concave in $f$ (each term is), so the unique maximizer comes from one derivative:

$$
G'(f) = \frac{pb}{1 + bf} - \frac{q}{1 - f} = 0
\quad\Longrightarrow\quad
f^* = \frac{bp - q}{b} = p - \frac{q}{b}.
$$

The numerator $bp - q$ is the expected profit per unit staked, the **edge**; the denominator is the odds. For even money the rule is starkly simple: $f^* = p - q$, stake your edge. A 55% coin at even odds gets 10% of the bankroll, no more.

At the optimum, the even-money growth rate collapses to an information-theoretic quantity:

$$
G(f^*) = p \ln(2p) + q \ln(2q) = \ln 2 - H(p),
$$

where $H(p) = -p \ln p - q \ln q$ is the [entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)) of the coin in nats. For $p = 0.55$: $f^* = 0.10$ and $G(f^*) = \ln 2 - H(0.55) \approx 0.0050$ per bet, so the bankroll doubles about every $\ln 2 / 0.0050 \approx 138$ bets. Everything in the widget is these formulas evaluated exactly:

<div class="kc1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>win probability p =&nbsp;<strong id="kc1-pval" style="display: inline-block; min-width: 3.4em;">55.0%</strong></span><input id="kc1-p" type="range" min="0.40" max="0.70" step="0.005" value="0.55" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>odds b =&nbsp;<strong id="kc1-bval" style="display: inline-block; min-width: 2.2em;">1.0</strong></span><input id="kc1-b" type="range" min="1" max="5" step="0.5" value="1" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span>f* = <strong id="kc1-f" style="display: inline-block; min-width: 3.6em;">10.0%</strong></span><span>growth per bet: <strong id="kc1-g" style="display: inline-block; min-width: 4.6em;">0.501%</strong></span><span>bets to double: <strong id="kc1-dbl" style="display: inline-block; min-width: 3.4em;">139</strong></span></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span style="color: #dc2626;">full Kelly f*</span><span style="color: #d97706;">half Kelly</span><span style="color: #16a34a;">twice Kelly</span></div><svg id="kc1-svg" viewBox="0 0 640 340" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Growth rate as a function of the staked fraction: a concave curve peaking at the Kelly fraction, back to zero growth at twice Kelly, and negative beyond."></svg></div>
<script>
(function () {
  var pSlider = document.getElementById('kc1-p');
  if (!pSlider) return;
  var bSlider = document.getElementById('kc1-b');
  var pDisp = document.getElementById('kc1-pval');
  var bDisp = document.getElementById('kc1-bval');
  var fDisp = document.getElementById('kc1-f');
  var gDisp = document.getElementById('kc1-g');
  var dblDisp = document.getElementById('kc1-dbl');
  var svg = document.getElementById('kc1-svg');
  var BLUE = '#2563eb', RED = '#dc2626', AMB = '#d97706', GRN = '#16a34a';
  var X0 = 56, X1 = 620, Y0 = 20, Y1 = 300, FMAX = 0.8;
  function growth(f, p, b) {
    if (f >= 1) return -Infinity;
    return p * Math.log(1 + b * f) + (1 - p) * Math.log(1 - f);
  }
  function render() {
    var p = parseFloat(pSlider.value), b = parseFloat(bSlider.value);
    var fstar = Math.max(0, p - (1 - p) / b);
    var gstar = fstar > 0 ? growth(fstar, p, b) : 0;
    var ymax = Math.max(gstar * 1.35, 0.004);
    var ymin = -ymax;
    function px(f) { return X0 + (X1 - X0) * f / FMAX; }
    function py(g) { return Y1 - (Y1 - Y0) * (Math.max(ymin, Math.min(ymax, g)) - ymin) / (ymax - ymin); }
    var out = '';
    out += '<line x1="' + X0 + '" y1="' + py(0).toFixed(1) + '" x2="' + X1 + '" y2="' + py(0).toFixed(1) + '" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5"/>';
    out += '<text x="' + (X0 - 8) + '" y="' + (py(0) + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="currentColor">0</text>';
    for (var t = 0; t <= 8; t += 2) {
      var fx = FMAX * t / 8;
      out += '<line x1="' + px(fx).toFixed(1) + '" y1="' + Y1 + '" x2="' + px(fx).toFixed(1) + '" y2="' + (Y1 + 5) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
      out += '<text x="' + px(fx).toFixed(1) + '" y="' + (Y1 + 20) + '" text-anchor="middle" font-size="12" fill="currentColor">' + Math.round(100 * fx) + '%</text>';
    }
    var path = '';
    for (var i = 0; i <= 200; i++) {
      var f = FMAX * i / 200;
      path += (i === 0 ? 'M' : 'L') + px(f).toFixed(1) + ',' + py(growth(f, p, b)).toFixed(1) + ' ';
    }
    out += '<path d="' + path + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>';
    if (fstar > 0) {
      out += '<circle cx="' + px(fstar / 2).toFixed(1) + '" cy="' + py(growth(fstar / 2, p, b)).toFixed(1) + '" r="6" fill="' + AMB + '"/>';
      if (2 * fstar <= FMAX) out += '<circle cx="' + px(2 * fstar).toFixed(1) + '" cy="' + py(growth(2 * fstar, p, b)).toFixed(1) + '" r="6" fill="' + GRN + '"/>';
      out += '<circle cx="' + px(fstar).toFixed(1) + '" cy="' + py(gstar).toFixed(1) + '" r="6" fill="' + RED + '"/>';
    }
    out += '<text x="' + (X0 + 10) + '" y="' + (Y0 + 6) + '" font-size="12" fill="currentColor">growth rate G(f)</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="334" text-anchor="middle" font-size="12" fill="currentColor">fraction of bankroll staked</text>';
    svg.innerHTML = out;
    pDisp.textContent = (100 * p).toFixed(1) + '%';
    bDisp.textContent = b.toFixed(1);
    fDisp.textContent = (100 * fstar).toFixed(1) + '%';
    gDisp.textContent = fstar > 0 ? (100 * (Math.exp(gstar) - 1)).toFixed(3) + '%' : '0%';
    dblDisp.textContent = fstar > 0 ? String(Math.round(Math.LN2 / gstar)) : '–';
  }
  pSlider.addEventListener('input', render);
  bSlider.addEventListener('input', render);
  render();
})();
</script>

## Properties of the optimum

The shape of $G$ near its peak governs everything a practitioner cares about, and a quadratic approximation captures it cleanly. Since $G(0) = 0$ and $G$ is smooth and concave with its maximum at $f^*$, writing $G(f) \approx G^* - \tfrac{1}{2}\,|G''(f^*)|\,(f - f^*)^2$ and evaluating at $f = 0$ ties the curvature to the peak: $G^* \approx \tfrac{1}{2}|G''(f^*)|\,f^{*2}$. Staking a multiple $c$ of the Kelly fraction then gives

$$
G(c f^*) \;\approx\; c\,(2 - c)\; G^*.
$$

Two readings of this parabola do most of the practical work:

- **Half Kelly** ($c = \tfrac{1}{2}$): three quarters of the optimal growth rate at half the stake. For the 55% coin the exact numbers are $G(0.05) = 0.00375$ against $G^* = 0.00501$, a ratio of 0.749.
- **Twice Kelly** ($c = 2$): zero growth. The favorable game is entirely eaten by volatility drag; for the 55% coin the exact value is $G(0.20) = -0.00014$, marginally below zero. Beyond twice Kelly, a bet with positive edge compounds downward.

The asymmetry matters: underbetting by a factor costs a fraction of the growth rate, overbetting by the same factor can flip its sign, and $G \to -\infty$ as $f \to 1$. Every practical error (an overestimated $p$, a correlated sequence of bets) lands on the overbetting side, which is the argument usually given for staking a deliberate fraction of $f^*$.

Even at the exact optimum, the ride is rough, and the roughness has a closed form. In the diffusion limit, log-wealth under a fraction $c$ of Kelly is a Brownian motion with drift $\nu = (c - c^2/2)\sigma^2$ and variance rate $c^2\sigma^2$; the process $W^{-2\nu/(c\sigma)^2}$ is then an exponential martingale, and optional stopping at the first passage to a fraction $x < 1$ of the starting bankroll gives

$$
\mathbb{P}\bigl(\text{ever drop to fraction } x\bigr) = x^{\,2/c - 1}.
$$

At full Kelly ($c = 1$) the exponent is 1: the probability of ever losing half the bankroll is exactly $1/2$, and of ever being down 90% is $1/10$. At half Kelly the exponent is 3, and the halving probability falls to $1/8$. Deep drawdowns under full Kelly are not misfortune; they are a computable property of the optimum.

## The information connection

Kelly's 1956 paper did not frame any of this as gambling advice. His gambler receives tips about the outcome over a noisy channel, and the question is what a rate of $R$ bits per bet is worth. For even-money bets where the tip is correct with probability $p$, the optimal growth rate derived above,

$$
G^* = \ln 2 - H(p),
$$

is precisely the capacity of the binary symmetric channel with error probability $q$ (in nats per use). The general theorem, in Cover and Thomas's chapter on gambling: with fair odds, side information $Y$ about the outcome $X$ raises the achievable growth rate by exactly the mutual information $I(X; Y)$. Information has a monetary exchange rate, and it is the Shannon quantity: a gambler's capital, optimally compounded, doubles once per bit of information about the outcomes. Kelly's title, "a new interpretation of information rate," was meant literally: this is capacity showing up in a setting with no codes and no messages, six years after Shannon's theory and one floor away from Shannon himself at Bell Labs.

## The scope of the argument

What is actually proved is worth stating carefully, because the criterion attracts overclaims in both directions. Breiman's 1961 theorems: among all betting strategies, log-optimal betting achieves the maximal almost-sure exponential growth rate, asymptotically outgrows any strategy that deviates from it infinitely often, and minimizes the expected number of bets to reach a distant wealth target. Those are statements about growth, and they are as strong as they sound.

What is not proved is that anyone must want maximal growth. An investor maximizing expected utility for a utility function other than the logarithm will bet differently at every horizon, and no long-run argument dissolves that; the expectation-versus-growth tension from the opening does not force the log, it only rules out the raw mean. This is Samuelson's objection, pressed across several papers, one of them written entirely in words of one syllable to make the point that the fallacy is elementary. The criterion is best read the way Breiman proved it and Thorp used it: not as the correct objective, but as the sharp upper boundary of aggressive play, the stake beyond which more risk buys less growth, with closed-form penalties on either side.

## A little history

The logarithm as a utility for multiplicative wealth is much older than information theory: Daniel Bernoulli [proposed it in 1738](https://www.jstor.org/stable/1909829) to resolve the [St. Petersburg paradox](/blog/st-petersburg-paradox). [Kelly's contribution](https://doi.org/10.1002/j.1538-7305.1956.tb03809.x), at [Bell Labs](https://en.wikipedia.org/wiki/Bell_Labs) in 1956, was the growth-rate theorem and the identification with channel capacity; Breiman supplied the rigorous [asymptotic optimality results in 1961](https://projecteuclid.org/proceedings/berkeley-symposium-on-mathematical-statistics-and-probability/Proceedings-of-the-Fourth-Berkeley-Symposium-on-Mathematical-Statistics-and/Chapter/Optimal-Gambling-Systems-for-Favorable-Games/bsmsp/1200512159). Edward Thorp carried the criterion into practice, first for blackjack bet sizing in [*Beat the Dealer*](https://en.wikipedia.org/wiki/Beat_the_Dealer) (1962), the book that forced casinos to change their rules, and later in convertible-bond arbitrage, where the same sizing logic ran [a hedge fund](https://en.wikipedia.org/wiki/Princeton_Newport_Partners) for two decades. Samuelson's critiques ([1971](https://doi.org/10.1073/pnas.68.10.2493), 1979) fixed the criterion's proper scope. The result is a rare trajectory: a theorem born as an interpretation of [Shannon's capacity](https://en.wikipedia.org/wiki/Channel_capacity), road-tested at casino tables, and still the standard vocabulary ("full Kelly", "half Kelly") for position sizing arguments.

## References

- J. L. Kelly, Jr. *A new interpretation of information rate*. Bell System Technical Journal, 35(4):917–926, 1956. The original paper: growth rate, side information, capacity.
- Leo Breiman. *Optimal gambling systems for favorable games*. Proceedings of the Fourth Berkeley Symposium on Mathematical Statistics and Probability, volume 1, 65–78, 1961. The asymptotic optimality theorems.
- Edward O. Thorp. *Beat the Dealer*. Random House, 1962. Kelly sizing in practice, at the blackjack table.
- Paul A. Samuelson. *The "fallacy" of maximizing the geometric mean in long sequences of investing or gambling*. Proceedings of the National Academy of Sciences, 68(10):2493–2496, 1971. The utility-theoretic objection.
- Paul A. Samuelson. *Why we should not make mean log of wealth big though years to act are long*. Journal of Banking and Finance, 3(4):305–307, 1979. The same objection, in words of one syllable.
- Thomas M. Cover, Joy A. Thomas. *Elements of Information Theory*. 2nd edition, Wiley, 2006. Chapter 6: gambling, growth rates, and mutual information.
- Daniel Bernoulli. *Exposition of a new theory on the measurement of risk* (1738). Translated in Econometrica, 22(1):23–36, 1954. Log utility, two centuries early.
