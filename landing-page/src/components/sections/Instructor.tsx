"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp, stagger, clipReveal, slideLeft } from "@/lib/animations";
import Image from "next/image";

const CREDENTIALS = [
  {
    label: "Experience",
    value: "9+ Years in Digital Marketing & Brand Growth",
  },
  {
    label: "Expertise",
    value: "SEO • Google Ads • Meta Ads • Performance Marketing • AI Tools",
  },
  {
    label: "Founder",
    value: "Vipprow Digital Solutions & Vipprow Academy",
  },
  {
    label: "Mentorship",
    value: "Live Projects, Career Guidance & Industry Training",
  },
  {
    label: "Mission",
    value: "Building Job-Ready Digital Marketing Professionals",
  },
];

const SOCIALS = [
  {
    icon: "/socials/linkedin-logo.svg",
    href: "https://www.linkedin.com/in/reva-prasad-tiwari-61405517b/",
    label: "LinkedIn",
  },
  // { icon: AtSign, href: "#", label: "Twitter / X" },
];

export function Instructor() {
  return (
    <section id="instructor" className="section-light py-10 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* ── Left: Visual ─────────────────────────────────────── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              {/* Glow behind card */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse, var(--color-primary) 0%, transparent 70%)",
                }}
              />

              {/* Photo placeholder card */}
              <div className="relative rounded-3xl border border-border bg-card overflow-hidden aspect-4/5 shadow-xl">
                {/* Gradient background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.92 0.04 275) 0%, oklch(0.85 0.08 270) 100%)",
                  }}
                />

                {/* Silhouette shape */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div
                    className="w-52 h-72 rounded-t-full"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.7 0.12 275) 0%, oklch(0.6 0.16 268) 100%)",
                    }}
                  />
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-xl border border-border/40 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                    <p className="font-heading font-bold text-foreground text-lg">
                      Reva Prasad Tiwari
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Founder, Vipprow Academy Digital Marketing Strategist & AI
                      Mentor
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
                      <MapPin size={10} />
                      <span className="text-[11px]">Jabalpur, MP</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}
                          className="p-2 rounded-lg border border-border flex items-center justify-center text-blue-800 hover:text-foreground hover:border-primary/40 transition-colors"
                          target="_blank"
                        >
                          <Image
                            src={s.icon}
                            alt="Social Icon"
                            width={20}
                            height={20}
                            className="text-blue-800"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 hidden md:block"
            >
              <div className="rounded-lg border border-border bg-card shadow-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Live Learning
                </p>

                <p className="font-heading font-bold text-foreground text-xl">
                  100% Practical
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Copy ──────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="default">Your Instructor</Badge>
            </motion.div> */}

            <motion.h2
              variants={clipReveal}
              className="font-heading font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Learn from an industry expert
              <br />
              <span className="text-primary">
                who practices what he teaches.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Vipin Tiwari is the Founder of Vipprow Academy and an experienced
              Digital Marketing Strategist with over 9 years of helping
              businesses grow through SEO, Google Ads, Performance Marketing,
              Branding, and AI-powered marketing solutions. Rather than teaching
              outdated theory, he focuses on real client projects, live
              campaigns, practical strategies, and the latest AI tools used by
              modern marketing professionals. Every lesson is designed to
              prepare students for real careers in agencies, startups, and
              businesses.
            </motion.p>

            <motion.dl variants={stagger} className="space-y-4 mb-8">
              {CREDENTIALS.map((c) => (
                <motion.div
                  key={c.label}
                  variants={fadeUp}
                  className="flex items-start sm:gap-4 py-3 border-b border-border/50 last:border-0"
                >
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground font-heading font-semibold w-36 shrink-0 pt-0.5">
                    {c.label}
                  </dt>
                  <dd className="text-sm font-medium text-foreground leading-snug">
                    {c.value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            {/* <motion.a
              variants={fadeUp}
              href="#"
              className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              View full profile
              <ExternalLink size={13} />
            </motion.a> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
