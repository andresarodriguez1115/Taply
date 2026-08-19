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
      setUser(userData?.user || null)
      setChecking(false)
    }
    checkAuth()
  }, [])

  const handleClaim = async () => {
    if (!user) {
      router.push(`/login?redirect=/activate?id=${deviceId}`)
      return
    }

    setClaiming(true)
    setError(null)

    const { data: activeProfile } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle()

    if (!activeProfile) {
      setError("You don't have an active profile yet. Create one first, then come back and tap your card again.")
      setClaiming(false)
      return
    }

    const { error: claimError } = await supabase
      .from("devices")
      .update({
        user_id: user.id,
        profile_id: activeProfile.id,
        claimed_at: new Date().toISOString(),
      })
      .eq("id", deviceId)
      .is("user_id", null)

    if (claimError) {
      setError("This card may have already been claimed. Refresh and try again.")
      setClaiming(false)
      return
    }

    router.push(`/${activeProfile.username}`)
  }

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-2">
        Activate your Taply {productType === "metal" ? "Metal" : ""} card
      </h1>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        {user
          ? "Link this card to your active profile so it works with a tap."
          : "Log in or create an account to link this card."}
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 max-w-xs">{error}</p>
      )}

      <button
        onClick={handleClaim}
        disabled={claiming}
        className="bg-black text-white font-semibold px-8 py-3.5 rounded-2xl text-sm disabled:opacity-60"
      >
        {claiming ? "Activating..." : user ? "Activate Card" : "Log in to Activate"}
      </button>
    </div>
  )
}