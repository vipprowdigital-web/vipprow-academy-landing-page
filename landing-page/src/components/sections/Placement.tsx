'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, Award, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/animations';

const PARTNER_COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay',
  'CRED', 'Zomato', 'Swiggy', 'PhonePe', 'Meesho',
  'Atlassian', 'Freshworks', 'Paytm', 'Ola', 'Byju\'s',
  'InMobi', 'Myntra', 'Snapdeal', 'PolicyBazaar', 'Zepto',
];

const HIGHLIGHTS = [
  {
    icon: TrendingUp,
    stat: '₹18.5L',
    label: 'Average annual CTC',
    sub: 'Across all 2025 batches',
  },
  {
    icon: Award,
    stat: '96%',
    label: 'Placement rate',
    sub: 'Within 90 days of graduation',
  },
  {
    icon: Building2,
    stat: '50+',
    label: 'Hiring partners',
    sub: 'From startups to MNCs',
  },
  {
    icon: Users,
    stat: '2,400+',
    label: 'Alumni placed',
    sub: 'Since 2020',
  },
];

export function Placement() {
  return (
    <section id="placement" className="section-light py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="default">Placement Assistance</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            We don&apos;t stop until
            <br />
            <span className="text-primary">you get placed.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Our placement team works alongside you from week one. Resume
            building, mock interviews, warm referrals — everything it takes.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <h.icon size={18} className="text-primary" />
              </div>
              <p className="font-heading font-bold text-foreground text-2xl mb-1">
                {h.stat}
              </p>
              <p className="font-medium text-foreground text-sm mb-0.5">
                {h.label}
              </p>
              <p className="text-xs text-muted-foreground">{h.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner companies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-heading font-semibold mb-8">
            Our hiring partners
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNER_COMPANIES.map((company, i) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.04,
                }}
                className="px-4 py-2 rounded-xl border border-border bg-card/40 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
