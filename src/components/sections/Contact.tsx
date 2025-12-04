"use client";

import { useState } from "react";
import { Copy, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Contact() {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const copyEmail = () => {
    const email = "ballxlenver7@gmail.com";
    navigator.clipboard.writeText(email);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="min-h-[80vh] flex flex-col justify-between p-6 md:p-12 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <ArrowDownRight className="w-48 h-48 text-black" />
      </div>

      <div className="mt-12">
        <AnimatedText
          as="p"
          animation="chars"
          trigger="scroll"
          className="font-mono text-[#2563EB] mb-4"
          stagger={0.03}
        >
          {"WHAT'S NEXT?"}
        </AnimatedText>
        <h2 className="font-heading text-5xl md:text-8xl font-bold tracking-tighter max-w-4xl text-primary">
          <AnimatedText animation="chars" trigger="scroll" delay={0.2} stagger={0.02}>
            {"LET'S WORK"}
          </AnimatedText>
          <AnimatedText animation="chars" trigger="scroll" delay={0.4} stagger={0.02}>
            TOGETHER
          </AnimatedText>
        </h2>
      </div>

      <RevealOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 items-end">
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={copyEmail}
            className="hover-trigger group flex items-center gap-4 text-2xl md:text-4xl text-primary hover:text-gray-500 transition-colors text-left w-full"
          >
            <span className="border-b border-black/30 pb-2">
              ballxlenver7@gmail.com
            </span>
            <Copy className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <p
            className={`text-[#2563EB] text-sm mt-2 transition-opacity ${copyFeedback ? "opacity-100" : "opacity-0"
              }`}
          >
            Copied to clipboard!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-gray-400 text-xs uppercase">Socials</h4>
          <div className="flex flex-col gap-2 text-lg text-primary">
            <a
              href="#"
              className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
            >
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
            >
              GitHub <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="hover-trigger hover:text-[#2563EB] transition-colors flex items-center gap-2"
            >
              Instagram <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </RevealOnScroll>

      <div className="flex justify-between items-end border-t border-black/10 pt-8 mt-12 text-gray-500 font-mono text-xs">
        <p>&copy; 2024 Pacharapon Ketkaew.</p>
        <p>Designed & Built by PK.</p>
      </div>
    </footer>
  );
}
