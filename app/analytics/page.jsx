"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Layouts
import BusinessLayout from "@/components/layouts/BusinessLayout.jsx";
import UniversityLayout from "@/components/layouts/UniversityLayout.jsx";
import ClientsLayout from "@/components/layouts/ClientsLayout.jsx";
import SocialLayout from "@/components/layouts/SocialLayout.jsx";
import NetworkingLayout from "@/components/layouts/NetworkingLayout.jsx";

export default function Page() {
  // -----------------------------
  //  GLOBAL USER DATA (PERSISTS)
  // -----------------------------
  const [name, setName] = useState("Your Name");
  const [title, setTitle] = useState("Your Title / Position");
  const [aboutText, setAboutText] = useState(
    "This is your about section. Explain who you are, what you do, and what makes you unique."
  );

  // NEW: Profile + Cover images
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Edit vs Preview mode
  const [isEditing, setIsEditing] = useState(true);

  // Active layout mode
  const [mode, setMode] = useState("business");

  // 🔥 Pass ALL shared data to layouts
  const commonProps = {
    name,
    title,
    aboutText,
    setName,
    setTitle,
    setAboutText,
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
    isEditing,
  };

  // Layout switcher
  const renderLayout = () => {
    switch (mode) {
      case "business":
        return <BusinessLayout {...commonProps} />;
      case "university":
        return <UniversityLayout {...commonProps} />;
      case "clients":
        return <ClientsLayout {...commonProps} />;
      case "social":
        return <SocialLayout {...commonProps} />;
      case "networking":
        return <NetworkingLayout {...commonProps} />;
      default:
        return <BusinessLayout {...commonProps} />;
    }
  };

  const MODES = [
    { id: "business", label: "Business Mode" },
    { id: "university", label: "University Mode" },
    { id: "clients", label: "Clients Mode" },
    { id: "social", label: "Social Mode" },
    { id: "networking", label: "Networking Mode" },
  ];

  return (
    <div className="w-full min-h-screen flex">

{/* LEFT SIDEBAR WRAPPER */}
<div className="relative">

  {/* Toggle Button */}
  <button
    onClick={() => setPanelOpen(!panelOpen)}
    className="absolute -right-4 top-10 z-20 bg-white shadow-md border rounded-full w-8 h-8 flex items-center justify-center"
  >
    {panelOpen ? "←" : "→"}
  </button>

  {/* Sidebar */}
  {panelOpen && (
    <div
      className="w-[320px] p-6 bg-white rounded-xl shadow-lg h-fit mt-10 ml-10 select-none transition-all"
    >
      <h2 className="text-lg font-bold mb-4">taply.now</h2>

      {/* Mode Selector */}
      <div className="flex flex-col gap-3 mb-6">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-lg border text-left transition-all
              ${
                mode === m.id
                  ? "bg-blue-100 border-blue-400 text-blue-700"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* EDIT / PREVIEW TOGGLE */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setIsEditing(true)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            isEditing
              ? "bg-blue-100 border-blue-400 text-blue-700"
              : "bg-gray-100 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Edit
        </button>

        <button
          onClick={() => setIsEditing(false)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            !isEditing
              ? "bg-blue-100 border-blue-400 text-blue-700"
              : "bg-gray-100 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Preview
        </button>
      </div>
    </div>
  )}
</div>


      {/* RIGHT SIDE – Layout Renderer */}
      <div className="flex-1 flex justify-center items-start mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode + (isEditing ? "-edit" : "-preview")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-3xl"
          >
            {renderLayout()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
