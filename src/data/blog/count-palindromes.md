---
author: Aseem Raj Baranwal
pubDatetime: 2019-07-20T15:22:00Z
title: Fast and online palindrome counting
slug: count-palindromes
featured: true
draft: false
tags:
  - computer science
description:
  An exploration of an efficient algorithm for online palindrome counting using a palindrome tree data structure. Based on the work of Rubinchik and Shur, this post details the problem, the data structure, and the implementation.
---

For a [recent project](https://arxiv.org/abs/1904.10028), I had to deal with the following subproblem.

## Problem
Given an alphabet $$\Sigma$$ and some property $$P$$ (not relevant to this post), find the length of the largest string that exhibits $$P$$ and also has the maximum number of distinct palindromes possible for a string of that size. It is known that there is a finite number of such strings.

Naturally, this calls for a simple backtracking solution where we start with the first letter in the alphabet and generate strings in lexicographic order. With each new string generated, if it satisfies $$P$$ and has the maximum number of possible palindromes then we follow that search path in the tree; otherwise, we prune it. However, the strings we are dealing with could go up to millions of characters. So we need to do this as fast as possible. But first, let's have some background.

## Preliminaries
The first thing to observe is that a string of length $$n$$ will have at most $$n$$ palindromes (excluding the empty string). To convince yourself, try to construct a string by adding one letter at a time, and each time look at how many new distinct palindromes this new letter creates (it will be at most one).

Hence, in our backtracking algorithm, we want to maintain the number of palindromes that the current string has. With each letter added or removed, the algorithm should very quickly find the new number of palindromes. If a letter is added to the end then the number may increase, and if a letter is deleted from the end then it may decrease.

Such an algorithm is given by Rubinchik and Shur ([paper link](https://arxiv.org/abs/1506.04862)), where the primary idea is to construct a graph where each node represents a unique palindrome. This approach was first proposed by **Mikhail Rubinchik** at the **Петрозаводск (Petrozavodsk) summer camp 2014**.

## The data structure
There are two types of edges (pointers) in the data structure.

- **Border edge**: A directed edge from $$p$$ to $$q$$ labeled $$a$$, if $$q = apa$$ for some $$a \in \Sigma$$.
- **Suffix edge**: An unlabeled directed edge from $$p$$ to $$q$$, if $$q$$ is the longest proper palindromic suffix of $$p$$.

Note that there could be a border edge for each possible letter, but there will be exactly one suffix edge for each palindrome.

Whenever we append a new letter to an already processed string, it takes amortized constant time to maintain this graph. Below is an example graph for the string `aababba`.

<svg viewBox="0 0 700 510" xmlns="http://www.w3.org/2000/svg" style="color: var(--foreground); width: 100%; height: auto; max-width: 700px; display: block; margin: 1.5rem auto;" role="img" aria-label="Palindrome tree for the string aababba. Nodes are unique palindromic substrings; solid edges are border edges (extending a palindrome by a letter on both sides); dashed edges are suffix edges (pointing to the longest proper palindromic suffix).">
  <defs>
    <marker id="cp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker>
  </defs>
  <g stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" fill="none">
    <line x1="418" y1="338" x2="325" y2="435" marker-end="url(#cp-arrow)"/>
    <line x1="181" y1="315" x2="407" y2="320" marker-end="url(#cp-arrow)"/>
    <line x1="526" y1="108" x2="446" y2="294" marker-end="url(#cp-arrow)"/>
    <line x1="133" y1="190" x2="151" y2="287" marker-end="url(#cp-arrow)"/>
    <line x1="603" y1="296" x2="545" y2="112" marker-end="url(#cp-arrow)"/>
    <line x1="326" y1="185" x2="178" y2="298" marker-end="url(#cp-arrow)"/>
    <line x1="305" y1="62" x2="508" y2="82" marker-end="url(#cp-arrow)"/>
    <line x1="496" y1="446" x2="182" y2="325" marker-end="url(#cp-arrow)"/>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="288" y1="438" x2="176" y2="334" marker-end="url(#cp-arrow)"/>
    <line x1="319" y1="434" x2="521" y2="109" marker-end="url(#cp-arrow)"/>
    <line x1="413" y1="309" x2="153" y2="178" marker-end="url(#cp-arrow)"/>
    <line x1="460" y1="320" x2="583" y2="320" marker-end="url(#cp-arrow)"/>
    <line x1="167" y1="292" x2="268" y2="85" marker-end="url(#cp-arrow)"/>
    <line x1="513" y1="95" x2="372" y2="159" marker-end="url(#cp-arrow)"/>
    <line x1="597" y1="341" x2="535" y2="432" marker-end="url(#cp-arrow)"/>
  </g>
  <g font-size="14" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif" text-anchor="middle">
    <text x="245" y="420">a</text>
    <text x="432" y="279">b</text>
    <text x="305" y="230">a</text>
    <text x="495" y="305">b</text>
    <text x="232" y="196">b</text>
    <text x="437" y="114">a</text>
    <text x="582" y="394">a</text>
  </g>
  <circle cx="280" cy="60" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="280" y="66" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">bab</text>
  <circle cx="536" cy="85" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="536" y="91" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">b</text>
  <circle cx="128" cy="165" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="128" y="171" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">aa</text>
  <circle cx="346" cy="170" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="346" y="176" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">aba</text>
  <circle cx="156" cy="315" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="156" y="321" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">a</text>
  <circle cx="435" cy="320" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="435" y="326" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">ε</text>
  <circle cx="611" cy="320" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="611" y="326" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">bb</text>
  <circle cx="306" cy="455" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="306" y="461" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">γ</text>
  <circle cx="519" cy="455" r="25" fill="var(--background)" stroke="currentColor" stroke-width="1.5"/>
  <text x="519" y="461" text-anchor="middle" font-size="12" font-style="italic" fill="currentColor" font-family="ui-serif, Georgia, serif">abba</text>
</svg>

Here $$\epsilon$$ denotes the empty string and $$\gamma$$ is an imaginary palindrome of length $$-1$$. The *suffix edges* are shown by dashed lines, while the *border edges* are shown by solid lines with labels. We say that a palindrome consisting of a single letter *borders* $$\gamma$$, which makes the implementation of the algorithm easy.

## The algorithm
First, note that this graph will be a tree of nodes where each node will represent a palindrome. So we define a struct `Palindrome` with the following properties and create a tree of them.

```cpp
struct Palindrome
{
    int envelope[ALPH];
    int renvelope[ALPH];
    int len;
    int lspIndex;
};

vector<Palindrome> Tree;
```

Here, `ALPH` is the size of the alphabet $$\Sigma$$, required to enable adding edges for each possible letter. The value of `Tree[u].envelope[i]` stores the index `v` such that `Tree[v]` represents the palindrome `i Tree[u] i`; The array `Tree[u].renvelope` is just the reverse map for `envelope`. Note that `i` represents a single letter here and `Tree[u]` represents the palindrome at index `u`. Thus, `envelope` maintains the **border edges** defined above.

We do not store the complete palindrome, but only a representation, which saves a lot of space. The field `len` stores the length of the palindrome, and `lspIndex` stores the index of the **longest proper palindromic suffix of this palindrome**. Thus, `lspIndex` provides the **suffix edge** defined above.

Now the algorithm is straightforward.

- When a new letter `nextChar` is added to the string `S` at the last position `pos`, start from the current longest palindromic suffix (call it `LSP`) in the string.
- Go through suffix links to find the `candidate` suffix that may produce a new palindrome. It is guaranteed that we will find a candidate because we have the imaginary palindrome $$\gamma$$ of length $$-1$$. This is done as follows
```cpp
candidate = LSP;
while (true)
{
    int length = Tree[candidate].len;
    if (S[pos - length - 1] == nextChar)
    {
        // Found the right candidate.
        break;
    }

    // If this was not the right candidate, follow its suffix edge.
    candidate = Tree[candidate].lspIndex;
}
```

- After this loop, if the corresponding envelope is empty, we know that `nextChar` generates a new palindrome; otherwise it already exists.
```cpp
candidate = LSP;
if (Tree[candidate].envelope[nextChar] == 0)
{
    // We have a new palindrome "nextChar Tree[candidate] nextChar".
    LSP++;
    Tree[LSP].len = Tree[candidate].len + 2;

    // Set the envelope to go from candidate to this new palindrome.
    Tree[candidate].envelope[nextChar] = LSP;
    Tree[LSP].renvelope[nextChar] = candidate;
}
```
- Finally, set `Tree[LSP].lspIndex` corresponding to the *suffix edge* for the new palindrome. This can be found again by traversing via suffix edges from the final candidate.


## Space and time requirements

If the string can be of length up to $$n$$, then there are no more than $$n+2$$ nodes in the tree. This is because there will be at most $$n+2$$ palindromes including $$\epsilon$$ and $$\gamma$$. Hence, the space complexity is $$O(n)$$.

To think about the time complexity, note that following a suffix edge always reduces the length of the current longest palindromic suffix. The length cannot be reduced more than $$n$$ times, hence, the amortized cost across all updates is $$O(n)$$, which makes the average cost of maintenance per update $$O(1)$$.
