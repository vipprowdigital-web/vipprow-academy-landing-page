// 'use client';
// import { useRef } from 'react';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   MotionValue,
// } from 'framer-motion';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { Badge } from '@/components/ui/Badge';

// const AIScene = dynamic(
//   () => import('./AIScene').then((m) => ({ default: m.AIScene })),
//   { ssr: false }
// );

// const LETTERS = 'LEARNING'.split('');

// // ── Phase 1: Large editorial "LEARNING" text ─────────────────────────
// function LearningPhase({
//   opacity,
//   scale,
// }: {
//   opacity: MotionValue<number>;
//   scale: MotionValue<number>;
// }) {
//   return (
//     <motion.div
//       style={{ opacity, scale }}
//       className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
//     >
//       <div
//         className="flex items-baseline justify-center flex-wrap leading-none"
//         aria-label="LEARNING"
//       >
//         {LETTERS.map((letter, i) => (
//           <motion.span
//             key={i}
//             initial={{ opacity: 0, y: 90, rotateX: -40 }}
//             animate={{ opacity: 1, y: 0, rotateX: 0 }}
//             transition={{
//               delay: 0.08 + i * 0.07,
//               duration: 1.0,
//               ease: [0.16, 1, 0.3, 1],
//             }}
//             className="font-heading font-black text-foreground inline-block"
//             style={{
//               fontSize: 'clamp(2.8rem, 12.5vw, 9.5rem)',
//               letterSpacing: '-0.03em',
//               transformOrigin: 'bottom center',
//             }}
//           >
//             {letter}
//           </motion.span>
//         ))}
//       </div>

//       <motion.p
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         className="mt-5 text-sm md:text-base text-muted-foreground tracking-wide text-center"
//       >
//         Keep scrolling to begin your journey
//       </motion.p>
//     </motion.div>
//   );
// }

// // ── Phase 2: 3D AI Neural Network ────────────────────────────────────
// function AIPhase({ opacity }: { opacity: MotionValue<number> }) {
//   return (
//     <motion.div
//       style={{ opacity }}
//       className="absolute inset-0 z-20 pointer-events-none"
//     >
//       <AIScene />
//       <div className="absolute bottom-[20%] left-0 right-0 flex justify-center pointer-events-none">
//         <motion.p
//           initial={{ opacity: 0, letterSpacing: '0.1em' }}
//           animate={{ opacity: 1, letterSpacing: '0.28em' }}
//           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//           className="text-primary text-[10px] font-heading font-bold uppercase"
//         >
//           Powered by AI · Built for Humans
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// }

// // ── Phase 3: 3D Vipprow logo coin spins in + wordmark reveals ─────────
// function LogoPhase({
//   opacity,
//   scale,
//   coinRotateY,
//   coinScale,
//   wordmarkOpacity,
//   wordmarkY,
//   ctaOpacity,
//   ctaY,
// }: {
//   opacity: MotionValue<number>;
//   scale: MotionValue<number>;
//   coinRotateY: MotionValue<number>;
//   coinScale: MotionValue<number>;
//   wordmarkOpacity: MotionValue<number>;
//   wordmarkY: MotionValue<number>;
//   ctaOpacity: MotionValue<number>;
//   ctaY: MotionValue<number>;
// }) {
//   return (
//     <motion.div
//       style={{ opacity, scale }}
//       className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
//     >
//       {/* Ambient glow that follows the blue logo colour */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background:
//             'radial-gradient(ellipse 55% 40% at 50% 46%, rgba(37,99,235,0.22) 0%, transparent 70%)',
//         }}
//       />

//       {/* ── 3D coin logo — scroll-driven rotateY spin-in ── */}
//       <motion.div
//         style={{
//           rotateY: coinRotateY,
//           scale: coinScale,
//           // Perspective is applied on the element so the rotation looks 3D
//           transformPerspective: 900,
//         }}
//         className="relative"
//       >
//         {/* Glow halo behind the coin */}
//         <div
//           className="absolute inset-0 rounded-full blur-3xl opacity-50 scale-90"
//           style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 70%)' }}
//         />
//         <Image
//           src="/images/vipprow-logo-without-bg.png"
//           alt="Vipprow logo"
//           width={340}
//           height={340}
//           priority
//           className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 relative z-10 drop-shadow-2xl"
//         />
//       </motion.div>

