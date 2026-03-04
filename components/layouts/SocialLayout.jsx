"use client";

import React from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../ProfileHeader";

export default function SocialLayout({
  bannerImage,
  avatarImage,
  name,
  title,
  instagram,
  tiktok,
  snapchat,
  youtube,
  linkedin,
  isEditing,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
    >
      {/* Profile Header */}
      <ProfileHeader
        bannerImage={bannerImage}
        avatarImage={avatarImage}
        name={name}
        title={title}
        isEditing={isEditing}
      />

      {/* Social Section */}
      <div className="p-6 space-y-5">
        <h2 className="text-xl font-semibold text-slate-800">Social Links</h2>

        {/* Instagram */}
        <SocialLinkRow label="Instagram" value={instagram} />

        {/* TikTok */}
        <SocialLinkRow label="TikTok" value={tiktok} />

        {/* Snapchat */}
        <SocialLinkRow label="Snapchat" value={snapchat} />

        {/* YouTube */}
        <SocialLinkRow label="YouTube" value={youtube} />

        {/* LinkedIn */}
        <SocialLinkRow label="LinkedIn" value={linkedin} />
      </div>
    </motion.div>
  );
}

/* COMPONENT — Social Link Row */
function SocialLinkRow({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
      <div className="text-slate-700">{label}</div>

      {value ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md"
        >
          Visit
        </a>
      ) : (
        <div className="text-slate-400 text-sm">Not provided</div>
      )}
    </div>
  );
}
