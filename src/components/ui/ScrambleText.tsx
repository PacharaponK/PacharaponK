"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin);

interface ScrambleTextProps {
  text: string;
  isLoaded: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  chars?: string;
  speed?: number;
}

export default function ScrambleText({
  text,
  isLoaded,
  delay = 0,
  duration = 1.5,
  className = "",
  chars = "upperCase",
  speed = 0.3,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (isLoaded && element) {
      // Initial state - empty or scrambled
      // gsap.set(element, { opacity: 1 }); // Removed to prevent early visibility

      // Fade in
      gsap.to(element, {
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
      });

      // Scramble text animation
      gsap.to(element, {
        duration: duration,
        scrambleText: {
          text: text,
          chars: chars,
          revealDelay: 0.3,
          speed: speed,
          newClass: "text-primary",
        },
        ease: "none",
        delay: delay,
        onComplete: () => {
          // Manually split text into spans for hover effect
          const content = element.innerText;
          element.innerHTML = content
            .split("")
            .map(
              (char) =>
                `<span class="inline-block cursor-default hover-char transition-colors">${char}</span>`
            )
            .join("");

          // Add hover listeners to new spans
          const spans = element.querySelectorAll(".hover-char");
          spans.forEach((span) => {
            span.addEventListener("mouseenter", () => {
              gsap.to(span, {
                scale: 1.3,
                y: -10,
                rotate: "random(-10, 10)",
                color: "#2563EB",
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            });
            span.addEventListener("mouseleave", () => {
              gsap.to(span, {
                scale: 1,
                y: 0,
                rotate: 0,
                color: "inherit",
                duration: 0.3,
                ease: "power2.out",
              });
            });
          });
        },
      });
    }

    return () => {
      if (element) {
        gsap.killTweensOf(element);
      }
    };
  }, [isLoaded, text, delay, duration, chars, speed]);

  return (
    <div
      ref={containerRef}
      className={`block whitespace-nowrap text-[18vw] md:text-[15vw] font-black ${className}`}
      style={{ opacity: 0 }}
    >
      {/* Initial placeholder - will be replaced by scramble animation */}
      {"_".repeat(text.length)}
    </div>
  );
}
