"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const ScrollSection = ({
  children,
  id,
  bgColor,
}: {
  children: React.ReactNode;
  id?: string;
  bgColor: string;
}) => {
  const ref = useRef(null);

  // margin: "-20% 0px -20% 0px" ensures it triggers right around
  // when the user scrolls substantially into the section
  const isInView = useInView(ref, {
    amount: 0.3, // Triggers when 30% of the section is visible
    once: false, // Set to false so it flashes every time you scroll back to it
  });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen w-full bg-transparent flex flex-col justify-between overflow-hidden border-t pt-1 ${bgColor}`}
    >
      {/* THE FLASHING TOP BORDER */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ease-in-out ${
          isInView
            ? "animate-border-flash opacity-100"
            : "bg-transparent opacity-0"
        }`}
      />

      {/* Your Section Content Goes Here */}
      <div className="w-full h-full flex flex-col justify-center items-center my-auto">
        {children}
      </div>
    </section>
  );
};
