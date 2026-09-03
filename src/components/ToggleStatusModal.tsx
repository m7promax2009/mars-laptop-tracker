"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { StudentData } from "./StudentCard";
import confetti from "canvas-confetti";

interface ToggleStatusModalProps {
  isOpen: boolean;
  student: StudentData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ToggleStatusModal({
  isOpen,
  student,
  onClose,
  onSuccess,
}: ToggleStatusModalProps) {
  const [laptopId, setLaptopId] = useState(student?.laptopId || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !student) return null;

  const isCurrentlyTaken = student.status === "taken";
  const nextStatus = isCurrentlyTaken ? "returned" : "taken";

  const handleToggle = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/students/${student._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          laptopId: nextStatus === "taken" ? (laptopId || "MARS-LP-AUTO") : student.laptopId,
          notes: notes || (nextStatus === "returned" ? "Muvaffaqiyatli topshirildi" : "Noutbuk berildi"),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      if (nextStatus === "returned") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isCurrentlyTaken
                ? "bg-emerald-100 text-emerald-600 border border-emerald-300"
                : "bg-red-100 text-red-600 border border-red-300"
            }`}
          >
            {isCurrentlyTaken ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isCurrentlyTaken ? "Noutbukni Qaytarib Olish" : "Noutbuk Berish"}
            </h2>
            <p className="text-xs text-slate-500">{student.name}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>O'quvchi:</span>
            <strong className="text-slate-900">{student.name}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Guruhi:</span>
            <span className="text-slate-800 font-medium">{student.group}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Holat o'zgarishi:</span>
            <span className={isCurrentlyTaken ? "text-emerald-700 font-bold" : "text-red-700 font-bold"}>
              {isCurrentlyTaken ? "🔴 Olingan ➔ 🟢 Topshirildi" : "🟢 Bo'sh ➔ 🔴 Noutbuk Olmoqda"}
            </span>
          </div>
        </div>

        {!isCurrentlyTaken && (
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Berilayotgan noutbuk raqami:
            </label>
            <input
              type="text"
              value={laptopId}
              onChange={(e) => setLaptopId(e.target.value)}
              placeholder="Masalan: MARS-LP-018"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Qo'shimcha izoh:
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isCurrentlyTaken ? "Holati yaxshi, topshirdi" : "Dars uchun oldi"}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleToggle}
            className={`w-2/3 py-2.5 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
              isCurrentlyTaken
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25"
                : "bg-red-600 hover:bg-red-500 shadow-red-600/25"
            }`}
          >
            {loading ? "Saqlanmoqda..." : isCurrentlyTaken ? "Topshirdi deb tasdiqlash 🟢" : "Olib ketdi deb tasdiqlash 🔴"}
          </button>
        </div>
      </div>
    </div>
  );
}
