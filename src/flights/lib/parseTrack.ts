import { kml } from "@tmcw/togeojson";
import type { Feature, LineString, MultiLineString } from "geojson";

export interface TrackPoint {
  lat: number;
  lon: number;
  /** feet, MSL, as recorded in the source KML — null if not reported for this point */
  altFt: number | null;
  time: string | null;
}

/** Fetches a KML track (as exported from ADS-B Exchange's globe viewer) and flattens it to points. */
export async function loadTrack(url: string): Promise<TrackPoint[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load track: ${url} (${res.status})`);
  const text = await res.text();
  const dom = new DOMParser().parseFromString(text, "text/xml");
  const geojson = kml(dom);

  const points: TrackPoint[] = [];
  for (const feature of geojson.features as Feature[]) {
    const geom = feature.geometry;
    // @tmcw/togeojson nests per-point timestamps here, not at properties.coordTimes.
    const coordTimes = feature.properties?.coordinateProperties?.times as
      string[] | string[][] | undefined;

    if (geom?.type === "LineString") {
      const line = geom as LineString;
      const times = Array.isArray(coordTimes)
        ? (coordTimes as string[])
        : undefined;
      line.coordinates.forEach((coord, i) => {
        points.push(toPoint(coord, times?.[i] ?? null));
      });
    } else if (geom?.type === "MultiLineString") {
      const multi = geom as MultiLineString;
      const timesPerLine = Array.isArray(coordTimes)
        ? (coordTimes as string[][])
        : undefined;
      multi.coordinates.forEach((line, li) => {
        const times = timesPerLine?.[li];
        line.forEach((coord, i) => {
          points.push(toPoint(coord, times?.[i] ?? null));
        });
      });
    }
  }
  return points;
}

const METERS_TO_FEET = 3.28084;

function toPoint(coord: number[], time: string | null): TrackPoint {
  const [lon, lat, alt] = coord;
  // KML altitude is defined in meters (per the OGC KML spec) even though ADS-B Exchange's
  // export doesn't say so explicitly — convert to feet for aviation-normal display.
  return { lat, lon, altFt: alt != null ? alt * METERS_TO_FEET : null, time };
}
