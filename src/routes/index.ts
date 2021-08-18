import { Router, Request, Response } from "express";
const router = Router();

router.use("/api/dogs", require("./dogs"));

module.exports = router;