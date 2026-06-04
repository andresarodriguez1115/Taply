"use client";

import { Phone, Mail, Instagram, Linkedin, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { logEvent } from "@/lib/logEvent";


import { motion } from "framer-motion";
export default function MinimalLayout({
  name,
  title,
  bannerImage,
  profileImage,
  fields,
  fieldValues,
  isEditing,
  handleProfileUpload,
  profileScale,
  profilePos,
  setProfileScale,
  profileMouseDown,
  profileMouseMove,
  profileMouseUp,
  profileId,
  fontFamily = "system-ui",
  fontSize = 100,
  minNameSize = 100,
  minTitleSize = 100,
  minContactSize = 100,
  nameColor = "#000000",
  titleColor = "#6b7280",
})
{

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "minimalProfilePosition",
      JSON.stringify({
        scale: profileScale,
        pos: profilePos
      })
    );
  }
}, [profileScale, profilePos]);

useEffect(() => {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("minimalProfilePosition");

  if (!saved) return;

  const data = JSON.parse(saved);
if (data.scale !== undefined && setProfileScale) {
  setProfileScale(data.scale);
}

  if (data.pos) {
    profilePos.x = data.pos.x;
    profilePos.y = data.pos.y;
  }
}, []);

  return (
    <div className="w-full bg-[#f4f4f4] min-h-screen" style={{ fontFamily: fontFamily }}>

      {/* FULL WIDTH IMAGE */}
<div className="relative w-full max-w-5xl mx-auto aspect-[1/.9] sm:aspect-[1/0.8] overflow-hidden group">
{isEditing && profileImage && (
<div
className="absolute bottom-4 left-1/2 -translate-x-1/2 
           bg-white/90 px-4 py-2 rounded-full shadow-lg
           opacity-0 group-hover:opacity-100
           transition
           z-20"
>

    <input
      type="range"
      min="0.5"
      max="2"
      step="0.01"
value={profileScale}
onChange={(e) => setProfileScale && setProfileScale(Number(e.target.value))}
      className="w-[120px]"
    />
  </div>
)}


<motion.img
  src={profileImage}
  className="absolute inset-0 w-full h-full object-contain cursor-grab touch-none"
  style={{
    scale: profileScale,
    translateX: profilePos.x,
    translateY: profilePos.y,
  }}
  onMouseDown={profileMouseDown}
  onMouseMove={profileMouseMove}
  onMouseUp={profileMouseUp}

  onTouchStart={profileMouseDown}
  onTouchMove={profileMouseMove}
  onTouchEnd={profileMouseUp}

  draggable={false}
/>

{isEditing && (
  <label className="absolute bottom-4 right-4 bg-white border border-gray-200 shadow-md px-4 py-1.5 rounded-full text-xs font-medium text-gray-700 cursor-pointer z-20">
    Change Photo
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleProfileUpload}
    />
  </label>
)}

{!profileImage && bannerImage && (
  <img
    src={bannerImage}
    className="w-full h-full object-cover cursor-move"
    style={{
      transform: `scale(${imageScale}) translateY(${imageY}px)`
    }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
  />
)}



        {/* Fade overlay */}
<div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-[#f4f4f4] via-[#f4f4f4]/10 to-transparent pointer-events-none" />
      </div>

    
{/* NAME SECTION */}
<div className="text-center mt-4">
  <h1 className="font-bold" style={{ fontSize: `${2.25 * minNameSize / 100}rem`, color: nameColor }}>
    {name}
  </h1>
  <p className="uppercase tracking-[0.1em] mt-4" style={{ fontSize: `${1.125 * minTitleSize / 100}rem`, color: titleColor }}>
    {title}
  </p>
</div>



{/* CONTACT CARD */}
<div className="px-6 mt-6 max-w-2xl mx-auto">
<div className="bg-white border border-gray-200 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-6 divide-y divide-gray-100">

    <div className="flex items-center gap-3 mb-6">
      <div className="w-[44px] h-[44px] bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <h2 className="font-semibold" style={{ fontSize: `${1.125 * minContactSize / 100}rem` }}>Contact Information</h2>

    </div>


    {fields?.phone && fieldValues?.phone && (

      <>
        <a href={`tel:${fieldValues.phone}`} onClick={() => logEvent(profileId, "tap")} className="flex items-center gap-4 py-4">          <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#22c55e" }}>
            <Phone size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold" style={{ fontSize: `${1 * minContactSize / 100}rem` }}>Call</p>
            <p className="text-gray-400" style={{ fontSize: `${0.875 * minContactSize / 100}rem` }}>{fieldValues.phone}</p>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </a>
        
      </>
    )}

    {fields?.email && fieldValues?.email && (
      <>
        <a href={`mailto:${fieldValues.email}`} onClick={() => logEvent(profileId, "tap")} className="flex items-center gap-4 py-4">

          <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#3b82f6" }}>
            <Mail size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold" style={{ fontSize: `${1 * minContactSize / 100}rem` }}>Email</p>
            <p className="text-gray-400 truncate" style={{ fontSize: `${0.875 * minContactSize / 100}rem` }}>{fieldValues.email}</p>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </a>
        
      </>
    )}

    {fields?.linkedin && fieldValues?.linkedin && (
      <>
        <a href={fieldValues.linkedin.startsWith("http") ? fieldValues.linkedin : `https://linkedin.com/in/${fieldValues.linkedin}`} target="_blank" onClick={() => logEvent(profileId, "tap")} className="flex items-center gap-4 py-4">
          <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#6366f1" }}>
            <Linkedin size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold" style={{ fontSize: `${1 * minContactSize / 100}rem` }}>LinkedIn</p>
            <p className="text-gray-400 truncate" style={{ fontSize: `${0.875 * minContactSize / 100}rem` }}>@{fieldValues.linkedin.replace(/.*linkedin\.com\/in\//,"")}</p>          </div>
          <span className="text-gray-300 text-lg">›</span>
        </a>
        
      </>
    )}

    {fields?.instagram && fieldValues?.instagram && (      <a href={`https://instagram.com/${fieldValues.instagram}`} target="_blank" onClick={() => logEvent(profileId, "tap")} className="flex items-center gap-4 py-4">    
        <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#ec4899" }}>
          <Instagram size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold" style={{ fontSize: `${1 * minContactSize / 100}rem` }}>Instagram</p>
          <p className="text-gray-400" style={{ fontSize: `${0.875 * minContactSize / 100}rem` }}>@{fieldValues.instagram}</p>
        </div>
        <span className="text-gray-300 text-lg">›</span>
      </a>
    )}
{fields?.website && fieldValues?.website && (
  <>
    

    <a
      href={
        fieldValues.website.startsWith("http")
          ? fieldValues.website
          : `https://${fieldValues.website}`
      }
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logEvent(profileId, "tap")}
      className="flex items-center gap-4 py-4"
    >
      <div
        className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "#06b6d4" }}
      >
        <Globe size={18} className="text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold" style={{ fontSize: `${1 * minContactSize / 100}rem` }}>Website</p>
        <p className="text-gray-400 truncate" style={{ fontSize: `${0.875 * minContactSize / 100}rem` }}>{fieldValues.website}</p>
      </div>

      <span className="text-gray-300 text-lg">›</span>
    </a>
  </>
)}
  </div>
</div>


      {/* SPACING */}
      <div className="h-20" />
    </div>
  );
}
