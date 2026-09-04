import path from "node:path";
import { generateFlights } from "./generateFlights.mjs";
import { TRACKS_DIR } from "./lib/flightsStore.mjs";

/**
 * Keeps public/flights/data/flights.json in sync with the .kml files in
 * public/flights/data/tracks: runs once before every build, and again live
 * whenever a .kml is added while the dev server is running.
 *
 * Registered under vite.plugins in astro.config.ts. Astro's build runs Vite
 * more than once (server and client bundles), so buildStart can fire twice;
 * generateFlights only appends entries for tracks it hasn't seen, so a second
 * pass is a no-op.
 */
export function flightsDataPlugin() {
  return {
    name: "flights-data",
    async buildStart() {
      await generateFlights();
    },
    async configureServer(server) {
      const log = (msg) => server.config.logger.info(msg);
      await generateFlights({ log });
      server.watcher.add(TRACKS_DIR);
      server.watcher.on("add", async (file) => {
        if (
          !file.startsWith(`${TRACKS_DIR}${path.sep}`) ||
          !file.endsWith(".kml")
        )
          return;
        await generateFlights({ log });
        server.hot.send({ type: "full-reload" });
      });
    },
  };
}
