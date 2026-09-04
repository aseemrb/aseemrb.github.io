import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Repository root: this file sits in scripts/flights/lib/. */
export const ROOT = path.resolve(__dirname, "../../..");
/** Served at /flights/data/ — keep in step with src/flights/lib/dataUrl.ts. */
export const DATA_DIR = path.join(ROOT, "public/flights/data");
export const TRACKS_DIR = path.join(DATA_DIR, "tracks");
export const FLIGHTS_JSON = path.join(DATA_DIR, "flights.json");

export async function readFlights() {
  try {
    return JSON.parse(await readFile(FLIGHTS_JSON, "utf8"));
  } catch {
    return [];
  }
}

export async function writeFlights(flights) {
  const sorted = [...flights].sort(
    (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  );
  await writeFile(FLIGHTS_JSON, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  return sorted;
}

/** Builds a unique flights.json id, appending -2, -3, ... on collision. */
export function makeId(date, aircraft, taken) {
  const base = `${date}-${aircraft.toLowerCase()}`;
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
