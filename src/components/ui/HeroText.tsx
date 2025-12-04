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
        charsClass: "hero-char inline-block cursor-default",
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
          onComplete: () => {
            // Add hover effects after entrance animation
            splitRef.current?.chars.forEach((char) => {
              char.addEventListener("mouseenter", () => {
                gsap.to(char, {
                  skewX: -15,
                  scale: 0.9,
                  y: 5,
                  color: "#EA580C", // Orange highlight
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
              char.addEventListener("mouseleave", () => {
                gsap.to(char, {
                  skewX: 0,
                  scale: 1,
                  y: 0,
                  color: "inherit",
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
            });
          },
        }
      );

      // Make container visible after setting initial state of chars
      gsap.set(containerRef.current, { opacity: 1 });
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
      style={{ perspective: "1000px", opacity: 0 }}
    >
      {text}
    </div>
  );
}
