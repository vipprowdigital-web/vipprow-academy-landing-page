// 'use client';
// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   ArrowRight,
//   Clock,
//   BarChart2,
//   TrendingUp,
//   Sparkles,
//   Megaphone,
//   Globe,
//   Brain,
//   Cpu,
//   Zap,
//   LineChart,
// } from 'lucide-react';
// import { Badge } from '@/components/ui/Badge';
// import { Button } from '@/components/ui/Button';
// import { fadeUp, stagger } from '@/lib/animations';

// // ── Course data ───────────────────────────────────────────────────────

// const COURSES = [
//   {
//     tag: 'Most Popular',
//     tagIcon: TrendingUp,
//     title: 'Digital Marketing Mastery',
//     subtitle: 'SEO · Paid Ads · Social Media · Analytics · Branding',
//     duration: '12 weeks',
//     level: 'Beginner → Expert',
//     modules: 10,
//     accentColor: '#7c3aed',
//     headerGrad: ['oklch(0.22 0.1 290)', 'oklch(0.16 0.08 270)'],
//     floatGrad: ['oklch(0.55 0.18 290)', 'oklch(0.45 0.22 275)'],
//     HeaderVisual: DMHeader,
//     topics: [
//       'SEO & SEM Strategy',
//       'Google Ads & Meta Ads',
//       'Social Media Marketing',
//       'Content & Email Marketing',
//       'Analytics & Reporting',
//       'Brand Building',
//     ],
//     outcome:
//       'Launch and scale campaigns across every major digital channel with measurable ROI.',
//   },
//   {
//     tag: 'Fast-growing',
//     tagIcon: Sparkles,
//     title: 'AI & Machine Learning',
//     subtitle: 'Python · ML · LLMs · AI Tools · Automation',
//     duration: '16 weeks',
//     level: 'Beginner → Advanced',
//     modules: 14,
//     accentColor: '#4f46e5',
//     headerGrad: ['oklch(0.18 0.1 265)', 'oklch(0.14 0.08 250)'],
//     floatGrad: ['oklch(0.5 0.2 265)', 'oklch(0.42 0.22 255)'],
//     HeaderVisual: AIHeader,
//     topics: [
//       'Python for AI',
//       'Machine Learning Models',
//       'Large Language Models',
//       'AI Tools & ChatGPT APIs',
//       'AI for Marketing & Business',
//       'Automation & Deployment',
//     ],
//     outcome:
//       'Build, deploy and leverage AI models to automate work and create intelligent products.',
//   },
// ] as const;

// // ── Floating header visuals ───────────────────────────────────────────

// function DMHeader({ grad }: { grad: [string, string] }) {
//   return (
//     <div className="relative flex items-center justify-center w-full h-full">
//       {/* Glow orb behind */}
//       <div
//         className="absolute w-32 h-32 rounded-full blur-2xl opacity-40"
//         style={{ background: `radial-gradient(circle, ${grad[0]}, transparent)` }}
//       />

//       {/* Central floating card mock */}
//       <div
//         className="relative rounded-2xl border border-white/15 p-4 shadow-2xl w-40"
//         style={{
//           background: 'oklch(0.18 0.06 280 / 0.85)',
//           backdropFilter: 'blur(12px)',
//         }}
//       >
//         {/* Tiny chart bars */}
//         <div className="flex items-end gap-1.5 mb-3 h-10">
//           {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
//             <div
//               key={i}
//               className="flex-1 rounded-sm"
//               style={{
//                 height: `${h}%`,
//                 background: i === 5
//                   ? `linear-gradient(180deg, ${grad[0]}, ${grad[1]})`
//                   : 'oklch(0.35 0.04 280)',
//               }}
//             />
//           ))}
//         </div>
//         {/* Stat row */}
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-white/40 text-[9px] leading-tight">Conversions</p>
//             <p className="text-white font-bold text-sm leading-tight">+124%</p>
//           </div>
//           <div
//             className="w-6 h-6 rounded-lg flex items-center justify-center"
//             style={{ background: grad[0] }}
//           >
//             <TrendingUp size={11} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Satellite icons */}
//       {[
//         { Icon: Globe, x: -56, y: -20 },
//         { Icon: Megaphone, x: 58, y: -24 },
//         { Icon: LineChart, x: -48, y: 40 },
//       ].map(({ Icon, x, y }, i) => (
//         <div
//           key={i}
//           className="absolute w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center shadow-lg"
//           style={{
//             transform: `translate(${x}px, ${y}px)`,
//             background: 'oklch(0.2 0.06 280 / 0.8)',
//             backdropFilter: 'blur(8px)',
//           }}
//         >
//           <Icon size={13} className="text-white/70" />
//         </div>
//       ))}
//     </div>
//   );
// }

