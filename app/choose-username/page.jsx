"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { motion } from "framer-motion";

export default function ChooseUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // 🔥 Check session immediately
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push("/login");
        return;
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleSubmit = async () => {
    const cleanUsername = username
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!cleanUsername) {
      setError("Invalid username");
      return;
    }

    const { data: existing } = 
    await supabase
      .from("profiles")
      .select("id")
      .eq("username", cleanUsername)
      .maybeSingle();

    if (existing) {
      setError("Username already taken");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return;

    await supabase
      .from("profiles")
      .update({ username: cleanUsername })
      .eq("id", userData.user.id);

    router.push("/mockup");
  };

  // 🟢 Smooth loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neutral-400">
          Preparing your profile...
        </div>
      </div>
    );
  }

return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200 px-4"
  >
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 space-y-6">

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Choose Your Username
        </h1>
        <p className="text-sm text-neutral-500">
          This Will Be Your Public Taply Link
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 font-medium">
  taply.now/
</span>

          <input
            className="w-full border border-neutral-300 rounded-lg py-3 pl-24 pr-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            placeholder="your-name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
      >
        Continue
      </button>

    </div>
  </motion.div>
);
}