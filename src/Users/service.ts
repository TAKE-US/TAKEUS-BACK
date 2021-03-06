import User from "../models/User";
import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

import jwt from "jsonwebtoken";
import axios from "axios";

import config from "../config";

const ONE_HOUR = 36000;
const TWO_WEEK = ONE_HOUR * 24 * 14;

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
    let user = await User.findOne({ email: email });

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

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: ONE_HOUR,
    });
    const refreshToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: TWO_WEEK,
    });

    return {
      statusCode: SC.SUCCESS,
      refreshToken : refreshToken,
      json: {
        accessToken: accessToken,
        id: user.id,
        email: user.email,
        issuedAt : Math.floor(+ new Date() / 1000)
      },
    };
  }

  async naverLogin(code, state) {
    if (!code || !state) {
      return {
        statusCode: SC.UNAUTHORIZED,
        json: { error: RM.NO_CODE_STATE },
      };
    }

    const response = await axios({
      method: "GET",
      url: "https://nid.naver.com/oauth2.0/token",
      params: {
        grant_type: "authorization_code",
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code,
        state: state
      },
    });

    if (response.data.error) {
      return {
        statusCode: SC.BAD_REQUEST,
        json: { error: response.data.error_description },
      };
    }

    const access_token = response.data.access_token;
    const data = await this.signIn(access_token, "naver");
    return data;
  }

  async getAccessToken(refreshToken) {
    let decoded;
    // Check if not token
    if (!refreshToken) {
      return {
        statusCode: SC.UNAUTHORIZED,
        json: { error: RM.INVALID_TOKEN },
      };
    }

    try {
      decoded = jwt.verify(refreshToken, config.jwtSecret);
    } catch (err) {
      return {
        statusCode: SC.UNAUTHORIZED,
        json: { error: RM.INVALID_TOKEN },
      };
    }

    const payload = {
      user: {
        id: decoded.user.id,
      },
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: ONE_HOUR,
    });

    return {
      statusCode: SC.SUCCESS,
      json: {
        accessToken: accessToken,
        isseudAt: Math.floor(+ new Date() / 1000)
      },
    };
  }
}

export default new UserService();
