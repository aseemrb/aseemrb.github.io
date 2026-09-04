/**
 * Where the logbook's data files are served from.
 *
 * They live in public/flights/data/ so the site serves them beside the /flights
 * page. `rel` is a path relative to that directory: "flights.json", or a track
 * in the form flights.json's `track` field uses, "tracks/2026-07-25-n739wr.kml".
 * The server-side scripts resolve the same directory from scripts/flights/lib/flightsStore.mjs.
 */
export const DATA_BASE = "/flights/data/";

export function dataUrl(rel: string): string {
  return `${DATA_BASE}${rel}`;
}
