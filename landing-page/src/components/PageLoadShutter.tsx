/**
 * components/PageLoadShutter.tsx
 *
 * ANIMATION 1 — Initial page-load "shutter / paint" reveal.
 *
 * Behaviour
 *  1. A thin blue bar appears top-center and expands to the full width
 *     of the viewport (the "shutter" arming itself).
 *  2. The bar then sweeps downward from the top, height 0 -> 100vh,
 *     painting the screen in a deep-blue gradient. A soft glow rides
 *     the leading (bottom) edge; a faint scan-line texture sits on top.
 *  3. On reaching the bottom it collapses back down into a slim bar
 *     anchored to the bottom of the viewport — the "LEARNING" wordmark
 *     fades in on that bar.
 *  4. After a short hold, the whole overlay fades out and unmounts,
 *     handing off to the page's real content (the Hero section's own
 *     "LEARNING" scroll animation continues the motif from there).
 *
 * Why it only plays once per real page load
 *  `hasIntroPlayed` lives in module scope, not React state or
 *  sessionStorage. Module scope survives client-side route changes
 *  (Next.js keeps the JS module alive in memory) but is reset whenever
 *  the browser does a *full* reload, which re-evaluates the module.
 *  That exactly matches the spec: replay on hard refresh only.
 *
 * Usage
 *  Render once near the root layout, above your page content:
 *    // app/layout.tsx
 *    <PageLoadShutter />
 *    {children}
 */
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// Module-scope flag — resets only on a hard refresh, persists across
// client-side navigation. Do not move this inside the component.
let hasIntroPlayed = false;

export default function PageLoadShutter() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // If the intro already ran this session, never mount the overlay at all.
  const [shouldRender, setShouldRender] = useState(!hasIntroPlayed);

  useLayoutEffect(() => {
    if (!shouldRender) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    if (!overlay || !panel || !text) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    hasIntroPlayed = true;

    if (prefersReducedMotion) {
      // Respect accessibility preference: skip straight to "done".
      gsap.set(overlay, { autoAlpha: 0 });
      const handleSetShouldRender = () => setShouldRender(false);
      handleSetShouldRender();
      return;
    }

    const BAR_HEIGHT = 64; // px — final resting strip at the bottom

    const ctx = gsap.context(() => {
      // Starting state: a hairline bar, centered, at the very top.
      gsap.set(panel, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 6,
        scaleX: 0,
        transformOrigin: "top center",
      });
      gsap.set(text, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setShouldRender(false),
      });

      tl
        // 1. Arm the shutter: expand across the full width from center.
        .to(panel, { scaleX: 1, duration: 0.35, ease: "power2.out" })
        // 2. Sweep downward, painting the screen. A touch of blur sells
        //    the sense of speed without being a flashy effect.
        .to(panel, { filter: "blur(2px)", duration: 0.15 }, "<")
        .to(panel, { height: "100vh", duration: 0.75 }, "<0.05")
        .to(panel, { filter: "blur(0px)", duration: 0.2 }, "-=0.2")
        // 3. Collapse back down into a slim strip pinned to the bottom.
        .to(
          panel,
          {
            height: BAR_HEIGHT,
            top: `calc(100vh - ${BAR_HEIGHT}px)`,
            duration: 0.45,
          },
          "+=0.05",
        )
        // 4. Reveal the wordmark on the resting strip.
        .to(
          text,
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.2",
        )
        // 5. Hold for a beat, then hand off to the page.
        .to({}, { duration: 0.4 })
        .to(overlay, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" });
    }, overlay);

    return () => ctx.revert();
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
    >
      <div
        ref={panelRef}
        className="relative will-change-[height,transform] bg-gradient-to-b from-[#0B1736] via-[#15295E] to-[#1E40AF]"
      >
        {/* Subtle scan-line texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
          }}
        />
        {/* Soft glow on the leading edge — tracks the panel automatically
            since it's pinned to the panel's own bottom edge. */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[3px]"
          style={{
            background:
              "linear-gradient(to right, transparent, #60A5FA, transparent)",
            boxShadow: "0 0 18px 4px rgba(96,165,250,0.65)",
          }}
        />
        <span
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center font-bold tracking-[0.35em] text-white/90 text-sm sm:text-base uppercase select-none"
        >
          Learning
        </span>
      </div>
    </div>
  );
}
