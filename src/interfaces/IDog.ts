import mongoose from "mongoose";

export interface IDog {
  name: string;
  gender: string;
  age: number;
  weight: number;
  health: string;
  neutralization: boolean;
  endingCountry: string;
  endingAirport: string;
  registerDate: Date;
  detail: string;
  user: mongoose.Types.ObjectId;
  isInstitution: boolean;
  institutionName: string;
  status: string;
  kakaotalkId: string;
  phoneNumber: string;
  instagram: string;
  twitter: string;
  facebook: string;
  photos: Array<string>;
}

export interface IDogInputDTO {
  name?: string;
  gender?: string;
  age?: number;
  weight?: number;
  health?: string;
  neutralization?: boolean;
  endingCountry?: string;
  endingAirport?: string;
  detail?: string;
  user?: mongoose.Types.ObjectId;
  isInstitution?: boolean;
  institutionName?: string;
  kakaotalkId?: string;
  phoneNumber?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  photos?: Array<string>;
}