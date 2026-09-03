import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { Student } from "@/lib/models/Student";
import { Log } from "@/lib/models/Log";
import { getMockStudents, addMockStudent, addMockLog } from "@/lib/mockData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("q") || "").toLowerCase().trim();
    const status = searchParams.get("status") || "all";
    const branch = searchParams.get("branch") || "all";

    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      const filter: any = {};
      if (status !== "all") {
        filter.status = status;
      }
      if (branch !== "all") {
        filter.branch = branch;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { parentPhone: { $regex: search, $options: "i" } },
          { group: { $regex: search, $options: "i" } },
          { laptopId: { $regex: search, $options: "i" } },
        ];
      }

      const students = await Student.find(filter).lean();

      // Custom priority: 'taken' first
      const sortedStudents = (students as any[]).sort((a, b) => {
        if (a.status === "taken" && b.status !== "taken") return -1;
        if (a.status !== "taken" && b.status === "taken") return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

      return NextResponse.json({
        success: true,
        source: "mongodb",
        count: sortedStudents.length,
        data: sortedStudents,
      });
    }

    // Fallback Mock In-Memory Store
    let list = getMockStudents();

    if (status !== "all") {
      list = list.filter((s) => s.status === status);
    }
    if (branch !== "all") {
      list = list.filter((s) => s.branch === branch);
    }
    if (search) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.phone.toLowerCase().includes(search) ||
          s.parentPhone.toLowerCase().includes(search) ||
          s.group.toLowerCase().includes(search) ||
          (s.laptopId && s.laptopId.toLowerCase().includes(search))
      );
    }

    list.sort((a, b) => {
      if (a.status === "taken" && b.status !== "taken") return -1;
      if (a.status !== "taken" && b.status === "taken") return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json({
      success: true,
      source: "local-store",
      count: list.length,
      data: list,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, parentPhone, group, branch, status, laptopId, notes } = body;

    if (!name || !phone || !parentPhone) {
      return NextResponse.json(
        { success: false, message: "O'quvchi ismi, telefon raqami va ota-onasi raqami majburiy!" },
        { status: 400 }
      );
    }

    const isTaken = status === "taken";
    const studentStatus: "taken" | "returned" = isTaken ? "taken" : "returned";
    const studentData = {
      name: name.trim(),
      phone: phone.trim(),
      parentPhone: parentPhone.trim(),
      group: (group || "Mars IT").trim(),
      branch: branch || "Yunusobod",
      status: studentStatus,
      laptopId: laptopId ? laptopId.trim() : "",
      takenAt: isTaken ? new Date() : null,
      returnedAt: isTaken ? null : new Date(),
      notes: notes || "",
    };

    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      const created = await Student.create(studentData);
      
      if (created) {
        await Log.create({
          studentId: (created as any)._id.toString(),
          studentName: created.name,
          action: "CREATED",
          laptopId: created.laptopId || "",
          details: isTaken ? "Yangi o'quvchi qo'shildi va noutbuk berildi" : "Yangi o'quvchi qo'shildi",
        });
      }

      return NextResponse.json({
        success: true,
        message: "O'quvchi muvaffaqiyatli qo'shildi",
        data: created,
      });
    }

    // Fallback store
    const created = addMockStudent({
      ...studentData,
      takenAt: isTaken ? new Date().toISOString() : null,
      returnedAt: isTaken ? null : new Date().toISOString(),
    } as any);

    addMockLog({
      studentId: created._id,
      studentName: created.name,
      action: "CREATED",
      laptopId: created.laptopId || "",
      adminName: "Mars Admin",
      details: isTaken ? "Yangi o'quvchi qo'shildi va noutbuk berildi" : "Yangi o'quvchi qo'shildi",
    });

    return NextResponse.json({
      success: true,
      message: "O'quvchi muvaffaqiyatli qo'shildi (Local Cache)",
      data: created,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server xatosi" },
      { status: 500 }
    );
  }
}
