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

  async naverLogin(req: Request, res: Response, next) {
    const { code, state } = req.body;

    UserService.naverLogin(code, state)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }

  async getAccessToken(req: Request, res: Response, next) {
    const refreshToken = req.header("refresh-token");

    UserService.getAccessToken(refreshToken)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new UserController();
