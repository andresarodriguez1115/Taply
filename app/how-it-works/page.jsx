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
      headline: "Create your account.",
      body: "Sign up and your personal link goes live instantly at taply.now/username — no setup, no claiming, it's yours the moment you join.",
      visual: (
        <div className="bg-[#fafaf9] border border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
            <span className="text-[14px] font-mono text-gray-400">taply.now/</span>
            <span className="text-[14px] font-mono font-bold text-black">yourname</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: "Share link", color: "#2563eb", bg: "#eff6ff" },
              { label: "Show QR", color: "#7c3aed", bg: "#f5f3ff" },
              { label: "NFC tap", color: "#059669", bg: "#ecfdf5" },
            ].map(({ label, color, bg }) => (
              <div key={label} className="flex-1 rounded-xl py-2 flex items-center justify-center text-[11px] font-semibold" style={{ background: bg, color }}>
                {label}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400">Live the moment you sign up · Never changes</p>
        </div>
      )
    },
    {
      num: "02",
      tag: "Build profiles",
      headline: "Create a profile for each mode.",
      body: "Choose from Business, University, Networking, or Social. Each has its own unique layout and fields. Create up to 3 profiles and switch between them anytime.",
      visual: (
        <div>
          <div className="flex gap-2 flex-wrap mb-6">
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
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>
              <div className="relative mx-auto" style={{ width: "100%" }}>
                <div className="relative rounded-[52px] bg-[#141414] p-[10px] shadow-[0_50px_100px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#141414] rounded-full z-20" />
                  <div className="absolute right-[-3px] top-[110px] w-[3px] h-[68px] bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute left-[-3px] top-[88px] w-[3px] h-[44px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute left-[-3px] top-[144px] w-[3px] h-[44px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="rounded-[44px] overflow-hidden bg-white">
                    <div style={{ maxHeight: 820, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
{activeMode === "Business" && (
  <div className="bg-gradient-to-br from-[#bfd8ff] via-[#c7d2fe] to-[#e8f7f3] px-3 pt-10 pb-6 min-h-[560px]">
    <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] mb-5">
      <div
        className="relative h-[125px] rounded-t-[28px]"
        style={{
          background: "linear-gradient(135deg,#8db2f0,#a5afc5,#d7deea)",
        }}
      >
        <div className="absolute -bottom-9 left-5 w-[70px] h-[70px] rounded-full border-[3px] border-white bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white text-[20px] font-black shadow-md">
          AR
        </div>
      </div>

      <div className="px-5 pt-12 pb-5">
        <p className="text-[20px] font-extrabold tracking-tight leading-tight">
          Andres Rodriguez
        </p>
        <p className="text-[14px] text-gray-500 mt-2">
          Founder of Taply
        </p>
      </div>
    </div>

    <button className="w-full bg-black text-white rounded-[20px] py-3.5 text-[14px] font-bold shadow-[0_8px_18px_rgba(0,0,0,0.16)] mb-5">
      Save Contact
    </button>

    <div className="flex flex-col gap-3">
  {[
  {
    label: "Call",
    sub: "(561) 419-4363",
    color: "#59b35a",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    sub: "andres@taply.now",
    color: "#4f6fe8",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "andresarodriguez",
    color: "#6558ea",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8h4.2v13H.4V8zm7.1 0h4v1.8h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V21h-4.2v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H7.5V8z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    sub: "@andres_rodriguez",
    color: "#cc4b8e",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
      </svg>
    ),
  },
].map(({ label, sub, color, icon }) => (
        <div
          key={label}
          className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-4 shadow-sm border border-black/5"
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: color }}
          >
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold leading-tight">{label}</p>
            <p className="text-[13px] text-gray-500 truncate mt-1">{sub}</p>
          </div>

          <span className="text-gray-300 text-xl">›</span>
        </div>
      ))}
    </div>
  </div>
)}
{activeMode === "University" && (
  <div className="bg-gradient-to-br from-[#bfd8ff] via-[#c7d2fe] to-[#e8f7f3] px-3 pt-10 pb-6 min-h-[560px]">
    


    <div className="bg-white rounded-[24px] px-5 py-4 shadow-sm mb-4 flex items-center gap-4">
      <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-gray-700 to-gray-500 border-2 border-white shadow-md flex items-center justify-center text-white text-[20px] font-black shrink-0">
        AR
      </div>

      <div className="flex-1 min-w-0 leading-none">
        <p className="text-[17px] font-extrabold tracking-tight leading-tight">
          Andres Rodriguez
        </p>
        <p className="text-[15px] text-gray-500 mt-2">
          Senior at Texas A&M
        </p>

        <button className="mt-2.5 bg-black text-white rounded-full px-4 py-2 text-[12px] font-bold flex items-center gap-2">
          <span>▣</span>
          <span>View Resume</span>
        </button>
      </div>
    </div>

    <div className="bg-white/60 rounded-full p-1 mb-4 grid grid-cols-2 gap-1">
      <div className="bg-white rounded-full py-3 text-center text-[14px] font-bold shadow-sm">
        About
      </div>
      <div className="rounded-full py-3 text-center text-[14px] font-semibold text-gray-500">
        Portfolio
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-5">
      {[
        { label: "GPA", value: "3.5" },
        { label: "PROJECTS", value: "1" },
        { label: "GRAD", value: "27" },
      ].map(({ label, value }) => (
        <div key={label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-[24px] font-black text-blue-500 leading-tight">
            {value}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-2">
            {label}
          </p>
        </div>
      ))}
    </div>

    <div className="mb-5">
      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-3 px-1">
        About
      </p>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-[15px] text-gray-700 leading-[1.8]">
          I’m a marketing entrepreneur focused on building simple, modern tools that make networking easier.
        </p>
      </div>
    </div>

    <div>
      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-3 px-1">
        Contact
      </p>

      <div className="flex flex-col gap-3">
     {[
  {
    label: "Phone",
    sub: "(561) 419-4363",
    color: "#dcfce7",
    text: "#43a047",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    sub: "andresarodriguez1115@gmail.com",
    color: "#eef2ff",
    text: "#4169e1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "@andresarodriguez1115",
    color: "#f0f0ff",
    text: "#5b4ee6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8h4.2v13H.4V8zm7.1 0h4v1.8h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V21h-4.2v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H7.5V8z" />
      </svg>
    ),
  },
].map(({ label, sub, color, text, icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl px-4 py-4 flex items-center gap-4 shadow-sm border border-black/5"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ background: color, color: text }}
            >
              {icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-400 leading-tight">
                {label}
              </p>
              <p className="text-[15px] font-semibold text-black truncate mt-1">
                {sub}
              </p>
            </div>

            <span className="text-gray-300 text-xl">›</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{activeMode === "Networking" && (
  <div className="bg-gradient-to-br from-[#bfd8ff] via-[#c7d2fe] to-[#e8f7f3] px-4 pt-14 pb-7 min-h-[700px] flex flex-col items-center">
    
    <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-gray-700 to-gray-500 border-[3px] border-white shadow-lg flex items-center justify-center text-white text-[38px] font-black mb-6">
      AR
    </div>

    <p className="text-[25px] font-extrabold tracking-tight leading-tight text-center">
      Andres Rodriguez
    </p>

    <div className="mt-4 mb-5 border border-gray-300 rounded-full px-5 py-1.5 text-[16px] text-black">
      Founder of Taply
    </div>

<div className="flex justify-center gap-4 mb-6">
  {[
    {
      icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      ),
    },
    {
      icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
  ].map(({ icon }, i) => (
    <div
      key={i}
      className="w-[54px] h-[54px] rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700"
    >
      {icon}
    </div>
  ))}
</div>

    <div className="grid grid-cols-2 gap-3 w-full mb-8">
      <button className="bg-white rounded-full py-3.5 text-[15px] font-bold shadow-sm flex items-center justify-center gap-2">
   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="M7 10l5 5 5-5" />
  <path d="M12 15V3" />
</svg>
<span>Add to Contacts</span>
      </button>

      <button className="bg-white rounded-full py-3.5 text-[15px] font-bold shadow-sm flex items-center justify-center gap-2">
 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <path d="M8.6 13.5l6.8 4" />
  <path d="M15.4 6.5l-6.8 4" />
</svg>
<span>Share</span>
      </button>
    </div>

    <div className="w-full flex flex-col gap-4">
      {[
        { label: "Visit Taply" },
        { label: "How it works" },
        { label: "Features" },
      ].map(({ label }) => (
        <div
          key={label}
          className="bg-white rounded-[22px] px-4 py-4 flex items-center gap-4 shadow-sm border border-black/5"
        >
          <div className="w-[54px] h-[54px] rounded-2xl bg-[#4565e8] flex flex-col items-center justify-center text-white shrink-0">
            <div className="text-[18px] leading-none">◎</div>
            <div className="text-[10px] font-black leading-none mt-1">taply</div>
          </div>

          <p className="text-[17px] font-bold flex-1">
            {label}
          </p>

          <span className="text-gray-400 text-xl">→</span>
        </div>
      ))}
    </div>
  </div>
)}
             {activeMode === "Social" && (
  <div className="bg-gradient-to-br from-[#bfd8ff] via-[#c7d2fe] to-[#e8f7f3] px-4 pt-14 pb-8 min-h-[760px] flex flex-col items-center">
    
    <div className="w-[132px] h-[132px] rounded-full bg-gradient-to-br from-gray-700 to-gray-500 border-[3px] border-white shadow-lg flex items-center justify-center text-white text-[34px] font-black mb-6">
      AR
    </div>

    <p className="text-[26px] font-extrabold tracking-tight leading-tight text-center">
      Andres Rodriguez
    </p>

    <p className="text-[16px] text-gray-500 mt-3 mb-6">
      Marketing Consultant
    </p>
<div className="flex justify-center gap-4 mb-7">
  {[
    {
      color: "#000000",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v12.2A4.2 4.2 0 1 1 9.8 11.5V6.5h8.5V3H12z" />
        </svg>
      ),
    },
    {
      color: "#60a5fa",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.2 3h3.3l-7.2 8.2L22.8 21h-6.6l-5.2-6.4L5.1 21H1.8l7.7-8.8L1.4 3h6.8l4.7 5.7L18.2 3zM17 19.3h1.8L7.2 4.6H5.3L17 19.3z" />
        </svg>
      ),
    },
    {
      color: "#ef3b2d",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 6.5.2 6.5.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6zM10.1 14.9V8.7l5.8 3.1-5.8 3.1z" />
        </svg>
      ),
    },
    {
      color: "#cc4b7c",
      icon: (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ].map(({ icon, color }, i) => (
    <div
      key={i}
      className="w-[48px] h-[48px] rounded-full bg-white shadow-sm flex items-center justify-center"
      style={{ color }}
    >
      {icon}
    </div>
  ))}
</div>

    <div className="mb-6 inline-flex bg-gray-100 rounded-full p-1">
      <div className="bg-white rounded-full px-8 py-3 text-[15px] font-bold shadow-sm">
        Links
      </div>
      <div className="rounded-full px-8 py-3 text-[15px] font-semibold text-gray-500">
        Shop
      </div>
    </div>

    <div className="w-full flex flex-col gap-4">
      {[
        { title: "Taply", image: "taply" },
        { title: "How it works", image: "taply" },
      ].map(({ title }, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5"
        >
          <div className="h-[150px] bg-[#10111f] flex items-center justify-center">
            <div className="flex items-center gap-5 text-white">
              <div className="w-[78px] h-[78px] rounded-full border-[7px] border-white flex items-center justify-center">
                <div className="w-[38px] h-[38px] rounded-full border-[7px] border-white flex items-center justify-center">
                  <div className="w-[10px] h-[10px] bg-white rounded-full" />
                </div>
              </div>

              <p className="text-[44px] font-black tracking-tight">
                taply
              </p>
            </div>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between">
            <p className="text-[14px] font-bold">
              {title}
            </p>

            <span className="text-gray-400 text-xl">→</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )
    },
    {
      num: "03",
      tag: "Manage profiles",
      headline: "Choose what people see.",
      body: "Set any profile as Active from your dashboard. Your link instantly shows that profile. Switch between your saved profiles in one tap — your link never changes.",
      visual: (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {[
            { mode: "Business", active: true, color: "#2563eb", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
            { mode: "University", active: false, color: "#059669", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
            { mode: "Networking", active: false, color: "#7c3aed", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            { mode: "Social", active: false, color: "#ea580c", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
          ].map(({ mode, active, color, icon }, i) => (
            <div key={mode} className={`flex items-center gap-4 px-5 py-4 ${i < 3 ? "border-b border-gray-100" : ""} ${active ? "bg-blue-50/60" : ""}`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: active ? color : "#f3f4f6", color: active ? "white" : "#9ca3af" }}>
                {icon}
              </div>
              <p className="text-[15px] font-semibold flex-1 text-gray-900">{mode}</p>
              {active ? (
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-blue-600 text-white">Active</span>
                  <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
              ) : (
                <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-400">Saved</span>
              )}
            </div>
          ))}
          <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <p className="text-[12px] text-blue-600 font-semibold">Live at taply.now/andres</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </div>
      )
    },
    {
      num: "04",
      tag: "Share it",
      headline: "Tap. Scan. Done.",
      body: "Hold your NFC card to anyone's phone — they see your active profile instantly. No app, no friction, no fumbling with contacts. Or show your QR. Either way, every person you meet has your link forever.",
      visual: (
        <div className="flex flex-col gap-3">
          {[
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>, label: "NFC tap", desc: "Hold your card to their phone. They see your active profile. No app, no download, nothing to install.", color: "#059669", bg: "#ecfdf5" },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3v3m0-3v3m-3-6h3m3 0v3m-6 3h3"/></svg>, label: "QR code", desc: "Show your screen. They scan. Done. Works on every phone camera.", color: "#7c3aed", bg: "#f5f3ff" },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, label: "Your link, forever", desc: "Every person you've ever shared with can always come back — your link never changes.", color: "#2563eb", bg: "#eff6ff" },
          ].map(({ icon, label, desc, color, bg }) => (
            <div key={label} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: bg, color }}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-black mb-1">{label}</p>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
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
        <div className="bg-[#0d0d14] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[12px] text-white/40 font-medium">Total views</p>
              <div className="flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1">
                <p className="text-[11px] text-white/50 font-medium">Last 7 days</p>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <div className="flex items-end gap-3 mb-1">
              <p className="text-[36px] font-black text-white leading-none">2,847</p>
              <span className="text-[12px] font-bold text-green-400 bg-green-400/15 px-2.5 py-1 rounded-full mb-1">↑ 24%</span>
            </div>
            <p className="text-[11px] text-white/25 mb-4">vs last 7 days</p>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-16">
              {[
                { h: 35, label: "12" },
                { h: 52, label: "13" },
                { h: 44, label: "14" },
                { h: 70, label: "15" },
                { h: 55, label: "16" },
                { h: 62, label: "17" },
                { h: 80, label: "18" },
              ].map(({ h, label }, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg transition-all" style={{ height: `${h}%`, background: i === 6 ? "#6366f1" : "rgba(99,102,241,0.25)" }} />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-1">
              {["12","13","14","15","16","17","18"].map(d => (
                <p key={d} className="flex-1 text-center text-[9px] text-white/20">May {d}</p>
              ))}
            </div>
          </div>
          {/* Bottom stats */}
          <div className="grid grid-cols-3 border-t border-white/8">
            {[
              { label: "Views", value: "2,847", change: "+24%", color: "#6366f1", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
              { label: "Taps", value: "1,326", change: "+18%", color: "#8b5cf6", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg> },
              { label: "Saves", value: "642", change: "+31%", color: "#10b981", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg> },
            ].map(({ label, value, change, color, icon }) => (
              <div key={label} className="px-4 py-4 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: color + "22", color }}>
                  {icon}
                </div>
                <div>
                  <p className="text-[18px] font-black text-white leading-none">{value}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{label}</p>
                </div>
                <span className="text-[10px] font-bold" style={{ color }}>{change}</span>
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

{/* HERO */}1
<section className="pt-[92px] px-4 pb-10 overflow-hidden border-b border-gray-100">
  <div className="relative w-full max-w-[390px] mx-auto rounded-[30px] bg-gradient-to-br from-[#f8fbff] via-[#f4f1ff] to-[#eef7ff] border border-gray-100 shadow-[0_20px_60px_rgba(79,70,229,0.08)] px-4 pt-6 pb-5 overflow-hidden">
    
    <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-blue-200/40 blur-3xl" />
    <div className="absolute top-36 -right-20 w-48 h-48 rounded-full bg-purple-200/35 blur-3xl" />
    <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-emerald-100/60 blur-3xl" />


    <div className="relative z-10">
<h1 className="text-[3.2rem] min-[390px]:text-[3.6rem] font-black tracking-[-0.06em] leading-[0.95] mb-5">        How
        <br />
        Taply
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
          works.
        </span>
      </h1>

      <p className="text-[16px] text-gray-600 leading-[1.65] mb-6">        Create your card, build your profiles, and share one link that works everywhere.
        <span className="font-bold text-blue-600"> One identity for every occasion.</span>
      </p>
    </div>

   {/* compact visual */}
<div className="relative h-[235px] mb-5">
  {/* profile card */}
  <div className="absolute right-1 top-0 w-[190px] rounded-[24px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_16px_40px_rgba(79,70,229,0.16)] p-4 rotate-[4deg]">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-black text-[14px]">
        AR
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-black leading-tight">Andres</p>
        <p className="text-[13px] font-black leading-tight">Rodriguez</p>
        <p className="text-[11px] text-gray-500 mt-1">Founder of Taply</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {["◎", "↗", "✉"].map((icon, i) => (
        <div
          key={i}
          className="h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 font-bold shadow-sm text-[13px]"
        >
          {icon}
        </div>
      ))}
    </div>
  </div>

  {/* active profile card */}
  <div className="absolute left-0 top-[74px] w-[220px] bg-emerald-50/95 border border-white rounded-[20px] shadow-[0_12px_32px_rgba(16,185,129,0.14)] px-4 py-3 flex items-center gap-3 -rotate-[3deg] z-10">
    <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-[13px]">
      ▣
    </div>
    <div className="min-w-0">
      <p className="text-[13px] font-black truncate">Business Profile</p>
      <p className="text-[11px] text-gray-500">Active now</p>
    </div>
    <span className="ml-auto text-emerald-600 font-black">›</span>
  </div>

{/* Apple Wallet badge */}
<div className="absolute right-16 top-[130px] rotate-[2deg] z-20">
  <img src="/apple-wallet-badge.png" alt="Add to Apple Wallet" className="h-[55px] w-auto object-contain" />
</div>
</div>

    {/* steps */}
    <div className="relative bg-white/90 backdrop-blur border border-white rounded-[24px] shadow-[0_16px_45px_rgba(15,23,42,0.08)] p-3">
      <div className="grid grid-cols-2 gap-3">
        {[
          { n: "1", title: "Create", sub: "your card", bg: "#f1efff", color: "#7c3aed", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          { n: "2", title: "Build", sub: "profiles", bg: "#ecfdf5", color: "#059669", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
          { n: "3", title: "Set one", sub: "active", bg: "#fffbeb", color: "#d97706", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
          { n: "4", title: "Network", sub: "everywhere", bg: "#eff6ff", color: "#2563eb", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
        ].map((step) => (
          <div key={step.n} className="rounded-[20px] bg-[#fafafa] border border-gray-100 p-3 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: step.bg, color: step.color }}
              >
                {step.icon}
              </div>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[11px] font-black">
                {step.n}
              </span>
            </div>
            <p className="text-[14px] font-black leading-tight">{step.title}</p>
            <p className="text-[12px] text-gray-500 leading-tight">{step.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-[18px] bg-gradient-to-r from-violet-50 to-blue-50 border border-blue-100 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center shadow-sm text-blue-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
        </div>
        <div>
          <p className="text-[13px] font-black leading-tight">5. Track everything</p>
          <p className="text-[11px] text-gray-500">See views, taps, and saves.</p>
        </div>
      </div>
    </div>
  </div>
</section>

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
