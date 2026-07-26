---
author: Aseem Raj Baranwal
pubDatetime: 2026-07-25T09:40:00Z
title: Johnson–Lindenstrauss lemma
slug: johnson-lindenstrauss-lemma
featured: false
draft: false
tags:
  - computer science
  - machine learning
  - mathematics
description:
  "Any n points embed linearly into about ε⁻² log n dimensions with all pairwise distances preserved within 1 ± ε, whatever the source dimension: a chi-square tail bound plus a union bound."
---

Take $n$ points in a Euclidean space of any dimension $D$, and fix a tolerance $\varepsilon \in (0, 1)$. The **Johnson–Lindenstrauss lemma** says there is a linear map into dimension

$$
k \;=\; O\!\left(\frac{\log n}{\varepsilon^2}\right)
$$

that changes every pairwise distance by a factor of at most $1 \pm \varepsilon$. Two features deserve a double take. The target dimension $k$ does not involve the source dimension $D$ at all: a million points in $D = 10^9$ compress exactly as well as a million points in $D = 10^3$. And the dependence on $n$ is only logarithmic: squaring the number of points merely doubles $k$.

Better still, the map is oblivious: it is a random projection drawn without looking at the data, and it works for any point set with high probability. This is a different contract from PCA, which studies the data first and preserves global variance directions with no guarantee for any individual pair; the lemma guarantees every pair, and never reads the data. The proof below is the elementary one of [Dasgupta and Gupta](https://doi.org/10.1002/rsa.10073), and it is two moves long: a tail bound for a single vector, then a union bound.

## The statement

Let $A$ be a random $k \times D$ matrix with independent $\mathcal{N}(0, 1/k)$ entries. For $n$ points $x_1, \ldots, x_n \in \mathbb{R}^D$ and

$$
k \;\ge\; \frac{4 \ln n}{\varepsilon^2/2 - \varepsilon^3/3},
$$

with positive probability the map $f(x) = Ax$ satisfies, for every pair $i, j$,

$$
(1 - \varepsilon)\, \|x_i - x_j\|^2 \;\le\; \|f(x_i) - f(x_j)\|^2 \;\le\; (1 + \varepsilon)\, \|x_i - x_j\|^2 .
$$

## One vector at a time

The map is linear, so $f(x_i) - f(x_j) = A(x_i - x_j)$: the lemma's requirement is exactly that $A$ preserve the squared norms of the $\binom{n}{2}$ vectors $x_i - x_j$ up to the factor $1 \pm \varepsilon$. Rescaling changes nothing, since $A(cv) = c\,Av$ multiplies $\|Av\|^2$ and $\|v\|^2$ by the same $c^2$, so each of these vectors may be divided by its length. Everything then rests on a single claim: for one fixed unit vector $u \in \mathbb{R}^D$, the squared image $\|Au\|^2$ lies within $\varepsilon$ of 1 with high probability.

Each coordinate of $Au$ is a Gaussian linear combination, $(Au)_i = \sum_j A_{ij} u_j \sim \mathcal{N}(0, 1/k)$, and the $k$ coordinates are independent since they come from disjoint rows. This is the **2-stability** of the Gaussian: projecting any unit vector, in any dimension, produces the same distribution, which is the source of the lemma's indifference to $D$. Consequently

$$
k\,\|Au\|^2 \;\sim\; \chi^2_k,
$$

a [chi-square](https://en.wikipedia.org/wiki/Chi-squared_distribution) with $k$ degrees of freedom: mean $k$, so $\mathbb{E}\|Au\|^2 = 1$, exactly the right scale. What remains is concentration, and the chi-square is generous with its moment generating function: $\mathbb{E}\,e^{tZ} = (1 - 2t)^{-k/2}$ for $Z \sim \chi^2_k$, $t < 1/2$. The Chernoff recipe, exponentiate, apply Markov, optimize $t$, runs in closed form. For the upper tail, $t = \tfrac{\varepsilon}{2(1+\varepsilon)}$ gives

$$
\mathbb{P}\bigl(Z \ge (1+\varepsilon)k\bigr) \;\le\; \bigl[(1+\varepsilon)\,e^{-\varepsilon}\bigr]^{k/2},
$$

and symmetrically $\mathbb{P}(Z \le (1-\varepsilon)k) \le [(1-\varepsilon)\,e^{\varepsilon}]^{k/2}$. The elementary inequalities $\ln(1+\varepsilon) \le \varepsilon - \varepsilon^2/2 + \varepsilon^3/3$ and $\ln(1-\varepsilon) \le -\varepsilon - \varepsilon^2/2$ turn both brackets into a single clean exponential:

$$
\mathbb{P}\Bigl( \bigl|\, \|Au\|^2 - 1 \,\bigr| > \varepsilon \Bigr)
\;\le\; 2 \exp\!\left( -\frac{k}{2} \left( \frac{\varepsilon^2}{2} - \frac{\varepsilon^3}{3} \right) \right).
$$

One unit vector survives projection except with exponentially small probability in $k$.

## The union bound and the constant

A union bound turns the single-vector tail into a statement about all pairs. There are $\binom{n}{2} \le n^2/2$ vectors $x_i - x_j$ to preserve, so the probability that *any* pair is distorted beyond $1 \pm \varepsilon$ is at most

$$
n^2 \exp\!\left( -\frac{k}{2} \left( \frac{\varepsilon^2}{2} - \frac{\varepsilon^3}{3} \right) \right),
$$

which drops below 1 exactly when $k > 4\ln n \,/\, (\varepsilon^2/2 - \varepsilon^3/3)$, and below $n^{-2\gamma}$ when $k$ carries the extra factor $(1+\gamma)$. That is the whole proof, and it exposes the anatomy of the constant: the per-pair failure probability must be pushed below $1/n^2$, an exponential tail converts that demand into $2 \ln n$ in the exponent, and the $\varepsilon^2$ in the tail is the curvature of the chi-square around its mean. The $\log n$ in the lemma is not geometry; it is the price of a union bound, paid in dimensions.

## The numbers

The bound is explicit, so it can be evaluated at concrete values of $n$ and $\varepsilon$:

<div class="jl1-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>points n = <strong id="jl1-nval" style="display: inline-block; min-width: 3.2em;">10⁶</strong></span><input id="jl1-n" type="range" min="2" max="12" step="1" value="6" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.75rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.6rem; font-size: 0.95em;"><span>tolerance ε = <strong id="jl1-eval" style="display: inline-block; min-width: 2.8em;">0.10</strong></span><input id="jl1-e" type="range" min="0.05" max="0.50" step="0.01" value="0.10" style="flex: 1; min-width: 140px; accent-color: #2563eb;"></div><div style="display: flex; gap: 0.5rem 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.95em;"><span>target dimension k = <strong id="jl1-kval" style="display: inline-block; min-width: 4.6em;">11,842</strong></span></div><svg id="jl1-svg" viewBox="0 0 640 340" style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto; overflow: hidden;" aria-label="Target dimension of the Johnson-Lindenstrauss bound as a function of the tolerance, on a logarithmic scale, with a marker at the selected tolerance."></svg></div>
<script>
(function () {
  var nSlider = document.getElementById('jl1-n');
  if (!nSlider) return;
  var eSlider = document.getElementById('jl1-e');
  var nDisp = document.getElementById('jl1-nval');
  var eDisp = document.getElementById('jl1-eval');
  var kDisp = document.getElementById('jl1-kval');
  var svg = document.getElementById('jl1-svg');
  var BLUE = '#2563eb', RED = '#dc2626';
  var X0 = 64, X1 = 620, Y0 = 20, Y1 = 272, EMIN = 0.05, EMAX = 0.5;
  var SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  function kOf(e10, eps) {
    return Math.ceil(4 * e10 * Math.LN10 / (eps * eps / 2 - eps * eps * eps / 3));
  }
  function px(eps) { return X0 + (X1 - X0) * (eps - EMIN) / (EMAX - EMIN); }
  function py(k) {
    var lg = Math.max(2, Math.min(6, Math.log(k) / Math.LN10));
    return Y1 - (Y1 - Y0) * (lg - 2) / 4;
  }
  function render() {
    var e10 = parseInt(nSlider.value, 10);
    var eps = parseFloat(eSlider.value);
    var k = kOf(e10, eps);
    var out = '';
    for (var t = 2; t <= 6; t++) {
      out += '<line x1="' + X0 + '" y1="' + py(Math.pow(10, t)).toFixed(1) + '" x2="' + X1 + '" y2="' + py(Math.pow(10, t)).toFixed(1) + '" stroke="currentColor" stroke-opacity="0.15" stroke-width="1"/>';
      out += '<text x="' + (X0 - 8) + '" y="' + (py(Math.pow(10, t)) + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="currentColor">10' + SUP[t] + '</text>';
    }
    for (var e = 0.1; e <= 0.51; e += 0.1) {
      out += '<line x1="' + px(e).toFixed(1) + '" y1="' + Y1 + '" x2="' + px(e).toFixed(1) + '" y2="' + (Y1 + 5) + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1"/>';
      out += '<text x="' + px(e).toFixed(1) + '" y="' + (Y1 + 20) + '" text-anchor="middle" font-size="12" fill="currentColor">' + e.toFixed(1) + '</text>';
    }
    out += '<line x1="' + X0 + '" y1="' + Y1 + '" x2="' + X1 + '" y2="' + Y1 + '" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>';
    var path = '';
    for (var i = 0; i <= 180; i++) {
      var ee = EMIN + (EMAX - EMIN) * i / 180;
      path += (i === 0 ? 'M' : 'L') + px(ee).toFixed(1) + ',' + py(kOf(e10, ee)).toFixed(1) + ' ';
    }
    out += '<path d="' + path + '" fill="none" stroke="' + BLUE + '" stroke-width="2"/>';
    out += '<circle cx="' + px(eps).toFixed(1) + '" cy="' + py(k).toFixed(1) + '" r="6" fill="' + RED + '"/>';
    out += '<text x="' + (X0 + 10) + '" y="' + (Y0 + 6) + '" font-size="12" fill="currentColor">target dimension k (log scale)</text>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="332" text-anchor="middle" font-size="12" fill="currentColor">tolerance ε</text>';
    svg.innerHTML = out;
    nDisp.textContent = '10' + SUP[e10 >= 10 ? Math.floor(e10 / 10) : e10] + (e10 >= 10 ? SUP[e10 % 10] : '');
    eDisp.textContent = eps.toFixed(2);
    kDisp.textContent = k.toLocaleString('en-US');
  }
  nSlider.addEventListener('input', render);
  eSlider.addEventListener('input', render);
  render();
})();
</script>

For $n = 10^6$ points at $\varepsilon = 0.1$ the bound asks for $k \approx 11{,}800$ dimensions, and the $\varepsilon^{-2}$ factor is the term that controls the cost: halving the tolerance quadruples $k$, while relaxing it to $\varepsilon = 0.2$ brings the same million points down to about $3{,}200$. In the other direction, the figures hold whether the points live in a thousand dimensions or a billion, and pushing $n$ from a million to a trillion only doubles them. The bound is also worst-case over all point sets and demands *every* pair simultaneously; practice routinely uses smaller $k$ and measures the distortion it actually gets, which for natural data is usually gentler than the guarantee.

There is a pleasant symmetry with the usual complaints about high dimensions. Concentration of measure is the villain in the story where [nearest-neighbor distances stop being informative](/blog/nearest-neighbor-breaks-in-high-dimensions) and the reason [Gaussian samples crowd onto a thin spherical shell](/blog/high-dimensional-gaussians-on-a-sphere); here the same phenomenon is the entire mechanism, harnessed rather than suffered: the projection works precisely because a chi-square with $k$ degrees of freedom concentrates hard around its mean.

## Variants and the lower bound

The Gaussian matrix is the cleanest to analyze, not the cheapest to use, and a line of work has replaced it while preserving the guarantee. Achlioptas showed entries drawn uniformly from $\pm 1$ work, as does a version with two thirds of the entries zero: no Gaussian sampling, integer arithmetic, the same $k$ up to constants. Ailon and Chazelle's fast transform preconditions with a randomized Hadamard matrix so the projection takes roughly $D \log D$ time instead of $kD$. Kane and Nelson pushed sparsity to a handful of nonzeros per column. On the applications side, the lemma is a workhorse wherever pairwise Euclidean geometry must survive compression: approximate nearest-neighbor search, where it entered algorithm design through Indyk and Motwani; sketching and streaming; and, through the restricted isometry property, the recovery guarantees of compressed sensing, where a JL-style bound applied to all sparse vectors at once plays the starring role.

For thirty years the nagging question was whether the $\varepsilon^{-2} \log n$ was an artifact of the union-bound proof. It is not. Larsen and Nelson proved in 2017 that for every $n$ and $\varepsilon$ there are point sets for which *any* embedding into $k$ dimensions with distortion $1 \pm \varepsilon$, linear or not, requires $k = \Omega(\varepsilon^{-2} \log n)$. The elementary argument above is optimal up to the constant: two moves, and no cleverness left on the table.

## A little history

The lemma was never meant to headline. Johnson and Lindenstrauss proved it in a [1984 paper](https://doi.org/10.1090/conm/026/737400) on a question in [functional analysis](https://en.wikipedia.org/wiki/Functional_analysis), whether [Lipschitz maps](https://en.wikipedia.org/wiki/Lipschitz_continuity) defined on $n$-point subsets of a metric space extend to the whole space into [Hilbert space](https://en.wikipedia.org/wiki/Hilbert_space) with controlled norm growth, and the dimension-reduction statement was a lemma en route, proved there with random orthogonal projections. Frankl and Maehara [tightened the constants in 1988](https://doi.org/10.1016/0095-8956%2888%2990043-3). The result crossed into computer science in the late 1990s, most visibly through Indyk and Motwani's [1998 work](https://doi.org/10.1145/276698.276876) on [approximate nearest neighbors](https://en.wikipedia.org/wiki/Nearest_neighbor_search), and Dasgupta and Gupta's [2003 note](https://doi.org/10.1002/rsa.10073) stripped the proof down to the chi-square computation given above. Larsen and Nelson's [2017 optimality theorem](https://arxiv.org/abs/1609.02094) closed the gap between what the union bound pays and what geometry demands, a rare case of a two-step argument from the 1980s being the final word.

## References

- William B. Johnson, Joram Lindenstrauss. *Extensions of Lipschitz mappings into a Hilbert space*. Contemporary Mathematics, 26:189–206, 1984. The original paper; the lemma is the tool, not the theorem.
- Peter Frankl, Hiroshi Maehara. *The Johnson–Lindenstrauss lemma and the sphericity of some graphs*. Journal of Combinatorial Theory, Series B, 44(3):355–362, 1988. Sharpened constants and an early application.
- Piotr Indyk, Rajeev Motwani. *Approximate nearest neighbors: towards removing the curse of dimensionality*. Proceedings of STOC, 604–613, 1998. The lemma as an algorithmic workhorse.
- Sanjoy Dasgupta, Anupam Gupta. *An elementary proof of a theorem of Johnson and Lindenstrauss*. Random Structures and Algorithms, 22(1):60–65, 2003. The chi-square proof followed above.
- Dimitris Achlioptas. *Database-friendly random projections: Johnson–Lindenstrauss with binary coins*. Journal of Computer and System Sciences, 66(4):671–687, 2003. The ±1 and sparse constructions.
- Nir Ailon, Bernard Chazelle. *The fast Johnson–Lindenstrauss transform and approximate nearest neighbors*. SIAM Journal on Computing, 39(1):302–322, 2009. The Hadamard-preconditioned fast transform.
- Daniel M. Kane, Jelani Nelson. *Sparser Johnson–Lindenstrauss transforms*. Journal of the ACM, 61(1):1–23, 2014. Near-optimal sparsity per column.
- Kasper Green Larsen, Jelani Nelson. *Optimality of the Johnson–Lindenstrauss lemma*. Proceedings of FOCS, 633–638, 2017. The matching lower bound.
