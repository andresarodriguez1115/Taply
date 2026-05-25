"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  {
    selector: "[data-tutorial='first-profile']",
    title: "Tap to set as Active",
    desc: "Tap any profile card to make it your active profile. The active one is what people see when they visit your link.",
  },
  {
    selector: "[data-tutorial='profile-edit']",
    title: "Edit your profile",
    desc: "Tap Edit to go back into the builder and update your name, contact info, design, or anything else.",
  },
  {
    selector: "[data-tutorial='profile-share']",
    title: "Share your card",
    desc: "Tap Share to send your profile link to anyone via text, email, or social media.",
  },
{
    selector: "[data-tutorial='profile-delete']",
    title: "Delete a profile",
    desc: "Tap Delete to remove a profile. You can always create a new one from the dashboard.",
  },
  {
    selector: "[data-tutorial='profile-qr']",
    title: "Your QR code",
    desc: "Tap this to pull up your QR code. Anyone can scan it to visit your profile instantly.",
  },
]

export default function ProfileCardTutorial({ onComplete }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)
  const [visible, setVisible] = useState(false)

  const current = STEPS[step]

  useEffect(() => {
    setVisible(false)
    setRect(null)
    const el = document.querySelector(current.selector)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    setTimeout(() => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      setVisible(true)
    }, 500)
  }, [step])

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setVisible(false)
      setRect(null)
      setTimeout(() => setStep(step + 1), 200)
    } else {
      localStorage.setItem("taply_profile_card_tutorial_done", "1")
      onComplete()
    }
  }

  const PAD = 8

  if (!visible || !rect) return null

const tooltipTop = Math.min(rect.top + rect.height + PAD + 12, window.innerHeight - 220)
const tooltipWidth = Math.min(Math.max(rect.width + PAD * 2, 300), window.innerWidth - 32)
const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
        style={{ pointerEvents: "none" }}
      >
        <svg style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "auto" }}>
          <defs>
            <mask id="profile-card-cut">
              <rect width="100%" height="100%" fill="white" />
              <rect x={rect.left - PAD} y={rect.top - PAD} width={rect.width + PAD * 2} height={rect.height + PAD * 2} rx="14" fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.65)" mask="url(#profile-card-cut)" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={{ position: "fixed", top: tooltipTop, left: tooltipLeft, width: tooltipWidth, maxWidth: 340, zIndex: 10000, pointerEvents: "auto" }}
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-2xl">
            <p className="text-[11px] font-semibold text-white/40 mb-1 uppercase tracking-wider">Step {step + 1} of {STEPS.length}</p>
            <p className="text-[15px] font-bold text-white mb-1">{current.title}</p>
            <p className="text-[13px] text-white/55 leading-relaxed mb-4">{current.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{ width: i === step ? 18 : 6, height: 6, background: i === step ? "white" : "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <button onClick={handleNext} className="bg-white text-black text-[13px] font-bold px-5 py-2 rounded-xl">
                {step < STEPS.length - 1 ? "Next" : "Got it"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}