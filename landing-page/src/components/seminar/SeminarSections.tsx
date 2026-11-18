import Image from "next/image";
import type { IconType } from "react-icons";
import {
  PiArrowUpRight,
  PiBriefcase,
  PiBuildings,
  PiCalendarBlank,
  PiCaretDown,
  PiCertificate,
  PiChatsCircle,
  PiChartLineUp,
  PiGraduationCap,
  PiHandshake,
  PiMapPin,
  PiPaintBrush,
  PiPhone,
  PiPlayCircle,
  PiPresentationChart,
  PiRocketLaunch,
  PiSparkle,
  PiWarningDiamond,
} from "react-icons/pi";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import { TOOLS, ToolLogo } from "./brand-icons";
import {
  formatSeminarDate,
  formatSeminarTimeRange,
  type Seminar,
} from "@/lib/seminars";
import { CONTACT_PHONE, CONTACT_TEL } from "./contact";

/** Same pin as the About page map: the academy at Napier Town, Jabalpur. */
const ACADEMY_COORDS = "23.15909277907833,79.93228857509614";
const ACADEMY_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.304260996585!2d79.93228857509614!3d23.15909277907833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x669f31eafcdd5fe5%3A0x9c592ca9f6be0fa8!2sVipprow%20%7C%20Digital%20Marketing%20%7C%20Peformance%20Marketing%20Academy!5e0!3m2!1sen!2sin!4v1790278971788!5m2!1sen!2sin";

const wrap = "mx-auto max-w-6xl px-5 sm:px-6";
const h2 =
  "font-heading text-[clamp(1.9rem,4.6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance";

/* ── Countdown + seat bar ─────────────────────────────────────────── */
export function UrgencyBand({ seminar }: { seminar: Seminar }) {
  return (
    <section
      aria-label="Countdown"
      className="py-16 text-white md:py-24"
      style={{
        // Starts on the hero's bottom colour (near black) and fades down to its lighter navy.
        background:
          "linear-gradient(to bottom, #03040e 0%, #090b24 45%, #1a1c4c 100%)",
      }}
    >
      <div className={wrap}>
        <Countdown startsAt={seminar.startsAt} seatsLeft={seminar.seatsLeft} />
      </div>
    </section>
  );
}

