import mongoose from "mongoose";

export interface IReport {
  reportUser: mongoose.Types.ObjectId;
  targetUser: mongoose.Types.ObjectId;
  targetReview: mongoose.Types.ObjectId;
  reportDate: Date;
}