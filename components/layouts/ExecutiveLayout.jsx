"use client";
import { useState } from "react";
import { logEvent } from "@/lib/logEvent";
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
  fontSize = 100,
  nameSize,
  titleSize,
  cardRadius,
  profileId,
  execAvatarSize = 100,
  execSaveSize = 100,
  execContactSize = 100,
  execTitleSize = 100,
  nameColor = "#000000",
  titleColor = "#6b7280",
}) {

const [saved, setSaved] = useState(false);
const saveContact = () => {
  logEvent(profileId, "save");
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${title}
TEL:${fieldValues?.phone || ""}
EMAIL:${fieldValues?.email || ""}
URL:${fieldValues?.linkedin || ""}
NOTE:Shared via Taply
END:VCARD
`;

  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.vcf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2000);
};
  return (
    <div
      style={{
        ...(fontFamily ? { fontFamily } : {})
      }}
className="pt-8 pb-10 flex flex-col items-center w-full max-w-[400px] sm:max-w-[650px] mx-auto"    >

      {/* BANNER */}
<div
className="group w-full h-[170px] sm:w-[650px] sm:h-[260px] bg-gray-200 rounded-3xl relative overflow-hidden cursor-grab border-[3px] border-white px-1 select-none"
style={{ touchAction: "none" }}

onMouseDown={bannerMouseDown}
onMouseMove={bannerMouseMove}
onMouseUp={bannerMouseUp}
onMouseLeave={bannerMouseUp}

onTouchStart={bannerMouseDown}
onTouchMove={bannerMouseMove}
onTouchEnd={bannerMouseUp}
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
          <label className="absolute top-3 right-3 bg-white border border-gray-200 shadow-md px-4 py-1.5 rounded-full text-xs font-medium text-gray-700 cursor-pointer">
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
          className="rounded-full border-[2px] border-white overflow-hidden shadow-xl bg-gray-300 cursor-grab touch-none"
          style={{ width: `${execAvatarSize}px`, height: `${execAvatarSize}px`, touchAction: "none" }}
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
          <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-black rounded-full flex items-center justify-center cursor-pointer shadow z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
          </label>
        )}
      </div>

      {/* NAME CARD (NOW PERFECTLY ALIGNED) */}
<div className="-mt-20 w-full sm:w-[650px] bg-white rounded-2xl shadow-md px-6 py-6">
<div className="ml- 20 mt-16 sm:ml-[30px] sm:mt-16 text-left"><h1
  className="font-bold"
  style={{
    fontSize: `clamp(${nameSize * 0.7 * (fontSize/100)}px, ${nameSize * (fontSize/100)}px, ${nameSize * (fontSize/100)}px)`,
    color: nameColor
  }}
>
            {name}
          </h1>

<p
  className="mt-2"
  style={{
    fontSize: `clamp(${titleSize * 0.8 * (execTitleSize/100)}px, ${titleSize * (execTitleSize/100)}px, ${titleSize * (execTitleSize/100)}px)`,
    color: titleColor
  }}
>
  {title}
</p>
        </div>
      </div>
{/* SAVE CONTACT BUTTON */}
<div className="mt-6 w-full sm:w-[600px] flex justify-center">

<button
  onClick={saveContact}
  className="w-[95%] sm:w-full bg-black text-white rounded-3xl font-semibold tracking-wide shadow-md hover:opacity-90 active:scale-[0.98] transition flex items-center justify-center"
  style={{ height: `${48 * execSaveSize / 100}px`, fontSize: `${14 * execSaveSize / 100}px` }}
>
  {saved ? "✓ Contact Saved" : "Save Contact"}
</button>

</div>
{/* ================= CONTACT SECTION ================= */}
{(fields?.phone ||
 fields?.email ||
 fields?.linkedin ||
 fields?.instagram ||
 fields?.website)
   ? (<div className="mt-6 space-y-4 flex flex-col items-center">  
  
  
  
   {/* PHONE */}
  {fields?.phone && fieldValues?.phone && (
    <a
      href={`tel:${fieldValues.phone}`}
      onClick={() => logEvent(profileId, "tap")}
className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-600 flex items-center justify-center">
<Phone size={12} className="text-white sm:w-[16px] sm:h-[16px]" />
</div>

        <div>
<p className="font-semibold text-gray-900" style={{ fontSize: `${16 * execContactSize / 100}px` }}>Call</p>
<p className="text-gray-500" style={{ fontSize: `${14 * execContactSize / 100}px` }}>{fieldValues.phone}</p>
        </div>
      </div>

      <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
    </a>
  )}

  {/* EMAIL */}
  {fields?.email && fieldValues?.email && (
    <a
      href={`mailto:${fieldValues.email}`}
      onClick={() => logEvent(profileId, "tap")}
      className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
<Mail size={12} className="text-white sm:w-[16px] sm:h-[16px]" />

</div>

        <div>
<p className="font-semibold text-gray-900" style={{ fontSize: `${16 * execContactSize / 100}px` }}>Email</p>
<p className="text-gray-500 truncate" style={{ fontSize: `${14 * execContactSize / 100}px` }}>{fieldValues.email}</p>
        </div>
      </div>

      <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
    </a>
  )}

  {/* LINKEDIN */}
{fields?.linkedin && fieldValues?.linkedin && (
  <a
    href={fieldValues.linkedin.startsWith("http") ? fieldValues.linkedin : `https://linkedin.com/in/${fieldValues.linkedin}`}
    target="_blank"
    onClick={() => logEvent(profileId, "tap")}
    className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 flex items-center justify-center">
       <Linkedin size={12} className="text-white sm:w-[16px] sm:h-[16px]" />

      </div>

      <div>
<p className="font-semibold text-gray-900" style={{ fontSize: `${16 * execContactSize / 100}px` }}>LinkedIn</p>
<p className="text-gray-500 break-all" style={{ fontSize: `${14 * execContactSize / 100}px` }}>{fieldValues.linkedin}</p>
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
    onClick={() => logEvent(profileId, "tap")}
    className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-600 flex items-center justify-center">
  <Instagram size={12} className="text-white sm:w-[16px] sm:h-[16px]" />
</div>

      <div>
        <p className="font-semibold text-gray-900" style={{ fontSize: `${16 * execContactSize / 100}px` }}>Instagram</p>
<p className="text-gray-500" style={{ fontSize: `${14 * execContactSize / 100}px` }}>@{fieldValues.instagram}</p>
      </div>
    </div>

    <ChevronRight size={14} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
  </a>
)}
{/* WEBSITE */}
{fields?.website && fieldValues?.website && (
  <a
    href={
      fieldValues.website.startsWith("http")
        ? fieldValues.website
        : `https://${fieldValues.website}`
    }
    target="_blank"
    rel="noopener noreferrer"
    className="w-[400px] sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-2 sm:py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
  >
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-600 flex items-center justify-center">
        <span className="text-white text-[12px] sm:text-[16px]">
          🌐
        </span>
      </div>

      <div>
        <p className="font-semibold text-gray-900" style={{ fontSize: `${16 * execContactSize / 100}px` }}>Website</p>
<p className="text-gray-500 break-all" style={{ fontSize: `${14 * execContactSize / 100}px` }}>{fieldValues.website}</p>
      </div>
    </div>

    <ChevronRight
      size={14}
      className="text-gray-300 sm:w-[18px] sm:h-[18px]"
    />
  </a>
)}
</div>

) : isEditing ? (
  <div className="mt-6 space-y-4 w-full flex flex-col items-center opacity-30">
    {[
      { color: "bg-green-600", label: "phone" },
      { color: "bg-blue-600", label: "email" },
      { color: "bg-indigo-600", label: "linkedin" },
    ].map((item, i) => (
      <div key={i} className="w-full sm:w-[650px] flex items-center justify-between pl-3 pr-4 py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.color} flex items-center justify-center`}>
            <div className="w-3 h-3 rounded-full bg-white/50" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-10 bg-gray-200 rounded-full" />
            <div className="h-2.5 w-24 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="w-3 h-3 rounded-full bg-gray-200" />
      </div>
    ))}
  </div>
) : null}







    </div>
    
  );
}