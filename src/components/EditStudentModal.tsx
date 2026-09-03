"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3, Phone, Building, Laptop } from "lucide-react";
import { StudentData } from "./StudentCard";

interface EditStudentModalProps {
  isOpen: boolean;
  student: StudentData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditStudentModal({ isOpen, student, onClose, onSuccess }: EditStudentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [group, setGroup] = useState("");
  const [branch, setBranch] = useState("Yunusobod");
  const [laptopId, setLaptopId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setPhone(student.phone || "");
      setParentPhone(student.parentPhone || "");
      setGroup(student.group || "");
      setBranch(student.branch || "Yunusobod");
      setLaptopId(student.laptopId || "");
      setNotes(student.notes || "");
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch(`/api/students/${student._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          parentPhone,
          group,
          branch,
          laptopId,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Xatolik yuz berdi");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ma'lumotlarni Tahrirlash</h2>
            <p className="text-xs text-slate-400">{student.name} o'quvchisi</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">O'quvchi F.I.SH</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">O'quvchi telefoni</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">Ota-onasi telefoni</label>
              <input
                type="text"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-amber-900/40 rounded-xl text-sm text-amber-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Guruhi</label>
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Filial</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
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

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Noutbuk Raqami / Modeli</label>
            <input
              type="text"
              value={laptopId}
              onChange={(e) => setLaptopId(e.target.value)}
              placeholder="MARS-LP-018"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Izoh</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              {loading ? "Saqlanmoqda..." : "O'zgarishlarni Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
