import { Router, Request, Response } from "express";

import ReportController from "../Reports/controller";
import auth from "../middleware/auth";

const router = Router();

router.get("/", ReportController.readAll);

router.post("/",auth,ReportController.create);

module.exports = router;