import { Router, Request, Response } from "express";
import DogController from "../Dogs/controller";
import auth from "../middleware/auth";

const router = Router();

router.get("/", DogController.readAll);
router.get("/detail/:dogId");
router.get("/search/:endingAirports");
router.get("/my",auth);
router.get("/deleted");

router.post("/",auth);

router.put("/detail/:dogId/status",auth);
router.put("/detail/:dogId",auth);

router.delete("/detail/:dogId",auth);

module.exports = router;