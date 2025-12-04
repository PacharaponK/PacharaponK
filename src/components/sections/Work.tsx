"use client";

import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProjectItem from "@/components/ui/ProjectItem";

import { projects, workSectionData } from "@/data/work";

export default function Work() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 border-b border-black/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-primary">
          <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
            {workSectionData.title}
          </AnimatedText>
          <AnimatedText animation="words" trigger="scroll" delay={0.1} stagger={0.08}>
            {workSectionData.subtitle}
          </AnimatedText>
          <span className="text-gray-400 text-2xl align-top font-mono">({String(projects.length).padStart(2, '0')})</span>
        </h2>
        <AnimatedText
          as="p"
          animation="words"
          trigger="scroll"
          className="font-thai text-gray-500 mt-4 md:mt-0 max-w-xs text-right text-xs"
        >
          {workSectionData.description}
        </AnimatedText>
      </div>

      <div className="flex flex-col">
        {projects.slice(0, 4).map((project, index) => (
          <RevealOnScroll key={project.number}>
            <ProjectItem {...project} isLast={index === 3} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className="mt-12 text-center">
        <Link
          href="/projects"
          className="hover-trigger inline-block text-sm font-mono border-b border-black/30 pb-1 text-primary hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
        >
          {workSectionData.viewAllText}
        </Link>
      </RevealOnScroll>
    </section>
  );
}
