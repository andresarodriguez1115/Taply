"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Lock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const freePlan = {
  name: "Free",
  price: "$0",
  period: "forever",
  description: "Get your card live today.",
  cta: "Get started free",
  features: [
    { label: "Access to Business mode", included: true },
    { label: "1 saved profile", included: true },
    { label: "Your personal taply.now/username link", included: true },
    { label: "Up to 4 saved profiles", included: false },
    { label: "Social, Networking & University modes", included: false },
    { label: "Unlimited QR code generation", included: false },
    { label: "Unlimited Apple Wallet passes", included: false },
  ],
}

const proPlan = {
  name: "Pro",
  price: "$5",
  period: "per month",
  description: "For people who network seriously.",
  cta: "Start Pro",
  badge: "Most popular",
  features: [
    { label: "Access to Business mode", included: true },
    { label: "1 saved profile", included: true },
    { label: "Your personal taply.now/username link", included: true },
    { label: "Up to 4 saved profiles", included: true },
    { label: "Social, Networking & University modes", included: true },
    { label: "Unlimited QR code generation", included: true },
    { label: "Unlimited Apple Wallet passes", included: true },
  ],
}

const companyFeatures = [
  { label: "Everything in Pro", included: true },
  { label: "Shared company branding", included: true },
  { label: "Team member management", included: true },
  { label: "Custom domain (yourco.taply.now)", included: true },
  { label: "Analytics across all team cards", included: true },
  { label: "Priority support", included: true },
  { label: "Custom NFC card design", included: true },
]

