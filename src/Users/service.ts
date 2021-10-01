import User from "../models/User";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

import jwt from "jsonwebtoken";
import axios from "axios";

import config from "../config";

const requestSocialLogin = async (token, social) => {
  const urlHash = {
    kakao: "https://kapi.kakao.com/v2/user/me",
    google: "https://www.googleapis.com/oauth2/v2/userinfo",
    naver: "https://openapi.naver.com/v1/nid/me",
  };

  let response;

  try {
    response = await axios({
      method: "get",
      url: urlHash[social],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    return null;
  }

  return response;
};

class UserService {
  async readAll() {
    const users = await User.find();
    return { statusCode: SC.SUCCESS, json: { data: users } };
  }

  async signIn(token, social) {
    if (!token || !social) {
      return {
        statusCode: SC.UNAUTHORIZED,
        json: { error: RM.NO_TOKEN },
      };
    }

    let email;
    let response = await requestSocialLogin(token, social);
    if (!response) {
      return {
        statusCode: SC.BAD_REQUEST,
        json: { error: RM.INVALID_LOGIN_REQUEST },
      };
    }

    if (social === "kakao") {
      email = response.data.kakao_account.email;
    } else if (social === "google") {
      email = response.data.email;
    } else if (social === "naver") {
      email = response.data.response.email;
    }

    if (!email) {
      return {
        statusCode: SC.BAD_REQUEST,
        json: { error: RM.NO_EMAIL_AGREEMENT },
      };
    }

    // See if user exists
    let user = await User.findOne({ identity: email });

    if (user) {
      user.update({ $currentDate: { lastLoginDate: true } });
    } else {
      user = new User({
        email,
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

    const jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: 36000 });
    return { statusCode: SC.SUCCESS, json: { token: jwtToken, id: user.id, email: user.identity } };
  }
}

export default new UserService();
