"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
import { ChevronLeft, Check, X, Eye, EyeOff, LogOut, Trash2, User, Mail, Lock, AtSign, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function Toast({ message, type = "success" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3 rounded-2xl shadow-xl text-[13px] font-semibold flex items-center gap-2 whitespace-nowrap"
      style={{ background: type === "error" ? "#ef4444" : type === "warn" ? "#f59e0b" : "#111", color: "#fff" }}
    >
      {type === "success" && <Check size={14} />}
      {type === "error" && <X size={14} />}
      {message}
    </motion.div>
  )
}

function SaveBar({ changed, saving, onSave, onCancel }) {
  if (!changed) return null
  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-1.5 bg-black text-white text-[13px] font-bold px-5 py-2.5 rounded-xl disabled:opacity-50 transition"
      >
        {saving
          ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : <Check size={13} />}
        Save
      </button>
      <button onClick={onCancel} className="text-[13px] text-gray-400 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition font-medium">
        Cancel
      </button>
    </div>
  )
}

function SettingRow({ label, value, icon: Icon, color, isOpen, onToggle, children, last, destructive }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors active:bg-gray-50 ${!last || isOpen ? "border-b border-gray-100" : ""}`}
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
          <Icon size={17} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[15px] font-semibold leading-tight ${destructive ? "text-red-500" : "text-gray-900"}`}>{label}</p>
          {value && <p className="text-[13px] text-gray-400 mt-0.5 truncate">{value}</p>}
        </div>
        <ChevronDown
          size={16}
          className="text-gray-300 shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pt-4 pb-5 bg-gray-50/60">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AccountPage() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [activePanel, setActivePanel] = useState(null)

  const [username, setUsername] = useState("")
  const [origUsername, setOrigUsername] = useState("")
  const [usernameChecking, setUsernameChecking] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [usernameSaving, setUsernameSaving] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [origFirst, setOrigFirst] = useState("")
  const [origLast, setOrigLast] = useState("")
  const [nameSaving, setNameSaving] = useState(false)

  const [email, setEmail] = useState("")
  const [origEmail, setOrigEmail] = useState("")
  const [emailSaving, setEmailSaving] = useState(false)

  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState("")

  const [deleteInput, setDeleteInput] = useState("")
  const [deleting, setDeleting] = useState(false)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace("/signup"); return }
      setUser(user)
      const meta = user.user_metadata || {}
      const fn = meta.first_name || ""
      const ln = meta.last_name || ""
      const un = meta.username || user.email?.split("@")[0] || ""
      setFirstName(fn); setOrigFirst(fn)
      setLastName(ln); setOrigLast(ln)
      setUsername(un); setOrigUsername(un)
      setEmail(user.email || ""); setOrigEmail(user.email || "")
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (username === origUsername || username.length < 3) { setUsernameAvailable(null); return }
    const t = setTimeout(async () => {
      setUsernameChecking(true)
      const { data } = await supabase.from("profiles").select("id").eq("username", username.toLowerCase()).neq("user_id", user?.id).maybeSingle()
      setUsernameAvailable(!data)
      setUsernameChecking(false)
    }, 500)
    return () => clearTimeout(t)
  }, [username, origUsername, user])

  const toggle = (panel) => setActivePanel(p => p === panel ? null : panel)

  const saveUsername = async () => {
    if (!usernameAvailable && username !== origUsername) { showToast("Username is taken", "error"); return }
    if (!/^[a-z0-9_]{3,20}$/.test(username.toLowerCase())) { showToast("3–20 chars, letters/numbers/underscores only", "error"); return }
    setUsernameSaving(true)
    const lower = username.toLowerCase()
    const { error: ae } = await supabase.auth.updateUser({ data: { username: lower } })
    if (ae) { showToast(ae.message, "error"); setUsernameSaving(false); return }
    const { error: pe } = await supabase.from("profiles").update({ username: lower }).eq("user_id", user.id)
    if (pe) { showToast(pe.message, "error"); setUsernameSaving(false); return }
    setOrigUsername(lower)
    setUsernameSaving(false)
    setActivePanel(null)
    showToast("Username updated!")
  }

  const saveName = async () => {
    setNameSaving(true)
    const { error } = await supabase.auth.updateUser({ data: { first_name: firstName, last_name: lastName } })
    if (error) { showToast(error.message, "error"); setNameSaving(false); return }
    setOrigFirst(firstName); setOrigLast(lastName)
    setNameSaving(false)
    setActivePanel(null)
    showToast("Name updated!")
  }

  const saveEmail = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Enter a valid email", "error"); return }
    setEmailSaving(true)
    const { error } = await supabase.auth.updateUser({ email })
    if (error) { showToast(error.message, "error"); setEmailSaving(false); return }
    setOrigEmail(email)
    setEmailSaving(false)
    setActivePanel(null)
    showToast("Check your inbox to confirm", "warn")
  }

  const savePassword = async () => {
    setPwError("")
    if (newPw.length < 8) { setPwError("At least 8 characters required"); return }
    if (newPw !== confirmPw) { setPwError("Passwords don't match"); return }
    setPwSaving(true)
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPw })
    if (signInErr) { setPwError("Current password is incorrect"); setPwSaving(false); return }
    const { error } = await supabase.auth.updateUser({ password: newPw })
    if (error) { setPwError(error.message); setPwSaving(false); return }
    setCurrentPw(""); setNewPw(""); setConfirmPw("")
    setPwSaving(false)
    setActivePanel(null)
    showToast("Password updated!")
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  const handleDelete = async () => {
    if (deleteInput !== origUsername) return
    setDeleting(true)
    await supabase.from("profiles").delete().eq("user_id", user.id)
    const { error } = await supabase.rpc("delete_user")
    if (error) await supabase.auth.signOut()
    router.replace("/")
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
      <div className="w-8 h-8 border-[3px] border-gray-200 border-t-black rounded-full animate-spin" />
    </div>
  )

  const initials = [firstName, lastName].filter(Boolean).map(n => n[0]).join("").toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || "Your Account"
  const pwChanged = currentPw.length > 0 || newPw.length > 0 || confirmPw.length > 0
  const pwStrength = Math.min(4, Math.floor(newPw.length / 3))

  const inputClass = "w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-black transition-colors placeholder:text-gray-300"

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-24">

      {/* HEADER */}
      <div className="bg-white px-5 pt-14 pb-6 border-b border-gray-100">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 mb-7 hover:text-black transition-colors"
        >
          <ChevronLeft size={16} /> Dashboard
        </button>

        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full bg-black flex items-center justify-center text-white text-[20px] font-black shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-[22px] font-black tracking-tight leading-tight">{displayName}</p>
            <p className="text-[13px] text-gray-400 font-medium mt-0.5">taply.now/{origUsername}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 flex flex-col gap-3">

        {/* PROFILE */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] px-1 mb-1">Profile</p>
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <SettingRow
            label="Username"
            value={`taply.now/${origUsername}`}
            icon={AtSign}
            color="#2563eb"
            isOpen={activePanel === "username"}
            onToggle={() => toggle("username")}
          >
            <div className="relative mb-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 font-mono pointer-events-none">taply.now/</span>
              <input
                autoFocus
                value={username}
                onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")); setUsernameAvailable(null) }}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-[96px] pr-10 py-3 text-[14px] font-mono font-bold outline-none focus:border-black transition-colors"
                placeholder="yourname"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {usernameChecking && <div className="w-3.5 h-3.5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />}
                {!usernameChecking && usernameAvailable === true && <Check size={14} className="text-emerald-500" />}
                {!usernameChecking && usernameAvailable === false && username !== origUsername && <X size={14} className="text-red-400" />}
              </div>
            </div>
            {usernameAvailable === false && username !== origUsername && <p className="text-[11px] text-red-400 mt-1">That username is taken.</p>}
            {usernameAvailable === true && <p className="text-[11px] text-emerald-500 mt-1">Available!</p>}
            <SaveBar changed={username !== origUsername} saving={usernameSaving} onSave={saveUsername} onCancel={() => { setUsername(origUsername); setActivePanel(null) }} />
          </SettingRow>

          <SettingRow
            label="Display name"
            value={displayName}
            icon={User}
            color="#7c3aed"
            isOpen={activePanel === "name"}
            onToggle={() => toggle("name")}
            last
          >
            <div className="flex gap-2 mb-1">
              <input autoFocus value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className={inputClass} />
              <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className={inputClass} />
            </div>
            <SaveBar changed={firstName !== origFirst || lastName !== origLast} saving={nameSaving} onSave={saveName} onCancel={() => { setFirstName(origFirst); setLastName(origLast); setActivePanel(null) }} />
          </SettingRow>
        </div>

        {/* ACCOUNT */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] px-1 mt-3 mb-1">Account</p>
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <SettingRow
            label="Email"
            value={origEmail}
            icon={Mail}
            color="#059669"
            isOpen={activePanel === "email"}
            onToggle={() => toggle("email")}
          >
            <input
              autoFocus type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass + " mb-1"}
              placeholder="you@example.com"
            />
            <p className="text-[11px] text-gray-400 mb-1">You'll need to confirm the new address before it takes effect.</p>
            <SaveBar changed={email !== origEmail} saving={emailSaving} onSave={saveEmail} onCancel={() => { setEmail(origEmail); setActivePanel(null) }} />
          </SettingRow>

          <SettingRow
            label="Password"
            value="Change your password"
            icon={Lock}
            color="#ea580c"
            isOpen={activePanel === "password"}
            onToggle={() => toggle("password")}
            last
          >
            <div className="flex flex-col gap-2 mb-1">
              {[
                { val: currentPw, set: setCurrentPw, show: showCurrent, toggle: () => setShowCurrent(v => !v), ph: "Current password" },
                { val: newPw, set: setNewPw, show: showNew, toggle: () => setShowNew(v => !v), ph: "New password" },
                { val: confirmPw, set: setConfirmPw, show: showConfirm, toggle: () => setShowConfirm(v => !v), ph: "Confirm new password" },
              ].map(({ val, set, show, toggle, ph }) => (
                <div key={ph} className="relative">
                  <input
                    type={show ? "text" : "password"} value={val}
                    onChange={e => { set(e.target.value); setPwError("") }} placeholder={ph}
                    className={inputClass + " pr-11"}
                  />
                  <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              ))}
              {newPw.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{
                      background: i <= pwStrength
                        ? (pwStrength <= 1 ? "#ef4444" : pwStrength <= 2 ? "#f59e0b" : pwStrength <= 3 ? "#3b82f6" : "#10b981")
                        : "#e5e7eb"
                    }} />
                  ))}
                  <p className="text-[10px] text-gray-400 shrink-0 w-10 text-right">
                    {newPw.length < 4 ? "Weak" : newPw.length < 7 ? "Fair" : newPw.length < 10 ? "Good" : "Strong"}
                  </p>
                </div>
              )}
              {pwError && <p className="text-[12px] text-red-400">{pwError}</p>}
            </div>
            <SaveBar changed={pwChanged} saving={pwSaving} onSave={savePassword} onCancel={() => { setCurrentPw(""); setNewPw(""); setConfirmPw(""); setPwError(""); setActivePanel(null) }} />
          </SettingRow>
        </div>

        {/* SESSION */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] px-1 mt-3 mb-1">Session</p>
        <button
          onClick={handleSignOut}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm w-full flex items-center gap-4 px-5 py-4 text-left transition-colors active:bg-gray-50"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-gray-100">
            <LogOut size={17} className="text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-gray-900">Sign out</p>
            <p className="text-[13px] text-gray-400 truncate mt-0.5">{user?.email}</p>
          </div>
        </button>

        {/* DANGER */}
        <p className="text-[11px] font-bold text-red-400 uppercase tracking-[0.18em] px-1 mt-3 mb-1">Danger zone</p>
        <div className="bg-white rounded-3xl overflow-hidden border border-red-100 shadow-sm">
          <SettingRow
            label="Delete account"
            value="Permanently remove your account"
            icon={Trash2}
            color="#ef4444"
            isOpen={activePanel === "delete"}
            onToggle={() => toggle("delete")}
            destructive
            last
          >
            <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
              This permanently deletes your account, all profiles, and your link at{" "}
              <span className="font-bold text-black">taply.now/{origUsername}</span>. There's no going back.
            </p>
            <p className="text-[12px] text-gray-500 mb-2">
              Type <span className="font-bold text-black">{origUsername}</span> to confirm:
            </p>
            <input
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder={origUsername}
              className="w-full bg-white border border-red-200 rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-red-400 transition-colors mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleteInput !== origUsername || deleting}
                className="flex-1 bg-red-500 text-white text-[13px] font-bold py-3 rounded-2xl disabled:opacity-30 flex items-center justify-center gap-1.5 transition"
              >
                {deleting
                  ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Trash2 size={13} />}
                Delete account
              </button>
              <button
                onClick={() => { setDeleteInput(""); setActivePanel(null) }}
                className="px-5 py-3 text-[13px] font-semibold text-gray-500 bg-gray-100 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </SettingRow>
        </div>

        <p className="text-center text-[11px] text-gray-300 pt-2 pb-4">Taply · v1.0</p>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  )
}
