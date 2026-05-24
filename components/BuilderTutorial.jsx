"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  {
    id: "mode-selector",
    title: "Pick your mode",
    desc: "Choose Business, Networking, University, or Social. Each has its own layout built for that situation.",
    position: "top",
  },
  {
    id: "content-tab",
    title: "Content tab",
    desc: "This is where you control all the information shown on your card.",
    position: "bottom",
  },
  {
    id: "identity-section",
    title: "Your identity",
    desc: "Set your name and title — this is the first thing people see on your card.",
    position: "bottom",
  },
  {
    id: "contact-fields",
    title: "Contact fields",
    desc: "Toggle on phone, email, LinkedIn, and more. Only what you turn on will show.",
    position: "top",
  },
  {
    id: "design-tab",
    title: "Customize the look",
    desc: "Tap Design to change your background color and style.",
    position: "top",
  },
{
    id: "save-btn",
    title: "Save your profile",
    desc: "When you're happy with it, tap Save. It'll appear in your dashboard instantly.",
    position: "bottom",
  },
  {
    id: "preview",
    title: "You're all set!",
    desc: "This is your live card — exactly how others will see it. Customize anytime from your dashboard.",
    position: "top",
  },
]

export default function BuilderTutorial({ onComplete, onOpenStudio, onGoToContent, onGoToDesign, onCloseStudio }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)

  const current = STEPS[step]

  const getElement = (id) => {
    const map = {
      "preview": "[data-tutorial='preview']",
      "mode-selector": "[data-tutorial='mode-selector']",
      "content-tab": "[data-tutorial='content-tab']",
      "design-tab": "[data-tutorial='design-tab']",
    "identity-section": "[data-tutorial='identity-section']",
      "contact-fields": "[data-tutorial='contact-fields']",
      "save-btn": "[data-tutorial='save-btn']",
    }
    return document.querySelector(map[id])
  }

  const measureRect = useCallback(() => {
    const el = getElement(current.id)
    if (!el) return
    const r = el.getBoundingClientRect()
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [current.id])

useEffect(() => {
    setRect(null)
    if (step === 4) {
      const panel = document.querySelector(".overflow-y-auto")
      if (panel) panel.scrollTop = 0
    }
    if (step === 5) setTimeout(() => onCloseStudio?.(), 100)
    const el = getElement(current.id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    const t1 = setTimeout(measureRect, 400)
    const t2 = setTimeout(measureRect, 700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [step])

  useEffect(() => {
    window.addEventListener("resize", measureRect)
    window.addEventListener("scroll", measureRect)
    return () => {
      window.removeEventListener("resize", measureRect)
      window.removeEventListener("scroll", measureRect)
    }
  }, [measureRect])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
if (step === 0) onGoToContent?.()
      if (step === 3) onGoToDesign?.()
    if (step === 4) onCloseStudio?.()
      setRect(null)
      setTimeout(() => setStep(s => s + 1), 200)
    } else {
      localStorage.setItem("taply_builder_tutorial_done", "1")
      onComplete()
    }
  }

  const PAD = 8

  if (!rect) return null

  const tooltipTop = current.position === "bottom"
    ? Math.min(rect.top + rect.height + PAD + 12, window.innerHeight - 200)
    : Math.max(rect.top - PAD - 12 - 160, 20)

  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - 320))

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}>
        <defs>
          <mask id="builder-cut">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - PAD}
              y={rect.top - PAD}
              width={rect.width + PAD * 2}
              height={rect.height + PAD * 2}
              rx="14"
              fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#builder-cut)" />
      </svg>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: current.position === "bottom" ? -6 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: tooltipTop,
          left: Math.max(16, Math.min(tooltipLeft, window.innerWidth - 300)),
          width: 280,
          zIndex: 10000,
          pointerEvents: "auto",
        }}
      >
        <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-2xl">
          <p className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-wider">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-[15px] font-bold text-white mb-1">{current.title}</p>
          <p className="text-[13px] text-white/55 leading-relaxed mb-4">{current.desc}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 18 : 6,
                    height: 6,
                    background: i === step ? "white" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="bg-white text-black text-[13px] font-bold px-5 py-2 rounded-xl"
            >
              {step < STEPS.length - 1 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
