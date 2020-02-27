require('dotenv').config();
const config = require('../config/dotenvconfig')
const resetPass = resettoken => {
    console.log(resettoken)
    // const URL = process.env.NODE_ENV === 'development' ? process.env.ROOT_URL : 'http://localhost:3000/systemapi/server/users';
    const URL = config.url;

    return `
    <!DOCTYPE html>
    <html>
    
    <head>
    
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Vertify Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
    
    </head>
    
    <body>
    
        <table border=" 0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a style=" -ms-text-size-adjust: 100%;  color: #1a82e2;
                                    -webkit-text-size-adjust: 100%;" href="/" target="_blank"
                                    style="display: inline-block;">
                                    <img style="   height: auto;
                                        line-height: 100%;
                                        text-decoration: none;
                                        border: 0;
                                        outline: none;" src="/" alt="Logo" width="48"
                                        style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                        style="background-color: #e9ecef;max-width: 600px;">
                        <tr>
                            <td align="center" style=" padding: 30px ; font-family: 'Source Sans Pro' , Helvetica, Arial,
                                sans-serif; border-top: 3px solid #339966;">
                                <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px;
                                     line-height: 48px;">
                                    Confirm Your Email Address</h1>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Tap the button below to confirm your email address. The system will
                                    vertify you to be able to use the system. </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" style="background-color: #1a82e2
                                                        ;border-radius: 6px;">
                                                        <a href="${URL}/ChangePassword/${resettoken}" style="
                                                                padding: 16px 36px; 
                                                                font-size: 16px;  
                                                                text-decoration: none;
                                                                color: #ffffff;  
                                                                border-radius: 6px;">
                                                            click here to confirm your email</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">If you would like to learn more about us tap link below to see the
                                    website</p>
                                <p style="margin: 0;"><a style=" -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;  color: #1a82e2;" href="www.codetodev.com"
                                        target="_blank">www.codetodev.com</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">www.codetodev.com<br>Mr. Lomon sihalath</p>
                            </td>
                        </tr>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
    
                        <tr>
                            <td align="center" bgcolor="#e9ecef"
                                style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                <p style="margin: 0;">You received this email because we received a request for
                                    for your account. If you didn't request you can safely
                                    delete this email.</p>
                            </td>
                        </tr>
    
                        <tr>
                            <td align="center" bgcolor="#e9ecef"
                                style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                <p style="margin: 0;">To stop receiving these emails, you can <a style=" -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;" href="/" target="_blank">unsubscribe</a> at any
                                    time.
                                </p>
                                <h3>www.codetodev.com</h3>
                            </td>
                        </tr>
    
                    </table>
    
                </td>
            </tr>
    
        </table>
    
    </body>
    
    </html>
    `;
};

module.exports = { resetPass };
