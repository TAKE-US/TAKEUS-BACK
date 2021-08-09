import mongoose from "mongoose";

export interface IDog {
  name: string;
  gender: string;
  age: string;
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
  kakaotalkId: Array<string>;
  phoneNumber: Array<string>;
  instagram: Array<string>;
  twitter: Array<string>;
  facebook: Array<string>;
  photos: Array<string>;
}

export interface IDogInputDTO {
  name?: string;
  gender?: string;
  age?: string;
  weight?: number;
  health?: string;
  neutralization?: boolean;
  endingCountry?: string;
  endingAirport?: string;
  detail?: string;
  user?: mongoose.Types.ObjectId;
  isInstitution?: boolean;
  institutionName?: string;
  kakaotalkId?: Array<string>;
  phoneNumber?: Array<string>;
  instagram?: Array<string>;
  twitter?: Array<string>;
  facebook?: Array<string>;
  photos?: Array<string>;
}