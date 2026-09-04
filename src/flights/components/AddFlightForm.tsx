import { useState, type SubmitEvent } from "react";
import type { Flight } from "../types";

interface LegSummary {
  index: number;
  registration: string;
  aircraftType: string;
  startTime: string;
  endTime: string;
  durationMin: number;
  pointCount: number;
  path: [number, number][]; // decimated [lat, lon], for the thumbnail sketch
}

const KIND_OPTIONS: { value: Flight["kind"]; label: string }[] = [
  { value: "dual", label: "Dual Instruction" },
  { value: "solo", label: "Solo" },
  { value: "discovery", label: "Discovery Flight" },
  { value: "checkride", label: "Checkride" },
];

/**
 * Leg times render in the browser's own zone, same as the public detail panel.
 * `withZone` is for the end of a range, so a pair reads "10:04 AM – 11:12 AM
 * EDT" instead of repeating the abbreviation. That abbreviation is derived from
 * the leg's own instant rather than from `now`, so searching for a flight on
 * the far side of a DST change doesn't get labelled with today's offset.
 */
function formatLegTime(iso: string, withZone = false): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: withZone ? "short" : undefined,
  }).format(new Date(iso));
}

/**
 * Today as YYYY-MM-DD in the browser's own zone.
 *
 * Assembled from the local getters rather than sliced off toISOString(), which
 * would give the UTC date — already tomorrow for an evening flight on the east
 * coast, and so the wrong default on exactly the days it matters.
 */
