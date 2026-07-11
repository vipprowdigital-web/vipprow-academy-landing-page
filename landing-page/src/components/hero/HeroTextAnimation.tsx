// "use client";

// import { motion, useScroll, useTransform, Variants } from "framer-motion";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";

// // Extend the Window interface for the global shutter flag
// declare global {
//   interface Window {
//     __shutterComplete?: boolean;
//   }
// }

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
//   const [isMounted, setIsMounted] = useState(false);
//   const [shutterFinished, setShutterFinished] = useState(false);
//   const [isInView, setIsInView] = useState(false);

//   // Use page-level scroll progress to avoid Framer Motion "target ref is defined but not hydrated" errors.
//   const { scrollYProgress } = useScroll({
//     target: isMounted ? containerRef : undefined,
//     offset: ["start start", "end start"],
//   });

//   // Calculate clean, non-crashing scroll translations
//   const badgeX = useTransform(scrollYProgress, [0, 1], [0, 300]);
//   const badgeY = useTransform(scrollYProgress, [0, 0.3], [0, 700]);

//   // Set isMounted to true on mount
//   useEffect(() => {
//     const handleSIM = () => setIsMounted(true);
//   }, []);

//   // Monitor shutter status
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       if (window.__shutterComplete) {
//         const handleSF = () => setShutterFinished(true);
//         handleSF();
//       }
//     }

//     const handleShutterComplete = () => {
//       setShutterFinished(true);
//     };

//     window.addEventListener("shutter-complete", handleShutterComplete);
//     return () => {
//       window.removeEventListener("shutter-complete", handleShutterComplete);
//     };
//   }, []);

//   // Observe the parent element to determine visibility (prevents height-shrinking loops)
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const targetToObserve = el.parentElement || el;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInView(entry.isIntersecting);
//       },
//       { threshold: 0.1 },
//     );

//     observer.observe(targetToObserve);
//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   // Control animation sequence based on visibility and page-load shutter progress
//   useEffect(() => {
//     if (!shutterFinished) return;

//     let t1: ReturnType<typeof setTimeout> | undefined;
//     let t2: ReturnType<typeof setTimeout> | undefined;

//     if (isInView) {
//       const handleSS = () => setStep(1);
//       handleSS();
//       t1 = setTimeout(() => setStep(2), 1500);
//       t2 = setTimeout(() => setStep(3), 3500);
//     } else {
//       const handleSS = () => setStep(0);
//       handleSS();
//     }

//     return () => {
//       if (t1) clearTimeout(t1);
//       if (t2) clearTimeout(t2);
//     };
//   }, [isInView, shutterFinished]);

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

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-5xl mx-auto px-6 font-sans text-white select-none"
//     >
//       {step === 0 && <div className="min-h-screen w-full" />}

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

"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Extend the Window interface for the global shutter flag
declare global {
  interface Window {
    __shutterComplete?: boolean;
  }
}

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
  const [shutterFinished, setShutterFinished] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Use page-level scroll progress to avoid Framer Motion "target ref is defined but not hydrated" errors.
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  });

  // Calculate clean, non-crashing scroll translations
  const badgeX = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 700]);

  // Set isMounted to true on mount
  useEffect(() => {
    const handleSIM = () => setIsMounted(true);
    handleSIM();
  }, []);

  // Monitor shutter status
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__shutterComplete) {
        const handleSF = () => setShutterFinished(true);
        handleSF();
      }
    }

    const handleShutterComplete = () => {
      setShutterFinished(true);
    };

    window.addEventListener("shutter-complete", handleShutterComplete);
    return () => {
      window.removeEventListener("shutter-complete", handleShutterComplete);
    };
  }, []);

  // Observe the parent element to determine visibility (prevents height-shrinking loops)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targetToObserve = el.parentElement || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(targetToObserve);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Control animation sequence based on visibility and page-load shutter progress
  useEffect(() => {
    if (!shutterFinished) return;

    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    if (isInView) {
      const handleSS = () => setStep(1);
      handleSS();
      t1 = setTimeout(() => setStep(2), 1500);
      t2 = setTimeout(() => setStep(3), 3500);
    } else {
      const handleSS = () => setStep(0);
      handleSS();
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [isInView, shutterFinished]);

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

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto sm:px-6 font-sans text-white select-none"
    >
      {step === 0 && <div className="min-h-screen w-full" />}

      {step > 0 && step < 3 && (
        <motion.div className="flex flex-col items-center gap-2 tracking-tight text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-none">
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
                className="flex items-center justify-center border border-white/5 rounded-full p-1 sm:p-2 bg-white/2 w-12 sm:w-full"
              >
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
                className="flex items-center justify-center border border-white/40 rounded-full p-1 sm:p-2 bg-white/10 w-10 sm:w-full"
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

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left px-3"
        >
          <p className="text-lg sm:text-2xl text-white font-light leading-relaxed">
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
