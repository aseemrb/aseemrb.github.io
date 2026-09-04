import { useRef, useState } from "react";
import type { Flight } from "../types";

/**
 * Release past this share of the bar's width and the neighbour is far enough
 * on screen to commit to it; short of that the track eases back.
 */
const DRAG_COMMIT_RATIO = 0.25;
/** Floor for the above, so the gesture stays reachable on a narrow phone. */
const DRAG_MIN_COMMIT_PX = 40;
/** Travel multiplier when there's no flight left that way — feels blocked rather than dead. */
const DRAG_RESISTANCE = 0.3;

/**
 * The dev-only delete button overlays each row's top-right corner, so the list
 * needs padding there — but only where that button actually renders. Resolved
 * once at module load: import.meta.env.DEV is a build-time constant.
 */
const LIST_CLASS = import.meta.env.DEV ? "flight-list dev" : "flight-list";

export function FlightList({
  flights,
  selectedId,
  onSelect,
  mobileListOpen,
  onCloseMobileList,
  onAddFlightClick,
  onDeleteFlightClick,
  totalHours,
}: {
  flights: Flight[] | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  mobileListOpen: boolean;
  onCloseMobileList: () => void;
  onAddFlightClick: () => void;
  onDeleteFlightClick: (flight: Flight) => void;
  totalHours: number | null;
}) {
  // Hooks must run before the early returns below, so they live up here rather
  // than next to the switcher markup that uses them.
  const [dragDx, setDragDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  /**
   * The travel actually applied to the track — after resistance and clamping,
   * i.e. what's on screen. The release decision reads this rather than
   * recomputing a raw delta, so what you see is what you commit to.
   */
  const dragTravel = useRef(0);
  const viewportRef = useRef<HTMLSpanElement>(null);
  /** Bar width, sampled once per gesture — one flight occupies exactly this much track. */
  const slideWidth = useRef(0);

  if (!flights) {
    return (
      <aside className={LIST_CLASS}>
        <ListTotal hours={totalHours} />
        <AddFlightButton onClick={onAddFlightClick} />
        <p className="muted">Loading…</p>
      </aside>
    );
  }

  if (flights.length === 0) {
    return (
      <aside className={LIST_CLASS}>
        <ListTotal hours={totalHours} />
        <AddFlightButton onClick={onAddFlightClick} />
        <p className="muted">No flights logged yet.</p>
      </aside>
    );
  }

  const flightList = flights;
  const selected = flightList.find((f) => f.id === selectedId) ?? null;
  const selectedIndex = flightList.findIndex((f) => f.id === selectedId);

  function handleSelect(id: string) {
    onSelect(id);
    onCloseMobileList();
  }

  // Flights are sorted newest-first, so index+1 is the next-older ("previous")
  // flight and index-1 is the next-newer ("next") one.
  function selectRelative(direction: 1 | -1) {
    if (selectedIndex === -1) return;
    const nextIndex = selectedIndex + direction;
    if (nextIndex < 0 || nextIndex >= flightList.length) return;
    handleSelect(flightList[nextIndex].id);
  }

  const atOldest = selectedIndex >= flightList.length - 1;
  const atNewest = selectedIndex <= 0;

  // The switcher track runs oldest -> newest left to right, the reverse of the
  // list above, so that position on the track matches what the controls mean:
  // the older flight sits to the LEFT, which is both what the left chevron
  // selects and what dragging right slides into view. Ordering it like the list
  // instead puts the newer flight on the left, so the flight you see coming in
  // is not the one you land on.
  const switcherFlights = [...flightList].reverse();
  const switcherIndex = flightList.length - 1 - selectedIndex;

  function handlePointerDown(e: React.PointerEvent) {
    // The arrows keep their own tap behaviour — starting a drag on one would
    // race its click, so drags only begin on the bar itself.
    if ((e.target as HTMLElement).closest("button")) return;
    dragStartX.current = e.clientX;
    dragTravel.current = 0;
    slideWidth.current = viewportRef.current?.clientWidth ?? 0;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const raw = e.clientX - dragStartX.current;
    const blocked = (raw > 0 && atOldest) || (raw < 0 && atNewest);
    const resisted = blocked ? raw * DRAG_RESISTANCE : raw;
    // Never past one slide: the track only ever moves between two neighbours,
    // so a long drag can't pull a third flight into view and land ambiguously.
    const limit = slideWidth.current || Infinity;
    const travel = Math.max(-limit, Math.min(limit, resisted));
    dragTravel.current = travel;
    setDragDx(travel);
  }

  // No pointer argument on purpose: the decision comes from the travel recorded
  // during the drag, not from the release coordinate. That keeps it consistent
  // with what was on screen, and works for pointercancel, where the final
  // coordinate isn't meaningful.
  function handlePointerEnd() {
    if (dragStartX.current === null) return;
    const travel = dragTravel.current;
    dragStartX.current = null;
    dragTravel.current = 0;
    setDragging(false);
    setDragDx(0);

    const threshold = Math.max(
      DRAG_MIN_COMMIT_PX,
      slideWidth.current * DRAG_COMMIT_RATIO,
    );
    if (Math.abs(travel) < threshold) return;
    // Dragging right pulls the previous (older) flight in from the left, the
    // way a carousel reveals what sits behind the current card.
    selectRelative(travel > 0 ? 1 : -1);
  }

  return (
    <>
      <aside
        className={mobileListOpen ? `${LIST_CLASS} mobile-open` : LIST_CLASS}
      >
        <ListTotal hours={totalHours} />
        {mobileListOpen && (
          <div className="flight-list-mobile-header">
            <span>All Flights</span>
            <button
              type="button"
              className="flight-list-close"
              onClick={onCloseMobileList}
              aria-label="Close flight list"
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <AddFlightButton onClick={onAddFlightClick} />
        <ul>
          {flightList.map((f) => (
            <li className="flight-row" key={f.id}>
              <button
                className={
                  f.id === selectedId ? "flight-item selected" : "flight-item"
                }
                onClick={() => handleSelect(f.id)}
              >
                <div className="flight-item-top">
                  <span className="flight-item-date">{formatDate(f.date)}</span>
                  {f.totalTime != null && (
                    <span className="flight-item-hours">
                      {f.totalTime.toFixed(1)} hrs
                    </span>
                  )}
                </div>
                <div className="flight-item-route">
                  {f.aircraft} ·{" "}
                  {f.from === f.to ? `${f.from} local` : `${f.from} → ${f.to}`}
                </div>
                {f.notes && <div className="flight-item-notes">{f.notes}</div>}
              </button>
              {/* Sibling of .flight-item, not a child: nesting a button inside
                  a button is invalid markup and browsers reparent it. */}
              <DeleteFlightButton flight={f} onClick={onDeleteFlightClick} />
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile-only bar for stepping to the adjacent flight: tap an arrow, or
          drag the bar sideways. Both do the same one thing, so unlike the old
          drawer (where a stray touch opened the full list) there's no ambiguity
          about what a gesture here means. Hidden on desktop via CSS. */}
      {selected && (
        <div
          className="flight-switcher"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <button
            type="button"
            className="flight-list-nav-button"
            disabled={atOldest}
            onClick={() => selectRelative(1)}
            aria-label="Previous flight (older)"
          >
            <ChevronIcon direction="left" />
          </button>
          {/* Every flight sits side by side on one track (oldest first, see
              above), each exactly the width of the window that clips it, so
              dragging slides the neighbour continuously into view rather than
              swapping the label on release. The percentage resolves against the
              track's own border box, which is the viewport width (its children
              overflow it) — so one 100% is one flight. */}
          <span className="flight-switcher-viewport" ref={viewportRef}>
            <span
              className={
                dragging
                  ? "flight-switcher-track dragging"
                  : "flight-switcher-track"
              }
              style={{
                transform: `translateX(calc(${-switcherIndex * 100}% + ${dragDx}px))`,
              }}
            >
              {switcherFlights.map((f) => (
                <span
                  className="flight-switcher-item"
                  key={f.id}
                  aria-hidden={f.id !== selectedId}
                >
                  {formatDate(f.date)} ·{" "}
                  <span className="flight-tail">{f.aircraft}</span>
                  {f.totalTime != null && <> · {f.totalTime.toFixed(1)} hrs</>}
                </span>
              ))}
            </span>
          </span>
          <button
            type="button"
            className="flight-list-nav-button"
            disabled={atNewest}
            onClick={() => selectRelative(-1)}
            aria-label="Next flight (newer)"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      )}
    </>
  );
}

// import.meta.env.DEV is a build-time constant — false (and dead-code-eliminated)
// in `vite build`, so this button (and the API it calls) never ships to the
// hosted site, only `pnpm run dev`.
function AddFlightButton({ onClick }: { onClick: () => void }) {
  if (!import.meta.env.DEV) return null;
  return (
    <button type="button" className="add-flight-button" onClick={onClick}>
      + New Flight
    </button>
  );
}

/** Dev-only, same as AddFlightButton — see the note there. */
function DeleteFlightButton({
  flight,
  onClick,
}: {
  flight: Flight;
  onClick: (flight: Flight) => void;
}) {
  if (!import.meta.env.DEV) return null;
  const label = `Delete flight ${flight.id}`;
  return (
    <button
      type="button"
      className="flight-delete-button"
      title={label}
      aria-label={label}
      onClick={() => onClick(flight)}
    >
      <TrashIcon />
    </button>
  );
}

/**
 * The logbook total, at the top of the list on desktop. Sticky, so it stays
 * put while the flights scroll under it. Hidden on mobile, where the list is
 * off screen and the same figure sits in the map's corner instead.
 */
function ListTotal({ hours }: { hours: number | null }) {
  if (hours == null) return null;
  return (
    <div className="flight-list-total">
      <span className="flight-list-total-label">Total time</span>
      <span className="total-hours-value">{hours.toFixed(1)} hrs</span>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6";
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function CloseIcon() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
