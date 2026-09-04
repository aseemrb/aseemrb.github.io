// US N-number <-> ICAO 24-bit hex conversion. The FAA assigns Mode S addresses
// to N-numbers via a deterministic encoding (not a lookup), so this needs no
// external service and always works for valid US registrations. Algorithm per
// the standard FAA N-number allocation scheme (verified against a known
// registration/hex pair from globe.adsbexchange.com: N739WR -> A9EE7E).

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I or O
const L2I = Object.fromEntries([...LETTERS].map((c, i) => [c, i]));
const HEX_BASE = 0xa00000;

const SUFFIX_CNT = { 1: 601, 2: 601, 3: 601, 4: 25, 5: 1 };
const SUBTREE_CNT = { 5: 1 };
for (let L = 4; L >= 1; L--)
  SUBTREE_CNT[L] = SUFFIX_CNT[L] + 10 * SUBTREE_CNT[L + 1];

const N_RE = /^N([1-9]\d{0,4})([A-HJ-NP-Z]{0,2})$/i;

function suffixOffset(rootLen, suf) {
  if (!suf) return 0;
  const s = suf.toUpperCase();
  const idx1 = L2I[s[0]];
  if (idx1 === undefined) throw new Error("Invalid suffix letter");
  if (s.length === 1) return 1 + (rootLen === 4 ? idx1 : idx1 * 25);
  if (rootLen >= 4)
    throw new Error("Two-letter suffix invalid for 4- or 5-digit roots");
  const idx2 = L2I[s[1]];
  if (idx2 === undefined) throw new Error("Invalid suffix letter");
  return 2 + idx1 * 25 + idx2;
}

/** Converts a US registration like "N739WR" to its ICAO hex, e.g. "A9EE7E". */
export function nToHex(n) {
  const raw = String(n ?? "")
    .trim()
    .toUpperCase();
  const m = raw.match(N_RE);
  if (!m) throw new Error(`Invalid U.S. registration: ${n}`);

  const digits = m[1];
  const suffix = (m[2] || "").toUpperCase();
  const rootLen = digits.length;

  if (rootLen === 5 && suffix)
    throw new Error("5-digit roots cannot have a suffix");
  if (rootLen === 4 && suffix.length > 1)
    throw new Error("4-digit roots allow at most one letter");

  const firstDigit = Number(digits[0]);
  let idx = (firstDigit - 1) * SUBTREE_CNT[1];

  let prefixLen = 1;
  for (const dChar of digits.slice(1)) {
    idx += SUFFIX_CNT[prefixLen];
    idx += Number(dChar) * SUBTREE_CNT[prefixLen + 1];
    prefixLen += 1;
  }

  idx += suffixOffset(rootLen, suffix);

  return (HEX_BASE + idx + 1).toString(16).toUpperCase().padStart(6, "0");
}
