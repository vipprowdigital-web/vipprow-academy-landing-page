"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { HoverCard } from "../ui/HoverCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CardData {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface InsightsSectionProps {
  cards: CardData[];
  cols?: 2 | 3 | 4;
}

// How many cards are visible per screen width
function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function InsightsSection({ cards }: InsightsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCount = useVisibleCount();
  const total = cards.length;
  const maxIndex = total - visibleCount;

  // Scroll to a specific card index
  const scrollTo = useCallback(
    (idx: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(idx, maxIndex));
      const cardWidth = el.scrollWidth / total;
      el.scrollTo({ left: cardWidth * clamped, behavior: "smooth" });
      setActiveIndex(clamped);
    },
    [total, maxIndex]
  );

  // Track active index on manual scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / total;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, maxIndex));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total, maxIndex]);

  // Auto-scroll every 3.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        const el = scrollRef.current;
        if (el) {
          const cardWidth = el.scrollWidth / total;
          el.scrollTo({ left: cardWidth * next, behavior: "smooth" });
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, total]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Prev arrow */}
      <button
        onClick={() => scrollTo(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label="Previous module"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center border border-border bg-background shadow-md transition hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next arrow */}
      <button
        onClick={() => scrollTo(activeIndex + 1)}
        disabled={activeIndex >= maxIndex}
        aria-label="Next module"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center border border-border bg-background shadow-md transition hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

      {/* Card track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="snap-start shrink-0 w-[80vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            <HoverCard {...card} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to module ${idx + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === activeIndex ? 24 : 8,
              background:
                idx === activeIndex ? "var(--primary)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
