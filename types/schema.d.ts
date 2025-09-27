import mongoose from "mongoose";

interface IProfile {
  _id?: mongoose.Types.ObjectId;
  name: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  bloodGroup: string;
  userId?: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBlood {
  _id?: mongoose.Types.ObjectId;
  patientName: string;
  gender: string;
  phoneNumber: string;
  age: number;
  units: number;
  location: string;
  isCritical: boolean;
  isAccepted: boolean;
  notes: string;
  userId?: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IProfile, IBlood };
