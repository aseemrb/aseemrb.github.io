---
author: Aseem Raj Baranwal
pubDatetime: 2023-07-22T10:00:00Z
title: Nearest neighbor breaks in high dimensions
slug: nearest-neighbor-breaks-in-high-dimensions
featured: false
draft: false
tags:
  - mathematics
  - machine learning
  - statistics
description:
  In high dimensions, all pairwise distances become essentially equal. Nearest and farthest neighbor are no longer meaningfully different. A short geometric tour of the curse of dimensionality.
---

[k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) is one of the most basic ML algorithms: classify a query by looking at its closest few training points. It works beautifully on low-dimensional data. On high-dimensional data, it just stops working.

The reason has a name (the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality)) and a sharp geometric statement: in high dimensions, all pairwise distances become essentially the same. Nearest and farthest neighbor are no longer meaningfully different.

## The phenomenon

Take $n$ points uniformly at random in the unit cube $[0, 1]^d$. Pick any pair $X, Y$ and look at their squared distance:

$$
\|X - Y\|^2 \;=\; \sum_{i=1}^d (X_i - Y_i)^2.
$$

Each term $(X_i - Y_i)^2$ is independent across coordinates with mean $\tfrac{1}{6}$ (a one-line computation: for $U, V \stackrel{\text{iid}}{\sim} \mathrm{Unif}[0,1]$, $\mathbb{E}[(U-V)^2] = \tfrac{1}{6}$) and finite variance $\tfrac{7}{180}$.

By the [law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers),

$$
\frac{1}{d}\|X - Y\|^2 \;\longrightarrow\; \frac{1}{6} \quad \text{a.s. as } d \to \infty.
$$

So $\|X - Y\| \approx \sqrt{d/6}$, with this radius being the *same for every pair*. The fluctuations around it are of order $1/\sqrt{d}$ by the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). The histogram of pairwise distances among 50 random points pinches around $\sqrt{d/6}$ as $d$ grows; by $d = 100$, all pairs sit within a few percent of the same distance.

Concretely: the mean distance grows as $\sqrt{d/6}$, the ratio std/mean shrinks like $1/\sqrt{d}$, and by $d = 100$ the maximum and minimum pairwise distances differ by less than 30 %; by $d = 500$, less than 12 %. For comparison, in $d = 1$ the maximum distance is roughly five times the minimum.

## What this does to k-nearest neighbors

kNN works by ranking training points by distance to a query and using the closest few. If every training point is at essentially the same distance, the ranking is essentially random, driven by tiny fluctuations rather than signal. The nearest neighbor is no more informative than a random training point.

Beyer, Goldstein, Ramakrishnan, and Shaft made this precise in 1999 in a paper titled exactly *[When is "nearest neighbor" meaningful?](https://doi.org/10.1007/3-540-49257-7_15)* The answer, roughly: not when the dimension is large compared to the number of points and the data has no low-dimensional structure. Their main result:

$$
\frac{\max_{i \ne j} \|X_i - X_j\| \;-\; \min_{i \ne j} \|X_i - X_j\|}{\min_{i \ne j} \|X_i - X_j\|} \;\xrightarrow{p}\; 0
$$

as $d \to \infty$ for fixed $n$, under mild moment conditions on the coordinate distribution. Maximum and minimum pairwise distances are within an arbitrarily small relative gap.

## The derivation

Let $D_d := \|X - Y\|^2 / d$ be the average squared coordinate difference between $X, Y \stackrel{\text{iid}}{\sim} \mathrm{Unif}[0,1]^d$. By construction, $D_d$ is the average of $d$ i.i.d. random variables with mean $\tfrac{1}{6}$ and variance $\sigma^2 = \tfrac{7}{180}$.

LLN: $D_d \to \tfrac{1}{6}$ a.s. CLT: $\sqrt{d}\,(D_d - \tfrac{1}{6}) \to \mathcal{N}(0, \sigma^2)$. So $D_d \approx \tfrac{1}{6} \pm \sigma/\sqrt{d}$, and

$$
\frac{\mathrm{std}(\|X - Y\|)}{\mathbb{E}[\|X - Y\|]} \;=\; O\!\left(\frac{1}{\sqrt{d}}\right) \to 0.
$$

The story is the same for [Gaussian features](/blog/high-dimensional-gaussians-on-a-sphere) (Vershynin, Ch. 5) and for any product distribution with finite second moment. It is fundamentally a [concentration of measure](https://en.wikipedia.org/wiki/Concentration_of_measure) phenomenon.

## What to do instead

A few common tactics, none free:

1. **Reduce dimension first.** [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis), autoencoders, or random projection ([Johnson–Lindenstrauss](https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma)) before applying distance-based methods.
2. **Learn a metric.** A learned similarity function (e.g., from a deep network) typically beats raw Euclidean distance.
3. **Use [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).** Direction in high dimensions is more stable than magnitude. Word and image embeddings essentially always use cosine.
4. **Exploit low-dimensional structure.** Real high-dim data often lives near a low-dimensional manifold. Methods that adapt to that structure dodge the curse rather than fighting it.

The first principle: the raw Euclidean metric on a high-dimensional ambient space is rarely the metric you actually want.

## References

- Kevin Beyer, Jonathan Goldstein, Raghu Ramakrishnan, Uri Shaft. *When is "nearest neighbor" meaningful?* International Conference on Database Theory, 1999.
- Roman Vershynin. *High-Dimensional Probability*. Cambridge University Press, 2018. Chapter 5 (concentration), Section 5.3 (the Johnson–Lindenstrauss lemma).
