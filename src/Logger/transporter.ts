import config from "../config";


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user : config.mailuser,
        pass : config.mailpass
    }
});

export { transporter };