'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMouse } from '@/hooks/useMouse';

function GlassIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[2.2, 0.2, 0]} scale={2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          transmission={0.95}
          roughness={0.02}
          thickness={0.4}
          ior={1.5}
          chromaticAberration={0.04}
          color="#c4b5fd"
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.15}
        />
      </mesh>
    </Float>
  );
}

function GlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        position={[-2.4, 0.6, -0.5]}
        rotation={[Math.PI / 3.5, 0, Math.PI / 8]}
        scale={1.3}
      >
        <torusGeometry args={[0.9, 0.32, 16, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          transmission={0.9}
          roughness={0.04}
          thickness={0.25}
          ior={1.4}
          chromaticAberration={0.06}
          color="#818cf8"
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere() {
  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={1.4}>
      <mesh position={[0.4, -1.8, 0.8]} scale={0.55}>
        <sphereGeometry args={[1, 24, 24]} />
        <MeshTransmissionMaterial
          backside
          samples={2}
          resolution={128}
          transmission={0.85}
          roughness={0.08}
          thickness={0.2}
          ior={1.3}
          color="#a78bfa"
          chromaticAberration={0.03}
        />
      </mesh>
    </Float>
  );
}

function SmallOrb({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2.5} rotationIntensity={0} floatIntensity={2}>
      <mesh position={position} scale={0.22}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const mouse = useMouse();

  // Access camera via useFrame's state argument — not a hook return value,
  // so the React Compiler allows mutations on it.
  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.035;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.25} />
      <pointLight position={[4, 6, 4]} intensity={3} color="#7c3aed" />
      <pointLight position={[-4, -4, 2]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[0, 8, -2]} intensity={2} color="#e2e8f0" />
      <pointLight position={[-2, 2, 5]} intensity={1} color="#a78bfa" />

      <Suspense fallback={null}>
        <GlassIcosahedron />
        <GlassTorus />
        <GlassSphere />
        <SmallOrb position={[-1.2, 2.2, 0.2]} />
        <SmallOrb position={[3, -1.2, -0.4]} />
        <SmallOrb position={[-3, -1.8, 0.6]} />
      </Suspense>

      <Sparkles
        count={100}
        scale={12}
        size={0.7}
        speed={0.25}
        opacity={0.5}
        color="#a78bfa"
      />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
