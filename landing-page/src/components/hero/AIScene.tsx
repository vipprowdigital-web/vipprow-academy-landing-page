'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Neural network node positions — arranged in a loose 3D sphere
const NODE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],           // central hub
  [2.0, 0.8, -0.5],    // R-upper
  [-2.0, 0.8, -0.5],   // L-upper
  [1.6, -1.2, 0.8],    // R-lower
  [-1.6, -1.2, 0.8],   // L-lower
  [0, 2.4, 0],         // top
  [0, -2.4, 0],        // bottom
  [2.4, 0, -1.0],      // far-right
  [-2.4, 0, -1.0],     // far-left
];

// Edges between nodes — forms a web
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 5], [1, 7], [2, 5], [2, 8],
  [3, 6], [3, 7], [4, 6], [4, 8],
  [5, 7], [5, 8], [6, 7], [6, 8],
];

function NeuralNode({
  position,
  isHub,
  phase,
}: {
  position: [number, number, number];
  isHub: boolean;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + phase;
    const pulse = 1 + Math.sin(t * 1.8) * 0.12;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[isHub ? 0.32 : 0.15, 16, 16]} />
      <meshStandardMaterial
        color={isHub ? '#a78bfa' : '#7c3aed'}
        emissive={isHub ? '#6d28d9' : '#3b0764'}
        emissiveIntensity={isHub ? 2.0 : 1.2}
        transparent
        opacity={isHub ? 1 : 0.85}
      />
    </mesh>
  );
}

function EdgeLine({
  a,
  b,
}: {
  a: [number, number, number];
  b: [number, number, number];
}) {
  const ref = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
    return geo;
  }, [a, b]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#7c3aed',
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Subtle opacity pulse on each edge
    (ref.current.material as THREE.LineBasicMaterial).opacity =
      0.15 + Math.sin(clock.elapsedTime * 0.8 + a[0]) * 0.1;
  });

  return <primitive object={new THREE.Line(geometry, material)} ref={ref} />;
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.18;
    groupRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.09) * 0.12 + pointer.y * 0.08;
  });

  return (
    <group ref={groupRef}>
      {NODE_POSITIONS.map((pos, i) => (
        <NeuralNode key={i} position={pos} isHub={i === 0} phase={i * 0.7} />
      ))}
      {EDGES.map(([a, b], i) => (
        <EdgeLine
          key={i}
          a={NODE_POSITIONS[a]}
          b={NODE_POSITIONS[b]}
        />
      ))}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 6, 4]} intensity={4} color="#a78bfa" />
      <pointLight position={[-4, -4, 3]} intensity={2} color="#4f46e5" />
      <pointLight position={[0, 0, 6]} intensity={1.5} color="#c4b5fd" />
    </>
  );
}

export function AIScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <SceneLights />
      <NeuralNetwork />
    </Canvas>
  );
}
