"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const satellites = [
  { label: "search", angle: 0 },
  { label: "share", angle: 60 },
  { label: "mail", angle: 120 },
  { label: "chat", angle: 180 },
  { label: "hashtag", angle: 240 },
  { label: "heart", angle: 300 },
];

const RADIUS = 150;

function SatelliteIcon({ label }: { label: string }) {
  const common = "w-full h-full stroke-[1.8]";
  switch (label) {
    case "search":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <circle cx="11" cy="11" r="6" stroke="currentColor" />
          <path
            d="M20 20l-4.5-4.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <circle cx="6" cy="12" r="2.5" stroke="currentColor" />
          <circle cx="18" cy="6" r="2.5" stroke="currentColor" />
          <circle cx="18" cy="18" r="2.5" stroke="currentColor" />
          <path
            d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
          />
          <path
            d="M3 7l9 6 9-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M4 5h16v11H8l-4 4V5z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "hashtag":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M5 9h14M5 15h14M9 4l-2 16M17 4l-2 16"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M12 20s-7-4.4-9.4-8.8C1.2 8 2.6 5 6 5c2 0 3.4 1.2 4 2.4C10.6 6.2 12 5 14 5c3.4 0 4.8 3 3.4 6.2C15 15.6 12 20 12 20z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function DigitalMarketingAnimation({
  className = "",
}: {
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-full overflow-hidden  ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #0d1f4d 0%, #040d24 45%, #000000 100%)",
      }}
    >
      {/* Heading text, sits behind the animation */}
      <div className="absolute top-25 left-5 sm:top-30 sm:left-10 z-0 select-none pointer-events-none">
        <h3 className="text-4xl md:text-7xl lg:text-[7rem] font-extrabold uppercase tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-b from-white via-secondary to-secondary">
          Digital
        </h3>
      </div>

      <div className="absolute bottom-15 right-5 sm:bottom-10 sm:right-10 z-0 select-none pointer-events-none">
        <h3 className="text-4xl md:text-7xl lg:text-[7rem] font-extrabold uppercase tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-t from-white via-secondary to-secondary">
          Marketing
        </h3>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-105 h-105 rounded-full bg-primary/30 blur-[100px]"
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Connecting lines (SVG, drawn to each satellite angle) */}
        <svg className="absolute w-95 h-95" viewBox="-190 -190 380 380">
          {satellites.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS;
            const y = Math.sin(rad) * RADIUS;
            return (
              <motion.line
                key={i}
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke="var(--button)"
                strokeWidth={1}
                strokeDasharray="4 6"
                initial={{ opacity: 0 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.25 }
                    : { opacity: [0.1, 0.4, 0.1] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* Orbit ring, rotates; children counter-rotate to stay upright */}
        <motion.div
          className="absolute w-75 h-75"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {satellites.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS;
            const y = Math.sin(rad) * RADIUS;
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-11 h-11 -mt-5.5 -ml-5.5 rounded-2xl bg-primary/90 border border-primary/50 flex items-center justify-center text-button shadow-[0_0_18px_-4px_var(--button)]"
                style={{ x, y }}
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="w-5 h-5"
                  animate={
                    prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                >
                  <SatelliteIcon label={s.label} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center hub — megaphone */}
        <motion.div
          className="relative z-10 w-25 h-25 rounded-full bg-linear-to-br from-primary to-button flex items-center justify-center shadow-[0_0_50px_-6px_var(--button)]"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-11 h-11 text-white stroke-[1.6]"
          >
            <path
              d="M3 11v2a2 2 0 002 2h1l2 5h2l-1.5-5H10l8 4V6l-8 4H5a2 2 0 00-2 1z"
              stroke="currentColor"
              strokeLinejoin="round"
            />
            <path
              d="M18 9a3 3 0 010 6"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg> */}
          <Image
            src="/images/vipprow-without-bg.png"
            alt="Vipprow Logo"
            width={70}
            height={70}
          />
        </motion.div>
      </div>

      {/* Rising "engagement" particles */}
      {!prefersReducedMotion &&
        [10, 30, 55, 75, 90].map((left, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-button"
            style={{ left: `${left}%` }}
            animate={{ y: ["0%", "-320%"], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          />
        ))}
    </div>
  );
}
