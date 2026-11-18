"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const pad = (n: number) => String(n).padStart(2, "0");

/** Seat fill shown on the page. The backend does not send capacity, so this is a fixed marketing figure. */
const SEATS_FILLED_PERCENT = 78;

export function Countdown({
  startsAt,
  seatsLeft,
}: {
  startsAt: string;
  seatsLeft: number;
}) {
  const reduce = useReducedMotion();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [startsAt]);

  const diff = now === null ? null : new Date(startsAt).getTime() - now;
  const over = diff !== null && diff <= 0;
  const s = diff === null || over ? 0 : Math.floor(diff / 1000);
  const units = [
    { label: "Days", v: Math.floor(s / 86400) },
    { label: "Hours", v: Math.floor((s % 86400) / 3600) },
    { label: "Minutes", v: Math.floor((s % 3600) / 60) },
    { label: "Seconds", v: s % 60 },
  ];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="font-heading text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
          {over
            ? "The seminar has started"
            : "Register before the seats fill up"}
        </h2>
        <div
          role="timer"
          aria-label="Time left until the seminar starts"
          className="mt-8 grid grid-cols-4 gap-2 sm:gap-3"
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-2xl bg-white/[0.07] px-2 py-4 text-center sm:py-5"
            >
              <p className="font-heading text-[clamp(1.75rem,6vw,3rem)] leading-none font-semibold tabular-nums">
                {diff === null ? "--" : pad(u.v)}
              </p>
              <p className="mt-2 text-xs text-white/70">{u.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-heading text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
            {SEATS_FILLED_PERCENT}%
          </p>
          <p className="text-sm text-white/75">
            seats full ·{" "}
            <span className="font-semibold text-white">
              {seatsLeft} {seatsLeft === 1 ? "seat" : "seats"} left
            </span>
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={SEATS_FILLED_PERCENT}
          aria-label="Seats filled"
          className="mt-4 h-3 overflow-hidden rounded-full bg-white/[0.12]"
        >
          <motion.div
            className="h-full origin-left rounded-full bg-[#ffd60a]"
            style={{ width: `${SEATS_FILLED_PERCENT}%` }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-4 text-sm text-white/70">
          Every seminar fills up. Register now to hold your seat.
        </p>
      </div>
    </div>
  );
}
