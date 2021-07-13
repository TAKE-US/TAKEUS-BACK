import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

import config from "../config";

const router = Router();

import User from "../models/User";

const findSocialIdentity = async (token, social) => {
  const urlHash = {
    kakao: "https://kapi.kakao.com/v2/user/me",
    google: "https://www.googleapis.com/oauth2/v2/userinfo",
    naver: "www.naver.com",
  };

  let identity;

  try {
    const response = await axios({
      method: "get",
      url: urlHash[social],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (social === "kakao") {
      if (response.data.kakao_account.has_email) {
        identity = response.data.kakao_account.email;
      } else {
        identity = response.data.properties.nickname;
      }
    } else if (social === "google") {
      identity = response.data.email;
    } else {
      identity = "naver";
    }
    return identity;
  } catch (e) {
    console.log(e.data);
  }
};

/**
 *  @route POST api/login
 *  @desc request login
 *  @access Public
 */
router.post("/", async (req: Request, res: Response) => {
  const { token, social } = req.body;
  let identity;

  identity = await findSocialIdentity(token, social);

  if (!identity) {
    res.status(400).json({ msg: "Invalid Access Token or Social" });
  }

  try {
    // See if user exists
    let user = await User.findOne({ identity: identity });

    if (user) {
      user.update({ $currentDate: { lastLoginDate: true } });
    } else {
      user = new User({
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

/**
 *  @route Get api/login
 *  @desc request login
 *  @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const response = { data: users };
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
