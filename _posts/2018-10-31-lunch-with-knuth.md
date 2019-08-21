---
layout: mathpost
title: Lunch with Donald Knuth
category: Experiences
---

On Halloween, [Donald E. Knuth](https://www-cs-faculty.stanford.edu/~knuth/) ([wiki](https://en.wikipedia.org/wiki/Donald_Knuth))
visited the University of Waterloo for a
[distinguished lecture](https://uwaterloo.ca/computer-science/events/dls-donald-knuth-all-questions-answered),
and thanks to my advisor [Prof. Jeff Shallit](https://cs.uwaterloo.ca/~shallit/), who arranged a lunch with him
for a smaller group of people, which is how I could meet him in person. My first thought when he appeared was
*'he is quite taller than he looks in the photos'*.

Whenever Knuth gives a talk, almost all of it is interactive and Q/A based. He takes *all kinds of* questions
(except politics and religion) from the audience. I could only appreciate all the wisdom his answers had. Almost every opinion
was accompanied by an anecdote from his own life experience. Here's a set of things that were
brought up during the lunch and the talk (unfortunately, I forgot most of the conversations).<br>
*The public talk is now available [on youtube](https://youtu.be/XWR5Y3Wf8Fo).*

# On P vs NP
Knuth believes that [P = NP](https://en.wikipedia.org/wiki/P_versus_NP_problem). This obviously needs an explanation, and I will
try to present the reason based on my understanding of his argument. First let's be clear on
**what it means when we say *P = NP***. It means that there exists an integer $$k$$ and an algorithm $$A$$ which
solves every problem in the class *NP* of size $$m$$ bits in $$m^k$$ elementary steps. Now Knuth has two points:

- Imagine a number $$k$$ which is finite but excessively humongous (to have a sense of humongous numbers, one might look at
  [Ackermann Function](https://en.wikipedia.org/wiki/Ackermann_function) or even
  [Graham's Number](https://en.wikipedia.org/wiki/Graham%27s_number)). But irrespective of how big a finite number is, it is
  always 0% as big as infinity. Now there exist an incredibly huge number of algorithms that do $$m^k$$ elementary operations
  on the $$m$$ bits and it is extremely hard to believe that none of those algorithms can do what we want.
- The resolution of the *P vs NP* problem will not be a helpful result because the proof almost certainly will be
  [**non-constructive**](https://en.wikipedia.org/wiki/Constructive_proof#Non-constructive_proofs). Mathematics has a lot
  of examples where we have proof for the existence of something, but that proof does not help us *find* the actual thing
  *(I'm thinking cryptography here)*. So proving the existence of $$A$$ is different from actually finding $$A$$.


# Honeymoon advice
On his honeymoon in 1961, Knuth was reading [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky)'s book
***Syntactic Structures***, and he thinks that was a bad idea (reading it *on the honeymoon*, not reading it altogether).
Although, it was while reading this book that he discovered an **intersection between *Mathematics* and *Computer Programming***
(compiler design).


# Boredom of the young generation
Knuth is appalled by statements from people of the younger generation that go along the lines of:<br>
**"X is quite boring, which is why I study / work on Y instead."**<br>
He says that it's not the job of the world to entertain you. Boredom is inside you, not in the material
that you work with. It is true that some people find certain things more interesting than others, and hence are more
curious about it. The right thing to say would be that you are more curious about *Y* than *X*.

# On recent areas of interest
As Knuth says, he was a mathematician who got curious about Computer Science, but now his interests are again
inclined toward pure Mathematics. The problem space concerned with [families of sets](https://en.wikipedia.org/wiki/Family_of_sets)
seems very interesting to him currently because we haven't still found a lot of ways to represent and work with them in a way
that might help us analyze the numerous applications covered by this construct. I am not sure, but perhaps he started
thinking in this direction when the data structure [Zero-suppressed decision diagram (ZDD)](https://en.wikipedia.org/wiki/Zero-suppressed_decision_diagram#Representing_a_family_of_sets)
(given by ***Shin-ichi Minato***) came to light, which in Knuth's words is
**"the best way that I know of to represent families of sets"**.
