"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

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
            // Remove overflow hidden after entrance animation to allow scattering out of bounds
            if (containerRef.current) {
              containerRef.current.classList.remove("overflow-hidden");
              containerRef.current.classList.add("overflow-visible");
            }

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

            // Gravity cascade on scroll out — chars fall with index-based depth, like dominoes
            const header = containerRef.current?.closest("header");
            if (header && splitRef.current) {
              const chars = splitRef.current.chars;
              const total = chars.length;
              gsap.to(chars, {
                y: (i: number) => {
                  const norm = total > 1 ? i / (total - 1) : 0.5; // 0..1 left to right
                  return 500 + norm * 700; // rightmost char falls farthest
                },
                x: (i: number) => {
                  const norm = total > 1 ? i / (total - 1) : 0.5;
                  return (norm - 0.5) * gsap.utils.random(150, 400);
                },
                rotation: (i: number) => (i % 2 === 0 ? 1 : -1) * gsap.utils.random(60, 200),
                scale: 0,
                opacity: 0,
                ease: "power3.in",
                scrollTrigger: {
                  trigger: header,
                  start: "top top",
                  end: "bottom top",
                  scrub: 2,
                },
              });
            }
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
      className="block overflow-hidden whitespace-normal break-all sm:whitespace-nowrap sm:break-normal text-[30vw] sm:text-[15vw] font-black"
      style={{ perspective: "1000px", opacity: 0 }}
    >
      {text}
    </div>
  );
}
