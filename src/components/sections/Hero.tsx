"use client";

import { ChevronDown } from "lucide-react";
import Sticker from "@/components/ui/Sticker";
import ScrambleText from "@/components/ui/ScrambleText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroText from "@/components/ui/HeroText";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  return (
    <header className="relative min-h-screen flex flex-col justify-between pt-32 pb-6 px-4 md:px-12 border-b border-black/5 overflow-hidden">
      {/* TOP: Large Text (Left) */}
      <div className="z-10 w-full relative">
        {/* Stickers for Top Text */}
        {isLoaded && (
          <>
            <Sticker type="star" className="w-12 h-12 top-[-20px] left-[20%] md:left-[15%]" delay={1.2} />
            <Sticker type="smiley" className="w-16 h-16 top-[70%] right-[10%] md:right-[30%] !z-0" delay={1.5} />
          </>
        )}
        <h1 className="font-heading font-extrabold tracking-tighter leading-[0.8] text-primary select-none cursor-default relative z-10">
          <ScrambleText
            text="PACHARAPON"
            isLoaded={isLoaded}
            delay={0.5}
            duration={1.8}
            speed={0.4}
          />
        </h1>
      </div>

      {/* MIDDLE: Floating Elements (Pills & Deco) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full z-20 my-8 md:my-0 px-1 md:px-2">
        {/* Left Pill */}
        <RevealOnScroll className="delay-300">
          <div className="border border-black/80 rounded-full px-5 py-1.5 text-xs md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default inline-block">
            Software Engineer
          </div>
        </RevealOnScroll>

        {/* Center Arrow (Desktop Only) */}
        <RevealOnScroll className="hidden md:flex flex-col items-center gap-2 opacity-50 delay-400">
          <div className="h-12 w-[1px] bg-black"></div>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </RevealOnScroll>

        {/* Right Pill & Symbol */}
        <RevealOnScroll className="flex items-center gap-4 delay-500 mt-4 md:mt-0 self-end md:self-auto">
          <div className="border border-black/80 rounded-full px-5 py-1.5 text-xs md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
            2023 — 2025
          </div>
          <div className="text-2xl md:text-4xl font-light font-mono">+PK</div>
        </RevealOnScroll>
      </div>

      {/* BOTTOM: Text (Right) & Description (Left) */}
      <div className="flex flex-col md:flex-row items-end justify-between w-full z-10 relative">
        {/* Description & Buttons (Left Side) */}
        <RevealOnScroll className="order-2 md:order-1 max-w-md mb-2 md:mb-4 md:mr-8 delay-700 relative">
          {isLoaded && (
            <Sticker type="arrow" className="w-20 h-20 -top-24 right-0 rotate-45 hidden md:block" delay={1.8} />
          )}
          <p className="font-thai text-gray-600 text-sm md:text-base font-light leading-relaxed mb-6">
            สร้างสรรค์ประสบการณ์ดิจิทัลด้วยการผสมผสานระหว่าง Code และ Design
            เน้น Web Animation และ Interactive UI
          </p>
          <div className="flex gap-4">
            <MagneticButton
              as="a"
              href="#work"
              className="px-6 py-3 border border-black/20 rounded-full text-xs font-semibold uppercase tracking-wider text-primary hover:bg-black hover:text-white transition-all duration-300"
            >
              Projects
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="px-6 py-3 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              Contact
            </MagneticButton>
          </div>
        </RevealOnScroll>

        {/* Bottom Text (Right Side) */}
        <div className="order-1 md:order-2 w-full text-right mb-8 md:mb-0 relative">
          {isLoaded && (
            <>
              <Sticker type="sparkle" className="w-10 h-10 top-[-10px] left-[10%]" delay={1.4} />
              <Sticker type="blob" className="w-32 h-32 -z-10 bottom-[-20px] right-[-20px] opacity-50" delay={2.0} />
            </>
          )}
          <h1 className="font-heading font-extrabold tracking-tighter leading-[0.8] text-primary select-none cursor-default relative z-10">
            <HeroText text="KETKAEW" isLoaded={isLoaded} delay={0.8} />
          </h1>
        </div>
      </div>
    </header>
  );
}
