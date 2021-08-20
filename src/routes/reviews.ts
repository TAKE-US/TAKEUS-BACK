import { Router, Request, Response } from "express";
import ReviewController from "../Reviews/controller";
import auth from "../middleware/auth";

const router = Router();

router.get("/", ReviewController.readAll);

module.exports = router;