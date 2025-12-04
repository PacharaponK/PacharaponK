"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProjectItem from "@/components/ui/ProjectItem";

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

export default function Work() {
  return (
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
  );
}
