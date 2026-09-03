"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { 
  History, 
  Laptop, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Search
} from "lucide-react";
import Link from "next/link";
import { formatDateUz } from "@/lib/utils";

interface LogItem {
  _id: string;
  studentId: string;
  studentName: string;
  action: "TAKEN" | "RETURNED" | "CREATED" | "EDITED" | "DELETED";
  laptopId?: string;
  adminName: string;
  details?: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/logs");
      const data = await res.json();
      if (data.success) {
        setLogs(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.studentName.toLowerCase().includes(q) ||
      (l.laptopId && l.laptopId.toLowerCase().includes(q)) ||
      (l.details && l.details.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <History className="w-6 h-6 text-sky-600" />
                <span>Noutbuklar Harakatlari Tarixi</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Kim qachon noutbuk oldi va qachon topshirdi to'liq hisoboti
              </p>
            </div>
          </div>

          <button
            onClick={fetchLogs}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2 text-xs font-semibold shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Yangilash</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tarix bo'yicha qidiruv (o'quvchi ismi, noutbuk ID)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 shadow-xs transition-all"
          />
        </div>

        {/* Logs Timeline */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm shadow-xs">
            Hech qanday harakatlar tarixi topilmadi.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const isTaken = log.action === "TAKEN";
              const isReturned = log.action === "RETURNED";

              return (
                <div
                  key={log._id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                    isTaken
                      ? "bg-rose-50/70 border-red-200 hover:border-red-300"
                      : isReturned
                      ? "bg-emerald-50/70 border-emerald-200 hover:border-emerald-300"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isTaken
                          ? "bg-red-100 text-red-600 border border-red-300"
                          : isReturned
                          ? "bg-emerald-100 text-emerald-600 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {isTaken ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : isReturned ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Laptop className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {log.studentName}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                            isTaken
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : isReturned
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {isTaken
                            ? "🔴 Noutbuk oldi"
                            : isReturned
                            ? "🟢 Qaytardi"
                            : log.action}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                        {log.laptopId && (
                          <span className="text-slate-700 font-semibold">
                            Noutbuk: <strong className="text-slate-900">{log.laptopId}</strong>
                          </span>
                        )}
                        {log.details && <span className="italic text-slate-500">"{log.details}"</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/80">
                    <div className="flex items-center sm:justify-end gap-1.5 text-slate-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      <span>{formatDateUz(log.createdAt)}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Mas'ul: {log.adminName || "Admin"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
