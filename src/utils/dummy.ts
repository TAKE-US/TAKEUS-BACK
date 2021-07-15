import fs from "fs";
import Dog from "../models/Dog";

const insertDummyDogs = function () {
  fs.readFile("./src/utils/dummyDogs.json", "utf-8", (error, jsonFile) => {
    if (error) return console.log(error);
    console.log(jsonFile[0]);

    const jsonData = JSON.parse(jsonFile);
    console.log(jsonData[0]);

    Dog.insertMany(jsonData).then(() => {
      console.log("성공");
    });
  });
};

export { insertDummyDogs };
