"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import LocalTime from "@/components/ui/LocalTime";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav-glass fixed left-0 right-0 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-50 px-4 sm:px-6 flex items-center justify-between rounded-full transition-all duration-500 ${scrolled ? "top-2 py-1.5 sm:py-2 nav-glass--scrolled" : "top-3 sm:top-4 py-2.5 sm:py-3"}`}>
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
            <a href="#about" className="hover-trigger hover:text-primary transition-colors">About</a>
            <a href="#work" className="hover-trigger hover:text-primary transition-colors">Work</a>
            <a href="#certifications" className="hover-trigger hover:text-primary transition-colors">Certification</a>
            <a href="#activities" className="hover-trigger hover:text-primary transition-colors">Activities</a>
            <a href="#contact" className="hover-trigger hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="h-4 w-px bg-black/10"></div>

          <div className="flex items-center gap-2 text-xs text-secondary">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono"><LocalTime /></span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-primary p-1"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[56px] sm:top-[64px] left-0 right-0 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl z-40 bg-white/95 backdrop-blur-xl rounded-2xl border border-black/5 shadow-xl overflow-hidden">
          <nav className="flex flex-col p-4">
            {[
              { href: "#about", label: "About" },
              { href: "#work", label: "Work" },
              { href: "#certifications", label: "Certification" },
              { href: "#activities", label: "Activities" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm text-secondary hover:text-primary transition-colors py-3 px-2 border-b border-black/5 last:border-0"
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-2 text-xs text-secondary pt-3 px-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-mono"><LocalTime /></span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
