"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase";

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState("digital");

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/signup");
      } else {
        setReady(true);
      }
    };
    check();
  }, []);

  if (!ready) return null;

  const handleNext = () => {
    localStorage.setItem("has_chosen", "true");
    if (selected === "digital") {
      router.push("/dashboard");
    } else {
      router.push("/wallet");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <img src="/taply-logo.svg" className="h-14 mb-8 object-contain" />

      <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Where would you<br />like to go?
      </h1>
      <p className="text-l text-gray-400 text-center mb-8">
        You can switch anytime from your dashboard.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">

        {/* DIGITAL IDENTITY CARD */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelected("digital")}
          className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${
            selected === "digital"
              ? "border-blue-500 bg-white shadow-md"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
              selected === "digital" ? "border-blue-500" : "border-gray-300"
            }`}>
              {selected === "digital" && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900">Digital Identity Card</p>
              <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">Your digital presence, your way. Choose from Business, University, Networking, or Social modes and share everything about you in one tap.</p>
              <span className="inline-block mt-2 text-[11px] font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">14-DAY FREE TRIAL</span>
            </div>
            {/* Visual */}
            <div className="flex-shrink-0 opacity-80">
              <div className="w-16 h-20 bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-1 border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="w-10 h-1.5 bg-gray-300 rounded" />
                <div className="w-8 h-1 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* APPLE WALLET */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelected("wallet")}
          className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${
            selected === "wallet"
              ? "border-blue-500 bg-white shadow-md"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
              selected === "wallet" ? "border-blue-500" : "border-gray-300"
            }`}>
              {selected === "wallet" && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Apple Wallet Card
                <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">PRO</span>
              </p>
              <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">Get a native Apple Wallet pass with your name, title, and contact info. Always one swipe away on your iPhone.</p>              <span className="inline-block mt-2 text-[11px] font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">14-DAY FREE TRIAL</span>
            </div>
            {/* Visual */}
            <div className="flex-shrink-0 opacity-80">
              <div className="w-16 h-20 bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-1 border border-gray-200">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.466 2.224-1.24 3.016-.79.8-2.08 1.4-3.19 1.32-.14-1.1.48-2.26 1.25-3.04.78-.79 2.14-1.35 3.18-1.3zm4.35 15.64c-.5 1.14-.73 1.65-1.38 2.68-.9 1.4-2.17 3.14-3.75 3.16-1.41.02-1.78-.9-3.7-.9-1.92 0-2.34.88-3.72.92-1.57.03-2.77-1.56-3.67-2.96-2.52-3.92-2.79-8.52-1.23-10.92 1.1-1.68 2.83-2.66 4.47-2.66 1.67 0 2.72.92 4.1.92 1.33 0 2.14-.93 4.09-.93 1.41 0 2.91.77 3.99 2.1-3.52 1.93-2.95 6.92.8 8.59z"/>
                </svg>
                <div className="w-10 h-1 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* NEXT BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="mt-8 w-full max-w-sm bg-blue-600 text-white font-semibold py-4 rounded-2xl text-base"
      >
        Next →
      </motion.button>
    </div>
  );
}