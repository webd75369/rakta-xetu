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

export { IProfile };
