"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FeaturesPage() {
  const router = useRouter()

  const features = [
    {
      tag: "Profiles",
      headline: "One link. Multiple identities.",
      body: "Create separate profiles for work, school, networking, and social. Set one as active — that's what people see at your link. Switch anytime.",
      color: "#2563eb",
      bg: "#eff6ff",
      items: ["Business profile", "University profile", "Networking profile", "Social / creator profile"],
      placeholder: "[ Profile switcher UI — replace with screenshot ]"
    },
    {
      tag: "Sharing",
      headline: "Three ways to share.",
      body: "Your personal link, a QR code, or a physical NFC tap. Whatever fits the moment — it all opens your active profile instantly.",
      color: "#7c3aed",
      bg: "#f5f3ff",
      items: ["taply.now/username", "Built-in QR code", "NFC card tap", "Works on any device"],
      placeholder: "[ Sharing methods visual — replace with screenshot ]"
    },
    {
      tag: "Apple Wallet",
      headline: "Your card on your lock screen.",
      body: "Generate a native Apple Wallet pass with your photo, QR code, and contact info. Pull it up in one swipe — no app needed on their end.",
      color: "#059669",
      bg: "#ecfdf5",
      items: ["Lock screen access", "Custom colors", "Profile photo", "Auto-syncs with active profile"],
      placeholder: "[ Apple Wallet pass visual — replace with screenshot ]"
    },
    {
      tag: "Analytics",
      headline: "See who's connecting.",
      body: "Real-time stats on every view, tap, and contact save. Know which links get clicked and when your profile is most active.",
      color: "#ea580c",
      bg: "#fff7ed",
      items: ["Profile views", "Link taps", "Contact saves", "Save rate"],
      placeholder: "[ Analytics dashboard visual — replace with screenshot ]"
    },
    {
      tag: "Integrations",
      headline: "16+ platforms in one place.",
      body: "Instagram, LinkedIn, TikTok, GitHub, Calendly, Venmo, Discord and more. Add any link, any platform — all behind your one link.",
      color: "#0891b2",
      bg: "#ecfeff",
      items: ["Social platforms", "Professional networks", "Payment links", "Creative portfolios"],
      placeholder: "[ Platform grid visual — replace with screenshot ]"
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
          Get started free
        </button>
      </div>

      {/* HERO */}
      <div className="px-6 pt-28 pb-16 border-b border-gray-100">
        <p className="text-sm font-semibold text-blue-600 tracking-wide mb-3">Features</p>
        <h1 className="text-[2.8rem] font-extrabold tracking-tight leading-[1.05] mb-4 max-w-xs">
          Everything<br />in one card.
        </h1>
        <p className="text-[16px] text-gray-500 leading-relaxed max-w-sm">
          Taply packs profiles, analytics, Apple Wallet, and 16+ integrations into a single smart link.
        </p>
      </div>

      {/* FEATURE LIST */}
      <div className="divide-y divide-gray-100">
        {features.map(({ tag, headline, body, color, bg, items, placeholder }, idx) => (
          <div key={tag} className="px-6 py-12">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <p className="text-[13px] font-semibold" style={{ color }}>{tag}</p>
            </div>

            {/* Headline + body */}
            <h2 className="text-[1.9rem] font-extrabold tracking-tight leading-[1.1] mb-3">{headline}</h2>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">{body}</p>

            {/* Visual placeholder */}
            <div className="w-full rounded-2xl h-[180px] flex items-center justify-center text-[12px] font-medium text-gray-400 mb-8 border border-dashed border-gray-200" style={{ background: bg }}>
              {placeholder}
            </div>

            {/* Feature checklist */}
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-gray-600 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODES DEEP DIVE */}
      <div className="bg-[#fafaf9] px-6 py-12 border-t border-gray-100">
        <div className="inline-flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-black" />
          <p className="text-[13px] font-semibold text-black">4 Modes</p>
        </div>
        <h2 className="text-[1.9rem] font-extrabold tracking-tight leading-[1.1] mb-3">Built for every situation.</h2>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-8">Each mode has its own layout and fields — designed specifically for how you introduce yourself in that context.</p>

        <div className="flex flex-col gap-3">
          {[
            { title: "Business", sub: "Meetings & sales", desc: "Phone, email, title, company, LinkedIn. Clean and professional.", color: "#2563eb", bg: "#eff6ff" },
            { title: "Networking", sub: "Events & meetups", desc: "Social links first. Great for conferences and parties.", color: "#7c3aed", bg: "#f5f3ff" },
            { title: "University", sub: "Campus & career", desc: "Major, grad year, clubs, email. Built for career fairs.", color: "#059669", bg: "#ecfdf5" },
            { title: "Social", sub: "Creators & influencers", desc: "TikTok, Instagram, YouTube. Grow your audience in person.", color: "#ea580c", bg: "#fff7ed" },
          ].map(({ title, sub, desc, color, bg }) => (
            <div key={title} className="flex gap-4 items-start bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: bg }}>
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[15px] font-bold">{title}</p>
                  <span className="text-[11px] text-gray-400">{sub}</span>
                </div>
                <p className="text-[13px] text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-14 border-t border-gray-100">
        <h2 className="text-[2rem] font-extrabold tracking-tight leading-[1.1] mb-3">Ready to try it?</h2>
        <p className="text-[15px] text-gray-500 mb-8">Free to start. Takes 30 seconds. No credit card needed.</p>
        <button onClick={() => router.push("/signup")}
          className="w-full bg-black text-white py-4 rounded-2xl text-[15px] font-bold flex items-center justify-between px-6">
          <span>Create your Taply card</span>
          <span>→</span>
        </button>
      </div>

    </div>
  )
}
