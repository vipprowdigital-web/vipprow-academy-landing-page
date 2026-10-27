"use client";

import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap } from "@/lib/gsap";
import { revealBatch, revealLines } from "@/lib/reveal";

/**
 * Client-only motion shell so the Footer itself stays a server component.
 * Reveals the CTA/columns and rises the giant wordmark with scroll.
 */
export function FooterMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useGsapScope<HTMLDivElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);

      gsap.fromTo(
        "[data-wordmark]",
        { yPercent: 38 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "bottom bottom+=420",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
