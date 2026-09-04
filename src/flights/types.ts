export interface Flight {
  id: string;
  date: string; // YYYY-MM-DD
  aircraft: string;
  from: string;
  to: string;
  /** airborne duration per the ADS-B track itself — not the same as loggable total time (no taxi/ground) */
  durationMin: number | null;
  kind: "discovery" | "dual" | "solo" | "checkride";
  instructor: string | null;
  notes: string;
  /** path relative to public/data/, e.g. "tracks/2026-07-25-n739wr.kml" */
  track: string;
  /** link to this leg's replay on globe.adsbexchange.com, if you saved one */
  adsbUrl: string | null;

  // Logbook hours (hand-entered — not derivable from the ADS-B track)
  totalTime: number | null;
  dualReceived: number | null;
  soloTime: number | null;
  crossCountry: number | null;
  night: number | null;
  groundTime: number | null;
}
