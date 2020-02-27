const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require("../model/user.model")
const config = require('./dotenvconfig');

const localLogin = new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    let user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
    }
    if (user.status == 'Locked') {
        return done(null, false, { error: 'Your account is locked!' });
    }
    user = user.toObject();
    delete user.hashedPassword;
    done(null, user);
});

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (payload, done) => {
    let data = JSON.parse(payload.data)
    let user = await User.findById(data._id);
    if (!user || user.status == 'Locked') {
        return done(null, false);
    }
    user = user.toObject();
    delete user.hashedPassword;
    done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
