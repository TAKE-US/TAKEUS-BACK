import jwt from "jsonwebtoken";
import config from "../config";

import { SC } from "../utils/statusCode";
import { RM } from "../utils/responseMessage";

export default (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(SC.UNAUTHORIZED).send({ error: RM.NO_TOKEN });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.body.user = decoded.user;
    next();
  } catch (err) {
    return res.status(SC.UNAUTHORIZED).send({ error: RM.INVALID_TOKEN });
  }
};
