// Single source of truth, read by Scene, CameraRig, Particles, PostProcessing,
// and the section-reveal logic in scrollEngine.ts. Computed once on the
// client — guarded for SSR where `window` doesn't exist yet.
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
