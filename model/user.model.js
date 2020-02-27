const mongoose = require('mongoose');
const config = require('../config/dotenvconfig');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const moment = require("moment")
const userSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['Registered', 'Processing', 'Verified', 'Locked', 'admin'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
        default: 'null'
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    phonenumber: {
        type: String,
        required: false,
        maxlength: 25,
        default: ''
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ''
    },
    resetToken: {
        type: String,
        default: ''
    },
    resetTokenExp: {
        type: Number,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publicKey: {
        type: String,
        required: true
    },

});

userSchema.methods.generateResetToken = function (cb) {
    var user = this;


    var token = jwt.sign({ data: user._id.toHexString() }, config.jwtSecret, { expiresIn: config.resettoken });
    var today = moment().startOf('day').valueOf();
    var tomorrow = moment(today).endOf('day').valueOf();

    user.resetToken = token;
    user.resetTokenExp = tomorrow;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })



}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign({ data: user._id.toHexString() }, config.jwtSecret, { expiresIn: config.tokenExpiredTime });
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}
userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, config.jwtSecret, function (err, decode) {
        if (err) return cb(err);
        user.findOne({ "_id": decode.data, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}
const User = mongoose.model('User', userSchema);

module.exports = { User }