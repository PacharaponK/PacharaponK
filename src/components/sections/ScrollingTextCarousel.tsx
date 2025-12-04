"use client";

import { useScrollingTextAnimation } from "@/hooks/useScrollingTextAnimation";
import { scrollingTextRows } from "@/data/scrollingText";

interface ScrollingTextCarouselProps {
  className?: string;
  speed?: number;
}

export default function ScrollingTextCarousel({
  className = "",
  speed = 1.5,
}: ScrollingTextCarouselProps) {
  const { containerRef, rowsRef } = useScrollingTextAnimation(speed);

  return (
    <section
      ref={containerRef}
      className={`w-full overflow-hidden py-4 md:py-10 bg-white text-black ${className}`}
    >
      <div className="flex flex-col gap-1 md:gap-2">
        {scrollingTextRows.map((row, index) => (
          <div key={index} className="w-full overflow-hidden py-1">
            <div
              ref={(el) => { rowsRef.current[index] = el; }}
              className={`text-3xl md:text-5xl lg:text-6xl font-serif font-bold italic tracking-tight whitespace-nowrap will-change-transform ${row.style}`}
            >
              <span className="px-4">{row.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
