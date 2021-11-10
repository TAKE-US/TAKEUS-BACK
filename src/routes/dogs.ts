import { Router, Request, Response } from "express";

import DogController from "../Dogs/controller";
import auth from "../middleware/auth";
import isLogin from "../middleware/isLogin";
import imageUpload from "../middleware/imageUpload";


const router = Router();

router.get("/", DogController.readAll);
router.get("/detail/:dogId", isLogin, DogController.readOne);
router.get("/search/:endingAirport", DogController.search);
router.get("/my",auth,DogController.findMy);
router.get("/deleted",DogController.searchDeleted);

router.post("/",auth,imageUpload,DogController.create);

router.put("/detail/:dogId/status",auth,DogController.updateStatus);
router.put("/detail/:dogId",auth,imageUpload,DogController.update);

router.patch("/detail/:dogId", auth, imageUpload, DogController.updateAttribute);

router.delete("/detail/:dogId",auth,DogController.delete);

module.exports = router;