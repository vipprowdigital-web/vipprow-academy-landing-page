"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Do I need any prior digital marketing experience?",
    a: "No. Our programs are designed for beginners, students, job seekers, entrepreneurs, and working professionals. We start with the fundamentals and gradually move to advanced, industry-level strategies through practical implementation.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "All classes are conducted live by experienced trainers. Every session is also recorded, so you can revisit concepts anytime if you miss a class or want to revise.",
  },
  {
    q: "Will I work on real projects?",
    a: "Yes. You'll work on live projects, real business case studies, website optimization, Google Ads, Meta Ads, SEO, AI tools, and campaign strategy—giving you practical experience that employers value.",
  },
  {
    q: "Do you provide placement assistance?",
    a: "Yes. We provide 100% placement assistance including resume building, LinkedIn profile optimization, interview preparation, portfolio development, mock interviews, and job referrals through our hiring network.",
  },
  {
    q: "Which digital marketing tools will I learn?",
    a: "You'll gain hands-on experience with Google Ads, Meta Ads Manager, Google Analytics 4 (GA4), Google Search Console, Google Tag Manager, Canva, WordPress, ChatGPT, AI marketing tools, and other industry-standard platforms.",
  },
  {
    q: "Can I join while studying or working full-time?",
    a: "Absolutely. Our flexible class schedules are designed for college students, working professionals, freelancers, and business owners who want to upskill without interrupting their current commitments.",
  },
  {
    q: "Will I receive a certificate after completing the course?",
    a: "Yes. After successfully completing the program and practical assignments, you'll receive a Vipprow Academy Certification that validates your industry-ready digital marketing skills.",
  },
  {
    q: "What makes Vipprow Academy different?",
    a: "We focus on practical learning instead of theory. Every student learns through live projects, real client campaigns, AI-powered workflows, expert mentorship, career guidance, and placement assistance to become job-ready from day one.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "border-b border-border/60 transition-colors duration-300",
        isOpen && "border-primary/20",
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "font-heading font-semibold text-base transition-colors duration-200",
            isOpen
              ? "text-primary"
              : "text-foreground group-hover:text-primary",
          )}
        >
          {q}
        </span>
        <span
          className={cn(
            "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
            isOpen
              ? "bg-primary border-primary text-primary-foreground rotate-0"
              : "border-border text-muted-foreground group-hover:border-primary/40",
          )}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
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
    <section id="faq" className="section-light py-10 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-5 sm:gap-16 md:gap-24">
          {/* Left sticky header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="md:sticky md:top-24 md:self-start"
          >
            {/* <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="subtle">FAQ</Badge>
            </motion.div> */}
            <motion.h2
              variants={fadeUp}
              className="font-heading font-bold leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Questions,
              <br />
              answered.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base leading-relaxed"
            >
              Can&apos;t find what you&apos;re looking for? Reach us at{" "}
              <a
                href="mailto:vipprowacademy@gmail.com"
                className="text-primary hover:underline"
              >
                vipprowacademy@gmail.com
              </a>
            </motion.p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
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
