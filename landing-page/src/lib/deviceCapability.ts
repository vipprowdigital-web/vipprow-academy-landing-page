export const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const isLowPowerDevice =
  typeof window !== "undefined" &&
  (window.innerWidth < 768 ||
    (navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4));

// One tier system, read everywhere effects need to scale — replaces
// scattered isLowPowerDevice checks with a single source of truth.
export type PerfTier = "high" | "medium" | "low";

export const perfTier: PerfTier = (() => {
  if (typeof window === "undefined") return "high";
  if (window.innerWidth < 480 || (navigator.hardwareConcurrency ?? 8) <= 2)
    return "low";
  if (isLowPowerDevice) return "medium";
  return "high";
})();
