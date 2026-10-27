"use client";
import { Check } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { revealBatch, revealLines } from "@/lib/reveal";

const PILLARS = [
  {
    title: "Industry-Focused Curriculum",
    desc: "Master Digital Marketing, Performance Marketing, SEO, Social Media, Meta Ads, Google Ads, Email Marketing, and AI tools with a curriculum designed around current industry demands.",
  },
  {
    title: "Hands-On Practical Learning",
    desc: "Work on live campaigns, real business case studies, ad account setups, and AI-powered marketing workflows instead of just watching recorded lectures.",
  },
  {
    title: "Mentorship & Career Support",
    desc: "Learn directly from experienced marketers, receive personalized guidance, build an impressive portfolio, and prepare for interviews, freelancing, or your own agency.",
  },
];

const OUTCOMES = [
  "Live classes with experienced Digital Marketing professionals",
  "Master Google Ads, Meta Ads, SEO & Social Media Marketing",
  "Learn AI tools like ChatGPT, Gemini, Canva AI & marketing automation",
  "Work on real campaigns and build an industry-ready portfolio",
  "Placement assistance, freelancing guidance & agency-building support",
];

export function AboutProgram() {
  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as {
          motion: boolean;
          desktop: boolean;
        };
        if (!motion) return;

        revealLines(root);
        revealBatch(root);

        if (!desktop) return;

        // Sticky heading stays; each pillar lights up as it crosses the
        // middle of the screen and a progress bar tracks the story.
        const pillars = gsap.utils.toArray<HTMLElement>("[data-pillar]", root);
        const bar = root.querySelector<HTMLElement>("[data-progress]");
        pillars.forEach((p) => (p.dataset.active = "false"));

        if (bar) gsap.set(bar, { scaleY: 0 });
        const fillTo = (i: number) =>
          bar &&
          gsap.to(bar, {
            scaleY: (i + 1) / pillars.length,
            duration: 0.6,
            ease: "power3.out",
            overwrite: true,
          });

        // Adjacent pillars share the 55% line, so exactly one is active.
        pillars.forEach((pillar, i) => {
          ScrollTrigger.create({
            trigger: pillar,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              pillar.dataset.active = String(self.isActive);
            },
            onEnter: () => fillTo(i),
            onEnterBack: () => fillTo(i),
          });
        });

        return () => {
          pillars.forEach((p) => (p.dataset.active = "true"));
        };
      },
    );
  });

  return (
    <section
      id="about"
      ref={ref}
      className="section-light relative w-full bg-white!"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-10 sm:pt-24 md:pt-36">
        <Lines
          lines={[
            "More than a course.",
            <span key="b" className="text-primary">
              A career transformation.
            </span>,
          ]}
          className="font-heading text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.035em]"
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-3 sm:px-6 pt-3 sm:pt-12 pb-24 md:pb-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        {/* Left: sticky intro + progress */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p
            data-reveal
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Vipprow Academy prepares you for today&apos;s digital-first world
            with practical training in Digital Marketing, Performance Marketing,
            and AI-powered marketing tools. Learn through live sessions, real
            client projects, and hands-on campaigns that build the confidence
            and skills employers and businesses are looking for.
          </p>

          {/* Progress rail — desktop only, driven by the pillars */}
          <div
            aria-hidden="true"
            className="mt-12 hidden h-28 w-1 overflow-hidden rounded-full bg-primary/10 lg:block"
          >
            <div
              data-progress
              className="h-full w-full origin-top rounded-full bg-primary"
            />
          </div>
        </div>

        {/* Right: pillars that scroll past, then the outcomes panel */}
        <div className="lg:pt-6">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              data-pillar
              data-active="true"
              className="flex flex-col justify-center pb-7 sm:py-10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[active=false]:translate-x-4 data-[active=false]:opacity-25 lg:min-h-[62vh]"
            >
              <h3 className="font-heading text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.1] font-semibold tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 sm:mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {pillar.desc}
              </p>
            </article>
          ))}

          <div
            data-reveal
            className="mt-6 rounded-[1.75rem] bg-navy p-5 sm:p-8 text-white md:p-10"
          >
            <p className="mb-6 text-xl font-semibold tracking-tight">
              What you walk away with
            </p>
            <ul className="space-y-4">
              {OUTCOMES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-white/80"
                >
                  <Check
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-white/80"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
