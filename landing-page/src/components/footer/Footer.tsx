"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, MessageCircle, Mail, Phone } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import type { AppConfig } from "@/lib/appConfig";
import type { ComponentType } from "react";

const FOOTER_LINKS = {
  Programs: [
    { label: "Digital Marketing Mastery", href: "/courses" },
    { label: "AI & Machine Learning", href: "/courses" },
    { label: "Corporate Training", href: "/courses" },
    { label: "Free Webinars", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Academy", href: "/" },
    { label: "Careers", href: "https://vipprow.com/careers" },
    { label: "Blog", href: "https://vipprow.com/articles" },
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

type SocialIcon =
  | { type: "image"; src: string }
  | { type: "lucide"; Icon: ComponentType<{ size?: number }> };

const SOCIAL_ICONS: Record<string, SocialIcon> = {
  linkedinLink: { type: "image", src: "/socials/linkedin-logo.svg" },
  twitterLink: { type: "image", src: "/socials/twitter-logo.svg" },
  instagramLink: { type: "image", src: "/socials/instagram-logo.svg" },
  facebookLink: { type: "image", src: "/socials/facebook-logo.svg" },
  youtubeLink: { type: "lucide", Icon: Play },
  whatsAppLink: { type: "lucide", Icon: MessageCircle },
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedinLink: "LinkedIn",
  twitterLink: "Twitter / X",
  youtubeLink: "YouTube",
  instagramLink: "Instagram",
  facebookLink: "Facebook",
  whatsAppLink: "WhatsApp",
};

const DEFAULT_EMAIL = "vipprowdigital@gmail.com";
const DEFAULT_PHONE = "9669932121";

export function Footer({ appConfig }: { appConfig: AppConfig | null }) {
  const email = appConfig?.email || DEFAULT_EMAIL;
  const phone = appConfig?.phoneNumber || DEFAULT_PHONE;
  const socials = Object.entries(SOCIAL_ICONS)
    .map(([key, icon]) => ({
      icon,
      label: SOCIAL_LABELS[key],
      href: appConfig?.[key as keyof AppConfig] as string | undefined,
    }))
    .filter((s): s is { icon: SocialIcon; label: string; href: string } =>
      Boolean(s.href),
    );

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
              <Image
                src="/logos/vipprow_logo.svg"
                alt=""
                width={150}
                height={20}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Jabalpur&apos;s most immersive digital education platform. We
              build marketers and AI practitioners, not certificate holders.
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
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground opacity-70 hover:opacity-100 hover:border-primary/40 transition-all duration-200"
                >
                  {s.icon.type === "image" ? (
                    <Image
                      src={s.icon.src}
                      alt={s.label}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 brightness-0 invert"
                    />
                  ) : (
                    <s.icon.Icon size={14} />
                  )}
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
          className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vipprow Digital Marketing Academy. All
            rights reserved.
          </p>
          {/* <p className="text-xs text-muted-foreground">
            Developed by <span className="text-button">Vipprow</span>
          </p> */}
        </motion.div>
      </div>
    </footer>
  );
}
