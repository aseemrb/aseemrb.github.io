import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  AttributionControl,
  useMap,
} from "react-leaflet";
import type { Path, Polyline as LeafletPolyline } from "leaflet";
// leaflet.css is imported by the page (src/pages/logbook.astro) alongside the
// panel's own stylesheet, so it is in <head> before this client-only tree mounts.
import type { Flight } from "../types";
import { loadTrack, type TrackPoint } from "../lib/parseTrack";
import { altitudeDomain, colorForAltitude } from "../lib/altitudeColor";
import type { GeoPoint } from "../lib/geo";
import { buildRoute } from "../lib/routeGeometry";
import { dataUrl } from "../lib/dataUrl";
import { AltitudeLegend } from "./AltitudeLegend";
import { FlightDetailPanel } from "./FlightDetailPanel";
import { PlaneMarker } from "./PlaneMarker";
import { ScaleBar } from "./ScaleBar";
import { useSiteTheme } from "../theme/useSiteTheme";

const PRINCETON_AIRPORT: [number, number] = [40.4001, -74.6572];

const latLng = (p: { lat: number; lon: number }): [number, number] => [
  p.lat,
  p.lon,
];

/**
 * Shows or hides one drawn path without going through React or Leaflet's
 * setStyle — display:none keeps the browser from laying the element out at all,
 * which matters when several hundred of them are toggled over a few seconds.
 */
function setPathVisible(path: Path | null | undefined, visible: boolean) {
  const el = path?.getElement() as SVGElement | undefined;
  if (el) el.style.display = visible ? "" : "none";
}

/** "4 min 12 s", for a gap popup. */
function formatGap(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  if (m === 0) return `${s}s`;
  return s === 0 ? `${m} min` : `${m} min ${s}s`;
}

/**
 * Frames the whole route. Runs on load, and again whenever `token` changes —
 * which is how the detail card's reset button gets back to this view after the
 * map has been panned or zoomed around.
 */
function FitBounds({ points, token }: { points: TrackPoint[]; token: number }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const bounds = points.map((p) => [p.lat, p.lon] as [number, number]);
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [points, map, token]);
  return null;
}

/**
 * Re-measures the map whenever its container changes size.
 *
 * Leaflet only does this on window resize. Folding the flight list changes the
 * map's width with the window untouched, and without this the newly exposed
 * strip stays grey: no tiles are requested for it and the route isn't drawn
 * there until the next pan.
 */
function TrackContainerSize() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

