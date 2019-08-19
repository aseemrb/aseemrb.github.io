---
layout: mathpost
title: Fast and online palindrome counting
category: Computer science
---

For a recent project, I had to deal with the following subproblem.

# Problem
Given an alphabet $$\Sigma$$ and some property $$P$$ (not relevant to this post), find the length of the largest string that exhibits $$P$$ and also has the maximum number of distinct palindromes possible for a string of that size. It is known that there is a finite number of such strings.

Naturally, this calls for a simple backtracking solution where we start with the first letter in the alphabet and generate strings in lexicographic order. With each new string generated, if it satisfies $$P$$ and has the maximum number of possible palindromes then we follow that search path in the tree; otherwise we prune it. However, the strings we are dealing with could go up to millions of characters. So we need to do this as fast as possible. But first, let's have some background.

# Preliminaries
The first thing to observe is that a string of length $$n$$ will have at most $$n$$ palindromes (excluding the empty string). To convince yourself, try to construct a string by adding one letter at a time, and each time look at how many new distinct palindromes this new letter creates (it will be at most one).

Hence, in our backtracking algorithm, we want to maintain the number of palindromes that the current string has. With each letter added or removed, the algorithm should very quickly find the new number of palindromes. If a letter is added to the end then the number may increase, and if a letter is deleted from the end then it may decrease.

Such an algorithm is given by [Rubinchik and Shur](https://arxiv.org/abs/1506.04862), where the primary idea is to construct a graph where each node represents a unique palindrome. There are two types of edges in this graph:

- **Border edge**: A directed edge from $$p$$ to $$q$$ labeled $$a$$, if $$q = apa$$ for some $$a \in \Sigma$$.
- **Suffix edge**: An unlabeled directed edge from $$p$$ to $$q$$, if $$q$$ is the longest proper palindromic suffix of $$p$$.

Whenever we append a new letter to an already processed string, it takes amortized constant time to maintain this graph. Below is an example graph for the string `aababba`.

![graph]({{site.baseurl}}/images/count-palindromes/grpah.png)

Here $$\epsilon$$ denotes the empty string and $$\gamma$$ is an imaginary palindrome of length $$-1$$. The *suffix edges* are shown by dashed lines, while the *border edges* are shown by solid lines with labels. We say that a palindrome consisting of a single letter *borders* $$\gamma$$, which makes the implementation of the algorithm easy.

# The algorithm and the implementation
First, note that this graph will be a tree of nodes where each node will represent a palindrome. So we define a struct `Palindrome` with the following properties, and create a tree of them.

{% highlight cpp %}
struct Palindrome
{
    int envelope[ALPH];
    int renvelope[ALPH];
    int len;
    int lspIndex;
};

vector<Palindrome> Tree;
{% endhighlight %}

Here, `ALPH` is the size of the alphabet which is required to enable adding edges for each possible letter. The field `envelope[i]` stores the index of the nore
