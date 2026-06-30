"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

const COMPANIES = [
  "Google",
  "Microsoft",
  "Amazon",
  "Razorpay",
  "Flipkart",
  "Zomato",
  "CRED",
  "Swiggy",
  "PhonePe",
  "Meesho",
  "Atlassian",
  "Freshworks",
  "Paytm",
  "Byju's",
  "Ola",
];

const METRICS = [
  { value: 2400, suffix: "+", label: "Successful Placements" },
  { value: 18.5, suffix: "L", prefix: "₹", label: "Avg. Annual Package" },
  { value: 96, suffix: "%", label: "Placement Rate" },
  { value: 50, suffix: "+", label: "Partner Companies" },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((value * eased).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display)}
      {suffix}
    </span>
  );
}

export function TrustedBy() {
  return (
    <section
      id="trusted"
      className="section-light py-10 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Metrics */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {METRICS.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="text-center">
              <p
                className="font-heading font-bold text-foreground tabular-nums"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                <AnimatedNumber
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.suffix === "L" ? 1 : 0}
                />
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading font-semibold mb-10"
        >
          Vipprow alumni work at
        </motion.p>

        {/* Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--background), transparent)",
            }}
          />

          <div className="overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
              {[...COMPANIES, ...COMPANIES].map((company, i) => (
                <span
                  key={`${company}-${i}`}
                  className="text-base font-heading font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200 shrink-0"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
