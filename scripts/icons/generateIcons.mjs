import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Builds the site's icons from the portrait: the browser-tab favicon, the iOS
 * home-screen icon, and the two sizes the web manifest lists for Android.
 *
 * The portrait file is a pencil sketch on a transparent ground, so every icon
 * gives it the sand theme's cream ground. Left transparent, iOS fills an icon
 * with black and the dark strokes of the hair disappear into it.
 *
 * Run with `pnpm icons` whenever src/assets/images/dp.png changes. The outputs
 * are committed; nothing in the build depends on this script.
 */

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const PORTRAIT = path.join(ROOT, "src/assets/images/dp.png");
const OUT = path.join(ROOT, "public");

// Sand theme, from src/styles/global.css.
const CREAM = "#fdfaef"; // sand-light --background
const GOLD = "#e6b64a"; // sand-dark --accent

/**
 * Where the head is in the portrait, as fractions of its width: the centre of
 * a circle that takes in the hair, the ears and the chin, and its radius.
 * Both icons are framed from this rather than from the image's own centre,
 * which sits on the collar.
 */
const HEAD = { cx: 0.425, cy: 0.34, r: 0.31 };

/**
 * The portrait on a cream square of `size` px, scaled so the head circle has
 * radius `headR` (a fraction of the square) and sits at (`cx`, `cy`). Parts of
 * the portrait that fall outside the square are cropped; parts of the square
 * it doesn't reach stay cream.
 */
async function framed(size, { headR, cx, cy }) {
  const width = Math.round((size * headR) / HEAD.r);
  const left = Math.round(size * cx - width * HEAD.cx);
  const top = Math.round(size * cy - width * HEAD.cy);

  // The slice of the scaled portrait that lands inside the square.
  const x0 = Math.max(0, -left);
  const y0 = Math.max(0, -top);
  const w = Math.min(width - x0, size - Math.max(0, left));
  const h = Math.min(width - y0, size - Math.max(0, top));

  const slice = await sharp(PORTRAIT)
    .resize(width, width)
    .extract({ left: x0, top: y0, width: w, height: h })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: CREAM },
  })
    .composite([
      { input: slice, left: Math.max(0, left), top: Math.max(0, top) },
    ])
    .png()
    .toBuffer();
}

/**
 * Browser tab: the head in a circle with a ring in the accent around it, the
 * same construction as the avatar in the flights app. Transparent outside the
 * ring, so the tab strip's own colour shows there.
 */
async function favicon(size) {
  // Ring width as a share of the diameter, as on that avatar (2px on 30px).
  const ring = Math.max(1, Math.round(size * 0.06));
  const inner = size - 2 * ring;
  const r = inner / 2;
  const c = size / 2;

  const disc = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${inner}" height="${inner}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
  );
  const head = await sharp(
    await framed(inner, { headR: 0.44, cx: 0.5, cy: 0.5 }),
  )
    .composite([{ input: disc, blend: "dest-in" }])
    .png()
    .toBuffer();

  const ringSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${c}" cy="${c}" r="${c}" fill="${GOLD}"/></svg>`,
  );
  return sharp(ringSvg)
    .composite([{ input: head, left: ring, top: ring }])
    .png()
    .toBuffer();
}

/**
 * Home screens: a full-bleed square, with no shape of its own. The launcher
 * supplies the shape (iOS rounds the corners; Android masks to a circle,
 * squircle or rounded square), so anything drawn inside the square, a circle
 * or a frame, would leave filler around it or get cut by the mask.
 *
 * Android only guarantees to keep the central circle of radius 0.4, so the
 * head circle is sized to 0.38 and set just above the middle, leaving the
 * shoulders to fill the bottom edge. Horizontally it is the portrait, not the
 * head, that is centred, as on the home page: the shoulders sit square in the
 * tile and the head keeps its lean to the left.
 */
function tile(size) {
  const headR = 0.38;
  const scale = headR / HEAD.r; // portrait width as a fraction of the tile
  return framed(size, {
    headR,
    cx: 0.5 + (HEAD.cx - 0.5) * scale,
    cy: 0.47,
  });
}

const files = {
  "favicon.png": await favicon(96),
  "apple-touch-icon.png": await tile(180),
  "icon-192.png": await tile(192),
  "icon-512.png": await tile(512),
};
for (const [name, data] of Object.entries(files)) {
  await writeFile(path.join(OUT, name), data);
}

// display is "browser", not "standalone": this is a site of pages and
// outbound links, and standalone would strip the address bar and back button
// from someone who opened it from their home screen.
const manifest = {
  name: "Aseem Raj Baranwal",
  short_name: "Aseem",
  start_url: "/",
  display: "browser",
  background_color: CREAM,
  theme_color: CREAM,
  icons: [192, 512].map((s) => ({
    src: `/icon-${s}.png`,
    type: "image/png",
    sizes: `${s}x${s}`,
    purpose: "any maskable",
  })),
};
await writeFile(
  path.join(OUT, "manifest.webmanifest"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
