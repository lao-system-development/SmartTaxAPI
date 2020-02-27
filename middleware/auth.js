const { User } = require('./../model/user.model');

let auth = (req, res, next) => {
    let token = req.cookies.RESTFULLAPICOOKIE;
    User.findByToken(token, (err, user) => {

        if (err) throw err;
        if (!user) return res.json({
            isAuth: false,
            error: true,
            message: "You must login your account again to renew your Token"
        });

        if (user.status == 'Registered') {
            return res.json({
                isAuth: false,
                error: true,
                message: "Your account must be Verified",
            })
        } else if (user.status == "Locked") {
            return res.json({
                isAuth: false,
                error: true,
                message: "Your account is Locked, Your must contact to the company to verified your account",
            })
        } else {
            req.token = token;
            req.user = user;
        }

        next();
    })

}


module.exports = { auth }