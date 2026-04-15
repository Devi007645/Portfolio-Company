import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

export default function SkillOrb({ skill, orbitRadius = 4, orbitSpeed = 0.4, orbitOffset = 0, anchorY = 0 }) {
  const orbitRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orbitSpeed + orbitOffset;
    if (orbitRef.current) {
      orbitRef.current.position.x = Math.cos(t) * orbitRadius;
      orbitRef.current.position.z = Math.sin(t) * orbitRadius;
      orbitRef.current.position.y = anchorY + Math.sin(t * 1.3) * 0.4;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      const s = hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });

  const color = new THREE.Color(skill.color);

  return (
    <group ref={orbitRef}>
      <Sphere
        ref={meshRef}
        args={[0.28, 16, 16]}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.5}
          metalness={0.3}
          roughness={0.1}
        />
      </Sphere>

      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(0,0,16,0.9)",
              border: `1px solid ${skill.color}`,
              borderRadius: "6px",
              padding: "4px 10px",
              color: skill.color,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.55rem",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              boxShadow: `0 0 12px ${skill.color}60`,
            }}
          >
            {skill.name}
            <div
              style={{
                width: `${skill.level}%`,
                height: "2px",
                background: skill.color,
                marginTop: "3px",
                borderRadius: "1px",
                boxShadow: `0 0 4px ${skill.color}`,
              }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}
