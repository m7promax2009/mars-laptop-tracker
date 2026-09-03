import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  name: string;
  role: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Mars Admin" },
    role: { type: String, default: "admin" },
  },
  {
    timestamps: true,
  }
);

export const Admin: Model<IAdmin> = 
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
