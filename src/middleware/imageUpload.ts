import fs from "fs";
import request from "request";

const URL = "http://localhost:5001/api/upload";

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
      const data = JSON.parse(body);
      req.body.photos = data.data;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal Error : fail to upload image!" });
    }
  });
};
