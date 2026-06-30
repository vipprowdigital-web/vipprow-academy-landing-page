// "use client";

// import { forwardRef, useEffect, useMemo, useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// const MODEL_PATH = "/models/ai-core.glb";

// // Preload as soon as this module is imported, not on first render —
// // shaves the load off the moment Scene actually mounts.
// useGLTF.preload(MODEL_PATH);

// const Model = forwardRef<THREE.Group>((_, ref) => {
//   const { scene } = useGLTF(MODEL_PATH);

//   // Clone so HMR / multiple mounts never mutate the shared cached scene
//   // that useGLTF keeps internally.
//   const cloned = useMemo(() => scene.clone(true), [scene]);
//   const normalizeRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (!normalizeRef.current) return;

//     cloned.traverse((child) => {
//       const mesh = child as THREE.Mesh;
//       if (!mesh.isMesh) return;

//       mesh.castShadow = true;
//       mesh.receiveShadow = true;

//       // Preserve whatever materials the GLB ships with (glass, emissive
//       // core, metallic shell, etc.) — only nudge envMapIntensity so the
//       // new HDRI reads correctly on glass/metal surfaces.
//       const mat = mesh.material as
//         | THREE.MeshStandardMaterial
//         | THREE.MeshPhysicalMaterial;
//       if (mat && "envMapIntensity" in mat) {
//         mat.envMapIntensity = mat.envMapIntensity ?? 1.2;
//         mat.needsUpdate = true;
//       }
//     });

//     // Center and scale from the model's real bounds — never hardcoded,
//     // since every GLB export has different units and pivot origin.
//     const box = new THREE.Box3().setFromObject(cloned);
//     const size = new THREE.Vector3();
//     const center = new THREE.Vector3();
//     box.getSize(size);
//     box.getCenter(center);

//     cloned.position.set(-center.x, -center.y, -center.z);

//     const TARGET_DIAMETER = 1.6; // desired world-space size of the core
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = maxDim > 0 ? TARGET_DIAMETER / maxDim : 1;
//     normalizeRef.current.scale.setScalar(scaleFactor);

//     return () => {
//       cloned.traverse((child) => {
//         const mesh = child as THREE.Mesh;
//         if (!mesh.isMesh) return;
//         mesh.geometry?.dispose();
//         const mat = mesh.material;
//         if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
//         else mat?.dispose();
//       });
//     };
//   }, [cloned]);

//   // Outer group (`ref`) is the animation target driven by Scene's useFrame.
//   // Inner group handles centering/scale only — the two concerns never mix,
//   // so scroll/idle animation stays clean regardless of the model's own pivot.
//   return (
//     <group ref={ref}>
//       <group ref={normalizeRef}>
//         <primitive object={cloned} />
//       </group>
//     </group>
//   );
// });

// Model.displayName = "Model";

// export default Model;

"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/robot-navy-smooth.glb";
useGLTF.preload(MODEL_PATH);

// Populated on mount by traversing the cloned scene for these exact node
// names — they exist because we generated this GLB ourselves (see the
// build_robot.py node list: head, eye_pupil_left/right, arm_right_pivot).
// If you later swap in a different GLB, these names must match its
// hierarchy or faceRefs entries stay null and animation silently no-ops
// rather than throwing — check console for the "node not found" warning.
export type FaceRefs = {
  head: THREE.Object3D | null;
  eyeLeft: THREE.Object3D | null;
  eyeRight: THREE.Object3D | null;
  armRight: THREE.Object3D | null;
};

const Model = forwardRef<
  THREE.Group,
  { faceRefs: React.MutableRefObject<FaceRefs> }
>(({ faceRefs }, ref) => {
  const { scene } = useGLTF(MODEL_PATH);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const normalizeRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!normalizeRef.current) return;

    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "envMapIntensity" in mat) {
          mat.envMapIntensity = mat.envMapIntensity ?? 1.1;
          mat.needsUpdate = true;
        }
      }

      switch (child.name) {
        case "head":
          faceRefs.current.head = child;
          break;
        case "eye_pupil_left":
          faceRefs.current.eyeLeft = child;
          break;
        case "eye_pupil_right":
          faceRefs.current.eyeRight = child;
          break;
        case "arm_right_pivot":
          faceRefs.current.armRight = child;
          break;
      }
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    cloned.position.set(-center.x, -center.y, -center.z);

    const TARGET_DIAMETER = 1.8;
    const maxDim = Math.max(size.x, size.y, size.z);
    normalizeRef.current.scale.setScalar(
      maxDim > 0 ? TARGET_DIAMETER / maxDim : 1,
    );

    return () => {
      cloned.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, [cloned, faceRefs]);

  return (
    <group ref={ref}>
      <group ref={normalizeRef}>
        <primitive object={cloned} />
      </group>
    </group>
  );
});

Model.displayName = "Model";
export default Model;
