"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { QrCode, Link, Wallet, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import DashboardTutorial from "@/components/DashboardTutorial";

export default function Dashboard() {
const [userName, setUserName] = useState("");
const [username, setUsername] = useState("");
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(true);
const [lastCount, setLastCount] = useState(3);
const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);
const [ready, setReady] = useState(false);
const [mounted, setMounted] = useState(false);
const [qrModal, setQrModal] = useState(null);
const [qrOpen, setQrOpen] = useState(false);
const [stats, setStats] = useState({ views: 0, taps: 0, saves: 0, saveRate: 0 });
const [walletCustomizerOpen, setWalletCustomizerOpen] = useState(false);
const [walletBgColor, setWalletBgColor] = useState("rgb(0,0,0)");
const [walletLogoUrl, setWalletLogoUrl] = useState("/taply-logo.svg");
const [walletTextColor, setWalletTextColor] = useState("rgb(255,255,255)");
const [showTutorial, setShowTutorial] = useState(false);
const handleShowQR = async (profileUsername) => {
  const url = `https://taply.now/${profileUsername}`;
  const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });
  setQrModal(dataUrl);
  setQrOpen(true);
};
const handleSetActive = async (id) => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return;

  // turn all OFF
  await supabase
    .from("profiles")
    .update({ is_active: false })
    .eq("user_id", userId);

  // turn selected ON
await supabase
  .from("profiles")
  .update({ is_active: true })
  .eq("id", id)
  .eq("user_id", userId);

  // update UI
  setProfiles((prev) =>
    prev.map((p) => ({
      ...p,
      is_active: p.id === id,
    }))
  );
};

const handleDelete = async (id) => {
  const confirmDelete = confirm("Delete this profile?");
  if (!confirmDelete) return;
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Error deleting profile");
  } else {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  }
};
useEffect(() => {
  setMounted(true);
}, []);
  useEffect(() => {
    const getUser = async () => {
      const chosen = localStorage.getItem("has_chosen");
      if (!chosen) {
        setTimeout(() => router.replace("/home"), 500);
        return;
      }
      const { data: userData } = await supabase.auth.getUser();
const first =
  userData?.user?.user_metadata?.first_name ||
  "User";
const last =
  userData?.user?.user_metadata?.last_name || "";
const user_username =
  userData?.user?.user_metadata?.username ||
  userData?.user?.email?.split("@")[0];

setUserName(first + (last ? " " + last : ""));
setUsername(user_username);

      if (!userData?.user) return;

const { data: profilesData } = await supabase
  .from("profiles")
  .select("*")
  .eq("user_id", userData.user.id);

let data = profilesData || [];

// if NONE are active → make first one active
// 🔥 FORCE ONLY ONE ACTIVE (fix duplicates)


setProfiles(data);

const count = data.length;
setLastCount(count);

if (typeof window !== "undefined") {
  localStorage.setItem("profileCount", count);
}

// FETCH REAL STATS
const profileIds = data.map(p => p.id);
if (profileIds.length > 0) {
  const { data: events } = await supabase
    .from("profile_events")
    .select("event_type")
    .in("profile_id", profileIds);

  const views = events?.filter(e => e.event_type === "view").length || 0;
  const taps = events?.filter(e => e.event_type === "tap").length || 0;
  const saves = events?.filter(e => e.event_type === "save").length || 0;
  const saveRate = taps > 0 ? Math.round((saves / taps) * 100) : 0;

  setStats({ views, taps, saves, saveRate });
}

setLoading(false);
setReady(true);
const tutorialDone = localStorage.getItem("taply_tutorial_done");
if (!tutorialDone) setTimeout(() => setShowTutorial(true), 500);
    };

    getUser();
  }, []);
  if (!mounted) return (
  <div className="w-full h-screen flex items-center justify-center bg-[#f7faff]">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
  </div>
);
return (
    <div className="relative min-h-screen px-4 pt-0 pb-28 max-w-md mx-auto z-10 overflow-hidden bg-[#f7faff]">
      <div className="sticky top-4 z-40 flex justify-center relative">

{mounted && (
 <div data-tutorial="navlink" className="flex items-center justify-between w-[96%] px-5 py-2.5 rounded-full 
bg-white/60 backdrop-blur-xl border border-white/30 
shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-2 ring-white/100">

    {/* LEFT */}
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-gray-900">
        Taply
      </span>

<div className="flex items-center gap-1.5">
<span className="text-base text-gray-500 relative top-[1.4px]">
  {ready ? `/${username}` : "/..."}
</span>

{ready && profiles.length > 0 && profiles.some(p => p.is_active) && (
  <span className="w-2 h-2 bg-green-500 rounded-full relative top-[1.4px]"></span>
)}
</div>


    </div>

    {/* RIGHT */}
    <button
      onClick={() => setMenuOpen((prev) => !prev)}
      className="p-2 rounded-xl hover:bg-white/50 transition"
    >
      ☰
    </button>

  </div>
)}
  {/* DROPDOWN */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      key="dropdown"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-[2%] right-[2%] top-[52px] z-50"
    >
    <div className="
      w-full
      rounded-2xl
      bg-white/90
      backdrop-blur-xl
      border border-white/40
      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      overflow-hidden
      py-2
    ">

      {/* ITEM */}
      <div
        onClick={() => {
          window.open(`/${username}`, "_blank");
          setMenuOpen(false);
        }}
        className="px-4 py-2.5 text-sm text-gray-800 cursor-pointer hover:opacity-60 transition"
      >
        View Public Page
      </div>

      {/* ITEM */}
      <div
        onClick={() => {
          router.push("/account");
          setMenuOpen(false);
        }}
        className="px-4 py-2.5 text-sm text-gray-800 cursor-pointer hover:opacity-60 transition"
      >
        Account Settings
      </div>

      {/* DIVIDER */}
      <div className="my-1 h-px bg-gray-200/60" />

      {/* ITEM */}
      <div
        onClick={async () => {
          localStorage.removeItem("has_chosen");
          await supabase.auth.signOut();
          router.push("/signup");
        }}
        className="px-4 py-2.5 text-sm text-red-500 cursor-pointer hover:opacity-60 transition"
      >
        Logout
      </div>

    </div>
    </motion.div>
  )}
