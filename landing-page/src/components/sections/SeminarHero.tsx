import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import {
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
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <div className="mx-auto max-w-5xl px-5 pt-28 sm:px-6 md:pt-36">
        <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          {soldOut
            ? "Live seminar · Sold out"
            : `Live seminar · ${seminar.seatsLeft} ${seminar.seatsLeft === 1 ? "seat" : "seats"} left`}
        </p>

        {/* Speaker composition */}
        <div className="relative mx-auto mt-8 h-[22rem] w-full sm:h-[30rem] md:h-[36rem]">
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
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
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
            <MapPin size={44} strokeWidth={1.5} className="hidden shrink-0 sm:block" aria-hidden="true" />
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

        {/* CTA pill, like the poster's link bar */}
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-3 pb-14 sm:flex-row sm:items-center md:pb-20">
          <a
            href="#register"
            className="group inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-6 font-semibold text-[#06002e] transition-[background-color,color,transform] duration-300 hover:bg-transparent hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {soldOut ? "Sold out" : `Register now · ₹${seminar.feeRupees}`}
            <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
