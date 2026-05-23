"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  {
    id: "hero",
    title: "Welcome to Taply",
    desc: "Your name, personal link, and stats all live here at the top of your dashboard.",
    position: "bottom",
  },
{
    id: "navlink",
    title: "Your live link",
    desc: "The green dot means your profile is active and live. Anyone who visits taply.now/username sees your card right now.",
    position: "bottom",
  },
  {
    id: "stats",
    title: "Your stats",
    desc: "Views, taps, and save rate update in real time as people visit your card.",
    position: "bottom",
  },
  {
    id: "create",
    title: "Create your first profile",
    desc: "Tap here to build a card. Pick from Business, University, Networking, or Social mode.",
    position: "top",
  },

{
    id: "wallet",
    title: "Apple Wallet",
    desc: "Generate a native Apple Wallet pass from your active profile for instant lock screen access.",
    position: "top",
  },
{
    id: "addwallet",
    title: "Add to Wallet",
    desc: "Tap this to download your pass directly to Apple Wallet. Works instantly from your lock screen.",
    position: "top-far",
  },
  {
    id: "customize",
    title: "Customize your pass",
    desc: "Hit Customize to pick your card color, text color, and add your company logo before generating.",
    position: "top-far",
  },
]

export default function DashboardTutorial({ onComplete }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)
  const [visible, setVisible] = useState(false)

  const current = STEPS[step]

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

  const updateRect = () => {
    const el = getElement(current.id)
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
    setVisible(false)
    setRect(null)
    const el = getElement(current.id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    const t1 = setTimeout(() => { updateRect(); setVisible(true) }, 500)
    const t2 = setTimeout(() => { updateRect() }, 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [step])

  useEffect(() => {
    const update = () => updateRect()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update)
    }
  }, [step])

const handleNext = () => {
    if (step < STEPS.length - 1) {
      setVisible(false)
      setRect(null)
      setTimeout(() => setStep(step + 1), 200)
    } else {
      localStorage.setItem("taply_tutorial_done", "1")
      onComplete()
    }
  }

  const PAD = 8

  if (!visible || !rect) return null

const tooltipTop = current.position === "bottom"
    ? rect.top + rect.height + PAD + 12
    : current.position === "top-far"
    ? rect.top - PAD - 12 - 200
    : rect.top - PAD - 12 - 160

  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - 320))

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999]"
        style={{ pointerEvents: "none" }}
      >
        {/* Dark overlay with cutout */}
        <svg
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "auto",
          }}
        >
          <defs>
            <mask id="cut">
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
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.65)"
            mask="url(#cut)"
          />
        </svg>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: current.position === "bottom" ? -6 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={{
            position: "fixed",
            top: tooltipTop,
            left: tooltipLeft,
            width: Math.min(rect.width + PAD * 2, window.innerWidth - 32),
            maxWidth: 340,
            zIndex: 10000,
            pointerEvents: "auto",
          }}
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-2xl">
            {/* Step label */}
            <p className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-wider">
              Step {step + 1} of {STEPS.length}
            </p>
            <p className="text-[15px] font-bold text-white mb-1">{current.title}</p>
            <p className="text-[13px] text-white/55 leading-relaxed mb-4">{current.desc}</p>

            <div className="flex items-center justify-between">
              {/* Step dots */}
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
      </motion.div>
    </AnimatePresence>
  )
}
