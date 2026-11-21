"use client";
import { useEffect } from "react";
import { loadMetaPixel } from "@/lib/metaPixel";

// Second pixel. Same lazy loading as LazyMetaPixel: first interaction, or after 5s idle.
const PIXEL_ID = "1704843507864359";
const EVENTS = ["scroll", "mousemove", "keydown", "touchstart"] as const;
const IDLE_FALLBACK_MS = 5000;

export default function LazyMetaPixel2() {
  useEffect(() => {
    const cleanup = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    function load() {
      cleanup();
      loadMetaPixel(PIXEL_ID);
    }

    EVENTS.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );
    const timer = setTimeout(load, IDLE_FALLBACK_MS);

    return cleanup;
  }, []);

  return null;
}
