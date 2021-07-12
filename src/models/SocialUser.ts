import mongoose from "mongoose";
import { ISocialUser } from "../interfaces/IUser";

const SocialUserSchema = new mongoose.Schema({
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

export default mongoose.model<ISocialUser & mongoose.Document>(
  "SocialUser",
  SocialUserSchema
);
