import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

import config from "../config";

const router = Router();

import SocialUser from "../models/SocialUser";

const findKakaoUser = async (token) => {
    let identity;
    try{
        console.log(token);
        const response = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.kakao_account.has_email) {
            identity = response.data.kakao_account.email;
        } else {
            identity = response.data.properties.nickname;
        }

    }catch(e){
        console.log(e.data);
    }
    return identity;
};

const findGoogleUser = async (token) => {
  const user = "hi";
  return user;
};

const findNaverUser = async (token) => {
  const user = "hi";
  return user;
};

/**
 *  @route Get api/login
 *  @desc request login
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  const { token, social } = req.query;
  let identity;

  console.log(token);
  console.log(social);

  if (social === "kakao") {
    identity = await findKakaoUser(token);
  } else if (social === "google") {
    identity = findGoogleUser(token);
  } else if (social === "naver") {
    identity = findNaverUser(token);
  } else {
    console.log("invalid social");
    res.status(400).send("invalid social.");
  }

  console.log("identity : ",identity);

  try {
    // See if user exists
    let user = await SocialUser.findOne({ identity: identity });

    if (user) {
      user.update({ $currentDate: { lastLoginDate: true } });
    } else {
      user = new SocialUser({
        identity,
        social,
      });
      await user.save();
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