//       {/* ── Flat white SVG wordmark — fades up after coin settles ── */}
//       <motion.div
//         style={{ opacity: wordmarkOpacity, y: wordmarkY }}
//         className="mt-4 flex flex-col items-center"
//       >
//         <Image
//           src="/logos/vipprow_logo.svg"
//           alt="Vipprow Academy"
//           width={380}
//           height={68}
//           className="w-48 sm:w-64 md:w-80 h-auto"
//           style={{
//             filter: 'drop-shadow(0 0 16px rgba(147,114,255,0.35))',
//           }}
//         />
//         <p
//           className="font-heading font-medium text-muted-foreground tracking-[0.48em] mt-1.5"
//           style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.9rem)' }}
//         >
//           ACADEMY
//         </p>
//         <div className="flex items-center gap-1.5 mt-2.5 text-muted-foreground/50">
//           <MapPin size={10} />
//           <span className="text-[10px] tracking-wide">Jabalpur, Madhya Pradesh</span>
//         </div>
//       </motion.div>

//       {/* ── CTA + badge — appear last ── */}
//       <motion.div
//         style={{ opacity: ctaOpacity, y: ctaY }}
//         className="mt-8 flex flex-col items-center gap-5 pointer-events-auto"
//       >
//         <div className="flex flex-wrap gap-4 justify-center">
//           <Button variant="primary" size="lg">
//             Explore Programs
//             <ArrowRight size={17} />
//           </Button>
//           <Button variant="secondary" size="lg">
//             Talk to Advisor
//           </Button>
//         </div>

//         <Badge variant="glow">
//           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block mr-1.5" />
//           Batch 2026 — Now Enrolling
//         </Badge>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ── Main Hero ─────────────────────────────────────────────────────────
// export function Hero() {
//   const containerRef = useRef<HTMLElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   // ─── Phase 1: LEARNING — fades from first scroll pixel ───────────
//   const phase1Opacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);
//   const phase1Scale  = useTransform(scrollYProgress, [0, 0.24], [1, 1.18]);

//   // ─── Phase 2: AI Neural Net (0.26 → 0.65) ────────────────────────
//   const phase2Opacity = useTransform(
//     scrollYProgress,
//     [0.26, 0.36, 0.57, 0.65],
//     [0, 1, 1, 0]
//   );

//   // ─── Phase 3: Logo container (0.62 → 1.0) ─────────────────────────
//   const phase3Opacity = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);
//   const phase3Scale   = useTransform(scrollYProgress, [0.62, 0.78], [0.78, 1]);

//   // 3D coin: spins in from -75 deg → 0 deg  (0.62 → 0.82)
//   const coinRotateY = useTransform(scrollYProgress, [0.62, 0.82], [-75, 0]);
//   const coinScale   = useTransform(scrollYProgress, [0.62, 0.80], [0.35, 1]);

//   // Wordmark: fades up after coin settles (0.74 → 0.88)
//   const wordmarkOpacity = useTransform(scrollYProgress, [0.74, 0.87], [0, 1]);
//   const wordmarkY       = useTransform(scrollYProgress, [0.74, 0.87], [28, 0]);

//   // CTA: last to arrive (0.82 → 0.94)
//   const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
//   const ctaY       = useTransform(scrollYProgress, [0.82, 0.94], [24, 0]);

//   // Scroll hint
//   const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

//   return (
//     <section
//       ref={containerRef}
//       style={{ height: '270vh' }}
//       className="relative"
//       aria-label="Hero"
//     >
//       <div className="sticky top-0 h-screen overflow-hidden bg-background">
//         {/* Background radial glow */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               'radial-gradient(ellipse 65% 55% at 50% 50%, oklch(0.22 0.09 275 / 0.55) 0%, transparent 65%)',
//           }}
//         />
//         {/* Dot grid */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage:
//               'radial-gradient(circle, oklch(0.85 0.05 275 / 0.08) 1px, transparent 1px)',
//             backgroundSize: '72px 72px',
//           }}
//         />

//         <LearningPhase opacity={phase1Opacity} scale={phase1Scale} />
//         <AIPhase opacity={phase2Opacity} />
//         <LogoPhase
//           opacity={phase3Opacity}
//           scale={phase3Scale}
//           coinRotateY={coinRotateY}
//           coinScale={coinScale}
//           wordmarkOpacity={wordmarkOpacity}
//           wordmarkY={wordmarkY}
//           ctaOpacity={ctaOpacity}
//           ctaY={ctaY}
//         />

