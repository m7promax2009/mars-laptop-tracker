import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { Student } from "@/lib/models/Student";
import { Log } from "@/lib/models/Log";
import { updateMockStudent, deleteMockStudent, addMockLog, getMockStudents } from "@/lib/mockData";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH: Toggle Status (Laptop Taken vs Returned)
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, laptopId, notes } = body;

    const mongoConn = await connectToDatabase();
    const isTaken = status === "taken";

    if (mongoConn && isMongoConfigured()) {
      const existing = await Student.findById(id);
      if (!existing) {
        return NextResponse.json({ success: false, message: "O'quvchi topilmadi" }, { status: 404 });
      }

      existing.status = isTaken ? "taken" : "returned";
      if (laptopId !== undefined) existing.laptopId = laptopId;
      if (notes !== undefined) existing.notes = notes;

      if (isTaken) {
        existing.takenAt = new Date();
      } else {
        existing.returnedAt = new Date();
      }

      await existing.save();

      // Create activity log
      await Log.create({
        studentId: existing._id.toString(),
        studentName: existing.name,
        action: isTaken ? "TAKEN" : "RETURNED",
        laptopId: existing.laptopId || laptopId || "",
        details: isTaken ? "Noutbuk berildi (Olingan)" : "Noutbuk qaytarib topshirildi",
      });

      return NextResponse.json({
        success: true,
        message: isTaken ? "Noutbuk olingan deb belgilandi" : "Noutbuk topshirildi deb belgilandi",
        data: existing,
      });
    }

    // Fallback store
    const student = getMockStudents().find((s) => s._id === id);
    if (!student) {
      return NextResponse.json({ success: false, message: "O'quvchi topilmadi" }, { status: 404 });
    }

    const updated = updateMockStudent(id, {
      status: isTaken ? "taken" : "returned",
      laptopId: laptopId !== undefined ? laptopId : student.laptopId,
      notes: notes !== undefined ? notes : student.notes,
      takenAt: isTaken ? new Date().toISOString() : student.takenAt,
      returnedAt: isTaken ? student.returnedAt : new Date().toISOString(),
    });

    addMockLog({
      studentId: id,
      studentName: student.name,
      action: isTaken ? "TAKEN" : "RETURNED",
      laptopId: laptopId || student.laptopId || "",
      adminName: "Mars Admin",
      details: isTaken ? "Noutbuk berildi (Olingan)" : "Noutbuk qaytarib topshirildi",
    });

    return NextResponse.json({
      success: true,
      message: isTaken ? "Noutbuk olingan deb belgilandi" : "Noutbuk topshirildi deb belgilandi",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// PUT: Edit Student Details
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, phone, parentPhone, group, branch, laptopId, notes } = body;

    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      const updated = await Student.findByIdAndUpdate(
        id,
        {
          name,
          phone,
          parentPhone,
          group,
          branch,
          laptopId,
          notes,
        },
        { new: true }
      );

      if (!updated) {
        return NextResponse.json({ success: false, message: "O'quvchi topilmadi" }, { status: 404 });
      }

      await Log.create({
        studentId: updated._id.toString(),
        studentName: updated.name,
        action: "EDITED",
        laptopId: updated.laptopId,
        details: "Ma'lumotlar tahrirlandi",
      });

      return NextResponse.json({
        success: true,
        message: "Ma'lumotlar muvaffaqiyatli saqlandi",
        data: updated,
      });
    }

    // Fallback store
    const updated = updateMockStudent(id, {
      name,
      phone,
      parentPhone,
      group,
      branch,
      laptopId,
      notes,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "O'quvchi topilmadi" }, { status: 404 });
    }

    addMockLog({
      studentId: id,
      studentName: updated.name,
      action: "EDITED",
      laptopId: updated.laptopId || "",
      adminName: "Mars Admin",
      details: "Ma'lumotlar tahrirlandi",
    });

    return NextResponse.json({
      success: true,
      message: "Ma'lumotlar muvaffaqiyatli saqlandi",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

// DELETE: Remove Student
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      const student = await Student.findByIdAndDelete(id);
      if (student) {
        await Log.create({
          studentId: id,
          studentName: student.name,
          action: "DELETED",
          details: "O'quvchi ro'yxatdan o'chirildi",
        });
      }
      return NextResponse.json({ success: true, message: "O'quvchi o'chirildi" });
    }

    // Fallback store
    const student = getMockStudents().find((s) => s._id === id);
    deleteMockStudent(id);

    if (student) {
      addMockLog({
        studentId: id,
        studentName: student.name,
        action: "DELETED",
        adminName: "Mars Admin",
        details: "O'quvchi ro'yxatdan o'chirildi",
      });
    }

    return NextResponse.json({ success: true, message: "O'quvchi o'chirildi" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
