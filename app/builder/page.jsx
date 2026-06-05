"use client";

import React, { Suspense } from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
// Layouts
import BusinessLayout from "@/components/layouts/BusinessLayout.jsx";
import UniversityLayout from "@/components/layouts/UniversityLayout.jsx";
import SocialLayout from "@/components/layouts/SocialLayout.jsx";
import NetworkingLayout from "@/components/layouts/NetworkingLayout.jsx";
import ExecutiveLayout from "@/components/layouts/ExecutiveLayout.jsx";
import ModernLayout from "@/components/layouts/ModernLayout.jsx";
import MinimalLayout from "@/components/layouts/MinimalLayout.jsx";
import { useSearchParams } from "next/navigation";
import BuilderTutorial from "@/components/BuilderTutorial"

function BuilderPageInner() {
  const [avatarUrl, setAvatarUrl] = useState(null);
const [bannerUrl, setBannerUrl] = useState(null);
  // -----------------------------
  // BASIC PROFILE FIELDS}
  // -----------------------------
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false)
const [saveSuccess, setSaveSuccess] = useState(false)
const [saveError, setSaveError] = useState(null)
const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
const [fontFamily, setFontFamily] = useState("system-ui");
const [fontSize, setFontSize] = useState(100);
const [titleSize, setTitleSize] = useState(100);
const [buttonSize, setButtonSize] = useState(100);
const [uniContentSize, setUniContentSize] = useState(100);
const [uniBioSize, setUniBioSize] = useState(100);
const [uniStatsSize, setUniStatsSize] = useState(100);
const [uniAvatarSize, setUniAvatarSize] = useState(80);
const [netAvatarSize, setNetAvatarSize] = useState(208);
const [netNameSize, setNetNameSize] = useState(100);
const [netTitleSize, setNetTitleSize] = useState(100);
const [netContactSize, setNetContactSize] = useState(100);
const [netActionSize, setNetActionSize] = useState(100);
const [netButtonSize, setNetButtonSize] = useState(100);
const [socialNameSize, setSocialNameSize] = useState(100);
const [socialTitleSize, setSocialTitleSize] = useState(100);
const [socialIconSize, setSocialIconSize] = useState(100);
const [socialLinkSize, setSocialLinkSize] = useState(100);
const [socialProductSize, setSocialProductSize] = useState(100);
const [socialAvatarSize, setSocialAvatarSize] = useState(170);
const [minNameSize, setMinNameSize] = useState(100);
const [minTitleSize, setMinTitleSize] = useState(100);
const [minContactSize, setMinContactSize] = useState(100);const [execAvatarSize, setExecAvatarSize] = useState(100);
const [execSaveSize, setExecSaveSize] = useState(100);
const [execContactSize, setExecContactSize] = useState(100);const [networkingBackground, setNetworkingBackground] = useState("#f3f4f6");
const [networkingNameColor, setNetworkingNameColor] = useState("#000000");
const [networkingTitleColor, setNetworkingTitleColor] = useState("#6b7280");
const [businessNameColor, setBusinessNameColor] = useState("#000000");
const [businessTitleColor, setBusinessTitleColor] = useState("#6b7280");
const [universityNameColor, setUniversityNameColor] = useState("#000000");
const [universityTitleColor, setUniversityTitleColor] = useState("#6b7280");
const [socialNameColor, setSocialNameColor] = useState("#000000");
const [socialTitleColor2, setSocialTitleColor2] = useState("#6b7280");
const [username, setUsername] = useState(null)
const [loadingProfile, setLoadingProfile] = useState(true);
// ==============================
// IMAGE POSITIONING STATE
// ==============================
// BUSINESS
const [businessScale, setBusinessScale] = useState(1);
const [businessPos, setBusinessPos] = useState({ x: 0, y: 0 });

// NETWORKING
const [networkingScale, setNetworkingScale] = useState(1);
const [networkingPos, setNetworkingPos] = useState({ x: 0, y: 0 });
const [bannerScale, setBannerScale] = useState(1);
const [bannerPos, setBannerPos] = useState({ x: 0, y: 0 });
const [showModePanel, setShowModePanel] = useState(false);
const searchParams = useSearchParams();
const profileId = searchParams.get("id");
const urlMode = searchParams.get("mode");// 🔥 NEW LAYOUT STATE

  // -----------------------------
  // DYNAMIC OPTIONAL FIELDS
  // -----------------------------
const [fields, setFields] = useState({
  phone: false,
  email: false,
  linkedin: false,
  instagram: false,
  website: false,
  bio: false,
});
const router = useRouter()
const handleLogout = async () => {
  await supabase.auth.signOut()
  router.replace("/login")
}
useEffect(() => {
  const loadProfile = async () => {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData?.user) {
      router.replace("/login")
      return
    }
let data = null;

if (profileId) {
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  data = existingProfile;
}
console.log("PROFILE DATA:", data)
    // If profile doesn't exist → create one


if (!data && !profileId) {
if (urlMode) setMode(urlMode);
setFields({
  phone: false,
  email: false,
  linkedin: false,
  instagram: false,
  website: false,
  bio: false,
});

  setFieldValues({
    phone: "",
    email: "",
    linkedin: "",
    location: "",
    instagram: "",
website: "",    bio: "",
    social_icons: {},
    social_links: [],
    uni_bio: "",
    uni_gpa: "",
    uni_grad_year: "",
    uni_projects: [],
    buttons: []
  });

  setLoadingProfile(false);
  return;
}

// NETWORKING
// BUSINESS / MINIMAL
setBusinessScale(data.avatar_scale ?? 1);
setBusinessPos({
  x: data.avatar_x ?? 0,
  y: data.avatar_y ?? 0,
});

// NETWORKING
setNetworkingScale(data.networking_scale ?? 1);
setNetworkingPos({
  x: data.networking_x ?? 0,
  y: data.networking_y ?? 0,
});
setUsername(data.username)
setBannerScale(data.banner_scale ?? 1);
setBannerPos({
  x: data.banner_x ?? 0,
  y: data.banner_y ?? 0,
});
setLoadingProfile(false);// 🔥 LOAD EVERYTHING BACK INTO STATE

setName(data.name || "");
setTitle(data.title || "");

setFields(data.fields || {
  phone: false,
  email: false,
  linkedin: false,
  instagram: false,
  website: false,
  bio: false,
});

setFieldValues(data.field_values || {
  phone: "",
  email: "",
  linkedin: "",
  instagram: "",
website: "taply.now",  bio: "",
  buttons: []
});
if (data.field_values?.buttons) {
  const cleaned = data.field_values.buttons.filter(b => b !== null && b !== undefined && (b.title || b.url || b.image));
  setFieldValues(prev => ({ ...prev, buttons: cleaned }));
}
setMode(data.mode || "business");
setLayout(data.layout || "executive");

if (data.sizes) {
  const s = data.sizes;
  if (s.fontSize) setFontSize(s.fontSize);
  if (s.titleSize) setTitleSize(s.titleSize);
  if (s.buttonSize) setButtonSize(s.buttonSize);
  if (s.uniContentSize) setUniContentSize(s.uniContentSize);
  if (s.uniBioSize) setUniBioSize(s.uniBioSize);
  if (s.uniStatsSize) setUniStatsSize(s.uniStatsSize);
  if (s.uniAvatarSize) setUniAvatarSize(s.uniAvatarSize);
  if (s.netAvatarSize) setNetAvatarSize(s.netAvatarSize);
  if (s.netNameSize) setNetNameSize(s.netNameSize);
  if (s.netTitleSize) setNetTitleSize(s.netTitleSize);
  if (s.netContactSize) setNetContactSize(s.netContactSize);
  if (s.netActionSize) setNetActionSize(s.netActionSize);
  if (s.netButtonSize) setNetButtonSize(s.netButtonSize);
  if (s.socialNameSize) setSocialNameSize(s.socialNameSize);
  if (s.socialTitleSize) setSocialTitleSize(s.socialTitleSize);
  if (s.socialIconSize) setSocialIconSize(s.socialIconSize);
  if (s.socialLinkSize) setSocialLinkSize(s.socialLinkSize);
  if (s.socialProductSize) setSocialProductSize(s.socialProductSize);
  if (s.socialAvatarSize) setSocialAvatarSize(s.socialAvatarSize);
  if (s.minNameSize) setMinNameSize(s.minNameSize);
  if (s.minTitleSize) setMinTitleSize(s.minTitleSize);
  if (s.minContactSize) setMinContactSize(s.minContactSize);
  if (s.execAvatarSize) setExecAvatarSize(s.execAvatarSize);
  if (s.execSaveSize) setExecSaveSize(s.execSaveSize);
  if (s.execContactSize) setExecContactSize(s.execContactSize);
  if (s.fontFamily) setFontFamily(s.fontFamily);
}

setBackgroundColor(data.bg_color || "#f3f4f6");
setNetworkingBackground(data.networking_bg || "#f3f4f6");
setNetworkingNameColor(data.networking_name_color || "#000000");
setNetworkingTitleColor(data.networking_title_color || "#6b7280");
setBusinessNameColor(data.business_name_color || "#000000");
setBusinessTitleColor(data.business_title_color || "#6b7280");
setUniversityNameColor(data.university_name_color || "#000000");
setUniversityTitleColor(data.university_title_color || "#6b7280");
setSocialNameColor(data.social_name_color || "#000000");
setSocialTitleColor2(data.social_title_color || "#6b7280");
setAvatarUrl(data.avatar_url || null);
setBannerUrl(data.banner_url || null);

setNetworkingScale(data.networking_scale ?? 1);
setNetworkingPos({
  x: data.networking_x ?? 0,
  y: data.networking_y ?? 0,
});

setBannerScale(data.banner_scale ?? 1);
setBannerPos({
  x: data.banner_x ?? 0,
  y: data.banner_y ?? 0,
});

setUsername(data.username);

setLoadingProfile(false);
  }
  loadProfile()
}, [router, profileId])

