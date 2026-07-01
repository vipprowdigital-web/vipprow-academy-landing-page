"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroScrollSplitProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Full-bleed hero image that starts pinned at 100vw, then on scroll
 * genuinely shrinks in size and settles into the left column of a 2-col
 * grid, while an eyebrow / heading / copy / CTA "emerges" from inside the
 * screen on the right — starts small, pushed back in 3D depth and
 * invisible, then scales and moves toward the viewer as it fades in.
 *
 * Pattern notes (matches SectionTypography.tsx conventions):
 * - pin: true + pinSpacing manufactures real scroll distance since the
 *   section itself is only min-h-screen (no natural scroll range).
 * - The image wrapper's `width` is the one layout-affecting property we
 *   animate. That's normally something to avoid on scrub timelines, but
 *   here it's a single element (not a list), and it's the only way to get
 *   a genuine size change rather than a crop illusion. next/image's `fill`
 *   + `object-cover` recrops automatically as the parent narrows, so there
 *   is no stretching.
 * - The text panel's "emerge from the screen" effect uses real 3D:
 *   transformPerspective + z (depth) + scale, not just opacity/x. Each
 *   child (eyebrow, heading, copy, CTA) staggers slightly so the block
 *   assembles rather than popping in as one flat unit.
 * - Pin/split/emerge behaviour is desktop-only (matchMedia >= 768px).
 *   Mobile gets a static stacked layout — scroll-jacking a 50/50 split
 *   with 3D transforms is not worth the jank budget on mid-range Android.
 * - If this section shares a scroll container with Lenis, no extra wiring
 *   is needed as long as Lenis is calling ScrollTrigger.update() on its
 *   'scroll' event (standard Lenis + GSAP integration) elsewhere in the app.
 */
export default function CourseSection({
  imageSrc,
  imageAlt,
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: HeroScrollSplitProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const textWrap = textWrapRef.current;
    if (!section || !imageWrap || !textWrap) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const textChildren = [
          eyebrowRef.current,
          headingRef.current,
          descriptionRef.current,
          ctaRef.current,
        ].filter(Boolean) as HTMLElement[];

        gsap.set(imageWrap, { width: "100%" });
        gsap.set(textWrap, { autoAlpha: 1 });
        gsap.set(textChildren, {
          autoAlpha: 0,
          scale: 0.7,
          z: -480,
          transformPerspective: 800,
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=50%",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        tl.to(imageWrap, { width: "50%", duration: 1, ease: "none" }, 0).to(
          textChildren,
          {
            autoAlpha: 1,
            scale: 1,
            z: 0,
            duration: 0.3,
            ease: "none",
            stagger: 0.04,
          },
          0.1,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(imageWrap, { width: "100%" });
        gsap.set(textWrap, { autoAlpha: 1 });
        gsap.set(
          [
            eyebrowRef.current,
            headingRef.current,
            descriptionRef.current,
            ctaRef.current,
          ].filter(Boolean),
          { autoAlpha: 1, scale: 1, z: 0 },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#05070d] md:flex"
    >
      <div
        ref={imageWrapRef}
        className="relative h-full w-full shrink-0"
        style={{ willChange: "width" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        ref={textWrapRef}
        className="relative flex h-full flex-1 flex-col justify-center gap-6 bg-white px-6 py-16 md:px-16 lg:px-20"
        style={{ perspective: 1200 }}
      >
        <span
          ref={eyebrowRef}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          {eyebrow}
        </span>
        <h2
          ref={headingRef}
          className="max-w-xl text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>
        <p
          ref={descriptionRef}
          className="max-w-md text-base leading-relaxed text-black/70 md:text-lg"
        >
          {description}
        </p>
        <a
          ref={ctaRef}
          href={ctaHref}
          className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-md font-semibold text-white transition-transform duration-20 hover:-translate-y-0.5"
        >
          {ctaLabel}
          {/* <span className="transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span> */}
        </a>
      </div>
    </section>
  );
}
