import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP timeline pinned to a section.
 * Returns the timeline ref and a containerRef to attach to the section element.
 */
export function useGSAPTimeline(sectionId, tweens = []) {
  const tl = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });

      tweens.forEach(({ target, vars, position }) => {
        tl.current.from(target, vars, position ?? ">");
      });
    }, containerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  return { tl, containerRef };
}
