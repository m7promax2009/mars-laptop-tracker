"use client";

import React from "react";
import { Users, AlertTriangle, CheckCircle2, Laptop } from "lucide-react";

interface StatsSectionProps {
  totalCount: number;
  takenCount: number;
  returnedCount: number;
  activeFilter: "all" | "taken" | "returned";
  onFilterChange: (filter: "all" | "taken" | "returned") => void;
}

export function StatsSection({ totalCount, takenCount, returnedCount, activeFilter, onFilterChange }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <button onClick={() => onFilterChange("all")}
        className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
          activeFilter === "all" ? "border-sky-500 bg-sky-50 shadow-md" : "border-transparent bg-white shadow-sm hover:shadow-md"
        }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Jami</span>
          <Users className="w-4 h-4 text-sky-500" />
        </div>
        <span className="text-2xl font-black text-slate-900">{totalCount}</span>
      </button>

      <button onClick={() => onFilterChange("taken")}
        className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
          activeFilter === "taken" ? "border-red-500 bg-red-50 shadow-md" : "border-transparent bg-white shadow-sm hover:shadow-md"
        }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">Qarzdor</span>
          <AlertTriangle className={`w-4 h-4 text-red-500 ${takenCount > 0 ? "animate-pulse" : ""}`} />
        </div>
        <span className="text-2xl font-black text-red-600">{takenCount}</span>
      </button>

      <button onClick={() => onFilterChange("returned")}
        className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
          activeFilter === "returned" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-transparent bg-white shadow-sm hover:shadow-md"
        }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Joyida</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <span className="text-2xl font-black text-emerald-600">{returnedCount}</span>
      </button>
    </div>
  );
}
