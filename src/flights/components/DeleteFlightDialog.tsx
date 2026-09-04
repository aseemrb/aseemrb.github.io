import { useState } from "react";
import type { Flight } from "../types";

/**
 * Confirms deleting a flight, then calls the dev-only API that removes both its
 * flights.json entry and its KML.
 *
 * A dialog rather than a bare button because this throws away hand-entered
 * logbook hours that aren't recoverable from the track — and the track itself,
 * which would need re-importing from ADSBX. Spells out both files so it's clear
 * what goes.
 */
export function DeleteFlightDialog({
  flight,
  onClose,
  onDeleted,
}: {
  flight: Flight;
  onClose: () => void;
  onDeleted: (flights: Flight[], deletedId: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/__dev-api/delete-flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: flight.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      onDeleted(data.flights, flight.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setDeleting(false);
    }
  }

  const route =
    flight.from === flight.to
      ? `${flight.from} local`
      : `${flight.from} → ${flight.to}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-narrow" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Flight</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="delete-summary">
          {flight.date} · <span className="flight-tail">{flight.aircraft}</span>{" "}
          · {route}
        </p>
        <p className="delete-detail">
          Removes its entry from <code>flights.json</code> and deletes{" "}
          <code>{flight.track}</code>.
        </p>
        {/* The KML isn't optional: generateFlights() re-adds an entry for any
            track file it can't match, so leaving it behind would resurrect the
            flight on the next dev server start with its hours reset. */}
        <p className="delete-detail">
          The track will also be deleted so the next reload does not re-import
          it as an hourless logbook entry.
        </p>

        <div className="form-actions delete-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}
