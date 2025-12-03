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
      gsap.set(element, { opacity: 1 });

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
