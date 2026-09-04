interface ColorStop {
  t: number; // 0..1
  rgb: [number, number, number];
}

// Low altitude -> red/orange, high altitude -> blue/purple (FlightRadar24-style altitude trail).
const STOPS: ColorStop[] = [
  { t: 0.0, rgb: [214, 41, 62] },
  { t: 0.25, rgb: [242, 165, 47] },
  { t: 0.5, rgb: [245, 214, 66] },
  { t: 0.7, rgb: [76, 175, 80] },
  { t: 0.85, rgb: [41, 163, 214] },
  { t: 1.0, rgb: [139, 63, 214] },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function colorForFraction(t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (clamped >= a.t && clamped <= b.t) {
      const localT = (clamped - a.t) / (b.t - a.t);
      const r = Math.round(lerp(a.rgb[0], b.rgb[0], localT));
      const g = Math.round(lerp(a.rgb[1], b.rgb[1], localT));
      const bl = Math.round(lerp(a.rgb[2], b.rgb[2], localT));
      return `rgb(${r}, ${g}, ${bl})`;
    }
  }
  const last = STOPS[STOPS.length - 1].rgb;
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}

/** Per-flight altitude range, so a local pattern flight (a few hundred ft of range) still shows a full gradient. */
export function altitudeDomain(
  points: { altFt: number | null }[],
): [number, number] {
  const alts = points.map((p) => p.altFt).filter((a): a is number => a != null);
  if (alts.length === 0) return [0, 1];
  const min = Math.min(...alts);
  const max = Math.max(...alts);
  return min === max ? [min, min + 1] : [min, max];
}

export function colorForAltitude(
  altFt: number,
  [min, max]: [number, number],
): string {
  return colorForFraction((altFt - min) / (max - min));
}
