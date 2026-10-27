"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SetupArgs = {
  /** Registers animations per media query; auto-reverted on unmount. */
  mm: gsap.MatchMedia;
  root: HTMLElement;
};

/**
 * Runs `setup` with a gsap.matchMedia scoped to the returned ref, so every
 * tween / ScrollTrigger created inside is reverted on unmount and selector
 * strings are limited to the section. Use `mm.add()` for responsive and
 * reduced-motion branches.
 */
export function useGsapScope<T extends HTMLElement>(
  setup: (args: SetupArgs) => void,
) {
  const scope = useRef<T>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    setup({ mm, root });

    // Layout (fonts, images) may settle after the first pass.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
    // Setup closures only capture stable module imports; run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scope;
}
