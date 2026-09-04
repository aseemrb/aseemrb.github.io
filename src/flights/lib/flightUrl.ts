/**
 * Which flight is selected lives in the URL as `?flight=<id>`, so any flight
 * can be linked to directly.
 *
 * A query param rather than a path segment (`/flight/<id>`) because this is a
 * static site on GitHub Pages: the host serves index.html for `/` and hands the
 * query string to the client untouched, whereas a path segment would 404 unless
 * it were faked with the 404.html-redirect trick.
 *
 * A bare URL with no param is deliberately meaningful — it's the "latest
 * flight" permalink — so absence is a valid state, not an error.
 */
const PARAM = "flight";

export function readFlightIdFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get(PARAM);
}

/**
 * Always replaceState, never pushState — deliberately.
 *
 * Sharing only needs the address bar to name the current flight, which this
 * does either way. Pushing additionally stacked a history entry per selection,
 * and on iOS that turned Safari's edge back-swipe into a flight-changer: a
 * horizontal drag near the screen edge (exactly the gesture the mobile switcher
 * uses) would navigate back and silently jump to the previously viewed flight.
 *
 * With no entries of our own, that swipe just leaves the page like any normal
 * site. The cost is that Back no longer steps between flights.
 *
 * Preserves the rest of the URL — path, other params, hash.
 */
/**
 * Absolute link to one flight, for the share sheet.
 *
 * Built from the id rather than read off window.location so it always names a
 * specific flight: a bare URL is the "latest flight" permalink, which would
 * drift to a different flight as new ones are added.
 */
export function flightShareUrl(id: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set(PARAM, id);
  return url.toString();
}

export function writeFlightIdToUrl(id: string | null): void {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set(PARAM, id);
  else url.searchParams.delete(PARAM);

  window.history.replaceState(
    null,
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
}
