// "use client";

// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Environment, ContactShadows } from "@react-three/drei";
// import * as THREE from "three";
// import { orbTransform } from "@/lib/scrollEngine";

// export default function Scene() {
//   const orbRef = useRef<THREE.Mesh>(null);
//   const clock = useRef(0);
//   useFrame(({ camera }, delta) => {
//     clock.current += delta;
//     const mesh = orbRef.current;
//     if (!mesh) return;

//     // Idle motion — always running, layered on top of the scroll target
//     const idleFloat = Math.sin(clock.current * 0.6) * 0.06;
//     const idleTilt = Math.sin(clock.current * 0.4) * 0.03;
//     const breathing = 1 + Math.sin(clock.current * 0.8) * 0.025;

//     const lerpSpeed = 0.07; // smooths scrub steps into motion, kills jitter

//     mesh.position.x = THREE.MathUtils.lerp(
//       mesh.position.x,
//       orbTransform.x,
//       lerpSpeed,
//     );
//     mesh.position.y = THREE.MathUtils.lerp(
//       mesh.position.y,
//       orbTransform.y + idleFloat,
//       lerpSpeed,
//     );
//     mesh.position.z = THREE.MathUtils.lerp(
//       mesh.position.z,
//       orbTransform.z,
//       lerpSpeed,
//     );

//     mesh.rotation.x = THREE.MathUtils.lerp(
//       mesh.rotation.x,
//       orbTransform.rotX,
//       lerpSpeed,
//     );
//     mesh.rotation.y =
//       THREE.MathUtils.lerp(mesh.rotation.y, orbTransform.rotY, lerpSpeed) +
//       delta * 0.05;
//     mesh.rotation.z = THREE.MathUtils.lerp(
//       mesh.rotation.z,
//       orbTransform.rotZ + idleTilt,
//       lerpSpeed,
//     );

//     const targetScale = orbTransform.scale * breathing;
//     mesh.scale.setScalar(
//       THREE.MathUtils.lerp(mesh.scale.x, targetScale, lerpSpeed),
//     );

//     // Camera — faint, premium drift only, never a cut or zoom
//     camera.position.x = THREE.MathUtils.lerp(
//       camera.position.x,
//       orbTransform.x * 0.1,
//       0.04,
//     );
//     camera.position.y = THREE.MathUtils.lerp(
//       camera.position.y,
//       orbTransform.y * 0.07,
//       0.04,
//     );
//     camera.lookAt(0, 0, 0);
//   });

//   return (
//     <group>
//       <ambientLight intensity={0.45} />
//       <directionalLight
//         position={[5, 6, 4]}
//         intensity={1.3}
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//       />
//       <directionalLight
//         position={[-5, 2, -4]}
//         intensity={0.25}
//         color="#2F6FED"
//       />

//       <Environment preset="studio" environmentIntensity={0.6} />

//       <mesh ref={orbRef} castShadow>
//         <sphereGeometry args={[1, 128, 128]} />
//         <meshPhysicalMaterial
//           color="#dbe9ff"
//           transmission={1}
//           thickness={1.4}
//           roughness={0.05}
//           ior={1.45}
//           clearcoat={1}
//           clearcoatRoughness={0.1}
//           envMapIntensity={1.2}
//           attenuationColor="#2F6FED"
//           attenuationDistance={0.6}
//         />
//       </mesh>

//       <ContactShadows
//         position={[0, -2.2, 0]}
//         opacity={0.35}
//         scale={10}
//         blur={2.5}
//         far={3}
//         color="#000000"
//       />
//     </group>
//   );
// }

"use client";

import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { robotTransform, sceneState } from "@/lib/scrollEngine";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import Model, { type FaceRefs } from "./Model";
import EnvironmentSetup from "./EnvironmentSetup";
import LightingController from "./effects/LightingController";
import CameraRig from "./effects/CameraRig";
import Particles from "./effects/Particles";
import PostProcessing from "./effects/PostProcessing";

const MODEL_PATH = "/models/vipprow-mascot-v2-waving.glb";
const INITIAL_BLINK_DELAY = 2 + Math.random() * 3;

