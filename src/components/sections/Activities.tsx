"use client";

import { memo, useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageIcon, Medal, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Sticker from "@/components/ui/Sticker";
import { activities, type Activity } from "@/data/activities";

const BADGE_GRADIENT: Record<Activity["type"], string> = {
  Competition: "from-blue-500 to-indigo-600",
  Training:    "from-amber-500 to-orange-500",
};

const ActivityCard = memo(({ activity, index }: { activity: Activity; index: number }) => {
  const Icon = activity.icon;
  const [activeImg, setActiveImg] = useState(0);
  const hasImages  = !!activity.images?.length;
  const photoCount = activity.images?.length ?? 0;
  const paused = useRef(false);

  // Auto-advance every 3 s, staggered by index, pause while hovering
  useEffect(() => {
    if (photoCount <= 1) return;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (!paused.current) setActiveImg((i) => (i + 1) % photoCount);
      }, 3000);
    }, index * 1000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [photoCount, index]);

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((i) => (i - 1 + photoCount) % photoCount);
  }, [photoCount]);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((i) => (i + 1) % photoCount);
  }, [photoCount]);

  return (
    <RevealOnScroll delay={index * 0.12}>
      <div
        className="group flex flex-col"
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >

        {/* ── Image ── */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
          {hasImages ? (
            <>
              {activity.images!.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${activity.title} — photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                  className={`object-cover transition-opacity duration-500 ${
                    i === activeImg ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0 && i === 0}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-10`} />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center opacity-20`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-neutral-400">
                <ImageIcon size={10} />
                <span className="font-mono text-[9px] uppercase tracking-widest">Photo coming soon</span>
              </div>
            </>
          )}

          {/* Type badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r ${BADGE_GRADIENT[activity.type]} shadow-md`}>
              {activity.type}
            </span>
          </div>

          {/* Nav arrows */}
          {photoCount > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight size={16} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] text-white/80 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                {activeImg + 1} / {photoCount}
              </div>

              {/* Auto-slide progress bar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-white/20">
                <div
                  key={activeImg}
                  className="h-full bg-white/70 group-hover:[animation-play-state:paused]"
                  style={{ animation: "slide-progress 3s linear forwards" }}
                />
              </div>
            </>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {photoCount > 1 && (
          <div className="flex gap-2 mt-3">
            {activity.images!.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative flex-1 aspect-[3/2] rounded-lg overflow-hidden transition-all duration-200 ${
                  i === activeImg
                    ? "ring-2 ring-accent ring-offset-1 opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* ── Text ── */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{activity.year}</span>
            <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest truncate">{activity.organizer}</span>
          </div>

          <h3 className="font-heading font-bold text-primary text-xl leading-snug tracking-tight group-hover:text-accent transition-colors duration-300">
            {activity.title}
          </h3>

          <p className="font-thai text-gray-500 text-sm leading-relaxed line-clamp-2">
            {activity.description}
          </p>

          {activity.result && (
            <div className="flex items-center gap-2 mt-1">
              <Medal size={13} className="text-accent flex-shrink-0" />
              <span className="font-mono text-xs text-accent font-semibold tracking-wide">{activity.result}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-1">
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-black/5 text-gray-500 uppercase tracking-wide hover:bg-accent/10 hover:text-accent transition-colors duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </RevealOnScroll>
  );
});

ActivityCard.displayName = "ActivityCard";

export default function Activities() {
  const stickers = useMemo(
    () => (
      <>
        <Sticker type="sparkle" className="w-10 h-10 top-20 left-[6%]  opacity-60" delay={0.4} />
        <Sticker type="star"    className="w-8  h-8  top-28 right-[8%] opacity-70" delay={0.9} />
        <Sticker type="blob"    className="w-56 h-56 -bottom-28 -left-28 opacity-15 rotate-12" delay={1.8} />
      </>
    ),
    []
  );

  return (
    <section
      id="activities"
      className="py-24 px-6 md:px-12 border-b border-black/5 bg-background relative overflow-hidden"
    >
      {/* Dot grid — warm off-white base with subtle radial dots */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,#1a1a1a09_1px,transparent_1px)] bg-[size:28px_28px]" />
      {/* Subtle accent glow top-center */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 bg-accent/[0.04] rounded-full blur-3xl" />

      {stickers}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
        <div className="mb-6 md:mb-0">
          <p className="text-sm font-mono text-gray-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent" />
            ( Activities &amp; Events )
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-primary flex items-start gap-2">
            <AnimatedText animation="words" trigger="scroll" stagger={0.08}>
              ACTIVITIES
            </AnimatedText>
            <span className="text-gray-400 text-2xl font-mono mt-2">
              ({String(activities.length).padStart(2, "0")})
            </span>
          </h2>
          <AnimatedText
            as="p"
            animation="words"
            trigger="scroll"
            className="font-thai text-gray-500 mt-2 text-sm max-w-md"
          >
            การแข่งขันและการอบรมที่ฉันเคยเข้าร่วม
          </AnimatedText>
        </div>

        {/* Year range */}
        <div className="font-mono text-xs text-gray-400 border border-black/10 rounded-full px-5 py-2 bg-white/60 backdrop-blur-sm">
          2024 — 2025
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {activities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </section>
  );
}
