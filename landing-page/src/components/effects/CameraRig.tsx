"use client";

import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { robotTransform } from "@/lib/scrollEngine";
import { prefersReducedMotion } from "@/lib/reducedMotion";

// Module-level, not React state — the Canvas has pointer-events: none
// (see CanvasWrapper), so R3F's built-in pointer tracking never fires.
// We track mouse position on `window` instead and read it every frame.
const pointerTarget = { x: 0, y: 0 };

export default function CameraRig() {
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    const { camera } = state;

    // Scroll-driven base position — same values Scene.tsx used in Phase 2/3.
    const baseX = robotTransform.x * 0.1;
    const baseY = robotTransform.y * 0.07;

    // Mouse parallax is a small *additive* offset, capped, so it can never
    // overpower the scroll-driven base — that's how it stays out of the
    // scroll animation's way per the brief.
    const PARALLAX_STRENGTH = 0.18;
    const offsetX = pointerTarget.x * PARALLAX_STRENGTH;
    const offsetY = pointerTarget.y * PARALLAX_STRENGTH * 0.6;

    const targetX = baseX + offsetX;
    const targetY = baseY + offsetY;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
