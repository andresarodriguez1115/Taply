"use client";

import { Suspense } from "react";
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
  const [name, setName] = useState("Your Name");
  const [title, setTitle] = useState("Your Title / Position");
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
const [socialAvatarSize, setSocialAvatarSize] = useState(144);
const [minNameSize, setMinNameSize] = useState(100);
const [minTitleSize, setMinTitleSize] = useState(100);
const [minContactSize, setMinContactSize] = useState(100);const [execAvatarSize, setExecAvatarSize] = useState(100);
const [execSaveSize, setExecSaveSize] = useState(100);
const [execContactSize, setExecContactSize] = useState(100);const [networkingBackground, setNetworkingBackground] = useState("#f3f4f6");
const [networkingNameColor, setNetworkingNameColor] = useState("#000000");
const [networkingTitleColor, setNetworkingTitleColor] = useState("#6b7280");
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
// 🔥 NEW LAYOUT STATE

  // -----------------------------
  // DYNAMIC OPTIONAL FIELDS
  // -----------------------------
const [fields, setFields] = useState({
  phone: true,
  email: true,
  linkedin: true,
  instagram: true,
  website: true,
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
setFields({
  phone: true,
  email: true,
  linkedin: true,
  instagram: true,
  website: true,
  bio: false,
});

  setFieldValues({
    phone: "1-800-taply.now",
    email: "taply.now@email.com",
    linkedin: "taplylinkedin",
    instagram: "taplygram",
    website: "",
    bio: "",
    social_icons: {
      instagram: "taplygram",
      tiktok: "taply.now",
      twitter: "taplytwitter",
      youtube: "tapltube",
    },
    uni_bio: "Tell people about yourself, your interests, and what you're working on...",
    uni_gpa: "0",
    uni_grad_year: "0",
    uni_projects: [
      { title: "Add Your Project", subtitle: "Subtitle To Your Project", desc: "", url: "https://taply.now" },
    ],
    buttons: [
      { title: "", url: "", image: "" },
      { title: "", url: "", image: "" },
      { title: "", url: "", image: "" },
    ]
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

setName(data.name || "Your Name");
setTitle(data.title || "Your Title / Position");

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
  website: "",
  bio: "",
  buttons: [
    { title: "", url: "", image: "" },
    { title: "", url: "", image: "" },
    { title: "", url: "", image: "" },
  ]
});

setMode(data.mode || "business");
setLayout(data.layout || "executive");

setBackgroundColor(data.bg_color || "#f3f4f6");
setNetworkingBackground(data.networking_bg || "#f3f4f6");
setNetworkingNameColor(data.networking_name_color || "#000000");
setNetworkingTitleColor(data.networking_title_color || "#6b7280");
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
  phone: "1-800-taply.now",
  email: "taply.now@email.com",
  linkedin: "taplylinkedin",
  instagram: "",
  website: "",
  bio: "",
  social_icons: {
    instagram: "taplygram",
    tiktok: "taply.now",
    twitter: "taplytwitter",
    youtube: "tapltube",
  },
  uni_bio: "Tell people about yourself, your interests, and what you're working on...",
  uni_gpa: "3.8",
  uni_grad_year: "2026",
  uni_projects: [
    { title: "Add Your Project", subtitle: "Subtitle To Your Project", desc: "", url: "https://taply.now" },
  ],
buttons: [
  { title: "Button 1", url: "", image: "" },
  { title: "Button 2", url: "", image: "" },
  { title: "Button 3", url: "", image: "" },
]
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
    })
    .eq("id", profileId);

  error = updateError;

} else {
  // 🆕 CREATE NEW PROFILE — only if user explicitly came to create
  if (name === "Your Name" && title === "Your Title / Position") {
setSaving(false)
setSaveError("Please fill in your name and title before saving.")
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
  const [layout, setLayout] = useState("executive");
const [runTutorial, setRunTutorial] = useState(false);
const [showBuilderTutorial, setShowBuilderTutorial] = useState(false)
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
    const done = localStorage.getItem("taply_builder_tutorial_done");
    if (!done) setTimeout(() => setShowBuilderTutorial(true), 1000);
  }
}, [profileId]);
const [activeTab, setActiveTab] = useState("layout");
const [openMode, setOpenMode] = useState(null);
const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
const [openSections, setOpenSections] = useState({
  modes: true,
  profiles: false,
});
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
    name,
    title,
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
    onClick={() => router.push("/dashboard")}
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
  <>
   <p className="text-base font-bold text-gray-800 mb-3">Background</p>

