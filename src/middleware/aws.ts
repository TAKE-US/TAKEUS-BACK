import aws from "aws-sdk";
import fs from "fs";

import config from "../config";

aws.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsPrivateAcessKey,
  region: "ap-northeast-2",
});

const s3 = new aws.S3();

function asyncUpload(req, file) {
  return new Promise((resolve, reject) => {

    const params = {
      ACL: "public-read",
      Bucket: "takeus-test-bucket-01",
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
  const promises = req.files.map((file) => asyncUpload(req, file));
  await Promise.all(promises);
  next();
}

export default {
  imageUploadToS3(req, res, next) {
    req.body.photos = [];
    uploadParallel(req, next);
  },
};
