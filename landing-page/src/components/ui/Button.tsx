"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium rounded-sm cursor-pointer select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "primary" &&
          "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:shadow-xl",
        variant === "secondary" &&
          "bg-card text-foreground border border-border hover:border-primary/40 backdrop-blur-sm",
        variant === "ghost" &&
          "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-6 text-sm",
        size === "lg" && "h-14 px-8 text-base",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
