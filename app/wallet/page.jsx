"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet } from "lucide-react";
import supabase from "@/lib/supabase";

export default function WalletPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [userName, setUserName] = useState("");
  const [username, setUsername] = useState("");
  const [walletBgColor, setWalletBgColor] = useState("rgb(0,0,0)");
  const [walletTextColor, setWalletTextColor] = useState("rgb(255,255,255)");
  const [walletLogoUrl, setWalletLogoUrl] = useState(null);
  const [walletCustomizerOpen, setWalletCustomizerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) { router.replace("/signup"); return; }
      const first = userData.user.user_metadata?.first_name || "User";
      const last = userData.user.user_metadata?.last_name || "";
      const uname = userData.user.user_metadata?.username || userData.user.email?.split("@")[0];
      setUserName(first + (last ? " " + last : ""));
      setUsername(uname);
      const { data } = await supabase.from("profiles").select("*").eq("user_id", userData.user.id);
      setProfiles(data || []);
    };
    load();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f7faff] px-4 pb-28 max-w-md mx-auto">

      {/* NAV */}
      <div className="sticky top-4 z-40 flex justify-between items-center py-4">
        <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-500 font-medium">← Dashboard</button>
        <span className="text-sm font-semibold text-gray-900">Apple Wallet</span>
        <div className="w-16" />
      </div>

      {/* WALLET CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 bg-white/85 backdrop-blur-md rounded-[32px] border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden"
      >
        <div className="p-6 flex justify-between items-center">
          <div className="flex flex-col gap-2 max-w-[58%]">
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[12px] font-semibold w-fit">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.466 2.224-1.24 3.016-.79.8-2.08 1.4-3.19 1.32-.14-1.1.48-2.26 1.25-3.04.78-.79 2.14-1.35 3.18-1.3zm4.35 15.64c-.5 1.14-.73 1.65-1.38 2.68-.9 1.4-2.17 3.14-3.75 3.16-1.41.02-1.78-.9-3.7-.9-1.92 0-2.34.88-3.72.92-1.57.03-2.77-1.56-3.67-2.96-2.52-3.92-2.79-8.52-1.23-10.92 1.1-1.68 2.83-2.66 4.47-2.66 1.67 0 2.72.92 4.1.92 1.33 0 2.14-.93 4.09-.93 1.41 0 2.91.77 3.99 2.1-3.52 1.93-2.95 6.92.8 8.59z"/>
              </svg>
              <span>WALLET</span>
            </div>
            <h3 className="text-[25px] leading-[1.10] font-semibold tracking-tight text-gray-900">Add to Apple Wallet</h3>
            <p className="text-[14px] leading-snug text-gray-500">Save your Taply card for instant access and faster sharing.</p>
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3v3m0-3v3m-3-6h3m3 0v3m-6 3h3"/></svg>
              <p className="text-[12px] text-indigo-500 font-medium">Includes your profile QR code</p>
            </div>
          </div>
          <img src="/apple-wallet.png" alt="Apple Wallet" className="w-32 h-32 object-contain rotate-6" />
        </div>

        <div className="h-px bg-gray-100" />

        <div className="p-4 flex gap-3">
          <button
            onClick={async () => {
              const activeProfile = profiles.find(p => p.is_active);
              if (!activeProfile) return alert("Set a profile as Active first!");
              const res = await fetch("/api/wallet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: activeProfile.name || userName,
                  title: activeProfile.title || "",
                  phone: activeProfile.field_values?.phone || "",
                  email: activeProfile.field_values?.email || "",
                  username,
                  photoUrl: activeProfile.avatar_url || null,
                  bgColor: walletBgColor,
                  logoUrl: walletLogoUrl,
                  textColor: walletTextColor,
                }),
              });
              if (!res.ok) return alert("Something went wrong");
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `taply-${username}.pkpass`;
              a.click();
            }}
            className="flex-1 bg-black text-white text-sm font-medium py-3 rounded-2xl flex items-center justify-center gap-2"
          >
            <Wallet size={15} />
            Add to Wallet →
          </button>
          <button
            onClick={() => setWalletCustomizerOpen(prev => !prev)}
            className="flex-1 bg-[#f7f7f8] border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-2xl"
          >
            Customize
          </button>
        </div>
      </motion.div>

      {/* CUSTOMIZER */}
      <AnimatePresence>
        {walletCustomizerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm mt-3"
          >
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Card Color</p>
                <div className="flex gap-3">
                  {["rgb(0,0,0)", "rgb(255,255,255)"].map(v => (
                    <button key={v} onClick={() => setWalletBgColor(v)}
                      className={`w-8 h-8 rounded-full border-2 transition ${walletBgColor === v ? "border-blue-500 scale-110" : "border-gray-200"}`}
                      style={{ background: v, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
                  ))}
                  <label className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden relative"
                    style={walletBgColor !== "rgb(0,0,0)" && walletBgColor !== "rgb(255,255,255)" ? { background: walletBgColor, borderStyle: "solid", borderColor: walletBgColor } : { borderStyle: "dashed", borderColor: "#d1d5db" }}>
                    <span className="text-xs pointer-events-none" style={{ color: walletBgColor !== "rgb(0,0,0)" && walletBgColor !== "rgb(255,255,255)" ? "white" : "#9ca3af" }}>✎</span>
                    <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      onInput={(e) => { const h = e.target.value; setWalletBgColor(`rgb(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)})`); }}
                      onChange={(e) => { const h = e.target.value; setWalletBgColor(`rgb(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)})`); }} />
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Text Color</p>
                <div className="flex gap-3">
                  {["rgb(0,0,0)", "rgb(255,255,255)"].map(v => (
                    <button key={v} onClick={() => setWalletTextColor(v)}
                      className={`w-8 h-8 rounded-full border-2 transition ${walletTextColor === v ? "border-blue-500 scale-110" : "border-gray-200"}`}
                      style={{ background: v, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
                  ))}
                  <label className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden relative"
                    style={walletTextColor !== "rgb(0,0,0)" && walletTextColor !== "rgb(255,255,255)" ? { background: walletTextColor, borderStyle: "solid", borderColor: walletTextColor } : { borderStyle: "dashed", borderColor: "#d1d5db" }}>
                    <span className="text-xs pointer-events-none" style={{ color: walletTextColor !== "rgb(0,0,0)" && walletTextColor !== "rgb(255,255,255)" ? "white" : "#9ca3af" }}>✎</span>
                    <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      onInput={(e) => { const h = e.target.value; setWalletTextColor(`rgb(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)})`); }}
                      onChange={(e) => { const h = e.target.value; setWalletTextColor(`rgb(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)})`); }} />
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Company Logo</p>
                <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                  {walletLogoUrl ? <img src={walletLogoUrl} className="w-8 h-8 object-contain rounded" /> : <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Logo</div>}
                  <span className="text-sm text-gray-500">{walletLogoUrl ? "Change logo" : "Upload company logo"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files[0]; if (!file) return;
                    const { data: userData } = await supabase.auth.getUser();
                    const fileName = `wallet-logo-${userData.user.id}-${Date.now()}.png`;
                    await supabase.storage.from("avatars").upload(fileName, file);
                    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
                    setWalletLogoUrl(data.publicUrl);
                  }} />
                </label>
                {walletLogoUrl && <button onClick={() => setWalletLogoUrl(null)} className="text-xs text-red-400 mt-1">Remove logo</button>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVE PROFILE INFO */}
      <div className="mt-6 bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Pass generated from</p>
          {profiles.find(p => p.is_active) ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                background: profiles.find(p => p.is_active)?.mode === "business" ? "#eff6ff" : profiles.find(p => p.is_active)?.mode === "networking" ? "#f5f3ff" : profiles.find(p => p.is_active)?.mode === "university" ? "#ecfdf5" : "#fff7ed"
              }}>
                <div className="w-3 h-3 rounded-full" style={{
                  background: profiles.find(p => p.is_active)?.mode === "business" ? "#2563eb" : profiles.find(p => p.is_active)?.mode === "networking" ? "#7c3aed" : profiles.find(p => p.is_active)?.mode === "university" ? "#059669" : "#ea580c"
                }} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-gray-900">{profiles.find(p => p.is_active)?.name}</p>
                <p className="text-[12px] text-gray-400 capitalize">{profiles.find(p => p.is_active)?.mode} mode</p>
              </div>
              <span className="text-[11px] bg-green-100 text-green-600 px-2.5 py-1 rounded-full font-semibold">Active</span>
            </div>
          ) : (
            <div>
              <p className="text-[13px] text-amber-600 font-medium">No active profile set.</p>
              <button onClick={() => router.push("/dashboard")} className="text-[13px] text-amber-600 font-bold mt-1 underline">Go to dashboard →</button>
            </div>
          )}
        </div>

        {profiles.filter(p => !p.is_active).length > 0 && (
          <div className="px-5 py-3">
            <p className="text-[11px] text-gray-400 mb-3">Switch profile</p>
            <div className="flex flex-col gap-2">
              {profiles.filter(p => !p.is_active).map(profile => (
                <button key={profile.id} onClick={async () => {
                  const { data: userData } = await supabase.auth.getUser();
                  const userId = userData?.user?.id;
                  if (!userId) return;
                  await supabase.from("profiles").update({ is_active: false }).eq("user_id", userId);
                  await supabase.from("profiles").update({ is_active: true }).eq("id", profile.id).eq("user_id", userId);
                  setProfiles(prev => prev.map(p => ({ ...p, is_active: p.id === profile.id })));
                }}
                  className="flex items-center gap-3 text-left hover:bg-gray-50 rounded-2xl px-3 py-2.5 transition w-full">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: profile.mode === "business" ? "#eff6ff" : profile.mode === "networking" ? "#f5f3ff" : profile.mode === "university" ? "#ecfdf5" : "#fff7ed"
                  }}>
                    <div className="w-3 h-3 rounded-full" style={{
                      background: profile.mode === "business" ? "#2563eb" : profile.mode === "networking" ? "#7c3aed" : profile.mode === "university" ? "#059669" : "#ea580c"
                    }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-gray-800">{profile.name}</p>
                    <p className="text-[12px] text-gray-400 capitalize">{profile.mode} mode</p>
                  </div>
                  <span className="text-[12px] text-blue-500 font-semibold">Set active →</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}