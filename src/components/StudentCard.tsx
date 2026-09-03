"use client";

import React from "react";
import { 
  Phone, 
  PhoneCall, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Edit, 
  Trash2, 
  RefreshCw,
  Users2,
  Building
} from "lucide-react";
import { formatPhoneNumber, cleanPhoneForCall, getDurationHolding } from "@/lib/utils";

export interface StudentData {
  _id: string;
  name: string;
  phone: string;
  parentPhone: string;
  group: string;
  branch: string;
  status: "taken" | "returned";
  laptopId?: string;
  takenAt?: string | null;
  returnedAt?: string | null;
  notes?: string;
}

interface StudentCardProps {
  student: StudentData;
  onToggleStatus: (student: StudentData) => void;
  onEdit: (student: StudentData) => void;
  onDelete: (id: string, name: string) => void;
}

export function StudentCard({
  student,
  onToggleStatus,
  onEdit,
  onDelete,
}: StudentCardProps) {
  const isTaken = student.status === "taken";

  return (
    <div
      className={`group relative rounded-2xl p-5 transition-all duration-300 border ${
        isTaken
          ? "bg-rose-50/50 border-red-300 shadow-md shadow-red-500/5 hover:border-red-400 hover:shadow-lg"
          : "bg-white border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Top Banner / Status Indicator */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          {/* Main Indicator: RED CHECK / GREEN CHECK */}
          <button
            onClick={() => onToggleStatus(student)}
            title={isTaken ? "Noutbukni topshirdi deb belgilash" : "Noutbuk oldi deb belgilash"}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${
              isTaken
                ? "bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 animate-pulse"
                : "bg-emerald-100 text-emerald-600 border border-emerald-300 hover:bg-emerald-200"
            }`}
          >
            {isTaken ? (
              <AlertCircle className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                {student.name}
              </h3>
              {isTaken ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-300">
                  🔴 Olingan
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                  🟢 Joyida
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                <Users2 className="w-3.5 h-3.5 text-sky-500" />
                <span>{student.group || "Mars IT"}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {student.branch || "Yunusobod"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Edit/Delete actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(student)}
            title="Tahrirlash"
            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(student._id, student.name)}
            title="O'chirish"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Laptop & Timing Details if taken */}
      {isTaken && (
        <div className="mb-3.5 p-2.5 rounded-xl bg-red-100/60 border border-red-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-red-800 font-bold">
            <Laptop className="w-4 h-4 text-red-600" />
            <span>Noutbuk: <strong>{student.laptopId || "Raqamsiz"}</strong></span>
          </div>
          {student.takenAt && (
            <div className="flex items-center gap-1 text-red-700 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{getDurationHolding(student.takenAt)}</span>
            </div>
          )}
        </div>
      )}

      {student.notes && (
        <p className="text-xs text-slate-600 italic mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          💬 {student.notes}
        </p>
      )}

      {/* Direct Contact Phone & Calling Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        {/* 1. Call Student */}
        <a
          href={`tel:${cleanPhoneForCall(student.phone)}`}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50/80 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-all border border-sky-200 active:scale-[0.98]"
        >
          <Phone className="w-3.5 h-3.5 text-sky-600" />
          <span>O'quvchi: {formatPhoneNumber(student.phone)}</span>
        </a>

        {/* 2. Call Parent (CRITICAL FOR UNRETURNED) */}
        <a
          href={`tel:${cleanPhoneForCall(student.parentPhone)}`}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
            isTaken
              ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-500/25 ring-1 ring-red-300"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
          }`}
        >
          <PhoneCall className={`w-3.5 h-3.5 ${isTaken ? "animate-bounce" : "text-amber-600"}`} />
          <span>Ota-onasi: {formatPhoneNumber(student.parentPhone)}</span>
        </a>
      </div>

      {/* Status Toggle Button Bottom Bar */}
      <div className="mt-3">
        <button
          onClick={() => onToggleStatus(student)}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            isTaken
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20"
              : "bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200"
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {isTaken ? "Noutbukni qaytarib olish (Topshirdi) 🟢" : "Noutbuk berish (Olib ketdi) 🔴"}
        </button>
      </div>
    </div>
  );
}
