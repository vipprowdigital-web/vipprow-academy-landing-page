"use client";

import { useEffect, useRef } from "react";
import { backgroundEls } from "@/lib/backgroundState";

// Sits at z-0, behind the Canvas (z-1) and behind the scrolling HTML (z-10+
// via `relative` in page.tsx). Four blurred radial-gradient blobs whose
// opacity is driven directly by scrollEngine's onUpdate via backgroundEls —
// no React state, no re-renders, just DOM refs being written to.
export default function Background() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backgroundEls.hero = heroRef.current;
    backgroundEls.about = aboutRef.current;
    backgroundEls.courses = coursesRef.current;
    backgroundEls.results = resultsRef.current;
    return () => {
      backgroundEls.hero = null;
      backgroundEls.about = null;
      backgroundEls.courses = null;
      backgroundEls.results = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0A0E14]">
      <div
        ref={heroRef}
        className="absolute -top-1/4 left-1/4 h-[60vw] w-[60vw] rounded-full blur-[120px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(190,230,255,0.18), transparent 70%)",
        }}
      />
      <div
        ref={aboutRef}
        className="absolute top-1/3 -left-1/4 h-[55vw] w-[55vw] rounded-full blur-[120px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,220,180,0.14), transparent 70%)",
          opacity: 0,
        }}
      />
      <div
        ref={coursesRef}
        className="absolute top-1/2 right-0 h-[55vw] w-[55vw] rounded-full blur-[120px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(139,107,255,0.16), transparent 70%)",
          opacity: 0,
        }}
      />
      <div
        ref={resultsRef}
        className="absolute bottom-0 left-1/3 h-[55vw] w-[55vw] rounded-full blur-[120px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,233,184,0.16), transparent 70%)",
          opacity: 0,
        }}
      />
    </div>
  );
}
