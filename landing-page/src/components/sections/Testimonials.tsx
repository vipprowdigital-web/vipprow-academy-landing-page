"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger } from "@/lib/animations";
import { Marquee3D } from "../ui/marquee-3d";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-light-alt py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Badge variant="subtle">Student Reviews</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Hear it from those
            <br />
            who made the leap.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Real stories. Real packages. Real career transformations.
          </motion.p>
        </motion.div>

        <Marquee3D />
      </div>
    </section>
  );
}
