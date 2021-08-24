import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

import config from "../config";

const nodemailer = require("nodemailer");

class EmailService {
  async sendMail(name, email, text, user) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.mailuser,
        pass: config.mailpass,
      },
    });

    let mailOptions = {
      from: config.mailuser,
      to: email,
      subject: name,
      text: text,
    };

    transporter.sendMail(mailOptions);

    return { statusCode: SC.SUCCESS, json: { data: mailOptions } };
  }
}

export default new EmailService();
