"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import UpgradeModal from "@/components/UpgradeModal";

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
    label: "Company",
desc: "Represent your company or brand in person",
best: "Best for reps & teams networking on behalf of a company",
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
    label: "Student",
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
  const [subscriptionTier, setSubscriptionTier] = useState("free");
  const [tierLoaded, setTierLoaded] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [unlockMode, setUnlockMode] = useState(null);
  const [unlockedModes, setUnlockedModes] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [profileCount, setProfileCount] = useState(0);

  const startUnlock = async (modeId) => {
    if (checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      const res = await fetch("/api/unlock-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ mode: modeId }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else { alert(json.error || "Something went wrong"); setCheckoutLoading(false); }
    } catch {
      alert("Something went wrong");
      setCheckoutLoading(false);
    }
  };

  const UNLOCK_PRICE = "$2.99";
  const atLimit = tierLoaded && subscriptionTier !== "pro" && profileCount >= 1 + unlockedModes.length;
  const PRO_PRICE = "$5.99";

  useEffect(() => {
    const getTier = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) { setTierLoaded(true); return; }

      const { data: accountData } = await supabase
        .from("accounts")
        .select("subscription_tier, unlocked_modes")
        .eq("user_id", userData.user.id)
        .maybeSingle();

      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userData.user.id);
      setProfileCount(count || 0);

      setSubscriptionTier(accountData?.subscription_tier || "free");
      setUnlockedModes(accountData?.unlocked_modes || []);
      setTierLoaded(true);
    };
    getTier();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7faff] px-4 pt-8 pb-16 max-w-md mx-auto">

      {/* BACK */}
      <button onClick={() => router.push("/dashboard")}
        className="fixed top-5 left-5 z-50 bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition">
        ← Back
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1 mt-16">Choose a mode</h1>
      <p className="text-gray-500 mb-2">
        {atLimit ? "All slots used. Unlock a mode for $2.99 to add another profile." : "Pick the style that fits you best."}
      </p>
      {tierLoaded && subscriptionTier !== "pro" ? (
        <button
          onClick={() => router.push("/upgrade")}
          className="text-[13px] font-semibold text-[#a07c22] mb-8"
        >
          Or unlock every mode with Pro: {PRO_PRICE}/mo →
        </button>
      ) : (
        <div className="mb-6" />
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">
        {MODES.map((m, i) => {
          if (!tierLoaded) {
            return (
              <div key={m.id} className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-100" />
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-200" />
                    <div className="h-4 w-20 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                  <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
                </div>
              </div>
            );
          }
          const locked = m.id !== "business" && tierLoaded && subscriptionTier !== "pro" && !unlockedModes.includes(m.id);
          const full = !locked && atLimit;

          return (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (!tierLoaded) return;
                if (locked) {
                  setUnlockMode(m);
                  return;
                }
                if (full) {
                  alert("All your profile slots are used. Unlock a new mode to add another profile.");
                  return;
                }
                router.push(`/builder?mode=${m.id}`);
              }}
              className={`rounded-3xl text-left flex flex-col ${
                locked
                  ? "p-[2px] bg-gradient-to-br from-[#f0d78c] via-[#c9a443] to-[#9a7623] shadow-[0_8px_24px_rgba(184,151,63,0.22)]"
                  : "bg-white shadow-sm border border-gray-100 overflow-hidden"
              }`}
            >
              <div className={`flex flex-col flex-1 bg-white overflow-hidden ${locked ? "rounded-[22px]" : ""} ${full ? "opacity-50" : ""}`}>
                {/* MOCKUP PREVIEW */}
                <div className="relative w-full h-40 p-3" style={{ background: m.bg }}>
                  <div className={locked ? "w-full h-full opacity-60" : "w-full h-full"}>
                    {m.mockup}
                  </div>
                  {locked && (
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[12px] font-bold bg-gradient-to-r from-[#d9b75a] to-[#b08a2e] text-white pl-2.5 pr-3 py-1 rounded-full shadow-md whitespace-nowrap">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      $2.99
                    </span>
                  )}
                </div>

                {/* LABEL */}
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
                      {m.icon}
                    </div>
                    <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                      {m.label}
              
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{m.desc}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: m.color }}>{m.best}</p>

                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {unlockMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUnlockMode(null)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl max-w-md mx-auto px-5 pt-3 pb-8"
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: unlockMode.bg }}>
                  {unlockMode.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[19px] font-bold text-gray-900 leading-tight">{unlockMode.label} mode</p>
                  <p className="text-[13px] text-gray-500">{unlockMode.desc}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  // TODO: preview function
                }}
                className="w-full flex items-center justify-center gap-2 text-[15px] font-semibold py-3 rounded-2xl mb-4 active:scale-[0.98] transition"
                style={{ background: unlockMode.bg, color: unlockMode.color }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview {unlockMode.label} mode
              </button>

              {/* OPTION 1: ONE-TIME UNLOCK */}
              <button
                onClick={() => startUnlock(unlockMode.id)}
                disabled={checkoutLoading}
                className="w-full text-left border border-gray-200 rounded-2xl p-4 mb-3 active:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-gray-900">Unlock {unlockMode.label}</p>
                  <p className="text-[17px] font-bold text-gray-900">{checkoutLoading ? "…" : UNLOCK_PRICE}</p>
                </div>
                <p className="text-[13px] text-gray-500 mt-0.5">One-time · Yours forever + 1 extra profile slot</p>
              </button>

              {/* OPTION 2: PRO */}
              <button
                onClick={() => router.push("/upgrade")}
                className="relative w-full text-left rounded-2xl p-[2px] bg-gradient-to-br from-[#f0d78c] via-[#c9a443] to-[#9a7623]"
              >
                <span className="absolute -top-2.5 right-4 text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full tracking-wide">
                  BEST VALUE
                </span>
                <div className="bg-white rounded-[14px] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold text-gray-900">Try Pro free for 14 days</p>
                    <p className="text-[17px] font-bold text-gray-900">
                      <span className="text-[12px] font-medium text-gray-500">then </span>{PRO_PRICE}<span className="text-[12px] font-medium text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {["All 4 modes, including " + unlockMode.label, "Apple Wallet pass", "QR code sharing", "Up to 4 profiles"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8973f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>

              <button onClick={() => setUnlockMode(null)} className="w-full text-center text-[14px] text-gray-400 font-medium mt-4">
                Not now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
       <UpgradeModal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Unlock all modes"
        description="Free plans include Business mode only. Upgrade to Pro to access Company, Student, and Social modes."
      />
    </div>
  );
}
