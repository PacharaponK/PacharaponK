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
import { WebGLShader } from "@/components/ui/web-gl-shader";
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
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : project.status === "DEVELOPMENT"
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
        : "bg-white/5 text-white/30 border-white/10";

  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        onRef(el);
      }}
      className="scrolly-item flex flex-col justify-center
                 px-8 md:px-14 lg:px-20
                 py-16 lg:py-0 lg:min-h-screen
                 border-b lg:border-b-0 border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="space-y-6 lg:space-y-8 max-w-xl"
      >
        {/* Category + number */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-white/40">{project.number}</span>
          <span className="h-px w-8 bg-white/20 flex-shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 font-bold">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[0.95]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-thai text-base md:text-lg text-white/70 leading-relaxed">
          {project.fullDescription || project.description}
        </p>

        {/* Tech stack */}
        {project.tech && (
          <div className="flex flex-wrap gap-2">
            {project.tech.split(", ").map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-mono text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          {project.year && (
            <span className="font-mono text-xs text-white/40">{project.year}</span>
          )}
          {project.role && (
            <>
              <span className="h-3 w-px bg-white/20" />
              {project.role.split(", ").map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <span className="font-mono text-xs text-white/40">{r}</span>
                </span>
              ))}
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
            <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/60 border-b border-white/20 pb-px group-hover:border-white group-hover:text-white transition-colors">
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
      <div className="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Main image container */}
        <div className="relative w-[85%] max-w-2xl z-10">
          <div className="relative aspect-[4/3] xl:aspect-[16/11] w-full rounded-[2rem] overflow-hidden bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10 flex items-center justify-center p-2 group"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={active.imageUrl}
                    alt={active.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                </div>

                {/* Year badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className="absolute bottom-6 left-6"
                >
                  <div className="px-5 py-2 bg-black/60 backdrop-blur-md rounded-full text-xs font-mono text-white/80 shadow-sm border border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                    {active.year ?? "—"}
                  </div>
                </motion.div>

                {/* Category badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="absolute top-6 right-6"
                >
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono text-white/60 uppercase tracking-widest border border-white/10">
                    {active.category}
                  </span>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicator below image */}
          <div className="mt-8 flex items-center justify-between px-2">
            <div className="flex gap-2">
              {displayProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onDotClick(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeProject ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-white/40">
              {String(activeProject + 1).padStart(2, "0")} / {String(DISPLAY_COUNT).padStart(2, "0")}
            </span>
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
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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

    const navEl = document.querySelector<HTMLElement>(".nav-glass");

    const hideNav = () => gsap.to(navEl, { y: "-150%", duration: 0.4, ease: "power2.inOut" });
    const showNav = () => gsap.to(navEl, { y: "0%", duration: 0.4, ease: "power2.inOut" });

    const enterDark = () => { document.body.style.backgroundColor = "#0d0d0f"; };
    const exitDark  = () => { document.body.style.backgroundColor = "#FAF9F6"; };

    const navTrigger = navEl
      ? ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80px",
        end: "bottom top",
        onEnter: () => { hideNav(); enterDark(); },
        onLeave: () => { showNav(); exitDark(); },
        onEnterBack: () => { hideNav(); enterDark(); },
        onLeaveBack: () => { showNav(); exitDark(); },
      })
      : null;

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
      navTrigger?.kill();
      if (navEl) gsap.set(navEl, { clearProps: "transform" });
      triggers.forEach((t) => t?.kill());
      document.body.style.backgroundColor = "";
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
      className="relative border-b border-white/10 bg-[#0d0d0f]"
      ref={sectionRef}
    >
      {/* ── WebGL shader background — sticky so it fills the viewport as you scroll ── */}
      <div className="sticky top-0 h-0 pointer-events-none">
        <WebGLShader className="absolute top-0 left-0 w-full h-screen block" />
        <div className="absolute top-0 left-0 w-full h-screen bg-black/25 pointer-events-none" />
      </div>

      {/* ── Section header ── */}
      <div className="relative z-10 pt-24 px-6 md:px-12 mb-6 lg:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white">
            <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
              {workSectionData.title}
            </AnimatedText>
            <AnimatedText animation="words" trigger="scroll" delay={0.1} stagger={0.08}>
              {workSectionData.subtitle}
            </AnimatedText>
            <span className="text-white/40 text-2xl align-top font-mono ml-4">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </h2>
          <AnimatedText
            as="p"
            animation="words"
            trigger="scroll"
            className="font-thai text-white/50 mt-4 md:mt-0 max-w-xs text-right text-xs"
          >
            {workSectionData.description}
          </AnimatedText>
        </div>
      </div>

      {/* ── Scrollytelling body ── */}
      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Desktop sticky image (left) */}
        <StickyImage
          activeProject={activeProject}
          variant="desktop"
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
      <div className="relative z-10 py-24 text-center">
        <RevealOnScroll>
          <Link
            href="/projects"
            className="hover-trigger inline-block text-sm font-mono border-b border-white/30 pb-1 text-white/70 hover:text-white hover:border-white transition-colors"
          >
            {workSectionData.viewAllText}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
