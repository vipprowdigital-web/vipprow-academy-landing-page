import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="section-light flex min-h-svh flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Error 404
      </p>
      <h1 className="mt-4 font-heading text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="solid" size="lg" arrow>
          Back to home
        </ButtonLink>
        <Link
          href="/courses"
          className="inline-flex items-center rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Browse courses
        </Link>
      </div>
    </main>
  );
}
