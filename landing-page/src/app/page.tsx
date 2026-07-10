import { AboutProgram } from "@/components/sections/AboutProgram";
import { Features } from "@/components/sections/Features";
import { Courses } from "@/components/sections/Courses";
import { Placement } from "@/components/sections/Placement";
import { FAQ } from "@/components/sections/FAQ";
import Hero from "@/components/hero/Hero";
import { ScrollSection } from "@/components/ScrollSection";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Hero />
        {/* <TrustedBy /> */}
        {/* <Placement /> */}
        <ScrollSection id="section-2" bgColor="section-light">
          <AboutProgram />
        </ScrollSection>
        <ScrollSection id="section-1" bgColor="section-light">
          <Courses />
        </ScrollSection>
        <ScrollSection bgColor="section-light">
          <Features />
        </ScrollSection>
        <Placement />
        {/* <Testimonials /> */}
        {/* <CourseSection
          imageSrc="/images/image-1.jpg"
          imageAlt="Learner working through a Vipprow Academy course"
          eyebrow="Vipprow Academy"
          heading="Learn skills that move as fast as the internet does"
          description="Practical digital marketing and AI courses built for the Indian market — taught by people who ship, not just teach."
          ctaLabel="Explore courses"
          ctaHref="/courses"
        /> */}
        {/* <Roadmap /> */}
        {/* <Placement />
        <Instructor />
        
        <FinalCTA /> */}
        <FAQ />
      </main>
    </>
  );
}

// "use client";

// import CanvasWrapper from "@/components/CanvasWrapper";
// import CourseCard from "@/components/CourseCard";
// import StatCounter from "@/components/StatCounter";

// export default function Home() {
//   return (
//     <main className="relative bg-transparent text-[#F5F7FA]">
//       <CanvasWrapper />

//       <section
//         id="hero"
//         className="relative h-screen w-full flex items-center bg-white"
//       >
//         <div className="container mx-auto px-8 md:px-16 relative z-10">
//           {/* Robot occupies the visual center via the Canvas underneath — this
//         column intentionally stays narrow and LEFT so the center stays
//         clear, per "RIGHT SIDE: nothing, CENTER: the robot" */}
//           <div className="max-w-lg">
//             <p
//               data-reveal
//               className="text-sm tracking-[0.15em] uppercase text-[#2F5FED] mb-4 font-medium"
//             >
//               Vipprow Academy
//             </p>
//             <h1
//               data-reveal
//               className="font-display text-5xl md:text-6xl font-semibold leading-[1.1] text-[#0B0D12]"
//             >
//               Meet your AI mentor.
//               <br />
//               <span className="text-[#0F1B33]">
//                 Learn skills that get you hired.
//               </span>
//             </h1>
//             <p data-reveal className="mt-6 text-[#5B677A] text-lg max-w-md">
//               Live, mentor-led programs in AI, Digital Marketing, and Automation
//               — built with India&apos;s hiring teams, not just textbooks.
//             </p>
//             <div data-reveal className="mt-10 flex gap-4">
//               <button className="rounded-full bg-[#0F1B33] text-white px-8 py-3.5 text-sm font-medium hover:bg-[#2F5FED] transition-colors duration-300">
//                 Explore Courses
//               </button>
//               <button className="rounded-full border border-[#0B0D12]/15 text-[#0B0D12] px-8 py-3.5 text-sm font-medium hover:border-[#2F5FED] hover:text-[#2F5FED] transition-colors duration-300">
//                 Talk to an Advisor
//               </button>
//             </div>
//             <div data-reveal className="mt-12 flex gap-10">
//               <div>
//                 <p className="text-2xl font-semibold text-[#0B0D12]">4,200+</p>
//                 <p className="text-sm text-[#5B677A]">Graduates</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-semibold text-[#0B0D12]">92%</p>
//                 <p className="text-sm text-[#5B677A]">Placed or promoted</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-semibold text-[#0B0D12]">60+</p>
//                 <p className="text-sm text-[#5B677A]">Hiring partners</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section
//         id="about"
//         className="relative h-screen w-full flex items-center justify-end"
//       >
//         <div className="container mx-auto px-8 md:px-16">
//           <div className="max-w-xl ml-auto text-right">
//             <p
//               data-reveal
//               className="text-sm tracking-[0.2em] uppercase text-[#FF6B4A] mb-4"
//             >
//               About Academy
//             </p>
//             <h2
//               data-reveal
//               className="font-display text-4xl md:text-6xl font-light leading-[1.1]"
//             >
//               Built by practitioners,
//               <br />
//               <span className="font-medium">not theorists.</span>
//             </h2>
//             <p
//               data-reveal
//               className="mt-6 text-[#8893A7] text-lg max-w-md ml-auto"
//             >
//               Every course is designed and taught by people shipping AI and
//               growth systems for real businesses, every day.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section
//         id="courses"
//         className="relative h-screen w-full flex items-center"
//       >
//         <div className="container mx-auto px-8 md:px-16">
//           <div className="max-w-2xl">
//             <p
//               data-reveal
//               className="text-sm tracking-[0.2em] uppercase text-[#FF6B4A] mb-4"
//             >
//               Courses
//             </p>
//             <h2
//               data-reveal
//               className="font-display text-4xl md:text-6xl font-light leading-[1.1]"
//             >
//               Four tracks.
//               <br />
//               <span className="font-medium">
//                 One outcome: hired or shipped.
//               </span>
//             </h2>
//             <p data-reveal className="mt-6 text-[#8893A7] text-lg max-w-md">
//               Practical, mentor-led tracks built around what teams actually hire
//               for.
//             </p>
//           </div>

//           <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
//             <CourseCard
//               index="01"
//               title="AI Fundamentals"
//               description="Core ML concepts, prompt design, and applied LLM workflows."
//             />
//             <CourseCard
//               index="02"
//               title="Performance Marketing"
//               description="Paid acquisition, attribution, and conversion systems that scale."
//             />
//             <CourseCard
//               index="03"
//               title="Automation Engineering"
//               description="Workflow automation, agents, and integration architecture."
//             />
//             <CourseCard
//               index="04"
//               title="Applied Analytics"
//               description="Dashboards, experimentation, and decision-ready reporting."
//             />
//           </div>
//         </div>
//       </section>

//       <section
//         id="results"
//         className="relative min-h-screen w-full flex items-center justify-end py-24"
//       >
//         <div className="container mx-auto px-8 md:px-16">
//           <div className="max-w-xl ml-auto text-right">
//             <p
//               data-reveal
//               className="text-sm tracking-[0.2em] uppercase text-[#FF6B4A] mb-4"
//             >
//               Student Results
//             </p>
//             <h2
//               data-reveal
//               className="font-display text-4xl md:text-6xl font-light leading-[1.1]"
//             >
//               92% placed or
//               <br />
//               <span className="font-medium">promoted within 90 days.</span>
//             </h2>
//           </div>

//           <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl ml-auto">
//             <StatCounter value={92} suffix="%" label="Placed or promoted" />
//             <StatCounter value={4200} suffix="+" label="Graduates" />
//             <StatCounter value={87} suffix="%" label="Course completion" />
//           </div>
//         </div>
//       </section>

//       <footer className="relative w-full py-24 border-t border-white/10">
//         <div className="container mx-auto px-8 md:px-16 text-center text-[#8893A7] text-sm">
//           © {new Date().getFullYear()} Vipprow Academy. All rights reserved.
//         </div>
//       </footer>
//     </main>
//   );
// }
