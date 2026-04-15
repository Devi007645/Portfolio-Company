import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import ParticleField from "../canvas/ParticleField";
import CameraRig from "../canvas/CameraRig";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import { bio } from "../../data/portfolio";

export default function HeroSection({ onEnter }) {
  const { mouse, elRef } = useMouseParallax();
  const [entered, setEntered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Glitch text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => onEnter?.(), 800);
  };

  return (
    <section
      id="hero"
      ref={elRef}
      className="section-wrapper"
      style={{ background: "var(--bg)" }}
    >
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#000010"]} />
          <fog attach="fog" args={["#000010", 30, 80]} />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2fff" />

          <Stars
            radius={80}
            depth={60}
            count={4000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.3}
          />

          <CameraRig mouse={mouse}>
            <ParticleField count={3000} mouse={mouse} />
          </CameraRig>

          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Subtitle */}
        <div
          className="mb-4 text-xs tracking-[0.4em] uppercase"
          style={{ color: "var(--neon-cyan)", fontFamily: "var(--font-heading)" }}
        >
          <span className="opacity-60">◈</span> &nbsp; AI / ML Engineer &nbsp;
          <span className="opacity-60">◈</span>
        </div>

        {/* Main name */}
        <h1
          className="mb-4 font-orbitron font-black leading-none"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            color: "var(--text-primary)",
            textShadow: glitchActive
              ? "4px 0 #00f5ff, -4px 0 #ff2d78"
              : "0 0 40px rgba(0,245,255,0.3)",
            transition: "text-shadow 0.1s",
          }}
        >
          {bio.name.split(" ").map((word, i) => (
            <span
              key={i}
              style={{ display: "block" }}
              className={i === 1 ? "neon-text-cyan" : ""}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          className="mb-10 max-w-lg text-base font-light leading-relaxed"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          {bio.tagline}
        </p>

        {/* CTA */}
        <button
          onClick={handleEnter}
          className="neon-btn glow-pulse"
          style={{
            transform: entered ? "scale(0.95)" : "scale(1)",
            transition: "transform 0.3s",
          }}
          id="hero-enter-btn"
        >
          <span>◈</span>
          <span>Enter Portfolio</span>
          <span>◈</span>
        </button>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          style={{ color: "var(--neon-cyan)" }}
        >
          <span className="text-xs tracking-widest font-orbitron">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-current to-transparent animate-pulse" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 opacity-40" style={{ borderColor: "var(--neon-cyan)" }} />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 opacity-40" style={{ borderColor: "var(--neon-cyan)" }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 opacity-40" style={{ borderColor: "var(--neon-cyan)" }} />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 opacity-40" style={{ borderColor: "var(--neon-cyan)" }} />
    </section>
  );
}
