'use client';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({
  className,
  children,
  glow = false,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6',
        glow && 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
        'transition-[border-color,box-shadow] duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
