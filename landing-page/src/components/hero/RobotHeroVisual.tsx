"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const particles = [
  { size: 8, top: "8%", left: "2%", duration: 6, delay: 0 },
  { size: 5, top: "72%", left: "-2%", duration: 5, delay: 0.5 },
  { size: 6, top: "15%", left: "92%", duration: 7, delay: 1 },
  { size: 4, top: "82%", left: "88%", duration: 5.5, delay: 1.5 },
  { size: 7, top: "45%", left: "96%", duration: 6.5, delay: 0.8 },
  { size: 5, top: "5%", left: "60%", duration: 5.8, delay: 1.2 },
];

export default function RobotHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full max-w-200 mx-auto"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow blobs */}
      <motion.div
        className="absolute w-95 h-95 rounded-full blur-[110px] bg-primary/40"
        style={{ left: "6%", top: "12%" }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-75 h-75 rounded-full blur-[90px]"
        style={{ right: "4%", bottom: "8%", backgroundColor: "var(--button)" }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.2, 1] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Orbiting sparkle particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            backgroundColor: "var(--button)",
            boxShadow: "0 0 12px 3px var(--button)",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -18, 0], opacity: [0.2, 1, 0.2] }
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Robot — entrance + idle float + parallax tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.6, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.15 }}
        className="relative z-10 w-full"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image
            src="/images/cute-robot-with-laptop.png"
            alt="Vipprow Academy AI assistant waving from a laptop"
            width={700}
            height={620}
            priority
            className="w-full h-auto select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />

          {/* Laptop screen glow — roughly over the laptop panel */}
          <motion.div
            className="absolute rounded-md blur-2xl"
            style={{
              right: "40%",
              bottom: "16%",
              width: "26%",
              height: "16%",
              backgroundColor: "var(--button)",
            }}
            animate={
              prefersReducedMotion ? undefined : { opacity: [0.2, 0.7, 0.2] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Attention ping near the waving hand */}
          <motion.span
            className="absolute rounded-full border-2"
            style={{
              top: "36%",
              right: "45%",
              width: 40,
              height: 40,
              borderColor: "var(--button)",
              opacity: prefersReducedMotion ? 0 : undefined,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [0.6, 1.8], opacity: [0.7, 0] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Diagonal scanning light sweep */}
      {/* {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <motion.div
            className="absolute top-0 h-full w-1/3 skew-x-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
            animate={{ left: ["-40%", "120%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
        </div>
      )} */}
    </div>
  );
}
