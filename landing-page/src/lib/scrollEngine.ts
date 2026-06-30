"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { applyBackgroundProgress } from "./backgroundState";
import { prefersReducedMotion } from "./reducedMotion";
import { isTouchDevice } from "./deviceCapability";

gsap.registerPlugin(ScrollTrigger);

// export const robotTransform = {
//   x: 1.6,
//   y: 0.9,
//   z: 0.4,
//   rotX: 0,
//   rotY: 0,
//   rotZ: 0,
//   scale: 1,
// };
export const robotTransform = {
  x: 0,
  y: 0,
  z: 0,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  scale: 1,
};

// Two separate signals instead of one "energy" value:
// - motionEnergy: how much the core moves/rotates/idles. Rises through
//   About/Courses, settles back down at Results ("movement slows down").
// - glowEnergy: bloom/emissive strength. Rises monotonically and peaks at
//   Results ("glow becomes slightly brighter"). These move in OPPOSITE
//   directions at the end of the page on purpose — calm + bright, not
//   calm + dim.
export const sceneState = {
  progress: 0,
  motionEnergy: 0.35,
  glowEnergy: 0.4,
};

let cleanupFn: (() => void) | null = null;

function initSectionReveals(): () => void {
  if (prefersReducedMotion) return () => {};

  const sections = gsap.utils.toArray<HTMLElement>("section[id]");
  const triggers: ScrollTrigger[] = [];

  sections.forEach((section) => {
    // DOM order = reveal order, so heading -> paragraph -> cards sequences
    // naturally as long as markup is authored in that order (it is, in
    // page.tsx). Stagger spaces them out within the same scrub window.
    const items = section.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 24 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.6,
      },
    });

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return () => triggers.forEach((t) => t.kill());
}

export function initScrollEngine(): () => void {
  if (cleanupFn) return cleanupFn;

  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => 1 - Math.pow(1 - t, 3), // cubic-out: weighted start, no abrupt stop
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: isTouchDevice ? 1.6 : 1,
    // NOTE: Lenis renamed touch-smoothing options across major versions
    // (smoothTouch in v1.x, syncTouch in newer releases). Check your
    // installed version's types — native touch scroll feel (per the brief's
    // "natural touch interactions") generally means disabling smoothing
    // on touch, not applying the same easing curve as desktop wheel scroll.
  });

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        sceneState.progress = p;
        sceneState.motionEnergy = 0.25 + Math.sin(p * Math.PI) * 0.65; // calm -> active -> calm
        sceneState.glowEnergy = 0.4 + p * 0.6; // calm -> ... -> brightest at Results
        applyBackgroundProgress(p);
      },
    },
    defaults: { ease: "power2.inOut" },
  });

  //   tl.addLabel("about")
  //     .to(
  //       orbTransform,
  //       {
  //         x: -1.7,
  //         y: 1.15,
  //         z: -0.3,
  //         rotX: 0.12,
  //         rotY: 1.1,
  //         rotZ: -0.05,
  //         scale: 0.94,
  //         duration: 1,
  //       },
  //       "about",
  //     )
  //     .addLabel("courses")
  //     .to(
  //       orbTransform,
  //       {
  //         x: 1.9,
  //         y: -0.55,
  //         z: 0.8,
  //         rotX: -0.18,
  //         rotY: 2.5,
  //         rotZ: 0.07,
  //         scale: 1.08,
  //         duration: 1,
  //       },
  //       "courses",
  //     )
  //     .addLabel("results")
  //     .to(
  //       orbTransform,
  //       {
  //         x: -0.6,
  //         y: -1.3,
  //         z: 0,
  //         rotX: 0.05,
  //         rotY: 3.4,
  //         rotZ: -0.03,
  //         scale: 1.15,
  //         duration: 1,
  //       },
  //       "results",
  //     );
  tl.addLabel("#about")
    // Hero (center, 0,0,0) -> About: travels LEFT, slight pull back, gentle tilt
    .to(
      robotTransform,
      {
        x: -1.9,
        y: 0.15,
        z: -0.4,
        rotX: 0.04,
        rotY: -0.5,
        rotZ: -0.03,
        scale: 0.96,
        duration: 1,
      },
      "about",
    )

    .addLabel("courses")
    // About -> Courses: diagonal travel, UPPER-RIGHT, comes forward — this is
    // the move that actually uses all of X + Y + Z + diagonal motion the
    // brief calls out, not a straight horizontal swap
    .to(
      robotTransform,
      {
        x: 2.1,
        y: 1.3,
        z: 0.5,
        rotX: -0.06,
        rotY: 0.65,
        rotZ: 0.04,
        scale: 1.04,
        duration: 1,
      },
      "courses",
    )

    .addLabel("placement")
    // Courses -> Placement Assistance: gentle pull back toward left-center,
    // not a full return — keeps composition clean without "constant travel"
    .to(
      robotTransform,
      {
        x: -0.5,
        y: 0.6,
        z: 0.1,
        rotX: 0.0,
        rotY: -0.2,
        rotZ: 0.0,
        scale: 1.0,
        duration: 0.8,
      },
      "placement",
    )

    .addLabel("results")
    // Placement -> Results: settles low-center, calm final pose — movement
    // slows (longer duration, smaller delta) and glow brightens via glowEnergy
    .to(
      robotTransform,
      {
        x: 0.2,
        y: -0.9,
        z: -0.1,
        rotX: 0.02,
        rotY: 0.05,
        rotZ: 0.0,
        scale: 1.02,
        duration: 1.3,
      },
      "results",
    );

  const killReveals = initSectionReveals();

  cleanupFn = () => {
    killReveals();
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.ticker.remove(raf);
    lenis.destroy();
    cleanupFn = null;
  };

  return cleanupFn;
}
