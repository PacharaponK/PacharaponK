"use client";

import { useState } from "react";
import ImageModal from "@/components/ui/ImageModal";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import GradientBlob from "@/components/ui/GradientBlob";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import ScrollingTextCarousel from "@/components/sections/ScrollingTextCarousel";
import ScrollytellingWork from "@/components/sections/ScrollytellingWork";
import CertificationGallery from "@/components/sections/CertificationGallery";

import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <ScrollProgress />
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
      <ScrollytellingWork />
      <CertificationGallery onImageClick={setSelectedImage} />
      <Contact />

      <ImageModal
        key={selectedImage || "modal"}
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
