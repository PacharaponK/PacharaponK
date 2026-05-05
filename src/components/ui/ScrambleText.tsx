"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

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

          // Upward fan explosion on scroll out — each char arcs outward like fireworks
          const header = element.closest("header");
          if (header) {
            const total = spans.length;
            gsap.to(spans, {
              x: (i: number) => {
                const norm = total > 1 ? i / (total - 1) : 0.5; // 0..1 left to right
                const angle = (norm - 0.5) * Math.PI * 1.6;    // -0.8π .. 0.8π
                return Math.sin(angle) * gsap.utils.random(500, 1000);
              },
              y: (i: number) => {
                const norm = total > 1 ? i / (total - 1) : 0.5;
                const angle = (norm - 0.5) * Math.PI * 1.6;
                return -Math.cos(angle * 0.6) * gsap.utils.random(400, 900);
              },
              rotation: () => gsap.utils.random(-720, 720),
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
      className={`block whitespace-normal break-all sm:whitespace-nowrap sm:break-normal text-[30vw] sm:text-[15vw] font-black ${className}`}
      style={{ opacity: 0 }}
    >
      {/* Initial placeholder - will be replaced by scramble animation */}
      {"_".repeat(text.length)}
    </div>
  );
}
