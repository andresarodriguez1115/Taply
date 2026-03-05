"use client";

import { Phone, Mail, MapPin, MessageSquare, Share2, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";export default function NetworkingLayout({
  name,
  title,
  profileImage,
  fields,
  fieldValues,
  isEditing,
  handleProfileUpload,
  backgroundColor,
}) {

  const fileInputRef = useRef(null);
  const [bgColor, setBgColor] = useState(backgroundColor || "#f3f4f6");
const [visualsOpen, setVisualsOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [portfolioImage, setPortfolioImage] = useState(null);
const [resumeImage, setResumeImage] = useState(null);
const [programImage, setProgramImage] = useState(null);
const [profileScale, setProfileScale] = useState(1);
const [profilePos, setProfilePos] = useState({ x: 0, y: 0 });
const [dragging, setDragging] = useState(false);
const [startPos, setStartPos] = useState({ x: 0, y: 0 });
useEffect(() => {
  setMounted(true);
}, []);
const handlePortfolioUpload = (e) => {
  const file = e.target.files[0];
  if (file) setPortfolioImage(URL.createObjectURL(file));
};

const handleResumeUpload = (e) => {
  const file = e.target.files[0];
  if (file) setResumeImage(URL.createObjectURL(file));
};
const profileMouseDown = (e) => {
  setDragging(true);
  setStartPos({
    x: e.clientX - profilePos.x,
    y: e.clientY - profilePos.y,
  });
};

const profileMouseMove = (e) => {
  if (!dragging) return;

  setProfilePos({
    x: e.clientX - startPos.x,
    y: e.clientY - startPos.y,
  });
};

const profileMouseUp = () => {
  setDragging(false);
};
const handleProgramUpload = (e) => {
  const file = e.target.files[0];
  if (file) setProgramImage(URL.createObjectURL(file));
};

  return (
<div
  style={{
    background: bgColor,
    paddingBottom: mounted && visualsOpen ? "380px" : "0px",
    transition: "padding-bottom 0.3s ease",
  }}
  className={`w-full min-h-screen flex justify-center ${
    visualsOpen ? "pt-6 pb-[380px]" : "py-10"
  }`}
><div className="w-full max-w-[650px] px-6 pt-20 pb-24 text-center">
        {/* ===== PROFILE IMAGE ===== */}
        <div className="flex justify-center mb-8 relative">
<div
  className="relative w-56 h-56 rounded-full overflow-hidden bg-white shadow-xl cursor-grab group"
  onMouseDown={profileMouseDown}
  onMouseMove={profileMouseMove}
  onMouseUp={profileMouseUp}
  onMouseLeave={profileMouseUp}
>

{profileImage ? (
  <motion.img
    src={profileImage}
    className="absolute inset-0 w-full h-full object-cover"
    style={{
      scale: profileScale,
      translateX: profilePos.x,
      translateY: profilePos.y,
    }}
    draggable={false}
  />
) : (
  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
    No Photo
    
  </div>
)}


{isEditing && profileImage && (
  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.01"
      value={profileScale}
      onChange={(e) => setProfileScale(Number(e.target.value))}
      className="w-[110px]"
    />
    
  </div>
)}

</div>
{isEditing && (
  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
    <label
      className="
        bg-black text-white
        px-4 py-1.5
        rounded-full
        text-sm font-medium
        shadow-lg
        cursor-pointer
        hover:bg-gray-900
        transition
      "
    >
      Change Photo

  <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleProfileUpload}
/>
    </label>
  </div>
)}
        </div>
 

        {/* ===== NAME + TITLE ===== */}
<h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
          {name}
        </h1>

<p className="text-lg text-gray-600 mt-3">
          {title}
        </p>

 

        {/* ===== CONTACT CIRCLES ===== */}
        <div className="flex justify-center gap-5 mt-10">

          <div
            className="w-16 h-16 rounded-full 
                       bg-[#e6e6e6] 
                       border border-gray-500 
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <Phone size={22} className="text-gray-700" />
          </div>

          <div
            className="w-16 h-16 rounded-full 
                       bg-[#e6e6e6] 
                       border border-gray-500 
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <MessageSquare size={22} className="text-gray-700" />
          </div>

          <div
            className="w-16 h-16 rounded-full 
                       bg-[#e6e6e6] 
                       border border-gray-500 
                       flex items-center justify-center"
          >
            <MapPin size={22} className="text-gray-700" />
          </div>

          <div
            className="w-16 h-16 rounded-full 
                       bg-[#e6e6e6] 
                       border border-gray-500 
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <Mail size={22} className="text-gray-700" />
          </div>

        </div>

    {/* ===== ACTION BUTTONS ===== */}
<div className="flex justify-center gap-4 mt-8">

  {/* ADD TO CONTACTS */}
  <button
    className="flex items-center gap-2 px-6 py-3 rounded-full 
               bg-white/80 backdrop-blur-md 
               border border-gray-400 
               shadow-sm hover:shadow-md 
               transition-all duration-200 
               text-gray-800 font-medium"
  >
    <Download size={18} />
    Add to Contacts
  </button>

  {/* SHARE */}
  <button
    className="flex items-center gap-2 px-6 py-3 rounded-full 
               bg-white/80 backdrop-blur-md 
               border border-gray-400 
               shadow-sm hover:shadow-md 
               transition-all duration-200 
               text-gray-800 font-medium"
  >
    <Share2 size={18} />
    Share
  </button>
  

</div>
{/* ===== PERSONAL CTA CARDS ===== */}
<div className="mt-16 space-y-6 flex flex-col items-center">
<BigLinkCard 
  title="Visit My Website" 
  image={portfolioImage}
/>

<BigLinkCard 
  title="Look at my Portfolio" 
  image={resumeImage}
/>

<BigLinkCard 
  title="Get to know my Program" 
  image={programImage}
/>
{/* ===== FOOTER ===== */}
<div className="mt-20 pt-10 border-t border-gray-200 text-center">
  <p className="text-sm text-gray-500">
    © {new Date().getFullYear()} Taply
  </p>
  <p className="text-xs text-gray-400 mt-1">
    Powered by taply.now
  </p>
</div>
</div>
      </div>
      {mounted && (
  <motion.div
    initial={false}
    animate={{ y: visualsOpen ? 0 : 392 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50"
    style={{ height: 380 }}
  >
    {/* Bottom Handle */}
    <button
      onClick={() => setVisualsOpen(!visualsOpen)}
      className="
        absolute -top-12 left-1/2 -translate-x-1/2
        bg-white
        px-6 py-2
        rounded-t-lg
        shadow
        text-sm font-medium
        border border-gray-200
        hover:bg-gray-50
        transition
      "
    >
      {visualsOpen ? "Close Studio" : "Visuals Studio"}
    </button>

    <div className="max-w-[900px] mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <p className="text-sm font-semibold tracking-wide">
          Visuals Studio
        </p>

        <button
          onClick={() => setVisualsOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Close
        </button>
      </div>

      <div className="p-6 flex-1">
        <div className="grid grid-cols-2 gap-6">

          {/* Colors */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Colors
            </p>

            <div className="rounded-xl border p-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Background</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
            {/* Images */}
<div>
  <p className="text-xs font-medium text-gray-500 mb-2">
    Images
  </p>

  <div className="rounded-xl border p-3 space-y-4">

    {/* Portfolio */}
    <div>
      <p className="text-sm mb-1">Portfolio Card</p>
  <input
  type="file"
  accept="image/*"
  onChange={handlePortfolioUpload}
  className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
/>
    </div>

    {/* Resume */}
    <div>
      <p className="text-sm mb-1">Resume Card</p>
<input
  type="file"
  accept="image/*"
  onChange={handleResumeUpload}
  className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
/>
    </div>

    {/* Program */}
    <div>
      <p className="text-sm mb-1">Program Card</p>
<input
  type="file"
  accept="image/*"
  onChange={handleResumeUpload}
  className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
/>
    </div>

  </div>
</div>
          </div>

        </div>
      </div>
    </div>
  </motion.div>
)}
    </div>
  );
}

function LinkCard({ title }) {
  return (
<div className="bg-white rounded-3xl px-6 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-center justify-between cursor-pointer">
      <p className="text-lg font-medium text-gray-800">
        {title}
      </p>
      <span className="text-gray-400 text-xl">→</span>
    </div>
  );
}
function BigLinkCard({ title, image }) {
  return (
    <div className="w-full bg-white rounded-3xl 
                    px-6 py-7
                    shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                    transition-all duration-300 
                    flex items-center justify-between cursor-pointer">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">

        {/* LOGO */}
        <div className="w-16 h-16 rounded-2xl bg-gray-100 
                        flex items-center justify-center 
                        overflow-hidden">
          {image ? (
            <img 
              src={image} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-xs">Logo</div>
          )}
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center">
          <p className="text-[18px] font-semibold text-gray-900 leading-tight">
            {title}
          </p>
        </div>

      </div>

      {/* RIGHT ARROW */}
      <div className="text-gray-400 text-xl">
        →
      </div>

    </div>
  );
}