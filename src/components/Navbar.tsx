"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Laptop, History, LogOut, Plus } from "lucide-react";

interface NavbarProps { onOpenAddModal?: () => void; unreturnedCount?: number; }

export function Navbar({ onOpenAddModal, unreturnedCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }).catch(() => {}); router.push("/login"); };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Laptop className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base text-slate-900">Mars <span className="text-red-500">IT</span></span>
          <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">Tracker</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link href="/" className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${pathname === "/" ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            <Laptop className="w-3.5 h-3.5" /> Asosiy
            {unreturnedCount > 0 && <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${pathname === "/" ? "bg-white text-red-600" : "bg-red-500 text-white"}`}>{unreturnedCount}</span>}
          </Link>
          <Link href="/history" className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${pathname === "/history" ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            <History className="w-3.5 h-3.5" /> Tarix
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {onOpenAddModal && (
            <button onClick={onOpenAddModal} className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Qo'shish</span>
            </button>
          )}
          <button onClick={handleLogout} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
