import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { niceScale } from "../lib/scaleSteps";

/** Widest the bar may get. The label is rounded down from whatever this spans. */
const MAX_WIDTH_PX = 110;
const METERS_PER_NM = 1852;

/**
 * Distance scale, in nautical miles.
 *
 * Nautical rather than metric or statute because everything else here is in
 * aviation units — altitudes in feet, times in the flying day — and a nm is the
 * unit the routes were actually flown and planned in.
 *
 * Recomputed on pan as well as zoom: Web Mercator stretches with latitude, so
 * the same pixel span is a different distance once you move north or south.
 */
export function ScaleBar() {
  const map = useMap();
  const [bar, setBar] = useState<{ width: number; label: string } | null>(null);

  useEffect(() => {
    function update() {
      // Measured across the middle of the view rather than at an edge, so the
      // figure matches the part of the map being looked at.
      const y = map.getSize().y / 2;
      const spanNm =
        map.distance(
          map.containerPointToLatLng([0, y]),
          map.containerPointToLatLng([MAX_WIDTH_PX, y]),
        ) / METERS_PER_NM;
      if (!Number.isFinite(spanNm) || spanNm <= 0) return;

      const { nm, label } = niceScale(spanNm);
      setBar({ width: (MAX_WIDTH_PX * nm) / spanNm, label });
    }

    update();
    map.on("zoomend", update);
    map.on("moveend", update);
    map.on("resize", update);
    return () => {
      map.off("zoomend", update);
      map.off("moveend", update);
      map.off("resize", update);
    };
  }, [map]);

  if (!bar) return null;

  return (
    <div className="map-scale">
      <span className="map-scale-label">{bar.label}</span>
      <span className="map-scale-bar" style={{ width: `${bar.width}px` }} />
    </div>
  );
}
