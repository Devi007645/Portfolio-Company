import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useGSAPTimeline } from "../../hooks/useGSAPTimeline";
import GlowShader from "../canvas/GlowShader";
import { bio } from "../../data/portfolio";

const stats = [
  { value: "4+", label: "Years Coding" },
  { value: "2+", label: "Years in AI/ML" },
  { value: "10+", label: "Projects Built" },
  { value: "∞", label: "Curiosity" },
];

export default function AboutSection() {
  const { containerRef } = useGSAPTimeline("about");
  const cardRef = useRef();

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-wrapper grid-bg"
    >
      {/* 3D canvas background */}
      <div className="canvas-container opacity-30">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
          <color attach="background" args={["#000010"]} />
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 4]} intensity={2} color="#7b2fff" />
          <Stars radius={60} depth={40} count={2000} factor={3} fade speed={0.2} />
          <GlowShader color="#7b2fff" radius={2} intensity={1.2} />
          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.1} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "var(--neon-violet)" }}>
            01 / About
          </div>
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Who Am I<span style={{ color: "var(--neon-violet)" }}>_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar / Holographic panel */}
          <div className="flex justify-center">
            <div
              className="glass-panel scanlines relative flex flex-col items-center justify-center"
              style={{
                width: "280px",
                height: "320px",
                borderColor: "rgba(123,47,255,0.4)",
                background: "rgba(123,47,255,0.06)",
              }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-28 h-28 rounded-full mb-6 flex items-center justify-center text-5xl animate-float"
                style={{
                  background: "radial-gradient(circle, rgba(123,47,255,0.3) 0%, transparent 70%)",
                  border: "2px solid rgba(123,47,255,0.5)",
                  boxShadow: "0 0 30px rgba(123,47,255,0.4)",
                }}
              >
                🧠
              </div>
              <div
                className="font-orbitron font-bold text-lg mb-1"
                style={{ color: "var(--neon-violet)" }}
              >
                {bio.name.split(" ")[0]}
              </div>
              <div className="text-xs text-center px-4" style={{ color: "var(--text-secondary)" }}>
                {bio.title}
              </div>

              {/* Scanning line animation */}
              <div
                className="absolute left-0 right-0 h-px opacity-40"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--neon-violet), transparent)",
                  animation: "scanline 3s linear infinite",
                  top: "60%",
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: "var(--neon-violet)" }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: "var(--neon-violet)" }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: "var(--neon-violet)" }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: "var(--neon-violet)" }} />
            </div>
          </div>

          {/* Bio text */}
          <div>
            <p
              className="text-base leading-8 mb-8"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              {bio.about}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-panel p-4 text-center"
                  style={{ borderColor: "rgba(123,47,255,0.3)" }}
                >
                  <div
                    className="font-orbitron font-black text-2xl mb-1"
                    style={{ color: "var(--neon-violet)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0%   { top: 10%; }
          100% { top: 90%; }
        }
      `}</style>
    </section>
  );
}