// function AIHeader({ grad }: { grad: [string, string] }) {
//   return (
//     <div className="relative flex items-center justify-center w-full h-full">
//       {/* Glow orb */}
//       <div
//         className="absolute w-36 h-36 rounded-full blur-2xl opacity-35"
//         style={{ background: `radial-gradient(circle, ${grad[0]}, transparent)` }}
//       />

//       {/* Central brain orb */}
//       <div
//         className="relative w-20 h-20 rounded-full flex items-center justify-center border border-white/20 shadow-2xl"
//         style={{
//           background: `radial-gradient(circle at 35% 35%, ${grad[0]}, ${grad[1]})`,
//         }}
//       >
//         <Brain size={32} className="text-white/90" />
//         {/* Ring pulse */}
//         <div
//           className="absolute inset-0 rounded-full border border-white/20 animate-ping"
//           style={{ animationDuration: '2.5s' }}
//         />
//       </div>

//       {/* Orbiting nodes */}
//       {[
//         { Icon: Cpu, angle: -45, r: 52 },
//         { Icon: Zap, angle: 60, r: 48 },
//         { Icon: Sparkles, angle: 175, r: 50 },
//       ].map(({ Icon, angle, r }, i) => {
//         const rad = (angle * Math.PI) / 180;
//         return (
//           <div
//             key={i}
//             className="absolute w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center shadow-lg"
//             style={{
//               transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
//               background: 'oklch(0.18 0.08 265 / 0.85)',
//               backdropFilter: 'blur(8px)',
//             }}
//           >
//             <Icon size={13} className="text-white/70" />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ── 3D Card (Tig Manukyan style) ─────────────────────────────────────

// type Course = (typeof COURSES)[number];

// function CourseCard({ course, index }: { course: Course; index: number }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

//   const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = cardRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     setMouse({
//       x: (e.clientX - rect.left) / rect.width - 0.5,
//       y: (e.clientY - rect.top) / rect.height - 0.5,
//       active: true,
//     });
//   };

//   const onLeave = () => setMouse({ x: 0, y: 0, active: false });

//   // Card tilt values
//   const rotX = -mouse.y * 12;
//   const rotY = mouse.x * 12;
//   const ease = mouse.active ? 'transform 0.08s linear' : 'transform 0.65s cubic-bezier(0.16,1,0.3,1)';

//   // Floating header element: counter-rotation + Z pop
//   const floatX = mouse.x * -28;
//   const floatY = mouse.y * -28;
//   const floatEase = mouse.active ? 'transform 0.08s linear' : 'transform 0.65s cubic-bezier(0.16,1,0.3,1)';

//   const TagIcon = course.tagIcon;
//   const Visual = course.HeaderVisual;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 56 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-40px' }}
//       transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
//       className="group"
//     >
//       <div
//         ref={cardRef}
//         onMouseMove={onMove}
//         onMouseLeave={onLeave}
//         style={{
//           transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
//           transition: ease,
//           transformStyle: 'preserve-3d',
//           willChange: 'transform',
//         }}
//         className="relative rounded-2xl border border-border bg-card shadow-md cursor-default overflow-visible"
//       >
//         {/* ── 3D Header Zone ─────────────────────────────────────── */}
//         <div
//           className="relative rounded-t-2xl overflow-hidden"
//           style={{
//             height: '220px',
//             background: `linear-gradient(145deg, ${course.headerGrad[0]}, ${course.headerGrad[1]})`,
//           }}
//         >
//           {/* Top accent line */}
//           <div
//             className="absolute top-0 left-0 right-0 h-px opacity-30"
//             style={{
//               background: `linear-gradient(90deg, transparent, ${course.accentColor}, transparent)`,
//             }}
//           />

