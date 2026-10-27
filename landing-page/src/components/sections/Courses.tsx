"use client";
import { useEffect, useState } from "react";
import { Clock, BarChart2, Layers, TrendingUp, Check } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useGsapScope } from "@/hooks/useGsapScope";
import { gsap } from "@/lib/gsap";
import { revealBatch, revealLines } from "@/lib/reveal";

// ── Course data ───────────────────────────────────────────────────────

const COURSES = [
  {
    tag: "Most Popular",
    tagIcon: TrendingUp,
    title: "Master of Digital Marketing",
    short: "Digital Marketing",
    subtitle: "SEO · Paid Ads · Social Media · AI Tools · Analytics · Branding",
    duration: "3 Months",
    level: "Beginner → Advanced",
    modules: 14,
    topics: [
      "SEO & Local SEO",
      "Social Media Marketing",
      "Content Strategy & Email Marketing",
      "Google & Meta Ads",
      "AI Tools (ChatGPT, Gemini, Canva AI)",
      "Analytics & Reporting",
    ],
    outcome:
      "The Master of Digital Marketing course by Vipprow Academy is a comprehensive, industry-focused program. Built on 9+ years of real-world experience, it covers proven strategies, advanced tools, and hands-on training — from fundamentals to AI-powered techniques — to help you create, manage, and optimize high-impact campaigns that deliver measurable results.",
  },
  // ── Performance Marketing — coming soon, not yet decided ────────────
  // {
  //   tag: "Career Focused",
  //   tagIcon: Zap,
  //   title: "Performance Marketing",
  //   short: "Performance Marketing",
  //   subtitle: "Google Ads · Meta Ads · CRO · Automation · Lead Generation",
  //   duration: "12 Weeks",
  //   level: "Intermediate → Expert",
  //   modules: 10,
  //   topics: [
  //     "Google Ads Mastery",
  //     "Meta Ads (Facebook & Instagram)",
  //     "Landing Pages & CRO",
  //     "Conversion Tracking",
  //     "Marketing Automation",
  //     "Campaign Scaling",
  //   ],
  //   outcome:
  //     "Plan, launch, optimize, and scale profitable advertising campaigns while mastering analytics, automation, and ROI-driven marketing.",
  // },
] as const;

const HOLD_MS = 6000;

// Auto-advances through programs when there is more than one. With a single
// program it never schedules a timer.
function useCourseCycle() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // bump to restart the countdown on manual select

  useEffect(() => {
    if (COURSES.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % COURSES.length),
      HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, tick]);

  const select = (i: number) => {
    setIndex(i);
    setTick((t) => t + 1);
  };

  return { index, select };
}

// ── Section ───────────────────────────────────────────────────────────

export function Courses() {
  const { index, select } = useCourseCycle();
  const course = COURSES[index];
  const TagIcon = course.tagIcon;

  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);

      // The navy panel grows into place as it enters, then settles.
      gsap.fromTo(
        "[data-panel]",
        { scale: 0.92, y: 60 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-panel]",
            start: "top bottom",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <section
      id="courses"
      ref={ref}
      className="section-light-alt relative w-full overflow-hidden pt-10 sm:pt-24 pb-16 md:pt-36 md:pb-20"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="sm:mb-14 md:mb-20">
          <Lines
            lines={[
              "Learn today's most",
              <span key="b" className="text-primary">
                in-demand marketing skills.
              </span>,
            ]}
            className="font-heading text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.035em]"
          />
          <p
            data-reveal
            className="mt-3 sm:mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Practical training built around live campaigns, real tools and
            mentors who run marketing for a living.
          </p>
        </div>

        <div
          data-panel
          className="origin-top overflow-hidden rounded-4xl bg-navy p-6 text-white will-change-transform sm:p-10 lg:p-14"
          style={{ background: "var(--gradient-scene)" }}
        >
          {COURSES.length > 1 && (
            <div
              role="tablist"
              aria-label="Programs"
              className="mb-10 flex flex-wrap gap-2"
            >
              {COURSES.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => select(i)}
                  className={
                    "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
                    (i === index
                      ? "bg-white text-navy"
                      : "bg-white/10 text-white/75 hover:bg-white/15")
                  }
                >
                  {c.short}
                </button>
              ))}
            </div>
          )}

          {/* key re-runs the entrance whenever the active program changes */}
          <div
            key={index}
            className="animate-fade-up grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/80">
                <TagIcon size={14} aria-hidden="true" />
                {course.tag}
              </span>

              <h3 className="mt-6 font-heading text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
                {course.title}
              </h3>
              <p className="mt-4 text-base text-white/65">{course.subtitle}</p>

              <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-8">
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  { icon: BarChart2, label: "Level", value: course.level },
                  {
                    icon: Layers,
                    label: "Modules",
                    value: `${course.modules} modules`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className={
                      label === "Modules"
                        ? "col-span-2 sm:col-span-1"
                        : undefined
                    }
                  >
                    <dt className="flex items-center gap-1.5 text-sm text-white/55">
                      <Icon size={14} aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-2 text-lg font-semibold tracking-tight sm:text-2xl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-white/75">
                {course.outcome}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/demo-class" size="lg" arrow>
                  Book a Demo Class
                </ButtonLink>
                <ButtonLink
                  href="/download-brochure"
                  variant="outline"
                  size="lg"
                >
                  Download Brochure
                </ButtonLink>
              </div>
            </div>

            <ul className="flex flex-col justify-center gap-3">
              {course.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-4 rounded-2xl bg-white/6 px-5 py-4 text-base font-medium transition-colors duration-300 hover:bg-white/10 sm:text-lg"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-navy">
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
