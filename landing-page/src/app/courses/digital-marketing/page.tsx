import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import InsightsSection from "@/components/sections/InsightsSection";
import type { CardData } from "@/components/sections/InsightsSection";
import CourseSection from "@/components/sections/CourseSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Digital Marketing | Vipprow Academy",
  description:
    "Master SEO, Google Ads, Social Media, Content Marketing and Analytics in 12 weeks. Industry-aligned training built for real outcomes.",
};

const DM_CARDS: CardData[] = [
  {
    category: "Module 01",
    title: "Foundations of Digital Marketing",
    description:
      "Understand the full digital ecosystem — marketing funnels, consumer psychology and how every channel works together to drive results.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
  },
  {
    category: "Module 02",
    title: "SEO & Content Marketing",
    description:
      "Drive consistent organic traffic through keyword research, on-page optimisation, link building and a content strategy that ranks.",
    imageUrl:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=600",
  },
  {
    category: "Module 03",
    title: "Social Media Marketing",
    description:
      "Build and grow an audience on Instagram, Facebook and LinkedIn with platform-native content, Reels and a consistent brand voice.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600",
  },
  {
    category: "Module 04",
    title: "Email & Marketing Automation",
    description:
      "Build high-converting email campaigns, grow your list and automate your entire nurture flow so leads convert while you sleep.",
    imageUrl:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=600",
  },
  {
    category: "Module 05",
    title: "Analytics & Reporting",
    description:
      "Turn raw GA4 data into clear decisions — track campaigns, attribute conversions and build dashboards stakeholders actually read.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  },
  {
    category: "Module 06",
    title: "Brand Building & Strategy",
    description:
      "Craft a brand identity that earns trust — from positioning and messaging to integrated campaigns that drive long-term growth.",
    imageUrl:
      "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=600",
  },
];

const OUTCOMES = [
  "Run end-to-end digital campaigns from strategy to execution",
  "Grow organic traffic with proven SEO techniques",
  "Build and manage a brand across all social platforms",
  "Make data-driven decisions using analytics tools",
  "Create compelling content that converts",
  "Launch email campaigns with high open and click rates",
];

export default function DigitalMarketingPage() {
  return (
    <>
      <Navbar />
      <main className="section-light min-h-screen relative">
        {/* Hero */}
        {/* <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
              Course
            </span>
            <h1
              className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Digital Marketing
              <br />
              <span className="text-primary">Mastery.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              A 12-week, hands-on program covering SEO, Social Media, Content, Email and
              Analytics — everything you need to launch and scale campaigns with real ROI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                ⏱ 12 Weeks
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                📊 Beginner → Expert
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                🗂 6 Modules
              </span>
            </div>
            <Link href="/enroll">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#7c3aed" }}
              >
                Enroll in this Course →
              </button>
            </Link>
          </div>
        </section> */}

        <CourseSection
          imageSrc="/images/image-1.jpg"
          imageAlt="Learner working through a Vipprow Academy course"
          eyebrow="Vipprow Academy"
          heading="Learn skills that move as fast as the internet does"
          description="Practical digital marketing and AI courses built for the Indian market — taught by people who ship, not just teach."
          ctaLabel="Explore courses"
          ctaHref="/courses"
        />

        {/* What you'll learn — HoverCards */}
        <section className="relative py-16 md:py-24 border-t border-border/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-3">
                Curriculum
              </span>
              <h2
                className="font-heading font-bold tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                What you&apos;ll learn
              </h2>
            </div>
            <InsightsSection cards={DM_CARDS} cols={3} />
          </div>

          <div className="hidden md:block absolute -right-19 top-30 -translate-y-1/2 -translate-x-1/4 pointer-events-none z-10">
            <Image
              src="/images/robot-peeking-left-without-bg.png"
              alt="Robot cute peeking"
              width={500}
              height={200}
              className="w-40"
            />
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16 md:py-24 border-t border-border/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-3">
                  Outcomes
                </span>
                <h2
                  className="font-heading font-bold tracking-tight mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                >
                  What you&apos;ll be able to do
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By the end of this program, you won&apos;t just understand
                  digital marketing — you&apos;ll be executing it at a
                  professional level across every major channel.
                </p>
              </div>
              <ul className="space-y-3">
                {OUTCOMES.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                      style={{ background: "#7c3aed" }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
