"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Sticker from "@/components/ui/Sticker";
import ScrambleText from "@/components/ui/ScrambleText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";
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
  const clotheslineRef = useRef<HTMLDivElement>(null);

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
      // clotheslineRef inherits middleRef's parallax — no separate scroll tween needed

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isLoaded || !clotheslineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        clotheslineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out", delay: 1.6 }
      );

      const photos = clotheslineRef.current!.querySelectorAll<HTMLElement>(".hanging-photo");
      photos.forEach((el, i) => {
        // Scatter in: scale up from slightly smaller, fade in
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.75, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.5)", delay: 1.9 + i * 0.14 }
        );
        // Independent floating — alternating up/down phase
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 8,
          duration: 3.2 + i * 0.45,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.8 + i * 0.3,
        });
      });
    }, clotheslineRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <header ref={heroRef} className="relative h-screen flex flex-col justify-between pt-16 md:pt-20 pb-10 md:pb-14 px-4 md:px-12 border-b border-black/5 overflow-hidden">
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

      {/* MIDDLE: Pills + Clothesline — single flex child so justify-between keeps gaps equal */}
      <div ref={middleRef} className="flex flex-col w-full z-10">

        {/* Pills row */}
        <div className="flex flex-row justify-between items-center w-full py-6 md:pb-5 md:pt-0">
          <RevealOnScroll className="delay-300">
            <div className="border border-black/80 rounded-full px-4 py-1 md:px-5 md:py-1.5 text-[10px] md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default inline-block">
              Software Engineer
            </div>
          </RevealOnScroll>
          <RevealOnScroll className="hidden md:flex flex-col items-center gap-2 opacity-50 delay-400">
            <div className="h-12 w-[1px] bg-black" />
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </RevealOnScroll>
          <RevealOnScroll className="flex items-center gap-2 md:gap-4 delay-500">
            <div className="border border-black/80 rounded-full px-4 py-1 md:px-5 md:py-1.5 text-[10px] md:text-sm font-mono uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
              2023 — 2025
            </div>
            <div className="text-xl md:text-4xl font-light font-mono">+PK</div>
          </RevealOnScroll>
        </div>

        {/* Scattered polaroids — desktop only */}
        <div
          ref={clotheslineRef}
          className="relative w-full hidden md:block pointer-events-none select-none"
          style={{ opacity: 0, height: "14vw", marginTop: "-2vw" }}
        >
          {([
            { src: "/image/profiles/DSC04214.JPEG", caption: "2024", left: "4%",   top: "3vw",   rot: -6 },
            { src: "/image/profiles/IMG_0348.JPEG", caption: "2024", left: "21%",  top: "0.4vw", rot: 4  },
            { src: "/image/profiles/IMG_5548.JPEG", caption: "2025", left: "38%",  top: "2.8vw", rot: -3 },
            { src: "/image/profiles/IMG_7578.JPEG", caption: "2025", left: "55%",  top: "0.6vw", rot: 2  },
            { src: "/image/profiles/profile.png",   caption: "2025", left: "72%",  top: "3.2vw", rot: -5 },
            { src: "/image/profiles/IMG_0017.JPEG", caption: "2024", left: "88%",  top: "0.5vw", rot: 4  },
          ]).map((photo, i) => (
            <div
              key={i}
              className="hanging-photo absolute"
              style={{
                left: photo.left,
                top: photo.top,
                transform: `rotate(${photo.rot}deg)`,
                transformOrigin: "center center",
              }}
            >
              <div className="bg-white shadow-xl" style={{ width: "7.5vw", padding: "0.45vw 0.45vw 2.2vw" }}>
                <Image
                  src={photo.src}
                  alt={`Photo ${i + 1}`}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover object-top"
                  draggable={false}
                />
                <p
                  className="text-center font-mono text-gray-400 uppercase"
                  style={{ fontSize: "0.5vw", letterSpacing: "0.2em", marginTop: "0.3vw" }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

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
            <ScrambleText
                text="KETKAEW"
                isLoaded={isLoaded}
                delay={0.8}
                duration={1.8}
                speed={0.4}
              />
          </h1>
        </div>
      </div>
    </header>
  );
}
