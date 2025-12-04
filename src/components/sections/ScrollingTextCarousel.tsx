"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextCarouselProps {
  className?: string;
  speed?: number;
}

export default function ScrollingTextCarousel({
  className = "",
  speed = 1.5,
}: ScrollingTextCarouselProps) {
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
      const textContent = row.innerHTML;
      row.innerHTML = `${textContent} ${textContent} ${textContent}`;

      gsap.to(row, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
        xPercent: direction * 50, // Move 20% in the specified direction
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <section
      ref={containerRef}
      className={`w-full overflow-hidden py-4 md:py-10 bg-white text-black ${className}`}
    >
      <div className="flex flex-col gap-1 md:gap-2">
        {/* Row 1: Solid Black */}
        <div className="w-full overflow-hidden py-1">
          <div
            ref={(el) => { rowsRef.current[0] = el; }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold italic tracking-tight whitespace-nowrap will-change-transform text-black"
          >
            <span className="px-4">If music be the food of love, play on.</span>
          </div>
        </div>

        {/* Row 2: Faded Style */}
        <div className="w-full overflow-hidden py-1">
          <div
            ref={(el) => { rowsRef.current[1] = el; }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold italic tracking-tight whitespace-nowrap will-change-transform text-neutral-500"
          >
            <span className="px-4">Nothing can come of nothing.</span>
            <span className="px-4">What’s done can’t be undone.</span>
          </div>
        </div>

        {/* Row 3: Solid Black */}
        <div className="w-full overflow-hidden py-1">
          <div
            ref={(el) => { rowsRef.current[2] = el; }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold italic tracking-tight whitespace-nowrap will-change-transform text-black"
          >
            <span className="px-4">I am one who loved not wisely but too well.</span>
            <span className="px-4">Love all, trust a few, do wrong to none.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
