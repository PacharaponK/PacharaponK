"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface StickerProps {
  type: "star" | "smiley" | "arrow" | "blob" | "sparkle";
  className?: string;
  delay?: number;
}

export default function Sticker({ type, className = "", delay = 0 }: StickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Floating animation
    gsap.to(element, {
      y: "random(-10, 10)",
      x: "random(-10, 10)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay,
    });

    // Hover effect
    const onEnter = () => {
      gsap.to(element, {
        scale: 1.2,
        rotation: "random(-30, 30)",
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotation: 0, // Return to base rotation handled by floating animation? No, let's just reset scale
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(element);
    };
  }, [delay]);

  const renderContent = () => {
    switch (type) {
      case "star":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-yellow-400">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "smiley":
        return (
          <div className="w-full h-full bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute bottom-1/4 w-1/2 h-2 border-b-2 border-black rounded-full"></div>
          </div>
        );
      case "arrow":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-blue-500">
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        );
      case "blob":
        return (
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-pink-400 opacity-80">
            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,35.1C60.4,47.3,49.9,58.1,37.6,65.8C25.3,73.5,11.2,78.1,-1.9,81.4C-15,84.7,-28.1,86.7,-40.2,81.8C-52.3,76.9,-63.4,65.1,-71.9,51.7C-80.4,38.3,-86.3,23.3,-85.8,8.6C-85.3,-6.1,-78.4,-20.5,-68.8,-32.5C-59.2,-44.5,-46.9,-54.1,-33.9,-61.8C-20.9,-69.5,-7.2,-75.3,5.8,-85.3L44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        );
      case "sparkle":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-purple-500">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute cursor-pointer z-20 ${className}`}
    >
      {renderContent()}
    </div>
  );
}
