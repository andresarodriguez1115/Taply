"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAD = 8;
const GAP = 12;
const TOOLTIP_H = 190;
const SPRING = { type: "spring", stiffness: 320, damping: 32 };

export default function DashboardTour({ steps, open, onClose }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);
  const step = steps[i];

  useEffect(() => {
    if (open) { setI(0); setRect(null); }
  }, [open]);

  const measure = useCallback(() => {
    if (!step?.target) { setRect(null); return; }
    const el = document.querySelector(`[data-tutorial="${step.target}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  useEffect(() => {
    if (!open || !step) return;

    if (step.target) {
      const el = document.querySelector(`[data-tutorial="${step.target}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        const comfortable = r.top >= 90 && r.bottom <= window.innerHeight - (TOOLTIP_H + 40);
        if (!comfortable) {
          window.scrollTo({ top: window.scrollY + r.top - 120, behavior: "smooth" });
        }
      }
    }

    measure();
    let frames = 0;
    const iv = setInterval(() => {
      measure();
      if (++frames > 25) clearInterval(iv);
    }, 30);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearInterval(iv);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, i, measure, step]);

  if (!open || !step) return null;

  const pad = step.pad ?? PAD;
  const radius = step.radius ?? 14;
  const isLast = i === steps.length - 1;
  const next = () => (isLast ? onClose() : setI((n) => n + 1));

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Spotlight cutout (collapses to center on the welcome step)
  const cut = rect
    ? { x: rect.left - pad, y: rect.top - pad, width: rect.width + pad * 2, height: rect.height + pad * 2, rx: radius }
    : { x: vw / 2, y: vh / 2, width: 0, height: 0, rx: radius };

  // Tooltip position
  const width = Math.min(380, vw - 32);
  const left = (vw - width) / 2;
  let top;
  if (rect) {
    const below = rect.top + rect.height + pad + GAP;
    top = vh - below >= TOOLTIP_H ? below : rect.top - pad - GAP - TOOLTIP_H;
    top = Math.max(16, Math.min(top, vh - TOOLTIP_H - 16));
  } else {
    top = (vh - TOOLTIP_H) / 2;
  }

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}
      >
        <defs>
          <mask id="dash-cut">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect initial={false} animate={cut} transition={SPRING} fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#dash-cut)" />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, top, left, width }}
        animate={{ opacity: 1, scale: 1, top, left, width }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 }, top: SPRING, left: SPRING, width: SPRING }}
        style={{ position: "fixed", zIndex: 10000, pointerEvents: "auto" }}
      >
        <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-[18px] font-bold text-gray-900 leading-tight">{step.title}</p>
              <p className="text-[15px] text-gray-500 mt-1.5 leading-snug">{step.text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-1.5">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-5 bg-black" : "w-1.5 bg-gray-300"}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              {!isLast && (
                <button onClick={onClose} className="text-[14px] font-medium text-gray-400">
                  Skip
                </button>
              )}
              <button onClick={next} className="bg-black text-white text-[14px] font-semibold px-5 py-2.5 rounded-full active:scale-95 transition">
                {i === 0 ? "Show me" : isLast ? "Got it" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}