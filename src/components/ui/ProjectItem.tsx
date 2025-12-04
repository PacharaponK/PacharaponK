"use client";

import Link from "next/link";
import { useRef } from "react";

interface ProjectItemProps {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string;
  imageUrl: string;
  year?: string;
  status?: string;
  isLast?: boolean;
}

export default function ProjectItem({
  id,
  number,
  category,
  title,
  description,
  tech,
  imageUrl,
  year,
  status,
  isLast = false,
}: ProjectItemProps) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imgRef.current) {
      imgRef.current.style.left = `${e.clientX + 20}px`;
      imgRef.current.style.top = `${e.clientY - 100}px`;
    }
  };

  return (
    <Link href={`/projects/${id}`} className="block">
      <div
        className={`project-item hover-trigger group relative border-t ${isLast ? "border-b" : ""
          } border-black/10 py-12 transition-all hover:bg-black/5 cursor-pointer`}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div className="mb-4 md:mb-0">
            <span className="font-mono text-[#2563EB] text-xs mb-2 block tracking-wider">
              {number} / {category}
            </span>
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-primary group-hover:translate-x-4 transition-transform duration-300">
              {title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              {status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${status === "Production"
                      ? "bg-green-100 text-green-700"
                      : status === "DEVELOPMENT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {status}
                </span>
              )}
              {year && <span className="text-gray-400 text-xs font-mono">{year}</span>}
            </div>
            <span className="text-gray-500 text-sm">{description}</span>
            {tech && <span className="text-gray-600 text-xs font-mono">{tech}</span>}
          </div>
        </div>
        {/* Floating Image Reveal */}
        <div
          ref={imgRef}
          className="project-img fixed pointer-events-none opacity-0 transition-all duration-500 w-[300px] h-[200px] bg-gray-200 z-50 top-1/2 left-1/2 rounded-lg overflow-hidden border border-black/10 hidden md:block shadow-2xl"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </Link>
  );
}
