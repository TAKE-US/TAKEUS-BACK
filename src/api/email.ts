import { Router, Request, Response } from "express";

const nodemailer = require('nodemailer');
const router = Router();

router.post(
  "/", 
  function(req, res, next){
    let name = req.body.name;
    let email = req.body.email;
    let text = req.body.text;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'takeus2125@gmail.com',  // gmail 계정 아이디를 입력
        pass: 'mytakeus2125!'          // gmail 계정의 비밀번호를 입력
      }
    });

    let mailOptions = {
      from: 'takeus2125@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: email ,                     // 수신 메일 주소
      subject: name,   // 제목
      text: text,  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }
      else {
        console.log('Email sent: ' + info.response);
      }
    });

  res.redirect("/");
})

module.exports = router;