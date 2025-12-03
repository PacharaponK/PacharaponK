"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="preloader"
      className="fixed inset-0 bg-[#FAF9F6] z-[99999] flex flex-col justify-center items-center transition-transform duration-800"
      style={{ transform: percent === 100 ? "translateY(-100%)" : "translateY(0)" }}
    >
      <h1 className="font-heading text-4xl font-bold tracking-tighter mb-2 text-primary">PK.</h1>
      <div className="font-mono text-xs text-gray-500 mb-4 tracking-widest">LOADING AESTHETIC</div>
      <div className="font-mono text-xl text-primary">{percent}%</div>
      <div className="loader-bar">
        <div className="loader-progress" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
