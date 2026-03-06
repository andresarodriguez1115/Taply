"use client";

import { Phone, Mail, Instagram, Linkedin, IdCard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
    <div className="w-full bg-[#f4f4f4] min-h-screen">

      {/* FULL WIDTH IMAGE */}
<div className="relative w-full max-w-5xl mx-auto aspect-[1/.9] sm:aspect-[1/0.8] overflow-hidden group">
{isEditing && profileImage && (
  <div
className="absolute top-3 left-1/2 -translate-x-1/2 
           bg-white/90 px-3 py-2 rounded-full shadow-lg
           sm:opacity-0 sm:group-hover:opacity-100
           opacity-100 transition
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
  <label className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded cursor-pointer">
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
  <h1 className="text-4xl sm:text-5xl font-bold text-black">
    {name}
  </h1>
  <p className="uppercase text-lg sm:text-2xl tracking-[0.1em] text-gray-600 mt-4">
    {title}
  </p>
</div>



{/* CONTACT CARD */}
<div className="px-6 mt-6 max-w-2xl mx-auto">
  <div className="bg-[#f8f8f8] border border-gray-300 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-6">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6 sm:mb-6">
     <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] bg-black text-white rounded-full flex items-center justify-center">
  <IdCard size={24} className="text-white" />
</div>
      <h2 className="text-lg sm:text-2xl font-semibold">Contact Information</h2>
    </div>

    <div className="border-t border-gray-400 mb-6 sm:mb-6" />

    {/* Call */}
    {fieldValues?.phone && (
      <div className="flex items-center gap-4 mb-6">
    <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full bg-black flex items-center justify-center">
  <Phone size={18} className="text-white" />
</div>
        <div>
          <p className="text-lg sm:text-2xl font-semibold">Call</p>
          <p className="text-sm sm:text-lg text-gray-600">
            {fieldValues?.phone}
          </p> 
        </div>
      </div>
    )}

    {/* Email */}
    {fieldValues?.email && (
      <div className="flex items-center gap-4 mb-6">
      <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full bg-black flex items-center justify-center">
  <Mail size={18} className="text-white" />
</div>
        <div>
          <p className="text-lg sm:text-2xl font-semibold">Email</p>
          <p className="text-sm sm:text-lg text-gray-600 break-all">
            {fieldValues?.email}
          </p>
        </div>
      </div>
    )}

    {/* LinkedIn */}
{fieldValues?.linkedin && (
  <div className="flex items-center gap-4 mb-6">
   <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-full bg-black flex items-center justify-center">
  <Linkedin size={18} className="text-white" />
</div>
        <div>
          <p className="text-lg sm:text-2xl font-semibold">LinkedIn</p>
          <p className="text-sm sm:text-lg text-gray-600">
            {fieldValues?.linkedin}
          </p>
        </div>
      </div>
    )}
{/* Instagram */}
{fieldValues?.instagram && (
  <div className="flex items-center gap-4">
    <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] shadow-md bg-black text-white rounded-full flex items-center justify-center">
      <Instagram size={18} />
    </div>
    <div>
      <p className="text-lg sm:text-2xl font-semibold">Instagram</p>
      <a
        href={`https://instagram.com/${fieldValues.instagram}`}
        target="_blank"
        className="text-sm sm:text-lg text-gray-600"
      >
        @{fieldValues.instagram}
      </a>
    </div>
  </div>
)}
  </div>
</div>


      {/* SPACING */}
      <div className="h-20" />
    </div>
  );
}