const [fieldValues, setFieldValues] = useState({
  phone: "",
  email: "",
  linkedin: "",
  location: "taply, headquarters",
  instagram: "",
website: "taply.now",  bio: "",
  social_icons: {
    instagram: "taplygram",
    tiktok: "taply.now",
    twitter: "taplytwitter",
    youtube: "tapltube",
  },
  social_links: [
    { title: "Taply", url: "taply.now", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iMTIwIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiByeD0iMCIgZmlsbD0iIzFhMWEyZSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjI2IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC4yNSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE5IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC40NSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC43Ii8+CiAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNSIgZmlsbD0id2hpdGUiLz4KICA8dGV4dCB4PSI2NiIgeT0iMzgiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iLTAuNSI+dGFwbHk8L3RleHQ+Cjwvc3ZnPgo=" },
    { title: "Taply", url: "taply.now", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iMTIwIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiByeD0iMCIgZmlsbD0iIzFhMWEyZSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjI2IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC4yNSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE5IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC40NSIvPgogIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgb3BhY2l0eT0iMC43Ii8+CiAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNSIgZmlsbD0id2hpdGUiLz4KICA8dGV4dCB4PSI2NiIgeT0iMzgiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iLTAuNSI+dGFwbHk8L3RleHQ+Cjwvc3ZnPgo=" },
  ],
  uni_bio: "",
  uni_gpa: "3.8",
  uni_grad_year: "2026",
  uni_projects: [
    { title: "Add Your Project", subtitle: "Subtitle To Your Project", desc: "", url: "https://taply.now" },
  ],
buttons: []
});
const handleSave = async () => {
  setSaving(true)
  setSaveSuccess(false)

  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) return





let error = null;

if (profileId) {
  // 🔁 UPDATE EXISTING PROFILE
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
    


      name,
      title,
      mode,
      layout,
      fields,
      field_values: fieldValues,

      bg_color: backgroundColor,
networking_bg: networkingBackground,
networking_name_color: networkingNameColor,
networking_title_color: networkingTitleColor,
business_name_color: businessNameColor,
business_title_color: businessTitleColor,
university_name_color: universityNameColor,
university_title_color: universityTitleColor,
social_name_color: socialNameColor,
social_title_color: socialTitleColor2,

      avatar_url: avatarUrl,
      banner_url: bannerUrl,

// BUSINESS
avatar_scale: businessScale,
avatar_x: businessPos.x,
avatar_y: businessPos.y,

// NETWORKING
networking_scale: networkingScale,
networking_x: networkingPos.x,
networking_y: networkingPos.y,

      banner_scale: bannerScale,
      banner_x: bannerPos.x,
      banner_y: bannerPos.y,
      sizes: { fontSize, titleSize, buttonSize, uniContentSize, uniBioSize, uniStatsSize, uniAvatarSize, netAvatarSize, netNameSize, netTitleSize, netContactSize, netActionSize, netButtonSize, socialNameSize, socialTitleSize, socialIconSize, socialLinkSize, socialProductSize, socialAvatarSize, minNameSize, minTitleSize, minContactSize, execAvatarSize, execSaveSize, execContactSize, fontFamily },
    })
    .eq("id", profileId);

  error = updateError;

} else {
  // 🆕 CREATE NEW PROFILE — only if user explicitly came to create
  if (!name.trim() && !title.trim()) {
setSaving(false)
setSaveError("Please fill in your name before saving.")
return

  }
  const { data: existingProfiles } = await supabase
  .from("profiles")              
  .select("id")
  .eq("user_id", userData.user.id);

const shouldBeActive = existingProfiles.length === 0;
  const { error: insertError } = await supabase
    .from("profiles")
    .insert({



      user_id: userData.user.id,

      is_active: shouldBeActive,


username: userData.user.user_metadata?.username || 
                userData.user.user_metadata?.preferred_username ||
                userData.user.email?.split("@")[0],
      name,
      title,
      mode,
      layout,
      fields,
      field_values: fieldValues,

bg_color: backgroundColor,
networking_bg: networkingBackground,
networking_name_color: networkingNameColor,
networking_title_color: networkingTitleColor,
business_name_color: businessNameColor,
business_title_color: businessTitleColor,
university_name_color: universityNameColor,
university_title_color: universityTitleColor,
social_name_color: socialNameColor,
social_title_color: socialTitleColor2,

      avatar_url: avatarUrl,
      banner_url: bannerUrl,

// BUSINESS
avatar_scale: businessScale,
avatar_x: businessPos.x,
avatar_y: businessPos.y,

// NETWORKING
networking_scale: networkingScale,
networking_x: networkingPos.x,
networking_y: networkingPos.y,

      banner_scale: bannerScale,
      banner_x: bannerPos.x,
      banner_y: bannerPos.y,
      sizes: { fontSize, titleSize, buttonSize, uniContentSize, uniBioSize, uniStatsSize, uniAvatarSize, netAvatarSize, netNameSize, netTitleSize, netContactSize, netActionSize, netButtonSize, socialNameSize, socialTitleSize, socialIconSize, socialLinkSize, socialProductSize, socialAvatarSize, minNameSize, minTitleSize, minContactSize, execAvatarSize, execSaveSize, execContactSize, fontFamily },
    });

  error = insertError;
}

  setSaving(false)

  if (error) {
   setSaveError("Save failed. Please try again.")
    console.log(error)
} else {
  setSaveSuccess(true)

  setTimeout(() => {
    router.push("/dashboard")
  }, 2000)
}
}
  const [lastAddedField, setLastAddedField] = useState(null);
  const inputRefs = useRef({});
const avatarMenuRef = useRef(null)
  // -----------------------------
  // EDIT MODE
  // -----------------------------
  const [isEditing, setIsEditing] = useState(true);

  // -----------------------------
  // ACTIVE MODE
  // -----------------------------
  const [mode, setMode] = useState("business");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
const [layout, setLayout] = useState(urlMode === "social" ? "circle" : "executive");const [runTutorial, setRunTutorial] = useState(false);
const [showBuilderTutorial, setShowBuilderTutorial] = useState(false)
const tutorialMode = urlMode || "business"
  // -----------------------------
  // SIDEBAR VISIBILITY
  // -----------------------------
  const [panelOpen, setPanelOpen] = useState(
  typeof window !== "undefined" ? window.innerWidth < 768 : true
);
const [studioOpen, setStudioOpen] = useState(false);
const [studioHeight, setStudioHeight] = useState(60);
const dragStartY = useRef(null);
const dragStartHeight = useRef(null);
const handleDragStart = (e) => {
  dragStartY.current = e.touches?.[0]?.clientY ?? e.clientY;
  dragStartHeight.current = studioHeight;
};

const handleDrag = (e) => {
  const clientY = e.touches?.[0]?.clientY ?? e.clientY;
  const delta = dragStartY.current - clientY;
  const newHeight = Math.min(90, Math.max(30, dragStartHeight.current + (delta / window.innerHeight) * 100));
  setStudioHeight(newHeight);
};
useEffect(() => {
  if (!profileId) {
    setStudioOpen(true);
    const done = localStorage.getItem(`taply_tutorial_done_${urlMode || "business"}`);
    if (!done) setTimeout(() => setShowBuilderTutorial(true), 1000);
  }
}, [profileId]);
const [activeTab, setActiveTab] = useState("layout");
const [openMode, setOpenMode] = useState(null);
const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
const [openSections, setOpenSections] = useState({
  modes: true, profiles: false,
  identity: false, contact: false, buttons: false,
  socialIcons: false, links: false, products: false,
  academic: false, resume: false, projects: false,
});
const [uniDesignOpen, setUniDesignOpen] = useState({ bg: false, colors: false, font: false, size: false });
const [uniBgType, setUniBgType] = useState("solid");
const toggleUD = (k) => setUniDesignOpen(p => ({ ...p, [k]: !p[k] }));

const [bizDesignOpen, setBizDesignOpen] = useState({ bg: false, colors: false, font: false, size: false });
const [bizBgType, setBizBgType] = useState("solid");
const toggleBD = (k) => setBizDesignOpen(p => ({ ...p, [k]: !p[k] }));

const [socDesignOpen, setSocDesignOpen] = useState({ bg: false, colors: false, font: false, size: false });
const toggleSD = (k) => setSocDesignOpen(p => ({ ...p, [k]: !p[k] }));

const [netDesignOpen, setNetDesignOpen] = useState({ bg: false, colors: false, font: false, size: false });
const [netBgType, setNetBgType] = useState("solid");
const toggleND = (k) => setNetDesignOpen(p => ({ ...p, [k]: !p[k] }));
const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  // -----------------------------
  // FIELD HANDLERS
  // -----------------------------
// ==========================
// AVATAR UPLOAD
// ==========================
const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;

  const fileExt = file.name.split(".").pop();
  const fileName = `${userData.user.id}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    console.log(error);
    return;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  setAvatarUrl(data.publicUrl);
  await supabase
  .from("profiles")
  .update({ avatar_url: data.publicUrl })
 .eq("id", profileId)
.eq("user_id", userData.user.id);
};

// ==========================
// BANNER UPLOAD
// ==========================
const handleBannerUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return;

  const fileExt = file.name.split(".").pop();
  const fileName = `${userData.user.id}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("banners")
    .upload(fileName, file);

  if (error) {
    console.log(error);
    return;
  }

  const { data } = supabase.storage
    .from("banners")
    .getPublicUrl(fileName);

  setBannerUrl(data.publicUrl);
  await supabase
  .from("profiles")
  .update({ banner_url: data.publicUrl })
  .eq("id", profileId);
};

  useEffect(() => {
    if (lastAddedField && inputRefs.current[lastAddedField]) {
      inputRefs.current[lastAddedField].focus();
      setLastAddedField(null);
    }
  }, [lastAddedField]);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      avatarMenuRef.current &&
      !avatarMenuRef.current.contains(event.target)
    ) {
      setAvatarMenuOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [])
