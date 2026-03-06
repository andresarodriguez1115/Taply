"use client";

import supabase from "@/lib/supabase";
import { Phone, Mail, MapPin, MessageSquare, Share2, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function NetworkingLayout({
  name,
  title,
  profileImage,
  fields,
  fieldValues,
  setFieldValues,
  isEditing,
  handleProfileUpload,
  backgroundColor,
  setBackgroundColor,
}) {

  const fileInputRef = useRef(null);
  const [bgColor, setBgColor] = useState(backgroundColor || "#1f2937");
const [visualsOpen, setVisualsOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [portfolioImage, setPortfolioImage] = useState(null);
const [resumeImage, setResumeImage] = useState(null);
const [programImage, setProgramImage] = useState(null);
const [nameColor, setNameColor] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("taply-networking-name-color") || "#111827";
  }
  return "#111827";
});

const [titleColor, setTitleColor] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("taply-networking-title-color") || "#6b7280";
  }
  return "#6b7280";
});
const [profileScale, setProfileScale] = useState(() => {
  if (typeof window !== "undefined") {
    return Number(localStorage.getItem("taply-networking-profile-scale")) || 1;
  }
  return 1;
});


const [link1Title, setLink1Title] = useState("Visit My Website");
const [link1Url, setLink1Url] = useState("");

const [link2Title, setLink2Title] = useState("Look at my Portfolio");
const [link2Url, setLink2Url] = useState("");

const [link3Title, setLink3Title] = useState("Get to know my Program");
const [link3Url, setLink3Url] = useState("");
const [profilePos, setProfilePos] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("taply-networking-profile-pos");
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  }
  return { x: 0, y: 0 };
});
const [dragging, setDragging] = useState(false);
const [startPos, setStartPos] = useState({ x: 0, y: 0 });
useEffect(() => {
  setMounted(true);
}, []);

const handlePortfolioUpload = (e) => {
  const file = e.target.files[0];
  if (file) setPortfolioImage(URL.createObjectURL(file));
};

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "taply-networking-profile-pos",
      JSON.stringify(profilePos)
    );
  }
}, [profilePos]);
useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "taply-networking-profile-scale",
      profileScale
    );
  }
}, [profileScale]);

const handleResumeUpload = (e) => {
  const file = e.target.files[0];
  if (file) setResumeImage(URL.createObjectURL(file));
};
const profileMouseDown = (e) => {
  if (!isEditing) return;

  setDragging(true);
  setStartPos({
    x: e.clientX - profilePos.x,
    y: e.clientY - profilePos.y,
  });
};

const profileMouseMove = (e) => {
  if (!isEditing || !dragging) return;

  setProfilePos({
    x: e.clientX - startPos.x,
    y: e.clientY - startPos.y,
  });
};

const profileMouseUp = () => {
  if (!isEditing) return;
  setDragging(false);
};
const handleProgramUpload = (e) => {
  const file = e.target.files[0];
  if (file) setProgramImage(URL.createObjectURL(file));
};

