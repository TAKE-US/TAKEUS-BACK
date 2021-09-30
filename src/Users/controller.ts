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

  async find(req: Request, res: Response, next) {
    const user_id = req.body.user.id;
    UserService.findEmailById(user_id).then((result) => {
      console.log(result);
      res.status(result.statusCode).send(result.json);
    });
    
    
    // console.log(user);

  }
}

export default new UserController();
