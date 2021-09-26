import { Router, Request, Response } from "express";

import ReviewController from "../Reviews/controller";
import auth from "../middleware/auth";

const router = Router();

router.get("/", ReviewController.readAll);
router.get("/detail/:reviewId", ReviewController.readOne);
router.get("/:keyword", ReviewController.searchKeyword);
router.get("/search/:endingAirport", ReviewController.filter);
router.get("/list/my",auth,ReviewController.findMy);

router.post("/",auth,ReviewController.create);

router.put("/detail/:reviewId",auth,ReviewController.update);

router.delete("/detail/:reviewId",auth,ReviewController.delete);

module.exports = router;