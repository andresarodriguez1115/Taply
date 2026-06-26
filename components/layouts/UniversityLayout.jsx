"use client";
import { logEvent } from "@/lib/logEvent";
import { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, FileText, ExternalLink } from "lucide-react";

export default function UniversityLayout({
  name = "Your Name",
  title = "Your Major & University",
  profileImage,
  isEditing,
  handleProfileUpload,
  fieldValues = {},
  setFieldValues,
  backgroundColor = "#f8f9fa",
   profileId,
  fontFamily = "system-ui",
  fontSize = 100,
  titleSize = 100,
  buttonSize = 100,
  uniContentSize = 100,
uniBioSize = 100,
  uniStatsSize = 100,
  uniAvatarSize = 80,
  nameColor = "#000000",
  titleColor = "#6b7280",
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
const [showZoom, setShowZoom] = useState(false);
const avatarRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (avatarRef.current && !avatarRef.current.contains(e.target)) {
      setShowZoom(false);
    }
  };
  document.addEventListener("touchstart", handleClickOutside);
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("touchstart", handleClickOutside);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const bio = fieldValues?.uni_bio || "";
  const projects = (fieldValues?.uni_projects || []).filter(Boolean);
  const resumeUrl = fieldValues?.uni_resume || "";
  const phone = fieldValues?.phone || "";
  const email = fieldValues?.email || "";
  const linkedin = fieldValues?.linkedin || "";

  return (
    <div className="w-full min-h-screen pt-[75px]" style={{ background: backgroundColor, fontFamily: fontFamily }}>

      {/* ── HEADER CARD ── */}
      <div className="px-5 pt-6 pb-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">

{/* Avatar */}
          <div ref={avatarRef} className="relative flex-shrink-0" style={{ marginBottom: isEditing && profileImage && showZoom ? "32px" : "0" }} onTouchStart={() => isEditing && setShowZoom(true)}>
            <div
              className="rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow relative" style={{ width: uniAvatarSize, height: uniAvatarSize, cursor: isEditing ? "grab" : "default" }}
              onTouchStart={isEditing ? (e) => {
                e.preventDefault();
                const t = e.touches[0];
                const startX = t.clientX;
                const startY = t.clientY;
                const startPosX = fieldValues?.uni_avatar_x || 0;
                const startPosY = fieldValues?.uni_avatar_y || 0;
                const onMove = (ev) => {
                  ev.preventDefault();
                  const touch = ev.touches[0];
                  setFieldValues(prev => ({
                    ...prev,
                    uni_avatar_x: startPosX + (touch.clientX - startX),
                    uni_avatar_y: startPosY + (touch.clientY - startY),
                  }));
                };
                const onEnd = () => {
                  window.removeEventListener("touchmove", onMove);
                  window.removeEventListener("touchend", onEnd);
                };
                window.addEventListener("touchmove", onMove, { passive: false });
                window.addEventListener("touchend", onEnd);
              } : undefined}
              >
              {profileImage ? (
                <img
                  src={profileImage}
                  draggable={false}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: `translate(${fieldValues?.uni_avatar_x || 0}px, ${fieldValues?.uni_avatar_y || 0}px) scale(${fieldValues?.uni_avatar_scale || 1})`,
                    transformOrigin: "center",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Photo</div>
              )}
            </div>

            {/* Camera upload button */}
            {isEditing && (
<label data-tutorial="profile-photo-btn" className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center cursor-pointer shadow z-10">                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
              </label>
            )}

            {/* Zoom slider */}
{isEditing && profileImage && showZoom && (
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm" style={{ width: 90, zIndex: 10 }}>
                <span className="text-[9px] text-gray-400">−</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={fieldValues?.uni_avatar_scale || 1}
                  onChange={(e) => setFieldValues(prev => ({ ...prev, uni_avatar_scale: parseFloat(e.target.value) }))}
                  className="flex-1 accent-black"
                  style={{ width: 60 }}
                />
                <span className="text-[9px] text-gray-400">+</span>
              </div>
            )}
          </div>
          {/* Name + title */}
          <div className="flex-1 min-w-0">
<h1 className="font-bold tracking-tight" style={{ fontSize: `${1.25 * fontSize / 100}rem`, color: nameColor }}>{name}</h1>
            <p className="text-base mt-0.5 leading-snug" style={{ color: titleColor, ...(titleSize !== 100 ? { fontSize: `${titleSize}%` } : {}) }}>{title}</p>

            {/* Resume button */}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank"
                className="inline-flex items-center gap-1.5 mt-2 bg-black text-white text-xs font-semibold px-4 py-2 rounded-full">
                <FileText size={12} />
                View Resume
              </a>
            )}
            {isEditing && !resumeUrl && (
              <p className="text-xs text-gray-400 mt-1">Add resume URL in Content tab</p>
            )}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="px-5 mb-4">
        <div className="inline-flex bg-gray-100 rounded-full p-1 w-full">
          {["about", "portfolio"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${activeTab === tab ? "bg-white shadow text-black" : "text-gray-500"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── ABOUT TAB ── */}
      {activeTab === "about" && (
        <div className="px-5 space-y-4 pb-20">
{/* Stats */}
{(fieldValues?.uni_gpa?.trim() || projects.length > 0 || fieldValues?.uni_grad_year?.trim()) ? (
  <div className="grid grid-cols-3 gap-3">
    {fieldValues?.uni_gpa?.trim() && (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="font-bold text-blue-500 leading-none" style={{ fontSize: `${1.5 * uniStatsSize / 100}rem` }}>{fieldValues.uni_gpa.trim()}</p>
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">GPA</p>
      </div>
    )}
    {projects.length > 0 && (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="font-bold text-blue-500 leading-none" style={{ fontSize: `${1.5 * uniStatsSize / 100}rem` }}>{projects.length}</p>
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">Projects</p>
      </div>
    )}
    {fieldValues?.uni_grad_year?.trim() && (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="font-bold text-blue-500 leading-none" style={{ fontSize: `${1.5 * uniStatsSize / 100}rem` }}>{fieldValues.uni_grad_year.trim()}</p>
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">Grad</p>
      </div>
    )}
  </div>
) : isEditing ? (
  <div className="grid grid-cols-3 gap-3 opacity-30">
    {["GPA", "Projects", "Grad"].map((label) => (
      <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <div className="h-6 w-10 bg-gray-200 rounded-full mx-auto mb-1" />
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">{label}</p>
      </div>
    ))}
  </div>
) : null}
    {/* Bio */}
          <div>
            <p className="text-[15px] font-semibold text-gray-400 uppercase tracking-widest px-1 mb-2">About</p>            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              {bio ? (
                <p className="text-base text-gray-700 leading-relaxed" style={uniBioSize !== 100 ? { fontSize: `${uniBioSize}%` } : undefined}
>{bio}</p>
              ) : (
                <p className="text-base text-gray-400 italic">{isEditing ? "Add your bio in the Content tab" : "No bio yet"}</p>
              )}
            </div>
          </div>

          {/* Tappable contact rows */}
          {(phone || email || linkedin) ? (
            <div className="space-y-2">
              <p className="text-[15px] font-semibold text-gray-400 uppercase tracking-widest px-1">Contact</p>
            <div className="space-y-3">
                {phone && (
                  <a href={`tel:${phone}`}
                                      onClick={() => logEvent(profileId, "tap")}

                    className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition">
                    <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Phone size={17} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">Phone</p>
                      <p className="text-[15px] font-semibold text-gray-900" style={uniContentSize !== 100 ? { fontSize: `${uniContentSize}%` } : undefined}
>{phone}</p>
                    </div>
                    <span className="text-gray-300 text-xl">›</span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`}
                                      onClick={() => logEvent(profileId, "tap")}

                    className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition">
                    <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Mail size={17} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">Email</p>
                      <p className="text-[15px] font-semibold text-gray-900 truncate" style={uniContentSize !== 100 ? { fontSize: `${uniContentSize}%` } : undefined}
>{email}</p>
                    </div>
                    <span className="text-gray-300 text-xl">›</span>
                  </a>
                )}
            {linkedin && (
                  <a href={linkedin.startsWith("http") ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer"
                                      onClick={() => logEvent(profileId, "tap")}

                    className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition">
                    <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Linkedin size={17} className="text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-400 font-medium mb-0.5">LinkedIn</p>
                      <p className="text-[15px] font-semibold text-gray-900 truncate" style={uniContentSize !== 100 ? { fontSize: `${uniContentSize}%` } : undefined}
>@{linkedin.replace(/.*linkedin\.com\/in\//,"")}</p>                    </div>
                    <span className="text-gray-300 text-xl">›</span>
                  </a>
                )}
              </div>
            </div>
          ) : isEditing ? (
            <div className="space-y-2">
              <p className="text-[15px] font-semibold text-gray-400 uppercase tracking-widest px-1">Contact</p>
              <div className="space-y-3 opacity-30">
                {[{ color: "bg-green-50", icon: "bg-green-200" }, { color: "bg-blue-50", icon: "bg-blue-200" }, { color: "bg-indigo-50", icon: "bg-indigo-200" }].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm`}>
                    <div className={`w-11 h-11 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <div className={`w-5 h-5 rounded-full ${item.icon}`} />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 w-12 bg-gray-200 rounded-full" />
                      <div className="h-3.5 w-28 bg-gray-300 rounded-full" />
                    </div>
                    <span className="text-gray-200 text-xl">›</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ── PORTFOLIO TAB ── */}
      {activeTab === "portfolio" && (
        <div className="px-5 space-y-3 pb-20">
          {projects.length === 0 && isEditing && (
            <div className="grid grid-cols-2 gap-3 opacity-30">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 min-h-[185px] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 mb-3" />
                    <div className="h-4 w-20 bg-gray-200 rounded-full mb-2" />
                    <div className="h-3 w-14 bg-gray-100 rounded-full" />
                  </div>
                  <div className="h-3 w-10 bg-blue-100 rounded-full" />
                </div>
              ))}
            </div>
          )}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  }}
>
  {projects.map((project, i) => (
    <div
      key={i}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 min-h-[185px] flex flex-col justify-between"
    >
      <div>
        {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
  <span className="text-[18px] font-bold text-blue-600">
    {(project.title || "P").charAt(0)}
  </span>
</div>

        {/* Title */}
        <p className="text-[16px] font-bold text-gray-900 leading-tight">
          {project.title || "Untitled"}
        </p>

        {/* Subtitle */}
        {project.subtitle && (
          <p className="text-xs text-gray-400 mt-1">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Link */}
      {project.url && (
        <a
          href={
            project.url.startsWith("http")
              ? project.url
              : `https://${project.url}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-500 mt-4"
        >
          View →
        </a>
      )}
    </div>
  ))}
</div>
        </div>
      )}

    </div>
  );
}
