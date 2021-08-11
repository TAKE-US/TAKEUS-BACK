import fs from "fs";

const insertDummy = function (model, jsonFilePath) {
  fs.readFile(jsonFilePath, "utf-8", (error, jsonFile) => {
    if (error) return console.log(error);

    const jsonData = JSON.parse(jsonFile);

    model.insertMany(jsonData).then(() => {
      console.log(`success to insert "${model.modelName}" dummy data `);
    });
  });
};

export { insertDummy };
