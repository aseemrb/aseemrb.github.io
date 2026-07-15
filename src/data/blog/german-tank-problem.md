---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-12T09:20:00Z
title: German tank problem
slug: german-tank-problem
featured: false
draft: false
tags:
  - statistics
  - mathematics
description:
  "Estimating a population size N from the largest of k random serial numbers: m(1 + 1/k) − 1 is unbiased with error of order N/k. Allied statisticians used it on German tank production."
---

Equipment rolls off a production line carrying serial numbers $1, 2, \ldots, N$, and $N$ is a secret. You capture $k$ of the $N$ units, drawn at random from the whole run rather than in production order, look at their serials, and want to estimate $N$. This is the **[German tank problem](https://en.wikipedia.org/wiki/German_tank_problem)**, named for its most consequential application, and it is a small parade of estimation theory: the obvious estimator is provably bad, the good one has a two-line derivation, and there is a theorem saying nothing better exists.

Model the capture as a uniform random sample of $k$ distinct serials from $\{1, \ldots, N\}$, and write $M$ for the largest serial observed. Intuition already says $M$ carries the information: knowing the smaller serials tells you about the layout below the maximum, not about how far the line continues above it. (The formal version: $M$ is a [sufficient statistic](https://en.wikipedia.org/wiki/Sufficient_statistic) for $N$, meaning the conditional distribution of the rest of the sample given $M$ does not involve $N$.) The maximum-likelihood estimate is $M$ itself: among all values of $N$, the sample in hand is most probable when $N = M$, since larger $N$ spreads probability over more possible samples. But $M \le N$ always. An estimator that can never overshoot must undershoot on average, and the interesting question is by how much, and what to add back.

## The distribution of the maximum

All $\binom{N}{k}$ subsets are equally likely. The maximum equals $x$ exactly when the subset contains $x$ and its other $k-1$ elements come from $\{1, \ldots, x-1\}$:

$$
\mathbb{P}(M = x) = \frac{\binom{x-1}{k-1}}{\binom{N}{k}}, \qquad x = k, \ldots, N.
$$

The expectation comes out of the [hockey-stick identity](https://en.wikipedia.org/wiki/Hockey-stick_identity), $\sum_{x=k}^{N} \binom{x}{k} = \binom{N+1}{k+1}$, which counts the $(k+1)$-subsets of $\{1, \ldots, N+1\}$ by their largest element. Using $x \binom{x-1}{k-1} = k \binom{x}{k}$,

$$
\mathbb{E}[M] = \sum_{x=k}^{N} x\, \frac{\binom{x-1}{k-1}}{\binom{N}{k}}
= k\, \frac{\binom{N+1}{k+1}}{\binom{N}{k}}
= \frac{k(N+1)}{k+1}.
$$

So the maximum sits, on average, a fraction $k/(k+1)$ of the way up: five captured tanks put $M$ near $\tfrac{5}{6}N$, and using $M$ as the estimate is systematically 17% short.

## The gap estimator

The correction has a derivation that needs no algebra at all. The $k$ observed serials cut $\{1, \ldots, N\}$ into $k+1$ **gaps** of unobserved serials: the run below the smallest observation, the $k-1$ runs between consecutive observations, and the run above the maximum. By symmetry the $k+1$ gap lengths are exchangeable (relabeling the line from the top renumbers the gaps but not the sampling), so each gap has the same expected length, $(N - k)/(k+1)$.

The one gap you cannot see the end of is the run above $M$, and its expected length matches the gaps you can see. Below and including the maximum there are $m - k$ unobserved serials spread over $k$ gaps, an average of $(m-k)/k$ per gap. Extend the line above the maximum by one average gap:

$$
\widehat{N} = m + \frac{m - k}{k} = m\left(1 + \frac{1}{k}\right) - 1.
$$

The expectation computed above certifies the guess: $\mathbb{E}[\widehat{N}] = \frac{k+1}{k} \cdot \frac{k(N+1)}{k+1} - 1 = N$, exactly unbiased. And this is not merely one good estimator among many: $M$ is a *complete* sufficient statistic for this family, so by the [Lehmann–Scheffé theorem](https://en.wikipedia.org/wiki/Lehmann%E2%80%93Scheff%C3%A9_theorem), $\widehat{N}$ is the unique minimum-variance unbiased estimator; the analysis goes back to Goodman's 1952 paper. Concretely: four captured tanks with a highest serial of 60 give $\widehat{N} = 60 \cdot \tfrac{5}{4} - 1 = 74$, where maximum likelihood would have said 60.

## The variance

A second pass through the hockey-stick identity, applied to $\mathbb{E}[M(M+1)]$, yields the exact variance, and hence

$$
\operatorname{Var}(\widehat{N}) = \frac{(N - k)(N + 1)}{k(k + 2)} \;\approx\; \frac{N^2}{k^2} \quad \text{for } k \ll N.
$$

The standard error is roughly $N/k$. That $1/k$ is worth staring at: estimators built from averages improve like $1/\sqrt{k}$, and this one improves like $1/k$, because an extreme order statistic hugs the boundary it estimates far more tightly than any average does. The comparison can be made exact. The estimator $2\bar{X} - 1$, twice the sample mean minus one, is also unbiased for $N$, and a standard finite-population computation gives it variance $(N+1)(N-k)/(3k) \approx N^2/(3k)$. The ratio of variances is about $k/3$: with twelve captured tanks, the maximum-based estimator is four times as precise, and the advantage keeps growing with every capture.

In the four-tanks example, the standard error attached to $\widehat{N} = 74$ is $\sqrt{(74-4)(74+1)/(4 \cdot 6)} \approx 15$: two dozen tanks of uncertainty, from four serial numbers.

## The Bayesian version

Treating $N$ as the unknown in a posterior needs only one identity. Given $N$, the observed sample has probability $1/\binom{N}{k}$ for every $N \ge m$, so under a flat prior the posterior is proportional to $1/\binom{N}{k}$. The telescoping identity

$$
\frac{1}{\binom{N}{k}} = \frac{k}{k-1} \left[ \frac{1}{\binom{N-1}{k-1}} - \frac{1}{\binom{N}{k-1}} \right]
$$

collapses the normalizing sum to $\sum_{N \ge m} \binom{N}{k}^{-1} = \frac{k}{k-1} \binom{m-1}{k-1}^{-1}$ (the prior is improper, but the posterior is proper as soon as $k \ge 2$), and the tail probabilities inherit the same closed form:

$$
\mathbb{P}(N \ge x \mid m) = \frac{\binom{m-1}{k-1}}{\binom{x-1}{k-1}} \;\sim\; \left(\frac{m}{x}\right)^{k-1}.
$$

The posterior has a power-law tail with exponent $k - 1$: heavy for small samples, and in fact the posterior mean is infinite for $k = 2$. For $k \ge 3$ it exists and is again closed-form,

$$
\mathbb{E}[N \mid m] = \frac{(m-1)(k-1)}{k-2}.
$$

For the running example ($k = 4$, $m = 60$): posterior mean $59 \cdot 3 / 2 = 88.5$, noticeably above the unbiased 74 because of that heavy tail, and $\mathbb{P}(N \ge 120 \mid m) = \binom{59}{3} / \binom{119}{3} \approx 0.12$. A production run twice the highest observed serial is a live possibility at $k = 4$; it takes more captures, not more cleverness, to rule it out.

All four numbers, for any $k$ and $m$, from the closed forms above:

<div class="gt1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>captured k =&nbsp;<strong id="gt1-kval" style="display: inline-block; min-width: 2.2em;">4</strong></span><input id="gt1-k" type="range" min="1" max="40" step="1" value="4" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span>highest serial m =&nbsp;<strong id="gt1-mval" style="display: inline-block; min-width: 3.2em;">60</strong></span><input id="gt1-m" type="range" min="10" max="2000" step="1" value="60" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; font-size: 0.95em;"><span>max likelihood: <strong id="gt1-mle" style="display: inline-block; min-width: 3.5em;">60</strong></span><span>unbiased N̂: <strong id="gt1-nhat" style="display: inline-block; min-width: 4.5em;">74.0</strong></span><span>std. error: <strong id="gt1-se" style="display: inline-block; min-width: 4em;">14.8</strong></span><span>posterior mean: <strong id="gt1-bayes" style="display: inline-block; min-width: 4.5em;">88.5</strong></span></div></div>
<script>
(function () {
  var kSlider = document.getElementById('gt1-k');
  if (!kSlider) return;
  var mSlider = document.getElementById('gt1-m');
  var kDisp = document.getElementById('gt1-kval');
  var mDisp = document.getElementById('gt1-mval');
  var mleDisp = document.getElementById('gt1-mle');
  var nhatDisp = document.getElementById('gt1-nhat');
  var seDisp = document.getElementById('gt1-se');
  var bayesDisp = document.getElementById('gt1-bayes');
  function render() {
    var k = parseInt(kSlider.value, 10);
    var m = Math.max(parseInt(mSlider.value, 10), k);
    var nhat = m * (1 + 1 / k) - 1;
    var se = Math.sqrt(Math.max(0, (nhat - k) * (nhat + 1) / (k * (k + 2))));
    kDisp.textContent = k;
    mDisp.textContent = m;
    mleDisp.textContent = m;
    nhatDisp.textContent = nhat.toFixed(1);
    seDisp.textContent = se.toFixed(1);
    bayesDisp.textContent = k >= 3 ? ((m - 1) * (k - 1) / (k - 2)).toFixed(1) : '∞';
  }
  kSlider.addEventListener('input', render);
  mSlider.addEventListener('input', render);
  render();
})();
</script>

## The historical record

During the Second World War, analysts in the Economic Warfare Division of the American embassy in London, working with British counterparts, estimated German war production from the markings on captured and destroyed equipment: serial numbers and maker's codes on gearboxes, chassis, engines, and tyre moulds. Their post-war account ([Ruggles and Brodie, 1947](https://doi.org/10.1080/01621459.1947.10501915)) includes the comparison that made the method famous. Monthly German tank production, three ways:

| Month | Serial-number estimate | Conventional intelligence | German records |
| --- | --- | --- | --- |
| June 1940 | 169 | 1000 | 122 |
| June 1941 | 244 | 1550 | 271 |
| August 1942 | 327 | 1550 | 342 |

Conventional intelligence, extrapolating from prewar industrial capacity and relying on reports and rumor, overestimated production by factors of four to six. The serial-number estimates landed within about 10% in two of the three months and within 40% in the worst one, using arithmetic a page long. The postwar audit of [Speer-ministry](https://en.wikipedia.org/wiki/Reich_Ministry_of_Armaments_and_War_Production) records is the rare case where an estimator meets its ground truth decades ahead of declassification.

The practice was messier than the model. Serial numbers did not always start at 1, several factories numbered in separate blocks, and some sequences had deliberate gaps; a large part of the actual work in Ruggles and Brodie is reconstructing the numbering scheme before any formula applies. The estimator itself is indifferent to the application, and the same arithmetic applies whenever sequential identifiers leak: invoice numbers, database row IDs, order numbers on receipts. Issuing sequential serial numbers in public is a quiet way of publishing your production figures.

## References

- Richard Ruggles, Henry Brodie. *An empirical approach to economic intelligence in World War II*. Journal of the American Statistical Association, 42(237):72–91, 1947. The wartime method and the postwar comparison table.
- Leo A. Goodman. *Serial number analysis*. Journal of the American Statistical Association, 47(259):622–634, 1952. The estimation theory: unbiasedness, variance, and optimality.
- E. L. Lehmann, George Casella. *Theory of Point Estimation*. 2nd edition, Springer, 1998. Sufficiency, completeness, and the Lehmann–Scheffé theorem used above.
- Roger W. Johnson. *Estimating the size of a population*. Teaching Statistics, 16(2):50–52, 1994. A clean expository treatment comparing the candidate estimators.
