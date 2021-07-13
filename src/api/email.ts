import { Router, Request, Response } from "express";
import config from "../config";

const nodemailer = require('nodemailer');
const router = Router();

/**
 *  @route POST api/email
 *  @desc Send the email
 *  @access Public
 */
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
        user: config.mailuser,  // gmail 계정 아이디
        pass: config.mailpass,  // gmail 계정의 비밀번호
      }
    });

    let mailOptions = {
      from: email,              // 발신 메일 주소
      to: config.mailuser ,     // 수신 메일 주소
      subject: name,            // 메일 제목
      text: text,               // 메일 내용
    };

    try {
      transporter.sendMail(mailOptions);

      res.status(200).json(mailOptions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    } 
})

module.exports = router;