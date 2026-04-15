import { useRef, useEffect } from "react";

/**
 * Returns { x, y } normalised mouse position in [-0.5, 0.5]
 * and an `elRef` to attach to a DOM element for local positioning.
 */
export function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  const elRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const el = elRef.current;
      const rect = el ? el.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      mouse.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5),
        y: -((e.clientY - rect.top)  / rect.height - 0.5),
      };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return { mouse, elRef };
}
