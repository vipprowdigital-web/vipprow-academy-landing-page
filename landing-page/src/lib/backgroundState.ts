// DOM refs registered by Background.tsx on mount, written to directly by
// scrollEngine's onUpdate — same ref-not-state pattern as orbTransform.
// Avoids re-rendering Background on every scroll tick.
type BlobRefs = {
  hero: HTMLDivElement | null;
  about: HTMLDivElement | null;
  courses: HTMLDivElement | null;
  results: HTMLDivElement | null;
};

export const backgroundEls: BlobRefs = {
  hero: null,
  about: null,
  courses: null,
  results: null,
};

// Each blob peaks near its section's progress band and fades elsewhere —
// a triangular falloff, which is what gives the "smooth, no sudden change"
// crossfade the brief asks for.
function triangle(progress: number, center: number, width: number): number {
  return Math.max(0, 1 - Math.abs(progress - center) / width);
}

export function applyBackgroundProgress(progress: number) {
  if (backgroundEls.hero)
    backgroundEls.hero.style.opacity = String(triangle(progress, 0, 0.28));
  if (backgroundEls.about)
    backgroundEls.about.style.opacity = String(triangle(progress, 0.33, 0.28));
  if (backgroundEls.courses)
    backgroundEls.courses.style.opacity = String(
      triangle(progress, 0.66, 0.28),
    );
  if (backgroundEls.results)
    backgroundEls.results.style.opacity = String(triangle(progress, 1, 0.28));
}
