"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { StatsSection } from "@/components/StatsSection";
import { StudentCard, StudentData } from "@/components/StudentCard";
import { AddStudentModal } from "@/components/AddStudentModal";
import { EditStudentModal } from "@/components/EditStudentModal";
import { ToggleStatusModal } from "@/components/ToggleStatusModal";
import { 
  Search, 
  X, 
  Download, 
  Plus, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function DashboardPage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "taken" | "returned">("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [isMongo, setIsMongo] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [toggleStudent, setToggleStudent] = useState<StudentData | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      const data = await res.json();

      if (data.success) {
        setStudents(data.data || []);
        setIsMongo(data.source === "mongodb");
      }
    } catch (err) {
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filtered List
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // 1. Status Filter
      if (activeFilter === "taken" && student.status !== "taken") return false;
      if (activeFilter === "returned" && student.status !== "returned") return false;

      // 2. Branch Filter
      if (selectedBranch !== "all" && student.branch !== selectedBranch) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesPhone = student.phone.includes(query);
        const matchesParentPhone = student.parentPhone.includes(query);
        const matchesGroup = student.group.toLowerCase().includes(query);
        const matchesLaptop = student.laptopId?.toLowerCase().includes(query);

        return matchesName || matchesPhone || matchesParentPhone || matchesGroup || matchesLaptop;
      }

      return true;
    });
  }, [students, activeFilter, selectedBranch, searchQuery]);

  // Counts
  const totalCount = students.length;
  const takenCount = students.filter((s) => s.status === "taken").length;
  const returnedCount = students.filter((s) => s.status === "returned").length;

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Haqiqatan ham "${name}" o'quvchisini ro'yxatdan o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(`${name} o'chirildi`);
        fetchStudents();
      } else {
        toast.error(data.message || "O'chirishda xatolik");
      }
    } catch (e) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleExportExcel = () => {
    try {
      const rows = filteredStudents.map((s, idx) => ({
        "№": idx + 1,
        "F.I.SH": s.name,
        "Holati": s.status === "taken" ? "🔴 Olingan (Qaytarilmagan)" : "🟢 Topshirgan",
        "Noutbuk ID": s.laptopId || "-",
        "Guruhi": s.group || "-",
        "Filial": s.branch || "-",
        "O'quvchi telefoni": s.phone,
        "Ota-onasi telefoni": s.parentPhone,
        "Izoh": s.notes || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Noutbuklar");
      XLSX.writeFile(
        workbook,
        `Mars_Noutbuklar_${activeFilter}_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      toast.success("Excel fayl muvaffaqiyatli yuklab olindi!");
    } catch (e) {
      toast.error("Eksport qilishda xatolik");
    }
  };

  const handleSeedData = async () => {
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      toast.success(data.message || "Baza yangilandi");
      fetchStudents();
    } catch (e) {
      toast.error("Xatolik");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar onOpenAddModal={() => setIsAddOpen(true)} unreturnedCount={takenCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Top Notification / Database Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMongo ? "bg-emerald-400" : "bg-sky-400"}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isMongo ? "bg-emerald-500" : "bg-sky-500"}`} />
            </span>
            <span className="text-slate-600 font-medium">
              Baza holati: <strong className="text-slate-900">{isMongo ? "MongoDB Atlas (Bulutli)" : "Tezkor Baza (Active Ready)"}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedData}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Namuna ma'lumotlarni tiklash</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel Eksport</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <StatsSection
          totalCount={totalCount}
          takenCount={takenCount}
          returnedCount={returnedCount}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Top Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O'quvchi ismi, telefon, ota-onasi raqami, guruh yoki noutbuk..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Status Buttons */}
            <div className="md:col-span-4 flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Hammasi ({totalCount})
              </button>
              <button
                onClick={() => setActiveFilter("taken")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeFilter === "taken"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                🔴 Qarzdorlar ({takenCount})
              </button>
              <button
                onClick={() => setActiveFilter("returned")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeFilter === "returned"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                🟢 Joyida ({returnedCount})
              </button>
            </div>

            {/* Branch Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="all">Barcha filiallar</option>
                <option value="Yunusobod">Yunusobod</option>
                <option value="Chilonzor">Chilonzor</option>
                <option value="Tinchlik">Tinchlik</option>
                <option value="Beruniy">Beruniy</option>
                <option value="Qo'yliq">Qo'yliq</option>
                <option value="Buyuk Ipak Yo'li">Buyuk Ipak Yo'li</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section Title & Results Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900">
              {activeFilter === "taken"
                ? "🔴 Noutbuk Olgan va Qaytarilmaganlar Ro'yxati"
                : activeFilter === "returned"
                ? "🟢 Noutbukni Topshirgan O'quvchilar"
                : "Barcha O'quvchilar Ro'yxati"}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold border border-sky-200">
              {filteredStudents.length} ta
            </span>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="sm:hidden p-2 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Qo'shish</span>
          </button>
        </div>

        {/* Students Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs my-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3 border border-sky-100">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Mos keluvchi o'quvchi topilmadi</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Qidiruv so'zini o'zgartirib ko'ring yoki yangi o'quvchi qo'shing.
            </p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi O'quvchi Qo'shish</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onToggleStatus={(s) => setToggleStudent(s)}
                onEdit={(s) => setEditingStudent(s)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={() => {
          toast.success("O'quvchi muvaffaqiyatli qo'shildi!");
          fetchStudents();
        }}
      />

      <EditStudentModal
        isOpen={Boolean(editingStudent)}
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSuccess={() => {
          toast.success("O'zgarishlar saqlandi!");
          fetchStudents();
        }}
      />

      <ToggleStatusModal
        isOpen={Boolean(toggleStudent)}
        student={toggleStudent}
        onClose={() => setToggleStudent(null)}
        onSuccess={() => {
          toast.success("Noutbuk holati yangilandi!");
          fetchStudents();
        }}
      />
    </div>
  );
}
