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
  Filter, 
  Download, 
  Plus, 
  Laptop, 
  Database, 
  RotateCcw,
  AlertTriangle,
  Sparkles,
  CheckCircle2
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
      toast.success("Excel fayl yuklab olindi!");
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
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMongo ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isMongo ? "bg-emerald-500" : "bg-amber-500"}`} />
            </span>
            <span className="text-slate-300 font-medium">
              Baza holati: <strong>{isMongo ? "MongoDB Atlas (Bulutli)" : "Tezkor Baza (Active Ready)"}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedData}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Namuna ma'lumotlarni qayta tiklash</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3 h-3" />
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
        <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl mb-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Top Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O'quvchi ismi, telefon, ota-onasi raqami, guruh yoki noutbuk..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Status Buttons */}
            <div className="md:col-span-4 flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === "all"
                    ? "bg-slate-800 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Hammasi ({totalCount})
              </button>
              <button
                onClick={() => setActiveFilter("taken")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeFilter === "taken"
                    ? "bg-red-500 text-white shadow shadow-red-500/20"
                    : "text-red-400 hover:bg-red-500/10"
                }`}
              >
                🔴 Qarzdorlar ({takenCount})
              </button>
              <button
                onClick={() => setActiveFilter("returned")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeFilter === "returned"
                    ? "bg-emerald-600 text-white shadow shadow-emerald-500/20"
                    : "text-emerald-400 hover:bg-emerald-500/10"
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
                className="w-full py-2.5 px-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-red-500 cursor-pointer"
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
            <h2 className="text-lg font-bold text-white">
              {activeFilter === "taken"
                ? "🔴 Noutbuk Olgan va Qaytarilmaganlar Ro'yxati"
                : activeFilter === "returned"
                ? "🟢 Noutbukni Topshirgan O'quvchilar"
                : "Barcha O'quvchilar Ro'yxati"}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
              {filteredStudents.length} ta
            </span>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="sm:hidden p-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Qo'shish</span>
          </button>
        </div>

        {/* Students Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/60 my-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Mos keluvchi o'quvchi topilmadi</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Qidiruv so'zini o'zgartirib ko'ring yoki yangi o'quvchi qo'shing.
            </p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-2"
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
