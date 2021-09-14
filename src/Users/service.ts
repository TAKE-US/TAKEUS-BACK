import User from "../models/User";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

import jwt from "jsonwebtoken";
import axios from "axios";

import config from "../config";

const findSocialIdentity = async (token, social) => {
  const urlHash = {
    kakao: "https://kapi.kakao.com/v2/user/me",
    google: "https://www.googleapis.com/oauth2/v2/userinfo",
    naver: "https://openapi.naver.com/v1/nid/me",
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
      if (response.data.kakao_account.email) {
        identity = response.data.kakao_account.email;
      } else {
        identity = response.data.id;
      }
    } else if (social === "google") {
      identity = response.data.email;
    } else if (social === "naver") {
      identity = response.data.response.id;
    }
    return identity;
  } catch (e) {
    console.log(e.data);
  }
};

class UserService {
  async readAll() {
    const users = await User.find();
    return { statusCode: SC.SUCCESS, json: { data: users } };
  }

  async signIn(token, social) {
    
    if (!token || !social){
        return {
            statusCode: SC.UNAUTHORIZED,
            json: { error: RM.NO_TOKEN },
          };
    }

    let identity = await findSocialIdentity(token, social);

    if (!identity) {
      return {
        statusCode: SC.BAD_REQUEST,
        json: { error: RM.INVALID_LOGIN_REQUEST },
      };
    }

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

    // jwt.sign(payload, config.jwtSecret, { expiresIn: 36000 }, (err, token) => {
    //   if (err) throw err;
    //   console.log(token);
    //   return {
    //     statusCode: SC.SUCCESS,
    //     json: { token: token, id: user.id },
    //   };
    // });
    const jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: 36000 });
    return { statusCode: SC.SUCCESS, json: { token: jwtToken, id: user.id } };
  }
}

export default new UserService();
