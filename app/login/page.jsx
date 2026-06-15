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
const [phoneScreen, setPhoneScreen] = useState(0)
useEffect(() => {
  const interval = setInterval(() => setPhoneScreen(prev => (prev + 1) % 3), 4000)
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
        <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-tighter max-w-md">
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

      {/* ── PHONE FLIP ── */}
      <div className="relative z-10 flex justify-center mt-16">
        <div style={{ position: "absolute", width: 280, height: 280, background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", bottom: 40, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
        <div style={{ width: 270, height: 550, perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, rotateY: [0, 0, 180, 180, 360] }}
            transition={{
              opacity: { duration: 0.6 }, y: { duration: 0.6 },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.38, 0.5, 0.88, 1], delay: 1.5 },
            }}
            style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
          >
            {/* FRONT */}
            <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", isolation: "isolate" }}>
              <div className="relative" style={{ width: "100%", height: "100%", background: "#0f0f0f", borderRadius: 44, padding: 3, boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.28), 0 10px 30px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                <div className="absolute right-[-3px] top-[100px] w-[3px] h-[58px] bg-[#1a1a1a] rounded-r-sm" />
                <div className="absolute left-[-3px] top-[78px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-sm" />
                <div className="absolute left-[-3px] top-[124px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-sm" />
                <div className="w-full h-full rounded-[41px] bg-[#f0f2f8] overflow-hidden relative flex flex-col">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[108px] h-[25px] bg-[#0f0f0f] rounded-b-[17px] z-20" />
                  <div className="flex justify-between items-end px-4 pb-1 h-[30px] flex-shrink-0 relative z-10">
                    <span className="text-[9px] font-bold tracking-tight">9:41</span>
                    <div className="flex items-center gap-1">
                      <svg width="11" height="7" viewBox="0 0 12 8" fill="#0a0a0a"><rect x="0" y="3" width="2" height="5" rx="0.5"/><rect x="3" y="2" width="2" height="6" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
                      <svg width="16" height="7" viewBox="0 0 18 8" fill="none"><rect x="0.5" y="0.5" width="15" height="7" rx="2" stroke="#0a0a0a" strokeOpacity="0.35"/><rect x="1.5" y="1.5" width="12" height="5" rx="1.2" fill="#0a0a0a"/></svg>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="bg-white rounded-[20px] mx-2.5 overflow-hidden shadow-md">
                      <div className="w-full h-[76px] relative overflow-visible" style={{ background: "linear-gradient(135deg,#1a6b9a,#2d9b6f,#1e7ab5)" }}>
                        <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.25) 100%)" }} />
                        <div className="absolute -bottom-5 left-3.5 w-[42px] h-[42px] rounded-full border-[3px] border-white bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white text-xs font-black shadow-md">AR</div>
                      </div>
                      <div className="px-3.5 pt-8 pb-3.5">
                        <p className="text-[15px] font-extrabold tracking-tight">Andres Rodriguez</p>
                        <p className="text-[10px] text-gray-500 mb-3">Founder of Taply</p>
                        <button className="w-full border border-gray-200 rounded-xl py-2 text-[11px] font-bold">Save Contact</button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 px-2.5 mt-2 pb-4">
                      {[
                        { label: "Call", sub: "(561) 419-4363", color: "#22c55e", icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                        { label: "Email", sub: "andres@taply.now", color: "#3b82f6", icon: "@" },
                        { label: "LinkedIn", sub: "andresarodriguez", color: "#6366f1", icon: "in" },
                        { label: "Instagram", sub: "@andres_rodriguez", color: "#ec4899", icon: "ig" },
                      ].map(({ label, sub, color, icon }) => (
                        <div key={label} className="flex items-center gap-2.5 bg-white rounded-[14px] px-3 py-2.5 border border-black/5 shadow-sm">
                          <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 text-white text-[9px] font-black" style={{ background: color }}>{icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold">{label}</p>
                            <p className="text-[8.5px] text-gray-400 truncate">{sub}</p>
                          </div>
                          <span className="text-gray-300 text-sm">›</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center pb-3">
                      <span className="text-[8px] font-semibold text-gray-400 bg-black/5 px-3 py-1 rounded-full">Powered by Taply</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BACK: QR */}
            <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <div className="relative" style={{ width: "100%", height: "100%", background: "#0f0f0f", borderRadius: 44, padding: 3, boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.28)" }}>
                <div className="absolute right-[-3px] top-[100px] w-[3px] h-[58px] bg-[#1a1a1a] rounded-r-sm" />
                <div className="absolute left-[-3px] top-[78px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-sm" />
                <div className="absolute left-[-3px] top-[124px] w-[3px] h-[34px] bg-[#1a1a1a] rounded-l-sm" />
                <div className="w-full h-full rounded-[41px] bg-white overflow-hidden relative flex flex-col items-center justify-center gap-4 px-6">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[108px] h-[25px] bg-[#0f0f0f] rounded-b-[17px] z-20" />
                  <img src="/taply-logo.svg" className="h-8 object-contain mt-8" />
                  <p className="text-[10px] text-gray-400 -mt-2">Scan to view Andres' card</p>
                  <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
                    <svg width="160" height="160" viewBox="0 0 150 150" fill="none">
                      <rect x="10" y="10" width="40" height="40" rx="4" fill="#0a0a0a"/><rect x="16" y="16" width="28" height="28" rx="2" fill="white"/><rect x="22" y="22" width="16" height="16" rx="1" fill="#0a0a0a"/>
                      <rect x="100" y="10" width="40" height="40" rx="4" fill="#0a0a0a"/><rect x="106" y="16" width="28" height="28" rx="2" fill="white"/><rect x="112" y="22" width="16" height="16" rx="1" fill="#0a0a0a"/>
                      <rect x="10" y="100" width="40" height="40" rx="4" fill="#0a0a0a"/><rect x="16" y="106" width="28" height="28" rx="2" fill="white"/><rect x="22" y="112" width="16" height="16" rx="1" fill="#0a0a0a"/>
                      <rect x="62" y="62" width="26" height="26" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
                      <circle cx="75" cy="75" r="5" fill="#2563eb"/><circle cx="75" cy="75" r="9" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity="0.4"/>
                      <rect x="58" y="10" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="70" y="10" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="82" y="10" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="58" y="22" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="82" y="22" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="64" y="34" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="76" y="34" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="10" y="58" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="10" y="70" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="10" y="82" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="22" y="58" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="22" y="82" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="34" y="64" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="34" y="76" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="100" y="58" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="112" y="58" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="124" y="64" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="106" y="70" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="118" y="70" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="100" y="76" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="124" y="82" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="58" y="100" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="70" y="100" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="58" y="112" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="82" y="112" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="64" y="124" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="76" y="124" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="88" y="124" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="112" y="100" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="124" y="100" width="6" height="6" rx="1" fill="#0a0a0a"/>
                      <rect x="118" y="112" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="106" y="124" width="6" height="6" rx="1" fill="#0a0a0a"/><rect x="124" y="118" width="6" height="6" rx="1" fill="#0a0a0a"/>
                    </svg>
                  </div>
                  <p className="text-[13px] font-bold text-[#2563eb] tracking-tight">taply.now/andres</p>
                  <div className="flex items-center gap-2 mb-6">
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
                    <span className="text-[9px] text-gray-400">Point camera to scan</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

   {/* ── SECTION 1: ONE LINK, EVERYTHING ── */}
<div className="px-4 py-10 bg-[#f5f5f7]">
  <div className="max-w-[420px] mx-auto bg-white rounded-[32px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-visible pb-8">
    
    <div className="px-6 pt-14 pb-14">
        <p className="text-sm font-semibold text-blue-600 tracking-wide mb-6">What is Taply</p>
        <h2 className="text-[2.4rem] font-black tracking-tighter leading-[1.05] mb-5">
          One link.<br />Your whole world.
        </h2>
        <p className="text-[16px] text-gray-500 leading-relaxed mb-10">
          Stop sending 10 different links. Taply gives you one smart card that holds everything — your contact info, socials, and more.
        </p>

        {/* 3 stat boxes */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { num: "16+", sub: "Platforms" },
            { num: "1 link", sub: "All your info" },
            { num: "4 modes", sub: "For every occasion" },
          ].map(({ num, sub }, i) => (
  <div
  key={i}
  className="bg-[#f3f7ff] rounded-[24px] h-[110px] flex flex-col items-center justify-center text-center px-2 border border-[#dbeafe] shadow-[0_6px_20px_rgba(37,99,235,0.06)]"
>
  <div className="text-[1.75rem] font-black tracking-[-0.04em] leading-none">
    {num}
  </div>

  <div className="text-[10px] text-[#7c8aa0] font-semibold uppercase tracking-[0.18em] mt-2 leading-tight">
    {sub}
  </div>
</div>
          ))}
        </div>

{/* HOW IT WORKS — 3 steps */}
<div className="flex flex-col gap-4 mt-6 pb-6">
          {[
            { step: "01", title: "Create your card", desc: "Pick a mode, add your info, upload a photo. Takes 30 seconds." },
            { step: "02", title: "Share your link", desc: "Send taply.now/you — or tap your NFC card on anyone's phone." },
            { step: "03", title: "Watch it work", desc: "They see everything. One tap to call, follow, or save your contact." },
          ].map(({ step, title, desc }) => (
            <motion.div
  whilehover={{ y: -2 }}
  transition={{ duration: 0.18 }}
  key={step}
  className="flex gap-4 items-start rounded-[26px] p-5 bg-white border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
>
              <span className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0 mt-0.5 border border-blue-200">{step}</span>
              <div> 
                <p className="text-[16px] font-bold tracking-tight mb-1">{title}</p>
                <p className="text-[14px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
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

      {/* ── SECTION 3: APPLE WALLET (light bg) ── */}
      <div className="bg-[#f4f4f2] px-6 pt-14 pb-14">
        <p className="text-sm font-semibold text-blue-600 tracking-wide mb-6">Apple Wallet</p>
        <h2 className="text-[2.4rem] font-black tracking-tighter leading-[1.05] mb-4">
          Your card,<br />always on you.
        </h2>
        <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
            Generate a native Apple Wallet pass with your QR code automatically connected to your Taply profile.

        </p>

      <motion.div
  key={themeIdx}
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  className="rounded-3xl p-5 mb-5 relative overflow-hidden"
  style={{
    background: t.bg,
    maxWidth: 360,
    minHeight: 540,
    margin: "0 auto 20px auto",
    boxShadow:
      "0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)"
  }}
>
  {/* NAME + PHOTO ROW */}
  <div className="flex justify-between items-start mb-8 pt-10">
    <div>
      <p
        className="text-[9px] uppercase tracking-widest mb-1"
        style={{ color: t.sub }}
      >
        NAME
      </p>

      <p
        className="text-[22px] font-semibold"
        style={{ color: t.text }}
      >
        Andres Rodriguez
      </p>
    </div>

    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  </div>

  {/* FIELDS */}
  <div className="mb-3">
    <p
      className="text-[9px] uppercase tracking-widest mb-1"
      style={{ color: t.sub }}
    >
      TITLE
    </p>

    <p className="text-[20px] leading-tight" style={{ color: t.text }}>
      Founder of Taply
    </p>
  </div>

  <div className="flex gap-8 mb-28">
    <div>
      <p
        className="text-[9px] uppercase tracking-widest mb-1 mt-2"
        style={{ color: t.sub }}
      >
        PHONE
      </p>

      <p className="text-sm" style={{ color: t.text }}>
        (561) 419-4363
      </p>
    </div>

    <div>
      <p
        className="text-[9px] uppercase tracking-widest mb-1 mt-2"
        style={{ color: t.sub }}
      >
        EMAIL
      </p>

      <p className="text-sm" style={{ color: t.text }}>
        andres@taply.now
      </p>
    </div>
  </div>

  {/* QR */}
  <div className="flex justify-center mb-4">
    <div className="bg-white rounded-[28px] p-5 w-40 h-40 flex items-center justify-center shadow-lg">
      <svg width="120" height="120" viewBox="0 0 50 50" fill="none">

        <rect x="2" y="2" width="14" height="14" rx="2" fill="#0a0a0a"/>
        <rect x="4" y="4" width="10" height="10" rx="1" fill="white"/>
        <rect x="6" y="6" width="6" height="6" rx="0.5" fill="#0a0a0a"/>

        <rect x="34" y="2" width="14" height="14" rx="2" fill="#0a0a0a"/>
        <rect x="36" y="4" width="10" height="10" rx="1" fill="white"/>
        <rect x="38" y="6" width="6" height="6" rx="0.5" fill="#0a0a0a"/>

        <rect x="2" y="34" width="14" height="14" rx="2" fill="#0a0a0a"/>
        <rect x="4" y="36" width="10" height="10" rx="1" fill="white"/>
        <rect x="6" y="38" width="6" height="6" rx="0.5" fill="#0a0a0a"/>

        <rect x="22" y="22" width="6" height="6" rx="1" style={{ fill: t.accent }}/>

        <rect x="22" y="2" width="4" height="4" rx="0.5" fill="#0a0a0a"/>
        <rect x="28" y="2" width="4" height="4" rx="0.5" fill="#0a0a0a"/>

        <rect x="2" y="22" width="4" height="4" rx="0.5" fill="#0a0a0a"/>
        <rect x="8" y="22" width="4" height="4" rx="0.5" fill="#0a0a0a"/>

        <rect x="34" y="22" width="4" height="4" rx="0.5" fill="#0a0a0a"/>
        <rect x="40" y="28" width="4" height="4" rx="0.5" fill="#0a0a0a"/>

        <rect x="22" y="34" width="4" height="4" rx="0.5" fill="#0a0a0a"/>
        <rect x="28" y="40" width="4" height="4" rx="0.5" fill="#0a0a0a"/>

      </svg>
    </div>
  </div>

  {/* DOTS */}
  <div className="flex justify-center gap-1.5 mt-2">
    {themes.map((_, i) => (
      <div
        key={i}
        className="rounded-full transition-all duration-300"
        style={{
          width: i === themeIdx ? 16 : 6,
          height: 6,
          background:
            i === themeIdx
              ? t.accent
              : "rgba(128,128,128,0.3)"
        }}
      />
    ))}
  </div>
</motion.div>
{/* Wallet features */}
<div className="grid grid-cols-2 gap-4 mt-8">
  {[
    { bg: "#eff6ff", iconBg: "#2563eb", title: "Active profile sync", desc: "Always pulls from whichever profile you have set as active.", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg> },
    { bg: "#f5f3ff", iconBg: "#7c3aed", title: "Custom colors", desc: "Pick your card background and accent to match your brand.", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
    { bg: "#ecfdf5", iconBg: "#059669", title: "Company logo", desc: "Add a transparent PNG logo to the top of your pass.", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
    { bg: "#fdf2f8", iconBg: "#db2777", title: "Profile photo", desc: "Your photo shows as a circle thumbnail on the pass.", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
    { bg: "#fff7ed", iconBg: "#ea580c", title: "Lock screen access", desc: "Pull it up instantly — no app needed, ever.", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  ].map(({ bg, iconBg, title, desc, svg }) => (
    <div key={title} className="bg-white rounded-[24px] p-4 border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
        {svg}
      </div>
      <div>
        <p className="text-[15px] font-bold tracking-tight mb-1">{title}</p>
        <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  ))}
</div>
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
{ label: "Pricing", href: "/pricing" },
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
