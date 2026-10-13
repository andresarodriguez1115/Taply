"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MODE_STEPS = {
  business: [
    { id: "studio-content", title: "Add your info", desc: "Fill in your name, title, and contact info here.", position: "top" },
    { id: "studio-design", title: "Make it yours", desc: "Pick your style, colors, font, and sizes.", position: "top" },
    { id: "save-btn", title: "Go live", desc: "Tap Save and share by link, QR, or NFC tap.", position: "bottom" },
  ],
  networking: [
    { id: "studio-content", title: "Add your info", desc: "Fill in your name, contact info, and link buttons here.", position: "top" },
    { id: "studio-design", title: "Make it yours", desc: "Pick your colors, font, and sizes.", position: "top" },
    { id: "save-btn", title: "Go live", desc: "Tap Save and share by link, QR, or NFC tap.", position: "bottom" },
  ],
  university: [
    { id: "studio-content", title: "Add your info", desc: "Fill in your academic info, bio, resume, contact, and projects here.", position: "top" },
    { id: "studio-design", title: "Make it yours", desc: "Pick your colors, font, and sizes.", position: "top" },
    { id: "save-btn", title: "Go live", desc: "Tap Save and share by link, QR, or NFC tap.", position: "bottom" },
  ],
  social: [
    { id: "studio-content", title: "Add your info", desc: "Fill in your bio, social icons, links, and shop here.", position: "top" },
    { id: "studio-design", title: "Make it yours", desc: "Pick your style, colors, font, and sizes.", position: "top" },
    { id: "save-btn", title: "Go live", desc: "Tap Save and share by link, QR, or NFC tap.", position: "bottom" },
  ],
}
const PAD = 8

