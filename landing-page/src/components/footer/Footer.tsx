"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { AppConfig } from "@/lib/appConfig";
import type { ComponentType } from "react";

const FOOTER_LINKS = {
  Programs: [
    { label: "Digital Marketing", href: "/courses/digital-marketing" },
    { label: "Performance Marketing", href: "/courses/performance-marketing" },
  ],
  Company: [
    { label: "About Academy", href: "/about" },
    { label: "Our Courses", href: "/courses" },
    { label: "Download Brochure", href: "/download-brochure" },
    { label: "Demo Class", href: "/demo-class" },
    { label: "Admission", href: "/enroll" },
  ],
  Support: [
    { label: "100% Placement Assistance", href: "/#placement" },
    { label: "Admissions", href: "/enroll" },
    { label: "FAQ", href: "/#faq" },
  ],
};

const HARDCODED_SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591783972812",
    iconSrc: "/socials/facebook-logo.svg",
    color: "from-[#1877F2] to-[#0C5DC7]",
    glow: "rgba(24,119,242,0.45)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vipprowacademy/",
    iconSrc: "/socials/instagram-logo.svg",
    color: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    glow: "rgba(238,42,123,0.45)",
  },
];

const DEFAULT_EMAIL = "vipprowacademy@gmail.com";
const DEFAULT_PHONE = "9669932121";

export function Footer({ appConfig }: { appConfig?: AppConfig | null }) {
  const email = appConfig?.email || DEFAULT_EMAIL;
  const phone = appConfig?.phoneNumber || DEFAULT_PHONE;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-linear-to-tr from-primary to-primary/50">
      <Image
        src="/logos/brand_outline.svg"
        alt=""
        width={1568}
        height={500}
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-10 h-auto"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-7 sm:py-10 md:pt-20">
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
              <Image
                src="/logos/vipprow-academy-logo-2.png"
                alt="Vipprow Academy Logo"
                width={150}
                height={20}
                style={{ width: "auto", height: "auto" }}
                // className="w-full h-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Learn industry-ready Digital Marketing, Performance Marketing and
              AI skills through practical projects, expert mentorship and
              career-focused training.
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Mail size={14} />
                {email}
              </a>
              <a
                href={`tel:+91${phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Phone size={14} />
                +91 {phone}
              </a>
            </div>
            {/* <div className="flex items-center gap-3">
              {HARDCODED_SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground opacity-70 hover:opacity-100 hover:border-primary/40 transition-all duration-200"
                >
                  <Image
                    src={s.iconSrc}
                    alt={s.label}
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 brightness-0 invert"
                  />
                </a>
              ))}
            </div> */}
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

          {/* Follow Us column */}
          <motion.div variants={fadeUp} className="col-span-1">
            <p className="text-xs uppercase tracking-[0.15em] font-heading font-semibold text-muted-foreground mb-4">
              Follow Us
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {HARDCODED_SOCIALS.map((s) => (
                <SocialPill
                  key={s.label}
                  href={s.href}
                  label={s.label}
                  iconSrc={s.iconSrc}
                  color={s.color}
                  glow={s.glow}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Vipprow Academy. All rights
            reserved.
          </p>
          {/* <p className="text-xs text-muted-foreground">
            Developed by <span className="text-button">Vipprow</span>
          </p> */}
        </motion.div>
      </div>
    </footer>
  );
}

function SocialPill({
  href,
  label,
  iconSrc,
  color,
  glow,
}: {
  href: string;
  label: string;
  iconSrc: string;
  color: string;
  glow: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="relative flex items-center gap-3 sm:px-2 px-1 py-1 sm:py-2 rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        boxShadow: hovered ? `0 0 28px 4px ${glow}` : "0 0 0px transparent",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Gradient background */}
      <span
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-90`}
      />
      {/* Shimmer overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="shimmer"
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "200%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <Image
        src={iconSrc}
        alt={label}
        width={20}
        height={20}
        className="relative z-10 w-6 sm:w-7 h-6 sm:h-7 brightness-0 invert"
      />

      {/* Label */}
      {/* <span className="relative z-10 text-sm font-semibold text-white tracking-wide">
        {label}
      </span> */}
    </motion.a>
  );
}
