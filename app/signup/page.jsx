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
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [username, setUsername] = useState("")


  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)
    localStorage.removeItem("has_chosen")

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
    router.replace("/home")
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
  options: {
    data: {
      first_name: firstName,
      last_name: lastName,
      username: username.toLowerCase(),
    },
  },
});
console.log("SIGNUP DATA:", data);
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
const userId = data?.user?.id;
await supabase.auth.updateUser({
  data: {
    first_name: firstName,
    last_name: lastName,
    username: username.toLowerCase(),
  },
});
if (!userId) {
  setError("Signup worked but user not returned. Try logging in.");
  setLoading(false);
  return;
}



router.replace("/dashboard");
    setLoading(false)
  }



return (
  <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

      {/* LOGO */}
      <div className="flex flex-col items-center mb-6">
        <img
  src="/taply-logo.svg"
  className="h-14 mb-4 object-contain contrast-125 saturate-125"
/>
        <h1 className="text-xl font-semibold">
          {mode === "login" ? "Log in to Taply" : "Create your account"}
        </h1>
      </div>

      {/* LOGIN */}
      {mode === "login" && (
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Loading..." : "Continue"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={()=>setMode("signup")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>

        </form>
      )}

      {/* SIGNUP */}
      {mode === "signup" && (
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-lg"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Loading..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={()=>setMode("login")}
              className="text-blue-600 cursor-pointer"
            >
              Log in
            </span>
          </p>

        </form>
      )}

      {/* DIVIDER */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-[1px] bg-gray-200" />
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-[1px] bg-gray-200" />
      </div>

      {/* SOCIAL */}
      <div className="space-y-3">
<button
  onClick={async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
redirectTo: `${window.location.origin}/home`,
      },
    })
  }}
  className="w-full border border-gray-200 rounded-lg py-3 px-4 hover:bg-gray-50 flex items-center gap-3"
>
  <div className="w-5 h-5 flex items-center justify-center">
  <img src="/google.png" className="w-5 h-5" />
</div>
  <span className="text-[15px] font-medium text-gray-900">Continue with Google</span>
</button>
     
       
  <button
  onClick={async () => {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
redirectTo: `${window.location.origin}/home`,
      },
    })
  }}
  className="w-full border border-gray-200 rounded-lg py-3 px-4 hover:bg-gray-50 flex items-center gap-3"
>
  <div className="w-5 h-5 flex items-center justify-center">
  <img src="/apple.svg" className="w-4 h-5 mt-[1px]" />
</div>
  <span className="text-[15px] font-medium text-gray-900">Continue with Apple</span>
</button>
      </div>

    </div>
  </div>
)}