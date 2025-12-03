"use client";

import { useState } from "react";
import { Copy, ArrowUpRight, ArrowDownRight, ChevronDown, Menu } from "lucide-react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GradientBlob from "@/components/GradientBlob";
import LocalTime from "@/components/LocalTime";
import HeroText from "@/components/HeroText";
import ScrambleText from "@/components/ScrambleText";
import RevealOnScroll from "@/components/RevealOnScroll";
import MagneticButton from "@/components/MagneticButton";
import ProjectItem from "@/components/ProjectItem";
import AnimatedText from "@/components/AnimatedText";

const projects = [
  {
    number: "01",
    category: "E-COMMERCE",
    title: "Neon Market",
    description: "Design & Development",
    tech: "Next.js, Stripe, Tailwind",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Neon+Market",
  },
  {
    number: "02",
    category: "FINTECH",
    title: "CoinDash",
    description: "Frontend Architecture",
    tech: "React, D3.js, WebSockets",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=CoinDash",
  },
  {
    number: "03",
    category: "AGENCY",
    title: "Vertex Studio",
    description: "Creative Development",
    tech: "WebGL, Three.js, GSAP",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Vertex",
  },
  {
    number: "04",
    category: "EXPERIMENTAL",
    title: "Audio Viz",
    description: "Personal Project",
    tech: "Canvas API, Web Audio",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Audio+Viz",
  },
];

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  const copyEmail = () => {
    const email = "hello@pacharapon.dev";
    navigator.clipboard.writeText(email);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Noise & Background */}
      <div className="noise"></div>
      <GradientBlob />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <nav className="nav-glass fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-50 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between rounded-full">
        <MagneticButton
          as="a"
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tighter text-primary hover:text-accent transition-colors"
        >
          PK.
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-6 font-mono text-xs text-secondary">
            <a href="#work" className="hover-trigger hover:text-primary transition-colors">Work</a>
            <a href="#about" className="hover-trigger hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover-trigger hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="h-4 w-px bg-black/10"></div>

          <div className="flex items-center gap-2 text-xs text-secondary">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono"><LocalTime /></span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <MagneticButton className="md:hidden text-primary p-1">
          <Menu className="w-5 h-5" />
        </MagneticButton>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-between pt-32 pb-6 px-4 md:px-12 border-b border-black/5 overflow-hidden">
        {/* TOP: Large Text (Left) */}
        <div className="z-10 w-full">
          <h1 className="font-heading font-extrabold tracking-tighter leading-[0.8] text-primary select-none cursor-default">
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
              Full Stack Developer
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
              2024 — 2025
            </div>
            <div className="text-2xl md:text-4xl font-light font-mono">+PK</div>
          </RevealOnScroll>
        </div>

        {/* BOTTOM: Text (Right) & Description (Left) */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full z-10 relative">
          {/* Description & Buttons (Left Side) */}
          <RevealOnScroll className="order-2 md:order-1 max-w-md mb-2 md:mb-4 md:mr-8 delay-700">
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
          <div className="order-1 md:order-2 w-full text-right mb-8 md:mb-0">
            <h1 className="font-heading font-extrabold tracking-tighter leading-[0.8] text-primary select-none cursor-default">
              <HeroText text="KETKAEW" isLoaded={isLoaded} delay={0.8} />
            </h1>
          </div>
        </div>
      </header>

      {/* Marquee Text */}
      <div className="w-full bg-[#1A1A1A] text-[#FAF9F6] py-4 overflow-hidden border-b border-black/5">
        <div className="whitespace-nowrap animate-marquee font-mono font-bold text-lg md:text-xl flex gap-12">
          <span>CREATIVE DEVELOPER</span>
          <span>✦</span>
          <span>UI/UX DESIGN</span>
          <span>✦</span>
          <span>FRONTEND ARCHITECTURE</span>
          <span>✦</span>
          <span>REACT / NEXT.JS</span>
          <span>✦</span>
          <span>WEBGL EXPERIMENTS</span>
          <span>✦</span>
          <span>BASED IN THAILAND</span>
          <span>✦</span>
          <span>CREATIVE DEVELOPER</span>
          <span>✦</span>
          <span>UI/UX DESIGN</span>
          <span>✦</span>
          <span>FRONTEND ARCHITECTURE</span>
          <span>✦</span>
        </div>
      </div>

      {/* Selected Work Section */}
      <section id="work" className="py-24 px-6 md:px-12 border-b border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-primary">
            <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
              SELECTED
            </AnimatedText>
            <AnimatedText animation="words" trigger="scroll" delay={0.1} stagger={0.08}>
              WORK
            </AnimatedText>
            <span className="text-gray-400 text-2xl align-top font-mono">(04)</span>
          </h2>
          <AnimatedText
            as="p"
            animation="words"
            trigger="scroll"
            className="font-thai text-gray-500 mt-4 md:mt-0 max-w-xs text-right text-xs"
          >
            ผลงานที่คัดสรรมาเพื่อแสดงศักยภาพด้านการออกแบบและพัฒนา
          </AnimatedText>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.number}>
              <ProjectItem {...project} isLast={index === projects.length - 1} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12 text-center">
          <a
            href="#"
            className="hover-trigger inline-block text-sm font-mono border-b border-black/30 pb-1 text-primary hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
          >
            VIEW ALL ARCHIVES -&gt;
          </a>
        </RevealOnScroll>
      </section>

      {/* Services / Stack Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black/5">
        <RevealOnScroll className="p-12 border-b md:border-b-0 md:border-r border-black/5">
          <h3 className="text-xl font-mono text-gray-400 mb-8">( ABOUT ME )</h3>
          <p className="font-thai text-lg md:text-2xl leading-relaxed text-primary">
            ผมคือ <span className="font-heading text-black font-bold">Pacharapon Ketkaew</span>{" "}
            นักพัฒนาที่หลงใหลในรายละเอียดเล็กๆ น้อยๆ
            ผมเชื่อว่าเว็บไซต์ที่ดีไม่ใช่แค่ใช้งานได้
            แต่ต้องมอบความรู้สึกที่ดีให้กับผู้ใช้
            ผมเชี่ยวชาญในการเปลี่ยนดีไซน์ที่ซับซ้อนให้กลายเป็นโค้ดที่มีประสิทธิภาพ
          </p>
          <div className="mt-8 flex gap-4">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mt-2"></div>
            <p className="text-sm text-gray-500">
              Available for new opportunities
              <br />
              Remote / Hybrid
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll className="p-12">
          <h3 className="text-xl font-mono text-gray-400 mb-8">( TECH STACK )</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-bold text-primary">Development</h4>
              <ul className="text-gray-600 space-y-2 font-mono text-sm">
                <li>JavaScript (ES6+)</li>
                <li>TypeScript</li>
                <li>React / Next.js</li>
                <li>Node.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-primary">Design & Tools</h4>
              <ul className="text-gray-600 space-y-2 font-mono text-sm">
                <li>Figma</li>
                <li>Adobe XD</li>
                <li>Blender (Basic)</li>
                <li>Git / Github</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer / Contact */}
      <footer
        id="contact"
        className="min-h-[80vh] flex flex-col justify-between p-6 md:p-12 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ArrowDownRight className="w-48 h-48 text-black" />
        </div>

        <div className="mt-12">
          <AnimatedText
            as="p"
            animation="chars"
            trigger="scroll"
            className="font-mono text-[#2563EB] mb-4"
            stagger={0.03}
          >
            {"WHAT'S NEXT?"}
          </AnimatedText>
          <h2 className="font-heading text-5xl md:text-8xl font-bold tracking-tighter max-w-4xl text-primary">
            <AnimatedText animation="chars" trigger="scroll" delay={0.2} stagger={0.02}>
              {"LET'S WORK"}
            </AnimatedText>
            <AnimatedText animation="chars" trigger="scroll" delay={0.4} stagger={0.02}>
              TOGETHER
            </AnimatedText>
          </h2>
        </div>

        <RevealOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 items-end">
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={copyEmail}
              className="hover-trigger group flex items-center gap-4 text-2xl md:text-4xl text-primary hover:text-gray-500 transition-colors text-left w-full"
            >
              <span className="border-b border-black/30 pb-2">
                hello@pacharapon.dev
              </span>
              <Copy className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p
              className={`text-[#2563EB] text-sm mt-2 transition-opacity ${copyFeedback ? "opacity-100" : "opacity-0"
                }`}
            >
              Copied to clipboard!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-gray-400 text-xs uppercase">Socials</h4>
            <div className="flex flex-col gap-2 text-lg text-primary">
              <a
                href="#"
                className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
              >
                LinkedIn <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
              >
                GitHub <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
              >
                Instagram <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        <div className="flex justify-between items-end border-t border-black/10 pt-8 mt-12 text-gray-500 font-mono text-xs">
          <p>&copy; 2024 Pacharapon Ketkaew.</p>
          <p>Designed & Built by PK.</p>
        </div>
      </footer>
    </>
  );
}
