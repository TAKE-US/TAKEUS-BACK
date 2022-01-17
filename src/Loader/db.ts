import mongoose from "mongoose";
import config from "../config";
import Dog from "../models/Dog";
import Report from "../models/Report";
import Review from "../models/Review";
import User from "../models/User";

import { insertDummy } from "../utils/dummy";

const dummyDataRootPath = "./src/utils/dummyData/";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");
    // Dog.createCollection().then(function (collection) {
    //   console.log("Dog Collection is created!");
    //   // insertDummy(Dog, dummyDataRootPath + "dummyDogs.json");
    // });

    // User.createCollection().then(function (collection) {
    //   console.log("User Collection is created!");
    //   // insertDummy(User, dummyDataRootPath + "dummyUsers.json");
    // });

    // Review.createCollection().then(function (collection) {
    //   console.log("Review Collection is created!");
    //   // insertDummy(Review, dummyDataRootPath + "dummyReviews.json");
    // });
    // Report.createCollection().then(function (collection) {
    //   console.log("Report Collection is created!");
    // });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
