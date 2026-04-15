import { useEffect, useRef, useState } from "react";

export default function LoaderScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING SYSTEMS");
  const rafRef = useRef(null);

  const phases = [
    "INITIALIZING SYSTEMS",
    "LOADING 3D ENGINE",
    "CALIBRATING PARTICLES",
    "COMPILING SHADERS",
    "READY",
  ];

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 2.5;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        setPhase("READY");
        setTimeout(() => onComplete?.(), 600);
        return;
      }
      setProgress(Math.floor(p));
      setPhase(phases[Math.floor((p / 100) * (phases.length - 1))]);
      rafRef.current = setTimeout(tick, 30 + Math.random() * 40);
    };
    rafRef.current = setTimeout(tick, 200);
    return () => clearTimeout(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#000010",
        opacity: progress === 100 ? 0 : 1,
        transition: "opacity 0.6s ease 0.2s",
      }}
    >
      {/* Spinning ring */}
      <div className="relative w-32 h-32 mb-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: i === 0 ? "#00f5ff" : i === 1 ? "#7b2fff" : "#ff2d78",
              borderTopColor: "transparent",
              animation: `spin ${1.2 + i * 0.4}s linear infinite ${i % 2 ? "reverse" : ""}`,
              margin: `${i * 8}px`,
              opacity: 0.8 - i * 0.15,
              boxShadow: `0 0 10px ${i === 0 ? "#00f5ff" : i === 1 ? "#7b2fff" : "#ff2d78"}50`,
            }}
          />
        ))}
        {/* Center dot */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: "2rem" }}
        >
          🧠
        </div>
      </div>

      {/* Name */}
      <div
        className="font-orbitron font-black text-2xl mb-2 tracking-widest"
        style={{ color: "#00f5ff", textShadow: "0 0 20px rgba(0,245,255,0.6)" }}
      >
        DEVI PRASAD
      </div>

      {/* Phase text */}
      <div
        className="text-xs tracking-[0.4em] uppercase mb-8 h-4"
        style={{ color: "rgba(0,245,255,0.5)", fontFamily: "var(--font-heading)" }}
      >
        {phase}
      </div>

      {/* Progress bar */}
      <div
        className="w-64 h-px relative overflow-hidden"
        style={{ background: "rgba(0,245,255,0.15)" }}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7b2fff, #00f5ff)",
            boxShadow: "0 0 8px rgba(0,245,255,0.8)",
            transition: "width 0.1s ease",
          }}
        />
      </div>
      <div
        className="mt-3 font-orbitron text-xs"
        style={{ color: "rgba(0,245,255,0.4)" }}
      >
        {String(progress).padStart(3, "0")} %
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 opacity-30" style={{ borderColor: "#00f5ff" }} />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 opacity-30" style={{ borderColor: "#00f5ff" }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 opacity-30" style={{ borderColor: "#00f5ff" }} />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 opacity-30" style={{ borderColor: "#00f5ff" }} />
    </div>
  );
}
