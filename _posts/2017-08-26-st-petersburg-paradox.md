---
layout: mathpost
title: St. Petersburg paradox and intuition
category: Learning
---

Recently while revisiting probability, I came across an interesting problem, otherwise commonly known as the **_St. Petersburg paradox_**. The problem is about a coin-toss game, in which you will always win. What matters is the amount of money you win in the game. To play it, first, you must pay an amount **`C`**. Let's see what the game is, and then we can think about the right value of **`C`**.

### The game
This is a single player game where at each stage, a [fair coin](https://en.wikipedia.org/wiki/Fair_coin) is tossed. The stakes start with **`$2`** on the table. If the first toss results in a heads, the player wins two dollars and the game ends, else if the toss lands a tails, the stakes are doubled, i.e. **`$4`**. So the stakes keep doubling while the toss keeps giving tails, and the game ends when it lands a heads, and the player takes away all the stakes as winnings at that point.

Clearly, the **minimum amount** you can win is **$2** (first toss gives a heads), while the **maximum amount** is $$\infty$$ (no toss gives a head, then the last one is a head [hard to imagine I know]). Now let's take the amount that one is willing to pay for playing this game be $$C$$ and let's take the amount one wins in this game (the stakes) be $$W$$. Considering that the player is completely rational, they would want to play the game only if $$C \leq E(W)$$ where $$E(W)$$ is the **expected value of $$W$$**. The expected value is simply what we expect the value of $$W$$ to be. This is a common notion in probability and statistics and is computed as follows:
$$E(W) = \sum_{w}{w \times P(W = w)}$$ where $$P(W = w)$$ is the probability that the player wins $$w$$ dollars. Notice that this is a summation over all possible values of $$w$$, which are all powers of 2.

$$E(W) = (\frac{1}{2} \times 2) + (\frac{1}{4} \times 4) + (\frac{1}{8} \times 8) + \space \ldots$$

This is because the probability that:
- the first flip is a head  = $$\frac{1}{2}$$
- the first flip is a tail, and the second is a head  = $$\frac{1}{4}$$
- the first two flips are tails, and the third is a head  = $$\frac{1}{8}$$
- and so on ...

$$E(W) = 1 + 1 + 1 + \space \ldots = \infty$$

### What does this mean?
According to what we have calculated here, **a player should be willing to pay any amount $$C$$ to play this game**, because the **expected amount of the winnings is $$\infty$$**.

But **does your intuition agree with this result?** I guess not. What should we trust then? This computation or our intuition? Personally, I would not be willing to pay more than $10 to play this game. So it seems we are missing something important here.

To find out what's missing, consider a real situation, a real scenario where you are playing this game. It's true that the winning amount increases exponentially with each toss, so we would want only tails. But notice that to win the game, we need a heads at last, which marks the finishing of the game, otherwise this can go on forever. Playing this game forever is futile because the player is stuck in an infinite game. In game theory, we would solve this paradox (between the computation and our intuition) by introducing the concept of **utility**, which takes into account everything that is important to the player, so time will be a concern and the game will become more practical, for example we will have an upper bound on the winnings, because surely one cannot have an infinite amount of money.

### Getting practical
Consider a real scenario for this game-play. The game host will not be able to give you an *infinite amount of money*, and the game will not be able to continue for an *infinite amount of time*, so they will **put an upper cap**, say **a billion dollars**. So if there are $$29$$ continuous flips resulting in tails, then you win a billion dollars, because $$2^{30} > 1 \space billion$$. So **any game going up to 29 flips, all tails gives you a winning of 1 billion dollars**. Let's see how much we would want to pay to play this game now, given that **it ends not only on getting a head now, but also if there are 29 tails**.

In the previous hypothetical scenario we had $$w \in \{2^k : k \in \mathbb{N}\}$$, *i.e.* the winnings could be any power of 2. But in this practical case, we have $$w \in \{2^k : k \in \{1, 2, ..., 29\}\} \cup \{1,000,000,000\}$$ as any game with 29 flips giving tails lets us win a billion dollars. Now let's compute that expectation again, recalling that the expectation is the summation over all possible values that $$w$$ can take.

$$E(W) = (\frac{1}{2} \times 2) + (\frac{1}{4} \times 4) + (\frac{1}{8} \times 8) + \space \ldots + (\frac{1}{2^{29}} \times (2^{29} + 1,000,000,000)) \approx 30$$

Notice that drastic change, by our earlier computation, we should have been willing to pay an infinite amount to play this game. But when we involve the practical situation in our mathematics, we are not even willing to pay more than $30 even when the maximum winnings can be a billion dollars.
