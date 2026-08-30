"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function GlassShape({ position, rotation, scale, type }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.2, 0.2]}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {type === "torus" && <torusKnotGeometry args={[1, 0.3, 128, 64]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#ffffff"
          transmission={1}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4ADE80" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#F87171" />
        
        <GlassShape position={[-3, 1, -2]} rotation={[0, 0, 0]} scale={1.5} type="icosahedron" />
        <GlassShape position={[3, -1, -4]} rotation={[0.5, Math.PI, 0]} scale={1.8} type="torus" />
        <GlassShape position={[0, -3, -6]} rotation={[0, 0, 0]} scale={2} type="octahedron" />

        <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
