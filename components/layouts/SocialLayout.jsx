"use client";

import { useState, useRef, useEffect } from "react";
import { logEvent } from "@/lib/logEvent";
import { motion } from "framer-motion";
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
}) {
const [activeTab, setActiveTab] = useState("links");
  const [mounted, setMounted] = useState(false);
  const [heroStyle, setHeroStyle] = useState("banner");
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragLast = useRef({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

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
    <div className="w-full min-h-screen" style={{ background: backgroundColor, fontFamily: "system-ui, sans-serif" }}>

      {/* ── HERO IMAGE ── */}
      <div
        className="relative w-full overflow-hidden group"
        style={{ height: 380 }}
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
            className="absolute inset-0 w-full h-full object-contain"
            style={{ scale: profileScale, translateX: profilePos.x, translateY: profilePos.y }}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            {isEditing ? "Upload a photo" : "No Photo"}
          </div>
        )}

        {/* gradient fade at bottom */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${backgroundColor} 100%)` }} />

        {/* zoom slider */}
        {isEditing && profileImage && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition z-10">
            <input type="range" min="0.5" max="2" step="0.01" value={profileScale}
              onChange={(e) => setProfileScale && setProfileScale(Number(e.target.value))}
              className="w-[120px]" />
          </div>
        )}

        {/* change photo button */}
        {isEditing && (
          <label className="absolute bottom-3 right-3 bg-black text-white text-xs px-4 py-2 rounded-full cursor-pointer shadow-md z-10">
            Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
          </label>
        )}
      </div>

      {/* ── PROFILE INFO ── */}
      <div className="px-6 -mt-2 text-center relative z-10">
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-gray-500 text-l text-base mt-1 leading-relaxed">{title}</p>

        {/* Social Icons */}
        {mounted && Object.keys(socials).length > 0 && (
          <div className="flex justify-center gap-3 mt-4">
            {Object.entries(socials).map(([key, url]) =>
              url && SOCIAL_ICONS[key] ? (
          <a key={key} href={url.startsWith("http") ? url : `${SOCIAL_ICONS[key].base}${url}`} target="_blank" rel="noopener noreferrer"
                  onClick={() => logEvent(profileId, "tap")}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:scale-105 transition"
                  style={{ color: SOCIAL_ICONS[key].color }}>
                  {SOCIAL_ICONS[key].icon}
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
                <div className="w-full h-44 overflow-hidden relative"
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
                  style={{ cursor: isEditing ? "grab" : "default" }}
                >
                  <img src={link.image}
                    draggable={false}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
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
                <p className="font-semibold text-sm text-gray-900">{link.title || "Untitled"}</p>
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
                  <p className="font-semibold text-xs text-gray-900 truncate">{product.title || "Product"}</p>
                  {product.price && <p className="text-xs text-gray-400 mt-0.5">{product.price}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
