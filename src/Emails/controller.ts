import { Request, Response } from "express";
import EmailService from "./service";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";
import { next } from "cheerio/lib/api/traversing";

class EmailController {
  async sendEmail(req: Request, res: Response, next) {
    const { name, email, text } = req.body;

    if (!name || !email || !text) {
      return res.status(SC.BAD_REQUEST).send({ error: RM.NULL_VALUE });
    }
  
    EmailService.sendEmail(name, email, text)
      .then((result) => {
        res.status(result.statusCode).send(result.json);
      })
      .catch((err) => {
        next(err);
      });
    }
}

export default new EmailController();
