import { Request, Response } from "express";
import UserService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class UserController {
  async readAll(req: Request, res: Response, next) {
    UserService.readAll()
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async signIn(req: Request, res: Response, next) {
    const { token, social } = req.body;

    UserService.signIn(token, social)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new UserController();
