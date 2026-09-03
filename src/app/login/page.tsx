"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Laptop, Lock, User, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("mars2026");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Kirishda xatolik");
        return;
      }

      toast.success("Xush kelibsiz! Tizimga muvaffaqiyatli kirildi");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error("Tarmoq xatosi yoki server javob bermadi");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = () => {
    setUsername("admin");
    setPassword("mars2026");
    setTimeout(() => {
      handleLogin();
    }, 50);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0b0f19] to-slate-950">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Main Glass Card */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-red-950/20">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-xl shadow-red-600/30 mb-4 transform hover:scale-105 transition-transform">
              <Laptop className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              MARS <span className="text-red-500">IT</span> SCHOOL
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Noutbuklarni hisobga olish va monitoring tizimi
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Login / Foydalanuvchi
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Tekshirilmoqda...</span>
              ) : (
                <>
                  <span>Tizimga Kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick One-Click Entry */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ 1-Bosishda Oson Kirish (Admin)</span>
            </button>
            <p className="text-[11px] text-slate-500 mt-2">
              Standart login: <code className="text-slate-400 font-mono">admin</code> / parol: <code className="text-slate-400 font-mono">mars2026</code>
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Mars IT School Xavfsiz tizimi</span>
        </div>
      </div>
    </main>
  );
}
