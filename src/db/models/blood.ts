import mongoose, { Schema } from "mongoose";
import { IBlood } from "../../../types/schema";

const BloodSchema = new Schema<IBlood>(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[0-9]{10,15}$/, "Please provide a valid phone number"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
    },
    units: {
      type: Number,
      required: [true, "Units required"],
      min: [1, "At least 1 unit is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    isCritical: {
      type: Boolean,
      default: false,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const Blood =
  mongoose.models?.Blood || mongoose.model<IBlood>("Blood", BloodSchema);
