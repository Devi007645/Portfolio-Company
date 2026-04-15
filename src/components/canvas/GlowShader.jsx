import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * Custom Fresnel glow shell — wraps any content in a glowing sphere.
 */
export default function GlowShader({ color = "#00f5ff", radius = 1.5, intensity = 1.5 }) {
  const meshRef = useRef();

  const uniforms = useRef({
    uColor: { value: new THREE.Color(color) },
    uIntensity: { value: intensity },
    uOpacity: { value: 0.8 },
  });

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-worldPos.xyz);
      gl_Position = projectionMatrix * worldPos;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uOpacity;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.0);
      vec3 glow = uColor * fresnel * uIntensity;
      gl_FragColor = vec4(glow, fresnel * uOpacity);
    }
  `;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      uniforms.current.uIntensity.value =
        intensity + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[radius, 32, 32]}>
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </Sphere>
  );
}
