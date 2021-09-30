import { logger } from "../Logger/logger";

export default (req, res, next) => {
    try{
        const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        const originalUrl = req.originalUrl;
        const method = req.method;

        logger.info("method : " + method + " ip : " + ip + " originalUrl : " + originalUrl + "/" );
    } catch(e){
        logger.error("error : " + e);
    }
    next();
};