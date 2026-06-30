// "use client";

// import { Canvas } from "@react-three/fiber";
// import { Suspense } from "react";
// import Scene from "./Scene";
// import ScrollController from "./ScrollController";

// export default function CanvasWrapper() {
//   return (
//     <div className="fixed inset-0 z-1 h-screen w-full pointer-events-none">
//       <ScrollController />
//       <Canvas
//         shadows
//         dpr={[1, 1.75]}
//         gl={{
//           antialias: true,
//           alpha: true,
//           powerPreference: "high-performance",
//         }}
//         camera={{ fov: 38, position: [0, 0, 7], near: 0.1, far: 50 }}
//       >
//         <Suspense fallback={null}>
//           <Scene />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import ScrollController from "./ScrollController";
import Background from "./Background";

export default function CanvasWrapper() {
  return (
    <>
      <Background />
      <div className="fixed inset-0 z-1 h-screen w-full pointer-events-none">
        <ScrollController />
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ fov: 38, position: [0, 0, 7], near: 0.1, far: 50 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
