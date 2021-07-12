import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);