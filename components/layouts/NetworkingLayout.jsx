"use client";

import supabase from "@/lib/supabase";
import { Phone, Mail, MapPin, MessageSquare, Share2, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { logEvent } from "@/lib/logEvent";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop"
export default function NetworkingLayout({
  name,
  title,
  profileImage,
  profileScale,
  setProfileScale,
  profilePos,
  setProfilePos,
  fields,
  fieldValues,
  setFieldValues,
  isEditing,
  handleProfileUpload,
  backgroundColor,
  nameColor,
  titleColor,
  profileId,
  fontFamily = "system-ui",
  fontSize = 100,
  netAvatarSize = 208,
  netNameSize = 100,
  netTitleSize = 100,
  netContactSize = 100,
  netActionSize = 100,
  netButtonSize = 100,
}) {

  const fileInputRef = useRef(null);
const [visualsOpen, setVisualsOpen] = useState(false);
const [mounted, setMounted] = useState(false);
const [saved, setSaved] = useState(false);
const [portfolioImage, setPortfolioImage] = useState(null);
const [resumeImage, setResumeImage] = useState(null);
const [programImage, setProgramImage] = useState(null);



const [link1Title, setLink1Title] = useState("Visit My Website");
const [link1Url, setLink1Url] = useState("");

const [link2Title, setLink2Title] = useState("Look at my Portfolio");
const [link2Url, setLink2Url] = useState("");

const [link3Title, setLink3Title] = useState("Get to know my Program");
const [link3Url, setLink3Url] = useState("");
const [dragging, setDragging] = useState(false);
const [startPos, setStartPos] = useState({ x: 0, y: 0 });
const [buttonCropSrc, setButtonCropSrc] = useState(null)
const [buttonCropIndex, setButtonCropIndex] = useState(null)
const [buttonCrop, setButtonCrop] = useState({ x: 0, y: 0 })
const [buttonZoom, setButtonZoom] = useState(1)
const [buttonCroppedAreaPixels, setButtonCroppedAreaPixels] = useState(null)
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
  link.download = `${name || "contact"}.vcf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2000);
};
const handleShare = async () => {
  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: name || "Taply Profile",
        text: `Check out ${name}'s Taply`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  } catch (err) {
    console.log(err);
  }
};

if (!mounted) return null;

