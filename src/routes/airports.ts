import { Router, Request, Response } from "express";
import AirportController from "../Airports/controller";

const router = Router();

router.get("/country", AirportController.readAll);

module.exports = router;