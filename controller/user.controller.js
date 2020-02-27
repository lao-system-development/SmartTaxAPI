const jwt = require('jsonwebtoken');
const config = require('../config/dotenvconfig');
const { User } = require('../model/user.model');
const bcrypt = require('bcrypt');

const StellarSdk = require('stellar-sdk')
const Callsendmail = require('../mail/index')
const moment = require("moment");



module.exports = {
    CreateUser,
    GetUserData,
    LoginUser,
    LogOut,
    VertifyFucn,
    ResetPassword,
    ChangePassword
}

async function ChangePassword(req, res, next) {
    var today = moment().startOf('day').valueOf();
    return await User.findOne({ "resetToken": req.params.resetToken, "resetTokenExp": today }, (err, user) => {
        if (!user) return res.json({ success: false, message: "Your account was not verified try again later" });
        var seltgen = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.params.password, seltgen);
        var newKeypair = StellarSdk.Keypair.random();
        user.publicKey = newKeypair.publicKey();
        user.resetToken = '';
        user.resetTokenExp = '';

        user.save((err, result) => {
            if (err) return res.json({ success: false });
            return res.json({ result })
        })
    })
}

/// this function use for reset password user from the sever 
async function ResetPassword(req, res, next) {
    return await User.findOne({ 'email': req.body.email }).then(function (user) {
        if (!user) return res.json({ success: false, message: 'email not found' });
        user.generateResetToken((err, user) => {
            if (err) return res.json({ success: false, token: '' })

            if (Callsendmail.sendEmail(user.email, user.firstname, user.resetToken, "resetpassword") == false) {
                return res.json({ success: false, message: "please check your email we can not send the code to your email..." })
            } else {
                return res.json({ success: true, message: "please check your email to confrim your account" })

            }
        })
    })
}

// this function user for Veritify user to confrim your self to use our system
async function VertifyFucn(req, res, next) {
    return await User.findOne({ "token": req.params.token }, (err, user) => {
        if (!user) return res.json({ success: false, message: "Your account was not verified try again later" });
        user.status = "Verified";
        user.save((err, result) => {
            if (err) return res.json({ success: false, message: result });
            return res.send('<script> window.location.replace("https://www.localhost:3000")</script>');
        })

    })
}

// this function user for logout by server side it will be saved then other way
async function LogOut(req, res, next) {
    const token = req.cookies['RESTFULLAPICOOKIE'];
    return await User.findOne({ "token": token }, (err, user) => {
        if (!user) return res.json({ success: false, message: "your are not signin" });
        user.token = "";
        user.save((err, result) => {
            res.clearCookie("RESTFULLAPICOOKIE");
            return res.json({ success: true, message: result })
        })

    })
}

// use for getting user data from the server. it is the json file 
async function GetUserData(req, res, next) {
    return res.json({
        user: {
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            role: req.user.role,
            phonenumber: req.user.phonenumber

        }
    });
}


// this function use for login to the system
async function LoginUser(req, res, next) {
    return await User.findOne({ 'email': req.body.email }).then(function (user) {
        if (!user) return res.json({ success: false, message: 'email not found' });
        if (user.status === 'Verified') {
            if (bcrypt.compareSync(req.body.password, user.password) == false)
                return res.json({ success: false, message: 'password not found' });
            user.generateToken((err, user) => {
                if (err) return res.json({ success: false, token: '' })
                res.cookie('RESTFULLAPICOOKIE', user.token).json({ success: true, token: user.token });
            })
        } else {
            res.clearCookie("RESTFULLAPICOOKIE");
            return res.json({ success: false, message: 'Your account must be Verified on your email address' })
        }
    })
}

// this monthod use for create new user to user on system when you are creating your account 
// the system will nortify you to confrim your self to use the system
async function CreateUser(req, res, next) {
    // user = await Joi.validate(user, userSchema, { abortEarly: false });
    const user = req.body;
    return await User.findOne({ 'email': req.body.email }).then(function (loginuser) {
        if (loginuser) return res.json({ success: false, message: 'we have your email on our databases' });
        var seltgen = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, seltgen);
        var newKeypair = StellarSdk.Keypair.random();
        user.publicKey = newKeypair.publicKey();
        user.status = 'Registered';
        var payload = JSON.stringify(user);
        var token = jwt.sign({ data: payload }, config.jwtSecret, { expiresIn: config.tokenExpiredTime });
        user.token = token;
        var name = user.firstname
        if (Callsendmail.sendEmail(user.email, name, token, "welcome") == false) {
            return res.json({ success: false, message: "please check your email we can not send the code to your email..." })
        } else {
            return new User(user).save()
                .then(function (newUser) {
                    return res.json({ success: true, newUser });
                });
        }
    })
}

