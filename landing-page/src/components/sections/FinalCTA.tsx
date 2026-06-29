'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { stagger, fadeUp } from '@/lib/animations';

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  return (
    <section ref={sectionRef} id="cta" className="py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-3xl overflow-hidden border border-border"
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, oklch(0.16 0.04 270) 0%, oklch(0.14 0.06 260) 50%, oklch(0.18 0.08 280) 100%)',
            }}
          />

          {/* Animated glow orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'oklch(0.55 0.2 275)' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'oklch(0.45 0.18 260)' }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative z-10 text-center px-6 py-20 md:py-28"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-primary/20 text-primary border border-primary/30">
                <Sparkles size={12} />
                Limited seats · Batch 2026
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading font-bold leading-[1.02] tracking-tight text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Ready to transform
              <br />
              your career?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-10"
            >
              Join 2,400+ engineers who took the leap. Applications for Batch
              2026 close when seats fill — they always do.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button variant="primary" size="lg" className="min-w-48">
                Apply Now — It&apos;s Free
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg">
                Talk to an Advisor
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-xs text-muted-foreground"
            >
              No commitment. No credit card. Application takes 4 minutes.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
