"use client";

import { motion } from "framer-motion";

export default function SocialLayout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center"
    >
      <h1 className="text-2xl font-bold text-slate-800 mb-3">
        Social Mode
      </h1>

      <p className="text-slate-500 text-lg mb-4">
        Coming Soon 🚀
      </p>

      <p className="text-slate-400 text-sm">
        We're building a new way to share your social presence.
      </p>
    </motion.div>
  );
}