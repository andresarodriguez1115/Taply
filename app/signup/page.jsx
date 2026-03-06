"use client"

import { useState } from "react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState("login")



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

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data?.user) {
      router.replace("/choose-username")
    }

    setLoading(false)
  }



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

      {/* LOGO */}
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-4xl font-bold">Taply</h1>
      </div>



      {/* LOGIN BUTTON */}
      <div className="p-6">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-black text-white py-4 rounded-xl text-lg"
        >
          Login
        </button>
      </div>



      {/* AUTH SHEET */}
      <AnimatePresence>
        {open && (

          <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-xl">

            {/* drag handle */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"/>


            <AnimatePresence mode="wait">


              {/* LOGIN FORM */}

              {mode === "login" && (

              <motion.div
  key="login"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
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
                      onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full border p-3 rounded-lg"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
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
                      onClick={()=>setMode("signup")}
                      className="w-full border p-3 rounded-lg"
                    >
                      Create Account
                    </button>

                    <button
                      type="button"
                      onClick={()=>setOpen(false)}
                      className="w-full text-gray-500"
                    >
                      Cancel
                    </button>

                  </form>

                </motion.div>
              )}



              {/* SIGNUP FORM */}

              {mode === "signup" && (

              <motion.div
  key="login"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
>

                  <h2 className="text-xl font-bold mb-4 text-center">
                    Create Account
                  </h2>

                  <form onSubmit={handleSignup} className="space-y-4">

                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border p-3 rounded-lg"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full border p-3 rounded-lg"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full border p-3 rounded-lg"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    />

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                      disabled={loading}
                      className="w-full bg-black text-white p-3 rounded-lg"
                    >
                      {loading ? "Loading..." : "Create Account"}
                    </button>

                    <button
                      type="button"
                      onClick={()=>setMode("login")}
                      className="w-full border p-3 rounded-lg"
                    >
                      Back to Login
                    </button>

                  </form>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        )}
      </AnimatePresence>

    </div>
  )
}