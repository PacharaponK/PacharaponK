"use client";

import { useMemo, memo } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";
import Sticker from "@/components/ui/Sticker";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { categories, certifications } from "@/data/certifications";
import { useCertificationGallery } from "@/hooks/useCertificationGallery";

// Memoized Card Component for Performance
const CertificationCard = memo(({ cert, isActive, onClick }: {
  cert: typeof certifications[0],
  isActive: boolean,
  onClick: () => void
}) => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white border border-black/5 shadow-2xl relative group">
      {/* Image Container */}
      <div className="absolute inset-0 h-[65%] overflow-hidden bg-gray-100">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(max-width: 768px) 300px, 350px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${cert.color} shadow-lg`}>
            {cert.category}
          </span>
        </div>

        {/* View Button - Removed backdrop-blur for performance */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center border border-white/30 text-primary hover:bg-white hover:text-black transition-colors shadow-sm">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-6 flex flex-col justify-between border-t border-black/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <cert.icon size={12} className="text-primary" />
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">{cert.issuer}</p>
          </div>
          <h3 className="text-primary font-bold text-xl leading-tight line-clamp-2">
            {cert.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-xs font-mono">{cert.date}</span>
          <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Cert <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </div>
  );
});

CertificationCard.displayName = "CertificationCard";

export default function CertificationGallery({ onImageClick }: { onImageClick?: (image: string) => void }) {
  const {
    activeCategory,
    currentIndex,
    filteredCertifications,
    visibleItems,
    sliderRef,
    handleCategoryChange,
    handleNext,
    handlePrev,
    pauseAutoPlay,
    resumeAutoPlay,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getSlideStyle
  } = useCertificationGallery();

  // Memoize stickers to prevent re-renders
  const stickers = useMemo(() => (
    <>
      <Sticker type="star" className="w-12 h-12 top-20 right-[10%] opacity-80" delay={0.5} />
      <Sticker type="sparkle" className="w-8 h-8 bottom-32 left-[5%] opacity-60" delay={1.2} />
      <Sticker type="blob" className="w-64 h-64 -bottom-32 -right-32 opacity-30 rotate-45" delay={2.0} />
    </>
  ), []);

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 border-b border-black/5 bg-white/50 backdrop-blur-sm relative overflow-hidden min-h-screen flex flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {stickers}

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
        <div className="mb-6 md:mb-0">
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-primary flex items-start gap-2">
            <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
              CERTIFICATIONS
            </AnimatedText>
            <span className="text-gray-400 text-2xl font-mono mt-2">
              ({String(filteredCertifications.length).padStart(2, "0")})
            </span>
          </h2>
          <AnimatedText
            as="p"
            animation="words"
            trigger="scroll"
            className="font-thai text-gray-500 mt-2 text-sm max-w-md"
          >
            ใบรับรองความสามารถและทักษะทางวิชาชีพที่ได้รับการรับรอง
          </AnimatedText>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <MagneticButton
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`
                  px-5 py-2.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all duration-300 border
                  ${isActive
                    ? "bg-black text-white border-black shadow-lg scale-105"
                    : "bg-white/50 text-gray-500 border-transparent hover:bg-white hover:border-black/10 hover:text-black"
                  }
                `}
              >
                <Icon size={14} className={`transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-black"}`} />
                {cat.name}
              </MagneticButton>
            );
          })}
        </div>
      </div>

      {/* 3D Slider Container */}
      <div
        ref={sliderRef}
        className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center perspective-1000 touch-pan-y"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Only render visible items */}
        {visibleItems.map((cert) => {
          const { style, isActive } = getSlideStyle(cert.originalIndex);
          return (
            <div
              key={`${cert.id}-${cert.originalIndex}`} // Unique key for virtual items
              onClick={() => isActive && onImageClick?.(cert.image)}
              style={style}
              className="absolute w-[300px] md:w-[350px] aspect-[4/5] transition-all duration-500 ease-out cursor-pointer will-change-transform"
            >
              <CertificationCard
                cert={cert}
                isActive={isActive}
                onClick={() => isActive && onImageClick?.(cert.image)}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => { pauseAutoPlay(); handlePrev(); }}
          className="p-3 rounded-full bg-white border border-black/10 hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {filteredCertifications.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-primary" : "bg-gray-300"
                }`}
            />
          ))}
        </div>

        <button
          onClick={() => { pauseAutoPlay(); handleNext(); }}
          className="p-3 rounded-full bg-white border border-black/10 hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