export default function Scene() {
  const robotRef = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const blinkTimer = useRef(0);
  const nextBlinkAt = useRef(INITIAL_BLINK_DELAY);
  const faceRefs = useRef<FaceRefs>({
    head: null,
    eyeLeft: null,
    eyeRight: null,
    armRight: null,
  });

  // Plays the baked Wave clip once, on load — the "welcome wave" the brief
  // wants in Hero. Idle blink/tilt below runs continuously regardless.
  const { animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, robotRef);
  useEffect(() => {
    const wave = actions["Wave"];
    if (!wave || prefersReducedMotion) return;
    Object.assign(wave.reset().setLoop(THREE.LoopOnce, 1), {
      clampWhenFinished: true,
    }).play();
  }, [actions]);

  useFrame((_, delta) => {
    clock.current += delta;
    const robot = robotRef.current;
    if (!robot) return;
    //

    // if (Math.random() < 0.01) {
    //   console.log({
    //     transformX: robotTransform.x,
    //     actualX: robot.position.x,
    //   });
    // }
    //

    const motionScale = prefersReducedMotion
      ? 0
      : 0.5 + sceneState.motionEnergy * 0.8;
    const idleFloat = Math.sin(clock.current * 0.6) * 0.05 * motionScale;
    const breathing = 1 + Math.sin(clock.current * 0.8) * 0.02 * motionScale;
    const lerpSpeed = 0.07;

    robot.position.x = THREE.MathUtils.lerp(
      robot.position.x,
      robotTransform.x,
      lerpSpeed,
    );
    robot.position.y = THREE.MathUtils.lerp(
      robot.position.y,
      robotTransform.y + idleFloat,
      lerpSpeed,
    );
    robot.position.z = THREE.MathUtils.lerp(
      robot.position.z,
      robotTransform.z,
      lerpSpeed,
    );
    robot.rotation.x = THREE.MathUtils.lerp(
      robot.rotation.x,
      robotTransform.rotX,
      lerpSpeed,
    );
    // robot.rotation.y = THREE.MathUtils.lerp(
    //   robot.rotation.y,
    //   robotTransform.rotY,
    //   lerpSpeed,
    // );
    robot.rotation.y = 0;
    robot.rotation.z = THREE.MathUtils.lerp(
      robot.rotation.z,
      robotTransform.rotZ,
      lerpSpeed,
    );
    robot.scale.setScalar(
      THREE.MathUtils.lerp(
        robot.scale.x,
        robotTransform.scale * breathing,
        lerpSpeed,
      ),
    );

    // Head: gentle continuous "curiosity" sway, independent of body rotation
    if (faceRefs.current.head && !prefersReducedMotion) {
      const sway = Math.sin(clock.current * 0.35) * 0.06;
      faceRefs.current.head.rotation.z = THREE.MathUtils.lerp(
        faceRefs.current.head.rotation.z,
        sway,
        0.05,
      );
      // Looks slightly toward whichever side content is on, by section
      const lookTarget =
        sceneState.progress < 0.2
          ? 0
          : sceneState.progress < 0.5
            ? 0.15
            : -0.12;
      faceRefs.current.head.rotation.y = THREE.MathUtils.lerp(
        faceRefs.current.head.rotation.y,
        lookTarget,
        0.03,
      );
    }

    // Blink: scale eye pupils toward ~0 on Y for a few frames, on a random
    // 2-5s interval — cheap, no morph targets needed since the mascot's
    // eyes are separate geometry, not a blend-shaped mesh.
    if (!prefersReducedMotion) {
      blinkTimer.current += delta;
      const inBlink = blinkTimer.current - nextBlinkAt.current;
      if (inBlink >= 0 && inBlink < 0.12) {
        const t = inBlink / 0.12;
        const closeAmount = 1 - Math.sin(t * Math.PI); // closes then opens within the window
        [faceRefs.current.eyeLeft, faceRefs.current.eyeRight].forEach((eye) => {
          if (eye) eye.scale.y = Math.max(0.08, closeAmount);
        });
      } else if (inBlink >= 0.12) {
        [faceRefs.current.eyeLeft, faceRefs.current.eyeRight].forEach((eye) => {
          if (eye) eye.scale.y = 1;
        });
        blinkTimer.current = 0;
        nextBlinkAt.current = 2 + Math.random() * 3;
      }
    }
  });

  return (
    <group>
      <LightingController />
      <EnvironmentSetup />
      {/* <CameraRig /> */}
      <Particles />
      <Suspense fallback={null}>
        <Model ref={robotRef} faceRefs={faceRefs} />
      </Suspense>
      {/* <mesh ref={robotRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh> */}
      <PostProcessing />
    </group>
  );
}
