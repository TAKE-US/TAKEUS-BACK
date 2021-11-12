import fs from "fs";
import request from "request";
import config from "../config";
import multer from "multer";
import { imageFilter } from "../utils/filter";

import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

const URL = config.fileUploadServerUrl;

// things for file upload.
const UPLOAD_PATH = "uploads";

const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 15 },
}).array("photos", 5);

export default (req, res, next) => {
  const user = req.body.user;

  try{
    if (req.headers["content-type"].split(";")[0] != "multipart/form-data") {
      res.status(SC.BAD_REQUEST).send({ error: RM.INVALID_CONTENT_TYPE });
      return;
    }
  } catch {
    res.status(SC.BAD_REQUEST).send({ error: RM.INVALID_CONTENT_TYPE });
    return;
  }

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // file too large
      res.status(SC.BAD_REQUEST).send({ error: err.message });
    } else if (err) {
      // Only image files are allowed!
      res.status(SC.BAD_REQUEST).send({ error: err.message });
    } else {
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

      if (Array.isArray(photos) && photos.length != 0) {
        const formData = {
          photos: photos,
        };

        request.post(
          { url: URL, formData: formData },
          (err, httpResponse, body) => {
            try {
              if (!body) {
                throw new Error(RM.FAIL_TO_IMAGE_UPLOAD);
              }
              const data = JSON.parse(body);

              if (Array.isArray(data.data) && data.data.length != 0) {
                req.body.photos = data.data;
              }

              next();
            } catch (error) {
              console.error(err.message);
              console.log(err);
              next(err);
            }
          }
        );
      } else {
        next();
      }
    }
  });
};
