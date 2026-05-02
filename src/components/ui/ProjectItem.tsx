"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectItemProps {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string;
  year?: string;
  status?: string;
  isLast?: boolean;
}

const categoryStyle: Record<string, string> = {
  "PUPA TEAM": "bg-blue-50 text-blue-600",
  "CoE Project": "bg-violet-50 text-violet-600",
};

export default function ProjectItem({
  id,
  number,
  category,
  title,
  description,
  tech,
  year,
  status,
  isLast = false,
}: ProjectItemProps) {
  const techList = tech ? tech.split(", ").slice(0, 3) : [];
  const catClass = categoryStyle[category] ?? "bg-gray-100 text-gray-600";

  return (
    <Link href={`/projects/${id}`} className="block group hover-trigger">
      <div
        className={`relative overflow-hidden border-t ${isLast ? "border-b" : ""
          } border-black/10 transition-colors duration-300 hover:bg-black/[0.025]`}
      >
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

        {/* Ghost number */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-extrabold leading-none select-none pointer-events-none pr-4 md:pr-8 text-[100px] md:text-[140px] text-black/[0.04] group-hover:text-black/[0.07] transition-colors duration-300">
          {number}
        </div>

        <div className="relative z-10 flex items-center justify-between gap-6 py-8 md:py-10 pl-4">
          {/* Left: content */}
          <div className="flex-1 min-w-0">
            {/* Meta row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${catClass}`}
              >
                {category}
              </span>
              <span className="text-black/20 text-xs">·</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                {description}
              </span>
              {year && (
                <>
                  <span className="text-black/20 text-xs">·</span>
                  <span className="text-[10px] font-mono text-gray-400">{year}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-none text-primary group-hover:text-black/60 group-hover:translate-x-3 transition-all duration-400 ease-out">
              {title}
            </h3>

            {/* Tech tags */}
            {techList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {techList.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-gray-500 border border-black/10 group-hover:border-black/30 group-hover:text-black/60 transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: thumbnail + status + arrow */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Status + arrow */}
            <div className="flex flex-col items-end justify-between self-stretch py-1 gap-4">
              {status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider whitespace-nowrap ${status === "Production"
                      ? "bg-green-100 text-green-700"
                      : status === "DEVELOPMENT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {status}
                </span>
              )}
              <ArrowUpRight className="w-5 h-5 text-black/25 group-hover:text-black/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 mt-auto" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
