import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * EGM96 geoid heights, worldwide.
 *
 * ADS-B reports geometric altitude as height above the WGS84 *ellipsoid*, a
 * smooth mathematical figure that the sea does not actually follow. Altimeters,
 * charts, field elevations and KML's `altitudeMode: absolute` are all against
 * mean sea level — the geoid. The gap between the two surfaces is what this
 * looks up, and it is emphatically not a constant: -33.9 m over Princeton,
 * -37.2 m over Toronto, -20.0 m over Vancouver, and +46.3 m over London, where
 * it changes sign. Using one number would put a NJ flight right and a Canadian
 * one 11-45 ft out.
 *
 * Data: EGM96 from NGA (US government, public domain), as packaged in
 * GeographicLib's egm96-15 grid, resampled from 15' to 0.5' and stored as
 * decimetres, row-delta coded, gzipped — 162 KB for the whole planet. Against
 * the full-resolution grid this costs at most 5.3 ft anywhere on Earth and
 * 0.4 ft RMS, which is comfortably inside the 25 ft quantisation ADS-B applies
 * to geometric altitude before it ever reaches us.
 *
 * Dev-only, like everything else in scripts/: the correction is baked into each
 * KML at import, so nothing here ships to the browser.
 */

const COLS = 720; // 0.5 deg of longitude per column, from 0 deg east, wrapping
const ROWS = 361; // 0.5 deg of latitude per row, from +90 at row 0 down to -90
const DECIMETRES_PER_METRE = 10;
const METRES_TO_FEET = 3.28084;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let grid = null;

function load() {
  if (grid) return grid;
  const packed = gunzipSync(
    readFileSync(path.join(__dirname, "egm96-halfdeg.bin.gz")),
  );
  const deltas = new Int16Array(
    packed.buffer,
    packed.byteOffset,
    packed.byteLength / Int16Array.BYTES_PER_ELEMENT,
  );

  // Each row is stored as differences from its own previous sample, which is
  // what makes a smooth global field compress to a sixth of its raw size.
  grid = new Float32Array(COLS * ROWS);
  for (let y = 0; y < ROWS; y++) {
    let running = 0;
    for (let x = 0; x < COLS; x++) {
      const i = y * COLS + x;
      running += deltas[i];
      grid[i] = running / DECIMETRES_PER_METRE;
    }
  }
  return grid;
}

/**
 * Geoid height N in metres: how far mean sea level sits above the ellipsoid,
 * negative over most of the Americas. Bilinear, wrapping in longitude and
 * clamping at the poles.
 */
export function geoidHeightM(lat, lon) {
  const g = load();
  const fx = (((lon % 360) + 360) % 360) / 0.5;
  const fy = (90 - Math.min(90, Math.max(-90, lat))) / 0.5;
  const x0 = Math.floor(fx);
  const y0 = Math.min(ROWS - 2, Math.max(0, Math.floor(fy)));
  const dx = fx - x0;
  const dy = fy - y0;
  const at = (x, y) => g[y * COLS + (((x % COLS) + COLS) % COLS)];
  return (
    at(x0, y0) * (1 - dx) * (1 - dy) +
    at(x0 + 1, y0) * dx * (1 - dy) +
    at(x0, y0 + 1) * (1 - dx) * dy +
    at(x0 + 1, y0 + 1) * dx * dy
  );
}

/**
 * Height above the ellipsoid -> height above mean sea level, in feet.
 *
 * H = h - N, the defining relation between the two.
 */
export function ellipsoidToMslFt(haeFt, lat, lon) {
  return haeFt - geoidHeightM(lat, lon) * METRES_TO_FEET;
}
