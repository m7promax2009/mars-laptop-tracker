"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { StatsSection } from "@/components/StatsSection";
import { StudentCard, StudentData } from "@/components/StudentCard";
import { AddStudentModal } from "@/components/AddStudentModal";
import { EditStudentModal } from "@/components/EditStudentModal";
import { ToggleStatusModal } from "@/components/ToggleStatusModal";
import { Search, X, Download, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function DashboardPage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "taken" | "returned">("all");
  const [isMongo, setIsMongo] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [toggleStudent, setToggleStudent] = useState<StudentData | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.success) { setStudents(data.data || []); setIsMongo(data.source === "mongodb"); }
    } catch { toast.error("Xatolik yuz berdi"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (activeFilter === "taken" && s.status !== "taken") return false;
      if (activeFilter === "returned" && s.status !== "returned") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return s.name.toLowerCase().includes(q) || s.phone.includes(q) || s.parentPhone.includes(q) || s.group.toLowerCase().includes(q) || (s.laptopId?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [students, activeFilter, searchQuery]);

  const totalCount = students.length;
  const takenCount = students.filter((s) => s.status === "taken").length;
  const returnedCount = students.filter((s) => s.status === "returned").length;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ni o'chirmoqchimisiz?`)) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success(`${name} o'chirildi`); fetchStudents(); }
    } catch { toast.error("Xatolik"); }
  };

  const handleExportExcel = () => {
    const rows = filteredStudents.map((s, i) => ({
      "№": i + 1, "F.I.SH": s.name,
      "Holat": s.status === "taken" ? "Qaytarilmagan" : "Joyida",
      "Noutbuk": s.laptopId || "-", "Guruh": s.group,
      "Telefon": s.phone, "Ota-ona": s.parentPhone, "Izoh": s.notes || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Noutbuklar");
    XLSX.writeFile(wb, `Mars_${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Excel yuklab olindi");
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar onOpenAddModal={() => setIsAddOpen(true)} unreturnedCount={takenCount} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5">
        {/* Controls bar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMongo ? "bg-emerald-400" : "bg-sky-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isMongo ? "bg-emerald-500" : "bg-sky-500"}`} />
            </span>
            <span>{isMongo ? "MongoDB Atlas" : "Tezkor baza"}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { fetch("/api/seed", { method: "POST" }).then(() => fetchStudents()); }}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3" /> Tiklash
            </button>
            <button onClick={handleExportExcel}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-semibold flex items-center gap-1.5">
              <Download className="w-3 h-3" /> Excel
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsSection totalCount={totalCount} takenCount={takenCount} returnedCount={returnedCount} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Search bar */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ism, telefon, guruh yoki noutbuk raqami bo'yicha qidirish..."
            className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 shadow-sm" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">
            {activeFilter === "taken" ? "Noutbuk olgan va qaytarmaganlar" : activeFilter === "returned" ? "Noutbuk joyida turganlar" : "Barcha o'quvchilar"}
            <span className="ml-2 text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">{filteredStudents.length}</span>
          </h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 rounded-2xl bg-white animate-pulse" />)}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-3">O'quvchi topilmadi</p>
            <button onClick={() => setIsAddOpen(true)} className="text-xs px-4 py-2 rounded-xl bg-sky-600 text-white font-bold">
              <Plus className="w-3.5 h-3.5 inline mr-1" />Yangi qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStudents.map((s) => (
              <StudentCard key={s._id} student={s} onToggleStatus={(s) => setToggleStudent(s)} onEdit={(s) => setEditingStudent(s)} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <AddStudentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={() => { toast.success("O'quvchi qo'shildi!"); fetchStudents(); }} />
      <EditStudentModal isOpen={Boolean(editingStudent)} student={editingStudent} onClose={() => setEditingStudent(null)} onSuccess={() => { toast.success("Saqlandi!"); fetchStudents(); }} />
      <ToggleStatusModal isOpen={Boolean(toggleStudent)} student={toggleStudent} onClose={() => setToggleStudent(null)} onSuccess={() => { toast.success("Yangilandi!"); fetchStudents(); }} />
    </div>
  );
}
