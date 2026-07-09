// "use client";

// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// // Inline geometric SVG icons to match the video's aesthetic
// const FlowerIcon = () => (
//   <svg
//     className="w-6 h-6 sm:w-10 sm:h-10 text-white/80"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 3a9 9 0 0 0-9 9M12 21a9 9 0 0 0 9-9M12 21a9 9 0 0 1-9-9"
//     />
//   </svg>
// );

// const PillIcon = () => (
//   <svg
//     className="w-10 h-6 sm:w-16 sm:h-10 text-white/50"
//     viewBox="0 0 40 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <rect x="2" y="2" width="36" height="20" rx="10" />
//     <circle cx="20" cy="12" r="3" fill="currentColor" />
//   </svg>
// );

// export default function HeroTextAnimation() {
//   const [step, setStep] = useState(1);

//   // Automatically cycle through the stages to simulate the scroll/intro transition
//   useEffect(() => {
//     const timer1 = setTimeout(() => setStep(2), 1500); // Intro large text
//     const timer2 = setTimeout(() => setStep(3), 3500); // Collapse into paragraph
//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, []);

//   // Framer Motion Variants for smooth text reveals
//   const wordVariants = {
//     hidden: { y: "100%", opacity: 0 },
//     visible: (i: number) => ({
//       y: 0,
//       opacity: 1,
//       transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
//     }),
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto px-6 font-sans text-white select-none">
//       {/* STAGE 1 & 2: Huge staggered typographic layout */}
//       {step < 3 && (
//         <motion.div
//           exit={{ opacity: 0, y: -20 }}
//           className="flex flex-col gap-2 tracking-tight text-5xl sm:text-7xl md:text-8xl font-medium leading-none"
//         >
//           {/* Row 1 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={0}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Control
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="flex items-center justify-center border border-white/20 rounded-full p-2 bg-white/5"
//               >
//                 <FlowerIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={1}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//           </div>

//           {/* Row 2 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={2}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="text-white/90"
//             >
//               Mind
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ width: 0, opacity: 0 }}
//                 animate={{ width: "auto", opacity: 1 }}
//                 className="inline-block"
//               >
//                 <PillIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={3}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="italic font-serif text-white/50 font-light"
//             >
//               Manifest
//             </motion.span>
//           </div>

//           {/* Row 3 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={4}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ rotate: -90, scale: 0 }}
//                 animate={{ rotate: 0, scale: 1 }}
//                 className="flex items-center justify-center border border-white/40 rounded-full p-2 bg-white/10"
//               >
//                 <FlowerIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={5}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="font-semibold"
//             >
//               Learning
//             </motion.span>
//           </div>
//         </motion.div>
//       )}

//       {/* STAGE 3: Clean paragraph split layout with the focal word highlighted */}
//       {step === 3 && (
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left"
//         >
//           {/* Paragraph explanation */}
//           <p className="text-xl sm:text-2xl text-white/70 font-light leading-relaxed tracking-wide">
//             Everything you seek is already within you — Superconscious helps you
//             access it. Our advanced AI personalizes your manifestation journey,
//             clears subconscious blocks, and aligns you with your highest self.
//             Manifestation has never been this clear, this powerful, or this
//             effortless.
//           </p>

//           {/* Focal structural element: "Learning" */}
//           <div className="flex justify-start md:justify-end items-center mt-4 md:mt-0">
//             <motion.div
//               layoutId="focal-badge"
//               className="flex items-center gap-4 border border-white/20 rounded-full py-4 px-8 bg-white/5 dynamic-blur backdrop-blur-md"
//             >
//               <div className="animate-spin-slow">
//                 <FlowerIcon />
//               </div>
//               <span className="text-4xl sm:text-6xl font-medium tracking-tight">
//                 Learning
//               </span>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useState, useEffect, useRef } from "react";

