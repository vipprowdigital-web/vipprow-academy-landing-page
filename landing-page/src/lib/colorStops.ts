// import * as THREE from "three";

// // Four keyframe lighting moods, one per section, interpolated continuously
// // by scroll progress (not snapped) — this is what "Hero cool cyan → About
// // warm neutral → Courses blue-violet → Results gold-white" actually means.
// export type ColorStop = { progress: number; color: string; intensity: number };

// export const LIGHT_STOPS: ColorStop[] = [
//   { progress: 0.0, color: "#cdeeff", intensity: 1.3 }, // Hero — cool white/cyan
//   { progress: 0.33, color: "#fff1e0", intensity: 1.1 }, // About — warm neutral
//   { progress: 0.66, color: "#c9b6ff", intensity: 1.2 }, // Courses — blue-violet
//   { progress: 1.0, color: "#ffe9b8", intensity: 1.25 }, // Results — gold-white
// ];

// const _a = new THREE.Color();
// const _b = new THREE.Color();
// const _out = new THREE.Color();

// export function sampleColorStops(progress: number): {
//   color: THREE.Color;
//   intensity: number;
// } {
//   const p = THREE.MathUtils.clamp(progress, 0, 1);
//   for (let i = 0; i < LIGHT_STOPS.length - 1; i++) {
//     const a = LIGHT_STOPS[i];
//     const b = LIGHT_STOPS[i + 1];
//     if (p >= a.progress && p <= b.progress) {
//       const t = (p - a.progress) / (b.progress - a.progress || 1);
//       _a.set(a.color);
//       _b.set(b.color);
//       _out.lerpColors(_a, _b, t);
//       return {
//         color: _out,
//         intensity: THREE.MathUtils.lerp(a.intensity, b.intensity, t),
//       };
//     }
//   }
//   _out.set(LIGHT_STOPS[LIGHT_STOPS.length - 1].color);
//   return {
//     color: _out,
//     intensity: LIGHT_STOPS[LIGHT_STOPS.length - 1].intensity,
//   };
// }

import * as THREE from "three";

export type ColorStop = { progress: number; color: string; intensity: number };

// Four moods, all within the white -> navy -> soft-black range. No hue
// shifts (cyan/violet/gold removed) — only value and warmth shift subtly,
// keeping the lighting "premium and trustworthy" rather than thematic.
export const LIGHT_STOPS: ColorStop[] = [
  { progress: 0.0, color: "#FFFFFF", intensity: 1.25 }, // Hero — clean white key light
  { progress: 0.33, color: "#E4EAF4", intensity: 1.1 }, // About — soft cool white
  { progress: 0.66, color: "#2F5FED", intensity: 1.15 }, // Courses — electric blue accent
  { progress: 1.0, color: "#0F1B33", intensity: 1.3 }, // Results — deep navy, higher key intensity for "confident"
];

const _a = new THREE.Color();
const _b = new THREE.Color();
const _out = new THREE.Color();

export function sampleColorStops(progress: number): {
  color: THREE.Color;
  intensity: number;
} {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  for (let i = 0; i < LIGHT_STOPS.length - 1; i++) {
    const a = LIGHT_STOPS[i];
    const b = LIGHT_STOPS[i + 1];
    if (p >= a.progress && p <= b.progress) {
      const t = (p - a.progress) / (b.progress - a.progress || 1);
      _a.set(a.color);
      _b.set(b.color);
      _out.lerpColors(_a, _b, t);
      return {
        color: _out,
        intensity: THREE.MathUtils.lerp(a.intensity, b.intensity, t),
      };
    }
  }
  _out.set(LIGHT_STOPS[LIGHT_STOPS.length - 1].color);
  return {
    color: _out,
    intensity: LIGHT_STOPS[LIGHT_STOPS.length - 1].intensity,
  };
}
