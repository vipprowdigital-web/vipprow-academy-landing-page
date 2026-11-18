import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, LogIn, MapPin, Ticket } from "lucide-react";
import {
  formatSeminarTime,
  formatSeminarTimeRange,
  getSeminars,
  seminarDateParts,
  type Seminar,
} from "@/lib/seminars";

export const metadata: Metadata = {
  title: "Seminars | Vipprow Academy",
  description:
    "Join Vipprow Academy's live, small-group marketing seminars. Practical sessions on performance marketing, AI-powered marketing and more. Limited seats.",
};

function SeminarCard({ s }: { s: Seminar }) {
  const d = seminarDateParts(s.startsAt);
  const soldOut = s.seatsLeft <= 0;
  const intro = s.description?.split(/\n\s*\n/)[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgba(6,0,46,0.04)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(6,0,46,0.28)]">
      <div
        className="flex items-end justify-between gap-4 p-6 text-white sm:p-7"
        style={{ background: "var(--gradient-scene)" }}
      >
        <div>
          <p className="font-heading text-6xl leading-[0.85] font-extrabold italic">
            {d.day}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em]">
            {d.month} {d.year}
          </p>
        </div>
        <span
          className={
            "rounded-full px-3 py-1 text-xs font-semibold " +
            (soldOut ? "bg-white/15 text-white/80" : "bg-white text-navy")
          }
        >
          {soldOut
            ? "Sold out"
            : `${s.seatsLeft} ${s.seatsLeft === 1 ? "seat" : "seats"} left`}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em]">
          <Link
            href={`/seminars/${s.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
          >
            {s.title}
          </Link>
        </h2>
        {intro && (
          <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}

        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Clock size={15} aria-hidden="true" />
            {d.weekday}, {formatSeminarTimeRange(s)}
          </li>
          {s.reportingAt && (
            <li className="flex items-center gap-2">
              <LogIn size={15} aria-hidden="true" />
              Reporting {formatSeminarTime(s.reportingAt)}
            </li>
          )}
          {s.venue && (
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {s.venue}
            </li>
          )}
          <li className="flex items-center gap-2">
            <Ticket size={15} aria-hidden="true" />₹{s.feeRupees} registration
          </li>
        </ul>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary"
        >
          {soldOut ? "View details" : "Reserve your seat"}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}

export default async function SeminarsPage() {
  const seminars = await getSeminars();

  return (
    <main className="section-light min-h-screen">
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Live sessions
          </span>
          <h1 className="mt-4 font-heading text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
            Learn in the room.
            <br />
            <span className="text-primary">Seminars with limited seats.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Short, practical sessions run by working marketers, kept small so
            you can ask anything.
          </p>
        </div>
      </section>

      <section aria-label="Upcoming seminars" className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {seminars.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {seminars.map((s) => (
                <SeminarCard key={s.id} s={s} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                No seminars open right now
              </h2>
              <p className="mt-3 text-muted-foreground">
                New sessions are announced regularly. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
