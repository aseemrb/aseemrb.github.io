---
author: Aseem Raj Baranwal
pubDatetime: 2023-02-07T15:22:00Z
title: Effects of graph convolutions in multi-layer networks
slug: effects-of-graph-convolutions-in-multi-layer-networks
featured: false
draft: false
tags:
  - machine learning
  - computer science
description:
  A walkthrough of our ICLR 2023 paper on how graph convolutions provably lower the feature-signal threshold for node classification in contextual stochastic block models, and why two convolutions help much more than one.
---

A natural question for graph neural networks: when you add a "graph convolution" layer that aggregates features from neighbors, does it actually help, and by how much? In the right theoretical setting, the answer is sharp.

In our [ICLR 2023 paper](https://arxiv.org/abs/2204.09297) with [Kimon Fountoulakis](https://opallab.ca/) and [Aukosh Jagannath](https://aukosh.github.io/), we study this for multi-layer networks classifying nodes in a [contextual stochastic block model](https://arxiv.org/abs/1807.09596) whose features are *non-linearly* separable, so a hidden layer is genuinely needed and a hyperplane cannot work. The main result: each graph convolution provably lowers the feature-signal threshold for successful classification, by a quantitative factor that depends on the graph density. Two convolutions help dramatically more than one. The placement of the convolution layers within the network does not matter asymptotically.

## The setup

The data model has three pieces:

1. **Two balanced classes**, $y \in \{+1, -1\}$, latent.
2. **Non-linearly separable Gaussian features** conditional on class. Concretely, features within a class are drawn from a 2-component Gaussian mixture, with components placed so that no hyperplane separates the classes (an XOR-style arrangement). This makes the problem genuinely require a multi-layer network.
3. **A stochastic block model** on top, with intra-class edge probability $p$ and inter-class edge probability $q$, and $p > q$ (so neighbors are more likely to share class).

We call the parameter controlling the within-class mixture separation the **feature signal** $\gamma$ (large $\gamma$: well separated, classification is easy; small $\gamma$: overlapping, classification is hard). The expected node degree $\mathbb{E}[\deg]$ grows with $n$, so we are in the *dense* regime, in contrast to our later sparse-regime work.

## What "the architecture works" means

We say a network architecture *succeeds* on this distribution if it classifies a uniform random node correctly with probability $\to 1$ as $n \to \infty$. The **classification threshold** is the smallest feature signal $\gamma$ for which the architecture succeeds. Smaller threshold means a more capable architecture: it tolerates noisier features.

## Three architectures, three thresholds

We compare three architectures, each a multi-layer ReLU network:

- **MLP**: no graph convolutions. Just a feed-forward net on the raw features.
- **MLP + 1 conv**: one graph-convolution layer interleaved into the network.
- **MLP + 2 convs**: two graph-convolution layers interleaved.

Letting $\gamma^{\star}_{\mathrm{MLP}}$ denote the classification threshold for the bare MLP, the main results (formal versions in the paper) read:

$$
\gamma^{\star}_{\mathrm{1\text{-}conv}} \;\;\lesssim\;\; \frac{\gamma^{\star}_{\mathrm{MLP}}}{(\mathbb{E}[\deg])^{1/4}}, \qquad
\gamma^{\star}_{\mathrm{2\text{-}conv}} \;\;\lesssim\;\; \frac{\gamma^{\star}_{\mathrm{MLP}}}{n^{1/4}}.
$$

In words:

- **One graph convolution** lowers the feature-signal threshold by a factor of $(\mathbb{E}[\deg])^{1/4}$. If the graph has, say, average degree $10^4$, you can tolerate a feature signal $\sqrt[4]{10^4} = 10$ times weaker before the network fails.
- **Two graph convolutions** (under a slightly stronger density assumption) lower the threshold by a factor of $n^{1/4}$, which is a much bigger reduction. For $n = 10^6$, that is a factor of about $32$.

So two convolutions are *much* better than one in the dense regime. (Past two, [oversmoothing](https://arxiv.org/abs/2303.10993) is a well-known issue, so we do not recommend stacking further unless you have a specific reason.)

<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" style="color: var(--foreground); width: 100%; height: auto; max-width: 720px; display: block; margin: 1.5rem auto;" role="img" aria-label="Classification thresholds for MLP, MLP plus one convolution, and MLP plus two convolutions. Adding convolutions shifts the threshold left, by factor (E[deg])^(-1/4) for one conv and n^(-1/4) for two.">
  <text x="660" y="32" text-anchor="end" font-size="11" font-style="italic" fill="currentColor">larger feature signal γ →</text>
  <text x="195" y="74" text-anchor="end" font-size="13" font-weight="600" fill="currentColor">MLP</text>
  <rect x="220" y="58" width="340" height="22" fill="currentColor" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>
  <text x="390" y="74" text-anchor="middle" font-size="11" fill="currentColor">fails</text>
  <rect x="560" y="58" width="120" height="22" fill="#bbf7d0" fill-opacity="0.55" stroke="#16a34a" stroke-width="1"/>
  <text x="620" y="74" text-anchor="middle" font-size="11" fill="#16a34a">succeeds</text>
  <line x1="560" y1="50" x2="560" y2="88" stroke="#ef4444" stroke-width="2"/>
  <text x="560" y="44" text-anchor="middle" font-size="11" font-style="italic" fill="#ef4444" font-family="ui-serif, Georgia, serif">γ★ (MLP)</text>
  <text x="195" y="148" text-anchor="end" font-size="13" font-weight="600" fill="currentColor">+ 1 graph conv</text>
  <rect x="220" y="132" width="180" height="22" fill="currentColor" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>
  <text x="310" y="148" text-anchor="middle" font-size="11" fill="currentColor">fails</text>
  <rect x="400" y="132" width="280" height="22" fill="#bbf7d0" fill-opacity="0.55" stroke="#16a34a" stroke-width="1"/>
  <text x="540" y="148" text-anchor="middle" font-size="11" fill="#16a34a">succeeds</text>
  <line x1="400" y1="124" x2="400" y2="162" stroke="#ef4444" stroke-width="2"/>
  <text x="400" y="118" text-anchor="middle" font-size="11" font-style="italic" fill="#ef4444" font-family="ui-serif, Georgia, serif">÷ (𝔼[deg])¹⁄⁴</text>
  <text x="195" y="222" text-anchor="end" font-size="13" font-weight="600" fill="currentColor">+ 2 graph convs</text>
  <rect x="220" y="206" width="20" height="22" fill="currentColor" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.7"/>
  <rect x="240" y="206" width="440" height="22" fill="#bbf7d0" fill-opacity="0.55" stroke="#16a34a" stroke-width="1"/>
  <text x="460" y="222" text-anchor="middle" font-size="11" fill="#16a34a">succeeds</text>
  <line x1="240" y1="198" x2="240" y2="236" stroke="#ef4444" stroke-width="2"/>
  <text x="240" y="192" text-anchor="middle" font-size="11" font-style="italic" fill="#ef4444" font-family="ui-serif, Georgia, serif">÷ n¹⁄⁴</text>
  <line x1="220" y1="270" x2="680" y2="270" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8"/>
  <path d="M 678 266 L 684 270 L 678 274" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.8" fill="none"/>
  <text x="450" y="290" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor">feature signal γ</text>
</svg>

*Each graph convolution shifts the classification threshold left along the $\gamma$ axis: one convolution by a factor of $(\mathbb{E}[\deg])^{1/4}$, two convolutions by a much bigger factor of $n^{1/4}$. The wider the green "succeeds" region for an architecture, the noisier the features it can still classify.*

## Placement does not matter

In an $L$-layer network you have $L$ slots for placing graph convolutions. Should they go at the input? In the middle? Right before the output? The paper shows that asymptotically the threshold result above holds for *any* placement of the convolutions among the layers. The conclusion: stop agonizing over conv placement; pick whatever is convenient (e.g., conv-then-MLP, or interleaved) and the asymptotic capability is unchanged.

## Empirically

Synthetic CSBM experiments confirm the threshold predictions. As the feature signal $\gamma$ is lowered, the MLP loses accuracy first, then MLP + 1 conv, then MLP + 2 convs, at the predicted scaling factors. Real-data experiments on standard node-classification benchmarks show that the placement-invariance and the 2-conv-beats-1-conv conclusions hold qualitatively. Plots and dataset details are in Section 5 of the paper.

## Takeaways

1. **Graph convolutions provably lower the feature-signal requirement** for classification, by a quantifiable factor: $(\mathbb{E}[\deg])^{1/4}$ per single convolution, $n^{1/4}$ for two.
2. **Two convolutions are dramatically better than one** in the dense regime. Beyond two, watch out for oversmoothing.
3. **Placement is asymptotically a wash.** Don't agonize over which layer the convolution goes into.

The full statements (with constants), the precise form of the non-linear feature mixture, and the experimental details are in the [paper](https://arxiv.org/abs/2204.09297).

## References

- Baranwal, Fountoulakis, Jagannath. *Effects of Graph Convolutions in Multi-layer Networks*. ICLR 2023 (Notable Top 25%). [arXiv:2204.09297](https://arxiv.org/abs/2204.09297)
- Baranwal, Fountoulakis, Jagannath. *Graph Convolution for Semi-Supervised Classification: Improved Linear Separability and Out-of-Distribution Generalization*. ICML 2021. (Linear-feature precursor to this work.)
- Deshpande, Sen, Montanari, Mossel. *Contextual Stochastic Block Models*. NeurIPS 2018.
