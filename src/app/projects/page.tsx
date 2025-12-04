"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projects } from "@/data/work";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProjectItem from "@/components/ui/ProjectItem";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientBlob from "@/components/ui/GradientBlob";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Background Effects */}
      <div className="noise"></div>
      <GradientBlob />
      <CustomCursor />

      <main className="bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="hover-trigger group flex items-center gap-2 text-primary font-mono text-sm"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span className="border-b border-transparent group-hover:border-primary transition-colors">
                Back to Home
              </span>
            </Link>
            <span className="font-mono text-xs text-gray-400">
              {String(filteredProjects.length).padStart(2, "0")} Projects
            </span>
          </div>
        </header>

        {/* Title Section */}
        <section className="py-16 px-6 md:px-12 border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-primary">
              All Projects
            </h1>
            <p className="font-thai text-gray-500 mt-4 text-sm">
              รวมผลงานทั้งหมดที่ได้พัฒนา
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 px-6 md:px-12 border-b border-black/5 sticky top-[65px] z-30 bg-background/90 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`hover-trigger px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-black/5 text-gray-600 hover:bg-black/10"
                    }`}
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-2 opacity-60">
                      ({projects.filter((p) => p.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <RevealOnScroll key={project.id}>
                    <ProjectItem {...project} isLast={index === filteredProjects.length - 1} />
                  </RevealOnScroll>
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className="font-thai text-gray-400">ไม่พบโปรเจคในหมวดหมู่นี้</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
