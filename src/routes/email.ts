import { Router } from "express";
import EmailController from "../Emails/controller";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, EmailController.sendMail);

module.exports = router;
