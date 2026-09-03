import { NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { Log } from "@/lib/models/Log";
import { getMockLogs } from "@/lib/mockData";

export async function GET() {
  try {
    const mongoConn = await connectToDatabase();

    if (mongoConn && isMongoConfigured()) {
      const logs = await Log.find().sort({ createdAt: -1 }).limit(100).lean();
      return NextResponse.json({ success: true, data: logs });
    }

    const mockLogs = getMockLogs();
    return NextResponse.json({ success: true, data: mockLogs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Xatolik" },
      { status: 500 }
    );
  }
}
