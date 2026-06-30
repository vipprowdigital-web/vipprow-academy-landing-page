"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleColorStops } from "@/lib/colorStops";
import { sceneState } from "@/lib/scrollEngine";

export default function LightingController() {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const { color, intensity } = sampleColorStops(sceneState.progress);

    if (keyLight.current) {
      // Smoothed, not snapped — lerp the *current* light color toward the
      // target each frame so section crossings never read as a hard cut.
      keyLight.current.color.lerp(color, 0.04);
      keyLight.current.intensity = THREE.MathUtils.lerp(
        keyLight.current.intensity,
        intensity,
        0.04,
      );
    }
    if (ambient.current) {
      ambient.current.color.lerp(color, 0.04);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.5} />

      <directionalLight
        ref={keyLight}
        position={[5, 6, 4]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.3}
        color="#2F6FED"
      />
      <pointLight
        position={[0, 0, 2]}
        intensity={0.4}
        color="#FF6B4A"
        distance={4}
      />
    </>
  );
}
