"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { QrCode, Link, Wallet, Share2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import DashboardTutorial from "@/components/DashboardTutorial";
import ProfileCardTutorial from "@/components/ProfileCardTutorial"
import Cropper from "react-easy-crop"
import UpgradeModal from "@/components/UpgradeModal"
export default function Dashboard() {
const [userName, setUserName] = useState("");
const [username, setUsername] = useState("");
const [subscriptionTier, setSubscriptionTier] = useState("free");
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(true);
const [lastCount, setLastCount] = useState(3);
const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);
const [ready, setReady] = useState(false);
const [mounted, setMounted] = useState(false);
const [qrModal, setQrModal] = useState(null);
const [qrOpen, setQrOpen] = useState(false);
const [statsLoading, setStatsLoading] = useState(true);
const [stats, setStats] = useState({ views: 0, taps: 0, saves: 0, saveRate: 0 });const [walletCustomizerOpen, setWalletCustomizerOpen] = useState(false);
const [walletBgColor, setWalletBgColor] = useState("rgb(238,243,255)");
const [walletLogoUrl, setWalletLogoUrl] = useState("/taply-wallet-logo.png");
const [walletTextColor, setWalletTextColor] = useState("rgb(0,0,0)");
const [showTutorial, setShowTutorial] = useState(false);
const [showProfileCardTutorial, setShowProfileCardTutorial] = useState(false)
const [cropImageSrc, setCropImageSrc] = useState(null)
const [crop, setCrop] = useState({ x: 0, y: 0 })
const [zoom, setZoom] = useState(1)
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
const [photoCropImageSrc, setPhotoCropImageSrc] = useState(null)
const [photoCrop, setPhotoCrop] = useState({ x: 0, y: 0 })
const [photoZoom, setPhotoZoom] = useState(1)
const [photoCroppedAreaPixels, setPhotoCroppedAreaPixels] = useState(null)
const [walletPhotoUrl, setWalletPhotoUrl] = useState(null)
const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
const [pendingCardId, setPendingCardId] = useState(null)
const maxProfiles = subscriptionTier === "pro" ? 4 : 1
const activeProfile = profiles.find((profile) => profile.is_active) || profiles[0] || null;
const otherProfiles = profiles.filter((profile) => profile.id !== activeProfile?.id);

const handleCreateProfile = () => {
  if (profiles.length >= maxProfiles) {
    if (subscriptionTier !== "pro") {
      setUpgradeModalOpen(true);
    } else {
      alert("You've reached the maximum of 4 profiles. Delete one to create a new one.");
    }
    return;
  }

  router.push("/create");
};
useEffect(() => {
  const cardId = localStorage.getItem("pending_card_id")
  if (cardId) setPendingCardId(cardId)
}, [])

const handleShowQR = async (profileUsername) => {
  if (!ready) return;
  if (subscriptionTier !== "pro") {
    setUpgradeModalOpen(true);
    return;
  }
  const url = `https://taply.now/${profileUsername}`;
  const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });
  setQrModal(dataUrl);
  setQrOpen(true);
};
const [switching, setSwitching] = useState(false);

const handleSetActive = async (id) => {
  if (switching) return;
  if (profiles.find((p) => p.id === id)?.is_active) return;
  setSwitching(true);

  // update UI first so the switch is instant
  setProfiles((prev) =>
    prev.map((p) => ({
      ...p,
      is_active: p.id === id,
    }))
  );

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) { setSwitching(false); return; }

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

  setSwitching(false);
};

const handleDelete = async (id) => {
  const target = profiles.find((p) => p.id === id);
  const remaining = profiles.filter((p) => p.id !== id);
  const wasActive = target?.is_active;

  const message = wasActive && remaining.length > 0
    ? "Delete this profile? Your next profile will become active."
    : "Delete this profile?";
  if (!confirm(message)) return;

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Error deleting profile");
    return;
  }

  // If the active one was deleted, make the next profile active
  if (wasActive && remaining.length > 0) {
    const next = remaining[0];
    setProfiles(remaining.map((p) => ({ ...p, is_active: p.id === next.id })));
    await supabase.from("profiles").update({ is_active: true }).eq("id", next.id);
  } else {
    setProfiles(remaining);
  }
};
const [renamingId, setRenamingId] = useState(null);
const [renameValue, setRenameValue] = useState("");

const saveRename = async (id) => {
  const value = renameValue.trim() || null;
  setRenamingId(null);
  setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, label: value } : p)));
  const { error } = await supabase.from("profiles").update({ label: value }).eq("id", id);
  if (error) console.error("Rename failed:", error);
};

