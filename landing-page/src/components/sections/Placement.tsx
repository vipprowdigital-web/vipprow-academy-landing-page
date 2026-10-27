"use client";
import { Lines } from "@/components/motion/Lines";
import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap } from "@/lib/gsap";
import { revealBatch, revealLines } from "@/lib/reveal";

const HIGHLIGHTS = [
  {
    stat: "100%",
    count: 100,
    label: "Placement Assistance",
    sub: "Dedicated career guidance for every student",
  },
  {
    stat: "1:1",
    label: "Interview Preparation",
    sub: "Mock interviews & resume reviews",
  },
  {
    stat: "Live",
    label: "Industry Projects",
    sub: "Build a portfolio with real campaigns",
  },
  {
    stat: "Career",
    label: "Mentorship",
    sub: "Expert guidance until you're job-ready",
  },
];

export function Placement() {
  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);

      // Headline figure counts up once as it enters.
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { v: 0 };
        el.textContent = "0%";
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}%`;
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
  });

  return (
    <section
      id="placement"
      ref={ref}
      className="relative w-full overflow-hidden bg-navy py-10 sm:py-24 text-white md:py-36"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div>
          <Lines
            lines={[
              "Learn the skills.",
              <span key="b" className="text-white/55">
                We&apos;ll help you land the opportunity.
              </span>,
            ]}
            className="font-heading text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
          />
          <p
            data-reveal
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            At Vipprow Academy, learning doesn&apos;t end with the classroom. We
            provide 100% placement assistance through resume building, LinkedIn
            optimization, mock interviews, portfolio development, internship
            opportunities, and career guidance to help you secure your first
            role in digital marketing.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-24">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} data-reveal>
              <p
                {...("count" in h ? { "data-count": h.count } : {})}
                className="font-heading text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-white"
              >
                {h.stat}
              </p>
              <p className="mt-5 text-lg font-semibold">{h.label}</p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/65">
                {h.sub}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
