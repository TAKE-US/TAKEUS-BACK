import fs from "fs";
import request from "request";
import config from "../config";

import { RM } from "../utils/responseMessage";
import { SC } from "../utils/statusCode";

const URL = config.fileUploadServerUrl;

export default (req, res, next) => {
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

  request.post({ url: URL, formData: formData }, (err, httpResponse, body) => {
    try {
      if (!body) {
        throw new Error(RM.FAIL_TO_IMAGE_UPLOAD);
      }

      const data = JSON.parse(body);
      req.body.photos = data.data;
      next();
    } catch (err) {
      console.error(err.message);
      console.log(err);
      next(err);
    }
  });
};
