import { Router, Request, Response } from "express";
import ReviewService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class ReviewController {
  async readAll(req: Request, res: Response) {
    // data의 입력과 출력만 있음.
    const order: any = req.query.order;
    const { page = 1, postNumInPage = 7 } = req.query;

    ReviewService.readAll(order, page, postNumInPage)
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

export default new ReviewController();
