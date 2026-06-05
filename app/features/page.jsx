"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function FeaturesPage() {
  const router = useRouter()
  const [activeMode, setActiveMode] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const modes = [
    { id: "business", label: "Business", sub: "Meetings & sales", color: "#2563eb", bg: "#eff6ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>, desc: "Phone, email, LinkedIn, website. Clean and professional for every handshake." },
    { id: "networking", label: "Networking", sub: "Events & conferences", color: "#7c3aed", bg: "#f5f3ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, desc: "Social links, contact circles, custom buttons. Built for fast connections at any event." },
    { id: "university", label: "University", sub: "Campus & career fairs", color: "#059669", bg: "#ecfdf5", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, desc: "Major, GPA, grad year, projects, resume. Everything recruiters want in one card." },
    { id: "social", label: "Social", sub: "Creators & influencers", color: "#ea580c", bg: "#fff7ed", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, desc: "TikTok, Instagram, YouTube, shop links. Grow your audience every time you meet someone." },
  ]

  const features = [
    {
      num: "01",
      tag: "One Link",
      headline: "Everything you are,\none tap away.",
      body: "Your personal taply.now/username link opens your active profile instantly — no app needed. Share it anywhere, anytime.",
      color: "#2563eb",
      bullets: ["Personal link that never changes", "Works on any device, any browser", "NFC card tap support", "QR code included"],
      visual: (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 h-44 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-3 left-3 right-3 h-8 bg-white/60 rounded-xl flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-gray-500">taply.now/yourname</span>
          </div>
          <div className="mt-14 flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg" />
            <div className="h-2.5 w-20 bg-blue-200 rounded-full" />
            <div className="h-2 w-14 bg-blue-100 rounded-full" />
            <div className="flex gap-2 mt-1">
              {[0,1,2].map(i => <div key={i} className="h-7 w-20 bg-white/70 rounded-lg" />)}
            </div>
          </div>
        </div>
      )
    },
    {
      num: "02",
      tag: "Multiple Modes",
      headline: "One profile\nfor every version of you.",
      body: "Create up to 3 saved profiles across 4 modes. Switch your active profile in one tap — your link instantly shows something different.",
      color: "#7c3aed",
      bullets: ["Business, University, Networking, Social", "Up to 3 saved profiles", "One-tap activation", "Each mode has its own layout & fields"],
      visual: (
        <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl p-4 h-44 flex flex-col gap-2 overflow-hidden">
          {modes.slice(0,3).map((m, i) => (
            <div key={m.id} className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all ${i === 0 ? "bg-white shadow-sm border-2 border-purple-300" : "bg-white/40"}`}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: m.bg }}>{m.icon}</div>
              <div className="flex-1">
                <div className="h-2 w-16 rounded-full" style={{ background: m.color + "40" }} />
              </div>
              {i === 0 && <span className="text-[10px] font-semibold text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full">Active</span>}
            </div>
          ))}
        </div>
      )
    },
    {
      num: "03",
      tag: "Apple Wallet",
      headline: "On your lock screen\nin seconds.",
      body: "Generate a native Apple Wallet pass from your active profile. Your photo, name, QR code, and contact info — one swipe from your lock screen.",
      color: "#059669",
      bullets: ["Generated from your active profile", "Custom card & text colors", "Company logo support", "Profile photo included"],
      visual: (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-4 h-44 flex items-center justify-center">
          <div className="w-52 h-32 bg-black rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ background: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "8px 8px" }} />
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div>
                <div className="h-1.5 w-10 bg-white/40 rounded-full mb-1" />
                <div className="h-2.5 w-20 bg-white rounded-full" />
                <div className="h-1.5 w-14 bg-white/40 rounded-full mt-1" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <div className="space-y-0.5">
                <div className="h-1.5 w-12 bg-white/30 rounded-full" />
                <div className="h-1.5 w-16 bg-white/30 rounded-full" />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
                  {[...Array(9)].map((_, i) => <div key={i} className={`rounded-sm ${i === 4 ? "bg-white/20" : "bg-white/60"}`} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "04",
      tag: "Full Customization",
      headline: "Your card,\nyour aesthetic.",
      body: "Every detail is yours to control. Colors, fonts, sizes, backgrounds — from diffused gradients to custom hex. Your card looks exactly how you want.",
      color: "#ea580c",
      bullets: ["Custom background colors & gradients", "6 font families", "Adjustable sizes for every element", "Name & title color control"],
      visual: (
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-4 h-44 overflow-hidden">
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b","#f97316"].map(c => (
              <div key={c} className="h-6 rounded-lg border border-white/60 shadow-sm" style={{ background: c }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {["Default","Poppins","Playfair","DM Sans","Mono","Inter"].map(f => (
              <div key={f} className="bg-white/70 rounded-lg py-1 px-1.5 text-[9px] text-center text-gray-600 font-medium">{f}</div>
            ))}
          </div>
          <div className="space-y-1.5">
            {["Name size","Title size","Contact"].map(l => (
              <div key={l} className="flex items-center gap-2">
                <span className="text-[9px] text-gray-500 w-12">{l}</span>
                <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-300 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "05",
      tag: "QR Code",
      headline: "Your QR code\nalways ready.",
      body: "Pull up your personal QR code instantly from the dashboard. Anyone scans it and lands on your active profile. Download it, share it, print it.",
      color: "#0891b2",
      bullets: ["Instant QR generation", "Links to your active profile", "Downloadable PNG", "Always up to date"],
      visual: (
        <div className="bg-gradient-to-br from-cyan-50 to-sky-100 rounded-2xl p-4 h-44 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-7 gap-0.5 w-28 h-28">
              {[...Array(49)].map((_, i) => {
                const corners = [0,1,2,7,8,9,14,15,16,32,33,34,39,40,41,46,47,48]
                const inner = [10,11,12,17,18,19,36,37,38,43,44,45]
                return <div key={i} className={`rounded-sm ${corners.includes(i) ? "bg-cyan-600" : inner.includes(i) ? "bg-cyan-400" : Math.random() > 0.5 ? "bg-gray-800" : "bg-transparent"}`} />
              })}
            </div>
          </div>
        </div>
      )
    },
    {
      num: "06",
      tag: "Save to Contacts",
      headline: "One tap to save\nyour contact.",
      body: "Your profile includes a native Save Contact button. One tap downloads a .vcf file with your name, phone, email, and LinkedIn — straight into their phone.",
      color: "#16a34a",
      bullets: ["Standard .vcf format", "Name, phone, email, LinkedIn", "Works on iOS & Android", "No app needed on their end"],
      visual: (
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 h-44 flex flex-col justify-center items-center gap-3">
          <div className="w-48 bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
            <div>
              <div className="h-2.5 w-24 bg-gray-200 rounded-full mb-1" />
              <div className="h-2 w-16 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="w-48 bg-black text-white rounded-2xl py-3 flex items-center justify-center gap-2 shadow-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span className="text-xs font-semibold">Save Contact</span>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* NAV */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[64px] bg-white/90 backdrop-blur border-b border-gray-100">
        <Link href="/">
          <img src="/taply-logo.svg" className="h-10 object-contain" />
        </Link>
        <button onClick={() => router.push("/signup")}
          className="bg-black text-white text-[13px] font-semibold px-5 py-2 rounded-xl">
          Get started →
        </button>
      </div>

      {/* HERO */}
      <div className="px-6 pt-24 pb-12 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[12px] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            What Taply can do
          </div>
          <h1 className="text-[2.6rem] font-black tracking-tight leading-[1.05] mb-4">
            Your whole<br />professional<br />life in one card.
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs">
            Multiple profiles, Apple Wallet, QR codes, full customization — all behind one personal link.
          </p>
        </motion.div>
      </div>

      {/* MODES SPOTLIGHT */}
      <div className="px-6 py-12 border-b border-gray-100 bg-[#fafaf9]">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-black" />
          <p className="text-[13px] font-semibold text-black">4 Modes</p>
        </div>
        <h2 className="text-[1.8rem] font-black tracking-tight leading-tight mb-2">Built for every<br />situation.</h2>
        <p className="text-[14px] text-gray-500 mb-6">Switch modes in one tap. Your link shows something completely different.</p>

        {/* Mode tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
          {modes.map((m, i) => (
            <button key={m.id} onClick={() => setActiveMode(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${activeMode === i ? "text-white shadow-md" : "bg-white border border-gray-200 text-gray-600"}`}
              style={activeMode === i ? { background: m.color } : {}}>
              <span classname="inline-flex items-center gap-1.5">{m.icon}{m.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeMode}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl p-5 border-2"
            style={{ background: modes[activeMode].bg, borderColor: modes[activeMode].color + "30" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white shadow-sm">{modes[activeMode].icon}</div>
              <div>
                <p className="font-bold text-[16px]">{modes[activeMode].label}</p>
                <p className="text-[12px] text-gray-500">{modes[activeMode].sub}</p>
              </div>
            </div>
            <p className="text-[14px] text-gray-700 leading-relaxed">{modes[activeMode].desc}</p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: modes[activeMode].color }} />
              <span className="text-[12px] font-semibold" style={{ color: modes[activeMode].color }}>Unique layout & fields for this mode</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FEATURE LIST */}
      <div className="divide-y divide-gray-100">
        {features.map(({ num, tag, headline, body, color, bullets, visual }, idx) => (
          <motion.div key={tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="px-6 py-12">

            <div className="flex items-center justify-between mb-5">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <p className="text-[13px] font-semibold" style={{ color }}>{tag}</p>
              </div>
              <span className="text-[11px] font-bold text-gray-200 tracking-wider">{num}</span>
            </div>

            <h2 className="text-[1.75rem] font-black tracking-tight leading-[1.1] mb-3 whitespace-pre-line">{headline}</h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-6">{body}</p>

            {visual}

            <div className="mt-6 grid grid-cols-1 gap-2">
              {bullets.map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: color + "15" }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-gray-700 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 py-14 border-t border-gray-100 bg-[#fafaf9]">
        <h2 className="text-[2rem] font-black tracking-tight leading-tight mb-3">One card.<br />Infinite possibilities.</h2>
        <p className="text-[15px] text-gray-500 mb-8">Join thousands using Taply to make every introduction count.</p>
        <button onClick={() => router.push("/signup")}
          className="w-full bg-black text-white py-4 rounded-2xl text-[15px] font-bold flex items-center justify-between px-6 shadow-lg active:scale-[0.98] transition">
          <span>Create your free card</span>
          <span>→</span>
        </button>
        <p className="text-center text-[12px] text-gray-400 mt-3">Free to start · No credit card needed</p>
      </div>

    </div>
  )
}
