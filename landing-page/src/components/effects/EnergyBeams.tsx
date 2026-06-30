"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scrollEngine";
import { prefersReducedMotion } from "@/lib/reducedMotion";

function triangle(progress: number, center: number, width: number): number {
  return Math.max(0, 1 - Math.abs(progress - center) / width);
}

// Four thin lines radiating from the core, only visible in a narrow band
// around the Courses section (progress ≈ 0.66). Represents "distributing
// knowledge" without literal icons or particle fireworks — just light.
const BEAM_COUNT = 4;
const BEAM_LENGTH = 1.4;

export default function EnergyBeams({
  coreRef,
}: {
  coreRef: RefObject<THREE.Group | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRefs = useRef<THREE.Material[]>([]);

  const directions = useMemo(() => {
    return Array.from({ length: BEAM_COUNT }, (_, i) => {
      const angle = (i / BEAM_COUNT) * Math.PI * 2 + Math.PI / 8;
      return new THREE.Vector3(
        Math.cos(angle),
        Math.sin(angle) * 0.6,
        Math.sin(angle * 1.3) * 0.4,
      ).normalize();
    });
  }, []);

  useFrame(() => {
    if (prefersReducedMotion || !groupRef.current || !coreRef.current) return;

    groupRef.current.position.copy(coreRef.current.position);

    const visibility =
      triangle(sceneState.progress, 0.66, 0.16) *
      (0.5 + sceneState.motionEnergy * 0.5);
    materialRefs.current.forEach((mat) => {
      if ("opacity" in mat)
        (mat as THREE.LineBasicMaterial).opacity = visibility * 0.5;
    });
    groupRef.current.visible = visibility > 0.02;
  });

  if (prefersReducedMotion) return null;

  return (
    <group ref={groupRef}>
      {directions.map((dir, i) => {
        const end = dir.clone().multiplyScalar(BEAM_LENGTH);
        return (
          <Line
            key={i}
            points={[
              [0, 0, 0],
              [end.x, end.y, end.z],
            ]}
            // color="#bcd4ff"
            color="#2F5FED"
            lineWidth={1}
            transparent
            opacity={0}
            ref={(line: { material?: THREE.Material } | null) => {
              if (line?.material) materialRefs.current[i] = line.material;
            }}
          />
        );
      })}
    </group>
  );
}
