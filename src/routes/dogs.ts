import { Router, Request, Response } from "express";
import DogController from "../Dogs/controller"

const router = Router();

router.get("/", DogController.readAll);

module.exports = router;