"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import supabase from "@/lib/supabase"

const STORAGE_KEY = "taply_onboarding"
const STEPS = ["intro", "name", "title", "contact", "link", "account"]

const DEFAULT_FIELD_VALUES = {
  phone: "", email: "", linkedin: "", location: "", instagram: "", website: "", bio: "",
  social_icons: {}, social_links: [], uni_bio: "", uni_gpa: "", uni_grad_year: "",
  uni_projects: [], buttons: [],
}

const inputClass = "w-full border border-gray-200 bg-white rounded-2xl px-4 py-4 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
const primaryBtn = "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-2xl text-base shadow-md active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"

const cleanUsername = (v) => (v || "").toLowerCase().replace(/[^a-z0-9]/g, "")

function CardVisual() {
  return (
    <div className="flex flex-col items-center pt-6 relative">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-transparent blur-2xl opacity-70" />
      </div>
      <span className="relative z-10 text-xs font-bold text-blue-600 bg-white px-3 py-1.5 rounded-full mb-6 shadow-sm">NEW CARD</span>
      <div className="relative z-10 w-52 h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-xl flex items-center justify-center gap-2 mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.5" stroke="none" />
        </svg>
        <span className="text-white font-bold text-lg opacity-70">taply</span>
      </div>
      <span className="relative z-10 flex items-center gap-1.5 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Card detected
      </span>
    </div>
  )
}

function Spinner({ text }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  )
}

