import fs from "fs";
import request from "request";
import config from "../config";
import multer from "multer";
import { imageFilter } from "../utils/filter";

const URL = config.fileUploadServerUrl;

// things for file upload.
const UPLOAD_PATH = "uploads";
const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: imageFilter,
}).array("photos", 5);

export default (req, res, next) => {
  const user = req.body.user;

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    req.body.user = user;

    let photos = [];

    for (let file of req.files) {
      photos.push({
        value: fs.createReadStream(file.path),
        options: {
          filename: file.originalname,
          contentType: file.mimetype,
        },
      });
    }

    const formData = {
      photos: photos,
    };

    request.post(
      { url: URL, formData: formData },
      (err, httpResponse, body) => {
        try {
          const data = JSON.parse(body);
          req.body.photos = data.data;
          next();
        } catch (error) {
          console.error(error.message);
          res
            .status(500)
            .send({ error: "Internal Error : fail to upload image!" });
        }
      }
    );
  });
};
