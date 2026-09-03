"use client";

import React from "react";
import { Users, AlertCircle, CheckCircle2, Laptop } from "lucide-react";

interface StatsSectionProps {
  totalCount: number;
  takenCount: number;
  returnedCount: number;
  activeFilter: "all" | "taken" | "returned";
  onFilterChange: (filter: "all" | "taken" | "returned") => void;
}

export function StatsSection({
  totalCount,
  takenCount,
  returnedCount,
  activeFilter,
  onFilterChange,
}: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
      {/* 1. All Students */}
      <button
        onClick={() => onFilterChange("all")}
        className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
          activeFilter === "all"
            ? "bg-slate-800/80 border-slate-600 ring-2 ring-slate-500/40 shadow-lg shadow-slate-900/50"
            : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Barcha O'quvchilar
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-white">{totalCount}</span>
          <span className="text-xs text-slate-400">nafar ro'yxatda</span>
        </div>
      </button>

      {/* 2. Unreturned / Taken Laptops (RED ALERT) */}
      <button
        onClick={() => onFilterChange("taken")}
        className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
          activeFilter === "taken"
            ? "bg-gradient-to-br from-red-950/80 via-red-900/40 to-slate-900/80 border-red-500 ring-2 ring-red-500/50 shadow-xl shadow-red-950/50"
            : "bg-red-950/20 border-red-900/40 hover:bg-red-950/40 hover:border-red-800/60"
        }`}
      >
        {takenCount > 0 && (
          <span className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Noutbuk Olingan (Qaytarilmagan)
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center animate-pulse">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-red-400">{takenCount}</span>
          <span className="text-xs font-semibold text-red-300/80">🔴 Qizil galichka</span>
        </div>
      </button>

      {/* 3. Returned / In School (GREEN) */}
      <button
        onClick={() => onFilterChange("returned")}
        className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
          activeFilter === "returned"
            ? "bg-gradient-to-br from-emerald-950/80 via-emerald-900/40 to-slate-900/80 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-950/50"
            : "bg-emerald-950/20 border-emerald-900/40 hover:bg-emerald-950/40 hover:border-emerald-800/60"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Topshirilgan (Joyida)
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400">{returnedCount}</span>
          <span className="text-xs font-semibold text-emerald-300/80">🟢 Yashil galichka</span>
        </div>
      </button>
    </div>
  );
}
