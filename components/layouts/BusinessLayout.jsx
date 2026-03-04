"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, ChevronRight } from "lucide-react";
import ModernLayout from "./ModernLayout";
import MinimalLayout from "./MinimalLayout";
import ExecutiveLayout from "./ExecutiveLayout";



// ---------------------------
// Local Storage Helpers
// ---------------------------
const saveToLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const loadFromLS = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};
export default function BusinessLayout({
  name,
  title,
  isEditing,
  fields,
  fieldValues,
  avatarUrl,
  bannerUrl,
  handleAvatarUpload,
  handleBannerUpload,
  layout,
  setLayout,
  backgroundColor,
  setBackgroundColor,
  profileScale,
  setProfileScale,
  profilePos,
  setProfilePos,
  bannerScale,
  setBannerScale,
  bannerPos,
  setBannerPos,
})
 {
  // ---------------------------
  // State
  // ---------------------------

const activeLayout = layout ?? "modern";
const safeProfilePos = profilePos ?? { x: 0, y: 0 };
const safeProfileScale = profileScale ?? 1;
const safeBannerPos = bannerPos ?? { x: 0, y: 0 };

const safeBannerScale = bannerScale ?? 1;
const [bgColor, setBgColor] = useState(backgroundColor || "#e9eef5");
useEffect(() => {
  if (backgroundColor) {
    setBgColor(backgroundColor);
  }
}, [backgroundColor]);
  const [cardColor, setCardColor] = useState("#ffffff");
const [visualsOpen, setVisualsOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [fontFamily, setFontFamily] = useState("");
const [nameSize, setNameSize] = useState(22);
const [titleSize, setTitleSize] = useState(14);
const [cardRadius, setCardRadius] = useState(24);
const [contactFields, setContactFields] = useState({
  phone: false,
  email: false,
  linkedin: false,
});
  // ---------------------------
  // Load LocalStorage
  // ---------------------------
useEffect(() => {
  if (isEditing) {
    setBgColor(loadFromLS("bgColor", backgroundColor || "#e9eef5"));
  }

  setCardColor(loadFromLS("cardColor", "#ffffff"));
  setFontFamily(loadFromLS("fontFamily", "null"));
  setNameSize(loadFromLS("nameSize", 22));
  setTitleSize(loadFromLS("titleSize", 14));
  setCardRadius(loadFromLS("cardRadius", 24));
}, []);

  // ---------------------------
  // Auto-save
  // ---------------------------


useEffect(() => saveToLS("fontFamily", fontFamily), [fontFamily]);
useEffect(() => saveToLS("nameSize", nameSize), [nameSize]);
useEffect(() => saveToLS("titleSize", titleSize), [titleSize]);
useEffect(() => saveToLS("cardRadius", cardRadius), [cardRadius]);

useEffect(() => {
  setMounted(true);
  
}, []);

  // ---------------------------
  // Drag Logic
  // ---------------------------
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragLast = useRef({ x: 0, y: 0 });

  const profileMouseDown = (e) => {
    if (!isEditing) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragLast.current = { ...profilePos };
  };

  const profileMouseMove = (e) => {
    if (!dragging.current) return;
    setProfilePos({
      x: dragLast.current.x + (e.clientX - dragStart.current.x),
      y: dragLast.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const profileMouseUp = () => {
    dragging.current = false;
  };

  const bannerDragging = useRef(false);
  const bannerStart = useRef({ x: 0, y: 0 });
  const bannerLast = useRef({ x: 0, y: 0 });

  const bannerMouseDown = (e) => {
    if (!isEditing) return;
    bannerDragging.current = true;
    bannerStart.current = { x: e.clientX, y: e.clientY };
    bannerLast.current = { ...bannerPos };
  };

  const bannerMouseMove = (e) => {
    if (!bannerDragging.current) return;
    setBannerPos({
      x: bannerLast.current.x + (e.clientX - bannerStart.current.x),
      y: bannerLast.current.y + (e.clientY - bannerStart.current.y),
    });
  };

  const bannerMouseUp = () => {
    bannerDragging.current = false;
  };


  // ---------------------------
  // RENDER
  // ---------------------------
 return (
  <div
    style={{
      background: bgColor,
      paddingBottom: mounted && visualsOpen ? "380px" : "0px",
      transition: "padding-bottom 0.3s ease",
    }}
className={`w-full min-h-screen ${
  layout === "minimal"
    ? ""
    : "flex justify-center pt-6"
} ${visualsOpen ? "pb-[380px]" : "pb-10"}`}

  >

<div
  className={`${
    layout === "networking" || layout === "minimal"
      ? "w-full"
      : "w-[420px]"
  }`}
>

  
{isEditing && mounted && (
  <motion.div
    initial={false}
animate={{ y: visualsOpen ? 0 : 392 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50"
    style={{ height: 380 }}
  >
   {/* Bottom Handle */}
<button
  onClick={() => setVisualsOpen(!visualsOpen)}
  className="
    absolute -top-12 left-1/2 -translate-x-1/2
    bg-white
    px-6 py-2
    rounded-t-lg
    shadow
    text-sm font-medium
    border border-gray-200
    hover:bg-gray-50
    transition
  "
>
  {visualsOpen ? "Close Studio" : "Visuals Studio"}
</button>


    {/* Content */}
<div className="max-w-[900px] mx-auto h-full flex flex-col">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-4 border-b">
    <p className="text-sm font-semibold tracking-wide">
      Visuals Studio
    </p>

    <button
      onClick={() => setVisualsOpen(false)}
      className="text-sm text-gray-500 hover:text-gray-800 transition"
    >
      Close
    </button>
  </div>

  {/* Content */}
  <div className="p-6 flex-1">
<div className="grid grid-cols-4 gap-6">
        {/* Layout */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Layout</p>
         <div className="rounded-xl border p-3 space-y-3">

<button
onClick={() => setLayout?.("executive")}
  className={`w-full p-3 rounded-lg border text-sm font-medium transition
    ${layout === "executive"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 hover:bg-gray-50"}`}
>
  Executive
</button>

<button
 onClick={() => setLayout?.("modern")}
  className={`w-full p-3 rounded-lg border text-sm font-medium transition
    ${layout === "modern"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 hover:bg-gray-50"}`}
>
  Modern
</button>

<button
onClick={() => {
  setLayout?.("minimal");
  setProfileScale?.(1);
  setProfilePos?.({ x: 0, y: 0 });
}}
  className={`w-full p-3 rounded-lg border text-sm font-medium transition
    ${layout === "minimal"
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 hover:bg-gray-50"}`}
>
  Minimal
</button>

</div>

        </div>

        {/* Colors */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Colors</p>
          <div className="rounded-xl border p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Background</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
  setBgColor(e.target.value);
  setBackgroundColor(e.target.value);
}}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Card</span>
              <input
                type="color"
                value={cardColor}
                onChange={(e) => setCardColor(e.target.value)}
              />
            </div>
          </div>
        </div>
{/* Typography */}
<div>
  <p className="text-xs font-medium text-gray-500 mb-2">
    Typography
  </p>

  <div className="rounded-xl border p-3 space-y-4">

    {/* Font */}
    <div>
      <p className="text-sm mb-1">Font</p>
      <select
  value={fontFamily}
  onChange={(e) => setFontFamily(e.target.value)}
  className="w-full border rounded-lg px-2 py-1 text-sm"
>
  <option value="">Default (Sans)</option>
  <option value="sans-serif">Sans</option>
  <option value="Inter">Inter</option>
  <option value="serif">Serif</option>
  <option value="monospace">Monospace</option>
</select>

    </div>

    {/* Name Size */}
<div>
  <p className="text-sm mb-1">Name Size</p>
  <div className="flex items-center gap-2">
    <input
      type="number"
      min="18"
      max="40"
      value={nameSize}
      onChange={(e) => setNameSize(Number(e.target.value))}
      className="w-full border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <span className="text-xs text-gray-500">px</span>
  </div>
</div>


{/* Title Size */}
<div>
  <p className="text-sm mb-1">Title Size</p>
  <div className="flex items-center gap-2">
    <input
      type="number"
      min="12"
      max="24"
      value={titleSize}
      onChange={(e) => setTitleSize(Number(e.target.value))}
      className="w-full border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <span className="text-xs text-gray-500">px</span>
  </div>
</div>

{/* Card Radius */}
<div>
  <p className="text-sm mb-1">Card Radius</p>
  <div className="flex items-center gap-2">
    <input
      type="number"
      min="0"
      max="60"
      value={cardRadius}
      onChange={(e) => setCardRadius(Number(e.target.value))}
      className="w-full border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <span className="text-xs text-gray-500">px</span>
  </div>
</div>

  </div>
</div>

        {/* Images */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Images</p>
          <div className="rounded-xl border p-3 text-sm text-gray-400">
            Image controls next
          </div>
        </div>
      </div>
    </div>
    </div>
  </motion.div>
)}



{activeLayout === "modern" && (
  <ModernLayout
    name={name}
    title={title}
    cardColor={cardColor}
    bannerImage={bannerUrl}
    profileImage={avatarUrl}
    isEditing={isEditing}
profileScale={safeProfileScale}
profilePos={safeProfilePos}
bannerScale={safeBannerScale}
bannerPos={safeBannerPos}

    profileMouseDown={profileMouseDown}
    profileMouseMove={profileMouseMove}
    profileMouseUp={profileMouseUp}

    bannerMouseDown={bannerMouseDown}
    bannerMouseMove={bannerMouseMove}
    bannerMouseUp={bannerMouseUp}

    handleProfileUpload={handleAvatarUpload}
    handleBannerUpload={handleBannerUpload}

    setProfileScale={setProfileScale}
    setBannerScale={setBannerScale}
   cardRadius={cardRadius}

fontFamily={fontFamily}
nameSize={nameSize}
titleSize={titleSize}

    
  />
)}

{activeLayout === "minimal" && (
<MinimalLayout
  name={name}
  title={title}
  bannerImage={bannerUrl}
  profileImage={avatarUrl}
  fields={fields}
  fieldValues={fieldValues}
  isEditing={isEditing}
  handleProfileUpload={handleAvatarUpload}

  profileScale={safeProfileScale}
  profilePos={safeProfilePos}
  setProfileScale={setProfileScale}
  profileMouseDown={profileMouseDown}
  profileMouseMove={profileMouseMove}
  profileMouseUp={profileMouseUp}
/>
)}

{activeLayout === "executive" && (
  <ExecutiveLayout
    name={name}
    title={title}
    isEditing={isEditing}
    cardColor={cardColor}
    bannerImage={bannerUrl}
    profileImage={avatarUrl}

    profileScale={profileScale}
    profilePos={profilePos}
    bannerScale={bannerScale}
    bannerPos={bannerPos}

    profileMouseDown={profileMouseDown}
    profileMouseMove={profileMouseMove}
    profileMouseUp={profileMouseUp}

    bannerMouseDown={bannerMouseDown}
    bannerMouseMove={bannerMouseMove}
    bannerMouseUp={bannerMouseUp}

    handleProfileUpload={handleAvatarUpload}
    handleBannerUpload={handleBannerUpload}

    setProfileScale={setProfileScale}
    setBannerScale={setBannerScale}

    fontFamily={fontFamily}
    nameSize={nameSize}
    titleSize={titleSize}
    cardRadius={cardRadius}
    fields={fields}
fieldValues={fieldValues}
  />
)}

{/* ================= CONTACT SECTION ================= */}
{layout === "modern" &&
  (fields?.phone ||
   fields?.email ||
   fields?.linkedin ||
   fields?.instagram) && (
  <div className="space-y-6">

    {/* Primary CTA */}
<button
  className="
    w-full
    py-4
    rounded-2xl
    bg-black
    text-white
    font-medium
    tracking-wide
    shadow-[0_10px_30px_rgba(0,0,0,0.18)]
    hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
    active:scale-[0.98]
    transition-all duration-300
  "
>
  Exchange Contact
</button>




    {/* Contact Container */}
    <div className="rounded-xl bg-white border border-gray-300 shadow-sm overflow-hidden">

      {/* PHONE */}
      {fields?.phone && fieldValues?.phone && (
        <a
          href={`tel:${fieldValues.phone}`}
         className="group flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"

        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full 
                            bg-green-50 border border-green-100
 flex items-center justify-center
                            group-hover:scale-105 transition">
              <Phone size={18} className="text-green-700" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Call
              </p>
              <p className="text-sm text-gray-500">
                {fieldValues.phone}
              </p>
            </div>
          </div>

          <ChevronRight
            size={18}
            className="text-gray-300 group-hover:text-gray-500 transition"
          />
        </a>
      )}

      {/* EMAIL */}
      {fields?.email && fieldValues?.email && (
        <a
          href={`mailto:${fieldValues.email}`}
className="group flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"

        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full 
                            bg-blue-100 flex items-center justify-center
                            group-hover:scale-105 transition">
              <Mail size={18} className="text-blue-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Email
              </p>
              <p className="text-sm text-gray-500 break-all">
                {fieldValues.email}
              </p>
            </div>
          </div>

          <ChevronRight
            size={18}
            className="text-gray-300 group-hover:text-gray-500 transition"
          />
        </a>
      )}

      {/* LINKEDIN */}
      {fields?.linkedin && fieldValues?.linkedin && (
        <a
          href={fieldValues.linkedin}
          target="_blank"
className="group flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"

        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full 
                            bg-indigo-100 flex items-center justify-center
                            group-hover:scale-105 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="text-indigo-600"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.943 13.5V6.169H2.542V13.5h2.401zm-1.2-8.3c.837 0 1.358-.554 1.358-1.248-.015-.709-.521-1.248-1.342-1.248-.821 0-1.357.54-1.357 1.248 0 .694.521 1.248 1.326 1.248h.015zm4.908 8.3V9.359c0-.222.016-.444.082-.603.179-.444.586-.904 1.27-.904.896 0 1.254.682 1.254 1.683V13.5h2.401V9.262c0-2.27-1.21-3.327-2.823-3.327-1.303 0-1.885.715-2.211 1.215v.025h-.015a5.54 5.54 0 01.015-.025V6.169H6.25c.03.66 0 7.331 0 7.331h2.401z"/>
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                LinkedIn
              </p>
              <p className="text-sm text-gray-500 break-all">
                {fieldValues.linkedin}
              </p>
            </div>
          </div>

          <ChevronRight
            size={18}
            className="text-gray-300 group-hover:text-gray-500 transition"
          />
        </a>
      )}
{/* INSTAGRAM */}
{fields?.instagram && fieldValues?.instagram && (
  <a
    href={`https://instagram.com/${fieldValues.instagram}`}
    target="_blank"
    className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm border hover:shadow-md transition"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
        <span className="text-pink-600 font-semibold">IG</span>
      </div>

      <div>
        <p className="text-sm font-semibold">Instagram</p>
        <p className="text-xs text-gray-500">
          @{fieldValues.instagram}
        </p>
      </div>
    </div>

    <span className="text-gray-400">›</span>
  </a>
)}
    </div>
  </div>
)}



      </div>  
    </div>    
  );
}