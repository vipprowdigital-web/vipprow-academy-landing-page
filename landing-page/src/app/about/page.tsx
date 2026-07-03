import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { AboutProgram } from "@/components/sections/AboutProgram";
import { Instructor } from "@/components/sections/Instructor";
import { Placement } from "@/components/sections/Placement";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "About Us | Vipprow Academy",
  description:
    "Jabalpur's most immersive digital education platform. We build marketers and AI practitioners — not certificate holders.",
};

export default function AboutPage() {
  return (
    <>
      <main className="bg-white">
        <section className="section-light pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              About Vipprow
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Built by practitioners,
              <br />
              <span className="text-primary">not theorists.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Jabalpur&apos;s most immersive digital education platform. We
              build marketers and AI practitioners — not certificate holders.
            </p>
          </div>
        </section>
        <TrustedBy />
        <AboutProgram />
        <Instructor />
        <Placement />
        <FinalCTA />
      </main>
    </>
  );
}
