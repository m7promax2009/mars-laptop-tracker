"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Laptop, History, LogOut, Plus, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface NavbarProps {
  onOpenAddModal?: () => void;
  unreturnedCount?: number;
}

export function Navbar({ onOpenAddModal, unreturnedCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-200">
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                MARS <span className="text-red-500">IT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Laptop Tracker
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Noutbuklarni nazorat qilish tizimi
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              pathname === "/"
                ? "bg-red-500/15 text-red-400 border border-red-500/30 shadow-sm shadow-red-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Asosiy</span>
            {unreturnedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                {unreturnedCount}
              </span>
            )}
          </Link>

          <Link
            href="/history"
            className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              pathname === "/history"
                ? "bg-red-500/15 text-red-400 border border-red-500/30 shadow-sm shadow-red-500/10"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Harakatlar tarixi</span>
            <span className="sm:hidden">Tarix</span>
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-red-600/30 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">O'quvchi qo'shish</span>
              <span className="sm:hidden">Qo'shish</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            title="Chiqish"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-slate-800"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