//           {/* THE FLOATING ELEMENT — pops forward in Z-space */}
//           <div
//             className="absolute inset-0 flex items-center justify-center"
//             style={{
//               transform: `translateZ(72px) translateX(${floatX}px) translateY(${floatY}px)`,
//               transition: floatEase,
//               transformStyle: 'preserve-3d',
//             }}
//           >
//             <Visual grad={[course.floatGrad[0], course.floatGrad[1]]} />
//           </div>

//           {/* Bottom fade into card body */}
//           <div
//             className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
//             style={{
//               background: 'linear-gradient(to bottom, transparent, var(--card))',
//             }}
//           />
//         </div>

//         {/* ── Card Body ─────────────────────────────────────────── */}
//         <div className="p-6 md:p-7">
//           {/* Tag + meta */}
//           <div className="flex items-center justify-between mb-5">
//             <Badge variant="subtle" className="text-[10px] gap-1">
//               <TagIcon size={9} />
//               {course.tag}
//             </Badge>
//             <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <Clock size={11} />
//                 {course.duration}
//               </span>
//               <span className="w-px h-3 bg-border" />
//               <span className="flex items-center gap-1">
//                 <BarChart2 size={11} />
//                 {course.level}
//               </span>
//             </div>
//           </div>

//           {/* Title */}
//           <h3
//             className="font-heading font-bold text-foreground leading-tight mb-1.5"
//             style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)' }}
//           >
//             {course.title}
//           </h3>
//           <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
//             {course.subtitle}
//           </p>

//           {/* Topics */}
//           <div className="grid grid-cols-2 gap-1.5 mb-5">
//             {course.topics.map((topic) => (
//               <div
//                 key={topic}
//                 className="text-xs text-muted-foreground px-2.5 py-2 rounded-lg bg-muted/50 border border-border/60 leading-tight"
//               >
//                 {topic}
//               </div>
//             ))}
//           </div>

//           {/* Outcome */}
//           <p
//             className="text-xs text-muted-foreground leading-relaxed mb-6 pl-3 border-l-2 italic"
//             style={{ borderColor: course.accentColor }}
//           >
//             {course.outcome}
//           </p>

//           {/* CTA */}
//           <button
//             className="w-full flex items-center justify-between text-sm font-semibold font-heading group/btn transition-all duration-200"
//             style={{ color: course.accentColor }}
//           >
//             <span>View curriculum</span>
//             <ArrowRight
//               size={15}
//               className="transition-transform duration-300 group-hover/btn:translate-x-1"
//             />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ── Section ───────────────────────────────────────────────────────────

// export function Courses() {
//   return (
//     <section id="courses" className="section-light py-24 md:py-36">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           variants={stagger}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-80px' }}
//           className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
//         >
//           <div>
//             <motion.div variants={fadeUp} className="mb-4">
//               <Badge variant="subtle">Programs</Badge>
//             </motion.div>
//             <motion.h2
//               variants={fadeUp}
//               className="font-heading font-bold leading-tight tracking-tight"
//               style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
//             >
//               Two programs.
//               <br />
//               <span className="text-primary">Infinite possibilities.</span>
//             </motion.h2>
//           </div>
//           <motion.p
//             variants={fadeUp}
//             className="text-muted-foreground max-w-sm text-base leading-relaxed md:text-right"
//           >
//             Each program is deeply researched, industry-aligned and designed for
//             real outcomes — not certificates.
//           </motion.p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
//           {COURSES.map((course, i) => (
//             <CourseCard key={course.title} course={course} index={i} />
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           className="mt-12 flex justify-center"
//         >
//           <Button variant="secondary" size="lg">
//             Download Brochure
//             <ArrowRight size={16} />
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  BarChart2,
  Layers,
  TrendingUp,
  Sparkles,
  Megaphone,
  Globe,
  Brain,
  Cpu,
  Zap,
  LineChart,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger } from "@/lib/animations";

// ── Course data ───────────────────────────────────────────────────────

