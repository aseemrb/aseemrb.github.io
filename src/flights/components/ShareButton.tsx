import { useState } from "react";
import type { Flight } from "../types";
import { flightShareUrl } from "../lib/flightUrl";

/**
 * Shares a link to the flight on screen.
 *
 * Exists because the app is mostly used added-to-home-screen, where there's no
 * address bar to copy the URL out of — replaceState keeps the URL correct, but
 * standalone mode never shows it.
 *
 * Prefers the native share sheet, falling back to the clipboard where that
 * isn't available (Web Share needs a secure context and, on some browsers,
 * isn't implemented at all).
 */
export function ShareButton({ flight }: { flight: Flight | null }) {
  const [copied, setCopied] = useState(false);

  if (!flight) return null;
  const current = flight;

  async function share() {
    const url = flightShareUrl(current.id);
    const route =
      current.from === current.to
        ? `${current.from} local`
        : `${current.from} → ${current.to}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Flight Log",
          text: `${current.aircraft} · ${route}`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Dismissing the share sheet rejects with AbortError — not a failure,
      // and nothing to report either way.
    }
  }

  return (
    <button
      type="button"
      className="share-button"
      onClick={share}
      title={copied ? "Link copied" : "Share this flight"}
      aria-label={copied ? "Link copied" : "Share this flight"}
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
    </button>
  );
}

function ShareIcon() {
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
      <path d="M8 11H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2" />
      <path d="M12 15V3" />
      <path d="M8.5 6.5 12 3l3.5 3.5" />
    </svg>
  );
}

function CheckIcon() {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
