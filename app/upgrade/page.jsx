"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const proFeatures = [
  "Access to all modes (Business, Networking, University, Social)",
  "Up to 4 saved profiles",
  "Unlimited QR code generation",
  "Unlimited Apple Wallet passes",
]

export default function UpgradePage() {
  const router = useRouter()
  const [billing, setBilling] = useState("monthly")
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login")
      return
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: billing,
        userId: session.user.id,
        userEmail: session.user.email,
      }),
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      console.error("Checkout error:", data.error)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen px-4 pt-0 pb-16 max-w-md mx-auto bg-[#f7faff]">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/dashboard")}
        className="fixed top-5 left-5 z-50 bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition"
      >
        ← Back
      </button>

      <div className="pt-24 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Upgrade to Pro</h1>
        <p className="text-gray-500">All modes, more profiles, unlimited sharing.</p>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all ${billing === "monthly" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            Yearly
            <span className="text-[11px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* PRO CARD */}
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
                  <p className="text-[13px] text-white/40">{billing === "yearly" ? "/year" : "/per month"}</p>
                  {billing === "yearly" && <p className="text-[11px] text-green-400 font-semibold">~$4/mo</p>}
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
          {proFeatures.map((label) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                <Check />
              </div>
              <p className="text-[14px] text-white leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 bg-[#0d0d0d]">
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-[15px] font-bold bg-white text-black hover:bg-gray-100 transition disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Upgrade to Pro →"}
          </button>
        </div>
      </div>

      <p className="text-[12px] text-gray-400 text-center mt-4">
        Cancel any time from your account settings. No contract.
      </p>
    </div>
  )
}