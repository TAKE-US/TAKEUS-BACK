import { Router, Request, Response } from "express";
import DogService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

const router = Router();

class DogController {
  async readAll(req: Request, res: Response) {
    // data의 입력과 출력만 있음.
    const order: any = req.query.order;
    const { page = 1, postNumInPage = 16 } = req.query;

    DogService.readAll(order, page, postNumInPage)
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

  async readOne(req: Request, res: Response) {
    const dogId = req.params.dogId;
    DogService.readOne(dogId)
      .then((json) => {
        res.send(json);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(SC.INTERNAL_SERVER_ERROR)
          .send({ error: RM.INTERNAL_SERVER_ERROR });
      });
  }
}

export default new DogController();
