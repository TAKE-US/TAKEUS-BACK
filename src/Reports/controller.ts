import { Router, Request, Response } from "express";
import ReportService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class ReportController {
  async readAll(req: Request, res: Response, next) {
    ReportService.readAll()
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(req: Request, res: Response, next) {
    const { user, targetDog, targetReview } = req.body;

    if (!user) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE_USER });
      return;
    }

    if (!targetDog && !targetReview) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE_TARGET });
      return;
    }

    ReportService.create({
      user,
      targetDog,
      targetReview,
    })
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new ReportController();
