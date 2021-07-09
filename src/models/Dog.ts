import mongoose from "mongoose";
import { IDog } from "../interfaces/IDog";

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  health: {
    type: String,
  },
  neutralization: {
    type: Boolean,
  },
  endingCountry: {
    type: String,
  },
  endingAirport: {
    type: String,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  detail: {
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  isInstitution: {
    type: Boolean,
  },
  institutionName: {
    type: String,
  },
  status: {
    type: String,
    default: "waiting",
  },
  kakaotalkId: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },
  photos: {
    type: [String],
  },
});

export default mongoose.model<IDog & mongoose.Document>("Dog", DogSchema);
