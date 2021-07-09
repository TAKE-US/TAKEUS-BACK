import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  mongoURI: process.env.MONGODB_URI,
  
  /**
   * aws access key for image upload to s3
   */
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsPrivateAcessKey: process.env.AWS_PRIVATE_ACCESS_KEY,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  testUserToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlN2ZhNTk0N2E2ZGYzNDljYzI3N2UxIn0sImlhdCI6MTYyNTgxNTY0MSwiZXhwIjoxNjI1ODUxNjQxfQ.KbwFkVrjLLXwV0eQteSz3XCr59SLDbcz16v3kpI9zlo",
  

};
