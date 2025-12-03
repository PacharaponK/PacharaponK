"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(SplitText);

interface HeroTextProps {
  text: string;
  isLoaded: boolean;
  delay?: number;
}

export default function HeroText({ text, isLoaded, delay = 0 }: HeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      // Create SplitText instance
      splitRef.current = new SplitText(containerRef.current, {
        type: "chars",
        charsClass: "hero-char",
      });

      // Animate each character
      gsap.fromTo(
        splitRef.current.chars,
        {
          y: "100%",
          opacity: 0,
          rotateX: -90,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.03,
          delay: delay,
        }
      );
    }

    // Cleanup
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [isLoaded, text, delay]);

  return (
    <div
      ref={containerRef}
      className="block overflow-hidden whitespace-nowrap text-[18vw] md:text-[15vw] font-black"
      style={{ perspective: "1000px" }}
    >
      {text}
    </div>
  );
}