export default function ActivateClaim({ deviceId, productType }) {
  const [view, setView] = useState("loading") // loading | wizard | claim | finishing | done | error | checkEmail
  const [step, setStep] = useState(0)
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [answers, setAnswers] = useState({ firstName: "", lastName: "", title: "", phone: "", email: "", username: "" })
  const [authMode, setAuthMode] = useState("signup")
  const [authEmail, setAuthEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const [liveUsername, setLiveUsername] = useState(null)
  const [liveProfile, setLiveProfile] = useState(null)

  const set = (k, v) => setAnswers((a) => ({ ...a, [k]: v }))

  const persist = (data) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, deviceId })) } catch {}
  }

  const loadProfiles = async (uid) => {
    const { data } = await supabase
      .from("profiles")
      .select("id, username, is_active, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: true })
    return data || []
  }

  // Create profile (if needed), set active, claim card
  const finalize = async (u, a, existing) => {
    setView("finishing")
    setError(null)
    try {
      const meta = u.user_metadata || {}
      let uname = cleanUsername(meta.username || a.username || meta.preferred_username || u.email?.split("@")[0])

      if (!meta.username && uname) {
        await supabase.auth.updateUser({
          data: {
            username: uname,
            first_name: meta.first_name || a.firstName || "",
            last_name: meta.last_name || a.lastName || "",
          },
        })
      }

      if (existing.length === 0) {
        const fullName = `${a.firstName || meta.first_name || ""} ${a.lastName || meta.last_name || ""}`.trim()
        const { error: insertError } = await supabase.from("profiles").insert({
          user_id: u.id,
          is_active: true,
          username: uname,
          name: fullName || "Your Name",
          title: a.title || "",
          mode: "business",
          layout: "executive",
          fields: { phone: !!a.phone, email: !!a.email, linkedin: false, instagram: false, website: false, bio: false },
          field_values: { ...DEFAULT_FIELD_VALUES, phone: a.phone || "", email: a.email || "" },
          bg_color: "#f3f4f6",
        })
        if (insertError) throw insertError
      } else {
        const active = existing.find((p) => p.is_active)
        if (active?.username) uname = active.username
        if (!active) {
          await supabase.from("profiles").update({ is_active: true }).eq("id", existing[0].id).eq("user_id", u.id)
          if (existing[0].username) uname = existing[0].username
        }
      }

      const { error: claimError } = await supabase
        .from("devices")
        .update({ user_id: u.id, claimed_at: new Date().toISOString() })
        .eq("id", deviceId)
        .is("user_id", null)
      if (claimError) throw new Error("This card may have already been claimed. Refresh and try again.")

      try {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem("pending_card_id")
      } catch {}

      const { data: live } = await supabase
        .from("profiles")
        .select("name, title, avatar_url, field_values, username")
        .eq("user_id", u.id)
        .eq("is_active", true)
        .maybeSingle()

      setLiveProfile(live)
      setLiveUsername(live?.username || uname)
      setView("done")
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong. Please try again.")
      setView("error")
    }
  }

  // On load: restore answers, check login, decide which screen to show
  useEffect(() => {
    const init = async () => {
      let saved = null
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed.deviceId === deviceId) saved = parsed
        }
      } catch {}
      if (saved) setAnswers((a) => ({ ...a, ...saved }))

      const { data } = await supabase.auth.getUser()
      const u = data?.user
      if (!u) {
        setView("wizard")
        return
      }
      setUser(u)
      const existing = await loadProfiles(u.id)
      setProfiles(existing)

      // Came back from Google/Apple/email confirmation → finish automatically
      if (saved?.started) {
        await finalize(u, saved, existing)
        return
      }

      if (existing.length > 0) {
        setView("claim")
        return
      }

      // Logged in but no profiles yet → short wizard
      setAnswers((a) => ({
        ...a,
        email: a.email || u.email || "",
        firstName: a.firstName || u.user_metadata?.first_name || "",
        lastName: a.lastName || u.user_metadata?.last_name || "",
      }))
      setView("wizard")
    }
    init()
  }, [])

  // Save answers as they type
  useEffect(() => {
    if (view === "wizard") persist(answers)
  }, [answers, view])

  const totalSteps = user ? 3 : 5

  const goNext = async (e) => {
    e?.preventDefault()
    setError(null)
    const current = STEPS[step]

    if (current === "name" && !answers.firstName.trim()) {
      setError("Please enter your first name.")
      return
    }

    if (current === "contact") {
      if (answers.email && !/^\S+@\S+\.\S+$/.test(answers.email)) {
        setError("That email doesn't look right.")
        return
      }
      if (user) {
        await finalize(user, answers, [])
        return
      }
      if (!answers.username) set("username", cleanUsername(answers.firstName + answers.lastName))
    }

    if (current === "link") {
      const u = cleanUsername(answers.username)
      if (u.length < 3) {
        setError("Your link needs at least 3 characters.")
        return
      }
      setBusy(true)
      const { data: taken } = await supabase.from("profiles").select("id").eq("username", u).limit(1)
      setBusy(false)
      if (taken?.length) {
        setError("That link is taken. Try another one.")
        return
      }
      set("username", u)
      setAuthEmail(answers.email)
    }

    setStep((s) => s + 1)
  }

  const goBack = () => {
    setError(null)
    if (STEPS[step] === "account" && authMode === "login" && !answers.firstName) {
      setStep(0)
      return
    }
    setStep((s) => Math.max(0, s - 1))
  }

  const handleOAuth = async (provider) => {
    persist({ ...answers, started: true })
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/activate?id=${deviceId}` },
    })
  }

  const handleEmailAuth = async (e) => {
    e?.preventDefault()
    setError(null)
    if (!authEmail || !password) {
      setError("Enter your email and password.")
      return
    }
    setBusy(true)
    const pending = { ...answers, started: true }
    persist(pending)

    if (authMode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: authEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/activate?id=${deviceId}`,
          data: {
            first_name: answers.firstName,
            last_name: answers.lastName,
            username: cleanUsername(answers.username),
          },
        },
      })
      setBusy(false)
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      if (!data.session) {
        setView("checkEmail")
        return
      }
      setView("finishing")
      window.location.reload()
      return
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email: authEmail, password })
    setBusy(false)
    if (loginError) {
      setError(loginError.message)
      return
    }
    setView("finishing")
    window.location.reload()
  }

  const retry = async () => {
    if (!user) {
      setView("wizard")
      return
    }
    const existing = await loadProfiles(user.id)
    await finalize(user, answers, existing)
  }

  const ErrorText = () =>
    error ? <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl mt-4">{error}</p> : null

  const Question = ({ label, title, sub, children, nextLabel = "Continue", optional }) => (
    <form onSubmit={goNext} className="flex-1 flex flex-col pt-8">
      <p className="text-[12px] font-bold text-blue-600 uppercase tracking-wider mb-2">{label}</p>
      <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight mb-2">{title}</h1>
      {sub && <p className="text-gray-500 text-[15px] leading-relaxed mb-6">{sub}</p>}
      <div className="space-y-3">{children}</div>
      <ErrorText />
      <div className="flex-1 min-h-8" />
      <button type="submit" disabled={busy} className={primaryBtn}>
        {busy ? "Checking..." : nextLabel}
      </button>
      {optional && (
        <button type="button" onClick={() => goNext()} className="text-gray-400 text-sm font-medium mt-4">
          Skip for now
        </button>
      )}
    </form>
  )

  const renderWizard = () => {
    const current = STEPS[step]

    if (current === "intro") {
      return (
        <div className="flex-1 flex flex-col">
          <CardVisual />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight text-center">
            Activate your Taply {productType === "metal" ? "Metal " : ""}card
          </h1>
          <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed text-center">
            Answer a few quick questions and your card will be live in about a minute.
          </p>
          <div className="flex-1" />
          <button onClick={() => setStep(1)} className={primaryBtn}>
            Get started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          {!user && (
            <button
              onClick={() => { setAuthMode("login"); setStep(STEPS.indexOf("account")) }}
              className="text-blue-600 text-sm font-medium mt-5"
            >
              I already have an account
            </button>
          )}
          <p className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mt-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure activation · Free to start
          </p>
        </div>
      )
    }

    if (current === "name") {
      return Question({
        label: `Step 1 of ${totalSteps}`,
        title: "What's your name?",
        sub: "This is how it'll appear on your card.",
        children: (
          <>
            <input autoFocus className={inputClass} placeholder="First name" value={answers.firstName} onChange={(e) => set("firstName", e.target.value)} />
            <input className={inputClass} placeholder="Last name" value={answers.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </>
        ),
      })
    }

    if (current === "title") {
      return Question({
        label: `Step 2 of ${totalSteps}`,
        title: "What do you do?",
        sub: "Your job title or position.",
        optional: true,
        children: (
          <input autoFocus className={inputClass} placeholder="e.g. Marketing Director" value={answers.title} onChange={(e) => set("title", e.target.value)} />
        ),
      })
    }

    if (current === "contact") {
      return Question({
        label: `Step 3 of ${totalSteps}`,
        title: "How can people reach you?",
        sub: "These show as tap-to-call and tap-to-email buttons.",
        nextLabel: user ? "Activate my card" : "Continue",
        optional: true,
        children: (
          <>
            <input type="tel" className={inputClass} placeholder="Phone number" value={answers.phone} onChange={(e) => set("phone", e.target.value)} />
            <input type="email" className={inputClass} placeholder="Email address" value={answers.email} onChange={(e) => set("email", e.target.value)} />
          </>
        ),
      })
    }

    if (current === "link") {
      return Question({
        label: `Step 4 of ${totalSteps}`,
        title: "Pick your link",
        sub: "Your card will always open this page. Letters and numbers only.",
        children: (
          <div className="flex items-center border border-gray-200 bg-white rounded-2xl px-4 focus-within:ring-2 focus-within:ring-blue-500/30">
            <span className="text-gray-400 text-base">taply.now/</span>
            <input
              autoFocus
              className="flex-1 py-4 text-base text-gray-900 bg-transparent focus:outline-none"
              placeholder="yourname"
              value={answers.username}
              onChange={(e) => set("username", cleanUsername(e.target.value))}
            />
          </div>
        ),
      })
    }

    if (current === "account") {
      const isLogin = authMode === "login"
      return (
        <div className="flex-1 flex flex-col pt-8">
          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-wider mb-2">
            {isLogin ? "Welcome back" : `Step 5 of ${totalSteps}`}
          </p>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
            {isLogin ? "Log in to link your card" : "Last step: save your card"}
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
            {isLogin ? "We'll connect this card to your active profile." : "Create your free account so you can edit your card anytime."}
          </p>

          <div className="space-y-3">
            <button onClick={() => handleOAuth("google")} className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 flex items-center justify-center gap-3 font-medium text-gray-900">
              <img src="/google.png" className="w-5 h-5" />Continue with Google
            </button>
            <button onClick={() => handleOAuth("apple")} className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 flex items-center justify-center gap-3 font-medium text-gray-900">
              <img src="/apple.svg" className="w-4 h-5" />Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            <input type="email" className={inputClass} placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
            <input type="password" className={inputClass} placeholder={isLogin ? "Password" : "Create a password (6+ characters)"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <ErrorText />
            <button type="submit" disabled={busy} className={primaryBtn}>
              {busy ? "Please wait..." : isLogin ? "Log in & activate" : "Create account & activate"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {isLogin ? "New to Taply? " : "Already have an account? "}
            <button
              onClick={() => {
                setError(null)
                if (isLogin && !answers.firstName) { setAuthMode("signup"); setStep(1); return }
                setAuthMode(isLogin ? "signup" : "login")
              }}
              className="text-blue-600 font-medium"
            >
              {isLogin ? "Create your card" : "Log in"}
            </button>
          </p>
        </div>
      )
    }
    return null
  }

  const renderContent = () => {
    if (view === "loading") return <Spinner text="Loading..." />
    if (view === "finishing") return <Spinner text="Setting up your card..." />

    if (view === "wizard") return renderWizard()

    if (view === "claim") {
      const active = profiles.find((p) => p.is_active) || profiles[0]
      return (
        <div className="flex-1 flex flex-col">
          <CardVisual />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight text-center">Activate your card</h1>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed text-center">
            This card will open your active profile.
          </p>
          {active?.username && (
            <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Active profile</p>
                <p className="font-semibold text-gray-900 text-sm">taply.now/{active.username}</p>
              </div>
            </div>
          )}
          <div className="flex-1 min-h-8" />
          <button onClick={() => finalize(user, answers, profiles)} className={primaryBtn}>Activate card</button>
        </div>
      )
    }

    if (view === "checkEmail") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            We sent a confirmation link to <span className="font-semibold text-gray-700">{authEmail}</span>. Open it on this phone and your card will finish activating.
          </p>
        </div>
      )
    }

    if (view === "error") {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-500 text-sm max-w-xs mb-8">{error}</p>
          <button onClick={retry} className={primaryBtn}>Try again</button>
        </div>
      )
    }

    if (view === "done") {
      const p = liveProfile || {}
      const fv = p.field_values || {}
      const displayName = p.name || `${answers.firstName} ${answers.lastName}`.trim() || "Your Name"
      const displayTitle = p.title ?? answers.title
      const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
      const rows = [
        fv.phone?.trim() && { icon: "phone", text: fv.phone },
        fv.email?.trim() && { icon: "mail", text: fv.email },
        { icon: "link", text: `taply.now/${liveUsername}` },
      ].filter(Boolean)

      const RowIcon = ({ type }) => {
        if (type === "phone") return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48C2 2.41 2.9 1.68 4 1.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        )
        if (type === "mail") return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
        )
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        )
      }

      return (
        <div className="flex-1 flex flex-col items-center text-center pt-10">
          {/* CHECK */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mb-5 shadow-[0_12px_35px_rgba(37,99,235,0.35)]"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          {/* PILL */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[11px] font-bold tracking-widest text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full mb-4"
          >
            CARD ACTIVATED
          </motion.span>

          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Your card is live!</h1>
          <p className="text-gray-500 text-[15px] mb-7">Your profile is ready to share.</p>

          {/* PREVIEW CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] text-left"
          >
            <div className="absolute -right-12 -bottom-14 w-52 h-52 rounded-full bg-gradient-to-tr from-blue-600/50 via-purple-600/40 to-transparent blur-2xl pointer-events-none" />
            <div className="relative flex items-center gap-4">
              {p.avatar_url ? (
                <img src={p.avatar_url} className="w-16 h-16 rounded-full object-cover border-2 border-white/15 flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/15 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {initials}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white font-semibold text-[17px] leading-tight truncate">{displayName}</p>
                {displayTitle && <p className="text-white/60 text-sm mt-0.5 truncate">{displayTitle}</p>}
              </div>
            </div>
            <div className="relative mt-4 space-y-2">
              {rows.map((r) => (
                <div key={r.icon} className="flex items-center gap-2.5 text-white/80 text-[13px]">
                  <span className="text-white/50 flex-shrink-0"><RowIcon type={r.icon} /></span>
                  <span className="truncate">{r.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 min-h-8" />

          <a href={`/${liveUsername}`} target="_blank" rel="noopener noreferrer" className={primaryBtn}>View live card</a>
          <a href="/dashboard" className="w-full text-center py-4 mt-3 rounded-2xl border border-gray-200 bg-white font-semibold text-gray-800">
            Manage dashboard
          </a>
        </div>
      )
    }
        return null
  }

  const showBack = view === "wizard" && step > 0
  const showProgress = view === "wizard" && step > 0 && STEPS[step] !== "account"

  return (
    <div className="min-h-[100dvh] bg-[#fafaf9] flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="w-9">
          {showBack && (
            <button onClick={goBack} className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          )}
        </div>
        <img src="/taply-logo.svg" className="h-10 object-contain" />
        <div className="w-9" />
      </div>

      {/* PROGRESS */}
      {showProgress && (
        <div className="px-6">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* BODY */}
      <div className="flex-1 flex flex-col px-6 pb-10 max-w-md w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}