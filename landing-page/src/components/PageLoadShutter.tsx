// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// // Resets only on a hard refresh — survives client-side navigation.
// let hasPlayed = false;

// export default function PageLoadShutter() {
//   const [visible, setVisible] = useState(!hasPlayed);

//   useEffect(() => {
//     if (!visible) return;

//     hasPlayed = true;

//     // Respect reduced-motion: skip immediately (deferred to avoid sync setState in effect)
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//       const id = setTimeout(() => setVisible(false), 0);
//       return () => clearTimeout(id);
//     }

//     const timer = setTimeout(() => setVisible(false), 5000);
//     return () => clearTimeout(timer);
//   }, [visible]);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           key="splash"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           aria-hidden="true"
//           className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
//           style={{
//             background: "var(--gradient-scene)",
//           }}
//         >
//           {/* Subtle star-dust noise layer */}
//           <div
//             className="absolute inset-0 opacity-[0.18]"
//             style={{
//               backgroundImage:
//                 "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//               backgroundSize: "180px 180px",
//             }}
//           />

//           {/* Soft radial glow behind the robot */}
//           <div
//             className="absolute rounded-full pointer-events-none"
//             style={{
//               width: 420,
//               height: 420,
//               background:
//                 "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
//               filter: "blur(32px)",
//             }}
//           />

//           {/* Robot gif */}
//           {/* <motion.div
//             initial={{ scale: 0.82, opacity: 0, y: 18 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
//             className="relative z-10 w-44 h-44 sm:w-56 sm:h-56"
//           >
//             <video
//               src="/images/cute-robot-video.mp4"
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-full object-contain drop-shadow-[0_0_32px_rgba(99,102,241,0.5)]"
//             />
//           </motion.div> */}
//           <motion.div
//             initial={{ scale: 0.82, opacity: 0, y: 18 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
//             className="relative z-10 w-44 h-44 sm:w-56 sm:h-56"
//           >
//             <Image
//               src="/images/cute-robot-without-bg.png"
//               alt="Vipprow Academy loading"
//               fill
//               unoptimized
//               className="object-contain drop-shadow-[0_0_32px_rgba(99,102,241,0.5)]"
//               priority
//             />
//           </motion.div>

//           {/* Brand + tagline */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
//             className="relative z-10 mt-8 flex flex-col items-center gap-2"
//           >
//             <p className="font-heading font-bold text-xl tracking-tight text-white">
//               <Image
//                 src="/logos/vipprow_logo.svg"
//                 alt=""
//                 width={150}
//                 height={20}
//               />
//             </p>
//             <p className="text-white/40 text-xs tracking-[0.18em] uppercase">
//               Where Futures Are Built
//             </p>
//           </motion.div>

//           {/* Progress bar */}
//           <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-indigo-400/70 rounded-full"
//               initial={{ width: "0%" }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 5, ease: "linear" }}
//             />
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

let hasPlayed = false;

export default function PageLoadShutter() {
  const [visible, setVisible] = useState(!hasPlayed);

  useEffect(() => {
    // CRITICAL: If it has already played, instantly let the Hero know to animate
    if (!visible) {
      if (typeof window !== "undefined") {
        (window as any).__shutterComplete = true;
      }
      window.dispatchEvent(new Event("shutter-complete"));
      return;
    }

    hasPlayed = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(id);
    }

    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          // FIRES WHEN FADE OUT ENDS
          onAnimationComplete={() => {
            if (typeof window !== "undefined") {
              (window as any).__shutterComplete = true;
            }
            window.dispatchEvent(new Event("shutter-complete"));
          }}
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "var(--gradient-scene)",
          }}
        >
          {/* Subtle star-dust noise layer */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
            }}
          />

          {/* Soft radial glow behind the robot */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />

          {/* Robot Image */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative z-10 w-44 h-44 sm:w-56 sm:h-56"
          >
            <Image
              src="/images/cute-robot-without-bg.png"
              alt="Vipprow Academy loading"
              fill
              unoptimized
              className="object-contain drop-shadow-[0_0_32px_rgba(99,102,241,0.5)]"
              priority
            />
          </motion.div>

          {/* Brand + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="relative z-10 mt-8 flex flex-col items-center gap-2"
          >
            <div className="font-heading font-bold text-xl tracking-tight text-white">
              <Image
                src="/logos/vipprow_logo.svg"
                alt=""
                width={150}
                height={20}
              />
            </div>
            <p className="text-white/40 text-xs tracking-[0.18em] uppercase">
              Where Futures Are Built
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-400/70 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
