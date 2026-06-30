/**
 * lib/gsap.ts
 *
 * Central GSAP setup. Import `gsap` and `ScrollTrigger` from this file
 * everywhere instead of importing "gsap" directly, so the plugin is
 * registered exactly once and tree-shaking stays clean.
 *
 * Install (if not already present in package.json):
 *   npm install gsap
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Premium feel, consistent everywhere: ease out a little slower than
  // the GSAP default and never overshoot (no elastic/bounce by default).
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger };
