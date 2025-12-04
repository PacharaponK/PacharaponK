"use client";

import { useEffect, useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: string | number;
}

export default function RevealOnScroll({ children, className = "", delay = "" }: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const style = typeof delay === "number" ? { transitionDelay: `${delay}s` } : {};
  const delayClass = typeof delay === "string" ? delay : "";

  return (
    <div ref={elementRef} className={`reveal-up ${delayClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
