"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Function to handle load completion
    const handleLoad = () => {
      setIsLoaded(true);
      setPercent(100);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isLoaded) {
      // If not loaded, increment slowly up to 90%
      interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 90) return prev; // Stall at 90%
          const increment = Math.random() * 5 + 1;
          return Math.min(prev + increment, 90);
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isLoaded]);

  useEffect(() => {
    if (percent === 100) {
      // Add a small delay before hiding the preloader to ensure 100% is seen
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [percent, onComplete]);

  return (
    <div
      id="preloader"
      className="fixed inset-0 bg-[#FAF9F6] z-[99999] flex flex-col justify-center items-center transition-transform duration-800"
      style={{ transform: percent === 100 ? "translateY(-100%)" : "translateY(0)" }}
    >
      <h1 className="font-heading text-4xl font-bold tracking-tighter mb-2 text-primary">PK.</h1>
      <div className="font-mono text-xs text-gray-500 mb-4 tracking-widest">LOADING AESTHETIC</div>
      <div className="font-mono text-xl text-primary">{Math.floor(percent)}%</div>
      <div className="loader-bar">
        <div className="loader-progress" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