useEffect(() => {
  const seen = localStorage.getItem("taplyTutorialSeen");

  if (!seen) {

    const startTutorial = () => {
      const visualStudio = document.querySelector(".visual-studio");

      if (!visualStudio) {
        setTimeout(startTutorial, 200);
        return;
      }

   const driverObj = driver({
  showProgress: true,

  onDestroyed: () => {
    document.querySelector("button")?.click();
  },

  steps: [
          {
            element: ".edit-toggle",
            popover: {
              title: "Edit Mode",
              description: "Switch between Edit and Preview here.",
              side: "bottom"
            }
          },
          {
            element: ".sidebar-panel",
            popover: {
              title: "Control Panel",
              description: "Customize your Taply profile here.",
              side: "right"
            }
          },
          {
            element: ".visual-studio",
            popover: {
              title: "Contact Fields",
              description: "This is your Visual Studio. Add phone, email, social links, and more here.",
              side: "right"
            }
          },
          {
            element: ".save-profile",
            popover: {
              title: "Save Profile",
              description: "Click here to save your changes.",
              side: "right"
            }
          }
        ]
      });

      driverObj.drive();
      localStorage.setItem("taplyTutorialSeen", "true");
    };

    startTutorial();
  }
}, []);
  // -----------------------------
  // MODES
  // -----------------------------
  const MODES = [
    { id: "business", label: "Business Mode" },
    { id: "university", label: "University Mode" },
    { id: "social", label: "Social Mode" },
    { id: "networking", label: "Networking Mode" },
  ];

  // -----------------------------
  // LAYOUT PROPS
  // -----------------------------
const layoutProps = {
    name: name || "Your Name",
    title: title || "Your Title / Position",
    isEditing,
    fields,
    fieldValues,
    fontFamily,
    fontSize,
    titleSize,
    buttonSize,
uniContentSize,
    uniBioSize,
    uniStatsSize,
    uniAvatarSize,
    execAvatarSize,
    execSaveSize,
    execContactSize,
    netAvatarSize,
    netNameSize,
    netTitleSize,
    netContactSize,
    netActionSize,
    netButtonSize,
    socialNameSize,
    socialTitleSize,
    socialIconSize,
    socialLinkSize,
    socialProductSize,
    socialAvatarSize,
    minNameSize,
    minTitleSize,
    minContactSize,
  };
const addField = (field) => {
  setFields((prev) => ({
    ...prev,
    [field]: true,
  }));
};

const removeField = (field) => {
  setFields((prev) => ({
    ...prev,
    [field]: false,
  }));
};

const updateField = (field, value) => {
  setFieldValues((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const renderLayout = () => {
    switch (mode) {
      case "business":
  return (
<BusinessLayout key="business-layout"
  {...layoutProps}
  layout={layout}
  setLayout={setLayout}
  backgroundColor={backgroundColor}
  setBackgroundColor={setBackgroundColor}
  avatarUrl={avatarUrl}
  bannerUrl={bannerUrl}
  handleAvatarUpload={handleAvatarUpload}
  handleBannerUpload={handleBannerUpload}
  addField={addField}
  removeField={removeField}
profileScale={businessScale}
setProfileScale={setBusinessScale}
profilePos={businessPos}
setProfilePos={setBusinessPos}
  bannerScale={bannerScale}
  setBannerScale={setBannerScale}
  bannerPos={bannerPos}
  setBannerPos={setBannerPos}
  nameColor={businessNameColor}
  titleColor={businessTitleColor}
/>
  );
case "university":
  return (
    <UniversityLayout
      {...layoutProps}
      profileImage={avatarUrl}
      handleProfileUpload={handleAvatarUpload}
      backgroundColor={backgroundColor}
      setFieldValues={setFieldValues}
      nameColor={universityNameColor}
      titleColor={universityTitleColor}
    />
  );
case "social":
  return (
    <SocialLayout
      {...layoutProps}
      profileImage={avatarUrl}
      handleProfileUpload={handleAvatarUpload}
      profileScale={businessScale}
      setProfileScale={setBusinessScale}
      profilePos={businessPos}
      setProfilePos={setBusinessPos}
      backgroundColor={backgroundColor}
      setFieldValues={setFieldValues}
      layout={layout}
      nameColor={socialNameColor}
      titleColor={socialTitleColor2}
      socialNameSize={socialNameSize}
      socialTitleSize={socialTitleSize}
      socialIconSize={socialIconSize}
      socialLinkSize={socialLinkSize}
      socialProductSize={socialProductSize}
      socialAvatarSize={socialAvatarSize}
    />
  );
case "networking":
  return (
<NetworkingLayout
  {...layoutProps}
  layout={layout}
  backgroundColor={networkingBackground}
  nameColor={networkingNameColor}
  titleColor={networkingTitleColor}
  setBackgroundColor={setNetworkingBackground}
  profileImage={avatarUrl}
  handleProfileUpload={handleAvatarUpload}
  fieldValues={fieldValues}
  setFieldValues={setFieldValues}

profileScale={networkingScale}
setProfileScale={setNetworkingScale}
profilePos={networkingPos}
setProfilePos={setNetworkingPos}
/>
  );

  
      default:
        return null;
    }
  };
;
  const PLACEHOLDERS = {
    phone: "Phone number",
    email: "Email address",
    linkedin: "LinkedIn URL",
    instagram: "Instagram username",
    website: "Website URL",
    bio: "Short bio",
  };
if (showTemplatePicker) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-2 gap-4 max-w-md w-full p-6">

        {[
          { id: "business", label: "Business" },
          { id: "social", label: "Social" },
          { id: "university", label: "University" },
          { id: "networking", label: "Networking" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setMode(item.id);
              setShowTemplatePicker(false);
            }}
            className="p-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-left"
          >
            <p className="font-semibold">{item.label}</p>
            <p className="text-xs text-gray-500 mt-1">
              Tap to start
            </p>
          </button>
        ))}

      </div>
    </div>
  );
}
if (loadingProfile) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
return (
  
  <div className="w-full min-h-screen flex justify-center relative">
{saveError && (
  <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-medium whitespace-nowrap">
    {saveError}
  </div>
)}
{/* FLOATING BACK BUTTON */}
{isEditing && (
  <button
    onClick={() => router.push(profileId ? "/dashboard" : "/create")}
    className="
      fixed
      top-5
      left-5
      z-50
      bg-white/90
      backdrop-blur
      border
      border-gray-200
      shadow-lg
      px-4
      py-2
      rounded-full
      text-sm
      font-medium
      hover:scale-105
      active:scale-95
      transition
    "
  >
    ← Back
  </button>
)}

{/* FLOATING SAVE BUTTON */}
{isEditing && (
  <button
    data-tutorial="save-btn"
    onClick={handleSave}
    className="
      fixed
      top-5
      right-5
      z-50
      bg-black
      text-white
      shadow-xl
      px-5
      py-2
      rounded-full
      text-sm
      font-medium
      hover:scale-105
      active:scale-95
      transition
    "
  >
    {saving ? "Saving..." : "Save"}
  </button>
)}

{/* FLOATING PREVIEW BUTTON */}
{isEditing && (
  <button
    onClick={() => setIsEditing(false)}
    className="
      fixed
      top-5
      right-28
      z-50
      bg-white/90
      backdrop-blur
      border
      border-gray-200
      shadow-lg
      px-4
      py-2
      rounded-full
      text-sm
      font-medium
      hover:scale-105
      active:scale-95
      transition
    "
  >
    Preview
  </button>
)}

{/* FLOATING EDIT BUTTON IN PREVIEW */}
{!isEditing && (
  <button
    onClick={() => setIsEditing(true)}
    className="
      fixed
      top-5
      right-5
      z-50
      bg-black
      text-white
      shadow-xl
      px-5
      py-2
      rounded-full
      text-sm
      font-medium
      hover:scale-105
      active:scale-95
      transition
    "
  >
    Edit
  </button>
)}



<button
  onClick={() => setStudioOpen(true)}
  className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white px-5 py-2 rounded-full shadow-md text-sm font-medium"
>
  Visuals Studio
</button>

    {/* RIGHT DISPLAY */}
    <div
  className="w-full max-w-4xl flex justify-center"
  style={{
    paddingBottom: studioOpen ? `${studioHeight + 0}vh` : "0px",
    transition: "padding-bottom 0.3s ease"
  }}
>
<AnimatePresence mode="wait">
  <motion.div
    key={mode + layout} // 🔥 IMPORTANT
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25 }}
   className="w-full max-w-3xl" data-tutorial="preview"
  >
    {renderLayout()}
  </motion.div>
</AnimatePresence>

<button
  onClick={() => setStudioOpen(!studioOpen)}
  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-t-lg shadow text-sm font-medium border border-gray-200"
>
  {studioOpen ? "Close Studio" : "Visuals Studio"}
</button>
    </div>
