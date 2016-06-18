---
layout: mathpost
title: Implementing PEGASOS, an SVM solver
---

Here's the [original paper](http://ttic.uchicago.edu/~nati/Publications/PegasosMPB.pdf) that proposes the algorithm that we're going to implement.

SVMs are a very popular classification learning tool, and in the original form, the task of learning an SVM is actually a loss minimization problem with a penalty term for the [norm](https://en.wikipedia.org/wiki/Norm_(mathematics)) of the classifier being learnt. So for a given training set of $$m$$ training examples $$S = \{(x_i, y_i)\}_{i=1}^m$$, where $$x_i \in \mathbb{R}^n$$ and $$y_i \in \{-1, +1\}$$, we want to build a minimizer for the following function (note that here $$w$$ and $$x$$ are vectors):
\begin{equation} F = \min_{w}\left(\frac{\lambda}{2}||w||^2\right) + \frac{1}{m}\sum_{(x, y) \in S}l(w; (x, y)) \end{equation}
where $$l$$ is the loss function, given by $$l(w; (x, y)) = \max{\{0, 1 - y \langle w, x \rangle\}}$$ where $$\langle w, x \rangle$$ denotes the inner product of the two vectors. To have an intuitive insight into why this loss function works, let's consider two examples:

$$
\langle w, x \rangle = 
\begin{cases}
    +ve\text{, when } w \text{ is very similar to } x\\
    -ve\text{, when } w \text{ is quite different than } x
\end{cases}
$$

The variable $$y$$ has the classification information, where $$1$$ means belonging to the class, and $$-1$$ means not belonging to the class for which the classifier is being trained. Therefore, a positive value of $$\langle w, x \rangle$$ along with $$y = 1$$, or a negative value of $$\langle w, x \rangle$$ along with $$y = -1$$ is favorable because both these cases denote that the prediction works right. It also means that the loss function will be minimized in these two scenarios (work it out if needed), which is a part of our main function $$F$$ that we need to build the minimizer for.

**PEGASOS** stands for *Primal Estimated sub-GrAdient SOlver for SVM*, where *stochastic* means *having a random probability distribution or pattern that may be analysed statistically but may not be predicted precisely.* Let's dive into the algortihm and see why it's *stochastic*. The PEGASOS algorithm performs stochastic gradient descent on the primal objective function $$F$$ with a *carefully chosen* step size.

### The basic procedure
- Initially, set $$w_1$$ to be the [zero vector](http://mathworld.wolfram.com/ZeroVector.html)
- Iterate $$T$$ times while doing the following in each iteration $$t$$
    - Choose a random training example $$(x_{i_t}, y_{i_t})$$ by picking $$i_t$$ uniformly at random from $$\{1, 2, ... m\}$$
    - Replace the objective funtion $$F$$ with an approximation based on this training example, yielding
    \begin{equation} f(w, i_t) = \frac{\lambda}{2} ||w||^2 + l(w; (x_{i_t}, y_{i_t})) \end{equation}
    - Compute the subgradient of $$f(w, i_t)$$ as
    \begin{equation} \nabla_t = \lambda w_t - \mathbb{I}[y_{i_t} \langle w_t, x_{i_t} \rangle < 1] y_{i_t} x_{i_t} \end{equation}
    Here $$\mathbb{I}$$ is the indicator function, which takes the value $$1$$ if its argument is true, and $$0$$ otherwise, so we know that the value will be $$1$$ only when $$w$$ yields some non-zero loss in the example $$(x, y)$$
    - Update $$w_{t+1} = w_t - \eta_t\nabla_t$$ with the step size $$\eta_t = 1/(\lambda t)$$
- Output $$w_{T+1}$$

Let's try to see why this approximation is okay for a suitable $$T$$. For this, we'll look at the value of the complete gradient, and the subgradient computed with the approximated function above, and see a relation between them. The complete gradient of $$F$$ will be $$\dot{F}$$,
\begin{equation} \dot{F} = \frac{\lambda}{2} \nabla ||w||^2 + \frac{1}{m} \sum_{(x, y) \in S} l(w; (x, y)) \end{equation}
Now what will be the expected value of the subgradient $$\nabla$$ that we computed above? To find the expected value, we observe that the example taken to approximate the objective is chosen *uniformly at random*, which means that the probability of any example being selected is $$P(e) = 1/m$$. Thus the expected value of the subgradient $$\nabla$$ turns out to be equal to the complete gradient of $$F$$, our primal objective function. And that is why intuitively this approximation is expected to work well enough. Next section deals with **mini-batch iterations**, to approximate the objective with more determinism.

### Mini-batch iterations
As an extension of the basic procedure, now we would select a subset of examples, rather than selecting a single example for approximating the objective. So for a given $$k \in \{1, 2, ... m\}$$, we choose a subset of size $$k$$ and approximate the objective as before. Note that $$k = 1$$ is the case we already saw above. So now the objective can be written as
\begin{equation} f(w, A_t) = \frac{\lambda}{2} ||w||^2 + \frac{1}{k}\sum_{i \in A_t}l(w; (x_i, y_i)) \end{equation}
where $$A_t$$ is the subset chosen in $$t^{th}$$ iteration.

### Projection step
A potential variation in the above algorithm is that we limit the set of admissible solutions to a ball of radius $$1/\sqrt{\lambda}$$. To enforce this, project $$w_t$$ after each iteration onto a sphere as $$w_{t+1} = \min\{1, \frac{1/\sqrt{\lambda}}{||w_{t+1}||}\}w_{t+1}$$. The revised analysis as presented in the paper does not compulsorily require this projection step. It mentions this as an optional step because no major difference was found during the experiments between the projected and the unprojected variants.

It is proved in the paper that the number of iterations required to obtain a solution of accuracy $$\epsilon$$ is $$O(1/\epsilon)$$, where each iteration operates on a single training example. In contrast, previous analyses of stochastic gradient descent methods for SVMs required $$\Omega(1/\epsilon^2)$$ iterations because in previously devised SVM solvers, the number of iterations also scales linearly with $$1/\lambda$$, where $$\lambda$$ is the regularization parameter of the SVM; while with PEGASOS, this is not the case. PEGASOS works on an approximation, so the runtime of the algortihm is not dependent on the number of training examples or with some function of $$\lambda$$. It just depends on $$k$$, the size of the subset we are taking, and $$T$$, the number of iterations that we are making. The implemented code (in C++) will be put up later when I'm not feeling lazy.

---