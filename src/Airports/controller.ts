import { Router, Request, Response } from "express";
import AirportService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class AirportController {
  async readAll(req: Request, res: Response) {
    AirportService.readAll()
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

export default new AirportController();
