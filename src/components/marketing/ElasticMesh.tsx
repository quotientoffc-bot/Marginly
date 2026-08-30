"use client";
import { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

interface ElasticMeshProps {
  image?: string;
  tilt?: number;
  interaction?: "drag" | "hover";
  shading?: number;
  color1?: string;
  color2?: string;
}

function MeshPlane({ image, tilt = 15, interaction = 'hover', shading = 1, color1, color2 }: ElasticMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load texture if image is provided
  const texture = image ? useLoader(THREE.TextureLoader, image) : null;
  if (texture) {
    texture.anisotropy = 16;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }
  
  // Calculate aspect ratio
  const aspect = texture && texture.image ? texture.image.width / texture.image.height : 16/9;
  
  // Base width for the plane. 
  // We use 18 so it fits nicely inside a camera at z=12
  const w = 18; 
  const h = w / aspect;

  // Default rotation: tilted backward slightly (-10 degrees)
  const defaultRotation: [number, number, number] = [-0.15, 0, 0];

  const [{ rotation }, api] = useSpring(() => ({
    rotation: defaultRotation,
    config: { mass: 1, tension: 200, friction: 20 }
  }));

  const handlePointerMove = (e: any) => {
    // Calculate tilt based on mouse position relative to screen center
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    // Add the base tilt on the X axis
    const rotX = defaultRotation[0] + (y * (tilt * Math.PI / 180));
    const rotY = defaultRotation[1] + (x * (tilt * Math.PI / 180));
    
    api.start({
      rotation: [rotX, rotY, 0]
    });
  };

  const handlePointerLeave = () => {
    // Return to default tilt
    api.start({ rotation: defaultRotation });
  };

  return (
    <a.group 
      ref={meshRef as any} 
      rotation={rotation as any}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <mesh>
        <planeGeometry args={[w, h, 8, 8]} />
        <meshBasicMaterial 
          map={texture} 
          color={!texture ? color1 : undefined}
          side={THREE.DoubleSide}
        />
      </mesh>
    </a.group>
  );
}

export default function ElasticMesh({ image, tilt = 15, interaction = 'hover', shading = 1, color1, color2 }: ElasticMeshProps) {
  return (
    // Move camera back to z: 12 so the larger mesh fits without getting cropped
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={shading * 2.5} />
      <MeshPlane image={image} tilt={tilt} interaction={interaction} shading={shading} color1={color1} color2={color2} />
    </Canvas>
  );
}
