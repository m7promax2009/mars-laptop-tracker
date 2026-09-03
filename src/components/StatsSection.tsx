"use client";

import React from "react";
import { Users, AlertCircle, CheckCircle2 } from "lucide-react";

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* 1. All Students */}
      <button
        onClick={() => onFilterChange("all")}
        className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          activeFilter === "all"
            ? "bg-white border-sky-500 ring-2 ring-sky-500/20 shadow-lg shadow-sky-500/10"
            : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Barcha O'quvchilar
          </span>
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900">{totalCount}</span>
          <span className="text-xs text-slate-500 font-medium">nafar ro'yxatda</span>
        </div>
      </button>

      {/* 2. Unreturned / Taken Laptops (RED ALERT) */}
      <button
        onClick={() => onFilterChange("taken")}
        className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
          activeFilter === "taken"
            ? "bg-rose-50/80 border-red-500 ring-2 ring-red-500/30 shadow-lg shadow-red-500/10"
            : "bg-white/90 border-red-200 hover:bg-rose-50/40 hover:border-red-300 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Noutbuk Olingan (Qaytarilmagan)
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center border border-red-200 animate-pulse">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-red-600">{takenCount}</span>
          <span className="text-xs font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full border border-red-200">
            🔴 Qizil galichka
          </span>
        </div>
      </button>

      {/* 3. Returned / In School (GREEN) */}
      <button
        onClick={() => onFilterChange("returned")}
        className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          activeFilter === "returned"
            ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10"
            : "bg-white/90 border-emerald-200 hover:bg-emerald-50/40 hover:border-emerald-300 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Topshirilgan (Joyida)
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-emerald-600">{returnedCount}</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
            🟢 Yashil galichka
          </span>
        </div>
      </button>
    </div>
  );
}
