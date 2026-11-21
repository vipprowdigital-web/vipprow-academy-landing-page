"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenisStore";
import { prefersReducedMotion } from "@/lib/reducedMotion";

// Fewer ScrollTrigger callbacks while scrolling, and no full re-measure when a
// mobile browser's address bar shows or hides (a common source of scroll jank).
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

export default function SmoothScroll() {
  const pathname = usePathname();

  // Every page switch starts at the top. Lenis keeps its own scroll target,
  // so a plain window.scrollTo can be overridden by it; reset through Lenis.
  // Links with a #hash keep their anchor behaviour.
  useEffect(() => {
    if (!window.location.hash) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    // Page height changed: re-measure every scroll-driven animation (this
    // also keeps the footer's animation correct on short pages like the 404).
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    // Keep GSAP's scroll-driven animations (ScrollTrigger) in sync with
    // Lenis's smoothed scroll position instead of native scroll.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
