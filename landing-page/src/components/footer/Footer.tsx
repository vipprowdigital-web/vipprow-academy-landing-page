"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Link2, AtSign, Code2, Play, Camera } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

const FOOTER_LINKS = {
  Programs: [
    { label: "Digital Marketing Mastery", href: "/courses" },
    { label: "AI & Machine Learning", href: "/courses" },
    { label: "Corporate Training", href: "/courses" },
    { label: "Free Webinars", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Academy", href: "/academy" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Placement Guarantee", href: "/#placement" },
    { label: "Admissions", href: "#" },
    { label: "EMI & Financing", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: AtSign, href: "#", label: "Twitter / X" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Play, href: "#", label: "YouTube" },
  { icon: Camera, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-linear-to-tr from-black to-primary">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block font-heading font-bold text-xl tracking-tight text-foreground mb-4"
            >
              Vipprow<span className="text-primary">.</span>
              <span className="text-muted-foreground font-medium text-sm ml-1">
                Academy
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Jabalpur&apos;s most immersive digital education platform. We
              build marketers and AI practitioners, not certificate holders.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <motion.div key={category} variants={fadeUp}>
              <p className="text-xs uppercase tracking-[0.15em] font-heading font-semibold text-muted-foreground mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vipprow Digital Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Proudly made in Jabalpur, Madhya Pradesh 🇮🇳
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
