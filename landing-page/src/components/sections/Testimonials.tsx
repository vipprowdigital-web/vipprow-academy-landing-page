'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/animations';

const TESTIMONIALS = [
  {
    name: 'Priya Mehta',
    role: 'Software Engineer, Google',
    batch: 'Batch 2024',
    initials: 'PM',
    color: '#7c3aed',
    quote:
      'I went from zero coding experience to landing a role at Google in 8 months. The projects and 1:1 mentorship made the difference. Not a single week felt like filler.',
    package: '₹28 LPA',
  },
  {
    name: 'Rahul Nair',
    role: 'Data Engineer, Razorpay',
    batch: 'Batch 2024',
    initials: 'RN',
    color: '#4f46e5',
    quote:
      'The curriculum is ruthlessly practical. Every concept maps to something you\'ll use in an actual job. The capstone project alone gave me 4 conversation starters in interviews.',
    package: '₹22 LPA',
  },
  {
    name: 'Aisha Kapoor',
    role: 'Frontend Engineer, CRED',
    batch: 'Batch 2023',
    initials: 'AK',
    color: '#0ea5e9',
    quote:
      'What stands out is the network. I got my CRED referral through a Vipprow alumni. The cohort you build here follows you into your career.',
    package: '₹19 LPA',
  },
  {
    name: 'Vikram Singh',
    role: 'ML Engineer, Amazon',
    batch: 'Batch 2023',
    initials: 'VS',
    color: '#16a34a',
    quote:
      'Arjun\'s code reviews are brutal — in the best way. I\'ve never had someone make me think so hard about why I wrote code a certain way. That\'s the real education.',
    package: '₹34 LPA',
  },
  {
    name: 'Sneha Rao',
    role: 'Product Designer, Swiggy',
    batch: 'Batch 2024',
    initials: 'SR',
    color: '#d97706',
    quote:
      'As a designer learning to code, I needed a program that could meet me where I was. The flexibility and mentor patience were exceptional. Landed Swiggy in month 5.',
    package: '₹16 LPA',
  },
  {
    name: 'Karthik Balan',
    role: 'Backend Engineer, PhonePe',
    batch: 'Batch 2024',
    initials: 'KB',
    color: '#dc2626',
    quote:
      'The placement preparation is comprehensive. Mock technical rounds, behavioural coaching, salary negotiation — I walked into every interview confident. Got 3 offers, chose the best one.',
    package: '₹24 LPA',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-light-alt py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="subtle">Student Reviews</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Hear it from those
            <br />
            who made the leap.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Real stories. Real packages. Real career transformations.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.floor(i / 3) * 0.1 + (i % 3) * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8"
            >
              {/* Subtle top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                }}
              />

              {/* Quote icon */}
              <Quote
                size={32}
                className="text-border mb-4"
                style={{ color: `${t.color}30` }}
              />

              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-heading font-bold shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm font-heading font-bold"
                    style={{ color: t.color }}
                  >
                    {t.package}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.batch}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
