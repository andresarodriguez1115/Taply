"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MODE_STEPS = {
  business: [
    { id: "mode-selector", title: "Business mode", desc: "Professional digital card — name, photo, title, and instant contact links. Perfect for handing out at meetings, conferences, or client calls.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "This is where you build your card. Add your name, title, and toggle on exactly the contact fields you want people to see.", position: "bottom" },
    { id: "identity-section", title: "Name & title", desc: "Your name and title are the headline. Use your real name and a clear title — 'Sales Manager at Acme' beats 'Entrepreneur'.", position: "bottom" },
    { id: "contact-fields", title: "Contact fields", desc: "Toggle on phone, email, LinkedIn, Instagram, or website. Each one becomes a tappable row on your card. Only show what you want shared.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Pick a background color or gradient and a font. Subtle and clean reads better in person — your card speaks before you do.", position: "top" },
    { id: "save-btn", title: "Save", desc: "Tap Save to go live. Your card is instantly shareable via link, QR code, or NFC tap.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is exactly what people see when they tap your card. Looks good? Save it — you can edit anytime from your dashboard.", position: "top" },
  ],
  networking: [
    { id: "mode-selector", title: "Networking mode", desc: "Built for in-person moments — career fairs, business expos, recruiting events, and meetups. One tap shares everything.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Fill in your identity, contact info, and link buttons. Everything here maps directly to what people see on your card.", position: "bottom" },
    { id: "net-identity", title: "Name & title", desc: "Your name and current role. At a career fair or event, this is your first impression — be specific: 'Software Engineer @ Google' not just 'Engineer'.", position: "bottom" },
    { id: "net-contact", title: "Contact circles", desc: "Toggle phone, email, and location. Each one becomes a tap circle on your card — one tap calls, texts, emails, or opens maps. Only show what you want.", position: "top" },
    { id: "net-buttons", title: "Link buttons", desc: "Add buttons for your portfolio, LinkedIn, website, or anything else. Upload a logo, add a title, and paste a URL. The logo is draggable to reposition.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Set a background, text colors, and font. At events, a clean white or subtle gradient looks sharp. Dark backgrounds can stand out too.", position: "top" },
    { id: "save-btn", title: "Save", desc: "Save and you're ready. Share via NFC tap, QR code, or send the link in a follow-up message after the event.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is your networking card live. Photo, name, title, contact circles, and buttons — exactly as others will see it.", position: "top" },
  ],
  university: [
    { id: "mode-selector", title: "University mode", desc: "Built for students. Show your GPA, grad year, resume, and portfolio projects — everything a recruiter wants to see in one tap.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Fill in your academic info, bio, resume link, and projects. This is the content that makes your card stand out at career fairs.", position: "bottom" },
    { id: "identity-section", title: "Name & major", desc: "Your name and major + school. Format it clearly — 'Computer Science @ MIT, Class of 2026' gives recruiters everything at a glance.", position: "bottom" },
    { id: "uni-academic", title: "GPA & grad year", desc: "Toggle on your GPA and graduation year. These show as stat cards at the top of your profile — fast, visual, and easy to scan.", position: "top" },
    { id: "uni-resume", title: "Resume link", desc: "Paste a Google Drive, Notion, or Dropbox link to your resume. It shows as a 'View Resume' button right on your card — one tap to open.", position: "top" },
    { id: "uni-projects", title: "Portfolio projects", desc: "Add up to 4 projects — title, subtitle, description, and link. They show in a card grid on your Portfolio tab. Great for showing real work fast.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Keep it clean and professional. A white or light background with a readable font works best when a recruiter is scanning your card.", position: "top" },
    { id: "save-btn", title: "Save", desc: "Save and share at career fairs, send in cold emails, or drop in your LinkedIn bio. Your full academic profile in one link.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is how recruiters and professors see your card. GPA, projects, resume link — all in one tap.", position: "top" },
  ],
  social: [
    { id: "mode-selector", title: "Social mode", desc: "Your link-in-bio, built for creators. One page for all your links, social handles, and shop — share it everywhere.", position: "top" },
    { id: "content-tab", title: "Content tab", desc: "Set up your name, bio, social icons, link cards, and shop products. Everything here shows on your public page.", position: "bottom" },
    { id: "social-identity", title: "Name & bio", desc: "Your display name and one-line bio. This sits at the top of your page — make it clear who you are and what you do in one sentence.", position: "bottom" },
    { id: "social-icons", title: "Social icons", desc: "Toggle on Instagram, TikTok, Twitter, and YouTube handles. Each shows as a branded icon circle on your page — one tap takes followers straight to your profile.", position: "top" },
    { id: "social-links", title: "Link cards", desc: "Add up to 4 big link cards — each has a title, URL, and a full-width cover image you upload and reposition. Perfect for YouTube videos, podcast episodes, or featured content.", position: "top" },
    { id: "social-products", title: "Shop products", desc: "Add products with a name, price, image, and buy link. They show in a 2-column grid in your Shop tab — great for merch, presets, courses, or anything you sell.", position: "top" },
    { id: "design-tab", title: "Design tab", desc: "Choose Banner or Circle layout, pick a background color, and adjust font sizes. Banner shows a full-width hero image, Circle shows a round avatar.", position: "top" },
    { id: "save-btn", title: "Save", desc: "Save and drop the link in your Instagram bio, TikTok profile, or anywhere else. One link, everything in one place.", position: "bottom" },
    { id: "preview", title: "Live preview", desc: "This is your social page live — links, shop, and icons. Put this link everywhere and update it anytime.", position: "top" },
  ],
}

