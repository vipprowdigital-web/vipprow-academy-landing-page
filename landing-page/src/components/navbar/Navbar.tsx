"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const COURSE_DROPDOWN = [
  { label: "Digital Marketing", href: "/courses/digital-marketing" },
  { label: "Performance Marketing", href: "/courses/performance-marketing" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          !isHome
            ? "bg-background/95 backdrop-blur-xl border-b border-border/60"
            : scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
              : "bg-transparent",
        )}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          <Link
            href="/"
            className="justify-self-start font-heading font-bold text-lg tracking-tight text-foreground"
          >
            {/* Vipprow<span className="text-primary">.</span>
            <span className="text-muted-foreground font-medium text-sm ml-1">
              Academy
            </span> */}
            <Image
              src="/logos/vipprow-academy-logo-2.png"
              alt="Vipprow Academy Logo"
              width={150}
              height={20}
              className="w-40 h-auto"
              // style={{ height: "auto" }}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center justify-center justify-self-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              Academy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Courses dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                onClick={() => setCoursesOpen((v) => !v)}
                aria-expanded={coursesOpen}
              >
                Courses
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    coursesOpen ? "rotate-180" : "rotate-0",
                  )}
                />
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden"
                  >
                    {COURSE_DROPDOWN.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
                        onClick={() => setCoursesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/download-brochure"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              Brochure
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          <div className="justify-self-end flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link href="/demo-class">
                <Button variant="primary" size="sm" className="bg-gray-300/20">
                  Book a Demo Class
                </Button>
              </Link>
              <Link href="/enroll">
                <Button variant="primary" size="sm" className="bg-gray-300/20">
                  Enroll Now
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border text-foreground hover:bg-muted/40 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 0.3 }}
              >
                <Link
                  href="/"
                  className="block py-3 text-base text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Academy
                </Link>
              </motion.div>

              {/* Mobile Courses accordion */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06, duration: 0.3 }}
              >
                <button
                  className="w-full flex items-center justify-between py-3 text-base text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  onClick={() => setMobileCoursesOpen((v) => !v)}
                >
                  Courses
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      mobileCoursesOpen ? "rotate-180" : "rotate-0",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileCoursesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      {COURSE_DROPDOWN.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block pl-4 py-2.5 text-sm text-muted-foreground hover:text-foreground border-b border-border/30 transition-colors"
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileCoursesOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.3 }}
              >
                <Link
                  href="/about"
                  className="block py-3 text-base text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <Link
                  href="/download-brochure"
                  className="block py-3 text-base text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Brochure
                </Link>
              </motion.div>

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/demo-class" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full bg-primary"
                  >
                    Book a Demo Class
                  </Button>
                </Link>
                <Link href="/enroll" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full bg-primary"
                  >
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
