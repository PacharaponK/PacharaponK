"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageSrc, onClose }: ImageModalProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors disabled:opacity-50"
            disabled={scale <= 1}
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-xs font-mono text-white/60 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors disabled:opacity-50"
            disabled={scale >= 3}
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-red-500/20 hover:text-red-500 rounded-full text-white transition-all duration-300 backdrop-blur-md border border-white/10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Image Container */}
      <div
        className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={imageSrc}
            alt="Certification Full View"
            fill
            className="object-contain drop-shadow-2xl"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Caption/Footer (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono">
        Press ESC to close
      </div>
    </div>,
    document.body
  );
}
