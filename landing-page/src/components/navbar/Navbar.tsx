"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenisStore";
import { ButtonLink } from "@/components/ui/ButtonLink";

const COURSE_DROPDOWN = [
  { label: "Digital Marketing", href: "/courses/digital-marketing" },
  { label: "Performance Marketing", href: "/courses/performance-marketing" },
];

const NAV_LINKS = [
  { label: "Academy", href: "/" },
  { label: "About", href: "/about" },
  { label: "Brochure", href: "/download-brochure" },
];

const linkBase =
  "group relative py-2 text-[0.8125rem] font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none";

function Underline({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100",
        active ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  // Solid bar once scrolled; slides away on scroll-down, returns on scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 480 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pause smooth scroll + page scroll while the full-screen menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setCoursesOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileCoursesOpen(false);
  };

  const solid = !isHome || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid ? "bg-navy/95" : "bg-transparent",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:grid md:grid-cols-3">
          <Link
            href="/"
            aria-label="Vipprow Academy — home"
            className="justify-self-start"
            onClick={closeMenu}
          >
            <Image
              src="/logos/vipprow-academy-logo-2.png"
              alt="Vipprow Academy Logo"
              width={150}
              height={20}
              className="h-auto w-28 sm:w-40"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center justify-center gap-7 justify-self-center md:flex"
          >
            <Link
              href="/"
              className={linkBase}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Academy
              <Underline active={pathname === "/"} />
            </Link>

            {/* Courses dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setCoursesOpen(false);
              }}
            >
              <button
                type="button"
                className={cn(linkBase, "flex items-center gap-1")}
                onClick={() => setCoursesOpen((v) => !v)}
                aria-expanded={coursesOpen}
                aria-haspopup="true"
                aria-controls="courses-menu"
              >
                Courses
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300",
                    coursesOpen && "rotate-180",
                  )}
                />
                <Underline active={pathname.startsWith("/courses")} />
              </button>

              <div
                id="courses-menu"
                className={cn(
                  "absolute top-full left-1/2 w-60 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out",
                  coursesOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-1.5 opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-2xl bg-navy-2 p-1.5 ring-1 ring-white/10 shadow-2xl shadow-black/40">
                  {COURSE_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={coursesOpen ? 0 : -1}
                      className="block rounded-xl px-4 py-3 text-sm text-white/75 transition-colors duration-150 hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white focus-visible:outline-none"
                      onClick={() => setCoursesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={linkBase}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
                <Underline active={pathname === l.href} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-self-end">
            <div className="hidden items-center gap-2.5 md:flex">
              <ButtonLink href="/demo-class" variant="outline" size="sm">
                Book a Demo Class
              </ButtonLink>
              <ButtonLink href="/enroll" size="sm">
                Enroll Now
              </ButtonLink>
            </div>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-navy px-6 pt-20 pb-8 text-white transition-[opacity,visibility] duration-300 md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[
            { label: "Academy", href: "/" },
            { label: "Courses", href: "" },
            ...NAV_LINKS.slice(1),
          ].map((item, i) => {
            const style = {
              transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms",
            };
            const reveal = cn(
              "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            );
            if (item.href === "") {
              return (
                <div key="courses" style={style} className={reveal}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2.5 text-left text-lg font-medium tracking-tight"
                    onClick={() => setMobileCoursesOpen((v) => !v)}
                    aria-expanded={mobileCoursesOpen}
                    aria-controls="mobile-courses"
                  >
                    Courses
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-300",
                        mobileCoursesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    id="mobile-courses"
                    inert={!mobileCoursesOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      mobileCoursesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      {COURSE_DROPDOWN.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block py-2 pl-1 text-sm text-white/70 hover:text-white"
                          onClick={closeMenu}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                style={style}
                className={cn(
                  reveal,
                  "block py-2.5 text-lg font-medium tracking-tight",
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-2.5">
          <ButtonLink
            href="/demo-class"
            variant="outline"
            size="sm"
            onClick={closeMenu}
          >
            Book a Demo Class
          </ButtonLink>
          <ButtonLink href="/enroll" size="sm" onClick={closeMenu}>
            Enroll Now
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
