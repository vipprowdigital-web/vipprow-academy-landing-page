"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger } from "@/lib/animations";

const PHASES = [
  {
    number: "01",
    title: "Foundation",
    duration: "Weeks 1–3",
    desc: "Core programming fundamentals, problem solving and development environment setup. You build the mental models that everything else rests on.",
    skills: ["CS Fundamentals", "Git & CLI", "HTML / CSS", "JavaScript Basics"],
    color: "#7c3aed",
  },
  {
    number: "02",
    title: "Core Engineering",
    duration: "Weeks 4–8",
    desc: "Deep-dive into your chosen track. React & Node for Full Stack; Python & ML libraries for Data Science. Heavy on practice.",
    skills: [
      "Frontend / Backend",
      "APIs & Databases",
      "Testing",
      "State Management",
    ],
    color: "#4f46e5",
  },
  {
    number: "03",
    title: "Advanced Topics",
    duration: "Weeks 9–12",
    desc: "System design, performance optimisation, security and scalability. The concepts that separate mid-level engineers from senior ones.",
    skills: ["System Design", "Performance", "Security", "Cloud Infra"],
    color: "#0ea5e9",
  },
  {
    number: "04",
    title: "Capstone Projects",
    duration: "Weeks 13–15",
    desc: "Build two portfolio-worthy projects from spec to production. Real scoping, real code reviews, real deployment.",
    skills: ["Product Thinking", "Architecture", "Code Review", "Deployment"],
    color: "#16a34a",
  },
  {
    number: "05",
    title: "Placement Prep",
    duration: "Week 16",
    desc: "Mock interviews, resume reviews, salary negotiation coaching and warm introductions to our hiring partners.",
    skills: [
      "DSA Interviews",
      "System Design Rounds",
      "Resume Polish",
      "Referrals",
    ],
    color: "#d97706",
  },
];

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="roadmap" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="subtle">Learning Journey</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            16 weeks. One transformation.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            A structured path from zero to job-ready. Every week has a clear
            goal and a measurable outcome.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-2xl mx-auto">
          {/* Track line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-border/60" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-7 top-0 w-px bg-primary origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-0">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Phase dot */}
                <div className="relative z-10 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2,
                    }}
                    className="w-14 h-14 rounded-full border-2 border-border bg-background flex items-center justify-center"
                    style={{ borderColor: phase.color }}
                  >
                    <span
                      className="font-heading font-bold text-xs"
                      style={{ color: phase.color }}
                    >
                      {phase.number}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="pt-2.5 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading font-bold text-foreground text-xl">
                      {phase.title}
                    </h3>
                    <span className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
                    {phase.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-lg border font-medium"
                        style={{
                          borderColor: `${phase.color}40`,
                          color: phase.color,
                          background: `${phase.color}10`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
