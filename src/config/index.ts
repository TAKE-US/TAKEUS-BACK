import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  nodeEnv: process.env.NODE_ENV,

  /**
   * That long string from mlab
   */
  mongoURI: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * senderInfo
   */
  mailuser: process.env.MAIL_USER,
  mailpass: process.env.MAIL_PASS,

  fileUploadServerUrl: process.env.FILE_UPLOAD_SERVER_URL,

  /**
   * naver client id, secret
   */
  client_id : process.env.NAVER_CLIENT_ID,
  client_secret : process.env.NAVER_CLIENT_SECRET,

  /**
   * slack channel
   */
  slackChannel : process.env.SLACK_CHANNEL
};
