import Image from "next/image";
import { PiArrowDown, PiMapPin, PiPhone } from "react-icons/pi";
import { TOOLS, ToolLogo } from "@/components/seminar/brand-icons";
import { CONTACT_PHONE, CONTACT_TEL } from "@/components/seminar/contact";
import {
  formatSeminarDate,
  formatSeminarTimeRange,
  formatSeminarTime,
  seminarDateParts,
  type Seminar,
} from "@/lib/seminars";

// Transparent cutout (background removed).
const PHOTO = "/seminar/speaker.webp";

const FADE =
  "linear-gradient(to bottom, #000 70%, transparent 100%)";

/** Pale vertical bars with a greyscale echo of the speaker, like the poster's side panels. */
function EchoPanel({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={
        "absolute top-0 hidden h-[82%] w-[27%] overflow-hidden rounded-t-xl bg-white/10 sm:block " +
        (side === "left" ? "left-[4%]" : "right-[4%]")
      }
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <Image
        src={PHOTO}
        alt=""
        fill
        sizes="27vw"
        className={
          "object-cover object-top opacity-50 grayscale " +
          (side === "right" ? "scale-x-[-1]" : "")
        }
      />
    </div>
  );
}

export function SeminarHero({ seminar }: { seminar: Seminar }) {
  const date = seminarDateParts(seminar.startsAt);
  const soldOut = seminar.seatsLeft <= 0;
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ background: "var(--gradient-scene)" }}
    >
      {/* soft grain, like the poster's brushed texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <div className="mx-auto max-w-5xl px-5 pt-16 sm:px-6 sm:pt-20 md:pt-25">
        <ul className="mx-auto hidden w-fit max-w-full sm:flex flex-wrap items-center justify-center gap-x-5 gap-y-1 rounded-2xl bg-white/10 px-5 py-2.5 text-sm font-medium">
          <li>
            {formatSeminarDate(seminar.startsAt)} · {date.weekday} ·{" "}
            {formatSeminarTime(seminar.startsAt)}
          </li>
          {seminar.venue && (
            <li className="max-w-[16rem] truncate">{seminar.venue}</li>
          )}
          <li>Entry only ₹{seminar.feeRupees}</li>
          <li className="inline-flex items-center gap-2">
            <span
              className="size-1.5 animate-pulse rounded-full bg-[#ffd60a]"
              aria-hidden="true"
            />
            {soldOut
              ? "Sold out"
              : `${seminar.seatsLeft} ${seminar.seatsLeft === 1 ? "seat" : "seats"} left`}
          </li>
        </ul>

        {/* Speaker composition */}
        <div className="relative mx-auto mt-0 sm:mt-8 h-88 w-full sm:h-120 md:h-144">
          <EchoPanel side="left" />
          <EchoPanel side="right" />

          <div
            className="absolute inset-y-0 left-1/2 w-[86%] -translate-x-1/2 sm:w-[48%]"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          >
            <Image
              src={PHOTO}
              alt="Reva Prasad Tiwari, founder of Vipprow Academy and seminar speaker"
              fill
              priority
              sizes="(min-width: 640px) 48vw, 86vw"
              className="object-contain object-bottom"
            />
          </div>

          {/* floating labels, as in the poster */}
          <div className="absolute left-0 top-[44%] hidden text-left sm:block md:left-2">
            <p className="font-heading text-lg italic leading-tight md:text-xl">
              Reva Prasad Tiwari
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">
              Speaker
            </p>
          </div>
          <div className="absolute right-0 top-[44%] hidden text-right sm:block md:right-2">
            <p className="font-heading text-lg italic leading-tight md:text-xl">
              Vipprow Academy
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">
              Host
            </p>
          </div>
        </div>

        {/* Title, overlapping the photo's faded base */}
        <div className="relative z-10 -mt-24 text-center sm:-mt-32 md:-mt-40">
          <p
            aria-hidden="true"
            className="font-heading text-[clamp(3.2rem,13vw,8.5rem)] leading-[0.9] font-semibold uppercase tracking-[0.04em] text-transparent [-webkit-text-stroke:2px_#fff]"
          >
            Seminar
          </p>
          <h1 className="mt-1 font-heading text-[clamp(1.9rem,6.4vw,4.6rem)] leading-[0.98] font-extrabold uppercase italic tracking-[-0.02em] text-balance">
            <span className="sr-only">Seminar: </span>
            {seminar.title}
          </h1>
        </div>

        {/* Date | venue bar */}
        <div className="mx-auto mt-10 hidden max-w-3xl flex-col items-center gap-6 sm:flex sm:flex-row sm:justify-center sm:gap-8">
          <div className="text-center sm:text-left">
            <p className="font-heading text-[clamp(3.5rem,9vw,5.5rem)] leading-[0.85] font-extrabold italic">
              {date.day}
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em]">
              {date.month} {date.year}
            </p>
          </div>
          <div className="hidden h-24 w-px bg-white/50 sm:block" aria-hidden="true" />
          <div className="flex items-center gap-4 text-center sm:text-left">
            <PiMapPin className="hidden size-11 shrink-0 sm:block" aria-hidden="true" />
            <div>
              <p className="font-heading text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                {formatSeminarTimeRange(seminar)}
              </p>
              <p className="mt-1 text-sm text-white/80">
                {date.weekday}
                {seminar.reportingAt &&
                  ` · Reporting ${formatSeminarTime(seminar.reportingAt)}`}
              </p>
              {seminar.venue && (
                <p className="mt-1 max-w-xs text-sm leading-snug text-white/80">
                  {seminar.venue}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-lg leading-snug font-medium text-balance sm:text-xl">
            Running ads but not getting results? Learn AI the way that actually
            works.
          </p>
          <p className="mt-3 font-heading text-xl font-semibold text-[#ffd60a]">
            Learn AI. Master Marketing. Grow Faster.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-4 sm:flex-row">
          <a
            href="#register"
            className="group inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-7 py-3.5 sm:px-9 sm:py-4 font-semibold text-[#06002e] transition-[background-color,color,transform] duration-300 hover:bg-transparent hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {soldOut ? "Sold out" : `Register now · ₹${seminar.feeRupees}`}
            <PiArrowDown className="size-4.5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a
            href={`tel:${CONTACT_TEL}`}
            className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 sm:px-9 sm:py-4 font-semibold transition-[border-color,background-color,transform] duration-300 hover:border-white hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <PiPhone className="size-4.5" aria-hidden="true" />
            Call {CONTACT_PHONE}
          </a>
        </div>
        <p className="mt-5 text-center text-sm text-white/80">
          A live, practical seminar. The first of its kind in the city.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 pb-14 sm:flex-row sm:justify-center md:pb-20">
          <div className="flex -space-x-2" aria-hidden="true">
            {TOOLS.map((t) => (
              <span key={t.name} className="inline-flex shrink-0 rounded-full ring-2 ring-[#06002e]">
                <ToolLogo tool={t} size="sm" />
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-white/85 sm:text-left">
            GPT, Claude, Manus AI, Perplexity, Canva, Figma. All in one
            seminar.
          </p>
        </div>
      </div>
    </section>
  );
}
