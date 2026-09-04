/**
 * The Cessna 172 silhouette, used everywhere this app draws an aircraft: the
 * marker that flies the route, the header mark, the favicon and the home-screen
 * icons.
 *
 * Drawn in a 24x24 viewBox, symmetric about x=12 and pointing straight up — so
 * a compass bearing applies as a rotation with no offset.
 *
 * Machine-traced from a top-down photographic silhouette (the source image
 * isn't kept — this path is), so the proportions are the real aircraft's:
 * straight constant-chord wings, a fuselage tapering to the rudder, the
 * propeller as a bar across the nose. The trace reads each scanline's ink span
 * as a half-width about the axis (the source is symmetric to within 1px),
 * simplifies that profile with Ramer-Douglas-Peucker at 0.06 units, and mirrors
 * it — which is why the two sides match exactly.
 *
 * Two deliberate departures from the source. The propeller is 2px tall there,
 * 0.1 units here, which is under a fifth of a pixel at the size this renders,
 * so it's drawn as a 0.55-unit bar — grown downward from its true position so
 * the spinner still pokes out in front of it. And the wing stops 0.42 from each
 * edge rather than filling the box, keeping the tips off the viewBox boundary.
 *
 * public/icon.svg holds a copy of this path with the theme colours baked to
 * literals, because an icon file can't read CSS custom properties, and the PNG
 * icons are rasterised from that file. Changing the geometry here means
 * regenerating those.
 */
export const C172_PATH = [
  "M12 3.83", // spinner tip
  "L12.12 4.08 L14.14 4.08 L14.14 4.63 L12.75 4.63", // propeller, right half
  "L12.94 4.87 L13.09 7.45", // cowling and cabin, down to the wing root
  "L22.68 7.7 L23.3 7.75 L23.48 7.85 L23.58 8.05 L23.58 10.19", // right wing
  "L17.09 11.13 L12.94 11.23", // right trailing edge, back to the fuselage
  "L12.35 16.4", // fuselage tapering aft
  "L15.43 17.04 L15.53 17.29 L15.53 18.14 L15.43 18.43 L15.23 18.58 L12.15 18.98", // right tailplane
  "L12 20.12", // rudder
  "L11.85 18.98 L8.77 18.58 L8.57 18.43 L8.47 18.14 L8.47 17.29 L8.57 17.04 L11.65 16.4", // left tailplane
  "L11.06 11.23 L6.91 11.13", // left trailing edge
  "L0.42 10.19 L0.42 8.05 L0.52 7.85 L0.7 7.75 L1.32 7.7 L10.91 7.45", // left wing
  "L11.06 4.87 L11.25 4.63", // left cowling
  "L9.86 4.63 L9.86 4.08 L11.88 4.08", // propeller, left half
  "Z",
].join(" ");