// const FlowerIcon = () => (
//   <svg
//     className="w-6 h-6 sm:w-10 sm:h-10 text-white/80"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 3a9 9 0 0 0-9 9M12 21a9 9 0 0 0 9-9M12 21a9 9 0 0 1-9-9"
//     />
//   </svg>
// );

// const PillIcon = () => (
//   <svg
//     className="w-10 h-6 sm:w-16 sm:h-10 text-white/50"
//     viewBox="0 0 40 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <rect x="2" y="2" width="36" height="20" rx="10" />
//     <circle cx="20" cy="12" r="3" fill="currentColor" />
//   </svg>
// );

// export default function HeroTextAnimation() {
//   const [step, setStep] = useState(0);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll();
//   const badgeX = useTransform(scrollYProgress, [0, 1], [0, 80]);
//   const badgeY = useTransform(scrollYProgress, [0, 1], [0, 60]);

//   useEffect(() => {
//     const handleStart = () => {
//       setStep(1);
//       const t1 = setTimeout(() => setStep(2), 1500);
//       const t2 = setTimeout(() => setStep(3), 3500);
//       return () => {
//         clearTimeout(t1);
//         clearTimeout(t2);
//       };
//     };

//     window.addEventListener("shutter-complete", handleStart);

//     return () => {
//       window.removeEventListener("shutter-complete", handleStart);
//     };
//   }, []);

//   const wordVariants = {
//     hidden: { y: "100%", opacity: 0 },
//     visible: (i: number) => ({
//       y: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.15,
//         duration: 0.8,
//         ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
//       },
//     }),
//   };

//   if (step === 0) return <div className="min-h-100" />;

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-5xl mx-auto px-6 font-sans text-white select-none"
//     >
//       {step < 3 && (
//         <motion.div className="flex flex-col gap-2 tracking-tight text-5xl sm:text-7xl md:text-8xl font-medium leading-none">
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={0}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Control
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="flex items-center justify-center border border-white/20 rounded-full p-2 bg-white/5"
//               >
//                 <FlowerIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={1}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//           </div>

//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={2}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="text-white/90"
//             >
//               Mind
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "auto" }}
//                 className="inline-block"
//               >
//                 <PillIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={3}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="italic font-serif text-white/50 font-light"
//             >
//               Manifest
//             </motion.span>
//           </div>

//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={4}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ rotate: -90, scale: 0 }}
//                 animate={{ rotate: 0, scale: 1 }}
//                 className="flex items-center justify-center border border-white/40 rounded-full p-2 bg-white/10"
//               >
//                 <FlowerIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={5}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="font-semibold"
//             >
//               Learning
//             </motion.span>
//           </div>
//         </motion.div>
//       )}

//       {step === 3 && (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left"
//         >
//           <p className="text-xl sm:text-2xl text-white/70 font-light leading-relaxed">
//             Everything you seek is already within you — Superconscious helps you
//             access it. Our advanced AI personalizes your manifestation journey,
//             clears subconscious blocks, and aligns you with your highest self.
//           </p>
//           <div className="flex justify-start md:justify-end items-center">
//             <motion.div
//               style={{ x: badgeX, y: badgeY }}
//               className="flex items-center gap-4 border border-white/20 rounded-full py-3 px-10 bg-white/5 backdrop-blur-md"
//             >
//               {/* <div className="animate-spin [animation-duration:10s]">
//                 <FlowerIcon />
//               </div> */}
//               <span className="var(--primary, rgba(0,0,0,0.05)) font-heading font-black tracking-tight text-right will-change-transform text-4xl sm:text-6xl lg:text-[6rem]">
//                 Learning
//               </span>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const AISparkIcon = () => (
  <svg
    className="w-6 h-6 sm:w-10 sm:h-10 text-white/80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c.6 3.2 1.6 4.9 3.5 6.5C17.4 11 19.1 12 22 12.6 19.1 13.2 17.4 14.2 15.5 15.7 13.6 17.2 12.6 18.9 12 22 11.4 18.9 10.4 17.2 8.5 15.7 6.6 14.2 4.9 13.2 2 12.6 4.9 12 6.6 11 8.5 9.5 10.4 8 11.4 6.2 12 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 3.5c.3 1.1.8 1.7 1.9 2-1.1.3-1.6.9-1.9 2-.3-1.1-.8-1.7-1.9-2 1.1-.3 1.6-.9 1.9-2Z"
    />
  </svg>
);

