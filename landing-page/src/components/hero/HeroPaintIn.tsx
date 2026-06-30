/**
 * components/hero/HeroPaintIn.tsx
 *
 * ANIMATION 1 (revised) — "shutter / paint" reveal, scoped to the Hero
 * section only.
 *
 * Difference from the previous version: this is no longer a fixed,
 * full-viewport overlay that disappears afterwards. It is an
 * `absolute inset-0` layer that lives *inside* the Hero section and
 * becomes the Hero's permanent painted background.
 *
 * Behaviour
 *  1. A thin bar appears top-center and expands to the Hero's full
 *     width (scaleX 0 -> 1).
 *  2. It sweeps downward, height 0 -> 100% *of the Hero section*
 *     (not 100vh of the viewport) — a soft glow rides the leading
 *     edge, a faint scan-line texture sits on top, a touch of blur
 *     sells the motion.
 *  3. Once it reaches the bottom of the Hero, it simply stays. The
 *     glow fades out (it would look like a stray line otherwise);
 *     the panel itself remains as the Hero's blue background forever.
 *  4. `onComplete` fires once, so the Hero can reveal its content
 *     (headline, "LEARNING" word, CTAs) on top of the now-painted
 *     background.
 *
 * Containment
 *  Because this is positioned `absolute inset-0` against the Hero
 *  section (which must be `position: relative; overflow: hidden`),
 *  the panel can never spill into the sections below — it is bounded
 *  by the Hero's own box, full stop.
 *
 * Play-once behaviour
 *  `hasIntroPlayed` is module-scope, so it resets only on a hard
 *  refresh and survives client-side route changes. On a "replay" (or
 *  a reduced-motion preference), the panel snaps straight to its
 *  fully-painted resting state with no animation — it must always be
 *  visible as the Hero's background, not just during the first load.
 *
 * Usage (inside your existing Hero component)
 *   const heroRef = useRef<HTMLElement>(null);
 *   const [painted, setPainted] = useState(false);
 *
 *   <section ref={heroRef} className="relative overflow-hidden min-h-screen">
 *     <HeroPaintIn onComplete={() => setPainted(true)} />
 *
 *     <div className={`relative z-10 transition-opacity duration-500 ${
 *       painted ? "opacity-100" : "opacity-0"
 *     }`}>
 *       ...existing hero headline / CTAs / Card3DHero...
 *       <SectionTypography sectionRef={heroRef} text="LEARNING" />
 *     </div>
 *   </section>
 */
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Module-scope flag — resets only on a hard refresh, persists across
// client-side navigation. Do not move this inside the component.
let hasIntroPlayed = false;

interface HeroPaintInProps {
  /** Fires once the paint sweep finishes (or immediately, if it already played). */
  onComplete?: () => void;
  className?: string;
}

export default function HeroPaintIn({ onComplete, className = "" }: HeroPaintInProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Already painted this session, or the user prefers reduced motion:
    // snap straight to the resting state. The panel must always be
    // present as the Hero's background, so we never skip rendering it.
    if (hasIntroPlayed || prefersReducedMotion) {
      gsap.set(panel, { scaleX: 1, height: "100%" });
      gsap.set(glow, { autoAlpha: 0 });
      hasIntroPlayed = true;
      onComplete?.();
      return;
    }

    hasIntroPlayed = true;

    const ctx = gsap.context(() => {
      gsap.set(panel, { scaleX: 0, height: 6, transformOrigin: "top center" });
      gsap.set(glow, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => onComplete?.(),
      });

      tl
        // 1. Arm the shutter: expand across the Hero's full width.
        .to(panel, { scaleX: 1, duration: 0.35, ease: "power2.out" })
        // 2. Sweep downward to fill the Hero section.
        .to(panel, { filter: "blur(2px)", duration: 0.15 }, "<")
        .to(panel, { height: "100%", duration: 0.85 }, "<0.05")
        .to(panel, { filter: "blur(0px)", duration: 0.25 }, "-=0.25")
        // 3. Settle: the leading-edge glow fades, the panel itself stays.
        .to(glow, { autoAlpha: 0, duration: 0.4 }, "-=0.1");
    }, panel);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0B1736] via-[#15295E] to-[#1E40AF]"
      >
        {/* Subtle, permanent scan-line texture — part of the Hero's look now */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
          }}
        />
        {/* Leading-edge glow during the sweep, fades out once settled */}
        <div
          ref={glowRef}
          className="absolute left-0 right-0 bottom-0 h-[3px]"
          style={{
            background: "linear-gradient(to right, transparent, #60A5FA, transparent)",
            boxShadow: "0 0 18px 4px rgba(96,165,250,0.65)",
          }}
        />
      </div>
    </div>
  );
}
