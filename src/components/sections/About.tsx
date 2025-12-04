"use client";

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

        {/* Left Column: About Me */}
        <div className="lg:col-span-7 p-8 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-black/5 flex flex-col justify-between relative overflow-hidden">
          {isLoaded && (
            <Sticker type="sparkle" className="w-12 h-12 top-10 right-10 opacity-20" delay={0.5} />
          )}

          <RevealOnScroll>
            <h3 className="text-sm font-mono text-gray-400 mb-12 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              ( About Me )
            </h3>

            <div className="space-y-12 relative z-10">
              <div className="font-thai text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light text-gray-800">
                <span className="font-heading font-bold text-primary block mb-4 text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Pacharapon Ketkaew
                </span>
                <p>
                  Creative Developer ที่หลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่น่าจดจำ
                  ผสมผสานระหว่าง <span className="font-serif italic text-black bg-yellow-100 px-2">Design</span> และ <span className="font-serif italic text-black bg-blue-100 px-2">Technology</span> อย่างลงตัว
                </p>
              </div>

              <div className="pt-12 border-t border-black/5">
                <h4 className="font-mono text-xs text-gray-400 mb-8 uppercase tracking-widest">What I Do</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {services.map((service, i) => (
                    <li key={i} className="flex items-center gap-4 group cursor-default">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full border border-black/10 text-[10px] font-mono text-gray-400 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                        {i + 1}
                      </span>
                      <span className="font-heading text-lg md:text-xl text-gray-600 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-20 pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                Available for new opportunities
              </span>
            </div>
            <MagneticButton
              as="a"
              href="/resume.pdf"
              target="_blank"
              className="text-xs font-mono underline decoration-black/30 hover:decoration-black transition-all"
            >
              DOWNLOAD RESUME
            </MagneticButton>
          </RevealOnScroll>
        </div>

        {/* Right Column: Tech Stack */}
        <div className="lg:col-span-5 bg-[#FAFAFA] p-8 md:p-16 lg:p-20 flex flex-col relative">
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
