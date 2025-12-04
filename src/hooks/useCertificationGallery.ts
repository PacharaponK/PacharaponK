import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { certifications } from "@/data/certifications";

export const useCertificationGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCertifications = useMemo(
    () =>
      certifications.filter(
        (cert) => activeCategory === "All" || cert.category === activeCategory
      ),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredCertifications.length);
  }, [filteredCertifications.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredCertifications.length) %
        filteredCertifications.length
    );
  }, [filteredCertifications.length]);

  // Pause auto-play on user interaction
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  }, []);

  // Resume auto-play after interaction
  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredCertifications.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 2500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, filteredCertifications.length, handleNext]);

  // Wheel Scroll Support
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      pauseAutoPlay();

      if (isScrollingRef.current) return;

      if (e.deltaY > 50 || e.deltaX > 50) {
        handleNext();
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      } else if (e.deltaY < -50 || e.deltaX < -50) {
        handlePrev();
        isScrollingRef.current = true;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [filteredCertifications.length, handleNext, handlePrev, pauseAutoPlay]);

  // Touch Swipe Support
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      pauseAutoPlay();
      touchEndRef.current = null;
      touchStartRef.current = e.targetTouches[0].clientX;
    },
    [pauseAutoPlay]
  );

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  const getSlideStyle = useCallback(
    (index: number) => {
      const total = filteredCertifications.length;
      let relativeIndex = (index - currentIndex + total) % total;
      if (relativeIndex > total / 2) relativeIndex -= total;

      const isActive = relativeIndex === 0;
      const isVisible = Math.abs(relativeIndex) <= 2;

      const xOffset = relativeIndex * 60;
      const scale = isActive ? 1 : 1 - Math.abs(relativeIndex) * 0.15;
      const opacity = isActive ? 1 : 1 - Math.abs(relativeIndex) * 0.3;
      const zIndex = 10 - Math.abs(relativeIndex);
      const rotateY = relativeIndex * -15;

      return {
        style: {
          transform: `translateX(${xOffset}%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
          opacity: isVisible ? opacity : 0,
          zIndex,
          pointerEvents: isActive ? "auto" : "none",
          visibility: isVisible ? "visible" : "hidden",
        } as React.CSSProperties,
        isActive,
        isVisible,
      };
    },
    [currentIndex, filteredCertifications.length]
  );

  // Virtual Window: Only render visible items (with deduplication for small lists)
  const visibleItems = useMemo(() => {
    const total = filteredCertifications.length;
    const seenIndices = new Set<number>();
    const items: Array<
      (typeof filteredCertifications)[0] & { originalIndex: number }
    > = [];

    // Render +/- 2 items around current index, but skip duplicates
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      // Skip if this index was already added (happens when total < 5)
      if (seenIndices.has(index)) continue;
      seenIndices.add(index);
      items.push({
        ...filteredCertifications[index],
        originalIndex: index,
      });
    }
    return items;
  }, [currentIndex, filteredCertifications]);

  return {
    activeCategory,
    currentIndex,
    filteredCertifications,
    visibleItems,
    sliderRef,
    handleCategoryChange,
    handleNext,
    handlePrev,
    pauseAutoPlay,
    resumeAutoPlay,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getSlideStyle,
  };
};
