import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import InsightsSection from "@/components/sections/InsightsSection";
import type { CardData } from "@/components/sections/InsightsSection";
import CourseSection from "@/components/sections/CourseSection";
import Image from "next/image";
import { getAppConfig } from "@/lib/appConfig";

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
      "Understand campaign objectives, marketing funnels, customer journeys, KPIs, and how performance marketing drives measurable business growth.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600",
  },
  {
    category: "Module 02",
    title: "Google Ads Mastery",
    description:
      "Learn Search, Display, Performance Max, Shopping, YouTube Ads, keyword research, bidding strategies, and campaign optimization.",
    imageUrl:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=600",
  },
  {
    category: "Module 03",
    title: "Meta Ads Mastery",
    description:
      "Launch high-converting Facebook and Instagram campaigns using audience targeting, retargeting, lookalike audiences, creatives, and campaign scaling.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=600",
  },
  {
    category: "Module 04",
    title: "Conversion Tracking & Analytics",
    description:
      "Master Google Analytics 4, Google Tag Manager, Meta Pixel, conversion APIs, UTM tracking, and performance reporting.",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600",
  },
  {
    category: "Module 05",
    title: "Landing Pages & CRO",
    description:
      "Create landing pages that convert, optimize user experience, run A/B tests, and improve lead generation with data-driven decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600",
  },
  {
    category: "Module 06",
    title: "AI & Campaign Automation",
    description:
      "Use ChatGPT, Gemini, AI-powered ad creatives, automation workflows, smart bidding, and reporting tools to improve campaign performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600",
  },
  {
    category: "Module 07",
    title: "E-commerce & Lead Generation",
    description:
      "Run campaigns for Shopify, local businesses, service industries, and e-commerce brands while optimizing ROAS and CPL.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600",
  },
  {
    category: "Module 08",
    title: "Client Projects & Career Preparation",
    description:
      "Build a professional portfolio, present campaign reports, prepare for interviews, and learn how to acquire freelance and agency clients.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600",
  },
];

const OUTCOMES = [
  "Launch and optimize Google Ads campaigns",
  "Create profitable Meta Ads campaigns",
  "Implement GA4, GTM, Meta Pixel & conversion tracking",
  "Improve landing page conversion rates using CRO",
  "Use AI tools to create and optimize ad campaigns",
  "Generate leads and sales for businesses and e-commerce brands",
  "Analyze campaign performance with professional reports",
  "Build an industry-ready portfolio through live projects",
  "Prepare for agency jobs, freelancing, or your own business",
];

export default async function PerformanceMarketingPage() {
  const appConfig = await getAppConfig();
  return (
    <div className="section-light min-h-screen">
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
        imageAlt="Learner working through Vipprow Academy's Performance Marketing course"
        eyebrow="Performance Marketing"
        heading="Master paid advertising that pays for itself."
        description="Master Google Ads, Meta Ads, Google Tag Manager, Analytics, AI-powered optimization, and conversion-focused strategies through live campaigns and real-world projects."
        ctaLabel="Enroll in this Course"
        ctaHref="/enroll"
        variant="performance-marketing"
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
                By the end of this program, you&apos;ll confidently create,
                manage, optimize, and scale high-performing advertising
                campaigns using Google Ads, Meta Ads, analytics, AI tools, and
                conversion tracking—equipping you for agency roles, in-house
                marketing teams, freelancing, or launching your own performance
                marketing business.
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

      <FinalCTA appConfig={appConfig} />
    </div>
  );
}
