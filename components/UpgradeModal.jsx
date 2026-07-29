"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function UpgradeModal({ open, onClose, title, description }) {
  const router = useRouter()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-7 flex flex-col items-center gap-3 max-w-xs w-full text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M5 16L3 5l5.5 4L12 3l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title || "Upgrade to Pro"}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {description || "This feature is available on the Pro plan."}
            </p>
            <button
              onClick={() => router.push("/upgrade")}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold py-3 rounded-2xl"
            >
              Upgrade to Pro →
            </button>
            <button onClick={onClose} className="text-sm text-gray-400 mt-1">
              Not now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}