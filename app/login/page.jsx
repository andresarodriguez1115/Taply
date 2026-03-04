"use client"

import { useState } from "react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
   router.replace("/mockup")
  }

const handleSignup = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError(null)

  // 🚨 Make sure old session is cleared
  await supabase.auth.signOut()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  // 🚨 If email confirmation is OFF
if (data?.user) {
 router.replace("/choose-username")
}

  setLoading(false)
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Taply Login</h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full border p-3 rounded-lg"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}