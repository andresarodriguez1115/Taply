"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"

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

  return (
    <main className="min-h-screen overflow-hidden bg-[#fafaf9] text-black">
      {/* NAV */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[76px] max-w-[520px] items-center justify-between px-5">
          <Link href="/" className="flex items-center">
            <img
              src="/taply-logo.svg"
              alt="Taply"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 transition hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={29} /> : <Menu size={29} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-4">
            <div className="mx-auto flex max-w-[420px] flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-bold hover:bg-gray-50"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-bold hover:bg-gray-50"
              >
                Shop cards
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-black px-4 py-3 text-center font-black text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="px-4 pb-12 pt-[116px]">
        <div className="mx-auto max-w-[420px]">
          <div className="rounded-[32px] border border-blue-100 bg-white px-6 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-black uppercase tracking-[0.16em] text-blue-600">
              How it works
            </p>

            <h1 className="mt-5 text-[2.7rem] font-black leading-[0.98] tracking-[-0.06em]">
              One card.
              <br />
              Every connection.
            </h1>

          <p className="mt-5 text-[18px] leading-relaxed text-gray-500">
  Activate your card, add your details, and your profile is ready to share in minutes.
</p>

            <div className="mt-8 flex items-center gap-3 text-[13px] font-bold text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              <span>4 simple steps</span>
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
  className="aspect-[4/3] w-full rounded-[26px] object-cover"
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
      <section className="px-4 pb-12">
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

            {/* REPLACE THIS WITH STEP 4 RENDER */}
            <RenderPlaceholder
              title="You're live render"
              filename="/how-it-works-live.png"
              className="aspect-[4/5]"
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