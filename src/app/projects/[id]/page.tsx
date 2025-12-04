"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/work";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientBlob from "@/components/ui/GradientBlob";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

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
              <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-primary mb-6">
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

            {/* Project Image */}
            <RevealOnScroll>
              <div
                className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-black/5"
                style={{
                  backgroundImage: `url('${project.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </RevealOnScroll>

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

            {/* Links */}
            {project.links && (project.links.live || project.links.github) && (
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
    </>
  );
}
