"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MODES = [
  {
    id: "business",
    label: "Business",
desc: "Professional card with contact fields",
    best: "Best for professionals & sales",    color: "#2563eb",
    bg: "#eff6ff",
    preview: "Executive layout with photo, name, title, and contact info",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    mockup: (
      <div className="w-full h-full bg-white rounded-2xl p-3 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-blue-100" />
        <div className="w-20 h-2.5 bg-gray-200 rounded-full" />
        <div className="w-14 h-2 bg-gray-100 rounded-full" />
        <div className="w-full h-px bg-gray-100 my-1" />
        {[1,2,3].map(i => (
          <div key={i} className="w-full flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-50 flex-shrink-0" />
            <div className="flex-1 h-2 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "networking",
    label: "Networking",
    desc: "Clean profile with action buttons",
best: "Best for business fairs, recruiting & events",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    mockup: (
      <div className="w-full h-full bg-white rounded-2xl p-3 flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-purple-100" />
        <div className="w-20 h-2.5 bg-gray-200 rounded-full" />
        <div className="w-16 h-2 bg-purple-100 rounded-full" />
        <div className="flex gap-2 mt-1">
          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-purple-50" />)}
        </div>
        <div className="w-full h-8 bg-purple-50 rounded-xl" />
        <div className="w-full h-8 bg-gray-50 rounded-xl" />
      </div>
    ),
  },
  {
    id: "university",
    label: "University",
    desc: "Student & campus identity",
best: "Best for students, career fairs & campus recruiting",    color: "#059669",
    bg: "#ecfdf5",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    mockup: (
      <div className="w-full h-full bg-white rounded-2xl p-3 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-green-100" />
        <div className="w-20 h-2.5 bg-gray-200 rounded-full" />
        <div className="flex gap-3 mt-1">
          <div className="flex flex-col items-center gap-1"><div className="w-10 h-4 bg-green-50 rounded" /><div className="w-8 h-2 bg-gray-100 rounded" /></div>
          <div className="flex flex-col items-center gap-1"><div className="w-10 h-4 bg-green-50 rounded" /><div className="w-8 h-2 bg-gray-100 rounded" /></div>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full" />
        <div className="w-full h-2 bg-gray-100 rounded-full" />
        <div className="w-full h-8 bg-green-50 rounded-xl mt-1" />
      </div>
    ),
  },
  {
    id: "social",
    label: "Social",
    desc: "Creator & social-first layout",
    best: "Best for creators & influencers",
    color: "#ea580c",
    bg: "#fff7ed",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    mockup: (
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col">
        <div className="w-full h-16 bg-orange-100" />
        <div className="flex flex-col items-center gap-1.5 p-2 -mt-4">
          <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white" />
          <div className="w-16 h-2.5 bg-gray-200 rounded-full" />
          <div className="flex gap-1.5">
            {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-orange-50" />)}
          </div>
          <div className="w-full h-7 bg-gray-50 rounded-xl" />
          <div className="w-full h-7 bg-gray-50 rounded-xl" />
        </div>
      </div>
    ),
  },
];

export default function CreatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7faff] px-4 pt-8 pb-16 max-w-md mx-auto">

      {/* BACK */}
      <button onClick={() => router.push("/dashboard")}
        className="fixed top-5 left-5 z-50 bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition">
        ← Back
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1 mt-16">Choose a mode</h1>
      <p className="text-gray-500 mb-8">Pick the style that fits you best.</p>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">
        {MODES.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -4 }}
            onClick={() => router.push(`/builder?mode=${m.id}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 text-left flex flex-col"
          >
            {/* MOCKUP PREVIEW */}
            <div className="w-full h-40 p-3" style={{ background: m.bg }}>
              {m.mockup}
            </div>

            {/* LABEL */}
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
                  {m.icon}
                </div>
                <p className="font-semibold text-gray-900">{m.label}</p>
              </div>
              <p className="text-xs text-gray-400 leading-snug">{m.desc}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: m.color }}>{m.best}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
