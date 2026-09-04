import path from "node:path";
import { rm, writeFile } from "node:fs/promises";
import { nToHex } from "./lib/nNumber.mjs";
import {
  fetchTrace,
  splitLegs,
  legToKml,
  buildAdsbUrl,
} from "./lib/adsbTrace.mjs";
import {
  DATA_DIR,
  TRACKS_DIR,
  readFlights,
  writeFlights,
  makeId,
} from "./lib/flightsStore.mjs";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

/** Strips the raw trace points before sending a leg list to the browser. */
function summarizeLeg(leg) {
  const summary = { ...leg };
  delete summary.points;
  delete summary.timestamp;
  return summary;
}

async function resolveLegs(reg, date) {
  const hex = nToHex(reg);
  const traceData = await fetchTrace(hex, date);
  if (!traceData) return { hex, legs: [] };
  return { hex, legs: splitLegs(traceData) };
}

/**
 * Dev-only logbook-editing API. Import: given a tail number + date, look up
 * ADSBX's legs for that aircraft/day, and on save, write the chosen leg as a
 * KML file plus a flights.json entry. Delete: drop an entry and its KML.
 *
 * Only wired up in configureServer, so these — and the buttons that call them —
 * exist under `astro dev` and never in `astro build`. Registered under
 * vite.plugins in astro.config.ts.
 */
export function devApiPlugin() {
  return {
    name: "flights-dev-api",
    configureServer(server) {
      server.middlewares.use("/__dev-api/legs", async (req, res) => {
        try {
          const url = new URL(req.url, "http://localhost");
          const reg = url.searchParams.get("reg");
          const date = url.searchParams.get("date");
          if (!reg || !date)
            return sendJson(res, 400, { error: "reg and date are required" });

          const { hex, legs } = await resolveLegs(reg, date);
          sendJson(res, 200, { hex, legs: legs.map(summarizeLeg) });
        } catch (err) {
          sendJson(res, 400, { error: err.message });
        }
      });

      server.middlewares.use("/__dev-api/save-flight", async (req, res) => {
        if (req.method !== "POST")
          return sendJson(res, 405, { error: "POST only" });
        try {
          const body = await readJsonBody(req);
          const { reg, date, legIndex } = body;
          if (!reg || !date || !legIndex) {
            return sendJson(res, 400, {
              error: "reg, date, and legIndex are required",
            });
          }

          const { hex, legs } = await resolveLegs(reg, date);
          const leg = legs.find((l) => l.index === legIndex);
          if (!leg)
            return sendJson(res, 400, {
              error: `No leg ${legIndex} found for ${reg} on ${date}`,
            });

          const existing = await readFlights();
          const takenIds = new Set(existing.map((f) => f.id));
          const registration = reg.trim().toUpperCase();
          const id = makeId(date, registration, takenIds);
          const filename = `${id}.kml`;

          await writeFile(
            path.join(TRACKS_DIR, filename),
            legToKml(leg),
            "utf8",
          );

          const entry = {
            id,
            date,
            aircraft: registration,
            from: body.from || "39N",
            to: body.to || "39N",
            durationMin: leg.durationMin,
            kind: body.kind || "dual",
            instructor: body.instructor || null,
            notes: body.notes || "",
            track: `tracks/${filename}`,
            adsbUrl: buildAdsbUrl(hex, date, leg),
            totalTime: body.totalTime ?? null,
            dualReceived: body.dualReceived ?? null,
            soloTime: body.soloTime ?? 0,
            crossCountry: body.crossCountry ?? 0,
            night: body.night ?? 0,
            groundTime: body.groundTime ?? null,
          };

          const flights = await writeFlights([...existing, entry]);
          sendJson(res, 200, { entry, flights });
        } catch (err) {
          sendJson(res, 400, { error: err.message });
        }
      });

      server.middlewares.use("/__dev-api/delete-flight", async (req, res) => {
        if (req.method !== "POST")
          return sendJson(res, 405, { error: "POST only" });
        try {
          const { id } = await readJsonBody(req);
          if (!id) return sendJson(res, 400, { error: "id is required" });

          const existing = await readFlights();
          const entry = existing.find((f) => f.id === id);
          if (!entry) return sendJson(res, 404, { error: `No flight "${id}"` });

          const remaining = existing.filter((f) => f.id !== id);

          // The track file has to go too, not just the JSON entry: every dev
          // server start and every build runs generateFlights(), which adds an
          // entry for any .kml with no matching flight. A JSON-only delete
          // would come straight back on the next reload, with the hand-entered
          // hours reset to defaults.
          let removedTrack = null;
          if (entry.track && !remaining.some((f) => f.track === entry.track)) {
            const file = path.resolve(DATA_DIR, entry.track);
            // entry.track is whatever the JSON on disk says; keep it in tracks/.
            if (!file.startsWith(`${TRACKS_DIR}${path.sep}`)) {
              return sendJson(res, 400, {
                error: `Refusing to delete outside tracks/: ${entry.track}`,
              });
            }
            // Unlink before rewriting the JSON, so a failure here leaves
            // everything as it was. force:true tolerates an already-missing
            // file, which makes a retry after a half-finished delete still
            // clear the entry.
            await rm(file, { force: true });
            removedTrack = entry.track;
          }

          const flights = await writeFlights(remaining);
          sendJson(res, 200, { flights, removedTrack });
        } catch (err) {
          sendJson(res, 400, { error: err.message });
        }
      });
    },
  };
}
