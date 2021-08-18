import { Router, Request, Response } from "express";
import DogService from "./service";

const router = Router();

class DogController {
  async readAll(req: Request, res: Response) {
    // data의 입력과 출력만 있음.
    const order: any = req.query.order;
    const { page = 1, postNumInPage = 16 } = req.query;

    DogService.readAll(order, page, postNumInPage)
      .then((json) => {
        res.status(200).send(json);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
      });
  }
}

export default new DogController();
