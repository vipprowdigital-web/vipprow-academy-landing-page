import type Lenis from "lenis";

// Lets UI outside the scroll provider (e.g. the mobile menu) pause smooth
// scrolling without needing a React context or re-render.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
