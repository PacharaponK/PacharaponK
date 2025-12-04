"use client";

import { useEffect, useRef } from "react";

export default function GradientBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        requestAnimationFrame(() => {
          if (blobRef.current) {
            blobRef.current.style.left = `${e.clientX}px`;
            blobRef.current.style.top = `${e.clientY}px`;
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={blobRef} className="gradient-blob"></div>;
}
