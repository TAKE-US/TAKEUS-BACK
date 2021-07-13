import mongoose from "mongoose";

export interface ICrawlingData {
  link: String;
  image: String;
  desc: String;
}

export interface ICrawlingDataInputDTO {
  link?: String;
  image?: String;
  desc?: String;
}