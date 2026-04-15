import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

export default function ProjectCube({ project, position = [0, 0, 0], onSelect }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle idle rotation
    meshRef.current.rotation.y += hovered ? 0.02 : 0.004;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;

    // Scale on hover
    const targetScale = hovered ? 1.15 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Glow pulse
    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.3 + Math.sin(t * 2) * 0.15 + (hovered ? 0.3 : 0);
    }
  });

  const color = new THREE.Color(project.color);

  return (
    <group position={position}>
      {/* Glow sphere underneath */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main cube */}
      <RoundedBox
        ref={meshRef}
        args={[1.6, 1.6, 1.6]}
        radius={0.12}
        smoothness={4}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        onClick={() => onSelect?.(project)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </RoundedBox>

      {/* Emoji label on face */}
      <Html
        position={[0, 0, 0.85]}
        center
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            fontSize: "2rem",
            filter: hovered ? "drop-shadow(0 0 8px " + project.color + ")" : "none",
            transition: "filter 0.3s",
          }}
        >
          {project.emoji}
        </div>
      </Html>

      {/* Title label below */}
      <Html
        position={[0, -1.2, 0]}
        center
        style={{ pointerEvents: "none", userSelect: "none", width: "150px" }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.6rem",
            color: project.color,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textShadow: `0 0 8px ${project.color}`,
          }}
        >
          {project.title}
        </div>
      </Html>
    </group>
  );
}