</AnimatePresence>

</div>   
    


{/* HERO */}
      <div data-tutorial="hero" className="mt-12 mb-8 bg-white rounded-3xl px-4 pt-7 pb-8 border border-black/7 shadow-sm">
        {/* TOP ROW */}
        <div className="flex justify-between items-start mb-3">
          <div>
<h1 className="text-3xl font-semibold text-gray-900">
              {loading ? "..." : userName}
            </h1>
      <p data-tutorial="username" className="text-l text-gray-500 mt-1">
              taply.now/{username} · {ready ? profiles.length : "..."} profiles            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-bold text-white">
  {userName ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?"}
</div>
        </div>

        {/* STAT PILLS */}
        <div data-tutorial="stats" className="flex gap-2 mb-3">
          {[
            { num: stats.views, label: "Views" },
            { num: stats.taps, label: "Taps" },
            { num: `${stats.saveRate}%`, label: "Save rate" },
          ].map(({ num, label }) => (
            <div key={label} className="flex-1 bg-[#f0f4ff] rounded-xl px-2 py-3 text-center">          <div className="text-[26px] font-bold text-blue-600">{num}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-[0.06em] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          data-tutorial="create"
          onClick={() => router.push("/builder")}
          className="w-full bg-black text-white text-[14px] font-semibold py-3 rounded-2xl"
        >
          + Create new profile
        </button>
      </div>

      {/* PROFILES */}
      <div data-tutorial="profiles" className="mb-8 relative z-20">
<h2 className="text-xl font-semibold mb-1 tracking-tight">
  Your Profiles
</h2>
<p className="text-base text-gray-600 mb-3 h-5 flex items-center">
  {loading ? (
    <span className="block w-32 h-4 bg-gray-200 rounded animate-pulse"></span>
  ) : profiles.length === 0 ? (
    "No profiles yet"
  ) : (
    ready ? `${profiles.length}/3 saved profiles` : "..."
  )}
</p>

        {/* Progress Bar */}
<div className="w-full h-2.5 bg-white/40 backdrop-blur-md rounded-full mb-4 overflow-hidden border border-white/30">
  <motion.div
    initial={{ width: 0 }}
    animate={{
      width: ready
  ? `${Math.min((profiles.length / 3) * 100, 100)}%`
  : "0%"
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
  />
</div>

        <div className="flex flex-col gap-3">

      

{loading ? (
  Array.from({ length: Math.max(lastCount, 1) }).map((_, i) => (
    <div
      key={i}
      className="bg-white/60 backdrop-blur-md p-4 min-h-[110px] rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex justify-between items-center animate-pulse"
    >
      <div className="w-full">
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="flex gap-3 mt-2">
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
    </div>
  ))
) : (
  profiles.map((profile) => (
<motion.div
  key={profile.id}
  onClick={() => handleSetActive(profile.id)}
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-2xl flex justify-between items-center backdrop-blur-md transition-all duration-300 ease-out
  ${
    profile.is_active
      ? "bg-white border-2 border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.15)]"
      : "bg-white/70 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-blue-300 cursor-pointer"
  }
`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">

        {/* MODE ICON LEFT */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: profile.mode === "business" ? "#eff6ff" : profile.mode === "networking" ? "#f5f3ff" : profile.mode === "university" ? "#ecfdf5" : profile.mode === "social" ? "#fff7ed" : "#eff6ff"
        }}>
          {profile.mode === "business" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}
          {profile.mode === "networking" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          {profile.mode === "university" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
          {profile.mode === "social" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
          {!profile.mode && <QrCode size={18} className="text-blue-600" />}
        </div>

        {/* TEXT */}
        <div>
          <p className="text-lg font-semibold flex items-center gap-2">
            {profile.name || "Untitled Profile"}
            {profile.is_active && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Active</span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            {profile.mode ? profile.mode.charAt(0).toUpperCase() + profile.mode.slice(1) + " mode" : profile.title || "No title"}
          </p>
          <div className="flex gap-4 mt-2 text-sm">
            <button onClick={(e) => { e.stopPropagation(); router.push(`/builder?id=${profile.id}`); }} className="text-blue-600 font-medium">Edit</button>
            <button onClick={(e) => e.stopPropagation()} className="text-gray-600 flex items-center gap-1"><Share2 size={14} />Share</button>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(profile.id); }} className="text-red-500 font-medium">Delete</button>
          </div>
        </div>
      </div>

{/* QR RIGHT - active only */}
{profile.is_active && (
  <div
    onClick={(e) => { e.stopPropagation(); handleShowQR(profile.username); }}
    className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 cursor-pointer hover:bg-blue-100 transition">
    <QrCode size={30} className="text-blue-600" />
  </div>
)}
    </motion.div>
  ))
)}

        </div>
      </div>
      {/* APPLE WALLET HEADER */}
<div data-tutorial="wallet" className="mt-10 mb-3 relative z-20">
  <h2 className="text-xl font-semibold tracking-tight relative z-20">
 
  </h2>
</div>
{mounted && (
  <>
{/* 🍎 APPLE WALLET */}
<motion.div
  whileTap={{ scale: 0.985 }}
  whileHover={{ y: -3 }}
  className="
    bg-white/85
    backdrop-blur-md
    rounded-[32px]
    border border-white/40
    shadow-[0_12px_40px_rgba(0,0,0,0.10)]
    overflow-hidden
  "
>

  {/* TOP */}
  <div className="p-6 flex justify-between items-center">

    {/* LEFT */}
    <div className="flex flex-col gap-2 max-w-[58%]">

      {/* LABEL */}
      <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[12px] font-semibold w-fit relative -top-2">

        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 text-indigo-600"
          fill="currentColor"
        >
          <path d="M16.365 1.43c0 1.14-.466 2.224-1.24 3.016-.79.8-2.08 1.4-3.19 1.32-.14-1.1.48-2.26 1.25-3.04.78-.79 2.14-1.35 3.18-1.3zm4.35 15.64c-.5 1.14-.73 1.65-1.38 2.68-.9 1.4-2.17 3.14-3.75 3.16-1.41.02-1.78-.9-3.7-.9-1.92 0-2.34.88-3.72.92-1.57.03-2.77-1.56-3.67-2.96-2.52-3.92-2.79-8.52-1.23-10.92 1.1-1.68 2.83-2.66 4.47-2.66 1.67 0 2.72.92 4.1.92 1.33 0 2.14-.93 4.09-.93 1.41 0 2.91.77 3.99 2.1-3.52 1.93-2.95 6.92.8 8.59z"/>
        </svg>

        <span>WALLET</span>
      </div>

      {/* TITLE */}
      <h3 className="text-[25px] leading-[1.10] font-semibold tracking-tight text-gray-900">
        Add to Apple Wallet
      </h3>

   {/* DESCRIPTION */}
      <p className="text-[14px] leading-snug text-gray-500">
        Save your Taply card for instant access and faster sharing.
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3v3m0-3v3m-3-6h3m3 0v3m-6 3h3"/></svg>
        <p className="text-[12px] text-indigo-500 font-medium">Includes your profile QR code</p>
      </div>

    </div>

    {/* RIGHT */}
    <div className="relative flex items-center justify-center">

      <div className="absolute inset-0 bg-indigo-200/20 blur-3xl rounded-full"></div>

      <img
        src="/apple-wallet.png"
        alt="Apple Wallet"
        className="w-32 h-32 object-contain rotate-6 relative z-10 -right-1"
      />

    </div>
  </div>

  {/* DIVIDER */}
  <div className="h-px bg-gray-100" />

  {/* BOTTOM */}
  <div className="p-4 flex gap-3">

    {/* ADD BUTTON */}
    <button
      onClick={async () => {
        const activeProfile = profiles.find(p => p.is_active);

        if (!activeProfile) {
          return alert("Set a profile as Active first!");
        }

        const res = await fetch("/api/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: activeProfile.name || userName,
            title: activeProfile.title || "",
            phone: activeProfile.field_values?.phone || "",
            email: activeProfile.field_values?.email || "",
            username: username,
            photoUrl: activeProfile.avatar_url || null,
            bgColor: walletBgColor,
            logoUrl: walletLogoUrl?.startsWith("/") ? `${window.location.origin}${walletLogoUrl}` : walletLogoUrl,            textColor: walletTextColor,
          }),
        });

        if (!res.ok) {
          return alert("Something went wrong");
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `taply-${username}.pkpass`;
        a.click();
      }}
      data-tutorial="addwallet"
      className="
        flex-1
        bg-black
        text-white
        text-sm
        font-medium
        py-3
        rounded-2xl
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <Wallet size={15} />
      Add to Wallet →
    </button>

    {/* CUSTOMIZE */}
    <button
      data-tutorial="customize"
      onClick={() => setWalletCustomizerOpen(prev => !prev)}
      className="
        flex-1
        bg-[#f7f7f8]
        border border-gray-200
        text-gray-700
        text-sm
        font-medium
        py-3
        rounded-2xl
        transition
        hover:bg-white
      "
    >
      Customize
    </button>

  </div>
</motion.div>

<AnimatePresence>
  {walletCustomizerOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.12)] mt-3"
    >
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Card Color</p>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "rgb(0,0,0)" },
              { value: "rgb(255,255,255)" },
            ].map(({ value }) => (
              <button
                key={value}
                onClick={() => setWalletBgColor(value)}
                className={`w-8 h-8 rounded-full border-2 transition ${walletBgColor === value ? "border-blue-500 scale-110" : "border-gray-200"}`}
                style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
              />
            ))}
            <label className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition overflow-hidden relative"
              style={walletBgColor !== "rgb(0,0,0)" && walletBgColor !== "rgb(255,255,255)" ? { background: walletBgColor, borderStyle: "solid", borderColor: walletBgColor } : { borderStyle: "dashed", borderColor: "#d1d5db" }}>
<span className="text-xs pointer-events-none" style={{ color: walletBgColor !== "rgb(0,0,0)" && walletBgColor !== "rgb(255,255,255)" ? "white" : "#9ca3af" }}>✎</span>
              <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onInput={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1,3),16);
                const g = parseInt(hex.slice(3,5),16);
                const b = parseInt(hex.slice(5,7),16);
                setWalletBgColor(`rgb(${r},${g},${b})`);
              }} onChange={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1,3),16);
                const g = parseInt(hex.slice(3,5),16);
                const b = parseInt(hex.slice(5,7),16);
                setWalletBgColor(`rgb(${r},${g},${b})`);
              }} />
            </label>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Text Color</p>
          <div className="flex gap-3">
            {[
                  { value: "rgb(0,0,0)" },
              { value: "rgb(255,255,255)" },
            ].map(({ value }) => (
              <button
                key={value}
                onClick={() => setWalletTextColor(value)}
                className={`w-8 h-8 rounded-full border-2 transition ${walletTextColor === value ? "border-blue-500 scale-110" : "border-gray-200"}`}
                style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
              />
            ))}
            <label className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition overflow-hidden relative"
              style={walletTextColor !== "rgb(0,0,0)" && walletTextColor !== "rgb(255,255,255)" ? { background: walletTextColor, borderStyle: "solid", borderColor: walletTextColor } : { borderStyle: "dashed", borderColor: "#d1d5db" }}>
<span className="text-xs pointer-events-none" style={{ color: walletTextColor !== "rgb(0,0,0)" && walletTextColor !== "rgb(255,255,255)" ? "white" : "#9ca3af" }}>✎</span>
              <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onInput={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1,3),16);
                const g = parseInt(hex.slice(3,5),16);
                const b = parseInt(hex.slice(5,7),16);
                setWalletTextColor(`rgb(${r},${g},${b})`);
              }} onChange={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1,3),16);
                const g = parseInt(hex.slice(3,5),16);
                const b = parseInt(hex.slice(5,7),16);
                setWalletTextColor(`rgb(${r},${g},${b})`);
              }} />
            </label>
          </div>
        </div>
        <div>
          
          <p className="text-sm font-semibold text-gray-700 mb-2">Company Logo</p>
          <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
            {walletLogoUrl ? (
              <img src={walletLogoUrl} className="w-8 h-8 object-contain rounded" />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Logo</div>
            )}
            <span className="text-sm text-gray-500">{walletLogoUrl && walletLogoUrl !== "/taply-logo.svg" ? "Change logo" : "Upload company logo"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const { data: userData } = await supabase.auth.getUser();
              const fileName = `wallet-logo-${userData.user.id}-${Date.now()}.png`;
              const { error } = await supabase.storage.from("avatars").upload(fileName, file);
              if (error) return;
              const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
              setWalletLogoUrl(data.publicUrl);
            }} />
          </label>
          {walletLogoUrl && walletLogoUrl !== "/taply-logo.svg" && <button onClick={() => setWalletLogoUrl("/taply-logo.svg")} className="text-xs text-red-400 mt-1">Remove logo</button>}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

  </>
)}
   
{/* QUICK ACTIONS */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-3 tracking-tight">Quick Actions</h2>

  <div className="grid grid-cols-2 gap-3">
    {[
      {
        icon: <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><QrCode size={22} className="text-blue-600" /></div>,
        label: "QR Code",
        arrowColor: "text-blue-600",
        onClick: () => {},
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><Link size={22} className="text-green-600" /></div>,
        label: "Copy Link",
        arrowColor: "text-green-600",
        onClick: () => { if (!mounted) return; navigator.clipboard.writeText(`${window.location.origin}/${username}`); },
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"><Share2 size={22} className="text-orange-500" /></div>,
        label: "Share",
        arrowColor: "text-orange-500",
        onClick: () => {},
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><QrCode size={22} className="text-purple-500" /></div>,
        label: "Tap Mode",
        arrowColor: "text-purple-500",
        onClick: () => { if (!mounted) return; router.push(`/${username}`); },
      },
    ].map(({ icon, label, arrowColor, onClick }) => (
      <motion.div
        key={label}
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -3 }}
        onClick={onClick}
        className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col gap-3 h-[100px] cursor-pointer"
      >
        {icon}
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-gray-900 tracking-tight">{label}</p>
          <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${arrowColor}`} style={{ background: arrowColor.replace("text-", "").replace("blue-600","#eff6ff").replace("green-600","#f0fdf4").replace("orange-500","#fff7ed").replace("purple-500","#faf5ff") }}>→</span>
        </div>
      </motion.div>
    ))}
    
  </div>
  




</div>

    {showTutorial && <DashboardTutorial onComplete={() => setShowTutorial(false)} />}

    {/* QR MODAL */}
    <AnimatePresence>
      {qrOpen && qrModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQrOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 max-w-xs w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900">Your QR Code</h3>
            <img src={qrModal} className="w-56 h-56" />
            <p className="text-sm text-gray-400 text-center">Scan to view your Taply profile</p>
<a
  href={qrModal}
  download="taply-qr.png"
  className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl text-center"
>
  Download QR Code
</a>
            <button onClick={() => setQrOpen(false)} className="text-sm text-gray-400">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  </div>
  );
}
