import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  phone: string;
  parentPhone: string;
  group: string;
  branch: string;
  status: "taken" | "returned";
  laptopId?: string;
  takenAt?: Date | null;
  returnedAt?: Date | null;
  expectedReturn?: Date | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    parentPhone: { type: String, required: true, trim: true },
    group: { type: String, required: true, trim: true, default: "Mars IT" },
    branch: { type: String, default: "Yunusobod" },
    status: { 
      type: String, 
      enum: ["taken", "returned"], 
      default: "returned",
      index: true 
    },
    laptopId: { type: String, default: "" },
    takenAt: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
    expectedReturn: { type: Date, default: null },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Student: Model<IStudent> = 
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
