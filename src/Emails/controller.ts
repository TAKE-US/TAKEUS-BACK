import { Request, Response } from "express";
import EmailService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { next } from "cheerio/lib/api/traversing";

class EmailController {
  async sendMail(req: Request, res: Response, next) {
    const { name, email, text, user } = req.body;

    if (!name || !email || !text || !user) {
      return res.status(SC.BAD_REQUEST).send({ error: RM.NO_CONTENTS });
    }

    EmailService.sendMail(name, email, text, user)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new EmailController();
