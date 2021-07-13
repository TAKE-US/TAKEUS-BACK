import { Router, Request, Response } from "express";
import config from "../config";

const nodemailer = require('nodemailer');
const router = Router();

router.post(
  "/", 
  async (req: Request, res: Response, next) => {
    const {
      name,
      email,
      text,
    } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,  // gmail 계정 아이디
        pass: config.pass,  // gmail 계정의 비밀번호
      }
    });

    let mailOptions = {
      from: config.user,    // 발송 메일 주소
      to: email ,           // 수신 메일 주소
      subject: name,        // 메일 제목
      text: text,           // 메일 내용
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error(error.message);
      }
      else {
        console.log('Email sent: ' + info.response);
      }
    });
  res.redirect("/");
})

module.exports = router;