const COURSES = [
  {
    tag: "Most popular",
    tagIcon: TrendingUp,
    title: "Digital Marketing Mastery",
    short: "Digital Marketing",
    subtitle: "SEO · Paid Ads · Social Media · Analytics · Branding",
    duration: "12 weeks",
    level: "Beginner → Expert",
    modules: 10,
    accentColor: "#7c3aed",
    chipGrad: ["oklch(0.55 0.18 290)", "oklch(0.42 0.2 275)"],
    blobColors: [
      "oklch(0.55 0.18 290)",
      "oklch(0.45 0.22 275)",
      "oklch(0.7 0.1 290)",
    ],
    icon: Globe,
    satellites: [Megaphone, LineChart, Sparkles],
    topics: [
      "SEO & SEM Strategy",
      "Google Ads & Meta Ads",
      "Social Media Marketing",
      "Content & Email Marketing",
      "Analytics & Reporting",
      "Brand Building",
    ],
    outcome:
      "Launch and scale campaigns across every major digital channel with measurable ROI.",
    tilt: { rz: -16, rx: 6, ry: -14 },
  },
  {
    tag: "Fast-growing",
    tagIcon: Sparkles,
    title: "AI & Machine Learning",
    short: "AI & ML",
    subtitle: "Python · ML · LLMs · AI Tools · Automation",
    duration: "16 weeks",
    level: "Beginner → Advanced",
    modules: 14,
    accentColor: "#4f46e5",
    chipGrad: ["oklch(0.5 0.2 265)", "oklch(0.4 0.22 255)"],
    blobColors: [
      "oklch(0.5 0.2 265)",
      "oklch(0.42 0.22 255)",
      "oklch(0.68 0.12 265)",
    ],
    icon: Brain,
    satellites: [Cpu, Zap, Sparkles],
    topics: [
      "Python for AI",
      "Machine Learning Models",
      "Large Language Models",
      "AI Tools & ChatGPT APIs",
      "AI for Marketing & Business",
      "Automation & Deployment",
    ],
    outcome:
      "Build, deploy and leverage AI models to automate work and create intelligent products.",
    tilt: { rz: 14, rx: -5, ry: 12 },
  },
] as const;

// ── Auto-flip / click-to-flip cycle ──────────────────────────────────
// rotateY orbits each course's resting tilt (tilt.ry) instead of 0, so
// the card spins as a tilted object. At ~95deg it's edge-on / invisible
// — that's the instant the content swaps, giving the illusion of one
// continuous spin instead of a snap-back.

function useCardCycle(holdMs = 4500) {
  const rotateY = useMotionValue<number>(COURSES[0].tilt.ry);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flippingRef = useRef(false);

  const flipTo = async (next: number) => {
    if (next === indexRef.current || flippingRef.current) return;
    flippingRef.current = true;
    const fromRy = COURSES[indexRef.current].tilt.ry;
    const toRy = COURSES[next].tilt.ry;

    await animate(rotateY, fromRy + 95, {
      duration: 0.5,
      ease: [0.7, 0, 0.3, 1],
    });
    indexRef.current = next;
    setIndex(next);
    rotateY.set(toRy - 95); // jump while edge-on / invisible
    await animate(rotateY, toRy, { duration: 0.5, ease: [0.7, 0, 0.3, 1] });

    flippingRef.current = false;
  };

  const scheduleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      flipTo((indexRef.current + 1) % COURSES.length).then(scheduleNext);
    }, holdMs);
  };

  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [holdMs]);

  const goTo = (i: number) => flipTo(i).then(scheduleNext);

  return { rotateY, index, goTo };
}

// ── Right-side animated stage ────────────────────────────────────────

