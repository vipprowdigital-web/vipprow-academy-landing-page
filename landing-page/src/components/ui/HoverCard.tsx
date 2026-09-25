"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  category: string;
  title: string;
  description: string;
}

export function HoverCard({
  category,
  title,
  description,
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const moduleNumber = category.match(/\d+/)?.[0];

  return (
    <div
      className="relative w-full h-112.5 bg-white border border-neutral-800 overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Resting Gradient Zone ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden bg-linear-to-br from-neutral-950 via-neutral-900 to-primary/70"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        aria-hidden="true"
      >
        {/* Soft glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/40 blur-3xl" />
        {/* Module number watermark */}
        {moduleNumber && (
          <span className="absolute -bottom-6 -right-2 font-heading font-black text-[9rem] leading-none text-white/[0.06] select-none">
            {moduleNumber}
          </span>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* ── Hover Gradient ───────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary via-ring to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* ── Content Layout Zone ──────────────────────────────────────── */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
        {/* Top Tag Label */}
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase opacity-75">
            {category}
          </span>
        </div>

        {/* Bottom Panel Wrapper */}
        {/* <div className="flex flex-col gap-3"> */}
        {/* Main Headline */}
        <h3 className="font-heading font-bold text-xl md:text-2xl leading-snug tracking-tight">
          {title}
        </h3>

        {/* Collapsible/Expanding Content Block */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{
            x: isHovered ? 0 : -40,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden"
        >
          <p className="text-sm text-neutral-300 leading-relaxed font-normal pt-1">
            {description}
          </p>

          {/* Optional Accenture Style Expand CTA */}
          {/* <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white">
            <span>Expand</span>
            <span className="text-[10px]">→</span>
          </div> */}
        </motion.div>
        {/* </div> */}
      </div>
    </div>
  );
}
