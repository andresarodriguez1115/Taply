"use client";

import Image from "next/image";
import React from "react";

export default function ProfileHeader({
  coverPhoto = "/default-cover.jpg",
  profilePhoto = "/default-profile.jpg",
  name = "Your Name Here",
  title = "Your Title / Major",
  editable = true,
  onEditPhoto = () => {},
  onEditCover = () => {},
}) {
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-slate-200">
      {/* Top Cover Photo */}
      <div className="relative w-full h-40 bg-slate-200">
        <Image
          src={coverPhoto}
          alt="Cover"
          fill
          className="object-cover"
        />

        {/* Edit Cover Button */}
        {editable && (
          <button
            onClick={onEditCover}
            className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm hover:bg-black/80"
          >
            Edit Cover
          </button>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-14 mb-3">
        <div className="relative w-28 h-28">
          <Image
            src={profilePhoto}
            alt="Profile"
            fill
            className="rounded-full object-cover border-[6px] border-white shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
          />

          {/* Edit Profile Photo */}
          {editable && (
            <button
              onClick={onEditPhoto}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full shadow"
            >
              Edit Photo
            </button>
          )}
        </div>
      </div>

      {/* Name + Title */}
      <div className="text-center px-4 pb-5">
        <div className="text-xl font-semibold text-slate-900">
          {name}
        </div>
        <div className="text-sm text-slate-500 mt-0.5">{title}</div>
      </div>
    </div>
  );
}
