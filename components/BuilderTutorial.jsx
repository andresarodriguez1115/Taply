"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MODE_STEPS = {
  business: [
    { id: "mode-selector", title: "Business mode", desc: "Your professional digital card, shared in one tap.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Add your name, title, and contact info here.", position: "bottom" },
    { id: "identity-section", title: "Name & title", desc: "Use your real name and a clear, specific title.", position: "bottom" },
    { id: "contact-fields", title: "Contact fields", desc: "Toggle on what you want people to see and tap.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Control every visual aspect of your card.", position: "top" },
    { id: "design-background", title: "Background", desc: "Pick a color or gradient that matches your brand.", position: "bottom" },
    { id: "design-text-colors", title: "Text colors", desc: "Set name and title colors with enough contrast.", position: "bottom" },
    { id: "design-font", title: "Font", desc: "Choose a typeface that fits your style.", position: "bottom" },
    { id: "design-content-size", title: "Content size", desc: "Scale elements up or down to fit your layout.", position: "bottom" },
    { id: "profile-photo-btn", title: "Profile photo", desc: "Upload a photo — faces make cards memorable.", position: "bottom" },
    { id: "save-btn", title: "Save", desc: "Go live. Share via link, QR, or NFC tap.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is exactly what people see. You're done.", position: "top" },
  ],
  networking: [
    { id: "mode-selector", title: "Networking mode", desc: "Your in-person card for events, fairs, and meetups.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Fill in your identity, contact info, and link buttons.", position: "bottom" },
    { id: "net-identity", title: "Name & title", desc: "Be specific — 'Software Engineer @ Google' not just 'Engineer'.", position: "bottom" },
    { id: "net-contact", title: "Contact circles", desc: "Toggle phone, email, and location. Each becomes a tap circle.", position: "top" },
    { id: "net-buttons", title: "Link buttons", desc: "Add links to your work, socials, or website so people can follow up.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Control every visual aspect of your card.", position: "top" },
    { id: "net-design-background", title: "Background", desc: "Pick a color or gradient that matches your brand.", position: "bottom" },
    { id: "net-design-text-colors", title: "Text colors", desc: "Set name and title colors with enough contrast.", position: "bottom" },
    { id: "net-design-font", title: "Font", desc: "Choose a typeface that fits your style.", position: "bottom" },
    { id: "net-design-content-size", title: "Content size", desc: "Scale elements up or down to fit your layout.", position: "bottom" },
    { id: "profile-photo-btn", title: "Change photo", desc: "Upload a photo — faces make cards memorable.", position: "bottom" },
    { id: "save-btn", title: "Save", desc: "Go live. Share via link, QR, or NFC tap.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is exactly what people see. You're done.", position: "top" },
  ],
  university: [
    { id: "mode-selector", title: "University mode", desc: "Your student card for career fairs and recruiters.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Fill in your academic info, bio, resume, contact info, and projects here.", position: "bottom" },
    { id: "identity-section", title: "Name & major", desc: "Use your real name and format clearly — 'CS @ MIT, Class of 2026'.", position: "bottom" },
    { id: "uni-academic", title: "Academic info", desc: "Add your GPA and grad year. They show as stat cards.", position: "top" },
    { id: "uni-bio", title: "Bio", desc: "Write a short intro about yourself, your interests, and what you're working on.", position: "top" },
    { id: "uni-resume", title: "Resume link", desc: "Paste a Drive or Notion link. Shows as a 'View Resume' button.", position: "top" },
    { id: "uni-contact", title: "Contact", desc: "Add phone, email, and LinkedIn so recruiters can reach you.", position: "top" },
    { id: "uni-projects", title: "Portfolio projects", desc: "Add projects with a title, subtitle, and link. Shows in a grid.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Control every visual aspect of your card.", position: "top" },
    { id: "uni-design-background", title: "Background", desc: "Pick a color or gradient that matches your brand.", position: "bottom" },
    { id: "uni-design-text-colors", title: "Text colors", desc: "Set name and title colors with enough contrast.", position: "bottom" },
    { id: "uni-design-font", title: "Font", desc: "Choose a typeface that fits your style.", position: "bottom" },
    { id: "uni-design-content-size", title: "Content size", desc: "Scale elements up or down to fit your layout.", position: "bottom" },
    { id: "profile-photo-btn", title: "Profile photo", desc: "Upload a photo — faces make cards memorable.", position: "bottom" },
    { id: "save-btn", title: "Save", desc: "Go live. Share via link, QR, or NFC tap.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is exactly what people see. You're done.", position: "top" },
  ],
  social: [
    { id: "mode-selector", title: "Social mode", desc: "Your link-in-bio for creators — links, shop, and social handles in one page.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Set up your name, bio, social icons, link cards, and shop products here.", position: "bottom" },
    { id: "social-identity", title: "Name & bio", desc: "Your display name and one-line bio — make it clear who you are.", position: "bottom" },
    { id: "social-icons", title: "Social icons", desc: "Toggle on your handles. Each shows as a branded icon circle.", position: "top" },
    { id: "social-links", title: "Link cards", desc: "Add big link cards with a title, URL, and cover image.", position: "top" },
    { id: "social-products", title: "Shop products", desc: "Add products with a name, price, image, and buy link.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Control every visual aspect of your page.", position: "top" },
    { id: "soc-design-background", title: "Background", desc: "Pick a color that fits your vibe.", position: "bottom" },
    { id: "soc-design-text-colors", title: "Text colors", desc: "Set name and bio colors with enough contrast.", position: "bottom" },
    { id: "soc-design-font", title: "Font", desc: "Choose a typeface that fits your style.", position: "bottom" },
    { id: "soc-design-content-size", title: "Content size", desc: "Scale elements up or down to fit your layout.", position: "bottom" },
    { id: "profile-photo-btn", title: "Profile photo", desc: "Upload a photo — faces make pages memorable.", position: "bottom" },
    { id: "save-btn", title: "Save", desc: "Go live. Share via link, QR, or NFC tap.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is exactly what people see. You're done.", position: "top" },
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
      "mode-selector": "[data-tutorial='mode-selector']",
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

    if (currentId === "design-tab") {
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

      // All other steps: original logic
      const panel = el.closest(".overflow-y-auto")
      if (panel) {
        const panelRect = panel.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const isFullyVisible =
          elRect.top >= panelRect.top + 12 &&
          elRect.bottom <= panelRect.bottom - 12
        if (!isFullyVisible) {
          const scrollTop = panel.scrollTop + (elRect.top - panelRect.top) - 80
          panel.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" })
        }
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) return
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      setDisplayStep(step)
      clearInterval(interval)
    }

    interval = setInterval(findAndMeasure, 50)
    findAndMeasure()

    return () => clearInterval(interval)
  }, [step])

  useEffect(() => {
    const update = () => measureRect(STEPS[step].id)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update)
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update) }
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      const nextStep = STEPS[step + 1]
      const currentStep = STEPS[step]
      if (currentStep.id === "mode-selector") onGoToContent?.()
      if (nextStep.id === "design-tab") onGoToDesign?.()
      if (nextStep.id === "profile-photo-btn") onCloseStudio?.()
      if (nextStep.id === "save-btn") onCloseStudio?.()

           const keepClosedIds = [
        // Shared / Business content accordions
        "identity-section",
        "contact-fields",

        // Business design accordions
        "design-background",
        "design-text-colors",
        "design-font",
        "design-content-size",

        // Networking content accordions
        "net-identity",
        "net-contact",
        "net-buttons",

        // Networking design accordions
        "net-design-background",
        "net-design-text-colors",
        "net-design-font",
        "net-design-content-size",

        // University content accordions
        "uni-academic",
        "uni-bio",
        "uni-resume",
        "uni-contact",
        "uni-projects",

        // University design accordions
        "uni-design-background",
        "uni-design-text-colors",
        "uni-design-font",
        "uni-design-content-size",

        // Social content accordions
        "social-identity",
        "social-icons",
        "social-links",
        "social-products",

        // Social design accordions
        "soc-design-background",
        "soc-design-text-colors",
        "soc-design-font",
        "soc-design-content-size",
      ]

      if (nextStep.id && !keepClosedIds.includes(nextStep.id)) {
        onOpenSection?.(nextStep.id)
      }

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

const wideTooltipIds = ["content-tab", "design-tab", "profile-photo-btn", "save-btn"]
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
