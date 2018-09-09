---
layout: mathpost
title: Some more &#35;P complete problems
---

I will be discussing two #P-Complete problems in this post: #SAT (Finding the number of satisfying assignments for a boolean formula) and finding the number of 3-colorings in a graph.

Both SAT and 3-coloring are NP Complete problems, so understanding why their counting versions are #P-Complete is very easy compared to the counting version of a more easy problem like finding a perfect matching in a bipartite graph, which is synonymous to the 01-permanent problem as discussed in my previous post. It is strongly recommended that you come here via [the previous post]({{site.baseurl}}/sharp-p-problems) for a smooth experience.

Proving any problem to be #P-Complete requires two things

- Proving that the problem is in #P
- Proving that all #P problems are reducible to this problem
  (that is, the problem is #P-Hard)

#### &#35;SAT
#SAT is in #P by the definition of the problem. Since there exists a language in NP (the language being SAT) with a non-deterministic Turing Machine whose number of accepting paths is the number of satisfying assignments (this is one of the definitions of the class #P). To prove the completeness, we consider the Cook-Levin reduction from any language L in NP to SAT (the [Cook-Levin theorem](https://en.wikipedia.org/wiki/Cook%E2%80%93Levin_theorem)). This reduction is a polynomial time computable function $$f: \{0, 1\}^* \rightarrow \{0, 1\}^*$$ such that $$\forall x \in \{0, 1\}^*$$, $$x \in L \leftrightarrow f(x) \in SAT$$.

This proof has some more information that we can use. If the boolean formula in consideration is $$\phi(x)$$, each satisfying truth assignment for the $$\phi$$ corresponds to an accepting computation path for the Turing Machine running on the input. So we have an efficient way to transform a certificate for input $$x$$ to a satisfying assignment for $$\phi(x)$$ and vice-versa.

What this means in simple terms is that the mapping from the certificates of $$x$$ to the assignments of $$\phi(x)$$ is invertible and hence one to one.
Conclusion: #satisfying assignments for $$\phi(x)$$ = #certificates for $$x$$. Hence the Cook-Levin reduction preserves the number of solutions. Thus #SAT is a #P-Complete problem.

#### Number of 3-colorings in a graph
The corresponding decision problem for this is:
***Given a graph G, find whether there exists a 3-coloring for G. A 3-coloring is a mapping of each node of the graph to any of three available colors, such that no two nodes which are adjacent have the same color.***

The 3-coloring problem is NP-Complete, which we will prove shortly, and so the counting version is again very easy to be proved #P-Complete as in the case of #SAT. To prove 3-coloring to be NP-Complete, we first show that it $$\in$$ NP, and then reduce 3-SAT (a well-known NP Complete problem) to 3-coloring, thus completing the proof.

Given a coloring scheme of 3 colors and the graph as an input instance to the problem, we can easily verify in polynomial time whether the coloring scheme is valid, by iterating over all the edges and checking that all the pairs of adjacent nodes have different colors. Thus the 3-coloring problem is in NP.

Now we reduce 3-SAT to 3-coloring and thus prove it to be NP-Hard. To do this, let's consider a 3-SAT instance having the boolean formula $$\phi(x)$$ with ***n variables*** and ***m clauses***. The variables are $$x_1, x_2, ... x_n$$

From $$\phi$$, we construct the graph G having:

- Vertex $$v_i$$ for each $$x_i$$
- Vertex $$\overline{v_i}$$ for each $$\overline{x_i}$$
- Vertices $$u_{j1}, u_{j2}, ... u_{j5}$$ for each clause
- 3 special vertices T, F, B

We will force T, F and B to be of different colors by forming a triangle among them. Actually in the correspondence, we take node T's color to denote a truth assignment and node F's color to denote a false assignment. Also note that $$\forall i$$, we want exactly one of $$v_i$$ and $$\overline{v_i}$$ to be colored as T's color and the other one to be colored as F's color. To do this, we form the edges as depicted in the image below.

![coloring]({{site.baseurl}}/images/sharp-p-complete-problems/assignments.png)

This ensures that every pair of $$v_i$$ and $$\overline{v_i}$$ is assigned the colors of T and F, both not being same. We have to take care of one more thing. For every clause, one of the literals must be true for the boolean formula to be true. So for each clause, we build a structure similar to the one given below. The example clause for the below image is $$C_i = (a \vee b \vee c)$$.

![coloring]({{site.baseurl}}/images/sharp-p-complete-problems/clause.png)

It is clear that all of a, b, and c cannot be false together, at least one of them has to be true for a possible 3-coloring to exist here.

This construction takes polynomial time. So 3-coloring is NP-Complete which completes our proof.

This problem can be reduced to k-coloring, by putting k = 3. So we also know now that k-coloring is NP-Complete, and finding the number of k-colorings in a graph is #P-Complete.


---