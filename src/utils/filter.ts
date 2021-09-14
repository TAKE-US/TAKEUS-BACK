import * as del from "del";

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const cleanFolder = function (folderPath) {
  del.sync([`${folderPath}/*`]);
};

export { imageFilter, cleanFolder };
