// import type { Metadata } from "next";
// import { Navbar } from "@/components/navbar/Navbar";
// import { Courses } from "@/components/sections/Courses";
// import { Testimonials } from "@/components/sections/Testimonials";
// import { FinalCTA } from "@/components/sections/FinalCTA";
// import { getAppConfig } from "@/lib/appConfig";

// export const metadata: Metadata = {
//   title: "Courses | Vipprow Academy",
//   description:
//     "Explore industry-focused courses in Digital Marketing, Performance Marketing, SEO, AI Tools, and Business Growth. Learn through live projects with 100% placement assistance.",
// };

// export default async function CoursesPage() {
//   const appConfig = await getAppConfig();
//   return (
//     <>
//       <main>
//         <section className="section-light pt-32 pb-16 md:pt-40 md:pb-24">
//           <div className="max-w-7xl mx-auto px-6 text-center">
//             <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4">
//               Our Programs
//             </span>
//             <h1
//               className="font-heading font-bold tracking-tight leading-[1.05] mb-6"
//               style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
//             >
//               Learn today&apos;s most
//               <br />
//               <span className="text-primary">in-demand digital skills.</span>
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
//               Whether you&apos;re starting your career, looking to upskill, or
//               planning to grow your own business, our hands-on programs in
//               Digital Marketing, Performance Marketing, SEO, AI Tools, and
//               Branding are designed to make you industry-ready through live
//               projects, expert mentorship, and 100% placement assistance.
//             </p>
//           </div>
//         </section>
//         <Courses />
//         <FinalCTA appConfig={appConfig} />
//       </main>
//     </>
//   );
// }

// components/sections/StackingCourseCards.tsx

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DigitalMarketingAnimation from "@/components/animations/DigitalMarketingAnimation";
import PerformanceMarketingAnimation from "@/components/animations/PerformanceMarketingAnimation";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  {
    id: "digital-marketing",
    index: "01",
    title: "Digital Marketing",
    description:
      "SEO, social media, content and email — the complete foundation to plan, launch and grow campaigns that convert.",
    // Visual: DigitalMarketingAnimation,
  },
  {
    id: "performance-marketing",
    index: "02",
    title: "Performance Marketing",
    description:
      "Paid media, funnels and analytics — turn ad spend into measurable, scalable ROI across every channel.",
    // Visual: PerformanceMarketingAnimation,
  },
];

export default function StackingCourseCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        // Pin this card in place; the next card (normal doc flow) scrolls
        // up over it, creating the stack. pinSpacing:false = no gap added.
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=88",
          pin: true,
          pinSpacing: false,
        });

        // Scale + dim the card slightly as the next one covers it
        const next = cards[i + 1];
        if (next) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top+=88",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-white section-light pt-32 pb-16 md:pt-40 md:pb-24"
    >
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
          planning to grow your own business, our hands-on programs in Digital
          Marketing, Performance Marketing, SEO, AI Tools, and Branding are
          designed to make you industry-ready through live projects, expert
          mentorship, and 100% placement assistance.
        </p>
      </div>
      {COURSES.map((course, i) => (
        <div
          key={course.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div
            className="w-full max-w-5xl rounded-3xl border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-12 origin-top"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.18 0.035 258), oklch(0.08 0.02 258))",
            }}
          >
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium text-secondary mb-3 tracking-wide uppercase">
                Course {course.index}
              </span>
              <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
                {course.title}
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
                {course.description}
              </p>
              <button
                className="mt-8 w-fit bg-linear-to-r from-primary to-button px-6 py-3 rounded-xl text-white font-bold"
                onClick={() => router.push("/enroll")}
              >
                Enroll Now
              </button>
            </div>

            {/* <div className="flex items-center justify-center">
              <course.Visual />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
