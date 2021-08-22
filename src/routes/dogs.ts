import { Router, Request, Response } from "express";
import multer from "multer";

import DogController from "../Dogs/controller";
import auth from "../middleware/auth";
import imageUpload from "../middleware/imageUpload";

import { imageFilter } from "../utils/filter";

const router = Router();
// things for file upload.
const UPLOAD_PATH = "uploads";
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

router.get("/", DogController.readAll);
router.get("/detail/:dogId", DogController.readOne);
router.get("/search/:endingAirport", DogController.search);
router.get("/my",auth,DogController.findMy);
router.get("/deleted");

router.post("/",upload.array("photos", 5),auth,imageUpload,DogController.create);

router.put("/detail/:dogId/status",auth,DogController.updateStatus);
router.put("/detail/:dogId",upload.array("photos", 5),auth,imageUpload,DogController.update);

router.delete("/detail/:dogId",auth);

module.exports = router;