"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"

export default function ActivateClaim({ deviceId, productType }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)
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

    const { data: activeProfile } = await supabase
      .from("profiles")
      .select("username")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle()

    if (activeProfile?.username) {
      router.push(`/${activeProfile.username}`)
    } else {
      router.push("/dashboard")
    }
  }

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[#fafaf9]">
      <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 shadow-sm">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
        Activate your Taply {productType === "metal" ? "Metal" : ""} card
      </h1>
      <p className="text-gray-500 text-sm mb-1 max-w-xs leading-relaxed">
        Link this card to your active profile so it works with a tap.
      </p>
      <p className="text-gray-400 text-xs mb-8 max-w-xs leading-relaxed">
        You'll need an existing Taply account with a profile already set up before activating.
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 max-w-xs bg-red-50 px-4 py-2 rounded-xl">{error}</p>
      )}

      <button
        onClick={handleClaim}
        disabled={claiming}
        className="w-full max-w-xs bg-black text-white font-semibold px-8 py-3.5 rounded-2xl text-sm disabled:opacity-60 shadow-sm active:scale-[0.98] transition-transform"
      >
        {claiming ? "Activating..." : "Activate Card"}
      </button>
    </div>
  )
}