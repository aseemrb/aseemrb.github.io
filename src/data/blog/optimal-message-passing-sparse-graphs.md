---
author: Aseem Raj Baranwal
pubDatetime: 2025-01-16T15:22:00Z
title: Optimal message passing on sparse graphs
slug: optimal-message-passing-sparse-graphs
featured: false
draft: false
tags:
  - machine learning
  - computer science
description:
  A condensed walkthrough of our NeurIPS 2023 paper deriving the asymptotically Bayes-optimal classifier for node classification on sparse contextual stochastic block models, and what it implies for the design of graph neural networks.
---

Most theory on graph neural networks (GNNs) lives in the *dense* regime, usually on the dense stochastic block model, where each node's degree grows with the size of the graph. That setting is mathematically convenient (as $n \to \infty$, neighborhoods concentrate), but it doesn't match what we actually train on: the [Open Graph Benchmark](https://ogb.stanford.edu/) datasets have millions of nodes with average degree on the order of tens, and the per-node feature dimension stays in the low hundreds. The interesting regime is *sparse*: node degrees stay $O(1)$, the feature dimension stays fixed, and only $n$ grows.

In our [NeurIPS 2023 paper](https://arxiv.org/abs/2305.10391) with [Kimon Fountoulakis](https://opallab.ca/) and [Aukosh Jagannath](https://aukosh.github.io/), we ask: what does the *optimal* node classifier look like in this regime, and is there an architecture that realizes it? The answer turns out to be cleaner than expected, with some surprising consequences for how to design GNNs in practice. This post sketches the main results.

## The model

We work with the **contextual stochastic block model** (CSBM), a latent-class model with both graph and feature signal. Each of the $n$ nodes is assigned one of $C$ classes; conditional on class assignments, edges are placed independently with class-pair probabilities $q_{ij} = b_{ij}/n$, and node features are drawn i.i.d. from class-conditional distributions $P_1, \ldots, P_C$. Two SNR-like parameters drive everything:

- **Feature SNR** $\gamma$: how separable the class-conditional feature distributions are. For symmetric Gaussians $\mathcal{N}(\pm\boldsymbol{\mu}, \sigma^2 I)$, $\gamma = \lVert\boldsymbol{\mu}\rVert_2 / \sigma$.
- **Graph SNR** $\Gamma$: how informative the graph is. For two balanced classes with intra-class edge probability $a/n$ and inter-class $b/n$, $\Gamma = (a-b)/(a+b)$.

The $1/n$ scaling makes node degrees Poisson with constant mean, which is exactly what makes the regime sparse. The full setup, with the multi-class generalization, is in Section 2 of the paper.

## What "optimal" means

The Bayes-optimal classifier, which minimizes 0-1 risk given the entire graph and all features, is intractable to write down: it depends on every edge and every feature vector. So we ask a slightly weaker question.

Fix a node $v$. In the sparse regime, $v$'s $\ell$-hop neighborhood is, with high probability, a tree (a classical fact about locally tree-like sparse random graphs). Define an **$\ell$-locally Bayes optimal** classifier as one that minimizes 0-1 risk among all classifiers depending only on the $\ell$-hop neighborhood of $v$. Then ask: as $\ell$ and $n$ grow, is there a clean form for the limit?

Yes, and it's a message-passing architecture.

## The optimal architecture (Theorem 1)

<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" style="color: var(--foreground); width: 100%; height: auto; max-width: 720px; display: block; margin: 1.5rem auto;" role="img" aria-label="Each neighbor of v sends a message; messages aggregate into per-class scores; argmax over scores yields v's predicted class.">
  <defs>
    <marker id="omp-arr-A" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/></marker>
    <marker id="omp-arr-B" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/></marker>
    <marker id="omp-arr-fade" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker>
  </defs>
  <g stroke="currentColor" stroke-opacity="0.3" fill="none">
    <line x1="240" y1="220" x2="330" y2="191" stroke-width="1.2"/>
    <line x1="240" y1="220" x2="240" y2="125" stroke-width="1.2"/>
    <line x1="240" y1="220" x2="150" y2="191" stroke-width="1.2"/>
    <line x1="240" y1="220" x2="184" y2="297" stroke-width="1.2"/>
    <line x1="240" y1="220" x2="296" y2="297" stroke-width="1.2"/>
    <line x1="330" y1="191" x2="389" y2="199" stroke-width="1"/>
    <line x1="240" y1="125" x2="214" y2="72" stroke-width="1"/>
    <line x1="150" y1="191" x2="91" y2="199" stroke-width="1"/>
    <line x1="184" y1="297" x2="132" y2="324" stroke-width="1"/>
    <line x1="296" y1="297" x2="348" y2="324" stroke-width="1"/>
  </g>
  <g fill="none">
    <line x1="319" y1="195" x2="261" y2="213" stroke="#2563eb" stroke-width="1.5" opacity="0.85" stroke-dasharray="4 3" marker-end="url(#omp-arr-A)"/>
    <line x1="240" y1="137" x2="240" y2="198" stroke="#d97706" stroke-width="1.5" opacity="0.85" stroke-dasharray="4 3" marker-end="url(#omp-arr-B)"/>
    <line x1="161" y1="195" x2="219" y2="213" stroke="#2563eb" stroke-width="1.5" opacity="0.85" stroke-dasharray="4 3" marker-end="url(#omp-arr-A)"/>
    <line x1="191" y1="287" x2="227" y2="238" stroke="#d97706" stroke-width="1.5" opacity="0.85" stroke-dasharray="4 3" marker-end="url(#omp-arr-B)"/>
    <line x1="289" y1="287" x2="253" y2="238" stroke="#2563eb" stroke-width="1.5" opacity="0.85" stroke-dasharray="4 3" marker-end="url(#omp-arr-A)"/>
  </g>
  <g fill="none">
    <line x1="381" y1="200" x2="262" y2="217" stroke="#2563eb" stroke-width="1.0" opacity="0.5" stroke-dasharray="3 2" marker-end="url(#omp-arr-A)"/>
    <line x1="215" y1="80" x2="236" y2="198" stroke="#2563eb" stroke-width="1.0" opacity="0.5" stroke-dasharray="3 2" marker-end="url(#omp-arr-A)"/>
    <line x1="99" y1="200" x2="218" y2="217" stroke="#d97706" stroke-width="1.0" opacity="0.5" stroke-dasharray="3 2" marker-end="url(#omp-arr-B)"/>
    <line x1="138" y1="318" x2="224" y2="235" stroke="#2563eb" stroke-width="1.0" opacity="0.5" stroke-dasharray="3 2" marker-end="url(#omp-arr-A)"/>
    <line x1="342" y1="318" x2="256" y2="235" stroke="#2563eb" stroke-width="1.0" opacity="0.5" stroke-dasharray="3 2" marker-end="url(#omp-arr-A)"/>
  </g>
  <circle cx="389" cy="199" r="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="214" cy="72" r="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="91" cy="199" r="8" fill="#fcd34d" stroke="#d97706" stroke-width="1.5"/>
  <circle cx="132" cy="324" r="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="348" cy="324" r="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="330" cy="191" r="12" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="240" cy="125" r="12" fill="#fcd34d" stroke="#d97706" stroke-width="1.5"/>
  <circle cx="150" cy="191" r="12" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="184" cy="297" r="12" fill="#fcd34d" stroke="#d97706" stroke-width="1.5"/>
  <circle cx="296" cy="297" r="12" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
  <circle cx="240" cy="220" r="16" fill="currentColor"/>
  <text x="240" y="225" text-anchor="middle" font-size="15" font-style="italic" font-weight="700" fill="var(--background)" font-family="ui-serif, Georgia, serif">v</text>
  <text x="262" y="180" font-size="12" font-style="italic" fill="#2563eb" font-family="ui-serif, Georgia, serif">m⁽¹⁾(Xᵤ)</text>
  <text x="245" y="78" font-size="12" font-style="italic" fill="#2563eb" font-family="ui-serif, Georgia, serif">m⁽²⁾(Xᵤ)</text>
  <text x="240" y="380" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">distance-k messages decay as Γᵏ</text>
  <path d="M 258 218 C 330 218, 410 110, 505 95" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.4" fill="none" stroke-dasharray="2 4" marker-end="url(#omp-arr-fade)"/>
  <text x="380" y="172" font-size="11" font-style="italic" fill="currentColor">aggregate</text>
  <text x="605" y="50" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">score per class</text>
  <rect x="525" y="76" width="170" height="14" fill="currentColor" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.6" rx="2"/>
  <rect x="525" y="106" width="170" height="14" fill="currentColor" stroke="currentColor" stroke-opacity="0.2" stroke-width="0.6" rx="2"/>
  <text x="518" y="88" text-anchor="end" font-size="13" font-weight="700" fill="#2563eb" font-family="ui-serif, Georgia, serif">A</text>
  <rect x="525" y="76" width="156" height="14" fill="#93c5fd" stroke="#2563eb" stroke-width="1" rx="2"/>
  <text x="518" y="118" text-anchor="end" font-size="13" font-weight="700" fill="#d97706" font-family="ui-serif, Georgia, serif">B</text>
  <rect x="525" y="106" width="82" height="14" fill="#fcd34d" stroke="#d97706" stroke-width="1" rx="2"/>
  <text x="603" y="148" text-anchor="middle" font-size="11" font-style="italic" fill="currentColor">argmax</text>
  <line x1="603" y1="153" x2="603" y2="180" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4" marker-end="url(#omp-arr-fade)"/>
  <rect x="528" y="195" width="150" height="44" fill="#93c5fd" fill-opacity="0.18" stroke="#2563eb" stroke-width="1.5" rx="6"/>
  <text x="603" y="224" text-anchor="middle" font-size="20" font-style="italic" font-family="ui-serif, Georgia, serif" fill="currentColor">ŷ(v) = <tspan font-weight="700" font-style="normal" fill="#2563eb">A</tspan></text>
  <g transform="translate(540, 290)">
    <rect x="-10" y="-15" width="148" height="55" fill="none" stroke="currentColor" stroke-opacity="0.2" rx="4"/>
    <circle cx="5" cy="0" r="6" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
    <text x="20" y="4" font-size="11" fill="currentColor">class A</text>
    <circle cx="5" cy="22" r="6" fill="#fcd34d" stroke="#d97706" stroke-width="1.5"/>
    <text x="20" y="26" font-size="11" fill="currentColor">class B</text>
  </g>
</svg>

*Every neighbor $u$ at distance $k$ from $v$ contributes a per-distance, per-class log-likelihood message $m^{(k)}_c(\mathbf{X}_u)$. Far-away neighbors carry exponentially less weight ($\Gamma^k$ decay, shown as smaller, dimmer arrows). All messages aggregate into a score for each class; the prediction is the argmax.*

The asymptotic $\ell$-locally Bayes optimal predictor at node $v$ is a maximum-a-posteriori classifier over its tree-like neighborhood, schematically:

$$
\hat{y}(v) \;=\; \arg\max_{c}\; \sum_{k=0}^{\ell} \sum_{u \in \mathcal{N}_k(v)} m^{(k)}_{c}\!\left(\mathbf{X}_u\right)
$$

where $\mathcal{N}_k(v)$ is the set of nodes at exactly distance $k$ from $v$. The message itself has a clean Bayesian shape. For a neighbor $u$, define the **feature likelihood vector**

$$
\rho(\mathbf{X}_u) \;=\; \big(P_1(\mathbf{X}_u),\ P_2(\mathbf{X}_u),\ \ldots,\ P_C(\mathbf{X}_u)\big),
$$

whose $j$-th entry is the density of $u$'s features under the hypothesis that $u$ is class $j$. This is what the feature *alone* says about $u$'s class. Define the **class-coupling vector** $Q^{(k)}_c \in \mathbb{R}^C$, whose $j$-th entry is the probability that a class-$c$ node has a $k$-step neighbor of class $j$ in the CSBM (computed from the edge probabilities $b_{ij}$ via a $k$-step random-walk transition). This is what the *graph alone* says about $u$'s class, conditional on $v$ being class $c$. The message is the log of their inner product,

$$
m^{(k)}_c(\mathbf{X}_u) \;=\; \log \big\langle \rho(\mathbf{X}_u),\ Q^{(k)}_c \big\rangle \;=\; \log \sum_{j=1}^{C} P_j(\mathbf{X}_u)\, \big[Q^{(k)}_c\big]_j.
$$

The dot product is exactly Bayesian marginalization over $u$'s unknown class. We don't know which class $u$ belongs to, so we sum over all $C$ possibilities, weighting each by *(i)* the feature evidence that $u$ is class $j$ (that's $\rho$), and *(ii)* the structural evidence that $v$ being class $c$ would put a class-$j$ node exactly $k$ steps away (that's $Q^{(k)}_c$). The result is the likelihood of $u$'s features under the hypothesis "$v$ is class $c$", with $u$'s own class integrated out. The logarithm then turns the product over independent neighbors (which is what the tree-like factorization gives in the limit) into the additive sum over neighbors that we see in the argmax expression. The full expression, including the multi-class generalization and the precise form of $Q^{(k)}$, is in Section 3.

Three things matter about the *shape* of this result:

1. **It is message passing.** Neighbors at different distances contribute additively, with their own per-distance parameters.
2. **The class-coupling matrix is learnable.** We don't assume access to the $b_{ij}$'s. In the architecture, we parameterize the coupling tensor via $\mathrm{sigmoid}(Z)$ for a learnable $Z$ and let it fit. A single architecture covers the whole spectrum from "graph is useless" to "graph is everything".
3. **Distance-$k$ contributions decay as $\Gamma^k$.** Far neighbors carry exponentially less information than near ones, a sharp justification for *shallow* GNNs in the sparse regime.

Theorem 1 gives an explicit message-passing architecture and proves it asymptotically realizes this optimum.

## Closed-form generalization error (Theorem 2)

For the symmetric two-class Gaussian case, we compute the asymptotic generalization error in closed form, in terms of $(\gamma, \Gamma)$. On the Galton–Watson tree that the CSBM neighborhood converges to (a random tree in which each node draws its number of children independently from a fixed distribution), the distribution of the optimal message can be characterized by a fixed-point recursion on the branching process. This collapses what would otherwise be pages of integrals into a tractable distributional equation. The full statement (and the multi-class extension) is in Section 4.

## The MLP–GCN interpolation (Theorem 3)

This is the cleanest consequence and, I think, the most useful one in practice.

- When $\Gamma = 0$, the graph carries no class information. The optimal classifier reduces to one that ignores the graph entirely, becoming a feature-only **MLP**. Adding any graph aggregation strictly hurts.
- When $\Gamma \to 1$, the graph is essentially a perfect community indicator and the optimal classifier matches a standard **graph convolution**.
- The threshold at which graph information starts being usable coincides with the **[Kesten–Stigum threshold](https://en.wikipedia.org/wiki/Stochastic_block_model#Detectability)**, the well-known information-theoretic threshold for weak community detection on the SBM.

<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" style="color: var(--foreground); width: 100%; height: auto; max-width: 720px; display: block; margin: 1.5rem auto;" role="img" aria-label="Accuracy versus graph signal Gamma. The Bayes-optimal classifier coincides with MLP at Gamma=0, coincides with GCN at large Gamma, and dominates both in between.">
  <rect x="80" y="60" width="580" height="260" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>
  <g stroke="currentColor" stroke-opacity="0.1" stroke-width="0.5" stroke-dasharray="2 3">
    <line x1="80" y1="268" x2="660" y2="268"/>
    <line x1="80" y1="216" x2="660" y2="216"/>
    <line x1="80" y1="164" x2="660" y2="164"/>
    <line x1="80" y1="112" x2="660" y2="112"/>
    <line x1="80" y1="60" x2="660" y2="60"/>
    <line x1="177" y1="60" x2="177" y2="320"/>
    <line x1="273" y1="60" x2="273" y2="320"/>
    <line x1="370" y1="60" x2="370" y2="320"/>
    <line x1="467" y1="60" x2="467" y2="320"/>
    <line x1="563" y1="60" x2="563" y2="320"/>
  </g>
  <g font-size="11" fill="currentColor">
    <text x="74" y="324" text-anchor="end">0.5</text>
    <text x="74" y="272" text-anchor="end">0.6</text>
    <text x="74" y="220" text-anchor="end">0.7</text>
    <text x="74" y="168" text-anchor="end">0.8</text>
    <text x="74" y="116" text-anchor="end">0.9</text>
    <text x="74" y="64" text-anchor="end">1.0</text>
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="80" y="338">0.0</text>
    <text x="177" y="338">0.1</text>
    <text x="273" y="338">0.2</text>
    <text x="370" y="338">0.3</text>
    <text x="467" y="338">0.4</text>
    <text x="563" y="338">0.5</text>
    <text x="660" y="338">0.6</text>
  </g>
  <text x="370" y="368" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Graph signal Γ</text>
  <text x="22" y="190" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor" transform="rotate(-90 22 190)">Accuracy</text>
  <polyline fill="none" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="80,144 177,144 273,144 370,144 467,144 563,144 660,144"/>
  <polyline fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="80,294 177,257 273,205 370,148 467,101 563,80 660,65"/>
  <polyline fill="none" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" points="80,144 177,134 273,124 370,108 467,92 563,78 660,65"/>
  <g fill="#f97316">
    <circle cx="80" cy="144" r="3"/>
    <circle cx="177" cy="144" r="3"/>
    <circle cx="273" cy="144" r="3"/>
    <circle cx="370" cy="144" r="3"/>
    <circle cx="467" cy="144" r="3"/>
    <circle cx="563" cy="144" r="3"/>
    <circle cx="660" cy="144" r="3"/>
  </g>
  <g fill="#16a34a">
    <circle cx="80" cy="294" r="3"/>
    <circle cx="177" cy="257" r="3"/>
    <circle cx="273" cy="205" r="3"/>
    <circle cx="370" cy="148" r="3"/>
    <circle cx="467" cy="101" r="3"/>
    <circle cx="563" cy="80" r="3"/>
    <circle cx="660" cy="65" r="3"/>
  </g>
  <g fill="#2563eb">
    <circle cx="80" cy="144" r="3.5"/>
    <circle cx="177" cy="134" r="3.5"/>
    <circle cx="273" cy="124" r="3.5"/>
    <circle cx="370" cy="108" r="3.5"/>
    <circle cx="467" cy="92" r="3.5"/>
    <circle cx="563" cy="78" r="3.5"/>
    <circle cx="660" cy="65" r="3.5"/>
  </g>
  <line x1="92" y1="152" x2="118" y2="190" stroke="#2563eb" stroke-opacity="0.55" stroke-width="0.8" stroke-dasharray="2 3"/>
  <text x="122" y="194" font-size="11" font-style="italic" fill="#2563eb" fill-opacity="0.9">at Γ=0: optimal ≈ MLP</text>
  <line x1="640" y1="65" x2="600" y2="40" stroke="#2563eb" stroke-opacity="0.55" stroke-width="0.8" stroke-dasharray="2 3"/>
  <text x="595" y="34" text-anchor="end" font-size="11" font-style="italic" fill="#2563eb" fill-opacity="0.9">at large Γ: optimal ≈ GCN</text>
  <g transform="translate(450, 215)">
    <rect x="-10" y="-16" width="180" height="80" fill="var(--background)" fill-opacity="0.9" stroke="currentColor" stroke-opacity="0.25" rx="4"/>
    <line x1="0" y1="0" x2="22" y2="0" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="11" cy="0" r="3.5" fill="#2563eb"/>
    <text x="30" y="4" font-size="12" fill="currentColor">Bayes optimal</text>
    <line x1="0" y1="22" x2="22" y2="22" stroke="#f97316" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="11" cy="22" r="3" fill="#f97316"/>
    <text x="30" y="26" font-size="12" fill="currentColor">MLP</text>
    <line x1="0" y1="44" x2="22" y2="44" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="11" cy="44" r="3" fill="#16a34a"/>
    <text x="30" y="48" font-size="12" fill="currentColor">GCN</text>
  </g>
</svg>

Varying the graph signal $\Gamma$ at fixed feature signal $\gamma$: the Bayes-optimal architecture,
- coincides with the **MLP** at $\Gamma = 0$ (the graph carries no information),
- coincides with the **GCN** at large $\Gamma$ (the graph is essentially a perfect community indicator), and
- dominates both in between. See Figure 1 in the paper for the actual experiments, including the corresponding $\gamma$-sweep at fixed $\Gamma$.

In other words: graph features become useful for node classification *exactly* when weak community recovery becomes possible. Below the threshold, no architecture that uses the graph can asymptotically beat one that doesn't. The CSBM analysis sharpens this from "intuitively reasonable" to a theorem. Section 5 has the precise statement and the boundary cases.

## From $n = \infty$ to large finite $n$ (Theorem 4)

Asymptotic statements are clean, but the operational question is "does this predict anything for the $n$ I actually have?" Theorem 4 says: yes. For graphs of size $n$, the $\ell$-hop neighborhoods of a $1 - o(1)$ fraction of nodes are tree-like for $\ell$ up to roughly $\log n / \log d$, where $d$ is the average degree. So the asymptotic architecture is approximately optimal at large finite $n$, with the receptive-field budget growing logarithmically. Another reason shallow networks are not just convenient on sparse graphs; they're *enough*.

## Empirically

On synthetic CSBM graphs with $n = 10{,}000$ and $d = 4$, the architecture predicted by the theory smoothly interpolates between a feature-only MLP and a vanilla GCN as $\Gamma$ varies, and outperforms both at intermediate $\Gamma$. At $\Gamma = 0$ it matches the MLP; at $\Gamma = 1$ it matches the GCN. Exactly what Theorem 3 predicts. Plots in Section 6.

## Implications for GNN design

Four follow from the analysis:

1. **Shallow is usually right on sparse graphs.** Distance-$k$ messages decay as $\Gamma^k$. Two or three hops is most of the available information.
2. **Decouple depth from receptive field.** The theory wants the architecture's *number of trainable layers* and *number of hops aggregated* to be independent knobs, not the same knob the way they are in vanilla GCNs. Stacking layers should not be the only way to see further.
3. **Learn the class-coupling matrix; don't assume it.** A learnable coupling lets one architecture cover the full MLP↔GCN spectrum without per-dataset hand-tuning.
4. **Below Kesten–Stigum, ignore the graph.** Not philosophically, but *literally*. Any classifier that lets the graph influence its prediction has higher asymptotic error than one that doesn't, when $\Gamma$ is below threshold.

The full paper has the proofs, the formal asymptotic statements, the multi-class and general-feature versions, and the longer experimental section. The setup, theorems, and discussion are organized as: model in Section 2, optimal architecture in Section 3, generalization error in Section 4, MLP–GCN interpolation and threshold in Section 5, experiments in Section 6.

## References

- Baranwal, Fountoulakis, Jagannath. *Optimality of Message-Passing Architectures for Sparse Graphs*. NeurIPS 2023. [arXiv:2305.10391](https://arxiv.org/abs/2305.10391)
- Deshpande, Sen, Montanari, Mossel. *Contextual Stochastic Block Models*. NeurIPS 2018.
- Decelle, Krzakala, Moore, Zdeborová. *Asymptotic analysis of the stochastic block model for modular networks and its algorithmic applications*. Physical Review E, 2011.
- Mossel, Neeman, Sly. *A proof of the block model threshold conjecture*. Combinatorica, 2018.
- Kesten, Stigum. *Additional limit theorems for indecomposable multidimensional Galton–Watson processes*. Annals of Mathematical Statistics, 1966.
