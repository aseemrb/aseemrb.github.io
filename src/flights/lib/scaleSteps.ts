const FEET_PER_NM = 6076.12;

/**
 * Largest of 1, 2, 3, 5 x 10^n that fits inside `n` — the same ladder Leaflet's
 * own scale control climbs, so a scale bar lands on a number worth reading
 * rather than on whatever its pixel width happens to measure.
 */
export function roundDown(n: number): number {
  const pow10 = Math.pow(10, Math.floor(Math.log10(n)));
  const d = n / pow10;
  return pow10 * (d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1);
}

/**
 * Picks the distance a scale bar should claim, and what to call it.
 *
 * Under a tenth of a mile it switches to feet, which is both what the ladder
 * needs (0.01 nm has nowhere left to go) and what a pilot would say anyway —
 * runway and pattern distances are quoted in feet, not fractions of a mile.
 */
export function niceScale(spanNm: number): { nm: number; label: string } {
  if (spanNm >= 0.1) {
    const nm = roundDown(spanNm);
    // toFixed rather than interpolation: the ladder is built by multiplication,
    // and 0.1 * 3 prints as 0.30000000000000004.
    return { nm, label: `${nm >= 1 ? nm : nm.toFixed(1)} nm` };
  }
  const ft = roundDown(spanNm * FEET_PER_NM);
  return { nm: ft / FEET_PER_NM, label: `${ft} ft` };
}
