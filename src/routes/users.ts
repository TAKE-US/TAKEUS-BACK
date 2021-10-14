import { Router, Request, Response } from "express";
import UserController from "../Users/controller";
import auth from "../middleware/auth";

const router = Router();

router.get("/login", UserController.readAll);
router.post("/login", UserController.signIn);

router.get("/naverLogin", UserController.naverLogin);
module.exports = router;