if (!mounted) return null;

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
><div className="w-full max-w-[650px] px-6 pt-6 sm:pt-20 pb-24 text-center">
        {/* ===== PROFILE IMAGE ===== */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
<div
className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-gray-200 border-[2px] border-white shadow-lg cursor-grab group"  
onMouseDown={isEditing ? profileMouseDown : undefined}
onMouseMove={isEditing ? profileMouseMove : undefined}
onMouseUp={isEditing ? profileMouseUp : undefined}
onMouseLeave={isEditing ? profileMouseUp : undefined}

onTouchStart={(e)=>{
  if(!isEditing) return;
  const touch = e.touches[0];
  setDragging(true);
  setStartPos({
    x: touch.clientX - profilePos.x,
    y: touch.clientY - profilePos.y,
  });
}}

onTouchMove={(e)=>{
  if(!isEditing || !dragging) return;
  const touch = e.touches[0];
  setProfilePos({
    x: touch.clientX - startPos.x,
    y: touch.clientY - startPos.y,
  });
}}

onTouchEnd={()=> isEditing && setDragging(false)}
>

{profileImage ? (
  <motion.img
  suppressHydrationWarning
    src={profileImage}
    className="absolute inset-0 w-full h-full object-contain"
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
  text-sm text-gray-600
  cursor-pointer
  hover:text-gray-900
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
<h1
  className="text-3xl sm:text-4xl font-semibold tracking-tight"
  style={{ color: nameColor }}
>
          {name}
        </h1>

<p
  className="text-lg mt-2"
  style={{ color: titleColor }}
>
          {title}
        </p>

 

 {/* ===== CONTACT CIRCLES ===== */}
{mounted && (
<div className="flex justify-center gap-2 mt-4">

<a
href={fieldValues?.phone ? `tel:${fieldValues.phone}` : "#"}
className="w-14 h-14 sm:w-10 sm:h-10 rounded-full
bg-white border border-gray-200
shadow-[0_10px_25px_rgba(0,0,0,0.08)]
flex items-center justify-center
hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]
hover:scale-105
transition-all duration-300"
>
<Phone size={22} className="text-gray-700" />
</a>

<a
href={fieldValues?.phone ? `sms:${fieldValues.phone}` : "#"}
className="w-14 h-14 sm:w-10 sm:h-10 rounded-full
bg-white border border-gray-200
shadow-[0_10px_25px_rgba(0,0,0,0.08)]
flex items-center justify-center
hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]
hover:scale-105
transition-all duration-300"
>
<MessageSquare size={22} className="text-gray-700" />
</a>

<a
href={fieldValues?.location ? `https://maps.google.com/?q=${fieldValues.location}` : "#"}
className="w-14 h-14 sm:w-10 sm:h-10 rounded-full
bg-white border border-gray-200
shadow-[0_10px_25px_rgba(0,0,0,0.08)]
flex items-center justify-center
hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]
hover:scale-105
transition-all duration-300"
>
<MapPin size={22} className="text-gray-700" />
</a>

<a
href={fieldValues?.email ? `mailto:${fieldValues.email}` : "#"}
className="w-14 h-14 sm:w-10 sm:h-10 rounded-full
bg-white border border-gray-200
shadow-[0_10px_25px_rgba(0,0,0,0.08)]
flex items-center justify-center
hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]
hover:scale-105
transition-all duration-300"
>
<Mail size={22} className="text-gray-700" />
</a>

</div>
)}

    {/* ===== ACTION BUTTONS ===== */}
{mounted && (
<div className="flex justify-center gap-2 mt-6">

  {/* ADD TO CONTACTS */}
  <button
className="flex items-center gap-2 px-6 py-3 rounded-full 
           bg-white 
           border border-gray-200
           shadow-[0_12px_30px_rgba(0,0,0,0.08)]
           hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
           transition-all duration-300
           text-sm text-gray-800 font-semibold"
  >
    <Download size={18} />
    Add to Contacts
  </button>

  {/* SHARE */}
  <button
className="flex items-center gap-2 px-6 py-3 rounded-full 
           bg-white 
           border border-gray-200
           shadow-[0_12px_30px_rgba(0,0,0,0.08)]
           hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
           transition-all duration-300
           text-sm text-gray-800 font-semibold"
  >
    <Share2 size={18} />
    Share
  </button>
  

</div>
)}
{/* ===== PERSONAL CTA CARDS ===== */}
<div className="mt-10 space-y-6 flex flex-col items-center">

{(fieldValues?.buttons || []).map((btn, i) => (

<BigLinkCard
key={i}
title={btn.title}
url={btn.url}
image={btn.image}
/>

))}

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
      
    {isEditing && (
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

      <div className="p-6 flex-1 overflow-y-auto sm:overflow-visible touch-pan-y">
        <div className="grid grid-cols- gap-6">

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
      onChange={(e) => {
  setBgColor(e.target.value);
  setBackgroundColor(e.target.value);
}}
    />
  </div>

  <div className="flex justify-between items-center">
    <span className="text-sm">Name</span>
    <input
      type="color"
      value={nameColor}
      onChange={(e) => setNameColor(e.target.value)}
    />
  </div>

  <div className="flex justify-between items-center">
    <span className="text-sm">Title</span>
    <input
      type="color"
      value={titleColor}
      onChange={(e) => setTitleColor(e.target.value)}
    />
  </div>

</div>
{/* Images */}
<div>
  <p className="text-xs font-medium text-gray-500 mb-2">
    Images
  </p>

  <div className="rounded-xl border p-3 space-y-4">

{/* Button Logos */}
{(fieldValues?.buttons || []).map((btn, i) => (

  <div key={i}>
    <p className="text-sm mb-1">
      Button {i + 1} Logo
    </p>

    <input
      type="file"
      accept="image/*"
      className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
onChange={async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileName = `button-${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("button-logos")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return;
  }

  const { data: publicUrl } = supabase.storage
    .from("button-logos")
    .getPublicUrl(fileName);

  const updated = [...(fieldValues?.buttons || [])];

  updated[i].image = publicUrl.publicUrl;

  setFieldValues({
    ...fieldValues,
    buttons: updated
  });
}}
    />

  </div>

))}

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
function BigLinkCard({ title, image, url }) {
  return (
    <a
href={url || "#"}
target="_blank"
className="w-full bg-white rounded-3xl 
                    px-4 py-4
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

   </a>
  );
}