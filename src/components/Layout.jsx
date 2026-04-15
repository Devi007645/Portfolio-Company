import { navItems } from "../data/portfolio";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      {children}
    </div>
  );
}
