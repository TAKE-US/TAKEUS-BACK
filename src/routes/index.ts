import { Router, Request, Response } from "express";
const router = Router();

router.use("/api/dogs", require("./dogs"));
router.use("/api/airports", require("./airports"));
router.use("/api/reviews", require("./reviews"));
router.use("/api/users", require("./users"));
router.use("/api/email", require("./email"));

module.exports = router;
