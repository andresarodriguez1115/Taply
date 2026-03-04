"use client";

import React from "react";
import { motion } from "framer-motion";

// FIXED import path 🔥
import ProfileHeader from "../ProfileHeader";

export default function MainLayout({
  bannerImage,
  avatarImage,
  name,
  title,
  aboutText,
  phone,
  email,
  website,
  instagram,
  tiktok,
  snapchat,
  youtube,
  linkedin,
  resume,
  isEditing,
}) {
  return (
    <div
style={{
  background: cardColor,
  borderRadius: `${cardRadius}px`,
  ...(fontFamily ? { fontFamily } : {})
}}



className="pt-0 pb-8 flex flex-col items-center"
>

      {/* BANNER */}
      <div
className="group w-full h-[175px] bg-gray-200 rounded-3xl relative overflow-hidden shadow-md cursor-grab"

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

        {/* Banner Zoom */}
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

      {/* PROFILE */}
      <div className="relative -mt-20 group">
        <div
          className="w-[150px] h-[150px] rounded-full border-[6px] border-white overflow-hidden shadow-xl bg-gray-300 cursor-grab"
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

        {/* Profile Zoom */}
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

      {/* NAME */}
      <div className="mt-6 text-center">
<h1
  className="text-2xl font-semibold"
style={
  nameSize !== 22
    ? { fontSize: `${nameSize}px` }
    : undefined
}
>
  {name}
</h1>
<p
  className="text-sm text-gray-500"
style={
  titleSize !== 14
    ? { fontSize: `${titleSize}px` }
    : undefined
}
>
  {title}
</p>
      </div>
    </div>
  );
}
