"use client";

import { Menu } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import LocalTime from "@/components/ui/LocalTime";

export default function Navbar() {
  return (
    <nav className="nav-glass fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-50 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between rounded-full">
      <MagneticButton
        as="a"
        href="#"
        className="text-lg sm:text-xl font-bold tracking-tighter text-primary hover:text-accent transition-colors"
      >
        PK.
      </MagneticButton>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-4 lg:gap-6 font-mono text-xs text-secondary">
          <a href="#work" className="hover-trigger hover:text-primary transition-colors">Work</a>
          <a href="#about" className="hover-trigger hover:text-primary transition-colors">About</a>
          <a href="#contact" className="hover-trigger hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="h-4 w-px bg-black/10"></div>

        <div className="flex items-center gap-2 text-xs text-secondary">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono"><LocalTime /></span>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <MagneticButton className="md:hidden text-primary p-1">
        <Menu className="w-5 h-5" />
      </MagneticButton>
    </nav>
  );
}
