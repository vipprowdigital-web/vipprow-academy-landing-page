'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/animations';
import { cn } from '@/lib/cn';

const FAQS = [
  {
    q: 'Do I need prior coding experience to join?',
    a: 'For our Full Stack and Data Science programs, no prior experience is required. We start from first principles and move fast. The UI/UX Design program is open to anyone with a creative interest. DevOps assumes basic programming familiarity.',
  },
  {
    q: 'Is the program live or recorded?',
    a: 'Everything is live. Sessions run on weekday evenings and weekend mornings to suit working professionals. All sessions are recorded and available for replay within 24 hours, but we strongly encourage attending live — the Q&A and peer interaction are a big part of the value.',
  },
  {
    q: 'What exactly is the placement guarantee?',
    a: 'If you complete the program in good standing — attending at least 80% of sessions, submitting all projects, and participating in the placement process — and you don\'t receive a job offer within 6 months of graduation, you get a full refund. No hidden clauses.',
  },
  {
    q: 'How does the 1:1 mentorship work?',
    a: 'Each student gets one 45-minute 1:1 session per week with a dedicated senior engineer mentor. Your mentor reviews your code, explains concepts in context, and helps you plan your learning pace. You can also reach them via Slack during the week.',
  },
  {
    q: 'Can I do this while working full-time?',
    a: 'Yes — about 60% of our students are working professionals. Expect to invest 20–25 hours per week. Sessions are in the evenings and weekends. It\'s intensive, but manageable if you are deliberate about your schedule.',
  },
  {
    q: 'What does the curriculum look like in detail?',
    a: 'You can download a detailed week-by-week curriculum PDF from our Programs page. For a quick overview, each program has a 16-week structure covering fundamentals, core engineering, advanced topics, capstone projects and placement prep.',
  },
  {
    q: 'Is there an EMI / financing option?',
    a: 'Yes. We offer 0% interest EMI through our banking partners for 3, 6 and 12 month tenures. We also have an Income Share Agreement option where you pay nothing upfront and a percentage of your first year\'s salary after placement.',
  },
  {
    q: 'How large are the cohorts?',
    a: 'We cap each cohort at 40 students to maintain mentorship quality and peer intimacy. This is deliberate — we have turned away revenue to keep this limit.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      'border-b border-border/60 transition-colors duration-300',
      isOpen && 'border-primary/20'
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className={cn(
          'font-heading font-semibold text-base transition-colors duration-200',
          isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
        )}>
          {q}
        </span>
        <span className={cn(
          'shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300',
          isOpen
            ? 'bg-primary border-primary text-primary-foreground rotate-0'
            : 'border-border text-muted-foreground group-hover:border-primary/40'
        )}>
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 pr-10">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="section-light py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          {/* Left sticky header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="md:sticky md:top-24 md:self-start"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="subtle">FAQ</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading font-bold leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Questions,
              <br />
              answered.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base leading-relaxed"
            >
              Can&apos;t find what you&apos;re looking for? Reach us at{' '}
              <a
                href="mailto:hello@vipprow.com"
                className="text-primary hover:underline"
              >
                hello@vipprow.com
              </a>
            </motion.p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
