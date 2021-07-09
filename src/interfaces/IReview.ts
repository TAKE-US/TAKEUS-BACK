import mongoose from "mongoose";

export interface IReview {
  user: mongoose.Types.ObjectId;
  title: string;
  endingCountry: string;
  endingAirport: string;
  hashtags: Array<string>;
  isInstitution: string;
  institutionName: string;
  content: string;
  writeDate: Date;
}

export interface IReviewInputDTO {
  user?: mongoose.Types.ObjectId;
  title?: string;
  endingCountry?: string;
  endingAirport?: string;
  hashtags?: Array<string>;
  isInstitution?: string;
  institutionName?: string;
  content?: string;
}