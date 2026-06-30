"use client";

import { Environment, ContactShadows } from "@react-three/drei";

// HDRI + ground shadow, isolated so reflections/environment can be swapped
// without touching lighting or animation files.
export default function EnvironmentSetup() {
  return (
    <>
      <Environment preset="studio" environmentIntensity={0.7} />
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </>
  );
}