export default function BuilderTutorial({ onComplete, onGoToContent, onGoToDesign, onCloseStudio, onOpenSection, mode = "business" }) {
  const STEPS = MODE_STEPS[mode] || MODE_STEPS.business
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

  const getElement = (id) => {
    const map = {
      "preview": "[data-tutorial='preview']",
      "preview-btn": "[data-tutorial='preview-btn']",
      "studio-intro": "[data-tutorial='studio-panel']",
      "studio-content": "[data-tutorial='studio-panel']",
      "studio-design": "[data-tutorial='studio-panel']",
      "content-tab": "[data-tutorial='content-tab']",
      "design-tab": "[data-tutorial='design-tab']",
      "identity-section": "[data-tutorial='identity-section']",
      "contact-fields": "[data-tutorial='contact-fields']",
      "save-btn": "[data-tutorial='save-btn']",
      "net-identity": "[data-tutorial='net-identity']",
      "net-contact": "[data-tutorial='net-contact']",
      "net-buttons": "[data-tutorial='net-buttons']",
      "uni-academic": "[data-tutorial='uni-academic']",
      "uni-bio": "[data-tutorial='uni-bio']",
      "uni-resume": "[data-tutorial='uni-resume']",
      "uni-contact": "[data-tutorial='uni-contact']",
      "uni-projects": "[data-tutorial='uni-projects']",
      "social-identity": "[data-tutorial='social-identity']",
      "social-icons": "[data-tutorial='social-icons']",
      "social-links": "[data-tutorial='social-links']",
      "social-products": "[data-tutorial='social-products']",
      "design-style": "[data-tutorial='design-style']",
      "soc-design-style": "[data-tutorial='soc-design-style']",
      "design-background": "[data-tutorial='design-background']",
      "design-text-colors": "[data-tutorial='design-text-colors']",
      "design-font": "[data-tutorial='design-font']",
      "design-content-size": "[data-tutorial='design-content-size']",
      "net-design-background": "[data-tutorial='net-design-background']",
      "net-design-text-colors": "[data-tutorial='net-design-text-colors']",
      "net-design-font": "[data-tutorial='net-design-font']",
      "net-design-content-size": "[data-tutorial='net-design-content-size']",
      "uni-design-background": "[data-tutorial='uni-design-background']",
      "uni-design-text-colors": "[data-tutorial='uni-design-text-colors']",
      "uni-design-font": "[data-tutorial='uni-design-font']",
      "uni-design-content-size": "[data-tutorial='uni-design-content-size']",
      "soc-design-background": "[data-tutorial='soc-design-background']",
      "soc-design-text-colors": "[data-tutorial='soc-design-text-colors']",
      "soc-design-font": "[data-tutorial='soc-design-font']",
      "soc-design-content-size": "[data-tutorial='soc-design-content-size']",
      "profile-photo-btn": "[data-tutorial='profile-photo-btn']",
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
    const currentId = STEPS[step]?.id
    if (!currentId) return

    if (currentId === "design-tab" || currentId === "studio-design") {
      const panel = document.querySelector(".overflow-y-auto")
      if (panel) panel.scrollTop = 0
    }

    const uniContentIds = [
      "identity-section", "uni-academic", "uni-bio",
      "uni-resume", "uni-contact", "uni-projects",
    ]
    const isUniContent = mode === "university" && uniContentIds.includes(currentId)

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

      if (isUniContent) {
        // University content: scroll once, then keep updating rect so spotlight tracks
        const panel = el.closest(".overflow-y-auto")
        if (!scrollTriggered) {
          scrollTriggered = true
          if (panel) {
            const panelRect = panel.getBoundingClientRect()
            const elRect = el.getBoundingClientRect()
            const scrollTop = panel.scrollTop + (elRect.top - panelRect.top) - 80
            panel.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" })
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }
        const r = el.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) {
          if (frames > 40) clearInterval(interval)
          return
        }
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
        setDisplayStep(step)
        if (frames > 30) clearInterval(interval)
        return
      }

      // All other steps: scroll once, then keep tracking until scroll settles
      if (!scrollTriggered) {
        scrollTriggered = true
        const panel = el.closest(".overflow-y-auto")
        if (panel) {
          const panelRect = panel.getBoundingClientRect()
          const elRect = el.getBoundingClientRect()
          const isFullyVisible =
            elRect.top >= panelRect.top + 12 &&
            elRect.bottom <= panelRect.bottom - 12
          if (!isFullyVisible) {
            const scrollTop = elRect.bottom > panelRect.bottom - 12
              ? panel.scrollTop + (elRect.bottom - panelRect.bottom) + 24
              : panel.scrollTop + (elRect.top - panelRect.top) - 24
            panel.scrollTo({ top: Math.max(0, scrollTop), behavior: "auto" })
          }
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) {
        if (frames > 40) clearInterval(interval)
        return
      }
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      setDisplayStep(step)
      if (frames > 20) clearInterval(interval)
    }

    interval = setInterval(findAndMeasure, 50)
    findAndMeasure()

    return () => clearInterval(interval)
  }, [step])

  useEffect(() => {
    const update = () => measureRect(STEPS[step].id)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true) }
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      const nextStep = STEPS[step + 1]
      if (nextStep.id === "studio-design") onGoToDesign?.()
      if (nextStep.id === "save-btn") onCloseStudio?.()
      setStep(s => s + 1)
    } else {
      localStorage.setItem(`taply_tutorial_done_${mode}`, "1")
      localStorage.setItem("taply_builder_tutorial_done", "1")
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem(`taply_tutorial_done_${mode}`, "1")
    localStorage.setItem("taply_builder_tutorial_done", "1")
    onComplete()
  }

  if (!rect) return null

const TOOLTIP_HEIGHT = 210
const TOOLTIP_GAP = 12

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

const wideTooltipIds = ["studio-content", "studio-design", "content-tab", "design-tab", "profile-photo-btn", "save-btn", "preview-btn", "preview"]
const shouldUseWideTooltip = wideTooltipIds.includes(current.id)

const tooltipWidth = shouldUseWideTooltip
  ? Math.min(420, window.innerWidth - 32)
  : Math.min(Math.max(rect.width + PAD * 2, 280), window.innerWidth - 32)

const tooltipLeft = shouldUseWideTooltip
  ? Math.max(16, (window.innerWidth - tooltipWidth) / 2)
  : Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
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
              animate={{ x: (rect?.left ?? 0) - PAD, y: (rect?.top ?? 0) - PAD, width: (rect?.width ?? 0) + PAD * 2, height: (rect?.height ?? 0) + PAD * 2 }}
              transition={{ duration: step === 0 ? 0 : 0.3, ease: "easeInOut" }}
              rx="14" fill="black"
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#builder-cut)" />
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
