"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const hideCursor = () => cursor.removeAttribute("data-active");

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        hideCursor();
        return;
      }

      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.toggleAttribute("data-active", true);
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", moveCursor, { passive: true });
    root.addEventListener("pointerleave", hideCursor);
    window.addEventListener("pointercancel", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      root.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("pointercancel", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  return <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true" />;
}