/** `children` render over the map, for overlays owned by the caller. */
export function FlightMap({
  flight,
  children,
}: {
  flight: Flight | null;
  children?: ReactNode;
}) {
  const [points, setPoints] = useState<TrackPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [playToken, setPlayToken] = useState(0);
  const [fitToken, setFitToken] = useState(0);
  const { dark } = useSiteTheme();

  useEffect(() => {
    setPoints([]);
    setError(null);
    setPlayToken(0);
    if (!flight) return;
    let cancelled = false;
    loadTrack(dataUrl(flight.track))
      .then((pts) => {
        if (!cancelled) setPoints(pts);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [flight]);

  const domain = useMemo(() => altitudeDomain(points), [points]);

  // Curves through the spans with coverage, chords across the spans without —
  // see routeGeometry for why the raw fixes can't just be joined up.
  const route = useMemo(() => buildRoute(points), [points]);

  // The animation follows the drawn line, curves included, so the plane doesn't
  // cut corners the route visibly goes around. It still crosses the gaps: it
  // has to get to the far side, and a dash across is the honest reading.
  const geoPoints: GeoPoint[] = useMemo(() => route.runs.flat(), [route]);

  // Playback draws the route as the plane flies it. All of this is applied to
  // the DOM by hand rather than through state: at 60fps a re-render would
  // reconcile every one of the route's hundreds of polylines each frame, where
  // this touches only the two or three that changed.
  const pieceRefs = useRef<(Path | null)[]>([]);
  const gapRefs = useRef<(Path | null)[]>([]);
  const casingRef = useRef<LeafletPolyline | null>(null);
  /** Highest piece index currently drawn; -1 is blank, Infinity is the whole route. */
  const drawnTo = useRef<number>(Infinity);

  // A new flight mounts a fresh set of polylines, all visible. Cleared here
  // during render rather than in an effect: ref callbacks fire before effects
  // do, so an effect would wipe the very refs it was meant to reset.
  const routeRef = useRef(route);
  if (routeRef.current !== route) {
    routeRef.current = route;
    pieceRefs.current = [];
    gapRefs.current = [];
    drawnTo.current = Infinity;
  }

  const revealTo = useCallback(
    (pathIndex: number | null) => {
      const pieces = pieceRefs.current;
      const casingPositions = (upTo: number | null) => {
        if (upTo === null) return route.runs.map((run) => run.map(latLng));
        const out: [number, number][][] = [];
        let base = 0;
        for (const run of route.runs) {
          const end = Math.min(run.length - 1, upTo - base);
          if (end >= 1) out.push(run.slice(0, end + 1).map(latLng));
          base += run.length;
          if (base > upTo) break;
        }
        return out;
      };

      // null means "not playing" — restore the static route.
      if (pathIndex === null) {
        for (let i = 0; i < pieces.length; i++) setPathVisible(pieces[i], true);
        for (const gap of gapRefs.current) setPathVisible(gap, true);
        casingRef.current?.setLatLngs(casingPositions(null));
        drawnTo.current = Infinity;
        return;
      }

      const point = Math.floor(pathIndex);
      // -1 across a gap or at the very last point: nothing new to claim, so
      // hold what's drawn rather than snapping back.
      const mapped = point >= 0 ? (route.pieceAtPoint[point] ?? -1) : -1;
      const target =
        pathIndex < 0 ? -1 : mapped >= 0 ? mapped : drawnTo.current;
      const from =
        drawnTo.current === Infinity ? pieces.length - 1 : drawnTo.current;

      if (target < from) {
        for (let i = target + 1; i <= from; i++)
          setPathVisible(pieces[i], false);
      } else {
        for (let i = from + 1; i <= target; i++)
          setPathVisible(pieces[i], true);
      }
      drawnTo.current = target;

      route.gaps.forEach((_, i) =>
        setPathVisible(gapRefs.current[i], point > route.runEnds[i]),
      );
      casingRef.current?.setLatLngs(casingPositions(Math.max(0, point)));
    },
    [route],
  );

  // OSM's own tiles: free and keyless, which CARTO's Voyager no longer is — it
  // now renders "API KEY REQUIRED" into the tile image itself. Standard OSM is
  // busier and more saturated than Voyager was, so both themes tone it down
  // with a CSS filter (see .leaflet-tile-pane in styles.css); dark mode also
  // inverts there, since there's no keyless dark basemap either. A casing line
  // behind the route (below) keeps it legible against the remaining color.
  //
  // No {s} subdomains: OSM serves everything from the one host over HTTP/2 and
  // asks clients not to use the a/b/c aliases.
  const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const casingColor = dark ? "#000000" : "#ffffff";

  return (
    <div className={dark ? "map-panel dark-tiles" : "map-panel"}>
      {flight && (
        <FlightDetailPanel
          key={flight.id}
          flight={flight}
          points={points}
          onPlay={() => setPlayToken((t) => t + 1)}
          onResetView={() => setFitToken((t) => t + 1)}
        />
      )}
      <MapContainer
        center={PRINCETON_AIRPORT}
        zoom={11}
        scrollWheelZoom
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={tileUrl}
          // OSM's own maximum; Leaflet's default of 18 would stop a zoom short.
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* bottom-left, theme-styled below — keeps required tile attribution out of the altitude legend's corner */}
        <AttributionControl position="bottomleft" prefix={false} />
        {/* Inside the map, unlike AltitudeLegend, because it has to read the
            live zoom and centre off the map instance. */}
        <ScaleBar />
        <TrackContainerSize />
        {points.length > 1 && (
          <>
            {/* Casing: a single wider line in a theme-opposite neutral, under the
                colored segments — keeps the route legible against the basemap's
                own colors regardless of what's directly beneath any segment.
                One Polyline, many lines: it skips the gaps with the route. */}
            <Polyline
              ref={casingRef}
              positions={route.runs.map((run) =>
                run.map((p): [number, number] => [p.lat, p.lon]),
              )}
              pathOptions={{
                color: casingColor,
                weight: 6,
                opacity: 0.55,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Where reception dropped out. Dashed and uncoloured, deliberately
                outside the altitude gradient: this is the one part of the line
                that isn't flown data, and it shouldn't read as though it were.
                Nearly all of these are circuits in the pattern, below the
                receivers' horizon — the straight chord is 2-3 nm of guess. */}
            {route.gaps.map((gap, i) => (
              <Polyline
                key={`gap-${i}`}
                ref={(el) => {
                  gapRefs.current[i] = el;
                }}
                positions={gap.positions}
                pathOptions={{
                  className: "flight-gap-line",
                  weight: 2,
                  dashArray: "2 7",
                  lineCap: "round",
                }}
              >
                <Popup>
                  No coverage for {formatGap(gap.seconds)} — the aircraft was
                  most likely below the receivers&rsquo; horizon. The dashes are
                  not a flown track.
                </Popup>
              </Polyline>
            ))}
            {/* One Polyline per pair of recorded fixes, as before — the smoothing
                adds points inside each piece rather than more pieces, so the
                node count is unchanged and the gradient still steps per fix. */}
            {route.pieces.map((piece, i) => (
              <Polyline
                key={i}
                ref={(el) => {
                  pieceRefs.current[i] = el;
                }}
                positions={piece.positions}
                pathOptions={{
                  color: colorForAltitude(piece.altFt ?? domain[0], domain),
                  weight: 3,
                  opacity: 1,
                  // Leaflet's default round caps overlap into visible "bumps" at every
                  // segment joint when there are hundreds of these — butt caps butt
                  // cleanly up against each other instead, for a seamless-looking stroke.
                  lineCap: "butt",
                  lineJoin: "round",
                }}
              />
            ))}
            {/* Plain light/dark markers, deliberately outside the altitude gradient's
                red-orange-yellow-green-cyan-purple range — red/green dots would look
                like they're part of that scale (they're not; these just mark start/end).

                Each is two rings: a white outer one drawn first, then the marker
                proper with its dark ring on top. That gives every marker one
                light edge and one dark edge, so it reads on a light basemap and
                on a dark one without either colour having to suit both.

                This was a `drop-shadow` halo in CSS, which rendered in dev and
                not in the production build, leaving the dark ring to sit on a
                near-identical dark basemap — two solid dots with no border. A
                real stroke can't be optimised away. */}
            {(
              [
                ["Departure", points[0], "#ffffff"],
                ["Arrival", points[points.length - 1], "#1f2937"],
              ] as const
            ).map(([label, point, fill]) => (
              <Fragment key={label}>
                <CircleMarker
                  center={[point.lat, point.lon]}
                  radius={5}
                  interactive={false}
                  pathOptions={{ color: "#ffffff", weight: 2, fill: false }}
                />
                <CircleMarker
                  center={[point.lat, point.lon]}
                  radius={4}
                  pathOptions={{
                    color: "#1f2937",
                    fillColor: fill,
                    fillOpacity: 1,
                    weight: 2,
                  }}
                >
                  <Popup>{label}</Popup>
                </CircleMarker>
              </Fragment>
            ))}
            <PlaneMarker
              path={geoPoints}
              playToken={playToken}
              onProgress={revealTo}
            />
            <FitBounds points={points} token={fitToken} />
          </>
        )}
      </MapContainer>
      {children}
      {points.length > 1 && <AltitudeLegend domain={domain} />}
      {error && <div className="map-error">Couldn't load track: {error}</div>}
    </div>
  );
}
