import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Staggered fade-up for every `[data-reveal]` inside `root`, batched so a row
 * of cards entering together share one tween. Transform + opacity only.
 */
export function revealBatch(root: Element, selector = "[data-reveal]") {
  const els = gsap.utils.toArray<HTMLElement>(selector, root);
  if (!els.length) return;

  gsap.set(els, { opacity: 0, y: 28 });

  ScrollTrigger.batch(els, {
    start: "top 90%",
    once: true,
    interval: 0.1,
    batchMax: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
        clearProps: "opacity,transform",
      }),
  });
}

/**
 * Masked line-by-line headline reveal. Markup comes from <Lines />:
 * `[data-lines]` wraps `[data-line]` children inside overflow-hidden masks.
 */
export function revealLines(root: Element) {
  gsap.utils.toArray<HTMLElement>("[data-lines]", root).forEach((block) => {
    const lines = block.querySelectorAll("[data-line]");
    gsap.set(lines, { yPercent: 115 });
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: block, start: "top 88%", once: true },
      clearProps: "transform",
    });
  });
}
