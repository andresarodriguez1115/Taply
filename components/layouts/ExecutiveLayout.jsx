"use client";

import { motion } from "framer-motion";
import { Phone, Mail, ChevronRight, Linkedin, Instagram } from "lucide-react";
export default function ExecutiveLayout({  name,
  
  title,
  isEditing,
  cardColor,
  bannerImage,
  profileImage,
  profileScale,
  profilePos,
  bannerScale,
  bannerPos,
fields,
fieldValues,
  profileMouseDown,
  profileMouseMove,
  profileMouseUp,

  bannerMouseDown,
  bannerMouseMove,
  bannerMouseUp,

  handleProfileUpload,
  handleBannerUpload,

  setProfileScale,
  setBannerScale,
  fontFamily,
  nameSize,
  titleSize,
  cardRadius
}) {
  return (
    <div
      style={{
        ...(fontFamily ? { fontFamily } : {})
      }}
      className="pt-0 pb-8 flex flex-col items-center w-full max-w-[650px] mx-auto"
    >

      {/* BANNER */}
      <div
className="group w-[650px] h-[260px] bg-gray-200 rounded-3xl relative overflow-hidden  cursor-grab border-[6px] border-white"        onMouseDown={bannerMouseDown}
        onMouseMove={bannerMouseMove}
        onMouseUp={bannerMouseUp}
        onMouseLeave={bannerMouseUp}
      >
        {bannerImage && (
          <motion.img
            src={bannerImage}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              scale: bannerScale,
              translateX: bannerPos.x,
              translateY: bannerPos.y,
            }}
            draggable={false}
          />
        )}

        {isEditing && bannerImage && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              value={bannerScale}
              onChange={(e) => setBannerScale(Number(e.target.value))}
              className="w-[110px]"
            />
          </div>
        )}

        {isEditing && (
          <label className="absolute top-2 right-2 px-2 py-1 text-[10px] rounded bg-black text-white cursor-pointer">
            Change
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </label>
        )}
      </div>

      {/* PROFILE CONTAINER */}
      <div className="relative -mt-32 group self-start -ml-12">

        {/* PROFILE IMAGE */}
        <div
          className="w-[170px] h-[170px] rounded-full border-[6px] border-white overflow-hidden shadow-xl bg-gray-300 cursor-grab"
          onMouseDown={profileMouseDown}
          onMouseMove={profileMouseMove}
          onMouseUp={profileMouseUp}
          onMouseLeave={profileMouseUp}
        >
          {profileImage && (
            <motion.img
              src={profileImage}
              className="w-full h-full object-contain"
              style={{
                scale: profileScale,
                translateX: profilePos.x,
                translateY: profilePos.y,
              }}
              draggable={false}
            />
          )}
        </div>

        {isEditing && profileImage && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              value={profileScale}
              onChange={(e) => setProfileScale(Number(e.target.value))}
              className="w-[100px]"
            />
          </div>
        )}

        {isEditing && (
          <label className="block text-center text-xs mt-2 cursor-pointer">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileUpload}
            />
          </label>
        )}
      </div>

      {/* NAME CARD (NOW PERFECTLY ALIGNED) */}
<div className="-mt-20 w-[650px] bg-white rounded-2xl shadow-md px-6 py-6">        
  <div className="ml-[40px] mt-16 text-left">
          <h1
            className="font-bold"
            style={{ fontSize: `${nameSize + 6}px` }}
          >
            {name}
          </h1>

<p
  className="text-gray-500 mt-2 ml-1"
  style={{ fontSize: `${titleSize + 2}px` }}
>
  {title}
</p>
        </div>
      </div>
      {/* SAVE CONTACT BUTTON */}
<div className="mt-8 w-[600px] flex justify-center">
<button
  className="w-full h-[60px] rounded-3xl bg-black text-white text-[16px]"
>
    Add To Contacts
  </button>
</div>
{/* ================= CONTACT SECTION ================= */}
{(fields?.phone ||
   fields?.email ||
   fields?.linkedin ||
   fields?.instagram) && (<div className="mt-10 space-y-4 flex flex-col items-center">  
  
  
  
   {/* PHONE */}
  {fields?.phone && fieldValues?.phone && (
    <a
      href={`tel:${fieldValues.phone}`}
className="w-[650px] flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center">
  <Phone size={18} className="text-white" />
</div>

        <div>
<p className="text-[18px] font-semibold text-gray-900">
  Call
</p>          <p className="text-sm text-gray-500">
            {fieldValues.phone}
          </p>
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-300" />
    </a>
  )}

  {/* EMAIL */}
  {fields?.email && fieldValues?.email && (
    <a
      href={`mailto:${fieldValues.email}`}
      className="w-[650px] flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
  <Mail size={18} className="text-white" />
</div>

        <div>
<p className="text-[18px] font-semibold text-gray-900">
  Email
</p>          <p className="text-sm text-gray-500 truncate">
            {fieldValues.email}
          </p>
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-300" />
    </a>
  )}

  {/* LINKEDIN */}
{fields?.linkedin && fieldValues?.linkedin && (
  <a
    href={fieldValues.linkedin}
    target="_blank"
    className="w-[650px] flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center">
        <Linkedin size={18} className="text-white" />
      </div>

      <div>
<p className="text-[18px] font-semibold text-gray-900">
  LinkedIn
</p>        <p className="text-sm text-gray-500 break-all">
          {fieldValues.linkedin}
        </p>
      </div>
    </div>

    <ChevronRight size={18} className="text-gray-300" />
  </a>
)}

{/* INSTAGRAM */}
{fields?.instagram && fieldValues?.instagram && (
  <a
    href={`https://instagram.com/${fieldValues.instagram}`}
    target="_blank"
    className="w-[650px] flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
<div className="w-11 h-11 rounded-full bg-pink-600 flex items-center justify-center">
  <Instagram size={18} className="text-white" />
</div>

      <div>
        <p className="text-[18px] font-semibold text-gray-900">
          Instagram
        </p>
        <p className="text-sm text-gray-500">
          @{fieldValues.instagram}
        </p>
      </div>
    </div>

    <ChevronRight size={18} className="text-gray-300" />
  </a>
)}
</div>

)}






<div className="mt-60 text-center select-none">
  <p className="text-xl font-light text-gray-700">
    taply<span className="font-semibold text-blue-600">.now</span>
  </p>

  <div className="w-12 h-[1px] bg-gray-300 mx-auto my-3"></div>

  <p className="text-xs text-gray-400 tracking-widest uppercase">
    MAKE CONNECTIONS COUNT
  </p>
</div>
    </div>
    
  );
}