"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { fadeUp, stagger, slideRight } from "@/lib/animations";

const ADDRESS =
  "Bethel House, near Naveen Vidhya Mandir School, Napier Town, Jabalpur, Madhya Pradesh 482001";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.304260996585!2d79.93228857509614!3d23.15909277907833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x669f31eafcdd5fe5%3A0x9c592ca9f6be0fa8!2sVipprow%20%7C%20Digital%20Marketing%20%7C%20Peformance%20Marketing%20Academy!5e0!3m2!1sen!2sin!4v1790278971788!5m2!1sen!2sin";
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=23.15909277907833,79.93228857509614`;

const DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value: ADDRESS,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 96699 32121",
    href: "tel:+919669932121",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Saturday · 10:00 AM – 7:00 PM",
  },
];

export function AcademyLocation() {
  return (
    <section id="location" className="section-light py-10 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-heading font-semibold mb-4"
          >
            Visit the Academy
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Where you&apos;ll{" "}
            <span className="text-primary">learn & grow.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Our campus in the heart of Jabalpur is where live classes,
            mentorship sessions, and hands-on projects come together. Drop by
            for a campus tour or a free counselling session.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-stretch">
          {/* ── Map ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden border border-border shadow-xl min-h-80 lg:min-h-110"
          >
            <iframe
              title="Vipprow Academy location on Google Maps"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>

          {/* ── Details ─────────────────────────────────────────── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-xl flex flex-col"
          >
            <h3 className="font-heading font-bold text-foreground text-xl mb-6">
              Vipprow Academy
            </h3>

            <dl className="space-y-6 flex-1">
              {DETAILS.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon size={18} />
                    </span>
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground font-heading font-semibold mb-1">
                        {d.label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground leading-snug">
                        {d.href ? (
                          <a
                            href={d.href}
                            className="hover:text-primary transition-colors"
                          >
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-primary transition-transform duration-200 hover:scale-[1.03]"
            >
              <Navigation size={15} />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