const TargetIcon = () => (
  <svg
    className="w-7 h-7 sm:w-10 sm:h-10 text-white"
    viewBox="0 0 64 64"
    fill="none"
  >
    <circle cx="32" cy="32" r="4" fill="currentColor" />
    <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" />
    <circle
      cx="32"
      cy="32"
      r="20"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    <path
      d="M52 12L34 30M52 12L52 22M52 12L42 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GrowthAnalyticsIcon = () => (
  <svg
    className="w-14 h-10 sm:w-16 sm:h-12 text-white/70"
    viewBox="0 0 80 48"
    fill="none"
  >
    <rect
      x="2"
      y="2"
      width="76"
      height="44"
      rx="12"
      stroke="currentColor"
      strokeWidth="2"
    />

    <rect x="14" y="30" width="6" height="6" fill="currentColor" />
    <rect x="28" y="22" width="6" height="14" fill="currentColor" />
    <rect x="42" y="14" width="6" height="22" fill="currentColor" />
    <rect x="56" y="8" width="6" height="28" fill="currentColor" />

    <path
      d="M12 30L30 22L46 14L62 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M56 8L62 8L62 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AutomationChatIcon = () => (
  <svg
    className="w-10 h-6 sm:w-16 sm:h-10 text-white/50"
    viewBox="0 0 40 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="36" height="20" rx="10" />
    <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="20" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="26" cy="12" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export default function HeroTextAnimation() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Safely hook useScroll to our container element
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  });

  // Calculate clean, non-crashing scroll translations
  const badgeX = useTransform(scrollYProgress, [0, 1], [0, 700]);
  const badgeY = useTransform(scrollYProgress, [0, 0.23], [0, 900]);

  useEffect(() => {
    const handleStart = () => {
      setStep(1);
      const t1 = setTimeout(() => setStep(2), 1500);
      const t2 = setTimeout(() => setStep(3), 3500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    window.addEventListener("shutter-complete", handleStart);
    return () => window.removeEventListener("shutter-complete", handleStart);
  }, []);

  const wordVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        ease: "circOut",
      },
    }),
  };

  if (step === 0) return <div className="min-h-screen w-full" />;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto px-6 font-sans text-white select-none"
    >
      {step < 3 && (
        <motion.div className="flex flex-col gap-2 tracking-tight text-5xl sm:text-7xl md:text-8xl font-medium leading-none">
          {/* Row 1 */}
          <div className="overflow-hidden flex items-center gap-4">
            <motion.span
              custom={0}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              Control
            </motion.span>
            {step === 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center border border-white/5 rounded-full p-3 bg-white/2"
              >
                {/* <FlowerIcon /> */}
                <GrowthAnalyticsIcon />
              </motion.div>
            )}
            <motion.span
              custom={1}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              Your
            </motion.span>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden flex items-center gap-4">
            <motion.span
              custom={2}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="text-white/90"
            >
              Mind
            </motion.span>
            {step === 2 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                className="inline-block"
              >
                {/* <PillIcon /> */}
                <AutomationChatIcon />
              </motion.div>
            )}
            <motion.span
              custom={3}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="italic font-light"
            >
              Manifest
            </motion.span>
          </div>

          {/* Row 3 */}
          <div className="overflow-hidden flex items-center gap-4">
            <motion.span
              custom={4}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              Your
            </motion.span>
            {step === 2 && (
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="flex items-center justify-center border border-white/40 rounded-full p-2 bg-white/10"
              >
                <TargetIcon />
              </motion.div>
            )}
            <motion.span
              custom={5}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="font-semibold"
            >
              Learning
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* <motion.div className="fixed top-4 left-4 text-white text-xs z-50">
        <motion.span>{scrollYProgress}</motion.span>
      </motion.div> */}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left"
        >
          <p className="text-xl sm:text-2xl text-white font-light leading-relaxed">
            Learn Digital Marketing, Performance Marketing, SEO, Google Ads,
            Meta Ads, Content Strategy, and AI-powered marketing through
            hands-on projects, live mentorship, and real business case studies.
          </p>
          <div className="flex justify-start md:justify-end items-center w-full">
            <motion.div
              style={{ x: badgeX, y: badgeY }}
              className="flex items-center gap-4 border border-white/20 rounded-full py-3 px-10 bg-white/5 backdrop-blur-md"
            >
              <span className="font-heading font-black tracking-tight text-right text-4xl sm:text-6xl lg:text-[5rem]">
                Learning
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// "use client";

