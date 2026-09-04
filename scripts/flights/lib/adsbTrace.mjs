// Fetches ADS-B Exchange trace data server-side (dev-only — see vite.config.ts).
// This is the same JSON the globe.adsbexchange.com replay viewer itself loads;
// it requires browser-like headers (a plain request with no User-Agent/Referer
// gets a 403). Not a documented/stable API — if ADSBX changes this, the "New
// Flight" import feature breaks but nothing else does, since finished flights
// are just committed KML + JSON, independent of this.

import { ellipsoidToMslFt } from "./geoid.mjs";

const METERS_TO_FEET = 3.28084;

/** Evenly samples up to `max` [lat, lon] pairs from a leg's full point list. */
function samplePath(points, max = 24) {
  if (points.length <= max) return points.map((p) => [p[1], p[2]]);
  const step = (points.length - 1) / (max - 1);
  const sampled = [];
  for (let i = 0; i < max; i++) {
    const p = points[Math.round(i * step)];
    sampled.push([p[1], p[2]]);
  }
  return sampled;
}

/** The finished record of one UTC day. Written as the day goes, and hours behind. */
function historyTraceUrl(hex, date) {
  const [y, m, d] = date.split("-");
  const lower = hex.toLowerCase();
  return `https://globe.adsbexchange.com/globe_history/${y}/${m}/${d}/traces/${lower.slice(-2)}/trace_full_${lower}.json`;
}

/** What the globe viewer itself reads: current, but a rolling window ~24h wide. */
function liveTraceUrl(hex) {
  const lower = hex.toLowerCase();
  return `https://globe.adsbexchange.com/data/traces/${lower.slice(-2)}/trace_full_${lower}.json`;
}

function utcDate(epochSeconds) {
  return new Date(epochSeconds * 1000).toISOString().slice(0, 10);
}

/**
 * Cuts a trace down to one UTC day.
 *
 * The live trace spans whatever the last day or so covers, so without this a
 * search would list yesterday's legs alongside today's — and, worse, number
 * them from yesterday, so the leg indices would no longer line up with the
 * `?leg=` in an adsbexchange.com replay link. Day files are already a single
 * day, so this is a no-op for them.
 */
function restrictToDate(data, date) {
  return {
    ...data,
    trace: data.trace.filter((p) => utcDate(data.timestamp + p[0]) === date),
  };
}

/** Returns null if ADSBX has no trace for this hex/date (e.g. 404), throws on other failures. */
async function fetchJson(url, what) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://globe.adsbexchange.com/",
      Accept: "application/json",
    },
  });
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(`ADS-B Exchange returned ${res.status} for ${what}`);
  return res.json();
}

async function tryTrace(url, date, what) {
  const data = await fetchJson(url, what);
  if (!data?.trace?.length) return null;
  const restricted = restrictToDate(data, date);
  return restricted.trace.length > 0 ? restricted : null;
}

/**
 * Fetches a day's trace, from whichever of ADSBX's two sources actually has it.
 *
 * The day file is the natural choice, but for the day in progress it lags by
 * hours — a flight that landed an hour ago simply isn't in it yet, which looked
 * like the importer failing to find a leg that the globe viewer was happily
 * showing. So today comes from the live trace first. Older dates prefer the day
 * file and fall back to the live one, which covers a flight that ended just
 * after midnight UTC, before that day's file existed.
 *
 * Returns null if ADSBX has nothing for this aircraft on this date.
 */
export async function fetchTrace(hex, date) {
  const today = utcDate(Date.now() / 1000);
  const sources =
    date >= today
      ? [
          [liveTraceUrl(hex), "the live trace"],
          [historyTraceUrl(hex, date), `${date}`],
        ]
      : [
          [historyTraceUrl(hex, date), `${date}`],
          [liveTraceUrl(hex), "the live trace"],
        ];

  for (const [url, what] of sources) {
    const trace = await tryTrace(url, date, `${hex} on ${what}`);
    if (trace) return trace;
  }
  return null;
}

/**
 * Splits a day's trace into legs. ADSBX flags bit 1 (flags & 2) marks the
 * start of a new leg; the very first point always starts the first leg.
 * Each trace point is [secondsSinceTimestamp, lat, lon, altFt, gs, track, flags, ...].
 */
