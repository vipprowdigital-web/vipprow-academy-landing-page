"use client";
import { useEffect } from "react";

const PIXEL_ID = "1118179970941898";  
const EVENTS = ["scroll", "mousemove", "keydown", "touchstart"] as const;
// Visitors who never interact (bounce, read-only) should still be counted.
const IDLE_FALLBACK_MS = 5000;

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[][];
      loaded: boolean;
      version: string;
      push?: (...args: unknown[]) => void;
      _fbq?: Window["fbq"];
    };
    _fbq?: Window["fbq"];
  }
}

export default function LazyMetaPixel() {
  useEffect(() => {
    const cleanup = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    function load() {
      cleanup();
      // Already installed (e.g. by GTM) — don't double-fire PageView.
      if ((window as Partial<Window>).fbq) return;

      // Command-queue stub: fbevents.js replays anything queued here once it loads.
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      } as Window["fbq"];
      fbq.push = fbq;
      fbq.loaded = false;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;

      fbq("init", PIXEL_ID);
      fbq("track", "PageView");

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.async = true;
      document.head.appendChild(script);
    }

    EVENTS.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );
    const timer = setTimeout(load, IDLE_FALLBACK_MS);

    return cleanup;
  }, []);

  return null;
}
