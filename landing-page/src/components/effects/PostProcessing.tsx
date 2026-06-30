"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  ToneMapping,
} from "@react-three/postprocessing";
import {
  BlendFunction,
  ToneMappingMode,
  type BloomEffect,
} from "postprocessing";
import { perfTier } from "@/lib/deviceCapability";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { sceneState } from "@/lib/scrollEngine";
import * as THREE from "three";

function DynamicBloom() {
  const ref = useRef<BloomEffect>(null);
  const baseIntensity =
    perfTier === "low" ? 0.3 : perfTier === "medium" ? 0.4 : 0.55;

  useFrame(() => {
    if (!ref.current) return;
    const target = baseIntensity + sceneState.glowEnergy * 0.35;
    ref.current.intensity = THREE.MathUtils.lerp(
      ref.current.intensity,
      target,
      0.04,
    );
  });

  return (
    // <Bloom
    //   ref={ref}
    //   intensity={baseIntensity}
    //   luminanceThreshold={0.65}
    //   luminanceSmoothing={0.9}
    //   mipmapBlur
    //   radius={0.6}
    // />
    <Bloom
      ref={ref}
      intensity={baseIntensity}
      luminanceThreshold={0.7}
      luminanceSmoothing={0.9}
      mipmapBlur
      radius={0.55}
    />
  );
}

export default function PostProcessing() {
  const enableChromaticAberration =
    !prefersReducedMotion && perfTier === "high";

  if (perfTier === "low") {
    // Lowest tier: skip the composer entirely rather than running a thin
    // version of it — cheapest possible path, per "reduce post-processing"
    // for mobile rather than just turning down numbers.
    return null;
  }

  return (
    <EffectComposer multisampling={perfTier === "medium" ? 0 : 4}>
      <DynamicBloom />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.55}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.SOFT_LIGHT}
        opacity={perfTier === "high" ? 0.025 : 0}
      />
      <ChromaticAberration
        offset={enableChromaticAberration ? [0.0006, 0.0006] : [0, 0]}
        radialModulation={false}
        modulationOffset={0}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
