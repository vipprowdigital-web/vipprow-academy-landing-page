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
  Zap,
  LineChart,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger } from "@/lib/animations";

// ── Course data ───────────────────────────────────────────────────────

// const COURSES = [
//   {
//     tag: "Most popular",
//     tagIcon: TrendingUp,
//     title: "Digital Marketing Mastery",
//     short: "Digital Marketing",
//     subtitle: "SEO · Paid Ads · Social Media · Analytics · Branding",
//     duration: "12 weeks",
//     level: "Beginner → Expert",
//     modules: 10,
//     accentColor: "#06002e", // = --primary; kept as a hex literal since it's alpha-suffixed below (e.g. `${accentColor}0d`)
//     chipGrad: ["oklch(0.55 0.18 290)", "oklch(0.42 0.2 275)"],
//     blobColors: [
//       "oklch(0.55 0.18 290)",
//       "oklch(0.45 0.22 275)",
//       "oklch(0.7 0.1 290)",
//     ],
//     icon: Globe,
//     satellites: [Megaphone, LineChart, Sparkles],
//     topics: [
//       "SEO & SEM Strategy",
//       "Google Ads & Meta Ads",
//       "Social Media Marketing",
//       "Content & Email Marketing",
//       "Analytics & Reporting",
//       "Brand Building",
//     ],
//     outcome:
//       "Launch and scale campaigns across every major digital channel with measurable ROI.",
//     tilt: { rz: -16, rx: 6, ry: -14 },
//   },
//   {
//     tag: "High ROI",
//     tagIcon: Zap,
//     title: "Performance Marketing",
//     short: "Performance Marketing",
//     subtitle: "Google Ads · Meta Ads · CRO · Analytics · Scaling",
//     duration: "10 weeks",
//     level: "Beginner → Advanced",
//     modules: 6,
//     accentColor: "#06002e", // = --primary; kept as a hex literal since it's alpha-suffixed below (e.g. `${accentColor}0d`)
//     chipGrad: ["oklch(0.5 0.2 265)", "oklch(0.4 0.22 255)"],
//     blobColors: [
//       "oklch(0.5 0.2 265)",
//       "oklch(0.42 0.22 255)",
//       "oklch(0.68 0.12 265)",
//     ],
//     icon: BarChart2,
//     satellites: [Megaphone, LineChart, Zap],
//     topics: [
//       "Campaign Fundamentals",
//       "Google Ads (Search & Display)",
//       "Meta Ads (Facebook & Instagram)",
//       "Landing Pages & CRO",
//       "Analytics & Attribution",
//       "Scaling & Automation",
//     ],
//     outcome:
//       "Run profitable, data-driven ad campaigns across Google and Meta with measurable ROAS.",
//     tilt: { rz: 14, rx: -5, ry: 12 },
//   },
// ] as const;
const COURSES = [
  {
    tag: "Most Popular",
    tagIcon: TrendingUp,
    title: "Digital Marketing",
    short: "Digital Marketing",
    subtitle: "SEO · Social Media · Content Marketing · AI Tools · Branding",
    duration: "16 Weeks",
    level: "Beginner → Advanced",
    modules: 12,
    accentColor: "#06002e",
    chipGrad: ["oklch(0.55 0.18 290)", "oklch(0.42 0.2 275)"],
    blobColors: [
      "oklch(0.55 0.18 290)",
      "oklch(0.45 0.22 275)",
      "oklch(0.7 0.1 290)",
    ],
    icon: Globe,
    satellites: [Sparkles, Megaphone, LineChart],
    topics: [
      "SEO & Local SEO",
      "Social Media Marketing",
      "Content Strategy",
      "Email Marketing",
      "Google Analytics",
      "AI Tools (ChatGPT, Gemini, Canva AI)",
    ],
    outcome:
      "Build complete digital marketing strategies, create high-converting campaigns, and leverage AI tools to grow businesses faster.",
    tilt: { rz: -16, rx: 6, ry: -14 },
  },
  {
    tag: "Career Focused",
    tagIcon: Zap,
    title: "Performance Marketing",
    short: "Performance Marketing",
    subtitle: "Google Ads · Meta Ads · CRO · Automation · Lead Generation",
    duration: "12 Weeks",
    level: "Intermediate → Expert",
    modules: 10,
    accentColor: "#06002e",
    chipGrad: ["oklch(0.5 0.2 265)", "oklch(0.4 0.22 255)"],
    blobColors: [
      "oklch(0.5 0.2 265)",
      "oklch(0.42 0.22 255)",
      "oklch(0.68 0.12 265)",
    ],
    icon: BarChart2,
    satellites: [Megaphone, LineChart, Zap],
    topics: [
      "Google Ads Mastery",
      "Meta Ads (Facebook & Instagram)",
      "Landing Pages & CRO",
      "Conversion Tracking",
      "Marketing Automation",
      "Campaign Scaling",
    ],
    outcome:
      "Plan, launch, optimize, and scale profitable advertising campaigns while mastering analytics, automation, and ROI-driven marketing.",
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
      className="relative w-full h-105 md:h-130 rounded-3xl overflow-hidden border border-white/10"
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

          <div className="flex md:flex-row flex-wrap justify- sm:justify-start items-center gap-4 text-xs text-muted-foreground mb-6">
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

          {/* <Button
            variant="primary"
            size="lg"
            className="bg-linear-to-r from-primary to-button"
          >
            View curriculum
            <ArrowRight size={16} />
          </Button> */}
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
      className="section-light bg-white! py-10 md:py-20 overflow-hidden relative w-full"
    >
      {/* <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1}
        enableBlur={true}
        blurStrength={0.6}
        animationStart="top top"
        animationEnd="bottom center"
      >
        <Image
          src="/images/cute-robot.gif"
          alt="Decorative robot"
          width={400}
          height={400}
          className="object-contain opacity-100 z-50"
        />
      </ScrollReveal> */}
      <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1} // Subtle background watermark opacity
        enableBlur={false}
        blurStrength={1} // Slightly stronger blur for the entry splash
        animationEnd="bottom center" // Completes its path right as the Hero leaves the screen
        contentClassName="var(--primary, rgba(0,0,0,0.05)) font-heading font-black tracking-tight text-right will-change-transform text-4xl sm:text-6xl lg:text-[6rem]" // Using your utility styling color match
      >
        WITH
      </ScrollReveal>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          {/* <motion.div variants={fadeUp} className="mb-4">
            <Badge variant="subtle">Programs</Badge>
          </motion.div> */}
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight max-w-xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Learn today&apos;s most
            <br />
            <span className="text-primary">in-demand marketing skills.</span>
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
          <div className="relative self-start w-full">
            <CourseStage activeIndex={index} rotateY={rotateY} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
