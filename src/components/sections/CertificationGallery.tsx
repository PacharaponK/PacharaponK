"use client";

import { useMemo, memo, useState, useCallback, useEffect } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import Sticker from "@/components/ui/Sticker";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, ExternalLink, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";
import { categories, certifications } from "@/data/certifications";

// Assign visual "size" to each card in the grid for a bento layout feel
const BENTO_SIZES = [
  "col-span-2 row-span-2", // large
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-2", // tall
  "col-span-1 row-span-1", // small
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-2", // tall
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
  "col-span-2 row-span-1", // wide
  "col-span-1 row-span-1", // small
  "col-span-1 row-span-1", // small
];

const CertificationCard = memo(({
  cert,
  sizeClass,
  onImageClick,
  index,
}: {
  cert: typeof certifications[0];
  sizeClass: string;
  onImageClick?: (image: string) => void;
  index: number;
}) => {
  return (
    <div
      className={`${sizeClass} relative group overflow-hidden rounded-2xl bg-gray-100 cursor-pointer`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onImageClick?.(cert.image)}
    >
      {/* Image */}
      <Image
        src={cert.image}
        alt={cert.title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        priority={index < 4}
      />

      {/* Gradient overlay — always visible at bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold text-white bg-gradient-to-r ${cert.color} shadow-md`}>
          {cert.category}
        </span>
      </div>

      {/* Top-right view icon */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white">
          <ExternalLink size={12} />
        </div>
      </div>

      {/* Content — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
        <div className="flex items-center gap-1.5 mb-1">
          <cert.icon size={10} className="text-white/70" />
          <p className="text-white/70 text-[9px] font-mono uppercase tracking-widest truncate">
            {cert.issuer}
          </p>
        </div>
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
          {cert.title}
        </h3>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          <span className="text-white/60 text-[9px] font-mono">{cert.date}</span>
          <span className="text-white text-[9px] font-bold flex items-center gap-1">
            View <ArrowUpRight size={9} />
          </span>
        </div>
      </div>
    </div>
  );
});

CertificationCard.displayName = "CertificationCard";

export default function CertificationGallery({
  onImageClick,
}: {
  onImageClick?: (image: string) => void;
}) {
  const ITEMS_PER_PAGE = BENTO_SIZES.length; // = 15, one full bento pattern cycle → always fills grid

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCertifications = useMemo(
    () =>
      certifications.filter(
        (cert) => activeCategory === "All" || cert.category === activeCategory
      ),
    [activeCategory]
  );

  const visibleCertifications = useMemo(
    () => filteredCertifications.slice(0, visibleCount),
    [filteredCertifications, visibleCount]
  );

  const hasMore = visibleCount < filteredCertifications.length;
  const remaining = filteredCertifications.length - visibleCount;

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  const handleShowMore = useCallback(() => {
    setIsLoading(true);
    // Simulate slight delay for a smoother feel
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredCertifications.length));
      setIsLoading(false);
    }, 300);
  }, [filteredCertifications.length]);

  const stickers = useMemo(
    () => (
      <>
        <Sticker type="star" className="w-12 h-12 top-20 right-[10%] opacity-80" delay={0.5} />
        <Sticker type="sparkle" className="w-8 h-8 bottom-32 left-[5%] opacity-60" delay={1.2} />
        <Sticker type="blob" className="w-64 h-64 -bottom-32 -right-32 opacity-20 rotate-45" delay={2.0} />
      </>
    ),
    []
  );

  return (
    <section
      id="certifications"
      className="py-24 px-6 md:px-12 border-b border-black/5 bg-white/50 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {stickers}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
        <div className="mb-6 md:mb-0">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-primary flex items-start gap-2">
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

        {/* Category Filter */}
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
                <Icon size={14} className={`transition-colors ${isActive ? "text-white" : "text-gray-400"}`} />
                {cat.name}
              </MagneticButton>
            );
          })}
        </div>
      </div>

      {/* Masonry / Bento Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4">
        {visibleCertifications.map((cert, i) => {
          // For small filtered lists, fall back to uniform sizing
          const sizeClass = filteredCertifications.length > 4
            ? BENTO_SIZES[i % BENTO_SIZES.length]
            : "col-span-1 row-span-2";

          return (
            <CertificationCard
              key={cert.id}
              cert={cert}
              sizeClass={sizeClass}
              onImageClick={onImageClick}
              index={i}
            />
          );
        })}
      </div>

      {/* Footer: count + Show More */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
          Showing {visibleCertifications.length} of {filteredCertifications.length} ·{" "}
          {activeCategory === "All" ? "All Categories" : activeCategory}
        </p>

        {hasMore && (
          <button
            onClick={handleShowMore}
            disabled={isLoading}
            className="group flex items-center gap-2.5 px-7 py-3 rounded-full border border-black/15 bg-white text-sm font-mono text-gray-600 shadow-sm hover:bg-black hover:text-white hover:border-black hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ChevronDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            )}
            {isLoading ? "Loading..." : `Show ${Math.min(ITEMS_PER_PAGE, remaining)} more`}
          </button>
        )}
      </div>
    </section>
  );
}
