import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollingTextAnimation = (speed: number = 1.5) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    rowsRef.current.forEach((row, index) => {
      if (!row) return;

      const isReverse = index % 2 !== 0;
      const direction = isReverse ? 1 : -1; // 1 for right, -1 for left

      // Duplicate text for seamless loop
      // Check if already duplicated to prevent infinite loop on re-renders if not handled carefully
      // But since we are using innerHTML assignment, it resets.
      // Ideally we should do this duplication in React render, but for now we keep the logic here.
      // A safer way is to assume the initial content is what we want to duplicate.
      // However, modifying DOM directly in useEffect is tricky with React strict mode.
      // Let's stick to the original logic but ensure cleanup if needed,
      // though GSAP cleanup handles the animation.

      // Note: Modifying innerHTML in useEffect is not ideal for React.
      // But for this specific effect it was working.
      // To be cleaner, we might want to handle duplication in the JSX.
      // But let's stick to the extraction first.

      const textContent = row.innerText; // Use innerText to get the original text content
      row.innerHTML = `${textContent} ${textContent} ${textContent}`;

      gsap.to(row, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
        xPercent: direction * 50, // Move 50% in the specified direction
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return { containerRef, rowsRef };
};
