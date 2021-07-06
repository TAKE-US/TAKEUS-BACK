import mongoose from "mongoose";
import { IAirport } from "../interfaces/IAirport";

const AirportSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  airport: {
    type: String,
  },
});

export default mongoose.model<IAirport & mongoose.Document>("Airport", AirportSchema);
