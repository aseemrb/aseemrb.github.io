import type { TrackPoint } from "./parseTrack";

/**
 * Longest interval between fixes that still counts as continuous coverage.
 *
 * ADS-B Exchange emits a fix every 2-4s while it has an aircraft, and stretches
 * to at most ~20s when nothing is changing. Anything past 30s means reception
 * was lost, not that the aircraft sat still.
 *
 * This matters because coverage drops out exactly where the flying is most
 * interesting: in the pattern, below 1000 ft, where the aircraft falls under
 * the receivers' horizon. Drawing straight through those holes puts a 2-3 nm
 * straight leg on the map in place of a rectangular circuit — a path the
 * aircraft never flew.
 */
export const GAP_SECONDS = 30;

/** Below this there's nothing to smooth — the fixes are already within a pixel or two. */
const MIN_SMOOTH_METERS = 15;
/** Cap on curve points inserted per fix pair; a hard turn earns all of them. */
const MAX_SUBDIVISIONS = 8;
/** Degrees of turn per inserted point. */
const DEGREES_PER_SUBDIVISION = 4;

export interface RoutePoint {
  lat: number;
  lon: number;
  altFt: number | null;
}

export interface RoutePiece {
  /** the curve between one pair of consecutive fixes */
  positions: [number, number][];
  /** mean altitude of that pair, for the gradient */
  altFt: number | null;
}

export interface RouteGap {
  positions: [[number, number], [number, number]];
  seconds: number;
}

export interface Route {
  /** one per span of continuous coverage, smoothed — for the casing and the animation */
  runs: RoutePoint[][];
  /** one per fix pair, a slice of its run */
  pieces: RoutePiece[];
  /** the chords the route deliberately doesn't draw */
  gaps: RouteGap[];
  /**
   * Indexed by position in `runs.flat()` — which is the array the animation
   * walks — giving the piece that starts there, or -1 at a run's last point,
   * where the next step is a gap rather than a piece. Lets playback reveal the
   * route in lockstep with the plane without re-deriving anything per frame.
   */
  pieceAtPoint: Int32Array;
  /** position in `runs.flat()` of each run's last point; gap i follows run i. */
  runEnds: number[];
}

/**
 * Local planar coordinates in metres, so the curve fit isn't skewed by a degree
 * of longitude being ~0.76 of a degree of latitude at this latitude.
 */
function projector(lat0: number) {
  const latScale = 111_320;
  const lonScale = 111_320 * Math.cos((lat0 * Math.PI) / 180);
  return {
    to: (p: { lat: number; lon: number }) =>
      [p.lon * lonScale, p.lat * latScale] as const,
    from: ([x, y]: readonly [number, number]) => ({
      lat: y / latScale,
      lon: x / lonScale,
    }),
  };
}

function dist(
  a: readonly [number, number],
  b: readonly [number, number],
): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

/** Turn angle in degrees at `b`, going a -> b -> c. */
function turnAt(
  a: readonly [number, number],
  b: readonly [number, number],
  c: readonly [number, number],
): number {
  const v1 = [b[0] - a[0], b[1] - a[1]];
  const v2 = [c[0] - b[0], c[1] - b[1]];
  const n1 = Math.hypot(v1[0], v1[1]);
  const n2 = Math.hypot(v2[0], v2[1]);
  if (n1 === 0 || n2 === 0) return 0;
  const cos = Math.min(
    1,
    Math.max(-1, (v1[0] * v2[0] + v1[1] * v2[1]) / (n1 * n2)),
  );
  return (Math.acos(cos) * 180) / Math.PI;
}

/**
 * Centripetal Catmull-Rom, evaluated on the span p1 -> p2.
 *
 * Centripetal (the 0.5 exponent on the knot spacing) rather than uniform: with
 * uniform spacing, the unevenly sampled fixes an ADS-B trace produces make the
 * curve loop back on itself at sharp turns. Centripetal parameterisation is
 * provably cusp- and self-intersection-free.
 */
function catmullRom(
  p0: readonly [number, number],
  p1: readonly [number, number],
  p2: readonly [number, number],
  p3: readonly [number, number],
  t: number,
): readonly [number, number] {
  const t0 = 0;
  const t1 = t0 + Math.sqrt(dist(p0, p1));
  const t2 = t1 + Math.sqrt(dist(p1, p2));
  const t3 = t2 + Math.sqrt(dist(p2, p3));
  // Coincident fixes collapse a knot interval; nothing to interpolate then.
  if (t1 === t0 || t2 === t1 || t3 === t2) {
    return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t] as const;
  }

  const tt = t1 + (t2 - t1) * t;
  const lerp = (
    a: readonly [number, number],
    b: readonly [number, number],
    ta: number,
    tb: number,
  ): readonly [number, number] => {
    const f = (tb - tt) / (tb - ta);
    const g = (tt - ta) / (tb - ta);
    return [a[0] * f + b[0] * g, a[1] * f + b[1] * g] as const;
  };

  const a1 = lerp(p0, p1, t0, t1);
  const a2 = lerp(p1, p2, t1, t2);
  const a3 = lerp(p2, p3, t2, t3);
  const b1 = lerp(a1, a2, t0, t2);
  const b2 = lerp(a2, a3, t1, t3);
  return lerp(b1, b2, t1, t2);
}

