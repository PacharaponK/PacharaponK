"use client";

import { useState, useRef, useEffect, useMemo, memo } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";
import Sticker from "@/components/ui/Sticker";
import { ArrowUpRight, Shield, Cloud, Code, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const certifications = [
  // Cloud Certifications
  {
    id: 1,
    title: "Cloud Associate",
    issuer: "Huawei",
    date: "2024",
    image: "/image/cloud-cert/Clound_Asso.png",
    link: "#",
    category: "Cloud",
    icon: Cloud,
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 2,
    title: "Cloud Fundamentals",
    issuer: "Huawei",
    date: "2023",
    image: "/image/cloud-cert/Fundamentals.png",
    link: "#",
    category: "Cloud",
    icon: Cloud,
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 3,
    title: "Getting Started with Cloud",
    issuer: "Huawei",
    date: "2023",
    image: "/image/cloud-cert/Getting-Started.png",
    link: "#",
    category: "Cloud",
    icon: Cloud,
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 4,
    title: "Benefits of Cloud",
    issuer: "Huawei",
    date: "2022",
    image: "/image/cloud-cert/Benefits.png",
    link: "#",
    category: "Cloud",
    icon: Cloud,
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 5,
    title: "History of Cloud",
    issuer: "Huawei",
    date: "2022",
    image: "/image/cloud-cert/History.png",
    link: "#",
    category: "Cloud",
    icon: Cloud,
    color: "from-blue-400 to-cyan-300",
  },

  // Developer Certifications
  {
    id: 6,
    title: "PSU OpenAPI Workshop",
    issuer: "Prince of Songkla University",
    date: "2023",
    image: "/image/dev-cert/psu-openapi.png",
    link: "#",
    category: "Developer",
    icon: Code,
    color: "from-purple-400 to-pink-300",
  },

  // Security Certifications
  {
    id: 7,
    title: "2nd Runner Up CTF Bootcamp 2025",
    issuer: "CTF Organizer",
    date: "2025",
    image: "/image/security_cert/รองชนะเลิศ อันดับ 2 การแข่งขัน CTF BootCamp 2025_Part5.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 8,
    title: "Cybersecurity Professional",
    issuer: "Certification Body",
    date: "2024",
    image: "/image/security_cert/Cybersecurity Professional.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 9,
    title: "CTF Certificate Part 50",
    issuer: "CTF Organizer",
    date: "2024",
    image: "/image/security_cert/CTF_Cert_Part50.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 10,
    title: "Accenture Cybersecurity",
    issuer: "Accenture",
    date: "2024",
    image: "/image/security_cert/accenture-cert.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 11,
    title: "PSU Cyber Day",
    issuer: "Prince of Songkla University",
    date: "2024",
    image: "/image/security_cert/psu-cyberday.png",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 12,
    title: "Senior Top Talent",
    issuer: "Organization",
    date: "2024",
    image: "/image/security_cert/Part_1_Senior_Top_Talent_Page159.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 13,
    title: "Certificate of Achievement",
    issuer: "Issuer",
    date: "2023",
    image: "/image/security_cert/cert-6610110190.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 14,
    title: "E-Certificate",
    issuer: "Issuer",
    date: "2023",
    image: "/image/security_cert/e-cert_6610110190.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
  {
    id: 15,
    title: "Post Test Certificate",
    issuer: "Issuer",
    date: "2023",
    image: "/image/security_cert/post-test-cert.jpg",
    link: "#",
    category: "Security",
    icon: Shield,
    color: "from-emerald-400 to-teal-300",
  },
];

const categories = [
  { name: "All", icon: Award },
  { name: "Developer", icon: Code },
  { name: "Cloud", icon: Cloud },
  { name: "Security", icon: Shield },
];

// Memoized Card Component for Performance
const CertificationCard = memo(({ cert, style, isActive, isVisible, onClick }: {
  cert: typeof certifications[0],
  style: React.CSSProperties,
  isActive: boolean,
  isVisible: boolean,
  onClick: () => void
}) => {
  if (!isVisible) return <div className="absolute w-[300px] md:w-[350px] aspect-[4/5]" style={{ display: 'none' }} />;

  return (
    <div
      onClick={onClick}
      style={style}
      className="absolute w-[300px] md:w-[350px] aspect-[4/5] transition-all duration-500 ease-out cursor-pointer will-change-transform"
    >
      <div className="w-full h-full rounded-2xl overflow-hidden bg-white border border-black/5 shadow-2xl relative group">
        {/* Image Container - Only render heavy image if visible */}
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

          {/* View Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-primary transition-colors">
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
    </div>
  );
});

CertificationCard.displayName = "CertificationCard";

export default function CertificationGallery({ onImageClick }: { onImageClick?: (image: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCertifications = useMemo(() => certifications.filter(
    (cert) => activeCategory === "All" || cert.category === activeCategory
  ), [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCertifications.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCertifications.length) % filteredCertifications.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredCertifications.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 2500); // Auto-advance every 2.5 seconds

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, filteredCertifications.length]); // Removed currentIndex dependency to prevent interval reset on slide change

  // Pause auto-play on user interaction
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  // Resume auto-play after interaction
  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  // Wheel Scroll Support
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page scroll when scrolling over the slideshow
      e.preventDefault();
      pauseAutoPlay();

      if (isScrollingRef.current) return;

      // Threshold for scroll trigger
      if (e.deltaY > 50 || e.deltaX > 50) {
        handleNext();
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 500);
      } else if (e.deltaY < -50 || e.deltaX < -50) {
        handlePrev();
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 500);
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [filteredCertifications.length]);

  // Touch Swipe Support
  const onTouchStart = (e: React.TouchEvent) => {
    pauseAutoPlay();
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const getSlideStyle = (index: number) => {
    const total = filteredCertifications.length;
    // Calculate relative position (-2, -1, 0, 1, 2)
    let relativeIndex = (index - currentIndex + total) % total;
    if (relativeIndex > total / 2) relativeIndex -= total;

    const isActive = relativeIndex === 0;
    const isVisible = Math.abs(relativeIndex) <= 2;

    // 3D Transform calculations
    const xOffset = relativeIndex * 60; // Horizontal spacing %
    const scale = isActive ? 1 : 1 - Math.abs(relativeIndex) * 0.15;
    const opacity = isActive ? 1 : 1 - Math.abs(relativeIndex) * 0.3;
    const zIndex = 10 - Math.abs(relativeIndex);
    const rotateY = relativeIndex * -15; // Rotation effect

    return {
      style: {
        transform: `translateX(${xOffset}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
        opacity: isVisible ? opacity : 0,
        zIndex,
        pointerEvents: isActive ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
      } as React.CSSProperties,
      isActive,
      isVisible
    };
  };

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
      {/* Decorative Background Elements */}
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

        {/* Category Tabs */}
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
        {filteredCertifications.map((cert, index) => {
          const { style, isActive, isVisible } = getSlideStyle(index);
          return (
            <CertificationCard
              key={cert.id}
              cert={cert}
              style={style}
              isActive={isActive}
              isVisible={isVisible}
              onClick={() => isActive && onImageClick?.(cert.image)}
            />
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

        {/* Indicators */}
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