export function splitLegs(traceData) {
  const { trace, timestamp, r: registration, t: aircraftType } = traceData;
  const legs = [];
  let current = [];

  for (const p of trace) {
    const flags = p[6] ?? 0;
    const isNewLeg = (flags & 2) > 0;
    if (isNewLeg && current.length > 0) {
      legs.push(current);
      current = [];
    }
    current.push(p);
  }
  if (current.length > 0) legs.push(current);

  return legs.map((points, i) => {
    const first = points[0];
    const last = points[points.length - 1];
    return {
      index: i + 1, // matches ADSBX's own 1-indexed ?leg= URL parameter
      registration,
      aircraftType,
      startTime: new Date((timestamp + first[0]) * 1000).toISOString(),
      endTime: new Date((timestamp + last[0]) * 1000).toISOString(),
      durationMin: Math.round((last[0] - first[0]) / 60),
      pointCount: points.length,
      startLat: first[1],
      startLon: first[2],
      midLat: points[Math.floor(points.length / 2)][1],
      midLon: points[Math.floor(points.length / 2)][2],
      // decimated [lat, lon] path, just enough to sketch a recognizable shape
      // in the leg-picker thumbnail without sending the full trace up front
      path: samplePath(points),
      // kept only so /save-flight doesn't need to re-fetch+re-split — not sent to the client as-is
      points,
      timestamp,
    };
  });
}

/**
 * Index 10 of a trace point is alt_geom — GPS altitude above the WGS84
 * ellipsoid — as opposed to index 3's alt_baro, which is pressure altitude
 * referenced to the 29.92 inHg standard datum and so reads off by whatever the
 * day's altimeter setting deviates from that (~78 ft low at 30.00 inHg).
 *
 * Confirmed against known ground truth: over 39N's runway (128 ft MSL,
 * ~20 ft above the ellipsoid) alt_geom bottoms out at 25 ft while alt_baro
 * reads -100 to -200 ft. Converting alt_geom needs geoid.mjs.
 */
const GEOM_ALT_INDEX = 10;

/** Builds a KML gx:Track matching the format ADS-B Exchange's own "Export KML" produces. */
export function legToKml(leg) {
  const { registration, timestamp, points } = leg;
  const whens = points
    .map(
      (p) =>
        `<when>${new Date((timestamp + p[0]) * 1000).toISOString()}</when>`,
    )
    .join("\n");
  // One datum for the whole leg. alt_geom is preferred, but it can be null on
  // the leading points before the first fix arrives, so seed from the leg's
  // first geometric reading and let those backfill from it — borrowing
  // alt_baro's datum for them instead would put a ~200 ft step at the start.
  // Only if a leg has no geometric fix at all does it fall back to barometric.
  const firstGeom = points.find((p) => typeof p[GEOM_ALT_INDEX] === "number");
  const useBaro = firstGeom === undefined;
  // Carried in the source datum, converted per point below — the ellipsoid-to-
  // MSL correction depends on where you are, so it can't be folded in early.
  let lastAltFt = useBaro ? 0 : firstGeom[GEOM_ALT_INDEX];

  const coords = points
    .map((p) => {
      const lat = p[1];
      const lon = p[2];
      const altFt = useBaro ? p[3] : p[GEOM_ALT_INDEX];
      // alt_baro is the literal string "ground" while stopped, and alt_geom
      // just stops updating — neither is a real zero, so carry the last
      // reading forward rather than flattening to 0m, which reads as a dive.
      if (typeof altFt === "number") lastAltFt = altFt;
      // Looked up at this point's own position rather than once for the leg, so
      // a flight that crosses into a different part of the geoid stays right
      // the whole way across.
      const mslFt = useBaro ? lastAltFt : ellipsoidToMslFt(lastAltFt, lat, lon);
      const altMeters = mslFt / METERS_TO_FEET;
      return `<gx:coord>${lon} ${lat} ${altMeters.toFixed(1)}</gx:coord>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2"><Folder><Folder><name>${registration} track</name>
<Placemark><name>${registration}</name>
<Style><LineStyle><color>ff1c1ae3</color>
<width>4</width>
</LineStyle>
<IconStyle><Icon><href>http://maps.google.com/mapfiles/kml/shapes/airports.png</href>
</Icon>
</IconStyle>
</Style>
<gx:Track><altitudeMode>absolute</altitudeMode>
<extrude>1</extrude>
${whens}
${coords}
</gx:Track>
</Placemark>
</Folder>
</Folder>
</kml>
`;
}

/** Matches the URL format globe.adsbexchange.com uses for its own replay links. */
export function buildAdsbUrl(hex, date, leg) {
  const zoom = "10.1";
  return `https://globe.adsbexchange.com/?icao=${hex.toLowerCase()}&lat=${leg.midLat.toFixed(3)}&lon=${leg.midLon.toFixed(3)}&zoom=${zoom}&showTrace=${date}&leg=${leg.index}`;
}
