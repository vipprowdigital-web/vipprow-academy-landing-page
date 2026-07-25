"use client";

import { useEffect, useState } from "react";
import styles from "./AddressBanner.module.css";

type AddressBannerProps = {
    eyebrow?: string;
    heading?: string;
    addressLines?: string[];
    phone?: string;
    mapHref?: string;
    lat?: string;
    lng?: string;
};

export default function AddressBanner({
    eyebrow = "VISIT THE ACADEMY",
    heading = "Find us on campus.",
    addressLines = ["Bethel House Near Naveen Vidhya Mandir School Napier Town", "Jabalpur, Madhya Pradesh"],
    phone = "+91 96699 32121",
    mapHref,
    lat,
    lng,
}: AddressBannerProps) {
    // Small "live telemetry" jitter on the coordinate readout — purely
    // decorative, reinforces the techy/live-signal feel of the banner.
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => (t + 1) % 1000), 1400);
        return () => clearInterval(id);
    }, []);

    return (
        <section
            aria-labelledby="address-banner-heading"
            className="relative isolate overflow-hidden border-y md:border md:max-w-6xl md:mx-6 lg:mx-auto md:mb-16 md:rounded-3xl"
            style={{
                background: "var(--gradient-scene, var(--scene-background))",
                borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
            }}
        >
            {/* Animated circuit grid backdrop */}
            <div className={`${styles.abGrid} pointer-events-none absolute inset-0 opacity-[0.18]`} />

            {/* Ambient glow */}
            <div
                className={`${styles.abPulse} pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full blur-3xl`}
                style={{ background: "var(--button)" }}
            />

            <div className="relative z-10 grid grid-cols-1 gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-6">
                {/* ---------------- Left: copy ---------------- */}
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span
                                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                style={{ background: "var(--button)" }}
                            />
                            <span
                                className="relative inline-flex h-2 w-2 rounded-full"
                                style={{ background: "var(--button)" }}
                            />
                        </span>
                        <p className="font-heading text-xs font-semibold tracking-[0.25em] text-white/70">
                            {eyebrow}
                        </p>
                    </div>

                    <h2
                        id="address-banner-heading"
                        className="font-heading text-3xl font-bold text-white sm:text-4xl"
                    >
                        {heading}
                    </h2>

                    <div className="mt-6 space-y-1 text-base text-white/80">
                        {addressLines.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>

                    <p className="mt-3 font-mono text-sm tracking-wide text-white/60">
                        {phone}
                    </p>

                    {mapHref && (
                        <a
                            href={mapHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{
                                background: "var(--button)",
                                outlineColor: "var(--button)",
                            }}
                        >
                            Get Directions
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 8h10M9 4l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    )}
                </div>

                {/* ---------------- Right: radar / pin visual ---------------- */}
                <div className="relative flex h-56 items-center justify-center sm:h-64 lg:h-72">
                    {/* concentric radar rings */}
                    <span className={`${styles.abRing} absolute h-24 w-24 rounded-full border sm:h-28 sm:w-28`} />
                    <span className={`${styles.abRing} ${styles.abRingDelay1} absolute h-40 w-40 rounded-full border sm:h-48 sm:w-48`} />
                    <span className={`${styles.abRing} ${styles.abRingDelay2} absolute h-56 w-56 rounded-full border sm:h-64 sm:w-64`} />

                    {/* rotating scan sweep */}
                    <div className={`${styles.abSweep} absolute h-56 w-56 rounded-full sm:h-64 sm:w-64`} />

                    {/* pin */}
                    <div className="relative z-10 flex flex-col items-center">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="drop-shadow-[0_0_12px_var(--button)]"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z"
                                fill="crimson"
                            />
                            <circle cx="12" cy="9" r="2.5" fill="white" />
                        </svg>
                    </div>

                    {/* coordinate readout — only shown when lat/lng are provided */}
                    {lat && lng && (
                        <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[11px] tracking-widest text-white/50">
                            <p>
                                LAT {lat} &nbsp;·&nbsp; LNG {lng}
                            </p>
                            <p className="mt-1 text-white/30">
                                SIGNAL {String(94 + (tick % 5)).padStart(2, "0")}% · LOCKED
                            </p>
                        </div>
                    )}
                </div>
            </div>


        </section>
    );
}