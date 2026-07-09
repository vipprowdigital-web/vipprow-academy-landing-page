import type { Metadata } from "next";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { AboutProgram } from "@/components/sections/AboutProgram";
import { Instructor } from "@/components/sections/Instructor";
import { Placement } from "@/components/sections/Placement";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getAppConfig } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "About Vipprow Academy | Digital Marketing & AI Training",
  description:
    "Learn Digital Marketing, Performance Marketing, SEO, Google Ads, Meta Ads, and AI tools with hands-on training, live projects, expert mentorship, and 100% placement assistance at Vipprow Academy.",
};

export default async function AboutPage() {
  const appConfig = await getAppConfig();
  return (
    <>
      <main className="bg-white">
        <section className="section-light pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              About Vipprow
            </span> */}
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
            >
              Build Skills.
              <br />
              Build Confidence.
              <br />
              <span className="text-primary">Build Your Future.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              At Vipprow Academy, we believe that practical experience is the
              key to success. Our industry-focused programs combine Digital
              Marketing, Performance Marketing, AI tools, and real-world
              projects to help students build in-demand skills, gain confidence,
              and launch successful careers with expert mentorship and 100%
              placement assistance.
            </p>
          </div>
        </section>
        <TrustedBy />
        <AboutProgram />
        <Instructor />
        <Placement />
        <FinalCTA appConfig={appConfig} />
      </main>
    </>
  );
}
