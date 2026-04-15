import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import GlowShader from "../canvas/GlowShader";
import { bio } from "../../data/portfolio";

const TERMINAL_LINES = [
  "$ initializing contact module...",
  "$ secure channel established",
  "$ ready to receive transmission",
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [termLine, setTermLine] = useState(0);
  const [typed, setTyped] = useState("");
  const intervalRef = useRef(null);

  // Terminal typewriter effect
  useEffect(() => {
    if (termLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[termLine];
    let i = 0;
    intervalRef.current = setInterval(() => {
      setTyped((prev) => prev + line[i]);
      i++;
      if (i >= line.length) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setTyped((prev) => prev + "\n");
          setTermLine((l) => l + 1);
        }, 400);
      }
    }, 35);
    return () => clearInterval(intervalRef.current);
  }, [termLine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const socialLinks = [
    { icon: "GH", label: "GitHub", href: bio.github, color: "#00f5ff" },
    { icon: "LI", label: "LinkedIn", href: bio.linkedin, color: "#7b2fff" },
    { icon: "TW", label: "Twitter", href: bio.twitter, color: "#ff2d78" },
    { icon: "✉", label: "Email", href: `mailto:${bio.email}`, color: "#00ff88" },
  ];

  return (
    <section id="contact" className="section-wrapper" style={{ minHeight: "100dvh" }}>
      {/* 3D Canvas BG */}
      <div className="canvas-container opacity-25">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
          <color attach="background" args={["#000010"]} />
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 4]} intensity={2} color="#00ff88" />
          <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.2} />
          <GlowShader color="#00ff88" radius={2.5} intensity={1.5} />
          <EffectComposer>
            <Bloom intensity={2} luminanceThreshold={0.1} blendFunction={BlendFunction.ADD} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: "var(--neon-green)", fontFamily: "var(--font-heading)" }}
          >
            04 / Contact
          </div>
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Initiate Contact<span style={{ color: "var(--neon-green)" }}>_</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Terminal */}
          <div
            className="glass-panel p-6 font-mono text-sm scanlines"
            style={{
              borderColor: "rgba(0,255,136,0.3)",
              background: "rgba(0,255,136,0.04)",
              minHeight: "280px",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <span className="w-3 h-3 rounded-full" style={{ background: "var(--neon-green)", opacity: 0.7 }} />
              <span className="ml-2 text-xs opacity-40" style={{ color: "var(--neon-green)" }}>
                terminal — deviprasad@portfolio
              </span>
            </div>
            <div style={{ color: "var(--neon-green)" }} className="whitespace-pre-wrap leading-7">
              {typed}
              <span className="cursor-blink" />
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  id={`contact-${s.label.toLowerCase()}`}
                  className="flex items-center gap-3 text-xs hover:opacity-100 opacity-70 transition-opacity"
                  style={{ color: s.color, fontFamily: "var(--font-heading)" }}
                >
                  <span
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    style={{ border: `1px solid ${s.color}40`, background: s.color + "15" }}
                  >
                    {s.icon}
                  </span>
                  {s.label}
                  <span className="opacity-40 ml-auto">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          {!sent ? (
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-6 flex flex-col gap-4"
              style={{ borderColor: "rgba(0,255,136,0.3)" }}
              id="contact-form"
            >
              {[
                { id: "contact-name",    name: "name",    label: "YOUR_NAME",    type: "text" },
                { id: "contact-email",   name: "email",   label: "YOUR_EMAIL",   type: "email" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label
                    htmlFor={field.id}
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--neon-green)", fontFamily: "var(--font-heading)" }}
                  >
                    $ {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    required
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="bg-transparent border-0 border-b text-sm py-2 outline-none transition-colors"
                    style={{
                      color: "var(--text-primary)",
                      borderColor: "rgba(0,255,136,0.3)",
                      fontFamily: "var(--font-body)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--neon-green)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,136,0.3)")}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1 flex-1">
                <label
                  htmlFor="contact-message"
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--neon-green)", fontFamily: "var(--font-heading)" }}
                >
                  $ TRANSMISSION
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-transparent border resize-none text-sm p-3 outline-none transition-colors rounded"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "rgba(0,255,136,0.3)",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--neon-green)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,136,0.3)")}
                />
              </div>

              <button
                type="submit"
                className="neon-btn justify-center mt-2"
                style={{ borderColor: "var(--neon-green)", color: "var(--neon-green)" }}
                id="contact-submit-btn"
              >
                ◈ TRANSMIT MESSAGE
              </button>
            </form>
          ) : (
            <div
              className="glass-panel p-8 flex flex-col items-center justify-center text-center gap-6"
              style={{ borderColor: "rgba(0,255,136,0.5)", minHeight: "300px" }}
            >
              <div className="text-5xl">✅</div>
              <div className="font-orbitron font-bold text-lg" style={{ color: "var(--neon-green)" }}>
                Transmission Received
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Thank you! I'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="neon-btn text-xs"
                style={{ borderColor: "var(--neon-green)", color: "var(--neon-green)" }}
              >
                Send Another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
