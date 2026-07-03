import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { Courses } from "@/components/sections/Courses";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Courses | Vipprow Academy",
  description:
    "Explore our industry-aligned programs in Digital Marketing and AI & Machine Learning. Built for real outcomes, not certificates.",
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-light pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              Programs
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Two programs.
              <br />
              <span className="text-primary">Infinite possibilities.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Each program is deeply researched, industry-aligned and designed
              for real outcomes — not certificates.
            </p>
          </div>
        </section>
        <Courses />
        <Testimonials />
        <FinalCTA />
      </main>
    </>
  );
}
