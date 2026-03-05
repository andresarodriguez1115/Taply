"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
// Layouts
import BusinessLayout from "@/components/layouts/BusinessLayout.jsx";
import UniversityLayout from "@/components/layouts/UniversityLayout.jsx";
import ClientsLayout from "@/components/layouts/ClientsLayout.jsx";
import SocialLayout from "@/components/layouts/SocialLayout.jsx";
import NetworkingLayout from "@/components/layouts/NetworkingLayout.jsx";
import ExecutiveLayout from "@/components/layouts/ExecutiveLayout.jsx";
import ModernLayout from "@/components/layouts/ModernLayout.jsx";
import MinimalLayout from "@/components/layouts/MinimalLayout.jsx";

export default function Page() {
  const [avatarUrl, setAvatarUrl] = useState(null);
const [bannerUrl, setBannerUrl] = useState(null);
  // -----------------------------
  // BASIC PROFILE FIELDS
  // -----------------------------
  const [name, setName] = useState("Your Name");
  const [title, setTitle] = useState("Your Title / Position");
  const [saving, setSaving] = useState(false)
const [saveSuccess, setSaveSuccess] = useState(false)
const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
const [username, setUsername] = useState(null)
// ==============================
// IMAGE POSITIONING STATE
// ==============================
const [profileScale, setProfileScale] = useState(1);
const [profilePos, setProfilePos] = useState({ x: 0, y: 0 });
const [bannerScale, setBannerScale] = useState(1);
const [bannerPos, setBannerPos] = useState({ x: 0, y: 0 });
// 🔥 NEW LAYOUT STATE

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

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .maybeSingle()
console.log("PROFILE DATA:", data)
    // If profile doesn't exist → create one
    if (!data) {
await supabase.from("profiles").insert({
  id: userData.user.id,
  username: null,
  name: "",
  title: "",
  mode: "business",
  fields: {},
  field_values: {},
  
})

      router.push("/choose-username")
      return
    }

    // If username not set → force choose username
    if (!data.username) {
      router.push("/choose-username")
      return
    }

    // Otherwise load profile
    setName(data.name || "")
    setTitle(data.title || "")
    setBackgroundColor(data.bg_color || "#295cc3");
    setMode(data.mode || "business")
    setFields(data.fields || {})
    setFieldValues(data.field_values || {})
    setAvatarUrl(data.avatar_url || null)
setBannerUrl(data.banner_url || null)
setLayout(data.layout || "modern");
setProfileScale(data.avatar_scale ?? 1);
setProfilePos({
  x: data.avatar_x ?? 0,
  y: data.avatar_y ?? 0,
});
setUsername(data.username)
setBannerScale(data.banner_scale ?? 1);
setBannerPos({
  x: data.banner_x ?? 0,
  y: data.banner_y ?? 0,
});
  }

  loadProfile()
}, [router])

  const [fieldValues, setFieldValues] = useState({
    phone: "",
    email: "",
    linkedin: "",
    instagram: "",
    website: "",
    bio: "",
  });
const handleSave = async () => {
  setSaving(true)
  setSaveSuccess(false)

  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) return



  const { error } = await supabase
