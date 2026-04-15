import { useEffect, useRef } from "react";

/**
 * Returns a ref containing current scroll progress [0..1]
 * for a given section element.
 */
export function useScrollProgress(sectionId) {
  const progress = useRef(0);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        progress.current = entry.intersectionRatio;
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return progress;
}
