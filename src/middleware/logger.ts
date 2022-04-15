import jwt from "jsonwebtoken";
import config from "../config";

import { logger } from "../Logger/logger";

export default (req, res, next) => {
    try{
        const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        const originalUrl = req.originalUrl;
        const method = req.method;

        const token = req.header("x-auth-token");
        let user;
        if (token) {
            const decoded = jwt.verify(token, config.jwtSecret);
            user = decoded.user.id;
        }

        logger.info("method : " + method + " ip : " + ip + " originalUrl : " + originalUrl + " user : " + user );
    } catch(e){
        logger.error("error : " + e);
    }
    next();
};