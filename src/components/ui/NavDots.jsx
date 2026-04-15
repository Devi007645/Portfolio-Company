import { navItems } from "../../data/portfolio";

export default function NavDots({ activeSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      aria-label="Section navigation"
      id="nav-dots"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            id={`nav-dot-${item.id}`}
            onClick={() => scrollTo(item.id)}
            aria-label={`Go to ${item.label} section`}
            title={item.label}
            className="relative group flex items-center justify-end gap-2"
          >
            {/* Label (appears on hover) */}
            <span
              className="font-orbitron text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              style={{
                color: "var(--neon-cyan)",
                fontSize: "0.55rem",
                transform: "translateX(0)",
              }}
            >
              {item.label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? "12px" : "8px",
                height: isActive ? "12px" : "8px",
                background: isActive ? "var(--neon-cyan)" : "rgba(255,255,255,0.25)",
                boxShadow: isActive
                  ? "0 0 10px rgba(0,245,255,0.9), 0 0 20px rgba(0,245,255,0.4)"
                  : "none",
                transform: "scale(1)",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
