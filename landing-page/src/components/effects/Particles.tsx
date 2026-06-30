"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/lib/scrollEngine";
import { isLowPowerDevice } from "@/lib/deviceCapability";
import { prefersReducedMotion } from "@/lib/reducedMotion";

const COUNT = isLowPowerDevice ? 60 : 160;

// Computed once at module load — never during render, so Math.random() is safe.
const positions = new Float32Array(COUNT * 3);
const seeds = new Float32Array(COUNT * 4); // phaseX, phaseY, phaseZ, speed
for (let i = 0; i < COUNT; i++) {
  const radius = 2.2 + Math.random() * 1.6;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
  positions[i * 3 + 2] = radius * Math.cos(phi);
  seeds[i * 4] = Math.random() * Math.PI * 2;
  seeds[i * 4 + 1] = Math.random() * Math.PI * 2;
  seeds[i * 4 + 2] = Math.random() * Math.PI * 2;
  seeds[i * 4 + 3] = 0.15 + Math.random() * 0.25;
}
const basePositions = positions.slice();

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const clock = useRef(0);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    clock.current += delta;

    const geom = pointsRef.current?.geometry;
    const attr = geom?.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;

    const energyBoost = 0.6 + sceneState.motionEnergy * 0.8;

    for (let i = 0; i < COUNT; i++) {
      const [px, py, pz] = basePositions.slice(i * 3, i * 3 + 3);
      const [phX, phY, phZ, speed] = seeds.slice(i * 4, i * 4 + 4);
      const t = clock.current * speed * energyBoost;

      attr.setXYZ(
        i,
        px + Math.sin(t + phX) * 0.12,
        py + Math.cos(t * 0.8 + phY) * 0.12,
        pz + Math.sin(t * 0.6 + phZ) * 0.1,
      );
    }
    attr.needsUpdate = true;

    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.35 + Math.sin(clock.current * 0.5) * 0.1;
    }
  });

  if (prefersReducedMotion) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#bcd4ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
