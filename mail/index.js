const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { resetPass } = require("./resetpass_template");
require('dotenv').config();
const config = require("../config/dotenvconfig")

const getEmailData = (to, name, token, template) => {
    let data = null;

    switch (template) {
        case "welcome":
            data = {
                from: "CodeToDev",
                to: to,
                subject: `Welcome to CodeToDev ${name}`,
                html: welcome(token)
            }
            break;
        case "resetpassword":
            data = {
                from: "CodeToDev.edu@gmail.com",
                to: to,
                subject: `Welcome to Code To Dev ${name}`,
                html: resetPass(token)
            }
            break;
        default:
            data;
    }
    return data;
}


module.exports = {
    sendEmail: (to, name, token, type) => {
        const smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "codetodev.edu@gmail.com",
                pass: config.email_pass
            }
        });
        const mail = getEmailData(to, name, token, type);
        smtpTransport.sendMail(mail, function (error, response) {
            if (error) return false;
            cb()
            smtpTransport.close();
        })
        return true;
    }
}
