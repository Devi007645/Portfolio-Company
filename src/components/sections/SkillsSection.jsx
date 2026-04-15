import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Sphere, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import SkillOrb from "../canvas/SkillOrb";
import GlowShader from "../canvas/GlowShader";
import { skills, skillCategories } from "../../data/portfolio";
import * as THREE from "three";

const categoryColors = {
  "AI/ML":    "#00f5ff",
  "Frontend": "#7b2fff",
  "Backend":  "#ff2d78",
  "Tools":    "#00ff88",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section-wrapper" style={{ minHeight: "100dvh" }}>
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 12], fov: 60 }}>
          <color attach="background" args={["#000010"]} />
          <fog attach="fog" args={["#000010", 25, 70]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[0, 0, 0]} intensity={3} color="#00f5ff" />

          <Stars radius={70} depth={50} count={2000} factor={3} fade speed={0.15} />

          {/* Central anchor orb */}
          <GlowShader color="#00f5ff" radius={1.0} intensity={2} />
          <Sphere args={[0.35, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={2}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>

          {/* Skill orbs — one per skill */}
          <Suspense fallback={null}>
            {skills.map((skill, i) => {
              const cat = skillCategories.find((c) => c.name === skill.category);
              const sameCategory = skills.filter((s) => s.category === skill.category);
              const idxInCat = sameCategory.indexOf(skill);
              const totalInCat = sameCategory.length;
              const orbitR = 2.5 + (idxInCat % 2) * 1.2;
              const speed = 0.25 + idxInCat * 0.04;
              const anchorY = cat ? (cat.position[1] * 0.6) : 0;
              return (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  orbitRadius={orbitR}
                  orbitSpeed={speed}
                  orbitOffset={(i / skills.length) * Math.PI * 2}
                  anchorY={anchorY}
                />
              );
            })}
          </Suspense>

          <EffectComposer>
            <Bloom intensity={2} luminanceThreshold={0.1} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Header + Legend overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-16 px-8 pointer-events-none">
        {/* Header */}
        <div className="text-center">
          <div
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: "var(--neon-green)", fontFamily: "var(--font-heading)" }}
          >
            03 / Skills
          </div>
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Tech Arsenal<span style={{ color: "var(--neon-green)" }}>_</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            Hover an orb to inspect · orbits are live
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 pb-4 pointer-events-auto">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="glass-panel flex items-center gap-2 px-4 py-2"
              style={{ borderColor: cat.color + "50" }}
            >
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{
                  background: cat.color,
                  boxShadow: `0 0 6px ${cat.color}`,
                }}
              />
              <span
                className="text-xs uppercase tracking-wider font-orbitron"
                style={{ color: cat.color }}
              >
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
