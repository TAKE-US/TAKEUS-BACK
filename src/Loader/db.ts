import mongoose from "mongoose";
import config from "../config";
import Dog from "../models/Dog";
import User from "../models/User";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");
    Dog.createCollection().then(function (collection) {
      console.log("Dog Collection is created!");
    });
    User.createCollection().then(function (collection){
      console.log("User Collection is created!");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
