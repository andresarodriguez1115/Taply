"use client";

import React from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../ProfileHeader";

export default function CareerLayout({
  bannerImage,
  avatarImage,
  name,
  title,
  resume,
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
      {/* Header Section */}
      <ProfileHeader
        bannerImage={bannerImage}
        avatarImage={avatarImage}
        name={name}
        title={title}
        isEditing={isEditing}
      />

      {/* Career Section */}
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Career Fair Details
        </h2>

        {/* Resume */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
          <div className="text-slate-700">Resume</div>
          {resume ? (
            <a
              href={resume}
              target="_blank"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
            >
              View / Download
            </a>
          ) : (
            <div className="text-slate-400 text-sm">No resume uploaded</div>
          )}
        </div>

        {/* LinkedIn */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
          <div className="text-slate-700">LinkedIn</div>
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
            >
              Visit Profile
            </a>
          ) : (
            <div className="text-slate-400 text-sm">Not provided</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
