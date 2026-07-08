import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { Courses } from "@/components/sections/Courses";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getAppConfig } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "Courses | Vipprow Academy",
  description:
    "Explore industry-focused courses in Digital Marketing, Performance Marketing, SEO, AI Tools, and Business Growth. Learn through live projects with 100% placement assistance.",
};

export default async function CoursesPage() {
  const appConfig = await getAppConfig();
  return (
    <>
      <Navbar />
      <main>
        <section className="section-light pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              Our Programs
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
            >
              Learn today&apos;s most
              <br />
              <span className="text-primary">in-demand digital skills.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re starting your career, looking to upskill, or
              planning to grow your own business, our hands-on programs in
              Digital Marketing, Performance Marketing, SEO, AI Tools, and
              Branding are designed to make you industry-ready through live
              projects, expert mentorship, and 100% placement assistance.
            </p>
          </div>
        </section>
        <Courses />
        <Testimonials />
        <FinalCTA appConfig={appConfig} />
      </main>
    </>
  );
}
