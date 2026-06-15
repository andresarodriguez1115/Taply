"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  { id: "hero", title: "Welcome to Taply", desc: "Your name, personal link, and stats all live here at the top of your dashboard.", position: "bottom" },
  { id: "navlink", title: "Your live link", desc: "The green dot means your profile is active and live. Anyone who visits taply.now/username sees your card right now.", position: "bottom" },
  { id: "stats", title: "Your stats", desc: "Views, taps, and save rate update in real time as people visit your card.", position: "bottom" },
  { id: "create", title: "Create your first profile", desc: "Tap here to build a card. Pick from Business, University, Networking, or Social mode.", position: "top" },
  { id: "addwallet", title: "Add to Wallet", desc: "Tap this to download your pass directly to Apple Wallet. Works instantly from your lock screen.", position: "top-far" },
  { id: "customize", title: "Customize your pass", desc: "Hit Customize to pick your card color, text color, and add your company logo before generating.", position: "top-far" },
]

const PAD = 8

export default function DashboardTutorial({ onComplete }) {
  const [step, setStep] = useState(0)
  const [displayStep, setDisplayStep] = useState(0) // delayed text
  const [rect, setRect] = useState(null)
  const [visible, setVisible] = useState(false)
useEffect(() => {
  const preventUserScroll = (e) => {
    e.preventDefault()
  }

  const preventKeys = (e) => {
    const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]
    if (keys.includes(e.key)) e.preventDefault()
  }

  document.body.style.overflowX = "hidden"
  document.documentElement.style.overflowX = "hidden"

  window.addEventListener("wheel", preventUserScroll, { passive: false })
  window.addEventListener("touchmove", preventUserScroll, { passive: false })
  window.addEventListener("keydown", preventKeys)

  return () => {
    document.body.style.overflowX = ""
    document.documentElement.style.overflowX = ""

    window.removeEventListener("wheel", preventUserScroll)
    window.removeEventListener("touchmove", preventUserScroll)
    window.removeEventListener("keydown", preventKeys)
  }
}, [])
  const current = STEPS[displayStep]

  const getElement = (id) => {
    const map = {
      hero: "[data-tutorial='hero']",
      navlink: "[data-tutorial='navlink']",
      stats: "[data-tutorial='stats']",
      create: "[data-tutorial='create']",
      profiles: "[data-tutorial='profiles']",
      wallet: "[data-tutorial='wallet']",
      username: "[data-tutorial='username']",
      customize: "[data-tutorial='customize']",
      addwallet: "[data-tutorial='addwallet']",
    }
    return document.querySelector(map[id])
  }

const updateRect = (id) => {
    const el = getElement(id)
    if (!el) return

    const r = el.getBoundingClientRect()

    setRect({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    })
}

useEffect(() => {
  const id = STEPS[step].id
  const el = getElement(id)
  if (!el) return

  setDisplayStep(step)

  const r = el.getBoundingClientRect()
  const absoluteTop = window.scrollY + r.top

  const offset =
    step === 4 || step === 5
      ? 80
      : window.innerHeight / 2 - r.height / 2

  window.scrollTo({
    top: Math.max(0, absoluteTop - offset),
    behavior: "smooth",
  })

  const t1 = setTimeout(() => {
    updateRect(id)
    setVisible(true)
  }, 0)

  const t2 = setTimeout(() => updateRect(id), 120)
  const t3 = setTimeout(() => updateRect(id), 300)
  const t4 = setTimeout(() => updateRect(id), 500)

  return () => {
    clearTimeout(t1)
    clearTimeout(t2)
    clearTimeout(t3)
    clearTimeout(t4)
  }
}, [step])

useEffect(() => {
  const update = () => updateRect(STEPS[step].id)

  window.addEventListener("resize", update)
  window.addEventListener("scroll", update, true)

  return () => {
    window.removeEventListener("resize", update)
    window.removeEventListener("scroll", update, true)
  }
}, [step])
  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else { localStorage.setItem("taply_tutorial_done", "1"); onComplete() }
  }

  const handleSkip = () => {
    localStorage.setItem("taply_tutorial_done", "1")
    onComplete()
  }

  if (!visible || !rect) return null

  const tooltipTop = current.position === "bottom"
    ? rect.top + rect.height + PAD + 12
    : current.position === "top-far"
    ? rect.top - PAD - 12 - 200
    : rect.top - PAD - 12 - 160

  const tooltipWidth = Math.min(Math.max(rect.width + PAD * 2, 300), window.innerWidth - 32)
  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
        {/* Overlay */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}>
          <defs>
            <mask id="cut">
              <rect width="100%" height="100%" fill="white" />
              <motion.rect
                animate={{ x: rect.left - PAD, y: rect.top - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }}
                transition={{ duration: step === 0 ? 0 : 0.3, ease: "easeInOut" }}
                rx="14" fill="black"
              />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#cut)" />
      </motion.svg>

        {/* Tooltip */}
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
            {/* Animate text content change */}
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
      </motion.div>
    </AnimatePresence>
  )
}