/* ── Viral hook ───────────────────────────────────────────────────── */
export function HookCards({ seminar }: { seminar: Seminar }) {
  const cards: { Icon: IconType; text: string; tone: string }[] = [
    {
      Icon: PiWarningDiamond,
      text: "Pressing the Boost button won't grow your business",
      tone: "bg-muted text-foreground",
    },
    {
      Icon: PiRocketLaunch,
      text: "Learn AI, or get left behind",
      tone: "bg-[#06002e] text-white",
    },
    {
      Icon: PiSparkle,
      text: `₹${seminar.feeRupees} for a skill that works for life`,
      tone: "bg-[#ffd60a] text-[#06002e]",
    },
  ];
  return (
    <section
      aria-label="Why this seminar"
      className="section-light py-16 md:py-24"
    >
      <div className={`${wrap} grid gap-4 md:grid-cols-3`}>
        {cards.map(({ Icon, text, tone }, i) => (
          <Reveal key={text} delay={i * 0.08}>
            <div
              className={`flex h-full min-h-64 flex-col justify-between rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${tone}`}
            >
              <Icon className="size-10" aria-hidden="true" />
              <p className="mt-10 font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-[1.75rem]">
                {text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── What you'll learn ────────────────────────────────────────────── */
const LEARN: { Icon: IconType; title: string; body: string }[] = [
  {
    Icon: PiSparkle,
    title: "AI-Powered Marketing",
    body: "How to create ads with AI, and which content actually works.",
  },
  {
    Icon: PiChatsCircle,
    title: "ChatGPT & ChatGPT Ads",
    body: "Ad copy, creatives and targeting ideas, written with ChatGPT.",
  },
  {
    Icon: PiChartLineUp,
    title: "Performance Marketing",
    body: "Real funnels, budgets and scaling, and how to bring in leads.",
  },
];

export function WhatYouLearn() {
  return (
    <section
      aria-labelledby="learn-h"
      className="section-light bg-white! py-16 md:py-24"
    >
      <div className={wrap}>
        <Reveal>
          <h2 id="learn-h" className={h2}>
            What you will learn
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4">
          {LEARN.map(({ Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08}>
                <div className="group grid items-center gap-4 rounded-3xl bg-muted p-6 transition-colors duration-300 hover:bg-[#06002e] hover:text-white sm:grid-cols-[auto_1fr_1.1fr] sm:gap-8 sm:p-8">
                  <Icon
                    className="size-12 text-[#06002e] transition-colors group-hover:text-[#ffd60a]"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                    {title}
                  </h3>
                  <p className="text-base text-foreground/80 transition-colors group-hover:text-white/80">
                    {body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mt-8 rounded-3xl bg-[#06002e] p-6 text-lg leading-snug font-medium text-white sm:p-8 sm:text-xl">
            AI-Powered Marketing + ChatGPT &amp; ChatGPT Ads + Performance
            Marketing + GPT, Claude, Manus AI, Perplexity, Canva, Figma. All
            taught live, with practicals.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── AI toolkit ───────────────────────────────────────────────────── */
export function AiToolkit() {
  return (
    <section
      aria-labelledby="toolkit-h"
      className="bg-[#06002e] py-16 text-white md:py-28"
    >
      <div className={wrap}>
        <Reveal>
          <h2 id="toolkit-h" className={`${h2} max-w-3xl`}>
            Learn a full AI toolkit, not just one tool
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            People who learned AI moved ahead. People who didn&apos;t were left
            behind.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <li key={tool.name}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white/[0.06] p-6 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-white/[0.1] sm:p-7">
                  <ToolLogo tool={tool} size="lg" />
                  <h3 className="mt-6 font-heading text-2xl font-semibold tracking-[-0.02em]">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-white/75">{tool.job}</p>
                  <p className="mt-auto pt-6 font-medium text-[#ffd60a]">
                    {tool.line}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="sm:col-span-2 lg:col-span-3">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#ffd60a] p-7 text-[#06002e] sm:flex-row sm:items-center sm:p-9">
                <div>
                  <p className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-semibold tracking-[-0.03em]">
                    + 10 more AI tools
                  </p>
                  <p className="mt-3 max-w-xl text-base font-medium sm:text-lg">
                    Shown live in the seminar, every one with a practical demo.
                  </p>
                </div>
                <div className="flex -space-x-2" aria-hidden="true">
                  {TOOLS.map((t) => (
                    <span
                      key={t.name}
                      className="inline-flex shrink-0 rounded-full ring-2 ring-[#ffd60a]"
                    >
                      <ToolLogo tool={t} size="md" />
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ── Who should attend ────────────────────────────────────────────── */
const AUDIENCE: { Icon: IconType; label: string }[] = [
  { Icon: PiGraduationCap, label: "Students & job seekers" },
  { Icon: PiBriefcase, label: "Business owners" },
  { Icon: PiBuildings, label: "Institute & coaching owners" },
  { Icon: PiPaintBrush, label: "Freelancers & creators" },
];

/** Text on the left, image on the right. "What you get" below mirrors it. */
export function WhoShouldAttend() {
  return (
    <section aria-labelledby="who-h" className="section-light py-16 md:py-24">
      <div
        className={`${wrap} grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12`}
      >
        <div className="flex flex-col justify-center">
          <Reveal>
            <h2 id="who-h" className={h2}>
              Who should attend
            </h2>
            <p className="mt-4 max-w-md text-lg text-foreground/80">
              If you want leads, sales or growth, this seminar is for you.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {AUDIENCE.map(({ Icon, label }, i) => (
              <li key={label}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-5 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#06002e] hover:text-white">
                    <Icon className="size-8" aria-hidden="true" />
                    <span className="font-heading text-lg leading-snug font-semibold tracking-[-0.01em]">
                      {label}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="h-full" delay={0.1}>
          <div className="group relative h-96 overflow-hidden rounded-3xl bg-[#dfe2f3] sm:h-[28rem] lg:h-full lg:min-h-[30rem]">
            <Image
              src="/images/cute-robot.png"
              alt="The Vipprow AI assistant waving hello"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <p className="absolute bottom-4 left-4 rounded-full bg-[#06002e] px-4 py-2 text-sm font-medium text-white">
              Everyone starts as a beginner
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── What you get ─────────────────────────────────────────────────── */
const BENEFITS: { Icon: IconType; label: string }[] = [
  { Icon: PiPlayCircle, label: "Live practical learning" },
  { Icon: PiPresentationChart, label: "Real ads demo" },
  { Icon: PiChatsCircle, label: "Q&A session" },
  { Icon: PiCertificate, label: "Certificate" },
  { Icon: PiHandshake, label: "Networking with local business owners" },
];

export function WhatYouGet() {
  return (
    <section
      aria-labelledby="get-h"
      className="section-light bg-white! py-16 md:py-24"
    >
      <div className={`${wrap} grid gap-4 lg:grid-cols-[0.9fr_1.4fr]`}>
        <Reveal className="h-full">
          <div className="relative flex h-full min-h-80 flex-col overflow-hidden rounded-3xl bg-[#06002e] px-7 pt-7 text-white sm:px-9 sm:pt-9">
            <h2 id="get-h" className={`${h2}`}>
              What you get
            </h2>
            <p className="mt-4 text-white/75">
              Come with questions. Leave with a skill.
            </p>
            <Image
              src="/images/robot-peeking-left-without-bg.png"
              alt="The Vipprow AI assistant peeking in and waving"
              width={1086}
              height={1448}
              sizes="(min-width: 1024px) 260px, 50vw"
              className="pointer-events-none -mr-7 mt-4 -mb-10 h-64 w-auto translate-x-[22%] self-end object-contain sm:-mr-9 sm:h-72 lg:mt-auto"
            />
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4">
          {BENEFITS.map(({ Icon, label }, i) => (
            <li
              key={label}
              className={i === BENEFITS.length - 1 ? "col-span-2" : undefined}
            >
              <Reveal delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-muted p-5 transition-colors duration-300 hover:bg-[#ffd60a] sm:p-6">
                  <Icon className="size-9 text-[#06002e]" aria-hidden="true" />
                  <span className="font-heading text-lg leading-snug font-semibold tracking-[-0.01em] sm:text-xl">
                    {label}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Venue + contact ──────────────────────────────────────────────── */
export function VenueContact({ seminar }: { seminar: Seminar }) {
  const venue = seminar.venue;
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${ACADEMY_COORDS}`;
  const embed = ACADEMY_MAP_EMBED;

  const rows: { Icon: IconType; label: string; value: React.ReactNode }[] = [
    {
      Icon: PiCalendarBlank,
      label: "Date & time",
      value: `${formatSeminarDate(seminar.startsAt)}, ${formatSeminarTimeRange(seminar)}`,
    },
    ...(venue ? [{ Icon: PiMapPin, label: "Venue", value: venue }] : []),
    {
      Icon: PiPhone,
      label: "Contact",
      value: (
        <a
          href={`tel:${CONTACT_TEL}`}
          className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {CONTACT_PHONE}
        </a>
      ),
    },
  ];

  return (
    <section aria-labelledby="venue-h" className="section-light py-16 md:py-24">
      <div
        className={`${wrap} grid items-stretch gap-10 ${embed ? "lg:grid-cols-[0.9fr_1.1fr] lg:gap-12" : ""}`}
      >
        <div>
          <Reveal>
            <h2 id="venue-h" className={h2}>
              Venue &amp; contact
            </h2>
          </Reveal>
          <dl className="mt-8 grid gap-3">
            {rows.map(({ Icon, label, value }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="flex items-start gap-5 rounded-2xl bg-white p-5 sm:p-6">
                  <Icon
                    className="mt-0.5 size-8 shrink-0 text-[#06002e]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-heading text-lg font-semibold tracking-[-0.01em]">
                      {value}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
          {mapsLink && (
            <Reveal delay={0.2}>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 sm:w-auto rounded-full bg-[#06002e] px-7 py-3.5 sm:px-9 sm:py-4 font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-[#1a1659] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06002e]"
              >
                Get directions
                <PiArrowUpRight
                  className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          )}
        </div>

        {embed && (
          <Reveal className="h-full" delay={0.1}>
            <div className="relative h-80 overflow-hidden rounded-3xl bg-muted sm:h-96 lg:h-full lg:min-h-[28rem]">
              <iframe
                title="Vipprow Academy location on Google Maps"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
              {/* floating venue tag with a pulsing pin */}
              {/* <div className="pointer-events-none absolute top-4 left-4 flex max-w-[80%] items-center gap-3 rounded-2xl bg-[#06002e] py-2.5 pr-4 pl-3 text-white shadow-lg">
                <span className="relative flex size-3 shrink-0">
                  <span className="absolute inline-flex size-full rounded-full bg-[#ffd60a] opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-3 rounded-full bg-[#ffd60a]" />
                </span>
                <span className="truncate text-sm font-medium">{venue ?? "Vipprow Academy"}</span>
              </div> */}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
export function SeminarFaq({ seminar }: { seminar: Seminar }) {
  const items = [
    {
      q: "Do I need prior marketing knowledge?",
      a: "No. The seminar is beginner friendly.",
    },
    {
      q: "Do I need to bring a laptop?",
      a: "It isn't required. Bring a notebook to take notes.",
    },
    {
      q: `What do I get for ₹${seminar.feeRupees}?`,
      a: "Full access to the entire seminar.",
    },
    { q: "Will I get a certificate?", a: "Yes, every attendee gets one." },
  ];
  return (
    <section
      aria-labelledby="faq-h"
      className="section-light bg-white! py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <h2 id="faq-h" className={h2}>
            Questions, answered
          </h2>
        </Reveal>
        <div className="mt-8">
          {items.map((it) => (
            <details
              key={it.q}
              className="group border-b border-border py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md font-heading text-lg font-semibold tracking-[-0.01em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                {it.q}
                <PiCaretDown
                  className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-xl text-foreground/80">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
