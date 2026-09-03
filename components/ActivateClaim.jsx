"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"

export default function ActivateClaim({ deviceId, productType }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)
  const [activeProfile, setActiveProfile] = useState(null)
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        router.replace(`/signup?redirect=/activate?id=${deviceId}`)
        return
      }
      setUser(userData.user)

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", userData.user.id)
        .eq("is_active", true)
        .maybeSingle()

      setActiveProfile(profile)
      setChecking(false)
    }
    checkAuth()
  }, [])

  const handleClaim = async () => {
    if (!user) {
      router.push(`/signup?redirect=/activate?id=${deviceId}`)
      return
    }

    setClaiming(true)
    setError(null)

    const { error: claimError } = await supabase
      .from("devices")
      .update({
        user_id: user.id,
        claimed_at: new Date().toISOString(),
      })
      .eq("id", deviceId)
      .is("user_id", null)

    if (claimError) {
      setError("This card may have already been claimed. Refresh and try again.")
      setClaiming(false)
      return
    }

    if (activeProfile?.username) {
      router.push(`/${activeProfile.username}`)
    } else {
      router.push("/dashboard")
    }
  }

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fafaf9]">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="/taply-logo.svg" className="h-10 object-contain" />
        </div>
        <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      </div>

      {/* CARD VISUAL */}
      <div className="flex flex-col items-center pt-10 px-6 relative">
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-transparent blur-2xl opacity-70" />
        </div>

        <span className="relative z-10 text-xs font-bold text-blue-600 bg-white px-3 py-1.5 rounded-full mb-6 shadow-sm">
          NEW CARD
        </span>

        <div className="relative z-10 w-52 h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-xl flex items-center justify-center gap-2 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5.5" />
            <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.5" stroke="none" />
          </svg>
          <span className="text-white font-bold text-lg opacity-70">taply</span>
        </div>

        <span className="relative z-10 flex items-center gap-1.5 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Card detected
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-6 pb-10 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          Activate your Taply {productType === "metal" ? "Metal" : ""} card
        </h1>
        <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
          Connect this card to your active profile and start sharing with a tap.
        </p>

        {activeProfile?.username && (
          <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm flex items-center gap-3">
            <div className="flex-1 text-left">
              <p className="text-[11px] font-semibold text-gray-400 tracking-wide uppercase mb-2">
                Active profile
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Personal Profile</p>
                  <p className="text-gray-400 text-sm">taply.now/{activeProfile.username}</p>
                </div>
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        )}

        {!activeProfile?.username && (
          <div className="w-full max-w-sm bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-left">
            <p className="text-amber-700 text-sm font-medium">No active profile found</p>
            <p className="text-amber-600 text-xs mt-1">
              Create a profile first, then come back and activate this card.
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4 max-w-xs bg-red-50 px-4 py-2 rounded-xl">{error}</p>
        )}

        <button
          onClick={handleClaim}
          disabled={claiming || !activeProfile?.username}
          className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-2xl text-base shadow-md active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {claiming ? "Activating..." : "Activate Card"}
          {!claiming && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>

        <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure activation · Takes less than a minute
        </p>

        <button className="text-blue-600 text-sm font-medium mt-6">
          Need help activating?
        </button>
      </div>
    </div>
  )
}