import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle light/dark theme"
      className="fixed top-6 right-20 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300"
      style={{
        border: "1px solid rgba(0,245,255,0.3)",
        background: "rgba(0,0,16,0.6)",
        backdropFilter: "blur(8px)",
        color: dark ? "var(--neon-cyan)" : "var(--neon-violet)",
        fontSize: "0.65rem",
        fontFamily: "var(--font-heading)",
        letterSpacing: "0.1em",
      }}
    >
      <span>{dark ? "◑" : "◐"}</span>
      <span>{dark ? "DARK" : "LIGHT"}</span>
    </button>
  );
}
