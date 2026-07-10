"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Users2,
  Trophy,
  Briefcase,
  Rocket,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import ScrollReveal from "../animations/ScrollReveal";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Learning",
    desc: "Master ChatGPT, Gemini, Canva AI, automation tools, and AI workflows to work smarter and stay ahead in the marketing industry.",
    accent: "#0b0738",
  },
  {
    icon: Rocket,
    title: "Live Campaign Experience",
    desc: "Run real Google Ads and Meta Ads campaigns, analyze performance, optimize budgets, and learn exactly how agencies work.",
    accent: "#1c1f51",
  },
  {
    icon: Users2,
    title: "Learn from Industry Experts",
    desc: "Get mentored by experienced digital marketers who have managed campaigns across multiple industries and brands.",
    accent: "#31376b",
  },
  {
    icon: Trophy,
    title: "Industry-Ready Certification",
    desc: "Earn a professional certification after completing practical projects that demonstrate real marketing skills—not just theory.",
    accent: "#485087",
  },
  {
    icon: Briefcase,
    title: "Placement & Freelancing Support",
    desc: "Receive career guidance, interview preparation, resume building, freelancing mentorship, and job placement assistance.",
    accent: "#616aa3",
  },
  {
    icon: Code2,
    title: "Portfolio with Real Projects",
    desc: "Build live websites, marketing campaigns, landing pages, SEO case studies, and AI-powered workflows that showcase your expertise.",
    accent: "#7b84bf",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="w-full section-light-alt py-10 md:py-20"
    >
      <ScrollReveal
        scrollContainerRef={sectionRef}
        baseOpacity={1}
        enableBlur={false}
        blurStrength={0}
        startY={10}
        // animationStart="top top"
        animationEnd="bottom center"
        bottomOffset={10}
      >
        <Image
          src="/images/vipprow-brand-black-blue-gradient-2.png"
          alt="Watermark decoration"
          width={450}
          height={50}
          className="object-contain opacity-100 w-40 sm:w-auto h-auto"
        />
      </ScrollReveal>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          {/* <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="subtle">Why Vipprow</Badge>
          </motion.div> */}
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Why choose <br />
            <span className="text-primary"> Vipprow Academy?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Learn from industry professionals through live projects, real
            marketing campaigns, and AI-powered workflows designed to prepare
            you for high-paying jobs, freelancing, or building your own digital
            agency.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.floor(i / 3) * 0.1 + (i % 3) * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden cursor-default transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                style={{ background: f.accent }}
              />

              <div
                className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.accent}20` }}
              >
                <f.icon size={18} style={{ color: f.accent }} />
              </div>

              <h3 className="font-heading font-semibold text-foreground text-base mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
