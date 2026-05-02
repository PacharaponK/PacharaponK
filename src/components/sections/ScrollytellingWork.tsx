"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { projects, workSectionData, type Project } from "@/data/work";

const DISPLAY_COUNT = 5;
const displayProjects = projects.slice(0, DISPLAY_COUNT);

// ─── Project card with per-item entrance animation ───────────────────────────

function ProjectCard({
  project,
  onRef,
}: {
  project: Project;
  onRef: (el: HTMLDivElement | null) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-8% 0px" });

  const statusColor =
    project.status === "Production"
      ? "bg-green-50 text-green-600 border-green-100"
      : project.status === "DEVELOPMENT"
        ? "bg-amber-50 text-amber-600 border-amber-100"
        : "bg-gray-50 text-gray-400 border-gray-100";

  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        onRef(el);
      }}
      className="scrolly-item flex flex-col justify-center
                 px-8 md:px-14 lg:px-20
                 py-16 lg:py-0 lg:min-h-screen
                 border-b lg:border-b-0 border-black/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="space-y-6 lg:space-y-8 max-w-xl"
      >
        {/* Category + number */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-gray-400">{project.number}</span>
          <span className="h-px w-8 bg-gray-200 flex-shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary leading-[0.95]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-thai text-base md:text-lg text-gray-600 leading-relaxed">
          {project.fullDescription || project.description}
        </p>

        {/* Tech stack */}
        {project.tech && (
          <div className="flex flex-wrap gap-2">
            {project.tech.split(", ").map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-gray-50 border border-black/5 rounded-lg text-[11px] font-mono text-gray-500"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          {project.year && (
            <span className="font-mono text-xs text-gray-400">{project.year}</span>
          )}
          {project.role && (
            <>
              <span className="h-3 w-px bg-gray-200" />
              <span className="font-mono text-xs text-gray-400">{project.role}</span>
            </>
          )}
          {project.status && (
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${statusColor}`}
            >
              {project.status}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest border-b border-black/10 pb-px group-hover:border-black transition-colors">
              View Project Details
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Shared sticky image (desktop left / mobile top) ─────────────────────────

function StickyImage({
  activeProject,
  variant,
  onDotClick,
}: {
  activeProject: number;
  variant: "desktop" | "mobile";
  onDotClick: (i: number) => void;
}) {
  const active = displayProjects[activeProject];
  const progress = ((activeProject + 1) / DISPLAY_COUNT) * 100;

  if (variant === "desktop") {
    return (
      <div className="hidden lg:block w-1/2 h-screen sticky top-0 overflow-hidden bg-gray-50">
        {/* Main image */}
        <div className="absolute inset-0 flex items-center justify-center p-10 xl:p-14">
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 bg-white flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 p-8 flex items-center justify-center bg-gray-50/50"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={active.imageUrl}
                    alt={active.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
                {/* Subtle vignette instead of heavy dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-[2rem]" />

                {/* Year badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6"
                >
                  <span className="px-4 py-1.5 bg-black/85 backdrop-blur-md rounded-full text-xs font-mono text-white/95 shadow-lg border border-white/10">
                    {active.year ?? "—"}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  // ── Mobile variant ──
  return (
    <div
      className="lg:hidden sticky top-0 z-20 overflow-hidden bg-[#0d0d0f]"
      style={{ height: "46vh" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center p-6"
        >
          <div className="relative w-full h-full max-w-sm">
            <Image
              src={active.imageUrl}
              alt={active.title}
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
          {/* Cinematic gradient tailored for dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/40 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Chapter tag */}
      <div className="absolute top-5 left-5 z-10">
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90 border border-white/10">
          {active.number} — {active.category}
        </span>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-10 left-5 right-12 z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeProject}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-md"
          >
            {active.title}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-10">
        <motion.div
          className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(var(--primary),0.5)]"
          animate={{ scaleX: progress / 100 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ScrollytellingWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = itemRefs.current.map((el, index) => {
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => setActiveProject(index),
        onEnterBack: () => setActiveProject(index),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  const scrollToProject = (index: number) => {
    const el = itemRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="work"
      className="relative border-b border-black/5 bg-white"
      ref={sectionRef}
    >
      {/* ── Section header ── */}
      <div className="pt-24 px-6 md:px-12 mb-12 lg:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-primary">
            <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
              {workSectionData.title}
            </AnimatedText>
            <AnimatedText animation="words" trigger="scroll" delay={0.1} stagger={0.08}>
              {workSectionData.subtitle}
            </AnimatedText>
            <span className="text-gray-400 text-2xl align-top font-mono ml-4">
              ({String(projects.length).padStart(2, "0")})
            </span>
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
      </div>

      {/* ── Scrollytelling body ── */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Desktop sticky image (left) */}
        <StickyImage
          activeProject={activeProject}
          variant="desktop"
          onDotClick={scrollToProject}
        />

        {/* Mobile sticky image (top) */}
        <StickyImage
          activeProject={activeProject}
          variant="mobile"
          onDotClick={scrollToProject}
        />

        {/* Project items — shared for both layouts */}
        <div className="w-full lg:w-1/2">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onRef={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Footer link ── */}
      <div className="py-24 text-center">
        <RevealOnScroll>
          <Link
            href="/projects"
            className="hover-trigger inline-block text-sm font-mono border-b border-black/30 pb-1 text-primary hover:text-black/60 hover:border-black/60 transition-colors"
          >
            {workSectionData.viewAllText}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
