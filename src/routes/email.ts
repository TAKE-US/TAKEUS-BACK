import { Router } from "express";
import EmailController from "../Emails/controller";
import auth from "../middleware/auth";

const router = Router();

router.post("/", EmailController.sendEmail);

module.exports = router;
