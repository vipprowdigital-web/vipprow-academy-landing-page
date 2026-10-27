"use client";

import { Check } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap } from "@/lib/gsap";
import { whenShutterDone } from "@/lib/shutter";

type Action = { label: string; href: string };

export type CourseHeroProps = {
  /** Headline, one entry per line. Rendered as the page's <h1>. */
  title: string[];
  description: string;
  primary: Action;
  secondary?: Action;
  /** Big-number highlights shown under the hero. Optional. */
  facts?: { value: string; label: string }[];
  /** Right-hand panel: a vertical ticker of items (e.g. module titles). */
  panelTitle: string;
  panelMeta?: string;
  panelItems: string[];
};

/**
 * Shared hero for the course pages. Matches the home hero: navy scene,
 * masked-line headline, scroll-out parallax. All motion is transform/opacity.
 */
export function CourseHero({
  title,
  description,
  primary,
  secondary,
  facts,
  panelTitle,
  panelMeta,
  panelItems,
}: CourseHeroProps) {
  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set("[data-line]", { yPercent: 115 });
      gsap.set("[data-ch-fade]", { opacity: 0, y: 24 });
      gsap.set("[data-ch-panel]", { opacity: 0, y: 48, scale: 0.96 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to("[data-line]", {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
        })
        .to(
          "[data-ch-fade]",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
          "-=0.8",
        )
        .to(
          "[data-ch-panel]",
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" },
          0.25,
        );
      const stopWaiting = whenShutterDone(() => intro.play());

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to("[data-ch-copy]", { y: -70, opacity: 0.2, ease: "none" }, 0)
        .to("[data-ch-panel-wrap]", { y: -50, ease: "none" }, 0);

      return stopWaiting;
    });
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-white"
      style={{ background: "var(--gradient-scene)" }}
    >
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div data-ch-copy className="will-change-transform">
          <Lines
            as="h1"
            lines={title}
            className="font-heading text-[clamp(2rem,4.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
          />
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div data-ch-copy className="will-change-transform">
            <p
              data-ch-fade
              className="max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
            >
              {description}
            </p>
            <div data-ch-fade className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg" arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>

          {/* Ticker panel */}
          <div data-ch-panel-wrap className="will-change-transform">
            <div
              data-ch-panel
              className="rounded-[1.75rem] bg-white/6 p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-lg font-semibold tracking-tight">
                  {panelTitle}
                </p>
                {panelMeta && (
                  <p className="text-sm text-white/55">{panelMeta}</p>
                )}
              </div>

              <div className="relative mt-5 h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [--duration:38s] [--gap:0.75rem]">
                <div className="flex flex-col gap-(--gap)">
                  {[0, 1, 2].map((copy) => (
                    <ul
                      key={copy}
                      aria-hidden={copy > 0 || undefined}
                      className="animate-marquee-vertical flex shrink-0 flex-col gap-(--gap)"
                    >
                      {panelItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-white/6 px-4 py-3.5 text-base font-medium text-white/85"
                        >
                          <Check
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-white/70"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {facts && facts.length > 0 && (
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 lg:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label} data-ch-fade>
                <p className="font-heading text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none font-semibold tracking-[-0.03em]">
                  {f.value}
                </p>
                <p className="mt-3 text-sm leading-snug text-white/60">
                  {f.label}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
