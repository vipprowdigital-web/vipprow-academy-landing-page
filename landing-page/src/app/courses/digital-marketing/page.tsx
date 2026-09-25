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
    title: "Introduction to Digital Marketing",
    description:
      "What is Digital Marketing, Importance & Benefits, Digital Marketing Channels Overview, How Digital Marketing Works, Career Opportunities in Digital Marketing, and Tools & Resources Overview.",
  },
  {
    category: "Module 02",
    title: "Website Planning & Development",
    description:
      "Domain & Hosting Basics, Website Planning & Structure, WordPress Installation, Theme & Plugin Setup, Pages, Posts & Menus Management, Introduction to Landing Pages, and Basic On-Page Setup.",
  },
  {
    category: "Module 03",
    title: "Search Engine Optimization (SEO)",
    description:
      "SEO Basics & How Search Engines Work, Keyword Research & Analysis, On-Page SEO (Title, Meta, Headings, Content), URL Structure & Internal Linking, Technical SEO Basics, Off-Page SEO (Backlinks Overview), and SEO Tools Introduction.",
  },
  {
    category: "Module 04",
    title: "Search Engine Marketing (SEM)",
    description:
      "Google Ads Fundamentals, Search Campaigns, Display Advertising, Keyword Planning, and Budget & Bidding Strategies.",
  },
  {
    category: "Module 05",
    title: "Social Media Marketing (SMM)",
    description:
      "Facebook Marketing, Instagram Marketing, LinkedIn Marketing, YouTube Marketing, and Social Media Strategy.",
  },
  {
    category: "Module 06",
    title: "Content Marketing",
    description:
      "Content Strategy, Copywriting, Blogging, Video Content, and Brand Storytelling.",
  },
  {
    category: "Module 07",
    title: "Email Marketing",
    description:
      "Email Marketing Basics, Building Email Lists, Email Campaigns, Automation & Workflows, and Email Design & Best Practices.",
  },
  {
    category: "Module 08",
    title: "Web Analytics",
    description:
      "Introduction to Web Analytics, Google Analytics Overview, Traffic Sources Analysis, User Behavior & Reports, and Goals, Events & Conversions.",
  },
  {
    category: "Module 09",
    title: "E-Commerce Marketing",
    description:
      "E-Commerce Marketing Basics, Product Research & Positioning, Marketing Strategies, Conversion Rate Optimization, and Customer Retention & Loyalty.",
  },
  {
    category: "Module 10",
    title: "Artificial Intelligence (AI) for Digital Marketing",
    description:
      "Introduction to AI in Marketing, ChatGPT & AI Productivity, AI Content Creation, AI Image Generation, AI Video Creation, AI for SEO & Blogging, AI-Powered Social Media Marketing, AI Email Marketing, and AI Research & Prompt Engineering.",
  },
  {
    category: "Module 11",
    title: "Advanced AI & Automation",
    description:
      "AI Workflow Automation, Marketing Automation Tools, AI Chatbots, No-Code AI Automation, AI CRM & Lead Management, AI Data Analysis, AI Sales Funnel Automation, AI Business Productivity, and Future AI Trends.",
  },
  {
    category: "Module 12",
    title: "Advanced Digital Marketing Techniques",
    description:
      "Conversion Rate Optimization (CRO), Marketing Funnels & Customer Journey, Advanced SEO Techniques, Paid Advertising Strategies (Google Ads, Meta Ads), Retargeting & Remarketing Strategies, Growth Hacking & Performance Marketing, A/B Testing & Data-Driven Marketing, and Multichannel Marketing Strategies.",
  },
  {
    category: "Module 13",
    title: "Practical Assignments & Live Projects",
    description:
      "Real-World Project Implementation, Industry-Based Case Studies, Campaign Planning & Execution, Performance Analysis & Reporting, Client Handling & Communication, Team Collaboration & Project Management, Live Project Presentation & Evaluation, and Portfolio Building.",
  },
  {
    category: "Module 14",
    title: "Career Guidance & Certification",
    description:
      "Career Path in Digital Marketing, Resume Building & LinkedIn Optimization, Interview Preparation & Mock Sessions, Personal Branding & Freelancing, Job Opportunities & Placement Support, Internship Assistance, Industry Recognized Certification, and Lifetime Learning & Growth Support.",
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

      {/* Course Overview */}
      <section className="py-16 md:py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6">
          {/* Intro */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            A comprehensive digital marketing program designed to build your skills, enhance your knowledge, and{" "}
            <span className="text-primary font-semibold">accelerate your career growth.</span>
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {/* Duration */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-heading font-bold">Duration</span>
              <p className="font-heading font-black text-5xl text-foreground leading-none">3</p>
              <p className="font-heading font-bold text-lg text-foreground">MONTHS</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Intensive structured learning with practical hands-on training.</p>
            </div>

            {/* Learning Mode */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 flex flex-col gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-heading font-bold text-center">Learning Mode</span>
              <p className="font-heading font-bold text-base text-foreground text-center">OFFLINE</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Live Interactive Classes</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Monday to Thursday</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>1.5 Hours Per Day</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Practical Assignments</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>24/7 Access to Study Materials</li>
              </ul>
            </div>

            {/* Certification */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-heading font-bold">Certification</span>
              <p className="font-heading font-bold text-base text-foreground uppercase leading-tight">Industry Recognized Certification</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Earn a globally recognized certification and boost your professional credibility.</p>
            </div>

            {/* Career Support */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 flex flex-col gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-heading font-bold text-center">Career Support</span>
              <p className="font-heading font-bold text-sm text-foreground text-center uppercase leading-tight">100% Support for Your Career Growth</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Resume Building</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Interview Preparation</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Job Assistance</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Freelance Guidance</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Career Counseling</li>
              </ul>
            </div>

            {/* Course Features */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 flex flex-col gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-heading font-bold text-center">Course Features</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>14 Comprehensive Modules</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Practical &amp; Hands-on Training</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Live Projects &amp; Case Studies</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>AI-Powered Learning</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Industry Expert Mentorship</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">●</span>Updated Curriculum as per Industry Trends</li>
              </ul>
            </div>
          </div>

          {/* Our Promise */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-primary mb-2 tracking-wide uppercase">Our Promise</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                At VIPPROW Academy, we are committed to providing quality education, practical exposure, and continuous support to help you achieve your{" "}
                <span className="text-primary font-semibold">career goals</span> in the digital marketing industry.
              </p>
            </div>
          </div>
        </div>
      </section>

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
