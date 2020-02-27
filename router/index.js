var express = require('express')
const moduleuser = require('./api/user.route')
const moduletax = require('./api/taxtrasport.route')
var router = express.Router()
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "www.laosystemdev.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/server', function (req, res, next) {
    res.send("Starting SmartTax api")
})
router.use('/server', moduleuser)
router.use('/server', moduletax)
module.exports = router