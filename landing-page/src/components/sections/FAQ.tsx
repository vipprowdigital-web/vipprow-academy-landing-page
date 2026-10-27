"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Lines } from "@/components/motion/Lines";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealBatch, revealLines } from "@/lib/reveal";
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
  id,
  q,
  a,
  isOpen,
  onToggle,
}: {
  id: string;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div data-reveal className="group">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className="flex w-full items-center justify-between gap-6 rounded-2xl py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span
            className={cn(
              "font-heading text-xl font-semibold tracking-tight transition-[color,transform] duration-300 md:text-xl",
              isOpen
                ? "translate-x-0 text-primary"
                : "text-foreground group-hover:translate-x-1",
            )}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "rotate-135 bg-primary text-primary-foreground"
                : "bg-primary/8 text-primary group-hover:bg-primary/15",
            )}
          >
            <Plus size={18} />
          </span>
        </button>
      </h3>

      {/* Answer stays in the DOM (readable by search engines); height animates
          via grid rows, no JS measurement. */}
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pr-14 pb-7 text-lg leading-relaxed text-muted-foreground">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const ref = useGsapScope<HTMLElement>(({ mm, root }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      revealLines(root);
      revealBatch(root);
    });
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="section-light relative w-full bg-white! py-10 sm:py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          {/* Left sticky header */}
          <div className="md:sticky md:top-32 md:self-start">
            <Lines
              lines={["Questions,", "answered."]}
              className="font-heading text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
            />
            <p
              data-reveal
              className="mt-7 max-w-sm text-lg leading-relaxed text-muted-foreground"
            >
              Can&apos;t find what you&apos;re looking for? Reach us at{" "}
              <a
                href="mailto:vipprowacademy@gmail.com"
                className="font-medium text-primary underline underline-offset-4 decoration-primary/30 transition-colors hover:decoration-primary"
              >
                vipprowacademy@gmail.com
              </a>
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink href="/demo-class" variant="solid" arrow>
                Book a Demo Class
              </ButtonLink>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="divide-y divide-border/70">
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                id={`faq-${i}`}
                q={item.q}
                a={item.a}
                isOpen={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
