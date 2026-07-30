"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const DigitalMarketingAnimation = dynamic(
  () => import("../animations/DigitalMarketingAnimation"),
  { ssr: false }
);
const PerformanceMarketingAnimation = dynamic(
  () => import("../animations/PerformanceMarketingAnimation"),
  { ssr: false }
);

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
  variant: "digital-marketing" | "performance-marketing";
}

export default function CourseSection({
  imageSrc,
  imageAlt,
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  variant,
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
      className="relative h-screen w-full overflow-hidden bg-scene-background md:flex"
    >
      {/* <div
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
      </div> */}
      <div
        ref={imageWrapRef}
        className="relative h-full w-full shrink-0"
        style={{ willChange: "width" }}
      >
        {variant === "digital-marketing" ? (
          <DigitalMarketingAnimation className="absolute inset-0" />
        ) : (
          <PerformanceMarketingAnimation className="absolute inset-0" />
        )}
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
          className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-md font-semibold text-white transition-transform duration-20 hover:-translate-y-0.5 bg-linear-to-r from-primary to-button"
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