function seconds(a: TrackPoint, b: TrackPoint): number | null {
  if (!a.time || !b.time) return null;
  const ta = Date.parse(a.time);
  const tb = Date.parse(b.time);
  if (Number.isNaN(ta) || Number.isNaN(tb)) return null;
  return (tb - ta) / 1000;
}

/** Splits on reception dropouts. A pair with no usable timestamps counts as continuous. */
function splitOnGaps(points: TrackPoint[]): {
  runs: TrackPoint[][];
  gaps: RouteGap[];
} {
  const runs: TrackPoint[][] = [];
  const gaps: RouteGap[] = [];
  let run: TrackPoint[] = [];

  for (const p of points) {
    if (run.length === 0) {
      run.push(p);
      continue;
    }
    const prev = run[run.length - 1];
    const dt = seconds(prev, p);
    if (dt !== null && dt > GAP_SECONDS) {
      gaps.push({
        positions: [
          [prev.lat, prev.lon],
          [p.lat, p.lon],
        ],
        seconds: dt,
      });
      runs.push(run);
      run = [p];
    } else {
      run.push(p);
    }
  }
  if (run.length > 0) runs.push(run);
  return { runs: runs.filter((r) => r.length > 0), gaps };
}

/** Smooths one continuous run, returning its curve and where each fix pair starts. */
function smoothRun(run: TrackPoint[]): {
  points: RoutePoint[];
  bounds: number[];
} {
  const proj = projector(run[0].lat);
  const xy = run.map((p) => proj.to(p));
  const out: RoutePoint[] = [
    { lat: run[0].lat, lon: run[0].lon, altFt: run[0].altFt },
  ];
  const bounds = [0];

  for (let i = 0; i < run.length - 1; i++) {
    const p1 = xy[i];
    const p2 = xy[i + 1];
    // Reflect at the ends so the first and last spans curve like the rest
    // instead of running dead straight into the endpoint.
    const p0 =
      i > 0 ? xy[i - 1] : ([2 * p1[0] - p2[0], 2 * p1[1] - p2[1]] as const);
    const p3 =
      i + 2 < xy.length
        ? xy[i + 2]
        : ([2 * p2[0] - p1[0], 2 * p2[1] - p1[1]] as const);

    const span = dist(p1, p2);
    const turn = Math.max(turnAt(p0, p1, p2), turnAt(p1, p2, p3));
    const n =
      span < MIN_SMOOTH_METERS
        ? 1
        : Math.min(
            MAX_SUBDIVISIONS,
            Math.max(1, Math.round(turn / DEGREES_PER_SUBDIVISION)),
          );

    const a = run[i];
    const b = run[i + 1];
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      // The last step lands exactly on the recorded fix rather than on the
      // curve's value there, so the drawn line still passes through the data.
      const ll =
        k === n
          ? { lat: b.lat, lon: b.lon }
          : proj.from(catmullRom(p0, p1, p2, p3, t));
      const altFt =
        a.altFt != null && b.altFt != null
          ? a.altFt + (b.altFt - a.altFt) * t
          : (b.altFt ?? a.altFt);
      out.push({ lat: ll.lat, lon: ll.lon, altFt });
    }
    bounds.push(out.length - 1);
  }

  return { points: out, bounds };
}

/**
 * Turns raw fixes into what the map actually draws: curves through the spans
 * that have coverage, and the bare chords across the spans that don't.
 */
export function buildRoute(points: TrackPoint[]): Route {
  const empty: Route = {
    runs: [],
    pieces: [],
    gaps: [],
    pieceAtPoint: new Int32Array(0),
    runEnds: [],
  };
  if (points.length < 2) return empty;

  const { runs: rawRuns, gaps } = splitOnGaps(points);
  const runs: RoutePoint[][] = [];
  const pieces: RoutePiece[] = [];
  const pieceAt: number[] = [];
  const runEnds: number[] = [];

  for (const raw of rawRuns) {
    if (raw.length < 2) continue;
    const { points: smoothed, bounds } = smoothRun(raw);
    const base = pieceAt.length;
    runs.push(smoothed);
    // -1 by default, so a run's last point (the one a gap leads out of) stays
    // unattributed; the loop below claims every point that starts a piece.
    for (let j = 0; j < smoothed.length; j++) pieceAt.push(-1);
    runEnds.push(base + smoothed.length - 1);

    for (let i = 0; i < bounds.length - 1; i++) {
      const a = raw[i];
      const b = raw[i + 1];
      for (let j = bounds[i]; j < bounds[i + 1]; j++)
        pieceAt[base + j] = pieces.length;
      pieces.push({
        positions: smoothed
          .slice(bounds[i], bounds[i + 1] + 1)
          .map((p) => [p.lat, p.lon] as [number, number]),
        altFt:
          a.altFt != null && b.altFt != null
            ? (a.altFt + b.altFt) / 2
            : (a.altFt ?? b.altFt),
      });
    }
  }

  return {
    runs,
    pieces,
    gaps,
    pieceAtPoint: Int32Array.from(pieceAt),
    runEnds,
  };
}
