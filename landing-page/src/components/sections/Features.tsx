'use client';
import { motion } from 'framer-motion';
import {
  Code2, BrainCircuit, Users2, Trophy, Briefcase, Rocket
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/animations';

const FEATURES = [
  {
    icon: Code2,
    title: 'Real-World Projects',
    desc: 'Work on production-grade codebases that solve actual problems — not contrived exercises.',
    accent: '#7c3aed',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Augmented Learning',
    desc: 'Leverage AI tools the way industry does. Learn to build with AI, not just understand it.',
    accent: '#4f46e5',
  },
  {
    icon: Users2,
    title: 'Elite Mentorship',
    desc: 'Weekly live sessions and code reviews with senior engineers from Google, Amazon and Razorpay.',
    accent: '#0ea5e9',
  },
  {
    icon: Trophy,
    title: 'Industry Recognition',
    desc: 'Our certification is recognised by 50+ companies. Hiring partners who trust our graduates.',
    accent: '#d97706',
  },
  {
    icon: Briefcase,
    title: 'Placement Guarantee',
    desc: 'Get placed or get a full refund. We are financially committed to your career outcome.',
    accent: '#16a34a',
  },
  {
    icon: Rocket,
    title: 'Lifetime Access',
    desc: 'Curriculum evolves — so does your access. Stay current long after your batch graduates.',
    accent: '#dc2626',
  },
];

export function Features() {
  return (
    <section id="features" className="section-light-alt py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="subtle">Why Vipprow</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Six reasons we&apos;re different
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Most courses sell you content. We sell you outcomes.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.floor(i / 3) * 0.1 + (i % 3) * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden cursor-default transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                style={{ background: f.accent }}
              />

              <div
                className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.accent}20` }}
              >
                <f.icon size={18} style={{ color: f.accent }} />
              </div>

              <h3 className="font-heading font-semibold text-foreground text-base mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
