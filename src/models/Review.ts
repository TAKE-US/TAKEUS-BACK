import mongoose from "mongoose";
import { IReview } from "../interfaces/IReview";

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  endingCountry: {
    type: String,
  },
  endingAirport: {
    type: String,
  },
  hashtags: {
    type: [String],
  },
  isInstitution: {
    type: String,
  },
  institutionName: {
    type: String,
  },
  content: {
    type: String,
  },
  crawlingData: [
    {
      link: {
        type: String,
      },
      image: {
        type: String,
      },
      desc: {
        type: String,
      },
      _id: false
    },
  ],
  writeDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IReview & mongoose.Document>("Review", ReviewSchema);
