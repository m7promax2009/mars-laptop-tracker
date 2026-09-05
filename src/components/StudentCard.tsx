"use client";

import React from "react";
import { Phone, PhoneCall, Laptop, Clock, CheckCircle2, AlertTriangle, Edit, Trash2, RefreshCw, Users2 } from "lucide-react";
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

function formatTakenTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mo} — ${hh}:${mm}`;
}

export function StudentCard({ student, onToggleStatus, onEdit, onDelete }: StudentCardProps) {
  const isTaken = student.status === "taken";

  return (
    <div className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${
      isTaken
        ? "bg-white ring-2 ring-red-400/60 shadow-lg shadow-red-100"
        : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-200"
    }`}>
      {/* Red top bar for taken */}
      {isTaken && <div className="h-1 w-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-400" />}

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => onToggleStatus(student)}
              className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-90 ${
                isTaken
                  ? "bg-red-500 text-white shadow-md shadow-red-200"
                  : "bg-emerald-500 text-white shadow-md shadow-emerald-200"
              }`}
            >
              {isTaken ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </button>
            <div className="min-w-0">
              <h3 className="font-bold text-[15px] text-slate-900 truncate">{student.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md">
                  {student.group}
                </span>
                {isTaken ? (
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-red-100 text-red-700">Qaytarmagan</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">Joyida ✓</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5 shrink-0">
            <button onClick={() => onEdit(student)} className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50"><Edit className="w-3.5 h-3.5" /></button>
            <button onClick={() => onDelete(student._id, student.name)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* Taken info box */}
        {isTaken && (
          <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-red-800 font-bold text-xs">
                <Laptop className="w-4 h-4 text-red-600" />
                Noutbuk: {student.laptopId || "—"}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-red-700">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-semibold">Olingan vaqti: {formatTakenTime(student.takenAt)}</span>
              </div>
              <span className="text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full text-[11px]">
                {getDurationHolding(student.takenAt)}
              </span>
            </div>
            {student.notes && (
              <p className="text-[11px] text-red-700/80 italic pt-0.5">💬 {student.notes}</p>
            )}
          </div>
        )}

        {!isTaken && student.notes && (
          <p className="text-[11px] text-slate-500 italic mb-3 px-1">💬 {student.notes}</p>
        )}

        {/* Phone buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <a href={`tel:${cleanPhoneForCall(student.phone)}`}
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-colors">
            <Phone className="w-3 h-3 text-sky-500" />
            <span className="truncate">{formatPhoneNumber(student.phone)}</span>
          </a>
          <a href={`tel:${cleanPhoneForCall(student.parentPhone)}`}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
              isTaken
                ? "bg-red-600 hover:bg-red-500 text-white shadow-sm shadow-red-200"
                : "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
            }`}>
            <PhoneCall className={`w-3 h-3 ${isTaken ? "animate-bounce" : "text-amber-500"}`} />
            <span className="truncate">Ota-ona</span>
          </a>
        </div>

        {/* Toggle button */}
        <button onClick={() => onToggleStatus(student)}
          className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isTaken
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
              : "bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200"
          }`}>
          <RefreshCw className="w-3.5 h-3.5" />
          {isTaken ? "Topshirdi ✓" : "Noutbuk oldi"}
        </button>
      </div>
    </div>
  );
}
