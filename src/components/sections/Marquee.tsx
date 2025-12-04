"use client";

export default function Marquee() {
  return (
    <div className="w-full bg-[#1A1A1A] text-[#FAF9F6] py-4 overflow-hidden border-b border-black/5">
      <div className="whitespace-nowrap animate-marquee font-mono font-bold text-lg md:text-xl flex gap-12">
        <span>CREATIVE DEVELOPER</span>
        <span>✦</span>
        <span>UI/UX DESIGN</span>
        <span>✦</span>
        <span>FRONTEND ARCHITECTURE</span>
        <span>✦</span>
        <span>REACT / NEXT.JS</span>
        <span>✦</span>
        <span>WEBGL EXPERIMENTS</span>
        <span>✦</span>
        <span>BASED IN THAILAND</span>
        <span>✦</span>
        <span>CREATIVE DEVELOPER</span>
        <span>✦</span>
        <span>UI/UX DESIGN</span>
        <span>✦</span>
        <span>FRONTEND ARCHITECTURE</span>
        <span>✦</span>
      </div>
    </div>
  );
}
