"use client";

import React, { useState } from "react";
import { X, UserPlus, Phone, Building, Users2, Laptop } from "lucide-react";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddStudentModal({ isOpen, onClose, onSuccess }: AddStudentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [parentPhone, setParentPhone] = useState("+998");
  const [group, setGroup] = useState("");
  const [branch, setBranch] = useState("Yunusobod");
  const [status, setStatus] = useState<"returned" | "taken">("returned");
  const [laptopId, setLaptopId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("O'quvchi ismini kiriting!");
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setError("O'quvchi telefon raqamini to'liq kiriting!");
      return;
    }
    if (!parentPhone.trim() || parentPhone.length < 9) {
      setError("Ota-onasi telefon raqamini to'liq kiriting!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          parentPhone,
          group: group || "Mars IT",
          branch,
          status,
          laptopId: status === "taken" ? laptopId : "",
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      onSuccess();
      onClose();
      // Reset form
      setName("");
      setPhone("+998");
      setParentPhone("+998");
      setGroup("");
      setLaptopId("");
      setNotes("");
      setStatus("returned");
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center border border-sky-200">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Yangi O'quvchi Qo'shish</h2>
            <p className="text-xs text-slate-500">Mars IT School o'quvchisini tizimga kiritish</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              O'quvchi F.I.SH <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Azizbek Rahimov"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
            />
          </div>

          {/* Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                O'quvchi telefoni <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-700 mb-1">
                Ota-onasi telefoni <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+998 93 987 65 43"
                className="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-sm text-amber-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Group and Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Guruhi / Yo'nalishi
              </label>
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                placeholder="Frontend 102, Python 45..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Filial
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="Yunusobod">Yunusobod</option>
                <option value="Chilonzor">Chilonzor</option>
                <option value="Tinchlik">Tinchlik</option>
                <option value="Beruniy">Beruniy</option>
                <option value="Qo'yliq">Qo'yliq</option>
                <option value="Buyuk Ipak Yo'li">Buyuk Ipak Yo'li</option>
                <option value="Asosiy filial">Asosiy filial</option>
              </select>
            </div>
          </div>

          {/* Initial Laptop Status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Hozirgi noutbuk holati:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("returned")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  status === "returned"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                🟢 Topshirilgan (Yo'q)
              </button>
              <button
                type="button"
                onClick={() => setStatus("taken")}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  status === "taken"
                    ? "bg-red-100 text-red-800 border-red-300 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                🔴 Hozir Noutbuk Oldi
              </button>
            </div>

            {status === "taken" && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-xs font-bold text-red-700 mb-1">
                  Noutbuk raqami / Modeli:
                </label>
                <input
                  type="text"
                  value={laptopId}
                  onChange={(e) => setLaptopId(e.target.value)}
                  placeholder="Masalan: MARS-LP-025 yoki Asus #12"
                  className="w-full px-3 py-2 bg-white border border-red-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Izoh (ixtiyoriy)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Masalan: darsdan so'ng 1 soatga oldi..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Qo'shilmoqda..." : "Saqlash va Qo'shish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
