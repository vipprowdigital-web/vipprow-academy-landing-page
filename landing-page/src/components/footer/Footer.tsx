import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { AppConfig } from "@/lib/appConfig";
import { Lines } from "@/components/motion/Lines";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FooterMotion } from "./FooterMotion";

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
    {
      label: "Student Login",
      href: "https://software.vipprow.com/student-login",
      external: true,
    },
    { label: "FAQ", href: "/#faq" },
  ],
};

const HARDCODED_SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591783972812",
    iconSrc: "/socials/facebook-logo.svg",
    hover: "hover:bg-[#1877F2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vipprowacademy/",
    iconSrc: "/socials/instagram-logo.svg",
    hover: "hover:bg-[#ee2a7b]",
  },
];

const DEFAULT_EMAIL = "vipprowacademy@gmail.com";
const DEFAULT_PHONE = "9669932121";

const linkClass =
  "text-[0.95rem] text-white/65 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none";

export function Footer({ appConfig }: { appConfig?: AppConfig | null }) {
  const email = appConfig?.email || DEFAULT_EMAIL;
  const phone = appConfig?.phoneNumber || DEFAULT_PHONE;

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <FooterMotion className="relative z-10">
        {/* Closing call to action */}
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32">
          <div>
            <Lines
              lines={["Ready to build your", "career in digital marketing?"]}
              className="font-heading text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
            />
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/demo-class" size="lg" arrow>
                Book a Demo Class
              </ButtonLink>
              <ButtonLink href="/enroll" variant="outline" size="lg">
                Enroll Now
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div data-reveal className="col-span-2 md:col-span-1">
              <Link href="/" className="mb-5 inline-block">
                <Image
                  src="/logos/vipprow-academy-logo-2.png"
                  alt="Vipprow Academy Logo"
                  width={150}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <p className="mb-6 max-w-xs text-[0.95rem] leading-relaxed text-white/65">
                Learn industry-ready Digital Marketing, Performance Marketing
                and AI skills through practical projects, expert mentorship and
                career-focused training.
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={`mailto:${email}`} className={`${linkClass} flex items-center gap-2`}>
                  <Mail size={15} aria-hidden="true" />
                  {email}
                </a>
                <a href={`tel:+91${phone}`} className={`${linkClass} flex items-center gap-2`}>
                  <Phone size={15} aria-hidden="true" />
                  +91 {phone}
                </a>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} data-reveal>
                <p className="mb-5 text-sm font-semibold text-white">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div data-reveal>
              <p className="mb-5 text-sm font-semibold text-white">Follow Us</p>
              <div className="flex items-center gap-3">
                {HARDCODED_SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex size-11 items-center justify-center rounded-full bg-white/10 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${s.hover}`}
                  >
                    <Image
                      src={s.iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 brightness-0 invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Name returns at full width — rises into place on scroll */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden px-6"
        >
          <Image
            data-wordmark
            src="/logos/brand_outline.svg"
            alt=""
            width={1568}
            height={500}
            className="mx-auto h-auto w-full max-w-5xl opacity-10"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-6 pb-8">
          <p className="text-center text-xs text-white/55">
            &copy; {new Date().getFullYear()} Vipprow Academy. All rights
            reserved.
          </p>
        </div>
      </FooterMotion>
    </footer>
  );
}
