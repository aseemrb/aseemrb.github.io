import { useSyncExternalStore } from "react";

/**
 * Themes without a light/dark suffix that the site treats as dark. Mirrors the
 * `dark` custom variant in src/styles/global.css; keep the two in step.
 */
const DARK_THEMES = new Set(["dark", "obsidian", "cyber", "rays"]);

export function isDarkTheme(value: string | null): boolean {
  return value != null && (value.endsWith("-dark") || DARK_THEMES.has(value));
}

function readDark(): boolean {
  return isDarkTheme(document.documentElement.getAttribute("data-theme"));
}

/**
 * Re-renders whenever the site's theme picker rewrites data-theme on <html>.
 * The picker is plain DOM script (public/toggle-theme.js), so an observer on
 * the attribute is the only signal there is.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/**
 * Whether the site is currently in a dark theme.
 *
 * The flight log has no theme of its own any more: colours come from the
 * site's tokens through CSS, and this exists only for the two things CSS
 * variables can't drive — the tile filter class on the map panel and the
 * colour of the route's casing line, both set from React.
 */
export function useSiteTheme(): { dark: boolean } {
  const dark = useSyncExternalStore(subscribe, readDark, () => false);
  return { dark };
}
