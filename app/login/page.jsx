"use client"

import { useState, useEffect } from "react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Menu } from "lucide-react"
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube, FaSpotify, FaBehance, FaDribbble, FaGithub, FaDiscord } from "react-icons/fa6"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { SiNotion, SiSubstack, SiVenmo, SiCashapp, SiCalendly } from "react-icons/si"

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
const heroPhoneImages = [
  "/Business-Mode-Render.png",
  "/Social-Mode-Render.png",
  "/University-Mode-Render.png",
    "/Networking-Mode-Render.png",
 
]

const [phoneScreen, setPhoneScreen] = useState(0)
const [heroImageLoaded, setHeroImageLoaded] = useState(false)

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
    { name: "Instagram", bg: "#E1306C", icon: "instagram" },
    { name: "LinkedIn",  bg: "#0077B5", icon: "linkedin" },
    { name: "Twitter",   bg: "#000000", icon: "twitter" },
    { name: "WhatsApp",  bg: "#25D366", icon: "whatsapp" },
    { name: "YouTube",   bg: "#FF0000", icon: "youtube" },
    { name: "TikTok",    bg: "#010101", icon: "tiktok" },
    { name: "Spotify",   bg: "#1DB954", icon: "spotify" },
    { name: "Behance",   bg: "#1769FF", icon: "behance" },
  ]
  const row2 = [
    { name: "Dribbble",  bg: "#EA4C89", icon: "dribbble" },
    { name: "GitHub",    bg: "#181717", icon: "github" },
    { name: "Notion",    bg: "#000000", icon: "notion" },
    { name: "Substack",  bg: "#FF6719", icon: "substack" },
    { name: "Venmo",     bg: "#3D95CE", icon: "venmo" },
    { name: "Cash App",  bg: "#00C244", icon: "cashapp" },
    { name: "Calendly",  bg: "#006BFF", icon: "calendly" },
    { name: "Discord",   bg: "#5865F2", icon: "discord" },
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

 {heroPhoneImages.map((src, index) => (
  <link key={`${src}-${index}`} rel="preload" as="image" href={src} />
))}

      {/* ── NAV ── */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center pl-2 pr-6 h-[75px] bg-white ${menuOpen ? "" : "border-b border-gray-200"}`}>
        <div className="flex items-center h-full">
          <img src="/taply-logo.svg" className="h-14 object-contain" />
        </div>
        <button onClick={() => setMenuOpen((prev) => !prev)} className="p rounded-lg hover:bg-gray-100 transition">
          <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <Menu gitsize={28} strokeWidth={2} />
          </motion.div>
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="relative z-10 flex flex-col items-start text-left px-6 mt-[100px]">
        <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur border border-blue-200 text-blue-600 text-sm font-semibold mb-6 shadow-sm tracking-wide">
          Digital Business Card
        </div>
        <h1 className="text-[2.2rem] min-[390px]:text-[2.6rem] font-extrabold leading-[1.05] tracking-tighter max-w-md">
          The business card
          <br />
          you'll <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">never</span> run out of.
        </h1>
        <p className="mt-5 text-gray-500 text-[1.3rem] max-w-md leading-relaxed">
          Ditch paper cards. Share instantly, and stay on their phone.
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
    {/* Ghost image holds the space so it never collapses */}
    <img
      src={heroPhoneImages[phoneScreen]}
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      loading="eager"
      className="w-full h-auto block invisible"
    />
    <AnimatePresence initial={false}>
      <motion.img
        key={phoneScreen}
        src={heroPhoneImages[phoneScreen]}
        alt="Taply profile mode preview"
        fetchPriority="high"
        initial={{ opacity: 0, rotatey: 12, scale: 0.95, transformperspective: 1000 }}
        animate={{ opacity: 1, rotatey: 0, scale: 1, transformperspective: 1000 }}
        exit={{ opacity: 0, rotatey: -12, scale: 0.95, transformperspective: 1000 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-auto block drop-shadow-[0_35px_70px_rgba(0,0,0,0.18)] absolute inset-0"
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

{/* ── SHOP TAPLY CARDS ── */}
<section className="px-4 pt-10 pb-3 bg-[#f5f5f7]">
  <div className="max-w-[420px] mx-auto rounded-[32px] bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-4">
    <div className="px-2 pt-5 pb-7">
      <p className="text-sm font-black text-blue-600 tracking-[0.08em] uppercase mb-4">
        Physical Taply Cards
      </p>

      <h2 className="text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02] mb-3">
        Built for every<br />introduction.
      </h2>

      <p className="text-[16px] text-gray-500 leading-relaxed">
        One card. Unlimited shares. Choose the one that fits you.
      </p>
    </div>

    {/* Metal Card */}
    <div className="overflow-hidden rounded-[26px] border border-blue-100 bg-[#eef3ff] mb-4">
      <div className="relative">
        <span className="absolute top-4 left-4 z-10 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-black tracking-[0.12em] text-white">
          NEW
        </span>

        <img
          src="/METAL-CARD.jpg"
          alt="Taply Metal Card front and back"
          className="w-full h-auto block"
        />
      </div>

      <div className="px-5 pb-5">
        <h3 className="text-[1.65rem] font-black tracking-[-0.04em]">
          Metal Card
        </h3>

        <p className="mt-4 text-[18px] leading-relaxed text-gray-600">
          Premium metal. Personal to you. Made to be remembered.
        </p>

        <p className="mt-4 text-[15px] text-gray-500">
          From{" "}
          <span className="text-[2rem] leading-none font-black tracking-[-0.05em] text-blue-600">
            $40
          </span>
        </p>

        <button
          onClick={() => window.open("/shop?card=metal", "_blank")}
          className="mt-4 w-full rounded-2xl bg-black py-4 text-[16px] font-black text-white transition hover:scale-[1.01] active:scale-[0.98]"
        >
          Shop Metal Cards →
        </button>
      </div>
    </div>

    {/* PVC Card */}
    <div className="overflow-hidden rounded-[26px] border border-[#f1e3bc] bg-[#fff9ed]">
      <img
        src="/PLASTIC%20CARD.jpg"
        alt="Taply PVC Card"
        className="w-full h-auto block"
      />

      <div className="px-5 pb-5">
        <h3 className="text-[1.65rem] font-black tracking-[-0.04em]">
          Plastic Card
        </h3>

        <p className="mt-4 text-[18px] leading-relaxed text-gray-600">
          Lightweight, durable, and ready to share anywhere.
        </p>

        <p className="mt-4 text-[15px] text-gray-500">
          From{" "}
          <span className="text-[2rem] leading-none font-black tracking-[-0.05em] text-blue-600">
            $20
          </span>
        </p>

        <button
          onClick={() => window.open("/shop?card=pvc", "_blank")}
          className="mt-4 w-full rounded-2xl bg-white border border-black/10 py-4 text-[16px] font-black text-black transition hover:bg-black hover:text-white active:scale-[0.98]"
        >
          Shop PVC Cards →
        </button>
      </div>
    </div>
  </div>
</section>

      {/* ── WORKS EVERYWHERE ── */}
      <div className="px-4 pt-3 pb-10 bg-[#f5f5f7]">
        <div className="max-w-[420px] mx-auto bg-white rounded-[32px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="px-6 pt-8 pb-8">
            <p className="text-sm font-black text-blue-600 tracking-[0.08em] uppercase mb-4">Works everywhere</p>
            <h2 className="text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02] mb-4">
              Works everywhere<br />you do.
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
              Taply works on any device, anywhere you go.
            </p>
  <div className="grid grid-cols-2 gap-5">
  {[
    { label: "Tap", image: "/tap-render.png" },
    { label: "Scan", image: "/scan-render.jpg" },
    { label: "Wallet", image: "/WALLET-SECTION-RENDER.png" },
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
{/* ── TAPLY PRO: APPLE WALLET ── */}
<section className="bg-[#fffaf0] px-4 py-10">
  <div className="max-w-[420px] mx-auto overflow-hidden rounded-[32px] border border-[#e7cb7b] bg-white shadow-[0_20px_60px_rgba(184,134,11,0.18)]">
    <div className="px-6 pt-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#e6b93e] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black shadow-sm">
        <span className="text-[13px]">✓</span>
        Taply Pro
      </div>

      <h2 className="mt-5 text-[2.35rem] font-black tracking-[-0.055em] leading-[1.02]">
        Your phone is<br />
        <span className="bg-gradient-to-r from-[#a97810] via-[#d5a72e] to-[#8d650d] bg-clip-text text-transparent">
          your business card.
        </span>
      </h2>

      <p className="mt-5 text-[17px] leading-relaxed text-gray-600">
        No card needed. Your phone is your  card.
      </p>
    </div>

    <div className="relative mx-auto mt-5 w-[82%]">
      <img
        src="/APPLE-WALLET-RENDER.png"
        alt="Taply Pro Apple Wallet pass"
        className="block h-auto w-full"
      />
    </div>

    <div className="px-6 pt-5 pb-7">
      <p className="mb-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#a97810]">
      </p>

      <button
        onClick={() => window.open("/pricing", "_blank")}
        className="w-full rounded-2xl bg-black py-4 text-[16px] font-black text-white transition hover:scale-[1.01] active:scale-[0.98]"
      >
        Get Taply Pro →
      </button>
    </div>
  </div>
</section>
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
            { title: "Company", tag: "Events & meetups", desc: "Social links front and center. Built for rooms full of people you want to know.", accent: "#7c3aed", tagBg: "rgba(124,58,237,0.15)", tagColor: "#a78bfa" },
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



      {/* ── SECTION 6: CTA (black) ── */}
<div className="px-6 py-16 text-center" style={{ background: "linear-gradient(135deg,#1d4ed8,#4f46e5)" }}>        <p className="text-lg font-semibold text-blue-400 tracking-wide mb-6">Get started</p>
        <h2 className="text-[2.6rem] font-black tracking-tighter leading-[1.05] text-white mb-4">
          Build your digital.<br />business card today.
        </h2>
        <p className="text-[16px] text-white/40 leading-relaxed mb-10 max-w-xs mx-auto">
     
        </p>
        <button onClick={() => window.open("/signup", "_blank")}
          className="w-full bg-white text-black py-5 rounded-2xl text-[16px] font-black flex items-center justify-between px-6 hover:bg-gray-100 active:scale-[0.98] transition">
          <span>Create your Taply Card →</span>
          <span>→</span>
        </button>
  <div className="flex items-center justify-center gap-6 mt-8 text flex-wrap">
  {[
    "Built for modern networking",
  ].map((t) => (
    <span
      key={t}
      className="text-[13px] uppercase tracking-[0.18em] text-white/30 font-semibold"
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
        <p className="text-[13px] text-gray-600 mb-8 leading-relaxed">The business card you'll never run out of.</p>
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
