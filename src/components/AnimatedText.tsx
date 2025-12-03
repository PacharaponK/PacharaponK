"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  animation?: "chars" | "words" | "lines" | "scramble";
  trigger?: "load" | "scroll";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimatedText({
  children,
  className = "",
  as: Tag = "div",
  animation = "chars",
  trigger = "scroll",
  delay = 0,
  duration = 0.6,
  stagger = 0.02,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    // Determine split type based on animation
    const splitType = animation === "lines" ? "lines" : animation === "words" ? "words" : "chars";

    // Create SplitText instance
    splitRef.current = new SplitText(element, {
      type: splitType,
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
    });

    const targets = splitRef.current[splitType];

    // Animation config
    const fromVars: gsap.TweenVars = {
      y: animation === "lines" ? "100%" : 40,
      opacity: 0,
      rotationX: animation === "chars" ? -45 : 0,
    };

    const toVars: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      ease: "power3.out",
      stagger,
      delay: trigger === "load" ? delay : 0,
    };

    if (trigger === "scroll") {
      // ScrollTrigger animation
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    } else {
      // Load animation
      gsap.fromTo(targets, fromVars, toVars);
    }

    // Cleanup
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [children, animation, trigger, delay, duration, stagger]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>}
      className={`animated-text ${className}`}
      style={{ perspective: animation === "chars" ? "1000px" : undefined }}
    >
      {children}
    </Tag>
  );
}
