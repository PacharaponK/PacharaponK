"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { projects } from "@/data/work";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientBlob from "@/components/ui/GradientBlob";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "next" ? 300 : -300, behavior: "smooth" });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <>
        <div className="noise"></div>
        <GradientBlob />
        <CustomCursor />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-gray-500 font-thai mb-8">ไม่พบโปรเจคที่คุณต้องการ</p>
            <Link
              href="/projects"
              className="hover-trigger inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-mono text-sm"
            >
              ← Back to Projects
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Background Effects */}
      <div className="noise"></div>
      <GradientBlob />
      <CustomCursor />

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <Link
              href="/projects"
              className="hover-trigger group flex items-center gap-2 text-primary font-mono text-sm"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="border-b border-transparent group-hover:border-primary transition-colors">
                All Projects
              </span>
            </Link>
            <span className="font-mono text-xs text-gray-400">
              {project.number} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </header>

        {/* Project Content */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-[#2563EB] text-xs tracking-wider">
                  {project.number} / {project.category}
                </span>
                {project.status && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${project.status === "Production"
                        ? "bg-green-100 text-green-700"
                        : project.status === "DEVELOPMENT"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-primary mb-6">
                {project.title}
              </h1>
              <p className="text-gray-500 text-sm mb-4">{project.description}</p>
              {project.fullDescription && project.fullDescription !== "=" && (
                <p className="font-thai text-gray-600 text-base leading-relaxed mb-8 max-w-3xl">
                  {project.fullDescription}
                </p>
              )}
            </RevealOnScroll>

            {/* Project Meta Info */}
            <RevealOnScroll className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-black/[0.02] rounded-xl border border-black/5">
                {project.year && (
                  <div>
                    <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1">Year</h3>
                    <p className="font-mono text-sm text-primary">{project.year}</p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1">Role</h3>
                    <p className="font-mono text-sm text-primary">{project.role}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1">Category</h3>
                  <p className="font-mono text-sm text-primary">{project.category}</p>
                </div>
                {project.status && (
                  <div>
                    <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1">Status</h3>
                    <p className="font-mono text-sm text-primary">{project.status}</p>
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* Demo Video */}
            {project.videoUrl && (
              <RevealOnScroll>
                <h2 className="font-mono text-xs text-gray-400 mb-4 tracking-wider">DEMO VIDEO</h2>
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-black/5">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </RevealOnScroll>
            )}

            {/* Project Images */}
            {project.images && project.images.length > 0 ? (
              <RevealOnScroll className="mt-8">
                <div className={`grid gap-4 ${project.images.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                  {project.images.map((src, i) => (
                    <div 
                      key={i} 
                      className="hover-trigger relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-black/5 cursor-zoom-in group transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                      onClick={() => setActiveImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            ) : (
              <RevealOnScroll className="mt-8">
                <div
                  className="hover-trigger w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-black/5 cursor-zoom-in transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    backgroundImage: `url('${project.imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => setActiveImage(project.imageUrl)}
                />
              </RevealOnScroll>
            )}

            {/* Atmosphere Gallery */}
            {project.atmosphere && project.atmosphere.length > 0 && (
              <RevealOnScroll className="mt-16">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-mono text-xs text-gray-400 tracking-wider">ATMOSPHERE</h2>
                    <p className="text-gray-400 text-xs mt-0.5 font-thai">ภาพบรรยากาศจากงาน</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollCarousel("prev")}
                      className="hover-trigger w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => scrollCarousel("next")}
                      className="hover-trigger w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>
                <div ref={carouselRef} className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                  {project.atmosphere.map((src, i) => (
                    <div
                      key={i}
                      className="hover-trigger relative flex-none w-72 aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-black/5 snap-start cursor-zoom-in"
                      onClick={() => setActiveImage(src)}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} atmosphere ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="288px"
                      />
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            )}

            {/* Tech Stack */}
            {project.tech && (
              <RevealOnScroll className="mt-12">
                <h2 className="font-mono text-xs text-gray-400 mb-4 tracking-wider">TECH STACK</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(", ").filter(Boolean).map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </RevealOnScroll>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <RevealOnScroll className="mt-12">
                <h2 className="font-mono text-xs text-gray-400 mb-4 tracking-wider">FEATURES</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-black/[0.02] rounded-lg border border-black/5"
                    >
                      <span className="text-[#2563EB] font-mono text-xs mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-thai text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            )}

            {/* Documents */}
            {project.documents && project.documents.length > 0 && (
              <RevealOnScroll className="mt-12">
                <h2 className="font-mono text-xs text-gray-400 mb-4 tracking-wider">DOCUMENTS</h2>
                <div className="flex flex-wrap gap-3">
                  {project.documents.map((doc) => (
                    <a
                      key={doc.path}
                      href={doc.path}
                      download
                      className="hover-trigger inline-flex items-center gap-2 px-5 py-2.5 bg-black/[0.04] border border-black/10 text-primary rounded-full font-mono text-sm hover:bg-black/10 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      <span>{doc.label}</span>
                    </a>
                  ))}
                </div>
              </RevealOnScroll>
            )}

            {/* Links */}
            {project.links && (project.links.live || project.links.github || project.links.facebook) && (
              <RevealOnScroll className="mt-12">
                <h2 className="font-mono text-xs text-gray-400 mb-4 tracking-wider">LINKS</h2>
                <div className="flex flex-wrap gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-trigger inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-mono text-sm hover:bg-[#2563EB] transition-colors"
                    >
                      <span>View Live Site</span>
                      <span>↗</span>
                    </a>
                  )}
                  {project.links.facebook && (
                    <a
                      href={project.links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-trigger inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full font-mono text-sm hover:bg-[#1565d8] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook Page</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-trigger inline-flex items-center gap-2 px-6 py-3 bg-black/5 text-primary rounded-full font-mono text-sm hover:bg-black/10 transition-colors"
                    >
                      <span>View on GitHub</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </RevealOnScroll>
            )}

            {/* Back Link */}
            <div className="mt-16 pt-8 border-t border-black/5">
              <Link
                href="/projects"
                className="hover-trigger inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-[#2563EB] transition-colors"
              >
                <span>←</span>
                <span className="border-b border-black/30 pb-1">View All Projects</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          {/* Close Button */}
          <button 
            className="hover-trigger absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Main Image */}
          <div 
            className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full animate-zoom-in">
              <Image
                src={activeImage}
                alt="Fullscreen project view"
                fill
                className="object-contain rounded-lg selection:bg-transparent"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
