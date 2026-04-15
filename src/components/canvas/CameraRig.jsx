import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function CameraRig({ mouse, children }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current || !mouse?.current) return;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Smooth lerp towards mouse position
    groupRef.current.rotation.x = THREE_lerp(
      groupRef.current.rotation.x,
      my * 0.15,
      0.05
    );
    groupRef.current.rotation.y = THREE_lerp(
      groupRef.current.rotation.y,
      mx * 0.2,
      0.05
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

// Inline lerp to avoid importing THREE just for this
function THREE_lerp(a, b, t) {
  return a + (b - a) * t;
}
