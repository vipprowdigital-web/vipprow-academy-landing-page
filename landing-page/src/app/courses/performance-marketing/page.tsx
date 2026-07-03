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
  title: "Performance Marketing | Vipprow Academy",
  description:
    "Master Google Ads, Meta Ads, conversion optimisation and ROI-driven campaigns in 10 weeks. Built for real results.",
};

const PM_CARDS: CardData[] = [
  {
    category: "Module 01",
    title: "Performance Marketing Fundamentals",
    description:
      "Learn the difference between paid and organic, how conversion funnels work, and how to architect campaigns built for measurable ROI.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600",
  },
  {
    category: "Module 02",
    title: "Google Ads — Search & Display",
    description:
      "Master keyword bidding, match types, ad copywriting and Quality Score to win clicks that actually convert on Search and Display.",
    imageUrl:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=600",
  },
  {
    category: "Module 03",
    title: "Meta Ads — Facebook & Instagram",
    description:
      "Build profitable Meta funnels using advanced audience targeting, retargeting, lookalikes and scroll-stopping creative strategy.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=600",
  },
  {
    category: "Module 04",
    title: "Landing Pages & CRO",
    description:
      "Design pages that convert visitors into leads and customers, then run A/B tests that compound your results month over month.",
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600",
  },
  {
    category: "Module 05",
    title: "Analytics & Attribution",
    description:
      "Track every touchpoint with GA4, UTM parameters and multi-touch attribution models so you know exactly what's driving revenue.",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600",
  },
  {
    category: "Module 06",
    title: "Scaling & Automation",
    description:
      "Scale your best-performing campaigns confidently using smart bidding, automated rules and proven budget scaling frameworks.",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600",
  },
];

const OUTCOMES = [
  "Run profitable Google Ads campaigns from scratch",
  "Build high-converting Meta Ads funnels",
  "Write ad copy that stops the scroll and drives clicks",
  "Optimise landing pages to maximise conversion rates",
  "Track and attribute performance across every channel",
  "Scale campaigns while maintaining positive ROAS",
];

export default function PerformanceMarketingPage() {
  return (
    <>
      <Navbar />
      <main className="section-light min-h-screen">
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
              Performance
              <br />
              <span className="text-primary">Marketing.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              A 10-week, results-focused program on paid advertising — Google Ads, Meta Ads,
              CRO and analytics. Every rupee spent, tracked and optimised.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                ⏱ 10 Weeks
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                📊 Beginner → Advanced
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-muted/40">
                🗂 6 Modules
              </span>
            </div>
            <Link href="/enroll">
              <button
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#4f46e5" }}
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
            <InsightsSection cards={PM_CARDS} cols={3} />
          </div>

          <div className="hidden md:block absolute -right-19 top-30 -translate-y-1/2 -translate-x-1/4 pointer-events-none z-10">
            <Image
              src="/images/robot-peeking-left-wihout-bg.png"
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
            <div className="grid md:grid-cols-2 gap-15 items-center">
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
                  Graduate as a performance marketer who doesn&apos;t guess —
                  you&apos;ll make every campaign decision based on data and
                  proven frameworks.
                </p>
              </div>
              <ul className="space-y-3">
                {OUTCOMES.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold bg-primary">
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