<AnimatePresence>
{studioOpen && (
  <motion.div key="studio-panel"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-50 flex flex-col overflow-hidden touch-pan-y"
style={{ height: `${studioHeight}vh`, marginTop: "80px" }}
    >
{/* DRAG HANDLE */}
<div
  className="w-full flex justify-center pt-3 pb-1 cursor-row-resize touch-none"
  onMouseDown={handleDragStart}
  onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
  onTouchStart={handleDragStart}
  onTouchMove={handleDrag}
>
  <div className="w-10 h-1 bg-gray-300 rounded-full" />
</div>

{/* HEADER */}
<div className="flex justify-between items-center px-4 pb-3 border-b">
  <h2 className="font-semibold">Visuals Studio</h2>
  <button onClick={() => setStudioOpen(false)}>Close</button>
</div>

      {/* TABS */}
<div className="flex gap-3 px-4 py-3 border-b">
        {["layout", "content", "design"].map((tab) => (
          <button
            key={tab}
            data-tutorial={tab === "content" ? "content-tab" : tab === "design" ? "design-tab" : undefined}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-base font-medium ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
<div
  className="p-4 flex-1 overflow-y-auto min-h-0"
  style={{
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain"
  }}
>
  
      {/* DESIGN TAB */}
{activeTab === "design" && (
  <div className="space-y-6 pb-20">

{/* BUSINESS MODE DESIGN */}
{mode === "business" && (
  <div className="space-y-3 pb-20">

    {/* BACKGROUND */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleBD("bg")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <span className="text-base font-semibold text-gray-900">Background</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${bizDesignOpen.bg ? "rotate-180" : ""}`} />
      </button>
      {bizDesignOpen.bg && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {layout !== "minimal" && (
            <div className="flex gap-2 mt-3 mb-4">
              {["solid", "diffused"].map(t => (
                <button key={t} onClick={() => setBizBgType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${bizBgType === t ? "bg-white border-gray-900 text-gray-900 border-2" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          )}
          {(bizBgType === "solid" || layout === "minimal") && (
            <div className="grid grid-cols-8 gap-1 mt-3">
              {[
                { label: "Snow", value: "#f3f4f6" },
                { label: "Sky", value: "#dbeafe" },
                { label: "Lavender", value: "#ede9fe" },
                { label: "Blush", value: "#fce7f3" },
                { label: "Mint", value: "#d1fae5" },
                { label: "Cream", value: "#fef9c3" },
                { label: "Slate", value: "#1e293b" },
              ].map(({ label, value }) => (
                <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                  <span className="text-[9px] text-gray-400">{label}</span>
                </button>
              ))}
              <label className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative"
                  style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
                  <span className="text-gray-400 text-base">+</span>
                  <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                </div>
                <span className="text-[9px] text-gray-400">Custom</span>
              </label>
            </div>
          )}
          {bizBgType === "diffused" && layout !== "minimal" && (
            <div className="grid grid-cols-8 gap-1">
              {[
                { label: "Aurora", value: "radial-gradient(ellipse at 30% 40%, #c4b5fd 0%, #93c5fd 40%, #f0fdf4 100%)" },
                { label: "Ocean", value: "radial-gradient(ellipse at 20% 60%, #22d3ee 0%, #67e8f9 50%, #e0f2fe 100%)" },
                { label: "Lilac", value: "radial-gradient(ellipse at 60% 30%, #e0d7ff 0%, #c4b5fd 40%, #f5f3ff 100%)" },
                { label: "Sky", value: "radial-gradient(ellipse at 60% 30%, #bae6fd 0%, #7dd3fc 50%, #e0f2fe 100%)" },
                { label: "Rose", value: "radial-gradient(ellipse at 60% 40%, #fbcfe8 0%, #f9a8d4 50%, #fdf2f8 100%)" },
                { label: "Sage", value: "radial-gradient(ellipse at 30% 50%, #bbf7d0 0%, #86efac 50%, #f0fdf4 100%)" },
                { label: "Honey", value: "radial-gradient(ellipse at 50% 30%, #fde68a 0%, #fcd34d 50%, #fffbeb 100%)" },
                { label: "Peach", value: "radial-gradient(ellipse at 40% 40%, #fed7aa 0%, #fdba74 50%, #fff7ed 100%)" },
                { label: "Indigo", value: "radial-gradient(ellipse at 30% 30%, #a5b4fc 0%, #818cf8 40%, #e0e7ff 100%)" },
                { label: "Teal", value: "radial-gradient(ellipse at 60% 30%, #99f6e4 0%, #5eead4 50%, #f0fdfa 100%)" },
                { label: "Blush", value: "radial-gradient(ellipse at 40% 30%, #fca5a5 0%, #f87171 45%, #fff1f2 100%)" },
              ].map(({ label, value }) => (
                <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                  <span className="text-[9px] text-gray-400">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>

    {/* TEXT COLORS */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleBD("colors")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Text Colors</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${bizDesignOpen.colors ? "rotate-180" : ""}`} />
      </button>
      {bizDesignOpen.colors && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Name</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: businessNameColor }} />
              <span className="text-sm text-gray-500">{businessNameColor}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={businessNameColor} onChange={(e) => setBusinessNameColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Title</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: businessTitleColor }} />
              <span className="text-sm text-gray-500">{businessTitleColor}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={businessTitleColor} onChange={(e) => setBusinessTitleColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
        </div>
      )}
    </div>

    {/* FONT */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleBD("font")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="16" fontWeight="bold" fill="#6b7280">Aa</text></svg></div>
          <span className="text-base font-semibold text-gray-900">Font</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${bizDesignOpen.font ? "rotate-180" : ""}`} />
      </button>
      {bizDesignOpen.font && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "Default", value: "system-ui" },
              { label: "Inter", value: "'Inter', sans-serif" },
              { label: "Poppins", value: "'Poppins', sans-serif" },
              { label: "Playfair", value: "'Playfair Display', serif" },
              { label: "DM Sans", value: "'DM Sans', sans-serif" },
              { label: "Mono", value: "'Courier New', monospace" },
            ].map(({ label, value }) => (
              <button key={label} onClick={() => setFontFamily(value)}
                className={`py-2.5 px-2 rounded-xl border text-sm transition ${fontFamily === value ? "border-black border-2 bg-white font-semibold" : "border-gray-200 bg-white text-gray-600"}`}
                style={{ fontFamily: value }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* CONTENT SIZE */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleBD("size")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Content Size</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${bizDesignOpen.size ? "rotate-180" : ""}`} />
      </button>
      {bizDesignOpen.size && (
        <div className="border-t border-gray-100">
          {(layout === "executive" ? [
            { label: "Profile Photo", value: execAvatarSize, set: setExecAvatarSize, min: 70, max: 150 },
            { label: "Name", value: fontSize, set: setFontSize, min: 70, max: 150 },
            { label: "Title", value: titleSize, set: setTitleSize, min: 70, max: 150 },
            { label: "Save Btn", value: execSaveSize, set: setExecSaveSize, min: 70, max: 150 },
            { label: "Contact", value: execContactSize, set: setExecContactSize, min: 70, max: 150 },
          ] : [
            { label: "Name", value: minNameSize, set: setMinNameSize, min: 70, max: 150 },
            { label: "Title", value: minTitleSize, set: setMinTitleSize, min: 70, max: 150 },
            { label: "Contact", value: minContactSize, set: setMinContactSize, min: 70, max: 150 },
          ]).map(({ label, value, set, min, max }, i, arr) => (
            <div key={label} className={`flex items-center px-4 py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm text-gray-600 flex-1">{label}</span>
              <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
              <span className="w-16 text-center text-sm font-medium text-gray-700">{value}{label === "Profile Photo" ? "px" : "%"}</span>
              <button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}

{/* UNIVERSITY MODE DESIGN */}
{mode === "university" && (
    <div className="space-y-3 pb-20">

      {/* BACKGROUND */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button onClick={() => toggleUD("bg")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
            <span className="text-base font-semibold text-gray-900">Background</span>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${uniDesignOpen.bg ? "rotate-180" : ""}`} />
        </button>
        {uniDesignOpen.bg && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="flex gap-2 mt-3 mb-4">
              {["solid", "diffused"].map(t => (
                <button key={t} onClick={() => setUniBgType(t)}
                  className={`flex-1 py-3 rounded-xl text-base font-medium border transition ${uniBgType === t ? "bg-white border-gray-900 text-gray-900 border-2" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            {uniBgType === "solid" && (
              <div className="grid grid-cols-8 gap-2">
                {[
                  { label: "Snow", value: "#f3f4f6" },
                  { label: "Sky", value: "#dbeafe" },
                  { label: "Lavender", value: "#ede9fe" },
                  { label: "Blush", value: "#fce7f3" },
                  { label: "Mint", value: "#d1fae5" },
                  { label: "Cream", value: "#fef9c3" },
                  { label: "Slate", value: "#1e293b" },
                ].map(({ label, value }) => (
                  <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                    <span className="text-[9px] text-gray-400">{label}</span>
                  </button>
                ))}
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative"
                    style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
                    <span className="text-gray-400 text-base">+</span>
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                  </div>
                  <span className="text-[9px] text-gray-400">Custom</span>
                </label>
              </div>
            )}
            {uniBgType === "diffused" && (
              <div className="grid grid-cols-8 gap-2">
                {[
                  { label: "Aurora", value: "radial-gradient(ellipse at 30% 40%, #c4b5fd 0%, #93c5fd 40%, #f0fdf4 100%)" },
                  { label: "Ocean", value: "radial-gradient(ellipse at 20% 60%, #22d3ee 0%, #67e8f9 50%, #e0f2fe 100%)" },
                  { label: "Lilac", value: "radial-gradient(ellipse at 60% 30%, #e0d7ff 0%, #c4b5fd 40%, #f5f3ff 100%)" },
                  { label: "Sky", value: "radial-gradient(ellipse at 60% 30%, #bae6fd 0%, #7dd3fc 50%, #e0f2fe 100%)" },
                  { label: "Rose", value: "radial-gradient(ellipse at 60% 40%, #fbcfe8 0%, #f9a8d4 50%, #fdf2f8 100%)" },
                  { label: "Sage", value: "radial-gradient(ellipse at 30% 50%, #bbf7d0 0%, #86efac 50%, #f0fdf4 100%)" },
                  { label: "Honey", value: "radial-gradient(ellipse at 50% 30%, #fde68a 0%, #fcd34d 50%, #fffbeb 100%)" },
                  { label: "Peach", value: "radial-gradient(ellipse at 40% 40%, #fed7aa 0%, #fdba74 50%, #fff7ed 100%)" },
                  { label: "Indigo", value: "radial-gradient(ellipse at 30% 30%, #a5b4fc 0%, #818cf8 40%, #e0e7ff 100%)" },
                  { label: "Teal", value: "radial-gradient(ellipse at 60% 30%, #99f6e4 0%, #5eead4 50%, #f0fdfa 100%)" },
                  { label: "Blush", value: "radial-gradient(ellipse at 40% 30%, #fca5a5 0%, #f87171 45%, #fff1f2 100%)" },
                ].map(({ label, value }) => (
                  <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                    <span className="text-[9px] text-gray-400">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* TEXT COLORS */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button onClick={() => toggleUD("colors")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></div>
            <span className="text-base font-semibold text-gray-900">Text Colors</span>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${uniDesignOpen.colors ? "rotate-180" : ""}`} />
        </button>
        {uniDesignOpen.colors && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">Name</span>
              <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">                <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: universityNameColor }} />
                <span className="text-sm text-gray-500">{universityNameColor}</span>
                <ChevronDown size={12} className="text-gray-400" />
                <input type="color" value={universityNameColor} onChange={(e) => setUniversityNameColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
              </label>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">Title</span>
              <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">                <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: universityTitleColor }} />
                <span className="text-sm text-gray-500">{universityTitleColor}</span>
                <ChevronDown size={12} className="text-gray-400" />
                <input type="color" value={universityTitleColor} onChange={(e) => setUniversityTitleColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* FONT */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button onClick={() => toggleUD("font")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="16" fontWeight="bold" fill="#6b7280">Aa</text></svg></div>
            <span className="text-base font-semibold text-gray-900">Font</span>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${uniDesignOpen.font ? "rotate-180" : ""}`} />
        </button>
        {uniDesignOpen.font && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { label: "Default", value: "system-ui" },
                { label: "Inter", value: "'Inter', sans-serif" },
                { label: "Poppins", value: "'Poppins', sans-serif" },
                { label: "Playfair", value: "'Playfair Display', serif" },
                { label: "DM Sans", value: "'DM Sans', sans-serif" },
                { label: "Mono", value: "'Courier New', monospace" },
              ].map(({ label, value }) => (
                <button key={label} onClick={() => setFontFamily(value)}
                  className={`py-2.5 px-2 rounded-xl border text-sm transition ${fontFamily === value ? "border-black border-2 bg-white font-semibold" : "border-gray-200 bg-white text-gray-600"}`}
                  style={{ fontFamily: value }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONTENT SIZE */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button onClick={() => toggleUD("size")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
            <span className="text-base font-semibold text-gray-900">Content Size</span>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${uniDesignOpen.size ? "rotate-180" : ""}`} />
        </button>
        {uniDesignOpen.size && (
          <div className="border-t border-gray-100">
            {[
              { label: "Profile Photo", value: uniAvatarSize, set: setUniAvatarSize, min: 40, max: 150 },
              { label: "Name", value: fontSize, set: setFontSize, min: 70, max: 150 },
              { label: "Title", value: titleSize, set: setTitleSize, min: 70, max: 150 },
              { label: "Bio Text", value: uniBioSize, set: setUniBioSize, min: 70, max: 150 },
              { label: "Stats", value: uniStatsSize, set: setUniStatsSize, min: 70, max: 150 },
              { label: "Contact", value: uniContentSize, set: setUniContentSize, min: 70, max: 150 },
            ].map(({ label, value, set, min, max }, i, arr) => (
              <div key={label} className={`flex items-center px-4 py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm text-gray-600 flex-1">{label}</span>
            <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
<span className="w-16 text-center text-sm font-medium text-gray-700">{value}{label === "Profile Photo" ? "px" : "%"}</span>
<button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
)}

{/* SOCIAL MODE DESIGN */}
{mode === "social" && (
  <div className="space-y-3 pb-20">

    {/* BACKGROUND */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleSD("bg")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <span className="text-base font-semibold text-gray-900">Background</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${socDesignOpen.bg ? "rotate-180" : ""}`} />
      </button>
      {socDesignOpen.bg && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-8 gap-1 mt-3">
            {[
              { label: "Snow", value: "#f3f4f6" },
              { label: "Sky", value: "#dbeafe" },
              { label: "Lavender", value: "#ede9fe" },
              { label: "Blush", value: "#fce7f3" },
              { label: "Mint", value: "#d1fae5" },
              { label: "Cream", value: "#fef9c3" },
              { label: "Slate", value: "#1e293b" },
            ].map(({ label, value }) => (
              <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1">
                <div className={`w-12 h-12 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                <span className="text-[9px] text-gray-400">{label}</span>
              </button>
            ))}
            <label className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative"
                style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
                <span className="text-gray-400 text-base">+</span>
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
              </div>
              <span className="text-[9px] text-gray-400">Custom</span>
            </label>
          </div>
        </div>
      )}
    </div>

    {/* TEXT COLORS */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleSD("colors")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Text Colors</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${socDesignOpen.colors ? "rotate-180" : ""}`} />
      </button>
      {socDesignOpen.colors && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Name</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: socialNameColor }} />
              <span className="text-sm text-gray-500">{socialNameColor}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={socialNameColor} onChange={(e) => setSocialNameColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Title</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: socialTitleColor2 }} />
              <span className="text-sm text-gray-500">{socialTitleColor2}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={socialTitleColor2} onChange={(e) => setSocialTitleColor2(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
        </div>
      )}
    </div>

    {/* FONT */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleSD("font")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="16" fontWeight="bold" fill="#6b7280">Aa</text></svg></div>
          <span className="text-base font-semibold text-gray-900">Font</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${socDesignOpen.font ? "rotate-180" : ""}`} />
      </button>
      {socDesignOpen.font && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "Default", value: "system-ui" },
              { label: "Inter", value: "'Inter', sans-serif" },
              { label: "Poppins", value: "'Poppins', sans-serif" },
              { label: "Playfair", value: "'Playfair Display', serif" },
              { label: "DM Sans", value: "'DM Sans', sans-serif" },
              { label: "Mono", value: "'Courier New', monospace" },
            ].map(({ label, value }) => (
              <button key={label} onClick={() => setFontFamily(value)}
                className={`py-2.5 px-2 rounded-xl border text-sm transition ${fontFamily === value ? "border-black border-2 bg-white font-semibold" : "border-gray-200 bg-white text-gray-600"}`}
                style={{ fontFamily: value }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* CONTENT SIZE */}
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleSD("size")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Content Size</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${socDesignOpen.size ? "rotate-180" : ""}`} />
      </button>
      {socDesignOpen.size && (
        <div className="border-t border-gray-100">
          {[
            ...(layout === "circle" ? [{ label: "Profile Photo", value: socialAvatarSize, set: setSocialAvatarSize, min: 80, max: 280, px: true }] : []),
            { label: "Name", value: socialNameSize, set: setSocialNameSize, min: 70, max: 150, px: false },
            { label: "Title", value: socialTitleSize, set: setSocialTitleSize, min: 70, max: 150, px: false },
            { label: "Icons", value: socialIconSize, set: setSocialIconSize, min: 70, max: 150, px: false },
            { label: "Links", value: socialLinkSize, set: setSocialLinkSize, min: 70, max: 150, px: false },
            { label: "Products", value: socialProductSize, set: setSocialProductSize, min: 70, max: 150, px: false },
          ].map(({ label, value, set, min, max, px }, i, arr) => (
            <div key={label} className={`flex items-center px-4 py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm text-gray-600 flex-1">{label}</span>
              <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
              <span className="w-16 text-center text-sm font-medium text-gray-700">{value}{px ? "px" : "%"}</span>
              <button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}
{/* NETWORKING MODE DESIGN */}
{mode === "networking" && (
  <div className="space-y-3 pb-20">

    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleND("bg")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <span className="text-base font-semibold text-gray-900">Background</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${netDesignOpen.bg ? "rotate-180" : ""}`} />
      </button>
      {netDesignOpen.bg && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex gap-2 mt-3 mb-4">
            {["solid", "diffused"].map(t => (
              <button key={t} onClick={() => setNetBgType(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${netBgType === t ? "bg-white border-gray-900 text-gray-900 border-2" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {netBgType === "solid" && (
            <div className="grid grid-cols-8 gap-1">
              {[
                { label: "Snow", value: "#f3f4f6" },
                { label: "Sky", value: "#dbeafe" },
                { label: "Lavender", value: "#ede9fe" },
                { label: "Blush", value: "#fce7f3" },
                { label: "Mint", value: "#d1fae5" },
                { label: "Cream", value: "#fef9c3" },
                { label: "Slate", value: "#1e293b" },
              ].map(({ label, value }) => (
                <button key={label} onClick={() => setNetworkingBackground(value)} className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-xl border-2 transition ${networkingBackground === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                  <span className="text-[9px] text-gray-400">{label}</span>
                </button>
              ))}
              <label className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative"
                  style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(networkingBackground) && !networkingBackground.startsWith("radial-gradient") ? networkingBackground : "white" }}>
                  <span className="text-gray-400 text-base">+</span>
                  <input type="color" value={networkingBackground} onChange={(e) => setNetworkingBackground(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                </div>
                <span className="text-[9px] text-gray-400">Custom</span>
              </label>
            </div>
          )}
          {netBgType === "diffused" && (
            <div className="grid grid-cols-8 gap-1">
              {[
                { label: "Aurora", value: "radial-gradient(ellipse at 30% 40%, #c4b5fd 0%, #93c5fd 40%, #f0fdf4 100%)" },
                { label: "Ocean", value: "radial-gradient(ellipse at 20% 60%, #22d3ee 0%, #67e8f9 50%, #e0f2fe 100%)" },
                { label: "Lilac", value: "radial-gradient(ellipse at 60% 30%, #e0d7ff 0%, #c4b5fd 40%, #f5f3ff 100%)" },
                { label: "Sky", value: "radial-gradient(ellipse at 60% 30%, #bae6fd 0%, #7dd3fc 50%, #e0f2fe 100%)" },
                { label: "Rose", value: "radial-gradient(ellipse at 60% 40%, #fbcfe8 0%, #f9a8d4 50%, #fdf2f8 100%)" },
                { label: "Sage", value: "radial-gradient(ellipse at 30% 50%, #bbf7d0 0%, #86efac 50%, #f0fdf4 100%)" },
                { label: "Honey", value: "radial-gradient(ellipse at 50% 30%, #fde68a 0%, #fcd34d 50%, #fffbeb 100%)" },
                { label: "Peach", value: "radial-gradient(ellipse at 40% 40%, #fed7aa 0%, #fdba74 50%, #fff7ed 100%)" },
                { label: "Indigo", value: "radial-gradient(ellipse at 30% 30%, #a5b4fc 0%, #818cf8 40%, #e0e7ff 100%)" },
                { label: "Teal", value: "radial-gradient(ellipse at 60% 30%, #99f6e4 0%, #5eead4 50%, #f0fdfa 100%)" },
                { label: "Blush", value: "radial-gradient(ellipse at 40% 30%, #fca5a5 0%, #f87171 45%, #fff1f2 100%)" },
              ].map(({ label, value }) => (
                <button key={label} onClick={() => setNetworkingBackground(value)} className="flex flex-col items-center gap-1">
                  <div className={`w-12 h-12 rounded-xl border-2 transition ${networkingBackground === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                  <span className="text-[9px] text-gray-400">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>

    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleND("colors")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Text Colors</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${netDesignOpen.colors ? "rotate-180" : ""}`} />
      </button>
      {netDesignOpen.colors && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Name</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: networkingNameColor }} />
              <span className="text-sm text-gray-500">{networkingNameColor}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={networkingNameColor} onChange={(e) => setNetworkingNameColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">Title</span>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer bg-gray-50">
              <div className="w-5 h-5 rounded-md border border-gray-300" style={{ background: networkingTitleColor }} />
              <span className="text-sm text-gray-500">{networkingTitleColor}</span>
              <ChevronDown size={12} className="text-gray-400" />
              <input type="color" value={networkingTitleColor} onChange={(e) => setNetworkingTitleColor(e.target.value)} className="absolute opacity-0 w-0 h-0" />
            </label>
          </div>
        </div>
      )}
    </div>

    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleND("font")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="4" y="18" fontSize="16" fontWeight="bold" fill="#6b7280">Aa</text></svg></div>
          <span className="text-base font-semibold text-gray-900">Font</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${netDesignOpen.font ? "rotate-180" : ""}`} />
      </button>
      {netDesignOpen.font && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "Default", value: "system-ui" },
              { label: "Inter", value: "'Inter', sans-serif" },
              { label: "Poppins", value: "'Poppins', sans-serif" },
              { label: "Playfair", value: "'Playfair Display', serif" },
              { label: "DM Sans", value: "'DM Sans', sans-serif" },
              { label: "Mono", value: "'Courier New', monospace" },
            ].map(({ label, value }) => (
              <button key={label} onClick={() => setFontFamily(value)}
                className={`py-2.5 px-2 rounded-xl border text-sm transition ${fontFamily === value ? "border-black border-2 bg-white font-semibold" : "border-gray-200 bg-white text-gray-600"}`}
                style={{ fontFamily: value }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => toggleND("size")} className="w-full flex items-center justify-between px-4 py-3.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
          <span className="text-base font-semibold text-gray-900">Content Size</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${netDesignOpen.size ? "rotate-180" : ""}`} />
      </button>
      {netDesignOpen.size && (
        <div className="border-t border-gray-100">
          {[
            { label: "Photo", value: netAvatarSize, set: setNetAvatarSize, min: 80, max: 320, px: true },
            { label: "Name", value: netNameSize, set: setNetNameSize, min: 70, max: 150, px: false },
            { label: "Title", value: netTitleSize, set: setNetTitleSize, min: 70, max: 150, px: false },
            { label: "Contact", value: netContactSize, set: setNetContactSize, min: 70, max: 150, px: false },
            { label: "Actions", value: netActionSize, set: setNetActionSize, min: 70, max: 150, px: false },
            { label: "Buttons", value: netButtonSize, set: setNetButtonSize, min: 70, max: 150, px: false },
          ].map(({ label, value, set, min, max, px }, i, arr) => (
            <div key={label} className={`flex items-center px-4 py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm text-gray-600 flex-1">{label}</span>
              <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
              <span className="w-16 text-center text-sm font-medium text-gray-700">{value}{px ? "px" : "%"}</span>
              <button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
)}



  </div>
)}
<div style={{ height: "10px" }} />
      {/* CONTENT TAB */}
{activeTab === "content" && (
  <div className="space-y-2 pb-20">

{/* UNIVERSITY MODE ONLY */}
{mode === "university" && (
  <>
    {/* IDENTITY */}
<div className="mb-0" data-tutorial="identity-section">
<button onClick={() => toggleSection("identity")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.identity ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Identity</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.identity ? "rotate-180" : ""}`} />
</button>
{openSections.identity && <div className="space-y-3 border p-3 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-sm">Full Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Major & University</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="CS @ MIT"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
      </div>}
    </div>

    {/* GPA & GRAD YEAR */}
    <div className="mb-0" data-tutorial="uni-academic">
<button onClick={() => toggleSection("academic")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.academic ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Academic Info</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.academic ? "rotate-180" : ""}`} />
</button>
{openSections.academic && <div className="space-y-3">
        {[
          { key: "uni_gpa", label: "GPA", placeholder: "e.g. 3.8 / 4.0" },
          { key: "uni_grad_year", label: "Grad Year", placeholder: "e.g. Class of 2026" },
        ].map(({ key, label, placeholder }) => {
          const isActive = !!(fieldValues?.[key]);
          return (
            <div key={key} className={`p-3 rounded-xl border transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm">{label}</span>
                <button
                  onClick={() => setFieldValues((prev) => ({ ...prev, [key]: isActive ? "" : " " }))}
                  className={`w-5 h-5 rounded-full border ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <input
                  value={fieldValues?.[key]?.trim() === "" ? "" : fieldValues?.[key] || ""}
                  onChange={(e) => setFieldValues((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              )}
            </div>
          );
        })}
      </div>}
    </div>

    {/* BIO */}
    <div className="mb-0">
<button onClick={() => toggleSection("resume")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.resume ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Bio</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.resume ? "rotate-180" : ""}`} />
</button>
{openSections.resume && <textarea
        value={fieldValues?.uni_bio || ""}
        onChange={(e) => setFieldValues((prev) => ({ ...prev, uni_bio: e.target.value }))}
        placeholder="Tell people about yourself, your interests, and what you're working on..."
        rows={4}
        className="w-full border border-gray-200 rounded-2xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
      />}
    </div>

    {/* RESUME */}
    <div className="mb-0" data-tutorial="uni-resume">
<button onClick={() => toggleSection("resume")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.resume ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Resume</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.resume ? "rotate-180" : ""}`} />
</button>
{openSections.resume && <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">S
        <p className="text-xs font-medium text-gray-500 mb-1.5 ml-1"
>Link to your resume (Google Drive, Notion, etc.)</p>
        <input
          value={fieldValues?.uni_resume || ""}
          onChange={(e) => setFieldValues((prev) => ({ ...prev, uni_resume: e.target.value }))}
          placeholder="https://drive.google.com/your-resume"
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>}
    </div>

{/* CONTACT */}
    <div className="mb-0">
<button onClick={() => toggleSection("contact")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.contact ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48C2 2.41 2.9 1.68 4 1.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Contact</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.contact ? "rotate-180" : ""}`} />
</button>
{openSections.contact && <div className="space-y-3">
{[
          { key: "phone", label: "Phone", placeholder: "Your phone number" },
          { key: "email", label: "Email", placeholder: "Your email" },
          { key: "linkedin", label: "LinkedIn", placeholder: "LinkedIn URL" },
        ].map(({ key, label, placeholder }) => {
          const isActive = !!(fieldValues?.[key]);
          return (
            <div key={key} className={`p-3 rounded-xl border transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm">{label}</span>
                <button
                  onClick={() => setFieldValues((prev) => ({ ...prev, [key]: isActive ? "" : " " }))}
                  className={`w-5 h-5 rounded-full border ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <input
                  value={fieldValues?.[key]?.trim() === "" ? "" : fieldValues?.[key] || ""}
                  onChange={(e) => setFieldValues((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              )}
            </div>
          );
        })}
      </div>}
    </div>

    {/* PORTFOLIO PROJECTS */}
    <div className="mb-0" data-tutorial="uni-projects">
<button onClick={() => toggleSection("projects")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.projects ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Portfolio Projects</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.projects ? "rotate-180" : ""}`} />
</button>
{openSections.projects && <div className="space-y-2">
        {(fieldValues?.uni_projects || []).map((project, i) => {
          const isActive = !!project;
          return (
 <div key={i} className={`rounded-2xl border overflow-hidden transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Project {i + 1}</p>
                  <p className="text-[11px] text-gray-400">Title, description & link</p>
                </div>
                <button
                  onClick={() => {
                    const updated = [...(fieldValues?.uni_projects || [])];
                    if (isActive) { updated[i] = undefined; }
                    else { updated[i] = { title: "", subtitle: "", desc: "", url: "" }; }
                    setFieldValues({ ...fieldValues, uni_projects: updated });
                  }}
                  className={`w-5 h-5 rounded-full border flex-shrink-0 ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <div className="px-4 pb-3 space-y-2">
                  <input placeholder="Project Title" value={project?.title || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.uni_projects || [])];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setFieldValues({ ...fieldValues, uni_projects: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                  <input placeholder="Subtitle (e.g. React, 2024)" value={project?.subtitle || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.uni_projects || [])];
                      updated[i] = { ...updated[i], subtitle: e.target.value };
                      setFieldValues({ ...fieldValues, uni_projects: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                  <textarea placeholder="Description" value={project?.desc || ""} rows={3}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.uni_projects || [])];
                      updated[i] = { ...updated[i], desc: e.target.value };
                      setFieldValues({ ...fieldValues, uni_projects: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none resize-none" />
                  <input placeholder="Project URL (optional)" value={project?.url || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.uni_projects || [])];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setFieldValues({ ...fieldValues, uni_projects: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                </div>
              )}
            </div>
          );
        })}
      {openSections.projects && (
        <button
          onClick={() => {
            const updated = [...(fieldValues?.uni_projects || [])];
            updated.push({ title: "", subtitle: "", desc: "", url: "" });
            setFieldValues({ ...fieldValues, uni_projects: updated });
          }}
          className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
        >
          + Add Project
        </button>
      )}
      </div>}
    </div>
  </>
)}

{/* SOCIAL MODE ONLY */}
{mode === "social" && (
  <>
    {/* IDENTITY */}
<div className="mb-0" data-tutorial="social-identity">
<button onClick={() => toggleSection("identity")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.identity ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Identity</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.identity ? "rotate-180" : ""}`} />
</button>
{openSections.identity && <div className="space-y-3 border p-3 rounded-xl mb-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Display Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Bio</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Health & Fitness Coach"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
      </div>}
    </div>

{/* SOCIAL ICONS */}
    <div className="mb-0" data-tutorial="social-icons">
<button onClick={() => toggleSection("socialIcons")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.socialIcons ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Social Icons</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.socialIcons ? "rotate-180" : ""}`} />
</button>
{openSections.socialIcons && <div className="space-y-3">
        {["instagram", "tiktok", "twitter", "youtube"].map((platform) => {
          const isActive = !!(fieldValues?.social_icons?.[platform]);
          return (
            <div key={platform} className={`p-3 rounded-xl border transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm capitalize">{platform}</span>
                <button
                  onClick={() => setFieldValues((prev) => ({
                    ...prev,
                    social_icons: { ...(prev.social_icons || {}), [platform]: isActive ? "" : " " }
                  }))}
                  className={`w-5 h-5 rounded-full border ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <input
                  placeholder={`${platform}.com/yourhandle`}
                  value={fieldValues?.social_icons?.[platform]?.trim() === "" ? "" : fieldValues?.social_icons?.[platform] || ""}
                  onChange={(e) => setFieldValues((prev) => ({
                    ...prev,
                    social_icons: { ...(prev.social_icons || {}), [platform]: e.target.value }
                  }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              )}
            </div>
          );
        })}
      </div>}
    </div>

    {/* LINKS */}
    <div className="mb-0" data-tutorial="social-links">
<button onClick={() => toggleSection("links")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.links ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Links</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.links ? "rotate-180" : ""}`} />
</button>
{openSections.links && <div className="space-y-2">
        {(fieldValues?.social_links || []).map((link, i) => {
          const isActive = !!link;
          return (
            <div key={i} className={`rounded-2xl border overflow-hidden transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Link {i + 1}</p>
                  <p className="text-[11px] text-gray-400">Big image card</p>
                </div>
                <button
                  onClick={() => {
                    const updated = [...(fieldValues?.social_links || [])];
                    if (isActive) { updated[i] = undefined; }
                    else { updated[i] = { title: "", url: "", image: "" }; }
                    setFieldValues({ ...fieldValues, social_links: updated });
                  }}
                  className={`w-5 h-5 rounded-full border flex-shrink-0 ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <div className="px-4 pb-3 space-y-2">
                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-white cursor-pointer hover:bg-gray-50 transition">
                    {link?.image ? (
                      <img src={link.image} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">Img</div>
                    )}
                    <span className="text-sm text-gray-500">Upload cover image</span>
                    <input type="file" accept="image/*" className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const fileName = `social-${Date.now()}-${file.name}`;
                        const { error } = await supabase.storage.from("avatars").upload(fileName, file);
                        if (error) return;
                        const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
                        const updated = [...(fieldValues?.social_links || [])];
                        updated[i] = { ...updated[i], image: data.publicUrl };
                        setFieldValues({ ...fieldValues, social_links: updated });
                      }}
                    />
                  </label>
                  <input placeholder="Link Title" value={link?.title || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.social_links || [])];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setFieldValues({ ...fieldValues, social_links: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                  <input placeholder="Link URL" value={link?.url || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.social_links || [])];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setFieldValues({ ...fieldValues, social_links: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                </div>
              )}
            </div>
          );
        })}
      <button
        onClick={() => setFieldValues(prev => ({
          ...prev,
          social_links: [...(prev.social_links || []), { title: "", url: "", image: "" }]
        }))}
        className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
      >
        + Add Link
      </button>
      </div>}
    </div>

    {/* SHOP PRODUCTS */}
    <div className="mb-0" data-tutorial="social-products">
<button onClick={() => toggleSection("products")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.products ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Shop Products</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.products ? "rotate-180" : ""}`} />
</button>
{openSections.products && <div className="space-y-2">
        {(fieldValues?.social_products || []).map((product, i) => {
          const isActive = !!product;
          return (
            <div key={i} className={`rounded-2xl border overflow-hidden transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Product {i + 1}</p>
                  <p className="text-[11px] text-gray-400">Grid card with image</p>
                </div>
                <button
                  onClick={() => {
                    const updated = [...(fieldValues?.social_products || [])];
                    if (isActive) { updated[i] = undefined; }
                    else { updated[i] = { title: "", url: "", image: "", price: "" }; }
                    setFieldValues({ ...fieldValues, social_products: updated });
                  }}
                  className={`w-5 h-5 rounded-full border flex-shrink-0 ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <div className="px-4 pb-3 space-y-2">
                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-white cursor-pointer hover:bg-gray-50 transition">
                    {product?.image ? (
                      <img src={product.image} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">Img</div>
                    )}
                    <span className="text-sm text-gray-500">Upload product image</span>
                    <input type="file" accept="image/*" className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const fileName = `social-${Date.now()}-${file.name}`;
                        const { error } = await supabase.storage.from("avatars").upload(fileName, file);
                        if (error) return;
                        const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
                        const updated = [...(fieldValues?.social_products || [])];
                        updated[i] = { ...updated[i], image: data.publicUrl };
                        setFieldValues({ ...fieldValues, social_products: updated });
                      }}
                    />
                  </label>
                  <input placeholder="Product Name" value={product?.title || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.social_products || [])];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setFieldValues({ ...fieldValues, social_products: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                  <input placeholder="Price (e.g. $29.99)" value={product?.price || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.social_products || [])];
                      updated[i] = { ...updated[i], price: e.target.value };
                      setFieldValues({ ...fieldValues, social_products: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                  <input placeholder="Product URL" value={product?.url || ""}
                    onChange={(e) => {
                      const updated = [...(fieldValues?.social_products || [])];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setFieldValues({ ...fieldValues, social_products: updated });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
 />
                </div>
              )}
            </div>
          );
        })}
      <button
        onClick={() => setFieldValues(prev => ({
          ...prev,
          social_products: [...(prev.social_products || []), { title: "", url: "", image: "", price: "" }]
        }))}
        className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
      >
        + Add Product
      </button>
      </div>}
    </div>
  </>
)}

{/* NETWORKING MODE ONLY */}
{mode === "networking" && (
  <>
 <div className="mb-0" data-tutorial="net-identity">
<button onClick={() => toggleSection("identity")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.identity ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Identity</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.identity ? "rotate-180" : ""}`} />
</button>
{openSections.identity && <div className="space-y-3 border p-3 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-sm">Full Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Title / Position</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your Title"
            className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
      </div>}
    </div>

    {/* CONTACT */}
    <div className="mb-0" data-tutorial="net-contact">
<button onClick={() => toggleSection("contact")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.contact ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48C2 2.41 2.9 1.68 4 1.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Contact</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.contact ? "rotate-180" : ""}`} />
</button>
{openSections.contact && <div className="space-y-3">
        {[
          { key: "phone", label: "Phone", placeholder: "Your phone number" },
          { key: "email", label: "Email", placeholder: "Your email" },
          { key: "location", label: "Location", placeholder: "City, State" },
        ].map(({ key, label, placeholder }) => {
          const isActive = !!(fieldValues?.[key]);
          return (
            <div key={key} className={`p-3 rounded-xl border transition ${isActive ? "bg-blue-50 border-blue-400" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm">{label}</span>
                <button
                  onClick={() => setFieldValues((prev) => ({ ...prev, [key]: isActive ? "" : " " }))}
                  className={`w-5 h-5 rounded-full border ${isActive ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
                />
              </div>
              {isActive && (
                <input
                  value={fieldValues?.[key]?.trim() === "" ? "" : fieldValues?.[key] || ""}
                  onChange={(e) => setFieldValues((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              )}
            </div>
          );
        })}
      </div>}
    </div>

    <div data-tutorial="net-buttons">
<button onClick={() => toggleSection("buttons")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.buttons ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Buttons</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.buttons ? "rotate-180" : ""}`} />
</button>
{openSections.buttons && <div>

  <div className="space-y-3">
    {(fieldValues?.buttons || []).map((button, i) => {
const isActive = button !== null && button !== undefined;
      return (
        <div
          key={`button-${i}`}
          className={`p-3 rounded-xl border transition ${
            isActive
              ? "bg-blue-50 border-blue-400"
              : "bg-gray-50"
          }`}
        >

          {/* TOP ROW */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">Button {i + 1}</p>
              <p className="text-[11px] text-gray-400">Logo, title & link</p>
            </div>

            <div className="flex items-center gap-2">
     
              <button
                onClick={() => {
                  const updated = [...(fieldValues.buttons || [])];
                  if (isActive) {
                    updated[i] = undefined;
                  } else {
                    updated[i] = { title: "", url: "", image: "" };
                  }
                  setFieldValues({ ...fieldValues, buttons: updated });
                }}
                className={`w-5 h-5 rounded-full border ${
                  isActive
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white"
                }`}
              />
            </div>
          </div>

{isActive && (
            <div className="mt-3 space-y-2">

              <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-white cursor-pointer hover:bg-gray-50 transition">
                {button?.image ? (
                  <img src={button.image} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">Logo</div>
                )}
                <span className="text-sm text-gray-500">Upload logo</span>
                <input type="file" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const fileName = `button-${Date.now()}-${file.name}`;
                    const { error } = await supabase.storage.from("button-logos").upload(fileName, file);
                    if (error) return;
                    const { data } = supabase.storage.from("button-logos").getPublicUrl(fileName);
                    const updated = [...(fieldValues?.buttons || [])];
                    updated[i] = { ...updated[i], image: data.publicUrl };
                    setFieldValues({ ...fieldValues, buttons: updated });
                  }}
                />
              </label>

              <input
                placeholder="Button Title"
                value={button?.title || ""}
                onChange={(e) => {
                  const updated = [...(fieldValues.buttons || [])];
                  updated[i] = { ...updated[i], title: e.target.value };
                  setFieldValues({ ...fieldValues, buttons: updated });
                }}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <input
                placeholder="Button URL"
                value={button?.url || ""}
                onChange={(e) => {
                  const updated = [...(fieldValues.buttons || [])];
                  updated[i] = { ...updated[i], url: e.target.value };
                  setFieldValues({ ...fieldValues, buttons: updated });
                }}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />

            </div>
          )}
        </div>
      );
    })}
  </div>
  <button
    onClick={() => setFieldValues((prev) => ({
      ...prev,
      buttons: [...(prev.buttons || []), null]
    }))}
    className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
  >
    + Add Button
  </button>
</div>}
</div>
  </>
)}
    {/* BUSINESS MODE ONLY */}
    {mode === "business" && (
      <>
{/* IDENTITY */}
<div className="mb-0" data-tutorial="identity-section">
<button onClick={() => toggleSection("identity")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.identity ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Identity</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.identity ? "rotate-180" : ""}`} />
</button>
{openSections.identity && <div className="space-y-3 border p-3 rounded-xl">
    <div className="flex justify-between items-center">
      <span className="text-sm">Full Name</span>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm">Title / Position</span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your Title"
        className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  </div>}
</div>

        {/* ADD FIELDS */}
<div data-tutorial="contact-fields">
<button onClick={() => toggleSection("contact")} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-2xl border transition mb-3 ${openSections.contact ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 shadow-sm"}`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48C2 2.41 2.9 1.68 4 1.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    </div>
    <span className="text-base font-semibold text-gray-900">Contact Fields</span>
  </div>
  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openSections.contact ? "rotate-180" : ""}`} />
</button>
{openSections.contact && <div className="space-y-3">
    {["phone", "email", "linkedin", "instagram", "website"].map((field) => {
      const isActive = fields[field];

      return (
<div
  key={field}
  className={`p-3 rounded-xl border transition ${
    isActive
      ? "bg-blue-50 border-blue-400"
      : "bg-gray-50"
  }`}
>

  {/* TOP ROW */}
  <div className="flex justify-between items-center">
    <span className="text-sm capitalize">
      {field}
    </span>

    <button
      onClick={() =>
        isActive ? removeField(field) : addField(field)
      }
      className={`w-5 h-5 rounded-full border ${
        isActive
          ? "bg-blue-500 border-blue-500"
          : "bg-white"
      }`}
    />
  </div>

  {/* INPUT INSIDE BOX */}
  {isActive && (
    <input
      value={fieldValues[field] || ""}
      onChange={(e) => updateField(field, e.target.value)}
      placeholder={PLACEHOLDERS[field]}
      className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
    />
  )}

</div>
      );
    })}
  </div>}
</div>

        {/* ACTIVE FIELDS */}

      </>
    )}

  </div>
)}


      {/* LAYOUT TAB */}
{activeTab === "layout" && (
  <div className="space-y-3" data-tutorial="mode-selector">
    <p className="text-base font-bold text-gray-800 mb-3"
>Select a mode</p>{[
{ id: "business", label: "Business", color: "#2563eb", iconBg: "#eff6ff", desc: "Professional card with contact fields",
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
{ id: "networking", label: "Networking", color: "#7c3aed", iconBg: "#f5f3ff", desc: "Clean profile with social links",
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
{ id: "university", label: "University", color: "#059669", iconBg: "#ecfdf5", desc: "Student & campus identity",
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
{ id: "social", label: "Social", color: "#ea580c", iconBg: "#fff7ed", desc: "Creator & social-first layout", hasStyles: true,
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
    ].map((m) => {
      const isActive = mode === m.id;
      return (
        <div key={m.id} className="space-y-2">
          <button
            onClick={() => {
              if (m.id === "business" || m.id === "social") {
                setMode(m.id);
                setLayout(m.id === "business" ? "executive" : "circle");
                setOpenMode(openMode === m.id ? null : m.id);
              } else {
                setMode(m.id);
                setOpenMode(null);
              }
            }}

            className={`w-full p-3 rounded-2xl text-left transition border ${
              isActive
                ? "bg-white text-black border-2 border-black"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: m.iconBg }}>
  {m.icon}
</div>                <div>
                  <p className={`text-base font-medium ${isActive ? "text-black" : "text-gray-900"}`}>{m.label}</p>

                  <p className={`text-sm ${isActive ? "text-gray-500" : "text-gray-400"}`}>{m.desc}</p>
                </div>
              </div>
 {(m.id === "business" || m.id === "social") && (
                <ChevronDown size={16} className={`transition-transform duration-300 ${openMode === m.id ? "rotate-180" : ""} ${isActive ? "text-black" : "text-gray-400"}`} />
              )}
            </div>
          </button>
          <AnimatePresence>
            {m.id === "business" && openMode === "business" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pl-2 space-y-2 overflow-hidden"
              >
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1">Style</p>
                <div className="flex gap-2">
                  {["executive", "minimal"].map((l) => (
                    <button key={l} onClick={() => { setMode("business"); setLayout(l); }}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                        layout === l
                          ? "bg-white text-black border-2 border-black"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {m.id === "social" && openMode === "social" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pl-2 space-y-2 overflow-hidden"
              >
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1">Style</p>
                <div className="flex gap-2">
                  {["circle", "banner"].map((l) => (
                    <button key={l} onClick={() => { setMode("social"); setLayout(l); }}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                        layout === l
                          ? "bg-white text-black border-2 border-black"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
)}
      </div>
    </motion.div>
  )}
  <AnimatePresence>
{saveSuccess && (
  <motion.div key="save-success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-green-500 flex items-center justify-center z-[999]"
    >
   <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="flex flex-col items-center gap-6 text-white"
>

  {/* CIRCLE */}
  <svg width="120" height="120" viewBox="0 0 120 120">
    <motion.circle
      cx="60"
      cy="60"
      r="50"
      stroke="white"
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />

    {/* CHECKMARK */}
    <motion.path
  d="M40 65 L55 80 L80 45"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    />
  </svg>

  {/* TEXT */}
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="text-xl font-medium"
  >
    Profile Saved
  </motion.p>

</motion.div>
    </motion.div>
  )}
</AnimatePresence>
</AnimatePresence>
{showBuilderTutorial && (
  <BuilderTutorial
    mode={tutorialMode}
    onComplete={() => setShowBuilderTutorial(false)}
    onOpenStudio={() => setStudioOpen(true)}
    onGoToContent={() => setActiveTab("content")}
    onGoToDesign={() => setActiveTab("design")}
    onCloseStudio={() => setStudioOpen(false)}
  />
)}
{isEditing && (
  <button
    onClick={() => setShowBuilderTutorial(true)}
    className="fixed bottom-6 right-5 z-40 w-9 h-9 bg-white border border-gray-200 shadow-md rounded-full text-sm font-semibold text-gray-500 flex items-center justify-center hover:bg-gray-50 transition"
  >
    ?
  </button>
)}
</div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    }>
      <BuilderPageInner />
    </Suspense>
  )
}

