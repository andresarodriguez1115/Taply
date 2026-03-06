"use client"

import { useState } from "react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      {/* CENTER LOGO */}
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl font-bold">Taply</h1>
      </div>

      {/* BOTTOM LOGIN BUTTON */}
      <div className="p-6 pb-20">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-black text-white py-4 rounded-xl text-lg"
        >
          Login
        </button>
      </div>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-xl"
          >

            <h2 className="text-xl font-bold mb-4 text-center">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">

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
                disabled={loading}
                className="w-full bg-black text-white p-3 rounded-lg"
              >
                {loading ? "Loading..." : "Login"}
              </button>

        <button
  type="button"
  onClick={() => {
    setOpen(false)
    router.push("/signup")
  }}
  className="w-full border p-3 rounded-lg"
>
  Create Account
</button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-gray-500 mt-2"
              >
                Cancel
              </button>

            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}