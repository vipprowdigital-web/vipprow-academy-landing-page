"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HoverCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function HoverCard({
  category,
  title,
  description,
  imageUrl,
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-112.5 bg-white border border-neutral-800 overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Background Image Zone ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          width={200}
          height={400}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
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
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white">
            <span>Expand</span>
            <span className="text-[10px]">→</span>
          </div>
        </motion.div>
        {/* </div> */}
      </div>
    </div>
  );
}
