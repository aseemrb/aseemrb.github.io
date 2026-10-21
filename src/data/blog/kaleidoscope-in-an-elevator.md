---
author: Aseem Raj Baranwal
pubDatetime: 2026-10-20T15:00:00Z
title: The kaleidoscope in an elevator
slug: kaleidoscope-in-an-elevator
featured: false
draft: false
tags:
  - mathematics
  - physics
description:
  "Two mirrors that meet at an angle place every image on a circle around the line where they meet. Elevator mirrors a tenth of a degree off parallel form a kaleidoscope with 3600 sectors centered almost a kilometer away, which bends the mirror tunnel and lets you read the tilt off a photograph."
---

Some elevators have mirrors on two opposite walls. Standing between them, you see a tunnel of copies of yourself, alternately facing you and turned away, that bends off to one side and fades out. Lee and Hernández-Andrés, in [*Virtual tunnels and green glass: The colors of common mirrors*](https://doi.org/10.1119/1.1615524) (2004), note that when the mirrors are not exactly parallel, the tunnel curves toward the side where the mirrors tilt toward each other. Mirrors that tilt toward each other would meet if they were extended far enough, and two mirrors meeting at an angle are the optical part of a [kaleidoscope](https://en.wikipedia.org/wiki/Kaleidoscope). The elevator is a kaleidoscope whose mirrors, extended, meet far outside the building, and the bend of the tunnel measures the angle between them.

## Two reflections make a rotation

Look at the mirrors from above, so that each mirror appears as a line. Suppose the two lines meet at a point $O$ at an angle $\theta$. In three dimensions, $O$ is the vertical line where the two mirror planes meet. I call it the **hinge**.

Describe any point by its distance from $O$ and by its angle at $O$, measured counterclockwise from the first mirror. A mirror through $O$ keeps every point's distance from $O$ and swaps the two sides of the mirror. If the mirror points at angle $\beta$, a point at angle $\varphi$ lies $\varphi - \beta$ past the mirror, and its reflection lies the same amount short of it, at angle $\beta - (\varphi - \beta) = 2\beta - \varphi$.

<div style="margin: 1.5rem auto; max-width: 620px; color: var(--foreground);">
<svg viewBox="0 0 620 280" role="img" aria-label="Two mirrors, drawn as lines from the hinge O at an angle theta. A point P at angle phi from mirror 1 reflects in mirror 1 to P1 at angle minus phi, and P1 reflects in mirror 2 to P2 at angle 2 theta plus phi. All three points lie on one circle centered on O, so P2 is P rotated about O by 2 theta." style="width: 100%; height: auto; display: block;">
<path d="M 235.4 309.9 A 200 200 0 0 0 70.9 36.1" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="50" y1="235" x2="245.6" y2="193.4" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
<line x1="50" y1="235" x2="245.6" y2="276.6" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
<line x1="50" y1="235" x2="111.8" y2="44.8" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/>
<line x1="50" y1="235" x2="370" y2="235" stroke="currentColor" stroke-width="3.5"/>
<text x="366" y="257" text-anchor="end" font-size="13" fill="currentColor">mirror 1</text>
<line x1="50" y1="235" x2="327.1" y2="75" stroke="currentColor" stroke-width="3.5"/>
<text x="333.1" y="69" text-anchor="start" font-size="13" fill="currentColor">mirror 2</text>
<line x1="245.6" y1="193.4" x2="245.6" y2="276.6" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 3"/>
<line x1="245.6" y1="276.6" x2="111.8" y2="44.8" stroke="#2563eb" stroke-width="1.3" stroke-dasharray="3 3"/>
<path d="M 105 235 A 55 55 0 0 0 97.6 207.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="115.7" y="222.4" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">θ</tspan></text>
<path d="M 162 235 A 112 112 0 0 0 159.6 211.7" fill="none" stroke="currentColor" stroke-width="1.3"/>
<text x="174.3" y="226.9" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">φ</tspan></text>
<path d="M 159.6 258.3 A 112 112 0 0 0 162 235" fill="none" stroke="#dc2626" stroke-width="1.3"/>
<text x="174.3" y="253.1" text-anchor="middle" font-size="15" fill="#dc2626"><tspan font-style="italic">φ</tspan></text>
<path d="M 206.5 201.7 A 160 160 0 0 0 99.4 82.8" fill="none" stroke="#2563eb" stroke-width="1.8"/>
<text x="184.8" y="121.2" text-anchor="middle" font-size="15" fill="#2563eb">2<tspan font-style="italic">θ</tspan></text>
<circle cx="245.6" cy="193.4" r="4.5" fill="currentColor"/>
<text x="255.6" y="198.4" text-anchor="start" font-size="15" fill="currentColor"><tspan font-style="italic">P</tspan></text>
<circle cx="245.6" cy="276.6" r="4.5" fill="#dc2626"/>
<text x="255.6" y="281.6" text-anchor="start" font-size="15" fill="#dc2626"><tspan font-style="italic">P</tspan>₁</text>
<circle cx="111.8" cy="44.8" r="4.5" fill="#2563eb"/>
<text x="121.8" y="46.8" text-anchor="start" font-size="15" fill="#2563eb"><tspan font-style="italic">P</tspan>₂</text>
<circle cx="50" cy="235" r="3.5" fill="currentColor"/>
<text x="42" y="240" text-anchor="end" font-size="15" fill="currentColor"><tspan font-style="italic">O</tspan></text>
<text x="330" y="150" text-anchor="start" font-size="13" fill="currentColor"><tspan font-style="italic">P</tspan> at angle <tspan font-style="italic">φ</tspan></text>
<text x="330" y="172" text-anchor="start" font-size="13" fill="#dc2626">reflected in mirror 1: <tspan font-style="italic">P</tspan>₁ at −<tspan font-style="italic">φ</tspan></text>
<text x="330" y="194" text-anchor="start" font-size="13" fill="#2563eb">then in mirror 2: <tspan font-style="italic">P</tspan>₂ at 2<tspan font-style="italic">θ</tspan> + <tspan font-style="italic">φ</tspan></text>
</svg>
</div>

The first mirror points at angle $0$, so it sends a point $P$ at angle $\varphi$ to $P_1$ at angle $-\varphi$. The second mirror points at angle $\theta$, so it sends $P_1$ to $P_2$ at angle $2\theta - (-\varphi) = 2\theta + \varphi$. Two reflections in a row therefore add $2\theta$ to every angle and leave every distance from $O$ unchanged. That is a rotation about $O$ by $2\theta$.

Repeating the argument, a copy formed by an even number of reflections is the original rotated about $O$. In the elevator, it is an upright copy of you, seen from behind. A copy formed by an odd number of reflections is $P_1$ rotated about $O$, so it is mirror-reversed, and it faces you. No reflection changes the distance from $O$, so **every image of a point lies on the circle through that point centered on $O$**.

Parallel mirrors are the limiting case. Put them a distance $w$ apart, and measure positions across the gap by a coordinate $x$, with the mirrors at $x = 0$ and $x = w$. The first mirror sends $x$ to $-x$, and the second sends any $x$ to $2w - x$, so together they send $x$ to $2w - (-x) = x + 2w$. Two reflections shift everything by $2w$. A rotation by a small angle $2\theta$, measured in radians, moves a point at distance $D$ from the center along an arc of length $2\theta D$. This matches the shift $2w$ when $D = w/\theta$. As $\theta$ shrinks to zero, the hinge moves off to infinity and the rotation becomes the shift.

## A kaleidoscope closes the circle

Suppose $\theta = 180°/m$ for a whole number $m$. Then $m$ rotations by $2\theta$ make one full turn, and the images close up into a finite pattern. The mirrors and their images divide the circle around $O$ into $2m = 360°/\theta$ equal sectors. One sector holds the object, and the other $2m - 1$ hold its images. At $60°$ there are six sectors and five images, and at $45°$ there are eight sectors and seven images. The rotations and reflections that carry the object to its $2m$ positions are the symmetries of a regular polygon with $m$ sides, a collection called the [dihedral group](https://en.wikipedia.org/wiki/Dihedral_group).

David Brewster, who named the kaleidoscope and patented it in 1817, worked this out in his [*Treatise on the Kaleidoscope*](https://archive.org/details/b29295440) (1819). He wrote that the picture is made of parts "the number of which is equal to the number of times that the angle AOB is contained in 360°", where AOB is his name for the angle between the mirrors, and that "these parts are alternately direct and inverted pictures of the object". By **direct** he meant upright, and by **inverted** he meant mirror-reversed. He also required the angle to be an "even aliquot part of a circle", meaning that $360°/\theta$ is an even whole number. At other angles, the copies built up by going around $O$ clockwise and counterclockwise meet in the last sector, and the two pieces there do not match unless the object sits symmetrically between the mirrors.

## The elevator's hinge

Now the elevator. Suppose its mirrors are turned by $\theta = 0.1°$ relative to each other about a vertical line, and you stand midway between them. Let $w = 1.5$ m be the width of the gap at your position, or more precisely the sum of your distances to the two mirrors. Standing midway puts you on the line that splits the angle at $O$ in half, at some distance $D$ from $O$.

<div style="margin: 1.5rem auto; max-width: 720px; color: var(--foreground);">
<svg viewBox="0 0 720 345" role="img" aria-label="Left: top view of the two elevator mirrors, extended until they meet at the hinge O at an angle theta. You stand at distance D from O on the line bisecting that angle, and the perpendicular from you to each mirror has length w over 2 and meets the line from O at the angle theta over 2. Right: the unfolded copies of the elevator fan out around O, each turned by theta. Copies of you lie on the circle of radius D. The line of sight to copy 3 stays within the mirrors, which span distances D minus a to D plus a from O, while the line to copy 4 dips inside D minus a and misses them. The sagitta is the gap between the circle and the line of sight at its midpoint." style="width: 100%; height: auto; display: block;">
<line x1="20" y1="165" x2="275" y2="165" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/>
<text x="167.5" y="157" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">D</tspan></text>
<line x1="20" y1="165" x2="333" y2="98.5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="220" y1="122.5" x2="308" y2="103.8" stroke="currentColor" stroke-width="3.5"/>
<line x1="275" y1="165" x2="264" y2="113.1" stroke="#2563eb" stroke-width="1.6"/>
<path d="M 255.2 115 L 257 123.8 L 265.8 121.9" fill="none" stroke="currentColor" stroke-width="1"/>
<text x="287.5" y="144.1" text-anchor="start" font-size="14" fill="#2563eb"><tspan font-style="italic">w</tspan>/2</text>
<line x1="20" y1="165" x2="333" y2="231.5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="220" y1="207.5" x2="308" y2="226.2" stroke="currentColor" stroke-width="3.5"/>
<line x1="275" y1="165" x2="264" y2="216.9" stroke="#2563eb" stroke-width="1.6"/>
<path d="M 255.2 215 L 257 206.2 L 265.8 208.1" fill="none" stroke="currentColor" stroke-width="1"/>
<text x="287.5" y="195.9" text-anchor="start" font-size="14" fill="#2563eb"><tspan font-style="italic">w</tspan>/2</text>
<path d="M 90 165 A 70 70 0 0 0 88.5 150.4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="111.5" y="160.4" text-anchor="middle" font-size="13" fill="currentColor"><tspan font-style="italic">θ</tspan>/2</text>
<path d="M 88.5 179.6 A 70 70 0 0 0 90 165" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="111.5" y="180.6" text-anchor="middle" font-size="13" fill="currentColor"><tspan font-style="italic">θ</tspan>/2</text>
<circle cx="20" cy="165" r="3.5" fill="currentColor"/>
<text x="20" y="153" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">O</tspan></text>
<circle cx="275" cy="165" r="4.5" fill="currentColor"/>
<text x="285" y="170" text-anchor="start" font-size="13" fill="currentColor">you</text>
<text x="205" y="335" text-anchor="middle" font-size="12" fill="currentColor">mirrors (solid), extended to the hinge (dashed)</text>
<line x1="400" y1="290" x2="663" y2="290" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="605" y1="290" x2="645" y2="290" stroke="currentColor" stroke-width="3.5"/>
<line x1="400" y1="290" x2="654" y2="221.9" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="598" y1="236.9" x2="636.7" y2="226.6" stroke="currentColor" stroke-width="3.5"/>
<line x1="400" y1="290" x2="627.8" y2="158.5" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="577.5" y1="187.5" x2="612.2" y2="167.5" stroke="currentColor" stroke-width="2.2" stroke-opacity="0.7"/>
<line x1="400" y1="290" x2="586" y2="104" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="545" y1="145" x2="573.2" y2="116.8" stroke="currentColor" stroke-width="2.2" stroke-opacity="0.7"/>
<line x1="400" y1="290" x2="531.5" y2="62.2" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="502.5" y1="112.5" x2="522.5" y2="77.8" stroke="currentColor" stroke-width="2.2" stroke-opacity="0.7"/>
<line x1="400" y1="290" x2="468.1" y2="36" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="453.1" y1="92" x2="463.4" y2="53.3" stroke="currentColor" stroke-width="2.2" stroke-opacity="0.7"/>
<line x1="400" y1="290" x2="400" y2="27" stroke="currentColor" stroke-width="0.8" stroke-opacity="0.45"/>
<line x1="400" y1="85" x2="400" y2="45" stroke="currentColor" stroke-width="2.2" stroke-opacity="0.7"/>
<path d="M 604.9 297.2 A 205 205 0 0 0 392.8 85.1" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" stroke-opacity="0.45"/>
<path d="M 624.9 297.9 A 225 225 0 0 0 392.1 65.1" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="623.1" y1="260.6" x2="537" y2="111.5" stroke="#2563eb" stroke-width="1.8"/>
<line x1="623.1" y1="260.6" x2="486.1" y2="82.1" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="4 3"/>
<line x1="580" y1="186.1" x2="594.9" y2="177.5" stroke="#2563eb" stroke-width="1.2"/>
<text x="602.9" y="193.5" text-anchor="start" font-size="12" fill="#2563eb">sagitta</text>
<circle cx="607.9" cy="203.9" r="4" fill="#dc2626"/>
<circle cx="578.5" cy="153" r="4" fill="#2563eb"/>
<circle cx="537" cy="111.5" r="4" fill="#dc2626"/>
<circle cx="486.1" cy="82.1" r="4" fill="#2563eb"/>
<circle cx="429.4" cy="66.9" r="4" fill="#dc2626"/>
<text x="546" y="107.5" text-anchor="start" font-size="13" fill="#dc2626">3</text>
<text x="495.1" y="80.1" text-anchor="start" font-size="13" fill="#2563eb">4</text>
<circle cx="623.1" cy="260.6" r="4.5" fill="currentColor"/>
<text x="631.1" y="276.6" text-anchor="start" font-size="13" fill="currentColor">you</text>
<circle cx="400" cy="290" r="3.5" fill="currentColor"/>
<text x="392" y="295" text-anchor="end" font-size="15" fill="currentColor"><tspan font-style="italic">O</tspan></text>
<text x="605" y="308" text-anchor="middle" font-size="13" fill="currentColor"><tspan font-style="italic">D</tspan> − <tspan font-style="italic">a</tspan></text>
<text x="649" y="308" text-anchor="start" font-size="13" fill="currentColor"><tspan font-style="italic">D</tspan> + <tspan font-style="italic">a</tspan></text>
<text x="560" y="335" text-anchor="middle" font-size="12" fill="currentColor">copies of the elevator, each turned by <tspan font-style="italic">θ</tspan></text>
</svg>
</div>

The figure exaggerates the angles, but the geometry is the same at any angle. In the left half, the perpendicular from you to either mirror has length $w/2$. Together with the line from you to $O$, it forms a right triangle whose hypotenuse is $D$ and whose angle at $O$ is $\theta/2$, so $w/2 = D\sin(\theta/2)$. Solving for $D$,

$$
D \;=\; \frac{w}{2\sin(\theta/2)} \;\approx\; 859 \text{ m}.
$$

Since $360°/0.1° = 3600$ is even, mirrors extended all the way to the hinge would form a kaleidoscope with $3600$ sectors and $3599$ images of you, on a circle of radius $859$ m around $O$. Each sector is a copy of the wedge between the two mirrors, with a copy of you at its middle, so neighboring copies are $\theta$ apart around $O$. The circle's circumference is $2\pi \times 859$ m $= 5.4$ km, so neighboring copies are $1.5$ m apart along it, the same spacing as in parallel mirrors $1.5$ m apart.

## The tunnel bends toward the hinge

The real mirrors are much smaller than that. Say each one is $2a = 1$ m wide and centered on you, so its half-width is $a = 0.5$ m. To find which copies you can see, follow the light by **unfolding** the reflections: each time a ray would reflect off a mirror, reflect the whole elevator across that mirror instead, and let the ray continue in a straight line into the reflected elevator. The copies of the elevator fan out around $O$ like the pages of an open book, each turned by $\theta$ from the last, as in the right half of the figure. The copy of you formed by $j$ reflections sits at angle $j\theta$ from you around $O$.

You can see that copy if the straight line from your eye to it passes through every copy of the mirrors that it crosses. Your eye and the copy both lie on the circle of radius $D$, so the line between them is a [chord](https://en.wikipedia.org/wiki/Chord_(geometry)) of that circle. Each copy of a mirror covers the distances from $D - a$ to $D + a$ from $O$. The line from $O$ to the chord's midpoint is perpendicular to the chord and splits the angle $j\theta$ in half, so the midpoint is at distance $D\cos(j\theta/2)$ from $O$. That is the chord's closest approach to $O$. It falls short of $D$ by the chord's [sagitta](https://en.wikipedia.org/wiki/Sagitta_(geometry)), the gap between the chord's midpoint and the circle, which is $D\big(1 - \cos(j\theta/2)\big)$. The chord stays on the mirrors as long as the sagitta is at most $a$:

$$
D\Big(1 - \cos\frac{j\theta}{2}\Big) \le a
\quad\Longleftrightarrow\quad
j \;\le\; \frac{2}{\theta}\arccos\Big(1 - \frac{a}{D}\Big).
$$

For small angles, measured in radians, $\sin u \approx u$ and $1 - \cos u \approx u^2/2$. The first approximation gives $D \approx w/\theta$, and the second turns the condition into $Dj^2\theta^2/8 \le a$, so

$$
j \;\lesssim\; \sqrt{\frac{8a}{D\theta^2}} \;\approx\; \sqrt{\frac{8a}{w\theta}}.
$$

For $a = 0.5$ m, $w = 1.5$ m and $\theta = 0.1°$, this gives $j \le 39$. The $39$th copy is $39 \times 1.5$ m $= 58.5$ m away along the circle, a short step around a circle of radius $859$ m. The sagitta grows like $j^2$, though, and it reaches $a$ at that copy. The lines of sight to deeper copies pass inside the inner edges of the mirror copies and miss them.

The visible copies also drift toward the hinge. Your eye, the $j$-th copy and $O$ form an isosceles triangle with the angle $j\theta$ at $O$, so its other two angles are each $90° - j\theta/2$. Looking straight across the elevator means looking perpendicular to the line from your eye to $O$. The direction to the $j$-th copy therefore turns away from straight across by $j\theta/2$, toward the hinge. Each deeper copy appears a little further toward the side where the mirrors tilt toward each other, and the tunnel bends that way. The deepest visible copy, at $j \approx \sqrt{8a/(w\theta)}$, is at $j\theta/2 \approx \sqrt{2a\theta/w}$ from straight across, which is $1.95°$ for $\theta = 0.1°$. Lee and Hernández-Andrés explain a photograph in which "the ascending 'staircase' of floor images arises because the mirrors' tops are closer than their bases". There the hinge is horizontal and above the elevator, and the tunnel bends up.

In the widget below, the slider sets the tilt $\theta$ from $0.002°$, nearly parallel, up to $45°$, with finer steps at small tilts. The $0.1°$ preset is the elevator above, and larger tilts make the bend easier to see. The elevator is the same as above, $1.5$ m wide with mirrors $1$ m wide and $1.2$ m tall, and you stand midway between them. The left panel is the top view, with both mirrors extended to the hinge. At tilts that divide $180°$ evenly, such as $30°$ and $45°$, it shows a closed kaleidoscope. Red copies come from an odd number of reflections and blue ones from an even number. The right panel is the view from your eye, looking straight across the elevator. The nested frames are the copies of the mirror, and a dot marks each copy of your eye that the frames leave in view.

<div class="ek-widget" style="margin: 1.5rem 0; color: var(--foreground); padding: 1.25rem; border: 1px solid currentColor; border-radius: 8px;"><label style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.95em;">tilt <em>θ</em><input type="range" id="ek-slider" min="0" max="1000" step="1" value="651" style="flex: 1;"></label><div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; font-size: 0.9em;"><button type="button" class="ek-preset" data-t="0.1" style="padding: 0.2rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">0.1°</button><button type="button" class="ek-preset" data-t="1" style="padding: 0.2rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">1°</button><button type="button" class="ek-preset" data-t="10" style="padding: 0.2rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">10°</button><button type="button" class="ek-preset" data-t="45" style="padding: 0.2rem 0.6rem; background: var(--background); color: currentColor; border: 1px solid currentColor; border-radius: 4px; cursor: pointer;">45°</button></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.35rem 1rem; font-size: 0.95em; margin-bottom: 0.9rem;"><span><em>θ</em> = <strong id="ek-theta" style="display: inline-block; min-width: 4.4em;">10.0°</strong></span><span>hinge at <em>D</em> = <strong id="ek-hinge" style="display: inline-block; min-width: 4.8em;">8.61 m</strong></span><span>images if the mirrors met: <strong id="ek-images" style="display: inline-block; min-width: 4.4em;">35</strong></span><span>copies seen in the elevator: <strong id="ek-copies" style="display: inline-block; min-width: 2em;">4</strong></span></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; align-items: start;"><div><div style="font-size: 0.85em; margin-bottom: 0.3rem;">top view, mirrors extended to the hinge <em>O</em></div><svg id="ek-top" viewBox="0 0 300 300" style="width: 100%; height: auto;" aria-label="Top view of two mirrors meeting at the hinge O, with every image of the observer on the circle through the observer centered on O."></svg></div><div><div style="font-size: 0.85em; margin-bottom: 0.3rem;">view from your eye across the elevator</div><svg id="ek-view" viewBox="0 0 360 260" style="width: 100%; height: auto;" aria-label="Perspective view into the mirror: nested frames of the mirror copies bending toward the hinge, with dots at the visible copies of the observer's eye."></svg></div></div><div style="display: flex; flex-wrap: wrap; gap: 0.3rem 1.2rem; margin-top: 0.75rem; font-size: 0.85em;"><span style="white-space: nowrap;"><svg width="10" height="10" viewBox="0 0 10 10" style="display: inline-block; vertical-align: -1px;"><polygon points="9,5 2,1 2,9" fill="currentColor"/></svg> you</span><span style="white-space: nowrap;"><svg width="10" height="10" viewBox="0 0 10 10" style="display: inline-block; vertical-align: -1px;"><circle cx="5" cy="5" r="4" fill="#dc2626"/></svg> mirror-reversed copy (odd)</span><span style="white-space: nowrap;"><svg width="10" height="10" viewBox="0 0 10 10" style="display: inline-block; vertical-align: -1px;"><circle cx="5" cy="5" r="4" fill="#2563eb"/></svg> upright copy (even)</span><span style="white-space: nowrap;"><svg width="18" height="10" viewBox="0 0 18 10" style="display: inline-block; vertical-align: -1px;"><line x1="1" y1="5" x2="17" y2="5" stroke="currentColor" stroke-width="3"/></svg> elevator mirror</span></div><div style="margin-top: 0.5rem; font-size: 0.85em;">Elevator 1.5 m wide with 1 m × 1.2 m mirrors, you midway between them. The right panel's field of view is printed in its corner. At large tilts, most copies lie outside it.</div></div>
<script>
(function () {
  var slider = document.getElementById('ek-slider');
  if (!slider) return;
  var topSvg = document.getElementById('ek-top');
  var viewSvg = document.getElementById('ek-view');
  var oT = document.getElementById('ek-theta');
  var oD = document.getElementById('ek-hinge');
  var oI = document.getElementById('ek-images');
  var oC = document.getElementById('ek-copies');
  var W = 1.5, A = 0.5, H = 0.6;
  var DEG = Math.PI / 180;
  var BLUE = '#2563eb', RED = '#dc2626';
  // The slider position s in [0, 1] maps to the tilt TMIN + (TMAX - TMIN)(64^s - 1)/63
  // degrees: 0.002° at the left end, about 5° at the middle and 45° at the right, so
  // small tilts get fine steps.
  var TMIN = 0.002, TMAX = 45, LB = Math.log(64);
  function toDeg(v) { return TMIN + (TMAX - TMIN) * (Math.exp(LB * v / 1000) - 1) / 63; }
  function toPos(d) { return Math.round(1000 * Math.log(1 + 63 * (d - TMIN) / (TMAX - TMIN)) / LB); }
  function snap(d) {
    if (d < 1) return Math.round(d * 1000) / 1000;
    if (d < 10) return Math.round(d * 100) / 100;
    return Math.round(d * 10) / 10;
  }
  function fmtT(d) { return (d < 1 ? d.toFixed(3) : d < 10 ? d.toFixed(2) : d.toFixed(1)) + '°'; }
  function fmtD(x) {
    if (x >= 10000) return (x / 1000).toFixed(1) + ' km';
    return (x >= 100 ? Math.round(x).toLocaleString('en-US') : x >= 10 ? x.toFixed(1) : x.toFixed(2)) + ' m';
  }
  function pt(p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }
  function cross(a, b, p) { return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); }
  function area(P) {
    var s = 0;
    for (var i = 0; i < P.length; i++) {
      var a = P[i], b = P[(i + 1) % P.length];
      s += a[0] * b[1] - b[0] * a[1];
    }
    return s / 2;
  }
  function lerp(p, q, s) { return [p[0] + s * (q[0] - p[0]), p[1] + s * (q[1] - p[1])]; }
  // Sutherland-Hodgman: clip polygon S by the convex polygon C.
  function clip(S, C) {
    var sg = area(C) > 0 ? 1 : -1, out = S;
    for (var i = 0; i < C.length && out.length; i++) {
      var a = C[i], b = C[(i + 1) % C.length], inp = out;
      out = [];
      for (var k = 0; k < inp.length; k++) {
        var cur = inp[k], prv = inp[(k + inp.length - 1) % inp.length];
        var dc = sg * cross(a, b, cur), dp = sg * cross(a, b, prv);
        if (dc >= 0) {
          if (dp < 0) out.push(lerp(prv, cur, dp / (dp - dc)));
          out.push(cur);
        } else if (dp >= 0) {
          out.push(lerp(prv, cur, dp / (dp - dc)));
        }
      }
    }
    return out;
  }
  function insideConvex(p, C) {
    var sg = area(C) > 0 ? 1 : -1;
    for (var i = 0; i < C.length; i++) {
      if (sg * cross(C[i], C[(i + 1) % C.length], p) < 0) return false;
    }
    return true;
  }
  // Images with the mirrors extended to the hinge, for an object on the bisector:
  // copies at angles j*theta (|j| * theta < 180 deg), plus the opposite point when 180/theta is whole.
  function imageAngles(d) {
    var t = d * DEG, h = 180 / d, r = Math.round(h), js = [];
    for (var j = 1; j * d < 180 - 1e-9; j++) { js.push(j); js.push(-j); }
    if (Math.abs(h - r) < 1e-6) js.push(r);
    return js;
  }
  function drawTop(d, D, js) {
    var t = d * DEG, cx = 150, cy = 140, R = 112;
    function P(psi, r) { return [cx + r * Math.sin(psi), cy + r * Math.cos(psi)]; }
    function tri(psi, sign, fill) {
      var c = P(psi, R), f = [sign * Math.cos(psi), -sign * Math.sin(psi)], n = [Math.sin(psi), Math.cos(psi)];
      var tip = [c[0] + 7 * f[0], c[1] + 7 * f[1]];
      var b1 = [c[0] - 4 * f[0] + 4.5 * n[0], c[1] - 4 * f[1] + 4.5 * n[1]];
      var b2 = [c[0] - 4 * f[0] - 4.5 * n[0], c[1] - 4 * f[1] - 4.5 * n[1]];
      return '<polygon points="' + pt(tip) + ' ' + pt(b1) + ' ' + pt(b2) + '" fill="' + fill + '"/>';
    }
    var s = '';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="3 3"/>';
    var rOut = R * (D + A) / D, rIn = R * (D - A) / D;
    var rExt = Math.max(R + 14, rOut + 4);
    if (360 / d <= 72.0001) {
      for (var k = 1; d / 2 + k * d < 180 - 1e-9; k++) {
        var q1 = P(t / 2 + k * t, rExt), q2 = P(-t / 2 - k * t, rExt);
        s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + q1[0].toFixed(2) + '" y2="' + q1[1].toFixed(2) + '" stroke="currentColor" stroke-opacity="0.18"/>';
        s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + q2[0].toFixed(2) + '" y2="' + q2[1].toFixed(2) + '" stroke="currentColor" stroke-opacity="0.18"/>';
      }
    }
    [1, -1].forEach(function (sg) {
      var e = P(sg * t / 2, rExt), i0 = P(sg * t / 2, rIn), o0 = P(sg * t / 2, rOut);
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + e[0].toFixed(2) + '" y2="' + e[1].toFixed(2) + '" stroke="currentColor" stroke-width="1"/>';
      s += '<line x1="' + i0[0].toFixed(2) + '" y1="' + i0[1].toFixed(2) + '" x2="' + o0[0].toFixed(2) + '" y2="' + o0[1].toFixed(2) + '" stroke="currentColor" stroke-width="3.5"/>';
    });
    var n = js.length;
    if (n <= 40) {
      js.forEach(function (j) {
        var odd = Math.abs(j) % 2 === 1;
        s += tri(j * t, odd ? -1 : 1, odd ? RED : BLUE);
      });
    } else if (n <= 1500) {
      var rd = Math.max(0.7, Math.min(2.5, 250 / n));
      js.forEach(function (j) {
        var c = P(j * t, R);
        s += '<circle cx="' + c[0].toFixed(2) + '" cy="' + c[1].toFixed(2) + '" r="' + rd.toFixed(2) + '" fill="' + (Math.abs(j) % 2 ? RED : BLUE) + '"/>';
      });
    } else {
      s += '<text x="' + cx + '" y="' + (cy - 40) + '" text-anchor="middle" font-size="11" fill="currentColor">copies too dense to draw</text>';
    }
    s += tri(0, 1, 'currentColor');
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.5" fill="currentColor"/>';
    s += '<text x="' + (cx + 7) + '" y="' + (cy - 6) + '" font-size="12" font-style="italic" fill="currentColor">O</text>';
    s += '<text x="' + cx + '" y="' + (cy + R + 28) + '" text-anchor="middle" font-size="11" fill="currentColor">you</text>';
    topSvg.innerHTML = s;
  }
  function drawView(d, D) {
    var t = d * DEG, cu = 180, cv = 130;
    var hf = Math.min(25 * DEG, 2.6 * Math.sqrt(2 * A * t / W));
    var F = cu / Math.tan(hf);
    var ch = Math.cos(t / 2), sh = Math.sin(t / 2);
    var Ex = D * ch, Ey = D * sh;
    // Eye on the bisector at distance D from O, looking along the tangent toward the second mirror.
    function proj(X, Y, Z) {
      var dx = X - Ex, dy = Y - Ey;
      var zc = -dx * sh + dy * ch, xc = dx * ch + dy * sh;
      return [cu + F * xc / zc, cv - F * Z / zc, zc];
    }
    var big = 1e6, prev = [[-big, -big], [big, -big], [big, big], [-big, big]], aps = [];
    for (var j = 1; j <= 3000; j++) {
      var b = j * t, cb = Math.cos(b), sb = Math.sin(b);
      var c4 = [proj((D - A) * cb, (D - A) * sb, H), proj((D + A) * cb, (D + A) * sb, H), proj((D + A) * cb, (D + A) * sb, -H), proj((D - A) * cb, (D - A) * sb, -H)];
      var ok = true;
      for (var k = 0; k < 4; k++) if (c4[k][2] <= 1e-3) ok = false;
      if (!ok) break;
      var ap = clip(c4.map(function (p) { return [p[0], p[1]]; }), prev);
      if (ap.length < 3 || Math.abs(area(ap)) < 1e-6) break;
      aps.push(ap);
      prev = ap;
    }
    var copies = [];
    for (var m = 1; m <= aps.length; m++) {
      var g = t / 2 + m * t, p = proj(D * Math.cos(g), D * Math.sin(g), 0);
      if (p[2] > 0 && insideConvex([p[0], p[1]], aps[m - 1])) copies.push([m, p]);
    }
    var s = '<defs>';
    copies.forEach(function (c) {
      s += '<clipPath id="ek-c' + c[0] + '"><polygon points="' + aps[c[0] - 1].map(pt).join(' ') + '"/></clipPath>';
    });
    s += '</defs>';
    // Fade the outlines when the frames crowd together at small tilts.
    var so = (0.45 * Math.min(1, 40 / Math.max(1, aps.length))).toFixed(3);
    aps.forEach(function (ap, i) {
      s += '<polygon points="' + ap.map(pt).join(' ') + '" style="fill: var(' + (i % 2 ? '--background' : '--muted') + ');" stroke="currentColor" stroke-opacity="' + so + '" stroke-width="0.7"/>';
    });
    var rd = Math.max(0.8, Math.min(4, 0.32 * F * Math.tan(t / 2)));
    for (var q = copies.length - 1; q >= 0; q--) {
      var c = copies[q];
      s += '<circle cx="' + c[1][0].toFixed(2) + '" cy="' + c[1][1].toFixed(2) + '" r="' + rd.toFixed(2) + '" fill="' + (c[0] % 2 ? RED : BLUE) + '" clip-path="url(#ek-c' + c[0] + ')"/>';
    }
    s += '<line x1="' + (cu - 6) + '" y1="' + cv + '" x2="' + (cu + 6) + '" y2="' + cv + '" stroke="currentColor" stroke-width="1"/>';
    s += '<line x1="' + cu + '" y1="' + (cv - 6) + '" x2="' + cu + '" y2="' + (cv + 6) + '" stroke="currentColor" stroke-width="1"/>';
    s += '<text x="8" y="16" font-size="11" fill="currentColor">← toward the hinge</text>';
    s += '<text x="352" y="252" text-anchor="end" font-size="11" fill="currentColor">field of view ' + (2 * hf / DEG).toFixed(1) + '°</text>';
    viewSvg.innerHTML = s;
    return copies.length;
  }
  function render(d) {
    var t = d * DEG, D = W / (2 * Math.sin(t / 2)), js = imageAngles(d);
    oT.textContent = fmtT(d);
    oD.textContent = fmtD(D);
    oI.textContent = js.length.toLocaleString('en-US');
    drawTop(d, D, js);
    oC.textContent = drawView(d, D);
  }
  slider.addEventListener('input', function () { render(snap(toDeg(parseInt(slider.value, 10)))); });
  Array.prototype.forEach.call(document.querySelectorAll('.ek-preset'), function (btn) {
    btn.addEventListener('click', function () {
      var d = parseFloat(btn.getAttribute('data-t'));
      slider.value = toPos(d);
      render(d);
    });
  });
  // Start at exactly 10°, which the slider's grid of positions misses by a hair.
  slider.value = toPos(10);
  render(10);
})();
</script>

The tunnel also fades. If each reflection keeps a fraction $R$ of the light, the $j$-th copy is $R^j$ times as bright as you, which is $1.6\%$ for $R = 0.9$ and $j = 39$. Lee and Hernández-Andrés found that the copies also turn greener with depth, and they trace this to the glass in front of the metal layer of an ordinary mirror.

## Reading the tilt off a photograph

All copies of your eye lie on the circle through it centered on $O$. The [inscribed angle theorem](https://en.wikipedia.org/wiki/Inscribed_angle) says that two points on a circle, seen from a third point on the same circle, are separated by half the angle that they span at the center.

<div style="margin: 1.5rem auto; max-width: 760px; color: var(--foreground);">
<svg viewBox="0 0 760 270" role="img" aria-label="Left: a circle centered on O with your eye and two consecutive copies on it. The copies are 2 theta apart as seen from O and theta apart as seen from your eye. Right: a ray at angle alpha to the camera axis passes through the lens and lands f tan alpha from the center of the image, where f is the distance from the lens to the image." style="width: 100%; height: auto; display: block;">
<path d="M 255 140 A 105 105 0 1 0 255 140.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="150" y1="140" x2="210.2" y2="54" stroke="currentColor" stroke-width="1.2"/>
<line x1="150" y1="140" x2="131.8" y2="36.6" stroke="currentColor" stroke-width="1.2"/>
<line x1="48.6" y1="112.8" x2="210.2" y2="54" stroke="#2563eb" stroke-width="1.4"/>
<line x1="48.6" y1="112.8" x2="131.8" y2="36.6" stroke="#2563eb" stroke-width="1.4"/>
<path d="M 165 114 A 30 30 0 0 0 142.2 111" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="155.9" y="100.4" text-anchor="middle" font-size="14" fill="currentColor">2<tspan font-style="italic">θ</tspan></text>
<path d="M 97.4 95 A 52 52 0 0 0 86.9 77.7" fill="none" stroke="#2563eb" stroke-width="1.6"/>
<text x="105" y="83.6" text-anchor="middle" font-size="14" fill="#2563eb"><tspan font-style="italic">θ</tspan></text>
<circle cx="210.2" cy="54" r="4" fill="#dc2626"/>
<circle cx="131.8" cy="36.6" r="4" fill="#dc2626"/>
<circle cx="48.6" cy="112.8" r="4.5" fill="currentColor"/>
<circle cx="150" cy="140" r="3.5" fill="currentColor"/>
<text x="160" y="146" text-anchor="start" font-size="15" fill="currentColor"><tspan font-style="italic">O</tspan></text>
<text x="52.6" y="136.8" text-anchor="middle" font-size="13" fill="currentColor">your eye</text>
<text x="218.2" y="50" text-anchor="start" font-size="13" fill="#dc2626">copy</text>
<text x="123.8" y="32.6" text-anchor="end" font-size="13" fill="#dc2626">next copy</text>
<line x1="390" y1="140" x2="650" y2="140" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" stroke-opacity="0.45"/>
<line x1="650" y1="30" x2="650" y2="250" stroke="currentColor" stroke-width="2.5"/>
<text x="658" y="26" text-anchor="start" font-size="12" fill="currentColor">image</text>
<line x1="370" y1="166.7" x2="650" y2="42" stroke="#2563eb" stroke-width="1.6"/>
<circle cx="430" cy="140" r="3.5" fill="currentColor"/>
<text x="426" y="160" text-anchor="middle" font-size="12" fill="currentColor">lens</text>
<path d="M 478 140 A 48 48 0 0 0 473.9 120.5" fill="none" stroke="#2563eb" stroke-width="1.5"/>
<text x="490.6" y="132.1" text-anchor="middle" font-size="14" fill="#2563eb"><tspan font-style="italic">α</tspan></text>
<text x="540" y="160" text-anchor="middle" font-size="15" fill="currentColor"><tspan font-style="italic">f</tspan></text>
<line x1="664" y1="140" x2="664" y2="42" stroke="currentColor" stroke-width="1.2"/>
<line x1="660" y1="140" x2="668" y2="140" stroke="currentColor" stroke-width="1.2"/>
<line x1="660" y1="42" x2="668" y2="42" stroke="currentColor" stroke-width="1.2"/>
<text x="672" y="96" text-anchor="start" font-size="14" fill="currentColor"><tspan font-style="italic">f</tspan> tan <tspan font-style="italic">α</tspan></text>
<circle cx="650" cy="42" r="3.5" fill="#2563eb"/>
</svg>
</div>

Consecutive copies that face you, formed by $1, 3, 5, \ldots$ reflections, are $2\theta$ apart around $O$. Seen from your eye, they are therefore exactly $\theta$ apart, wherever you stand between the mirrors and however far away $O$ is. In a photograph taken by a camera held between the mirrors, the copies of the camera's lens form a row, each one $\theta$ further toward the hinge than the last. With parallel mirrors, the copies line up straight ahead, each hidden behind the one in front.

To turn the photograph into an angle, use the [pinhole camera model](https://en.wikipedia.org/wiki/Pinhole_camera_model). A camera sends light that arrives at angle $\alpha$ from the center of its view to a point $f\tan\alpha$ from the center of the image, where $f$ is the camera's focal length, measured in pixels. Suppose the image is $4000$ pixels wide and covers a $70°$ field of view. Its edge, $2000$ pixels from the center, is at $\alpha = 35°$, so $f = 2000/\tan 35° \approx 2856$ pixels. A tilt of $\theta = 0.1°$ then puts consecutive facing copies about $f\tan\theta \approx 5.0$ pixels apart near the center of the image. In reverse, $\tan\theta \approx \theta$ for small angles in radians, so dividing the measured spacing by $f$ gives $\theta$ in radians. The direction of the row gives the orientation of the hinge. It is a horizontal row for mirrors turned about a vertical line, and a vertical row for a mirror that leans forward or back, as in the staircase photograph.