function todayLocal(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function sortByEstimate(
  legs: LegSummary[],
  date: string,
  estTime: string,
): LegSummary[] {
  // A "YYYY-MM-DDTHH:mm" string with no trailing offset parses as local wall
  // time per spec, which is exactly what the estimate field now means. (Note a
  // date-only string would parse as UTC instead — the time part is what makes
  // this local.) Empty/partial input yields NaN, leaving the legs unsorted.
  const est = new Date(`${date}T${estTime}`);
  if (Number.isNaN(est.getTime())) return legs;
  const estMs = est.getTime();
  return [...legs].sort(
    (a, b) =>
      Math.abs(new Date(a.startTime).getTime() - estMs) -
      Math.abs(new Date(b.startTime).getTime() - estMs),
  );
}

export function AddFlightForm({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (flights: Flight[], newId: string) => void;
}) {
  const [reg, setReg] = useState("");
  // Almost every import is a flight from the same day it's being logged.
  const [date, setDate] = useState(todayLocal);
  const [estTime, setEstTime] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [legs, setLegs] = useState<LegSummary[] | null>(null);
  const [selectedLeg, setSelectedLeg] = useState<number | null>(null);

  const [from, setFrom] = useState("39N");
  const [to, setTo] = useState("39N");
  const [kind, setKind] = useState<Flight["kind"]>("dual");
  const [instructor, setInstructor] = useState("");
  const [notes, setNotes] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [dualReceived, setDualReceived] = useState("");
  const [soloTime, setSoloTime] = useState("0");
  const [crossCountry, setCrossCountry] = useState("0");
  const [night, setNight] = useState("0");
  const [groundTime, setGroundTime] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSearch(e: SubmitEvent) {
    e.preventDefault();
    setSearching(true);
    setSearchError(null);
    setLegs(null);
    setSelectedLeg(null);
    try {
      const res = await fetch(
        `/__dev-api/legs?reg=${encodeURIComponent(reg)}&date=${encodeURIComponent(date)}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      if (data.legs.length === 0) {
        setSearchError(
          "No ADS-B Exchange data found for that tail number/date.",
        );
      } else {
        setLegs(sortByEstimate(data.legs, date, estTime));
      }
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : String(err));
    } finally {
      setSearching(false);
    }
  }

  async function handleSave(e: SubmitEvent) {
    e.preventDefault();
    if (selectedLeg == null) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/__dev-api/save-flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reg,
          date,
          legIndex: selectedLeg,
          from,
          to,
          kind,
          instructor: instructor.trim() || null,
          notes: notes.trim(),
          totalTime: totalTime === "" ? null : Number(totalTime),
          dualReceived: dualReceived === "" ? null : Number(dualReceived),
          soloTime: Number(soloTime || 0),
          crossCountry: Number(crossCountry || 0),
          night: Number(night || 0),
          groundTime: groundTime === "" ? null : Number(groundTime),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onAdded(data.flights, data.entry.id);
      onClose();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Flight</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="add-flight-search" onSubmit={handleSearch}>
          <label className="form-field">
            Tail number
            <input
              value={reg}
              onChange={(e) => setReg(e.target.value)}
              placeholder="N739WR"
              required
            />
          </label>
          <label className="form-field">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="form-field">
            Est. time (local)
            <input
              type="time"
              value={estTime}
              onChange={(e) => setEstTime(e.target.value)}
            />
          </label>
          <button type="submit" className="btn-primary" disabled={searching}>
            {searching ? "Searching…" : "Search"}
          </button>
        </form>

        {searchError && <p className="form-error">{searchError}</p>}

        {legs && (
          <div className="leg-list">
            {legs.map((leg) => (
              <button
                key={leg.index}
                type="button"
                className={
                  leg.index === selectedLeg ? "leg-item selected" : "leg-item"
                }
                onClick={() => setSelectedLeg(leg.index)}
              >
                <LegThumbnail path={leg.path} />
                <span>
                  {formatLegTime(leg.startTime)} –{" "}
                  {formatLegTime(leg.endTime, true)} · {leg.durationMin} min
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedLeg != null && (
          <form className="add-flight-details" onSubmit={handleSave}>
            <div className="form-row">
              <label className="form-field">
                From
                <input value={from} onChange={(e) => setFrom(e.target.value)} />
              </label>
              <label className="form-field">
                To
                <input value={to} onChange={(e) => setTo(e.target.value)} />
              </label>
              <label className="form-field">
                Kind
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as Flight["kind"])}
                >
                  {KIND_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-field">
              Instructor
              <input
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
            </label>

            <label className="form-field">
              Notes
              <input value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>

            <div className="form-row form-row-times">
              <label className="form-field">
                Total
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                />
              </label>
              <label className="form-field">
                Dual
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={dualReceived}
                  onChange={(e) => setDualReceived(e.target.value)}
                />
              </label>
              <label className="form-field">
                Solo
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={soloTime}
                  onChange={(e) => setSoloTime(e.target.value)}
                />
              </label>
              <label className="form-field">
                XC
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={crossCountry}
                  onChange={(e) => setCrossCountry(e.target.value)}
                />
              </label>
              <label className="form-field">
                Night
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={night}
                  onChange={(e) => setNight(e.target.value)}
                />
              </label>
              <label className="form-field">
                Ground
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={groundTime}
                  onChange={(e) => setGroundTime(e.target.value)}
                />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Adding…" : "Add Flight"}
              </button>
            </div>
            {saveError && <p className="form-error">{saveError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * A quick shape sketch of the leg's ground track — not a georeferenced map,
 * just enough to visually tell legs apart (e.g. a local pattern loop vs. a
 * trip out to the practice area) without needing to load real map tiles for
 * every candidate. Longitude/latitude are scaled independently, so shapes
 * are somewhat east-west stretched at this latitude — fine for this purpose.
 */
function LegThumbnail({ path }: { path: [number, number][] }) {
  if (path.length < 2) return <div className="leg-thumbnail-empty" />;

  const lats = path.map((p) => p[0]);
  const lons = path.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const latRange = maxLat - minLat || 1;
  const lonRange = maxLon - minLon || 1;

  const size = 44;
  const pad = 5;
  const points = path
    .map(([lat, lon]) => {
      const x = pad + ((lon - minLon) / lonRange) * (size - pad * 2);
      // SVG y grows downward; latitude grows northward, so flip it.
      const y = pad + (1 - (lat - minLat) / latRange) * (size - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      className="leg-thumbnail"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
