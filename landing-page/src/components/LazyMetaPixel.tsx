"use client";
import { useEffect } from "react";
import { loadMetaPixel } from "@/lib/metaPixel";

const PIXEL_ID = "1118179970941898";
const EVENTS = ["scroll", "mousemove", "keydown", "touchstart"] as const;
// Visitors who never interact (bounce, read-only) should still be counted.
const IDLE_FALLBACK_MS = 5000;

export default function LazyMetaPixel() {
  useEffect(() => {
    const cleanup = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    function load() {
      cleanup();
      // If GTM already installed fbq, don't double-fire PageView.
      loadMetaPixel(PIXEL_ID, { skipIfForeign: true });
    }

    EVENTS.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );
    const timer = setTimeout(load, IDLE_FALLBACK_MS);

    return cleanup;
  }, []);

  return null;
}
