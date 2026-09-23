"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  {
    id: "first-profile",
    title: "Tap to set as Active",
    desc: "Tap any card to make it active. That's what people see on your link.",
    position: "bottom",
  },
  {
    id: "profile-edit",
    title: "Edit your profile",
    desc: "Edit takes you back into the builder.",
    position: "bottom",
  },
  {
    id: "profile-share",
    title: "Share your card",
    desc: "Share sends your link via text, email, or socials.",
    position: "bottom",
  },
  {
    id: "profile-delete",
    title: "Delete a profile",
    desc: "Delete removes it. You can always make a new one.",
    position: "bottom",
  },
  {
    id: "profile-qr",
    title: "Your QR code",
    desc: "Scan this to open your profile instantly.",
    position: "bottom",
  },
]

const PAD = 8
const TOOLTIP_HEIGHT = 190
const TOOLTIP_GAP = 12

export default function ProfileCardTutorial({ onComplete }) {
  const [step, setStep] = useState(0)
  const [displayStep, setDisplayStep] = useState(0)
  const [rect, setRect] = useState(null)
  const current = STEPS[displayStep]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  const getElement = (id) => document.querySelector(`[data-tutorial='${id}']`)

  useEffect(() => {
    const currentId = STEPS[step]?.id
    if (!currentId) return

    let frames = 0
    let scrollTriggered = false
    let interval

    const findAndMeasure = () => {
      frames++
      const el = getElement(currentId)

      if (!el) {
        if (frames > 40) clearInterval(interval)
        return
      }

      if (!scrollTriggered) {
        scrollTriggered = true
        el.scrollIntoView({ behavior: "instant", block: "center" })
      }

      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) {
        if (frames > 40) clearInterval(interval)
        return
      }

      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      setDisplayStep(step)

      if (frames > 30) clearInterval(interval)
    }

    interval = setInterval(findAndMeasure, 50)
    findAndMeasure()

    return () => clearInterval(interval)
  }, [step])

  useEffect(() => {
    const update = () => {
      const el = getElement(STEPS[step]?.id)
      if (!el) return
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      localStorage.setItem("taply_profile_card_tutorial_done", "1")
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem("taply_profile_card_tutorial_done", "1")
    onComplete()
  }

  if (!rect) return null

  const spaceBelow = window.innerHeight - (rect.top + rect.height + PAD + TOOLTIP_GAP)
  const spaceAbove = rect.top - PAD - TOOLTIP_GAP

  let tooltipTop
  if (current.position === "bottom") {
    tooltipTop =
      spaceBelow >= TOOLTIP_HEIGHT || spaceBelow >= spaceAbove
        ? rect.top + rect.height + PAD + TOOLTIP_GAP
        : rect.top - PAD - TOOLTIP_GAP - TOOLTIP_HEIGHT
  } else {
    tooltipTop =
      spaceAbove >= TOOLTIP_HEIGHT || spaceAbove >= spaceBelow
        ? rect.top - PAD - TOOLTIP_GAP - TOOLTIP_HEIGHT
        : rect.top + rect.height + PAD + TOOLTIP_GAP
  }

  tooltipTop = Math.max(16, Math.min(tooltipTop, window.innerHeight - TOOLTIP_HEIGHT - 16))

  const tooltipWidth = Math.min(Math.max(rect.width + PAD * 2, 300), window.innerWidth - 32)
  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "auto", touchAction: "none" }}>
      <motion.svg
        initial={{ opacity: step === 0 ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: step === 0 ? 0.4 : 0.3 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}
      >
        <defs>
          <mask id="profile-card-cut">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              animate={{ x: rect.left - PAD, y: rect.top - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }}
              transition={{ duration: step === 0 ? 0 : 0.3, ease: "easeInOut" }}
              rx="14" fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#profile-card-cut)" />
      </motion.svg>

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