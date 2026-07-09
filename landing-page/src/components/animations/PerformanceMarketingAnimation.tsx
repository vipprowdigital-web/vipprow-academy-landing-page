"use client";

import { motion, useReducedMotion } from "framer-motion";

const bars = [40, 65, 50, 85, 70, 100];

export default function PerformanceMarketingAnimation({
  className = "",
}: {
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: "var(--gradient-scene)",
      }}
    >
      {/* Heading text, sits behind the animation */}
      <div className="absolute top-25 left-5 sm:top-20 sm:left-10 z-0 select-none pointer-events-none">
        <h3 className="text-4xl md:text-7xl lg:text-[5rem] font-extrabold uppercase tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-b from-white via-secondary to-secondary">
          Performance
        </h3>
      </div>

      <div className="absolute bottom-15 right-5 sm:bottom-10 sm:right-10 z-0 select-none pointer-events-none">
        <h3 className="text-4xl md:text-7xl lg:text-[5rem] font-extrabold uppercase tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-t from-white via-secondary to-secondary">
          Marketing
        </h3>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute w-105 h-105 rounded-full bg-primary/30 blur-[100px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dashboard card */}
      <div className="relative z-10 w-72 sm:w-[320px] rounded-2xl border border-primary/50 bg-primary/80 backdrop-blur-sm p-6 shadow-[0_0_60px_-12px_var(--button)]">
        {/* KPI row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              ROAS
            </p>
            <motion.p
              className="text-2xl font-bold text-white"
              animate={
                prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              4.8x
            </motion.p>
          </div>
          <motion.div
            className="flex items-center gap-1 rounded-full bg-button/20 px-3 py-1 text-button text-xs font-semibold"
            animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3.5 h-3.5 stroke-2"
            >
              <path
                d="M4 16l6-6 4 4 6-8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 6h6v6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            +247%
          </motion.div>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2.5 h-28 mb-5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md bg-linear-to-t from-primary to-button"
              initial={{ height: "0%" }}
              animate={{ height: `${h}%` }}
              transition={{
                duration: 1.2,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
            />
          ))}
        </div>

        {/* Trend line overlay */}
        <svg viewBox="0 0 280 60" className="w-full h-12 -mt-2">
          <motion.path
            d="M0 45 L45 30 L90 38 L135 15 L180 24 L225 8 L280 2"
            fill="none"
            stroke="var(--button)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        </svg>
      </div>

      {/* Target hitting bullseye — floats near the card */}
      <motion.div
        className="absolute z-10"
        style={{ top: "14%", right: "12%" }}
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 60" className="w-14 h-14">
          <circle
            cx="30"
            cy="30"
            r="26"
            stroke="var(--button)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="30"
            cy="30"
            r="17"
            stroke="var(--button)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <circle cx="30" cy="30" r="8" fill="var(--button)" />
          <motion.line
            x1="6"
            y1="54"
            x2="26"
            y2="34"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: "easeOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Pulse rings from the card, signalling "conversions" */}
      <motion.div
        className="absolute z-0 w-[320px] h-80 rounded-2xl border border-button/40"
        animate={
          prefersReducedMotion ? undefined : { scale: [1, 1.15], opacity: [0.35, 0] }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}
