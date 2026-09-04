import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlightList } from "./components/FlightList";
import { FlightMap } from "./components/FlightMap";
import { AddFlightForm } from "./components/AddFlightForm";
import { DeleteFlightDialog } from "./components/DeleteFlightDialog";
import { ShareButton } from "./components/ShareButton";
import type { Flight } from "./types";
import { dataUrl } from "./lib/dataUrl";
import { readFlightIdFromUrl, writeFlightIdToUrl } from "./lib/flightUrl";
// styles.css is imported by the page (src/pages/flights.astro), not here: this
// tree only ever renders on the client, and a stylesheet imported from inside
// it would arrive with the JavaScript rather than in the page's <head>.

function sortFlights(data: Flight[]): Flight[] {
  return [...data].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Shortest gap between two checks for new flights. Coming back to the page after
 * a moment away shouldn't cost a request; coming back tomorrow should.
 */
const REFRESH_INTERVAL_MS = 30_000;

/**
 * The flight log panel: the list, the map, and (in dev) the logbook editor.
 *
 * Mounted as a client-only island on /flights, under the site's own header. The
 * site's navigation and theme picker replace the header the standalone app used
 * to carry; the logbook total and the mobile-only list and share buttons that
 * were in it now float in a corner of the map.
 */
export default function FlightLog() {
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Flight | null>(null);

  /**
   * The raw bytes of the last flights.json we accepted, so a re-check that
   * finds nothing new can return without touching state — see below.
   */
  const lastJson = useRef<string | null>(null);

  const loadFlights = useCallback(async () => {
    // The URL never changes as flights are added, so without this the browser
    // happily serves its cached copy — which is why a new flight only appeared
    // after a hard refresh. "no-cache" revalidates rather than refusing to
    // cache: unchanged content comes back as a 304 and costs almost nothing.
    const res = await fetch(dataUrl("flights.json"), { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load flights (${res.status})`);
    const text = await res.text();

    // Identical bytes: stop here. Re-parsing would hand every flight a new
    // object identity, and the map keys its track-loading effect on that — so
    // an unchanged re-check would clear the route and re-fit the map each time.
    if (text === lastJson.current) return null;
    lastJson.current = text;

    const sorted = sortFlights(JSON.parse(text) as Flight[]);
    setFlights(sorted);

    const requested = readFlightIdFromUrl();
    const fromUrl =
      requested && sorted.some((f) => f.id === requested) ? requested : null;
    // A param naming a flight that doesn't exist (deleted, or a typo'd share
    // link) would leave the address bar asserting something untrue, so drop it
    // and fall through to the most recent.
    if (requested && !fromUrl) writeFlightIdToUrl(null);

    // A re-check keeps whatever is on screen: the point is to notice new
    // flights, not to yank the reader back to the newest one.
    setSelectedId((current) =>
      current && sorted.some((f) => f.id === current)
        ? current
        : (fromUrl ?? sorted[0]?.id ?? null),
    );
    return sorted;
  }, []);

  useEffect(() => {
    loadFlights().catch(() => {
      // Nothing to fall back to on the first load; the list stays on "Loading…".
    });
  }, [loadFlights]);

  /**
   * Re-checks for new flights whenever the page comes back to the foreground,
   * so a tab left open overnight notices the next day's flight without a
   * reload.
   */
  useEffect(() => {
    let lastCheck = Date.now();
    function recheck() {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastCheck < REFRESH_INTERVAL_MS) return;
      lastCheck = Date.now();
      // Offline or a failed request: keep showing what's already on screen.
      loadFlights().catch(() => {});
    }
    document.addEventListener("visibilitychange", recheck);
    window.addEventListener("pageshow", recheck);
    return () => {
      document.removeEventListener("visibilitychange", recheck);
      window.removeEventListener("pageshow", recheck);
    };
  }, [loadFlights]);

  /**
   * Keeps the address bar naming the current flight so it can be copied and
   * shared, without adding a history entry — see writeFlightIdToUrl for why
   * pushing here was actively harmful on iOS.
   */
  const selectFlight = useCallback((id: string) => {
    setSelectedId(id);
    writeFlightIdToUrl(id);
  }, []);

  // Nothing here pushes history, so this doesn't fire for in-page selection.
  // It still matters when the browser restores the page from the back/forward
  // cache at a URL that disagrees with what's on screen — the URL wins, and a
  // bare one means "latest flight" as on first load.
  useEffect(() => {
    if (!flights) return;
    function onPopState() {
      const requested = readFlightIdFromUrl();
      const match =
        requested && flights!.some((f) => f.id === requested)
          ? requested
          : null;
      setSelectedId(match ?? flights![0]?.id ?? null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [flights]);

  const handleDeleted = useCallback(
    (updated: Flight[], deletedId: string) => {
      const sorted = sortFlights(updated);
      const wasAt = flights?.findIndex((f) => f.id === deletedId) ?? -1;
      setFlights(sorted);
      if (selectedId !== deletedId) return;
      // The list is newest-first, so whatever slid into the deleted entry's
      // index is the next older flight. Clamp for the case where the oldest was
      // deleted, and fall through to null once nothing is left.
      const next =
        sorted[Math.min(Math.max(wasAt, 0), sorted.length - 1)] ?? null;
      if (next) {
        selectFlight(next.id);
      } else {
        setSelectedId(null);
        writeFlightIdToUrl(null);
      }
    },
    [flights, selectedId, selectFlight],
  );

  const selected = useMemo(
    () => flights?.find((f) => f.id === selectedId) ?? null,
    [flights, selectedId],
  );

  const totalHours = useMemo(() => {
    if (!flights) return null;
    return flights.reduce((sum, f) => sum + (f.totalTime ?? 0), 0);
  }, [flights]);

  return (
    <div className="flight-log">
      <div className="flight-log-body">
        <FlightList
          flights={flights}
          selectedId={selectedId}
          onSelect={selectFlight}
          mobileListOpen={mobileListOpen}
          onCloseMobileList={() => setMobileListOpen(false)}
          onAddFlightClick={() => setShowAddForm(true)}
          onDeleteFlightClick={setPendingDelete}
          totalHours={totalHours}
        />
        <FlightMap flight={selected}>
          {/* Mobile only (via CSS), in the top-right corner of the map: the
              logbook total, which on desktop heads the list instead, with the
              list and share buttons under it. Neither button has a job on
              desktop: the list is always on screen, and the address bar
              already exposes the link the share button would hand over. */}
          <div className="map-corner">
            {totalHours != null && (
              <div className="total-hours">
                <span className="total-hours-full">Total time: </span>
                <span className="total-hours-value">
                  {totalHours.toFixed(1)} hrs
                </span>
              </div>
            )}
            <button
              type="button"
              className="mobile-list-button"
              onClick={() => setMobileListOpen(true)}
              aria-label="Browse all flights"
            >
              <ListIcon />
            </button>
            <ShareButton flight={selected} />
          </div>
        </FlightMap>
      </div>
      {showAddForm && (
        <AddFlightForm
          onClose={() => setShowAddForm(false)}
          onAdded={(updated, newId) => {
            setFlights(sortFlights(updated));
            selectFlight(newId);
          }}
        />
      )}
      {pendingDelete && (
        <DeleteFlightDialog
          flight={pendingDelete}
          onClose={() => setPendingDelete(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="20" y2="12" />
      <line x1="8" y1="18" x2="20" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
