"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  { id: "mode-selector", title: "Pick your mode", desc: "Choose Business, Networking, University, or Social. Each has its own layout built for that situation.", position: "top" },
  { id: "content-tab", title: "Content tab", desc: "This is where you control all the information shown on your card.", position: "bottom" },
  { id: "identity-section", title: "Your identity", desc: "Set your name and title — this is the first thing people see on your card.", position: "bottom" },
  { id: "contact-fields", title: "Contact fields", desc: "Toggle on phone, email, LinkedIn, and more. Only what you turn on will show.", position: "top" },
  { id: "design-tab", title: "Customize the look", desc: "Tap Design to change your background color and style.", position: "top" },
  { id: "save-btn", title: "Save your profile", desc: "When you're happy with it, tap Save. It'll appear in your dashboard instantly.", position: "bottom" },
  { id: "preview", title: "You're all set!", desc: "This is your live card — exactly how others will see it. Customize anytime from your dashboard.", position: "top" },
]

const PAD = 8

export default function BuilderTutorial({ onComplete, onGoToContent, onGoToDesign, onCloseStudio }) {
  const [step, setStep] = useState(0)
  const [displayStep, setDisplayStep] = useState(0)
  const [rect, setRect] = useState(null)
  const current = STEPS[displayStep]
useEffect(() => {

  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"

  const panels = document.querySelectorAll(".overflow-y-auto")

  panels.forEach((panel) => {
    panel.style.overflow = "hidden"
  })

  return () => {

    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""

    panels.forEach((panel) => {
      panel.style.overflow = ""
    })

  }

}, [])
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

  const measureRect = useCallback((id) => {
    const el = getElement(id || STEPS[step].id)
    if (!el) return
    const r = el.getBoundingClientRect()
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [step])

  useEffect(() => {
    if (step === 4) {
      const panel = document.querySelector(".overflow-y-auto")
      if (panel) panel.scrollTop = 0
    }
    if (step === 5) setTimeout(() => onCloseStudio?.(), 100)
    const el = getElement(STEPS[step].id)
    if (!el) return
    // scroll the inner panel if element is inside one
    const panel = el.closest(".overflow-y-auto")
if (panel) {
  const elTop = el.offsetTop - panel.offsetTop

  panel.scrollTo({
    top: elTop - panel.clientHeight / 2 + el.clientHeight / 2,
    behavior: "smooth",
  })

  let frames = 0

  const interval = setInterval(() => {
    measureRect(STEPS[step].id)
    frames++

    if (frames > 25) {
      clearInterval(interval)
    }
  }, 16)

} else {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    const t1 = setTimeout(() => { measureRect(STEPS[step].id); setDisplayStep(step) }, 0)
    return () => clearTimeout(t1)
  }, [step])

  useEffect(() => {
    const update = () => measureRect(STEPS[step].id)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update)
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update) }
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      if (step === 0) onGoToContent?.()
      if (step === 3) onGoToDesign?.()
      if (step === 4) onCloseStudio?.()
      setStep(s => s + 1)
    } else {
      localStorage.setItem("taply_builder_tutorial_done", "1")
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem("taply_builder_tutorial_done", "1")
    onComplete()
  }

  if (!rect) return null

  const tooltipTop = current.position === "bottom"
    ? Math.min(rect.top + rect.height + PAD + 12, window.innerHeight - 220)
    : Math.max(rect.top - PAD - 12 - 170, 20)

  const tooltipWidth = Math.min(Math.max(rect.width + PAD * 2, 280), window.innerWidth - 32)
  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      {/* Overlay — never unmounts, spotlight animates */}
      <motion.svg
        initial={{ opacity: step === 0 ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: step === 0 ? 0.4 : 0.3 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}
      >
        <defs>
          <mask id="builder-cut">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              animate={{ x: rect.left - PAD, y: rect.top - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }}
              transition={{ duration: step === 0 ? 0 : 0.3, ease: "easeInOut" }}
              rx="14" fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#builder-cut)" />
      </motion.svg>

      {/* Tooltip — always present, slides to new position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, top: tooltipTop, left: tooltipLeft, width: tooltipWidth }}
        transition={{
          opacity: { duration: 0.25 },
          scale: { duration: 0.25 },
          top: { duration: step === 0 ? 0 : 0.3, ease: "easeInOut" },
          left: { duration: step === 0 ? 0 : 0.3, ease: "easeInOut" },
          width: { duration: step === 0 ? 0 : 0.3, ease: "easeInOut" },
        }}
        style={{ position: "fixed", zIndex: 10000, pointerEvents: "auto" }}
      >
        <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
              Step {displayStep + 1} of {STEPS.length}
            </p>
            <button onClick={handleSkip} className="text-[11px] text-white/40 hover:text-white/70 transition" style={{ pointerEvents: "auto" }}>
              Skip
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={displayStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <p className="text-[15px] font-bold text-white mb-1">{current.title}</p>
              <p className="text-[13px] text-white/55 leading-relaxed mb-4">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300"
                  style={{ width: i === displayStep ? 18 : 6, height: 6, background: i === displayStep ? "white" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
            <button onClick={handleNext} style={{ pointerEvents: "auto" }}
              className="bg-white text-black text-[13px] font-bold px-5 py-2 rounded-xl">
              {step < STEPS.length - 1 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}