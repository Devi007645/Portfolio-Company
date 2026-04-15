import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function HolographicCard({ children, position = [0, 0, 0], width = 4, height = 2.5, color = "#00f5ff" }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(t * 1.5) * 0.1;
  });

  const col = new THREE.Color(color);

  return (
    <group position={position}>
      {/* Glass panel */}
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={col}
          emissive={col}
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Border glow top */}
      <mesh position={[0, height / 2, 0.001]}>
        <planeGeometry args={[width, 0.015]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Border glow bottom */}
      <mesh position={[0, -height / 2, 0.001]}>
        <planeGeometry args={[width, 0.015]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* HTML content overlay */}
      <Html
        center
        transform
        occlude={false}
        style={{ width: `${width * 85}px`, pointerEvents: "none" }}
      >
        {children}
      </Html>
    </group>
  );
}
