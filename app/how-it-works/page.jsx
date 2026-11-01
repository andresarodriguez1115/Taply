"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Menu } from "lucide-react"

function RenderPlaceholder({ title, filename, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border-2 border-dashed border-blue-200 bg-[#eef3ff] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(37,99,235,0.16),transparent_42%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-3 h-11 w-11 rounded-2xl border border-blue-200 bg-white shadow-sm" />

        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
          Render placeholder
        </p>

        <p className="mt-2 text-[15px] font-black text-black">{title}</p>

        <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-gray-500">
          Later replace this box with:
          <br />
          <span className="font-bold text-gray-700">{filename}</span>
        </p>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafaf9] text-black">
      {/* NAV */}
      {/* NAV */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center pl-2 pr-6 h-[75px] bg-white ${menuOpen ? "" : "border-b border-gray-200"}`}>
        <button onClick={() => router.push("/")} className="flex items-center h-full">
          <img src="/taply-logo.svg" alt="Taply" className="h-14 object-contain" />
        </button>
        <button onClick={() => setMenuOpen(prev => !prev)} className="rounded-lg hover:bg-gray-100 transition">
          <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <Menu size={28} strokeWidth={2} />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-white z-40 overflow-y-auto"
            style={{ transformOrigin: "top" }}
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-col">
              {[
                { label: "How it works", href: "/how-it-works", newTab: true },
                { label: "Pricing", href: "/pricing", newTab: true },
                { label: "Cards", href: "/cards", newTab: true },
                { label: "Login", href: "/signup", newTab: true },
              ].map(({ label, href, newTab }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.15 }}
                  onClick={() => { setMenuOpen(false); newTab ? window.open(href, "_blank") : router.push(href) }}
                  className="w-full flex items-center justify-between border-b border-gray-100 text-gray-900 active:bg-gray-50 transition"
                  style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.02em", padding: "18px 24px" }}
                >
                  <span>{label}</span>
                  <span style={{ color: "#d1d5db" }}>›</span>
                </motion.button>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="px-6 pt-6">
                <button
                  onClick={() => { setMenuOpen(false); window.open("/signup", "_blank") }}
                  className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-between px-6 text-[1rem] font-bold"
                >
                  Create your Taply card <span>→</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="px-4 pb-12 pt-[116px]">
        <div className="mx-auto max-w-[420px]">
          <div className="rounded-[32px] border border-blue-100 bg-white px-6 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-black uppercase tracking-[0.16em] text-blue-600">
              How it works
            </p>

<h1 className="mt-5 text-[2.7rem] font-black leading-[0.98] tracking-[-0.06em]">
  Your card,
  <br />
  live in minutes.
</h1>

<p className="mt-5 text-[18px] leading-relaxed text-gray-500">
  Tap your Taply card, answer a few quick questions, and start sharing your profile.
</p>

            <div className="mt-8 flex items-center gap-3 text-[13px] font-bold text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              <span>5 simple steps</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* STEP 1 */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-[420px] overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
          <div className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[18px] font-black text-white">
                1
              </span>

              <p className="text-[12px] font-black uppercase tracking-[0.15em] text-blue-600">
                Get started
              </p>
            </div>

     <img
  src="/how-it-works-activate.png"
  alt="Taply card activating on a phone"
  className="aspect-[4/5] w-full rounded-[26px] object-cover"
/>

            <h2 className="mt-7 text-[2rem] font-black leading-none tracking-[-0.05em]">
              Activate your card
            </h2>

            <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
              Tap your new Taply card to start activation.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-[420px] overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
          <div className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[18px] font-black text-white">
                2
              </span>

              <p className="text-[12px] font-black uppercase tracking-[0.15em] text-blue-600">
                Make it yours
              </p>
            </div>

            {/* REPLACE THIS WITH STEP 2 RENDER */}
     <img
  src="/how-it-works-details.png"
  alt="Taply profile setup on a phone"
  className="aspect-[4/5] w-full rounded-[26px] object-cover"
/>

            <h2 className="mt-7 text-[2rem] font-black leading-none tracking-[-0.05em]">
              Add your details
            </h2>

            <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
               Answer a few quick questions. Taply uses them to build your first profile automatically.

            </p>
          </div>
        </div>
      </section>

      {/* STEP 3 */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-[420px] overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
          <div className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[18px] font-black text-white">
                3
              </span>

              <p className="text-[12px] font-black uppercase tracking-[0.15em] text-blue-600">
                Save your card
              </p>
            </div>

            {/* REPLACE THIS WITH STEP 3 RENDER */}
     <img
  src="/how-it-works-account.png"
  alt="Create a Taply account on a phone"
  className="aspect-[4/5] w-full rounded-[26px] object-cover"
/>

            <h2 className="mt-7 text-[2rem] font-black leading-none tracking-[-0.05em]">
              Create your account
            </h2>

            <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
                Sign up or log in to save your profile and connect it to your card.

            </p>
          </div>
        </div>
      </section>

      {/* STEP 4 */}
      <section className="px-4 pb-6">
        <div className="mx-auto max-w-[420px] overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
          <div className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[18px] font-black text-white">
                4
              </span>

              <p className="text-[12px] font-black uppercase tracking-[0.15em] text-blue-600">
                You&apos;re live
              </p>
            </div>

     <img
  src="/how-it-works-live.png"
  alt="Taply card activation complete on a phone"
  className="aspect-[4/5] w-full rounded-[26px] object-cover"
/>

            <h2 className="mt-7 text-[2rem] font-black leading-none tracking-[-0.05em]">
              Your card is live
            </h2>

            <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
              Your profile is ready to share. View your live card or manage it anytime from your dashboard.
            </p>
          </div>
        </div>
      </section>
{/* STEP 5 */}
<section className="px-4 pb-12">
  <div className="mx-auto max-w-[420px] overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
    <div className="p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[18px] font-black text-white">
          5
        </span>

        <p className="text-[12px] font-black uppercase tracking-[0.15em] text-blue-600">
          Make it yours
        </p>
      </div>

      <RenderPlaceholder
        title="Dashboard render"
        filename="/how-it-works-dashboard.png"
        className="aspect-[4/5]"
      />

      <h2 className="mt-7 text-[2rem] font-black leading-none tracking-[-0.05em]">
        Manage your dashboard
      </h2>

      <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
        Update your details, add links, customize your profile, and switch what your card shares anytime.
      </p>
    </div>
  </div>
</section>
      {/* FINAL CTA */}
      <section className="border-t border-[#eadfbe] bg-[#fffaf0] px-4 py-14">
        <div className="mx-auto max-w-[420px] rounded-[32px] border border-[#efd795] bg-white px-6 py-9 text-center shadow-[0_18px_60px_rgba(154,104,0,0.08)]">
          <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#b68a20]">
            Ready to start?
          </p>

          <h2 className="mt-4 text-[2.35rem] font-black leading-[1.02] tracking-[-0.055em]">
            Your card is ready when you are.
          </h2>

          <p className="mt-5 text-[16px] leading-relaxed text-gray-500">
            Create your Taply profile, connect your card, and start sharing.
          </p>

          <Link
            href="/shop"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 text-[16px] font-black text-white transition hover:scale-[1.01] active:scale-[0.98]"
          >
            Get your Taply card <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-10 text-center">
        <img
          src="/taply-logo-white.svg"
          alt="Taply"
          className="mx-auto h-10 w-auto object-contain"
        />

        <p className="mt-5 text-[13px] text-white/50">
          Your identity, one tap away.
        </p>
      </footer>
    </main>
  )
}