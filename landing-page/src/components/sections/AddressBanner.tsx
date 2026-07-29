"use client";

import LocationAnimation from "../animations/LocationAnimation";
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
}: AddressBannerProps) {
    return (
        <section
            aria-labelledby="address-banner-heading"
            className="relative isolate overflow-hidden md:max-w-6xl md:mx-6 lg:mx-auto md:mb-16"
        >
            {/* Animated circuit grid backdrop */}
            {/* <div className={`${styles.abGrid} pointer-events-none absolute inset-0 opacity-[0.18]`} /> */}

            <div className="relative z-10 grid grid-cols-1 gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-6">
                {/* ---------------- Left: copy ---------------- */}
                <div className="">
                    <h2
                        id="address-banner-heading"
                        className="font-heading text-3xl font-bold text-primary sm:text-6xl"
                    >
                        {heading}
                    </h2>

                    <div className="mt-6 space-y-1 text-base text-primary">
                        {addressLines.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>

                    <p className="mt-3 font-mono text-xl tracking-wide text-black font-bold">
                        {phone}
                    </p>

                    {mapHref && (
                        <a
                            href={mapHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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

                {/* ---------------- Right: Location Animation ---------------- */}
                <div className="flex justify-center lg:justify-end">
                    <LocationAnimation />
                </div>
            </div>
        </section>
    );
}