// import { motion, useScroll, useTransform, Variants } from "framer-motion";
// import { useState, useEffect, useRef } from "react";

// const AISparkIcon = () => (
//   <svg
//     className="w-6 h-6 sm:w-10 sm:h-10 text-white/80"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     aria-hidden="true"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 3c.6 3.2 1.6 4.9 3.5 6.5C17.4 11 19.1 12 22 12.6 19.1 13.2 17.4 14.2 15.5 15.7 13.6 17.2 12.6 18.9 12 22 11.4 18.9 10.4 17.2 8.5 15.7 6.6 14.2 4.9 13.2 2 12.6 4.9 12 6.6 11 8.5 9.5 10.4 8 11.4 6.2 12 3Z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M19 3.5c.3 1.1.8 1.7 1.9 2-1.1.3-1.6.9-1.9 2-.3-1.1-.8-1.7-1.9-2 1.1-.3 1.6-.9 1.9-2Z"
//     />
//   </svg>
// );

// const TargetIcon = () => (
//   <svg
//     className="w-7 h-7 sm:w-10 sm:h-10 text-white"
//     viewBox="0 0 64 64"
//     fill="none"
//   >
//     <circle cx="32" cy="32" r="4" fill="currentColor" />
//     <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" />
//     <circle
//       cx="32"
//       cy="32"
//       r="20"
//       stroke="currentColor"
//       strokeWidth="2"
//       opacity="0.6"
//     />
//     <path
//       d="M52 12L34 30M52 12L52 22M52 12L42 12"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const GrowthAnalyticsIcon = () => (
//   <svg
//     className="w-14 h-10 sm:w-16 sm:h-12 text-white/70"
//     viewBox="0 0 80 48"
//     fill="none"
//   >
//     <rect
//       x="2"
//       y="2"
//       width="76"
//       height="44"
//       rx="12"
//       stroke="currentColor"
//       strokeWidth="2"
//     />

//     <rect x="14" y="30" width="6" height="6" fill="currentColor" />
//     <rect x="28" y="22" width="6" height="14" fill="currentColor" />
//     <rect x="42" y="14" width="6" height="22" fill="currentColor" />
//     <rect x="56" y="8" width="6" height="28" fill="currentColor" />

//     <path
//       d="M12 30L30 22L46 14L62 8"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M56 8L62 8L62 14"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const AutomationChatIcon = () => (
//   <svg
//     className="w-10 h-6 sm:w-16 sm:h-10 text-white/50"
//     viewBox="0 0 40 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <rect x="2" y="2" width="36" height="20" rx="10" />
//     <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
//     <circle cx="20" cy="12" r="2" fill="currentColor" stroke="none" />
//     <circle cx="26" cy="12" r="2" fill="currentColor" stroke="none" />
//   </svg>
// );

// export default function HeroTextAnimation() {
//   const [step, setStep] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const timeoutsRef = useRef<number[]>([]);
//   const [isMounted] = useState(() => typeof window !== "undefined");

