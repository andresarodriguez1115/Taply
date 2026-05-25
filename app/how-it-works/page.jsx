"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function HowItWorksPage() {
  const router = useRouter()
  const [activeMode, setActiveMode] = useState("Business")

  const modes = {
    Business: {
      color: "#2563eb", bg: "#eff6ff",
      fields: [
        { label: "Name", value: "Andres Rodriguez" },
        { label: "Title", value: "Founder of Taply" },
        { label: "Company", value: "Taply Inc." },
        { label: "Phone", value: "(561) 419-4363" },
        { label: "Email", value: "andres@taply.now" },
        { label: "LinkedIn", value: "/in/andres" },
      ]
    },
    University: {
      color: "#059669", bg: "#ecfdf5",
      fields: [
        { label: "Name", value: "Andres Rodriguez" },
        { label: "Major", value: "Business Mgmt" },
        { label: "Grad", value: "Class of 2026" },
        { label: "School", value: "Univ. of Florida" },
        { label: "Email", value: "andres@ufl.edu" },
        { label: "LinkedIn", value: "/in/andres" },
      ]
    },
    Networking: {
      color: "#7c3aed", bg: "#f5f3ff",
      fields: [
        { label: "Name", value: "Andres Rodriguez" },
        { label: "Instagram", value: "@andres_ar" },
        { label: "LinkedIn", value: "/in/andres" },
        { label: "Twitter", value: "@andres_ar" },
        { label: "Website", value: "andres.co" },
        { label: "Email", value: "andres@taply.now" },
      ]
    },
    Social: {
      color: "#ea580c", bg: "#fff7ed",
      fields: [
        { label: "Handle", value: "@andres_ar" },
        { label: "TikTok", value: "50k followers" },
        { label: "Instagram", value: "30k followers" },
        { label: "YouTube", value: "20k subscribers" },
        { label: "Spotify", value: "Andres Rodriguez" },
        { label: "Link", value: "andres.co" },
      ]
    },
  }

  const m = modes[activeMode]

  const steps = [
    {
      num: "01",
      tag: "Sign up",
      headline: "Claim your personal link.",
      body: "Create your account and pick a username. Your link goes live instantly at taply.now/username — share it anywhere.",
      visual: (
        <div className="bg-[#fafaf9] border border-gray-200 rounded-2xl p-4">
          <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wider font-medium">Your link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[15px]">
              <span className="text-gray-400">taply.now/</span>
              <span className="text-black font-bold">yourname</span>
            </div>
            <div className="bg-blue-600 rounded-xl px-4 py-3 text-white text-[13px] font-bold shrink-0">Claim</div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">Your permanent Taply link</p>
        </div>
      )
    },
    {
      num: "02",
      tag: "Build profiles",
      headline: "Create a profile for each mode.",
      body: "Each mode has its own layout and fields. Fill in Business, University, Networking, or Social — takes under a minute each.",
      visual: (
        <div>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.keys(modes).map((mode) => (
              <button key={mode} onClick={() => setActiveMode(mode)}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all"
                style={{
                  background: activeMode === mode ? modes[mode].color : "white",
                  color: activeMode === mode ? "white" : "#6b7280",
                  borderColor: activeMode === mode ? modes[mode].color : "#e5e7eb",
                }}>
                {mode}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeMode}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-[60px] flex items-center justify-center text-[11px] text-gray-400 border-b border-gray-100" style={{ background: m.bg }}>
                [ {activeMode} profile visual — replace later ]
              </div>
              <div className="p-4 flex flex-col gap-2">
                {m.fields.map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 w-14 shrink-0 uppercase tracking-wide font-medium">{label}</span>
                    <span className="text-[13px] text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )
    },
    {
      num: "03",
      tag: "Set active",
      headline: "Choose what people see.",
      body: "Set any profile as Active. That's what shows at your link instantly. You can switch modes in seconds — your link never changes.",
      visual: (
        <div className="bg-[#fafaf9] border border-gray-200 rounded-2xl overflow-hidden">
          {[
            { mode: "Business", active: true, color: "#2563eb" },
            { mode: "University", active: false, color: "#059669" },
            { mode: "Networking", active: false, color: "#7c3aed" },
            { mode: "Social", active: false, color: "#ea580c" },
          ].map(({ mode, active, color }, i) => (
            <div key={mode} className={`flex items-center justify-between px-4 py-3.5 ${i < 3 ? "border-b border-gray-100" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: active ? color : "#e5e7eb" }} />
                <p className="text-[14px] font-semibold text-gray-800">{mode}</p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: active ? "#eff6ff" : "#f3f4f6", color: active ? "#2563eb" : "#9ca3af" }}>
                {active ? "Active" : "Saved"}
              </span>
            </div>
          ))}
          <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
            <p className="text-[12px] text-blue-600 font-medium">Live at taply.now/andres</p>
          </div>
        </div>
      )
    },
    {
      num: "04",
      tag: "Share it",
      headline: "Share three different ways.",
      body: "Send your link, show your QR code, or tap your NFC card. All three open your active profile on any device instantly.",
      visual: (
        <div className="flex flex-col gap-2">
          {[
            { title: "Send your link", detail: "taply.now/andres", color: "#2563eb", bg: "#eff6ff" },
            { title: "Show QR code", detail: "Anyone can scan it", color: "#7c3aed", bg: "#f5f3ff" },
            { title: "Tap NFC card", detail: "Physical tap, instant open", color: "#059669", bg: "#ecfdf5" },
          ].map(({ title, detail, color, bg }) => (
            <div key={title} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ background: bg }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
              </div>
              <div>
                <p className="text-[14px] font-semibold">{title}</p>
                <p className="text-[12px] text-gray-400">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      num: "05",
      tag: "Track it",
      headline: "See who's viewing you.",
      body: "Every view, tap, and contact save is tracked in real time. Know what's working and when people engage most.",
      visual: (
        <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-white/8">
            <p className="text-[11px] text-white/40 mb-1">This week</p>
            <div className="flex items-end justify-between">
              <p className="text-[28px] font-extrabold text-white">1,284 views</p>
              <span className="text-[12px] font-bold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">+14%</span>
            </div>
            <div className="flex items-end gap-1 h-10 mt-3">
              {[30, 45, 38, 60, 52, 72, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 6 ? "#2563eb" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/8">
            {[{ l: "Taps", v: "342" }, { l: "Saves", v: "89" }, { l: "Rate", v: "28%" }].map(({ l, v }) => (
              <div key={l} className="px-3 py-3 text-center">
                <p className="text-[18px] font-extrabold text-white">{v}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAV */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[70px] bg-white/90 backdrop-blur border-b border-gray-100">
        <Link href="/">
          <img src="/taply-logo.svg" className="h-12 object-contain" />
        </Link>
        <button onClick={() => router.push("/signup")}
          className="bg-black text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl">
          Get started
        </button>
      </div>

      {/* HERO */}
      <div className="px-6 pt-28 pb-16 border-b border-gray-100">
        <p className="text-sm font-semibold text-blue-600 tracking-wide mb-3">How it works</p>
        <h1 className="text-[2.8rem] font-extrabold tracking-tight leading-[1.05] mb-4 max-w-xs">
          Up and running<br />in 5 steps.
        </h1>
        <p className="text-[16px] text-gray-500 leading-relaxed max-w-sm">
          Create your card, build your profiles, set one active, and share. Takes less than 2 minutes.
        </p>
      </div>

      {/* STEPS */}
      <div className="divide-y divide-gray-100">
        {steps.map(({ num, tag, headline, body, visual }) => (
          <div key={num} className="px-6 py-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-black shrink-0">{num}</div>
              <p className="text-[13px] font-semibold text-gray-500">{tag}</p>
            </div>
            <h2 className="text-[1.9rem] font-extrabold tracking-tight leading-[1.1] mb-3">{headline}</h2>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">{body}</p>
            {visual}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-[#fafaf9] px-6 py-12 border-t border-gray-100">
        <p className="text-[13px] font-semibold text-gray-500 mb-6 uppercase tracking-wide">Common questions</p>
        <div className="flex flex-col gap-4">
          {[
            { q: "Does the other person need the Taply app?", a: "No. Your profile opens in any browser on any device — no app download needed." },
            { q: "Can I have more than one active profile?", a: "You can only have one active at a time, but you can switch instantly between any of your saved profiles." },
            { q: "Does my link change when I switch modes?", a: "Never. Your taply.now/username link is permanent — only what people see changes." },

          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-2xl p-4 bg-white">
              <p className="text-[15px] font-bold mb-2">{q}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-14 border-t border-gray-100">
        <h2 className="text-[2rem] font-extrabold tracking-tight leading-[1.1] mb-3">Ready in 30 seconds.</h2>
        <p className="text-[15px] text-gray-500 mb-8">
Your identity, unified in one link.
</p>
        <button onClick={() => router.push("/signup")}
          className="w-full bg-black text-white py-4 rounded-2xl text-[15px] font-bold flex items-center justify-between px-6">
          <span>Create your Taply card</span>
          <span>→</span>
        </button>
      </div>

    </div>
  )
}
