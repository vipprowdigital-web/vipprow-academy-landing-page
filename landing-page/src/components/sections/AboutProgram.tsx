"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Layers, Zap, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger, clipReveal } from "@/lib/animations";
import SectionTypography from "../SectionTypography";
import ScrollReveal from "../animations/ScrollReveal";
import Image from "next/image";

const PILLARS = [
  {
    icon: Layers,
    title: "Industry-led Curriculum",
    desc: "Built with senior engineers from top product companies. Updated every quarter to reflect what actually gets hired.",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    desc: "No death by slides. Every concept is applied immediately through projects that mirror real engineering challenges.",
  },
  {
    icon: Users,
    title: "Cohort-based Learning",
    desc: "Work alongside high-intent peers. Build your network before you graduate. The cohort becomes your career advantage.",
  },
];

export function AboutProgram() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Create a dedicated ref for the GSAP Pinned Section Container
  // const pinContainerRef = useRef<HTMLElement>(null);
  // 2. Keep a separate ref for Framer Motion's parallax viewport boundaries
  // const motionTargetRef = useRef<HTMLDivElement>(null);
  //
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"],
  // });

  // const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      // ref={pinContainerRef}
      className="section-light bg-white! w-full py-10 md:py-32 overflow-hidden relative"
    >
      <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1}
        enableBlur={true}
        blurStrength={0.6}
        // animationStart="top top"
        animationEnd="bottom center"
      >
        <Image
          src="/images/cute-robot.gif"
          alt="Decorative robot"
          width={350}
          height={350}
          className="object-contain opacity-100 z-50 w-40 sm:w-87.5"
        />
      </ScrollReveal>
      {/* <SectionTypography
        // sectionRef={sectionRef}
        sectionRef={pinContainerRef}
        text="BUILDING"
        pin={true}
        colorClassName="text-primary/10"
        initialPositionClassName="top-[8%] right-[4%] sm:right-[6%]"
        bottomOffset={80}
      /> */}
      {/* <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1} 
        enableBlur={false}
        blurStrength={0}
        startY={-90}
        bottomOffset={0}
      >
        <Image
          src="/images/vipprow-brand-black-blue-gradient.png"
          alt="Watermark decoration"
          width={600}
          height={100}
          className="object-contain opacity-100"
        />
      </ScrollReveal> */}
      {/* <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1} // Subtle background watermark opacity
        enableBlur={false}
        blurStrength={1} // Slightly stronger blur for the entry splash
        animationEnd="bottom center" // Completes its path right as the Hero leaves the screen
        contentClassName="var(--primary, rgba(0,0,0,0.05)) font-heading font-black tracking-wider text-right will-change-transform text-[6rem]" // Using your utility styling color match
      >
        WITH
      </ScrollReveal> */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: editorial copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="default">About the Program</Badge>
            </motion.div>

            <motion.h2
              variants={clipReveal}
              className="font-heading font-bold leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Not a course.
              <br />
              <span className="text-primary">An experience.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed mb-10"
            >
              Vipprow Academy is built around the belief that the best way to
              learn engineering is to engineer. We combine live instruction,
              structured mentorship and real-world projects to give you a
              complete, context-rich education — not just a certificate.
            </motion.p>

            <motion.ul variants={stagger} className="space-y-4">
              {[
                "Live sessions with senior engineers — not recorded lectures",
                "Weekly 1:1 mentor check-ins on your actual code",
                "Build 6+ portfolio projects before you graduate",
                "Placement support until you land your first role",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: pillars grid with parallax */}
          <motion.div style={{ y }} className="space-y-4">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.15,
                }}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-base mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
