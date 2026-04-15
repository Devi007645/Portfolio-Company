import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 5000, mouse }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const mx = mouse?.current?.x ?? 0;
    const my = mouse?.current?.y ?? 0;

    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      dummy.position.set(
        positions[i * 3 + 0] + Math.sin(t * 0.3 + phase) * 0.3 + mx * 2,
        positions[i * 3 + 1] + Math.cos(t * 0.2 + phase) * 0.3 + my * 2,
        positions[i * 3 + 2] + Math.sin(t * 0.1 + phase) * 0.2
      );
      const scale = 0.3 + Math.sin(t + phase) * 0.15;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.03, 4, 4]} />
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}
