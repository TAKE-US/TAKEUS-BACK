import mongoose from "mongoose";
import { IReport } from "../interfaces/IReport";

const ReportSchema = new mongoose.Schema({
  reportUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  targetUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  targetDog: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Dog",
  },
  targetReview: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Review",
  },
  reportDate: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export default mongoose.model<IReport & mongoose.Document>("Report", ReportSchema);
