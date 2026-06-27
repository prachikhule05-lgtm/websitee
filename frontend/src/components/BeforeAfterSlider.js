import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

const BeforeAfterSlider = ({
  before,
  after,
  label = "",
  beforeLabel = "Before",
  afterLabel = "After",
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const containerRef = useRef(null);
  const animatedRef = useRef(false);

  // Auto-animate on mount to show the feature
  useEffect(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;
    let start;
    const duration = 1400;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // ease-in-out curve: 50 → 25 → 70 → 50
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (p < 0.5) {
        setSliderPos(50 - 25 * (eased * 2));
      } else {
        setSliderPos(25 + 45 * ((eased - 0.5) * 2));
      }
      if (p < 1) requestAnimationFrame(animate);
      else setSliderPos(50);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 800);
    return () => clearTimeout(timer);
  }, []);

  const getPos = useCallback((clientX) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Global event listeners so drag works even when cursor leaves the element
  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e) => setSliderPos(getPos(e.clientX));
    const onTouchMove = (e) => { e.preventDefault(); setSliderPos(getPos(e.touches[0].clientX)); };
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    };
  }, [isDragging, getPos]);

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setHintVisible(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none"
      style={{ aspectRatio: "16/10", cursor: isDragging ? "ew-resize" : "col-resize" }}
    >
      {/* Category label */}
      {label && (
        <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-sm text-[#0F172A] font-heading font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-md">
          {label}
        </div>
      )}

      {/* After image (full background) */}
      <div className="absolute inset-0">
        <img src={after} alt={afterLabel} className="w-full h-full object-cover" loading="lazy" draggable={false} />
        <div className="absolute top-3 right-3 z-10 bg-[#10B981] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
          {afterLabel}
        </div>
      </div>

      {/* Before image - clipped using clipPath for perfect rendering */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt={beforeLabel} className="w-full h-full object-cover" loading="lazy" draggable={false} />
        <div className="absolute top-3 left-3 z-10 bg-[#F59E0B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className={`h-full w-[2px] ${isDragging ? "bg-[#F59E0B]" : "bg-white"} shadow-[0_0_12px_rgba(0,0,0,0.5)] transition-colors`} />
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      >
        <motion.div
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-[3px] border-[#2563EB] cursor-ew-resize"
          style={{ boxShadow: isDragging ? "0 0 0 4px rgba(37,99,235,0.2), 0 8px 24px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.25)" }}
        >
          <MoveHorizontal className={`w-5 h-5 ${isDragging ? "text-[#F59E0B]" : "text-[#2563EB]"} transition-colors`} />
        </motion.div>
      </div>

      {/* Transparent interaction overlay (except handle area) */}
      <div
        className="absolute inset-0 z-10"
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      />

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hintVisible ? 1 : 0, y: hintVisible ? 0 : 4 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      >
        <div className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <MoveHorizontal className="w-3 h-3" />
          Drag to compare
        </div>
      </motion.div>
    </div>
  );
};

export default BeforeAfterSlider;
