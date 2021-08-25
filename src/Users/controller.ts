import { Request, Response } from "express";
import UserService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

class UserController {
  async readAll(req: Request, res: Response) {
    UserService.readAll()
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

  async signIn(req: Request, res: Response) {
    const { token, social } = req.body;

    UserService.signIn(token, social)
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

export default new UserController();
