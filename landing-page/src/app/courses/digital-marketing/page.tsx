import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import InsightsSection from "@/components/sections/InsightsSection";
import type { CardData } from "@/components/sections/InsightsSection";
import CourseSection from "@/components/sections/CourseSection";
import Image from "next/image";
import { getAppConfig } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "Digital Marketing | Vipprow Academy",
  description:
    "Master SEO, Google Ads, Social Media, Content Marketing and Analytics in 12 weeks. Industry-aligned training built for real outcomes.",
};

const DM_CARDS: CardData[] = [
  {
    category: "Module 01",
    title: "Digital Marketing Fundamentals",
    description:
      "Understand digital marketing, customer journeys, sales funnels, branding, and the complete digital ecosystem.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
  },
  {
    category: "Module 02",
    title: "SEO & Local SEO",
    description:
      "Learn keyword research, on-page SEO, technical SEO, Google Search Console, local SEO, and ranking strategies.",
    imageUrl:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=600",
  },
  // {
  // category: "Module 03",
  //   title: "Performance Marketing",
  //   description:
  //     "Create and optimize Google Ads and Meta Ads campaigns, understand conversion tracking, ROAS, and audience targeting.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  // },
  {
    category: "Module 03",
    title: "Social Media & Content Marketing",
    description:
      "Plan content calendars, create engaging posts and Reels, build communities, and grow brands across major social platforms.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600",
  },
  {
    category: "Module 04",
    title: "AI Tools for Marketers",
    description:
      "Master ChatGPT, Gemini, Canva AI, AI automation, prompt engineering, and productivity tools used by modern marketers.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600",
  },
  {
    category: "Module 05",
    title: "Analytics & Conversion Tracking",
    description:
      "Use GA4, Google Tag Manager, Looker Studio, and reporting dashboards to measure campaign performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  },
  {
    category: "Module 06",
    title: "WordPress & Landing Pages",
    description:
      "Build professional websites and high-converting landing pages without coding using WordPress and modern tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
  },
  {
    category: "Module 07",
    title: "Career, Freelancing & Portfolio",
    description:
      "Build your portfolio, optimize LinkedIn, prepare for interviews, find freelance clients, and launch your digital marketing career.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600",
  },
];

const OUTCOMES = [
  "Plan and execute complete digital marketing campaigns",
  "Run Google Ads and Meta Ads with confidence",
  "Improve website rankings using SEO & Local SEO",
  "Create engaging social media and content strategies",
  "Use AI tools to automate marketing workflows",
  "Track campaign performance with GA4 & Tag Manager",
  "Build websites and high-converting landing pages",
  "Develop a professional portfolio with live projects",
  "Prepare for interviews, freelancing, or agency growth",
];

export default async function DigitalMarketingPage() {
  const appConfig = await getAppConfig();
  return (
    <div className="section-light min-h-screen relative">
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
        imageAlt="Learner working through Vipprow Academy's Digital Marketing course"
        eyebrow="Digital Marketing"
        heading="Master digital marketing, from strategy to execution."
        description="A practical, industry-focused program covering Digital Marketing, Performance Marketing, SEO, Google Ads, Meta Ads, AI tools, Analytics, and real-world projects to prepare you for jobs, freelancing, or building your own agency."
        ctaLabel="Enroll in this Course"
        ctaHref="/enroll"
        variant="digital-marketing"
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
            className="w-40 h-auto"
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
                By the end of this program, you&apos;ll have the practical
                skills, portfolio, and confidence to work as a Digital Marketing
                Professional, Performance Marketer, SEO Specialist, Freelancer,
                or even launch your own agency using the latest AI-powered
                marketing tools.
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
