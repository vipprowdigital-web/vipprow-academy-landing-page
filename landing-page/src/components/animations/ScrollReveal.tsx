// import { useEffect, useRef, useMemo, RefObject } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface ScrollRevealProps {
//   children: string;
//   scrollContainerRef?: RefObject<HTMLElement | null>;
//   enableBlur?: boolean;
//   baseOpacity?: number;
//   blurStrength?: number;
//   containerClassName?: string;
//   textClassName?: string;
//   animationStart?: string;
//   animationEnd?: string;
//   // New positioning props
//   startX?: number; // e.g., 32 for 32px from right
//   startY?: number; // e.g., 40 for 40px from top
//   endY?: number; // Explicit pixel position from the top where it should stop
// }

// const ScrollReveal = ({
//   children,
//   scrollContainerRef,
//   enableBlur = true,
//   baseOpacity = 0.2,
//   blurStrength = 4,
//   containerClassName = "",
//   textClassName = "",
//   animationStart = "top top",
//   animationEnd = "bottom top",
//   startX = 32, // default 32px from right
//   startY = 40, // default 40px from top
//   endY, // Optional: if not passed, it defaults to the very bottom
// }: ScrollRevealProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const splitText = useMemo(() => {
//     const text = typeof children === "string" ? children : "";
//     return text.split(/(\s+)/).map((word, index) => {
//       if (word.match(/^\s+$/)) return word;
//       return (
//         <span className="inline-block word" key={index}>
//           {word}
//         </span>
//       );
//     });
//   }, [children]);

//   useEffect(() => {
//     const el = containerRef.current;
//     const textEl = textRef.current;
//     if (!el || !textEl) return;

//     // Use the window if no custom container is provided
//     const scroller = window;

//     // We trigger the animation using the parent section element passed from above
//     const triggerElement = scrollContainerRef?.current || el;

//     // Calculate the target pixel position
//     // If endY is explicitly provided, use it. Otherwise, calculate the bottom baseline.
//     const targetY =
//       endY !== undefined
//         ? `${endY - startY}px`
//         : `${el.offsetHeight - textEl.offsetHeight - startY}px`;

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         textEl,
//         {
//           y: "0px",
//           opacity: baseOpacity,
//           filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
//         },
//         {
//           ease: "none",
//           // Moves text down, subtracting its own height so it lands beautifully right at the bottom corner
//           y: () => `${el.offsetHeight - textEl.offsetHeight - 32}px`,
//           //   y: targetY,
//           opacity: 1,
//           filter: "blur(0px)",
//           scrollTrigger: {
//             trigger: triggerElement,
//             scroller: scroller,
//             start: "top center", // Starts animating the moment the section enters from the bottom
//             // start: "top bottom", // Starts animating the moment the section enters from the bottom
//             end: animationEnd, // Finishes when the section hits your end marker
//             scrub: true, // Perfect syncing with user scroll speed
//           },
//         },
//       );
//     });

//     return () => ctx.revert(); // Clean memory leak protection for Next.js/React strict mode
//   }, [scrollContainerRef, enableBlur, baseOpacity, animationEnd, blurStrength]);

//   return (
//     <div
//       ref={containerRef}
//       className={`absolute top-0 bottom-0 right-0 left-0 pointer-events-none select-none z-0 p-8 ${containerClassName}`}
//     >
//       <p
//         ref={textRef}
//         className={`absolute top-8 right-8 font-heading font-black tracking-wider text-right will-change-transform ${textClassName}`}
//         style={{
//           fontSize: "clamp(4rem, 12vw, 10rem)", // Massive accent watermark styling
//           color: "var(--primary, rgba(0,0,0,0.05))",
//           lineHeight: 1,
//         }}
//       >
//         {splitText}
//       </p>
//     </div>
//   );
// };

// export default ScrollReveal;

"use client";

import { useEffect, useRef, useMemo, RefObject, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  contentClassName?: string;
  animationStart?: string;
  animationEnd?: string;

  // Responsive offsets (in pixels) instead of locked ending paths
  startX?: number; // Distance from the right edge
  startY?: number; // Starting distance from the top edge
  bottomOffset?: number; // Safe zone spacing from the bottom edge at the end of scroll
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 1,
  blurStrength = 0,
  containerClassName = "",
  contentClassName = "",
  animationStart = "top top",
  animationEnd = "bottom top",
  startX = 20,
  startY = 40,
  bottomOffset = 32, // Guarantees it won't overflow the bottom boundary
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Split text only if plain string asset
  const processedChildren = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    const contentEl = contentRef.current;
    if (!el || !contentEl) return;

    const scroller = window;
    const triggerElement = scrollContainerRef?.current || el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentEl,
        {
          y: "0px",
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
        },
        {
          ease: "none",
          opacity: 1,
          filter: "blur(0px)",
          // --- THE RESPONSIVE MAGIC ---
          // Using a function tells GSAP to evaluate this expression dynamically.
          // Container Height - Current Asset Height (Image or Text block) - Padding margins
          y: () => {
            const availableHeight =
              el.offsetHeight - contentEl.offsetHeight - startY - bottomOffset;
            return `${Math.max(0, availableHeight)}px`;
          },
          scrollTrigger: {
            trigger: triggerElement,
            scroller: scroller,
            start: animationStart,
            end: animationEnd,
            scrub: true,
            // Forces ScrollTrigger to recalculate layout benchmarks on window resize
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    animationStart,
    animationEnd,
    blurStrength,
    startY,
    bottomOffset,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 bottom-0 right-0 left-0 pointer-events-none select-none z-0 ${containerClassName}`}
    >
      <div
        ref={contentRef}
        className={`absolute will-change-transform ${contentClassName}`}
        style={{
          top: `${startY}px`,
          right: `${startX}px`,
        }}
      >
        {processedChildren}
      </div>
    </div>
  );
};

export default ScrollReveal;
