"use client";

import { marqueeItems } from "@/data/marquee";

export default function Marquee() {
  return (
    <div className="w-full bg-[#1A1A1A] text-[#FAF9F6] py-4 overflow-hidden border-b border-black/5">
      <div className="whitespace-nowrap animate-marquee font-mono font-bold text-lg md:text-xl flex gap-12">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex gap-12">
            <span>{item}</span>
            <span>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
