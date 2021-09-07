import { Router, Request, Response } from "express";
import ReportService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class ReportController {
  async readAll(req: Request, res: Response) {
    
    ReportService.readAll()
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      });
  }

  async create(req: Request, res: Response) {
    const {
      user,
      targetUser,
      targetDog,
      targetReview,
    } = req.body;

    if (
      !user ||
      !targetUser
    ) {
      res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
      return;
    }

    ReportService.create({
      user,
      targetUser,
      targetDog,
      targetReview,
    })
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      });
  }
}

export default new ReportController();