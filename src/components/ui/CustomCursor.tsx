"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const workSection = document.querySelector<HTMLElement>("#work");

    const onWorkEnter = () => setIsLight(true);
    const onWorkLeave = () => setIsLight(false);

    workSection?.addEventListener("mouseenter", onWorkEnter);
    workSection?.addEventListener("mouseleave", onWorkLeave);

    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${posX}px`;
        dotRef.current.style.top = `${posY}px`;
      }

      if (outlineRef.current) {
        outlineRef.current.style.left = `${posX}px`;
        outlineRef.current.style.top = `${posY}px`;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      try {
        const isHoverTrigger =
          target.classList.contains("hover-trigger") ||
          target.closest(".hover-trigger");

        if (isHoverTrigger) {
          setIsHovered(true);
        }
      } catch {
        // Ignore errors from non-Element targets
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      try {
        const isHoverTrigger =
          target.classList.contains("hover-trigger") ||
          target.closest(".hover-trigger");

        if (isHoverTrigger) {
          setIsHovered(false);
        }
      } catch {
        // Ignore errors from non-Element targets
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      workSection?.removeEventListener("mouseenter", onWorkEnter);
      workSection?.removeEventListener("mouseleave", onWorkLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot hidden md:block ${isLight ? "cursor-dot--light" : ""}`}></div>
      <div
        ref={outlineRef}
        className={`cursor-outline hidden md:block ${isHovered ? "hovered" : ""} ${isLight ? "cursor-outline--light" : ""}`}
      ></div>
    </>
  );
}
