import fs from "fs";
import config from "../config";
import multer from "multer";
import { imageFilter } from "../utils/filter";
import aws from "aws-sdk";

import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

const URL = config.fileUploadServerUrl;
aws.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsPrivateAccessKey,
  region: "ap-northeast-2",
});

const UPLOAD_PATH = "uploads";

const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 15 },
}).array("photos", 5);

const s3 = new aws.S3();

function asyncUpload(req, file) {
  return new Promise((resolve, reject) => {
    const params = {
      ACL: "public-read",
      Bucket: "takeus-bucket",
      Body: fs.createReadStream(file.path),
      Key: `image/dogs/${file.originalname}`,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error occured while trying to upload to S3 bucket", err);
        reject();
      }

      if (data) {
        const imageLink = data.Location;
        req.body.photos.push(imageLink);
        resolve(imageLink);
      }
    });
  });
}

async function uploadParallel(req, next) {
  if (!req.files) {
    console.log("empty files");
    return next();
  }

  const promises = req.files.map((file) => asyncUpload(req, file));
  await Promise.all(promises);
  next();
}

export default (req, res, next) => {
  const user = req.body.user;

  try {
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

      req.body.photos = [];
      uploadParallel(req, next);
    }
  });
};
