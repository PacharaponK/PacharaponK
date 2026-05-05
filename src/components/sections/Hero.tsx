"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Sticker from "@/components/ui/Sticker";
import ScrambleText from "@/components/ui/ScrambleText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroText from "@/components/ui/HeroText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll Parallax
      const trigger = {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      };

      gsap.to(topRef.current, { yPercent: -40, ease: "none", scrollTrigger: trigger });
      gsap.to(middleRef.current, { yPercent: -15, ease: "none", scrollTrigger: trigger });
      gsap.to(bottomRef.current, { yPercent: -25, ease: "none", scrollTrigger: trigger });

      // Mouse Parallax for extra wow factor
      const xToTop = gsap.quickTo(topRef.current, "x", { duration: 0.8, ease: "power3" });
      const yToTop = gsap.quickTo(topRef.current, "y", { duration: 0.8, ease: "power3" });

      const xToMiddle = gsap.quickTo(middleRef.current, "x", { duration: 1.2, ease: "power3" });
      const yToMiddle = gsap.quickTo(middleRef.current, "y", { duration: 1.2, ease: "power3" });

      const xToBottom = gsap.quickTo(bottomRef.current, "x", { duration: 1.0, ease: "power3" });
      const yToBottom = gsap.quickTo(bottomRef.current, "y", { duration: 1.0, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate relative position (-1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        xToTop(xPos * -30);
        yToTop(yPos * -30);

        xToMiddle(xPos * 20);
        yToMiddle(yPos * 20);

        xToBottom(xPos * -15);
        yToBottom(yPos * -15);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={heroRef} className="relative min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-6 px-4 md:px-12 border-b border-black/5 overflow-visible">
      {/* TOP: Large Text (Left) */}
      <div ref={topRef} className="z-10 w-full relative">
        {isLoaded && (
          <>
            <Sticker type="star" className="w-10 h-10 md:w-12 md:h-12 top-[-16px] left-[20%] md:left-[15%]" delay={1.2} />
            {/* Hidden on mobile — overlaps text on small screens */}
            <Sticker type="smiley" className="hidden md:block w-16 h-16 top-[70%] right-[30%] !z-0" delay={1.5} />
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

      {/* MIDDLE: Pills & Deco — row on all sizes */}
      <div ref={middleRef} className="flex flex-row justify-between items-center w-full z-20 py-6 md:py-0">
        {/* Left Pill */}
        <RevealOnScroll className="delay-300">
          <div className="border border-black/80 rounded-full px-4 py-1 md:px-5 md:py-1.5 text-[10px] md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default inline-block">
            Software Engineer
          </div>
        </RevealOnScroll>

        {/* Center Arrow (Desktop Only) */}
        <RevealOnScroll className="hidden md:flex flex-col items-center gap-2 opacity-50 delay-400">
          <div className="h-12 w-[1px] bg-black"></div>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </RevealOnScroll>

        {/* Right Pill & Symbol */}
        <RevealOnScroll className="flex items-center gap-2 md:gap-4 delay-500">
          <div className="border border-black/80 rounded-full px-4 py-1 md:px-5 md:py-1.5 text-[10px] md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
            2023 — 2025
          </div>
          <div className="text-xl md:text-4xl font-light font-mono">+PK</div>
        </RevealOnScroll>
      </div>

      {/* BOTTOM: Text (Right) & Description (Left) */}
      <div ref={bottomRef} className="flex flex-col md:flex-row items-start md:items-end justify-between w-full z-10 relative">
        {/* Description & Buttons (Left Side) */}
        <RevealOnScroll className="order-2 md:order-1 w-full md:max-w-md mt-4 md:mt-0 md:mb-4 md:mr-8 delay-700 relative">
          {isLoaded && (
            <Sticker type="arrow" className="w-20 h-20 -top-24 right-0 rotate-45 hidden md:block" delay={1.8} />
          )}
          <p className="font-thai text-gray-600 text-sm md:text-base font-light leading-relaxed mb-4 md:mb-6">
            พัฒนาระบบดิจิทัลด้วย Software Engineering และ Fullstack Development
            การเชื่อมโยง AI, IoT และ Web Technology
            สร้างโซลูชันที่ตอบโจทย์ ใช้งานได้จริง และปลอดภัย
          </p>
          <div className="flex gap-2 md:gap-3">
            <MagneticButton
              as="a"
              href="#work"
              className="flex-1 md:flex-none text-center px-6 py-3 border border-black/20 rounded-full text-xs font-semibold uppercase tracking-wider text-primary hover:bg-black hover:text-white transition-all duration-300"
            >
              Projects
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="flex-1 md:flex-none text-center px-6 py-3 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              Contact
            </MagneticButton>
          </div>
        </RevealOnScroll>

        {/* Bottom Text (Right Side) */}
        <div className="order-1 md:order-2 w-full text-right mb-0 md:mb-0 relative">
          {isLoaded && (
            <>
              <Sticker type="sparkle" className="w-10 h-10 top-[-10px] left-[10%]" delay={1.4} />
              {/* Hidden on mobile — clips outside viewport edge */}
              <Sticker type="blob" className="hidden md:block w-32 h-32 -z-10 bottom-[-20px] right-[-20px] opacity-50" delay={2.0} />
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