useEffect(() => {
  setMounted(true);
  const saved = parseInt(localStorage.getItem("profileCount") || "1", 10);
  setLastCount(Number.isNaN(saved) ? 1 : saved);
}, []);

// keep the saved count in sync when profiles are added or deleted
useEffect(() => {
  if (ready) localStorage.setItem("profileCount", String(Math.max(profiles.length, 1)));
}, [profiles.length, ready]);
  useEffect(() => {
    const getUser = async () => {
      const chosen = localStorage.getItem("has_chosen");
      if (!chosen) {
        localStorage.setItem("has_chosen", "true");
      }
      const { data: userData } = await supabase.auth.getUser();
    
const rawFull = userData?.user?.user_metadata?.full_name
const fullName = typeof rawFull === "string" ? rawFull : 
  (typeof rawFull === "object" && rawFull !== null ? `${rawFull.firstName || ""} ${rawFull.lastName || ""}`.trim() : "") ||
  userData?.user?.user_metadata?.name || ""
const first =
  userData?.user?.user_metadata?.first_name ||
  userData?.user?.user_metadata?.given_name ||
  (fullName ? fullName.split(" ")[0] : "User");
const last =
  userData?.user?.user_metadata?.last_name ||
  userData?.user?.user_metadata?.family_name ||
  (fullName ? fullName.split(" ").slice(1).join(" ") : "");
const user_username =
  userData?.user?.user_metadata?.username ||
  userData?.user?.user_metadata?.preferred_username ||
  userData?.user?.email?.split("@")[0];

setUserName(first + (last ? " " + last : ""));
setUsername(user_username);

      if (!userData?.user) return;

const { data: accountData } = await supabase
  .from("accounts")
  .select("subscription_tier")
  .eq("user_id", userData.user.id)
  .single();

setSubscriptionTier(accountData?.subscription_tier || "free");

// Resume checkout if user picked a plan before logging in
const pendingRaw = localStorage.getItem("pending_checkout_plan");
if (pendingRaw) {
  localStorage.removeItem("pending_checkout_plan");
  try {
    const { plan, ts } = JSON.parse(pendingRaw);
    const fresh = Date.now() - ts < 30 * 60 * 1000;
    const isPro = (accountData?.subscription_tier || "free") === "pro";
    if (fresh && !isPro && plan) {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          userId: userData.user.id,
          userEmail: userData.user.email,
        }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
    }
  } catch (e) {
    console.error("Pending checkout error:", e);
  }
}

const { data: profilesData } = await supabase
  .from("profiles")
  .select("*")
  .eq("user_id", userData.user.id);

let data = (profilesData || []).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

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
  setStatsLoading(false);
}

setStatsLoading(false);
setLoading(false);
setReady(true);
const tutorialDone = localStorage.getItem("taply_tutorial_done");
const profileCardDone = localStorage.getItem("taply_profile_card_tutorial_done")
if (!tutorialDone) {
  setTimeout(() => setShowTutorial(true), 500)
} else if (data.length > 0 && !profileCardDone) {
  setTimeout(() => setShowProfileCardTutorial(true), 800)
}
    };

    getUser();
  }, []);
  if (!mounted) return (
  <div className="w-full h-screen flex items-center justify-center bg-[#f7faff]">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
  </div>
);
return (
    <div
  data-phone-frame
  className="relative min-h-screen px-4 pt-0 pb-28 max-w-md mx-auto z-10 overflow-hidden bg-[#f7faff]"
>
      <div className="sticky top-4 z-40 flex justify-center relative">

{mounted && (
 <div data-tutorial="navlink" className={`flex items-center justify-between w-[96%] px-5 py-2.5 rounded-full 
backdrop-blur-xl border shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-2 ${
  subscriptionTier === "pro"
    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/60 ring-amber-100"
    : "bg-white/60 border-white/30 ring-white/100"
}`}>

    {/* LEFT */}
    <div className="flex items-center gap-1.5">
      <span className="text-[18px] font-bold text-gray-900 tracking-tight">
        taply
      </span>
      <span className="text-[18px] text-gray-300 font-light">/</span>
<div className="flex items-center gap-1.5">
<span className="text-[18px] font-bold text-gray-900 tracking-tight">
  {ready ? username : "..."}
</span>

{ready && profiles.length > 0 && profiles.some(p => p.is_active) && (
  <span className={`w-2 h-2 rounded-full ${subscriptionTier === "pro" ? "bg-yellow-400" : "bg-green-500"}`}></span>
)}

{ready && subscriptionTier === "pro" && (
  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1.5 rounded-full tracking-wide ml-1 shadow-sm">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
    </svg>
    PRO
  </span>
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
    <>
    <div
      onClick={() => setMenuOpen(false)}
      className="fixed inset-0 z-40"
    />
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
    </>
  )}
</AnimatePresence>

</div>   
    


      {/* PROFILES */}
      <div data-tutorial="profiles" className="mt-12 mb-8 relative z-20">
        <h2 className="text-[28px] font-bold tracking-tight text-gray-900 leading-tight">
          Your profiles
        </h2>
        <p className="text-[18px] text-gray-500 mt-0.5 mb-4 h-6 flex items-center">
          {loading ? (
            <span className="block w-28 h-4 bg-gray-200 rounded animate-pulse"></span>
          ) : (
            `${profiles.length} of ${maxProfiles} profile${maxProfiles === 1 ? "" : "s"}`
          )}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-gray-200/60 rounded-full mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: ready ? `${Math.min((profiles.length / maxProfiles) * 100, 100)}%` : "0%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
          />
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <>
              {/* Big card skeleton */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse">
                <div className="flex items-center gap-4 px-5 pt-5 pb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-5 w-40 bg-gray-200 rounded-full" />
                    <div className="h-4 w-32 bg-gray-100 rounded-full" />
                  </div>
                </div>
                <div className="h-px bg-gray-100 mx-5" />
                <div className="flex items-center py-4 px-5 gap-6">
                  <div className="flex-1 h-4 bg-gray-100 rounded-full" />
                  <div className="flex-1 h-4 bg-gray-100 rounded-full" />
                  <div className="flex-1 h-4 bg-gray-100 rounded-full" />
                </div>
              </div>

              {/* Slim row skeletons */}
              {lastCount > 1 && (
                <div className="flex flex-col gap-2.5 mt-2">
                  {Array.from({ length: lastCount - 1 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm px-5 py-4 animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-36 bg-gray-200 rounded-full" />
                        <div className="h-3.5 w-24 bg-gray-100 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
            {(activeProfile ? [activeProfile] : []).map((profile, index) => {
              const isActive = profile.is_active;
              const isPro = subscriptionTier === "pro";
              const modeLabel = {
                business: "Business profile",
                networking: "Company profile",
                university: "University profile",
                social: "Social profile",
              }[profile.mode] || "Profile";
              const initials = (profile.name || "?")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <motion.div
                  key={profile.id}
                  data-tutorial={index === 0 ? "first-profile" : undefined}
                  onClick={() => !isActive && handleSetActive(profile.id)}
                  initial={{ scale: 0.97 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`rounded-3xl bg-white ${
                    isActive
                      ? isPro
                        ? "border-2 border-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.15)]"
                        : "border-2 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                      : "border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer"
                  }`}
                >
                  {/* TOP */}
                  <div className="flex items-center gap-4 px-5 pt-5 pb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-[18px] font-bold">{initials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {renamingId === profile.id ? (
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onBlur={() => saveRename(profile.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                            if (e.key === "Escape") setRenamingId(null);
                          }}
                          placeholder={profile.name || "Profile name"}
                          maxLength={30}
                          className="w-full text-[20px] font-bold text-gray-900 tracking-tight leading-tight bg-gray-50 rounded-lg px-2 py-0.5 -ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenamingId(profile.id);
                            setRenameValue(profile.label || "");
                          }}
                          className="flex items-center gap-3 max-w-full text-left"
                        >
                          <span className="text-[20px] font-bold text-gray-900 tracking-tight leading-tight truncate">
                            {profile.label || profile.name || "Untitled profile"}
                          </span>
                          <Pencil size={14} className="text-gray-300 flex-shrink-0" />
                        </button>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[15px] text-gray-500 truncate">
                          {profile.label ? profile.name : modeLabel}
                        </span>
                        {isActive ? (
                          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[12px] font-semibold text-blue-600 flex-shrink-0">Set active</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 mx-5" />

                  {/* ACTIONS */}
                  <div className="flex items-center py-1">
                    <button
                      data-tutorial={index === 0 ? "profile-edit" : undefined}
                      onClick={(e) => { e.stopPropagation(); router.push(`/builder?id=${profile.id}`); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-[15px] font-semibold text-blue-600"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <div className="w-px h-6 bg-gray-200" />

                    <button
                      data-tutorial={index === 0 ? "profile-delete" : undefined}
                      onClick={(e) => { e.stopPropagation(); handleDelete(profile.id); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-[15px] font-semibold text-red-500"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                    <div className="w-px h-6 bg-gray-200" />

                    <button
                      data-tutorial={index === 0 ? "profile-qr" : undefined}
                      onClick={(e) => { e.stopPropagation(); handleShowQR(profile.username); }}
                      className="relative flex-1 flex items-center justify-center gap-2 py-3 text-[15px] font-semibold text-blue-600"
                    >
                      <QrCode size={16} />
                      QR
                      {!isPro && ready && (
                        <span className="absolute top-0.5 right-2 text-[9px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-1.5 py-0.5 rounded-full">PRO</span>
                      )}
                    </button>
                  </div>

                </motion.div>
              );
            })}
            </>
          )}
        </div>

        {/* OTHER PROFILES */}
        {!loading && otherProfiles.length > 0 && (
          <div className="mt-6">
            <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-1">
              
            </p>
            <div className="flex flex-col gap-2.5">
              {otherProfiles.map((profile) => {
                const modeLabel = {
                  business: "Business profile",
                  networking: "Company profile",
                  university: "University profile",
                  social: "Social profile",
                }[profile.mode] || "Profile";
                const initials = (profile.name || "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <button
                    key={profile.id}
                    onClick={() => handleSetActive(profile.id)}
                    className="w-full flex items-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)] px-5 py-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-[15px] font-bold">{initials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[17px] font-semibold text-gray-900 truncate leading-tight">
                        {profile.label || profile.name || "Untitled profile"}
                      </p>
                      <p className="text-[14px] text-gray-500 mt-0.5 truncate">
                        {profile.label ? `${profile.name} · ${modeLabel}` : modeLabel}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[14px] font-semibold text-blue-600 flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CREATE */}
        <button
          data-tutorial="create"
          onClick={handleCreateProfile}
          className={`w-full mt-5 text-[16px] font-semibold py-3.5 rounded-3xl transition ${
            profiles.length >= maxProfiles ? "bg-gray-100 text-gray-400" : "bg-black text-white active:scale-[0.98]"
          }`}
        >
          {profiles.length >= maxProfiles
            ? subscriptionTier === "pro" ? "Max profiles reached" : "Upgrade to add more"
            : "+ Create new profile"}
        </button>

        {/* UPGRADE TO PRO */}
        {ready && subscriptionTier !== "pro" && (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/upgrade")}
            className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl px-5 py-4 flex items-center justify-between shadow-[0_8px_30px_rgba(99,102,241,0.25)] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M5 16L3 5l5.5 4L12 3l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z"/>
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold text-white leading-tight">Upgrade to Pro</p>
                <p className="text-[13px] text-white/70 leading-tight mt-0.5">Apple Wallet, all modes, QR code</p>
              </div>
            </div>
            <span className="text-white text-lg">→</span>
          </motion.div>
        )}
      </div>
      {/* APPLE WALLET HEADER */}
<div data-tutorial="wallet" className={`${profiles.length === 0 ? "mt-2" : "mt-10"} mb-3 relative z-20`}>
  <h2 className="text-xl font-semibold tracking-tight relative z-20">
 
  </h2>
</div>
{mounted && (
  <>
{/*  APPLE WALLET */}
<motion.div
  whileTap={{ scale: 0.985 }}
  whileHover={{ y: -3 }}
  className="
    relative
    bg-white/85
    backdrop-blur-md
    rounded-[32px]
    border border-white/40
    shadow-[0_12px_40px_rgba(0,0,0,0.10)]
    overflow-hidden
  "
>
  {ready && subscriptionTier !== "pro" && (
<span className="absolute top-4 right-4 z-10 text-[12px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3.5 py-1.5 rounded-full tracking-wide">PRO</span>
  )}

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
        if (!ready) return;
        if (subscriptionTier !== "pro") {
          setUpgradeModalOpen(true);
          return;
        }

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
            website: activeProfile.field_values?.website || "",
            linkedin: activeProfile.field_values?.linkedin || "",
            username: username,
            photoUrl: walletPhotoUrl || activeProfile.avatar_url || null,
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
<AnimatePresence>
  {walletCustomizerOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden bg-transparent mt-0"
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
          <p className="text-sm font-semibold text-gray-700 mb-2">Profile Photo</p>
          <label
            onClick={() => {
              const activeProfile = profiles.find(p => p.is_active)
              if (activeProfile?.avatar_url) setPhotoCropImageSrc(walletPhotoUrl || activeProfile.avatar_url)
            }}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
          >
            {(() => {
              const activeProfile = profiles.find(p => p.is_active)
              const photoSrc = walletPhotoUrl || activeProfile?.avatar_url
              return photoSrc ? (
                <img src={photoSrc} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              )
            })()}
            <span className="text-sm text-gray-500">Adjust photo</span>
          </label>
        </div>
        <div>
          
          <p className="text-sm font-semibold text-gray-700 mb-2">Company Logo</p>
          <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
            {walletLogoUrl ? (
              <img src={walletLogoUrl} className="w-24 h-8 object-contain rounded" />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Logo</div>
            )}
            <span className="text-sm text-gray-500">{walletLogoUrl && walletLogoUrl !== "/taply-wallet-logo.png" ? "Change logo" : "Upload company logo"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = () => {
                const result = reader.result
                if (file.type === "image/svg+xml") {
                  const blob = new Blob([result.split(",")[1] ? atob(result.split(",")[1]) : result], { type: "image/svg+xml" })
                  const url = URL.createObjectURL(blob)
                  setCropImageSrc(url)
                } else {
                  setCropImageSrc(result)
                }
              }
              reader.readAsDataURL(file)
            }} />
          </label>
<div className="flex gap-3 mt-1.5">
            {walletLogoUrl && walletLogoUrl !== "/taply-wallet-logo.png" && (
              <button onClick={() => setWalletLogoUrl("/taply-wallet-logo.png")} className="text-xs text-gray-400 hover:text-gray-600 transition">
                Use Taply logo
              </button>
            )}
            {walletLogoUrl && (
              <button onClick={() => setWalletLogoUrl(null)} className="text-xs text-red-400 hover:text-red-500 transition">
                Remove logo
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

</motion.div>

  </>
)}
   
{/* QUICK ACTIONS */}
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-3 tracking-tight">Quick Actions</h2>

  <div className="grid grid-cols-2 gap-3">
    {[
      {
        icon: <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><QrCode size={27} className="text-blue-600" /></div>,
label: "QR Code",
        isPro: true,
        arrowColor: "text-blue-600",
        onClick: () => {
          const active = profiles.find(p => p.is_active);
          if (active) handleShowQR(active.username);
          else alert("Set a profile as Active first!");
        },
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><Link size={27} className="text-green-600" /></div>,
        label: "Copy Link",
        arrowColor: "text-green-600",
        onClick: () => {
          if (!mounted) return;
          navigator.clipboard.writeText(`${window.location.origin}/${username}`);
          alert("Link copied!");
        },
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"><Share2 size={27} className="text-orange-500" /></div>,
        label: "Share",
        arrowColor: "text-orange-500",
        onClick: () => {
          if (!mounted) return;
          if (navigator.share) {
            navigator.share({
              title: `${userName}'s Taply`,
              text: "Check out my digital card!",
              url: `${window.location.origin}/${username}`,
            });
          } else {
            navigator.clipboard.writeText(`${window.location.origin}/${username}`);
            alert("Link copied!");
          }
        },
      },
      {
        icon: <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><QrCode size={27} className="text-purple-500" /></div>,
        label: "Tap Mode",
        arrowColor: "text-purple-500",
        onClick: () => { if (!mounted) return; window.open(`/${username}`, "_blank"); },
      },
    ].map(({ icon, label, arrowColor, onClick, isPro }) => (
      <motion.div
        key={label}
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -3 }}
        onClick={onClick}
        className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col gap-3 h-[150px] cursor-pointer relative"
      >
        {isPro && ready && subscriptionTier !== "pro" && (
          <span className="absolute top-3 right-3 text-[11px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full tracking-wide">PRO</span>
        )}
        <div className="flex-1 flex flex-col justify-between">
          {icon}
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-semibold text-gray-900 tracking-tight">{label}</p>
            <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${arrowColor}`} style={{ background: arrowColor.replace("text-", "").replace("blue-600","#eff6ff").replace("green-600","#f0fdf4").replace("orange-500","#fff7ed").replace("purple-500","#faf5ff") }}>→</span>
          </div>
        </div>
      </motion.div>
    ))}
    
  </div>
  




</div>

    {showTutorial && <DashboardTutorial onComplete={() => {
  setShowTutorial(false)
  const profileCardDone = localStorage.getItem("taply_profile_card_tutorial_done")
  if (profiles.length > 0 && !profileCardDone) setTimeout(() => setShowProfileCardTutorial(true), 400)
}} />}
{showProfileCardTutorial && <ProfileCardTutorial onComplete={() => setShowProfileCardTutorial(false)} />}

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

{photoCropImageSrc && (
  <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center px-4">
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm">
      <div className="relative w-full h-64 bg-gray-900">
        <Cropper
          image={photoCropImageSrc}
          crop={photoCrop}
          zoom={photoZoom}
          aspect={1}
          cropShape="round"
          onCropChange={setPhotoCrop}
          onZoomChange={setPhotoZoom}
          onCropComplete={(_, croppedPixels) => setPhotoCroppedAreaPixels(croppedPixels)}
        />
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-500 text-center">Drag to reposition, pinch to zoom</p>
        <input type="range" min={1} max={3} step={0.1} value={photoZoom}
          onChange={(e) => setPhotoZoom(Number(e.target.value))}
          className="w-full" />
        <div className="flex gap-2">
          <button onClick={() => setPhotoCropImageSrc(null)}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium">
            Cancel
          </button>
          <button
            onClick={async () => {
              const image = new Image()
              image.crossOrigin = "anonymous"
              image.src = photoCropImageSrc
              await new Promise(r => image.onload = r)
              const canvas = document.createElement("canvas")
              canvas.width = 240
              canvas.height = 240
              const ctx = canvas.getContext("2d")
              ctx.drawImage(image,
                photoCroppedAreaPixels.x, photoCroppedAreaPixels.y,
                photoCroppedAreaPixels.width, photoCroppedAreaPixels.height,
                0, 0, 240, 240
              )
              canvas.toBlob(async (blob) => {
                const { data: userData } = await supabase.auth.getUser()
                const fileName = `wallet-photo-${userData.user.id}-${Date.now()}.png`
                const { error } = await supabase.storage.from("avatars").upload(fileName, blob)
                if (error) return
                const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)
                setWalletPhotoUrl(data.publicUrl)
                setPhotoCropImageSrc(null)
              }, "image/png")
            }}
            className="flex-1 py-3 rounded-2xl bg-black text-white text-sm font-medium">
            Use this crop
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{cropImageSrc && (
  <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center px-4">
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm">
      <div className="relative w-full h-64 bg-gray-900">
        <Cropper
          image={cropImageSrc}
          crop={crop}
          zoom={zoom}
          aspect={3 / 1}

          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
        />
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-500 text-center">Pinch or scroll to zoom, drag to reposition</p>
        <input type="range" min={1} max={3} step={0.1} value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full" />
        <div className="flex gap-2">
          <button onClick={() => setCropImageSrc(null)}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium">
            Cancel
          </button>
          <button
            onClick={async () => {
              const image = new Image()
              image.crossOrigin = "anonymous"
              image.src = cropImageSrc
              await new Promise((resolve, reject) => {
                image.onload = resolve
                image.onerror = reject
              })
              const offscreen = document.createElement("canvas")
              offscreen.width = image.naturalWidth || 1200
              offscreen.height = image.naturalHeight || 400
              const octx = offscreen.getContext("2d")
              octx.drawImage(image, 0, 0)
              const pngSrc = offscreen.toDataURL("image/png")
              const pngImage = new Image()
              pngImage.src = pngSrc
              await new Promise(r => pngImage.onload = r)
              const canvas = document.createElement("canvas")
              canvas.width = 900
              canvas.height = 300
              const ctx = canvas.getContext("2d")
              ctx.drawImage(pngImage,
                croppedAreaPixels.x, croppedAreaPixels.y,
                croppedAreaPixels.width, croppedAreaPixels.height,
                0, 0, 900, 300
              )
              canvas.toBlob(async (blob) => {
                const { data: userData } = await supabase.auth.getUser()
                const fileName = `wallet-logo-${userData.user.id}-${Date.now()}.png`
                const { error } = await supabase.storage.from("avatars").upload(fileName, blob)
                if (error) return
                const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)
                setWalletLogoUrl(data.publicUrl)
                setCropImageSrc(null)
              }, "image/png")
            }}
            className="flex-1 py-3 rounded-2xl bg-black text-white text-sm font-medium">
            Use this crop
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    <UpgradeModal
      open={upgradeModalOpen}
      onClose={() => setUpgradeModalOpen(false)}
      title="Upgrade to add more profiles"
      description="Free plans include 1 profile. Upgrade to Pro for up to 4 profiles across all modes."
    />

  </div>
  );
}