const PAD = 8

export default function BuilderTutorial({ onComplete, onGoToContent, onGoToDesign, onCloseStudio, mode = "business" }) {
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
      "uni-resume": "[data-tutorial='uni-resume']",
      "uni-projects": "[data-tutorial='uni-projects']",
      "social-identity": "[data-tutorial='social-identity']",
      "social-icons": "[data-tutorial='social-icons']",
      "social-links": "[data-tutorial='social-links']",
      "social-products": "[data-tutorial='social-products']",
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
    if (STEPS[step]?.id === "design-tab") {
      const panel = document.querySelector(".overflow-y-auto")
      if (panel) panel.scrollTop = 0
    }
    // make sure studio is open for content steps
    const contentIds = ["net-identity", "net-contact", "net-buttons", "uni-academic", "uni-resume", "uni-projects", "identity-section", "contact-fields", "social-identity", "social-icons", "social-links", "social-products"]
    if (contentIds.includes(STEPS[step]?.id)) {
      const tryScroll = (attempts = 0) => {
        const el = getElement(STEPS[step].id)
        if (!el) {
          if (attempts < 10) setTimeout(() => tryScroll(attempts + 1), 100)
          return
        }
        const panel = el.closest(".overflow-y-auto")
        if (panel) {
          panel.style.overflow = "auto"
          const elTop = el.offsetTop - panel.offsetTop
          panel.scrollTo({ top: elTop - 20, behavior: "smooth" })
          setTimeout(() => measureRect(STEPS[step].id), 150)
        }
      }
      setTimeout(() => tryScroll(), 0)
    }

    const el = getElement(STEPS[step].id)
    if (!el) return
    const panel = el.closest(".overflow-y-auto")
    if (panel) {
      const elTop = el.offsetTop - panel.offsetTop
      panel.scrollTo({ top: elTop - panel.clientHeight / 2 + el.clientHeight / 2, behavior: "smooth" })
      let frames = 0
      const interval = setInterval(() => {
        measureRect(STEPS[step].id)
        frames++
        if (frames > 25) clearInterval(interval)
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
      const nextStep = STEPS[step + 1]
      const currentStep = STEPS[step]
      if (currentStep.id === "mode-selector") onGoToContent?.()
      if (nextStep.id === "design-tab") onGoToDesign?.()
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

  const tooltipTop = current.position === "bottom"
    ? Math.min(rect.top + rect.height + PAD + 12, window.innerHeight - 220)
    : Math.max(rect.top - PAD - 12 - 170, 20)

  const tooltipWidth = Math.min(Math.max(rect.width + PAD * 2, 280), window.innerWidth - 32)
  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16))

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
              animate={{ x: rect.left - PAD, y: rect.top - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }}
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