function CompanyCard({ router }) {
  const [seats, setSeats] = useState(5)
  const discountPct = Math.min(40, Math.floor((seats - 1) / 5) * 10)
  const pricePerSeat = parseFloat((Math.max(3, 5 * (1 - discountPct / 100))).toFixed(2))
  const monthlyTotal = parseFloat((pricePerSeat * seats).toFixed(2))

  return (
    <div className="rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 bg-white">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] mb-1 text-gray-400">Company</p>
        <div className="flex items-end gap-1.5 mb-1">
          <p className="text-[3rem] font-black tracking-tight leading-none">${pricePerSeat}</p>
          <p className="text-[13px] pb-1.5 text-gray-400">/person/mo</p>
        </div>
        <p className="text-[13px] font-semibold text-gray-500 mb-3">${monthlyTotal}/mo for your team</p>
        <p className="text-[14px] text-gray-500 leading-relaxed">
          Built for sales teams. The more seats, the less you pay.
        </p>
      </div>

      {/* Seat stepper */}
      <div className="px-6 py-4 border-t border-b border-gray-100 bg-gray-50">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">How many people?</p>
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => setSeats(s => Math.max(1, s - 1))}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[18px] font-bold text-gray-600 hover:bg-gray-100 transition">
            −
          </button>
          <div className="flex-1 text-center">
            <p className="text-[24px] font-black">{seats}</p>
            <p className="text-[11px] text-gray-400">people</p>
          </div>
          <button
            onClick={() => setSeats(s => s + 1)}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[18px] font-bold text-gray-600 hover:bg-gray-100 transition">
            +
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex items-center justify-between mb-3">
          <p className="text-[12px] text-blue-600 font-semibold">10% off per person every 5 seats</p>
          <p className="text-[12px] text-blue-400">floor $3/person</p>
        </div>

        {/* Tier indicators */}
        <div className="flex gap-2">
          {[
            { label: "1–5", price: "$5.00", active: seats <= 5 },
            { label: "6–10", price: "$4.50", active: seats >= 6 && seats <= 10 },
            { label: "11–15", price: "$4.00", active: seats >= 11 && seats <= 15 },
            { label: "16+", price: "$3.00", active: seats >= 16 },
          ].map(({ label, price, active }) => (
            <div key={label} className={`flex-1 rounded-lg px-2 py-1.5 text-center border transition-all ${active ? "bg-black border-black" : "bg-white border-gray-100"}`}>
              <p className={`text-[10px] font-bold ${active ? "text-white" : "text-gray-400"}`}>{label}</p>
              <p className={`text-[13px] font-black ${active ? "text-white" : "text-gray-300"}`}>{price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-5 flex flex-col gap-3.5 bg-white">
        {companyFeatures.map(({ label, included }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <Check />
            </div>
            <p className="text-[14px] text-gray-900 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 bg-white">
        <button
          onClick={() => router.push("/signup")}
          className="w-full py-4 rounded-2xl text-[15px] font-bold bg-black text-white hover:bg-gray-900 transition">
          Get started →
        </button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [billing, setBilling] = useState("monthly")

  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAV */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center pl-2 pr-6 h-[75px] bg-white ${menuOpen ? "" : "border-b border-gray-200"}`}>
        <button onClick={() => router.push("/")} className="flex items-center h-full">
          <img src="/taply-logo.svg" className="h-14 object-contain" />
        </button>
        <button onClick={() => setMenuOpen(prev => !prev)} className="p rounded-lg hover:bg-gray-100 transition">
          <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <Menu size={28} strokeWidth={2} />
          </motion.div>
        </button>
      </div>

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

      {/* HERO */}
      <div className="pt-[110px] px-5 pb-10 border-b border-gray-100">        <h1 className="text-[3rem] font-black tracking-[-0.05em] leading-[0.95] mb-8">
          Free to start.<br />Upgrade anytime.
        </h1>
        <p className="text-[16px] text-gray-500 leading-relaxed">
          Your card is live the moment you sign up. No credit card needed.
        </p>
      </div>

      {/* BILLING TOGGLE */}
      <div className="px-5 pt-4 pb-0 flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all ${billing === "monthly" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}>
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}>
            Yearly
            <span className="text-[11px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div className="px-5 pt-2 pb-10 flex flex-col gap-5">
        {/* FREE */}
        {billing === "monthly" && (
        <div className="rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-5 bg-white">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] mb-1 text-gray-400">Free</p>
            <div className="flex items-end gap-1.5 mb-3">
              <p className="text-[3rem] font-black tracking-tight leading-none">$0</p>
              <p className="text-[13px] pb-1.5 text-gray-400">/forever</p>
            </div>
            <p className="text-[14px] text-gray-500 leading-relaxed">Get your card live today.</p>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="px-6 py-5 flex flex-col gap-3.5 bg-white">
            {freePlan.features.map(({ label, included }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${included ? "bg-black text-white" : "bg-gray-100 text-gray-300"}`}>
                  {included ? <Check /> : <Lock />}
                </div>
                <p className={`text-[14px] leading-tight ${included ? "text-gray-900" : "text-gray-300 line-through decoration-gray-200"}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 bg-white">
            <button onClick={() => router.push("/signup")}
              className="w-full py-4 rounded-2xl text-[15px] font-bold bg-black text-white hover:bg-gray-900 transition">
              Get started free →
            </button>
          </div>
        </div>
        )}

        {/* PRO */}
        {billing === "yearly" ? (
        <div className="rounded-[28px] border border-black shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="px-6 pt-6 pb-5 bg-black text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] mb-1 text-white/50">Pro</p>
                <div className="flex items-end gap-1.5">
                  <p className="text-[3rem] font-black tracking-tight leading-none text-white">$48</p>
                  <div className="pb-1.5">
                    <p className="text-[13px] text-white/40">/year</p>
                  </div>
                </div>
              </div>
              <span className="bg-white text-black text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
                Best value
              </span>
            </div>
            <p className="text-[14px] text-white/60 leading-relaxed">For people who network seriously.</p>
          </div>
          <div className="h-px bg-white/10" />
          <div className="px-6 py-5 flex flex-col gap-3.5 bg-[#0d0d0d]">
            {proPlan.features.map(({ label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <Check />
                </div>
                <p className="text-[14px] text-white leading-tight">{label}</p>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 bg-[#0d0d0d]">
            <button onClick={() => router.push("/signup")}
              className="w-full py-4 rounded-2xl text-[15px] font-bold bg-white text-black hover:bg-gray-100 transition">
              Start Pro →
            </button>
          </div>
        </div>
        ) : (
        <div className="rounded-[28px] border border-black shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="px-6 pt-6 pb-5 bg-black text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] mb-1 text-white/50">Pro</p>
                <div className="flex items-end gap-1.5">
                  <p className="text-[3rem] font-black tracking-tight leading-none text-white">
                    {billing === "yearly" ? "$48" : "$5"}
                  </p>
                  <div className="pb-1.5">
                    <p className="text-[13px] text-white/40">
                      {billing === "yearly" ? "/year" : "/per month"}
                    </p>
                    {billing === "yearly" && (
                      <p className="text-[11px] text-green-400 font-semibold">~$4/mo</p>
                    )}
                  </div>
                </div>
              </div>
              <span className="bg-white text-black text-[11px] font-black px-3 py-1.5 rounded-full tracking-wide">
                Most popular
              </span>
            </div>
            <p className="text-[14px] text-white/60 leading-relaxed">For people who network seriously.</p>
          </div>
          <div className="h-px bg-white/10" />
          <div className="px-6 py-5 flex flex-col gap-3.5 bg-[#0d0d0d]">
            {proPlan.features.map(({ label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <Check />
                </div>
                <p className="text-[14px] text-white leading-tight">{label}</p>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 bg-[#0d0d0d]">
            <button onClick={() => router.push("/signup")}
              className="w-full py-4 rounded-2xl text-[15px] font-bold bg-white text-black hover:bg-gray-100 transition">
              Start Pro →
            </button>
          </div>
        </div>
        )}

        {/* COMPANY */}
        {billing === "monthly" && <CompanyCard router={router} />}

      </div>

      {/* FAQ */}
      <div className="bg-[#fafaf9] px-6 py-12 border-t border-gray-100">
        <p className="text-[13px] font-semibold text-gray-500 mb-6 uppercase tracking-wide">Common questions</p>
        <div className="flex flex-col gap-4">
          {[
            { q: "Can I stay on the free plan forever?", a: "Yes. The free plan never expires. You get your Business profile and personal link with no time limit." },
            { q: "What happens to my profile if I downgrade?", a: "Your link stays live and your Business profile stays active. Additional profiles are saved but won't be switchable until you re-upgrade." },
            { q: "Is there a contract for Pro or Company?", a: "No. Both plans are month-to-month. Cancel any time from your account settings." },
            { q: "How does yearly billing work?", a: "Yearly Pro is billed as a single $48 payment — that's 2 months free compared to monthly. You can cancel before renewal from your account settings." },
            { q: "What does 'unlimited' Apple Wallet mean?", a: "You can regenerate and re-download your Wallet pass as many times as you want — any time you update your profile, you can get a fresh pass." },
            { q: "How does Company pricing work?", a: "Company starts at $5/seat. Every 5 seats drops the per-seat price by 10%, down to a floor of $3/seat. Use the calculator on the plan card to see your exact price." },
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
        <p className="text-[15px] text-gray-500 mb-8">Your identity, unified in one link.</p>
        <button onClick={() => router.push("/signup")}
          className="w-full bg-black text-white py-4 rounded-2xl text-[15px] font-bold flex items-center justify-between px-6">
          <span>Create your Taply card</span>
          <span>→</span>
        </button>
      </div>

    </div>
  )
}