//         {/* Scroll cue */}
//         <motion.div
//           style={{ opacity: scrollHintOpacity }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none"
//         >
//           <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground font-heading font-semibold">
//             Scroll
//           </span>
//           <motion.div
//             animate={{ y: [0, 7, 0] }}
//             transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <ChevronDown size={16} className="text-muted-foreground" />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// components/Hero.tsx
"use client";
import { useRef, useState } from "react";
// import HeroPaintIn from "./HeroPaintIn";
// 1. Import your newly updated ScrollReveal component
import ScrollReveal from "@/components/animations/ScrollReveal";
import { TypingAnimation } from "../ui/typing-animation";
import Image from "next/image";
import RobotHeroVisual from "./RobotHeroVisual";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [painted, setPainted] = useState(false);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #0d1f4d 0%, #040d24 45%, #000000 100%)",
      }}
    >
      {/* Paints in, then stays as the Hero's background — bounded to this section */}
      {/* <HeroPaintIn onComplete={() => setPainted(true)} /> */}

      {/* Real hero content sits above the panel, fades in once it's painted */}
      <div
        className={`relative transition-opacity duration-500 ${
          painted ? "opacity-100 z-10" : "opacity-0"
        }`}
      >
        {/* ...your existing headline, CTAs, Card3DHero, stats, etc... */}
      </div>
      {/* <div className="absolute inset-0 flex flex-col items-start justify-center z-20 pointer-events-none px-10 font-medium sm:text-5xl text-2xl lg:text-7xl tracking-tighter space-y-10 bg-linear-to-r from-white via-secondary to-secondary bg-clip-text text-transparent">
        <TypingAnimation loop> Vipprow</TypingAnimation>
        <TypingAnimation loop>Digital Marketing </TypingAnimation>
        <TypingAnimation loop>Academy</TypingAnimation>
      </div> */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-10 text-white">
        {/* <div className="space-y-3">
          <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-6">
            Master Digital Marketing Skills with{" "}
            <span className="font-bold">Vipprow Digital Marketing Academy</span>
          </h1>
          <p className="">
            A 12-week, hands-on program covering SEO, Social Media, Content,
            Email and Analytics — everything you need to launch and scale
            campaigns with real ROI.
          </p>
          <button className="bg-linear-to-r from-primary to-button px-5 py-2 text-md text-white font-bold rounded-xl">
            Get Started
          </button>
        </div> */}
        {/* <div className="pointer-events-auto">
          <RobotHeroVisual />
        </div> */}
      </div>

      <div className="absolute bottom-10 left-10 flex justify-center pointer-events-none z-10">
        <div className="pointer-events-auto">
          <RobotHeroVisual />
        </div>
        {/* <Image
          src="/logos/brand_outline.svg"
          alt="Vipprow Brand Outline"
          width={500}
          height={100}
        /> */}
        {/* <div className="space-y-3"> */}
          {/* <h1 className="text-4xl sm:text-3xl lg:text-3xl font-bold tracking-tight mb-6">
            Master Digital Marketing Skills with{" "}
            <span className="font-bold">Vipprow Digital Marketing Academy</span>
          </h1> */}
          {/* <p className="">
            A 12-week, hands-on program covering SEO, Social Media, Content,
            Email and Analytics — everything you need to launch and scale
            campaigns with real ROI.
          </p> */}
          {/* <button className="bg-linear-to-r from-primary to-button px-5 py-2 text-md text-white font-bold rounded-xl">
            Get Started
          </button> */}
        {/* </div> */}
      </div>

      {/* 2. Call ScrollReveal here instead of or alongside SectionTypography */}
      <ScrollReveal
        scrollContainerRef={heroRef}
        baseOpacity={1} // Subtle background watermark opacity
        enableBlur={false}
        startY={80}
        blurStrength={1} // Slightly stronger blur for the entry splash
        animationEnd="bottom center" // Completes its path right as the Hero leaves the screen
        contentClassName="var(--primary, rgba(0,0,0,0.05)) font-heading font-black tracking-tight text-right will-change-transform text-4xl sm:text-6xl lg:text-[6rem]" // Using your utility styling color match
      >
        LEARNING
      </ScrollReveal>
    </section>
  );
}
