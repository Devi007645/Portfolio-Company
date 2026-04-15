import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import ProjectCube from "../canvas/ProjectCube";
import { projects } from "../../data/portfolio";

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  // Layout positions for 4 cubes
  const positions = [
    [-3, 1.2, 0],
    [3, 1.2, 0],
    [-3, -1.8, 0],
    [3, -1.8, 0],
  ];

  return (
    <section id="projects" className="section-wrapper" style={{ minHeight: "100dvh" }}>
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 55 }}>
          <color attach="background" args={["#000010"]} />
          <fog attach="fog" args={["#000010", 20, 60]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 5, 5]} intensity={2} color="#00f5ff" />
          <pointLight position={[0, -5, 5]} intensity={1} color="#ff2d78" />

          <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.2} />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            {projects.map((proj, i) => (
              <ProjectCube
                key={proj.id}
                project={proj}
                position={positions[i]}
                onSelect={setSelected}
              />
            ))}
          </Float>

          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.15} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Header overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-16 px-8 pointer-events-none">
        <div className="text-center">
          <div className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "var(--neon-pink)", fontFamily: "var(--font-heading)" }}>
            02 / Projects
          </div>
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Featured Work<span style={{ color: "var(--neon-pink)" }}>_</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            Hover to inspect · Click to explore
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-panel relative max-w-lg w-full p-8"
            style={{
              borderColor: selected.color + "60",
              boxShadow: `0 0 40px ${selected.color}40`,
              animation: "fade-in-up 0.4s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close btn */}
            <button
              className="absolute top-4 right-4 text-sm opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: selected.color, fontFamily: "var(--font-heading)" }}
              onClick={() => setSelected(null)}
              id="project-modal-close"
            >
              × CLOSE
            </button>

            {/* Emoji */}
            <div className="text-5xl mb-4">{selected.emoji}</div>

            {/* Title */}
            <h3
              className="font-orbitron font-bold text-2xl mb-1"
              style={{ color: selected.color }}
            >
              {selected.title}
            </h3>
            <div className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--text-secondary)" }}>
              {selected.subtitle}
            </div>

            {/* Description */}
            <p className="text-sm leading-7 mb-6" style={{ color: "var(--text-secondary)" }}>
              {selected.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    border: `1px solid ${selected.color}60`,
                    color: selected.color,
                    background: selected.color + "15",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className="neon-btn text-xs py-2 px-5"
                style={{ borderColor: selected.color, color: selected.color }}
                id={`project-github-${selected.id}`}
              >
                GitHub
              </a>
              <a
                href={selected.live}
                target="_blank"
                rel="noreferrer"
                className="neon-btn text-xs py-2 px-5"
                style={{ borderColor: selected.color, color: selected.color }}
                id={`project-live-${selected.id}`}
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
