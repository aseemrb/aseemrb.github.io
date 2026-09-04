import type { Flight } from "../types";

/**
 * The four columns of the logbook the card breaks a flight down into. Total
 * time is not repeated here: it is already on the flight's row in the list and
 * summed in the strip above the map. Ground time is left out to keep the card
 * to a 2x2 grid.
 */
const CATEGORIES: { key: keyof Flight; label: string }[] = [
  { key: "dualReceived", label: "Dual" },
  { key: "soloTime", label: "Solo" },
  { key: "crossCountry", label: "XC" },
  { key: "night", label: "Night" },
];

function formatHours(value: unknown): string {
  return typeof value === "number" ? value.toFixed(1) : "—";
}

export function FlightTimeGrid({ flight }: { flight: Flight }) {
  return (
    <div className="time-grid">
      {CATEGORIES.map(({ key, label }) => (
        <div className="time-cell" key={key}>
          <span className="time-label">{label}</span>
          <span className="time-value">{formatHours(flight[key])}</span>
        </div>
      ))}
    </div>
  );
}
