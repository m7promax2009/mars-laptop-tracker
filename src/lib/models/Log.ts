import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILog extends Document {
  studentId: string;
  studentName: string;
  action: "TAKEN" | "RETURNED" | "CREATED" | "EDITED" | "DELETED";
  laptopId?: string;
  adminName?: string;
  details?: string;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>(
  {
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    action: { 
      type: String, 
      enum: ["TAKEN", "RETURNED", "CREATED", "EDITED", "DELETED"], 
      required: true 
    },
    laptopId: { type: String, default: "" },
    adminName: { type: String, default: "Admin" },
    details: { type: String, default: "" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Log: Model<ILog> = 
  mongoose.models.Log || mongoose.model<ILog>("Log", LogSchema);
