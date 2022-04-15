import { Router, Request, Response } from "express";
import AirportService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class AirportController {
  async readAll(req: Request, res: Response, next) {
    AirportService.readAll()
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new AirportController();
