"use client";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  floatRange?: number;
  floatDuration?: number;
}

export function FloatingCard({
  children,
  className,
  style,
  delay = 0,
  floatRange = 8,
  floatDuration = 4,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={cn("pointer-events-auto", className)}
    >
      <motion.div
        animate={{ y: [0, -floatRange, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.7,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
