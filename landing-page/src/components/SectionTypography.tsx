// /**
//  * components/SectionTypography.tsx
//  *
//  * ANIMATION 2 — Large scroll-driven typography, used once per section
//  * (Hero -> "LEARNING", About -> "BUILDING", Projects -> "CREATING",
//  * Experience -> "LEADING", etc).
//  *
//  * How it stays confined to its own section
//  *  The word is positioned `absolute` *inside* its section (not the
//  *  viewport), anchored to the same right edge for both its start and
//  *  end state. As the user scrolls through that section, a single
//  *  `translateY` (scrubbed 1:1 with scroll via ScrollTrigger) carries it
//  *  from its initial spot down to a resting point near the section's
//  *  bottom-right corner.
//  *
//  *  Because the element's positioning context is the section itself
//  *  (which must be `position: relative; overflow: hidden`), once the
//  *  user scrolls past that section it simply scrolls away with it like
//  *  any other child — there is no viewport-fixed pinning to fight with,
//  *  and no risk of it bleeding into the next section's animation.
//  *
//  *  Only `transform` (translateY) and `opacity` are ever animated, per
//  *  the project's performance rule — no layout properties are touched
//  *  during scroll, keeping this smooth on mid-range Android devices.
//  *
//  * Usage
//  *   const heroRef = useRef<HTMLElement>(null);
//  *   <section ref={heroRef} className="relative overflow-hidden ...">
//  *     ...
//  *     <SectionTypography sectionRef={heroRef} text="LEARNING" />
//  *   </section>
//  *
//  * Required on the parent section: `position: relative; overflow: hidden`.
//  */
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import { gsap, ScrollTrigger } from "@/lib/gsap";

// interface SectionTypographyProps {
//   /** Ref to the parent <section>. Must be position:relative; overflow:hidden */
//   sectionRef: React.RefObject<HTMLElement | null>;
//   /** The word to display, e.g. "LEARNING" */
//   text: string;
//   /** Tailwind classes for initial placement (must keep `right-*`, vary `top-*`) */
//   initialPositionClassName?: string;
//   /** Gap, in px, between the word's resting baseline and the section bottom */
//   bottomOffset?: number;
//   /** Extra classes for color/weight/size overrides */
//   className?: string;
// }

// export default function SectionTypography({
//   sectionRef,
//   text,
//   initialPositionClassName = "top-[10%] right-0 sm:right-[6%]",
//   bottomOffset = 56,
//   className = "",
// }: SectionTypographyProps) {
//   const textRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const section = sectionRef.current;
//     const textEl = textRef.current;
//     if (!section || !textEl) return;

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: true,
//           invalidateOnRefresh: true, // recompute on resize / font load
//         },
//       });

//       tl.fromTo(
//         textEl,
//         { y: 0 },
//         {
//           // Function-based value: GSAP re-evaluates this every time the
//           // ScrollTrigger refreshes (e.g. on resize), so the word always
//           // lands precisely at the section's bottom-right, responsively.
//           y: () => {
//             const sectionH = section.offsetHeight;
//             const textH = textEl.offsetHeight;
//             const currentY = Number(gsap.getProperty(textEl, "y")) || 0;
//             const initialTop =
//               textEl.getBoundingClientRect().top -
//               section.getBoundingClientRect().top -
//               currentY;
//             const finalTop = sectionH - bottomOffset - textH;
//             return finalTop - initialTop;
//           },
//           ease: "none",
//         },
//       );
//     }, section);

//     return () => ctx.revert();
//   }, [sectionRef, bottomOffset]);

//   return (
//     <div
//       ref={textRef}
//       aria-hidden="true"
//       className={[
//         "absolute select-none pointer-events-none leading-none",
//         "font-extrabold uppercase tracking-tight",
//         "text-transparent bg-clip-text bg-linear-to-b from-white via-[#9DB8FF] to-[#3B6FE0]",
//         "text-[clamp(2.75rem,9vw,9rem)]",
//         "will-change-transform",
//         initialPositionClassName,
//         className,
//       ].join(" ")}
//     >
//       {text}
//     </div>
//   );
// }

