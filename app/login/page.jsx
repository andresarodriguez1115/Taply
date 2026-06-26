"use client"

import { useState, useEffect } from "react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Menu } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
const heroPhoneImages = [
  "/Social-Mode-Render.png",
  "/Business-Mode-Render.png",
  "/Networking-Mode-Render.png",
  "/University-Mode-Render.png",
]

const [phoneScreen, setPhoneScreen] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setPhoneScreen((prev) => (prev + 1) % heroPhoneImages.length)
  }, 3500)

  return () => clearInterval(interval)
}, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    setLoading(false)
    router.replace("/dashboard")
  }

  const row1 = [
    { name: "Instagram", bg: "#E1306C", icon: "IG" },
    { name: "LinkedIn",  bg: "#0077B5", icon: "in" },
    { name: "Twitter",   bg: "#1DA1F2", icon: "X"  },
    { name: "WhatsApp",  bg: "#25D366", icon: "WA" },
    { name: "YouTube",   bg: "#FF0000", icon: "YT"  },
    { name: "TikTok",    bg: "#010101", icon: "TT" },
    { name: "Spotify",   bg: "#1DB954", icon: "SP"  },
    { name: "Behance",   bg: "#1769FF", icon: "Be" },
  ]
  const row2 = [
    { name: "Dribbble",  bg: "#EA4C89", icon: "Dr" },
    { name: "GitHub",    bg: "#181717", icon: "GH" },
    { name: "Notion",    bg: "#000000", icon: "N"  },
    { name: "Substack",  bg: "#FF6719", icon: "SS" },
    { name: "Venmo",     bg: "#3D95CE", icon: "V"  },
    { name: "Cash App",  bg: "#00C244", icon: "$"  },
    { name: "Calendly",  bg: "#006BFF", icon: "Ca" },
    { name: "Discord",   bg: "#5865F2", icon: "DC" },
  ]

  // Wallet theme cycling
  const themes = [
    { bg: "#000000", text: "#ffffff", sub: "rgba(255,255,255,0.45)", accent: "#2563eb" },
    { bg: "#0a1628", text: "#ffffff", sub: "rgba(147,197,253,0.6)", accent: "#3b82f6" },
    { bg: "#1a0a2e", text: "#ffffff", sub: "rgba(196,181,253,0.6)", accent: "#8b5cf6" },
    { bg: "#0a2010", text: "#ffffff", sub: "rgba(134,239,172,0.6)", accent: "#22c55e" },
  ]
  const [themeIdx, setThemeIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setThemeIdx(prev => (prev + 1) % themes.length), 2500)
    return () => clearInterval(interval)
  }, [])
  const t = themes[themeIdx]

  return (
    <div className="min-h-screen bg-[#fafaf9] relative overflow-hidden text-black">

      {/* ── NAV ── */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center pl-2 pr-6 h-[75px] bg-white ${menuOpen ? "" : "border-b border-gray-200"}`}>
        <div className="flex items-center h-full">
          <img src="/taply-logo.svg" className="h-14 object-contain" />
        </div>
        <button onClick={() => setMenuOpen((prev) => !prev)} className="p rounded-lg hover:bg-gray-100 transition">
          <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <Menu size={28} strokeWidth={2} />
          </motion.div>
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="relative z-10 flex flex-col items-start text-left px-6 mt-[100px]">
        <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur border border-blue-200 text-blue-600 text-sm font-semibold mb-6 shadow-sm tracking-wide">
          All your info. One tap.
        </div>
        <h1 className="text-[2.2rem] min-[390px]:text-[2.6rem] font-extrabold leading-[1.05] tracking-tighter max-w-md">
          Your{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">digital</span>
          <br />identity,<br />for every occasion.
        </h1>
        <p className="mt-5 text-gray-500 text-[1.1rem] max-w-md leading-relaxed">
          Create your Taply card, share instantly, and make every connection memorable.
        </p>
        <div className="mt-10 flex flex-col gap-4 w-full max-w-sm">
          <button onClick={() => window.open("/signup", "_blank")}
            className="bg-black text-white py-4 rounded-2xl text-[1.05rem] font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.97] transition">
            Create your Taply card →
          </button>
          <button onClick={() => window.open("/how-it-works", "_blank")} className="bg-white border border-gray-200 py-4 rounded-2xl flex items-center justify-center gap-2 text-gray-800 text-[1.05rem] font-semibold shadow-sm hover:bg-gray-50 transition">
            See how it works <Play size={18} />
          </button>
        </div>
      </div>

{/* ── PHONE IMAGE SWITCH ── */}
<div className="relative z-10 flex justify-center mt-8 px-0">
<div className="relative w-[140%] -mx-[20%]">
    <AnimatePresence mode="wait">
      <motion.img
        key={phoneScreen}
        src={heroPhoneImages[phoneScreen]}
        alt="Taply profile mode preview"
        initial={{ opacity: 0, x: 30, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -30, scale: 0.97 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full h-auto block drop-shadow-[0_35px_70px_rgba(0,0,0,0.18)]"
      />
    </AnimatePresence>

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {heroPhoneImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setPhoneScreen(index)}
          className={`h-2 rounded-full transition-all ${
            phoneScreen === index
              ? "w-6 bg-blue-600"
              : "w-2 bg-gray-300"
          }`}
          aria-label={`Show Taply preview ${index + 1}`}
        />
      ))}
    </div>
</div>
</div>

      {/* ── TICKER ── */}
      <div className="relative z-10 mt-16 w-full bg-black py-6 overflow-hidden">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-8" style={{ width: "max-content", letterSpacing: "0.2em", fontWeight: 500 }}>
          {["YOUR IDENTITY", "ONE TAP", "EVERY OCCASION", "ALWAYS UP TO DATE", "YOUR IDENTITY", "ONE TAP", "EVERY OCCASION", "ALWAYS UP TO DATE"].map((text, i) => (
            <span key={i} className="text-[20px] inline-flex items-center gap-4" style={{ color: "#fff" }}>
              {text} <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════
          REDESIGNED SECTIONS START HERE
      ════════════════════════════════════════ */}

 {/* ── SECTION 1: CUSTOMIZE YOUR CARD ── */}
<div className="px-4 pt-10 pb-3 bg-[#f5f5f7]">  <div className="max-w-[420px] mx-auto bg-white rounded-[32px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
    <div className="px-6 pt-10 pb-8">
      <p className="text-sm font-black text-blue-600 tracking-[0.08em] uppercase mb-4">
        Customize your card
      </p>

      <h2 className="text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02] mb-4">
        Designed by you.
        <br />
        <span className="text-blue-600">Made to stand out.</span>
      </h2>

      <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
        Create a card that represents you. Choose your material, color, finish, and what’s on it.
      </p>

  {/* Card render image */}
<div className="relative mb-1 -mx-2">
  <img
    src="/taply-card-render.png"
    alt="Taply custom card render"
    className="w-full h-auto object-contain block"
  />
</div>
      <div className="flex flex-col gap-5 mb-8">
        {[
          {
            title: "Premium materials",
            desc: "Metal or PVC. Built to last.",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>,
          },
          {
            title: "Colors & finishes",
            desc: "Pick your color and finish.",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>,
          },
          {
            title: "Your way",
            desc: "Add your logo, name, and Taply QR code.",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
          },
          {
            title: "Tap or scan",
            desc: "NFC enabled and QR ready.",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1.5" fill="#2563eb" stroke="none"/></svg>,
          },
          {
            title: "Works on iPhone & Android",
            desc: "Compatible with any NFC phone or QR scanner.",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
          },
        ].map(({ title, desc, icon }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              {icon}
            </div>

            <div>
              <p className="text-[15px] font-black tracking-tight mb-0.5">
                {title}
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

   

  </div>
  </div>
</div>

      {/* ── WORKS EVERYWHERE ── */}
      <div className="px-4 pt-3 pb-10 bg-[#f5f5f7]">
        <div className="max-w-[420px] mx-auto bg-white rounded-[32px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="px-6 pt-8 pb-8">
            <p className="text-sm font-black text-blue-600 tracking-[0.08em] uppercase mb-4">Works everywhere</p>
            <h2 className="text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02] mb-4">
              Works everywhere<br />you do.
            </h2>
            <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
            </p>
  <div className="grid grid-cols-2 gap-5">
  {[
    { label: "Tap", image: "/tap-render.png" },
    { label: "Scan", image: "/scan-render.jpg" },
    { label: "Wallet", image: "/wallet-render.jpg" },
    { label: "Share", image: "/share-render.jpg" },
  ].map(({ label, image }) => (
    <div key={label} className="text-center">
      <div className="aspect-square rounded-[24px] bg-[#eef3ff] border-2 border-blue-200 overflow-hidden shadow-sm mb-3">
        <img
          src={image}
          alt={`${label} Taply preview`}
          className="w-full h-full object-cover block"
        />
      </div>

      <p className="text-[14px] text-gray-500 font-bold">
        {label}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
{/* ── SECTION 3: APPLE WALLET ── */}
<div className="bg-[#f5f7ff] px-4 py-10">
  <div className="max-w-[420px] mx-auto rounded-[32px] bg-white border border-blue-100/70 shadow-[0_20px_60px_rgba(37,99,235,0.10)] overflow-hidden">
    <div className="px-6 pt-10">
      <p className="text-sm font-black text-blue-600 tracking-[0.08em] uppercase mb-4">
        Apple Wallet
      </p>

      <h2 className="text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02] mb-4">
        Your card,
        <br />
        <span className="text-blue-600">always on you.</span>
      </h2>

      <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
        Add your Taply profile to Apple Wallet and share instantly with a tap.
      </p>

      <div className="flex flex-col gap-5 mb-8">
        {[
          {
            title: "Add in one tap",
            desc: "Generate a native Apple Wallet pass.",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <path d="M2 10h20" />
                <path d="M6 15h2" />
                <path d="M10 15h4" />
              </svg>
            ),
          },
          {
            title: "Always up to date",
            desc: "Any changes sync automatically.",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 1-9 9" />
                <path d="M3 12a9 9 0 0 1 9-9" />
                <path d="m21 3-3 3 3 3" />
                <path d="m3 21 3-3-3-3" />
              </svg>
            ),
          },
          {
            title: "Private & secure",
            desc: "You're in control of what you share.",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
          },
        ].map(({ title, desc, icon }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              {icon}
            </div>

            <div>
              <p className="text-[14px] font-bold tracking-tight mb-0.5">
                {title}
              </p>
              <p className="text-[12px] text-gray-500 leading-snug">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="relative -mb-1">
      <img
        src="/apple-wallet-section.jpg"
        alt="Taply Apple Wallet preview"
        className="w-full h-auto block object-contain"
      />
    </div>
  </div>
</div>
      {/* ── SECTION 2: ONE CARD EVERY ROOM (dark bg) ── */}
      <div className="bg-[#0a0a0a] px-6 pt-14 pb-14">
        <p className="text-sm font-semibold text-blue-400 tracking-wide mb-6">For every occasion</p>
        <h2 className="text-[2.4rem] font-black tracking-tighter leading-[1.05] text-white mb-4">
          One card.<br />Every room.
        </h2>
        <p className="text-[16px] text-white/50 leading-relaxed mb-10">
          Switch modes in seconds. Your link never changes — only what people see does.
        </p>

        <div className="flex flex-col gap-3">
          {[
            { title: "Business", tag: "Meetings & sales", desc: "Name, title, company, phone, email. Everything a client needs in one tap.", accent: "#2563eb", tagBg: "rgba(37,99,235,0.15)", tagColor: "#60a5fa" },
            { title: "Networking", tag: "Events & meetups", desc: "Social links front and center. Built for rooms full of people you want to know.", accent: "#7c3aed", tagBg: "rgba(124,58,237,0.15)", tagColor: "#a78bfa" },
            { title: "University", tag: "Campus & career", desc: "Major, grad year, LinkedIn, clubs. Built for career fairs and campus life.", accent: "#059669", tagBg: "rgba(5,150,105,0.15)", tagColor: "#34d399" },
            { title: "Social", tag: "Creators & influencers", desc: "TikTok, Instagram, YouTube — laid out like a feed. Grow your audience in person.", accent: "#ea580c", tagBg: "rgba(234,88,12,0.15)", tagColor: "#fb923c" },
          ].map(({ title, tag, desc, accent, tagBg, tagColor }) => (
            <div key={title} className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[18px] font-black text-white tracking-tight">{title}</p>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.5px]" style={{ background: tagBg, color: tagColor }}>{tag}</span>
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
              <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: accent }} />
            </div>
          ))}
        </div>

        <p className="text-[12px] text-white/25 text-center mt-8 tracking-wide">Switch anytime · your taply link never changes</p>
      </div>


{/* ── SECTION 5: PLATFORMS (light blue bg) ── */}
      <div className="bg-[#f0f4ff] py-14 overflow-hidden">
        <div className="px-6 mb-8">
          <p className="text-sm font-semibold text-blue-600 tracking-wide mb-6">Integrations</p>
          <h2 className="text-[2.4rem] font-black tracking-tighter leading-[1.05] mb-4">
            Every platform<br />you're on.
          </h2>
          <p className="text-[16px] text-gray-500 leading-relaxed">
            16+ platforms. One link. Connect everything — social, professional, creative.
          </p>
        </div>
        <div className="overflow-hidden mb-3">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...row1, ...row1].map(({ name, bg, icon }, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-black/7 rounded-full px-4 py-2.5 shadow-sm flex-shrink-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[8px] font-black flex-shrink-0 tracking-tight uppercase" style={{ background: bg }}>{icon}</div>
                <span className="text-[13px] font-semibold text-gray-700">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 whitespace-nowrap" style={{ width: "max-content" }}>
            {[...row2, ...row2].map(({ name, bg, icon }, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-black/7 rounded-full px-4 py-2.5 shadow-sm flex-shrink-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[8px] font-black flex-shrink-0 tracking-tight uppercase" style={{ background: bg }}>{icon}</div>
                <span className="text-[13px] font-semibold text-gray-700">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 4: ANALYTICS (dark) ── */}
      <div className="bg-[#0a0a0a] px-6 pt-14 pb-14">
        <p className="text-sm font-semibold text-blue-400 tracking-wide mb-6">Analytics</p>
        <h2 className="text-[2.4rem] font-black tracking-tighter leading-[1.05] text-white mb-4">
          See who's<br />connecting.
        </h2>
        <p className="text-[16px] text-white/50 leading-relaxed mb-10">
          Real-time stats on every view, tap, and save — so you know what's working.
        </p>

        {/* Analytics widget */}
        <div className="rounded-3xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          {/* Mini bar chart header */}
          <div className="px-5 pt-5 pb-4 border-b border-white/6">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-[12px] text-white/40 mb-1">Profile views this week</p>
                <p className="text-[32px] font-black text-white tracking-tight">1,284</p>
              </div>
              <span className="text-[13px] font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full">+14%</span>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-12">
              {[30, 45, 38, 60, 52, 72, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${h}%`,
                  background: i === 6 ? "#2563eb" : "rgba(255,255,255,0.12)"
                }} />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="flex-1 text-center text-[10px] text-white/25">{d}</span>
              ))}
            </div>
          </div>

          {/* 3 stat rows */}
          <div className="divide-y divide-white/6">
            {[
              { label: "Link taps", value: "342", change: "+8%", bars: [5, 8, 6, 10, 8, 12, 14] },
              { label: "Contact saves", value: "89", change: "+22%", bars: [3, 5, 4, 7, 6, 9, 11] },
              { label: "Save rate", value: "28%", change: "+3%", bars: [6, 8, 7, 9, 8, 10, 12] },
            ].map(({ label, value, change, bars }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[13px] text-white/40 mb-0.5">{label}</p>
                  <p className="text-[22px] font-black text-white tracking-tight">{value}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-end gap-[2px] h-7">
                    {bars.map((h, i) => (
                      <div key={i} className="w-[4px] rounded-sm bg-blue-500" style={{ height: h * 2, opacity: i === bars.length - 1 ? 1 : 0.4 }} />
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-green-400">{change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* ── SECTION 6: CTA (black) ── */}
<div className="px-6 py-16 text-center" style={{ background: "linear-gradient(135deg,#1d4ed8,#4f46e5)" }}>        <p className="text-sm font-semibold text-blue-400 tracking-wide mb-6">Get started</p>
        <h2 className="text-[2.6rem] font-black tracking-tighter leading-[1.05] text-white mb-4">
          Your identity.<br />One tap away.
        </h2>
        <p className="text-[16px] text-white/40 leading-relaxed mb-10 max-w-xs mx-auto">
          Join creators, founders, and professionals already on Taply.
        </p>
        <button onClick={() => window.open("/signup", "_blank")}
          className="w-full bg-white text-black py-5 rounded-2xl text-[16px] font-black flex items-center justify-between px-6 hover:bg-gray-100 active:scale-[0.98] transition">
          <span>Create your Taply Card →</span>
          <span>→</span>
        </button>
  <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
  {[
    "Built for modern networking",
    "Designed for every occasion",
    "Your identity, unified",
  ].map((t) => (
    <span
      key={t}
      className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-semibold"
    >
      {t}
    </span>
  ))}
</div>
      </div>

      {/* ── FOOTER ── */}
      <div className="bg-[#0a0a0a] px-6 pt-10 pb-8">
        <div className="flex justify-between items-center mb-4">
          <img src="/taply-logo.svg" className="h-10 object-contain brightness-0 invert" />
        </div>
        <p className="text-[13px] text-gray-600 mb-8 leading-relaxed">Your digital identity, for every occasion.</p>
<div className="grid grid-cols-2 gap-6 mb-8">
  {[
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  ].map(({ title, links }) => (
    <div key={title}>
      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[1.5px] mb-3">{title}</p>
      <div className="flex flex-col gap-2">
        {links.map(l => <span key={l} className="text-[13px] text-gray-500 font-medium">{l}</span>)}
      </div>
    </div>
  ))}
  <div>
    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[1.5px] mb-3">Product</p>
    <div className="flex flex-col gap-2">
      <button onClick={() => window.open("/how-it-works", "_blank")} className="text-[13px] text-gray-500 font-medium hover:text-gray-400 transition text-left">How it works</button>
      <span className="text-[13px] text-gray-500 font-medium">Pricing</span>
    </div>
  </div>
  <div>
    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[1.5px] mb-3">Account</p>
    <div className="flex flex-col gap-2">
      <button onClick={() => window.open("/signup", "_blank")} className="text-[13px] text-gray-500 font-medium hover:text-gray-400 transition text-left">Sign up</button>
      <button onClick={() => window.open("/signup", "_blank")} className="text-[13px] text-gray-500 font-medium hover:text-gray-400 transition text-left">Log in</button>
      <span className="text-[13px] text-gray-500 font-medium">Support</span>
    </div>
  </div>
</div>
        <div className="h-px bg-white/5 mb-5" />
        <span className="text-[11px] text-gray-600">© 2025 Taply Inc.</span>
      </div>

      {/* ── MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-white z-40 overflow-y-auto"
            style={{ transformOrigin: "top" }}
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
            <div className="flex flex-col">
              {[
{ label: "How it works", href: "/how-it-works", newTab: true },
{ label: "Pricing", href: "/pricing", newTab: true },
{ label: "Cards", href: "/cards", newTab: true },
{ label: "Login", href: "/signup", newTab: true },
              ].map(({ label, href, newTab }, i) => (
                <motion.button key={label}
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.15 }}
                  onClick={() => { setMenuOpen(false); newTab ? window.open(href, "_blank") : router.push(href) }}
                  className="w-full flex items-center justify-between border-b border-gray-100 text-gray-900 active:bg-gray-50 transition"
                  style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.02em", padding: "18px 24px" }}>
                  <span>{label}</span>
                  <span style={{ color: "#d1d5db" }}>›</span>
                </motion.button>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="px-6 pt-6">
                <button onClick={() => { setMenuOpen(false); window.open("/signup", "_blank") }}
                  className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-between px-6 text-[1rem] font-bold">
                  Create your Taply card <span>→</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.4)} }`}</style>
    </div>
  )
}
