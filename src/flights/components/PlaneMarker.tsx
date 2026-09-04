import { useEffect, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { buildPathWalker, PLAY_DURATION_MS, type GeoPoint } from "../lib/geo";
import { C172_PATH } from "../lib/planePath";

// Filled rather than outlined — at this size an outlined glyph turns into a
// knot of strokes, while a solid shape stays legible and needs no halo to
// separate it from the route beneath.
const PLANE_SIZE = 32;

function planeIcon(bearingDeg: number) {
  return L.divIcon({
    className: "plane-marker",
    html: `<div class="plane-marker-rotor" style="transform: rotate(${bearingDeg}deg)"><svg viewBox="0 0 24 24" width="${PLANE_SIZE}" height="${PLANE_SIZE}" fill="currentColor"><path d="${C172_PATH}" /></svg></div>`,
    iconSize: [PLANE_SIZE, PLANE_SIZE],
    iconAnchor: [PLANE_SIZE / 2, PLANE_SIZE / 2],
  });
}

/**
 * A plane icon that sits at the start of the route by default, and animates
 * smoothly to the end (constant speed, not tied to the real flight duration)
 * each time `playToken` increments. Doesn't loop — it just stops at the end.
 *
 * `onProgress` reports the cursor's position along the path on every frame, and
 * null when playback isn't running. It's called from inside the animation frame
 * and must not trigger a React render: the route it drives is hundreds of
 * separate polylines, so it has to be applied to the DOM directly.
 */
export function PlaneMarker({
  path,
  playToken,
  onProgress,
}: {
  path: GeoPoint[];
  playToken: number;
  onProgress?: (pathIndex: number | null) => void;
}) {
  const walkerRef = useRef(buildPathWalker(path));
  const [cursor, setCursor] = useState(() => walkerRef.current(0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    walkerRef.current = buildPathWalker(path);
    setCursor(walkerRef.current(0));
  }, [path]);

  // Held in a ref so the frame loop doesn't have to list it as a dependency and
  // restart the animation whenever the parent re-renders with a new closure.
  const progressRef = useRef(onProgress);
  progressRef.current = onProgress;

  useEffect(() => {
    if (playToken === 0) return; // don't auto-play on mount/flight switch
    const start = performance.now();

    function tick(now: number) {
      const fraction = Math.min(1, (now - start) / PLAY_DURATION_MS);
      const next = walkerRef.current(fraction);
      setCursor(next);
      if (fraction < 1) {
        progressRef.current?.(next.index);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Back to the whole route, so what's on screen after playback is the
        // same static picture as before it.
        progressRef.current?.(null);
      }
    }
    // Blank first, then draw: the reveal starts from nothing rather than
    // flashing the finished route for a frame.
    progressRef.current?.(-1);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      progressRef.current?.(null);
    };
  }, [playToken]);

  return (
    <Marker
      position={[cursor.lat, cursor.lon]}
      icon={planeIcon(cursor.bearingDeg)}
      interactive={false}
    />
  );
}
