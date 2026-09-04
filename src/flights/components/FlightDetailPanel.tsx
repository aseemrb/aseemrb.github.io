import { useState } from "react";
import type { Flight } from "../types";
import type { TrackPoint } from "../lib/parseTrack";
import { PLAY_DURATION_MS } from "../lib/geo";
import { FlightTimeGrid } from "./FlightTimeGrid";

const KIND_LABELS: Record<Flight["kind"], string> = {
  discovery: "Discovery Flight",
  dual: "Dual Instruction",
  solo: "Solo",
  checkride: "Checkride",
};

/**
 * Track timestamps are absolute (UTC instants from the KML), so they're
 * rendered in whatever zone the viewer's browser is in — no `timeZone` option,
 * and `undefined` locale so 12h/24h follows their conventions too. The zone
 * abbreviation stays on: now that it varies by viewer, dropping it would leave
 * the time ambiguous.
 */
function formatClockTime(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

export function FlightDetailPanel({
  flight,
  points,
  onPlay,
  onResetView,
}: {
  flight: Flight;
  points: TrackPoint[];
  onPlay: () => void;
  onResetView: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const departed = points.length > 0 ? formatClockTime(points[0].time) : null;
  const landed =
    points.length > 0 ? formatClockTime(points[points.length - 1].time) : null;

  function handlePlay() {
    onPlay();
    setPlaying(true);
    setTimeout(() => setPlaying(false), PLAY_DURATION_MS);
  }

  return (
    <div className="flight-detail">
      <div className="flight-detail-main">
        <div className="flight-detail-header">
          <span className="flight-detail-header-text">
            <strong className="flight-tail">{flight.aircraft}</strong> ·{" "}
            {flight.from === flight.to
              ? `${flight.from} local`
              : `${flight.from} → ${flight.to}`}
          </span>
          <span className="flight-detail-actions">
            <button
              type="button"
              className="flight-detail-reset"
              onClick={onResetView}
              disabled={points.length === 0}
              title="Fit the whole route"
              aria-label="Fit the whole route"
            >
              <FitIcon />
            </button>
            <button
              type="button"
              className="flight-detail-play"
              onClick={handlePlay}
              disabled={playing || points.length < 2}
              title="Animate flight path"
              aria-label="Animate flight path"
            >
              <PlayIcon />
            </button>
          </span>
        </div>
        <FlightTimeGrid flight={flight} />
        <div className="flight-detail-footer">
          <div className="flight-detail-footer-text">
            {flight.adsbUrl && (
              <a
                className="detail-link"
                href={flight.adsbUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source ↗
              </a>
            )}
            {flight.adsbUrl && flight.durationMin != null && " · "}
            {flight.durationMin != null && (
              <span>{flight.durationMin} min airborne</span>
            )}
          </div>
          <button
            type="button"
            className="flight-detail-toggle"
            aria-expanded={expanded}
            aria-label={
              expanded ? "Hide flight details" : "Show flight details"
            }
            onClick={() => setExpanded((e) => !e)}
          >
            <ChevronIcon flipped={expanded} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="flight-detail-extra">
          <DetailRow label="Kind" value={KIND_LABELS[flight.kind]} />
          <DetailRow label="Instructor" value={flight.instructor} />
          <DetailRow label="Departed" value={departed} />
          <DetailRow label="Landed" value={landed} />
          {flight.notes && <DetailRow label="Notes" value={flight.notes} />}
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value ?? "—"}</span>
    </div>
  );
}

/** Four corner brackets — the conventional "fit to view" mark. */
function FitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 4H5a1 1 0 0 0-1 1v4" />
      <path d="M15 4h4a1 1 0 0 1 1 1v4" />
      <path d="M20 15v4a1 1 0 0 1-1 1h-4" />
      <path d="M4 15v4a1 1 0 0 0 1 1h4" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronIcon({ flipped }: { flipped: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: flipped ? "rotate(180deg)" : undefined,
        transition: "transform 0.15s",
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
