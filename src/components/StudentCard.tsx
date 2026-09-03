"use client";

import React from "react";
import { 
  Phone, 
  PhoneCall, 
  User, 
  Users2, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Edit, 
  Trash2, 
  RefreshCw,
  MessageCircle,
  Building
} from "lucide-react";
import { formatPhoneNumber, cleanPhoneForCall, getDurationHolding, formatDateUz } from "@/lib/utils";

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
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${
        isTaken
          ? "bg-gradient-to-br from-red-950/40 via-slate-900/90 to-slate-950 border-red-500/40 shadow-lg shadow-red-950/30 hover:border-red-500/70"
          : "bg-slate-900/60 via-slate-900/40 to-slate-950 border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/90"
      }`}
    >
      {/* Top Banner / Status Indicator */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          {/* Main Indicator: RED CHECK / GREEN CHECK */}
          <button
            onClick={() => onToggleStatus(student)}
            title={isTaken ? "Noutbukni topshirdi deb belgilash" : "Noutbuk oldi deb belgilash"}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 active:scale-95 cursor-pointer shadow-md ${
              isTaken
                ? "bg-red-500/20 text-red-500 border border-red-500/40 ring-2 ring-red-500/20 animate-pulse hover:bg-red-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
          >
            {isTaken ? (
              <AlertCircle className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-red-400 transition-colors">
                {student.name}
              </h3>
              {isTaken ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                  🔴 Noutbuk Olingan
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  🟢 Topshirgan
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Users2 className="w-3.5 h-3.5 text-slate-500" />
                <strong className="text-slate-300">{student.group || "Mars IT"}</strong>
              </span>
              <span className="inline-flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-500" />
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
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(student._id, student.name)}
            title="O'chirish"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Laptop & Timing Details if taken */}
      {isTaken && (
        <div className="mb-3.5 p-2.5 rounded-xl bg-red-950/40 border border-red-900/40 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-red-300 font-medium">
            <Laptop className="w-4 h-4 text-red-400" />
            <span>Noutbuk: <strong>{student.laptopId || "Raqamsiz"}</strong></span>
          </div>
          {student.takenAt && (
            <div className="flex items-center gap-1 text-red-400/90 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{getDurationHolding(student.takenAt)}</span>
            </div>
          )}
        </div>
      )}

      {student.notes && (
        <p className="text-xs text-slate-400 italic mb-3.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          💬 {student.notes}
        </p>
      )}

      {/* Direct Contact Phone & Calling Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
        {/* 1. Call Student */}
        <a
          href={`tel:${cleanPhoneForCall(student.phone)}`}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition-all border border-slate-700 active:scale-[0.98]"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>O'quvchi: {formatPhoneNumber(student.phone)}</span>
        </a>

        {/* 2. Call Parent (CRITICAL FOR UNRETURNED) */}
        <a
          href={`tel:${cleanPhoneForCall(student.parentPhone)}`}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
            isTaken
              ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400/40"
              : "bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700"
          }`}
        >
          <PhoneCall className={`w-3.5 h-3.5 ${isTaken ? "animate-bounce" : "text-amber-400"}`} />
          <span>Ota-onasi: {formatPhoneNumber(student.parentPhone)}</span>
        </a>
      </div>

      {/* Status Toggle Button Bottom Bar */}
      <div className="mt-3">
        <button
          onClick={() => onToggleStatus(student)}
          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            isTaken
              ? "bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30"
              : "bg-slate-800/90 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40"
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {isTaken ? "Noutbukni qaytarib olish (Topshirdi)" : "Noutbuk berish (Olib ketdi)"}
        </button>
      </div>
    </div>
  );
}
