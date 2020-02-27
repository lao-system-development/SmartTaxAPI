
require('dotenv').config();
const config = {
    env: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
    mongooseDebug: process.env.MONGOOSE_DEBUG,
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretuser: process.env.JWT_SECRETuser,
    secret: process.env.SECRET,
    tokenExpiredTime: process.env.TOKEN_EXPIRED_TIME,
    email_pass: process.env.EMAIL_PASS,
    resettoken: process.env.RESET_TOKEN_EXPIRED_TIME,
    url: process.env.ROOT_URL,
    tax_user: process.env.TAX_USER,
    tax_password: process.env.TAX_PASSWORD,
    mongo: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        authSource: process.env.MONGO_AUTH_SOURCE,
        database: process.env.MONGO_DATABASE_NAME
    }
};
module.exports = config;
