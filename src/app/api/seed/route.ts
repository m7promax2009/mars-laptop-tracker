import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { Student } from "@/lib/models/Student";
import { Log } from "@/lib/models/Log";
import { getMockStudents } from "@/lib/mockData";

export async function POST() {
  try {
    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      await Student.deleteMany({});
      await Log.deleteMany({});

      const defaultStudents = getMockStudents().map((s) => ({
        name: s.name,
        phone: s.phone,
        parentPhone: s.parentPhone,
        group: s.group,
        branch: s.branch,
        status: s.status,
        laptopId: s.laptopId,
        takenAt: s.takenAt ? new Date(s.takenAt) : null,
        returnedAt: s.returnedAt ? new Date(s.returnedAt) : null,
        notes: s.notes,
      }));

      const inserted = await Student.insertMany(defaultStudents);

      await Log.create({
        studentId: "system",
        studentName: "Tizim",
        action: "CREATED",
        adminName: "Mars Superadmin",
        details: "Boshlang'ich test ma'lumotlari yuklandi",
      });

      return NextResponse.json({
        success: true,
        message: `${inserted.length} ta o'quvchi MongoDB ga muvaffaqiyatli yuklandi!`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lokal ma'lumotlar faol holatda",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Seed xatosi" },
      { status: 500 }
    );
  }
}