.from("profiles")
.upsert(
  {
    id: userData.user.id,
    name,
    title,
    mode,
    layout,
    fields,
    field_values: fieldValues,
    bg_color: backgroundColor,
    avatar_scale: profileScale,
    avatar_x: profilePos.x,
    avatar_y: profilePos.y,
    banner_scale: bannerScale,
    banner_x: bannerPos.x,
    banner_y: bannerPos.y,
  },
  { onConflict: "id" }
)
  

  setSaving(false)

  if (error) {
    alert("Save failed ❌")
    console.log(error)
  } else {
    setSaveSuccess(true)

    setTimeout(() => {
      setSaveSuccess(false)
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
  const [layout, setLayout] = useState("executive");

  // -----------------------------
  // SIDEBAR VISIBILITY
  // -----------------------------
  const [panelOpen, setPanelOpen] = useState(true);
const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
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
  .eq("id", userData.user.id);
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
  .eq("id", userData.user.id);
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
  // -----------------------------
  // MODES
  // -----------------------------
  const MODES = [
    { id: "business", label: "Business Mode" },
    { id: "university", label: "University Mode" },
    { id: "clients", label: "Clients Mode" },
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

  profileScale={profileScale}
  setProfileScale={setProfileScale}
  profilePos={profilePos}
  setProfilePos={setProfilePos}

  bannerScale={bannerScale}
  setBannerScale={setBannerScale}
  bannerPos={bannerPos}
  setBannerPos={setBannerPos}
/>
  );
case "university":
  return <UniversityLayout {...layoutProps} layout={layout} />;
case "clients":
  return <ClientsLayout {...layoutProps} layout={layout} />;
case "social":
  return <SocialLayout {...layoutProps} layout={layout} />;



case "networking":
  return (
    <NetworkingLayout
      {...layoutProps}
      layout={layout}
      backgroundColor={backgroundColor}
      profileImage={avatarUrl}
      handleProfileUpload={handleAvatarUpload}
    />
  );

  
      default:
        return null;
    }
  };

  const PLACEHOLDERS = {
    phone: "Phone number",
    email: "Email address",
    linkedin: "LinkedIn URL",
    instagram: "Instagram username",
    website: "Website URL",
    bio: "Short bio",
  };

return (
  <div className="w-full min-h-screen flex justify-center relative">
{/* AVATAR MENU */}
<div ref={avatarMenuRef} className="absolute top-6 right-6 z-50">

  <button
    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm"
  >
    {name?.charAt(0)?.toUpperCase() || "U"}
  </button>

  {avatarMenuOpen && (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden">

   <button
  onClick={() => username && window.open(`/${username}`, "_blank")}
  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
>
  View Profile
</button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Logout
      </button>

    </div>
  )}

</div>
    {/* Toggle Button */}
    <button
      onClick={() => setPanelOpen(true)}
      className="fixed left-6 top-6 z-30 bg-white shadow-md border rounded-full w-9 h-9 flex items-center justify-center"
    >
      ☰
    </button>

    {/* LEFT SIDEBAR OVERLAY */}
    <AnimatePresence>
      {panelOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className="fixed inset-0 z-40"
  onClick={() => setPanelOpen(false)}
/>


          {/* Floating panel */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-6 top-10 h-[85vh] w-[280px] 
           bg-white rounded-2xl shadow-2xl 
           p-6 space-y-6 z-50
           overflow-y-auto scrollbar-hide"
          >
            <h2 className="text-lg font-bold">taply.now</h2>

            <div className="flex flex-col gap-3">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 py-2 rounded-lg border text-left ${
                    mode === m.id
                      ? "bg-blue-100 border-blue-400 text-blue-700"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 rounded-lg border ${
                  isEditing
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-gray-100"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-lg border ${
                  !isEditing
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-gray-100"
                }`}
              >
                Preview
              </button>
            </div>
<button
  onClick={handleSave}
  disabled={saving}
  className={`w-full py-2 rounded-lg mt-3 transition ${
    saving
      ? "bg-gray-400 text-white"
      : saveSuccess
      ? "bg-green-600 text-white"
      : "bg-black text-white hover:opacity-90"
  }`}
>
  {saving ? "Saving..." : saveSuccess ? "Saved ✓" : "Save Profile"}
</button>
            {isEditing && (
              <div className="space-y-6 pt-6 border-t">
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border rounded-lg"
                    placeholder="Your name"
                  />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Your title"
                  />
                </div>
{mode === "business" && (
<div className="space-y-5">
  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
    Contact Fields
  </h3>

 {/* PHONE */}
<motion.div
  layout
  className={`rounded-xl border p-3 transition ${
    fields.phone
      ? "bg-blue-50 border-blue-200"
      : "bg-gray-50 border-gray-200"
  }`}
>
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">Phone</span>

    <button
      onClick={() =>
        fields.phone ? removeField("phone") : addField("phone")
      }
      className={`w-5 h-5 rounded-full border transition ${
        fields.phone
          ? "bg-blue-500 border-blue-500"
          : "bg-white border-gray-300"
      }`}
    />
  </div>

  <AnimatePresence>
    {fields.phone && (
      <motion.input
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 w-full px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Phone number"
        value={fieldValues.phone}
        onChange={(e) => updateField("phone", e.target.value)}
      />
    )}
  </AnimatePresence>
</motion.div>


  {/* EMAIL */}
<motion.div
  layout
  className={`rounded-xl border p-3 transition ${
    fields.email
      ? "bg-blue-50 border-blue-200"
      : "bg-gray-50 border-gray-200"
  }`}
>
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">Email</span>

    <button
      onClick={() =>
        fields.email ? removeField("email") : addField("email")
      }
      className={`w-5 h-5 rounded-full border transition ${
        fields.email
          ? "bg-blue-500 border-blue-500"
          : "bg-white border-gray-300"
      }`}
    />
  </div>

  <AnimatePresence>
    {fields.email && (
      <motion.input
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 w-full px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Email address"
        value={fieldValues.email}
        onChange={(e) => updateField("email", e.target.value)}
      />
    )}
  </AnimatePresence>
</motion.div>


{/* LINKEDIN */}
<motion.div
  layout
  className={`rounded-xl border p-3 transition ${
    fields.linkedin
      ? "bg-blue-50 border-blue-200"
      : "bg-gray-50 border-gray-200"
  }`}
>
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">LinkedIn</span>

    <button
      onClick={() =>
        fields.linkedin
          ? removeField("linkedin")
          : addField("linkedin")
      }
      className={`w-5 h-5 rounded-full border transition ${
        fields.linkedin
          ? "bg-blue-500 border-blue-500"
          : "bg-white border-gray-300"
      }`}
    />
  </div>

  <AnimatePresence>
    {fields.linkedin && (
      <motion.input
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 w-full px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="LinkedIn URL"
        value={fieldValues.linkedin}
        onChange={(e) => updateField("linkedin", e.target.value)}
      />
    )}
  </AnimatePresence>
</motion.div>

{/* INSTAGRAM */}
<motion.div
  layout
  className={`rounded-xl border p-3 transition ${
    fields.instagram
      ? "bg-blue-50 border-blue-200"
      : "bg-gray-50 border-gray-200"
  }`}
>
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium">Instagram</span>

    <button
      onClick={() =>
        fields.instagram
          ? removeField("instagram")
          : addField("instagram")
      }
      className={`w-5 h-5 rounded-full border transition ${
        fields.instagram
          ? "bg-blue-500 border-blue-500"
          : "bg-white border-gray-300"
      }`}
    />
  </div>

  <AnimatePresence>
    {fields.instagram && (
      <motion.input
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-3 w-full px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Instagram username"
        value={fieldValues.instagram}
        onChange={(e) => updateField("instagram", e.target.value)}
      />
    )}
  </AnimatePresence>
</motion.div>
</div>
)}
{mode === "networking" && (
<div className="space-y-5">
  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
    Networking Fields
  </h3>

  {/* PHONE */}
  <motion.div
    layout
    className={`rounded-xl border p-3 transition ${
      fields.phone
        ? "bg-blue-50 border-blue-200"
        : "bg-gray-50 border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Phone</span>

      <button
        onClick={() =>
          fields.phone ? removeField("phone") : addField("phone")
        }
        className={`w-5 h-5 rounded-full border transition ${
          fields.phone
            ? "bg-blue-500 border-blue-500"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  </motion.div>

  {/* LOCATION */}
  <motion.div
    layout
    className={`rounded-xl border p-3 transition ${
      fields.bio
        ? "bg-blue-50 border-blue-200"
        : "bg-gray-50 border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Location</span>

      <button
        onClick={() =>
          fields.bio ? removeField("bio") : addField("bio")
        }
        className={`w-5 h-5 rounded-full border transition ${
          fields.bio
            ? "bg-blue-500 border-blue-500"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  </motion.div>

  {/* PORTFOLIO */}
  <motion.div
    layout
    className={`rounded-xl border p-3 transition ${
      fields.website
        ? "bg-blue-50 border-blue-200"
        : "bg-gray-50 border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Portfolio</span>

      <button
        onClick={() =>
          fields.website ? removeField("website") : addField("website")
        }
        className={`w-5 h-5 rounded-full border transition ${
          fields.website
            ? "bg-blue-500 border-blue-500"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  </motion.div>

</div>
)}


              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* RIGHT DISPLAY */}
    <div className="w-full max-w-4xl flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-3xl"
        >
          {renderLayout()}
        </motion.div>
      </AnimatePresence>
    </div>

</div>
  );
}

