"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  const dragX = useMotionValue(0);
const fillWidth = useTransform(dragX, [0, 240], ["0px", "500px"]);
const [saved, setSaved] = useState(false);
  return (
    <div
      style={{
        ...(fontFamily ? { fontFamily } : {})
      }}
className="pt-8 pb-10 flex flex-col items-center w-full max-w-[400px] sm:max-w-[650px] mx-auto"    >

      {/* BANNER */}
      <div
className="group w-full h-[170px] sm:w-[650px] sm:h-[260px] bg-gray-200 rounded-3xl relative overflow-hidden cursor-grab border-[3px] border-white px-1"
onMouseDown={bannerMouseDown}
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
      <div className="relative -mt-20 sm:-mt-32 group mr-60 sm:self-start sm:-ml-12">

        {/* PROFILE IMAGE */}
        <div
          className="w-[100px] h-[100px] sm:w-[170px] sm:h-[170px] rounded-full border-[2px] border-white overflow-hidden shadow-xl bg-gray-300 cursor-grab touch-none"
style={{ touchaction: "none" }}
          onMouseDown={profileMouseDown}
          onMouseMove={profileMouseMove}
          onMouseUp={profileMouseUp}
          onMouseLeave={profileMouseUp}
onTouchStart={profileMouseDown}
onTouchMove={profileMouseMove}
onTouchEnd={profileMouseUp}
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
              className="w-[70px] sm:w-[110px]"
            />
          </div>
        )}

        {isEditing && (
          <label className="block text-center text-[9px] sm:text-xs mt-1 sm:mt-2 cursor-pointer text-gray-500">
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
<div className="-mt-20 w-full sm:w-[650px] bg-white rounded-2xl shadow-md px-6 py-6">
  <div className="ml- 20 mt-16 sm:ml-[30px] sm:mt-16 text-left ">
<h1
  className="font-bold"
  style={{
    fontSize: `clamp(${nameSize * 0.7}px, ${nameSize}px, ${nameSize}px)`
  }}
>
            {name}
          </h1>

<p
  className="text-gray-500 mt-2"
  style={{
    fontSize: `clamp(${titleSize * 0.8}px, ${titleSize}px, ${titleSize}px)`
  }}
>
  {title}
</p>
        </div>
      </div>
      {/* SAVE CONTACT BUTTON */}
<div className="mt-6 w-full sm:w-[600px] flex justify-center">
<div className="w-[95%] sm:w-full h-[48px] sm:h-[60px] bg-black rounded-3xl relative overflow-hidden flex items-center">

  {/* GREEN PROGRESS */}
  <motion.div
    style={{ width: fillWidth }}
    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-400"
  />

  {/* TEXT */}
  <span className="absolute w-full text-center text-white text-[13px] sm:text-[16px] font-semibold tracking-wide pointer-events-none">
    {saved ? "✓ Contact Saved" : "Slide to Save Contact"}
  </span>

  {/* SLIDER */}
  <motion.div
    drag="x"
    style={{ x: dragX }}
    dragConstraints={{ left: 0, right: 240 }}
    whileTap={{ scale: 1.1 }}
    onDragEnd={() => {
  const x = dragX.get();

  if (x > 200) {
    setSaved(true);

    setTimeout(() => {
      dragX.set(0);
      setSaved(false);
    }, 1800);
  } else {
    dragX.set(0);
  }
}}
    className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] bg-white rounded-full ml-2 flex items-center justify-center cursor-grab shadow-md"
  >
  
  </motion.div>

</div>
</div>
{/* ================= CONTACT SECTION ================= */}
{(fields?.phone ||
   fields?.email ||
   fields?.linkedin ||
   fields?.instagram) && (<div className="mt-6 space-y-4 flex flex-col items-center">  
  
  
  
   {/* PHONE */}
  {fields?.phone && fieldValues?.phone && (
    <a
      href={`tel:${fieldValues.phone}`}
className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-600 flex items-center justify-center">
<Phone size={12} className="text-white sm:w-[16px] sm:h-[16px]" />
</div>

        <div>
<p className="text-[16px] sm:text-[17px] font-semibold text-gray-900">
  Call
</p>          <p className="text-[14px] sm:text-sm text-gray-500">
            {fieldValues.phone}
          </p>
        </div>
      </div>

      <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
    </a>
  )}

  {/* EMAIL */}
  {fields?.email && fieldValues?.email && (
    <a
      href={`mailto:${fieldValues.email}`}
      className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
<Mail size={12} className="text-white sm:w-[16px] sm:h-[16px]" />

</div>

        <div>
<p className="text-[16px] sm:text-[17px] font-semibold text-gray-900">
  Email
</p>          <p className="text-[14px] sm:text-sm text-gray-500 truncate">
            {fieldValues.email}
          </p>
        </div>
      </div>

      <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
    </a>
  )}

  {/* LINKEDIN */}
{fields?.linkedin && fieldValues?.linkedin && (
  <a
    href={fieldValues.linkedin}
    target="_blank"
    className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 flex items-center justify-center">
       <Linkedin size={12} className="text-white sm:w-[16px] sm:h-[16px]" />

      </div>

      <div>
<p className="text-[16px] sm:text-[17px] font-semibold text-gray-900">
  LinkedIn
</p>        <p className="text-[14px] sm:text-sm text-gray-500 break-all">
          {fieldValues.linkedin}
        </p>
      </div>
    </div>

    <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
  </a>
)}

{/* INSTAGRAM */}
{fields?.instagram && fieldValues?.instagram && (
  <a
    href={`https://instagram.com/${fieldValues.instagram}`}
    target="_blank"
    className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-600 flex items-center justify-center">
  <Instagram size={12} className="text-white sm:w-[16px] sm:h-[16px]" />
</div>

      <div>
        <p className="text-[16px] sm:text-[17px] font-semibold text-gray-900">
          Instagram
        </p>
        <p className="text-[14px] sm:text-sm text-gray-500">
          @{fieldValues.instagram}
        </p>
      </div>
    </div>

    <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
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