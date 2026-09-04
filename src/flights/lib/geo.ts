/** Fixed playback length for the plane animation — flights run 30-90+ real
 * minutes, so this is a felt duration, not tied to actual elapsed time. */
export const PLAY_DURATION_MS = 6000;

export interface GeoPoint {
  lat: number;
  lon: number;
  altFt: number | null;
}

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Flat-earth approximation — plenty accurate for the short local flights this
// app deals with, and avoids the cost/complexity of a real haversine formula.
function planarDistance(a: GeoPoint, b: GeoPoint): number {
  const latScale = 111_320;
  const lonScale = 111_320 * Math.cos(a.lat * DEG_TO_RAD);
  const dLat = (b.lat - a.lat) * latScale;
  const dLon = (b.lon - a.lon) * lonScale;
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

export function bearing(a: GeoPoint, b: GeoPoint): number {
  const y =
    Math.sin((b.lon - a.lon) * DEG_TO_RAD) * Math.cos(b.lat * DEG_TO_RAD);
  const x =
    Math.cos(a.lat * DEG_TO_RAD) * Math.sin(b.lat * DEG_TO_RAD) -
    Math.sin(a.lat * DEG_TO_RAD) *
      Math.cos(b.lat * DEG_TO_RAD) *
      Math.cos((b.lon - a.lon) * DEG_TO_RAD);
  return (Math.atan2(y, x) * RAD_TO_DEG + 360) % 360;
}

export interface PathCursor {
  lat: number;
  lon: number;
  bearingDeg: number;
  /**
   * Fractional index into the path array — the walker has to find this anyway,
   * and it's what lets the route be revealed in step with the plane rather than
   * from a distance fraction that would have to be re-derived.
   */
  index: number;
}

/**
 * Builds a function mapping a 0-1 fraction of *distance along the path* (not
 * point index) to a position + heading — so playback moves at a constant
 * visual speed even where the original samples were sparse or dense.
 */
export function buildPathWalker(
  path: GeoPoint[],
): (fraction: number) => PathCursor {
  if (path.length < 2) {
    const only = path[0] ?? { lat: 0, lon: 0, altFt: null };
    return () => ({ lat: only.lat, lon: only.lon, bearingDeg: 0, index: 0 });
  }

  const cumulative = [0];
  for (let i = 1; i < path.length; i++) {
    cumulative.push(cumulative[i - 1] + planarDistance(path[i - 1], path[i]));
  }
  const total = cumulative[cumulative.length - 1] || 1;

  return (fraction: number) => {
    const target = Math.min(1, Math.max(0, fraction)) * total;
    let i = 1;
    while (i < cumulative.length - 1 && cumulative[i] < target) i++;
    const segStart = cumulative[i - 1];
    const segEnd = cumulative[i];
    const segT =
      segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;
    const a = path[i - 1];
    const b = path[i];
    return {
      lat: a.lat + (b.lat - a.lat) * segT,
      lon: a.lon + (b.lon - a.lon) * segT,
      bearingDeg: bearing(a, b),
      index: i - 1 + segT,
    };
  };
}
