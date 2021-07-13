import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
  identity: {
    type: String,
    required: true,
    unique: true,
  },
  social: {
    type: String,
    required: true,
  },
  createdDate: {
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