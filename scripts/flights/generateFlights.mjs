import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOMParser } from "@xmldom/xmldom";
import { kml } from "@tmcw/togeojson";
import {
  TRACKS_DIR,
  readFlights,
  writeFlights,
  makeId,
} from "./lib/flightsStore.mjs";

function flattenTimes(coordTimes) {
  if (!Array.isArray(coordTimes)) return [];
  return Array.isArray(coordTimes[0]) ? coordTimes.flat() : coordTimes;
}

async function extractFlightInfo(filePath) {
  const xml = await readFile(filePath, "utf8");
  const dom = new DOMParser().parseFromString(xml, "text/xml");
  const geojson = kml(dom);
  const feature = geojson.features[0];
  if (!feature) return null;

  const aircraft = String(feature.properties?.name ?? "").trim();
  // @tmcw/togeojson nests per-point timestamps here, not at properties.coordTimes.
  const times = flattenTimes(feature.properties?.coordinateProperties?.times);
  if (!aircraft || times.length === 0) return null;

  const first = new Date(times[0]).getTime();
  const last = new Date(times[times.length - 1]).getTime();

  return {
    aircraft,
    date: times[0].slice(0, 10),
    durationMin: Math.round((last - first) / 60000),
  };
}

/**
 * Scans public/logbook/data/tracks for .kml files with no matching entry in flights.json
 * and appends a best-guess entry for each (aircraft/date/duration read straight
 * from the track; from/to/kind/notes defaulted for the user to correct by hand).
 * Never touches existing entries.
 */
export async function generateFlights({ log = () => {} } = {}) {
  const existing = await readFlights();
  const knownTracks = new Set(existing.map((f) => f.track));
  const takenIds = new Set(existing.map((f) => f.id));

  let files;
  try {
    files = (await readdir(TRACKS_DIR)).filter((f) =>
      f.toLowerCase().endsWith(".kml"),
    );
  } catch {
    return existing;
  }

  const additions = [];
  for (const file of files) {
    const track = `tracks/${file}`;
    if (knownTracks.has(track)) continue;

    const info = await extractFlightInfo(path.join(TRACKS_DIR, file));
    if (!info) {
      log(
        `[flights] skipped ${file}: couldn't read aircraft/timestamps from the KML`,
      );
      continue;
    }

    const id = makeId(info.date, info.aircraft, takenIds);
    takenIds.add(id);
    knownTracks.add(track);

    additions.push({
      id,
      date: info.date,
      aircraft: info.aircraft,
      from: "39N",
      to: "39N",
      durationMin: info.durationMin,
      kind: "dual",
      instructor: null,
      notes: "",
      track,
      adsbUrl: null,
      totalTime: null,
      dualReceived: null,
      soloTime: 0,
      crossCountry: 0,
      night: 0,
      groundTime: null,
    });
    log(
      `[flights] added "${id}" from ${file} — defaulted from/to/kind/notes and logbook hours, edit public/logbook/data/flights.json to fill in totalTime/dualReceived/groundTime and adsbUrl`,
    );
  }

  if (additions.length === 0) return existing;

  return writeFlights([...existing, ...additions]);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  // eslint-disable-next-line no-console
  generateFlights({ log: console.log });
}