return (
<div
style={{
  background: backgroundColor,
  paddingBottom: mounted && visualsOpen ? "380px" : "0px",
  transition: "padding-bottom 0.3s ease",
  fontFamily: fontFamily,
  }}
  className={`w-full min-h-screen flex justify-center ${
    visualsOpen ? "pt-6 pb-[380px]" : "py-4"
  }`}
><div className="w-full max-w-[650px] px-6 pt-6 sm:pt-20 pb-24 text-center flex flex-col min-h-screen">
        {/* ===== PROFILE IMAGE ===== */}
        <div className="flex justify-center mb-4 relative">
<div
className="relative rounded-full overflow-hidden bg-gray-200 border-[2px] border-white shadow-lg cursor-grab group"
style={{ width: netAvatarSize, height: netAvatarSize }}  
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

{profileImage && profileImage !== "" ? (
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
  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
    <label className="bg-white border border-gray-200 shadow-sm text-xs font-medium text-gray-600 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-50 transition">
      Change Photo
      <input type="file" accept="image/*" className="hidden"
        onChange={(e) => {
          const file = e.target.files[0]
          if (!file) return
          handleProfileUpload(e)
        }}
      />
    </label>
  </div>
)}
        </div>
 

        {/* ===== NAME + TITLE ===== */}
<h1
  className="font-semibold tracking-tight"
  style={{ color: nameColor, fontSize: `${1.875 * netNameSize / 100}rem` }}
>
          {name}
        </h1>

<p
  className="font-medium mt-2 px-3 py-1 rounded-full border inline-block max-w-fit mx-auto"
  style={{ color: titleColor, borderColor: titleColor ? `${titleColor}40` : "rgba(0,0,0,0.15)", background: titleColor ? `${titleColor}10` : "rgba(0,0,0,0.05)", fontSize: `${0.875 * netTitleSize / 100}rem` }}
>
  {title}
</p>

 

{/* ===== CONTACT CIRCLES ===== */}
{mounted && (fieldValues?.phone || fieldValues?.location || fieldValues?.email) ? (
<div className="flex justify-center gap-2 mt-4">

{fieldValues?.phone && (
  <a
    href={`tel:${fieldValues.phone}`}
onClick={() => logEvent(profileId, "tap")}
className="rounded-full bg-white border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300"
style={{ width: `${56 * netContactSize / 100}px`, height: `${56 * netContactSize / 100}px` }}
>
<Phone size={22 * netContactSize / 100} className="text-gray-700" />
</a>
)}

{fieldValues?.phone && (
  <a
    href={`sms:${fieldValues.phone}`}
onClick={() => logEvent(profileId, "tap")}
className="rounded-full bg-white border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300"
style={{ width: `${56 * netContactSize / 100}px`, height: `${56 * netContactSize / 100}px` }}
>
<MessageSquare size={22 * netContactSize / 100} className="text-gray-700" />
</a>
)}

{fieldValues?.location && (
  <a
    href={`https://maps.google.com/?q=${fieldValues.location}`}
className="rounded-full bg-white border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300"
style={{ width: `${56 * netContactSize / 100}px`, height: `${56 * netContactSize / 100}px` }}
>
<MapPin size={22 * netContactSize / 100} className="text-gray-700" />
</a>
)}

{fieldValues?.email && (
  <a
    href={`mailto:${fieldValues.email}`}
onClick={() => logEvent(profileId, "tap")}
className="rounded-full bg-white border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300"
style={{ width: `${56 * netContactSize / 100}px`, height: `${56 * netContactSize / 100}px` }}
>
<Mail size={22 * netContactSize / 100} className="text-gray-700" />
</a>
)}

</div>
) : isEditing ? (
<div className="flex justify-center gap-2 mt-4 opacity-30">
  {[0,1,2,3].map(i => (
    <div key={i} className="rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center" style={{ width: `${56 * netContactSize / 100}px`, height: `${56 * netContactSize / 100}px` }}>
      <div className="w-5 h-5 rounded-full bg-gray-200" />
    </div>
  ))}
</div>
) : null}

    {/* ===== ACTION BUTTONS ===== */}
{mounted && (
<div className="flex justify-center gap-2 mt-6">

  {/* ADD TO CONTACTS */}
<button
onClick={saveContact}
className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-all duration-300 text-gray-800 font-semibold"
style={{ fontSize: `${0.875 * netActionSize / 100}rem` }}
>
  <Download size={18 * netActionSize / 100} />
  {saved ? "✓ Contact Saved" : "Add to Contacts"}
</button>

  {/* SHARE */}
<button
onClick={handleShare}
className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-all duration-300 text-gray-800 font-semibold"
style={{ fontSize: `${0.875 * netActionSize / 100}rem` }}
>
  <Share2 size={18 * netActionSize / 100} />
  Share
</button>
  

</div>
)}
{/* ===== PERSONAL CTA CARDS ===== */}
<div className="mt-10 space-y-6 flex flex-col items-center">
{(() => {
  const buttons = fieldValues?.buttons || [];
  const hasAny = buttons.some(Boolean);
  const displayButtons = hasAny ? buttons : (isEditing ? [null, null, null] : []);
  return displayButtons.map((btn, i) => (
    btn ? (
    <BigLinkCard
      key={i}
      title={btn.title}
      url={btn.url}
      image={btn.image}
      profileId={profileId}
      isEditing={isEditing}
      netButtonSize={netButtonSize}
    />
    ) : !hasAny ? (
      <div key={i} className="w-full bg-white rounded-3xl px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center justify-between opacity-40">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Logo</span>
          </div>
          <div className="h-3 w-24 bg-gray-200 rounded-full" />
        </div>
        <div className="text-gray-300 text-xl">→</div>
      </div>
    ) : null
  ));
})()}


</div>
      </div>

{buttonCropSrc && (
  <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center px-4">
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm">
      <div className="relative w-full h-64 bg-gray-900">
        <Cropper
          image={buttonCropSrc}
          crop={buttonCrop}
          zoom={buttonZoom}
          aspect={1}
          onCropChange={setButtonCrop}
          onZoomChange={setButtonZoom}
          onCropComplete={(_, croppedPixels) => setButtonCroppedAreaPixels(croppedPixels)}
        />
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-500 text-center">Drag to reposition, pinch to zoom</p>
        <input type="range" min={1} max={3} step={0.1} value={buttonZoom}
          onChange={(e) => setButtonZoom(Number(e.target.value))}
          className="w-full" />
        <div className="flex gap-2">
          <button onClick={() => { setButtonCropSrc(null); setButtonCropIndex(null); }}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium">
            Cancel
          </button>
          <button
            onClick={async () => {
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.src = buttonCropSrc;
              await new Promise(r => image.onload = r);
              const canvas = document.createElement("canvas");
              canvas.width = 300;
              canvas.height = 300;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(image,
                buttonCroppedAreaPixels.x, buttonCroppedAreaPixels.y,
                buttonCroppedAreaPixels.width, buttonCroppedAreaPixels.height,
                0, 0, 300, 300
              );
              canvas.toBlob(async (blob) => {
                const { data: userData } = await supabase.auth.getUser();
                const fileName = `button-logo-${userData.user.id}-${Date.now()}.png`;
                const { error } = await supabase.storage.from("button-logos").upload(fileName, blob);
                if (error) return;
                const { data } = supabase.storage.from("button-logos").getPublicUrl(fileName);
                const updated = [...(fieldValues?.buttons || [])];
                updated[buttonCropIndex] = { ...updated[buttonCropIndex], image: data.publicUrl };
                setFieldValues({ ...fieldValues, buttons: updated });
                setButtonCropSrc(null);
                setButtonCropIndex(null);
              }, "image/png");
            }}
            className="flex-1 py-3 rounded-2xl bg-black text-white text-sm font-medium">
            Use this crop
          </button>
        </div>
      </div>
    </div>
  </div>
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
function BigLinkCard({ title, image, url, profileId, isEditing, netButtonSize = 100 }) {
  const safeUrl = url ? (url.startsWith("http") ? url : `https://${url}`) : "#";

  return (
    <a
      href={isEditing ? undefined : safeUrl}
      target={isEditing ? undefined : "_blank"}
      onClick={() => !isEditing && logEvent(profileId, "tap")}
      className="bg-white rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-center justify-between cursor-pointer"
      style={{ width: "100%", padding: `${16 * netButtonSize / 100}px` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden"
          style={{
            width: `${64 * netButtonSize / 100}px`,
            height: `${64 * netButtonSize / 100}px`,
            flexShrink: 0,
          }}
        >
          {image ? (
            <img
              src={image}
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="text-gray-400 text-xs">Logo</div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p
            className="font-semibold text-gray-900 leading-tight"
            style={{
              fontSize: `${18 * netButtonSize / 100}px`,
              marginLeft: `${6 * netButtonSize / 100}px`,
            }}
          >
            {title}
          </p>
        </div>
      </div>

      <div className="text-gray-400 text-xl">→</div>
    </a>
  );
}