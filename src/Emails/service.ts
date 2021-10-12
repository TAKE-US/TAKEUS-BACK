import { SC } from "../utils/statusCode";
import config from "../config";

const nodemailer = require("nodemailer");

class EmailService {
  async sendEmail(name, email, text) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mailuser,  // gmail 계정 아이디
        pass: config.mailpass,  // gmail 계정의 비밀번호
      }
    });

    let mailOptions = {
      from: config.mailuser,              
      to: config.mailuser,      // 수신 메일 주소
      subject: name + email,    // 메일 제목
      text: text,               // 메일 내용
    };

    transporter.sendMail(mailOptions);

    return { statusCode: SC.SUCCESS, json: { data: mailOptions } };
  }
}

export default new EmailService();