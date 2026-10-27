"use client";
import {
  Code2,
  BrainCircuit,
  Users2,
  Trophy,
  Briefcase,
  Rocket,
} from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap } from "@/lib/gsap";
import { revealBatch, revealLines } from "@/lib/reveal";

// Navy ramp (dark → lighter) kept from the original accents, tuned so white
// text stays readable on every step.
const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Learning",
    desc: "Master ChatGPT, Gemini, Canva AI, automation tools, and AI workflows to work smarter and stay ahead in the marketing industry.",
    bg: "#0b0738",
  },
  {
    icon: Rocket,
    title: "Live Campaign Experience",
    desc: "Run real Google Ads and Meta Ads campaigns, analyze performance, optimize budgets, and learn exactly how agencies work.",
    bg: "#100d44",
  },
  {
    icon: Users2,
    title: "Learn from Industry Experts",
    desc: "Get mentored by experienced digital marketers who have managed campaigns across multiple industries and brands.",
    bg: "#161450",
  },
  {
    icon: Trophy,
    title: "Industry-Ready Certification",
    desc: "Earn a professional certification after completing practical projects that demonstrate real marketing skills—not just theory.",
    bg: "#1c1b5b",
  },
  {
    icon: Briefcase,
    title: "Placement & Freelancing Support",
    desc: "Receive career guidance, interview preparation, resume building, freelancing mentorship, and job placement assistance.",
    bg: "#222266",
  },
  {
    icon: Code2,
    title: "Portfolio with Real Projects",
    desc: "Build live websites, marketing campaigns, landing pages, SEO case studies, and AI-powered workflows that showcase your expertise.",
    bg: "#282a70",
  },
];

export function Features() {
  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as {
          motion: boolean;
          desktop: boolean;
        };
        if (!motion) return;

        if (!desktop) {
          revealLines(root);
          revealBatch(root);
          return;
        }

        // Desktop: pin the section and slide the card track sideways,
        // scrubbed 1:1 with vertical scroll.
        const track = root.querySelector<HTMLElement>("[data-track]");
        const bar = root.querySelector<HTMLElement>("[data-bar]");
        if (!track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance() }, 0);
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);

        // Cards lift in as they enter from the right edge.
        gsap.utils.toArray<HTMLElement>("[data-card]", root).forEach((card) => {
          gsap.from(card, {
            opacity: 0.35,
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 105%",
              end: "left 60%",
              scrub: true,
            },
          });
        });
      },
    );
  });

  return (
    <section
      ref={ref}
      id="features"
      className="section-light-alt relative w-full overflow-hidden"
    >
      <div className="md:flex md:h-svh md:items-center">
        <div
          data-track
          className="flex flex-col gap-5 px-3 sm:px-6 pb-10 sm:py-24 md:w-max md:flex-row md:items-stretch md:gap-6 md:py-0 md:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] will-change-transform"
        >
          {/* Heading panel */}
          <div className="flex flex-col justify-center md:w-[min(36rem,82vw)] md:shrink-0 md:pr-10">
            <Lines
              lines={[
                "Why choose",
                <span key="b" className="text-primary">
                  Vipprow Academy?
                </span>,
              ]}
              className="font-heading text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.03] font-semibold tracking-[-0.035em]"
            />
            <p
              data-reveal
              className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              Learn from industry professionals through live projects, real
              marketing campaigns, and AI-powered workflows designed to prepare
              you for high-paying jobs, freelancing, or building your own
              digital agency.
            </p>
          </div>

          {FEATURES.map((f) => (
            <article
              key={f.title}
              data-card
              data-reveal
              style={{ backgroundColor: f.bg }}
              className="group flex min-h-72 flex-col justify-between rounded-[1.75rem] p-8 text-white md:h-[26rem] md:w-[min(24rem,78vw)] md:shrink-0 md:self-center"
            >
              <f.icon
                size={40}
                strokeWidth={1.25}
                aria-hidden="true"
                className="text-white/80 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6"
              />
              <div>
                <h3 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">
                  {f.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Progress — desktop pin only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-8 hidden h-1 overflow-hidden rounded-full bg-primary/10 md:block"
      >
        <div data-bar className="h-full origin-left rounded-full bg-primary" />
      </div>
    </section>
  );
}
