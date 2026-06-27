import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BeforeAfterSlider = ({ before, after, label = "", beforeLabel = "Before", afterLabel = "After" }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseDown = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => { if (isDragging) handleMove(e.clientX); };

  const handleTouchStart = (e) => { setIsDragging(true); };
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e) => { if (isDragging) handleMove(e.touches[0].clientX); };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl before-after-slider" style={{ aspectRatio: "16/10" }}>
      {label && (
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-[#0F172A] font-heading font-bold text-sm px-3 py-1.5 rounded-full shadow-sm">
          {label}
        </div>
      )}

      {/* After image (full) */}
      <div className="absolute inset-0">
        <img src={after} alt="After" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 right-3 z-10 bg-[#22C55E] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
          {afterLabel}
        </div>
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={before} alt="Before" className="absolute top-0 left-0 h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }} loading="lazy" />
        <div className="absolute top-3 left-3 z-10 bg-[#F97316] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider line */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#2563EB]">
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-[#2563EB]" />
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-[#2563EB]" />
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white text-xs px-3 py-1 rounded-full pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0 : 0.8 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        Drag to compare
      </motion.div>
    </div>
  );
};

export default BeforeAfterSlider;
