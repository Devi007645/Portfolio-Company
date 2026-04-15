import { useState, useEffect, useRef } from "react";
import LoaderScreen from "./components/ui/LoaderScreen";
import NavDots from "./components/ui/NavDots";
import AIAssistant from "./components/ui/AIAssistant";
import ThemeToggle from "./components/ui/ThemeToggle";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import ContactSection from "./components/sections/ContactSection";
import { navItems } from "./data/portfolio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [loading]); // re-run after loader disappears

  return (
    <>
      {/* Loading screen */}
      {loading && <LoaderScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Global UI overlays */}
          <NavDots activeSection={activeSection} />
          <ThemeToggle />
          <AIAssistant />

          {/* Sections stacked vertically */}
          <main>
            <HeroSection onEnter={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }} />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />

            {/* Footer */}
            <footer
              className="text-center py-8 text-xs"
              style={{
                color: "var(--text-secondary)",
                borderTop: "1px solid rgba(0,245,255,0.1)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.1em",
              }}
            >
              <span style={{ color: "var(--neon-cyan)" }}>◈</span>
              &nbsp; Devi Prasad Dash &nbsp;
              <span style={{ color: "var(--neon-cyan)" }}>◈</span>
              &nbsp; Built with React Three Fiber &nbsp;
              <span style={{ color: "var(--neon-cyan)" }}>◈</span>
              &nbsp; {new Date().getFullYear()}
            </footer>
          </main>
        </>
      )}
    </>
  );
}
