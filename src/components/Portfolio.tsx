"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientBlob from "@/components/ui/GradientBlob";
import LocalTime from "@/components/ui/LocalTime";
import MagneticButton from "@/components/ui/MagneticButton";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import ScrollingTextCarousel from "@/components/sections/ScrollingTextCarousel";

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Noise & Background */}
      <div className="noise"></div>
      <GradientBlob />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      <Hero isLoaded={isLoaded} />
      <Marquee />
      <About isLoaded={isLoaded} />
      <ScrollingTextCarousel />
      <Work />
      <Contact />
    </>
  );
}