function CourseStage({
  activeIndex,
  rotateY,
}: {
  activeIndex: number;
  rotateY: ReturnType<typeof useMotionValue<number>>;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const course = COURSES[activeIndex];
  const Icon = course.icon;
  const [Sat1, Sat2, Sat3] = course.satellites;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
      active: true,
    });
  };
  const onLeave = () => setMouse({ x: 0, y: 0, active: false });

  const rotX = -mouse.y * 8;
  const rotY = mouse.x * 8;
  const floatX = mouse.x * -36;
  const floatY = mouse.y * -36;
  const tiltEase = mouse.active
    ? "transform 0.08s linear"
    : "transform 0.7s cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-white/10"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.2 0.04 280), oklch(0.13 0.03 270))",
        perspective: 1100,
      }}
    >
      {/* Tilting inner scene (mouse parallax) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: tiltEase,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background blobs — colors crossfade per active course */}
        {[
          { size: 170, top: "14%", left: "10%", dur: 5 },
          { size: 110, top: "62%", left: "68%", dur: 6 },
          { size: 90, top: "20%", left: "70%", dur: 4.4 },
          { size: 70, top: "70%", left: "14%", dur: 5.6 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              backgroundColor: course.blobColors[i % course.blobColors.length],
              opacity: 0.32,
              transition: "background-color 0.7s ease",
            }}
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ambient bob */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Parallax pop + resting tilt + auto-flip */}
          <motion.div
            style={{
              x: floatX,
              y: floatY,
              translateZ: 90,
              rotateZ: course.tilt.rz,
              rotateX: course.tilt.rx,
              rotateY,
              transformStyle: "preserve-3d",
              transition: tiltEase,
            }}
          >
            {/* ── The card — shows course name + small details ── */}
            <div
              className="relative rounded-2xl border border-white/15 shadow-2xl p-5 flex flex-col justify-between"
              style={{
                width: 300,
                height: 178,
                background: `linear-gradient(135deg, ${course.chipGrad[0]}, ${course.chipGrad[1]})`,
                transition: "background 0.6s ease",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                  Program 0{activeIndex + 1}
                </span>
              </div>

              <div>
                <h3 className="text-white font-heading font-bold text-lg leading-tight mb-1">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 text-white/65 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers size={11} />
                    {course.modules} modules
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Satellite icons */}
        {[
          { Icon: Sat1, x: -130, y: -90, delay: 0 },
          { Icon: Sat2, x: 130, y: -100, delay: 0.3 },
          { Icon: Sat3, x: -110, y: 110, delay: 0.6 },
        ].map(({ Icon: SatIcon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shadow-lg"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              background: "oklch(0.22 0.05 280 / 0.8)",
              backdropFilter: "blur(8px)",
            }}
            animate={{ y: [y, y - 8, y] }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <SatIcon size={15} className="text-white/70" />
          </motion.div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {COURSES.map((c, i) => (
          <div
            key={c.title}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 22 : 8,
              background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Left-side detail panel ───────────────────────────────────────────

function CourseDetails({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div>
      {/* Selector rows */}
      <div className="flex flex-col gap-2 mb-8">
        {COURSES.map((course, i) => {
          const TagIcon = course.tagIcon;
          const active = i === activeIndex;
          return (
            <button
              key={course.title}
              onClick={() => onSelect(i)}
              className="text-left rounded-xl border px-4 py-3 transition-all duration-300"
              style={{
                borderColor: active ? course.accentColor : "var(--border)",
                background: active ? `${course.accentColor}0d` : "transparent",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-heading font-semibold text-sm"
                  style={{
                    color: active ? course.accentColor : "var(--foreground)",
                  }}
                >
                  {course.title}
                </span>
                <Badge variant="subtle" className="text-[10px] gap-1">
                  <TagIcon size={9} />
                  {course.tag}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active course full detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {COURSES[activeIndex].subtitle}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {COURSES[activeIndex].duration}
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5">
              <BarChart2 size={13} />
              {COURSES[activeIndex].level}
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5">
              <Layers size={13} />
              {COURSES[activeIndex].modules} modules
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {COURSES[activeIndex].topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-2 text-xs text-muted-foreground px-3 py-2.5 rounded-lg bg-muted/50 border border-border/60"
              >
                <Check
                  size={12}
                  style={{ color: COURSES[activeIndex].accentColor }}
                />
                {topic}
              </div>
            ))}
          </div>

          <p
            className="text-sm text-muted-foreground leading-relaxed mb-7 pl-3 border-l-2 italic"
            style={{ borderColor: COURSES[activeIndex].accentColor }}
          >
            {COURSES[activeIndex].outcome}
          </p>

          <Button
            variant="primary"
            size="lg"
            style={{ background: COURSES[activeIndex].accentColor }}
          >
            View curriculum
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────

export function Courses() {
  const { rotateY, index, goTo } = useCardCycle();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="section-light py-10 md:py-20 overflow-hidden relative w-full"
    >
      <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1}
        enableBlur={true}
        blurStrength={0.6}
        animationStart="top top"
        animationEnd="bottom center"
      >
        <Image
          src="/images/cute-robot-without-bg.png"
          alt="Decorative robot"
          width={200}
          height={200}
          className="object-contain opacity-100"
        />
      </ScrollReveal>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <Badge variant="subtle">Programs</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight max-w-xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Two programs.
            <br />
            <span className="text-primary">Infinite possibilities.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <CourseDetails activeIndex={index} onSelect={goTo} />
          <CourseStage activeIndex={index} rotateY={rotateY} />
        </motion.div>
      </div>
    </section>
  );
}
