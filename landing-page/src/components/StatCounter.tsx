"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export default function StatCounter({
  value,
  suffix = "",
  label,
}: StatCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <div data-reveal className="text-center">
      <span
        ref={numberRef}
        className="font-display text-5xl md:text-6xl font-medium text-[#F5F7FA]"
      >
        0{suffix}
      </span>
      <p className="mt-2 text-sm text-[#8893A7]">{label}</p>
    </div>
  );
}
