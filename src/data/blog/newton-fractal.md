---
author: Aseem Raj Baranwal
pubDatetime: 2023-11-07T15:22:00Z
title: The Newton fractal
slug: newton-fractal
featured: false
draft: false
tags:
  - mathematics
description:
  Newton's method for finding roots of polynomials is a discrete dynamical system on the complex plane. Each starting point converges (almost always) to one of the roots. The basins of attraction have fractal boundaries, intricate to a degree the algebra of the polynomial gives no hint of.
---

[Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method) is a standard recipe for finding a root of a smooth function $f$. From a starting point $z_0$, iterate

$$
z_{k+1} \;=\; z_k - \frac{f(z_k)}{f'(z_k)}.
$$

If $f$ is a polynomial with $n$ distinct roots, the iteration is well-defined on the complex plane (except at the critical points where $f'$ vanishes), and from almost every starting point it converges to one of the $n$ roots. The set of starting points converging to a particular root is called that root's **basin of attraction**.

For polynomials of degree $\ge 3$, the basins are not the simple regions one might expect from the algebra. Their boundaries are fractal.

## The simplest non-trivial case

Take $f(z) = z^n - 1$, whose roots are the $n$-th roots of unity, evenly spaced on the unit circle:

$$
\zeta_k \;=\; e^{2\pi i k / n}, \quad k = 0, 1, \ldots, n - 1.
$$

The Newton iteration simplifies to

$$
z_{k+1} \;=\; z_k - \frac{z_k^n - 1}{n\, z_k^{n-1}} \;=\; \frac{(n-1) z_k^n + 1}{n\, z_k^{n-1}}.
$$

Color each starting point in a region of the plane by which root it ends up at, with darker shades for points that take more iterations to converge. The result is the Newton fractal.

Slide $n$ to change the polynomial. Click anywhere on the picture to launch a Newton iteration from that point and watch the iterates converge. The picture shows the square $-2 \le \operatorname{Re} z, \operatorname{Im} z \le 2$ of the complex plane, with the roots (white dots) sitting on the unit circle.

<div class="nw-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><div style="display: flex; gap: 0.6rem 1.2rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.92em;"><label style="display: flex; align-items: center; gap: 0.5rem; flex: 1 1 200px;">degree <em>n</em><input type="range" id="nw-slider" min="2" max="6" value="3" step="1" style="flex: 1;"></label><span><em>n</em> = <strong id="nw-n">3</strong></span><button id="nw-clear" type="button" style="padding: 0.3rem 0.7rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">clear path</button><span style="font-style: italic;">click on the canvas to launch a Newton iteration from that point</span></div><div style="position: relative; max-width: 480px; margin: 0 auto;"><canvas id="nw-canvas" width="480" height="480" style="width: 100%; height: auto; cursor: crosshair; display: block;" aria-label="Newton fractal for the polynomial z^n - 1; click to launch an iteration from the chosen point."></canvas><svg id="nw-overlay" viewBox="0 0 480 480" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;"></svg></div><div style="margin-top: 0.75rem; font-size: 0.85em; line-height: 1.7; display: flex; flex-wrap: wrap; column-gap: 1.6rem; row-gap: 0.2rem;"><span style="white-space: nowrap;"><svg width="13" height="13" viewBox="0 0 13 13" style="display: inline-block; vertical-align: -2px;"><circle cx="6.5" cy="6.5" r="4" fill="#ffffff" stroke="#000000" stroke-width="1.5"/></svg> roots of <em>z</em><sup><em>n</em></sup> &minus; 1</span><span>cell color = root reached from that starting point; darker = more iterations needed</span><span>clicked path: <svg width="13" height="13" viewBox="0 0 13 13" style="display: inline-block; vertical-align: -2px;"><circle cx="6.5" cy="6.5" r="5" fill="#ffffff" stroke="#000000" stroke-width="1"/></svg> start &rarr; <svg width="11" height="11" viewBox="0 0 11 11" style="display: inline-block; vertical-align: -1px;"><circle cx="5.5" cy="5.5" r="2.5" fill="#000000" stroke="#ffffff" stroke-width="1"/></svg> iterates &rarr; <svg width="13" height="13" viewBox="0 0 13 13" style="display: inline-block; vertical-align: -2px;"><circle cx="6.5" cy="6.5" r="5" fill="#dc2626" stroke="#000000" stroke-width="1"/></svg> root reached</span></div></div>
<script>
(function () {
  var slider = document.getElementById('nw-slider');
  if (!slider) return;
  var nDisp = document.getElementById('nw-n');
  var clearBtn = document.getElementById('nw-clear');
  var canvas = document.getElementById('nw-canvas');
  var overlay = document.getElementById('nw-overlay');
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var range = 2.0;
  function complexMul(a, b) { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; }
  function complexDiv(a, b) {
    var d = b.re * b.re + b.im * b.im;
    return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
  }
  function complexPow(z, k) {
    var r = { re: 1, im: 0 };
    for (var i = 0; i < k; i++) r = complexMul(r, z);
    return r;
  }
  function rootsOfUnity(n) {
    var arr = [];
    for (var k = 0; k < n; k++) {
      arr.push({ re: Math.cos(2 * Math.PI * k / n), im: Math.sin(2 * Math.PI * k / n) });
    }
    return arr;
  }
  function newtonStep(z, n) {
    var zn1 = complexPow(z, n - 1);
    var zn = complexMul(zn1, z);
    var num = { re: zn.re - 1, im: zn.im };
    var den = { re: n * zn1.re, im: n * zn1.im };
    var q = complexDiv(num, den);
    return { re: z.re - q.re, im: z.im - q.im };
  }
  function classify(z, roots, maxIter) {
    for (var iter = 0; iter < maxIter; iter++) {
      for (var k = 0; k < roots.length; k++) {
        var dx = z.re - roots[k].re, dy = z.im - roots[k].im;
        if (dx * dx + dy * dy < 1e-4) return { rootIdx: k, iters: iter };
      }
      z = newtonStep(z, roots.length);
    }
    return { rootIdx: -1, iters: maxIter };
  }
  function hslToRgb(h, s, l) {
    h /= 360;
    var r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      var hue2rgb = function (p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  function renderBasins(n) {
    var roots = rootsOfUnity(n);
    var maxIter = 30;
    var imageData = ctx.createImageData(W, H);
    var data = imageData.data;
    for (var py = 0; py < H; py++) {
      var y = range - (2 * range) * py / H;
      for (var px = 0; px < W; px++) {
        var x = -range + (2 * range) * px / W;
        var c = classify({ re: x, im: y }, roots, maxIter);
        var idx = (py * W + px) * 4;
        if (c.rootIdx >= 0) {
          var hue = 360 * c.rootIdx / n;
          var light = 0.7 - 0.4 * (c.iters / maxIter);
          var rgb = hslToRgb(hue, 0.55, light);
          data[idx] = rgb[0]; data[idx + 1] = rgb[1]; data[idx + 2] = rgb[2];
        } else {
          data[idx] = data[idx + 1] = data[idx + 2] = 30;
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    for (var k = 0; k < roots.length; k++) {
      var rpx = (roots[k].re + range) / (2 * range) * W;
      var rpy = (range - roots[k].im) / (2 * range) * H;
      ctx.beginPath();
      ctx.arc(rpx, rpy, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    drawAxes();
  }
  function drawAxes() {
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    [-1, 1].forEach(function (t) {
      var px = (t + range) / (2 * range) * W;
      var py = (range - t) / (2 * range) * H;
      ctx.moveTo(px, H / 2 - 4); ctx.lineTo(px, H / 2 + 4);
      ctx.moveTo(W / 2 - 4, py); ctx.lineTo(W / 2 + 4, py);
    });
    ctx.stroke();
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.fillStyle = '#ffffff';
    var labels = [
      ['1', (1 + range) / (2 * range) * W, H / 2 + 14],
      ['−1', (-1 + range) / (2 * range) * W, H / 2 + 14],
      ['i', W / 2 + 13, (range - 1) / (2 * range) * H],
      ['−i', W / 2 + 17, (range + 1) / (2 * range) * H],
      ['Re', W - 15, H / 2 - 12],
      ['Im', W / 2 + 17, 10]
    ];
    labels.forEach(function (L) {
      ctx.strokeText(L[0], L[1], L[2]);
      ctx.fillText(L[0], L[1], L[2]);
    });
  }
  function pixelToComplex(px, py) {
    var x = -range + (2 * range) * px / W;
    var y = range - (2 * range) * py / H;
    return { re: x, im: y };
  }
  function complexToPixel(z) {
    return { px: (z.re + range) / (2 * range) * W, py: (range - z.im) / (2 * range) * H };
  }
  function drawIterates(startZ, n) {
    var roots = rootsOfUnity(n);
    var maxIter = 40;
    var iterates = [startZ];
    var z = startZ;
    var converged = false;
    for (var iter = 0; iter < maxIter; iter++) {
      for (var k = 0; k < roots.length; k++) {
        var dx = z.re - roots[k].re, dy = z.im - roots[k].im;
        if (dx * dx + dy * dy < 1e-4) { converged = true; break; }
      }
      if (converged) break;
      z = newtonStep(z, n);
      iterates.push(z);
    }
    var s = '';
    var pts = '';
    for (var i = 0; i < iterates.length; i++) {
      var p = complexToPixel(iterates[i]);
      pts += p.px.toFixed(1) + ',' + p.py.toFixed(1) + ' ';
    }
    s += '<polyline points="' + pts + '" stroke="#ffffff" stroke-width="2" fill="none" stroke-opacity="0.95"/>';
    s += '<polyline points="' + pts + '" stroke="#000000" stroke-width="1" fill="none" stroke-opacity="0.95" stroke-dasharray="3 3"/>';
    for (var i = 0; i < iterates.length; i++) {
      var p = complexToPixel(iterates[i]);
      var r = i === 0 ? 5 : (i === iterates.length - 1 ? 5 : 2.5);
      var fill = i === 0 ? '#ffffff' : (i === iterates.length - 1 ? '#dc2626' : '#000000');
      s += '<circle cx="' + p.px.toFixed(1) + '" cy="' + p.py.toFixed(1) + '" r="' + r + '" fill="' + fill + '" stroke="#000" stroke-width="0.8"/>';
    }
    overlay.innerHTML = s;
  }
  function clearOverlay() { overlay.innerHTML = ''; }
  slider.addEventListener('input', function () {
    var n = parseInt(slider.value, 10);
    nDisp.textContent = n;
    clearOverlay();
    renderBasins(n);
  });
  canvas.addEventListener('click', function (ev) {
    var rect = canvas.getBoundingClientRect();
    var px = (ev.clientX - rect.left) * (W / rect.width);
    var py = (ev.clientY - rect.top) * (H / rect.height);
    var z = pixelToComplex(px, py);
    var n = parseInt(slider.value, 10);
    drawIterates(z, n);
  });
  clearBtn.addEventListener('click', clearOverlay);
  renderBasins(parseInt(slider.value, 10));
})();
</script>

For $n = 2$, the basins are exactly the left and right half-planes, separated by the imaginary axis. No fractal. For $n \ge 3$, every basin shares its boundary with every other basin: any small disk that contains a boundary point also contains points from all $n$ basins. This is the **Wada property** of the Newton fractal.

## Where the boundary is fractal

The set of starting points that *do not* converge to any root is the [Julia set](https://en.wikipedia.org/wiki/Julia_set) of the Newton iteration map $N(z) = z - f(z)/f'(z)$. For $f(z) = z^n - 1$ with $n \ge 2$, this Julia set is non-empty and self-similar at every scale. It has [Hausdorff dimension](https://en.wikipedia.org/wiki/Hausdorff_dimension) strictly between $1$ and $2$.

The Newton iteration is a holomorphic dynamical system: the map $z \mapsto N(z)$ is meromorphic on the complex plane. The local theory of holomorphic dynamics says that the boundary of any attracting basin is automatically a fractal except in degenerate cases. The fractal boundary is not a quirk of $z^n - 1$; it is generic.

## What is interesting beyond the picture

- **Sensitivity to initial conditions is not the same as randomness.** Even though arbitrarily close starting points may converge to different roots, the iteration is fully deterministic. The fractal is exactly the place where this determinism is most dramatic.
- **Numerical robustness.** When you run Newton's method to find a root of a polynomial, you implicitly assume your starting point is "obviously" in the right basin. The fractal shows that for some initial guesses, this assumption is delicate — a tiny perturbation flips you to a different root.
- **Algorithms that need *all* roots** of a polynomial cannot rely on naive Newton from a single starting point; they need to navigate the basin geometry. Hubbard, Schleicher, and Sutherland (2001) gave an explicit small set of starting points that is guaranteed to find all roots of any degree-$n$ polynomial via Newton's method, by understanding the basin structure carefully.

## References

- John Hubbard, Dierk Schleicher, Scott Sutherland. *How to find all roots of complex polynomials by Newton's method*. Inventiones Mathematicae, 146(1):1-33, 2001.
- John Milnor. *Dynamics in One Complex Variable*. Princeton University Press, 2006.
- Robert L. Devaney. *An Introduction to Chaotic Dynamical Systems*. Westview Press, 2003.
