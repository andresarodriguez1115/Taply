"use client";

import { useState, useRef, useEffect } from "react";
import { logEvent } from "@/lib/logEvent";
import { motion } from "framer-motion";
import React from "react";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";

export default function SocialLayout({
  name = "Your Name",
  title = "Your Bio",
  profileImage,
  backgroundColor = "#fdf6f0",
  isEditing,
  handleProfileUpload,
  profileScale = 1,
  profilePos = { x: 0, y: 0 },
  setProfileScale,
  setProfilePos,
  fieldValues = {},
  setFieldValues,
  profileId,
  layout = "banner",
  fontFamily = "system-ui",
  fontSize = 100,
  socialNameSize = 100,
  socialTitleSize = 100,
  socialIconSize = 100,
  socialLinkSize = 100,
  socialProductSize = 100,
  socialAvatarSize = 144,
}) {
const [activeTab, setActiveTab] = useState("links");
const [mounted, setMounted] = useState(false);
const [showZoom, setShowZoom] = useState(false);
const dragging = useRef(false);
const dragStart = useRef({ x: 0, y: 0 });
const dragLast = useRef({ x: 0, y: 0 });
const avatarRef = useRef(null);
const bannerRef = useRef(null);
const [showBannerZoom, setShowBannerZoom] = useState(false);

useEffect(() => setMounted(true), []);

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

useEffect(() => {
  const handleClickOutside = (e) => {
    if (bannerRef.current && !bannerRef.current.contains(e.target)) {
      setShowBannerZoom(false);
    }
  };
  document.addEventListener("touchstart", handleClickOutside);
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("touchstart", handleClickOutside);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const profileMouseDown = (e) => {
    if (!isEditing) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragging.current = true;
    dragStart.current = { x: clientX, y: clientY };
    dragLast.current = { ...profilePos };
  };

  const profileMouseMove = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setProfilePos({
      x: dragLast.current.x + (clientX - dragStart.current.x),
      y: dragLast.current.y + (clientY - dragStart.current.y),
    });
  };

  const profileMouseUp = () => { dragging.current = false; };

  const links = (fieldValues?.social_links || []).filter(Boolean);

  const products = fieldValues?.social_products || [];
  const socials = fieldValues?.social_icons || {};

  const SOCIAL_ICONS = {
    instagram: { icon: <Instagram size={18} />, color: "#E1306C", base: "https://instagram.com/" },
    tiktok: { icon: <Music2 size={18} />, color: "#010101", base: "https://tiktok.com/@" },
    twitter: { icon: <Twitter size={18} />, color: "#1DA1F2", base: "https://twitter.com/" },
    youtube: { icon: <Youtube size={18} />, color: "#FF0000", base: "https://youtube.com/@" },
  };

  return (
    <div className="w-full min-h-screen" style={{ background: backgroundColor, fontFamily: fontFamily }}>

      {/* ── HERO IMAGE ── */}
      {layout !== "circle" ? (
        <div
          ref={bannerRef}
          className="relative w-full overflow-hidden group"
          style={{ height: 380 }}
          onClick={() => isEditing && setShowBannerZoom(true)}
          onMouseDown={isEditing ? profileMouseDown : undefined}
          onMouseMove={isEditing ? profileMouseMove : undefined}
          onMouseUp={isEditing ? profileMouseUp : undefined}
          onMouseLeave={isEditing ? profileMouseUp : undefined}
          onTouchStart={isEditing ? profileMouseDown : undefined}
          onTouchMove={isEditing ? profileMouseMove : undefined}
          onTouchEnd={isEditing ? profileMouseUp : undefined}
        >
          {profileImage ? (
            <motion.img
              src={profileImage}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ scale: profileScale, translateX: profilePos.x, translateY: profilePos.y }}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              {isEditing ? "Upload a photo" : "No Photo"}
            </div>
          )}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${backgroundColor} 100%)` }} />
          {isEditing && profileImage && showBannerZoom && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm z-10" style={{ width: 150 }}>
              <span className="text-[9px] text-gray-400">−</span>
              <input type="range" min="0.5" max="2" step="0.01" value={profileScale}
                onChange={(e) => setProfileScale && setProfileScale(Number(e.target.value))}
                className="flex-1 accent-black" style={{ width: 120 }} />
              <span className="text-[9px] text-gray-400">+</span>
            </div>
          )}
          {isEditing && (
            <label className="absolute bottom-3 right-3 bg-white border border-gray-200 shadow-md px-4 py-1.5 rounded-full text-xs font-medium text-gray-700 cursor-pointer z-10">
              Change Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
            </label>
          )}
        </div>
      ) : (
        <div className="pt-16 pb-2 flex flex-col items-center">
          <div ref={avatarRef} className="relative group" onTouchStart={() => isEditing && setShowZoom(true)}>
            <div
              className="rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg cursor-grab"
              style={{ touchAction: "none", width: socialAvatarSize, height: socialAvatarSize }}
              onMouseDown={isEditing ? profileMouseDown : undefined}
              onMouseMove={isEditing ? profileMouseMove : undefined}
              onMouseUp={isEditing ? profileMouseUp : undefined}
              onMouseLeave={isEditing ? profileMouseUp : undefined}
              onTouchStart={isEditing ? profileMouseDown : undefined}
              onTouchMove={isEditing ? profileMouseMove : undefined}
              onTouchEnd={isEditing ? profileMouseUp : undefined}
            >
              {profileImage ? (
                <motion.img
                  src={profileImage}
                  className="w-full h-full object-cover"
                  style={{ scale: profileScale, translateX: profilePos.x, translateY: profilePos.y }}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  {isEditing ? "Upload" : "No Photo"}
                </div>
              )}
            </div>
     {isEditing && (
              <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-black rounded-full flex items-center justify-center cursor-pointer shadow z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
              </label>
            )}
            {isEditing && profileImage && showZoom && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm z-10" style={{ width: 100 }}>
                <span className="text-[9px] text-gray-400">−</span>
                <input type="range" min="0.5" max="2" step="0.01" value={profileScale}
                  onChange={(e) => setProfileScale && setProfileScale(Number(e.target.value))}
                  className="flex-1 accent-black" style={{ width: 70 }} />
                <span className="text-[9px] text-gray-400">+</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PROFILE INFO ── */}
      <div className={`px-6 text-center relative z-10 ${layout === "circle" ? "mt-4" : "-mt-2"}`}>
        <h1 className="font-bold tracking-tight" style={{ fontSize: `${1.875 * socialNameSize / 100}rem` }}>{name}</h1>
        <p className="text-gray-500 mt-1 leading-relaxed" style={{ fontSize: `${1 * socialTitleSize / 100}rem` }}>{title}</p>

        {/* Social Icons */}
        {mounted && Object.keys(socials).length > 0 && (
          <div className="flex justify-center gap-3 mt-4">
            {Object.entries(socials).map(([key, url]) =>
              url && SOCIAL_ICONS[key] ? (
          <a key={key} href={url.startsWith("http") ? url : `${SOCIAL_ICONS[key].base}${url}`} target="_blank" rel="noopener noreferrer"
                  onClick={() => logEvent(profileId, "tap")}
                  className="rounded-full flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:scale-105 transition"
                  style={{ color: SOCIAL_ICONS[key].color, width: `${52 * socialIconSize / 100}px`, height: `${52 * socialIconSize / 100}px` }}>
                  {React.cloneElement(SOCIAL_ICONS[key].icon, { size: 22 * socialIconSize / 100 })}
                </a>
              ) : null
            )}
          </div>
        )}

        {/* Tab switcher */}
    <div className="mt-5 inline-flex bg-gray-100 rounded-full p-1">
          {["links", "shop"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-base font-semibold transition ${activeTab === tab ? "bg-white shadow text-black" : "text-gray-500"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── LINKS TAB ── */}
      {activeTab === "links" && (
        <div className="px-5 mt-5 space-y-3 pb-16">
          {links.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-10">
              {isEditing ? "Add links in the Content tab" : "No links yet"}
            </div>
          )}
          {links.map((link, i) => (
            <a key={i} href={link.url ? (link.url.startsWith("http") ? link.url : `https://${link.url}`) : "#"} target="_blank"
              onClick={() => logEvent(profileId, "tap")}
              className="block w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
{link.image && (
                <div className="w-full h-44 overflow-hidden relative group"
                  onTouchStart={isEditing ? (e) => {
                    e.preventDefault();
                    const t = e.touches[0];
                    const startX = t.clientX;
                    const startY = t.clientY;
                    const startPosX = fieldValues?.social_links?.[i]?.imgX || 0;
                    const startPosY = fieldValues?.social_links?.[i]?.imgY || 0;
                    const onMove = (ev) => {
                      ev.preventDefault();
                      const touch = ev.touches[0];
                      const updated = [...(fieldValues?.social_links || [])];
                      updated[i] = { ...updated[i], imgX: startPosX + (touch.clientX - startX), imgY: startPosY + (touch.clientY - startY) };
                      setFieldValues({ ...fieldValues, social_links: updated });
                    };
                    const onEnd = () => { window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onEnd); };
                    window.addEventListener("touchmove", onMove, { passive: false });
                    window.addEventListener("touchend", onEnd);
                  } : undefined}
                  style={{ cursor: isEditing ? "grab" : "default", background: "#e4e2e2" }}
                >
                  <img src={link.image}
                    draggable={false}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      transform: `translate(${link.imgX || 0}px, ${link.imgY || 0}px) scale(${link.imgScale || 1})`,
                      transformOrigin: "center",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                  {isEditing && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 border border-gray-200 rounded-full px-2 py-1 shadow-sm" style={{ width: 90, zIndex: 10 }}>
                      <span className="text-[9px] text-gray-400">−</span>
                      <input type="range" min="0.5" max="3" step="0.05"
                        value={link.imgScale || 1}
                        onChange={(e) => {
                          const updated = [...(fieldValues?.social_links || [])];
                          updated[i] = { ...updated[i], imgScale: parseFloat(e.target.value) };
                          setFieldValues({ ...fieldValues, social_links: updated });
                        }}
                        className="flex-1 accent-black" style={{ width: 60 }} />
                      <span className="text-[9px] text-gray-400">+</span>
                    </div>
                  )}
                </div>
              )}
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="font-semibold text-gray-900" style={{ fontSize: `${0.875 * socialLinkSize / 100}rem` }}>{link.title || "Untitled"}</p>
                <span className="text-gray-400 text-lg">→</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* ── SHOP TAB ── */}
      {activeTab === "shop" && (
        <div className="px-5 mt-5 pb-16">
          {products.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-10">
              {isEditing ? "Add products in the Content tab" : "No products yet"}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {products.map((product, i) => (
              <a key={i} href={product.url ? (product.url.startsWith("http") ? product.url : `https://${product.url}`) : "#"} target="_blank"                className="block rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
                {product.image && (
                  <div className="w-full aspect-square overflow-hidden relative"
                    onTouchStart={isEditing ? (e) => {
                      e.preventDefault();
                      const t = e.touches[0];
                      const startX = t.clientX;
                      const startY = t.clientY;
                      const startPosX = fieldValues?.social_products?.[i]?.imgX || 0;
                      const startPosY = fieldValues?.social_products?.[i]?.imgY || 0;
                      const onMove = (ev) => {
                        ev.preventDefault();
                        const touch = ev.touches[0];
                        const updated = [...(fieldValues?.social_products || [])];
                        updated[i] = { ...updated[i], imgX: startPosX + (touch.clientX - startX), imgY: startPosY + (touch.clientY - startY) };
                        setFieldValues({ ...fieldValues, social_products: updated });
                      };
                      const onEnd = () => { window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onEnd); };
                      window.addEventListener("touchmove", onMove, { passive: false });
                      window.addEventListener("touchend", onEnd);
                    } : undefined}
                    style={{ cursor: isEditing ? "grab" : "default" }}
                  >
                    <img src={product.image}
                      draggable={false}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: `translate(${product.imgX || 0}px, ${product.imgY || 0}px) scale(${product.imgScale || 1})`,
                        transformOrigin: "center",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                    {isEditing && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 border border-gray-200 rounded-full px-2 py-1 shadow-sm" style={{ width: 80, zIndex: 10 }}>
                        <span className="text-[9px] text-gray-400">−</span>
                        <input type="range" min="0.5" max="3" step="0.05"
                          value={product.imgScale || 1}
                          onChange={(e) => {
                            const updated = [...(fieldValues?.social_products || [])];
                            updated[i] = { ...updated[i], imgScale: parseFloat(e.target.value) };
                            setFieldValues({ ...fieldValues, social_products: updated });
                          }}
                          className="flex-1 accent-black" style={{ width: 50 }} />
                        <span className="text-[9px] text-gray-400">+</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="px-3 py-2">
                  <p className="font-semibold text-gray-900 truncate" style={{ fontSize: `${0.75 * socialProductSize / 100}rem` }}>{product.title || "Product"}</p>
                  {product.price && <p className="text-gray-400 mt-0.5" style={{ fontSize: `${0.75 * socialProductSize / 100}rem` }}>{product.price}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
