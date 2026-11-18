import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SeminarHero } from "@/components/sections/SeminarHero";
import { SeminarRegister } from "@/components/sections/SeminarRegister";
import {
  formatSeminarDate,
  formatSeminarTime,
  getSeminar,
} from "@/lib/seminars";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = await getSeminar(id);
  if (!s) return { title: "Seminar not found | Vipprow Academy" };
  const intro = s.description?.split(/\n\s*\n/)[0];
  return {
    title: `${s.title} | Seminar | Vipprow Academy`,
    description:
      intro ??
      `Live seminar on ${formatSeminarDate(s.startsAt)}, ${formatSeminarTime(s.startsAt)}. ₹${s.feeRupees}.`,
  };
}

/** The backend sends plain text: blank lines separate blocks, a trailing ":" marks a sub-heading. */
function Description({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-[1.0625rem] leading-relaxed">
      {blocks.map((b, i) =>
        b.endsWith(":") && b.length < 80 ? (
          <h3
            key={i}
            className="!mt-9 font-heading text-xl font-semibold tracking-[-0.02em]"
          >
            {b.slice(0, -1)}
          </h3>
        ) : (
          <p key={i} className="text-foreground/85">
            {b}
          </p>
        ),
      )}
    </div>
  );
}

export default async function SeminarPage({ params }: Props) {
  const { id } = await params;
  const seminar = await getSeminar(id);
  if (!seminar) notFound();

  return (
    <main>
      <SeminarHero seminar={seminar} />

      <div className="section-light bg-white!">
        {seminar.description && (
          <section aria-labelledby="about-h" className="pt-16 md:pt-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-6">
              <h2
                id="about-h"
                className="mb-6 font-heading text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                About this seminar
              </h2>
              <Description text={seminar.description} />
            </div>
          </section>
        )}

        <section
          id="register"
          aria-labelledby="register-h"
          className="scroll-mt-24 py-16 md:py-24"
        >
          <div className="mx-auto max-w-2xl px-5 sm:px-6">
            <h2
              id="register-h"
              className="mb-2 text-center font-heading text-3xl font-semibold tracking-[-0.03em]"
            >
              Reserve your seat
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              ₹{seminar.feeRupees} registration. Your seat is confirmed once
              payment succeeds.
            </p>
            <SeminarRegister seminar={seminar} />
            <p className="mt-8 text-center">
              <Link
                href="/seminars"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                All seminars
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