<p className="text-sm font-semibold text-gray-600 mb-2">Solid</p>
    <div className="grid grid-cols-6 gap-2 mb-4">
      {[
        { label: "Snow", value: "#f3f4f6" },
        { label: "Sky", value: "#dbeafe" },
        { label: "Lavender", value: "#ede9fe" },
        { label: "Blush", value: "#fce7f3" },
        { label: "Mint", value: "#d1fae5" },
        { label: "Cream", value: "#fef9c3" },
        { label: "Slate", value: "#1e293b" },
      ].map(({ label, value }) => (
        <button key={label} onClick={() => setBackgroundColor(value)}
          className="flex flex-col items-center gap-1 group">
          <div className={`w-14 h-14 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`}

            style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
          <span className="text-[9px] text-gray-400">{label}</span>
        </button>
      ))}
      <label className="flex flex-col items-center gap-1 cursor-pointer group">
        <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition group-hover:border-gray-400 relative"
          style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
          <span className="text-gray-400 text-base">+</span>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
        </div>
        <span className="text-[9px] text-gray-400">Custom</span>
      </label>
    </div>

    <div className="h-px bg-gray-100 mb-3" />

<p className="text-sm font-semibold text-gray-600 mb-2">Diffused</p>
    <div className="grid grid-cols-6 gap-2">
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
        <button key={label} onClick={() => setBackgroundColor(value)}
          className="flex flex-col items-center gap-1 group">
          <div className={`w-14 h-14 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`}

            style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
          <span className="text-[9px] text-gray-400">{label}</span>
        </button>
      ))}
    </div>
  </>
)}
{mode === "business" && layout === "minimal" && (
  <>
    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Content Size</p>
    <div className="space-y-3">
      {[
        { label: "Name", value: minNameSize, set: setMinNameSize },
        { label: "Title", value: minTitleSize, set: setMinTitleSize },
        { label: "Contact", value: minContactSize, set: setMinContactSize },
      ].map(({ label, value, set }) => (
        <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
          <span className="text-sm text-gray-500 w-16">{label}</span>
          <button onClick={() => set(s => Math.max(70, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
          <span className="flex-1 text-center text-sm font-medium text-gray-700">{value}%</span>
          <button onClick={() => set(s => Math.min(150, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
        </div>
      ))}
    </div>
  </>
)}

{mode === "business" && layout === "executive" && (
  <>
    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Content Size</p>
    <div className="space-y-3">
      {[
        { label: "Name", value: fontSize, set: setFontSize },
        { label: "Title", value: titleSize, set: setTitleSize },
        { label: "Photo", value: execAvatarSize, set: setExecAvatarSize },
        { label: "Save Btn", value: execSaveSize, set: setExecSaveSize },
        { label: "Contact", value: execContactSize, set: setExecContactSize },
      ].map(({ label, value, set }) => (
        <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
          <span className="text-sm text-gray-500 w-16">{label}</span>
          <button onClick={() => set(s => Math.max(70, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
          <span className="flex-1 text-center text-sm font-medium text-gray-700">{value}%</span>
          <button onClick={() => set(s => Math.min(150, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
        </div>
      ))}
    </div>
  </>
)}

{/* UNIVERSITY MODE DESIGN */}
{mode === "university" && (
  <>
    <p className="text-base font-bold text-gray-800 mb-3">Background</p>
    <p className="text-sm font-semibold text-gray-600 mb-2">Solid</p>
    <div className="grid grid-cols-6 gap-2 mb-4">
      {[
        { label: "Snow", value: "#f3f4f6" },
        { label: "Sky", value: "#dbeafe" },
        { label: "Lavender", value: "#ede9fe" },
        { label: "Blush", value: "#fce7f3" },
        { label: "Mint", value: "#d1fae5" },
        { label: "Cream", value: "#fef9c3" },
        { label: "Slate", value: "#1e293b" },
      ].map(({ label, value }) => (
        <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1 group">
          <div className={`w-14 h-14 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
          <span className="text-[9px] text-gray-400">{label}</span>
        </button>
      ))}
      <label className="flex flex-col items-center gap-1 cursor-pointer group">
        <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition group-hover:border-gray-400 relative" style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
          <span className="text-gray-400 text-base">+</span>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
        </div>
        <span className="text-[9px] text-gray-400">Custom</span>
      </label>
    </div>
    <div className="h-px bg-gray-100 mb-3" />
    <p className="text-sm font-semibold text-gray-600 mb-2">Diffused</p>
    <div className="grid grid-cols-6 gap-2">
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
        <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1 group">
          <div className={`w-14 h-14 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
          <span className="text-[9px] text-gray-400">{label}</span>
        </button>
      ))}
    </div>

    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Profile Photo Size</p>
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-3">
      <button onClick={() => setUniAvatarSize(s => Math.max(40, s - 5))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
      <span className="flex-1 text-center text-sm font-medium text-gray-700">{uniAvatarSize}px</span>
      <button onClick={() => setUniAvatarSize(s => Math.min(160, s + 5))}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
    </div>
    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Content Size</p>
    <div className="space-y-3">
      {[
        { label: "Name", value: fontSize, set: setFontSize },
        { label: "Title", value: titleSize, set: setTitleSize },
        { label: "Bio Text", value: uniBioSize, set: setUniBioSize },
        { label: "Stats", value: uniStatsSize, set: setUniStatsSize },
        { label: "Contact", value: uniContentSize, set: setUniContentSize },
      ].map(({ label, value, set }) => (
        <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
          <span className="text-sm text-gray-500 w-14">{label}</span>
          <button onClick={() => set(s => Math.max(70, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
          <span className="flex-1 text-center text-sm font-medium text-gray-700">{value}%</span>
          <button onClick={() => set(s => Math.min(150, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
        </div>
      ))}
    </div>



  </>
)}

{/* SOCIAL MODE DESIGN */}
{mode === "social" && (
  <>
    <p className="text-base font-bold text-gray-800 mb-3">Background</p>
    <p className="text-sm font-semibold text-gray-600 mb-2">Solid</p>
    <div className="grid grid-cols-6 gap-2 mb-4">
      {[
        { label: "Snow", value: "#f3f4f6" },
        { label: "Sky", value: "#dbeafe" },
        { label: "Lavender", value: "#ede9fe" },
        { label: "Blush", value: "#fce7f3" },
        { label: "Mint", value: "#d1fae5" },
        { label: "Cream", value: "#fef9c3" },
        { label: "Slate", value: "#1e293b" },
      ].map(({ label, value }) => (
        <button key={label} onClick={() => setBackgroundColor(value)} className="flex flex-col items-center gap-1 group">
          <div className={`w-14 h-14 rounded-xl border-2 transition ${backgroundColor === value ? "border-black scale-90" : "border-transparent"}`} style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
          <span className="text-[9px] text-gray-400">{label}</span>
        </button>
      ))}
      <label className="flex flex-col items-center gap-1 cursor-pointer group">
        <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition group-hover:border-gray-400 relative" style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(backgroundColor) && !backgroundColor.startsWith("radial-gradient") ? backgroundColor : "white" }}>
          <span className="text-gray-400 text-base">+</span>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
        </div>
        <span className="text-[9px] text-gray-400">Custom</span>
      </label>
    </div>

    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Content Size</p>
    <div className="space-y-3">
      {[
        { label: "Name", value: socialNameSize, set: setSocialNameSize, min: 70, max: 150, px: false },
        { label: "Title", value: socialTitleSize, set: setSocialTitleSize, min: 70, max: 150, px: false },
        { label: "Icons", value: socialIconSize, set: setSocialIconSize, min: 70, max: 150, px: false },
        { label: "Links", value: socialLinkSize, set: setSocialLinkSize, min: 70, max: 150, px: false },
        { label: "Products", value: socialProductSize, set: setSocialProductSize, min: 70, max: 150, px: false },
        ...(layout === "circle" ? [{ label: "Photo", value: socialAvatarSize, set: setSocialAvatarSize, min: 80, max: 280, px: true }] : []),
      ].map(({ label, value, set, min, max, px }) => (
        <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
          <span className="text-sm text-gray-500 w-16">{label}</span>
          <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
          <span className="flex-1 text-center text-sm font-medium text-gray-700">{value}{px ? "px" : "%"}</span>
          <button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
        </div>
      ))}
    </div>
  </>
)}
{/* NETWORKING MODE DESIGN */}
    {mode === "networking" && (
      <>
        <p className="text-base font-bold text-gray-800 mb-3">Background</p>

        <p className="text-sm font-semibold text-gray-600 mb-2">Solid</p>
        <div className="grid grid-cols-6 gap-2 mb-4">
          {[
            { label: "Snow", value: "#f3f4f6" },
            { label: "Sky", value: "#dbeafe" },
            { label: "Lavender", value: "#ede9fe" },
            { label: "Blush", value: "#fce7f3" },
            { label: "Mint", value: "#d1fae5" },
            { label: "Cream", value: "#fef9c3" },
            { label: "Slate", value: "#1e293b" },
          ].map(({ label, value }) => (
            <button key={label} onClick={() => setNetworkingBackground(value)}
              className="flex flex-col items-center gap-1 group">
              <div className={`w-14 h-14 rounded-xl border-2 transition ${networkingBackground === value ? "border-black scale-90" : "border-transparent"}`}
                style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
              <span className="text-[9px] text-gray-400">{label}</span>
            </button>
          ))}
          <label className="flex flex-col items-center gap-1 cursor-pointer group">
            <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition group-hover:border-gray-400 relative"
              style={{ background: !["#f3f4f6","#dbeafe","#ede9fe","#fce7f3","#d1fae5","#fef9c3","#1e293b"].includes(networkingBackground) && !networkingBackground.startsWith("radial-gradient") ? networkingBackground : "white" }}>
              <span className="text-gray-400 text-base">+</span>
              <input type="color" value={networkingBackground} onChange={(e) => setNetworkingBackground(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
            </div>
            <span className="text-[9px] text-gray-400">Custom</span>
          </label>
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        <p className="text-sm font-semibold text-gray-600 mb-2">Diffused</p>
        <div className="grid grid-cols-6 gap-2 mb-6">
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
            <button key={label} onClick={() => setNetworkingBackground(value)}
              className="flex flex-col items-center gap-1 group">
              <div className={`w-14 h-14 rounded-xl border-2 transition ${networkingBackground === value ? "border-black scale-90" : "border-transparent"}`}
                style={{ background: value, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
              <span className="text-[9px] text-gray-400">{label}</span>
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 mb-4" />

        <p className="text-base font-bold text-gray-800 mb-3">Text Colors</p>
        <div className="space-y-3 border p-3 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm">Name</span>
            <input type="color" value={networkingNameColor} onChange={(e) => setNetworkingNameColor(e.target.value)} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Title</span>
            <input type="color" value={networkingTitleColor} onChange={(e) => setNetworkingTitleColor(e.target.value)} />
          </div>
        </div>

        <div className="h-px bg-gray-100 my-4" />
        <p className="text-base font-bold text-gray-800 mb-3">Content Size</p>
        <div className="space-y-3">
          {[
            { label: "Photo", value: netAvatarSize, set: setNetAvatarSize, min: 80, max: 320 },
            { label: "Name", value: netNameSize, set: setNetNameSize, min: 70, max: 150 },
            { label: "Title", value: netTitleSize, set: setNetTitleSize, min: 70, max: 150 },
            { label: "Contact", value: netContactSize, set: setNetContactSize, min: 70, max: 150 },
            { label: "Actions", value: netActionSize, set: setNetActionSize, min: 70, max: 150 },
            { label: "Buttons", value: netButtonSize, set: setNetButtonSize, min: 70, max: 150 },
          ].map(({ label, value, set, min, max }) => (
            <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <span className="text-sm text-gray-500 w-16">{label}</span>
              <button onClick={() => set(s => Math.max(min, s - 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">−</button>
              <span className="flex-1 text-center text-sm font-medium text-gray-700">{value}{label === "Photo" ? "px" : "%"}</span>
              <button onClick={() => set(s => Math.min(max, s + 5))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition">+</button>
            </div>
          ))}
        </div>
      </>
    )}

{/* FONT PICKER - ALL MODES */}
    <div className="h-px bg-gray-100 my-4" />
    <p className="text-base font-bold text-gray-800 mb-3">Font</p>
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Default", value: "system-ui" },
        { label: "Inter", value: "'Inter', sans-serif" },
        { label: "Poppins", value: "'Poppins', sans-serif" },
        { label: "Playfair", value: "'Playfair Display', serif" },
        { label: "DM Sans", value: "'DM Sans', sans-serif" },
        { label: "Mono", value: "'Courier New', monospace" },
      ].map(({ label, value }) => (
        <button key={label} onClick={() => setFontFamily(value)}
          className={`py-2.5 px-3 rounded-xl border text-sm transition ${fontFamily === value ? "border-black border-2 bg-white font-semibold" : "border-gray-200 bg-white text-gray-600"}`}
          style={{ fontFamily: value }}>
          {label}
        </button>
      ))}
    </div>


  </div>
)}
<div style={{ height: "10px" }} />
      {/* CONTENT TAB */}
{activeTab === "content" && (
  <div className="space-y-6 pb-20">

{/* UNIVERSITY MODE ONLY */}
{mode === "university" && (
  <>
    {/* IDENTITY */}
<div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Identity</p>
      <div className="space-y-3 border p-3 rounded-xl">
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
      </div>
    </div>

    {/* GPA & GRAD YEAR */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Academic Info</p>
      <div className="space-y-3">
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
      </div>
    </div>

    {/* GPA & GRAD YEAR */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Academic Info</p>
      <div className="space-y-3">
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
      </div>
    </div>

    {/* BIO */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3"
>Bio</p>
      <textarea
        value={fieldValues?.uni_bio || ""}
        onChange={(e) => setFieldValues((prev) => ({ ...prev, uni_bio: e.target.value }))}
        placeholder="Tell people about yourself, your interests, and what you're working on..."
        rows={4}
        className="w-full border border-gray-200 rounded-2xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
      />
    </div>

    {/* RESUME */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3"
>Resume</p>
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
        <p className="text-xs font-medium text-gray-500 mb-1.5 ml-1"
>Link to your resume (Google Drive, Notion, etc.)</p>
        <input
          value={fieldValues?.uni_resume || ""}
          onChange={(e) => setFieldValues((prev) => ({ ...prev, uni_resume: e.target.value }))}
          placeholder="https://drive.google.com/your-resume"
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>
    </div>

{/* CONTACT */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Contact</p>
      <div className="space-y-3">
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
      </div>
    </div>

    {/* PORTFOLIO PROJECTS */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3"
>Portfolio Projects</p>
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => {
          const project = fieldValues?.uni_projects?.[i];
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
      </div>
    </div>
  </>
)}

{/* SOCIAL MODE ONLY */}
{mode === "social" && (
  <>
    {/* IDENTITY */}
<div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Identity</p>
      <div className="space-y-3 border p-3 rounded-xl">
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
      </div>
    </div>

{/* SOCIAL ICONS */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Social Icons</p>
      <div className="space-y-3">
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
      </div>
    </div>

    {/* LINKS */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3"
>Links</p>
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => {
          const link = fieldValues?.social_links?.[i];
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
      </div>
    </div>

    {/* SHOP PRODUCTS */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3"
>Shop Products</p>
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => {
          const product = fieldValues?.social_products?.[i];
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
      </div>
    </div>
  </>
)}

{/* NETWORKING MODE ONLY */}
{mode === "networking" && (
  <>
 <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Identity</p>
      <div className="space-y-3 border p-3 rounded-xl">
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
      </div>
    </div>

    {/* CONTACT */}
    <div className="mb-6">
      <p className="text-base font-bold text-gray-800 mb-3">Contact</p>
      <div className="space-y-3">
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
      </div>
    </div>

    <div>
      <p className="text-base font-bold text-gray-800 mb-3"
>Buttons</p>

  <div className="space-y-3">
    {(fieldValues?.buttons || [{ title: "", url: "", image: "" }, { title: "", url: "", image: "" }, { title: "", url: "", image: "" }]).map((button, i) => {
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
              {isActive && (
                <button
                  onClick={() => {
                    const updated = (fieldValues.buttons || []).filter((_, idx) => idx !== i);
                    setFieldValues({ ...fieldValues, buttons: updated });
                  }}
                  className="w-5 h-5 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-red-500 text-xs leading-none"
                >
                  ×
                </button>
              )}
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
      buttons: [...(prev.buttons || []), { title: "", url: "", image: "" }]
    }))}
    className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
  >
    + Add Button
  </button>
</div>
  </>
)}
    {/* BUSINESS MODE ONLY */}
    {mode === "business" && (
      <>
{/* IDENTITY */}
<div className="mb-6" data-tutorial="identity-section">
<p className="text-base font-bold text-gray-800 mb-3">Identity</p>
  <div className="space-y-3 border p-3 rounded-xl">
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
  </div>
</div>

        {/* ADD FIELDS */}
<div data-tutorial="contact-fields">
<p className="text-base font-bold text-gray-800 mb-3">Contact Fields</p>
  <div className="space-y-3">
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
  </div>
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
                  {["banner", "circle"].map((l) => (
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
    onComplete={() => setShowBuilderTutorial(false)}
    onOpenStudio={() => setStudioOpen(true)}
    onGoToContent={() => setActiveTab("content")}
    onGoToDesign={() => setActiveTab("design")}
    onCloseStudio={() => setStudioOpen(false)}
  />
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

