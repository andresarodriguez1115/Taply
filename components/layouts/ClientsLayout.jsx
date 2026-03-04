"use client";

import React from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../ProfileHeader";

export default function ClientLayout({
  bannerImage,
  avatarImage,
  name,
  title,
  phone,
  email,
  website,
  isEditing,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
    >
      {/* Header */}
      <ProfileHeader
        bannerImage={bannerImage}
        avatarImage={avatarImage}
        name={name}
        title={title}
        isEditing={isEditing}
      />

      {/* Client / Business Info */}
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Client Meeting Information
        </h2>

        {/* Phone */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
          <div className="text-slate-700">Phone</div>
          <div className="text-slate-900 font-medium">{phone}</div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
          <div className="text-slate-700">Email</div>
          <div className="text-slate-900 font-medium">{email}</div>
        </div>

        {/* Website */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
          <div className="text-slate-700">Website</div>
          {website ? (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
            >
              Visit Site
            </a>
          ) : (
            <div className="text-slate-400 text-sm">Not provided</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
