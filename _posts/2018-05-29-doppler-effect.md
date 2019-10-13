---
layout: mathpost
title: An analogy for the Doppler effect
category: learning
---

Some time back I was at home and was reading through the *[L.D. Landau & E.M. Lifshitz The Classical Theory of Fields](https://archive.org/details/TheClassicalTheoryOfFields)* where I came across *relativistic Doppler effect* (which is the classical Doppler effect with laws of special relativity taken into consideration). Mom was sitting beside me when she suddenly peeked at what I was reading and asked *"What is the Doppler effect?"*.

I remember when I first studied the Doppler effect in secondary school and my physics teacher presented it as just an equation to be memorized. On asking where it came from I was told that it is beyond the scope of current syllabus and that I will learn it later during higher studies. Because I hate memorizing formulas and equations, this bugged me. The school library did not have any physics books above the level of our syllabus scope as the school was only up to the secondary level, but I could find some applications of Doppler effect listed in one of the books:
- Used in some types of [radars](https://en.wikipedia.org/wiki/Doppler_radar) to measure velocities of discovered objects
- Used by astronomers to compute the velocities at which stars and galaxies move relative to each other ([redshift](https://en.wikipedia.org/wiki/Redshift)/[blueshift](https://en.wikipedia.org/wiki/Blueshift))
- Used for taking a surface's [vibration measurements](https://en.wikipedia.org/wiki/Laser_Doppler_vibrometer)

It was only quite later that I realized why the effect exists. So I wanted my mom to realize it in the first go. To do that, I did not introduce any equations or tell her about any applications whatsoever. She is not familiar with terms like ***frequency***, ***relative motion***, *etc.* so I used a simple visual analogy of a person throwing balls towards another person.

---

#### The analogy
Two friends Alice and Bob are playing with a ball. Alice is throwing balls straight towards Bob with a **constant velocity** and at a **constant rate** *(I had to tell my mom that the rate at which something happens is fancily called the frequency, so practically in this case frequency is the answer to the question **"How many in a second?"**).* Now let's take the following setup and known things where **all speeds are in m/s, time is in seconds and distance is in meters** and we shall derive the classical Doppler effect from there:
- The speed at which Alice throws the ball = $$c$$ meters/s
- The rate of throwing the balls = $$f$$ balls per second (frequency f Hz)
- Time instant at which Alice throws the first ball: $$t = 0s$$
- Initial displacement between Alice and Bob = $$d$$ meters
- If Alice throws $$f$$ balls in one second, The time gap between two consecutive throws is $$1/f$$ seconds
- Speed = Distance covered per unit time

Initially both Alice and Bob are **not moving**. *What is the rate at which Bob receives the balls?* To see this arithmetically:

| **Time instant (seconds)**             | **Event**                        |
| -------------------------------------- | -------------------------------- |
| $$t_1 = 0$$                            | Alice throws the first ball      |
| **$$t_2 = \frac{d}{c}$$**              | **Bob receives the first ball**  |
| $$t_3 = \frac{1}{f}$$                  | Alice throws the second ball     |
| **$$t_4 = \frac{1}{f} + \frac{d}{c}$$**| **Bob receives the second ball** |

The time gap between two consecutive receive events ($$t_4 - t_2$$) is $$\frac{1}{f}$$ seconds which is the same as the time gap between two consecutive send events. Hence the rate at which Alice throws and the rate at which Bob receives are the same which is **$$f$$ balls per second**.

***<u>Now what happens when things start moving?</u>***
<br>
When I asked this question to my mom, her face immediately lit up. Intuition kicked in and she blurted out *"If Alice is moving closer to Bob then Bob will receive the balls at a faster rate than Alice is throwing them."* My job was done here, she was happy and convinced about how and why Doppler effect works but I went ahead to tell her about relative velocities, applications of the Doppler effect in astronomy, *etc.* and how when whistling trains approach us we get a higher pitch sound while a lower pitch sound when they are moving away from us, so essentially the brain also applies the Doppler effect to know about approaching and receding objects.

---

#### Closure
For closure let's look at what happens when
- **Alice (in red) is moving towards Bob (in blue) with speed `a m/s`** and
- **Bob is moving away from Alice with speed `b m/s`**.

<svg height="138" width="490">
   <defs>
      <marker id="triangle" viewBox="0 0 14 14" refX="0" refY="5" markerUnits="strokeWidth" markerWidth="10" markerHeight="10" orient="auto">
         <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
   </defs>
   <path d="M 24 8 A 16 16 0 0 0 12 16" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 36 16 A 16 16 0 0 0 24 8" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 400 8 A 16 16 0 0 0 388 16" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 412 16 A 16 16 0 0 0 400 8" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 12 16 A 16 16 0 0 0 12 32" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 36 32 A 16 16 0 0 0 36 16" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 388 16 A 16 16 0 0 0 388 32" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 412 32 A 16 16 0 0 0 412 16" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 12 32 A 16 16 0 0 0 24 40" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 24 40 A 16 16 0 0 0 36 32" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 90 40 A 5 5 0 0 0 85 45" stroke="gray" stroke-width="10" fill="transparent"></path>
   <path d="M 94 45 A 5 5 0 0 0 89 40" stroke="gray" stroke-width="10" fill="transparent" />
   <path d="M 85 44 A 5 5 0 0 0 90 49" stroke="gray" stroke-width="10" fill="transparent" />
   <path d="M 89 49 A 5 5 0 0 0 94 44" stroke="gray" stroke-width="10" fill="transparent" />
   <text x="110" y="44" style="font-size:14px;font-family:monospace">c m/s</text>
   <path d="M 388 32 A 16 16 0 0 0 400 40" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 400 40 A 16 16 0 0 0 404 48" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 400 48 A 16 16 0 0 0 408 48" stroke="blue" stroke-width="2" fill="transparent" />
   <path d="M 400 40 A 16 16 0 0 0 412 32" stroke="blue" stroke-width="2" fill="transparent" />
   <line x1="16" x2="24" y1="64" y2="48" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <path d="M 24 48 A 16 16 0 0 0 32 48" stroke="red" stroke-width="2" fill="transparent" />
   <path d="M 24 40 A 16 16 0 0 0 28 48" stroke="red" stroke-width="2" fill="transparent" />
   <line x1="28" x2="28" y1="48" y2="64" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="32" x2="40" y1="48" y2="64" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="112" x2="120" y1="56" y2="56" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="120" x2="128" y1="56" y2="56" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="128" x2="132" y1="56" y2="56" style="stroke: rgb(0,0,0);stroke-width:1" marker-end="url(#triangle)" />
   <line x1="392" x2="400" y1="64" y2="48" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="404" x2="404" y1="48" y2="64" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="408" x2="416" y1="48" y2="64" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <path d="M 28 68 A 16 16 0 0 0 30 76" stroke="red" stroke-width="2" fill="transparent" />
   <line x1="28" x2="28" y1="64" y2="68" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="32" x2="30" y1="80" y2="76" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <text x="200" y="76" style="font-size:14px;font-family:monospace">d meters</text>
   <path d="M 402 76 A 16 16 0 0 0 404 68" stroke="blue" stroke-width="2" fill="transparent" />
   <line x1="404" x2="404" y1="64" y2="68" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="400" x2="402" y1="80" y2="76" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="24" x2="32" y1="96" y2="80" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="32" x2="40" y1="80" y2="96" stroke="rgb(250,0,0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="56" x2="52" y1="88" y2="88" style="stroke: rgb(0,0,0);stroke-width:1" marker-end="url(#triangle)"></line>
   <line x1="52" x2="378" y1="88" y2="88" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter"></line>
   <line x1="378" x2="382" y1="88" y2="88" style="stroke: rgb(0,0,0);stroke-width:1" marker-end="url(#triangle)"></line>
   <line x1="392" x2="400" y1="96" y2="80" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="400" x2="408" y1="80" y2="96" stroke="rgb(0,0,250)" stroke-width="2" stroke-linecap="round" stroke-linejoin="mitter" />
   <text y="124" style="font-size:14px;font-family:monospace">a m/s</text>
   <line x1="48" x2="56" y1="120" y2="120" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="56" x2="64" y1="120" y2="120" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="64" x2="68" y1="120" y2="120" style="stroke: rgb(0,0,0);stroke-width:1" marker-end="url(#triangle)" />
   <text x="376" y="124" style="font-size:14px;font-family:monospace">b m/s</text>
   <line x1="426" x2="434" y1="120" y2="120" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="434" x2="442" y1="120" y2="120" stroke="rgb(0,0,0)" stroke-width="1" stroke-linecap="round" stroke-linejoin="mitter" />
   <line x1="442" x2="446" y1="120" y2="120" style="stroke: rgb(0,0,0);stroke-width:1" marker-end="url(#triangle)" />
</svg>

#### Observations
- If Alice throws the first ball at $$t_1 = 0$$, then to compute the time instant at which the ball reached Bob we also need to consider how much farther Bob went during the process. Hence if Bob receives the first ball at $$t_2$$, then:<br>
$$ct_2 = d + bt_2$$ ... where $$bt_2$$ is the extra distance covered by Bob
- When Alice throws the second ball, she has already moved some distance which needs to be taken into account.

Now the events table looks like this (work it out yourself if you want)

| **Time instant (seconds)**               | **Event**                        |
| ---------------------------------------- | -------------------------------- |
| $$t_1 = 0$$                              | Alice throws the first ball      |
| **$$t_2 = \frac{d}{c-b}$$**              | **Bob receives the first ball**  |
| $$t_3 = \frac{1}{f}$$                    | Alice throws the second ball     |
| **$$t_4 = \frac{d}{c-b} + \frac{1}{f}\left(\frac{c-a}{c-b}\right)$$**  | **Bob receives the second ball** |

Here the time gap between two consecutive receive events is $$t_4 - t_2 = \frac{1}{f}\left(\frac{c-a}{c-b}\right)$$ seconds which is not the same as the time gap between two consecutive send events. Alice throws $$f$$ balls per second. But Bob receives $$f*\left(\frac{c-b}{c-a}\right)$$ balls per second.

As clearly depicted by the equation, if Alice's velocity towards Bob increase then Bob will receive more balls per second, whereas if Bob's speed away from Alice increases then Bob will receive fewer balls per second. The same thing happens with sound waves when we hear a moving train's horn. We are Bob and the train is Alice.
