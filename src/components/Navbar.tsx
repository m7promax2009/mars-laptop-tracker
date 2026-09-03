"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Laptop, History, LogOut, Plus, Sparkles, Building2 } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform duration-200">
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1">
                MARS <span className="text-red-500 font-black">IT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                Laptop Tracker
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium">
              Noutbuklarni nazorat qilish tizimi
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/"
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              pathname === "/"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Asosiy</span>
            {unreturnedCount > 0 && (
              <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                pathname === "/" ? "bg-white text-red-600 shadow-xs" : "bg-red-500 text-white animate-pulse"
              }`}>
                {unreturnedCount}
              </span>
            )}
          </Link>

          <Link
            href="/history"
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              pathname === "/history"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
              className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white px-3.5 sm:px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-sky-600/25 hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">O'quvchi qo'shish</span>
              <span className="sm:hidden">Qo'shish</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            title="Chiqish"
            className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-slate-200 bg-white"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
