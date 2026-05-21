"use client";

import Image from "next/image";
import Sticker from "@/components/ui/Sticker";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MagneticButton from "@/components/ui/MagneticButton";
import { services, techStack } from "@/data/about";

interface AboutProps {
  isLoaded: boolean;
}

export default function About({ isLoaded }: AboutProps) {
  return (
    <section id="about" className="border-b border-black/5 bg-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

        {/* Left Column: About Me (Sticky on large desktop only) */}
        <div className="lg:col-span-7 p-8 md:p-16 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-black/5 flex flex-col relative overflow-hidden xl:h-screen xl:sticky xl:top-0">
          {isLoaded && (
            <Sticker type="sparkle" className="w-12 h-12 top-10 right-10 opacity-20" delay={0.5} />
          )}

          <div className="flex flex-col h-full justify-between py-12 lg:py-0">
            <RevealOnScroll>
              <h3 className="text-sm font-mono text-gray-400 mb-8 flex items-center gap-3 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                ( About Me )
              </h3>

              <div className="space-y-8 relative z-10">
                {/* Profile Section with Image */}
                <div className="flex flex-col gap-5">
                  {/* Profile Image + Name Row */}
                  <div className="flex items-center gap-6">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 rounded-2xl overflow-hidden border-2 border-black/5 shadow-lg bg-gray-100 relative">
                        <Image
                          src="/image/profile.png"
                          alt="Pacharapon Ketkaew"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      {/* Decorative element */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        👋
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight">
                        Pacharapon Ketkaew
                      </span>
                      <span className="font-mono text-sm text-gray-600 mt-1">
                        aka &ldquo;Ball&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Introduction Text */}
                  <div className="font-thai text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-[1.5] font-light text-gray-800">
                    <p>
                      ผมเป็น Software Engineer ที่ชื่นชอบในการพัฒนาเว็บทั้ง <span className="font-serif italic text-black bg-blue-100 px-2">Frontend</span> และ <span className="font-serif italic text-black bg-purple-100 px-2">Backend</span> พร้อมทำตั้งแต่เขียนโค้ดไปจนถึง <span className="font-serif italic text-black bg-green-100 px-2">Deploy</span> และนำความรู้ต่างๆไม่ว่าจะเป็น <span className="font-serif italic text-black bg-yellow-100 px-2">AI</span> หรือ <span className="font-serif italic text-black bg-orange-100 px-2">IoT</span> มาปรับใช้
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5">
                  <h4 className="font-mono text-xs text-gray-400 mb-5 uppercase tracking-widest">What I Do</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {services.map((service, i) => (
                      <li key={i} className="flex items-center gap-3 group cursor-default">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-black/10 text-[10px] font-mono text-gray-400 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-heading text-base md:text-lg text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="mt-8 xl:mt-auto pt-6 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  Available for new opportunities
                </span>
              </div>
              {/* animated border wrapper */}
              <div className="relative inline-flex rounded-full p-[1.5px] overflow-hidden">
                {/* spinning conic gradient — visible only through the 1.5px gap */}
                <div
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite]"
                  style={{ background: "conic-gradient(from 0deg, transparent 0%, #2563EB 45%, #7c3aed 55%, transparent 80%)" }}
                />
                <MagneticButton
                  as="a"
                  href="/files/Resume.pdf"
                  target="_blank"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-white hover:bg-accent transition-colors duration-300"
                >
                  {/* shimmer sweep */}
                  <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  {/* sparkle icon */}
                  <svg className="relative z-10 h-3 w-3 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[20deg]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                  <span className="relative z-10">Download Resume</span>
                  {/* download arrow */}
                  <svg
                    className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-px"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </MagneticButton>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Right Column: Tech Stack (Scrolling) */}
        <div className="lg:col-span-5 bg-[#FAFAFA] p-8 md:p-16 lg:p-20 flex flex-col relative min-h-screen">
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <RevealOnScroll className="relative z-10 h-full flex flex-col justify-center">
            <h3 className="text-sm font-mono text-gray-400 mb-12 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              ( Tech Stack )
            </h3>

            <div className="space-y-12">
              {techStack.map((group, idx) => (
                <div key={idx} className="group">
                  <h4 className="font-mono text-[10px] text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-4">
                    {group.category}
                    <span className="h-px flex-1 bg-black/5 group-hover:bg-black/20 transition-colors"></span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white border border-black/5 shadow-sm rounded-lg text-xs md:text-sm font-mono text-gray-600 hover:border-black/30 hover:text-black hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <div className="p-6 bg-white border border-black/5 rounded-2xl shadow-sm">
                <p className="font-mono text-xs text-gray-400 mb-2">CURRENTLY LEARNING</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">GL</div>
                  <div>
                    <p className="font-bold text-sm">WebGL & Shaders</p>
                    <p className="text-xs text-gray-500">Advanced creative coding techniques</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
