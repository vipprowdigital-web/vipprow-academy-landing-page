"use client";

// Studio-style three-point setup, tuned to favor glass/emissive readability
// over raw brightness. Pulled out of Scene.tsx so lighting can be iterated
// independently of animation logic.
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />

      {/* Key light — primary form definition + shadow caster */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Rim/fill — cool blue, brand-aligned, lifts the shadow side */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.3}
        color="#2F6FED"
      />

      {/* Accent — warm coral kicker near the core to flatter an emissive center */}
      <pointLight
        position={[0, 0, 2]}
        intensity={0.4}
        color="#FF6B4A"
        distance={4}
      />
    </>
  );
}
