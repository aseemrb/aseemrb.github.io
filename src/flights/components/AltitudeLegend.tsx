import { colorForFraction } from "../lib/altitudeColor";

export function AltitudeLegend({ domain }: { domain: [number, number] }) {
  const [min, max] = domain;
  const stopCount = 8;
  const gradient = Array.from({ length: stopCount }, (_, i) => {
    const t = i / (stopCount - 1);
    return `${colorForFraction(t)} ${Math.round(t * 100)}%`;
  }).join(", ");

  return (
    <div className="altitude-legend">
      <div className="altitude-legend-title">Altitude (ft MSL)</div>
      <div
        className="altitude-legend-bar"
        style={{ background: `linear-gradient(to right, ${gradient})` }}
      />
      <div className="altitude-legend-labels">
        <span>{Math.round(min)}</span>
        <span>{Math.round(max)}</span>
      </div>
    </div>
  );
}