/**
 * components/SectionTypography.tsx
 *
 * ANIMATION 2 — Large scroll-driven typography, used once per section
 * (Hero -> "LEARNING", About -> "BUILDING", Projects -> "CREATING",
 * Experience -> "LEADING", etc).
 *
 * How it stays confined to its own section
 *  The word is positioned `absolute` *inside* its section (not the
 *  viewport), anchored to the same right edge for both its start and
 *  end state. As the user scrolls, a single `translateY` (scrubbed 1:1
 *  with scroll via ScrollTrigger) carries it from its initial spot down
 *  to a resting point near the section's bottom-right corner.
 *
 *  The section itself is PINNED (`position: fixed` under the hood, via
 *  GSAP's `pin: true`) for a stretch of scroll distance while this
 *  happens. This is required, not optional: a section whose height
 *  equals the viewport height (e.g. a `min-h-screen` hero) has ZERO
 *  natural scroll distance between "its top hits the viewport top" and
 *  "its bottom hits the viewport bottom" — those two events happen at
 *  the same scroll position. Without a pin there is nothing for the
 *  scrub to interpolate over, and the text either never appears to move
 *  or jumps straight to its end state. Pinning manufactures real scroll
 *  distance for the travel, and as a side effect gives exactly the
 *  "sticks at the bottom-right until the section scrolls out of view"
 *  behavior the brief asks for — once travel finishes, the section
 *  stays pinned (and the word stays put) until the pin's scroll budget
 *  is used up, then both release together and scroll away as normal.
 *
 *  Because the pin/spacer GSAP inserts belongs to this section alone,
 *  the next section is simply pushed down to start right after — it
 *  cannot bleed into another section's independent animation.
 *
 *  Only `transform` (translateY) and `opacity` are ever animated, per
 *  the project's performance rule — no layout properties are touched
 *  during scroll, keeping this smooth on mid-range Android devices.
 *
 * Usage
 *   const heroRef = useRef<HTMLElement>(null);  // React 19: returns RefObject<HTMLElement | null>
 *   <section ref={heroRef} className="relative overflow-hidden ...">
 *     ...
 *     <SectionTypography sectionRef={heroRef} text="LEARNING" />
 *   </section>
 *
 * NOTE (React 19): sectionRef prop type MUST be RefObject<HTMLElement | null>,
 * NOT RefObject<HTMLElement>. useRef<T>(null) returns RefObject<T | null> in
 * React 19 — omitting | null causes a TS2322 type error at every call site.
 *
 * Required on the parent section: `position: relative; overflow: hidden`.
 */
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SectionTypographyProps {
  /** Ref to the parent <section>. Must be position:relative; overflow:hidden */
  sectionRef: React.RefObject<HTMLElement | null>;
  /** The word to display, e.g. "LEARNING" */
  text: string;
  /** Tailwind classes for initial placement (must keep `right-*`, vary `top-*`) */
  initialPositionClassName?: string;
  /** Gap, in px, between the word's resting baseline and the section bottom */
  bottomOffset?: number;
  /** Extra classes for color/weight/size overrides */
  className?: string;
  /**
   * Full override for the text's color/fill treatment (gradient, solid,
   * opacity, etc). Defaults to a white-to-blue gradient suited to dark
   * sections like Hero. For light-background sections, pass something
   * like `text-primary/10` (a soft, low-opacity solid "watermark" reads
   * far better against a light background than a white gradient does).
   */
  colorClassName?: string;
  /**
   * Pin the section for this many extra px of scroll while the text
   * travels to the bottom-right and "sticks". Defaults to the section's
   * own rendered height (one screen-height's worth of scroll). Needed
   * because a section whose height equals the viewport height (e.g.
   * `min-h-screen`) has ZERO natural scroll distance between its top
   * hitting the viewport top and its bottom hitting the viewport bottom
   * — without a pin, there's nothing for the scrub to interpolate over.
   */
  pinDistance?: number;
  /**
   * Pin the section while the text travels. Turn this off only if the
   * section is already taller than the viewport and you want the text
   * to travel using the section's own natural scroll length instead.
   */
  pin?: boolean;
}

export default function SectionTypography({
  sectionRef,
  text,
  initialPositionClassName = "top-[14%] right-[5%] sm:right-10",
  bottomOffset = 56,
  className = "",
  colorClassName = "text-transparent bg-clip-text bg-gradient-to-b from-white via-[#9DB8FF] to-[#3B6FE0]",
  pinDistance,
  pin = true,
}: SectionTypographyProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      gsap.set(textEl, { y: 0 });

      // The travel tween itself — kept separate from the ScrollTrigger so
      // it can be handed to `animation:` below (the pattern GSAP expects
      // for pin + scrub combined).
      const travel = gsap.fromTo(
        textEl,
        { y: 0 },
        {
          // Function-based value: GSAP re-evaluates this every time the
          // ScrollTrigger refreshes (e.g. on resize), so the word always
          // lands precisely at the section's bottom-right, responsively.
          y: () => {
            const sectionH = section.offsetHeight;
            const textH = textEl.offsetHeight;
            const currentY = Number(gsap.getProperty(textEl, "y")) || 0;
            const initialTop =
              textEl.getBoundingClientRect().top -
              section.getBoundingClientRect().top -
              currentY;
            const finalTop = sectionH - bottomOffset - textH;
            return finalTop - initialTop;
          },
          ease: "none",
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // Pinning the section for this extra scroll distance is what
        // actually gives the scrub something to interpolate over.
        end: () => `+=${pinDistance ?? section.offsetHeight}`,
        pin,
        pinSpacing: pin,
        scrub: true,
        invalidateOnRefresh: true,
        animation: travel,
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, bottomOffset, pin, pinDistance]);

  return (
    <div
      ref={textRef}
      aria-hidden="true"
      className={[
        "absolute select-none pointer-events-none leading-none",
        "font-extrabold uppercase tracking-tight",
        colorClassName,
        "text-[clamp(2.75rem,9vw,5rem)]",
        "will-change-transform",
        initialPositionClassName,
        className,
      ].join(" ")}
    >
      {text}
    </div>
  );
}