//   // Use page-level scroll progress to avoid Framer Motion "target ref is defined but not hydrated" errors.
//   const { scrollYProgress } = useScroll();

//   // Calculate clean, non-crashing scroll translations
//   const badgeX = useTransform(scrollYProgress, [0, 1], [0, 700]);
//   const badgeY = useTransform(scrollYProgress, [0, 0.23], [0, 900]);

//   const clearTimers = () => {
//     timeoutsRef.current.forEach((t) => window.clearTimeout(t));
//     timeoutsRef.current = [];
//   };

//   const startSequence = () => {
//     clearTimers();
//     // kick off staged animation
//     setStep(1);
//     timeoutsRef.current.push(
//       window.setTimeout(() => setStep(2), 1500),
//       window.setTimeout(() => setStep(3), 3500),
//     );
//   };

//   const resetSequence = () => {
//     clearTimers();
//     setStep(0);
//   };

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           startSequence();
//         } else {
//           resetSequence();
//         }
//       },
//       { threshold: 0 }, // fire as soon as ANY pixel is visible
//     );

//     observer.observe(el);
//     return () => {
//       observer.disconnect();
//       clearTimers();
//     };
//   }, []);

//   const wordVariants: Variants = {
//     hidden: { y: "100%", opacity: 0 },
//     visible: (i: number) => ({
//       y: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.12,
//         duration: 0.7,
//         ease: "circOut",
//       },
//     }),
//   };

//   if (step === 0) return <div className="min-h-screen w-full" />;

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-5xl mx-auto px-6 font-sans text-white select-none"
//     >
//       {step === 0 && <div className="min-h-50 w-full" />}

//       {step > 0 && step < 3 && (
//         <motion.div className="flex flex-col gap-2 tracking-tight text-5xl sm:text-7xl md:text-8xl font-medium leading-none">
//           {/* Row 1 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={0}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Control
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="flex items-center justify-center border border-white/5 rounded-full p-3 bg-white/2"
//               >
//                 {/* <FlowerIcon /> */}
//                 <GrowthAnalyticsIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={1}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//           </div>

//           {/* Row 2 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={2}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="text-white/90"
//             >
//               Mind
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "auto" }}
//                 className="inline-block"
//               >
//                 {/* <PillIcon /> */}
//                 <AutomationChatIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={3}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="italic font-light"
//             >
//               Manifest
//             </motion.span>
//           </div>

//           {/* Row 3 */}
//           <div className="overflow-hidden flex items-center gap-4">
//             <motion.span
//               custom={4}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               Your
//             </motion.span>
//             {step === 2 && (
//               <motion.div
//                 initial={{ rotate: -90, scale: 0 }}
//                 animate={{ rotate: 0, scale: 1 }}
//                 className="flex items-center justify-center border border-white/40 rounded-full p-2 bg-white/10"
//               >
//                 <TargetIcon />
//               </motion.div>
//             )}
//             <motion.span
//               custom={5}
//               variants={wordVariants}
//               initial="hidden"
//               animate="visible"
//               className="font-semibold"
//             >
//               Learning
//             </motion.span>
//           </div>
//         </motion.div>
//       )}

//       {step === 3 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left"
//         >
//           <p className="text-xl sm:text-2xl text-white font-light leading-relaxed">
//             Learn Digital Marketing, Performance Marketing, SEO, Google Ads,
//             Meta Ads, Content Strategy, and AI-powered marketing through
//             hands-on projects, live mentorship, and real business case studies.
//           </p>
//           <div className="flex justify-start md:justify-end items-center w-full">
//             <motion.div
//               style={{ x: badgeX, y: badgeY }}
//               className="flex items-center gap-4 border border-white/20 rounded-full py-3 px-10 bg-white/5 backdrop-blur-md"
//             >
//               <span className="font-heading font-black tracking-tight text-right text-4xl sm:text-6xl lg:text-[5rem]">
//                 Learning
//               </span>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }
